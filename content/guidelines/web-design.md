---
title: Web design guidelines
description: UI, accessibility, and chrome rules for Shellui website, docs, and in-shell apps.
version: 1.1.1
---

These rules cover layout, interaction, and visual language on [shellui.com](https://shellui.com), [docs.shellui.com](https://docs.shellui.com), and apps hosted in the Shellui iframe. Pair them with the [writing guidelines](/guidelines/writing/) for copy. Lead with the shipping shell: navigation, authentication, administration, storage, light and dark themes. Keep AI, MCP, and marketplace chrome out of the default UI.

Agents: load this file. Do not scrape the HTML page. The `version` field in the frontmatter is the public "Guidelines v…" label.

## How to use this file

- **Humans**: read the page at `/guidelines/web-design/`, or download this markdown
- **Agents**: read `content/guidelines/web-design.md` in this repo, or fetch `https://shellui.com/guidelines/web-design.md`
- **Skill wrapper**: `skills/web-design-guidelines/SKILL.md`
- **Sibling**: [writing guidelines](/guidelines/writing/) for voice and tone
- **Compose pages with**: [design.md](/design.md) (`fetch https://shellui.com/design.md`)
- **Hub**: [Guidelines](/guidelines/)

Review files against every rule below. Output concise, high-signal findings. Sacrifice grammar for brevity.

## Shellui chrome

The product is a microfrontend shell. The host owns shared chrome; the iframe owns the app.

- Host chrome: sidebar, top bar, or window layout, plus toasts, dialogs, drawers, theme, and language. Do not rebuild those inside the iframe
- Iframe apps talk to the shell with `@shellui/sdk` (`init`, postMessage). Do not reach into host DOM
- Layout mode is a shell concern (`shellui.config.ts`). App UI must work in sidebar, top-bar, and window layouts
- Do not cover the shell header, nav, or toast region. Fixed app bars need an offset for host chrome
- Authentication, admin (`/admin`), and Files are shell surfaces. Deep-link them; don't clone their navigation
- Theme and locale live in the shell. Read them; don't ship a second theme picker in the app unless the app is the settings surface
- Prefer existing Tailwind tokens. Primary accent is honey-gold (`--color-primary`, `--color-primary-ink`). Don't invent a second brand color
- Marketing site chrome: fixed header (`h-16`), `.page-top` and `.page-x` gutters, footer. Put `.page-x` on the outer band and keep `max-w-*` children undpadded so they align with the header. Sticky in-page UI must clear the header
- Logos and marks: download from [Brand assets](/brand-assets/). Don't stretch, recolor, or swap in a different wordmark

## Accessibility and focus

- Icon-only buttons need `aria-label`
- Form controls need a `<label>` or `aria-label`
- Interactive elements need keyboard handlers (`onKeyDown` / `onKeyUp` where click is not enough)
- `<button>` for actions; `<a>` for navigation. Never a `<div>` with a click handler
- Images need `alt` (or `alt=""` if decorative)
- Decorative icons need `aria-hidden="true"`
- Async updates (toasts, validation) need `aria-live="polite"`. Shell toasts already live in the host - use the SDK, don't mount a second live region that fights the host
- Semantic HTML (`header`, `nav`, `main`, `footer`) before ARIA
- Headings hierarchical `h1`–`h6`; one `h1` per page
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

- Density: developer-facing, not crowded. Match existing `page-top`, `page-x`, `max-w-5xl` / `max-w-3xl` prose, `rounded-xl` cards, and gray borders already on brand-assets and feature pages
- Light and dark are both first-class. Preview every screen in both. Marketing site: `html.dark` plus `localStorage.theme`. Product: `@shellui/core` theme
- `color-scheme: dark` on `html` when the dark theme is active (fixes scrollbar and native controls)
- `theme-color` meta matches the page background
- Native `<select>`: explicit `background-color` and `color` (Windows dark mode)
- Ellipsis `…`, not three dots `...`. Loading states: `Loading…`, `Saving…`
- Prefer hyphen `-` for a pause in UI copy. Ban em dashes (`—`) and en dashes (`–`) used as punctuation. Ordinary hyphens stay
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

## Performance and state

- `<img>` needs explicit `width` and `height` (prevents layout shift)
- Below-fold images: `loading="lazy"`
- Above-fold critical images: `fetchpriority="high"`
- Large lists (more than 50 items): virtualize or `content-visibility: auto`
- No layout reads in render (`getBoundingClientRect`, `offsetHeight`, `offsetWidth`, `scrollTop`)
- Batch DOM reads and writes; don't interleave
- Prefer uncontrolled inputs; controlled inputs must be cheap per keystroke
- `preconnect` for CDN and asset origins you actually use (jsDelivr for `@shellui/sdk` on this site)
- Critical fonts: preload with `font-display: swap`. This marketing site uses the system stack - don't add a webfont without a reason
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
- Em dashes in UI copy; "fixing" ordinary hyphens
- Rebuilding shell toasts, dialogs, or nav inside the iframe
- `100vh` layouts that sit under host chrome
- A second theme picker in a hosted app
- Shipping-product UI that leads with AI, MCP, or marketplace chrome
- Missing dark-theme styles (`dark:` or theme tokens)
- Focus or headings hidden under the fixed marketing header or shell top bar

## Review output

Group by file. Use `file:line` format (clickable in VS Code). Terse findings.

```text
## src/guidelines/index.njk

src/guidelines/index.njk:12 - icon button missing aria-label
src/guidelines/index.njk:40 - heading target missing scroll-margin-top
src/guidelines/index.njk:58 - animation missing prefers-reduced-motion

## src/assets/css/extras.css

src/assets/css/extras.css:22 - transition: all → list properties
src/assets/css/extras.css:41 - outline-none without focus-visible replacement

## src/_includes/nav.njk

✓ pass
```

State issue + location. Skip explanation unless the fix is non-obvious. No preamble.
