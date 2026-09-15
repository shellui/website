const colors = [
  {
    token: "primary",
    role: "Accent / buttons",
    light: "#e3a512",
    dark: "#e8b84a",
    group: "accent",
  },
  {
    token: "primary-foreground",
    role: "Text on gold",
    light: "#1a1408",
    dark: "#1a1408",
    group: "accent",
  },
  {
    token: "primary-ink",
    role: "Gold text on light; in dark use primary",
    light: "#c4920a",
    dark: "#e8b84a",
    darkIsAlias: "primary",
    group: "accent",
  },
  {
    token: "ring",
    role: "Focus",
    light: "#e3a512",
    dark: "#e8b84a",
    group: "accent",
  },
  {
    token: "background",
    role: "Page canvas",
    light: "#ffffff",
    dark: "#030712",
    darkNote: "gray-950",
    group: "canvas",
  },
  {
    token: "foreground",
    role: "Primary text",
    light: "#111827",
    dark: "#f9fafb",
    group: "canvas",
  },
  {
    token: "muted",
    role: "Quiet wells",
    light: "#f9fafb",
    dark: "rgb(255 255 255 / 0.05)",
    darkBacking: "#030712",
    group: "canvas",
  },
  {
    token: "muted-foreground",
    role: "Secondary text",
    light: "#4b5563",
    dark: "#9ca3af",
    group: "canvas",
  },
  {
    token: "border",
    role: "Rules, cards",
    light: "#e5e7eb",
    dark: "#1f2937",
    group: "structure",
  },
  {
    token: "card",
    role: "Raised surface",
    light: "#ffffff",
    dark: "#111827",
    group: "structure",
  },
  {
    token: "card-foreground",
    role: "Text on card",
    light: "#111827",
    dark: "#f9fafb",
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
  for (const color of colors) {
    vars.push(`--color-${color.token}: ${color[mode]}`);
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
    { token: "sm", value: "0.25rem", utility: "rounded-sm", use: "Tight chips" },
    { token: "md", value: "0.375rem", utility: "rounded-md", use: "Buttons and controls" },
    { token: "lg", value: "0.75rem", utility: "rounded-lg", use: "@theme radius-lg" },
    { token: "xl", value: "0.75rem", utility: "rounded-xl", use: "Cards and wells" },
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
    { token: "px-4", value: "1rem", use: "Page padding (mobile)" },
    { token: "px-6", value: "1.5rem", use: "Page padding (sm)" },
    { token: "px-8", value: "2rem", use: "Page padding (lg)" },
    { token: "mt-10", value: "2.5rem", use: "Section step" },
    { token: "mt-16", value: "4rem", use: "Larger section turn" },
  ],
};
