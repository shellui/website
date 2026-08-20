import { execSync } from "node:child_process";
import fs from "node:fs";
import path from "node:path";
import { fileURLToPath } from "node:url";
import { IdAttributePlugin } from "@11ty/eleventy";

const root = path.dirname(fileURLToPath(import.meta.url));

function buildCss() {
  fs.mkdirSync(path.join(root, "_site/assets/css"), { recursive: true });
  execSync(
    "npx @tailwindcss/cli -i ./src/assets/css/input.css -o ./_site/assets/css/site.css --minify",
    { stdio: "inherit", cwd: root },
  );
}

function readingTimeMinutes(content) {
  const words = String(content || "")
    .replace(/<[^>]+>/g, " ")
    .split(/\s+/)
    .filter(Boolean).length;
  return Math.max(1, Math.round(words / 220));
}

function escapeAttr(value) {
  return String(value || "")
    .replace(/&/g, "&amp;")
    .replace(/"/g, "&quot;")
    .replace(/</g, "&lt;");
}

function escapeXml(value) {
  return String(value || "")
    .replace(/&/g, "&amp;")
    .replace(/</g, "&lt;")
    .replace(/>/g, "&gt;")
    .replace(/"/g, "&quot;")
    .replace(/'/g, "&apos;");
}

function wrapParagraph(content) {
  const text = String(content || "").trim();
  if (!text) return "";
  return /^<p[\s>]/i.test(text) ? text : `<p>${text}</p>`;
}

const figureCaptionIcon = `<svg viewBox="0 0 20 20" fill="currentColor" aria-hidden="true" class="mt-0.5 size-5 flex-none text-gray-300 dark:text-gray-600"><path d="M18 10a8 8 0 1 1-16 0 8 8 0 0 1 16 0Zm-7-4a1 1 0 1 1-2 0 1 1 0 0 1 2 0ZM9 9a.75.75 0 0 0 0 1.5h.253a.25.25 0 0 1 .244.304l-.459 2.066A1.75 1.75 0 0 0 10.747 15H11a.75.75 0 0 0 0-1.5h-.253a.25.25 0 0 1-.244-.304l.459-2.066A1.75 1.75 0 0 0 9.253 9H9Z" clip-rule="evenodd" fill-rule="evenodd" /></svg>`;

export default function (eleventyConfig) {
  eleventyConfig.addPlugin(IdAttributePlugin);

  eleventyConfig.ignores.add("src/blocks/**");

  eleventyConfig.addWatchTarget("src/assets/css/");
  eleventyConfig.addWatchTarget("src/blocks/");

  eleventyConfig.addPassthroughCopy({
    CNAME: "CNAME",
    img: "img",
    "favicon.ico": "favicon.ico",
    "apple-touch-icon.png": "apple-touch-icon.png",
    "src/assets/js": "assets/js",
    "node_modules/alpinejs/dist/cdn.min.js": "assets/js/alpine.min.js",
    "node_modules/@tailwindplus/elements/dist/index.js": "assets/js/elements.js",
  });

  eleventyConfig.addFilter("readableDate", (date) =>
    new Date(date).toLocaleDateString("en-GB", {
      year: "numeric",
      month: "long",
      day: "numeric",
    }),
  );

  eleventyConfig.addFilter("shortDate", (date) =>
    new Date(date).toLocaleDateString("en-US", {
      year: "numeric",
      month: "short",
      day: "numeric",
    }),
  );

  eleventyConfig.addFilter("readingTime", (post) => {
    const content = typeof post === "string" ? post : post?.templateContent;
    return readingTimeMinutes(content);
  });

  eleventyConfig.addFilter("xmlEscape", escapeXml);

  eleventyConfig.addFilter("rfc822Date", (date) =>
    new Date(date).toUTCString(),
  );

  eleventyConfig.addFilter("absoluteUrl", (url, base) => {
    if (!url) return "";
    if (/^https?:\/\//i.test(url)) return url;
    const origin = String(base || "").replace(/\/$/, "");
    return `${origin}${url.startsWith("/") ? url : `/${url}`}`;
  });

  eleventyConfig.addShortcode("figure", (src, alt = "", caption = "") => {
    const img = `<img src="${escapeAttr(src)}" alt="${escapeAttr(alt)}" class="aspect-video rounded-xl bg-gray-50 object-cover dark:bg-gray-900" />`;
    const figcaption = caption
      ? `<figcaption class="mt-4 flex gap-x-2 text-sm/6 text-gray-500 dark:text-gray-400">${figureCaptionIcon}${escapeXml(caption)}</figcaption>`
      : "";
    return `<figure class="article-figure mt-16">${img}${figcaption}</figure>`;
  });

  eleventyConfig.addPairedShortcode(
    "quote",
    (content, author = "", role = "", image = "") => {
      const quote = wrapParagraph(content);
      const photo = image
        ? `<img src="${escapeAttr(image)}" alt="" class="size-6 flex-none rounded-full bg-gray-50 object-contain p-0.5 dark:bg-gray-900" />`
        : "";
      const credit = [author, role].filter(Boolean).length
        ? `<figcaption class="mt-6 flex gap-x-4">${photo}<div class="text-sm/6">${author ? `<strong class="font-semibold text-gray-900 dark:text-white">${escapeXml(author)}</strong>` : ""}${author && role ? " – " : ""}${role ? escapeXml(role) : ""}</div></figcaption>`
        : "";
      return `<figure class="article-quote mt-10 border-l border-primary-ink pl-9 dark:border-primary"><blockquote class="font-semibold text-gray-900 dark:text-white">${quote}</blockquote>${credit}</figure>`;
    },
  );

  eleventyConfig.addShortcode("demo", function (name) {
    if (!/^[a-z0-9-]+$/.test(name)) {
      throw new Error(`Invalid demo block name: ${name}`);
    }
    const file = path.join(root, "src/blocks", `${name}.njk`);
    if (!fs.existsSync(file)) {
      throw new Error(`Unknown demo block: ${name}`);
    }
    return fs.readFileSync(file, "utf8").replace(/^\s*[\r\n]/gm, "");
  });

  eleventyConfig.addCollection("blog", (api) =>
    api.getFilteredByTag("blog").sort((a, b) => b.date - a.date),
  );

  eleventyConfig.addCollection("sitemap", (api) =>
    api.getFilteredByGlob("src/**/*.{md,njk}").filter((item) => {
      if (item.data.eleventyExcludeFromCollections) return false;
      if (item.data.sitemap === false) return false;
      return Boolean(item.url);
    }),
  );

  eleventyConfig.on("eleventy.before", buildCss);

  eleventyConfig.setServerOptions({
    watch: ["_site/assets/css/site.css"],
  });

  return {
    dir: {
      input: "src",
      includes: "_includes",
      data: "_data",
      output: "_site",
    },
    markdownTemplateEngine: "njk",
    htmlTemplateEngine: "njk",
    templateFormats: ["md", "njk", "html"],
  };
}
