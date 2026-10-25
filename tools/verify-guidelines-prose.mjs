#!/usr/bin/env node
/** Writing-guideline smoke check on public guideline markdown (not meta-examples in writing.md). */
import fs from "node:fs";
import path from "node:path";
import { fileURLToPath } from "node:url";

const root = path.join(path.dirname(fileURLToPath(import.meta.url)), "..");
const dir = path.join(root, "content/guidelines");

const files = fs
  .readdirSync(dir)
  .filter((f) => f.endsWith(".md") && f !== "writing.md")
  .map((f) => path.join(dir, f));

const banned = /\b(easy|simple|quick|seamless|unlock|leverage)\b/i;
const dash = /[—–]/;

const hits = [];
for (const file of files) {
  const text = fs.readFileSync(file, "utf8");
  if (dash.test(text)) {
    hits.push(`${path.relative(root, file)}: em or en dash`);
  }
  if (banned.test(text)) {
    hits.push(`${path.relative(root, file)}: banned word`);
  }
}

if (hits.length) {
  console.error("ERROR: guideline prose check failed:");
  for (const h of hits) console.error(`  ${h}`);
  process.exit(1);
}

console.log("OK: guideline markdown passes prose checks");
