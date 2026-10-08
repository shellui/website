/**
 * Product changelog for /changelog/, sourced from shellui/shellui at build time.
 * Website package version lives in site.json / package.json (not used for marketing badges).
 */
import {
  assertSafeChangelogHtml,
  inlineMarkdown,
  linkTickets,
  rewriteDocsLinks,
} from "../../tools/changelog-markdown.mjs";
import { fetchChangelogMarkdown, GITHUB_REPO } from "../../tools/changelog-fetch.mjs";

const DOCS_BASE = "https://docs.shellui.com";

/**
 * Curated overlays for selected releases (optional summary + scannable sections).
 * Uncurated versions still render from upstream parse.
 */
const CURATED = {
  "0.6.0": {
    date: "2026-10-07",
    summary:
      "Edit your name, sign in with a magic link, expose email settings to apps, and call init before the shell sends settings.",
    sections: [
      {
        heading: "✨ Feature",
        items: [
          "**Account management**: Edit your name and delete your account from Settings, under user account, on the Shellui identity backend.",
          "**Magic link login**: The login page uses a magic link when no method is set, shows \"Check your email\", and waits 60s before another send.",
          "**Email service**: Optional `email.url` and `email.showInAdmin` in `shellui.config` reach apps as `settings.email`.",
        ],
      },
      {
        heading: "🛠 Improvements",
        items: [
          "**Transfers**: Uploads share one progress toaster, and downloads continue after you leave Settings.",
        ],
      },
      {
        heading: "🚨 Changed",
        items: [
          "**Iframe handshake (breaking)**: Call `init` from `@shellui/sdk` first, because the shell sends settings only after that request and only to frames that are ready.",
        ],
      },
      {
        heading: "📚 Documentation",
        items: [
          "**Agent guidelines**: Root `AGENTS.md` links the Shellui writing and design guidelines.",
        ],
      },
      {
        heading: "🐛 Bug Fixes",
        items: [
          "**Session restore**: Reloading keeps you signed in during local development, and the shell shows a loading state while the session restores.",
          "**Toasts**: Bottom toast lists no longer block clicks on the page behind them.",
          "**Staff magic links**: A staff account that opens an old email link sees \"Sign in with your usual sign-in method instead.\"",
        ],
      },
    ],
  },
  "0.5.0": {
    date: "2026-09-16",
    summary:
      "Chrome actions SDK, new shellui init frameworks, OKLCH themes, inset layouts, CLI companion, and identity-hosted login.",
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

function renderItem(text) {
  const html = linkTickets(
    inlineMarkdown(rewriteDocsLinks(text), {
      docsBase: DOCS_BASE,
      githubRepo: GITHUB_REPO,
    }),
    GITHUB_REPO,
  );
  assertSafeChangelogHtml(html);
  return html;
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
  return items.map((item) => renderItem(item));
}

function plainTextFromItem(htmlOrMd) {
  return String(htmlOrMd)
    .replace(/<[^>]+>/g, "")
    .replace(/\*\*/g, "")
    .replace(/`/g, "")
    .trim();
}

function buildSummary(sections, curatedSummary) {
  if (curatedSummary) return curatedSummary;

  const featureSection = sections.find((s) => /feature/i.test(s.heading));
  const items = featureSection?.items ?? sections[0]?.items ?? [];
  const highlights = items
    .slice(0, 4)
    .map(plainTextFromItem)
    .map((text) => {
      const bold = text.match(/^([^:]+):/);
      return (bold ? bold[1] : text.split(".")[0]).trim();
    })
    .filter(Boolean);

  if (highlights.length === 0) return "";
  if (highlights.length === 1) return highlights[0];
  const last = highlights.pop();
  return `${highlights.join(", ")}, and ${last}`;
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
      const body = line.replace(/^- /, "").trim();
      currentSection.items.push(renderItem(body));
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
    if (!curated) {
      return {
        ...release,
        summary: buildSummary(release.sections),
      };
    }
    const sections = curated.sections.map((section) => ({
      heading: section.heading,
      items: renderItems(section.items),
    }));
    return {
      version: release.version,
      date: curated.date || release.date,
      sections,
      summary: buildSummary(sections, curated.summary),
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
    const sections = curated.sections.map((section) => ({
      heading: section.heading,
      items: renderItems(section.items),
    }));
    return {
      version,
      date: curated.date,
      sections,
      summary: buildSummary(sections, curated.summary),
      curated: true,
    };
  });
  return [...extras, ...releases];
}

function versionParts(version) {
  return String(version)
    .split(".")
    .map((part) => Number.parseInt(part, 10) || 0);
}

function compareReleasesNewestFirst(a, b) {
  const av = versionParts(a.version);
  const bv = versionParts(b.version);
  const length = Math.max(av.length, bv.length);
  for (let index = 0; index < length; index += 1) {
    const delta = (bv[index] || 0) - (av[index] || 0);
    if (delta) return delta;
  }
  return 0;
}

function orderReleases(releases) {
  return [...releases].sort(compareReleasesNewestFirst);
}

export default async function () {
  try {
    const { md } = await fetchChangelogMarkdown();
    return orderReleases(ensureCuratedPresent(applyCurated(parseChangelog(md))));
  } catch (err) {
    console.warn(`[changelog] Build without upstream data: ${err.message}`);
    return orderReleases(ensureCuratedPresent([]));
  }
}
