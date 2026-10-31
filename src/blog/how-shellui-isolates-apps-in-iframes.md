---
layout: layouts/post.njk
title: "Iframe micro-frontends in Shellui: sandbox and postMessage"
heading: How Shellui isolates apps in iframes
lede: Every Shellui app runs in its own sandboxed iframe and talks to the shell through one message contract. Here is how that boundary works, what it protects, and where same-origin apps still need care.
description: "How Shellui sandboxes micro-frontends in iframes, the postMessage contract and checks its SDK uses, and where same-origin apps still need care."
date: 2026-10-31
author: Shellui Team
authorRole: Shellui maintainers
category: Engineering
image: /img/blog/how-shellui-isolates-apps-in-iframes-1200x630.png
thumbnailLight: /img/blog/how-shellui-isolates-apps-in-iframes-square-light.svg
thumbnailDark: /img/blog/how-shellui-isolates-apps-in-iframes-square-dark.svg
heroLight: /img/blog/how-shellui-isolates-apps-in-iframes-cover-light.svg
heroDark: /img/blog/how-shellui-isolates-apps-in-iframes-cover-dark.svg
imageAlt: A shell window with a sidebar and two app frames with dashed borders, one sending a message to the shell
ogImage: /img/blog/how-shellui-isolates-apps-in-iframes-1200x630.png
ogImageAlt: Iframe micro-frontends in Shellui
tags:
  - blog
---

When you add an app to Shellui, you hand it a place inside someone else's page. That raises fair questions. Can my app break the shell? Can another app read my data? What happens when a message arrives from somewhere it shouldn't?

This post answers those questions. It covers how Shellui composes apps with iframes, how the SDK talks to the shell with messages, the message types you will meet, and the checks each message passes. It also covers the parts that are not fully isolated yet, because you should know where the boundary is before you rely on it.

The short version:

- **Own origin:** when your app runs on its own origin, the browser keeps it out of the shell, and the SDK checks every message on top of that.
- **Shell origin:** when your app is served from the shell's origin, which is the production default, treat it as part of the shell.
- **Less-trusted apps:** give them a separate origin, a `frame-ancestors` policy and BFF auth.

## Micro-frontends, the iframe way

Shellui is a micro-frontend shell. In the vocabulary of Martin Fowler's [Micro Frontends](https://martinfowler.com/articles/micro-frontends.html) article, the shell is the **container application** and each of your apps is a **micro frontend**: a frontend built, versioned and deployed on its own. The article walks through the main ways to put them together: server-side composition, build-time packages, runtime JavaScript, Web Components, and iframes. [micro-frontends.org](https://micro-frontends.org/) and Luca Mezzalira's book [Building Micro-Frontends](https://www.buildingmicrofrontends.com/) cover the same ground, including the vertical split Shellui uses, where each app owns whole screens.

Each option trades isolation against integration. Runtime JavaScript and Web Components share one document, so apps can load fast and share state, but they also share one global scope and one stylesheet cascade. A bad CSS selector or a library version clash in one app can break another.

Shellui picks **iframe composition**. Each app gets its own browsing context: its own document, its own JavaScript globals, its own CSS. Your app can use React 19 while the next one uses Vue 3 or plain HTML. Neither one can restyle the other by accident, and an uncaught error in one app stays in that frame. A busy loop is different: a frame on the same site as the shell can share a thread with it, so a frozen app can freeze the page.

{% themedImage { light: "/img/blog/how-shellui-isolates-apps-in-iframes-architecture-light.svg", dark: "/img/blog/how-shellui-isolates-apps-in-iframes-architecture-dark.svg", mobileLight: "/img/blog/how-shellui-isolates-apps-in-iframes-architecture-mobile-light.svg", mobileDark: "/img/blog/how-shellui-isolates-apps-in-iframes-architecture-mobile-dark.svg", width: 1200, height: 675, alt: "The shell owns the session, theme and language, toasts and dialogs, the storage picker, and modals. Your app runs in a sandboxed iframe and exchanges postMessage requests and replies with the shell." } %}

The shell owns everything that should feel the same across apps: the session, theme and language, toasts and dialogs, modals and drawers, and the storage picker. Your app owns its own screens. The SDK never reaches into the shell's internals, and on its own origin your app cannot either.

## What the iframe sandbox allows

An iframe on its own already separates documents. The HTML [`sandbox` attribute](https://html.spec.whatwg.org/multipage/iframe-embed-object.html#attr-iframe-sandbox) goes further: it starts from "deny everything" and lets the embedder add back only the capabilities the frame needs. MDN's [iframe reference](https://developer.mozilla.org/en-US/docs/Web/HTML/Reference/Elements/iframe) lists every token, and web.dev's [Play safely in sandboxed IFrames](https://web.dev/articles/sandboxed-iframes) (2013) is still one of the clearest explanations of the model.

Shellui's content frame uses this set:

```html
<iframe sandbox="allow-same-origin allow-scripts allow-forms allow-popups" ...>
```

What that means for your app:

- **Allowed:** scripts and forms run, because your app is an app.
- **Popups:** they open, but they stay sandboxed. Shellui removed `allow-popups-to-escape-sandbox`, so a window your app opens, including an OAuth or payment popup, inherits the same restrictions.
- **Top-level navigation:** blocked. Without `allow-top-navigation`, your app cannot send the whole tab somewhere else. It asks the shell instead.
- **Native dialogs:** `alert`, `confirm` and `prompt` are blocked, because there is no `allow-modals`. Use `shellui.dialog` instead.
- **Other capabilities:** downloads and pointer lock are blocked. The iframe has no `allow` attribute either, so fullscreen, camera and geolocation are off for apps on another origin.

`allow-same-origin` deserves a closer look. We come back to it in "Where the boundary is today".

## Why the SDK is built on postMessage

The browser gives framed documents one supported way to talk across that boundary: [`window.postMessage`](https://developer.mozilla.org/en-US/docs/Web/API/Window/postMessage). The sender passes a message and a `targetOrigin`. The receiver gets a `message` event with the data, the sender's `origin` and a reference to the sender's window.

We built the [Shellui SDK](https://docs.shellui.com/sdk/) on top of that one primitive. The contract between your app and the shell is a list of messages, not a shared object. The shell does not expose its internals to your app, and your app does not need to know how the shell renders a toast. It asks for one.

In your code, the messages sit behind function calls:

```ts
import { shellui } from '@shellui/sdk';

await shellui.init();
shellui.toast({ title: 'Changes saved', type: 'success' });
shellui.navigate('/billing');
```

For pages that only need theme, language and navigation, `shellui.tiny.js` does the same handshake in under 3 KB gzipped.

## The handshake

The shell does not push anything into a frame that has not asked. When your app calls `init()`, the SDK starts a request-driven handshake:

1. Your app posts `SHELLUI_SETTINGS_REQUESTED`, and the shell marks the frame as live.
2. The shell replies with `SHELLUI_SETTINGS`: theme, language, region, layout insets and, if signed in, a snapshot of the user.
3. Your app posts `SHELLUI_INITIALIZED` to say it is ready.

From then on, whenever something changes, for example when the user switches to dark mode, the shell sends a fresh `SHELLUI_SETTINGS` to every live frame.

{% themedImage { light: "/img/blog/how-shellui-isolates-apps-in-iframes-message-flow-light.svg", dark: "/img/blog/how-shellui-isolates-apps-in-iframes-message-flow-dark.svg", mobileLight: "/img/blog/how-shellui-isolates-apps-in-iframes-message-flow-mobile-light.svg", mobileDark: "/img/blog/how-shellui-isolates-apps-in-iframes-message-flow-mobile-dark.svg", width: 1200, height: 675, alt: "Sequence of messages between the shell and your app: settings requested, settings, initialized, toast, toast action, then fresh settings after a theme change." } %}

## The message types

Every message is an object with a `type` that starts with `SHELLUI_`, an optional `payload`, and `from` and `to` fields that record the path through nested frames. You rarely send them by hand, but knowing them helps when you read logs or debug. The [SDK docs](https://docs.shellui.com/sdk/) have the full list; these are the main families, without the `SHELLUI_` prefix.

| Family | App to shell | Shell to app |
| --- | --- | --- |
| Handshake | `SETTINGS_REQUESTED`, `INITIALIZED` | `SETTINGS` |
| Navigation | `NAVIGATE`, `URL_CHANGED` | `REFRESH_PAGE` |
| Toasts | `TOAST`, `TOAST_UPDATE` | `TOAST_ACTION`, `TOAST_CANCEL`, `TOAST_CLEAR` |
| Dialogs | `DIALOG`, `DIALOG_UPDATE` | `DIALOG_OK`, `DIALOG_CANCEL`, `DIALOG_SECONDARY` |
| Overlays | `OPEN_MODAL`, `CLOSE_MODAL`, `OPEN_DRAWER`, `CLOSE_DRAWER`, `OVERLAY_SIZE` | |
| Header actions | `ACTIONS_SET`, `ACTIONS_CLEAR` | `ACTION` |
| Layout | `CONTENT_SCROLL` | `LAYOUT_CHROME` |
| Account | `LOGIN`, `LOGOUT`, `UPDATE_PROFILE_REQUEST`, `DELETE_ACCOUNT_REQUEST` | `UPDATE_PROFILE_RESULT`, `DELETE_ACCOUNT_RESULT` |
| Storage | `STORAGE_REQUEST`, `SELECT_STORAGE` | `STORAGE_RESPONSE`, `SELECT_STORAGE_RESULT` |
| AI | `AI_REQUEST` | `AI_STREAM`, `AI_RESPONSE` |

A few notes:

- **Callbacks:** when the user clicks a toast button or a dialog option, the shell sends the matching message back, so your callback runs in your app.
- **Refresh:** `REFRESH_PAGE` asks the top window to reload the whole page, for example after a new shell version is installed.
- **Nested apps:** an app can host another Shellui app with [`createAppFrame` or `ShelluiFrame`](https://docs.shellui.com/features/app-frames/). `CHILD_FRAME_REGISTER`, `CHILD_FRAME_UNREGISTER` and `CHILD_FRAME_SESSION` let the host app relay settings and a session to the child, for origins the shell config allows. Shellui does not add a `sandbox` attribute to those nested frames, so set one yourself.

## How the SDK checks each incoming message

Anyone can call `postMessage` on a window they hold a reference to. So the receiving side matters most. The [OWASP HTML5 Security Cheat Sheet](https://cheatsheetseries.owasp.org/cheatsheets/HTML5_Security_Cheat_Sheet.html) says to check the origin, treat data as untrusted, and never use `*` as a target. Shellui's message listener follows that advice.

{% themedImage { light: "/img/blog/how-shellui-isolates-apps-in-iframes-trust-checks-light.svg", dark: "/img/blog/how-shellui-isolates-apps-in-iframes-trust-checks-dark.svg", mobileLight: "/img/blog/how-shellui-isolates-apps-in-iframes-trust-checks-mobile-light.svg", mobileDark: "/img/blog/how-shellui-isolates-apps-in-iframes-trust-checks-mobile-dark.svg", width: 1200, height: 675, alt: "Four checks in a row: message shape, origin allowlist, known source, and privilege. Messages with the wrong shape are ignored; messages that fail the other checks are dropped." } %}

1. **Shape:** the data must be an object whose `type` starts with `SHELLUI_`. Anything else is ignored silently.
2. **Origin:** `event.origin` must be on an allowlist. It holds the shell's own origin, the origins of the apps, admin pages and storage URLs in your config, and any extra origins you add with `security.allowedMessageOrigins`. An opaque `null` origin never passes.
3. **Source:** `event.source` must be a frame the shell registered, the parent window, or the same window. A message from some other window is dropped even if its origin looks right.
4. **Privilege:** messages that act on the user, like login, logout, profile, storage, toasts, dialogs and navigation, are only accepted from a registered app frame or the shell itself. A page that embeds the shell, or your app, in its own iframe cannot send them.

One nuance: inside your app, ordinary updates that come straight from the parent window skip the origin check when the browser cannot name the parent's origin. That proves only who framed your app, not that it is your shell. Set `frame-ancestors` on your app so only your shell can frame it.

When a message fails checks 2 to 4, it is dropped. With developer features and the `shellsdk` log namespace turned on, the SDK also logs `Rejected untrusted SHELLUI message` with the reason.

Sending is held to the same standard. The SDK always passes an exact `targetOrigin`, resolved from the frame URL or the known parent. If it cannot work out the origin, it does not send. It never falls back to `*`.

## What your app gets, and what it doesn't

The session is the most sensitive thing the shell holds, so it is shared on purpose, not by default.

- **Refresh token:** never sent to an app.
- **Access token:** Shellui's own admin pages, the Files app and the Settings frame get it by default. Your apps opt in with `safeForAuthToken: true` on their navigation item. If an app talks to its own identity server, it gets that server's token, not the shell's.
- **Service URLs:** an app gets the shell's storage, email and hosting URLs unless its navigation item sets its own. When the item names a different identity server and leaves a service out, the app gets no URL for it.

Over the message channel, an app that only needs the user's name and theme never receives a credential. Apps that share the shell's origin are the exception, covered next.

## Where the boundary is today

The sandbox includes `allow-same-origin` together with `allow-scripts`. The HTML spec warns about that pair: when the framed page shares the shell's origin, its scripts can reach the parent document and even remove the sandbox attribute. We keep `allow-same-origin` today because apps need their own cookies, `localStorage` and a real origin for the message checks above.

What this means in practice:

- **Different origin:** when your app runs on a different origin from the shell, as it does in local development (`localhost:4000` for the shell, `localhost:5173` for your app), the browser's same-origin policy keeps it out of the shell's document and storage. The sandbox and message checks sit on top of that.
- **Same origin:** a default production build serves apps from `/app/` on the shell's own origin. That keeps framing first-party, but the sandbox becomes a guard rail, not a wall. A same-origin frame can reach the shell page, read the refresh token from `sessionStorage` and act as the signed-in user. Same-origin apps also share `localStorage`, IndexedDB and cookies with the shell and with each other. That is the answer to "Can another app read my data?": yes, if both run on the shell's origin.

So the rule is the one every micro-frontend setup lives by: only embed apps you trust, and give apps you trust less their own origin. To do that:

- **Own origin:** set an absolute `https://` URL in the app's navigation `url`, on a host of its own, for example `https://billing.example.com`. Watch out for cookies scoped to a shared parent domain like `.example.com`: every subdomain receives them.
- **Framing policy:** send a [`frame-ancestors`](https://developer.mozilla.org/en-US/docs/Web/HTTP/Reference/Headers/Content-Security-Policy/frame-ancestors) policy from the app, so only your shell can frame it:

  ```http
  Content-Security-Policy: frame-ancestors https://shell.example.com
  ```

  Shellui's Next.js and Nuxt starters set `frame-ancestors`, but only for `localhost:4000` in development. Add your production shell origin yourself.
- **BFF auth:** turn on [BFF auth](https://docs.shellui.com/features/security/) so the refresh token lives in an HttpOnly cookie that no script can copy out. A same-origin app can still use the session through the shell's routes, so pair BFF with a separate origin.

We document all of this, including the remaining work, on the [companion isolation](https://docs.shellui.com/features/companion-isolation/) page. Dropping `allow-same-origin` when shell and app share an origin, and an origin allowlist for navigation in the config schema, are both on that list.

## Why Shellui chose iframes

Iframes are not the most common way to build micro-frontends. They are the one model where the browser can enforce the separation, once each app has its own origin. Each team can ship on its own schedule, and the contract is small enough to write down in one post. A list of message types is something you can audit, log and reason about.

Iframes have costs too. Each app loads its own framework, and focus, keyboard navigation and accessibility across frames need care. Deep links need syncing between the frame and the address bar, which is why `SHELLUI_URL_CHANGED` exists.

To see it working, open the [playground](https://playground.shellui.com) and run this in your browser's developer tools console:

```js
addEventListener('message', (e) => {
  if (e.data?.type?.startsWith('SHELLUI_')) console.log(e.origin, e.data);
});
```

That shows messages from the app to the shell. Switch the console context to the app's iframe and run it again to see the other direction. The code behind all of this is on [GitHub](https://github.com/shellui/shellui), in `packages/sdk/src/utils/messageSecurity.ts` and `packages/core/src/components/contentIframeSandbox.ts`.
