export default [
  {
    id: "microfrontend",
    href: "/features/microfrontend/",
    title: "Microfrontend host",
    benefit:
      "Do not rebuild navigation and overlays for every frontend. Host the app in an iframe and talk over postMessage with @shellui/sdk.",
    points: [
      "Sidebar, app bar, floating, fullscreen, or windows",
      "Toasts, dialogs, drawers, and theme from the host",
      "One shellui.config.json",
    ],
    visual: "shell-layout",
    cta: "Explore microfrontend",
  },
  {
    id: "authentication",
    href: "/features/authentication/",
    title: "Authentication",
    benefit:
      "Do not ship a login page in the iframe. The shell owns /login; identity-service or Supabase Auth issues the tokens.",
    points: [
      "OAuth with GitHub, Google, or Microsoft",
      "JWT sessions and JWKS verification",
      "Public, domain, or invitation-only join",
    ],
    visual: "auth",
    cta: "Explore authentication",
  },
  {
    id: "administration",
    href: "/features/administration/",
    title: "Administration",
    benefit:
      "Do not run a second admin login. Staff and owners open /admin in the shell and inject sidebar apps from config.",
    points: [
      "Users, organization, and join modes",
      "Groups, logs, tokens, and OAuth clients",
      "Custom admin navigation",
    ],
    visual: "admin",
    cta: "Explore administration",
  },
  {
    id: "storage",
    href: "/features/storage/",
    title: "Storage",
    benefit:
      "Do not build a file browser in the iframe. Apps upload and share through shellui.storage against a company bucket.",
    points: [
      "Access grants for users, groups, or the company",
      "Share links with expiry and download caps",
      "Company and per-user quotas",
    ],
    visual: "storage",
    cta: "Explore storage",
  },
  {
    id: "chrome",
    href: "/features/chrome/",
    title: "Host chrome",
    benefit:
      "Do not rebuild theme pickers, locale switchers, or floating actions. The iframe declares intent; the shell renders them.",
    points: [
      "Curated OKLCH themes, including Shellui gold",
      "English and French chrome strings",
      "Back, title, trailing, and primary floating action via the SDK",
    ],
    visual: "chrome",
    cta: "Explore host chrome",
  },
  {
    id: "desktop",
    href: "/features/ship/",
    title: "Ship the project",
    benefit:
      "Do not maintain a separate desktop or hosting stack. One config builds static files, an optional shellui.app preview, or a Tauri wrapper.",
    points: [
      "shellui init, start, build, login, deploy",
      "Output under dist/web/ and dist/app/",
      "Optional native desktop with Tauri 2",
    ],
    visual: "ship",
    cta: "Explore how you ship",
  },
];
