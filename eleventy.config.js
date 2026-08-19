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
