import { readFileSync, writeFileSync, mkdirSync, existsSync, statSync } from "fs";
import { join, dirname } from "path";
import { fileURLToPath } from "url";

const CHANGELOG_URL =
  "https://raw.githubusercontent.com/shellui/shellui/refs/heads/main/CHANGELOG.md";

const GITHUB_REPO = "shellui/shellui";
const DOCS_BASE = "https://docs.shellui.com";

const __dirname = dirname(fileURLToPath(import.meta.url));
const CACHE_DIR = join(__dirname, "..", "..", ".cache");
const CACHE_FILE = join(CACHE_DIR, "changelog.md");
const CACHE_MAX_AGE_MS = 1000 * 60 * 60; // 1 hour

/**
 * Curated latest release for the marketing changelog.
 * Upstream main CHANGELOG can carry merge duplicates; the tag can carry conflict markers.
 * Keep this scannable: big features first, then improvements / changed / notable fixes.
 * Mirror section presence on main (do not invent Removed if upstream dropped it).
 */
const CURATED = {
  "0.5.0": {
    date: "2026-09-16",
    sections: [
      {
        heading: "✨ Feature",
        items: [
          "**Floating chrome actions (SDK)**: `shellui.actions.set` / `clear` declare optional back, title, trailing, and primary FAB chrome. The shell renders them (floating glass or windows title bar), posts `SHELLUI_ACTION` clicks into that iframe only, and clears on shell navigation. Caps: at most 3 trailing visible (rest in `···`), at most 1 primary. See the [chrome actions guide](https://docs.shellui.com/features/chrome-actions/).",
          "**`shellui init` frameworks**: Next.js, Nuxt, SvelteKit, and Alpine.js starters. Companions run on `:3000` (Next/Nuxt) or `:5173` (SvelteKit/Alpine). See [framework starters](https://docs.shellui.com/framework-starters/).",
          "**Theming v1**: curated OKLCH JSON themes (47, including Shellui, shadcn, and [tweakcn](https://tweakcn.com)), flexible config, and an Appearance theme selector. See [themes](https://docs.shellui.com/features/themes/).",
          "**Sidebar and app-bar layouts**: shadcn sidebar with icon-collapse and rail (`⌘B`), drag-to-resize, and mobile sheet. App-bar is 42px chrome with text start links and icon end links. Inset twins use a padded, rounded main frame (`layout: \"sidebar-inset\"` / `\"app-bar-inset\"`).",
          "**CLI companion**: `shellui start` can spawn or follow a colocated app via `dev.run` / `dev.url` (or `--run` / `--follow` / `--shell-only`).",
          "**Identity-hosted login**: authorize → callback → confirmation → token bounce. CLI `shellui login` opens the identity method picker (`--provider` skips it).",
          "**Host detection**: `isHomeScreenPwa()`, `isTauriRuntime()`, and `data-shellui-host` tell Safari Home Screen installs apart from native WKWebView. iOS Home Screen PWAs skip stacked status scrims and `theme-color`. Tauri keeps controlled chrome and CSS safe-area. See [browser PWA vs native iOS](https://docs.shellui.com/tauri/#browser-pwa-vs-native-ios).",
        ],
      },
      {
        heading: "🛠 Improvements",
        items: [
          "**Theme and i18n in starters**: JS framework templates (`react`, `vue`, `angular`, `next`, `nuxt`, `svelte`, `alpine`) use `@shellui/sdk/tiny` with theme sync, `en`/`fr` language sync, and a Shellui-integrated home.",
          "**Desktop history buttons**: back/forward stay available in Tauri fullscreen. App-bar shows them only in a live Tauri webview.",
        ],
      },
      {
        heading: "🚨 Changed",
        items: [
          "CSS variables are full colors (`oklch(...)` / hex) via `var(--token)`. They are no longer HSL channel triples.",
          "Official default theme is **shellui** (gold brand). AI-generated zinc/slate palettes are removed.",
          "`shellui init` injects `theme: \"shellui\"`.",
        ],
      },
      {
        heading: "🐛 Bug Fixes",
        items: [
          "**Upload toaster**: auto-dismiss ~2.5s after all uploads succeed. Stay open on failure so errors stay readable.",
          "**SDK layout chrome**: inject `.shellui-apply-layout-chrome-pad` styles into the iframe app document so auto-padding works without shipping `@shellui/core` CSS.",
        ],
      },
    ],
  },
};

function escapeHtml(text) {
  return String(text)
    .replace(/&/g, "&amp;")
    .replace(/</g, "&lt;")
    .replace(/>/g, "&gt;")
    .replace(/"/g, "&quot;")
    .replace(/'/g, "&#39;");
}

function inlineMarkdown(text) {
  const escaped = escapeHtml(text);
  return escaped
    .replace(
      /\[([^\]]+)\]\((https?:\/\/[^)]+)\)/g,
      '<a href="$2" target="_blank" rel="noopener noreferrer">$1</a>',
    )
    .replace(
      /`([^`]+)`/g,
      '<code class="text-xs bg-gray-100 dark:bg-gray-800 px-1 py-0.5 rounded">$1</code>',
    )
    .replace(/\*\*([^*]+)\*\*/g, "<strong>$1</strong>")
    .replace(/\*([^*]+)\*/g, "<em>$1</em>");
}

function linkTickets(text) {
  return text.replace(
    /\(#(\d+)\)/g,
    `(<a href="https://github.com/${GITHUB_REPO}/issues/$1">#$1</a>)`,
  );
}

function rewriteDocsLinks(text) {
  return text.replace(
    /\]\(\.\/docs\/([^)#]+)(?:\.md)?(#[^)]*)?\)/g,
    (_match, path, hash = "") => {
      const clean = String(path).replace(/\.md$/i, "").replace(/\/+$/, "");
      return `](${DOCS_BASE}/${clean}/${hash})`;
    },
  );
}

function stripConflictMarkers(md) {
  const lines = md.split("\n");
  const out = [];
  let skipping = false;
  for (const line of lines) {
    if (/^<<<<<<< /.test(line)) {
      skipping = false;
      continue;
    }
    if (/^=======/.test(line)) {
      skipping = true;
      continue;
    }
    if (/^>>>>>>> /.test(line)) {
      skipping = false;
      continue;
    }
    if (skipping) continue;
    // Drop conflict-garbled lines that start with "# **" (commented bullets)
    if (/^#\s+\*\*/.test(line.trim())) continue;
    out.push(line);
  }
  return out.join("\n");
}

function itemKey(htmlOrMd) {
  const plain = String(htmlOrMd)
    .replace(/<[^>]+>/g, "")
    .replace(/\*\*/g, "")
    .replace(/`/g, "")
    .toLowerCase()
    .trim();
  const bold = plain.match(/^([^:]+):/);
  return (bold ? bold[1] : plain.slice(0, 72)).replace(/\s+/g, " ");
}

function formatSectionHeading(raw) {
  const emoji =
    raw.match(/^[\p{Emoji_Presentation}\p{Extended_Pictographic}]+/u)?.[0] || "";
  const text = raw
    .replace(emoji, "")
    .trim()
    .toLowerCase()
    .replace(/(?:^|\s)\S/g, (c) => c.toUpperCase());
  return emoji ? `${emoji} ${text}` : text;
}

function renderItems(items) {
  return items.map((item) =>
    inlineMarkdown(linkTickets(rewriteDocsLinks(item))),
  );
}

function dedupeSections(sections) {
  const byHeading = new Map();
  for (const section of sections) {
    const existing = byHeading.get(section.heading);
    if (!existing) {
      byHeading.set(section.heading, {
        heading: section.heading,
        items: [...section.items],
        keys: new Set(section.items.map(itemKey)),
      });
      continue;
    }
    for (const item of section.items) {
      const key = itemKey(item);
      if (existing.keys.has(key)) continue;
      existing.keys.add(key);
      existing.items.push(item);
    }
  }
  return [...byHeading.values()].map(({ heading, items }) => ({
    heading,
    items,
  }));
}

function parseChangelog(md) {
  const clean = stripConflictMarkers(md);
  const releases = [];
  let current = null;
  let currentSection = null;

  for (const raw of clean.split("\n")) {
    const line = raw.trimEnd();

    const releaseMatch = line.match(
      /^## \[([^\]]+)\](?:\s*-\s*(\d{4}-\d{2}-\d{2}))?/,
    );
    if (releaseMatch) {
      if (current) {
        current.sections = dedupeSections(current.sections);
      }
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
      const heading = formatSectionHeading(sectionMatch[1].trim());
      currentSection = { heading, items: [] };
      current.sections.push(currentSection);
      continue;
    }

    if (currentSection && /^- /.test(line)) {
      const body = rewriteDocsLinks(line.replace(/^- /, "").trim());
      currentSection.items.push(inlineMarkdown(linkTickets(body)));
    }
  }

  if (current) {
    current.sections = dedupeSections(current.sections);
  }

  return releases.filter((r) => r.version !== "Unreleased");
}

function applyCurated(releases) {
  return releases.map((release) => {
    const curated = CURATED[release.version];
    if (!curated) return release;
    return {
      version: release.version,
      date: curated.date || release.date,
      sections: curated.sections.map((section) => ({
        heading: section.heading,
        items: renderItems(section.items),
      })),
      curated: true,
    };
  });
}

function ensureCuratedPresent(releases) {
  const versions = new Set(releases.map((r) => r.version));
  const missing = Object.keys(CURATED)
    .filter((v) => !versions.has(v))
    .sort((a, b) => b.localeCompare(a, undefined, { numeric: true }));
  if (missing.length === 0) return releases;

  const extras = missing.map((version) => {
    const curated = CURATED[version];
    return {
      version,
      date: curated.date,
      sections: curated.sections.map((section) => ({
        heading: section.heading,
        items: renderItems(section.items),
      })),
      curated: true,
    };
  });
  return [...extras, ...releases];
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
  let md = null;

  if (isCacheFresh()) {
    md = readCache();
    if (md) {
      console.log("[changelog] Using cached changelog (< 1h old)");
    }
  }

  if (!md) {
    try {
      const res = await fetch(CHANGELOG_URL);
      if (!res.ok) throw new Error(`HTTP ${res.status}`);
      md = await res.text();
      writeCache(md);
      console.log("[changelog] Fetched from GitHub and cached");
    } catch (err) {
      console.warn(`[changelog] Could not fetch: ${err.message}`);
      md = readCache();
      if (md) {
        console.log("[changelog] Falling back to stale cache");
      } else {
        console.warn("[changelog] No cache available");
        return ensureCuratedPresent([]);
      }
    }
  }

  return ensureCuratedPresent(applyCurated(parseChangelog(md)));
}
