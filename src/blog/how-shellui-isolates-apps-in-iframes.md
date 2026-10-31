---
layout: layouts/post.njk
title: "How Shellui runs your apps in iframes and talks to them with messages"
heading: Inside the frame
lede: Every Shellui app runs in its own sandboxed iframe and talks to the shell through one message contract. Here is how that boundary works, what it protects, and where its limits are.
description: "How Shellui embeds micro-frontends in sandboxed iframes, why the SDK speaks postMessage, the message types it uses, and the checks every message passes."
date: 2026-10-31
author: Shellui Team
authorRole: Shellui maintainers
category: Engineering
image: /img/blog/how-shellui-isolates-apps-in-iframes-1200x630.png
thumbnailLight: /img/blog/how-shellui-isolates-apps-in-iframes-square-light.svg
thumbnailDark: /img/blog/how-shellui-isolates-apps-in-iframes-square-dark.svg
heroLight: /img/blog/how-shellui-isolates-apps-in-iframes-cover-light.svg
heroDark: /img/blog/how-shellui-isolates-apps-in-iframes-cover-dark.svg
imageAlt: A browser window with a sidebar and a sandboxed app frame marked by a dashed gold border
ogImage: /img/blog/how-shellui-isolates-apps-in-iframes-1200x630.png
ogImageAlt: How Shellui runs your apps in iframes
tags:
  - blog
---

When you add an app to Shellui, you hand it a place inside someone else's page. That raises fair questions. Can my app break the shell? Can another app read my data? What happens when a message arrives from somewhere it shouldn't?

This post answers those questions. It covers how Shellui composes apps with iframes, how the SDK talks to the shell with messages, the message types you will meet, and the checks each message passes. It also covers the parts that are not fully isolated yet, because you should know where the boundary is before you rely on it.

## Micro-frontends, the iframe way

Shellui is a micro-frontend shell. In micro-frontend terms, the shell is the **host** (sometimes called the container application) and each of your apps is a **remote**: a frontend built, versioned and deployed on its own. Martin Fowler's [Micro Frontends](https://martinfowler.com/articles/micro-frontends.html) article and [micro-frontends.org](https://micro-frontends.org/) describe the main ways to stitch remotes together: build-time packages, runtime JavaScript, Web Components, and iframes.

Each option trades isolation against integration. Runtime JavaScript and Web Components share one document, so apps can load fast and share state, but they also share one global scope and one stylesheet cascade. A bad CSS selector or a library version clash in one app can break another.

Shellui picks **iframe composition**. Each app gets its own browsing context: its own document, its own JavaScript globals, its own CSS. Your app can use React 19 while the next one uses Vue 3 or plain HTML. Neither one can restyle the other by accident, and an uncaught error in one app stays in that frame.

{% themedImage { light: "/img/blog/how-shellui-isolates-apps-in-iframes-architecture-light.svg", dark: "/img/blog/how-shellui-isolates-apps-in-iframes-architecture-dark.svg", width: 1200, height: 675, alt: "The Shellui shell owns navigation, session, theme, toasts and storage. Your app runs inside a sandboxed iframe and sends requests to the shell with postMessage." } %}

The shell owns everything that should feel the same across apps: navigation, the session, theme and language, toasts and dialogs, and the storage picker. Your app owns its own screens. The two only meet through messages.

## The sandbox attribute

An iframe on its own already separates documents. The HTML [`sandbox` attribute](https://html.spec.whatwg.org/multipage/iframe-embed-object.html#attr-iframe-sandbox) goes further: it starts from "deny everything" and lets the embedder add back only the capabilities the frame needs. MDN's [iframe reference](https://developer.mozilla.org/en-US/docs/Web/HTML/Reference/Elements/iframe) lists every token, and web.dev's [Play safely in sandboxed IFrames](https://web.dev/articles/sandboxed-iframes) is still one of the clearest explanations of the model.

Shellui's content frame uses this set:

```html
<iframe sandbox="allow-same-origin allow-scripts allow-forms allow-popups" ...>
```

What that means for your app:

- **Scripts and forms run**, because your app is an app.
- **Popups open, but stay sandboxed.** Shellui removed `allow-popups-to-escape-sandbox`, so a window your app opens inherits the same restrictions.
- **No top-level navigation.** Without `allow-top-navigation`, your app cannot send the whole browser tab somewhere else. To change the page, it asks the shell.
- **No plugins, no pointer lock, no other capabilities** that are not on the list.

`allow-same-origin` deserves a closer look, and we come back to it below.

## Why messages

The browser gives framed documents one supported way to talk across that boundary: [`window.postMessage`](https://developer.mozilla.org/en-US/docs/Web/API/Window/postMessage). The sender passes a message and a `targetOrigin`. The receiver gets a `message` event with the data, the sender's `origin` and a reference to the sender's window.

We built the [Shellui SDK](https://docs.shellui.com/sdk) on top of that one primitive. It means the contract between your app and the shell is a list of messages, not a shared object. The shell never exposes its internals to your app, and your app does not need to know how the shell renders a toast. It asks for one.

In your code, the messages are hidden behind plain function calls:

```ts
import { shellui } from '@shellui/sdk';

await shellui.init();
shellui.toast({ title: 'Changes saved', type: 'success' });
shellui.navigate('/billing');
```

For pages that only need theme, language and navigation, `shellui.tiny.js` does the same handshake in about 1 KB gzipped.

## The handshake

The shell does not push anything into a frame that has not asked. When your app calls `init()`, the SDK starts a request-driven handshake:

1. Your app posts `SHELLUI_SETTINGS_REQUESTED`.
2. The shell replies with `SHELLUI_SETTINGS`: theme, language, region, layout insets and, if signed in, a snapshot of the user.
3. Your app posts `SHELLUI_INITIALIZED`, and the shell marks the frame as live.

From then on, the shell sends `SHELLUI_SETTINGS_UPDATED` whenever something changes, for example when the user switches to dark mode.

{% themedImage { light: "/img/blog/how-shellui-isolates-apps-in-iframes-message-flow-light.svg", dark: "/img/blog/how-shellui-isolates-apps-in-iframes-message-flow-dark.svg", width: 1200, height: 675, alt: "Sequence of messages between the shell and your app: settings requested, settings, initialized, toast, toast action, settings updated." } %}

## The message types

Every message is an object with a `type` that starts with `SHELLUI_` and an optional `payload`. They fall into a few families. You rarely send them by hand, but knowing them helps when you read logs or debug.

**Handshake and settings.** `SHELLUI_SETTINGS_REQUESTED`, `SHELLUI_SETTINGS`, `SHELLUI_SETTINGS_UPDATED` and `SHELLUI_INITIALIZED`, as described above.

**Navigation.** `SHELLUI_NAVIGATE` asks the shell to open a route. `SHELLUI_URL_CHANGED` tells the shell your internal route changed, so the address bar and the sidebar stay in sync. The shell can send `SHELLUI_REFRESH_PAGE` to reload your app, for example after a new version is installed.

**Feedback.** `SHELLUI_TOAST`, `SHELLUI_TOAST_UPDATE` and `SHELLUI_TOAST_CLEAR` drive notifications. `SHELLUI_DIALOG` and `SHELLUI_DIALOG_UPDATE` open a confirmation dialog. The shell answers with `SHELLUI_TOAST_ACTION`, `SHELLUI_DIALOG_OK`, `SHELLUI_DIALOG_CANCEL` or `SHELLUI_DIALOG_SECONDARY`, so your callback runs in your app.

**Overlays and chrome.** `SHELLUI_OPEN_MODAL`, `SHELLUI_CLOSE_MODAL`, `SHELLUI_OPEN_DRAWER` and `SHELLUI_CLOSE_DRAWER` show another app in a modal or drawer. `SHELLUI_ACTIONS_SET` and `SHELLUI_ACTIONS_CLEAR` place buttons in the shell header. `SHELLUI_CONTENT_SCROLL` and `SHELLUI_LAYOUT_CHROME` keep floating layouts aligned.

**Account.** `SHELLUI_LOGIN` and `SHELLUI_LOGOUT` start sign-in and sign-out in the shell. `SHELLUI_UPDATE_PROFILE_REQUEST` and `SHELLUI_DELETE_ACCOUNT_REQUEST` ask the shell to run those flows, and the result comes back as `SHELLUI_UPDATE_PROFILE_RESULT` or `SHELLUI_DELETE_ACCOUNT_RESULT`.

**Storage.** `SHELLUI_STORAGE_REQUEST` and `SHELLUI_STORAGE_RESPONSE` read and write app storage through the shell. `SHELLUI_SELECT_STORAGE` opens the file picker, and `SHELLUI_SELECT_STORAGE_RESULT` returns the user's choice.

**AI.** `SHELLUI_AI_REQUEST`, `SHELLUI_AI_STREAM` and `SHELLUI_AI_RESPONSE` let an app send AI requests through the shell and receive the answer, streamed or whole.

**Nested apps.** An app can host another Shellui app with [`createAppFrame` or `ShelluiFrame`](https://docs.shellui.com/features/app-frames). `SHELLUI_CHILD_FRAME_REGISTER`, `SHELLUI_CHILD_FRAME_UNREGISTER` and `SHELLUI_CHILD_FRAME_SESSION` let the host app relay settings and a session to the child, for origins the shell config allows.

## Four checks on every message

Anyone can call `postMessage` on a window they hold a reference to. So the receiving side matters most, and the [OWASP HTML5 Security Cheat Sheet](https://cheatsheetseries.owasp.org/cheatsheets/HTML5_Security_Cheat_Sheet.html) is blunt about it: check the origin, treat data as untrusted, and never use `*` as a target. Shellui's message listener follows that advice.

{% themedImage { light: "/img/blog/how-shellui-isolates-apps-in-iframes-trust-checks-light.svg", dark: "/img/blog/how-shellui-isolates-apps-in-iframes-trust-checks-dark.svg", width: 1200, height: 675, alt: "Four checks in a row: message shape, origin allowlist, known source, and privilege. A message that fails any check is logged and dropped." } %}

1. **Shape.** The data must be an object whose `type` starts with `SHELLUI_`. Anything else is ignored.
2. **Origin.** `event.origin` must be on an allowlist: the shell's own origin, the origins of the app frames it opened, and any extra origins you add with `security.allowedMessageOrigins`. An opaque `null` origin never passes. One nuance: inside your app, ordinary updates that come straight from the parent window are accepted even when the browser cannot name the parent's origin, because the source check already proves who sent them.
3. **Source.** `event.source` must be a frame the shell registered, the parent window, or the same window. A message from some other window is dropped even if its origin looks right.
4. **Privilege.** Messages that act on the user, like login, logout, profile, storage, toasts, dialogs and navigation, are only accepted from a registered app frame or the shell itself. A page that frames your app cannot send them.

When a message fails, the SDK logs `Rejected untrusted SHELLUI message` with the reason, which makes integration problems visible instead of silent.

Sending is held to the same standard. The SDK always passes an exact `targetOrigin`, resolved from the frame URL or the known parent. If it cannot work out the origin, it does not send. It never falls back to `*`.

## What your app gets, and what it doesn't

The session is the most sensitive thing the shell holds, so it is shared on purpose, not by default.

- **The refresh token is never sent to an app.**
- **The access token is opt-in.** An app only receives `settings.accessToken` when its navigation item sets `safeForAuthToken: true`. If the app talks to its own identity server, it gets that server's token, not the shell's.
- **Service URLs are scoped.** Storage, email and hosting URLs reach an app only when its config allows them.

Apps that only need the user's name and theme never see a credential at all.

## Where the boundary is today

The sandbox includes `allow-same-origin` together with `allow-scripts`. The HTML spec warns about that pair: when the framed page shares the shell's origin, its scripts can reach the parent document and even remove the sandbox attribute. We keep `allow-same-origin` today because apps need their own cookies, `localStorage` and a real origin for the message checks above.

What this means in practice:

- **When your app runs on a different origin** from the shell, as it does in local development (`localhost:4000` for the shell, `localhost:5173` for your app), the browser's same-origin policy keeps it out of the shell's document and storage. The sandbox and message checks sit on top of that.
- **In a default production build, apps are served from `/app/` on the shell's own origin.** That keeps framing first-party and cookies straightforward, but it means the sandbox is a guard rail, not a wall. Code in that frame runs with the shell's origin and could read the shell's `sessionStorage`, which holds the refresh token.

So the rule is the one every micro-frontend setup lives by: **only embed apps you trust, and give apps you trust less their own origin.** Two settings help:

- Serve each app from its own origin, and set [`frame-ancestors`](https://developer.mozilla.org/en-US/docs/Web/HTTP/Reference/Headers/Content-Security-Policy/frame-ancestors) in its Content-Security-Policy so only your shell can frame it. Shellui's Next.js and Nuxt starters already set `frame-ancestors` for development.
- Turn on [BFF auth](https://docs.shellui.com/features/security) so the refresh token lives in an HttpOnly cookie that no script can read.

We document all of this, including the remaining work, on the [companion isolation](https://docs.shellui.com/features/companion-isolation) page. Dropping `allow-same-origin` when shell and app share an origin, and an origin allowlist for navigation in the config schema, are both on that list.

## Why this design

Iframes are not the trendiest way to build micro-frontends. They are the one where the browser enforces the separation for you, where each team can ship on its own schedule, and where the contract is small enough to write down in one post. A list of message types is something you can audit, log and reason about.

To see it working, open the [playground](https://playground.shellui.com) and add a `message` listener in your browser's developer tools: every `SHELLUI_` message passes through it. The code behind all of this is on [GitHub](https://github.com/shellui/shellui), in `packages/sdk/src/utils/messageSecurity.ts` and `packages/core/src/components/contentIframeSandbox.ts`.
