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
  breadcrumbs(data) {
    if (data.hideBreadcrumbs) return [];
    const pageUrl = data.page?.url;
    if (!pageUrl || pageUrl === "/") return [];

    const origin = String(data.site?.url || "https://shellui.com").replace(
      /\/$/,
      "",
    );
    const segments = pageUrl.replace(/^\/|\/$/g, "").split("/").filter(Boolean);
    if (!segments.length) return [];

    const sectionLabels = {
      features: "Features",
      blog: "Blog",
      company: "Company",
      architecture: "Architecture",
      roadmap: "Roadmap",
      changelog: "Changelog",
      pricing: "Pricing",
    };

    const pageLabel = String(data.title || data.heading || "")
      .replace(/\s*\|\s*Shellui\s*$/i, "")
      .trim();

    const crumbs = [{ name: "Home", path: "/", url: `${origin}/` }];
    let path = "";
    segments.forEach((segment, index) => {
      path += `/${segment}`;
      const isLast = index === segments.length - 1;
      const name = isLast
        ? pageLabel || sectionLabels[segment] || segment
        : sectionLabels[segment] || segment;
      crumbs.push({
        name,
        path: `${path}/`,
        url: `${origin}${path}/`,
      });
    });
    return crumbs;
  },
};
