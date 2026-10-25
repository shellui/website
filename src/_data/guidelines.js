import fs from "node:fs";
import path from "node:path";
import { fileURLToPath } from "node:url";
import MarkdownIt from "markdown-it";

const root = path.dirname(fileURLToPath(import.meta.url));
const contentDir = path.join(root, "../../content/guidelines");

const catalog = [
  {
    slug: "brand",
    href: "/guidelines/brand/",
    navLabel: "Brand",
    downloadName: "brand.md",
    hubDescription:
      "Name, logo, colors, and voice, plus the brand kit PDF, asset zip, and logo files.",
  },
  {
    slug: "foundations",
    href: "/guidelines/foundations/",
    navLabel: "Foundations",
    downloadName: "foundations.md",
    hubDescription:
      "Shared color, type, spacing, and corner radius for the website and print.",
    visualHandbook: true,
  },
  {
    slug: "writing",
    href: "/guidelines/writing/",
    navLabel: "Writing",
    downloadName: "writing.md",
    hubDescription: "Voice, structure, and punctuation for Shellui copy.",
  },
  {
    slug: "interface",
    href: "/guidelines/interface/",
    navLabel: "Interface",
    downloadName: "interface.md",
    publicUrl: "/guidelines/interface.md",
    hubDescription:
      "Layout, components, accessibility, and visual language for web and in-shell apps.",
    agentAliasUrl: "/design.md",
  },
  {
    slug: "print",
    href: "/guidelines/print/",
    navLabel: "Print",
    downloadName: "print.md",
    hubDescription: "Grids, type, color, Pantone, and paper for PDFs and collateral.",
  },
  {
    slug: "changelog",
    href: "/guidelines/changelog/",
    navLabel: "Changelog",
    downloadName: "changelog.md",
    hubDescription: "Version history for all public guideline topics.",
    hubOnly: false,
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
      .replace(/\s*\{#.+?\}\s*$/, "")
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
    version: data.version || "2.0.0",
    title: data.title || entry.navLabel,
    description: data.description || "",
    hubDescription: entry.hubDescription || data.description || "",
    humanDescription: entry.humanDescription || data.description || "",
    html: md.render(body),
    rawBody: body.trim(),
    toc: extractToc(body),
    downloadUrl: entry.publicUrl || `/guidelines/${entry.downloadName}`,
    sourcePath,
    publicUrl: entry.publicUrl || `/guidelines/${entry.downloadName}`,
    ogImage: entry.ogImage || `/brand-assets/og/og-guidelines-${entry.slug}.png`,
  };
}

const topics = catalog.map(loadTopic);

export default {
  topics,
  bySlug: Object.fromEntries(topics.map((topic) => [topic.slug, topic])),
  versionsNote: "All guideline topics are 2.0.0 in this release.",
};
