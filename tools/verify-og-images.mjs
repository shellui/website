#!/usr/bin/env node
/**
 * Fail if a public HTML page lacks og:image or the PNG is missing / wrong size.
 */
import { createHash } from "node:crypto";
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

function extractMeta(html, property) {
  const re = new RegExp(
    `<meta\\s+property="${property}"\\s+content="([^"]+)"`,
    "i",
  );
  return html.match(re)?.[1] || "";
}

function extractOgImage(html) {
  return extractMeta(html, "og:image");
}

function ogAssetPath(contentUrl, siteOrigin = "https://shellui.com") {
  const url = contentUrl.startsWith("http") ? contentUrl : `${siteOrigin}${contentUrl}`;
  return url.replace(siteOrigin, "").split("?")[0];
}

function stripSiteSuffix(title) {
  return String(title || "")
    .replace(/\s*\|\s*Shellui\s*$/i, "")
    .trim();
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
const pngByHash = new Map();

for (const rel of htmlFiles) {
  const html = fs.readFileSync(path.join(site, rel), "utf8");
  if (!html.includes('property="og:image"')) {
    fail(`${rel} missing og:image meta tag`);
  }
  const ogUrl = extractOgImage(html);
  if (!ogUrl) fail(`${rel} has empty og:image`);
  const assetPath = ogAssetPath(ogUrl).replace(/^\//, "");
  const file = path.join(site, assetPath);
  if (!fs.existsSync(file)) {
    fail(`${rel} references missing OG image ${assetPath}`);
  }
  const pngBuffer = fs.readFileSync(file);
  const dims = pngDimensions(pngBuffer);
  if (!dims || dims.width !== 1200 || dims.height !== 630) {
    fail(`${rel} OG image ${assetPath} must be 1200×630 (got ${dims?.width ?? "?"}×${dims?.height ?? "?"})`);
  }
  if (!html.includes('property="og:image:width" content="1200"')) {
    fail(`${rel} missing og:image:width`);
  }
  if (!html.includes('property="og:image:height" content="630"')) {
    fail(`${rel} missing og:image:height`);
  }
  const ogAlt = extractMeta(html, "og:image:alt");
  if (!ogAlt) {
    fail(`${rel} missing og:image:alt`);
  }

  const ogTitle = stripSiteSuffix(extractMeta(html, "og:title") || html.match(/<title>([^<]+)<\/title>/i)?.[1]);
  const altLead = ogAlt.split(".")[0]?.trim();
  if (
    ogTitle &&
    ogTitle.toLowerCase() !== "shellui" &&
    (altLead === "Shellui" || altLead?.toLowerCase() === "shellui")
  ) {
    fail(
      `${rel} OG alt looks generic ("${altLead}") but page title is "${ogTitle}" — metadata may not reach the renderer`,
    );
  }

  const digest = createHash("sha256").update(pngBuffer).digest("hex");
  const owners = pngByHash.get(digest) || [];
  owners.push({ rel, assetPath });
  pngByHash.set(digest, owners);

  checked += 1;
}

for (const [digest, owners] of pngByHash) {
  const uniqueAssets = new Set(owners.map((o) => o.assetPath));
  if (uniqueAssets.size > 1) {
    const sample = owners.map((o) => `${o.rel} → ${o.assetPath}`).join("; ");
    fail(
      `byte-identical OG PNG shared by different pages (${sample.slice(0, 400)}${sample.length > 400 ? "…" : ""})`,
    );
  }
}

console.log(`OK: verified OG images on ${checked} HTML pages (${pngByHash.size} unique PNGs)`);
