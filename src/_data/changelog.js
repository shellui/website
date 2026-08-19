const CHANGELOG_URL =
  "https://raw.githubusercontent.com/shellui/shellui/refs/heads/main/CHANGELOG.md";

const GITHUB_REPO = "shellui/shellui";

function linkTickets(text) {
  return text.replace(
    /\(#(\d+)\)/g,
    `(<a href="https://github.com/${GITHUB_REPO}/issues/$1">#$1</a>)`,
  );
}

function parseChangelog(md) {
  const releases = [];
  let current = null;
  let currentSection = null;

  for (const raw of md.split("\n")) {
    const line = raw.trimEnd();

    const releaseMatch = line.match(
      /^## \[([^\]]+)\](?:\s*-\s*(\d{4}-\d{2}-\d{2}))?/,
    );
    if (releaseMatch) {
      current = {
        version: releaseMatch[1],
        date: releaseMatch[2] || null,
        sections: [],
      };
      releases.push(current);
      currentSection = null;
      continue;
    }

    const sectionMatch = line.match(/^### (.+)/);
    if (sectionMatch && current) {
      const raw = sectionMatch[1].trim();
      const emoji = raw.match(/^[\p{Emoji_Presentation}\p{Extended_Pictographic}]+/u)?.[0] || "";
      const text = raw.replace(emoji, "").trim().toLowerCase().replace(/(?:^|\s)\S/g, (c) => c.toUpperCase());
      const heading = emoji ? `${emoji} ${text}` : text;
      currentSection = { heading, items: [] };
      current.sections.push(currentSection);
      continue;
    }

    if (currentSection && /^- /.test(line)) {
      currentSection.items.push(linkTickets(line.replace(/^- /, "").trim()));
    }
  }

  return releases.filter((r) => r.version !== "Unreleased");
}

export default async function () {
  try {
    const res = await fetch(CHANGELOG_URL);
    if (!res.ok) throw new Error(`HTTP ${res.status}`);
    const md = await res.text();
    return parseChangelog(md);
  } catch (err) {
    console.warn(`[changelog] Could not fetch changelog: ${err.message}`);
    return [];
  }
}
