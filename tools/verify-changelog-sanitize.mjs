#!/usr/bin/env node
/**
 * Unit checks for changelog markdown sanitization.
 */
import {
  assertSafeChangelogHtml,
  inlineMarkdown,
  linkTickets,
} from "./changelog-markdown.mjs";

let failed = 0;

function assert(condition, message) {
  if (!condition) {
    console.error(`FAIL: ${message}`);
    failed += 1;
  }
}

const xssPayload = '**Title**: `<script>alert(1)</script>` and [bad](javascript:alert(1))';
const rendered = linkTickets(inlineMarkdown(xssPayload));
assert(!rendered.includes("<script>"), "script tag must not appear in output");
assert(rendered.includes("&lt;script&gt;"), "script must be escaped in output");
assert(!/\shref\s*=\s*["']?\s*javascript:/i.test(rendered), "javascript: href must not appear in output");
assert(rendered.includes("[bad](javascript:alert(1))"), "non-http markdown links must stay plain text");
assertSafeChangelogHtml(rendered);

const ticket = inlineMarkdown("Fix something (#42) in `shellui init`");
const withTicket = linkTickets(ticket);
assert(
  withTicket.includes('href="https://github.com/shellui/shellui/issues/42"'),
  "issue ticket links must render",
);
assertSafeChangelogHtml(withTicket);

const docs = inlineMarkdown(
  "See [themes](./docs/features/themes.md) for details.",
);
assert(docs.includes("https://docs.shellui.com/features/themes/"), "docs links must rewrite");
assertSafeChangelogHtml(docs);

try {
  assertSafeChangelogHtml('<img src=x onerror=alert(1)>');
  assert(false, "onerror payload should throw");
} catch {
  // expected
}

if (failed > 0) {
  process.exit(1);
}

console.log("OK: changelog sanitization checks passed");
