/** Join HTML/markdown block boundaries and line breaks with spaces before plain-text OG copy. */
export function normalizeProse(raw) {
  return String(raw ?? "")
    .replace(/<\/p>\s*<p[^>]*>/gi, " ")
    .replace(/<br\s*\/?>/gi, " ")
    .replace(/<\/[^>]+>/gi, " ")
    .replace(/<[^>]+>/g, " ")
    .replace(/\*\*/g, "")
    .replace(/\r?\n+/g, " ")
    .replace(/\s+/g, " ")
    .trim();
}

/** Space after sentence punctuation when the next character is a new word (not a domain segment). */
export function fixSentenceSpacing(text) {
  return String(text ?? "").replace(
    /([.!?])([A-Za-z])/g,
    (match, punct, letter, offset, whole) => {
      if (punct !== ".") return `${punct} ${letter}`;
      const before = whole.slice(Math.max(0, offset - 24), offset);
      if (/[a-z0-9-]$/i.test(before) && /^[a-z]/i.test(letter)) {
        return `${punct}${letter}`;
      }
      return `${punct} ${letter}`;
    },
  );
}

/** Strip site suffix and normalize typography for OG artwork. */
export function sanitizeText(value) {
  return fixSentenceSpacing(
    normalizeProse(value)
      .replace(/\s*\|\s*Shellui\s*$/i, "")
      .replace(/\u2014/g, "-")
      .replace(/\u2013/g, "-"),
  )
    .replace(/\s+/g, " ")
    .trim();
}

/** True when `.` is part of a hostname/URL segment, not a sentence end. */
function isDomainDot(text, index) {
  const before = text.slice(Math.max(0, index - 32), index);
  const after = text.slice(index + 1);
  if (!/[a-z0-9-]$/i.test(before)) return false;
  if (/^[a-z][a-z0-9.-]*/i.test(after)) return true;
  return false;
}

export function splitSentences(text) {
  const value = sanitizeText(text);
  if (!value) return [];

  const sentences = [];
  let start = 0;

  for (let i = 0; i < value.length; i += 1) {
    const ch = value[i];
    if (!/[.!?]/.test(ch)) continue;
    if (ch === "." && isDomainDot(value, i)) continue;

    const rest = value.slice(i + 1);
    const sentenceEnd = /^\s+(?:[A-Z0-9"“‘(]|$)/.test(rest) || (ch !== "." && /^\s/.test(rest));
    if (!sentenceEnd) continue;

    let end = i + 1;
    while (end < value.length && /\s/.test(value[end])) end += 1;
    sentences.push(value.slice(start, end).trim());
    start = end;
    i = end - 1;
  }

  if (start < value.length) {
    sentences.push(value.slice(start).trim());
  }

  return sentences.filter(Boolean);
}

function repairTruncatedTail(text) {
  let value = text.trim();
  if (/\bshellui\.$/i.test(value)) {
    value = value.replace(/\bshellui\.$/i, "shellui.app");
  }
  if (/\.[a-z]{1,8}$/i.test(value) && !value.endsWith("\u2026")) {
    const lastSpace = value.lastIndexOf(" ");
    if (lastSpace > 0) {
      value = `${value.slice(0, lastSpace).trim()}\u2026`;
    }
  }
  return value;
}

export function truncateText(text, maxLen) {
  const value = sanitizeText(text);
  if (value.length <= maxLen) return value;
  const slice = value.slice(0, maxLen - 1);
  const lastSpace = slice.lastIndexOf(" ");
  const cut = lastSpace > maxLen * 0.6 ? slice.slice(0, lastSpace) : slice;
  return repairTruncatedTail(`${cut.trim()}\u2026`);
}

/** Prefer full sentences; otherwise break on a word with a single ellipsis character. */
export function truncateDescription(text, maxLen = 160) {
  const value = sanitizeText(text);
  if (!value) return "";
  if (value.length <= maxLen) return value;

  const sentences = splitSentences(value);
  if (sentences.length) {
    let built = "";
    for (const sentence of sentences) {
      const next = built ? `${built} ${sentence}` : sentence;
      if (next.length > maxLen) break;
      built = next;
    }
    if (built.length >= maxLen * 0.35) {
      return sanitizeText(built);
    }
  }

  const slice = value.slice(0, maxLen);
  const lastSpace = slice.lastIndexOf(" ");
  const cut = lastSpace > maxLen * 0.55 ? slice.slice(0, lastSpace) : slice.slice(0, maxLen - 1);
  return sanitizeText(repairTruncatedTail(`${cut.trim()}\u2026`));
}

/** Fail when a lowercase letter is glued to the next sentence without a space. */
export function hasGluedSentenceBoundary(text) {
  return /[a-z][.!?][A-Z]/.test(String(text ?? ""));
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
