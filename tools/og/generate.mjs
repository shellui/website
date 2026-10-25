import fs from "node:fs";
import path from "node:path";
import { fileURLToPath } from "node:url";
import { readLayoutFromFile } from "./front-matter.mjs";
import { mergePageDataForOg } from "./page-data.mjs";
import { resolveOgMeta, shouldGenerateOgForTemplate } from "./resolve-meta.mjs";
import { renderOgPng } from "./render.mjs";
import { hasGluedSentenceBoundary } from "./text.mjs";

const root = path.join(path.dirname(fileURLToPath(import.meta.url)), "../..");

/**
 * Generate OG PNGs for Eleventy template results into outputDir/og/.
 * Always re-renders PNGs at build time (no read-from-cache) so output matches current templates.
 */
export async function generateOgImages(outputDir, templates) {
  const ogDir = path.join(outputDir, "og");
  fs.mkdirSync(ogDir, { recursive: true });

  let generated = 0;
  let skipped = 0;

  const seen = new Set();
  const audit = [];

  for (const template of templates) {
    const layoutFromFile = readLayoutFromFile(template.inputPath);
    if (!shouldGenerateOgForTemplate(template, layoutFromFile)) {
      skipped += 1;
      continue;
    }

    const data = await mergePageDataForOg(template);
    const meta = resolveOgMeta(data);
    if (meta.useCustomImage) {
      skipped += 1;
      continue;
    }

    if (hasGluedSentenceBoundary(meta.title)) {
      throw new Error(`OG title has glued sentence boundary for ${meta.url}: ${meta.title}`);
    }
    if (hasGluedSentenceBoundary(meta.description)) {
      throw new Error(
        `OG description has glued sentence boundary for ${meta.url}: ${meta.description}`,
      );
    }

    const outFile = path.join(ogDir, `${path.basename(meta.path)}`);
    if (seen.has(outFile)) continue;
    seen.add(outFile);

    const png = await renderOgPng(meta);
    fs.writeFileSync(outFile, png);
    generated += 1;

    audit.push({
      url: meta.url,
      template: meta.template,
      title: meta.title,
      description: meta.description || "",
    });

    const pageTitle = data.title ? String(data.title).replace(/\s*\|\s*Shellui\s*$/i, "").trim() : "";
    if (
      meta.title === "Shellui" &&
      pageTitle &&
      pageTitle.toLowerCase() !== "shellui"
    ) {
      throw new Error(
        `OG title fell back to "Shellui" for ${meta.url} (page title: ${data.title}). Check front matter merge.`,
      );
    }
  }

  audit.sort((a, b) => a.url.localeCompare(b.url));
  console.log(`[og] Generated ${generated} Open Graph images (${skipped} skipped):`);
  for (const row of audit) {
    console.log(`[og]   ${row.url}  [${row.template}]  ${row.title}`);
    console.log(`[og]       description: ${row.description || "(empty)"}`);
  }

  return { generated, skipped, cached: 0, audit };
}
