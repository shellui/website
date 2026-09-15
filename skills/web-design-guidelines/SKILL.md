---
name: web-design-guidelines
description: Use when reviewing Shellui website, docs, or in-shell UI, checking accessibility, auditing layout, or applying the Shellui web design handbook.
metadata:
  version: "1.0.0"
---

# Web design guidelines

Review files for compliance with Shellui web design guidelines (accessibility, focus, forms, motion, iframe chrome, light/dark).

Inspired by the public web-interface-guidelines pattern from Vercel Labs; the rules here are Shellui-specific (microfrontend host, themes, hyphen preference). Do not copy Vercel branding or dashboard links into Shellui UI.

## How it works

1. Load the canonical guidelines from the source below (do not scrape the HTML page)
2. Read the specified files (or ask which files to review)
3. Check against every rule in the loaded guidelines
4. Output findings in the terse `file:line` format from the guidelines

For copy, also load `skills/writing-guidelines/SKILL.md`.

## Guidelines source

Prefer the in-repo file:

```
content/guidelines/web-design.md
```

If this repository is not available, fetch the published markdown:

```
https://shellui.com/guidelines/web-design.md
```

Fallback (GitHub):

```
https://raw.githubusercontent.com/shellui/website/main/content/guidelines/web-design.md
```

The YAML frontmatter `version` field is the public label (for example `Guidelines v1.0.0`). Use that file as the single source of truth.

## Usage

When a user provides a file or pattern:

1. Read or fetch the guidelines source above
2. Read the specified files
3. Apply all rules from the guidelines
4. Output findings using the format specified in **Review output**

If no files are specified, ask which files to review.
