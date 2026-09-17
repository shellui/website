import fs from "node:fs";
import path from "node:path";
import { fileURLToPath } from "node:url";

const root = path.dirname(fileURLToPath(import.meta.url));
const assetsDir = path.join(root, "../../img/brand-assets");

const groups = [
  { name: "Icon mark", bases: ["logo"] },
  { name: "Primary logo", bases: ["shellui_logo"] },
  { name: "Transparent background", bases: ["shellui_transparent_logo"] },
  { name: "Documentation", bases: ["shellui_doc_logo"] },
  {
    name: "iOS icons",
    caption: "iOS / app icons for occasional use (Tauri, stores, marketing).",
    bases: [
      "shellui_ios_icon_black",
      "shellui_ios_icon_white",
      "shellui_ios_icon_gold",
    ],
    columns: 3,
  },
];

/** Product sub-brand files kept in the repo but not offered in the press kit. */
const omittedBases = new Set([
  "shellui_documentation_logo",
  "shellui_playground_logo",
  "shellui_playground_text_logo",
  "shellui_files_text_logo",
]);

const labels = {
  logo: "Shellui mark",
  shellui_doc_logo: "Documentation logo",
  shellui_ios_icon_black: "iOS icon (black)",
  shellui_ios_icon_white: "iOS icon (white)",
  shellui_ios_icon_gold: "iOS icon (gold)",
};

/** Dark / black artwork needs a light preview (not pure white). */
const lightArtwork = new Set([
  "logo",
  "shellui_transparent_logo",
  "shellui_ios_icon_black",
  "shellui_ios_icon_gold",
]);

/** White / light artwork needs a mid dark preview (not near-black). */
const darkArtwork = new Set(["shellui_ios_icon_white"]);

const extOrder = { SVG: 0, PNG: 1 };

function formatLabel(baseName) {
  if (labels[baseName]) return labels[baseName];
  return baseName
    .replace(/^shellui_/, "")
    .replace(/_/g, " ")
    .replace(/\b\w/g, (char) => char.toUpperCase());
}

function previewFor(baseName) {
  if (lightArtwork.has(baseName)) return "light";
  if (darkArtwork.has(baseName)) return "dark";
  return "auto";
}

function sortFormats(a, b) {
  return (extOrder[a.ext] ?? 99) - (extOrder[b.ext] ?? 99) || a.ext.localeCompare(b.ext);
}

const files = fs.readdirSync(assetsDir).filter((file) => !file.startsWith("."));

const assetsByBase = new Map();

for (const file of files) {
  const ext = path.extname(file).slice(1).toUpperCase();
  const baseName = path.basename(file, path.extname(file));
  const format = {
    file,
    href: `/img/brand-assets/${file}`,
    ext,
  };

  const existing = assetsByBase.get(baseName);
  if (existing) {
    existing.formats.push(format);
  } else {
    assetsByBase.set(baseName, {
      baseName,
      label: formatLabel(baseName),
      preview: previewFor(baseName),
      formats: [format],
    });
  }
}

for (const asset of assetsByBase.values()) {
  asset.formats.sort(sortFormats);
  // Prefer SVG for on-page preview when both exist.
  asset.href = asset.formats[0].href;
  asset.exts = asset.formats.map((format) => format.ext).join(" · ");
}

const grouped = groups
  .map((group) => ({
    name: group.name,
    caption: group.caption ?? null,
    columns: group.columns ?? 2,
    items: group.bases
      .map((base) => assetsByBase.get(base))
      .filter(Boolean),
  }))
  .filter((group) => group.items.length > 0);

const usedBases = new Set(groups.flatMap((group) => group.bases));
const otherItems = [...assetsByBase.entries()]
  .filter(([base]) => !usedBases.has(base) && !omittedBases.has(base))
  .map(([, asset]) => asset);

if (otherItems.length > 0) {
  grouped.push({ name: "Other", caption: null, columns: 2, items: otherItems });
}

export default grouped;
