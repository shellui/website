---
layout: layouts/post.njk
title: Presentazione di Shellui | Shellui
heading: "Presentazione di Shellui"
lede: "Shellui è una piattaforma open source per web app - una shell condivisa intorno al prodotto così rilasci l'app, non l'host chrome."
description: "Annuncio di Shellui, shell microfrontend open source con auth, layout, temi e i18n. v0.3.0 è sperimentale e usata su progetti reali."
date: 2026-08-19
author: Shellui
authorRole: La squadra Shellui
authorImage: /img/logo.png
category: Annuncio
image: /img/blog/introducing-shellui.jpg
imageAlt: Persona che tiene un adesivo
tags:
  - blog
---

The idea is a shared shell around your product: authentication, legal documents, sidebar navigation, modals, drawers, themes, toast notifications, multi-language support, and more. Pair it with the [identity-service](https://github.com/shellui/identity-service) backend or embed an [admin panel](https://github.com/shellui/admin) in the host.

Shellui v0.3.0 is experimental and used on real projects. Highlights include:

- **Authentication**: Sign-in flows, legal documents, and optional in-app admin tooling
- **Layout and chrome**: Layout modes, navigation, side drawers, and modal windows
- **Host extras**: Custom themes, toast notifications, multi-language support, offline support, cookie consent, and error reporting

It is framework agnostic and TypeScript-first. The packages are `@shellui/cli` for scaffolding and the dev server, `@shellui/core` for the React runtime, and `@shellui/sdk` for programmatic integration. The UI is built on Radix UI primitives, styled with Tailwind CSS, with i18next for translations.

## From scaffold to running app

Documentation lives at [docs.shellui.com](https://docs.shellui.com). The [playground](https://playground.shellui.com) lets you try the shell without scaffolding a repo. Source is on [GitHub](https://github.com/shellui).

{% quote "Shellui", "The Shellui team", "/img/logo.png" %}
"We will use this blog for release notes, architecture notes, and how the platform is evolving."
{% endquote %}

Start with the CLI, drop in your app, and keep the shared foundation in one place instead of rebuilding it for every product.

{% figure "/img/blog/introducing-shellui.jpg", "Person holding a hello sticker", "Hello from the official Shellui blog.", "1280", "854" %}

## Install, playground, or clone

Scaffold a project, open the playground, or clone the repos on GitHub. The shell is the part every web app needs - navigation, identity, admin, and storage - so you spend time on what makes the product unique.

This is the first post on the official blog. More notes on releases, architecture, and the roadmap will follow.
