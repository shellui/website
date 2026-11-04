---
layout: layouts/post.njk
title: "How Shellui sandboxes your apps"
heading: How Shellui sandboxes your apps
lede: Every Shellui app runs in its own sandboxed iframe and talks to the shell through one message contract. Here is how that boundary works, what it protects, and where same-origin apps still need care.
description: "How Shellui runs each micro frontend in a sandboxed iframe, the postMessage contract and checks its SDK uses, and where same-origin apps still need care."
date: 2026-11-04
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
ogImageAlt: How Shellui sandboxes your apps
tags:
  - blog
---

When you add an app to Shellui, it runs inside a page you don't own. Three questions follow. Can my app break the shell? Can another app read my data? What happens when a message arrives from somewhere it shouldn't?

Below: how Shellui frames apps, the messages the SDK exchanges with the shell, the four checks every message passes, and the one place where isolation is still incomplete. Know where the boundary is before you rely on it.

The short version:

- **Own origin:** when your app runs on its own origin, the browser keeps it out of the shell, and the SDK checks every message on top of that.
- **Shell origin:** when your app is served from the shell's origin, which is the production default, treat it as part of the shell.
- **Less-trusted apps:** give them a separate origin, a `frame-ancestors` policy and BFF auth.

## Micro frontends, the iframe way

Shellui is a micro frontend shell. In the vocabulary of Martin Fowler's [Micro Frontends](https://martinfowler.com/articles/micro-frontends.html) article, the shell is the **container application** and each of your apps is a **micro frontend**: a frontend built, versioned and deployed on its own. The article lists the ways to compose them: server-side, build-time packages, runtime JavaScript, Web Components and iframes. [micro-frontends.org](https://micro-frontends.org/) and Luca Mezzalira's book [Building Micro-Frontends](https://www.buildingmicrofrontends.com/) cover the same ground, including the vertical split Shellui uses: each app owns whole screens.

Every option trades isolation for integration. Runtime JavaScript and Web Components share one document: fast loads and shared state, but also one global scope and one cascade, so a bad selector or a version clash in one app breaks another.

Shellui picks **iframe composition**. Each app gets its own document, globals and CSS. Your app can use React 19 next to one in Vue 3 or plain HTML, neither can restyle the other, and an uncaught error stays in its frame. A busy loop is different: a frame on the same site as the shell can share a thread with it, so a frozen app can freeze the page.

{% themedImage { light: "/img/blog/how-shellui-isolates-apps-in-iframes-architecture-light.svg", dark: "/img/blog/how-shellui-isolates-apps-in-iframes-architecture-dark.svg", mobileLight: "/img/blog/how-shellui-isolates-apps-in-iframes-architecture-mobile-light.svg", mobileDark: "/img/blog/how-shellui-isolates-apps-in-iframes-architecture-mobile-dark.svg", width: 1200, height: 675, alt: "The shell owns the session, theme and language, toasts and dialogs, the storage picker, and modals. Your app runs in a sandboxed iframe and exchanges postMessage requests and replies with the shell." } %}

The shell owns what should feel the same everywhere: session, theme, language, toasts, dialogs, modals, drawers and the storage picker. Your app owns its screens.

## What the iframe sandbox allows

An iframe already separates documents. The HTML [`sandbox` attribute](https://html.spec.whatwg.org/multipage/iframe-embed-object.html#attr-iframe-sandbox) goes further: it starts from "deny everything" and lets the embedder add back only the capabilities the frame needs. MDN's [iframe reference](https://developer.mozilla.org/en-US/docs/Web/HTML/Reference/Elements/iframe) lists every token, and web.dev's [Play safely in sandboxed IFrames](https://web.dev/articles/sandboxed-iframes) (2013) still explains the model best.

Shellui's content frame uses this set:

```html
<iframe sandbox="allow-same-origin allow-scripts allow-forms allow-popups" ...>
```

Scripts and forms run. Popups open but inherit the sandbox, because Shellui removed `allow-popups-to-escape-sandbox`, so OAuth and payment popups stay restricted too. Everything else is off: top-level navigation (ask the shell with `shellui.navigate`), native `alert`, `confirm` and `prompt` (use `shellui.dialog`), downloads and pointer lock. The iframe has no `allow` attribute, so fullscreen, camera and geolocation are off for apps on another origin.

`allow-same-origin` is the token that matters most. We come back to it in "Where the boundary is today".

## Why the SDK is built on postMessage

Framed documents have one supported channel across that boundary: [`window.postMessage`](https://developer.mozilla.org/en-US/docs/Web/API/Window/postMessage). The sender passes a message and a `targetOrigin`. The receiver gets a `message` event with the data, the sender's `origin` and a reference to the sender's window.

The [Shellui SDK](https://docs.shellui.com/sdk/) is built on that one primitive. The contract is a list of messages, not a shared object: your app doesn't know how the shell renders a toast, it asks for one.

In your code, messages hide behind function calls:

```ts
import { shellui } from '@shellui/sdk';

await shellui.init();
shellui.toast({ title: 'Changes saved', type: 'success' });
shellui.navigate('/billing');
```

For pages that only need theme, language and navigation, `shellui.tiny.js` runs the handshake on load, with no `init()` call, in about 1 KB gzipped.

## The handshake

The shell pushes nothing into a frame that hasn't asked. `init()` starts the handshake:

1. Your app posts `SHELLUI_SETTINGS_REQUESTED`, and the shell marks the frame as live.
2. The shell replies with `SHELLUI_SETTINGS`: theme, language, region, layout insets and, if signed in, a snapshot of the user.
3. Your app posts `SHELLUI_INITIALIZED` to say it is ready.

After that, any change, such as a switch to dark mode, sends a fresh `SHELLUI_SETTINGS` to every live frame.

{% themedImage { light: "/img/blog/how-shellui-isolates-apps-in-iframes-message-flow-light.svg", dark: "/img/blog/how-shellui-isolates-apps-in-iframes-message-flow-dark.svg", mobileLight: "/img/blog/how-shellui-isolates-apps-in-iframes-message-flow-mobile-light.svg", mobileDark: "/img/blog/how-shellui-isolates-apps-in-iframes-message-flow-mobile-dark.svg", width: 1200, height: 675, alt: "Sequence of messages between the shell and your app: settings requested, settings, initialized, toast, toast action, then fresh settings after a theme change." } %}

## The message types

Every message is an object with a `type` that starts with `SHELLUI_`, an optional `payload`, and `from` and `to` fields that record the path through nested frames. You rarely send them by hand, but you will see them in logs. The main families, without the prefix (full list in the [SDK docs](https://docs.shellui.com/sdk/)):

| Family | App to shell | Shell to app |
| --- | --- | --- |
| Handshake | `SETTINGS_REQUESTED`, `INITIALIZED`, `SETTINGS_UPDATED` | `SETTINGS` |
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

- **Callbacks:** a click on a toast button or dialog option comes back as a message, so your callback runs in your app.
- **Settings changes:** `SETTINGS_UPDATED` is how a frame, such as Shellui's own Settings page, tells the shell the user changed a preference. The shell then pushes `SETTINGS` to every live frame.
- **Refresh:** `REFRESH_PAGE` asks the top window to reload the whole page, for example after a new shell version is installed.
- **Nested apps:** an app can host another Shellui app with [`createAppFrame` or `ShelluiFrame`](https://docs.shellui.com/features/app-frames/). `CHILD_FRAME_REGISTER`, `CHILD_FRAME_UNREGISTER` and `CHILD_FRAME_SESSION` let the host app relay settings and a session to the child, for origins the shell config allows. Shellui does not add a `sandbox` attribute to those nested frames, so set one yourself.

## How the SDK checks each incoming message

Any script holding a reference to a window can call `postMessage` on it, so the receiver does the real work. Shellui's listener follows the [OWASP HTML5 Security Cheat Sheet](https://cheatsheetseries.owasp.org/cheatsheets/HTML5_Security_Cheat_Sheet.html): check the origin, treat data as untrusted, never target `*`.

{% themedImage { light: "/img/blog/how-shellui-isolates-apps-in-iframes-trust-checks-light.svg", dark: "/img/blog/how-shellui-isolates-apps-in-iframes-trust-checks-dark.svg", mobileLight: "/img/blog/how-shellui-isolates-apps-in-iframes-trust-checks-mobile-light.svg", mobileDark: "/img/blog/how-shellui-isolates-apps-in-iframes-trust-checks-mobile-dark.svg", width: 1200, height: 675, alt: "Four checks in a row: message shape, origin allowlist, known source, and privilege. Messages with the wrong shape are ignored; messages that fail the other checks are dropped." } %}

1. **Shape:** the data must be an object whose `type` starts with `SHELLUI_`. Anything else is ignored silently.
2. **Origin:** `event.origin` must be on an allowlist: the shell's origin, the app, admin and storage URLs in your config, and anything in `security.allowedMessageOrigins`. A `null` origin never passes.
3. **Source:** `event.source` must be a frame the shell registered, the parent window, or the same window. Any other window is dropped, even with a valid origin.
4. **Privilege:** messages that act on the user, like login, logout, profile, storage, toasts, dialogs and navigation, are accepted only from a registered app frame or the shell itself, never from a page that embeds them.

One nuance: inside your app, non-privileged messages from the parent window skip the origin check when the browser can't name the parent's origin. That proves who framed your app, not that it is your shell, so set `frame-ancestors`. With developer features and the `shellsdk` log namespace on, rejected messages are logged as `Rejected untrusted SHELLUI message` with the reason.

Sending follows the same rule. The SDK passes an exact `targetOrigin` from the frame URL or the known parent. If it can't resolve one, it doesn't send. It never falls back to `*`.

## What your app gets, and what it doesn't

The session is shared on purpose, never by default.

- **Refresh token:** never sent to an app.
- **Access token:** Shellui's admin pages, Files app and Settings frame get it by default. Your apps opt in with `safeForAuthToken: true`. An app with its own identity server gets that server's token, not the shell's.
- **Service URLs:** an app gets the shell's storage, email and hosting URLs unless its navigation item sets its own. With a different identity server, an unset service gets no URL.

An app that only needs the user's name and theme never receives a credential over the message channel. Apps on the shell's origin are the exception.

## Where the boundary is today

The sandbox includes `allow-same-origin` together with `allow-scripts`. The HTML spec warns about that pair: when the framed page shares the shell's origin, its scripts can reach the parent document and even remove the sandbox attribute. We keep `allow-same-origin` because apps need their own cookies, `localStorage` and a real origin for the message checks.

- **Different origin:** as in local development (`localhost:4000` for the shell, `localhost:5173` for your app), the same-origin policy keeps your app out of the shell's document and storage. The sandbox and message checks sit on top.
- **Same origin:** a default production build serves apps from `/app/` on the shell's own origin. There the sandbox is a guard rail, not a wall. A same-origin frame can reach the shell page, read the refresh token from `sessionStorage` and act as the signed-in user. Same-origin apps also share `localStorage`, IndexedDB and cookies with the shell and each other. So can another app read your data? Yes, if both run on the shell's origin.

The rule every micro frontend setup lives by: embed only apps you trust, and give apps you trust less their own origin:

- **Own origin:** use an absolute navigation `url` on its own host, such as `https://billing.example.com`. Cookies scoped to `.example.com` still reach every subdomain.
- **Framing policy:** send a [`frame-ancestors`](https://developer.mozilla.org/en-US/docs/Web/HTTP/Reference/Headers/Content-Security-Policy/frame-ancestors) policy from the app, so only your shell can frame it:

  ```http
  Content-Security-Policy: frame-ancestors https://shell.example.com
  ```

  Shellui's Next.js and Nuxt starters set `frame-ancestors`, but only for `localhost:4000` in development. Add your production shell origin yourself.
- **BFF auth:** turn on [BFF auth](https://docs.shellui.com/features/security/) so the refresh token lives in an HttpOnly cookie that no script can copy out. A same-origin app can still use the session through the shell's routes, so pair BFF with a separate origin.

The remaining work is tracked on the [companion isolation](https://docs.shellui.com/features/companion-isolation/) page, including dropping `allow-same-origin` when shell and app share an origin and a navigation origin allowlist in the config schema.

## Why Shellui chose iframes

Iframes are not the most popular way to build micro frontends. They are the only one where the browser enforces the separation, once each app has its own origin. Teams ship on their own schedule, and the whole contract fits in one table. You can audit it, log it and diff it between releases.

The costs are real: each app loads its own framework, focus and accessibility across frames need care, and deep links must sync with the address bar, which is why `SHELLUI_URL_CHANGED` exists.

To see it working, open the [playground](https://playground.shellui.com) and run this in your browser's developer tools console:

```js
addEventListener('message', (e) => {
  if (e.data?.type?.startsWith('SHELLUI_')) console.log(e.origin, e.data);
});
```

That logs app-to-shell traffic. Switch the console context to the app's iframe to see the other direction. The code behind all of this is on [GitHub](https://github.com/shellui/shellui), in `packages/sdk/src/utils/messageSecurity.ts` and `packages/core/src/components/contentIframeSandbox.ts`.
