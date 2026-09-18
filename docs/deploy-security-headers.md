# Security headers for shellui.com

## Hosting today

| Layer | Role |
| --- | --- |
| **Build** | GitHub Actions (`.github/workflows/pages.yml`) → `_site/` artifact |
| **Origin** | GitHub Pages (`shellui.github.io`) |
| **Custom domain** | `CNAME` → `shellui.com` |
| **CDN today** | GitHub/Fastly edge (`server: GitHub.com`, `via: varnish`) |

GitHub Pages serves static files only. It does **not** support custom response headers (no `_headers`, no `vercel.json`, no repository setting). Any CSP, HSTS, or `X-Content-Type-Options` must be added **in front of** Pages at a proxy/CDN you control.

Verify the live stack before changing DNS:

```bash
curl -sI https://shellui.com/ | grep -E '^(server|via|cf-ray|content-security-policy|strict-transport-security):'
```

If you see `cf-ray`, Cloudflare is already proxying. If you only see `server: GitHub.com`, headers are still missing (expected until edge config is applied).

## Recommended: Cloudflare in front of GitHub Pages

1. Add `shellui.com` (and `www` if used) to Cloudflare.
2. Point DNS at GitHub Pages:
   - `@` → CNAME → `<org>.github.io` (proxied / orange cloud)
   - Keep the repo `CNAME` file as `shellui.com`.
3. SSL/TLS mode: **Full (strict)**.
4. Apply response headers from [`infra/security-headers.json`](../infra/security-headers.json).

### Option A — Transform Rules (simplest)

Cloudflare dashboard → **Rules** → **Transform Rules** → **Modify Response Header** → create one rule:

- **When:** `(http.host eq "shellui.com") or (http.host eq "www.shellui.com")`
- **Then:** set static headers listed in `infra/security-headers.json` (`Content-Security-Policy`, `Strict-Transport-Security`, `X-Content-Type-Options`, `Referrer-Policy`, `X-Frame-Options`, `Permissions-Policy`).

Copy values verbatim from the JSON file so the repo stays the single source of truth.

### Option B — Worker (same headers, more control)

See [`infra/cloudflare/worker-security-headers.js`](../infra/cloudflare/worker-security-headers.js). Route `shellui.com/*` through the worker, fetch from the GitHub Pages origin, and append headers from the shared JSON.

## CSP notes

The policy in `infra/security-headers.json` matches the current site:

- `@shellui/sdk` from `cdn.jsdelivr.net` (see `src/_includes/layouts/base.njk`)
- Inline boot script for theme / `color-scheme` (needs `'unsafe-inline'` until nonced)
- Self-hosted Alpine, Elements, site JS, CSS, and React islands

If you add a new third-party script or iframe, update `infra/security-headers.json` and re-run verification.

## Verification

After edge config is live:

```bash
./tools/verify-security-headers.sh
# or against a staging host:
./tools/verify-security-headers.sh https://staging.example.com
```

Optional: trigger the **Verify security headers** workflow (`.github/workflows/security-headers.yml`) from the Actions tab after DNS/header rollout.

## GitHub Pages limitations (honest checklist)

- [ ] Headers cannot be set in this repository alone; edge proxy required.
- [ ] GitHub Pages cache TTL (~10 minutes) still applies to HTML/assets; fingerprinting uses `?v=` (see `eleventy.config.js`).
- [ ] HSTS preload only makes sense once **all** subdomains serve HTTPS with a valid cert.
- [ ] Until Cloudflare (or equivalent) is proxied, `curl -sI https://shellui.com/` will **not** show CSP/HSTS — that is expected.
