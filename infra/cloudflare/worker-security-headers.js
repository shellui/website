/**
 * Optional Cloudflare Worker: proxy GitHub Pages and append security headers.
 *
 * 1. Import infra/security-headers.json values into wrangler.toml / dashboard bindings,
 *    or paste the header block below after syncing with security-headers.json.
 * 2. Route: shellui.com/* → this worker.
 * 3. Origin fetch: https://shellui.github.io (or your Pages URL) preserving path + query.
 *
 * Prefer Transform Rules when a Worker is not already in use — see docs/deploy-security-headers.md.
 */

const SECURITY_HEADERS = {
  "Content-Security-Policy":
    "default-src 'self'; base-uri 'self'; form-action 'self'; frame-ancestors 'none'; object-src 'none'; script-src 'self' 'unsafe-inline'; style-src 'self' 'unsafe-inline'; img-src 'self' data:; font-src 'self'; connect-src 'self'; upgrade-insecure-requests",
  "Strict-Transport-Security": "max-age=31536000; includeSubDomains; preload",
  "X-Content-Type-Options": "nosniff",
  "Referrer-Policy": "strict-origin-when-cross-origin",
  "X-Frame-Options": "DENY",
  "Permissions-Policy": "camera=(), microphone=(), geolocation=(), payment=(), usb=()",
};

/** @type {string} GitHub Pages origin for shellui/website */
const PAGES_ORIGIN = "https://shellui.github.io";

export default {
  async fetch(request) {
    const url = new URL(request.url);
    const originUrl = `${PAGES_ORIGIN}${url.pathname}${url.search}`;

    const originRequest = new Request(originUrl, {
      method: request.method,
      headers: request.headers,
      redirect: "follow",
    });

    const response = await fetch(originRequest);
    const headers = new Headers(response.headers);

    for (const [name, value] of Object.entries(SECURITY_HEADERS)) {
      headers.set(name, value);
    }

    return new Response(response.body, {
      status: response.status,
      statusText: response.statusText,
      headers,
    });
  },
};
