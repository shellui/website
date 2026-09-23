/** @type {import("./types.js").LocaleBundle} */
export default {
  "nav": {
    "features": "Fonctionnalités",
    "developers": "Développeurs",
    "pricing": "Tarifs",
    "docs": "Docs",
    "blog": "Blog",
    "viewAllFeatures": "Toutes les fonctionnalités",
    "themeToggle": "Basculer le mode sombre",
    "themeDark": "Mode sombre",
    "themeLight": "Mode clair",
    "openMenu": "Ouvrir le menu principal",
    "closeMenu": "Fermer le menu principal",
    "mainMenu": "Menu principal",
    "language": "Langue",
    "featuresMenu": [
      {
        "href": "/features/apps-and-navigation/",
        "label": "Apps & Navigation",
        "description": "Bring your apps together with shared navigation and interface features.",
        "icon": "layout"
      },
      {
        "href": "/features/authentication/",
        "label": "Authentication",
        "description": "Share sign-in and manage access across your apps.",
        "icon": "lock"
      },
      {
        "href": "/features/administration/",
        "label": "Administration",
        "description": "Manage members, company settings, and internal tools.",
        "icon": "cog"
      },
      {
        "href": "/features/storage/",
        "label": "File Storage",
        "description": "Upload, browse, and share files with controlled access.",
        "icon": "storage"
      },
      {
        "href": "/features/web-and-desktop/",
        "label": "Web & Desktop",
        "description": "Build for the web, share a preview, or package a desktop app.",
        "icon": "ship"
      }
    ],
    "developersMenu": [
      {
        "href": "/architecture/",
        "label": "Architecture",
        "description": "How the Shellui stack fits together.",
        "icon": "cube"
      },
      {
        "href": "/roadmap/",
        "label": "Roadmap",
        "description": "Upcoming work and milestones.",
        "icon": "map"
      },
      {
        "href": "https://docs.shellui.com",
        "label": "Documentation",
        "description": "Guides, references, and API docs.",
        "icon": "book"
      },
      {
        "href": "/changelog/",
        "label": "Changelog",
        "description": "Every release and what changed.",
        "icon": "list"
      }
    ]
  },
  "footer": {
    "tagline": "La plateforme de développement d’apps web.",
    "features": "Fonctionnalités",
    "allFeatures": "Toutes les fonctionnalités",
    "developers": "Développeurs",
    "playground": "Playground",
    "product": "Produit",
    "hosting": "Hosting",
    "brandAssets": "Identité visuelle",
    "guidelines": "Guides",
    "company": "Entreprise",
    "about": "À propos",
    "contribute": "Contribuer",
    "contact": "Contact",
    "legal": "Mentions légales",
    "madeIn": "Conçu à Zurich, Suisse 🇨🇭 avec beaucoup de café ☕☕☕",
    "copyright": "© 2026 Shellui. Tous droits réservés.",
    "pricing": "Tarifs",
    "blog": "Blog"
  },
  "ui": {
    "skipToContent": "Aller au contenu principal",
    "home": "Accueil",
    "breadcrumbLabels": {
      "features": "Features",
      "blog": "Blog",
      "company": "Company",
      "apps-and-navigation": "Apps and navigation",
      "web-and-desktop": "Web and desktop",
      "architecture": "Architecture",
      "roadmap": "Roadmap",
      "changelog": "Changelog",
      "pricing": "Pricing",
      "guidelines": "Guidelines",
      "writing": "Writing",
      "web-design": "Web design",
      "design": "Design"
    },
    "guidelinesHub": {
      "overview": "Overview",
      "readTopic": "Read",
      "forAgents": "For agents"
    }
  },
  "siteDescription": "Shellui est la plateforme open source de développement d’apps web : un shell microfrontend avec authentification, administration, stockage et interface partagée.",
  "featurePages": [
    {
      "id": "apps-and-navigation",
      "href": "/features/apps-and-navigation/",
      "title": "Apps and navigation",
      "benefit": "Bring apps built with different frameworks into one interface. Share navigation, themes, and dialogs through the shell.",
      "points": [
        "Sidebar, sidebar inset, app bar, or floating layouts",
        "Shared theme and language settings",
        "Toasts, dialogs, modals, and drawers"
      ],
      "visual": "shell-layout",
      "cta": "Explore apps and navigation"
    },
    {
      "id": "authentication",
      "href": "/features/authentication/",
      "title": "Authentication",
      "benefit": "Give your apps a shared sign-in flow. The shell manages the session and makes it available through the SDK.",
      "points": [
        "Connect identity-service or Supabase Auth",
        "Sign in with supported account providers",
        "Control who can join your company"
      ],
      "visual": "auth",
      "cta": "Explore authentication"
    },
    {
      "id": "administration",
      "href": "/features/administration/",
      "title": "Administration",
      "benefit": "Manage accounts and company access from your app. Give staff and company owners a shared place to administer the product.",
      "points": [
        "Manage members and groups",
        "Review login events and access tokens",
        "Add your own administration tools"
      ],
      "visual": "admin",
      "cta": "Explore administration"
    },
    {
      "id": "storage",
      "href": "/features/storage/",
      "title": "File storage",
      "benefit": "Let your apps upload, browse, and share files through a common storage service. Control access and track usage in one place.",
      "points": [
        "File explorer and picker",
        "Permissions and expiring share links",
        "Company and per-user storage limits"
      ],
      "visual": "storage",
      "cta": "Explore file storage"
    },
    {
      "id": "web-and-desktop",
      "href": "/features/web-and-desktop/",
      "title": "Web and desktop",
      "benefit": "Build the shell as static web files, publish a preview, or package it as a desktop app with Tauri.",
      "points": [
        "Framework starters from the CLI",
        "Static files for your chosen web host",
        "Optional desktop builds with Tauri 2"
      ],
      "visual": "ship",
      "cta": "Explore deployment"
    }
  ],
  "guidelinesLayout": {
    "eyebrow": "Guidelines",
    "downloadMarkdown": "Download markdown",
    "brandAssets": "Brand assets",
    "forAgents": "For agents",
    "forAgentsBody": "Load the skill path below, then read the markdown file — not the HTML. Same source as this page.",
    "onThisPage": "On this page"
  },
  "includes": {
    "homeInit": {
      "title": "Scaffold your app. Shellui wraps it.",
      "lede": "Your frontend stays the product in the iframe. shellui init scaffolds a starter wired for theme and language. shellui start runs the shell around that app.",
      "pickStarter": "Pick a starter",
      "pickStarterHelp": "Choosing a chip updates only the shellui init line. Install the CLI globally first, as the docs recommend.",
      "startersLabel": "Framework starters",
      "installCli": "Install the CLI",
      "frameworkStarters": "Framework starters",
      "createProject": "Create a project",
      "emptyHelp": "For another stack, run shellui init empty and point Home at your own iframe app."
    },
    "playgroundCta": {
      "title": "Try Shellui in the playground",
      "body": "Explore a live Shellui app with no install and no scaffolding.",
      "cta": "Open playground"
    }
  }
};
