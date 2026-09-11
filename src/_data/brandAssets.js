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

// Gold / multi-color marks keep their paint in the UI preview.
// Everything else is monochrome ink — theme the preview to text color.
const colorPreview = new Set(["shellui_doc_logo", "shellui_playground_logo", "shellui_logo"]);

const labels = {
  logo: "Shellui mark",
  shellui_documentation_logo: "Documentation wordmark",
  shellui_playground_text_logo: "Playground wordmark",
  shellui_files_text_logo: "Files wordmark",
};

function formatLabel(baseName) {
  if (labels[baseName]) return labels[baseName];
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

  const formats = assetsByBase.get(baseName)?.formats ?? [];
  formats.push({
    file,
    href: `/img/brand-assets/${file}`,
    ext,
  });
  formats.sort((a, b) => a.ext.localeCompare(b.ext));

  assetsByBase.set(baseName, {
    baseName,
    label: formatLabel(baseName),
    // Always theme-aware checkerboard so dark mode tiles match.
    preview: "auto",
    // Monochrome marks follow text color in the UI; color marks stay as painted.
    previewTheme: !colorPreview.has(baseName),
    previewPreferPng: baseName === "shellui_playground_logo" || baseName === "shellui_logo",
    // Prefer SVG for the in-page preview when present.
    previewHref: (() => {
      const preferPng = baseName === "shellui_playground_logo" || baseName === "shellui_logo";
      if (preferPng) {
        return (
          formats.find((f) => f.ext === "PNG")?.href ??
          formats.find((f) => f.ext === "SVG")?.href ??
          formats[0]?.href
        );
      }
      return (
        formats.find((f) => f.ext === "SVG")?.href ??
        formats[0]?.href ??
        `/img/brand-assets/${file}`
      );
    })(),
    formats,
  });
}

const grouped = groups
  .map((group) => ({
    name: group.name,
    items: group.bases
      .map((base) => assetsByBase.get(base))
      .filter(Boolean),
  }))
  .filter((group) => group.items.length > 0);

const usedBases = new Set(groups.flatMap((group) => group.bases));
const otherItems = [...assetsByBase.entries()]
  .filter(([base]) => !usedBases.has(base))
  .map(([, item]) => item);

if (otherItems.length > 0) {
  grouped.push({ name: "Other", items: otherItems });
}

export default grouped;
