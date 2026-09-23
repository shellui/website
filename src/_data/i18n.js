/** @typedef {{ code: string; prefix: string; label: string; nativeLabel: string; ogLocale: string; hreflang: string }} Locale */

/** @type {Locale[]} */
export const LOCALES = [
  {
    code: "en",
    prefix: "",
    label: "English",
    nativeLabel: "English",
    ogLocale: "en_US",
    hreflang: "en",
  },
  {
    code: "fr",
    prefix: "/fr",
    label: "French",
    nativeLabel: "Français",
    ogLocale: "fr_FR",
    hreflang: "fr",
  },
  {
    code: "de",
    prefix: "/de",
    label: "German",
    nativeLabel: "Deutsch",
    ogLocale: "de_DE",
    hreflang: "de",
  },
  {
    code: "it",
    prefix: "/it",
    label: "Italian",
    nativeLabel: "Italiano",
    ogLocale: "it_IT",
    hreflang: "it",
  },
];

export const DEFAULT_LOCALE = "en";

const LOCALE_PREFIX_RE = /^\/(fr|de|it)(?=\/|$)/;

/** @param {string} localeCode */
export function getLocale(localeCode) {
  return LOCALES.find((item) => item.code === localeCode) ?? LOCALES[0];
}

/** @param {string} pageUrl */
export function englishPathFromUrl(pageUrl) {
  const url = pageUrl || "/";
  const stripped = url.replace(LOCALE_PREFIX_RE, "") || "/";
  if (stripped === "/") return "/";
  return stripped.endsWith("/") ? stripped : `${stripped}/`;
}

/** @param {string} localeCode @param {string} englishPath */
export function localizedPath(localeCode, englishPath) {
  const base = englishPathFromUrl(englishPath);
  if (base.endsWith(".md")) {
    if (localeCode === DEFAULT_LOCALE) return base;
    return `${getLocale(localeCode).prefix}${base}`;
  }
  if (localeCode === DEFAULT_LOCALE) return base;
  const locale = getLocale(localeCode);
  if (base === "/") return `${locale.prefix}/`;
  const suffix = base.replace(/^\//, "").replace(/\/$/, "");
  return `${locale.prefix}/${suffix}/`;
}

/** @param {string} pageUrl @param {string} lang */
export function translationKeyFromUrl(pageUrl, lang) {
  const enPath = englishPathFromUrl(pageUrl);
  if (enPath === "/") return "home";
  return enPath.replace(/^\/|\/$/g, "");
}

/** @param {string} origin @param {string} englishPath */
export function alternateLanguageLinks(origin, englishPath) {
  const base = String(origin || "").replace(/\/$/, "");
  const links = LOCALES.map((locale) => {
    const path = localizedPath(locale.code, englishPath);
    return { hreflang: locale.hreflang, path, url: `${base}${path}` };
  });
  const defaultPath = englishPathFromUrl(englishPath);
  links.push({
    hreflang: "x-default",
    path: defaultPath,
    url: `${base}${defaultPath}`,
  });
  return links;
}

/** @param {string} href @param {string} lang */
export function localizeHref(href, lang) {
  const value = String(href || "");
  if (!value || value.startsWith("#")) return value;
  if (/^https?:\/\//i.test(value)) return value;
  if (lang === DEFAULT_LOCALE) return value;
  const locale = getLocale(lang);
  if (value === "/") return `${locale.prefix}/`;
  if (!value.startsWith("/")) return value;
  return `${locale.prefix}${value.endsWith("/") ? value : `${value}/`}`;
}

export default {
  locales: LOCALES,
  defaultLocale: DEFAULT_LOCALE,
  englishPathFromUrl,
  localizedPath,
  translationKeyFromUrl,
  alternateLanguageLinks,
  localizeHref,
  getLocale,
};
