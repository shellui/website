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
  guidelines/interface/index.html
  guidelines/foundations/index.html
  guidelines/print/index.html
  guidelines/changelog/index.html
  guidelines/writing.md
  guidelines/interface.md
  guidelines/foundations.md
  guidelines/print.md
  guidelines/web-design.md
  guidelines/design/index.html
  guidelines/web-design/index.html
  guidelines/brand/index.html
  guidelines/brand.md
  guidelines/generated/tokens.json
  design.md
  llms-full.txt
  assets/fonts/inter/inter-latin-400-normal.woff2
  brand-assets/shellui-brand-kit-v1.pdf
  brand-assets/shellui-brand-assets-v1.zip
  brand-assets/logo/shellui-mark-ink.svg
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
grep -q '/guidelines/interface/' "${SITE}/guidelines/index.html" || fail "guidelines hub missing interface link"
grep -q '/guidelines/foundations/' "${SITE}/guidelines/index.html" || fail "guidelines hub missing foundations link"
grep -q '/design.md' "${SITE}/guidelines/index.html" || fail "guidelines hub missing design.md fetch URL"
grep -q '/llms-full.txt' "${SITE}/guidelines/index.html" || fail "guidelines hub missing llms-full.txt link"
grep -q '/llms.txt' "${SITE}/guidelines/index.html" || fail "guidelines hub missing llms.txt link"
grep -q '^# Shellui$' "${SITE}/llms.txt" || fail "llms.txt missing H1 project name"
grep -q '^> ' "${SITE}/llms.txt" || fail "llms.txt missing blockquote summary"
grep -q 'microfrontend shell' "${SITE}/llms.txt" || fail "llms.txt blockquote missing product one-liner"
grep -q '^## Optional$' "${SITE}/llms.txt" || fail "llms.txt missing Optional section"
grep -q 'https://shellui.com/design.md' "${SITE}/llms.txt" || fail "llms.txt missing design.md"
grep -q 'llms-full.txt' "${SITE}/llms.txt" || fail "llms.txt missing llms-full.txt link"
grep -q 'interface.md' "${SITE}/llms.txt" || fail "llms.txt missing interface.md"
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

log "Checking homepage conversion paths"
grep -q 'fetch https://shellui.ai to start with Shellui' "${SITE}/index.html" \
  || fail "index.html missing copyable shellui.ai agent prompt"
grep -q 'npm install -g @shellui/cli' "${SITE}/index.html" \
  || fail "index.html missing global CLI install"
grep -q 'shellui init react' "${SITE}/index.html" \
  || fail "index.html missing shellui init react"
grep -q 'shellui login' "${SITE}/index.html" \
  || fail "index.html missing shellui login"
grep -q 'shellui deploy' "${SITE}/index.html" \
  || fail "index.html missing shellui deploy"
grep -q 'shellui.app' "${SITE}/index.html" \
  || fail "index.html missing shellui.app hosting"
grep -q 'dist/web/' "${SITE}/index.html" \
  || fail "index.html missing static dist/web/ ship path"
if grep -q 'Questions developers ask' "${SITE}/index.html"; then
  fail "index.html still includes the homepage FAQ"
fi
if grep -qiE 'Flutter' "${SITE}/index.html"; then
  fail "index.html must not list Flutter as an init framework"
fi

grep -q 'Guidelines v2.0.0' "${SITE}/guidelines/writing/index.html" || fail "writing guidelines page missing v2.0.0 label"
grep -q 'Guidelines v2.0.0' "${SITE}/guidelines/interface/index.html" || fail "interface page missing v2.0.0 label"
grep -q 'Hit targets:' "${SITE}/guidelines/interface/index.html" || fail "interface page missing hit-target rule"
grep -q 'Shellui chrome' "${SITE}/guidelines/interface/index.html" || fail "interface page missing chrome section"
grep -q 'data-design-swatch="primary"' "${SITE}/guidelines/foundations/index.html" || fail "foundations handbook missing primary swatch"
grep -q 'id="visual-handbook"' "${SITE}/guidelines/foundations/index.html" || fail "foundations missing visual handbook"
grep -q '^version: 2.0.0' "${SITE}/guidelines/writing.md" || fail "published writing.md missing v2 frontmatter"
grep -q '^version: 2.0.0' "${SITE}/guidelines/interface.md" || fail "published interface.md missing v2 frontmatter"
grep -q '^version: 2.0.0' "${SITE}/design.md" || fail "published /design.md missing v2 frontmatter"
grep -q 'Act as an excellent' "${SITE}/design.md" || fail "/design.md missing agent composition prompt"
grep -qF '| `background`' "${SITE}/design.md" || fail "/design.md missing token table"
grep -q '#8a6300' "${SITE}/design.md" || fail "/design.md must use text gold #8a6300"
grep -q 'noindex' "${SITE}/brand-assets/index.html" || fail "brand-assets redirect stub must be noindex"
grep -q 'guidelines/brand/#downloads' "${SITE}/brand-assets/index.html" || fail "brand-assets redirect must target brand downloads with hash"
grep -q 'location.replace' "${SITE}/brand-assets/index.html" || fail "brand-assets redirect must use location.replace"
grep -q 'noindex' "${SITE}/guidelines/design/index.html" || fail "design redirect stub must be noindex"
grep -q '/guidelines/interface/' "${SITE}/guidelines/design/index.html" || fail "design URL must redirect to interface"
grep -q '/guidelines/interface/' "${SITE}/guidelines/web-design/index.html" || fail "web-design URL must redirect to interface"
grep -q '/guidelines/brand/' "${SITE}/guidelines/index.html" || fail "guidelines hub missing brand link"
grep -q 'id="downloads"' "${SITE}/guidelines/brand/index.html" || fail "brand page missing downloads section"
grep -q '/brand-assets/shellui-brand-kit-v1.pdf' "${SITE}/guidelines/brand/index.html" || fail "brand page missing kit PDF link"
grep -q 'Agents can fetch' "${SITE}/guidelines/writing/index.html" || fail "guidelines page missing agent fetch copy"
grep -q 'data-copy=' "${SITE}/guidelines/writing/index.html" || fail "guidelines page missing markdown URL copy button"
grep -q 'Downloads' "${SITE}/guidelines/index.html" || fail "guidelines hub missing Downloads card"
grep -q 'Inter' "${SITE}/guidelines/foundations/index.html" || fail "foundations must document Inter on screen"
if grep -q 'Act as an excellent' "${SITE}/guidelines/interface/index.html"; then
  fail "interface HTML page should not render the full agent prompt (use design.md)"
fi
design_bytes="$(wc -c < "${SITE}/design.md")"
if [[ "${design_bytes}" -gt 40960 ]]; then
  fail "design.md must stay under 40 KB (got ${design_bytes} bytes)"
fi
grep -q 'guidelines/interface.md' "${SITE}/design.md" || fail "design.md must link to full interface.md"
if grep -q '/brand-assets/' "${SITE}/sitemap.xml"; then
  fail "sitemap must not list legacy /brand-assets/ redirect stub"
fi
if grep -q '/guidelines/design/' "${SITE}/sitemap.xml"; then
  fail "sitemap must not list legacy /guidelines/design/ redirect stub"
fi
if grep -q '/guidelines/web-design/' "${SITE}/sitemap.xml"; then
  fail "sitemap must not list legacy /guidelines/web-design/ redirect stub"
fi
grep -q '/guidelines/changelog/' "${SITE}/guidelines/index.html" || fail "guidelines pages should link to changelog"
grep -q 'Changelog' "${SITE}/guidelines/writing/index.html" || fail "guidelines subnav missing Changelog link"

log "Checking design token drift"
node "${ROOT}/tools/verify-design-tokens.mjs"
node "${ROOT}/tools/verify-gold-hex.mjs"
node "${ROOT}/tools/verify-guidelines-prose.mjs"
node "${ROOT}/tools/check-links.mjs"

# Asset fingerprinting should rewrite CSS references with a cache-busting query
if ! grep -qE 'assets/css/site\.css\?v=[a-f0-9]{8}' "${SITE}/index.html"; then
  fail "index.html missing fingerprinted site.css (?v=hash) — build may not have run in production mode"
fi

log "Checking Shellui 0.5.0 release pins and security"
[[ -f "${SITE}/assets/js/shellui.tiny.js" ]] \
  || fail "missing self-hosted assets/js/shellui.tiny.js"
grep -q '/assets/js/shellui.tiny.js' "${SITE}/index.html" \
  || fail "index.html must load self-hosted shellui.tiny.js"
if grep -qE 'cdn\.jsdelivr\.net/npm/@shellui/sdk' "${SITE}/index.html"; then
  fail "index.html must not load @shellui/sdk from jsDelivr"
fi
if grep -qE '@shellui/sdk@0\.5\.0-(beta|alpha)' "${SITE}/index.html"; then
  fail "index.html still pins a beta/alpha @shellui/sdk"
fi
node "${ROOT}/tools/verify-changelog-sanitize.mjs"
changelog_main="$(sed -n '/<main id="main-content"/,/<\/main>/p' "${SITE}/changelog/index.html")"
if printf '%s' "${changelog_main}" | grep -qiE '<script\b|onerror=|href=[^>]*javascript:'; then
  fail "changelog main content must not contain unsanitized script/event-handler markup"
fi
grep -q 'text-2xl font-semibold tracking-tight' "${SITE}/changelog/index.html" \
  || fail "changelog page missing strong latest-version callout heading"
grep -q 'View release' "${SITE}/changelog/index.html" \
  || fail "changelog page missing View release CTA"
latest_product_version="$(
  grep -oE 'releases/tag/v[0-9]+\.[0-9]+\.[0-9]+' "${SITE}/changelog/index.html" \
    | head -1 \
    | sed 's|releases/tag/v||'
)"
[[ -n "${latest_product_version}" ]] \
  || fail "changelog callout must link to a GitHub release tag"
# Homepage badge uses major.minor (implies .x), not the full patch release.
latest_product_series="$(printf '%s' "${latest_product_version}" | grep -oE '^[0-9]+\.[0-9]+')"
[[ -n "${latest_product_series}" ]] \
  || fail "could not derive major.minor series from v${latest_product_version}"
grep -q "v${latest_product_series} is out" "${SITE}/index.html" \
  || fail "homepage badge must show latest product series v${latest_product_series} (not website package version)"
grep -q "Changelog for ${latest_product_series}" "${SITE}/index.html" \
  || fail "homepage footer must link to changelog for product series v${latest_product_series}"
grep -q 'Floating chrome actions' "${SITE}/changelog/index.html" \
  || fail "changelog page missing curated 0.5.0 chrome actions highlight"
if grep -qiE 'Flutter Web|🗑 Removed|Removed</h3>' "${SITE}/changelog/index.html"; then
  fail "changelog page must not show a Removed / Flutter section for 0.5.0"
fi

printf 'OK: _site/ looks ready to deploy\n'
