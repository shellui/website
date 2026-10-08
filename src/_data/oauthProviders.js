/**
 * The 15 OAuth 2.0 and OpenID Connect providers identity-service 0.7.0
 * can configure (docs/oauth-providers.md). SAML 2.0 is separate.
 *
 * Marks are Simple Icons paths, dedicated CC0-1.0:
 * https://github.com/simple-icons/simple-icons
 * simple-icons 16.33.0, except LinkedIn, Microsoft, and Slack, which
 * that release no longer ships. Those three paths are from 11.15.0.
 */
export default {
  social: [
    { name: "Apple", file: "apple" },
    { name: "GitHub", file: "github" },
    { name: "GitLab", file: "gitlab" },
    { name: "Google", file: "google" },
    { name: "Line", file: "line" },
    { name: "LinkedIn", file: "linkedin" },
    { name: "Microsoft", file: "microsoft" },
    { name: "Reddit", file: "reddit" },
    { name: "Shopify", file: "shopify" },
    { name: "Slack", file: "slack" },
    { name: "Twitch", file: "twitch" },
  ],
  company: [
    { name: "Auth0", file: "auth0" },
    { name: "Keycloak", file: "keycloak" },
    { name: "Okta", file: "okta" },
    { name: "OpenID Connect", file: "openid" },
  ],
};
