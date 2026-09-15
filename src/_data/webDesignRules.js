export default {
  sections: [
    {
      id: "chrome",
      title: "Shellui chrome",
      lede: "The host owns shared chrome. The iframe owns the app.",
      rules: [
        {
          lead: "Host owns chrome.",
          body: "Sidebar, top bar, window layout, toasts, dialogs, drawers, theme, and language stay in the shell. Do not rebuild them in the iframe.",
        },
        {
          lead: "Talk through the SDK.",
          body: "Iframe apps use `@shellui/sdk` (`init`, postMessage). Do not reach into host DOM.",
        },
        {
          lead: "Layouts are a shell concern.",
          body: "App UI must work in sidebar, top-bar, and window layouts from `shellui.config.ts`.",
        },
        {
          lead: "Never cover host chrome.",
          body: "Fixed app bars need an offset for the shell header, nav, and toast region.",
        },
        {
          lead: "Deep-link shell surfaces.",
          body: "Authentication, admin at `/admin`, and Files already exist. Do not clone their navigation.",
        },
        {
          lead: "One theme picker.",
          body: "Theme and locale live in the shell. Read them. Do not ship a second picker unless the app is the settings surface.",
        },
        {
          lead: "Marketing chrome is fixed.",
          body: "Header is `h-16` with `.page-top` padding and a footer. Sticky in-page UI must clear the header.",
        },
        {
          lead: "Logos from brand assets.",
          body: "Download marks from `/brand-assets/`. Do not stretch, recolor, or swap in a different wordmark.",
        },
      ],
    },
    {
      id: "interactions",
      title: "Interactions",
      lede: "If it looks interactive, it is interactive. Keyboard, pointer, and touch should agree.",
      rules: [
        {
          lead: "Keyboard works everywhere.",
          body: "All flows are keyboard-operable. Follow WAI-ARIA authoring patterns, including host dialogs.",
        },
        {
          lead: "Links are links.",
          body: "Use `<a href>` for navigation so Cmd/Ctrl-click, middle-click, and “open in new tab” work. Never a `<div>` or `<button>` that only changes the URL.",
        },
        {
          lead: "Buttons are buttons.",
          body: "`<button>` for actions. Never a clickable `<div>` or `<span>`.",
        },
        {
          lead: "Hit targets are generous.",
          body: "If the visual control is under 24px, expand the hit area to at least 24px. On mobile the minimum is 44px.",
        },
        {
          lead: "No dead zones.",
          body: "If part of a control looks clickable, it is. Label and control share one target on checkboxes and radios.",
        },
        {
          lead: "Deep-link state.",
          body: "Filters, tabs, pagination, and expanded panels belong in the URL so share, refresh, and back/forward work.",
        },
        {
          lead: "Gestures have alternatives.",
          body: "Every drag, swipe, pinch, or path action also works with tap/click and keyboard unless the gesture is the whole point.",
        },
        {
          lead: "Clean drag.",
          body: "While dragging, disable text selection and mark the dragged node `inert` so hover and selection do not fight it.",
        },
        {
          lead: "Confirm destructive actions.",
          body: "Require confirmation or offer undo with a safe window. Never delete on the first click.",
        },
        {
          lead: "Announce async updates.",
          body: "Use polite `aria-live` for toasts and inline validation. In the shell, use the SDK. Do not mount a second live region that fights the host.",
        },
        {
          lead: "Don't block paste.",
          body: "Never `preventDefault` on paste in inputs or textareas.",
        },
        {
          lead: "Autofocus sparingly.",
          body: "Desktop screens with a single primary input may autofocus. Avoid it on mobile: the keyboard opening shifts the layout.",
        },
      ],
    },
    {
      id: "focus",
      title: "Focus and accessibility",
      lede: "Sighted keyboard users and assistive tech should never lose the cursor.",
      rules: [
        {
          lead: "Visible focus.",
          body: "Every focusable element shows an unobscured `focus-visible` ring. Never `outline-none` without a replacement.",
        },
        {
          lead: "Prefer :focus-visible.",
          body: "Do not draw a ring on pointer click. Use `:focus-within` for grouped controls.",
        },
        {
          lead: "Manage focus in overlays.",
          body: "Trap focus in dialogs, move it to the overlay when it opens, and return it to the trigger when it closes.",
        },
        {
          lead: "Sticky chrome cannot cover focus.",
          body: "The 4rem marketing header and the shell top bar must never hide the focused element. Heading anchors need `scroll-margin-top`.",
        },
        {
          lead: "Semantics before ARIA.",
          body: "Prefer `button`, `a`, `label`, `table`, and landmarks. Then `aria-*`.",
        },
        {
          lead: "One h1, ordered headings.",
          body: "Hierarchical `h1`–`h6`. Include a skip link to main content on long chrome.",
        },
        {
          lead: "Name icon-only controls.",
          body: "Icon buttons need `aria-label`. Decorative icons get `aria-hidden=\"true\"`.",
        },
        {
          lead: "Images have alt.",
          body: "Meaningful images need `alt`. Decorative images use `alt=\"\"`.",
        },
        {
          lead: "Status is not color alone.",
          body: "Include a text label with color cues so the state survives color blindness and dark theme.",
        },
        {
          lead: "Accessible media.",
          body: "Caption speech, transcript audio, describe essential visuals. Hide decorative media. Media controls are keyboard-operable.",
        },
      ],
    },
    {
      id: "forms",
      title: "Forms",
      lede: "Let people type, paste, and submit. Show errors next to the field that caused them.",
      rules: [
        {
          lead: "Every control has a label.",
          body: "A `<label>` (clicked, it focuses the control) or an `aria-label`.",
        },
        {
          lead: "Don't pre-disable submit.",
          body: "Leave submit enabled on incomplete forms so validation can run. Disable only while the request is in flight, and keep the original label next to the spinner.",
        },
        {
          lead: "Don't block typing.",
          body: "Even numeric fields should accept input and then explain the error. Swallowing keystrokes with no message feels broken.",
        },
        {
          lead: "Enter submits.",
          body: "When a text input is the only control, Enter submits. In a `<textarea>`, Enter inserts a line; ⌘/Ctrl+Enter submits.",
        },
        {
          lead: "Errors live next to fields.",
          body: "On submit, focus the first error. Do not dump a summary at the top and leave the fields silent.",
        },
        {
          lead: "Autocomplete and names.",
          body: "Set `autocomplete` and a meaningful `name` so managers can fill the field. Use `autocomplete=\"off\"` on non-auth search fields.",
        },
        {
          lead: "Correct types.",
          body: "`type` and `inputmode` must match the data (`email`, `tel`, `url`, `number`).",
        },
        {
          lead: "Placeholders are examples.",
          body: "End with `…` and show a pattern (`your_access_token_here…`), not the label.",
        },
        {
          lead: "Spellcheck is selective.",
          body: "Disable it on emails, codes, usernames, and tokens.",
        },
        {
          lead: "Warn on unsaved changes.",
          body: "`beforeunload` or a router guard when data could be lost.",
        },
        {
          lead: "Auth stays in the shell.",
          body: "Hosted apps should not duplicate sign-in unless they are replacing the identity backend.",
        },
        {
          lead: "Loading buttons keep their name.",
          body: "Show a spinner and keep “Save token”, not a blank control. If you show a spinner, keep it visible briefly so it does not flicker.",
        },
      ],
    },
    {
      id: "motion",
      title: "Motion and touch",
      lede: "Motion explains cause and effect. It is not decoration.",
      rules: [
        {
          lead: "Honor prefers-reduced-motion.",
          body: "Provide a reduced variant or disable the motion. The marketing theme reveal already does this. Match it.",
        },
        {
          lead: "Animate transform and opacity.",
          body: "Those stay on the compositor. Do not animate width, height, top, or left.",
        },
        {
          lead: "Never transition: all.",
          body: "List only the properties you intend to change.",
        },
        {
          lead: "Animations are interruptible.",
          body: "User input cancels in-flight motion. Set the correct `transform-origin`.",
        },
        {
          lead: "No surprise autoplay.",
          body: "Motion longer than 5 seconds needs pause, stop, or hide. Muted decorative loops stop under `prefers-reduced-motion`.",
        },
        {
          lead: "SVG transforms on a group.",
          body: "Apply transforms to a `<g>` wrapper with `transform-box: fill-box; transform-origin: center`.",
        },
        {
          lead: "Touch is deliberate.",
          body: "`touch-action: manipulation` avoids double-tap zoom delay. Set `-webkit-tap-highlight-color` on purpose.",
        },
        {
          lead: "Contain overscroll.",
          body: "`overscroll-behavior: contain` in modals, drawers, and sheets, including shell drawers.",
        },
      ],
    },
    {
      id: "layout",
      title: "Layout",
      lede: "Let the browser size things. Fix overflow instead of hiding it.",
      rules: [
        {
          lead: "Flex and grid over measuring.",
          body: "Do not read `getBoundingClientRect` in render to decide layout.",
        },
        {
          lead: "Respect safe areas.",
          body: "Full-bleed layouts use `env(safe-area-inset-*)` for notches.",
        },
        {
          lead: "No leftover scrollbars.",
          body: "Fix overflow. Do not mask it with `overflow-x-hidden` on `body`.",
        },
        {
          lead: "min-w-0 on flex children.",
          body: "Truncation and wrapping fail without it.",
        },
        {
          lead: "Iframe height is not 100vh.",
          body: "Shell chrome eats space. Prefer `%` and flex inside the iframe, or subtract host chrome.",
        },
        {
          lead: "Nested radii stay concentric.",
          body: "Child radius is smaller than or equal to the parent (`rounded-md` inside `rounded-xl`) so the curves align.",
        },
        {
          lead: "Long content survives.",
          body: "Handle short, average, and very long strings with `truncate`, `line-clamp-*`, or `break-words`.",
        },
        {
          lead: "Design every density.",
          body: "Empty, sparse, dense, and error states are designed. Do not ship a layout that only works with perfect copy.",
        },
      ],
    },
    {
      id: "content",
      title: "Content in the UI",
      lede: "Copy in the interface follows the writing guidelines. This list is the UI-shaped remainder.",
      rules: [
        {
          lead: "Inline help first.",
          body: "Explain next to the control. Tooltips are a last resort.",
        },
        {
          lead: "Ellipsis is one character.",
          body: "Use `…`, not `...`. Loading copy is `Loading…`, `Saving…`.",
        },
        {
          lead: "Hyphens, not dashes.",
          body: "Pause with `-`. Ban em dashes and en dashes used as punctuation.",
        },
        {
          lead: "Straight quotes in source.",
          body: "Do not convert to curly quotes by hand.",
        },
        {
          lead: "Tabular numbers for comparisons.",
          body: "`font-variant-numeric: tabular-nums` on number columns.",
        },
        {
          lead: "Tidy headings.",
          body: "`text-wrap: balance` or `text-pretty` on headings. Sentence case. Specific button verbs (“Save token”, not “Continue”).",
        },
        {
          lead: "Numerals for counts.",
          body: "“8 apps”, not “eight”.",
        },
        {
          lead: "Errors include the next step.",
          body: "Name the problem and how to fix it.",
        },
        {
          lead: "Shellui does not translate.",
          body: "`translate=\"no\"` on the wordmark so browser auto-translate cannot garble it.",
        },
        {
          lead: "Locale from the shell.",
          body: "`Intl.DateTimeFormat` and `Intl.NumberFormat`. Detect language via `Accept-Language` / `navigator.languages`, not IP.",
        },
      ],
    },
    {
      id: "visual",
      title: "Visual language",
      lede: "Gray canvas, scarce honey gold. Light and dark are both first-class. Swatches live on the design page.",
      rules: [
        {
          lead: "Tokens, not a second palette.",
          body: "Prefer `--color-primary` and `--color-primary-ink`. Do not invent a brand color.",
        },
        {
          lead: "Preview both themes.",
          body: "Marketing uses `html.dark` and `localStorage.theme`. Product uses the shell theme.",
        },
        {
          lead: "Browser chrome matches the page.",
          body: "`color-scheme: dark` on `html` in dark theme. `theme-color` meta matches the canvas.",
        },
        {
          lead: "Native select needs colors.",
          body: "Set `background-color` and `color` on `<select>` or Windows dark mode will fail contrast.",
        },
        {
          lead: "Hover increases contrast.",
          body: "Buttons and links need a `hover:` state. Hover, active, and focus should get stronger, not flatter.",
        },
        {
          lead: "Developer density.",
          body: "Match existing `page-top`, `max-w-5xl` / `max-w-3xl` prose, `rounded-xl` cards, and gray borders. Not cramped, not a campaign site.",
        },
      ],
    },
    {
      id: "performance",
      title: "Performance and state",
      lede: "This marketing site is static HTML. Keep JS scoped. In-shell apps still pay for every layout read.",
      rules: [
        {
          lead: "Images reserve space.",
          body: "Explicit `width` and `height`. Lazy-load below the fold. `fetchpriority=\"high\"` only above the fold.",
        },
        {
          lead: "Virtualize long lists.",
          body: "More than about 50 items: virtualize or `content-visibility: auto`.",
        },
        {
          lead: "Cheap keystrokes.",
          body: "Prefer uncontrolled inputs. Controlled inputs must be cheap per keypress.",
        },
        {
          lead: "Batch DOM reads and writes.",
          body: "Do not interleave layout queries with mutations.",
        },
        {
          lead: "Video over GIF.",
          body: "Prefer compressed video for loops, with a still alternative and `prefers-reduced-motion`.",
        },
        {
          lead: "Preconnect only what you use.",
          body: "This site preconnects jsDelivr for `@shellui/sdk`. Do not add origins for decoration.",
        },
        {
          lead: "System fonts by default.",
          body: "Do not add a webfont without a reason. If you do, preload with `font-display: swap`.",
        },
        {
          lead: "Hydration is local.",
          body: "Do not hydrate a whole marketing page for a theme toggle. Inputs with `value` need `onChange` or `defaultValue`.",
        },
        {
          lead: "Eleventy stays static.",
          body: "Alpine and Plus Elements are scoped. Do not introduce a React tree for a marketing page.",
        },
      ],
    },
    {
      id: "flag-these",
      title: "Flag these",
      lede: "If you see one of these, it is a defect.",
      rules: [
        {
          lead: "Zoom is disabled.",
          body: "`user-scalable=no` or `maximum-scale=1`.",
        },
        {
          lead: "Paste is blocked.",
          body: "`onPaste` + `preventDefault`.",
        },
        {
          lead: "transition: all, or outline-none with no ring.",
          body: "List properties. Replace focus.",
        },
        {
          lead: "Click handler navigation.",
          body: "No `<a href>`.",
        },
        {
          lead: "Missing labels, alt, or aria-label.",
          body: "Forms, images, icon buttons.",
        },
        {
          lead: "100vh under host chrome, or a second theme picker.",
          body: "The iframe is not the window. The shell already has a theme.",
        },
        {
          lead: "Shipping UI that leads with AI, MCP, or marketplace.",
          body: "Lead with the iframe host, SDK, auth, admin, storage, Files.",
        },
        {
          lead: "Missing dark styles, or headings under the fixed header.",
          body: "Both themes, and `scroll-margin-top`.",
        },
      ],
    },
  ],
};
