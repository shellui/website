#!/usr/bin/env bash
# Smoke-check a built _site/ directory (run after npm run build).
set -euo pipefail

ROOT="$(cd "$(dirname "${BASH_SOURCE[0]}")/.." && pwd)"
SITE="${ROOT}/_site"

log() { printf '==> %s\n' "$*"; }
fail() { printf 'ERROR: %s\n' "$*" >&2; exit 1; }

[[ -d "${SITE}" ]] || fail "_site/ missing — run npm run build first"

required_files=(
  index.html
  404.html
  CNAME
  robots.txt
  sitemap.xml
  assets/css/site.css
  assets/js/site.js
)

log "Checking required output files"
for rel in "${required_files[@]}"; do
  [[ -f "${SITE}/${rel}" ]] || fail "missing ${rel} in _site/"
done

cname="$(tr -d '[:space:]' < "${SITE}/CNAME")"
[[ "${cname}" == "shellui.com" ]] || fail "CNAME must be shellui.com (got: ${cname})"

# GitHub Pages custom 404 must be a root file, not /404/index.html
[[ -f "${SITE}/404.html" ]] || fail "404.html must exist at site root for GitHub Pages"
[[ ! -f "${SITE}/404/index.html" ]] || fail "do not publish /404/index.html — use root 404.html"

# Homepage must mention the product name
grep -q 'Shellui' "${SITE}/index.html" || fail "index.html does not contain 'Shellui'"

# Asset fingerprinting should rewrite CSS references with a cache-busting query
if ! grep -qE 'assets/css/site\.css\?v=[a-f0-9]{8}' "${SITE}/index.html"; then
  fail "index.html missing fingerprinted site.css (?v=hash) — build may not have run in production mode"
fi

printf 'OK: _site/ looks ready to deploy\n'
