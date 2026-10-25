import fs from "node:fs";
import path from "node:path";
import { fileURLToPath } from "node:url";

const root = path.join(path.dirname(fileURLToPath(import.meta.url)), "../..");

const MARK_INK = path.join(root, "brand-assets/logo/shellui-mark-ink.svg");

const cache = new Map();

const MARK_PATHS_SVG = `<svg xmlns="http://www.w3.org/2000/svg" viewBox="291.78 199.02 493.40 681.33"><g transform="matrix(1.28904,0,0,1.26641,-101.377,-56.7975)"><path fill="CURRENT" d="M509,202C493,202 478,207 461,221L338,340C316,361 305,382 305,407C305,433 315,458 333,480C350,500 373,516 393,517C397,518 401,517 405,513L656,263C670,249 677,238 678,226C679,216 676,209 671,205C667,203 662,202 654,202L509,202Z"/></g><g transform="matrix(1.28904,0,0,1.26641,-101.377,-56.7975)"><path fill="CURRENT" d="M599,419C586,422 575,431 562,444L320,695C312,703 308,711 310,720C312,732 320,739 331,740L482,740C500,740 513,736 526,725L646,607C670,584 683,559 687,531C690,506 684,480 672,460C661,439 645,425 628,420C618,417 608,417 599,419Z"/></g></svg>`;

function svgDataUri(svg) {
  return `data:image/svg+xml;base64,${Buffer.from(svg).toString("base64")}`;
}

function markSvgWithFill(fill) {
  return MARK_PATHS_SVG.replace(/CURRENT/g, fill);
}

export function markDataUri(variant = "ink") {
  if (cache.has(variant)) return cache.get(variant);

  let uri;
  if (variant === "ink") {
    uri = svgDataUri(fs.readFileSync(MARK_INK, "utf8"));
  } else if (variant === "white") {
    uri = svgDataUri(markSvgWithFill("#ffffff"));
  } else if (variant === "gold" || variant === "goldOnDark") {
    uri = svgDataUri(markSvgWithFill(variant === "goldOnDark" ? "#E8B84A" : "#E3A512"));
  } else if (variant === "watermarkLight") {
    uri = svgDataUri(markSvgWithFill("#F3F3F4"));
  } else if (variant === "watermarkDark") {
    uri = svgDataUri(markSvgWithFill("#111827"));
  } else {
    uri = svgDataUri(fs.readFileSync(MARK_INK, "utf8"));
  }

  cache.set(variant, uri);
  return uri;
}
