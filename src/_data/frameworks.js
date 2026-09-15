/** Init templates from `@shellui/cli` on develop (`shellui init <id>`). Alpine is not a starter. */
export default [
  { id: "react", label: "React", command: "npx shellui@latest init react" },
  { id: "vue", label: "Vue", command: "npx shellui@latest init vue" },
  { id: "angular", label: "Angular", command: "npx shellui@latest init angular" },
  { id: "next", label: "Next.js", command: "npx shellui@latest init next" },
  { id: "nuxt", label: "Nuxt", command: "npx shellui@latest init nuxt" },
  { id: "svelte", label: "SvelteKit", command: "npx shellui@latest init svelte" },
  { id: "flutter", label: "Flutter Web", command: "npx shellui@latest init flutter" },
];
