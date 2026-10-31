---
layout: layouts/page.njk
title: "Shellui security: identity, tokens and reporting"
description: "How Shellui handles sign-in links, one-time tokens, staff accounts, deploy tokens and regions, and how to report a vulnerability to the team."
heading: Security
lede: How Shellui protects sign-in, tokens, and company data, and how to report a problem.
---

Shellui is open source, so every practice on this page lives in code you can read on [GitHub](https://github.com/shellui). The details below come from [identity-service](https://github.com/shellui/identity-service) and [hosting-service](https://github.com/shellui/hosting-service).

## Magic links

- Magic-link URLs and tokens never go into webhooks, logs, or storage. A webhook on a magic-link request gets the email, expiry, and source, never the link.
- Only a SHA-256 hash of each one-time token is stored. The raw value exists only in the email and in the verify request.
- Staff and superuser accounts cannot sign in with a magic link.

## Logs and error reports

- Access logs record the method, path, status, and duration. They never record the query string.
- Error reports strip query strings, request bodies, the Referer header, and secret-named values before they leave the server.

## Staff and permissions

- `is_staff` and `is_superuser` can only change in Django admin. No API endpoint can grant them.
- In a multi-region setup, a region refuses token exchange for global staff accounts.

## Deploy tokens

- Company deploy tokens for CI previews start with `shellui_dt_`.
- Only a SHA-256 hash is stored. The raw token is shown once, when you create it.
- Tokens can expire, and you can revoke one at any time.

## Regions

- A multi-region setup runs one identity-service per region. Each region trusts one upstream provider and keeps its own members, sessions, and keys.
- Deployments never share a signing key or secret key.
- Session cookies are host-only, so one deployment never reads another's session.

## Report a vulnerability

Email [contact@shellui.com](mailto:contact@shellui.com) with the affected service, the version, and the steps to reproduce. Do not open a public issue for a security problem.

- We confirm receipt and keep you updated while we work on a fix.
- Machine-readable contact details live in [/.well-known/security.txt](/.well-known/security.txt).

Shellui is MIT licensed and provided as is. Read the [license](https://github.com/shellui/shellui/blob/main/LICENSE) for the full terms.
