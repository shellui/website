# Change Log

All notable changes to this project will be documented in this file.

The format is based on [Keep a Changelog](http://keepachangelog.com/)
and this project adheres to [Semantic Versioning](http://semver.org/).

<!---
## [Unreleased] - yyyy-mm-dd

### ✨ Feature - for new features
### 🛠 Improvements - for general improvements
### 🚨 Changed - for changes in existing functionality
### ⚠️ Deprecated - for soon-to-be removed features
### 📚 Documentation - for documentation update
### 🗑 Removed - for removed features
### 🐛 Bug Fixes - for any bug fixes
### 🔒 Security - in case of vulnerabilities
### 🏗 Chore - for tidying code

See for sample https://raw.githubusercontent.com/favoloso/conventional-changelog-emoji/master/CHANGELOG.md
-->

## [0.7.0] - Unreleased

### ✨ Feature

- Interface guidelines add light and dark image rules and a `themedImage` shortcode for raster and SVG.
- Refresh the "Introducing Shellui" blog post for v0.7 with light and dark SVG cover and list thumbnail, and a PNG Open Graph image.
- Homepage hero adds a discreet dot field that reacts to the mouse.
- Homepage hero adds a faded wireframe Shellui S on wide screens, drawn once on load, with more space above the copy and less below.
- Features page shows a toaster illustration on the Apps and navigation card, animated on hover and focus.
- Apps and navigation page adds a "Components ready to use" grid with Toaster, Dialog, Modal, Drawer, and Action buttons cards.
- Apps and navigation page replaces the layout tiles with an interactive playground window that morphs between the seven layouts.
- Newsletter sign-up is back on at `/newsletter/` and on the home, contact, and features pages.
- Top bar adds "Log in" (dashboard) and "Join waitlist" (`/waitlist/`, double opt-in through email-service once a list key is set).
- Publish Shellui brand kit v1 (PDF) and brand assets v1 (ZIP), with unzipped logo, icon, Open Graph, social, and email files at stable `/brand-assets/*` paths. Brand kit source lives under `tools/brand-kit/` and reads `tokens/tokens.json`.
- Guidelines v2.0.0: hub with cards; Brand (downloads on `#downloads`), Foundations (generated tokens), Writing, Interface (merged design + web design), Print, and guidelines changelog. Agent surfaces: `/llms-full.txt`, trimmed `/design.md`, full `/guidelines/interface.md`, forever `/guidelines/web-design.md` copy.
- Self-hosted Inter on shellui.com (preload, swap, Latin subset). Text gold `#8A6300` / `#E8B84A` in dark mode via generated tokens.
- Open Graph images for guideline pages (`tools/og/guidelines.mjs`).
- Generate per-page Open Graph images at build time (1200×630, brand kit v1 templates via Satori and resvg). Every public page gets `og:image`, dimensions, and alt text; `npm run verify` checks PNG presence, size, and copy quality.

### 🚨 Changed

- Layout playground, Apps and navigation visual, and homepage bento match the redesigned Shellui 0.7 layouts.
- Layout playground drops its own dot background, so only the windows desktop shows dots.
- Administration page, features card, and homepage bento tile are redesigned around the admin 0.8 panel, with a roles table and new light and dark visuals.
- Homepage bento gives File storage, Web and desktop, and Audit and privacy their own visuals, and the bento styles use site tokens only.
- Remove links to unavailable hosted services and most service hostnames from copy and `llms.txt`.
- Legacy URLs (`/brand-assets/`, `/product/brand-assets/`, `/guidelines/design/`, `/guidelines/web-design/`) use HTML fallback redirects (`noindex`, canonical, `location.replace` with hash preserved). GitHub Pages serves the site directly (no edge 301s). Sitemap lists canonical guideline URLs only.
- Remove duplicated `website/skills/` (skills live in `shellui/skills` only).

### 📚 Documentation

- Review screenshots: `docs/guidelines-screens/` (hub and each guideline page, light and dark).
- Document the Open Graph build pipeline in `docs/development.md` and sample PNGs under `docs/og-samples/`.
- Correct brand guidelines: flat gold backgrounds for print and Open Graph; soft honey gold wash allowed on the website.
- Fix `undpadded` typo in web-design guidelines (`unpadded`).

### 🐛 Bug Fixes

- Remap `primary-ink` to `#8a6300` on light backgrounds and `#e8b84a` in dark mode so gold text meets WCAG AA without per-page `dark:text-primary` overrides.

## [0.6.0] - 2026-10-08

### ✨ Feature

- Newsletter sign-up at `/newsletter/`, and on the home, contact, and features pages, turns on once a list key is set. Confirmation mail goes through email-service.

### 📚 Documentation

- Email page for sign-in mail, event mail, newsletters, and broadcasts.
- Authentication covers SCIM, SAML, and 15 OAuth providers, with brand-color marks.
- Webhooks and n8n are documented for identity, storage, hosting, and email.
- Architecture adds email-service beside identity, storage, and hosting.
- Pricing Free plan lists email, newsletters, and broadcasts.
- Features menu uses two columns on desktop.
- Product changelog and the homepage badge lead with Shellui 0.6.

### 🐛 Bug Fixes

- Changelog merge keeps the 0.6 notes and the newsletter entry, newest first.

## [0.5.2] - 2026-09-21

### 🐛 Bug Fixes

- React Flow graphs on Architecture / Authentication no longer flash blank on load (reserved skeleton until ready).

## [0.5.1] - 2026-09-18

### 🔒 Security

- Document GitHub Pages header limitation and add Cloudflare edge config (`infra/security-headers.json`, Transform Rules checklist, optional Worker). Verification: `tools/verify-security-headers.sh` and weekly `security-headers` workflow.
- Enable Dependabot for npm and GitHub Actions; standardize on npm (`package-lock.json`) and remove `pnpm-lock.yaml`.
- Enable Nunjucks autoescape; escape changelog inline HTML at build time; document intentional `| safe` usage in `docs/security-html-policy.md`.
- Self-host `@shellui/sdk@0.5.0` tiny (`/assets/js/shellui.tiny.js`) instead of loading from jsDelivr without Subresource Integrity.
- Pin upstream changelog fetch to shellui tag `v0.5.0` (commit `a0c1c907`) and escape HTML in build-time markdown rendering so remote release notes cannot inject script.

### 🛠 Improvements

- Changelog deploy: fetch shellui/shellui CHANGELOG on every build via GitHub releases API (`npm run fetch:changelog` / `prebuild`); bypass disk cache in CI. Homepage hero badge and changelog callout use latest product release, not `site.version`.
- Brand assets: show each logo once with SVG and PNG downloads on the same card; use checkerboard preview wells (near-white in light mode, mid-dark for light marks) so dark and light logos stay readable. Group Primary, Transparent, Documentation, and Playground under Logos; omit Files and the Documentation / Playground wordmarks from the press kit.

## [0.5.0] - 2026-09-16

### ✨ Feature

- Add `/llms.txt` agent index (product summary, curated links, CLI happy path) and point to it from the guidelines hub.
- Rebuild `/architecture/` around an interactive stack graph with two views: the full Shellui stack and the Supabase swap. Pan, zoom, keyboard controls, per-view deep links (`?stack=supabase`), and a static fallback when the bundle does not load.

### 🛠 Improvements

- Add React islands: `src/islands/` builds with esbuild to a page-scoped bundle that loads when its mount point scrolls into view. Only `/architecture/` ships one today.

### 📚 Documentation

- design.md v1.3.0 documents the island exception to the Eleventy plus Alpine stack rule.
- Add hosting-service to `/architecture/` (Docker image behind shellui.app) as the sixth stack piece, last in the graph and reference list.
- Keep Files and hosting-service (shellui.app all-in temporary deploys of the Browser group) in both architecture graph views; Supabase view shows the official mark on that project frame.
- Pin the homepage `@shellui/sdk` tiny script to jsDelivr `@0.5.0` (was `0.5.0-beta.3`).
- Curate the `/changelog/` latest entry for Shellui product 0.5.0: chrome actions, new init frameworks, OKLCH themes, layouts, CLI companion, identity login, and host detection. Deduplicate messy upstream notes and strip conflict markers.

### 🛠 Improvements

- Mark roadmap v0.5 Pixel Perfect as shipped (September 2026) and bump `site.version` to `0.5.0`.
- Add skip link, theme-color, color-scheme, touch-action, heading scroll-margin, and 44px hit targets on chrome controls.

### 📚 Documentation

- Apply writing, web design, and design.md across public pages: sentence-case headings, banned-word cleanup, no em dashes, quieter composition.
- Restore Shellui brand ambient (soft primary/amber hero wash). design.md v1.2.0 allows that signature glow; still rejects multi-color blobs.
- Add versioned guidelines (`content/guidelines/writing.md`, `web-design.md`, and `design.md`, v1.0.0) with agent skills under `skills/`.
- Publish a `/guidelines/` hub plus topic pages. Writing and web design render the same markdown. Design is a visual human handbook at `/guidelines/design/`; agents fetch lean `/design.md`.
- Link guidelines from the footer. Brand assets stay at `/brand-assets/` with a cross-link.
- Style GFM tables and H4s on markdown guidelines pages. Design swatches, type, and surfaces use shared token data so values cannot drift from `input.css`.
- Add `/llms.txt` agent index (product summary, curated links, CLI happy path) and point to it from the guidelines hub.

## [0.4.2] - 2026-09-07

### ✨ Feature

- Load `@shellui/sdk` tiny from jsDelivr (`@0.5.0-alpha.5`) so the site syncs with a parent Shellui shell out of the box.

### 🏗 Chore

- Add GitHub Actions for PR CI (build, security, links) and a develop→main pre-release checklist.

## [0.4.1] - 2026-08-29

### ✨ Feature

- Animate dark/light mode switches with a circular reveal from the toggle using the View Transitions API.

## [0.4.0] - 2026-08-22

### ✨ Feature

- Rebuild the site as Eleventy with Tailwind CSS, Tailwind Plus Elements, Alpine demo blocks, sitemap, and GitHub Pages deploy. Homepage content is unchanged from the previous landing page.
- Add a centered header with Features, Developers, Pricing, Docs, and Blog. Features, Developers, Pricing, and Blog are work-in-progress pages; Docs points to docs.shellui.com.
- Use the Tailwind Plus simple-centered hero on the homepage.
- Add the official blog with a full-width post list and a first article, Introducing Shellui.
- Make the header responsive with a mobile hamburger menu; dark mode moves into the menu on small screens.
- Add feature sub-pages for microfrontend, authentication, and storage.
- Add a Features flyout menu in the header with links to each sub-page.
- Add a custom 404 page at `/404.html` so GitHub Pages can serve it for missing URLs.

### 🛠 Improvements

- Drop the custom warm palette and self-hosted fonts; use Tailwind CSS default colors and the system font stack, with a honey-gold primary accent.
- Remake the footer with navigation links and a made-in-Zurich tagline.

### 🐛 Bug Fixes

- Ship sized favicon assets (ICO, 16/32 PNG, 180px Apple touch icon) so the tab icon works on iPad and other devices.
- Bust cached assets with a content-hash query string instead of renaming files, so GitHub Pages' 10-minute HTML cache cannot request hashed URLs a new deploy already replaced.

## [0.3.0] - 2026-05-14

### ✨ Feature

- Update references to latest release Shellui v0.3.0
- Highlight authentication, legal documents, the identity-service backend, and optional in-app admin panels

## [0.2.0] - 2026-02-20

### ✨ Feature

- Update references to latest release Shellui v0.2.0

## [0.1.0] - 2026-02-09

### ✨ Feature

- First website version
