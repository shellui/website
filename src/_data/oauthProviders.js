/**
 * The 15 OAuth 2.0 and OpenID Connect providers identity-service 0.7.0
 * can configure (docs/oauth-providers.md). SAML 2.0 is separate.
 *
 * Single-color marks are Simple Icons paths, CC0-1.0, filled with that
 * icon's documented brand hex:
 * https://github.com/simple-icons/simple-icons
 * simple-icons 16.33.0, except LinkedIn, Slack, and the Microsoft
 * geometry, which that release no longer ships. Those paths are from 11.15.0.
 *
 * Google is the four-color G, stored from the public-domain Wikimedia file
 * File:Google "G" logo.svg. Microsoft keeps the CC0 square geometry, filled
 * with the four logo colors (red #F25022, green #7FBA00, blue #00A4EF,
 * yellow #FFB900).
 *
 * darkFile is a light treatment of a mark that disappears on the dark canvas
 * (black, near-black, or dark purple).
 */
export default {
  social: [
    { name: "Apple", file: "apple", darkFile: "apple-on-dark" },
    { name: "GitHub", file: "github", darkFile: "github-on-dark" },
    { name: "GitLab", file: "gitlab" },
    { name: "Google", file: "google" },
    { name: "Line", file: "line" },
    { name: "LinkedIn", file: "linkedin" },
    { name: "Microsoft", file: "microsoft" },
    { name: "Reddit", file: "reddit" },
    { name: "Shopify", file: "shopify" },
    { name: "Slack", file: "slack", darkFile: "slack-on-dark" },
    { name: "Twitch", file: "twitch" },
  ],
  company: [
    { name: "Auth0", file: "auth0" },
    { name: "Keycloak", file: "keycloak", darkFile: "keycloak-on-dark" },
    { name: "Okta", file: "okta" },
    { name: "OpenID Connect", file: "openid" },
  ],
};
