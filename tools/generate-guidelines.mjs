#!/usr/bin/env node
/** Sync guideline aliases: trimmed design.md (agent), web-design.md (forever alias copy). */
import fs from "node:fs";
import path from "node:path";
import { fileURLToPath } from "node:url";

const root = path.join(path.dirname(fileURLToPath(import.meta.url)), "..");
const interfacePath = path.join(root, "content/guidelines/interface.md");
const interfaceBody = fs.readFileSync(interfacePath, "utf8");

const MAX_DESIGN_BYTES = 40 * 1024;

/** Section ## headings copied into design.md (agent composition authority). */
const DESIGN_SECTIONS = new Set([
  "Product",
  "Priority (when building pages)",
  "Stack",
  "Reuse",
  "Compose",
  "Reject (visual)",
]);

function stripFrontmatter(md) {
  if (!md.startsWith("---")) return md;
  const end = md.indexOf("\n---\n", 4);
  if (end === -1) return md;
  return md.slice(end + 5);
}

function extractSections(body, allowedHeadings) {
  const lines = body.split("\n");
  const chunks = [];
  let capture = false;
  let buf = [];

  for (const line of lines) {
    const h2 = line.match(/^## (.+)$/);
    if (h2) {
      if (capture && buf.length) chunks.push(buf.join("\n").trim());
      const title = h2[1].trim();
      capture = allowedHeadings.has(title);
      buf = capture ? [line] : [];
      continue;
    }
    if (capture) buf.push(line);
  }
  if (capture && buf.length) chunks.push(buf.join("\n").trim());
  return chunks.join("\n\n");
}

const body = stripFrontmatter(interfaceBody);
const core = extractSections(body, DESIGN_SECTIONS);

const designFront = `---
title: Design
description: Agent composition authority for Shellui pages. Trimmed alias; full Interface rules live on interface.md.
version: 2.0.0
updated: 2026-10-25
canonical: /design.md
related: /guidelines/interface/, /guidelines/foundations/
---

Act as an excellent Shellui designer, editor, and information architect. Turn the available material into an official Shellui-authored page. Shape the argument and the interface together. Do not restyle a dump of sections or assemble a generic landing page.

Fetch this file at \`https://shellui.com/design.md\` when building or restyling pages. It is the **trimmed** composition authority. Do not scrape HTML handbooks.

**Full Interface rules** (chrome, accessibility, forms, motion, performance, review format): [\`https://shellui.com/guidelines/interface.md\`](https://shellui.com/guidelines/interface.md)

| Topic | URL |
| --- | --- |
| Writing | \`https://shellui.com/guidelines/writing.md\` |
| Foundations (tokens) | \`https://shellui.com/guidelines/foundations.md\` |
| Brand (logos) | \`https://shellui.com/guidelines/brand.md\` |
| Print | \`https://shellui.com/guidelines/print.md\` |

## Tokens (summary)

Gray canvas. Honey gold is the action color. A soft primary wash behind the homepage hero is brand ambient, not a gold field. Prefer token utilities (\`bg-background\`, \`text-foreground\`, \`border-border\`, \`bg-muted\`, \`text-muted-foreground\`, \`bg-primary\`, \`text-primary-foreground\`, \`text-primary-ink\`, \`bg-card\`). \`primary-ink\` remaps in dark mode.

<!-- tokens:begin -->
| Token | Light | Dark | Role |
| --- | --- | --- | --- |
| placeholder | | | |
<!-- tokens:end -->

Type: Inter on screen. One \`h1\` per page. Lede \`text-lg text-muted-foreground\`. Body \`text-base/7\`. Button: \`rounded-md bg-primary px-3.5 py-2.5 text-sm font-semibold text-primary-foreground\`. Gold is scarce. Widths: \`max-w-7xl\` feature chrome, \`max-w-5xl\` guidelines, \`max-w-3xl\` reading prose. Horizontal shell: \`.page-x\` on the outer band only.

`;

const designMd = `${designFront}${core}\n`;
const designPath = path.join(root, "content/guidelines/design.md");
fs.writeFileSync(designPath, designMd);

if (Buffer.byteLength(designMd, "utf8") > MAX_DESIGN_BYTES) {
  console.error(
    `ERROR: design.md is ${Buffer.byteLength(designMd, "utf8")} bytes; keep under ${MAX_DESIGN_BYTES}`,
  );
  process.exit(1);
}

const webAliasFront = `---
title: Web design guidelines (alias)
description: Forever alias for Interface. Canonical page is /guidelines/interface/.
version: 2.0.0
updated: 2026-10-25
canonical: /guidelines/interface/
---

Stable alias for agents and bookmarks. **Canonical Interface handbook:** [\`/guidelines/interface/\`](/guidelines/interface/) and [\`interface.md\`](https://shellui.com/guidelines/interface.md).

When **composing pages**, prefer [\`design.md\`](https://shellui.com/design.md) first, then fetch the full file below for UI, accessibility, and chrome detail.

`;

fs.writeFileSync(
  path.join(root, "content/guidelines/web-design.md"),
  webAliasFront + body,
);

console.log(
  `OK: design.md (${Buffer.byteLength(designMd, "utf8")} bytes) and web-design.md aliases`,
);
