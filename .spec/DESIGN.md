# CLI and MCP pages: design spec for shellui/website

Status: proposal by Wilson for Ella to implement on `develop`. Nothing here is merged or pushed. Nothing reaches `main` without Sébastien's approval.

Scope rule from Sébastien: keep the current website design as it is. Reuse the existing Developers menu item pattern, footer column, page layouts and components. The one visual change is a two-column Developers dropdown on desktop. No new components, styles or mockups.

Sources read (read-only, Nov 18 2026): `shellui/website@develop` (identical to `main`, 0 ahead / 0 behind), `shellui/shellui@develop` (`packages/cli`, `docs/cli.md`, `docs/installation.md`, `docs/features/ai-native*.md`), `shellui/ai-service@develop` (`README.md`, `docs/mcp.md`, `docs/mcp-handbook.md`, `docs/mcp-device-login.md`, `apps/connector/mcp_approval_channel.py`, `mcp_form_elicitation.py`, OpenAPI fixtures), `shellui/identity-service@develop` (`docs/mcp-and-agents.md`), live https://shellui.com, `content/guidelines/writing.md` and `interface.md`.

## 1. Top navigation: Developers menu

### 1.1 Data (`src/_data/nav.json`)

Keep one flat `developers` array (the footer and the mobile menu loop over it). Add a `group` key to every item and reorder the array so it reads Build first, then Project. Array order is the order on mobile and in the footer.

```json
"developerGroups": [
  { "id": "build", "label": "Build" },
  { "id": "project", "label": "Project" }
],
"developers": [
  { "group": "build", "href": "https://docs.shellui.com", "label": "Documentation", "description": "Guides, references, and API docs.", "icon": "book" },
  { "group": "build", "href": "/cli/", "label": "CLI", "description": "Create, run, build, and deploy from your terminal.", "icon": "terminal" },
  { "group": "build", "href": "/mcp/", "label": "MCP", "description": "Connect AI agents to your company, with approvals.", "icon": "chip" },
  { "group": "project", "href": "/architecture/", "label": "Architecture", "description": "How the Shellui stack fits together.", "icon": "cube" },
  { "group": "project", "href": "/roadmap/", "label": "Roadmap", "description": "Upcoming work and milestones.", "icon": "map" },
  { "group": "project", "href": "/changelog/", "label": "Changelog", "description": "Every release and what changed.", "icon": "list" }
]
```

Existing four items keep their label, description and icon unchanged. Only their order and the new `group` key change.

Why these groups: "Build" holds the surfaces you use while building (docs, the `shellui` command, the MCP server). "Project" holds pages about the project itself (how it is built, what is next, what shipped). There is no SDK or API page on shellui.com today, so they are not invented here (see open questions).

### 1.2 Icons (`src/_includes/nav.njk`, `navIcon` macro)

The site uses inline Heroicons v1 outline paths (`stroke-width="2"`, `viewBox="0 0 24 24"`, `class="size-5"`). Add two branches in the same format. Ella: check both paths against Heroicons v1 outline before committing.

- `terminal` (CLI): `M8 9l3 3-3 3m5 0h3M5 20h14a2 2 0 002-2V6a2 2 0 00-2-2H5a2 2 0 00-2 2v12a2 2 0 002 2z`
- `chip` (MCP): `M9 3v2m6-2v2M9 19v2m6-2v2M5 9H3m2 6H3m18-6h-2m2 6h-2M7 19h10a2 2 0 002-2V7a2 2 0 00-2-2H7a2 2 0 00-2 2v10a2 2 0 002 2zM9 9h6v6H9V9z`

### 1.3 Desktop dropdown: two columns

Reuse the Features dropdown panel as the model, so no new styling is introduced:

- Panel classes: copy the Features panel (`absolute -left-18 z-10 mt-2 max-h-[calc(100dvh-5rem)] w-[min(40rem,calc(100vw-2rem))] overflow-y-auto overscroll-contain rounded-2xl bg-white shadow-lg ring-1 ring-gray-900/5 dark:bg-gray-900 dark:ring-white/10 dark:shadow-none`). Desktop width: 40rem (640 px), capped at viewport minus 2rem. Replaces today's `w-screen max-w-sm`.
- Inner wrapper: `grid grid-cols-2 gap-1 p-2`, one child `div` per group in `developerGroups` order (Build left, Project right).
- Column heading (optional, recommended): a `p` with `id="dev-group-build"` / `id="dev-group-project"` and the existing mobile section-label typography: `px-3 pt-2 pb-1 text-sm font-semibold text-gray-500 dark:text-gray-400`. Wrap each column in `role="group" aria-labelledby="dev-group-…"`. If headings feel heavy in review, drop the `p` and keep the grouping.
- Items: the existing item markup unchanged (icon tile `size-10 rounded-lg bg-gray-50 text-primary-ink`, label `font-semibold`, description `mt-0.5 text-sm text-gray-600`). Copy the Features item's `items-start` and `has-[:focus-visible]:ring-2 has-[:focus-visible]:ring-primary` so keyboard focus matches Features.
- Loop: `{% for g in nav.developerGroups %}` then `{% for item in nav.developers %}{% if item.group == g.id %}…{% endif %}{% endfor %}`. Both columns have 3 items, so heights match.
- Also copy the Features wrapper's keyboard handlers (`@focusout` and `@keydown.escape`, `x-ref`, `aria-controls="developers-menu"`, `id="developers-menu"`). Today the Developers wrapper lacks them; this is a parity fix, not a new pattern.
- Active state, line 2 of `nav.njk`: add `/cli/` and `/mcp/` to `developersActive`.

Layout check: at 1024 px the Developers trigger starts near x = 300, so a 640 px panel at `-left-18` ends near x = 870 and stays on screen.

### 1.4 Mobile menu

No change to the pattern: the Developers accordion stays a single list, no column headings, in array order: Documentation, CLI, MCP, Architecture, Roadmap, Changelog. The `aria-current` highlight works for `/cli/` and `/mcp/` with no extra code.

## 2. Footer (`src/_includes/footer.njk`)

No markup change. The Developers column loops over `nav.developers` and then appends Playground, so it becomes:

1. Documentation (external, new tab, as today)
2. CLI
3. MCP
4. Architecture
5. Roadmap
6. Changelog
7. Playground

## 3. Routes, titles and metadata

| | CLI | MCP |
| --- | --- | --- |
| File | `src/cli/index.njk` | `src/mcp/index.njk` |
| URL | `/cli/` | `/mcp/` |
| Layout | `layouts/feature.njk`, `wide: true` (same as `/architecture/`) | same |
| `title` | `Shellui CLI: create, run, build, and deploy` | `Shellui MCP server: connect agents with OAuth` |
| `description` | `Install @shellui/cli and run shellui init, start, build, and deploy. Sign in with device login, inspect companies, storage, and hosting from your terminal.` | `Connect an MCP client to your Shellui company. OAuth sign-in on identity-service, read and write access levels, approvals for changes, and revocation.` |
| `eyebrow` | `Developers` | `Developers` |
| `heading` | `Run Shellui from your terminal` | `Connect AI agents to your company` |
| `lede` | see 4.1 | see 5.1 |
| OG card | generated, `docs` template | generated, `docs` template |

Both descriptions are under 160 characters. Check with `tools/og/text.mjs` truncation after build.

## 4. CLI page layout (`/cli/`)

Components reused: `layouts/feature.njk` (breadcrumbs, eyebrow, H1, lede), the section pattern from `src/features/authentication/index.njk` (`section` + `h2.text-2xl font-semibold tracking-tight text-pretty text-foreground sm:text-3xl` + `p.mt-4 text-base/7 text-muted-foreground`), `{% highlight "bash" %}` for code, a `.prose` block for tables (as in `/architecture/`), `github-repo-button.njk`, and `feature-docs.njk` at the end. No visual at the top.

### 4.1 Hero (front matter)

- Eyebrow: Developers
- H1: Run Shellui from your terminal
- Lede (placeholder): "The `shellui` command creates a project, runs the shell around your app, builds a static site, and deploys a preview. It also signs you in and reads your company, storage, and hosting from the terminal."

### 4.2 Install and first run (`h2`: Install the CLI and start a project)

Placeholder copy: "Install `@shellui/cli` with npm. It needs Node.js 18 or later."

```bash
npm install -g @shellui/cli
shellui init
shellui start
```

One line under it: "`shellui init` asks for a framework and a backend. `shellui start` serves the shell with your app inside it." Link: Installation docs (`https://docs.shellui.com/installation`).

### 4.3 Commands (`h2`: Commands)

Intro: "Every command reads `shellui.config.json` from the current folder or the nearest parent up to `.git`. Pass `--config` to point at another file." Then one table per group (`h3` per group, two columns: Command, What it does). All rows come from `packages/cli/src/cli.js` and `docs/cli.md` on `develop`.

**Create and run**

| Command | What it does |
| --- | --- |
| `shellui init [framework]` | Create a project. Frameworks: `react`, `vue`, `angular`, `next`, `nuxt`, `svelte`, `alpine`, `empty`. Backends: `none`, `shellui`, `supabase` |
| `shellui start` (alias `shellui dev`) | Start the development server. Starts your app's own dev server too when `dev.run` is set. `--app` opens the desktop app |
| `shellui build` | Build a static site to `dist/web/`. `--app` also builds desktop bundles under `dist/app/` |

**Configuration**

| Command | What it does |
| --- | --- |
| `shellui config migrate` | Turn `shellui.config.ts` into `shellui.config.json` |
| `shellui config split` | Split the config into one file per section |
| `shellui config unsplit` | Merge the section files back into one config |

**Sign-in**

| Command | What it does |
| --- | --- |
| `shellui login` | Sign in with OAuth device login. Open the link, check the code, and approve. `--no-browser` prints the link instead of opening it |
| `shellui logout` | Remove stored credentials and end the session. `--all` signs out every account |
| `shellui whoami` | Show the profile of the signed-in account |
| `shellui auth status` | Show whether you are signed in and for which company. Never prints tokens |

**Companies**

| Command | What it does |
| --- | --- |
| `shellui companies list` | List the companies you belong to |
| `shellui companies get <id>` | Show one company |
| `shellui companies use <id>` | Set the default company for later commands |

**Preview deploys**

| Command | What it does |
| --- | --- |
| `shellui deploy` | Upload `dist/web/` as a preview site that stays up 7 days. `--build` builds first. `--dry-run` prints the plan only |
| `shellui deploy history` | List the deployments of this preview |
| `shellui deploy rollback` | Make an earlier deployment live again, with `--to <version>` or `--deployment <id>` |

**Storage and hosting**

| Command | What it does |
| --- | --- |
| `shellui storage buckets list` | List your company's storage buckets |
| `shellui storage buckets get [name]` | Show one bucket |
| `shellui hosting apps list` | List your preview sites |
| `shellui hosting apps get <slug>` | Show one preview site |
| `shellui hosting deployments list` | List deployments for a preview site |
| `shellui hosting deployments status <id>` | Show one deployment |

Note under the tables: "`companies`, `auth`, `storage`, and `hosting` accept `--json` for scripts."

Placeholder rule: in the tables, `<id>`, `<slug>` and `[name]` are argument syntax copied from the CLI help, not prose placeholders. If writing.md review objects, use `companies get your_company_id` style instead.

Not listed on purpose: `shellui projects` (it targets the Shellui dashboard API, see open questions).

### 4.4 Sign-in and credentials (`h2`: Where the CLI keeps your sign-in)

Placeholder copy (facts from `docs/cli.md` and `src/auth/credentials.js`):

- "`shellui login` uses the OAuth 2.0 device authorization grant. You approve the code in your browser on identity-service. The CLI never prints tokens."
- "Tokens go to your operating system keychain. When no keychain is available, the CLI warns once and writes them to a file only your user can read (mode `0600`)."

### 4.5 Continuous integration (`h2`: Deploy previews from CI)

Placeholder copy: "Create a deploy token in admin under Hosting, Deploy tokens. Store it as the `SHELLUI_DEPLOY_TOKEN` secret. When it is set, `shellui deploy` skips sign-in. The token can only create or update previews for your company."

```bash
SHELLUI_DEPLOY_TOKEN=your_deploy_token_here npx shellui deploy --build
```

### 4.6 Docs and related pages

`{% include "feature-docs.njk" %}` with:

- CLI reference: `https://docs.shellui.com/cli` (external)
- Installation: `https://docs.shellui.com/installation` (external)
- Deploy with the CLI: `https://docs.shellui.com/hosting/deploy-with-cli` (external, exists in docs sitemap)
- Architecture: `/architecture/`
- Changelog: `/changelog/`

Plus `{{ repo.githubRepoButton("shellui/shellui") }}` before the docs block.

## 5. MCP page layout (`/mcp/`)

Same components as the CLI page. Interface rules apply: do not lead with AI atmosphere, no visuals, no icon grids. The page is about MCP, so naming MCP is fine under writing.md.

### 5.1 Hero (front matter)

- Eyebrow: Developers
- H1: Connect AI agents to your company
- Lede (placeholder): "Shellui runs a Model Context Protocol (MCP) server for each company. An agent signs in with OAuth on identity-service, then reads and changes data in identity, storage, hosting, and email, within the access you approve."
- Directly under the lede, one muted line (same `text-sm text-muted-foreground` style): "MCP is in beta. Tool names and behavior may still change." This sentence is in every MCP doc on `develop`; keep it.

### 5.2 What it is (`h2`: One MCP URL per company)

Placeholder copy: "ai-service exposes one MCP endpoint per company: `/c/your_company_id/mcp`. Behind that URL, it reaches identity-service, storage-service, hosting-service, and email-service. Your agent only needs that one URL."

### 5.3 Connect a client (`h2`: Connect an MCP client)

Numbered steps (facts: `docs/features/ai-native.md`, identity `docs/mcp-and-agents.md`):

1. "In Shellui, open Settings, then MCP / AI agents. Copy your company's MCP URL and the prompt next to it."
2. "Add the URL as a remote MCP server in your client, or paste the prompt into your agent."
3. "Sign in on identity-service, pick the services, the access level, and the read level, then choose Approve."

Then: "A client with a browser uses the OAuth authorization code flow with PKCE. A headless agent or CLI uses device login: it shows you a link and a code, and you approve them in your browser. Never paste a token into a chat."

Client line (placeholder, see open questions): "Any MCP client that supports remote servers with OAuth can connect, for example ChatGPT, Claude, Grok, or MCP Inspector."

### 5.4 Tools (`h2`: Tools your agent can use)

Intro: "By default the server lists a few discovery tools, so the agent searches for the right operation instead of loading every tool."

`h3` Discovery tools (table, Tool / What it does):

| Tool | What it does |
| --- | --- |
| `ai_list_services` | List the connected services with example tasks |
| `ai_search_tools` | Find tools from a short phrase, filtered by service or read and write |
| `ai_describe_tool` | Show the arguments of one or more tools |
| `ai_call_tool` | Run a tool through the same access checks and approvals |
| `ai_get_approval` | Check whether a pending approval was accepted |

Plus: "Four common reads are listed too: `identity_list_users`, `storage_list_bucket`, `hosting_list_apps`, and `email_list_messages`."

`h3` Service tools (table, Service / Examples). Areas come from the OpenAPI operations each service exposes on `develop`; names are prefixed with the service, for example `identity_create_invitations`:

| Service | What the tools cover |
| --- | --- |
| identity | Users, invitations, groups, companies, sign-in methods, OAuth clients and redirects, SCIM tokens, audit events |
| storage | Buckets, files, share links, access grants, quotas |
| hosting | Preview sites, deployments, domains, environment variables, deploy tokens |
| email | Templates, newsletters, broadcasts, messages, rules, suppressions, provider |

Footer line: "Clients can ask for the full list with `?tools=all`."

Do not print a tool count. The docs say 224 today and it changes with each service release.

### 5.5 Security (`h2`: How Shellui keeps agents in bounds)

Bold/description list (`- **Term**: description`), each fact verified in identity or ai-service docs on `develop`:

- **OAuth on identity-service**: identity-service is the authorization server. Each approval creates a company-scoped agent. Access tokens last 15 minutes. A connection expires within 90 days
- **Company scope**: the token's audience is your company's MCP URL. A token for one company can't call another company's URL
- **Access levels**: Read only, Ask before changes (the default), or Full access. Full access still asks before a destructive tool
- **Read levels**: Safe (the default) masks personal data in tool results. Sensitive returns more fields, never stored secrets
- **Staff can't authorize agents**: staff accounts can't approve an MCP client or a device code. Use a member account of the company
- **Sign-in page**: shows the client name as unverified, the return address, and a warning not to continue if you didn't start the connection
- **Revoke at any time**: pause or revoke an agent from Settings or admin. Services check the revocation list every 30 seconds
- **Call log**: every tool call is logged per company

### 5.6 Elicitation (`h2`: Approvals inside the chat)

Placeholder copy (facts: `mcp_approval_channel.py`, `mcp_form_elicitation.py`, `docs/mcp.md`):

- "When an agent with Ask before changes calls a tool that writes, Shellui asks you first. If the client supports MCP form elicitation, the question appears in the chat: you see the real tool and its arguments, then choose Approve or Deny."
- "Destructive tools always use the approval page on identity-service, never the chat. The agent shows you the link, you approve there, and the agent runs the call once."
- "An approval covers one call with the same arguments and expires after 10 minutes. An agent can't approve its own request."

### 5.7 Docs and related pages

`{{ repo.githubRepoButton("shellui/ai-service") }}` then `feature-docs.njk` with:

- MCP gateway docs: `https://github.com/shellui/ai-service/blob/main/docs/mcp.md` (external; see open questions about a docs.shellui.com page)
- Device login: `https://github.com/shellui/ai-service/blob/main/docs/mcp-device-login.md` (external)
- Authentication: `/features/authentication/`
- Security: `/security/`
- Architecture: `/architecture/`

## 6. Every place to update

| File | Change |
| --- | --- |
| `src/_data/nav.json` | Add `developerGroups`, `group` keys, CLI and MCP items, reorder (section 1.1) |
| `src/_includes/nav.njk` | `developersActive` adds `/cli/` and `/mcp/`; `navIcon` adds `terminal` and `chip`; desktop Developers panel becomes two columns (1.3). Mobile loop unchanged |
| `src/_includes/footer.njk` | No change (loops `nav.developers`). Check order after build |
| `src/cli/index.njk` | New page (section 4) |
| `src/mcp/index.njk` | New page (section 5) |
| `src/_data/eleventyComputed.js` | `breadcrumbs.sectionLabels`: add `cli: "CLI"`, `mcp: "MCP"`, so the crumb is not the long page title |
| `tools/og/resolve-meta.mjs` | `SECTION_LABELS`: add `cli: "CLI"`, `mcp: "MCP"`. `resolveTemplate`: add `url === "/cli/" \|\| url === "/mcp/"` to the `docs` branch next to `/architecture/`. `docsHeaderLabel`: return `"CLI"` and `"MCP"` for those URLs |
| `src/llms.njk` | Under `## Product`, after Architecture: `- [CLI]({{ site.url }}/cli/): Every shellui command, from init to deploy` and `- [MCP]({{ site.url }}/mcp/): Connect an MCP client to a Shellui company with OAuth and approvals`. Keep the existing CLI path line. Format must stay `- [Label](url): note` (checked by `tools/verify-site.sh`) |
| `src/llms-full.njk` | No change. It only concatenates guideline markdown |
| `src/sitemap.njk` | No change. The `sitemap` collection in `eleventy.config.js` picks up every `src/**/*.{md,njk}` page. Do not set `sitemap: false` |
| `src/_includes/jsonld.njk` | No change. Each page gets `WebPage` plus `BreadcrumbList` from front matter |
| `tools/verify-site.sh` | Add `cli/index.html` and `mcp/index.html` to `required_files`. Optional: `grep -q '/cli/' "${SITE}/llms.txt"` and the same for `/mcp/` |
| `tools/check-links.mjs` | Optional: add `{ path: "index.html", must: ["/cli/", "/mcp/"] }` so the nav links stay present |
| `CHANGELOG.md` | `## [Unreleased]` with `### ✨ Feature`: "CLI and MCP pages under Developers, and a two-column Developers menu." |
| `src/security/index.md` | Optional, later: one line linking to `/mcp/#security` |

Not applicable on this site (checked):

- i18n strings: the website is English only (`site.locale: "en"`), and there is no string catalog in `shellui/website`
- Site search: there is no search index in the repo
- `robots.njk`: no change, both pages stay indexable

Before opening the PR, grep both new pages and `nav.json` for `—` and `–`, and for easy, simple, quick, just, seamless, powerful.

## 7. Open questions and unverified facts

1. **Release contents.** `shellui/shellui` `develop` is 97 commits ahead of `main`. The latest tag is v0.7.0. In v0.7.0 the CLI has only `start`, `build`, `init`, `config`, `login`, `logout`, `whoami`, `deploy`. `auth status`, `companies`, `projects`, `storage buckets`, and `hosting apps|deployments` exist only on `develop`. The command list must match what ships today. Recheck after the release.
2. **ai-service has never been released.** No tag, `develop` is 134 commits ahead of `main`. Confirm MCP ships in today's release before the page goes live.
3. **`shellui projects`.** It calls the Shellui dashboard API (`saas.url`). Left off the page. Include it only if Sébastien wants the dashboard named on public pages.
4. **Hosted MCP URL.** I found no public hosted ai-service host (no `ai.shellui.com`). The page tells readers to copy the URL from Settings instead of printing one.
5. **Settings label.** "Settings, then MCP / AI agents" comes from `docs/features/ai-native.md`. Ella: confirm the label in `@shellui/core` before shipping.
6. **Client names.** identity `docs/mcp-and-agents.md` names ChatGPT, Claude, Grok, and MCP Inspector. The automated e2e only runs the TypeScript MCP SDK, the Python MCP SDK, and MCP Inspector. Keep the example list or reduce it to "any MCP client with OAuth support".
7. **MCP docs link.** docs.shellui.com has no public MCP page yet (`docs/features/ai-native*.md` is a local testing guide, `ai.md` is a draft about on-device AI). Linking to ai-service GitHub docs until a public docs page exists.
8. **Two new icons.** Paths are Heroicons v1 outline from memory. Verify before commit.
9. **Groups.** No SDK, API, or Playground item was added to the dropdown, to keep everything else as it is. Playground stays in the footer. Add one later if Sébastien wants a fourth Build item.
