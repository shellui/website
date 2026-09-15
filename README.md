# Shellui Website

The official website for [Shellui](https://shellui.com), the web app development platform.

## Stack

- **[Eleventy 3](https://www.11ty.dev/)** - static HTML pages
- **[Tailwind CSS v4](https://tailwindcss.com/)** - compiled at build time (no CDN)
- **[Tailwind Plus Elements](https://tailwindcss.com/plus/ui-blocks/documentation/elements)** - licensed interactive HTML (`el-*` custom elements) for Plus UI blocks
- **[Alpine.js](https://alpinejs.dev/)** - light interactivity in `src/blocks/`

Paste Tailwind Plus HTML into layouts or `{% demo "name" %}` blocks. Demos are real HTML (no iframes). `content/` is IA notes and is not published, except `content/guidelines/*.md` (canonical guidelines). `design.md` is also copied to the site root as `/design.md`.

## Getting started

```bash
npm install
npm start
```

Open the local URL Eleventy prints (usually `http://localhost:8080`).

```bash
npm run build
```

writes static files to `_site/`.

## Guidelines

Canonical rules live in [`content/guidelines/`](content/guidelines/) (version in each file's frontmatter). Humans read `/guidelines/` (hub), `/guidelines/writing/`, `/guidelines/web-design/`, and the visual handbook at `/guidelines/design/`. Agents should load [`skills/guidelines/SKILL.md`](skills/guidelines/SKILL.md) and must not scrape the design HTML. When **building a page**, fetch `/design.md` first (`skills/design-md/SKILL.md`). Site overview for agents: `/llms.txt`. Logos stay on `/brand-assets/`.

See [`AGENTS.md`](AGENTS.md) for the short pointer.

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

GitHub Actions (`.github/workflows/pages.yml`) builds `_site/` and deploys to GitHub Pages on push to `main`. After the first merge, set the repository Pages source to **GitHub Actions** (not “Deploy from branch”).

Missing URLs are served from `_site/404.html`. GitHub Pages only uses that filename at the site root (not `/404/index.html`).

## License

MIT - see [LICENSE](LICENSE).
