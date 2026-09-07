#!/usr/bin/env bash
# Pre-release checklist for website (develop → main).
# Usage:
#   ./tools/pre-release-check.sh
#   ./tools/pre-release-check.sh --skip-build
set -euo pipefail

ROOT="$(cd "$(dirname "${BASH_SOURCE[0]}")/.." && pwd)"
cd "${ROOT}"

SKIP_BUILD=0

usage() {
  cat <<'EOF'
Usage: ./tools/pre-release-check.sh [options]

Checks the site is ready to release to main / GitHub Pages:
  1. Version alignment (package.json ↔ CHANGELOG dated entry)
  2. No Unreleased placeholder left as the top entry
  3. Production build + _site smoke checks

Options:
  --skip-build   Skip npm ci / build / verify (version checks only)
  -h, --help     Show this help
EOF
}

log() { printf '==> %s\n' "$*"; }
fail() { printf 'ERROR: %s\n' "$*" >&2; exit 1; }

while [[ $# -gt 0 ]]; do
  case "$1" in
    --skip-build) SKIP_BUILD=1; shift ;;
    -h|--help) usage; exit 0 ;;
    *) fail "unknown option: $1" ;;
  esac
done

command -v node >/dev/null 2>&1 || fail 'node is required'
command -v npm >/dev/null 2>&1 || fail 'npm is required'

VERSION="$(node -p "require('./package.json').version")"
[[ -n "${VERSION}" ]] || fail 'could not read version from package.json'

log "Pre-release check for website ${VERSION}"

# ---------------------------------------------------------------------------
# 1. Version alignment
# ---------------------------------------------------------------------------
log "1/3 Version alignment"

if ! grep -E "^## \[${VERSION}\] - [0-9]{4}-[0-9]{2}-[0-9]{2}$" CHANGELOG.md >/dev/null; then
  fail "CHANGELOG.md must contain a dated entry exactly like: ## [${VERSION}] - YYYY-MM-DD"
fi
if grep -E "^## \[${VERSION}\] - .*MM-DD" CHANGELOG.md >/dev/null; then
  fail "CHANGELOG.md entry for ${VERSION} still has a placeholder date (MM-DD)"
fi

# Topmost real release heading should be this version (ignore HTML comments).
TOP_HEADING="$(
  grep -E '^## \[' CHANGELOG.md \
    | grep -v 'Unreleased' \
    | head -1 \
    || true
)"
[[ -n "${TOP_HEADING}" ]] || fail 'CHANGELOG.md has no version headings'
EXPECTED="## [${VERSION}] -"
[[ "${TOP_HEADING}" == "${EXPECTED}"* ]] \
  || fail "CHANGELOG.md top release is '${TOP_HEADING}', expected version ${VERSION}"

printf 'OK: version %s aligned in package.json and CHANGELOG.md\n' "${VERSION}"

# ---------------------------------------------------------------------------
# 2. Hygiene
# ---------------------------------------------------------------------------
log "2/3 Release hygiene"

if grep -E '^## \[Unreleased\]' CHANGELOG.md >/dev/null; then
  # Allow the template comment block; fail if an active Unreleased section exists outside comments.
  if awk '
    BEGIN { in_comment = 0 }
    /<!--/ { in_comment = 1 }
    /-->/ { in_comment = 0; next }
    !in_comment && /^## \[Unreleased\]/ { found = 1 }
    END { exit found ? 0 : 1 }
  ' CHANGELOG.md; then
    fail 'CHANGELOG.md still has an active ## [Unreleased] section — move notes into the dated release'
  fi
fi

printf 'OK: no active Unreleased section\n'

# ---------------------------------------------------------------------------
# 3. Build + verify
# ---------------------------------------------------------------------------
if [[ "${SKIP_BUILD}" -eq 1 ]]; then
  log "3/3 Build skipped (--skip-build)"
  printf 'OK: pre-release checks passed (build skipped)\n'
  exit 0
fi

log "3/3 Production build + verify"
npm ci
npm run build
chmod +x ./tools/verify-site.sh
./tools/verify-site.sh

printf 'OK: website %s is ready to release\n' "${VERSION}"
