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

## Guidelines

Canonical rules live in [`content/guidelines/`](../content/guidelines/) (v2.0.0 in frontmatter). Humans read `/guidelines/` (hub), Brand, Foundations, Writing, Interface, and Print. Agents fetch `/design.md` (alias), `/llms.txt`, and `/llms-full.txt`. Skills live in the `shellui/skills` repo only. Tokens: `tokens/tokens.json`. Downloads: `/guidelines/brand/#downloads` (`/brand-assets/` redirects; files stay under `/brand-assets/*`).

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

