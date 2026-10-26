#!/usr/bin/env bash
# Regenerate docs/og-samples from a fresh production build (no OG cache reads).
set -euo pipefail
ROOT="$(cd "$(dirname "${BASH_SOURCE[0]}")/.." && pwd)"
cd "$ROOT"
rm -rf .cache/og _site
npm run build
DEST="$ROOT/docs/og-samples"
mkdir -p "$DEST"
cp _site/og/index.png "$DEST/og-home.png"
cp _site/og/features-web-and-desktop.png "$DEST/og-long-title.png"
cp _site/og/guidelines-writing.png "$DEST/og-guidelines.png"
cp _site/og/features-authentication.png "$DEST/og-docs-feature.png"
cp img/blog/introducing-shellui-1200x630.png "$DEST/og-blog.png"
cp _site/og/changelog.png "$DEST/og-changelog.png"
echo "Updated samples in docs/og-samples/"
