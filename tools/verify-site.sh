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
  brand-assets/index.html
  guidelines/index.html
  guidelines/writing/index.html
  guidelines/web-design/index.html
  guidelines/writing.md
  guidelines/web-design.md
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

grep -q '/guidelines/writing/' "${SITE}/guidelines/index.html" || fail "guidelines hub missing writing link"
grep -q '/guidelines/web-design/' "${SITE}/guidelines/index.html" || fail "guidelines hub missing web-design link"
grep -q 'Guidelines v' "${SITE}/guidelines/writing/index.html" || fail "writing guidelines page missing version label"
grep -q 'Guidelines v' "${SITE}/guidelines/web-design/index.html" || fail "web design guidelines page missing version label"
grep -q '^version:' "${SITE}/guidelines/writing.md" || fail "published writing.md missing version frontmatter"
grep -q '^version:' "${SITE}/guidelines/web-design.md" || fail "published web-design.md missing version frontmatter"
grep -q '/guidelines/' "${SITE}/brand-assets/index.html" || fail "brand-assets page missing guidelines cross-link"
grep -q '/brand-assets/' "${SITE}/guidelines/index.html" || fail "guidelines hub missing brand-assets cross-link"

# Asset fingerprinting should rewrite CSS references with a cache-busting query
if ! grep -qE 'assets/css/site\.css\?v=[a-f0-9]{8}' "${SITE}/index.html"; then
  fail "index.html missing fingerprinted site.css (?v=hash) — build may not have run in production mode"
fi

printf 'OK: _site/ looks ready to deploy\n'
