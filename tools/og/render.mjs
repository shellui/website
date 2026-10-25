import fs from "node:fs";
import path from "node:path";
import { fileURLToPath } from "node:url";
import React from "react";
import satori from "satori";
import { Resvg } from "@resvg/resvg-js";
import { OG_WIDTH, OG_HEIGHT } from "./constants.mjs";
import { DefaultTemplate } from "./templates/default.mjs";
import { DocsTemplate } from "./templates/docs.mjs";
import { BlogTemplate } from "./templates/blog.mjs";
import { ChangelogTemplate } from "./templates/changelog.mjs";

const root = path.join(path.dirname(fileURLToPath(import.meta.url)), "../..");
const fontDir = path.join(root, "node_modules/@fontsource/inter/files");

let fontsPromise;

function loadFonts() {
  if (!fontsPromise) {
    fontsPromise = Promise.resolve([
      {
        name: "Inter",
        data: fs.readFileSync(path.join(fontDir, "inter-latin-400-normal.woff")),
        weight: 400,
        style: "normal",
      },
      {
        name: "Inter",
        data: fs.readFileSync(path.join(fontDir, "inter-latin-500-normal.woff")),
        weight: 500,
        style: "normal",
      },
      {
        name: "Inter",
        data: fs.readFileSync(path.join(fontDir, "inter-latin-600-normal.woff")),
        weight: 600,
        style: "normal",
      },
      {
        name: "Inter",
        data: fs.readFileSync(path.join(fontDir, "inter-latin-700-normal.woff")),
        weight: 700,
        style: "normal",
      },
    ]);
  }
  return fontsPromise;
}

function pickTemplate(meta) {
  switch (meta.template) {
    case "docs":
      return DocsTemplate(meta);
    case "blog":
      return BlogTemplate(meta);
    case "changelog":
      return ChangelogTemplate(meta);
    default:
      return DefaultTemplate(meta);
  }
}

export async function renderOgPng(meta) {
  const fonts = await loadFonts();
  const element = React.createElement(
    "div",
    {
      style: {
        width: OG_WIDTH,
        height: OG_HEIGHT,
        display: "flex",
      },
    },
    pickTemplate(meta),
  );
  const svg = await satori(element, {
    width: OG_WIDTH,
    height: OG_HEIGHT,
    fonts,
  });
  const png = new Resvg(svg, {
    fitTo: { mode: "width", value: OG_WIDTH },
  })
    .render()
    .asPng();
  return png;
}
