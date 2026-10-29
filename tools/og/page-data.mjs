import fs from "node:fs";
import path from "node:path";
import { fileURLToPath } from "node:url";
import matter from "gray-matter";
import { readLayoutFromFile } from "./front-matter.mjs";

const root = path.join(path.dirname(fileURLToPath(import.meta.url)), "../..");

let globalDataPromise;

async function loadGlobalData() {
  if (!globalDataPromise) {
    globalDataPromise = (async () => {
      const site = JSON.parse(
        fs.readFileSync(path.join(root, "src/_data/site.json"), "utf8"),
      );
      let changelog = [];
      try {
        const mod = await import(path.join(root, "src/_data/changelog.js"));
        let loaded = mod.default ?? mod;
        if (typeof loaded === "function") {
          loaded = await loaded();
        }
        changelog = Array.isArray(loaded) ? loaded : [];
      } catch {
        changelog = [];
      }
      return { site, changelog };
    })();
  }
  return globalDataPromise;
}

export function readPageFrontMatter(inputPath) {
  if (!inputPath || !fs.existsSync(inputPath)) return {};
  const raw = fs.readFileSync(inputPath, "utf8");
  if (!raw.startsWith("---")) return {};
  return matter(raw).data || {};
}

/** Merge Eleventy result data with file front matter and global data for OG rendering. */
export async function mergePageDataForOg(template) {
  const global = await loadGlobalData();
  const fm = readPageFrontMatter(template.inputPath);
  const d = template.data || {};
  const layoutFromFile = readLayoutFromFile(template.inputPath);

  const pick = (key) => {
    if (d[key] !== undefined && d[key] !== null && d[key] !== "") return d[key];
    if (fm[key] !== undefined && fm[key] !== null && fm[key] !== "") return fm[key];
    return undefined;
  };

  return {
    site: d.site || global.site,
    changelog: d.changelog?.length ? d.changelog : global.changelog,
    layout: d.layout !== undefined ? d.layout : layoutFromFile,
    page: { url: template.url, ...(d.page || {}) },
    title: pick("title"),
    description: pick("description"),
    ogTitle: pick("ogTitle"),
    ogDescription: pick("ogDescription"),
    ogTemplate: pick("ogTemplate"),
    ogImage: pick("ogImage"),
    heading: pick("heading"),
    lede: pick("lede"),
    eyebrow: pick("eyebrow"),
    tags: d.tags || fm.tags,
    author: pick("author"),
    authorRole: pick("authorRole"),
    category: pick("category"),
    date: d.date || fm.date,
  };
}
