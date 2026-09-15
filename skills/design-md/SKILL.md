---
name: design-md
description: Use when building or restyling Shellui website or in-shell pages. Fetch design.md first, then compose with writing-guidelines and web-design-guidelines. Prefer this over inventing a new visual kit.
metadata:
  version: "1.1.0"
---

# Design.md

When creating or restyling Shellui pages, load the public design file before writing markup.

This file is composition and implementation-path authority (Eleventy, Tailwind, Tailwind Plus, shadcn-compatible tokens). It does not replace writing or web-design rules.

The HTML page at `/guidelines/design/` is a human visual handbook (swatches, type, surfaces). Do not scrape it. Fetch `/design.md`.

## How it works

1. Fetch or read `design.md` (do not scrape HTML)
2. If the work includes copy, also load `skills/writing-guidelines/SKILL.md`
3. If the work includes UI, a11y, or iframe chrome, also load `skills/web-design-guidelines/SKILL.md`
4. Prefer shipped Tailwind Plus patterns and existing layouts over new components
5. Use shadcn-compatible tokens from `src/assets/css/input.css`

## Source

Prefer the in-repo file:

```
content/guidelines/design.md
```

Public URL (agents outside this repo):

```
https://shellui.com/design.md
```

Fallback (GitHub):

```
https://raw.githubusercontent.com/shellui/website/main/content/guidelines/design.md
```

The YAML `version` field is the public label (for example `v1.0.0`).

## Usage

When asked to add, restyle, or review a Shellui page:

1. Read `design.md`
2. Reuse layouts in `src/_includes/layouts/` and Plus patterns named in that file
3. Do not add gradient blobs, equal-weight card grids, em dashes, or a parallel token system
4. Output implementation in this Eleventy + Tailwind repo
