// Single source of truth for the /features/authentication/ exchange diagram.
// Eleventy renders the static fallback from this file; the React island
// (src/islands/auth-flow/) imports the same module at build time.

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
    "The iframe asks the shell to start login. The shell talks to identity-service. identity-service talks to GitHub, Google, or Microsoft, then bounces tokens back to the shell in a URL fragment.",
  bounds: { width: 1120, height: 360 },
  groups: [],
  nodes: [
    {
      ...APP,
      description: "Calls shellui.login(). OAuth cannot run inside the iframe.",
      position: { x: 16, y: 100 },
      size: { width: 220, height: 160 },
    },
    {
      ...SHELL,
      description: "Owns /login and /login/callback. Stores the session and shares the user over postMessage.",
      position: { x: 276, y: 40 },
      size: { width: 248, height: 280 },
    },
    {
      ...IDENTITY,
      description: "Hosts authorize, the provider callback, and account confirmation. Issues JWT access and refresh tokens.",
      position: { x: 564, y: 40 },
      size: { width: 268, height: 280 },
    },
    {
      id: "idp",
      title: "GitHub, Google, Microsoft",
      role: "Identity provider",
      kind: "managed",
      description: "One callback URL on identity-service. The shell origin is not registered on the provider.",
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
      to: "Shell",
      label: "shellui.login() so OAuth runs in the top window",
    },
    {
      id: "c2",
      from: "Shell",
      to: "identity-service",
      label: "GET /api/v1/authorize with company_id and redirect_to",
    },
    {
      id: "c3",
      from: "identity-service",
      to: "Provider",
      label: "redirect_uri is always identity-service /api/v1/oauth/callback",
    },
    {
      id: "c4",
      from: "Provider",
      to: "identity-service",
      label: "Server-side code exchange, then account confirmation",
    },
    {
      id: "c5",
      from: "identity-service",
      to: "Shell",
      label: "Bounce to /login/callback with tokens in the URL fragment",
    },
    {
      id: "c6",
      from: "Shell",
      to: "Your app",
      label: "SDK settings: signed-in user and access token",
    },
  ],
  omitted: {
    title: "Not drawn",
    items: [
      "CLI shellui login uses the same authorize URL with a loopback redirect_to",
      "Older shells that still receive ?code= use POST /api/v1/oauth/exchange",
    ],
  },
};

const session = {
  id: "session",
  label: "Tokens after login",
  summary:
    "The shell stores access and refresh JWTs, refreshes them while the tab is open, and shares the session with the iframe. Other services verify those tokens against identity-service JWKS.",
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
      description: "RS256 JWTs, GET /.well-known/jwks.json, POST /api/v1/token, GET /api/v1/user. Groups travel as user.groups.",
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
      title: "admin",
      role: "Frontend",
      kind: "frontend",
      href: "/features/administration/",
      description: "Staff and owners call the same identity API from /admin.",
      position: { x: 872, y: 40 },
      size: { width: 232, height: 160 },
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
      from: "Shell",
      to: "Your app",
      bidirectional: true,
      label: "SDK settings carry user and accessToken",
    },
    {
      id: "s2",
      from: "Shell",
      to: "identity-service",
      label: "grant_type=refresh_token and GET /api/v1/user",
    },
    {
      id: "s3",
      from: "admin",
      to: "identity-service",
      label: "Users, groups, tokens, OAuth clients, company access",
    },
    {
      id: "s4",
      from: "Shell",
      to: "storage-service",
      label: "shellui.storage runs as the signed-in user",
    },
    {
      id: "s5",
      from: "storage-service",
      to: "identity-service",
      label: "GET /.well-known/jwks.json to verify JWTs",
    },
  ],
  omitted: {
    title: "Not drawn",
    items: [
      "Supabase Auth and Storage replace identity-service and storage-service when backend.type is supabase",
      "hosting-service syncs preview origins onto the company OAuth redirect allowlist",
    ],
  },
};

export default {
  views: [oauth, session],
};
