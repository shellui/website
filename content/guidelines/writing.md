---
title: Writing guidelines
description: Voice, tone, and review rules for Shellui website and docs prose.
version: 1.0.0
---

These rules cover copy on [shellui.com](https://shellui.com), [docs.shellui.com](https://docs.shellui.com), and in-product strings that developers read. Lead with what Shellui ships today: a microfrontend shell with shared navigation, authentication, administration, and storage. Keep AI, MCP, and marketplace ideas quiet unless the page is actually about that surface.

Agents: load this file. Do not scrape the HTML page. The `version` field in the frontmatter is the public "Guidelines v…" label.

## How to use this file

- **Humans**: read the page at `/guidelines/writing/`, or download this markdown
- **Agents**: read `content/guidelines/writing.md` in this repo, or fetch `https://shellui.com/guidelines/writing.md`
- **Skill wrapper**: `skills/writing-guidelines/SKILL.md`
- **Sibling**: [web design guidelines](/guidelines/web-design/) for UI, accessibility, and chrome
- **Hub**: [Guidelines](/guidelines/)

Review files against every rule below. Output concise, high-signal findings. Sacrifice grammar for brevity.

## Brand

- The product name is **Shellui** only. Never "The Host". Never raise the last two letters or camel-case the name; packages and repos stay lowercase (`@shellui/sdk`, `shellui/identity-service`)
- In prose, "the shell" (lowercase) is the running host around the iframe app. That is a common noun, not a second brand
- Default one-liner: Shellui is an open-source web app development platform - a microfrontend shell that wraps your application with shared navigation, authentication, storage, and administration
- Audience is developers shipping a product inside that shell, not generic "users" or "teams exploring AI"
- Surfaces: [docs.shellui.com](https://docs.shellui.com) for docs, [playground.shellui.com](https://playground.shellui.com) to try it, [GitHub](https://github.com/shellui) for source. Mention [shellui.ai](https://shellui.ai) only when the page is about that property
- Visual downloads (logos, marks, wordmarks) live on [Brand assets](/brand-assets/). Do not mix logo-usage rules into product docs

## Voice and tone

- Active voice. Mental test: append "by monkeys". If the sentence still parses, rewrite
- Direct address: `you`, never `the user` or `one can`
- Imperative for steps: "Call **init**", not "You will need to call **init**"
- Target sentences under 20 words
- Contractions are fine (`you'll`, `it's`)
- Present tense unless you are describing behavior that does not exist yet
- Limit `we`: only for a deliberate Shellui action ("we recommend", "we deprecated"), never as a stand-in for "you"
- No rhetorical questions (reads as marketing)
- Second-read test: read each sentence once at speech pace. If you re-read to parse it, name the subject, the action, and the consequence. Kill metaphor verbs and pronouns that reach back several sentences
- Developer-facing, not salesy. Evidence over slogans. Name the API, file, or command

### Tone, by content type

- **Tutorial**: warm, predictable structure, no traps
- **How-to**: terse, direct (the reader is mid-task)
- **Reference**: neutral, exhaustive, quotable
- **Conceptual**: explain like the reader will teach it back; examples welcome
- **Troubleshooting**: acknowledge the failure, then fix it. Empathy without apology
- **Website / blog**: same voice as docs. Lead with the shipping product, not the roadmap

### Banned words

- `easy`, `simple`, `quick`: puts pressure on the reader and reads as marketing. Replace with a concrete description ("one command", "default settings", "most projects don't need this")
- `very`, `just`, `really`, `simply`: filler; cut or rewrite
- `seamless`, `robust`, `powerful`, `next-generation`, `unlock`, `leverage`: marketing fog; name the behavior
- Do not tease unreleased AI, MCP, app-store, or marketplace work on pages about the shell, auth, admin, or storage

### Concision

- Earn every detail: cut a number, name, or implementation detail if a more general phrasing would not change the reader's understanding or action
- Weasel words: replace vague qualifiers (`significantly`, `many`, `often`, `typically`, `generally`) with a specific number or claim
- Vague quantifiers: no `near-zero`, `sub-second`, `most requests` without a figure you can stand behind
- Filler or metaphor verbs: name the action (`moves through`, `lands`, `carries`, `hits` → the literal step)

### AI-generated tells (flag these)

- Summary-style transitions: never open a paragraph by recapping the last one (`With this setup complete…`, `Now that we've explored…`). Pivot to the next point
- Stop-start sentences: don't split one dependent idea into choppy fragments (`Previously this was manual. Now it's automatic. This saves time.` → one sentence). Short sentences for emphasis are fine
- Spec-sheet voice: rewrite sentences that read like a datasheet (`provides`, `is configurable`, `is explicitly labeled`)
- Cold-open paragraphs: a body paragraph whose first sentence works as a standalone heading has no antecedent. Carry the prior subject forward (`Because…`, `Once…`)
- Personified artifacts: machines don't perform human-physical actions (`hand the browser a URL` → `the browser fetches the URL`; `the token holds…` → `the token is stored…`)
- Reused framing: the angle must come from this page, not a template (`The question most teams face is whether…`)

## Structure and formatting

Rules for how a page is planned, titled, and marked up.

### Planning and content type

- Every docs page has a plan (overview, goal, audience, content plan, open questions) referenced or linked
- Content type declared when the docs system supports it: `Tutorial`, `How-to`, `Reference`, `Conceptual`, `Troubleshooting`, or `Landing`
- Title is user-shaped (the reader's question), not feature-shaped (the engineer's name)
- Page does one job: tutorial or how-to or reference, not three at once
- Goal is verb-driven: "configure", "explain", "debug" (testable)
- Multi-audience pages: short shared opener, then technical subsections
- Website marketing pages still need a one-paragraph opener that states what the page is for

### Headings

- Sentence case for page headings (`H1` `H2` `H3`): "Configure the iframe SDK", not "Configure The Iframe SDK"
- Title case for nav labels: "Writing Guidelines"
- `meta.title` (or the page `title`) becomes the `H1`; nav labels stay short
- Subheadings descriptive, not cute: "Caveats when hosting on a custom domain", not "Caveats"
- The reader should guess the section from the heading alone

### Page structure

- Every page opens with a one-paragraph TL;DR of what it covers
- Every major section opens with a summary sentence
- Spell out acronyms on first use: "JSON Web Key Set (JWKS) is how the shell verifies tokens"
- Define every term the first time you use it (link to its conceptual page when one exists)
- Reference docs organized by surface; education docs organized by reader task
- Keep paragraphs to 2 to 4 sentences. Split anything longer or covering two ideas

### Lists

- Three or more list-shaped items in a paragraph: convert to a list
- Bulleted for unordered; numbered for ordered (lifecycles, sequential steps)
- Always introduce a list with a colon
- No periods at the end of list items unless they are full sentences
- Bold/description format: `- **Term**: description here` (colon after the bold term)

### Code

- Code blocks need a language tag for syntax highlighting
- TypeScript is the default for new examples unless the surface is another language (Python for identity-service, bash for CLI)
- Multi-step flows should show structure (numbered steps, or separate blocks with prose between them)
- Highlight load-bearing lines when the renderer supports it
- ≤80 columns per line in snippets
- ≤25 lines per snippet; split longer blocks with prose
- Omit defaults; don't repeat variable definitions, use a shared name
- Minimal comments in code blocks; prefer prose
- Explain what every code block does in prose (don't drop and run)
- Don't point at a full example file at the end of a guide ("See `app.ts`"); the guide is the deliverable
- Prefer real Shellui names: `shellui.config.ts`, `@shellui/sdk`, `init`, identity-service, storage-service

```typescript
import { init } from "@shellui/sdk";

await init({
  clientId: your_client_id_here,
});
```

### Placeholders

- Text placeholders: `snake_case`, descriptive: `your_access_token_here` (so the reader can double-click to select before pasting)
- Number placeholders: count up `1234567890123` (recognizable as fake, predictable)
- Never angle-bracket tokens, `xxx`, `your-token`, or generic ALL_CAPS

### Data sizes and units

- Space + uppercase unit: `64 KB`, `5 KB`, `200 ms`
- Exception: seconds is bare: `30s`
- Stay consistent so readers can scan

### Pricing pages

- Shellui is MIT-licensed and free to run. Say that plainly
- If you mention paid help, say what it is (architecture, custom work, support) and what it is not
- Never imply a hosted plan or usage meter that does not exist
- Tables when you compare options; don't assume the reader knows the model

### Emphasis

- **Bold** means a UI element or a critical fact, never emphasis-for-emphasis-sake
- If you reach for bold for tone, the sentence is weak; rewrite it
- `Inline code` for paths, file extensions, identifiers, short snippets: `/admin`, `.tsx`, `init`, `shellui.config.ts`
- Rule: if it would look weird without a monospace font, monospace it

### Punctuation and typography

- Prefer a hyphen `-` for a pause or break in prose: "Keep chrome in the shell - layouts, toasts, and theme included."
- Ban em dashes (`—`) and en dashes (`–`) used as punctuation. Do not "fix" ordinary hyphens
- Hyphens in compound words, package names, and flags stay: `microfrontend`, `identity-service`, `--serve`
- Straight quotes in markdown source (`"` `'`). Don't convert to curly quotes by hand
- Ellipsis `…`, not three dots `...`
- Loading states end with `…`: `Loading…`, `Saving…`
- `&` over "and" only where space is tight (nav labels, buttons)

### Source formatting

- Don't hard-wrap paragraphs: each paragraph is one line in source, let the editor wrap
- One blank line before headings; one blank line before and after code blocks
- No `---` horizontal rules between sections
- No extra blank lines between elements that aren't paragraph breaks

### Links

- Define every term the first time it appears; link to its conceptual page when one exists
- Anchor text names the destination; never bare URLs or `here` / `link`
- Canonical docs: [docs.shellui.com](https://docs.shellui.com)
- Playground: [playground.shellui.com](https://playground.shellui.com)
- Source: [github.com/shellui](https://github.com/shellui)
- Brand files: [shellui.com/brand-assets](https://shellui.com/brand-assets/)
- Do not invent dashboard deep links. Link to the real path (`/admin`, docs page, GitHub repo)

## What to mention (and what to skip)

- **Default to shipping**: iframe host, `@shellui/sdk`, identity-service or Supabase Auth, admin at `/admin`, storage-service or Supabase Storage, Files
- **Skip unless the page is about it**: AI features, MCP, an app store, a marketplace, unreleased roadmap items
- **Roadmap pages** may list upcoming work. Everywhere else, upcoming work is a footnote, not the lede
- Don't frame Shellui as an AI platform. It is a shell around your app

## Review

How drafts get checked - by a person or an agent.

### AI workflow

- You are accountable for the content you produce, however it is created
- You are the final arbiter; the model proposes, you dispose
- Hold technical accuracy to a high standard: docs are also consumed by LLMs, and wrong docs train wrong models
- Follow `AGENTS.md` and this file before generating website or docs prose
- Plan first; the plan is the spec the model works against
- After a draft, test: "given this page's goal, can a reader (or a model) complete the task using only this page?"
- Final human review always
- Disclose the model in the PR when the draft was generated

### Quality checklist (required boxes are non-negotiable)

- **Findability**: the page is linked from nav, docs, or the parent feature page
- **Accuracy**: code samples run; screenshots match the current UI
- **Relevance**: code samples where they help (TypeScript first; Python or bash when that is the surface)
- **Clarity**: opener covers who/what/where/why; prerequisites on tutorials; steps are concrete; recommend the shortest path when several exist
- **Completeness**: limits documented; the content plan's goals are addressed
- **Readability**: nav names scannable and use action verbs; subheadings descriptive; sections start with summaries; code blocks formatted; active voice

### Pull requests

- PR description says what to review and links the preview URL
- Author is accountable, not the reviewer; reviewers can approve with nits
- Suggestion comments for small text fixes; a blocking comment for anything bigger
- Disagreement is fine; reject with a one-line reason and move on

## Anti-patterns (flag these)

- Em dashes (`—`) or en dashes (`–`) used as punctuation
- `easy`, `simple`, `quick` describing reader actions
- Passive voice (apply the "by monkeys" test)
- Title Case in page headings (sentence case in `H1` through `H6`)
- Generic placeholders: angle-bracket tokens, `xxx`, `your-token`, `ABC123`
- Code blocks without a language tag
- JavaScript examples where TypeScript is the convention
- Code blocks over 25 lines without prose between
- Hard-wrapped prose paragraphs (multiple lines for one paragraph in source)
- `---` horizontal rules between sections
- Subheadings that are single generic words: `Overview`, `Caveats`, `Notes`
- Bold used for emphasis instead of a UI element or critical fact
- Page or section without an opening summary
- Three dots (`...`) instead of ellipsis (`…`) in loading copy
- Acronyms used before being spelled out
- Bare unit numbers (`64KB`, `5kb`, `200MS`) instead of `64 KB`, `5 KB`, `200 ms`
- "We" standing in for "you"
- Rhetorical questions
- Filler words: `very`, `just`, `really`, `simply`
- References to "the full example file at the end of the guide" rather than inlining the code
- "Loading..." instead of "Loading…"
- Summary-style transitions recapping the previous paragraph (`With this setup complete…`)
- Stop-start fragments splitting one dependent idea into choppy sentences
- Spec-sheet voice reading like a datasheet (`provides`, `is configurable`, `is explicitly labeled`)
- Cold-open body paragraphs whose first sentence has no antecedent
- Personified artifacts performing human-physical actions (`hand the browser a URL`)
- Reused/template framing not specific to the page (`The question most teams face is whether…`)
- Weasel words instead of a specific claim (`significantly`, `many`, `often`, `typically`, `generally`)
- Vague quantifiers without a figure (`near-zero`, `sub-second`, `most requests`)
- Filler or metaphor verbs instead of the literal step (`moves through`, `lands`, `carries`, `hits`)
- Sentences that need a second read to parse
- Paragraphs over 4 sentences or covering two ideas
- Bare URLs or `here`/`link` as anchor text
- Calling the product "The Host" or any spelling other than Shellui
- Leading a shipping-product page with AI, MCP, or marketplace copy
- Ordinary hyphens flagged as errors (hyphens are preferred)

## Review output

Group by file. Use `file:line` format (clickable in VS Code). Terse findings.

```text
## src/features/microfrontend/index.njk

src/features/microfrontend/index.njk:18 - banned word "easy"
src/features/microfrontend/index.njk:24 - em dash in prose; use a hyphen
src/features/microfrontend/index.njk:31 - "the user" → "you"
src/features/microfrontend/index.njk:47 - placeholder YOUR_TOKEN → your_access_token_here

## src/architecture/index.njk

✓ pass
```

State issue + location. Skip explanation unless the fix is non-obvious. No preamble.
