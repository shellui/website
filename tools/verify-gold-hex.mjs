#!/usr/bin/env node
import fs from "node:fs";
import path from "node:path";
import { fileURLToPath } from "node:url";

const root = path.join(path.dirname(fileURLToPath(import.meta.url)), "..");

const GOLD_PATTERNS = [/#e3a512/i, /#e8b84a/i, /#8a6300/i, /#c4920a/i, /#1a1408/i];

const SCAN_DIRS = ["src", "tools"];

const SKIP_DIR_PARTS = new Set([
  "node_modules",
  "_site",
  "brand-assets",
  "tools/brand-kit",
  "tools/og",
]);

const ALLOWLIST_FILES = new Set([
  "tools/generate-tokens.mjs",
  "tools/verify-gold-hex.mjs",
  "tools/verify-design-tokens.mjs",
  "tokens/tokens.json",
]);

const GENERATED = new Set([
  "src/_data/designTokens.js",
  "src/assets/css/input.css",
  "content/guidelines/generated/tokens.css",
]);

function walk(dir, files = []) {
  if (!fs.existsSync(dir)) return files;
  for (const entry of fs.readdirSync(dir, { withFileTypes: true })) {
    if (entry.name.startsWith(".")) continue;
    const full = path.join(dir, entry.name);
    const rel = path.relative(root, full).split(path.sep).join("/");
    if ([...SKIP_DIR_PARTS].some((part) => rel === part || rel.startsWith(`${part}/`))) continue;
    if (entry.isDirectory()) walk(full, files);
    else files.push(full);
  }
  return files;
}

const hits = [];
for (const dir of SCAN_DIRS) {
  for (const file of walk(path.join(root, dir))) {
    const rel = path.relative(root, file).split(path.sep).join("/");
    if (ALLOWLIST_FILES.has(rel) || GENERATED.has(rel)) continue;
    if (!/\.(css|js|mjs|njk|jsx|tsx|ts|html|py)$/i.test(rel)) continue;
    const text = fs.readFileSync(file, "utf8");
    for (const pattern of GOLD_PATTERNS) {
      if (pattern.test(text)) {
        hits.push({ rel, pattern: pattern.source });
        break;
      }
    }
  }
}

if (hits.length) {
  console.error("ERROR: hardcoded gold hex in implementation files:");
  for (const hit of hits) console.error(`  ${hit.rel} (${hit.pattern})`);
  process.exit(1);
}

console.log("OK: no stray gold hex in src/ or tools/ (excluding brand-kit)");
