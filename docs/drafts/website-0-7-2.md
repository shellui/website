---
# DRAFT. Not built: lives outside src/. Move to src/blog/ only after Sébastien approves.
layout: layouts/post.njk
title: "What's new on shellui.com: security page and a clearer homepage"
heading: A clearer homepage and a security page
lede: Website 0.7.1 and 0.7.2 make it easier to see what Shellui is, who it's for, and how it handles your data.
description: "Website 0.7.1 and 0.7.2 add a security page, a real playground screenshot, a who-it's-for section and two new guides for internal tools and DIY builds."
date: 2026-10-30
author: Sébastien Barbier
authorRole: Creator of Shellui
authorImage: /img/authors/sebastien-barbier.webp
category: Release
imageAlt: Shellui playground screenshot
tags:
  - blog
---

The first version of shellui.com explained the features. It did a worse job at three things: showing the product, saying who it's for, and explaining how it treats your data. Website 0.7.1 and 0.7.2 fix that.

## See the real shell

The homepage now opens with a screenshot of the [playground](https://playground.shellui.com), in light and dark. The sidebar, settings, and dialogs you see come from the shell. The page in the middle is a plain React app. Next to it, a new button takes you straight to the playground, so you can click around before you install anything.

## Who it's for

A new section names the three groups Shellui fits best:

- **Agencies** that start every client project with the same sign-in, members, and settings.
- **Teams with internal tools** that want one sign-in and one navigation across dashboards and admin screens.
- **Workshops and demos** where people need a working shell in a browser, fast.

Two new pages go deeper: [An app shell for internal tools](/internal-tools/) and [Shellui vs building it yourself](/shellui-vs-building-it-yourself/).

## A security page

Shellui handles sign-in, so you should know how it does that. The new [security page](/security/) lists what the code does today:

- Magic-link URLs and tokens never go into webhooks, logs, or storage.
- One-time tokens and deploy tokens are stored as SHA-256 hashes. Deploy tokens are shown once.
- Access logs skip query strings, and error reports strip the Referer header.
- Staff accounts cannot use magic links, and staff flags only change in Django admin.

There is also a `security.txt` file at `/.well-known/security.txt`, so researchers know where to write.

## Smaller fixes

- The homepage h1 now names Shellui, and pages carry breadcrumb data for search engines.
- Long code snippets no longer push the page sideways on phones.
- Tab lists on the feature pages pass accessibility checks.

Everything stays MIT licensed and self-hostable. If something on the site looks wrong, write to [contact@shellui.com](mailto:contact@shellui.com).
