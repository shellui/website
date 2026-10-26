---
layout: layouts/post.njk
title: Introducing Shellui | Shellui
heading: Introducing Shellui
lede: Shellui is an open-source web app development platform. It wraps your app in a shared shell with navigation, authentication, administration, and storage, so you build the product, not the basics.
description: An introduction to Shellui as of v0.7, the open-source web app platform with navigation, authentication, administration, storage, and email built in.
date: 2026-10-26
author: Shellui
authorRole: The Shellui team
authorImage: /img/logo.png
category: Announcement
image: /img/blog/introducing-shellui-1200x630.png
heroImage: /img/blog/introducing-shellui
imageAlt: Shellui cover
ogImage: /img/blog/introducing-shellui-1200x630.png
ogImageAlt: Introducing Shellui
tags:
  - blog
---

Shellui loads each of your web apps in an iframe inside one shell. Every app keeps its own framework and deployment, and shares the same navigation, sign-in, and settings. Here is what you can use as of v0.7.

## What Shellui does today

- **Apps and navigation**: Shared navigation, layout modes, themes, languages, modals, drawers, and toasts across embedded apps, driven by `@shellui/sdk`.
- **Authentication**: Sign in once with [identity-service](https://github.com/shellui/identity-service): OAuth, OpenID Connect, SAML single sign-on, SCIM, magic links, and invitations. You can connect Supabase Auth instead.
- **Administration**: A shared [admin panel](https://github.com/shellui/admin) for members, company access, email, and webhooks. Add your own tools next to the built-in screens.
- **Storage**: Upload, browse, and share files through storage-service, with file permissions, share links, and storage limits.
- **Email**: email-service sends sign-in mail, invitations, event notices, newsletters, and broadcasts through Resend, Amazon SES, or SMTP. Sign-in mail has its own queue.
- **Web and desktop**: `@shellui/cli` scaffolds a project and builds static files you host yourself, or packages the same shell as a desktop app with Tauri 2.

## Get started

Shellui is free and MIT licensed. Self-host it today with the [quickstart](https://docs.shellui.com/quickstart), try the [playground](https://playground.shellui.com), or read the source on [GitHub](https://github.com/shellui). A hosted version is coming: [join the waitlist](/waitlist/) to hear when it opens.

We will use this blog for release notes and architecture notes.
