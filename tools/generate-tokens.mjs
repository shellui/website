#!/usr/bin/env node
/**
 * Generate CSS variables, designTokens.js, token downloads, and markdown token tables
 * from tokens/tokens.json. Run before build (npm run generate:tokens).
 */
import fs from "node:fs";
import path from "node:path";
import { fileURLToPath } from "node:url";

const root = path.join(path.dirname(fileURLToPath(import.meta.url)), "..");
const tokenPath = path.join(root, "tokens/tokens.json");
const raw = JSON.parse(fs.readFileSync(tokenPath, "utf8"));

function hex(value) {
  return String(value).toLowerCase();
}

const goldBrand = hex(raw.gold.brand.$value);
const goldText = hex(raw.gold.text.$value);
const goldTextDark = hex(raw.gold.textDark.$value);
const goldOn = hex(raw.gold.on.$value);

const cssColors = {
  primary: { light: goldBrand, dark: goldTextDark },
  "primary-foreground": { light: goldOn, dark: goldOn },
  "primary-ink": { light: goldText, dark: goldTextDark },
  background: { light: hex(raw.canvas.background.$value), dark: hex(raw.canvas.background.dark) },
  foreground: { light: hex(raw.canvas.foreground.$value), dark: hex(raw.canvas.foreground.dark) },
  muted: { light: hex(raw.canvas.muted.$value), dark: raw.canvas.muted.dark },
  "muted-foreground": {
    light: hex(raw.canvas.mutedForeground.$value),
    dark: hex(raw.canvas.mutedForeground.dark),
  },
  border: { light: hex(raw.structure.border.$value), dark: hex(raw.structure.border.dark) },
  card: { light: hex(raw.structure.card.$value), dark: hex(raw.structure.card.dark) },
  "card-foreground": {
    light: hex(raw.structure.cardForeground.$value),
    dark: hex(raw.structure.cardForeground.dark),
  },
  popover: { light: hex(raw.semantic.popover.$value), dark: hex(raw.semantic.popover.dark) },
  "popover-foreground": {
    light: hex(raw.semantic.popoverForeground.$value),
    dark: hex(raw.semantic.popoverForeground.dark),
  },
  secondary: { light: hex(raw.semantic.secondary.$value), dark: hex(raw.semantic.secondary.dark) },
  "secondary-foreground": {
    light: hex(raw.semantic.secondaryForeground.$value),
    dark: hex(raw.semantic.secondaryForeground.dark),
  },
  accent: { light: hex(raw.semantic.accent.$value), dark: raw.semantic.accent.dark },
  "accent-foreground": {
    light: hex(raw.semantic.accentForeground.$value),
    dark: hex(raw.semantic.accentForeground.dark),
  },
  destructive: { light: hex(raw.semantic.destructive.$value), dark: hex(raw.semantic.destructive.$value) },
  input: { light: hex(raw.semantic.input.$value), dark: hex(raw.semantic.input.dark) },
  ring: { light: hex(raw.structure.ring.$value), dark: hex(raw.structure.ring.dark) },
};

const colors = [
  {
    token: "primary",
    role: "Accent / buttons",
    light: cssColors.primary.light,
    dark: cssColors.primary.dark,
    group: "accent",
  },
  {
    token: "primary-foreground",
    role: "Text on gold",
    light: cssColors["primary-foreground"].light,
    dark: cssColors["primary-foreground"].dark,
    group: "accent",
  },
  {
    token: "primary-ink",
    role: "Gold text on light; remaps on dark",
    light: cssColors["primary-ink"].light,
    dark: cssColors["primary-ink"].dark,
    group: "accent",
  },
  {
    token: "ring",
    role: "Focus",
    light: cssColors.ring.light,
    dark: cssColors.ring.dark,
    group: "accent",
  },
  {
    token: "background",
    role: "Page canvas",
    light: cssColors.background.light,
    dark: cssColors.background.dark,
    darkNote: "gray-950",
    group: "canvas",
  },
  {
    token: "foreground",
    role: "Primary text",
    light: cssColors.foreground.light,
    dark: cssColors.foreground.dark,
    group: "canvas",
  },
  {
    token: "muted",
    role: "Quiet wells",
    light: cssColors.muted.light,
    dark: cssColors.muted.dark,
    darkLabel: "white/5",
    darkBacking: cssColors.background.dark,
    group: "canvas",
  },
  {
    token: "muted-foreground",
    role: "Secondary text",
    light: cssColors["muted-foreground"].light,
    dark: cssColors["muted-foreground"].dark,
    group: "canvas",
  },
  {
    token: "border",
    role: "Rules, cards",
    light: cssColors.border.light,
    dark: cssColors.border.dark,
    group: "structure",
  },
  {
    token: "card",
    role: "Raised surface",
    light: cssColors.card.light,
    dark: cssColors.card.dark,
    group: "structure",
  },
  {
    token: "card-foreground",
    role: "Text on card",
    light: cssColors["card-foreground"].light,
    dark: cssColors["card-foreground"].dark,
    group: "structure",
  },
];

const groups = [
  {
    id: "accent",
    title: "Accent",
    lede: "Honey gold is the action color, not a wash. Use it on the primary button, the product eyebrow, and key links.",
  },
  {
    id: "canvas",
    title: "Canvas",
    lede: "Pages sit on a gray field. Light and dark are both first-class.",
  },
  {
    id: "structure",
    title: "Structure",
    lede: "Earn a border or raised surface when spacing cannot express the grouping.",
  },
];

function cssVarsFor(mode) {
  const vars = [];
  for (const [token, values] of Object.entries(cssColors)) {
    vars.push(`--color-${token}: ${values[mode]}`);
  }
  vars.push(`color-scheme: ${mode === "dark" ? "dark" : "light"}`);
  return vars.join("; ");
}

const designTokensJs = `// Generated by tools/generate-tokens.mjs — do not edit by hand.
const colors = ${JSON.stringify(colors, null, 2)};

const groups = ${JSON.stringify(groups, null, 2)};

function cssVarsFor(mode) {
  const vars = [];
  for (const color of colors) {
    vars.push(\`--color-\${color.token}: \${color[mode]}\`);
  }
  vars.push("color-scheme: " + (mode === "dark" ? "dark" : "light"));
  return vars.join("; ");
}

export default {
  colors,
  byToken: Object.fromEntries(colors.map((color) => [color.token, color])),
  groups: groups.map((group) => ({
    ...group,
    colors: colors.filter((color) => color.group === group.id),
  })),
  previewStyle: {
    light: cssVarsFor("light"),
    dark: cssVarsFor("dark"),
  },
  radii: [
    { token: "sm", value: "${raw.radius.sm.$value}", utility: "rounded-sm", use: "Tight chips" },
    { token: "md", value: "${raw.radius.md.$value}", utility: "rounded-md", use: "Buttons and controls" },
    { token: "lg", value: "${raw.radius.lg.$value}", utility: "rounded-lg", use: "@theme radius-lg" },
    { token: "xl", value: "${raw.radius.lg.$value}", utility: "rounded-xl", use: "Cards and wells" },
  ],
  typeScale: [
    {
      label: "Page title",
      sample: "Build the app",
      className: "text-4xl font-bold tracking-tight text-foreground md:text-5xl",
      utility: "text-4xl font-bold md:text-5xl",
    },
    {
      label: "Section",
      sample: "Shared authentication",
      className: "text-2xl font-semibold tracking-tight text-foreground md:text-3xl",
      utility: "text-2xl / text-3xl font-semibold tracking-tight",
    },
    {
      label: "Lede",
      sample: "The shell wraps your app with navigation, auth, admin, and storage.",
      className: "text-lg text-muted-foreground",
      utility: "text-lg text-muted-foreground",
    },
    {
      label: "Body",
      sample: "Lead with what ships today. Keep AI, MCP, and marketplace chrome quiet unless the page is about that surface.",
      className: "text-base/7 text-muted-foreground",
      utility: "text-base/7",
    },
    {
      label: "Label",
      sample: "Developers",
      className: "text-sm font-medium text-foreground",
      utility: "text-sm font-medium",
    },
    {
      label: "Mono",
      sample: "bg-primary text-primary-ink",
      className: "font-mono text-xs text-foreground",
      utility: "font-mono text-xs",
    },
  ],
  spacing: [
    { token: "page-x", value: "px-4 → px-8", use: "Outer horizontal gutters" },
    { token: "page-top", value: "pt-20 → pt-32", use: "Clear fixed header" },
    { token: "mt-10", value: "2.5rem", use: "Section step" },
    { token: "mt-16", value: "4rem", use: "Larger section turn" },
  ],
  gold: {
    brand: "${goldBrand}",
    text: "${goldText}",
    textDark: "${goldTextDark}",
    on: "${goldOn}",
    pantoneBrandCoated: "${raw.gold.brand.pantone.coated}",
    pantoneBrandUncoated: "${raw.gold.brand.pantone.uncoated}",
    pantoneTextCoated: "${raw.gold.text.pantone.coated}",
  },
  typography: {
    web: "${raw.typography.web.family.$value}",
    print: "${raw.typography.print.family.$value}",
  },
};
`;

fs.writeFileSync(path.join(root, "src/_data/designTokens.js"), designTokensJs);

const themeBlock = `@theme {
  --color-primary: ${cssColors.primary.light};
  --color-primary-foreground: ${cssColors["primary-foreground"].light};
  --color-primary-ink: ${cssColors["primary-ink"].light};
  --color-background: ${cssColors.background.light};
  --color-foreground: ${cssColors.foreground.light};
  --color-muted: ${cssColors.muted.light};
  --color-muted-foreground: ${cssColors["muted-foreground"].light};
  --color-border: ${cssColors.border.light};
  --color-card: ${cssColors.card.light};
  --color-card-foreground: ${cssColors["card-foreground"].light};
  --color-popover: ${cssColors.popover.light};
  --color-popover-foreground: ${cssColors["popover-foreground"].light};
  --color-secondary: ${cssColors.secondary.light};
  --color-secondary-foreground: ${cssColors["secondary-foreground"].light};
  --color-accent: ${cssColors.accent.light};
  --color-accent-foreground: ${cssColors["accent-foreground"].light};
  --color-destructive: ${cssColors.destructive.light};
  --color-input: ${cssColors.input.light};
  --color-ring: ${cssColors.ring.light};
  --radius-lg: ${raw.radius.lg.$value};
  --radius-md: ${raw.radius.md.$value};
  --radius-sm: ${raw.radius.sm.$value};
  --font-sans: "Inter", ui-sans-serif, system-ui, sans-serif;
}`;

const darkBlock = `@layer theme {
  .dark {
    --color-primary: ${cssColors.primary.dark};
    --color-primary-ink: ${cssColors["primary-ink"].dark};
    --color-ring: ${cssColors.ring.dark};
    --color-background: ${cssColors.background.dark};
    --color-foreground: ${cssColors.foreground.dark};
    --color-muted: ${cssColors.muted.dark};
    --color-muted-foreground: ${cssColors["muted-foreground"].dark};
    --color-border: ${cssColors.border.dark};
    --color-card: ${cssColors.card.dark};
    --color-card-foreground: ${cssColors["card-foreground"].dark};
    --color-popover: ${cssColors.popover.dark};
    --color-popover-foreground: ${cssColors["popover-foreground"].dark};
    --color-secondary: ${cssColors.secondary.dark};
    --color-secondary-foreground: ${cssColors["secondary-foreground"].dark};
    --color-accent: ${cssColors.accent.dark};
    --color-accent-foreground: ${cssColors["accent-foreground"].dark};
    --color-input: ${cssColors.input.dark};
  }
}`;

const inputCssPath = path.join(root, "src/assets/css/input.css");
let inputCss = fs.readFileSync(inputCssPath, "utf8");
inputCss = inputCss.replace(
  /\/\* GENERATED:BEGIN theme \*\/[\s\S]*?\/\* GENERATED:END theme \*\//,
  `/* GENERATED:BEGIN theme */\n${themeBlock}\n/* GENERATED:END theme */`,
);
inputCss = inputCss.replace(
  /\/\* GENERATED:BEGIN dark \*\/[\s\S]*?\/\* GENERATED:END dark \*\//,
  `/* GENERATED:BEGIN dark */\n${darkBlock}\n/* GENERATED:END dark */`,
);
if (!inputCss.includes("GENERATED:BEGIN theme")) {
  throw new Error("input.css missing GENERATED theme markers — add them before running generate");
}
fs.writeFileSync(inputCssPath, inputCss);

function tokenTableMarkdown() {
  const rows = colors
    .map(
      (c) =>
        `| \`${c.token}\` | \`${c.light}\` | \`${c.dark}\` | ${c.role} |`,
    )
    .join("\n");
  return `| Token | Light | Dark | Role |
| --- | --- | --- | --- |
${rows}
| radius | \`rounded-xl\` cards (\`${raw.radius.lg.$value}\`); \`rounded-md\` controls (\`${raw.radius.md.$value}\`) | same | Shape |`;
}

function replaceMarkers(filePath, table) {
  const content = fs.readFileSync(filePath, "utf8");
  const next = content.replace(
    /<!-- tokens:begin -->[\s\S]*?<!-- tokens:end -->/,
    `<!-- tokens:begin -->\n${table}\n<!-- tokens:end -->`,
  );
  if (next === content) {
    console.warn(`warn: no token markers in ${path.relative(root, filePath)}`);
    return;
  }
  fs.writeFileSync(filePath, next);
}

const table = tokenTableMarkdown();
replaceMarkers(path.join(root, "content/guidelines/foundations.md"), table);
replaceMarkers(path.join(root, "content/guidelines/design.md"), table);

fs.mkdirSync(path.join(root, "content/guidelines/generated"), { recursive: true });
fs.writeFileSync(path.join(root, "content/guidelines/generated/tokens.css"), `:root {\n${Object.entries(cssColors)
  .map(([k, v]) => `  --color-${k}: ${v.light};`)
  .join("\n")}\n}\n`);
fs.copyFileSync(tokenPath, path.join(root, "content/guidelines/generated/tokens.json"));

console.log("OK: generated tokens from tokens/tokens.json");
