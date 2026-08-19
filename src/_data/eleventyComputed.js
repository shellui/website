export default {
  permalink(data) {
    if (typeof data.permalink === "string" || data.permalink === false) {
      return data.permalink;
    }
    const stem = data.page?.filePathStem;
    if (!stem) return data.permalink;
    const path = stem.replace(/\/index$/, "") || "/index";
    if (path === "/index") return "/";
    return `${path}/`;
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
    return data.description || data.site?.description || "";
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
};
