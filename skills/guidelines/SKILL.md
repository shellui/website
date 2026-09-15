---
name: guidelines
description: Use when reviewing Shellui website, docs, or in-shell UI against Shellui guidelines. Load writing-guidelines for prose and web-design-guidelines for layout, accessibility, and chrome.
metadata:
  version: "1.0.0"
---

# Shellui guidelines

Load the topic skill that matches the work, then read that topic's canonical markdown. Do not scrape the HTML pages.

| Topic | Skill | Canonical markdown | Human page |
| --- | --- | --- | --- |
| Writing | `skills/writing-guidelines/SKILL.md` | `content/guidelines/writing.md` | `/guidelines/writing/` |
| Web design | `skills/web-design-guidelines/SKILL.md` | `content/guidelines/web-design.md` | `/guidelines/web-design/` |

Hub: `/guidelines/`. Logos stay on `/brand-assets/`.

Published markdown (after deploy):

```
https://shellui.com/guidelines/writing.md
https://shellui.com/guidelines/web-design.md
```

YAML `version` in each markdown file is the public "Guidelines v…" label.
