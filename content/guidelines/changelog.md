---
title: Guidelines changelog
description: Version history for all Shellui public guidelines (major release 2.0.0).
version: 2.0.0
updated: 2026-11-26
canonical: /guidelines/changelog/
---

## 2.2.0 (2026-11-26)

Writing 2.1.0, Brand 2.1.0, and Interface 2.2.0.

- **Writing**: Shellui is AI native. Shipped MCP, agent skills, and on-device AI can appear wherever they help the reader. [shellui.ai](https://shellui.ai) is where agents learn to use Shellui, and the homepage agent prompt may introduce Shellui. Audience includes the agents working for developers. Unreleased AI and marketplace teasers stay out
- **Brand**: same audience and shellui.ai rule, in the voice summary
- **Interface**: shipped AI surfaces can appear where they help. The reject list now flags unreleased AI and marketplace chrome, not shipped MCP

## 2.0.0 (2026-10-25)

Major reorganization for the website release.

- **Hub**: overview plus cards for Brand, Foundations, Writing, Interface, Print, and this changelog
- **Brand**: identity and [Downloads](/guidelines/brand/#downloads) replace the standalone brand assets page (URLs redirect)
- **Foundations**: token source `tokens/tokens.json` generates CSS, tables, and downloads
- **Interface**: merges former design and web design guidelines; `/design.md` stays as agent alias
- **Print**: new HTML and markdown for print grid, IBM Plex, folios, Pantone, and paper
- **Writing**: sole owner of punctuation and banned words
- **Agents**: `llms-full.txt`, raw `.md` twins; `/design.md` trimmed alias; `/guidelines/web-design.md` full Interface copy
- **Site**: Inter self-hosted on screen; text gold `#8A6300` / `#E8B84A` in dark mode

## 1.x (archived)

Prior versions lived as separate writing (1.0.0), web design (1.1.1), design (1.3.1), and brand (1.0.0) files. Legacy HTML pages at `/guidelines/design/` and `/guidelines/web-design/` fall back to Interface.
