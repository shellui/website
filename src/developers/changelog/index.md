---
layout: layouts/page.njk
title: Changelog | Shellui
description: A detailed log of every Shellui release.
heading: Changelog
lede: A detailed log of every release and what changed.
---

{% if changelog.length == 0 %}
<p class="text-gray-500 dark:text-gray-400">Unable to load changelog. Please check back later.</p>
{% endif %}

<div class="space-y-4">
{% for release in changelog %}
  <div class="group rounded-2xl border border-gray-200 dark:border-gray-800 bg-white dark:bg-white/[0.02] shadow-sm hover:shadow-md transition-shadow overflow-hidden" x-data="{ show: {{ 'true' if loop.first else 'false' }} }">
    <button
      type="button"
      class="w-full flex items-center justify-between gap-4 px-6 py-5 text-left"
      @click="show = !show"
    >
      <div class="flex items-center gap-3">
        <span class="inline-flex items-center rounded-full bg-primary-ink/10 dark:bg-primary/15 px-3 py-1 text-sm font-bold text-primary-ink dark:text-primary">v{{ release.version }}</span>
        {% if release.date %}
          <span class="text-sm text-gray-500 dark:text-gray-400">{{ release.date }}</span>
        {% endif %}
        {% if loop.first %}
          <span class="inline-flex items-center rounded-full bg-green-50 dark:bg-green-500/10 px-2.5 py-0.5 text-xs font-medium text-green-700 dark:text-green-400">Latest</span>
        {% endif %}
      </div>
      <svg class="size-5 text-gray-400 transition-transform duration-200" :class="show && 'rotate-180'" fill="none" viewBox="0 0 24 24" stroke-width="1.5" stroke="currentColor">
        <path stroke-linecap="round" stroke-linejoin="round" d="m19.5 8.25-7.5 7.5-7.5-7.5" />
      </svg>
    </button>
    <div x-show="show" x-transition.duration.200ms>
      <div class="border-t border-gray-100 dark:border-gray-800 px-6 py-2 space-y-4">
        {% for section in release.sections %}
          <div>
            <h3 class="text-sm font-semibold text-gray-700 dark:text-gray-300 mb-2">{{ section.heading }}</h3>
            <ul class="space-y-2 !mb-0">
              {% for item in section.items %}
                <li class="flex gap-3 text-sm text-gray-700 dark:text-gray-300 leading-relaxed !mb-0 !p-0" style="list-style:none;margin:0;padding:0">
                  <span class="mt-2 size-1 shrink-0 rounded-full bg-gray-300 dark:bg-gray-600"></span>
                  <span>{{ item | safe }}</span>
                </li>
              {% endfor %}
            </ul>
          </div>
        {% endfor %}
      </div>
    </div>
  </div>
{% endfor %}
</div>

<p class="mt-10 text-sm text-gray-500 dark:text-gray-400">Want to see what's coming next? Check out our <a href="/developers/roadmap/">roadmap</a>.</p>
