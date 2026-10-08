// Single source of truth for the /architecture/ diagram.
// Eleventy renders the SSR graph chrome (and a <noscript> text fallback) from
// this file; the React island (src/islands/architecture-graph/) imports the
// same module at build time and hydrates the interactive canvas over that shell.
//
// Positions are hand-placed in flow coordinates. Node positions are relative
// to the frame they sit in. labelT moves an edge label along its curve so two
// labels in the same corridor do not collide.

const GROUP_CLIENT = {
  id: "client",
  title: "Browser",
  subtitle: "Static files in one tab",
};

const GROUP_INFRA = {
  id: "infra",
  title: "Your infrastructure",
  subtitle: "Docker images you run",
};

const GROUP_SUPABASE = {
  id: "supabase",
  title: "Supabase project",
  subtitle: "Auth and Storage, hosted",
  logo: "supabase",
};

const SHELL = {
  id: "shell",
  title: "Shellui shell",
  role: "Frontend",
  kind: "shell",
  description: "Navigation, layout modes, themes, modals, /login, and the session.",
  href: "#shell",
};

const APP = {
  id: "app",
  title: "Your app",
  role: "Your code",
  kind: "app",
};

const FILES = {
  id: "files",
  title: "Files",
  role: "Frontend",
  kind: "frontend",
  description: "Browse, upload, folders, permissions, and share links.",
  href: "#files",
};

const HOSTING = {
  id: "hosting",
  title: "hosting-service",
  role: "All-in temporary deploy",
  kind: "hosting",
  description:
    "shellui.app: one temporary URL for the whole Browser group - shell, your app, and Files.",
  href: "#hosting-service",
};

const full = {
  id: "full",
  label: "Full Shellui stack",
  summary:
    "Seven Shellui pieces, plus the blob store and the company's mail provider. Browser pieces are static files. hosting-service on shellui.app is the all-in temporary deploy for that whole tab.",
  groups: [
    { ...GROUP_CLIENT, position: { x: 0, y: 0 }, size: { width: 560, height: 484 } },
    { ...GROUP_INFRA, position: { x: 660, y: 0 }, size: { width: 620, height: 520 } },
  ],
  nodes: [
    {
      ...SHELL,
      parent: "client",
      position: { x: 20, y: 60 },
      size: { width: 520, height: 96 },
    },
    {
      ...APP,
      description:
        "Any stack, in an iframe. Loads @shellui/sdk, calls init, and reaches files through shellui.storage rather than the REST API.",
      fill: true,
      parent: "client",
      position: { x: 20, y: 196 },
      size: { width: 248, height: 268 },
    },
    {
      id: "admin",
      title: "admin",
      role: "Frontend",
      kind: "frontend",
      description: "Users, company access, groups, logs, and tokens at /admin.",
      href: "#admin",
      parent: "client",
      position: { x: 292, y: 196 },
      size: { width: 248, height: 116 },
    },
    {
      ...FILES,
      parent: "client",
      position: { x: 292, y: 348 },
      size: { width: 248, height: 116 },
    },
    {
      id: "identity",
      title: "identity-service",
      role: "Backend",
      kind: "backend",
      description: "OAuth, SAML, magic links, and signed session tokens.",
      href: "#identity-service",
      parent: "infra",
      position: { x: 16, y: 56 },
      size: { width: 250, height: 130 },
    },
    {
      id: "storage",
      title: "storage-service",
      role: "Backend",
      kind: "backend",
      description: "Supabase-compatible REST, access grants, share links, and quotas.",
      href: "#storage-service",
      parent: "infra",
      position: { x: 16, y: 202 },
      size: { width: 250, height: 136 },
    },
    {
      ...HOSTING,
      parent: "infra",
      position: { x: 16, y: 354 },
      size: { width: 250, height: 142 },
    },
    {
      id: "email",
      title: "email-service",
      role: "Backend",
      kind: "backend",
      description: "Company email rules. Sends with Resend or SMTP.",
      href: "#email-service",
      parent: "infra",
      position: { x: 340, y: 354 },
      size: { width: 264, height: 142 },
    },
    {
      id: "blobs",
      title: "S3 or local filesystem",
      role: "Blobs",
      kind: "store",
      description: "Where storage-service writes the bytes.",
      position: { x: 1360, y: 210 },
      size: { width: 220, height: 116 },
    },
    {
      id: "provider",
      title: "Resend or SMTP",
      role: "Provider",
      kind: "store",
      description: "The company's own mail provider.",
      position: { x: 1360, y: 366 },
      size: { width: 220, height: 116 },
    },
  ],
  edges: [
    {
      id: "shell-app",
      source: "shell",
      sourceHandle: "bottom-s",
      target: "app",
      targetHandle: "top-t",
      label: "iframe + @shellui/sdk",
      labelT: 0.66,
      bidirectional: true,
    },
    {
      id: "shell-admin",
      source: "shell",
      sourceHandle: "bottom-s",
      target: "admin",
      targetHandle: "top-t",
      label: "iframe at /admin",
    },
    {
      id: "admin-files",
      source: "admin",
      sourceHandle: "bottom-s",
      target: "files",
      targetHandle: "top-t",
      label: "iframe",
    },
    {
      id: "shell-identity",
      source: "shell",
      sourceHandle: "right-s",
      target: "identity",
      targetHandle: "left-t",
      label: "OAuth + JWT",
    },
    {
      id: "shell-storage",
      source: "shell",
      sourceHandle: "right2-s",
      target: "storage",
      targetHandle: "left-t",
      label: "/storage/v1/*",
      labelT: 0.74,
    },
    {
      id: "admin-identity",
      source: "admin",
      sourceHandle: "right-s",
      target: "identity",
      targetHandle: "left2-t",
      label: "users + groups",
      labelT: 0.33,
    },
    {
      id: "files-storage",
      source: "files",
      sourceHandle: "right-s",
      target: "storage",
      targetHandle: "left2-t",
      label: "/storage/v1/*",
    },
    {
      id: "storage-identity",
      source: "storage",
      sourceHandle: "top-s",
      target: "identity",
      targetHandle: "bottom-t",
      label: "JWKS verify",
      labelOffset: [0, -18],
    },
    {
      id: "storage-blobs",
      source: "storage",
      sourceHandle: "right-s",
      target: "blobs",
      targetHandle: "left-t",
    },
    {
      id: "identity-email",
      source: "identity",
      sourceHandle: "right-s",
      target: "email",
      targetHandle: "top-t",
      label: "events",
      labelT: 0.28,
      labelOffset: [18, -16],
    },
    {
      id: "storage-email",
      source: "storage",
      sourceHandle: "right2-s",
      target: "email",
      targetHandle: "left2-t",
      label: "events",
      labelT: 0.42,
      labelOffset: [0, -18],
    },
    {
      id: "hosting-email",
      source: "hosting",
      sourceHandle: "right-s",
      target: "email",
      targetHandle: "left-t",
      label: "events",
    },
    {
      id: "email-provider",
      source: "email",
      sourceHandle: "right-s",
      target: "provider",
      targetHandle: "left-t",
    },
    {
      id: "hosting-browser",
      source: "hosting",
      sourceHandle: "left-s",
      target: "client",
      targetHandle: "right-t",
      label: "all-in temporary deploy",
      labelT: 0.42,
      labelOffset: [0, 14],
    },
    {
      id: "hosting-identity",
      source: "hosting",
      sourceHandle: "top-s",
      target: "identity",
      targetHandle: "bottom-t",
      label: "JWKS verify",
      labelT: 0.55,
    },
  ],
  omitted: null,
};

const supabase = {
  id: "supabase",
  label: "Shellui + Supabase",
  summary:
    "Keep the Browser static files, hosting-service, and email-service. hosting-service can post events to email-service. Point backend.type and storage.url at a Supabase project for Auth and Storage.",
  groups: [
    { ...GROUP_CLIENT, position: { x: 0, y: 0 }, size: { width: 560, height: 396 } },
    { ...GROUP_SUPABASE, position: { x: 660, y: 0 }, size: { width: 300, height: 320 } },
    {
      ...GROUP_INFRA,
      subtitle: "Docker images you run",
      position: { x: 660, y: 340 },
      size: { width: 620, height: 196 },
    },
  ],
  nodes: [
    {
      ...SHELL,
      description: 'The same frontend, with backend.type set to "supabase".',
      parent: "client",
      position: { x: 20, y: 60 },
      size: { width: 520, height: 96 },
    },
    {
      ...APP,
      description:
        "Any stack, in an iframe. The same @shellui/sdk calls, answered by a different backend.",
      fill: true,
      parent: "client",
      position: { x: 20, y: 196 },
      size: { width: 248, height: 180 },
    },
    {
      ...FILES,
      description:
        "The same Files app. Set filesUrl; it talks to Supabase Storage through the shell.",
      parent: "client",
      position: { x: 292, y: 196 },
      size: { width: 248, height: 180 },
    },
    {
      id: "supabase-auth",
      title: "Supabase Auth",
      role: "Hosted",
      kind: "managed",
      logo: "supabase",
      description: "Replaces identity-service as the sign-in backend.",
      parent: "supabase",
      position: { x: 20, y: 72 },
      size: { width: 260, height: 100 },
    },
    {
      id: "supabase-storage",
      title: "Supabase Storage",
      role: "Hosted",
      kind: "managed",
      logo: "supabase",
      description: "Replaces storage-service behind the same SDK and Files calls.",
      parent: "supabase",
      position: { x: 20, y: 192 },
      size: { width: 260, height: 108 },
    },
    {
      ...HOSTING,
      parent: "infra",
      position: { x: 16, y: 52 },
      size: { width: 250, height: 124 },
    },
    {
      id: "email",
      title: "email-service",
      role: "Backend",
      kind: "backend",
      description: "Company email rules. Sends with Resend or SMTP.",
      href: "#email-service",
      parent: "infra",
      position: { x: 340, y: 52 },
      size: { width: 264, height: 124 },
    },
    {
      id: "provider",
      title: "Resend or SMTP",
      role: "Provider",
      kind: "store",
      description: "The company's own mail provider.",
      position: { x: 1360, y: 398 },
      size: { width: 220, height: 112 },
    },
  ],
  edges: [
    {
      id: "shell-app",
      source: "shell",
      sourceHandle: "bottom-s",
      target: "app",
      targetHandle: "top-t",
      label: "iframe + @shellui/sdk",
      bidirectional: true,
    },
    {
      id: "shell-files",
      source: "shell",
      sourceHandle: "bottom-s",
      target: "files",
      targetHandle: "top-t",
      label: "filesUrl",
    },
    {
      id: "shell-auth",
      source: "shell",
      sourceHandle: "right-s",
      target: "supabase-auth",
      targetHandle: "left-t",
      label: "sign-in + session",
    },
    {
      id: "shell-storage",
      source: "shell",
      sourceHandle: "right2-s",
      target: "supabase-storage",
      targetHandle: "left-t",
      label: "/storage/v1/*",
      labelT: 0.74,
    },
    {
      id: "files-storage",
      source: "files",
      sourceHandle: "right-s",
      target: "supabase-storage",
      targetHandle: "left-t",
      label: "/storage/v1/*",
    },
    {
      id: "hosting-browser",
      source: "hosting",
      sourceHandle: "left-s",
      target: "client",
      targetHandle: "right-t",
      label: "all-in temporary deploy",
      labelT: 0.48,
      labelOffset: [0, 10],
    },
    {
      id: "hosting-email",
      source: "hosting",
      sourceHandle: "right-s",
      target: "email",
      targetHandle: "left-t",
      label: "events",
    },
    {
      id: "email-provider",
      source: "email",
      sourceHandle: "right-s",
      target: "provider",
      targetHandle: "left-t",
    },
  ],
  omitted: {
    title: "Not in this view",
    items: [
      "identity-service and storage-service, replaced by Supabase Auth and Storage",
      "admin, which registers on a Shellui identity backend",
    ],
  },
};

function boundsOf(view) {
  const boxes = [
    ...view.groups,
    ...view.nodes.filter((node) => !node.parent),
  ];
  return {
    width: Math.max(...boxes.map((box) => box.position.x + box.size.width)),
    height: Math.max(...boxes.map((box) => box.position.y + box.size.height)),
  };
}

function withConnections(view) {
  const titles = new Map([
    ...view.groups.map((group) => [group.id, group.title]),
    ...view.nodes.map((node) => [node.id, node.title]),
  ]);
  return {
    ...view,
    bounds: boundsOf(view),
    connections: view.edges.map((edge) => ({
      id: edge.id,
      from: titles.get(edge.source),
      to: titles.get(edge.target),
      label: edge.label || "",
      bidirectional: Boolean(edge.bidirectional),
    })),
  };
}

export default {
  views: [withConnections(full), withConnections(supabase)],
};
