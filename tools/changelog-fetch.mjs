/**
 * Fetch shellui/shellui CHANGELOG.md at build time.
 * Resolves the latest GitHub release tag via API; falls back to v0.5.0 on failure.
 * Disk cache (1h) is skipped when CI=true or GITHUB_ACTIONS=true.
 */
import {
  existsSync,
  mkdirSync,
  readFileSync,
  statSync,
  writeFileSync,
} from "fs";
import { dirname, join } from "path";
import { fileURLToPath } from "url";

const __dirname = dirname(fileURLToPath(import.meta.url));

export const GITHUB_REPO = "shellui/shellui";
export const CACHE_DIR = join(__dirname, "..", ".cache");
export const CACHE_FILE = join(CACHE_DIR, "changelog.md");
export const META_FILE = join(CACHE_DIR, "changelog-meta.json");
const CACHE_MAX_AGE_MS = 1000 * 60 * 60;

/** Fallback when GitHub API or raw fetch fails (tag v0.5.0). */
export const FALLBACK_VERSION = "0.5.0";
export const FALLBACK_TAG = `v${FALLBACK_VERSION}`;

export function isCiBuild() {
  return process.env.CI === "true" || process.env.GITHUB_ACTIONS === "true";
}

function readCache() {
  try {
    if (!existsSync(CACHE_FILE)) return null;
    return readFileSync(CACHE_FILE, "utf-8");
  } catch {
    return null;
  }
}

function readMeta() {
  try {
    if (!existsSync(META_FILE)) return null;
    return JSON.parse(readFileSync(META_FILE, "utf-8"));
  } catch {
    return null;
  }
}

function isCacheFresh() {
  if (isCiBuild()) return false;
  try {
    if (!existsSync(CACHE_FILE)) return false;
    const age = Date.now() - statSync(CACHE_FILE).mtimeMs;
    return age < CACHE_MAX_AGE_MS;
  } catch {
    return false;
  }
}

function writeCache(md, meta) {
  try {
    mkdirSync(CACHE_DIR, { recursive: true });
    writeFileSync(CACHE_FILE, md, "utf-8");
    writeFileSync(META_FILE, JSON.stringify(meta, null, 2), "utf-8");
  } catch (err) {
    console.warn(`[changelog] Could not write cache: ${err.message}`);
  }
}

export function changelogRawUrl(tag) {
  const normalized = tag.startsWith("v") ? tag : `v${tag}`;
  return `https://raw.githubusercontent.com/${GITHUB_REPO}/${normalized}/CHANGELOG.md`;
}

/**
 * Resolve latest shellui/shellui release tag from GitHub API.
 * @returns {Promise<{ version: string, tag: string }>}
 */
export async function resolveLatestProductRelease() {
  try {
    const res = await fetch(
      `https://api.github.com/repos/${GITHUB_REPO}/releases/latest`,
      {
        headers: {
          Accept: "application/vnd.github+json",
          "User-Agent": "shellui-website-build",
        },
      },
    );
    if (!res.ok) throw new Error(`HTTP ${res.status}`);
    const release = await res.json();
    const tag = release?.tag_name;
    if (!tag) throw new Error("missing tag_name");
    const version = String(tag).replace(/^v/, "");
    console.log(`[changelog] Latest product release: v${version} (${tag})`);
    return { version, tag: String(tag).startsWith("v") ? tag : `v${tag}` };
  } catch (err) {
    console.warn(
      `[changelog] GitHub releases API failed (${err.message}); fallback ${FALLBACK_TAG}`,
    );
    return { version: FALLBACK_VERSION, tag: FALLBACK_TAG };
  }
}

/**
 * Fetch upstream CHANGELOG.md for the latest product release.
 * @returns {Promise<{ md: string, version: string, tag: string, source: string }>}
 */
export async function fetchChangelogMarkdown() {
  const { version, tag } = await resolveLatestProductRelease();

  if (isCacheFresh()) {
    const md = readCache();
    const meta = readMeta();
    if (md && meta?.version === version) {
      console.log("[changelog] Using cached changelog (< 1h old, version match)");
      return { md, version, tag, source: "cache" };
    }
    if (md && meta?.version !== version) {
      console.log(
        `[changelog] Cache is v${meta.version}; latest is v${version} — refetching`,
      );
    }
  } else if (isCiBuild()) {
    console.log("[changelog] CI build — bypassing disk cache");
  }

  const url = changelogRawUrl(tag);
  try {
    const res = await fetch(url);
    if (!res.ok) throw new Error(`HTTP ${res.status} for ${url}`);
    const md = await res.text();
    writeCache(md, { version, tag, fetchedAt: new Date().toISOString() });
    console.log(`[changelog] Fetched CHANGELOG.md from ${tag}`);
    return { md, version, tag, source: "remote" };
  } catch (err) {
    console.warn(`[changelog] Could not fetch ${url}: ${err.message}`);
    const md = readCache();
    const meta = readMeta();
    if (md) {
      console.log(
        `[changelog] Falling back to stale cache (v${meta?.version ?? "?"})`,
      );
      return {
        md,
        version: meta?.version ?? FALLBACK_VERSION,
        tag: meta?.tag ?? FALLBACK_TAG,
        source: "stale-cache",
      };
    }
    throw new Error("no changelog available (fetch failed and no cache)");
  }
}
