---
layout: layouts/post.njk
title: Introducing Shellui | Shellui
heading: Introducing Shellui
lede: Every project needs the same sign-in, admin, and settings screens. Shellui builds them once, and it's free and open source for you too.
description: Why Shellui exists, how it stays free and open source, what ships today, and where it's going next.
date: 2026-10-28
author: Sébastien Barbier
authorRole: Creator of Shellui
authorImage: /img/authors/sebastien-barbier.webp
category: Story
image: /img/blog/introducing-shellui-1200x630.png
thumbnailLight: /img/blog/introducing-shellui-square-light.svg
thumbnailDark: /img/blog/introducing-shellui-square-dark.svg
heroLight: /img/blog/introducing-shellui-cover-light.svg
heroDark: /img/blog/introducing-shellui-cover-dark.svg
imageAlt: Shellui cover
ogImage: /img/blog/introducing-shellui-1200x630.png
ogImageAlt: Introducing Shellui
tags:
  - blog
---

Before work on the idea can begin, someone has to build sign-in, a members screen, settings, file uploads, and the emails that go with all of that. Then the next project needs them again, and the one after that.

Shellui is an answer to that loop. The goal is to reuse those features across projects, so each one is built once and every project gets it. The shared features have to be good enough that nobody misses writing them by hand.

## What Shellui is

Shellui is an open-source web app development platform. It's a microfrontend shell that wraps your application with shared navigation, authentication, storage, and administration.

Each of your apps loads in an iframe inside one shell. An app keeps its own framework and its own deployment. It talks to the shell through the Shellui SDK, and it gets the same navigation, sign-in, theme, and language as every other app around it. You can add a new app to a project without touching the others, and you can drop an old one the same way.

That's the plug and play part. The shell owns the common ground, so your app only has to contain your product.

## How Shellui stays free and open source

Shellui is MIT licensed. The source for every part lives on [GitHub](https://github.com/shellui): the core shell, identity-service, storage-service, email-service, hosting-service, the admin panel, and the playground.

You can self-host every one of those services. Nothing in the shell depends on a server run by someone else. A hosted version is on its way for teams who would rather not run the services themselves. It's invite-only for now, and you can [join the waitlist](/waitlist/) to hear when it opens. The self-hosted path stays first-class either way, because it's the one the project runs on.

## What exists today

You can use these today:

- **Apps and navigation**: shared navigation, seven layout modes, themes, languages, modals, drawers, toasts, and dialogs across your embedded apps, all driven by the Shellui SDK.
- **Authentication**: [identity-service](https://github.com/shellui/identity-service) handles sign-in for every app at once. It ships with 15 OAuth providers configured, plus OpenID Connect, SAML single sign-on, SCIM provisioning, magic links, and invitations.
- **Administration**: the [admin panel](https://github.com/shellui/admin) covers members, roles, company access, email settings, and webhooks. You can add your own screens next to the built-in ones.
- **Storage**: storage-service lets you upload, browse, and share files, with file permissions, share links, and storage limits.
- **Email**: email-service sends sign-in mail, invitations, event notices, newsletters, and broadcasts through Resend, Amazon SES, or SMTP. Sign-in mail runs on its own queue, so a large newsletter never delays a login link.
- **Web and desktop**: the Shellui CLI scaffolds a project and builds static files you host wherever you like. The same shell also packages as a desktop app with Tauri 2.

Open the [playground](https://playground.shellui.com) to see it running. When you want your own copy, the [quickstart](https://docs.shellui.com/quickstart) walks you through a self-hosted setup.

## Where it's going

Next is built-in AI APIs and Model Context Protocol (MCP) support in the shell, so your apps can talk to models and tools through one shared surface instead of wiring each integration alone.

After that comes a marketplace with app install: discover apps, add them to a project, and run them inside the same shell with the same navigation, sign-in, and administration.

You can follow all of this on [GitHub](https://github.com/shellui) and in the [changelog](/changelog/).

## Incentives over sales pressure

Shellui is the in-house stack behind the projects I ship. It is public so you can use it too, but it mostly runs internal work. That is a political choice as much as a technical one. There is no sales quota, no growth metric, and no roadmap bent toward what is easiest to sell. Features land because they are needed where the stack already runs, not because they close a deal.

The same stance shapes who holds the power:

- **Standalone services**: identity-service, storage-service, email-service, and hosting-service each run on their own. Use the ones you need and skip the rest.
- **Open source**: you can read every line, audit it, and fix it yourself if you have to. Nothing is hidden behind a closed component.
- **Self-hosting**: you run the services on your own infrastructure, with your own data, under the MIT licence.
- **No lock-in**: your apps stay ordinary web apps in their own frameworks, connected through the SDK. If you leave Shellui, your product leaves with you.

New features stay additive and off by default for the same reason. Your setup should not change unless you choose it to.

## Tools at a time of AI

Building Shellui was also how I learned to work with AI. Agents wrote the project end to end: they make implementation decisions, and they regularly review security and feedback. The challenge was learning how to define restrictions that steer those agents toward the outcomes the project needs.

Shellui is designed with AI in mind as well. The shell, the SDK boundary, and the standalone services are meant to stay clear and auditable, so people and agents can build inside the same rules without locking your product into someone else's stack.

## Try it

Shellui exists so you can spend your time on the part of each project that's actually new.

Try the [playground](https://playground.shellui.com), read the [docs](https://docs.shellui.com), or open an issue on [GitHub](https://github.com/shellui) if something doesn't work the way you expect. Share what you build.
