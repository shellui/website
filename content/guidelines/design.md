---
title: Design
description: How to compose on-brand Shellui pages. Fetch this file first when building website or product surfaces.
version: 1.0.0
---

Act as an excellent Shellui designer, editor, and information architect. Turn the available material into an official Shellui-authored page. Shape the argument and the interface together. Do not restyle a dump of sections or assemble a generic landing page.

Fetch this file at `https://shellui.com/design.md`. It is the composition authority for new pages. It does not replace the writing or web-design handbooks.

- Writing (voice, banned words, hyphens): `https://shellui.com/guidelines/writing.md`
- Web design (a11y, focus, iframe chrome): `https://shellui.com/guidelines/web-design.md`
- Skills: `skills/design-md/SKILL.md`, then `skills/writing-guidelines/SKILL.md` and `skills/web-design-guidelines/SKILL.md` as needed

## Shellui product and brand context

Shellui is an open-source web app development platform: a microfrontend shell that wraps an application with shared navigation, authentication, administration, and storage. The audience is developers shipping a product inside that shell.

Make the artifact precise, calm, direct, technically literate, evidence-led, and restrained. Build confidence through clarity and proof. Never manufacture confidence through hype, decoration, novelty, or exaggerated claims.

Start with the reader's job, not the page category. Identify what the reader needs to understand or decide, the strongest supported answer, the evidence that earns that answer, and the caveat that could change it.

Lead with what ships today: iframe host, `@shellui/sdk`, identity-service or Supabase Auth, admin at `/admin`, storage-service or Supabase Storage, Files. Keep AI, MCP, marketplace, and app-store chrome quiet unless the page is actually about that surface.

The product name is **Shellui** only. Never "The Host". In prose, "the shell" (lowercase) is the running host around the iframe app.

Treat marketing pages and in-shell surfaces as the same authorship: developer-first, config-and-chrome density, scarce honey-gold accent. Aim for infrastructure-product restraint, not a campaign site.

## Use this priority order

When requirements compete, protect them in this order:

1. Preserve supplied facts, package names, URLs, units, qualifiers, and task constraints.
2. Preserve the host stack: Eleventy 3, Tailwind CSS v4, Tailwind Plus patterns already in this repo, Alpine for light demos, shadcn-compatible CSS variables. Do not introduce a new framework, CSS library, or token system.
3. Make the reader's question, strongest supported answer, and material evidence immediately clear.
4. Establish unmistakable Shellui authorship through the existing nav/footer chrome, system typography, gray canvas, and scarce primary gold.
5. Choose a composition specific to this material. Avoid both generic model defaults and cloning an unrelated Shellui page as a template.
6. Refine responsive behavior, interaction, and details without weakening the hierarchy.

Ask one grouped set of questions only when proceeding could change product claims, pricing, security, or calls to action. Otherwise omit the unknown, label it honestly, and proceed.

## Integrate with this website

This repository is the official Shellui website.

- **Templates**: Nunjucks in `src/`. Layouts in `src/_includes/layouts/` (`base`, `page`, `feature`, `post`, `guidelines`).
- **CSS**: `src/assets/css/input.css` compiles to `/assets/css/site.css`. Do not add a CDN Tailwind, a second stylesheet, or a CSS-in-JS runtime.
- **JS**: Alpine (`src/blocks/`, `{% demo "name" %}`), Tailwind Plus Elements (`/assets/js/elements.js`), site theme toggle (`src/assets/js/site.js`). Prefer existing includes over new JS.
- **Images**: `img/` and `img/brand-assets/`. Logos from `/brand-assets/`. Do not stretch, recolor, or replace the wordmark.
- **Iframe**: this site can load inside the Shellui shell (`@shellui/sdk` tiny). Do not cover host chrome. Theme follows `html.dark`.

Do not force a single-file HTML deliverable, a React/Vite rewrite, or a parallel design-system package. Edit the files that naturally own the experience.

## Work in four passes

### Frame the reader's job

Inspect all available material before designing. Privately establish:

- Who opens this, in what context, to decide or understand what?
- What is the strongest supported answer?
- What evidence makes that answer credible?
- What tradeoff, uncertainty, or limit changes its interpretation?

Order by reader need, not nav order. Support two reading speeds:

- **Executive path**: identity, title, headings, and one decisive action communicate the argument quickly.
- **Audit path**: exact commands, config keys, tables, and caveats preserve the record.

Write the executive path in plain language. Keep exact package names (`@shellui/sdk`, `shellui.config.ts`) in the audit path. Define an unfamiliar term at first use. Never leak this file's authoring vocabulary (composition, hierarchy, squint test) into page copy.

Copy follows the writing guidelines: active voice, `you`, sentence-case headings, hyphen `-` for pauses, no em dashes, no `easy` / `simple` / `quick`.

Every section must answer a new reader question. Combine duplicates. One evidence home per claim.

### Choose the composition

The first viewport is the argument, not a masthead followed by setup. If the reader saw only this viewport, they should remember the product relationship or decision, not the mood.

Before designing, privately name the obvious layout the page category would suggest. Reject it unless the material earns it. A features page need not be four equal cards. A docs-adjacent page need not be a centered hero plus logo cloud.

When the material admits multiple structures, privately compare two materially different composition hypotheses. Change topology and evidence placement, not merely palette.

Match the opening to the job:

- A product surface (feature, architecture): lead with what the shell does for the reader, then the mechanism (SDK, iframe, service).
- A comparison: put alternatives on the same visual basis.
- A how-to: the first command or config earns the first viewport; do not bury it under atmosphere.
- A brief with no supported decision: lead with the strongest supported state, not an invented CTA.

Compose the page as a field, not a stack of cards. One page-level throughline. One focal relationship per reading moment. Surround it with a small number of supporting objects and enough open space. Repetition creates rhythm only when the repeated items are true peers.

Use a **squint test**: at a glance, the dominant claim should be obvious. Use a **text-mask test**: with the words blurred, hierarchy should still communicate identity, grouping, and progression. If every block has equal weight, redesign before coding.

When a page feels too safe, strengthen one focal relationship through proportion, hierarchy, or evidence placement. Make supporting content quieter. Never fill an evidence gap with panels, icons, gradient fields, or effects.

### Authoritative Shellui visual system

Treat this section as the design authority for new work. Use the compiled site CSS and Tailwind utilities for exact tokens. Use these instructions for composition and when primitives are appropriate.

#### Authorship shell

Completed marketing pages use the existing chrome:

- Header: `src/_includes/nav.njk` (fixed `h-16`, Features and Developers flyouts, Docs, Blog, theme toggle)
- Footer: `src/_includes/footer.njk` (wordmark, Features / Developers / Product / Company)
- Logo sprite: `src/_includes/logo.njk` and `logo-sprite.njk`
- Main padding: `.page-top` (`pt-20 md:pt-24 lg:pt-32`) so content clears the fixed header

Do not invent a second header, a marketing mega-footer, or a floating announcement bar. Do not add a visible theme switcher besides the existing `.theme-toggle`.

In-shell apps: host owns sidebar, top bar, or window layout, toasts, dialogs, drawers, theme, and language. Apps talk through `@shellui/sdk`. Do not rebuild host chrome in the iframe.

#### Tailwind Plus (paid, prefer these)

This site is licensed for Tailwind Plus. Paste Plus HTML into Nunjucks or `{% demo "name" %}` blocks (`src/blocks/`). Load interaction through Plus Elements (`el-*` in `/assets/js/elements.js`) when a native control is not enough. Restyle with Shellui tokens. Do not invent a new marketing kit.

Reuse or adapt these shipped patterns before creating new ones:

| Job | Where it already lives | Plus-shaped pattern |
| --- | --- | --- |
| Centered product opening | `src/index.njk` | Simple centered hero, dual CTA (`Get started` + GitHub) |
| Feature flyout + mobile drawer | `src/_includes/nav.njk` | Navbar with flyouts; Alpine state, not a new menu library |
| Feature split (copy + visual) | `src/features/index.njk`, `layouts/feature.njk` | Two-column feature; one dominant piece, not four equal tiles |
| Pricing comparison | `src/pricing/index.md` | Two-tier pricing; MIT vs paid help |
| FAQ | `src/_includes/home-faq.njk` | Split heading + definition list |
| Blog article | `src/_includes/layouts/post.njk` | Narrow measure, author row, `article-body` |
| Inner doc/page | `layouts/page.njk`, `layouts/guidelines.njk` | Breadcrumb, h1, lede, prose |
| CTA band | `layouts/feature.njk` playground CTA | Single quiet band, not a second hero |
| 404 | `src/404.njk` | Simple centered error |
| Code | `{% highlight %}` / `.code-sample` | Shiki, language tag, filename optional |
| In-page demo | `src/blocks/*.njk` | Alpine tabs/panels; real HTML, no iframe |

Plus Elements are already on every page. Prefer `el-dialog` / native `<dialog>` for a modal on this site; prefer the shell SDK for toasts and dialogs inside a hosted app.

Do not paste Plus blocks that exist only to decorate: logo clouds, gradient blobs, testimonial marquee, wavy dividers, numbered icon grids, fake dashboard screenshots.

The current homepage still contains Plus hero **blur blobs**. That is legacy. New pages must not add more. Do not copy `blur-3xl` clip-path polygons forward.

#### Grid, type, and rhythm

- Outer width: `max-w-7xl` for feature/index chrome, `max-w-5xl` for guidelines and brand assets, `max-w-3xl` / `max-w-2xl` for reading prose.
- Horizontal padding: `px-4 sm:px-6 lg:px-8`.
- System font stack (Tailwind default). No webfont unless a later change adds one on purpose.
- Page h1: `text-4xl font-bold md:text-5xl` on inner pages, or `font-semibold tracking-tight` on feature openings. One h1.
- Lede: `mt-4 text-lg text-gray-600 dark:text-gray-400` (or `text-pretty`).
- Section h2: `text-2xl` / `text-3xl font-semibold tracking-tight`. Sentence case.
- Body: `text-base/7`. Comfortable measure (~60–70 characters). Rewrite before shrinking.
- Buttons: `rounded-md bg-primary px-3.5 py-2.5 text-sm font-semibold text-primary-foreground` for the primary action; text link for the secondary.
- Cards: earn them. `rounded-xl border border-border bg-card shadow-sm`. Do not wrap every section in a card.
- Gold is scarce: primary buttons, eyebrow, key links (`text-primary-ink dark:text-primary`). Do not flood headings in gold.

Build vertical rhythm from relationships: heading close to its first paragraph; larger gap at section turns. `.page-top` and `mt-10` / `mt-16` are the usual section steps. Do not invent a parallel spacing scale.

#### Color, surfaces, and tokens

Design on a gray canvas. Honey gold is the action color, not a wash. Light and dark are both first-class (`html.dark`, `localStorage.theme`).

Use shadcn-compatible tokens already mapped in `src/assets/css/input.css`. Prefer `bg-background`, `text-foreground`, `border-border`, `bg-muted`, `text-muted-foreground`, `bg-primary`, `text-primary-foreground`, `text-primary-ink`, `bg-card`. Do not add a second `:root` palette or HSL clone.

| Token | Light | Dark | Role |
| --- | --- | --- | --- |
| `background` | `#ffffff` | `#030712` (gray-950) | Page canvas |
| `foreground` | `#111827` (gray-900) | `#f9fafb` | Primary text |
| `muted` | `#f9fafb` (gray-50) | `rgb(255 255 255 / 0.05)` | Quiet wells |
| `muted-foreground` | `#4b5563` (gray-600) | `#9ca3af` | Secondary text |
| `border` | `#e5e7eb` (gray-200) | `#1f2937` (gray-800) | Rules, cards |
| `card` | `#ffffff` | `#111827` (gray-900) | Raised surface |
| `primary` | `#e3a512` | `#e8b84a` | Accent / buttons |
| `primary-foreground` | `#1a1408` | `#1a1408` | Text on gold |
| `primary-ink` | `#c4920a` | (same gold in dark via `primary`) | Gold text on light |
| `ring` | `#e3a512` | `#e8b84a` | Focus |
| radius | `0.75rem` cards (`rounded-xl`); `0.375rem` controls (`rounded-md`) | same | Shape |

Existing pages still use explicit `bg-white dark:bg-gray-950` and `border-gray-200 dark:border-gray-800`. That is the same palette. New work should use the token names so light/dark stay in lockstep.

The page is normally one continuous canvas. Earn a border or surface only when spacing cannot express the grouping. Hard reject decorative gradients, gradient text, glows, blobs, stripes, textures, glass, grid backgrounds, and fake depth.

#### Data, media, motion

Tables are evidence: full available width, semantic `<table>`, numeric columns right-aligned, caption stating what to notice. Do not default to a chart because numbers exist.

Use screenshots, diagrams, or logos only when they are evidence. Brand files: `/brand-assets/`. Never add stock imagery, decorative AI illustrations, or icons in colored tiles.

Default to stillness. Honor `prefers-reduced-motion`. The existing theme reveal (View Transitions, circular clip) is allowed on the theme toggle only. Do not reveal every section on scroll as a personality trick. `animate-on-scroll` exists on the homepage; do not spread it.

### Inspect and revise privately

Render the actual page. Inspect the first viewport, full page, and both themes.

Review in this order:

1. First read: is Shellui authorship immediate? Would the reader remember the product relationship, not the decoration?
2. Language: writing guidelines. Hyphens, not em dashes. No banned marketing words.
3. Composition: one dominant object? Accidental empty space?
4. Tokens and Plus: did you reuse a shipped pattern, or invent a kit?
5. Chrome: does anything sit under the fixed header or fight the shell iframe?
6. Restraint: can any surface, gold, icon, or section be removed without losing meaning?
7. Themes and reflow: equivalent hierarchy in light and dark; no overflow.
8. Trust: semantics, focus, labels, skip path, sources.

Keep this work internal. Deliver the implementation, not a score.

## Reject generated-design reflexes

Do not ship any of these:

- All-caps or tracked eyebrows as decoration (a single product eyebrow is enough; do not number every section)
- Em dashes (`—`) or en dashes (`–`) as punctuation
- `easy`, `simple`, `quick`, `seamless`, `unlock`, `leverage`
- Decorative gradients, glows, blobs, stripes, glass, ornamental shadows
- Generic centered hero followed by an equal-weight card grid
- Repeated metric boxes when one composed relationship would be clearer
- Cards nested in cards, or borders used to repair weak hierarchy
- Arbitrary icon tiles, oversized icons, mixed icon styles
- Logo clouds, testimonial marquees, fake product screenshots
- Tiny muted prose, arbitrary font sizes, inconsistent peer values
- A second theme picker, a second nav, or host chrome rebuilt in an iframe
- Leading a shipping-product page with AI, MCP, or marketplace atmosphere
- Authoring-process narration in the page copy

Do not compensate by producing a sterile anti-design template. Shellui restraint is precise hierarchy, readable type, scarce gold, and evidence. It is not empty margins and a gray void.

## Accessibility and responsive behavior

Landmarks, one `h1`, ordered headings, native controls, visible `focus-visible` rings, text alternatives. Meet WCAG AA. Source order is reading order. `min-w-0` on flex/grid children. Usable from desktop down without disabling zoom. Details: `https://shellui.com/guidelines/web-design.md`.
