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

Every new project tends to start the same way. Before work on the idea itself can begin, someone has to build sign-in, a members screen, settings, file uploads, and the emails that go with all of that. Then the next project needs them again, and the one after that.

Shellui is an answer to that loop. The goal is to mutualise those features across projects, so each one is built once and every project gets it. It has to be plug and play, and the shared features have to be good enough that nobody misses writing them by hand.

## What Shellui is

Shellui is an open-source web app development platform. It's a microfrontend shell that wraps your application with shared navigation, authentication, storage, and administration.

Each of your apps loads in an iframe inside one shell. An app keeps its own framework and its own deployment. It talks to the shell through `@shellui/sdk`, and it gets the same navigation, sign-in, theme, and language as every other app around it. You can add a new app to a project without touching the others, and you can drop an old one the same way.

That's the plug and play part. The shell owns the common ground, so your app only has to contain your product.

## How Shellui stays free and open source

Shellui is MIT licensed. The source for every part lives on [GitHub](https://github.com/shellui): the core shell, identity-service, storage-service, email-service, hosting-service, the admin panel, and the playground.

You can self-host every one of those services. Nothing in the shell depends on a server run by someone else. A hosted version is on its way for teams who would rather not run the services themselves. It's invite-only for now, and you can [join the waitlist](/waitlist/) to hear when it opens. The self-hosted path stays first-class either way, because it's the one the project runs on.

## What exists today

Here's what you can use right now.

- **Apps and navigation**: shared navigation, seven layout modes, themes, languages, modals, drawers, toasts, and dialogs across your embedded apps, all driven by `@shellui/sdk`.
- **Authentication**: [identity-service](https://github.com/shellui/identity-service) handles sign-in for every app at once. It ships with 15 OAuth providers configured, plus OpenID Connect, SAML single sign-on, SCIM provisioning, magic links, and invitations.
- **Administration**: the [admin panel](https://github.com/shellui/admin) covers members, roles, company access, email settings, and webhooks. You can add your own screens next to the built-in ones.
- **Storage**: storage-service lets you upload, browse, and share files, with file permissions, share links, and storage limits.
- **Email**: email-service sends sign-in mail, invitations, event notices, newsletters, and broadcasts through Resend, Amazon SES, or SMTP. Sign-in mail runs on its own queue, so a large newsletter never delays a login link.
- **Web and desktop**: `@shellui/cli` scaffolds a project and builds static files you host wherever you like. The same shell also packages as a desktop app with Tauri 2.

The fastest way to see it is the [playground](https://playground.shellui.com). When you want your own copy, the [quickstart](https://docs.shellui.com/quickstart) walks you through a self-hosted setup.

## Where it's going

The next big piece of work is regional sessions. Today the shell has one backend and one session, and it sends that session to every trusted app. To run apps in more than one region, the shell needs a backend per app and a separate session per region, so a regional app only ever receives its own URL and its own token. The rule for that work is strict: every change is additive and off by default. If you configure nothing new, your stack behaves exactly as it does today.

Self-hosting is also getting a lot shorter. There's an open issue to provide a single Docker Compose file that runs all of Shellui, so you can start the whole stack with one command instead of setting up each service by hand.

On the shell side, an SDK `openExternal` call is planned, so your apps can open external links through the shell. That matters most on desktop, where the shell decides how a link leaves the app.

You can follow all of this in the open on [GitHub](https://github.com/shellui) and in the [changelog](/changelog/).

## Designed not to fail

Shellui runs every project its author builds. That one fact shapes most of the design decisions. If a release breaks something, it breaks that work first, so there's every reason to keep it stable.

Making it public was the obvious next step. The features were already built once, and sharing them costs nothing extra. More people using it also means more eyes on the code and better ideas than one person would have alone.

A few choices keep Shellui from becoming a single point of failure for you:

- **Standalone services.** identity-service, storage-service, email-service, and hosting-service each run on their own. Use the ones you need and skip the rest.
- **Open source.** You can read every line, audit it, and fix it yourself if you have to. Nothing is hidden behind a closed component.
- **Self-hosting.** You run the services on your own infrastructure, with your own data, under the MIT licence.
- **No lock-in.** Your apps stay ordinary web apps in their own frameworks, connected through the SDK. If you leave Shellui, your product leaves with you.

That's also why new features land as additive and off by default. A setup that works today should keep working after you upgrade.

## Have fun with it

Shellui exists so you can spend your time on the part of each project that's actually new.

Try the [playground](https://playground.shellui.com), read the [docs](https://docs.shellui.com), or open an issue on [GitHub](https://github.com/shellui) if something doesn't work the way you expect. Have fun with it, and share what you build.
