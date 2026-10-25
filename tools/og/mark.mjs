import fs from "node:fs";
import path from "node:path";
import { fileURLToPath } from "node:url";

const root = path.join(path.dirname(fileURLToPath(import.meta.url)), "../..");

const MARK_PATHS = {
  ink: path.join(root, "brand-assets/logo/shellui-mark-ink.svg"),
  white: path.join(root, "brand-assets/logo/shellui-mark-white.svg"),
  gold: path.join(root, "brand-assets/logo/shellui-mark-gold.svg"),
};

const cache = new Map();

export function markDataUri(variant = "ink") {
  const key = variant;
  if (cache.has(key)) return cache.get(key);
  const file = MARK_PATHS[variant === "goldOnDark" ? "gold" : variant] || MARK_PATHS.ink;
  let svg = fs.readFileSync(file, "utf8");
  if (variant === "goldOnDark") {
    svg = svg.replace(/#e3a512/gi, "#E8B84A");
  }
  const uri = `data:image/svg+xml;base64,${Buffer.from(svg).toString("base64")}`;
  cache.set(key, uri);
  return uri;
}
