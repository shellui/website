#!/usr/bin/env node
/**
 * Translate locale markdown preserving code, URLs, and protected tokens.
 * Usage: node tools/translate-it-md.mjs <src> <dest>
 */
import fs from "node:fs";
import path from "node:path";

const [src, dest] = process.argv.slice(2);
if (!src || !dest) {
  console.error("Usage: node translate-it-md.mjs <src> <dest>");
  process.exit(1);
}

const PROTECT =
  /(`[^`]+`|\[[^\]]*\]\([^)]+\)|https?:\/\/[^\s)]+|@[\w/-]+|\/[\w./-]+|\*\*Shellui\*\*|Shellui|identity-service|storage-service|hosting-service|LocalizedString|MCP|JWT|JWKS|OAuth|FADP|revDSG|MIT|GitHub|Supabase|Tauri|Radix|Tailwind|Eleventy|Nunjucks|Alpine|shadcn|i18next|i18n|iframe|npm|CLI|SDK|API|HTML|CSS|JSON|YAML|WCAG|AA|RSS|PNG|SVG|Docker|S3|RSA|Settings → [^.,]+|content\/guidelines\/[\w.-]+|skills\/[\w./-]+|<[^>]+>|\{[^}]+\}|#[\w-]+|"[^"]*"|'[^']*'|\b[a-z]+-[a-z]+(?:-[a-z]+)*\b)/gi;

function splitProtected(text) {
  const parts = [];
  let last = 0;
  const re = new RegExp(PROTECT.source, "gi");
  let m;
  while ((m = re.exec(text)) !== null) {
    if (m.index > last) parts.push({ t: text.slice(last, m.index), p: false });
    parts.push({ t: m[0], p: true });
    last = m.index + m[0].length;
  }
  if (last < text.length) parts.push({ t: text.slice(last), p: false });
  return parts;
}

async function translateChunk(text) {
  const trimmed = text.trim();
  if (!trimmed) return text;
  const url =
    "https://translate.googleapis.com/translate_a/single?client=gtx&sl=en&tl=it&dt=t&q=" +
    encodeURIComponent(trimmed);
  for (let attempt = 0; attempt < 5; attempt++) {
    try {
      const res = await fetch(url);
      if (!res.ok) throw new Error(String(res.status));
      const data = await res.json();
      const out = data[0].map((x) => x[0]).join("");
      return text.replace(trimmed, out);
    } catch {
      await new Promise((r) => setTimeout(r, 1000 * (attempt + 1)));
    }
  }
  throw new Error("translate failed");
}

async function translateText(text) {
  const parts = splitProtected(text);
  let out = "";
  for (const part of parts) {
    if (part.p || !part.t.trim()) {
      out += part.t;
      continue;
    }
    out += await translateChunk(part.t);
    await new Promise((r) => setTimeout(r, 350));
  }
  return out;
}

const raw = fs.readFileSync(src, "utf8");
const fmEnd = raw.startsWith("---\n") ? raw.indexOf("\n---\n", 4) : -1;
let body = raw;
let front = "";
if (fmEnd !== -1) {
  front = raw.slice(0, fmEnd + 5);
  body = raw.slice(fmEnd + 5);
  const yaml = front.slice(4, fmEnd);
  const lines = yaml.split("\n");
  const translatedYaml = [];
  for (const line of lines) {
    if (/^(title|description):\s/.test(line)) {
      const key = line.slice(0, line.indexOf(":") + 1);
      const val = line.slice(key.length).trim();
      const unquoted = val.replace(/^["']|["']$/g, "");
      const tr = await translateText(unquoted);
      translatedYaml.push(`${key} ${JSON.stringify(tr.replace(/^"|"$/g, ""))}`);
    } else {
      translatedYaml.push(line);
    }
    await new Promise((r) => setTimeout(r, 200));
  }
  front = `---\n${translatedYaml.join("\n")}\n---\n`;
}

const paragraphs = body.split(/(\n\n+)/);
const outBody = [];
for (const para of paragraphs) {
  if (/^\n+$/.test(para) || para.startsWith("```")) {
    outBody.push(para);
    continue;
  }
  outBody.push(await translateText(para));
}

fs.mkdirSync(path.dirname(dest), { recursive: true });
fs.writeFileSync(dest, front + outBody.join(""));
console.log("Wrote", dest);
