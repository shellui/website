---
layout: layouts/page.njk
title: "Shellui vs building it yourself: what you skip"
description: "Compare building sign-in, members, settings, files and email by hand with starting from Shellui, the open-source app shell. Real features, no lock-in."
heading: Shellui vs building it yourself
lede: Every web app needs the same basics. Here is what you write by hand, and what Shellui already ships.
---

Building the basics yourself gives you full control. It also means you write, test, and secure the same screens in every project. Shellui is MIT licensed and self-hostable, so you keep control and skip the rewrite.

## Side by side

| You need | Build it yourself | With Shellui |
| --- | --- | --- |
| App chrome | Sidebar, settings, dialogs, toasts per app | Drawn by the shell, called from the [SDK](https://docs.shellui.com/sdk) |
| Sign-in | Magic links, OAuth, SAML, sessions | [identity-service](/features/authentication/) |
| Members | Invites, roles, company settings | [Admin panel](/features/administration/) |
| Files | Uploads, access rules, sharing | [storage-service](/features/storage/) |
| Email | Sign-in mail, templates, providers | [email-service](/features/email/) |
| Several apps | Shared login and navigation by hand | Each app loads in one shell |
| Desktop | A separate wrapper project | `shellui build --app` with Tauri 2 |

## What you keep

- **Your framework.** Each app keeps its own stack and deploy.
- **Your hosting.** `shellui build` writes static files you host anywhere.
- **Your code.** Everything is on [GitHub](https://github.com/shellui) under the MIT License. Fork it, read it, or run it on your own servers.

## When building it yourself makes sense

- You ship one small app and never plan a second one.
- You need a sign-in flow that none of the supported methods cover.
- Your app cannot run inside an iframe.

## What security work you skip

Sign-in is where hand-rolled code goes wrong. Shellui stores only hashes of one-time tokens, keeps magic links out of logs and webhooks, and blocks magic links for staff accounts. Read the [security page](/security/) for the full list.

## Try it

- Open the [playground](https://playground.shellui.com) in your browser.
- Follow the [quickstart](https://docs.shellui.com/quickstart).
