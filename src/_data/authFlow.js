// Single source of truth for the /features/authentication/ exchange diagram.
// Eleventy renders the SSR graph chrome (and a <noscript> text fallback) from
// this file; the React island (src/islands/auth-flow/) imports the same module
// at build time and hydrates the interactive canvas over that shell.

const APP = {
  id: "app",
  title: "Your app",
  role: "Iframe",
  kind: "app",
  fill: true,
};

const SHELL = {
  id: "shell",
  title: "Shellui shell",
  role: "Host",
  kind: "shell",
};

const IDENTITY = {
  id: "identity",
  title: "identity-service",
  role: "Django",
  kind: "backend",
  href: "https://github.com/shellui/identity-service",
};

const oauth = {
  id: "oauth",
  label: "OAuth sign-in",
  summary:
    "Follow sign-in from your app to the account provider and back. identity-service confirms the account and company access before returning a session to Shellui.",
  bounds: { width: 1120, height: 360 },
  groups: [],
  nodes: [
    {
      ...APP,
      description: "Calls shellui.login() to start sign-in in the main browser window.",
      position: { x: 16, y: 100 },
      size: { width: 220, height: 160 },
    },
    {
      ...SHELL,
      description: "Shows the login page, receives the session, and shares account details through the SDK.",
      position: { x: 276, y: 40 },
      size: { width: 248, height: 280 },
    },
    {
      ...IDENTITY,
      description: "Confirms the account and company access, then issues signed session tokens.",
      position: { x: 564, y: 40 },
      size: { width: 268, height: 280 },
    },
    {
      id: "idp",
      title: "GitHub, Google, Microsoft",
      role: "Identity provider",
      kind: "managed",
      description: "Authenticates the account and returns to the registered identity-service callback.",
      position: { x: 872, y: 100 },
      size: { width: 232, height: 160 },
    },
  ],
  edges: [
    {
      id: "app-shell-login",
      source: "app",
      sourceHandle: "right-s",
      target: "shell",
      targetHandle: "left-t",
      label: "shellui.login()",
      labelT: 0.5,
    },
    {
      id: "shell-identity-authorize",
      source: "shell",
      sourceHandle: "right-s",
      target: "identity",
      targetHandle: "left-t",
      label: "GET /authorize",
      labelT: 0.5,
    },
    {
      id: "identity-idp",
      source: "identity",
      sourceHandle: "right-s",
      target: "idp",
      targetHandle: "left-t",
      label: "OAuth redirect",
      labelT: 0.5,
    },
    {
      id: "idp-identity-callback",
      source: "idp",
      sourceHandle: "left2-s",
      target: "identity",
      targetHandle: "right2-t",
      label: "/oauth/callback",
      labelT: 0.45,
      labelOffset: [0, 10],
    },
    {
      id: "identity-shell-tokens",
      source: "identity",
      sourceHandle: "left2-s",
      target: "shell",
      targetHandle: "right2-t",
      label: "tokens in #fragment",
      labelT: 0.5,
      labelOffset: [0, 10],
    },
    {
      id: "shell-app-session",
      source: "shell",
      sourceHandle: "left2-s",
      target: "app",
      targetHandle: "right2-t",
      label: "user + accessToken",
      labelT: 0.5,
      labelOffset: [0, 10],
    },
  ],
  connections: [
    {
      id: "c1",
      from: "Your app",
      to: "the shell",
      label: "Start sign-in in the main browser window",
    },
    {
      id: "c2",
      from: "the shell",
      to: "identity-service",
      label: "Request sign-in for the configured company",
    },
    {
      id: "c3",
      from: "identity-service",
      to: "Provider",
      label: "Redirect to the selected account provider",
    },
    {
      id: "c4",
      from: "Provider",
      to: "identity-service",
      label: "Verify the account, then ask for confirmation",
    },
    {
      id: "c5",
      from: "identity-service",
      to: "the shell",
      label: "Return the session to the shell login callback",
    },
    {
      id: "c6",
      from: "the shell",
      to: "Your app",
      label: "Share account details and an access token through the SDK",
    },
  ],
  omitted: {
    title: "Related details",
    items: [
      "The diagram shows the identity-service sign-in flow",
      "Company access rules apply before identity-service issues a session",
    ],
  },
};

const session = {
  id: "session",
  label: "Tokens after login",
  summary:
    "Shellui renews the session while the tab is open and shares account details with your app. With RSA signing configured, services verify JSON Web Tokens (JWTs) using the public JSON Web Key Set (JWKS) from identity-service.",
  bounds: { width: 1120, height: 400 },
  groups: [],
  nodes: [
    {
      ...APP,
      description: "Reads user and accessToken from SDK settings. Does not hold the refresh token.",
      position: { x: 16, y: 120 },
      size: { width: 220, height: 160 },
    },
    {
      ...SHELL,
      description: "Persists the session, refreshes access tokens, and runs storage calls with the signed-in user's token.",
      position: { x: 276, y: 40 },
      size: { width: 248, height: 320 },
    },
    {
      ...IDENTITY,
      description: "Renews sessions and returns account details. Publishes public verification keys when RSA signing is configured.",
      position: { x: 564, y: 40 },
      size: { width: 268, height: 160 },
    },
    {
      id: "storage",
      title: "storage-service",
      role: "Django",
      kind: "backend",
      href: "/features/storage/",
      description: "Verifies identity-service JWTs, then serves the company bucket.",
      position: { x: 564, y: 224 },
      size: { width: 268, height: 136 },
    },
    {
      id: "admin",
      title: "Admin panel",
      role: "/admin",
      kind: "frontend",
      href: "/features/administration/",
      description: "An embedded app at /admin. Staff and owners use the same identity-service backend.",
      position: { x: 872, y: 40 },
      size: { width: 232, height: 176 },
    },
  ],
  edges: [
    {
      id: "shell-app-sdk",
      source: "shell",
      sourceHandle: "left-s",
      target: "app",
      targetHandle: "right-t",
      label: "postMessage session",
      bidirectional: true,
    },
    {
      id: "shell-identity-refresh",
      source: "shell",
      sourceHandle: "right-s",
      target: "identity",
      targetHandle: "left-t",
      label: "refresh + /user",
    },
    {
      id: "admin-identity",
      source: "admin",
      sourceHandle: "left-s",
      target: "identity",
      targetHandle: "right-t",
      label: "directory APIs",
    },
    {
      id: "shell-storage",
      source: "shell",
      sourceHandle: "right2-s",
      target: "storage",
      targetHandle: "left-t",
      label: "Bearer JWT",
    },
    {
      id: "storage-identity-jwks",
      source: "storage",
      sourceHandle: "top-s",
      target: "identity",
      targetHandle: "bottom-t",
      label: "JWKS verify",
      labelOffset: [12, 0],
    },
  ],
  connections: [
    {
      id: "s1",
      from: "the shell",
      to: "Your app",
      bidirectional: true,
      label: "Share account details and an access token through the SDK",
    },
    {
      id: "s2",
      from: "the shell",
      to: "identity-service",
      label: "Renew the session and fetch current account details",
    },
    {
      id: "s3",
      from: "Admin panel (/admin)",
      to: "identity-service",
      label: "Manage members, groups, tokens, and company access",
    },
    {
      id: "s4",
      from: "the shell",
      to: "storage-service",
      label: "Run file operations as the signed-in account",
    },
    {
      id: "s5",
      from: "storage-service",
      to: "identity-service",
      label: "Verify JWTs with identity-service public keys",
    },
  ],
  omitted: {
    title: "Related details",
    items: [
      "Supabase Auth is an alternative authentication backend; storage configuration is separate",
      "Your backend services must verify tokens and enforce their own permissions",
    ],
  },
};

export default {
  views: [oauth, session],
};
