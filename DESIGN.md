# Shellui Design Guidelines

This document defines the visual language, voice, and principles that guide all Shellui brand and product work: the marketing site, documentation, playground, and any future surfaces.

## Core concept

Shellui is a **shell** — a calm outer container that holds chrome (navigation, authentication, administration, storage, theme, i18n) so that **applications** running inside can stay focused on their domain. The shell provides a foundation without imposing ownership. Apps are guests; the shell is simply present, attending when needed.

### Audience

- Smart solo developers who ship fast without overbuilding
- Small teams who want to share chrome across multiple apps
- Anyone tired of rebuilding the same infrastructure for every new project

### What ships today

Lead with what's real and available now:
- Microfrontend architecture
- Authentication
- Administration
- Storage
- Built-in navigation and theming

AI/MCP integration and the marketplace are on the [roadmap](https://shellui.com/roadmap/) but should remain quiet — no hero treatment, no fake screenshots.

### Visual direction (locked)

**A — Evidence shell** (chosen 2026-09-11)

- First viewport leads with **proof**: shell chrome frame and/or real `shellui.config.ts`, not a slogan-only hero
- Densier evidence than a template landing page (config, seams, connected capabilities)
- Honey gold stays **scarce** (active/focus/primary CTA)
- CTA order: **Playground → Docs → GitHub** (GitHub as text link)
- Avoid generic centered SaaS hero with decorative blobs as the whole story

## Visual principles

### 1. Frame over flourish

The outer shell should feel like **containment**, not decoration. Think borders, navigation rails, clean separation. The frame is visible and honest about its role.

- Prefer structural elements (borders, rails, clear boundaries) over decorative gradients
- Let the product speak for itself — show real UI, real config files, real code
- Avoid generic SaaS marketing patterns (centered hero with abstract shapes, equal-height feature card grids as the whole story)

### 2. Scarce honey gold

The primary brand color is **honey gold**:
- Light mode: `#e3a512` (CSS custom property: `--color-primary`)
- Dark mode: `#e8b84a`

Use gold sparingly as an **accent** — it signals "the shell is attending" (active nav, focus states, CTAs). Too much gold becomes noise.

### 3. Seams visible

Don't hide the edges. Show configuration files, demo code, architectural diagrams. Developers trust systems they can see into.

- Use real config examples, not sanitized placeholders
- Surface the boundaries between shell and app
- Diagrams should feel technical, not abstract

### 4. Interior is proof

The best marketing for Shellui is Shellui itself. The documentation site, playground, and admin interfaces should all run **inside the shell**. Same navigation. Same auth. Same storage. Same admin panels.

- Dogfood the product across all surfaces
- When showing features, show the real product UI
- Consistency across docs, playground, and marketing builds trust

## Color system

All color tokens are defined in `src/assets/css/input.css` using Tailwind v4's `@theme` directive.

### Primary (honey gold)

| Token | Light | Dark | Usage |
|-------|-------|------|-------|
| `--color-primary` | `#e3a512` | `#e8b84a` | Buttons, active navigation, focus rings |
| `--color-primary-foreground` | `#1a1408` | — | Text on primary backgrounds |
| `--color-primary-ink` | `#c4920a` | — | Darker ink for links/text in light mode |

Use `text-primary-ink` in light mode for links and emphasis; use `text-primary` in dark mode.

### Neutrals

Shellui uses Tailwind's default gray scale (`gray-50` through `gray-950`) for backgrounds, text, borders. Let the grays be calm and recede; let gold draw attention when it matters.

## Typography

The site uses the system font stack for speed and familiarity:

```css
font-family: system-ui, -apple-system, BlinkMacSystemFont, "Segoe UI", 
             Roboto, "Helvetica Neue", Arial, sans-serif;
```

### Hierarchy

- **Display headings**: `text-4xl md:text-5xl lg:text-6xl`, `font-semibold` or `font-bold`
- **Section headings**: `text-2xl` to `text-3xl`, `font-semibold`
- **Body text**: `text-base` (16px), `font-normal`, comfortable line-height (`leading-relaxed`)
- **UI labels**: `text-sm`, `font-medium`
- **Fine print**: `text-xs` or `text-sm`, muted gray

Keep line lengths readable (max-width on paragraphs). Use spacing to create rhythm, not heavy font weights.

## Logo usage

### Icon mark

The Shellui mark (square icon) is strong and flexible. Use it:
- In tight spaces (favicons, app icons, social avatars)
- On colored backgrounds (use the transparent variant)
- When horizontal space is constrained

### Wordmark

The full Shellui wordmark (text + mark) is the primary logo for most contexts:
- Marketing pages, headers, hero sections
- Print materials, slides, partner pages
- Anywhere you have horizontal space

### Clear space

Maintain **at least the height of the mark** as clear space around all sides of the logo. Don't crowd it with other elements.

### Do not

- ❌ Stretch, skew, or rotate the logo
- ❌ Recolor the logo (use provided variants)
- ❌ Place the logo on busy or low-contrast backgrounds without the transparent variant
- ❌ Use the logo smaller than 32px tall in digital contexts
- ❌ Add effects (shadows, outlines, glows)

### Variants

Logos are available in SVG (preferred) and PNG:
- **Primary logo**: Use on white or very light backgrounds
- **Transparent background**: Use on colored, photographic, or patterned backgrounds
- **Product-specific marks**: Documentation, Playground, Files logos have their own wordmarks for context

## Voice and copy

### Tone

- **Direct**: Say what the thing does. "Shared authentication for your web apps."
- **Confident, not boastful**: Lead with capability, not hype. "Shellui wraps your app with auth" beats "Revolutionary platform transforms development."
- **Technical without jargon**: Assume the reader codes, but don't assume they know Shellui's terms yet. Define once, then use freely.

### Preferred language

Use these terms naturally:

- **Shell** (not "platform" as the first noun)
- **Chrome** (the shared UI: nav, auth, admin, storage)
- **Apps** (the things developers build that live inside the shell)
- **Foundation** (what Shellui provides)

Avoid:
- Over-reliance on "platform" without context
- Marketing superlatives ("revolutionary", "game-changing", "next-generation")

### Example good copy

> "Shellui is a microfrontend shell that wraps your application with shared navigation, authentication, storage, and administration. Build the product. We'll handle the chrome."

### Example weak copy

> "Shellui is the next-generation platform revolutionizing how teams build web applications."

## Layout principles

### 1. Left-aligned for content, centered for marketing moments

- **Content pages** (docs, blog, guides): left-aligned text with comfortable max-width (prose)
- **Marketing moments** (hero sections): centered is fine, but avoid making the *entire* site a centered poster. Balance it with left-aligned substance.

### 2. Asymmetry over perfect grids

Not everything needs to be in three equal columns. Use:
- Full-width feature highlights with side-by-side content + visual
- Staggered layouts
- Varying card sizes based on importance

Equal-height card grids are fine for logo walls or lists, but shouldn't be the only layout pattern.

### 3. Breathing room

Use generous spacing (`py-24`, `mt-12`, `gap-8`). Shellui should feel calm and uncluttered. Let sections breathe. Prefer intentional open space over accidental empty bands that push primary CTAs below the fold.

## Call-to-action priority

When presenting multiple CTAs, prefer this order:

1. **Playground** — Try it live, no install
2. **Docs** — Learn how it works
3. **GitHub** — See the code, contribute

This sequence moves from "instant gratification" to "deep learning" to "source truth."

## Banned patterns

These patterns are explicitly **not Shellui**:

### ❌ Generic centered SaaS hero

A full-page centered headline with abstract gradient blobs and a single CTA is lazy. Shellui should show the **product** or **architecture**, not just talk about it.

### ❌ Equal feature card grids as the whole story

Three identical cards with icon + title + blurb is fine as a summary, but can't be the only way you present features. Show real UI. Show use cases. Show config.

### ❌ Fake AI/marketplace screenshots

Don't invent screenshots for features that don't exist yet. If it's on the roadmap, say so. If it ships, show it.

### ❌ Invisible borders

Shellui is a **frame**. Show the boundaries. Use borders, dividers, and clear sections. Don't float everything on infinite white.

## Accessibility

- Maintain WCAG AA contrast ratios (4.5:1 for text, 3:1 for UI elements)
- Honey gold on white passes contrast; test carefully on gray backgrounds
- Provide focus indicators (gold ring on interactive elements)
- Ensure all interactive elements have accessible labels
- Support dark mode throughout

## File formats and assets

- **Logos**: SVG preferred; PNG fallback for contexts that don't support vector
- **Icons**: Use SVG with inline `currentColor` for themability
- **Images**: Use WebP with JPEG fallback; optimize for web
- **Code examples**: Real, working code — no pseudocode unless pedagogically necessary

## Maintaining consistency

All public surfaces (website, docs, playground, admin UI) should:
- Use the same color palette
- Use the same typography scale
- Run inside the shell (dogfood the product)
- Respect these guidelines

When in doubt, ask: "Does this feel like a **calm shell holding something important**, or does it feel like shouting?"

---

## Questions?

For brand usage questions, see [shellui.com/brand-assets](https://shellui.com/brand-assets/) or contact us at [shellui.com/company/contact](https://shellui.com/company/contact/).
