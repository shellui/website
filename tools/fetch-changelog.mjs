#!/usr/bin/env node
/**
 * Prebuild step: resolve latest shellui/shellui release and cache CHANGELOG.md.
 * Wired via npm run fetch:changelog and prebuild (runs before every npm run build).
 */
import { fetchChangelogMarkdown } from "./changelog-fetch.mjs";

try {
  const { version, tag, source } = await fetchChangelogMarkdown();
  console.log(`OK: product changelog v${version} (${tag}) from ${source}`);
} catch (err) {
  console.error(`ERROR: ${err.message}`);
  process.exit(1);
}
