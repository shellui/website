#!/usr/bin/env node
/**
 * Fail if a public HTML page lacks og:image or the PNG is missing / wrong size.
 */
import fs from "node:fs";
import path from "node:path";
import { fileURLToPath } from "node:url";

const root = path.join(path.dirname(fileURLToPath(import.meta.url)), "..");
const site = path.join(root, "_site");

const SKIP_FILES = new Set([
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

function pngDimensions(buffer) {
  if (buffer.length < 24 || buffer.toString("ascii", 1, 4) !== "PNG") {
    return null;
  }
  return { width: buffer.readUInt32BE(16), height: buffer.readUInt32BE(20) };
}

function extractOgImage(html) {
  const match = html.match(/<meta\s+property="og:image"\s+content="([^"]+)"/i);
  return match?.[1] || null;
}

function ogPathFromUrl(contentUrl, siteOrigin = "https://shellui.com") {
  const url = contentUrl.startsWith("http") ? contentUrl : `${siteOrigin}${contentUrl}`;
  const pathPart = url.replace(siteOrigin, "").split("?")[0];
  if (!pathPart.startsWith("/og/")) return pathPart;
  return pathPart;
}

function fail(message) {
  console.error(`ERROR: ${message}`);
  process.exit(1);
}

if (!fs.existsSync(site)) {
  fail("_site/ missing — run npm run build first");
}

const htmlFiles = walkHtml(site).filter((rel) => !SKIP_FILES.has(rel));
let checked = 0;

for (const rel of htmlFiles) {
  const html = fs.readFileSync(path.join(site, rel), "utf8");
  if (!html.includes('property="og:image"')) {
    fail(`${rel} missing og:image meta tag`);
  }
  const ogUrl = extractOgImage(html);
  if (!ogUrl) fail(`${rel} has empty og:image`);
  const assetPath = ogPathFromUrl(ogUrl).replace(/^\//, "");
  const file = path.join(site, assetPath);
  if (!fs.existsSync(file)) {
    fail(`${rel} references missing OG image ${assetPath}`);
  }
  const dims = pngDimensions(fs.readFileSync(file));
  if (!dims || dims.width !== 1200 || dims.height !== 630) {
    fail(`${rel} OG image ${assetPath} must be 1200×630 (got ${dims?.width ?? "?"}×${dims?.height ?? "?"})`);
  }
  if (!html.includes('property="og:image:width" content="1200"')) {
    fail(`${rel} missing og:image:width`);
  }
  if (!html.includes('property="og:image:height" content="630"')) {
    fail(`${rel} missing og:image:height`);
  }
  if (!html.includes('property="og:image:alt"')) {
    fail(`${rel} missing og:image:alt`);
  }
  checked += 1;
}

console.log(`OK: verified OG images on ${checked} HTML pages`);
