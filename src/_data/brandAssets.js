import fs from "node:fs";
import path from "node:path";
import { fileURLToPath } from "node:url";

const root = path.dirname(fileURLToPath(import.meta.url));
const assetsDir = path.join(root, "../../img/brand-assets");

const groups = [
  { name: "Primary logo", bases: ["shellui_logo"] },
  { name: "Transparent background", bases: ["shellui_transparent_logo"] },
  { name: "Documentation", bases: ["shellui_doc_logo"] },
  { name: "Playground", bases: ["shellui_playground_logo"] },
  { name: "Icon mark", bases: ["logo"] },
];

function formatLabel(baseName) {
  if (baseName === "logo") return "Shellui mark";
  return baseName
    .replace(/^shellui_/, "")
    .replace(/_/g, " ")
    .replace(/\b\w/g, (char) => char.toUpperCase());
}

const files = fs.readdirSync(assetsDir).filter((file) => !file.startsWith("."));

const assetsByBase = new Map();

for (const file of files) {
  const ext = path.extname(file).slice(1).toUpperCase();
  const baseName = path.basename(file, path.extname(file));

  assetsByBase.set(baseName, [
    ...(assetsByBase.get(baseName) ?? []),
    {
      file,
      href: `/img/brand-assets/${file}`,
      ext,
      baseName,
      label: formatLabel(baseName),
    },
  ]);
}

for (const items of assetsByBase.values()) {
  items.sort((a, b) => a.ext.localeCompare(b.ext));
}

const grouped = groups
  .map((group) => ({
    name: group.name,
    items: group.bases.flatMap((base) => assetsByBase.get(base) ?? []),
  }))
  .filter((group) => group.items.length > 0);

const usedBases = new Set(groups.flatMap((group) => group.bases));
const otherItems = [...assetsByBase.entries()]
  .filter(([base]) => !usedBases.has(base))
  .flatMap(([, items]) => items);

if (otherItems.length > 0) {
  grouped.push({ name: "Other", items: otherItems });
}

export default grouped;
