---
title: Interface
description: Composition, chrome, layout, accessibility, and visual language for shellui.com, docs, and in-shell apps.
version: 2.1.0
updated: 2026-10-26
canonical: /guidelines/interface/
related: /design.md, /guidelines/foundations/, /guidelines/writing/
---

Interface rules cover layout, interaction, and composition on [shellui.com](https://shellui.com), [docs.shellui.com](https://docs.shellui.com), and apps hosted in the Shellui iframe. Pair with [Writing](/guidelines/writing/) for copy and [Foundations](/guidelines/foundations/) for tokens. Lead with the shipping shell: navigation, authentication, administration, storage, light and dark themes. Keep AI, MCP, and marketplace chrome out of the default UI.

Agents: load this file or `/design.md` (stable alias). Do not scrape HTML handbooks. The `version` field in frontmatter is the public "Guidelines v…" label.

## How to use this file

- **Humans**: `/guidelines/interface/`
- **Agents**: `https://shellui.com/guidelines/interface.md` or `https://shellui.com/design.md`
- **Writing**: [writing.md](/guidelines/writing/) for voice, punctuation, and banned words
- **Tokens**: [foundations.md](/guidelines/foundations/) and [tokens.json](/guidelines/generated/tokens.json)
- **Brand logos**: [brand.md](/guidelines/brand/) only
- **Hub**: [Guidelines](/guidelines/)

Review files against every rule below. Output concise, high-signal findings. Sacrifice grammar for brevity.

## Product

Shellui is an open-source web app development platform: a microfrontend shell with shared navigation, authentication, administration, and storage. Audience: developers shipping a product inside that shell.

Precise, calm, direct, technically literate, evidence-led, restrained. Name is **Shellui** only. Never "The Host". In prose, "the shell" (lowercase) is the running host. Lead with what ships today (iframe host, `@shellui/sdk`, identity-service or Supabase Auth, `/admin`, storage, Files). Keep AI, MCP, marketplace, and app-store chrome quiet unless the page is about that surface.

## Priority (when building pages)

1. Preserve supplied facts, package names, URLs, units, qualifiers, and task constraints.
2. Preserve the host stack: Eleventy 3, Tailwind CSS v4, Tailwind Plus patterns already in this repo, Alpine for light demos, shadcn-compatible CSS variables. No new framework, CSS library, or parallel token system apart from the page-scoped island exception under Stack.
3. Make the reader's question, strongest supported answer, and material evidence immediately clear.
4. Establish Shellui authorship through existing nav/footer chrome, Inter typography, gray canvas, and scarce primary gold.
5. Choose a composition specific to this material. Do not clone an unrelated page as a template.
6. Refine responsive behavior and details without weakening the hierarchy.

Ask questions only when proceeding could change product claims, pricing, security, or CTAs. Otherwise omit the unknown, label it, and proceed.

## Stack

- Templates: Nunjucks in `src/`. Layouts: `base`, `page`, `feature`, `post`, `guidelines`, `guidelines-foundations`.
- CSS: `src/assets/css/input.css` → `/assets/css/site.css`. Token values: generated from `tokens/tokens.json` into `src/_data/designTokens.js` and `input.css`.
- JS: Alpine (`src/blocks/`), Plus Elements (`/assets/js/elements.js`), theme toggle (`src/assets/js/site.js`).
- Islands: one page may lazy-load one React bundle for a single interactive piece it cannot express in Alpine. Source in `src/islands/`, bundled by esbuild with its CSS inlined. Ship a static fallback in Nunjucks and reuse token variables.
- Images: `img/`, logos from [Brand downloads](/guidelines/brand/#downloads). Do not stretch or recolor the wordmark.
- Iframe: site can load in the shell (`@shellui/sdk` tiny). Do not cover host chrome. Theme follows `html.dark`.
- Do not ship a single-file HTML deliverable, a React/Vite rewrite, or a parallel design-system package.

Chrome to reuse: `nav.njk` (fixed `h-16`), `footer.njk`, `logo.njk`. Main padding: `.page-top` (below the fixed header) and `.page-x` (horizontal gutters). Do not add a second header, mega-footer, announcement bar, or extra theme switcher.

## Shellui chrome

The product is a microfrontend shell. The host owns shared chrome; the iframe owns the app.

- Host chrome: sidebar, top bar, or window layout, plus toasts, dialogs, drawers, theme, and language. Do not rebuild those inside the iframe
- Iframe apps talk to the shell with `@shellui/sdk` (`init`, postMessage). Do not reach into host DOM
- Layout mode is a shell concern (`shellui.config.ts`). App UI must work in sidebar, top-bar, and window layouts
- Do not cover the shell header, nav, or toast region. Fixed app bars need an offset for host chrome
- Authentication, admin (`/admin`), and Files are shell surfaces. Deep-link them; don't clone their navigation
- Theme and locale live in the shell. Read them; don't ship a second theme picker in the app unless the app is the settings surface
- Prefer existing Tailwind tokens from [Foundations](/guidelines/foundations/). Primary accent is honey gold (`--color-primary`, `--color-primary-ink`). Do not invent a second brand color
- Marketing site chrome: fixed header (`h-16`), `.page-top` and `.page-x` gutters, footer. Put `.page-x` on the outer band and keep `max-w-*` children unpadded so they align with the header. Sticky in-page UI must clear the header
- Logos and marks: see [Brand](/guidelines/brand/). Do not stretch, recolor, or swap in a different wordmark

## Accessibility and focus

- Icon-only buttons need `aria-label`
- Form controls need a `<label>` or `aria-label`
- Interactive elements need keyboard handlers (`onKeyDown` / `onKeyUp` where click is not enough)
- `<button>` for actions; `<a>` for navigation. Never a `<div>` with a click handler
- Images need `alt` (or `alt=""` if decorative)
- Decorative icons need `aria-hidden="true"`
- Async updates (toasts, validation) need `aria-live="polite"`. Shell toasts already live in the host - use the SDK, don't mount a second live region that fights the host
- Semantic HTML (`header`, `nav`, `main`, `footer`) before ARIA
- Headings hierarchical `h1` to `h6`; one `h1` per page
- Include a skip link to main content on long chrome (shell and marketing header)
- `scroll-margin-top` on heading anchors so the fixed header does not cover the target
- Meaningful media needs captions, transcripts, or descriptions
- Media controls need keyboard support; hide decorative media from assistive tech
- Interactive elements need visible focus: `focus-visible:ring-*` or equivalent
- Never `outline-none` without a focus replacement
- Use `:focus-visible` over `:focus` (avoid a ring on pointer click)
- Group focus with `:focus-within` for compound controls
- Trap focus in dialogs; return it to the trigger on close
- Hit targets: if the visual control is < 24px, expand the hit area to ≥ 24px; on mobile ≥ 44px
- Status is not color alone; include a text label
- Sticky headers, footers, and overlays must not cover the focused element (16 × 4px marketing header; shell top bar in top-bar layout)

## Forms and input

- Inputs need `autocomplete` and a meaningful `name`
- Use the correct `type` (`email`, `tel`, `url`, `number`) and `inputmode`
- Never block paste (`onPaste` + `preventDefault`)
- Labels clickable (`htmlFor` or wrapping the control)
- Disable spellcheck on emails, codes, usernames, tokens (`spellCheck={false}`)
- Checkboxes and radios: label and control share one hit target (no dead zones)
- Submit stays enabled until the request starts; spinner during the request; keep the original label
- Do not pre-disable submit on incomplete forms; submitting surfaces errors
- Do not block keystrokes on typed fields; validate after input
- Enter submits when a text input is the only control; in `<textarea>`, ⌘/Ctrl+Enter submits
- Errors inline next to fields; focus the first error on submit
- Placeholders end with `…` and show an example pattern (`your_access_token_here…`)
- `autocomplete="off"` on non-auth fields to avoid password-manager triggers
- Warn before navigation with unsaved changes (`beforeunload` or a router guard)
- Auth fields belong in the shell when the app is hosted. Don't duplicate sign-in UI in the iframe unless you are replacing the identity backend

## Reuse

Prefer shipped Tailwind Plus patterns. Paste into Nunjucks or `{% demo %}`. Restyle with Shellui tokens. Native `<dialog>` / `el-dialog` on this site; shell SDK for toasts inside a hosted app.

| Job | File | Pattern |
| --- | --- | --- |
| Product opening | `src/index.njk` | Centered hero, dual CTA |
| Nav | `src/_includes/nav.njk` | Flyouts, Alpine, no new menu library |
| Feature split | `src/features/index.md`, `layouts/feature.njk` | Two-column, one dominant piece |
| Pricing | `src/pricing/index.md` | Two-tier |
| Article | `layouts/post.njk` | Narrow measure |
| Inner page | `layouts/page.njk`, `guidelines.njk` | Breadcrumb, h1, lede, prose |
| Code | `{% highlight %}` | Shiki |
| Demo | `src/blocks/*.njk` | Real HTML, no iframe |

**Shellui brand ambient** is allowed: a soft primary / amber wash (`blur-3xl`, `from-primary to-amber-200`) behind the homepage hero or a quiet CTA. Static is fine. Reject multi-color blobs, logo clouds, gradient fields, testimonial marquees, and fake dashboards. Gradients elsewhere are not allowed except this wash.

## Compose

First viewport is the argument, not a masthead plus setup. Start with the reader's job. Executive path (identity, headings, one action) and audit path (commands, config, tables) are both required. Copy follows [Writing](/guidelines/writing/).

One page-level throughline. One focal relationship per reading moment. Squint: one dominant claim. If every block has equal weight, redesign. Never fill an evidence gap with panels, icons, or effects.

Passes: frame the job → choose composition → apply Foundations tokens → inspect both themes. Deliver the implementation, not a score.

## Reject (visual)

- All-caps tracked eyebrows as decoration
- Multi-color glows, stripes, glass, ornamental shadows (soft primary/amber hero ambient is allowed)
- Generic centered hero plus equal-weight card grid
- Nested cards, or borders used to repair weak hierarchy
- Arbitrary icon tiles, logo clouds, fake screenshots
- A second theme picker, second nav, or host chrome rebuilt in an iframe
- Leading a shipping-product page with AI / MCP / marketplace atmosphere
- Authoring-process narration in page copy

Voice rejects (banned words, dashes): [Writing](/guidelines/writing/).

## Motion, touch, and layout

- Honor `prefers-reduced-motion` (reduced variant or disable). The marketing theme reveal already disables under that media query - match it
- Animate `transform` and `opacity` only (compositor-friendly)
- Never `transition: all`; list properties explicitly
- Set the correct `transform-origin`
- SVG: transforms on a `<g>` wrapper with `transform-box: fill-box; transform-origin: center`
- Animations interruptible - respond to input mid-animation
- Autoplay motion longer than 5 seconds needs pause, stop, or hide controls
- Muted decorative loops must stop under `prefers-reduced-motion`
- `touch-action: manipulation` (prevents double-tap zoom delay)
- Set `-webkit-tap-highlight-color` intentionally
- `overscroll-behavior: contain` in modals, drawers, and sheets - including shell drawers
- During drag: disable text selection, `inert` on dragged elements
- Drag, swipe, pinch, and path gestures need tap/click and keyboard alternatives unless the gesture is the whole point
- `autoFocus` sparingly - desktop only, single primary input; avoid on mobile
- Full-bleed layouts need `env(safe-area-inset-*)` for notches
- Avoid unwanted scrollbars: fix overflow rather than masking it with `overflow-x-hidden` on `body`
- Flex and grid over JavaScript measurement for layout
- Nested radii: child ≤ parent, concentric (`rounded-md` inside `rounded-xl`)
- Design empty, sparse, dense, and error states
- Inline help before tooltips
- Iframe apps: don't assume viewport height equals the window. The shell chrome eats space. Prefer `%` / flex inside the iframe, not `100vh`, unless you subtract host chrome

## Visual language

- Density: developer-facing, not crowded. Match existing `page-top`, `page-x`, `max-w-5xl` / `max-w-3xl` prose, `rounded-xl` cards, and gray borders on feature pages
- Light and dark are both first-class. Preview every screen in both. Marketing site: `html.dark` plus `localStorage.theme`. Product: `@shellui/core` theme
- `color-scheme: dark` on `html` when the dark theme is active (fixes scrollbar and native controls)
- `theme-color` meta matches the page background
- Native `<select>`: explicit `background-color` and `color` (Windows dark mode)
- Ellipsis `…`, not three dots `...`. Loading states: `Loading…`, `Saving…`
- Punctuation and banned words: [Writing guidelines](/guidelines/writing/) owns them. UI copy follows the same rules
- Straight quotes in source. Don't convert to curly quotes by hand
- `font-variant-numeric: tabular-nums` for number columns and comparisons
- `text-wrap: balance` or `text-pretty` on headings (prevents widows)
- Text containers handle long content: `truncate`, `line-clamp-*`, or `break-words`
- Flex children need `min-w-0` to allow truncation
- Handle empty states - don't render broken UI for empty strings or arrays
- User-generated content: anticipate short, average, and very long inputs
- Buttons and links need a `hover:` state. Hover, active, and focus should increase contrast, not flatten it
- Copy in the UI follows the [writing guidelines](/guidelines/writing/): active voice, sentence-case page headings, Title Case nav labels, specific button verbs ("Save token", not "Continue")
- Numerals for counts: "8 apps", not "eight"
- Error messages include the next step, not only the problem
- `&` over "and" only where space is tight (nav, buttons)
- Brand name **Shellui** never translates: `translate="no"` on the wordmark in HTML where auto-translate would garble it

## Images and themes

- Product screenshots ship as a light and dark pair with matching names: `*-light.*` and `*-dark.*`
- Open Graph images and social previews are light only. Platforms show one fixed image
- Covers and illustrations: prefer a theme-aware SVG. Otherwise use the light image in a bordered card
- In dark mode, light images sit in a subtle rounded card with a border so they don't glare
- Ship WebP with a PNG fallback. Set `width` and `height` to avoid layout shift. Lazy load below the fold
- Every image needs real `alt` text. Use `alt=""` only for decoration, and not through the shortcode

Use the `themedImage` shortcode. Pass base paths without the extension; it expects `.webp` and `.png` files with the same name. `alt`, `width`, and `height` are required, and the build fails without them. `class` and `loading` are optional; `loading` defaults to `lazy`.

```njk
{% themedImage { light: "/img/docs/files-light", dark: "/img/docs/files-dark", width: 1600, height: 1000, alt: "Files app with a shared folder open" } %}
```

For SVG, pass the full `.svg` path instead of a base path. The shortcode outputs a plain `<img>` with no WebP or PNG variants. The same required fields and `.dark` toggle apply:

```njk
{% themedImage { light: "/img/blog/cover-light.svg", dark: "/img/blog/cover-dark.svg", width: 1200, height: 630, alt: "Shellui cover" } %}
```

Leave out `dark` for a light-only image. In dark mode it renders inside a rounded card with a border:

```njk
{% themedImage { light: "/img/blog/cover", width: 1200, height: 630, alt: "Shellui cover", loading: "eager" } %}
```

## Performance and state

- `<img>` needs explicit `width` and `height` (prevents layout shift)
- Below-fold images: `loading="lazy"`
- Above-fold critical images: `fetchpriority="high"`
- Large lists (more than 50 items): virtualize or `content-visibility: auto`
- No layout reads in render (`getBoundingClientRect`, `offsetHeight`, `offsetWidth`, `scrollTop`)
- Batch DOM reads and writes; don't interleave
- Prefer uncontrolled inputs; controlled inputs must be cheap per keystroke
- Self-host third-party scripts when practical (`@shellui/sdk` tiny ships from `/assets/js/`). Use Subresource Integrity if you must load from a CDN
- Critical fonts: Inter is self-hosted with preload and `font-display: swap`. Do not add a second webfont without a reason
- Prefer compressed video over animated GIF; provide a still alternative
- Short decorative loops: muted video, `prefers-reduced-motion` media condition, still fallback
- URL reflects state - filters, tabs, pagination, expanded panels in query params. Deep-link stateful UI
- Links are real links (`<a>`), so Cmd/Ctrl+click and middle-click work
- Destructive actions need a confirmation modal or an undo window - never immediate
- Dates and times: `Intl.DateTimeFormat`, not hardcoded strings
- Numbers and currency: `Intl.NumberFormat`
- Detect language via `Accept-Language` / `navigator.languages`, not IP. The shell already owns locale
- Hydration: inputs with `value` need `onChange` (or `defaultValue` if uncontrolled)
- Date/time rendering: guard against server/client mismatch
- `suppressHydrationWarning` only where it is truly required
- Eleventy pages are static HTML. Don't hydrate a whole marketing page for a theme toggle - keep Alpine/JS scoped

## Anti-patterns (flag these)

- `user-scalable=no` or `maximum-scale=1` disabling zoom
- `onPaste` with `preventDefault`
- `transition: all`
- `outline-none` without a focus-visible replacement
- Click handler navigation without an `<a href>`
- `<div>` or `<span>` with click handlers that should be `<button>` or `<a>`
- Images without dimensions
- Large arrays `.map()` without virtualization
- Form inputs without labels
- Icon buttons without `aria-label`
- Submit disabled before the user tries (hides validation)
- Hit targets under 24px (44px on mobile) with no expanded area
- Hardcoded date/number formats (use `Intl.*`)
- `autoFocus` without a clear reason
- Animated GIF when compressed video is suitable
- Gesture-only action without tap/click and keyboard alternative
- Em dashes or en dashes as punctuation in UI copy (see Writing)
- Rebuilding shell toasts, dialogs, or nav inside the iframe
- `100vh` layouts that sit under host chrome
- A second theme picker in a hosted app
- Shipping-product UI that leads with AI, MCP, or marketplace chrome
- Missing dark-theme styles (`dark:` or theme tokens)
- Focus or headings hidden under the fixed marketing header or shell top bar

## Review output

Group by file. Use `file:line` format (clickable in VS Code). Terse findings.

    #### Example (guidelines hub)

    src/guidelines/index.njk:12 - icon button missing aria-label
    src/guidelines/index.njk:40 - heading target missing scroll-margin-top

    #### Example (CSS)

    src/assets/css/extras.css:22 - transition: all → list properties

    #### Example (pass)

    src/_includes/nav.njk - pass

State issue + location. Skip explanation unless the fix is non-obvious. No preamble.
