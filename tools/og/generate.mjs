import { createHash } from "node:crypto";
import fs from "node:fs";
import path from "node:path";
import { fileURLToPath } from "node:url";
import { resolveOgMeta, shouldGenerateOgForTemplate } from "./resolve-meta.mjs";
import { renderOgPng } from "./render.mjs";

const root = path.join(path.dirname(fileURLToPath(import.meta.url)), "../..");
const cacheDir = path.join(root, ".cache/og");

function payloadHash(meta) {
  return createHash("sha256").update(JSON.stringify(meta)).digest("hex").slice(0, 16);
}

function readCache(hash) {
  const file = path.join(cacheDir, `${hash}.png`);
  if (fs.existsSync(file)) return fs.readFileSync(file);
  return null;
}

function writeCache(hash, buffer) {
  fs.mkdirSync(cacheDir, { recursive: true });
  fs.writeFileSync(path.join(cacheDir, `${hash}.png`), buffer);
}

/**
 * Generate OG PNGs for Eleventy template results into outputDir/og/.
 * @param {string} outputDir
 * @param {Array} templates
 * @returns {Promise<{ generated: number, skipped: number, cached: number }>}
 */
export async function generateOgImages(outputDir, templates) {
  const ogDir = path.join(outputDir, "og");
  fs.mkdirSync(ogDir, { recursive: true });

  let generated = 0;
  let skipped = 0;
  let cached = 0;

  const seen = new Set();

  for (const template of templates) {
    if (!shouldGenerateOgForTemplate(template)) {
      skipped += 1;
      continue;
    }

    const data = template.data || {};
    const meta = resolveOgMeta({ ...data, page: { url: template.url } });
    if (meta.useCustomImage) {
      skipped += 1;
      continue;
    }

    const outFile = path.join(ogDir, `${path.basename(meta.path)}`);
    if (seen.has(outFile)) continue;
    seen.add(outFile);

    const hash = payloadHash({
      template: meta.template,
      title: meta.title,
      description: meta.description,
      sectionLabel: meta.sectionLabel,
      category: meta.category,
      badge: meta.badge,
      blogMeta: meta.blogMeta,
      changelog: meta.changelog,
      footerUrl: meta.footerUrl,
    });

    let png = readCache(hash);
    if (png) {
      cached += 1;
    } else {
      png = await renderOgPng(meta);
      writeCache(hash, png);
      generated += 1;
    }
    fs.writeFileSync(outFile, png);
  }

  return { generated, skipped, cached };
}
