---
name: writing-guidelines
description: Use when reviewing Shellui website or docs prose, checking writing style, auditing voice and tone, rewriting marketing copy, or applying the Shellui writing handbook.
metadata:
  version: "1.0.0"
---

# Writing guidelines

Review files for compliance with Shellui writing guidelines.

Inspired by the public writing-handbook pattern from Vercel Labs; the rules here are Shellui-specific (voice, product, hyphen preference). Do not copy Vercel branding, model catalogs, or dashboard links into Shellui copy.

For UI, accessibility, and chrome, also load `skills/web-design-guidelines/SKILL.md`.

## How it works

1. Load the canonical guidelines from the source below (do not scrape the HTML page)
2. Read the specified files (or ask which files to review)
3. Check against every rule in the loaded guidelines
4. Output findings in the terse `file:line` format from the guidelines

## Guidelines source

Prefer the in-repo file:

```
content/guidelines/writing.md
```

If this repository is not available, fetch the published markdown:

```
https://shellui.com/guidelines/writing.md
```

Fallback (GitHub):

```
https://raw.githubusercontent.com/shellui/website/main/content/guidelines/writing.md
```

The YAML frontmatter `version` field is the public label (for example `Guidelines v1.0.0`). Use that file as the single source of truth.

## Usage

When a user provides a file or pattern:

1. Read or fetch the guidelines source above
2. Read the specified files
3. Apply all rules from the guidelines
4. Output findings using the format specified in **Review output**

If no files are specified, ask which files to review.
