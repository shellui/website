#!/usr/bin/env node
/**
 * Copy English page sources into src/{fr,de,it}/ for translation.
 * Skips infrastructure templates and English-only agent files.
 */
import fs from "node:fs";
import path from "node:path";
import { fileURLToPath } from "node:url";

const root = path.dirname(fileURLToPath(import.meta.url));
const src = path.join(root, "../src");
const locales = ["fr", "de", "it"];

const SKIP_FILES = new Set([
  "llms.njk",
  "robots.njk",
  "sitemap.njk",
  "feed.njk",
]);

const SKIP_PREFIXES = ["_includes/", "blocks/", "islands/"];

function shouldSkip(rel) {
  const base = path.basename(rel);
  if (SKIP_FILES.has(base)) return true;
  if (SKIP_PREFIXES.some((p) => rel.startsWith(p))) return true;
  if (rel.startsWith("fr/") || rel.startsWith("de/") || rel.startsWith("it/")) return true;
  return false;
}

function walk(dir, base = "") {
  const out = [];
  for (const name of fs.readdirSync(dir)) {
    const rel = base ? `${base}/${name}` : name;
    const full = path.join(dir, name);
    if (fs.statSync(full).isDirectory()) {
      if (name === "_includes" || name === "blocks" || name === "islands" || name === "_data") {
        continue;
      }
      if (locales.includes(name)) continue;
      out.push(...walk(full, rel));
    } else if (/\.(njk|md)$/i.test(name)) {
      out.push(rel);
    }
  }
  return out;
}

for (const locale of locales) {
  const localeMarker = path.join(src, locale, `${locale}.json`);
  fs.mkdirSync(path.dirname(localeMarker), { recursive: true });
  fs.writeFileSync(localeMarker, `${JSON.stringify({ lang: locale }, null, 2)}\n`);

  for (const rel of walk(src)) {
    if (shouldSkip(rel)) continue;
    const srcFile = path.join(src, rel);
    const destFile = path.join(src, locale, rel);
    fs.mkdirSync(path.dirname(destFile), { recursive: true });
    if (!fs.existsSync(destFile)) {
      fs.copyFileSync(srcFile, destFile);
    }
  }
}

console.log("Locale page stubs synced (fr, de, it).");
