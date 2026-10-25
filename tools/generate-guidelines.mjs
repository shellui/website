#!/usr/bin/env node
/** Sync guideline aliases: design.md (agent), web-design.md (forever alias). */
import fs from "node:fs";
import path from "node:path";
import { fileURLToPath } from "node:url";

const root = path.join(path.dirname(fileURLToPath(import.meta.url)), "..");
const interfacePath = path.join(root, "content/guidelines/interface.md");
const interfaceBody = fs.readFileSync(interfacePath, "utf8");

const aliasFront = `---
title: Design
description: Stable agent alias for Interface plus Foundations token summary. Fetch this file first when building Shellui pages.
version: 2.0.0
updated: 2026-10-25
canonical: /design.md
related: /guidelines/interface/, /guidelines/foundations/
---

Act as an excellent Shellui designer, editor, and information architect. Turn the available material into an official Shellui-authored page. Shape the argument and the interface together. Do not restyle a dump of sections or assemble a generic landing page.

Fetch this file at \`https://shellui.com/design.md\`. It is the composition authority for agents. Humans use \`/guidelines/interface/\` and \`/guidelines/foundations/\`. Full rules live in [interface.md](/guidelines/interface.md).

- Writing: \`https://shellui.com/guidelines/writing.md\`
- Foundations (tokens): \`https://shellui.com/guidelines/foundations.md\`
- Brand (logos): \`https://shellui.com/guidelines/brand.md\`
- Print: \`https://shellui.com/guidelines/print.md\`

## Tokens (summary)

Gray canvas. Honey gold is the action color. A soft primary wash behind the homepage hero is brand ambient, not a gold field. Prefer token utilities (\`bg-background\`, \`text-foreground\`, \`border-border\`, \`bg-muted\`, \`text-muted-foreground\`, \`bg-primary\`, \`text-primary-foreground\`, \`text-primary-ink\`, \`bg-card\`). \`primary-ink\` remaps in dark mode.

<!-- tokens:begin -->
| Token | Light | Dark | Role |
| --- | --- | --- | --- |
| placeholder | | | |
<!-- tokens:end -->

Type: Inter on screen. One \`h1\` per page. Lede \`text-lg text-muted-foreground\`. Body \`text-base/7\`. Button: \`rounded-md bg-primary px-3.5 py-2.5 text-sm font-semibold text-primary-foreground\`. Gold is scarce. Widths: \`max-w-7xl\` feature chrome, \`max-w-5xl\` guidelines, \`max-w-3xl\` reading prose. Horizontal shell: \`.page-x\` on the outer band only.

## Interface (full rules)

The sections below mirror \`/guidelines/interface.md\` for offline agents. Prefer fetching interface.md when online.

`;

function stripFrontmatter(md) {
  if (!md.startsWith("---")) return md;
  const end = md.indexOf("\n---\n", 4);
  if (end === -1) return md;
  return md.slice(end + 5);
}

const interfaceContent = stripFrontmatter(interfaceBody);
const designMd = aliasFront + interfaceContent;
fs.writeFileSync(path.join(root, "content/guidelines/design.md"), designMd);

const webAliasFront = `---
title: Web design guidelines (alias)
description: Forever alias for Interface guidelines. Use /guidelines/interface/ for new work.
version: 2.0.0
updated: 2026-10-25
canonical: /guidelines/interface/
---

This file is a stable alias for [Interface](/guidelines/interface/). New work should link to \`/guidelines/interface/\`.

`;

fs.writeFileSync(
  path.join(root, "content/guidelines/web-design.md"),
  webAliasFront + interfaceContent,
);

console.log("OK: generated design.md and web-design.md aliases");
