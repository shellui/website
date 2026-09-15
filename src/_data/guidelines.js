import fs from "node:fs";
import path from "node:path";
import { fileURLToPath } from "node:url";
import MarkdownIt from "markdown-it";

const root = path.dirname(fileURLToPath(import.meta.url));
const contentDir = path.join(root, "../../content/guidelines");

const catalog = [
  {
    slug: "writing",
    href: "/guidelines/writing/",
    skillPath: "skills/writing-guidelines/SKILL.md",
    navLabel: "Writing",
    downloadName: "writing.md",
  },
  {
    slug: "web-design",
    href: "/guidelines/web-design/",
    skillPath: "skills/web-design-guidelines/SKILL.md",
    navLabel: "Web design",
    downloadName: "web-design.md",
  },
  {
    slug: "design",
    href: "/guidelines/design/",
    skillPath: "skills/design-md/SKILL.md",
    navLabel: "Design",
    downloadName: "design.md",
    publicUrl: "/design.md",
  },
];

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

function tableWrapPlugin(md) {
  const defaultOpen =
    md.renderer.rules.table_open ||
    function (tokens, idx, options, env, self) {
      return self.renderToken(tokens, idx, options);
    };
  const defaultClose =
    md.renderer.rules.table_close ||
    function (tokens, idx, options, env, self) {
      return self.renderToken(tokens, idx, options);
    };
  md.renderer.rules.table_open = (...args) =>
    '<div class="prose-table-wrap">' + defaultOpen(...args);
  md.renderer.rules.table_close = (...args) =>
    defaultClose(...args) + "</div>";
}

const md = new MarkdownIt({
  html: false,
  linkify: true,
  typographer: false,
});
md.use(headingPlugin);
md.use(tableWrapPlugin);

function loadTopic(entry) {
  const sourcePath = `content/guidelines/${entry.slug}.md`;
  const raw = fs.readFileSync(path.join(contentDir, `${entry.slug}.md`), "utf8");
  const { data, body } = parseFrontmatter(raw);
  return {
    ...entry,
    version: data.version || "1.0.0",
    title: data.title || entry.navLabel,
    description: data.description || "",
    html: md.render(body),
    toc: extractToc(body),
    downloadUrl: entry.publicUrl || `/guidelines/${entry.downloadName}`,
    sourcePath,
    publicUrl: entry.publicUrl || `/guidelines/${entry.downloadName}`,
  };
}

const topics = catalog.map(loadTopic);

export default {
  topics,
  bySlug: Object.fromEntries(topics.map((topic) => [topic.slug, topic])),
  parentSkillPath: "skills/guidelines/SKILL.md",
};
