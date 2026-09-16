export default [
  {
    id: "microfrontend",
    href: "/features/microfrontend/",
    title: "Apps and navigation",
    benefit: "Bring apps built with different frameworks into one interface. Share navigation, themes, and dialogs through the shell.",
    points: [
      "Sidebar, app bar, or fullscreen layouts",
      "Shared theme and language settings",
      "Toasts, dialogs, modals, and drawers"
    ],
    visual: "shell-layout",
    cta: "Explore apps and navigation"
  },
  {
    id: "authentication",
    href: "/features/authentication/",
    title: "Authentication",
    benefit: "Give your apps a shared sign-in flow. The shell manages the session and makes it available through the SDK.",
    points: [
      "Connect identity-service or Supabase Auth",
      "Sign in with supported account providers",
      "Control who can join your company"
    ],
    visual: "auth",
    cta: "Explore authentication"
  },
  {
    id: "administration",
    href: "/features/administration/",
    title: "Administration",
    benefit: "Manage accounts and company access from your app. Give staff and company owners a shared place to administer the product.",
    points: [
      "Manage members and groups",
      "Review login events and access tokens",
      "Add your own administration tools"
    ],
    visual: "admin",
    cta: "Explore administration"
  },
  {
    id: "storage",
    href: "/features/storage/",
    title: "File storage",
    benefit: "Let your apps upload, browse, and share files through a common storage service. Control access and track usage in one place.",
    points: [
      "File explorer and picker",
      "Permissions and expiring share links",
      "Company and per-user storage limits"
    ],
    visual: "storage",
    cta: "Explore file storage"
  },
  {
    id: "desktop",
    href: "/features/ship/",
    title: "Web and desktop",
    benefit: "Build the shell as static web files, publish a preview, or package it as a desktop app with Tauri.",
    points: [
      "Framework starters from the CLI",
      "Static files for your chosen web host",
      "Optional desktop builds with Tauri 2"
    ],
    visual: "ship",
    cta: "Explore deployment"
  }
];
