# Nunjucks HTML and autoescape policy

Eleventy renders templates with Nunjucks. **Autoescape is enabled** (`eleventy.config.js`). Variables render as plain text unless a template explicitly opts into HTML.

## Default: escaped output

Front matter fields (`title`, `author`, `lede`, nav labels, etc.) and any new template variable are HTML-escaped automatically. Do not disable autoescape globally.

## Intentional `| safe` (trusted HTML only)

| Location | Variable | Why `safe` |
| --- | --- | --- |
| `layouts/base.njk` | `content` | Child layout output (already structured page HTML from Eleventy) |
| `layouts/page.njk`, `layouts/post.njk`, `layouts/feature.njk` | `content` | Markdown body rendered to HTML at build time from repo sources |
| `layouts/guidelines.njk` | `topicData.html` | Markdown-it output with `html: false` (no raw HTML in source) |
| `changelog/index.njk` | `item` | Build-time markdown → limited inline HTML via `tools/changelog-markdown.mjs` (`assertSafeChangelogHtml`) |
| `jsonld.njk` | `dump \| safe` | JSON-LD `<script type="application/ld+json">` must not entity-escape quotes |

## Blog and markdown pages

Blog posts and `.md` pages are authored in this repository. Eleventy converts Markdown to HTML; layouts use `{{ content | safe }}` once at the leaf layout. Do not pipe untrusted runtime input through `safe`.

## Changelog HTML

`tools/changelog-markdown.mjs` converts upstream release notes to a **small allowlist** of inline tags (`<a>`, `<code>`, `<strong>`, `<em>`). Plain text is HTML-escaped before inline markdown runs; `assertSafeChangelogHtml` rejects script/event-handler injection. Curated entries in `src/_data/changelog.js` follow the same path.

## Adding raw HTML

Prefer shortcodes (`{% figure %}`, `{% quote %}`, `{% highlight %}`) or Markdown with `html: false`. If you must add a new `| safe`, document it in this file and keep the HTML source in tracked, reviewed files — never from request/query data.
