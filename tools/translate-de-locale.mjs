#!/usr/bin/env node
/**
 * One-off helper: translate English locale stubs to German via Google Translate API (unofficial).
 * Preserves code fences, inline code, nunjucks, URLs, and {{ }} expressions.
 */
import fs from "node:fs";
import path from "node:path";
import { fileURLToPath } from "node:url";

const root = path.dirname(fileURLToPath(import.meta.url));
const workspace = path.join(root, "..");

const TARGETS = [];
function walk(dir) {
  for (const name of fs.readdirSync(dir)) {
    const full = path.join(dir, name);
    if (fs.statSync(full).isDirectory()) walk(full);
    else if (/\.(njk|md)$/i.test(name) && name !== "de.json") TARGETS.push(full);
  }
}
walk(path.join(workspace, "src/de"));
for (const name of fs.readdirSync(path.join(workspace, "content/locales/de/guidelines"))) {
  if (name.endsWith(".md")) TARGETS.push(path.join(workspace, "content/locales/de/guidelines", name));
}

const PH = "\uE000";
const slots = [];

function stash(text) {
  const id = slots.length;
  slots.push(text);
  return `${PH}${id}${PH}`;
}

function protectAll(raw) {
  let s = raw;
  s = s.replace(/```[\s\S]*?```/g, (m) => stash(m));
  s = s.replace(/\{%[\s\S]*?%\}/g, (m) => stash(m));
  s = s.replace(/\{\{[\s\S]*?\}\}/g, (m) => stash(m));
  s = s.replace(/`[^`\n]+`/g, (m) => stash(m));
  s = s.replace(/https?:\/\/[^\s"'<>]+/g, (m) => stash(m));
  s = s.replace(/mailto:[^\s"'<>]+/g, (m) => stash(m));
  return s;
}

function restoreAll(s) {
  return s.replace(new RegExp(`${PH}(\\d+)${PH}`, "g"), (_, n) => slots[Number(n)] ?? _);
}

async function translateText(text) {
  const trimmed = text.trim();
  if (!trimmed) return text;
  if (!/[A-Za-z]{3}/.test(trimmed)) return text;
  const url = `https://translate.googleapis.com/translate_a/single?client=gtx&sl=en&tl=de&dt=t&q=${encodeURIComponent(trimmed)}`;
  const res = await fetch(url);
  if (!res.ok) throw new Error(`HTTP ${res.status}`);
  const data = await res.json();
  const out = data[0].map((x) => x[0]).join("");
  return text.replace(trimmed, out);
}

const FM_KEYS = new Set([
  "title",
  "description",
  "heading",
  "lede",
  "eyebrow",
  "imageAlt",
  "authorRole",
  "category",
]);

async function translateFrontmatter(fm) {
  const lines = fm.split("\n");
  const out = [];
  for (const line of lines) {
    const m = line.match(/^(\s*([\w-]+):\s*)(.*)$/);
    if (!m || !FM_KEYS.has(m[2])) {
      out.push(line);
      continue;
    }
    const [, prefix, , rest] = m;
    let val = rest.trim();
    let quote = "";
    if (
      (val.startsWith('"') && val.endsWith('"')) ||
      (val.startsWith("'") && val.endsWith("'"))
    ) {
      quote = val[0];
      val = val.slice(1, -1);
    }
    slots.length = 0;
    const protectedVal = protectAll(val);
    const tr = await translateText(protectedVal);
    out.push(`${prefix}${quote}${restoreAll(tr)}${quote}`);
    await sleep(80);
  }
  return out.join("\n");
}

function sleep(ms) {
  return new Promise((r) => setTimeout(r, ms));
}

async function translateHtmlLine(line) {
  if (!/[A-Za-z]{4}/.test(line)) return line;
  if (line.includes(PH)) return line;
  return line.replace(/>([^<>{]+)</g, async (full, inner) => {
    if (!/[A-Za-z]{3}/.test(inner)) return full;
    slots.length = 0;
    const p = protectAll(inner);
    const tr = await translateText(p.trim());
    return `>${restoreAll(tr)}<`;
  });
}

async function translateBodyLines(body) {
  const lines = body.split("\n");
  const out = [];
  let inFence = false;
  for (let line of lines) {
    if (line.trim().startsWith("```")) {
      inFence = !inFence;
      out.push(line);
      continue;
    }
    if (inFence) {
      out.push(line);
      continue;
    }
    if (line.trim().startsWith("{#")) {
      out.push(line);
      continue;
    }
    // HTML / njk mixed lines
    if (/<[a-zA-Z]/.test(line) && />[^<]+</.test(line)) {
      let acc = line;
      const parts = [];
      acc = acc.replace(/>([^<]+)</g, (match, inner) => {
        if (!/[A-Za-z]{3}/.test(inner) || inner.includes(PH)) return match;
        parts.push(inner);
        return `>${PH}X${parts.length - 1}${PH}<`;
      });
      for (let i = 0; i < parts.length; i++) {
        slots.length = 0;
        const p = protectAll(parts[i]);
        parts[i] = restoreAll(await translateText(p.trim()));
        await sleep(60);
      }
      acc = acc.replace(new RegExp(`${PH}X(\\d+)${PH}`, "g"), (_, i) => `>${parts[Number(i)]}<`);
      out.push(acc);
      continue;
    }
    // Markdown headings and paragraphs
    if (/^(#{1,6}\s+)?[A-Za-z]/.test(line.trim())) {
      slots.length = 0;
      const p = protectAll(line);
      out.push(restoreAll(await translateText(p)));
      await sleep(60);
      continue;
    }
    out.push(line);
  }
  return out.join("\n");
}

async function translateFile(file) {
  const raw = fs.readFileSync(file, "utf8");
  let body = raw;
  let fm = "";
  if (raw.startsWith("---\n")) {
    const end = raw.indexOf("\n---\n", 4);
    if (end !== -1) {
      fm = raw.slice(4, end);
      body = raw.slice(end + 5);
    }
  }
  const newFm = fm ? await translateFrontmatter(fm) : "";
  const newBody = await translateBodyLines(body);
  const out = fm ? `---\n${newFm}\n---\n${newBody}` : newBody;
  fs.writeFileSync(file, out.replace(/\bShell UI\b/g, "Shellui"));
  console.log("translated", path.relative(workspace, file));
}

for (const file of TARGETS) {
  await translateFile(file);
}
