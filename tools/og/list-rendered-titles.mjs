#!/usr/bin/env node
/**
 * Audit OG titles from built HTML (must run after `npm run build`).
 */
import fs from "node:fs";
import path from "node:path";
import { fileURLToPath } from "node:url";

const root = path.join(path.dirname(fileURLToPath(import.meta.url)), "../..");
const site = path.join(root, "_site");

const SKIP = new Set([
  "brand-assets/email/email-signature.html",
  "features/chrome/index.html",
  "features/microfrontend/index.html",
  "features/ship/index.html",
  "product/brand-assets/index.html",
]);

function walkHtml(dir, base = "") {
  const out = [];
  for (const entry of fs.readdirSync(dir, { withFileTypes: true })) {
    const rel = base ? `${base}/${entry.name}` : entry.name;
    const full = path.join(dir, entry.name);
    if (entry.isDirectory()) out.push(...walkHtml(full, rel));
    else if (entry.name.endsWith(".html")) out.push(rel);
  }
  return out;
}

function meta(html, prop) {
  const re = new RegExp(`<meta\\s+property="${prop}"\\s+content="([^"]+)"`, "i");
  return html.match(re)?.[1] || "";
}

function stripSiteSuffix(title) {
  return String(title || "")
    .replace(/\s*\|\s*Shellui\s*$/i, "")
    .trim();
}

if (!fs.existsSync(site)) {
  console.error("ERROR: _site/ missing — run npm run build first");
  process.exit(1);
}

const rows = [];
for (const rel of walkHtml(site).filter((r) => !SKIP.has(r))) {
  const html = fs.readFileSync(path.join(site, rel), "utf8");
  const ogTitle = stripSiteSuffix(meta(html, "og:title"));
  const altLead = meta(html, "og:image:alt").split(".")[0]?.trim();
  rows.push({ rel, ogTitle, altLead });
}

rows.sort((a, b) => a.rel.localeCompare(b.rel));
console.log(`OG audit: ${rows.length} HTML pages\n`);
for (const r of rows) {
  console.log(`${r.rel}\t${r.altLead || r.ogTitle}`);
}

const bad = rows.filter(
  (r) =>
    r.ogTitle &&
    r.ogTitle.toLowerCase() !== "shellui" &&
    (r.altLead === "Shellui" || r.altLead?.toLowerCase() === "shellui"),
);
if (bad.length) {
  console.error(`\nERROR: ${bad.length} page(s) with generic OG alt vs specific title`);
  process.exit(1);
}
