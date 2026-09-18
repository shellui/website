/**
 * Safe markdown → HTML for changelog list items (build-time only).
 * Escapes raw HTML before applying a small inline subset.
 */

export function escapeHtml(text) {
  return String(text)
    .replace(/&/g, "&amp;")
    .replace(/</g, "&lt;")
    .replace(/>/g, "&gt;")
    .replace(/"/g, "&quot;")
    .replace(/'/g, "&#39;");
}

export function escapeAttr(text) {
  return escapeHtml(text);
}

const CODE_CLASS =
  "text-xs bg-gray-100 dark:bg-gray-800 px-1 py-0.5 rounded";

/**
 * @param {string} text
 * @param {{ docsBase?: string, githubRepo?: string }} [options]
 */
export function inlineMarkdown(text, options = {}) {
  const { docsBase = "https://docs.shellui.com", githubRepo = "shellui/shellui" } =
    options;

  let out = escapeHtml(String(text));

  out = out.replace(
    /\[([^\]]+)\]\((https?:\/\/[^)]+)\)/g,
    (_match, label, url) =>
      `<a href="${escapeAttr(url)}" target="_blank" rel="noopener noreferrer">${label}</a>`,
  );

  out = out.replace(
    /\[([^\]]+)\]\(\.\/docs\/([^)#]+)(?:\.md)?(#[^)]*)?\)/g,
    (_match, label, docPath, hash = "") => {
      const clean = String(docPath).replace(/\.md$/i, "").replace(/\/+$/, "");
      const href = `${docsBase}/${clean}/${hash}`;
      return `<a href="${escapeAttr(href)}" target="_blank" rel="noopener noreferrer">${label}</a>`;
    },
  );

  out = out.replace(
    /`([^`]+)`/g,
    (_match, code) => `<code class="${CODE_CLASS}">${code}</code>`,
  );
  out = out.replace(/\*\*([^*]+)\*\*/g, (_match, inner) => `<strong>${inner}</strong>`);
  out = out.replace(/\*([^*]+)\*/g, (_match, inner) => `<em>${inner}</em>`);

  return out;
}

export function linkTickets(text, githubRepo = "shellui/shellui") {
  return String(text).replace(
    /\(#(\d+)\)/g,
    `(<a href="https://github.com/${githubRepo}/issues/$1">#$1</a>)`,
  );
}

export function rewriteDocsLinks(text, docsBase = "https://docs.shellui.com") {
  return String(text).replace(
    /\]\(\.\/docs\/([^)#]+)(?:\.md)?(#[^)]*)?\)/g,
    (_match, docPath, hash = "") => {
      const clean = String(docPath).replace(/\.md$/i, "").replace(/\/+$/, "");
      return `](${docsBase}/${clean}/${hash})`;
    },
  );
}

/** Reject raw HTML/script injection in rendered changelog items. */
export function assertSafeChangelogHtml(html) {
  const value = String(html);
  if (/<script\b/i.test(value)) {
    throw new Error("changelog item contains <script>");
  }
  if (/\son\w+\s*=/i.test(value)) {
    throw new Error("changelog item contains inline event handler");
  }
  if (/\shref\s*=\s*["']?\s*javascript:/i.test(value)) {
    throw new Error("changelog item contains javascript: URL");
  }
}
