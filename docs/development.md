# Website development notes

Details for people working on shellui.com. The [README](../README.md) has the short version.

## Stack

- **[Eleventy 3](https://www.11ty.dev/)** - static HTML pages
- **[Tailwind CSS v4](https://tailwindcss.com/)** - compiled at build time (no CDN)
- **[Tailwind Plus Elements](https://tailwindcss.com/plus/ui-blocks/documentation/elements)** - licensed interactive HTML (`el-*` custom elements) for Plus UI blocks
- **[Alpine.js](https://alpinejs.dev/)** - light interactivity in `src/blocks/`
- **[esbuild](https://esbuild.github.io/)** - bundles the React islands in `src/islands/`

Islands are the exception to the Alpine rule: one page lazy-loads one React bundle for a single piece it cannot express in Alpine. `/architecture/` uses [`@xyflow/react`](https://reactflow.dev/) for the stack graph. `/features/authentication/` reuses the same library for the identity-service exchange diagram. Each island builds to `_site/assets/js/<name>.island.js` with its CSS inlined, and a small loader in `src/assets/js/` imports it when the mount point scrolls into view. Every other page stays on the Eleventy plus Alpine budget. Ship a static fallback in the Nunjucks so the page works without the bundle.

Paste Tailwind Plus HTML into layouts or `{% demo "name" %}` blocks. Demos are real HTML (no iframes). `content/` is IA notes and is not published, except `content/guidelines/*.md` (canonical guidelines). `design.md` is also copied to the site root as `/design.md`.

## Open Graph images

Every page that uses `layouts/base.njk` gets a **1200×630** PNG at build time (`/og/<slug>.png`), styled from brand kit v1 (default, docs, blog, and changelog templates). [Satori](https://github.com/vercel/satori) renders React markup to SVG; `@resvg/resvg-js` rasterizes it. Inter comes from `@fontsource/inter`.

- **Metadata**: `tools/og/page-data.mjs` merges each template’s source front matter (via gray-matter) with Eleventy data before `resolve-meta.mjs` picks the template and copy. Overrides: `ogTemplate`, `ogTitle`, `ogDescription`, or `ogImage` (custom URL skips generation). Cache keys always include the page path so identical fallback copy cannot reuse one PNG across pages.
- **Build hook**: `eleventy.after` calls `tools/og/generate.mjs`, which **re-renders every PNG** (no cache reads) and logs `[og] <url> [template] <title>` for all 27 pages. Refresh committed samples with `./tools/regenerate-og-samples.sh`.
- **Head tags**: `base.njk` emits `og:image`, dimensions, alt text, and Twitter card fields; `eleventyComputed.js` sets absolute image URLs.
- **Verify**: `npm run verify` runs `tools/verify-og-images.mjs` (missing meta, missing PNG, or wrong dimensions fail the build).

Redirect stubs (`layout: false`) and non-HTML outputs (feed, sitemap, `llms.txt`) are excluded from generation and verification.

## Guidelines

Canonical rules live in [`content/guidelines/`](../content/guidelines/) (version in each file's frontmatter). Humans read `/guidelines/` (hub), `/guidelines/writing/`, `/guidelines/web-design/`, the visual handbook at `/guidelines/design/`, and `/guidelines/brand/`. Agents should load [`skills/guidelines/SKILL.md`](../skills/guidelines/SKILL.md) and must not scrape the design HTML. When **building a page**, fetch `/design.md` first (`skills/design-md/SKILL.md`). Site overview for agents: `/llms.txt`. Logos stay on `/brand-assets/`.

See [`AGENTS.md`](../AGENTS.md) for the short pointer.

## CI

GitHub Actions run on every pull request and on pushes to `develop` / `main`:

| Workflow | When | What |
| --- | --- | --- |
| `ci.yml` | PRs + pushes to `develop`/`main` | `npm ci`, production build, `_site` smoke checks, secret scan, `npm audit`, naming/hygiene, markdown link check |
| `pre-release.yml` | PRs into `main` (and manual dispatch) | `package.json` ↔ `CHANGELOG.md` version alignment, no active Unreleased section, full build + verify |

Locally:

```bash
npm run build && npm run verify
npm run pre-release          # same checks as the develop → main gate
```

## Deploy

GitHub Actions (`.github/workflows/pages.yml`) builds `_site/` and deploys to GitHub Pages on push to `main`. After the first merge, set the repository Pages source to **GitHub Actions** (not "Deploy from branch").

Missing URLs are served from `_site/404.html`. GitHub Pages only uses that filename at the site root (not `/404/index.html`).

### Security headers

GitHub Pages cannot emit CSP, HSTS, or other response headers. Put Cloudflare (or another proxy) in front of the custom domain and apply the values in [`infra/security-headers.json`](../infra/security-headers.json). Rollout checklist: [`docs/deploy-security-headers.md`](deploy-security-headers.md). Verify after edge config:

```bash
./tools/verify-security-headers.sh
```

Dependabot watches `package-lock.json` and GitHub Actions (`.github/dependabot.yml`). Nunjucks autoescape and intentional raw HTML are documented in [`docs/security-html-policy.md`](security-html-policy.md).

