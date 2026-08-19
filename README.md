# Shellui Website

The official website for [Shellui](https://shellui.com), the web app development platform.

## Stack

- **[Eleventy 3](https://www.11ty.dev/)** — static HTML pages
- **[Tailwind CSS v4](https://tailwindcss.com/)** — compiled at build time (no CDN)
- **[Tailwind Plus Elements](https://tailwindcss.com/plus/ui-blocks/documentation/elements)** — licensed interactive HTML (`el-*` custom elements) for Plus UI blocks
- **[Alpine.js](https://alpinejs.dev/)** — light interactivity in `src/blocks/`

Paste Tailwind Plus HTML into layouts or `{% demo "name" %}` blocks. Demos are real HTML (no iframes). `content/` is IA notes only and is not published.

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

## Deploy

GitHub Actions (`.github/workflows/pages.yml`) builds `_site/` and deploys to GitHub Pages. After the first merge, set the repository Pages source to **GitHub Actions** (not “Deploy from branch”).

## License

MIT — see [LICENSE](LICENSE).
