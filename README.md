# Shellui Website

The source of [shellui.com](https://shellui.com) and the home of the Shellui guidelines.

[![CI](https://github.com/shellui/website/actions/workflows/ci.yml/badge.svg?branch=main)](https://github.com/shellui/website/actions/workflows/ci.yml)
[![License: MIT](https://img.shields.io/badge/license-MIT-blue)](LICENSE)

A static site built with [Eleventy](https://www.11ty.dev/), [Tailwind CSS](https://tailwindcss.com/) and [Alpine.js](https://alpinejs.dev/), with a few React islands bundled by esbuild. It also publishes the canonical [writing](https://shellui.com/guidelines/writing/), [web design](https://shellui.com/guidelines/web-design/) and [design](https://shellui.com/guidelines/design/) guidelines, as pages for people and as markdown for agents.

## Get started

```bash
git clone https://github.com/shellui/website.git
cd website
npm install
npm start
```

Open the local URL Eleventy prints, usually [http://localhost:8080](http://localhost:8080). `npm run build` writes the static site to `_site/`.

## Guidelines

The guidelines source lives in [`content/guidelines/`](content/guidelines/), with the version in each file's frontmatter. Agents read the markdown, never the HTML:

- [shellui.com/guidelines/writing.md](https://shellui.com/guidelines/writing.md)
- [shellui.com/guidelines/web-design.md](https://shellui.com/guidelines/web-design.md)
- [shellui.com/design.md](https://shellui.com/design.md)

The matching agent skills are in [`skills/`](skills/) and in [shellui/skills](https://github.com/shellui/skills).

## Development

```bash
npm run build && npm run verify
npm run pre-release   # same checks as the develop to main gate
```

Every push to `main` deploys `_site/` to GitHub Pages. The stack, the islands, CI, deploy and security headers are in [docs/development.md](docs/development.md). Changes are in [CHANGELOG.md](CHANGELOG.md).

## Contributing

Open an issue or a pull request against `develop`. Coding agents start with [AGENTS.md](AGENTS.md).

## Shellui projects

| Project | What it does |
| --- | --- |
| [shellui](https://github.com/shellui/shellui) | The shell, CLI and SDK |
| [admin](https://github.com/shellui/admin) | Administration app inside the shell |
| [files](https://github.com/shellui/files) | File explorer for storage-service |
| [identity-service](https://github.com/shellui/identity-service) | Sign-in, companies and tokens |
| [storage-service](https://github.com/shellui/storage-service) | File storage |
| [hosting-service](https://github.com/shellui/hosting-service) | Deploys and serves Shellui apps |
| [email-service](https://github.com/shellui/email-service) | Templates and sends email |
| [skills](https://github.com/shellui/skills) | Agent Skills for coding agents |
| [playground](https://github.com/shellui/playground) | Live demo of the shell |

## License

[MIT](LICENSE)
