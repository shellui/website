---
layout: layouts/page.njk
title: "Shellui for internal tools: one shell, one sign-in"
description: "Run dashboards, admin screens and back-office apps inside one Shellui shell, with shared sign-in, navigation, members, files and email. Open source."
heading: An app shell for internal tools
lede: Put every internal tool behind one sign-in and one navigation. Each tool keeps its own stack.
---

Internal tools tend to multiply. A dashboard here, an admin screen there, a script with a form on top. Each one needs sign-in, a members list, and a place in the navigation. Shellui gives them that once.

## How it works

Each tool is a web app that loads inside the Shellui shell. The shell draws the sidebar, settings, dialogs, and toasts. A tool talks to the shell through the [Shellui SDK](https://docs.shellui.com/sdk), so it can open a dialog or read the signed-in user without its own auth code.

- **Any framework.** React, Vue, Svelte, or plain HTML. Each tool keeps its own build and its own deploy.
- **One navigation.** Add a tool to the shell config and it shows up in the sidebar for everyone with access.
- **Add or drop a tool** without touching the others.

## What every tool gets

- **Sign-in** with magic links, OAuth providers, and SAML through [identity-service](/features/authentication/). SCIM keeps members in sync with your directory.
- **Members and settings** in the [admin panel](/features/administration/), plus webhooks for sign-in and member events.
- **File storage** with upload, browse, and controlled sharing through [storage-service](/features/storage/).
- **Email** for sign-in mail and notifications through [email-service](/features/email/).
- **Theme and language** shared across every tool, with light and dark mode.

## Where it runs

`shellui build` writes static files. Host them where you already ship, behind your VPN or on a public domain. The backend services ship as Docker images, so you can run them on your own servers. Add `--app` to the build and the same shell becomes a desktop app with Tauri 2.

## Start here

- Open the [playground](https://playground.shellui.com) to see a shell with a sample app.
- Follow the [quickstart](https://docs.shellui.com/quickstart) to create your own.
- Read the [architecture](/architecture/) page to see how the services fit together.
