import fs from "node:fs";
import path from "node:path";
import { fileURLToPath } from "node:url";

const root = path.dirname(fileURLToPath(import.meta.url));
const assetsDir = path.join(root, "../../img/brand-assets");

const groups = [
  { name: "Icon mark", bases: ["logo"] },
  { name: "Primary logo", bases: ["shellui_logo"] },
  { name: "Transparent background", bases: ["shellui_transparent_logo"] },
  { name: "Documentation", bases: ["shellui_doc_logo", "shellui_documentation_logo"] },
  { name: "Playground", bases: ["shellui_playground_logo", "shellui_playground_text_logo"] },
  { name: "Files", bases: ["shellui_files_text_logo"] },
];

const labels = {
  logo: "Shellui mark",
  shellui_documentation_logo: "Documentation wordmark",
  shellui_playground_text_logo: "Playground wordmark",
  shellui_files_text_logo: "Files wordmark",
};

const lightArtwork = new Set([
  "logo",
  "shellui_transparent_logo",
  "shellui_documentation_logo",
  "shellui_playground_text_logo",
  "shellui_files_text_logo",
]);

function formatLabel(baseName) {
  if (labels[baseName]) return labels[baseName];
  return baseName
    .replace(/^shellui_/, "")
    .replace(/_/g, " ")
    .replace(/\b\w/g, (char) => char.toUpperCase());
}

function previewFor(baseName) {
  return lightArtwork.has(baseName) ? "light" : "auto";
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
      preview: previewFor(baseName),
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
