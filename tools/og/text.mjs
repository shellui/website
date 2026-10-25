/** Strip site suffix and normalize typography for OG artwork. */
export function sanitizeText(value) {
  return String(value ?? "")
    .replace(/\s*\|\s*Shellui\s*$/i, "")
    .replace(/\u2014/g, "-")
    .replace(/\u2013/g, "-")
    .replace(/\s+/g, " ")
    .trim();
}

export function truncateText(text, maxLen) {
  const value = sanitizeText(text);
  if (value.length <= maxLen) return value;
  const slice = value.slice(0, maxLen - 1);
  const lastSpace = slice.lastIndexOf(" ");
  const cut = lastSpace > maxLen * 0.6 ? slice.slice(0, lastSpace) : slice;
  return `${cut.trim()}…`;
}

export function titleMetrics(title, { maxChars = 72, baseSize = 56 } = {}) {
  let fontSize = baseSize;
  const len = title.length;
  if (len > 48) fontSize = 48;
  if (len > 64) fontSize = 42;
  if (len > 80) fontSize = 36;
  if (len > 96) fontSize = 32;
  const limit = fontSize <= 36 ? maxChars + 20 : maxChars;
  return {
    fontSize,
    text: truncateText(title, limit),
  };
}

export function formatBlogDate(date) {
  if (!date) return "";
  return new Date(date).toLocaleDateString("en-GB", {
    year: "numeric",
    month: "long",
    day: "numeric",
  });
}
