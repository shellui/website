#!/usr/bin/env bash
# Verify security response headers on a deployed shellui.com host.
# GitHub Pages alone cannot set these — run after Cloudflare (or equivalent) edge config.
set -euo pipefail

ROOT="$(cd "$(dirname "${BASH_SOURCE[0]}")/.." && pwd)"
URL="${1:-https://shellui.com/}"
CONFIG="${ROOT}/infra/security-headers.json"

log() { printf '==> %s\n' "$*"; }
fail() { printf 'ERROR: %s\n' "$*" >&2; exit 1; }

[[ -f "${CONFIG}" ]] || fail "missing ${CONFIG}"

required=(
  Content-Security-Policy
  Strict-Transport-Security
  X-Content-Type-Options
  Referrer-Policy
)

log "Fetching headers from ${URL}"
headers="$(curl -fsSI "${URL}" || fail "could not reach ${URL}")"

missing=()
for name in "${required[@]}"; do
  if ! printf '%s\n' "${headers}" | grep -qi "^${name}:"; then
    missing+=("${name}")
  fi
done

if ((${#missing[@]} > 0)); then
  printf '%s\n' "${headers}" | head -20
  fail "missing headers: ${missing[*]} — see docs/deploy-security-headers.md (GitHub Pages requires a CDN/proxy)"
fi

csp_expected="$(node -e "const c=require('${CONFIG}'); process.stdout.write(c.headers['Content-Security-Policy'])")"
csp_actual="$(printf '%s\n' "${headers}" | grep -i '^content-security-policy:' | head -1 | cut -d: -f2- | xargs)"

if [[ "${csp_actual}" != "${csp_expected}" ]]; then
  log "CSP present but differs from infra/security-headers.json"
  log "expected: ${csp_expected}"
  log "actual:   ${csp_actual}"
  fail "update edge config or sync infra/security-headers.json"
fi

if ! printf '%s\n' "${headers}" | grep -qi '^strict-transport-security:.*max-age='; then
  fail "Strict-Transport-Security missing max-age"
fi

if ! printf '%s\n' "${headers}" | grep -qi '^x-content-type-options:.*nosniff'; then
  fail "X-Content-Type-Options must be nosniff"
fi

printf 'OK: security headers verified for %s\n' "${URL}"
