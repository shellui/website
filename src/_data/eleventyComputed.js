import { loadGuidelines } from "./guidelines.js";
import {
  alternateLanguageLinks,
  englishPathFromUrl,
  getLocale,
  localizedPath,
  localizeHref,
  translationKeyFromUrl,
} from "./i18n.js";
import getLocaleBundle from "./translations/index.js";

export default {
  productVersion(data) {
    const full = data.changelog?.[0]?.version ?? null;
    if (!full) return null;
    const match = String(full).match(/^(\d+)\.(\d+)/);
    return match ? `${match[1]}.${match[2]}` : full;
  },
  lang(data) {
    if (data.lang) return data.lang;
    const input = String(data.page?.inputPath || "");
    if (input.includes("/src/fr/")) return "fr";
    if (input.includes("/src/de/")) return "de";
    if (input.includes("/src/it/")) return "it";
    return "en";
  },
  localeBundle(data) {
    return getLocaleBundle(data.lang || "en");
  },
  includes(data) {
    return getLocaleBundle(data.lang || "en").includes;
  },
  nav(data) {
    const bundle = getLocaleBundle(data.lang || "en");
    const lang = data.lang || "en";
    return {
      features: bundle.nav.featuresMenu.map((item) => ({
        ...item,
        href: localizeHref(item.href, lang),
      })),
      developers: bundle.nav.developersMenu.map((item) => ({
        ...item,
        href: localizeHref(item.href, lang),
      })),
      labels: bundle.nav,
    };
  },
  footerCopy(data) {
    return getLocaleBundle(data.lang || "en").footer;
  },
  ui(data) {
    return getLocaleBundle(data.lang || "en").ui;
  },
  guidelinesLayout(data) {
    return getLocaleBundle(data.lang || "en").guidelinesLayout;
  },
  guidelines(data) {
    return loadGuidelines(data.lang || "en");
  },
  featurePages(data) {
    const lang = data.lang || "en";
    return getLocaleBundle(lang).featurePages.map((item) => ({
      ...item,
      href: localizeHref(item.href, lang),
    }));
  },
  englishPath(data) {
    return englishPathFromUrl(data.page?.url || "/");
  },
  translationKey(data) {
    if (data.translationKey) return data.translationKey;
    return translationKeyFromUrl(data.page?.url || "/", data.lang || "en");
  },
  alternateLanguages(data) {
    const origin = String(data.site?.url || "https://shellui.com").replace(
      /\/$/,
      "",
    );
    return alternateLanguageLinks(origin, englishPathFromUrl(data.page?.url || "/"));
  },
  ogLocale(data) {
    return getLocale(data.lang || "en").ogLocale;
  },
  htmlLang(data) {
    return getLocale(data.lang || "en").hreflang;
  },
  homeUrl(data) {
    return localizedPath(data.lang || "en", "/");
  },
  permalink(data) {
    if (data.permalink === false) return false;
    if (typeof data.permalink === "string") return data.permalink;
    const stem = data.page?.filePathStem;
    if (!stem) return undefined;
    const pathPart = stem.replace(/\/index$/, "") || "/index";
    if (pathPart === "/index") return "/";
    return `${pathPart}/`;
  },
  canonical(data) {
    if (data.canonical) return data.canonical;
    const origin = String(data.site?.url || "https://shellui.com").replace(
      /\/$/,
      "",
    );
    return `${origin}${data.page.url}`;
  },
  metaTitle(data) {
    return data.title || data.site?.name || "Shellui";
  },
  metaDescription(data) {
    if (data.description) return data.description;
    return getLocaleBundle(data.lang || "en").siteDescription || data.site?.description || "";
  },
  ogImage(data) {
    if (data.ogImage) return data.ogImage;
    if (!data.image) return data.ogImage;
    const origin = String(data.site?.url || "https://shellui.com").replace(
      /\/$/,
      "",
    );
    return data.image.startsWith("http")
      ? data.image
      : `${origin}${data.image}`;
  },
  breadcrumbs(data) {
    if (data.hideBreadcrumbs) return [];
    const pageUrl = data.page?.url;
    if (!pageUrl || pageUrl === "/") return [];

    const lang = data.lang || "en";
    const bundle = getLocaleBundle(lang);
    const sectionLabels = bundle.ui.breadcrumbLabels;
    const origin = String(data.site?.url || "https://shellui.com").replace(
      /\/$/,
      "",
    );
    let segments = pageUrl.replace(/^\/|\/$/g, "").split("/").filter(Boolean);
    if (lang !== "en" && segments[0] === lang) segments = segments.slice(1);
    if (!segments.length) return [];

    const pageLabel = String(data.title || data.heading || "")
      .replace(/\s*\|\s*Shellui\s*$/i, "")
      .trim();

    const homePath = localizedPath(lang, "/");
    const crumbs = [
      { name: bundle.ui.home, path: homePath, url: `${origin}${homePath}` },
    ];
    let path = lang === "en" ? "" : `/${lang}`;
    segments.forEach((segment, index) => {
      path += `/${segment}`;
      const isLast = index === segments.length - 1;
      const name = isLast
        ? pageLabel || sectionLabels[segment] || segment
        : sectionLabels[segment] || segment;
      crumbs.push({ name, path: `${path}/`, url: `${origin}${path}/` });
    });
    return crumbs;
  },
};
