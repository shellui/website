# Cloudflare edge config

shellui.com is built on GitHub Pages. Response security headers live here at the CDN edge, not in `_site/`.

- Canonical header values: [`../security-headers.json`](../security-headers.json)
- Rollout checklist: [`../../docs/deploy-security-headers.md`](../../docs/deploy-security-headers.md)
- Optional Worker: [`worker-security-headers.js`](worker-security-headers.js)

Apply headers with **Transform Rules** (preferred) or the Worker script. Keep `infra/security-headers.json` updated when the site's third-party dependencies change.
