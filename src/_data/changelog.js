import { readFileSync, writeFileSync, mkdirSync, existsSync, statSync } from "fs";
import { join, dirname } from "path";
import { fileURLToPath } from "url";

const CHANGELOG_URL =
  "https://raw.githubusercontent.com/shellui/shellui/refs/heads/main/CHANGELOG.md";

const GITHUB_REPO = "shellui/shellui";

const __dirname = dirname(fileURLToPath(import.meta.url));
const CACHE_DIR = join(__dirname, "..", "..", ".cache");
const CACHE_FILE = join(CACHE_DIR, "changelog.md");
const CACHE_MAX_AGE_MS = 1000 * 60 * 60; // 1 hour

function linkTickets(text) {
  return text.replace(
    /\(#(\d+)\)/g,
    `(<a href="https://github.com/${GITHUB_REPO}/issues/$1">#$1</a>)`,
  );
}

function parseChangelog(md) {
  const releases = [];
  let current = null;
  let currentSection = null;

  for (const raw of md.split("\n")) {
    const line = raw.trimEnd();

    const releaseMatch = line.match(
      /^## \[([^\]]+)\](?:\s*-\s*(\d{4}-\d{2}-\d{2}))?/,
    );
    if (releaseMatch) {
      current = {
        version: releaseMatch[1],
        date: releaseMatch[2] || null,
        sections: [],
      };
      releases.push(current);
      currentSection = null;
      continue;
    }

    const sectionMatch = line.match(/^### (.+)/);
    if (sectionMatch && current) {
      const raw = sectionMatch[1].trim();
      const emoji = raw.match(/^[\p{Emoji_Presentation}\p{Extended_Pictographic}]+/u)?.[0] || "";
      const text = raw.replace(emoji, "").trim().toLowerCase().replace(/(?:^|\s)\S/g, (c) => c.toUpperCase());
      const heading = emoji ? `${emoji} ${text}` : text;
      currentSection = { heading, items: [] };
      current.sections.push(currentSection);
      continue;
    }

    if (currentSection && /^- /.test(line)) {
      currentSection.items.push(linkTickets(line.replace(/^- /, "").trim()));
    }
  }

  return releases.filter((r) => r.version !== "Unreleased");
}

function readCache() {
  try {
    if (!existsSync(CACHE_FILE)) return null;
    return readFileSync(CACHE_FILE, "utf-8");
  } catch {
    return null;
  }
}

function isCacheFresh() {
  try {
    if (!existsSync(CACHE_FILE)) return false;
    const age = Date.now() - statSync(CACHE_FILE).mtimeMs;
    return age < CACHE_MAX_AGE_MS;
  } catch {
    return false;
  }
}

function writeCache(md) {
  try {
    mkdirSync(CACHE_DIR, { recursive: true });
    writeFileSync(CACHE_FILE, md, "utf-8");
  } catch (err) {
    console.warn(`[changelog] Could not write cache: ${err.message}`);
  }
}

export default async function () {
  if (isCacheFresh()) {
    const cached = readCache();
    if (cached) {
      console.log("[changelog] Using cached changelog (< 1h old)");
      return parseChangelog(cached);
    }
  }

  try {
    const res = await fetch(CHANGELOG_URL);
    if (!res.ok) throw new Error(`HTTP ${res.status}`);
    const md = await res.text();
    writeCache(md);
    console.log("[changelog] Fetched from GitHub and cached");
    return parseChangelog(md);
  } catch (err) {
    console.warn(`[changelog] Could not fetch: ${err.message}`);
    const cached = readCache();
    if (cached) {
      console.log("[changelog] Falling back to stale cache");
      return parseChangelog(cached);
    }
    console.warn("[changelog] No cache available");
    return [];
  }
}
