---
title: Design
description: How to compose on-brand Shellui pages. Fetch this file first when building website or product surfaces. The HTML page at /guidelines/design/ is a human visual handbook - do not scrape it.
version: 1.1.0
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
2. Preserve the host stack: Eleventy 3, Tailwind CSS v4, Tailwind Plus patterns already in this repo, Alpine for light demos, shadcn-compatible CSS variables. No new framework, CSS library, or token system.
3. Make the reader's question, strongest supported answer, and material evidence immediately clear.
4. Establish Shellui authorship through existing nav/footer chrome, system typography, gray canvas, and scarce primary gold.
5. Choose a composition specific to this material. Do not clone an unrelated page as a template.
6. Refine responsive behavior and details without weakening the hierarchy.

Ask questions only when proceeding could change product claims, pricing, security, or CTAs. Otherwise omit the unknown, label it, and proceed.

## Stack

- Templates: Nunjucks in `src/`. Layouts: `base`, `page`, `feature`, `post`, `guidelines`, `guidelines-design`.
- CSS: `src/assets/css/input.css` → `/assets/css/site.css`. Token values: `src/_data/designTokens.js` (must match `input.css`).
- JS: Alpine (`src/blocks/`), Plus Elements (`/assets/js/elements.js`), theme toggle (`src/assets/js/site.js`).
- Images: `img/`, logos from `/brand-assets/`. Do not stretch or recolor the wordmark.
- Iframe: site can load in the shell (`@shellui/sdk` tiny). Do not cover host chrome. Theme follows `html.dark`.
- Do not ship a single-file HTML deliverable, a React/Vite rewrite, or a parallel design-system package.

Chrome to reuse: `nav.njk` (fixed `h-16`), `footer.njk`, `logo.njk`. Main padding: `.page-top`. Do not add a second header, mega-footer, announcement bar, or extra theme switcher.

## Tokens

Gray canvas. Honey gold is the action color, not a wash. Prefer token utilities (`bg-background`, `text-foreground`, `border-border`, `bg-muted`, `text-muted-foreground`, `bg-primary`, `text-primary-foreground`, `text-primary-ink`, `bg-card`). In dark, gold text is `dark:text-primary` because `primary-ink` is not remapped.

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

Type: system font. One `h1` (`text-4xl font-bold md:text-5xl` inner pages, or `font-semibold tracking-tight` on feature openings). Lede `text-lg text-muted-foreground`. Section `text-2xl` / `text-3xl font-semibold tracking-tight`. Body `text-base/7`. Measure ~60-70 characters. Button: `rounded-md bg-primary px-3.5 py-2.5 text-sm font-semibold text-primary-foreground`. Secondary is a text link. Gold is scarce. Widths: `max-w-7xl` feature chrome, `max-w-5xl` guidelines, `max-w-3xl` reading prose. Padding `px-4 sm:px-6 lg:px-8`. Section steps `.page-top`, `mt-10`, `mt-16`.

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

Homepage blur blobs are legacy. New pages must not add `blur-3xl` clip-path polygons, logo clouds, gradient fields, testimonial marquees, or fake dashboards.

## Compose

First viewport is the argument, not a masthead plus setup. Start with the reader's job. Executive path (identity, headings, one action) and audit path (commands, config, tables) are both required. Copy follows writing guidelines (hyphens, no em dashes, no `easy` / `simple` / `quick`).

One page-level throughline. One focal relationship per reading moment. Squint: one dominant claim. If every block has equal weight, redesign. Never fill an evidence gap with panels, icons, or effects.

Passes: frame the job → choose composition → apply this visual system → inspect both themes. Deliver the implementation, not a score.

## Reject

- All-caps tracked eyebrows as decoration
- Em dashes or en dashes as punctuation
- `easy`, `simple`, `quick`, `seamless`, `unlock`, `leverage`
- Decorative gradients, glows, blobs, stripes, glass, ornamental shadows
- Generic centered hero plus equal-weight card grid
- Nested cards, or borders used to repair weak hierarchy
- Arbitrary icon tiles, logo clouds, fake screenshots
- A second theme picker, second nav, or host chrome rebuilt in an iframe
- Leading a shipping-product page with AI / MCP / marketplace atmosphere
- Authoring-process narration in page copy

Restraint is precise hierarchy, readable type, scarce gold, and evidence - not empty margins.

## A11y

Landmarks, one `h1`, ordered headings, native controls, visible `focus-visible` rings. WCAG AA. Source order is reading order. `min-w-0` on flex/grid children. Details: `https://shellui.com/guidelines/web-design.md`.
