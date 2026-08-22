import { createHash } from "node:crypto";
import { execSync } from "node:child_process";
import fs from "node:fs";
import path from "node:path";
import { fileURLToPath } from "node:url";
import { IdAttributePlugin } from "@11ty/eleventy";
import { createHighlighter } from "shiki";

const root = path.dirname(fileURLToPath(import.meta.url));
const hashAssets = process.env.ELEVENTY_RUN_MODE === "build";
const siteOrigin = JSON.parse(
  fs.readFileSync(path.join(root, "src/_data/site.json"), "utf8"),
).url.replace(/\/$/, "");

const HASHABLE_EXT = new Set([
  ".avif",
  ".css",
  ".gif",
  ".ico",
  ".jpeg",
  ".jpg",
  ".js",
  ".mjs",
  ".otf",
  ".png",
  ".svg",
  ".ttf",
  ".webp",
  ".woff",
  ".woff2",
]);
const TEXT_EXT = new Set([".css", ".html", ".js", ".json", ".mjs", ".svg", ".txt", ".xml"]);
const WELL_KNOWN_URLS = new Set(["/apple-touch-icon.png", "/favicon.ico"]);

function buildCss() {
  fs.mkdirSync(path.join(root, "_site/assets/css"), { recursive: true });
  execSync(
    "npx @tailwindcss/cli -i ./src/assets/css/input.css -o ./_site/assets/css/site.css --minify",
    { stdio: "inherit", cwd: root },
  );
}

function contentHash(buffer) {
  return createHash("sha256").update(buffer).digest("hex").slice(0, 8);
}

function escapeRegExp(value) {
  return String(value).replace(/[.*+?^${}()|[\]\\]/g, "\\$&");
}

function replaceAssetUrl(content, from, to) {
  if (!from || from === to) return content;
  return content.replace(new RegExp(`${escapeRegExp(from)}(?!\\?v=)`, "g"), to);
}

function walkFiles(dir) {
  const files = [];
  for (const entry of fs.readdirSync(dir, { withFileTypes: true })) {
    if (entry.name.startsWith(".")) continue;
    const full = path.join(dir, entry.name);
    if (entry.isDirectory()) files.push(...walkFiles(full));
    else files.push(full);
  }
  return files;
}

function toPublicUrl(outputDir, file) {
  return `/${path.relative(outputDir, file).split(path.sep).join("/")}`;
}

function isHashedName(filename) {
  return /\.[a-f0-9]{8}\.[^.]+$/.test(filename);
}

function rewriteContents(file, manifest) {
  if (manifest.size === 0) return;
  if (!TEXT_EXT.has(path.extname(file).toLowerCase())) return;
  let content = fs.readFileSync(file, "utf8");
  const before = content;
  const entries = [...manifest.entries()].sort((a, b) => b[0].length - a[0].length);
  for (const [from, to] of entries) {
    content = replaceAssetUrl(content, `${siteOrigin}${from}`, `${siteOrigin}${to}`);
    content = replaceAssetUrl(content, from, to);
  }
  if (content !== before) fs.writeFileSync(file, content);
}

function fingerprintSite(outputDir) {
  const rank = (file) => {
    const ext = path.extname(file).toLowerCase();
    if (ext === ".css") return 1;
    if (ext === ".js" || ext === ".mjs") return 2;
    return 0;
  };
  const hashable = walkFiles(outputDir)
    .filter((file) => {
      const url = toPublicUrl(outputDir, file);
      if (WELL_KNOWN_URLS.has(url)) return false;
      if (!HASHABLE_EXT.has(path.extname(file).toLowerCase())) return false;
      if (isHashedName(path.basename(file))) return false;
      return true;
    })
    .sort((a, b) => rank(a) - rank(b) || a.localeCompare(b));

  // GitHub Pages caches every file for 10 minutes and does not allow custom
  // Cache-Control headers. Keep stable filenames and bust caches with ?v=hash
  // so a stale HTML document still finds assets after a deploy.
  const manifest = new Map();
  for (const file of hashable) {
    rewriteContents(file, manifest);
    const url = toPublicUrl(outputDir, file);
    manifest.set(url, `${url}?v=${contentHash(fs.readFileSync(file))}`);
  }
  for (const file of walkFiles(outputDir)) rewriteContents(file, manifest);
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

const highlighterPromise = createHighlighter({
  themes: ["github-light", "github-dark"],
  langs: ["typescript", "javascript", "tsx", "bash", "json"],
});

export default async function (eleventyConfig) {
  const highlighter = await highlighterPromise;

  function highlightCode(code, lang = "ts", filename = "") {
    const html = highlighter.codeToHtml(String(code || "").replace(/^\n+/, "").trimEnd(), {
      lang,
      themes: {
        light: "github-light",
        dark: "github-dark",
      },
      defaultColor: false,
    });
    const label = filename
      ? `<div class="code-sample__filename">${escapeXml(filename)}</div>`
      : "";
    return `<div class="code-sample">${label}${html}</div>`;
  }

  eleventyConfig.addPlugin(IdAttributePlugin);

  eleventyConfig.ignores.add("src/blocks/**");

  eleventyConfig.addWatchTarget("src/assets/css/");
  eleventyConfig.addWatchTarget("src/assets/js/");
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

  eleventyConfig.addPairedShortcode("highlight", highlightCode);

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

  eleventyConfig.on("eleventy.after", ({ dir }) => {
    if (hashAssets) fingerprintSite(dir.output);
  });

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
