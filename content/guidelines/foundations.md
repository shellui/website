---
title: Foundations
description: Color, type, spacing, and corner radius shared across Shellui web and print.
version: 2.0.0
updated: 2026-10-25
canonical: /guidelines/foundations/
related: /guidelines/interface/, /guidelines/print/, /design.md
---

Foundations are the shared numbers behind Shellui surfaces: color, type, spacing, and corner radius. The tables on this page match what ships on shellui.com. If a hex here disagrees with another page, use the values here.

- **Web**: Inter on screen. Use the token utilities in Tailwind (`bg-primary`, `text-primary-ink`, and the rest).
- **Print**: IBM Plex Sans and Plex Mono. See [Print](/guidelines/print/) for layout, page numbers, and Pantone.
- **Interface**: how pages are composed with these values. See [Interface](/guidelines/interface/).

## Downloads

- [Design tokens (JSON)](/guidelines/generated/tokens.json): machine-readable color and radius values
- [Design tokens (CSS)](/guidelines/generated/tokens.css): light-theme CSS variables

## Color tokens (web)

Brand gold `#E3A512` is for fills, rules, and the logo, not body text. Text gold is `#8A6300` on light backgrounds and `#E8B84A` in dark mode (`primary-ink` remaps automatically).

<!-- tokens:begin -->
| Token | Light | Dark | Role |
| --- | --- | --- | --- |
| `primary` | `#e3a512` | `#e8b84a` | Accent / buttons |
| `primary-foreground` | `#1a1408` | `#1a1408` | Text on gold |
| `primary-ink` | `#8a6300` | `#e8b84a` | Gold text on light; remaps on dark |
| `ring` | `#e3a512` | `#e8b84a` | Focus |
| `background` | `#ffffff` | `#030712` | Page canvas |
| `foreground` | `#111827` | `#f9fafb` | Primary text |
| `muted` | `#f9fafb` | `rgb(255 255 255 / 0.05)` | Quiet wells |
| `muted-foreground` | `#4b5563` | `#9ca3af` | Secondary text |
| `border` | `#e5e7eb` | `#1f2937` | Rules, cards |
| `card` | `#ffffff` | `#111827` | Raised surface |
| `card-foreground` | `#111827` | `#f9fafb` | Text on card |
| radius | `rounded-xl` cards (`0.75rem`); `rounded-md` controls (`0.375rem`) | same | Shape |
<!-- tokens:end -->

## Gold (brand and print)

| Name | Hex | Pantone (coated) | Use |
| --- | --- | --- | --- |
| Brand gold | `#E3A512` | 124 C (7405 U uncoated) | Fills, rules, logo |
| Text gold | `#8A6300` | 4027 C | Links and gold text on light |
| Text gold (dark) | `#E8B84A` | n/a | Links and gold text on dark |
| On gold | `#1A1408` | n/a | Text on gold buttons |

Verify coated and uncoated Pantone against a physical swatch before the first print run.

## Typography

| Surface | Family | Notes |
| --- | --- | --- |
| Website and in-shell apps | Inter | Self-hosted, `font-display: swap`, Latin subset |
| Print and PDF kit | IBM Plex Sans | One family for all print words; Plex Mono for code |
| Generated images | Inter | og:image, social banners, icons (not print) |

Type scale on the web follows Tailwind defaults already used on shellui.com: page title `text-4xl font-bold md:text-5xl`, section `text-2xl` / `text-3xl font-semibold`, body `text-base/7`, labels `text-sm font-medium`. Print sizes live on [Print](/guidelines/print/).

## Spacing and radius

| Token | Web | Print |
| --- | --- | --- |
| Outer gutters | `.page-x` (`px-4 sm:px-6 lg:px-8`) | 20 mm page margin |
| Below header | `.page-top` | Running head only on body pages |
| Section step | `mt-10`, `mt-16` | 6 mm stacked cards, 8 mm feature gaps |
| Controls | `rounded-md` (`0.375rem`) | 2 mm radius on frames |
| Cards | `rounded-xl` (`0.75rem`) | 2 mm on screenshot frames |

## Motion

Honor `prefers-reduced-motion`. Animate `transform` and `opacity` only, never `transition: all`. Marketing theme reveal already disables under reduced motion; match that in product UI.
