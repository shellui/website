import fs from "node:fs";
import path from "node:path";
import { fileURLToPath } from "node:url";
import MarkdownIt from "markdown-it";

const sourcePath = path.join(
  path.dirname(fileURLToPath(import.meta.url)),
  "../../content/guidelines/writing.md",
);

function parseFrontmatter(raw) {
  if (!raw.startsWith("---\n") && !raw.startsWith("---\r\n")) {
    return { data: {}, body: raw };
  }
  const normalized = raw.replace(/\r\n/g, "\n");
  const end = normalized.indexOf("\n---\n", 4);
  if (end === -1) return { data: {}, body: raw };
  const yaml = normalized.slice(4, end);
  const body = normalized.slice(end + 5);
  const data = {};
  for (const line of yaml.split("\n")) {
    const trimmed = line.trim();
    if (!trimmed || trimmed.startsWith("#")) continue;
    const idx = trimmed.indexOf(":");
    if (idx === -1) continue;
    const key = trimmed.slice(0, idx).trim();
    let value = trimmed.slice(idx + 1).trim();
    if (
      (value.startsWith('"') && value.endsWith('"')) ||
      (value.startsWith("'") && value.endsWith("'"))
    ) {
      value = value.slice(1, -1);
    }
    data[key] = value;
  }
  return { data, body };
}

function slugify(text) {
  return String(text)
    .replace(/<[^>]+>/g, "")
    .replace(/[`*_]/g, "")
    .trim()
    .toLowerCase()
    .replace(/&/g, "and")
    .replace(/[^a-z0-9\s-]/g, "")
    .replace(/\s+/g, "-")
    .replace(/-+/g, "-")
    .replace(/^-|-$/g, "");
}

function extractToc(body) {
  const toc = [];
  let inFence = false;
  for (const line of body.split("\n")) {
    if (line.trim().startsWith("```")) {
      inFence = !inFence;
      continue;
    }
    if (inFence) continue;
    const match = line.match(/^(#{2}) (.+)$/);
    if (!match) continue;
    const text = match[2]
      .replace(/\*\*|__/g, "")
      .replace(/`/g, "")
      .trim();
    toc.push({ text, id: slugify(text) });
  }
  return toc;
}

function headingPlugin(md) {
  md.core.ruler.push("shellui_heading_ids", (state) => {
    const tokens = state.tokens;
    for (let i = 0; i < tokens.length; i += 1) {
      const token = tokens[i];
      if (token.type !== "heading_open") continue;
      const inline = tokens[i + 1];
      if (!inline || inline.type !== "inline") continue;
      const id = slugify(inline.content);
      if (!id) continue;
      token.attrSet("id", id);
    }
  });
}

const raw = fs.readFileSync(sourcePath, "utf8");
const { data, body } = parseFrontmatter(raw);
const md = new MarkdownIt({
  html: false,
  linkify: true,
  typographer: false,
});
md.use(headingPlugin);

export default {
  version: data.version || "1.0.0",
  title: data.title || "Writing guidelines",
  description:
    data.description ||
    "Voice, tone, and review rules for Shellui website and docs prose.",
  html: md.render(body),
  toc: extractToc(body),
  downloadUrl: "/guidelines/writing.md",
  sourcePath: "content/guidelines/writing.md",
  skillPath: "skills/writing-guidelines/SKILL.md",
};
