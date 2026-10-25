import { sanitizeText, truncateText, truncateDescription, formatBlogDate } from "./text.mjs";

const SECTION_LABELS = {
  features: "Features",
  guidelines: "Guidelines",
  company: "Company",
  blog: "Blog",
  architecture: "Architecture",
  changelog: "Changelog",
  pricing: "Pricing",
  roadmap: "Roadmap",
  newsletter: "Newsletter",
  "brand-assets": "Brand assets",
};

const FEATURE_LABELS = {
  administration: "Administration",
  "apps-and-navigation": "Apps and navigation",
  authentication: "Authentication",
  email: "Email",
  storage: "Storage",
  "web-and-desktop": "Web and desktop",
};

function pageUrl(data) {
  return data.page?.url || data.url || "";
}

export function ogSlugFromUrl(url) {
  const raw = String(url || "/");
  if (raw === "/404.html") return "404";
  const path = raw.replace(/^\/|\/$/g, "");
  if (!path) return "index";
  return path.replace(/\//g, "-");
}

export function ogImagePathFromUrl(url) {
  return `/og/${ogSlugFromUrl(url)}.png`;
}

function displayTitle(data) {
  if (data.ogTitle) return sanitizeText(data.ogTitle);
  if (data.title) return sanitizeText(data.title);
  if (data.heading) return sanitizeText(data.heading);
  return sanitizeText(data.site?.name || "Shellui");
}

function displayDescription(data) {
  const raw = data.ogDescription || data.lede || data.description || data.site?.description || "";
  return truncateDescription(raw, 160);
}

function resolveTemplate(url, data) {
  if (data.ogTemplate) return data.ogTemplate;
  if (data.tags?.includes("blog")) {
    return url === "/blog/" ? "default" : "blog";
  }
  if (url === "/changelog/") return "changelog";
  if (url.startsWith("/features/") || url.startsWith("/guidelines/") || url === "/architecture/") {
    return "docs";
  }
  return "default";
}

function docsHeaderLabel(url) {
  if (url.startsWith("/features/")) return "Features";
  if (url.startsWith("/guidelines/")) return "Guidelines";
  if (url === "/architecture/") return "Architecture";
  return "Docs";
}

function docsCategory(url) {
  const segments = url.replace(/^\/|\/$/g, "").split("/").filter(Boolean);
  if (segments.length < 2) {
    return SECTION_LABELS[segments[0]] || segments[0] || "";
  }
  const section = segments[0];
  const leaf = segments[segments.length - 1];
  const sectionName = SECTION_LABELS[section] || section;
  const leafName =
    FEATURE_LABELS[leaf] ||
    leaf
      .split("-")
      .map((part) => part.charAt(0).toUpperCase() + part.slice(1))
      .join(" ");
  return `${sectionName} / ${leafName}`;
}

function changelogPayload(data) {
  const latest = data.changelog?.[0];
  if (!latest) {
    return {
      version: null,
      date: null,
      tags: [],
    };
  }
  const tags = [];
  for (const section of latest.sections || []) {
    for (const item of section.items || []) {
      if (tags.length >= 4) break;
      const plain = String(item)
        .replace(/\*\*/g, "")
        .replace(/<[^>]+>/g, "")
        .replace(/\[[^\]]+\]\([^)]+\)/g, "")
        .trim();
      const short = plain.split(/[:.]/)[0]?.trim();
      if (!short || short.length > 42) continue;
      const key = short.toLowerCase();
      if (tags.some((t) => t.toLowerCase() === key)) continue;
      tags.push(short);
    }
    if (tags.length >= 4) break;
  }
  return {
    version: latest.version,
    date: latest.date,
    tags: tags.length >= 2 ? tags : [],
  };
}

/** Returns metadata for OG PNG generation and head tags. */
export function resolveOgMeta(data) {
  const url = pageUrl(data);
  const origin = String(data.site?.url || "https://shellui.com").replace(/\/$/, "");
  const template = resolveTemplate(url, data);
  const title = displayTitle(data);
  const description = displayDescription(data);
  const path = ogImagePathFromUrl(url);

  const meta = {
    url,
    origin,
    template,
    title,
    description,
    path,
    headerText: "shellui.com",
    eyebrow: data.eyebrow ? sanitizeText(data.eyebrow) : null,
    sectionLabel: null,
    category: null,
    footerUrl: "shellui.com",
    badge: null,
    blogMeta: null,
    changelog: null,
    useCustomImage: Boolean(data.ogImage && !String(data.ogImage).startsWith("/og/")),
    absoluteImage: null,
    alt: `${title}. ${description}`.slice(0, 200),
  };

  if (data.ogImage) {
    meta.absoluteImage = /^https?:\/\//i.test(data.ogImage)
      ? data.ogImage
      : `${origin}${data.ogImage.startsWith("/") ? data.ogImage : `/${data.ogImage}`}`;
    return meta;
  }

  meta.absoluteImage = `${origin}${path}`;

  if (url === "/") {
    meta.badge = "MIT licensed";
    meta.footerUrl = "shellui.com";
  }

  if (template === "docs") {
    meta.sectionLabel = docsHeaderLabel(url);
    meta.headerText = meta.sectionLabel;
    meta.category = docsCategory(url);
    meta.footerUrl = "shellui.com";
  }

  if (template === "blog") {
    meta.headerText = "Blog";
    meta.sectionLabel = "Blog";
    meta.blogMeta = {
      author: sanitizeText(data.author || data.site?.author || "Shellui"),
      date: formatBlogDate(data.date),
      category: sanitizeText(data.category || "Blog"),
    };
  }

  if (template === "changelog") {
    meta.headerText = "Changelog";
    meta.sectionLabel = "Changelog";
    meta.changelog = changelogPayload(data);
    meta.footerUrl = "shellui.com/changelog";
    const latest = data.changelog?.[0];
    if (data.ogTitle) {
      meta.title = sanitizeText(data.ogTitle);
    } else if (latest?.version) {
      meta.title = `Shellui v${latest.version}`;
    } else {
      meta.title = sanitizeText(data.title || title);
    }
    const summaryRaw =
      data.ogDescription ||
      data.lede ||
      data.description ||
      (latest?.summary && !String(latest.summary).includes(":") ? latest.summary : "") ||
      "";
    meta.description = truncateDescription(summaryRaw, 160);
  }

  if (template === "default" && url === "/blog/") {
    meta.headerText = "Blog";
    meta.sectionLabel = "Blog";
  }

  meta.alt = `${meta.title}. ${meta.description}`.slice(0, 200);
  return meta;
}

const SKIP_OG_URLS = new Set([
  "/features/chrome/",
  "/features/microfrontend/",
  "/features/ship/",
  "/product/brand-assets/",
]);

export function shouldGenerateOgForTemplate(template, layoutFromFile) {
  const data = template.data || {};
  const layout = data.layout !== undefined ? data.layout : layoutFromFile;
  if (layout === false) return false;
  const url = template.url;
  if (!url) return false;
  if (SKIP_OG_URLS.has(url)) return false;
  if (/\.(xml|txt)$/.test(url)) return false;
  if (data.ogImage && !String(data.ogImage).startsWith("/og/")) return false;
  return true;
}
