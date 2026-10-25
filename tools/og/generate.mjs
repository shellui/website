#!/usr/bin/env node
/**
 * Generate og:image PNGs for guideline pages (1200×630).
 */
import fs from "node:fs";
import path from "node:path";
import { fileURLToPath } from "node:url";
import sharp from "sharp";
import tokens from "../../tokens/tokens.json" with { type: "json" };

const root = path.join(path.dirname(fileURLToPath(import.meta.url)), "../..");
const outDir = path.join(root, "brand-assets/og");

const pages = [
  { slug: "guidelines-brand", label: "Brand", subtitle: "Identity and downloads" },
  { slug: "guidelines-foundations", label: "Foundations", subtitle: "Design tokens" },
  { slug: "guidelines-interface", label: "Interface", subtitle: "Composition and chrome" },
  { slug: "guidelines-print", label: "Print", subtitle: "Grid, Plex, Pantone" },
  { slug: "guidelines-writing", label: "Writing", subtitle: "Voice and review" },
];

const gold = tokens.gold.brand.$value;
const ink = tokens.canvas.foreground.$value;
const muted = tokens.canvas.mutedForeground.$value;

function svgFor({ label, subtitle }) {
  return `<svg width="1200" height="630" xmlns="http://www.w3.org/2000/svg">
  <rect width="1200" height="630" fill="#ffffff"/>
  <rect x="72" y="72" width="48" height="6" rx="3" fill="${gold}"/>
  <text x="72" y="200" font-family="Inter, system-ui, sans-serif" font-size="56" font-weight="600" fill="${ink}">${label}</text>
  <text x="72" y="260" font-family="Inter, system-ui, sans-serif" font-size="28" fill="${muted}">${subtitle}</text>
  <text x="72" y="558" font-family="Inter, system-ui, sans-serif" font-size="22" fill="${muted}">shellui.com/guidelines/</text>
</svg>`;
}

fs.mkdirSync(outDir, { recursive: true });

for (const page of pages) {
  const file = path.join(outDir, `${page.slug}.png`);
  const svg = svgFor(page);
  await sharp(Buffer.from(svg)).png().toFile(file);
}

console.log(`OK: wrote ${pages.length} guideline og images to brand-assets/og/`);
