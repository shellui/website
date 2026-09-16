---
layout: layouts/page.njk
title: Roadmap | Shellui
description: "Shellui public roadmap: from January 2026 birth through POC, shipped v0.5, upcoming Smart Shell (MCP admin and local AI), marketplace, and v1.0 Horizon."
eyebrow: Developers
heading: What's shipping next
lede: Past milestones and upcoming work. Track GitHub milestones for current status.
---

<div>
  <div class="flex flex-col gap-4 rounded-xl border border-gray-200 bg-gray-50 p-5 sm:flex-row sm:items-start sm:justify-between sm:gap-6 dark:border-gray-800 dark:bg-white/5">
    <p class="text-base text-gray-600 dark:text-gray-400 !mb-0">Shellui is MIT licensed. Follow progress on GitHub milestones.</p>
    <a href="https://github.com/shellui/shellui/milestones" target="_blank" rel="noopener noreferrer" style="text-decoration:none" class="inline-flex shrink-0 items-center gap-2 rounded-md border border-gray-300 bg-white px-4 py-2.5 text-sm font-medium text-gray-700 no-underline hover:bg-gray-100 hover:no-underline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-primary dark:border-gray-600 dark:bg-gray-800 dark:text-gray-300 dark:hover:bg-gray-700">
      <svg class="size-5" fill="currentColor" viewBox="0 0 24 24" aria-hidden="true">
        <path fill-rule="evenodd" d="M12 2C6.477 2 2 6.484 2 12.017c0 4.425 2.865 8.18 6.839 9.504.5.092.682-.217.682-.483 0-.237-.008-.868-.013-1.703-2.782.605-3.369-1.343-3.369-1.343-.454-1.158-1.11-1.466-1.11-1.466-.908-.62.069-.608.069-.608 1.003.07 1.531 1.032 1.531 1.032.892 1.53 2.341 1.088 2.91.832.092-.647.35-1.088.636-1.338-2.22-.253-4.555-1.113-4.555-4.951 0-1.093.39-1.988 1.029-2.688-.103-.253-.446-1.272.098-2.65 0 0 .84-.27 2.75 1.026A9.564 9.564 0 0 1 12 6.844a9.59 9.59 0 0 1 2.504.337c1.909-1.296 2.747-1.027 2.747-1.027.546 1.379.202 2.398.1 2.651.64.7 1.028 1.595 1.028 2.688 0 3.848-2.339 4.695-4.566 4.943.359.309.678.92.678 1.855 0 1.338-.012 2.419-.012 2.747 0 .268.18.58.688.482A10.02 10.02 0 0 0 22 12.017C22 6.484 17.522 2 12 2Z" clip-rule="evenodd" />
      </svg>
      View milestones
    </a>
  </div>

  <div class="mt-12">

    <div class="relative space-y-12 border-l-2 border-primary-ink/40 pl-8 dark:border-primary/40">

      <div class="relative">
        <div class="absolute -left-[calc(2rem+5px)] top-1 size-2.5 rounded-full bg-primary-ink ring-4 ring-white dark:bg-primary dark:ring-gray-950"></div>
        <time datetime="2026-01" class="text-sm font-semibold tabular-nums text-primary-ink dark:text-primary">January 2026</time>
        <p class="mt-1 text-lg font-semibold tracking-tight text-gray-900 dark:text-white">Beginning</p>
        <p class="mt-1 text-base text-gray-600 dark:text-gray-400">Shellui starts as an open-source application shell.</p>
        <p class="mt-2 text-sm text-gray-500 dark:text-gray-400">The shellui.com domain was acquired on January 5th - treat that as the official birthdate.</p>
      </div>

      <div class="relative">
        <div class="absolute -left-[calc(2rem+5px)] top-1 size-2.5 rounded-full bg-primary-ink ring-4 ring-white dark:bg-primary dark:ring-gray-950"></div>
        <time datetime="2026-08" class="text-sm font-semibold tabular-nums text-primary-ink dark:text-primary">August 2026</time>
        <p class="mt-1 text-lg font-semibold tracking-tight text-gray-900 dark:text-white">POC</p>
        <p class="mt-1 text-base text-gray-600 dark:text-gray-400">Basic features are in place. Decision to go full time on Shellui.</p>
      </div>

      <div class="relative">
        <div class="absolute -left-[calc(2rem+5px)] top-1 size-2.5 rounded-full bg-primary-ink ring-4 ring-white dark:bg-primary dark:ring-gray-950"></div>
        <time datetime="2026-09" class="text-sm font-semibold tabular-nums text-primary-ink dark:text-primary">September 2026</time>
        <p class="mt-1 text-lg font-semibold tracking-tight text-gray-900 dark:text-white">v0.5 - Pixel Perfect</p>
        <p class="mt-1 text-base text-gray-600 dark:text-gray-400">Host and admin UI aligned to one visual system across screens.</p>
      </div>

    </div>

    <div class="relative mt-4 pl-8">
      <p class="text-sm font-semibold text-gray-500 dark:text-gray-400">Upcoming</p>
    </div>

    <div class="relative mt-4 space-y-12 border-l-2 border-dashed border-gray-300 pl-8 dark:border-gray-700">

      <div class="relative">
        <div class="absolute -left-[calc(2rem+5px)] top-1 size-2.5 rounded-full border-2 border-gray-400 bg-white dark:border-gray-500 dark:bg-gray-950"></div>
        <time datetime="2026-Q4" class="text-sm font-semibold tabular-nums text-gray-500 dark:text-gray-400">Q4 2026</time>
        <p class="mt-1 text-lg font-semibold tracking-tight text-gray-900 dark:text-white">v0.6 - Smart Shell</p>
        <p class="mt-1 text-base text-gray-600 dark:text-gray-400">Full Model Context Protocol (MCP) admin.</p>
        <p class="mt-1 text-base text-gray-600 dark:text-gray-400">Local AI for apps in the iframe: on-device and shell-local models through a Prompt API-shaped SDK and Settings AI.</p>
      </div>

      <div class="relative">
        <div class="absolute -left-[calc(2rem+5px)] top-1 size-2.5 rounded-full border-2 border-gray-400 bg-white dark:border-gray-500 dark:bg-gray-950"></div>
        <time datetime="2026-Q4" class="text-sm font-semibold tabular-nums text-gray-500 dark:text-gray-400">Q4 2026</time>
        <p class="mt-1 text-lg font-semibold tracking-tight text-gray-900 dark:text-white">v0.7 - Marketplace</p>
        <p class="mt-1 text-base text-gray-600 dark:text-gray-400">A marketplace for discovering and installing microfrontend apps into a Shellui instance.</p>
      </div>

      <div class="relative">
        <div class="absolute -left-[calc(2rem+5px)] top-1 size-2.5 rounded-full border-2 border-gray-400 bg-white dark:border-gray-500 dark:bg-gray-950"></div>
        <time datetime="2027-Q1" class="text-sm font-semibold tabular-nums text-gray-500 dark:text-gray-400">Q1 2027</time>
        <p class="mt-1 text-lg font-semibold tracking-tight text-gray-900 dark:text-white">v1.0 - Horizon</p>
        <p class="mt-1 text-base text-gray-600 dark:text-gray-400">Stable 1.0: feature-complete for the shipping shell, with APIs you can pin.</p>
      </div>

    </div>

  </div>

  <div class="mt-16 border-t border-gray-200 pt-10 dark:border-gray-800">
    <h2 class="text-2xl font-semibold text-gray-900 dark:text-white">How to help</h2>
    <p class="mt-3 text-base text-gray-600 dark:text-gray-400"><a href="/company/contact/">Email the team</a> or read <a href="/company/contribute/">how to contribute</a>.</p>
  </div>

</div>
