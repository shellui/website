export default [
  {
    id: "microfrontend",
    href: "/features/microfrontend/",
    title: "Microfrontend host",
    benefit:
      "Your app runs in an iframe. Load @shellui/sdk, call init, and talk over postMessage.",
    points: [
      "Sidebar, app bar, floating, fullscreen, or windows",
      "Toasts, dialogs, drawers, and theme from the host",
      "One shellui.config.json",
    ],
    visual: "shell-layout",
    iconLabel: "Microfrontend icon",
    cta: "Explore microfrontend",
  },
  {
    id: "authentication",
    href: "/features/authentication/",
    title: "Authentication",
    benefit:
      "Sign-in lives in the shell. identity-service (or Supabase Auth) issues tokens the iframe never has to mint.",
    points: [
      "OAuth with GitHub, Google, or Microsoft",
      "JWT sessions and JWKS verification",
      "Public, domain, or invitation-only join",
    ],
    visual: "auth",
    iconLabel: "Authentication icon",
    cta: "Explore authentication",
  },
  {
    id: "administration",
    href: "/features/administration/",
    title: "Administration",
    benefit:
      "Staff and company owners open /admin in the shell. Inject your own sidebar apps from config.",
    points: [
      "Users, organization, and join modes",
      "Groups, logs, tokens, and OAuth clients",
      "Custom admin navigation",
    ],
    visual: "admin",
    iconLabel: "Administration icon",
    cta: "Explore administration",
  },
  {
    id: "storage",
    href: "/features/storage/",
    title: "Storage",
    benefit:
      "A company bucket behind the shell. Apps upload and share through shellui.storage.",
    points: [
      "Access grants for users, groups, or the company",
      "Share links with expiry and download caps",
      "Company and per-user quotas",
    ],
    visual: "storage",
    iconLabel: "Storage icon",
    cta: "Explore storage",
  },
  {
    id: "chrome",
    href: "/features/chrome/",
    title: "Host chrome",
    benefit:
      "Theme, language, and floating actions stay in the host. The iframe declares intent; the shell renders chrome.",
    points: [
      "Curated OKLCH themes, including Shellui gold",
      "English and French chrome strings",
      "Back, title, trailing, and primary FAB via the SDK",
    ],
    visual: "chrome",
    iconLabel: "Host chrome icon",
    cta: "Explore host chrome",
  },
  {
    id: "desktop",
    href: "/features/ship/",
    title: "Ship the project",
    benefit:
      "The same config builds static files, an optional shellui.app preview, or a Tauri desktop wrapper.",
    points: [
      "shellui init, start, build, login, deploy",
      "Output under dist/web/ and dist/app/",
      "Optional native desktop with Tauri 2",
    ],
    visual: "ship",
    iconLabel: "Ship icon",
    cta: "Explore how you ship",
  },
];
