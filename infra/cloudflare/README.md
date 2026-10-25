# Cloudflare edge config

shellui.com is served **directly by GitHub Pages** today (`server: GitHub.com`). Response security headers are not available from Pages alone; if you add Cloudflare (or another proxy) in front of the custom domain, apply headers from the shared JSON.

- Canonical header values: [`../security-headers.json`](../security-headers.json)
- Rollout checklist: [`../../docs/deploy-security-headers.md`](../../docs/deploy-security-headers.md)

Use **Transform Rules** (Modify Response Header) when a proxy is in place. Guideline URL moves use **HTML fallback redirects** in the repo (meta refresh, `location.replace`, `noindex`), not edge 301s.
