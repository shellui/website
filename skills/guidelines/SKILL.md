---
name: guidelines
description: Use when reviewing or building Shellui website, docs, or in-shell UI. Fetch design.md first when composing pages. Load writing-guidelines for prose and web-design-guidelines for accessibility and chrome.
metadata:
  version: "1.0.0"
---

# Shellui guidelines

Load the topic that matches the work. Do not scrape HTML pages.

When **building or restyling a page**, fetch design.md first:

```
https://shellui.com/design.md
```

| Topic | Skill | Canonical markdown | Human page |
| --- | --- | --- | --- |
| Design (compose pages) | `skills/design-md/SKILL.md` | `content/guidelines/design.md` | Human visual: `/guidelines/design/`. Agents: `/design.md` only. |
| Writing | `skills/writing-guidelines/SKILL.md` | `content/guidelines/writing.md` | `/guidelines/writing/` |
| Web design | `skills/web-design-guidelines/SKILL.md` | `content/guidelines/web-design.md` | Human list: `/guidelines/web-design/`. Agents: the markdown only. |

Hub: `/guidelines/`. Logos stay on `/brand-assets/`.

Published markdown (after deploy):

```
https://shellui.com/design.md
https://shellui.com/guidelines/writing.md
https://shellui.com/guidelines/web-design.md
```

YAML `version` in each markdown file is the public "Guidelines v…" label.
