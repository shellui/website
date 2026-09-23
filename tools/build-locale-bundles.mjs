import fs from "node:fs";
import path from "node:path";
import { fileURLToPath } from "node:url";

const root = path.dirname(fileURLToPath(import.meta.url));
const dataDir = path.join(root, "../src/_data");
const nav = JSON.parse(fs.readFileSync(path.join(dataDir, "nav.json"), "utf8"));
const featurePages = (
  await import(path.join(dataDir, "featurePages.js"))
).default;

const sharedFooter = {
  tagline: "The web app development platform.",
  features: "Features",
  allFeatures: "All features",
  developers: "Developers",
  playground: "Playground",
  product: "Product",
  hosting: "Hosting",
  brandAssets: "Brand assets",
  guidelines: "Guidelines",
  company: "Company",
  about: "About",
  contribute: "Contribute",
  contact: "Contact Us",
  legal: "Legal Notice",
  madeIn: "Made in Zurich, Switzerland 🇨🇭 with lots of coffee ☕☕☕",
  copyright: "© 2026 Shellui. All rights reserved.",
  pricing: "Pricing",
  blog: "Blog",
};

const bundles = {
  en: {
    nav: {
      features: "Features",
      developers: "Developers",
      pricing: "Pricing",
      docs: "Docs",
      blog: "Blog",
      viewAllFeatures: "View all features",
      themeToggle: "Toggle dark mode",
      themeDark: "Dark mode",
      themeLight: "Light mode",
      openMenu: "Open main menu",
      closeMenu: "Close main menu",
      mainMenu: "Main menu",
      language: "Language",
      featuresMenu: nav.features,
      developersMenu: nav.developers,
    },
    footer: sharedFooter,
    ui: {
      skipToContent: "Skip to main content",
      home: "Home",
      breadcrumbLabels: {
        features: "Features",
        blog: "Blog",
        company: "Company",
        "apps-and-navigation": "Apps and navigation",
        "web-and-desktop": "Web and desktop",
        architecture: "Architecture",
        roadmap: "Roadmap",
        changelog: "Changelog",
        pricing: "Pricing",
        guidelines: "Guidelines",
        writing: "Writing",
        "web-design": "Web design",
        design: "Design",
      },
      guidelinesHub: {
        overview: "Overview",
        readTopic: "Read",
        forAgents: "For agents",
      },
    },
    siteDescription:
      "Shellui is the open-source web app development platform: a microfrontend shell with authentication, administration, storage, and shared UI.",
    featurePages,
    guidelinesLayout: {
      eyebrow: "Guidelines",
      downloadMarkdown: "Download markdown",
      brandAssets: "Brand assets",
      forAgents: "For agents",
      forAgentsBody:
        "Load the skill path below, then read the markdown file — not the HTML. Same source as this page.",
      onThisPage: "On this page",
    },
    includes: {
      homeInit: {
        title: "Scaffold your app. Shellui wraps it.",
        lede:
          "Your frontend stays the product in the iframe. shellui init scaffolds a starter wired for theme and language. shellui start runs the shell around that app.",
        pickStarter: "Pick a starter",
        pickStarterHelp:
          "Choosing a chip updates only the shellui init line. Install the CLI globally first, as the docs recommend.",
        startersLabel: "Framework starters",
        installCli: "Install the CLI",
        frameworkStarters: "Framework starters",
        createProject: "Create a project",
        emptyHelp:
          "For another stack, run shellui init empty and point Home at your own iframe app.",
      },
      playgroundCta: {
        title: "Try Shellui in the playground",
        body: "Explore a live Shellui app with no install and no scaffolding.",
        cta: "Open playground",
      },
    },
  },
};

// Hand-maintained translations (nav labels + chrome); page bodies live in locale trees.
Object.assign(bundles, {
  fr: JSON.parse(JSON.stringify(bundles.en)),
  de: JSON.parse(JSON.stringify(bundles.en)),
  it: JSON.parse(JSON.stringify(bundles.en)),
});

// FR
Object.assign(bundles.fr.nav, {
  features: "Fonctionnalités",
  developers: "Développeurs",
  pricing: "Tarifs",
  viewAllFeatures: "Toutes les fonctionnalités",
  themeToggle: "Basculer le mode sombre",
  themeDark: "Mode sombre",
  themeLight: "Mode clair",
  openMenu: "Ouvrir le menu principal",
  closeMenu: "Fermer le menu principal",
  mainMenu: "Menu principal",
  language: "Langue",
});
bundles.fr.footer = {
  ...bundles.fr.footer,
  tagline: "La plateforme de développement d’apps web.",
  features: "Fonctionnalités",
  allFeatures: "Toutes les fonctionnalités",
  developers: "Développeurs",
  product: "Produit",
  brandAssets: "Identité visuelle",
  guidelines: "Guides",
  company: "Entreprise",
  about: "À propos",
  contribute: "Contribuer",
  contact: "Contact",
  legal: "Mentions légales",
  madeIn: "Conçu à Zurich, Suisse 🇨🇭 avec beaucoup de café ☕☕☕",
  copyright: "© 2026 Shellui. Tous droits réservés.",
  pricing: "Tarifs",
};
bundles.fr.ui.home = "Accueil";
bundles.fr.ui.skipToContent = "Aller au contenu principal";
bundles.fr.siteDescription =
  "Shellui est la plateforme open source de développement d’apps web : un shell microfrontend avec authentification, administration, stockage et interface partagée.";

// DE
Object.assign(bundles.de.nav, {
  features: "Funktionen",
  developers: "Entwickler",
  pricing: "Preise",
  viewAllFeatures: "Alle Funktionen",
  themeToggle: "Dunkelmodus umschalten",
  themeDark: "Dunkelmodus",
  themeLight: "Hellmodus",
  openMenu: "Hauptmenü öffnen",
  closeMenu: "Hauptmenü schließen",
  mainMenu: "Hauptmenü",
  language: "Sprache",
});
bundles.de.footer.tagline = "Die Web-App-Entwicklungsplattform.";
bundles.de.ui.home = "Start";
bundles.de.ui.skipToContent = "Zum Hauptinhalt springen";

// IT
Object.assign(bundles.it.nav, {
  features: "Funzionalità",
  developers: "Sviluppatori",
  pricing: "Prezzi",
  viewAllFeatures: "Tutte le funzionalità",
  themeToggle: "Attiva o disattiva modalità scura",
  themeDark: "Modalità scura",
  themeLight: "Modalità chiara",
  openMenu: "Apri menu principale",
  closeMenu: "Chiudi menu principale",
  mainMenu: "Menu principale",
  language: "Lingua",
});
bundles.it.footer.tagline = "La piattaforma di sviluppo di app web.";
bundles.it.ui.home = "Home";
bundles.it.ui.skipToContent = "Vai al contenuto principale";

for (const [code, bundle] of Object.entries(bundles)) {
  const out = `/** @type {import("./types.js").LocaleBundle} */\nexport default ${JSON.stringify(bundle, null, 2)};\n`;
  fs.writeFileSync(path.join(dataDir, "translations", `${code}.js`), out);
}

console.log("Wrote locale bundles en, fr, de, it");
