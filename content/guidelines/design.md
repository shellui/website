---
title: Design
description: How to compose on-brand Shellui pages. Fetch this file first when building website or product surfaces. The HTML page at /guidelines/design/ is a human visual handbook - do not scrape it.
version: 1.5.0
---

Act as an excellent Shellui designer, editor, and information architect. Turn the available material into an official Shellui-authored page. Shape the argument and the interface together. Do not restyle a dump of sections or assemble a generic landing page.

Fetch this file at `https://shellui.com/design.md`. It is the composition authority for agents. Humans use `/guidelines/design/` for swatches and examples. It does not replace the writing or web-design handbooks.

- Writing: `https://shellui.com/guidelines/writing.md`
- Web design: `https://shellui.com/guidelines/web-design.md`
- Skills: `skills/design-md/SKILL.md`, then writing and web-design skills as needed

## Product

Shellui is an open-source web app development platform: a microfrontend shell with shared navigation, authentication, administration, and storage. Audience: developers shipping a product inside that shell.

Precise, calm, direct, technically literate, evidence-led, restrained. Name is **Shellui** only. Never "The Host". In prose, "the shell" (lowercase) is the running host. Lead with what ships today (iframe host, `@shellui/sdk`, identity-service or Supabase Auth, `/admin`, storage, Files). Keep AI, MCP, marketplace, and app-store chrome quiet unless the page is about that surface.

## Priority

1. Preserve supplied facts, package names, URLs, units, qualifiers, and task constraints.
2. Preserve the host stack: Eleventy 3, Tailwind CSS v4, Tailwind Plus patterns already in this repo, Alpine for light demos, shadcn-compatible CSS variables. No new framework, CSS library, or token system, apart from the page-scoped island exception under Stack.
3. Make the reader's question, strongest supported answer, and material evidence immediately clear.
4. Establish Shellui authorship through existing nav/footer chrome, system typography, gray canvas, and scarce primary gold.
5. Choose a composition specific to this material. Do not clone an unrelated page as a template.
6. Refine responsive behavior and details without weakening the hierarchy.

Ask questions only when proceeding could change product claims, pricing, security, or CTAs. Otherwise omit the unknown, label it, and proceed.

## Stack

- Templates: Nunjucks in `src/`. Layouts: `base`, `page`, `feature`, `post`, `guidelines`, `guidelines-design`.
- CSS: `src/assets/css/input.css` → `/assets/css/site.css`. Token values: `src/_data/designTokens.js` (must match `input.css`).
- JS: Alpine (`src/blocks/`), Plus Elements (`/assets/js/elements.js`), theme toggle (`src/assets/js/site.js`).
- Islands: one page may lazy-load one React bundle for a single interactive piece it cannot express in Alpine. Source in `src/islands/`, bundled by esbuild with its CSS inlined, imported on view. `/architecture/` uses `@xyflow/react` this way. Ship a static fallback in the Nunjucks and reuse the token variables; do not reach for an island for a toggle, a tab strip, or a carousel.
- Images: `img/`, logos from `/brand-assets/`. Do not stretch or recolor the wordmark.
- Iframe: site can load in the shell (`@shellui/sdk` tiny). Do not cover host chrome. Theme follows `html.dark`.
- Do not ship a single-file HTML deliverable, a React/Vite rewrite, or a parallel design-system package.

Chrome to reuse: `nav.njk` (fixed `h-16`), `footer.njk`, `logo.njk`. Main padding: `.page-top` (below the fixed header) and `.page-x` (horizontal gutters). Do not add a second header, mega-footer, announcement bar, or extra theme switcher.

## Tokens

Gray canvas. Honey gold is the action color. A soft primary wash behind the homepage hero is brand ambient, not a gold field. Prefer token utilities (`bg-background`, `text-foreground`, `border-border`, `bg-muted`, `text-muted-foreground`, `bg-primary`, `text-primary-foreground`, `text-primary-ink`, `bg-card`). In dark, gold text is `dark:text-primary` because `primary-ink` is not remapped.

| Token | Light | Dark | Role |
| --- | --- | --- | --- |
| `background` | `#ffffff` | `#030712` | Page canvas |
| `foreground` | `#111827` | `#f9fafb` | Primary text |
| `muted` | `#f9fafb` | `rgb(255 255 255 / 0.05)` | Quiet wells |
| `muted-foreground` | `#4b5563` | `#9ca3af` | Secondary text |
| `border` | `#e5e7eb` | `#1f2937` | Rules, cards |
| `card` | `#ffffff` | `#111827` | Raised surface |
| `primary` | `#e3a512` | `#e8b84a` | Accent / buttons |
| `primary-foreground` | `#1a1408` | `#1a1408` | Text on gold |
| `primary-ink` | `#c4920a` | use `primary` | Gold text on light |
| `ring` | `#e3a512` | `#e8b84a` | Focus |
| radius | `rounded-xl` cards (`0.75rem`); `rounded-md` controls (`0.375rem`) | same | Shape |

Existing pages may still use `bg-white dark:bg-gray-950`. Same palette. New work should use token names.

## Patterns (site-wide boxy wireframe)

Pattern system = **layout wireframe** as a **site-wide structural language**. Pages should read like a drafted artboard: hairline rules, rectangular regions, registration marks, column guides. Apply from shared layouts (`base`, `page`, `feature`, `guidelines`, `post`) so every route inherits the language, not only the homepage hero.

Pattern ink is **whisper to soft**: visible lines and boxes for those who look, but type and hierarchy still win the squint test. Never tint pattern ink with gold. Never animate grids or dots.

CSS: `src/assets/css/patterns.css` (imported from `input.css`). Includes `.su-site-canvas` (main column guides), `.su-section-band`, `.su-section-band__stage`, `.su-column-box`, `.su-layout-band-rule`, `.su-layout-scaffold`, and surface/frame utilities. Partials: `site-wireframe-canvas.njk`, `su-wireframe-band-top.njk`, `su-wireframe-stage.njk`, `su-frame-marks.njk`.

### Section shell vs leaf content

| Layer | What it frames | Utilities |
| --- | --- | --- |
| **Site canvas** | Full page: vertical guides at `max-w-7xl` edges | `.su-site-canvas` on `main` |
| **Section band** | Major horizontal bands (hero, features, init, footer) | `.su-section-band` + band rule + optional blueprint stage |
| **Content column box** | The layout column for a page (`max-w-7xl` / `5xl` / `3xl` / `2xl`) | `.su-column-box` + `.su-frame-corners` or `.su-frame-brackets` + corner marks |
| **Leaf content** | Cards, FAQ rows, CTAs, code demos inside the column | Normal components; no per-card frame |

Structure **sections and content columns**, not every small tile. One box around the reading/feature column is correct; a second frame on each card inside it is noise.

### Boxy layout language (do)

- Hairline **horizontal rules** between major sections, aligned to the same max width as content.
- **Corner registration** on section content columns (not on individual feature cards).
- **Vertical column guides** on wide pages, aligned to `.page-x` / `max-w-7xl`.
- **Soft blueprint** behind large structural stages (hero, feature splits, guidelines wells, muted bands) via `.su-section-band__stage`.
- Homepage bands (features, init, config, deploy, audience) and inner pages (page header + body column) all use the same helpers.

### Still do not

- Do not wrap every leaf card, FAQ row, or button in its own ornate frame.
- Do not stack a full card border, a corner frame, and a heavy shadow on the same object.
- Do not gold-tint ink or add multi-color glows.

### Surfaces (canonical)

**`.su-pattern-blueprint`** default. Hairline rules (1px) + ≤1px dots at intersections. Cell `--su-cell: 28px`.

| Role | Light | Dark | Modifier |
| --- | --- | --- | --- |
| Hero / default | ~4.8% | ~5.8% | (base) |
| Well | ~6.2% | ~7.2% | `.is-well` |
| Empty / large fields | ~2.8% | ~3.4% | `.is-empty` |
| Dense cell (16px) | well or quieter | same | `.is-dense` |

Supporting: **`.su-pattern-dots`**, **`.su-pattern-columns`**. Use **`.is-overlay`** on stages over the page canvas.

### Registration frames (canonical)

| Utility | Layout role |
| --- | --- |
| **`.su-frame-corners`** | Content column box: hairline border + ~6px corner squares. |
| **`.su-frame-brackets`** | Alternate column or section registration (L-brackets). |
| **`.su-frame-dashed`** | Optional docs-only structural callouts. |

### Pattern rules

- Site-wide language from layouts; do not hand-paint one route only.
- Gold stays on actions and CTAs only.
- Passe-partout metaphor: Shellui frames **regions** on the artboard; the user's app remains the artwork inside.

Type: system font. One `h1` (`text-4xl font-bold md:text-5xl` inner pages, or `font-semibold tracking-tight` on feature openings). Lede `text-lg text-muted-foreground`. Section `text-2xl` / `text-3xl font-semibold tracking-tight`. Body `text-base/7`. Measure ~60-70 characters. Button: `rounded-md bg-primary px-3.5 py-2.5 text-sm font-semibold text-primary-foreground`. Secondary is a text link. Gold is scarce. Widths: `max-w-7xl` feature chrome, `max-w-5xl` guidelines, `max-w-3xl` reading prose. Horizontal shell: `.page-x` (`px-4 sm:px-6 lg:px-8`) on the outer band only; keep `max-w-*` children without horizontal padding so header, body, and footer share one content edge. Section steps `.page-top`, `mt-10`, `mt-16`.

## Reuse

Prefer shipped Tailwind Plus patterns. Paste into Nunjucks or `{% demo %}`. Restyle with Shellui tokens. Native `<dialog>` / `el-dialog` on this site; shell SDK for toasts inside a hosted app.

| Job | File | Pattern |
| --- | --- | --- |
| Product opening | `src/index.njk` | Centered hero, dual CTA |
| Nav | `src/_includes/nav.njk` | Flyouts, Alpine, no new menu library |
| Feature split | `src/features/index.njk`, `layouts/feature.njk` | Two-column, one dominant piece |
| Pricing | `src/pricing/index.md` | Two-tier |
| FAQ | `src/_includes/home-faq.njk` | Split heading + definitions |
| Article | `layouts/post.njk` | Narrow measure |
| Inner page | `layouts/page.njk`, `guidelines.njk` | Breadcrumb, h1, lede, prose |
| CTA band | `layouts/feature.njk` | One quiet band |
| Code | `{% highlight %}` | Shiki |
| Demo | `src/blocks/*.njk` | Real HTML, no iframe |

**Shellui brand ambient** is allowed: a soft primary / amber wash (`blur-3xl`, `from-primary to-amber-200`) behind the homepage hero or a quiet CTA. Static is fine. Reject multi-color blobs, logo clouds, gradient fields, testimonial marquees, and fake dashboards.

## Compose

First viewport is the argument, not a masthead plus setup. Start with the reader's job. Executive path (identity, headings, one action) and audit path (commands, config, tables) are both required. Copy follows writing guidelines (hyphens, no em dashes, no `easy` / `simple` / `quick`).

One page-level throughline. One focal relationship per reading moment. Squint: one dominant claim. If every block has equal weight, redesign. Never fill an evidence gap with panels, icons, or effects.

Passes: frame the job → choose composition → apply this visual system → inspect both themes. Deliver the implementation, not a score.

## Reject

- All-caps tracked eyebrows as decoration
- Em dashes or en dashes as punctuation
- `easy`, `simple`, `quick`, `seamless`, `unlock`, `leverage`
- Multi-color glows, stripes, glass, ornamental shadows. Soft primary/amber hero ambient is allowed (see Reuse)
- Generic centered hero plus equal-weight card grid
- Nested cards, or borders used to repair weak hierarchy
- Loud pattern ink, animated grids, or gold used on dots, rules, or corner marks
- Arbitrary icon tiles, logo clouds, fake screenshots
- A second theme picker, second nav, or host chrome rebuilt in an iframe
- Leading a shipping-product page with AI / MCP / marketplace atmosphere
- Authoring-process narration in page copy

Restraint is precise hierarchy, readable type, scarce gold, and evidence - not empty margins.

## A11y

Landmarks, one `h1`, ordered headings, native controls, visible `focus-visible` rings. WCAG AA. Source order is reading order. `min-w-0` on flex/grid children. Details: `https://shellui.com/guidelines/web-design.md`.
