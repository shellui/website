---
layout: layouts/post.njk
title: Introducing Shellui | Shellui
heading: Introducing Shellui
description: Meet Shellui, the web app development platform. This is the first post on our official blog.
date: 2026-08-19
author: Shellui
authorRole: The Shellui team
category: Announcement
image: /img/blog/introducing-shellui.jpg
imageAlt: Person holding a hello sticker
tags:
  - blog
---

Shellui is the web app development platform. This post opens the official blog.

The idea is a shared shell around your product: authentication, legal documents, sidebar navigation, modals, drawers, themes, toast notifications, multi-language support, and more. Pair it with the [identity-service](https://github.com/shellui/identity-service) backend or embed an [admin panel](https://github.com/shellui/shellui-admin) in your app.

## What you get today

Shellui v0.3.0 is experimental and ready for real projects. Highlights include:

- Authentication, legal documents, and optional in-app admin tooling
- Layout modes, flexible navigation, side drawers, and modal windows
- Custom themes, toast notifications, and multi-language support
- Offline support, cookie consent, and error reporting

It is framework agnostic and TypeScript-first. The packages are `@shellui/cli` for scaffolding and the dev server, `@shellui/core` for the React runtime, and `@shellui/sdk` for programmatic integration. The UI is built on Radix UI primitives, styled with Tailwind CSS, with i18next for translations.

## Get started

Documentation lives at [docs.shellui.com](https://docs.shellui.com). The [playground](https://playground.shellui.com) is there if you want to try the shell without scaffolding a repo. Source is on [GitHub](https://github.com/shellui).

We will use this blog for release notes, architecture notes, and how the platform is evolving.
