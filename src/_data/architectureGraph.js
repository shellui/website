// Single source of truth for the /architecture/ diagram.
// Eleventy renders the static fallback from this file; the React island
// (src/islands/architecture-graph/) imports the same module at build time.

const GROUP_CLIENT = {
  id: "client",
  title: "Browser",
  subtitle: "One tab, one page load",
};

const GROUP_INFRA = {
  id: "infra",
  title: "Your infrastructure",
  subtitle: "Two Docker images",
};

const GROUP_SUPABASE = {
  id: "supabase",
  title: "Supabase project",
  subtitle: "Hosted by Supabase",
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
  description: "Any stack, in an iframe. Loads @shellui/sdk and calls init.",
  href: "#shell",
};

const full = {
  id: "full",
  label: "Full Shellui stack",
  summary:
    "Five Shellui pieces plus the blob store you point storage-service at. The shell hosts every frontend in an iframe and owns the session.",
  groups: [
    { ...GROUP_CLIENT, position: { x: 0, y: 0 }, size: { width: 560, height: 476 } },
    { ...GROUP_INFRA, position: { x: 660, y: 0 }, size: { width: 560, height: 420 } },
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
      parent: "client",
      position: { x: 20, y: 196 },
      size: { width: 248, height: 116 },
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
      id: "files",
      title: "Files",
      role: "Frontend",
      kind: "frontend",
      description: "Browse, upload, folders, permissions, and share links.",
      href: "#files",
      parent: "client",
      position: { x: 292, y: 340 },
      size: { width: 248, height: 116 },
    },
    {
      id: "identity",
      title: "identity-service",
      role: "Backend",
      kind: "backend",
      description: "OAuth sign-in, JWT sessions, and a JWKS endpoint.",
      href: "#identity-service",
      parent: "infra",
      position: { x: 20, y: 60 },
      size: { width: 248, height: 120 },
    },
    {
      id: "storage",
      title: "storage-service",
      role: "Backend",
      kind: "backend",
      description: "Supabase-compatible REST, access grants, share links, quotas.",
      href: "#storage-service",
      parent: "infra",
      position: { x: 20, y: 244 },
      size: { width: 248, height: 132 },
    },
    {
      id: "blobs",
      title: "S3 or local filesystem",
      role: "Blobs",
      kind: "store",
      description: "Where storage-service writes the bytes.",
      parent: "infra",
      position: { x: 292, y: 258 },
      size: { width: 248, height: 104 },
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
    },
    {
      id: "admin-identity",
      source: "admin",
      sourceHandle: "right-s",
      target: "identity",
      targetHandle: "left2-t",
      label: "users + groups",
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
    },
    {
      id: "storage-blobs",
      source: "storage",
      sourceHandle: "right-s",
      target: "blobs",
      targetHandle: "left-t",
    },
  ],
  omitted: null,
};

const supabase = {
  id: "supabase",
  label: "Shellui + Supabase",
  summary:
    "Keep the shell and your app. Point backend.type and storage.url at a Supabase project, and identity-service and storage-service leave the diagram.",
  groups: [
    { ...GROUP_CLIENT, position: { x: 0, y: 0 }, size: { width: 560, height: 392 } },
    { ...GROUP_SUPABASE, position: { x: 660, y: 0 }, size: { width: 300, height: 420 } },
  ],
  nodes: [
    {
      ...SHELL,
      description: 'Same frontend, with backend.type set to "supabase".',
      parent: "client",
      position: { x: 20, y: 60 },
      size: { width: 520, height: 96 },
    },
    {
      ...APP,
      parent: "client",
      position: { x: 20, y: 196 },
      size: { width: 520, height: 116 },
    },
    {
      id: "supabase-auth",
      title: "Supabase Auth",
      role: "Hosted",
      kind: "managed",
      description: "Replaces identity-service as the sign-in backend.",
      href: "#identity-service",
      parent: "supabase",
      position: { x: 20, y: 60 },
      size: { width: 260, height: 120 },
    },
    {
      id: "supabase-storage",
      title: "Supabase Storage",
      role: "Hosted",
      kind: "managed",
      description: "Replaces storage-service behind the same SDK calls.",
      href: "#storage-service",
      parent: "supabase",
      position: { x: 20, y: 244 },
      size: { width: 260, height: 132 },
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
    },
  ],
  omitted: {
    title: "Not in this view",
    items: [
      "identity-service and storage-service, replaced by the two Supabase services",
      "admin and Files, which register on a Shellui identity backend",
    ],
  },
};

function withConnections(view) {
  const titles = new Map(view.nodes.map((node) => [node.id, node.title]));
  return {
    ...view,
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
