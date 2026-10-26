#!/usr/bin/env node
/** Check internal links and redirect pages in _site/. */
import fs from "node:fs";
import path from "node:path";
import { fileURLToPath } from "node:url";

const root = path.join(path.dirname(fileURLToPath(import.meta.url)), "..");
const site = path.join(root, "_site");

function fail(msg) {
  console.error(`ERROR: ${msg}`);
  process.exit(1);
}

if (!fs.existsSync(site)) fail("_site/ missing");

const checks = [
  { path: "guidelines/index.html", must: ["/guidelines/interface/", "/guidelines/foundations/", "/llms-full.txt"] },
  { path: "guidelines/interface/index.html", must: ["Guidelines v2.", "Shellui chrome"] },
  { path: "guidelines/foundations/index.html", must: ["visual-handbook", "primary-ink", "Color tokens"] },
  { path: "guidelines/brand/index.html", must: ["id=\"downloads\"", "shellui-brand-kit-v1.pdf"] },
  { path: "guidelines/print/index.html", must: ["IBM Plex", "7405 U"] },
  { path: "design.md", must: ["version: 2.", "`primary-ink`"] },
  { path: "guidelines/interface.md", must: ["version: 2."] },
  { path: "guidelines/web-design.md", must: ["alias", "interface"] },
  { path: "llms-full.txt", must: ["# Brand", "# Interface"] },
  { path: "brand-assets/index.html", must: ["/guidelines/brand/#downloads"] },
  { path: "guidelines/design/index.html", must: ["/guidelines/interface/"] },
  { path: "guidelines/web-design/index.html", must: ["/guidelines/interface/"] },
];

for (const { path: rel, must } of checks) {
  const file = path.join(site, rel);
  if (!fs.existsSync(file)) fail(`missing ${rel}`);
  const text = fs.readFileSync(file, "utf8");
  for (const needle of must) {
    if (!text.includes(needle)) fail(`${rel} missing expected content: ${needle}`);
  }
}

console.log("OK: internal link smoke checks passed");
