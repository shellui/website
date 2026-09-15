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
  llms.txt
  sitemap.xml
  assets/css/site.css
  assets/js/site.js
  brand-assets/index.html
  guidelines/index.html
  guidelines/writing/index.html
  guidelines/web-design/index.html
  guidelines/writing.md
  guidelines/web-design.md
  guidelines/design.md
  guidelines/design/index.html
  design.md
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
grep -q '/design.md' "${SITE}/guidelines/index.html" || fail "guidelines hub missing design.md fetch URL"
grep -q '/llms.txt' "${SITE}/guidelines/index.html" || fail "guidelines hub missing llms.txt link"
grep -q '^# Shellui$' "${SITE}/llms.txt" || fail "llms.txt missing H1 project name"
grep -q '^> ' "${SITE}/llms.txt" || fail "llms.txt missing blockquote summary"
grep -q 'Built for developers' "${SITE}/llms.txt" || fail "llms.txt blockquote missing Built for phrasing"
grep -q '^## Optional$' "${SITE}/llms.txt" || fail "llms.txt missing Optional section"
grep -q 'https://shellui.com/design.md' "${SITE}/llms.txt" || fail "llms.txt missing design.md"
grep -q '\[shellui.ai\](https://shellui.ai)' "${SITE}/llms.txt" || fail "llms.txt missing markdown link for shellui.ai"
grep -q 'npm install -g @shellui/cli' "${SITE}/llms.txt" || fail "llms.txt missing CLI install"
grep -q 'shellui init' "${SITE}/llms.txt" || fail "llms.txt missing shellui init"
grep -q 'docs.shellui.com/sdk' "${SITE}/llms.txt" || fail "llms.txt missing SDK docs link"
grep -q 'Auth backend source' "${SITE}/llms.txt" || fail "llms.txt missing identity-service annotation"
grep -qE '^- \[.+\]\(.+\): ' "${SITE}/llms.txt" || fail "llms.txt missing annotated link list entries"
if grep -q '\[This file\]' "${SITE}/llms.txt"; then
  fail "llms.txt should not self-link with [This file]"
fi
if grep -qiE 'Audience:' "${SITE}/llms.txt"; then
  fail "llms.txt must not use Audience: spec-sheet voice"
fi
if grep -qiE '<!DOCTYPE|<html' "${SITE}/llms.txt"; then
  fail "llms.txt must be plain text, not HTML"
fi
if grep -qiE '\beasy\b|\bsimple\b|\bquick\b|—' "${SITE}/llms.txt"; then
  fail "llms.txt has banned writing (easy/simple/quick or em dash)"
fi
grep -q 'rel="describedby" href="/llms.txt"' "${SITE}/index.html" || fail "site head missing llms.txt describedby link"

grep -q 'Guidelines v' "${SITE}/guidelines/writing/index.html" || fail "writing guidelines page missing version label"
grep -q 'Guidelines v' "${SITE}/guidelines/web-design/index.html" || fail "web design guidelines page missing version label"
grep -q 'Hit targets:' "${SITE}/guidelines/web-design/index.html" || fail "web design page missing hit-target rule"
grep -q 'id="shellui-chrome"' "${SITE}/guidelines/web-design/index.html" || fail "web design page missing chrome section"
grep -q 'Sacrifice grammar for brevity' "${SITE}/guidelines/web-design/index.html" || fail "web design page should render shared markdown"
grep -q 'Sacrifice grammar for brevity' "${SITE}/guidelines/web-design.md" || fail "web-design.md missing agent review prompt"
grep -q 'Hit targets:' "${SITE}/guidelines/web-design.md" || fail "web-design.md missing compact hit-target rule"
grep -q 'Guidelines v' "${SITE}/guidelines/design/index.html" || fail "design guidelines page missing version label"
grep -q '^version:' "${SITE}/guidelines/writing.md" || fail "published writing.md missing version frontmatter"
grep -q '^version:' "${SITE}/guidelines/web-design.md" || fail "published web-design.md missing version frontmatter"
grep -q '^version:' "${SITE}/design.md" || fail "published /design.md missing version frontmatter"
grep -q 'Eleventy' "${SITE}/design.md" || fail "/design.md missing Eleventy stack constraint"
grep -q 'Tailwind Plus' "${SITE}/design.md" || fail "/design.md missing Tailwind Plus guidance"
grep -q 'primary' "${SITE}/design.md" || fail "/design.md missing primary token"
grep -q '/guidelines/' "${SITE}/brand-assets/index.html" || fail "brand-assets page missing guidelines cross-link"
grep -q '/brand-assets/' "${SITE}/guidelines/index.html" || fail "guidelines hub missing brand-assets cross-link"
grep -q 'parent skill from this repo' "${SITE}/guidelines/index.html" || fail "guidelines hub missing labeled agent skill path"
grep -q 'data-design-swatch="primary"' "${SITE}/guidelines/design/index.html" || fail "design handbook missing primary color swatch"
grep -q 'data-theme-preview="light"' "${SITE}/guidelines/design/index.html" || fail "design handbook missing light surface preview"
grep -q 'data-theme-preview="dark"' "${SITE}/guidelines/design/index.html" || fail "design handbook missing dark surface preview"
grep -q 'id="do-and-dont"' "${SITE}/guidelines/design/index.html" || fail "design handbook missing do/don't section"
if grep -q 'Act as an excellent' "${SITE}/guidelines/design/index.html"; then
  fail "design HTML page should not render the agent prompt"
fi
grep -q 'Act as an excellent' "${SITE}/design.md" || fail "/design.md missing agent composition prompt"
grep -q '| `background`' "${SITE}/design.md" || fail "/design.md missing compact token table"

log "Checking design token drift"
node "${ROOT}/tools/verify-design-tokens.mjs"

# Asset fingerprinting should rewrite CSS references with a cache-busting query
if ! grep -qE 'assets/css/site\.css\?v=[a-f0-9]{8}' "${SITE}/index.html"; then
  fail "index.html missing fingerprinted site.css (?v=hash) — build may not have run in production mode"
fi

printf 'OK: _site/ looks ready to deploy\n'
