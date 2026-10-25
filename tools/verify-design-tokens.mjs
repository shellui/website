#!/usr/bin/env node
import fs from "node:fs";
import path from "node:path";
import { fileURLToPath } from "node:url";
import tokens from "../src/_data/designTokens.js";

const root = path.join(path.dirname(fileURLToPath(import.meta.url)), "..");
const css = fs.readFileSync(path.join(root, "src/assets/css/input.css"), "utf8");
const md = fs.readFileSync(
  path.join(root, "content/guidelines/foundations.md"),
  "utf8",
);

function fail(message) {
  console.error(`ERROR: ${message}`);
  process.exit(1);
}

for (const color of tokens.colors) {
  if (!css.includes(color.light)) {
    fail(`input.css missing light ${color.token} (${color.light})`);
  }
  if (!css.includes(color.dark)) {
    fail(`input.css missing dark ${color.token} (${color.dark})`);
  }
  if (color.token !== "card-foreground" && !md.includes("`" + color.token + "`")) {
    fail(`foundations.md missing token name ${color.token}`);
  }
  if (!md.includes(color.light)) {
    fail(`foundations.md missing light value for ${color.token} (${color.light})`);
  }
}

if (tokens.gold.text !== "#8a6300") {
  fail(`designTokens gold.text must be #8a6300 (got ${tokens.gold.text})`);
}

console.log("OK: design tokens match input.css and foundations.md");
