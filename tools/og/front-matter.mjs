import fs from "node:fs";

/** Read `layout` from file front matter when Eleventy omits false from merged data. */
export function readLayoutFromFile(inputPath) {
  if (!inputPath || !fs.existsSync(inputPath)) return undefined;
  const raw = fs.readFileSync(inputPath, "utf8");
  const match = raw.match(/^---\r?\n([\s\S]*?)\r?\n---/);
  if (!match) return undefined;
  const line = match[1].match(/^layout:\s*(.+)\s*$/m);
  if (!line) return undefined;
  const value = line[1].trim();
  if (value === "false") return false;
  if (value === "true") return true;
  if (value === "null") return null;
  return value.replace(/^["']|["']$/g, "");
}
