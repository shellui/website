/** Strip site suffix and normalize typography for OG artwork. */
export function sanitizeText(value) {
  return String(value ?? "")
    .replace(/\s*\|\s*Shellui\s*$/i, "")
    .replace(/\u2014/g, "-")
    .replace(/\u2013/g, "-")
    .replace(/([.!?])([A-Za-z])/g, "$1 $2")
    .replace(/\s+/g, " ")
    .trim();
}

export function truncateText(text, maxLen) {
  const value = sanitizeText(text);
  if (value.length <= maxLen) return value;
  const slice = value.slice(0, maxLen - 1);
  const lastSpace = slice.lastIndexOf(" ");
  const cut = lastSpace > maxLen * 0.6 ? slice.slice(0, lastSpace) : slice;
  return `${cut.trim()}\u2026`;
}

/** Prefer a full sentence; otherwise break on a word with a single ellipsis character. */
export function truncateDescription(text, maxLen = 160) {
  const value = sanitizeText(text);
  if (!value) return "";
  if (value.length <= maxLen) return value;

  const window = value.slice(0, maxLen + 1);
  const sentences = window.match(/[^.!?]+[.!?]+(?:\s|$)?/g);
  if (sentences?.length) {
    let built = "";
    for (const sentence of sentences) {
      const next = (built + sentence).trim();
      if (next.length > maxLen) break;
      built = next;
    }
    if (built.length >= maxLen * 0.4) {
      return built.trim();
    }
  }

  const slice = value.slice(0, maxLen);
  const lastSpace = slice.lastIndexOf(" ");
  const cut = lastSpace > maxLen * 0.55 ? slice.slice(0, lastSpace) : slice.slice(0, maxLen - 1);
  return `${cut.trim()}\u2026`;
}

export function titleMetrics(title, { maxChars = 72, baseSize = 60 } = {}) {
  let fontSize = baseSize;
  const len = title.length;
  if (len > 52) fontSize = 56;
  if (len > 68) fontSize = 48;
  if (len > 88) fontSize = 42;
  if (len > 104) fontSize = 36;
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
