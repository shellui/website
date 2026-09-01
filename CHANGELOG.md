# Change Log

All notable changes to this project will be documented in this file.

The format is based on [Keep a Changelog](http://keepachangelog.com/)
and this project adheres to [Semantic Versioning](http://semver.org/).

<!---
## [Unreleased] - yyyy-mm-dd

### ✨ Feature – for new features
### 🛠 Improvements – for general improvements
### 🚨 Changed – for changes in existing functionality
### ⚠️ Deprecated – for soon-to-be removed features
### 📚 Documentation – for documentation update
### 🗑 Removed – for removed features
### 🐛 Bug Fixes – for any bug fixes
### 🔒 Security – in case of vulnerabilities
### 🏗 Chore – for tidying code

See for sample https://raw.githubusercontent.com/favoloso/conventional-changelog-emoji/master/CHANGELOG.md
-->

## [Unreleased]

### ✨ Feature

- Load `@shellui/sdk` tiny from jsDelivr (`@0.5.0-alpha.1`) so the site syncs with a parent Shellui shell out of the box.

## [0.4.1] - 2026-08-29

### ✨ Feature

- Animate dark/light mode switches with a circular reveal from the toggle using the View Transitions API.

## [0.4.0] - 2026-08-22

### ✨ Feature

- Rebuild the site as Eleventy with Tailwind CSS, Tailwind Plus Elements, Alpine demo blocks, sitemap, and GitHub Pages deploy. Homepage content is unchanged from the previous landing page.
- Add a centered header with Features, Developers, Pricing, Docs, and Blog. Features, Developers, Pricing, and Blog are work-in-progress pages; Docs points to docs.shellui.com.
- Use the Tailwind Plus simple-centered hero on the homepage.
- Add the official blog with a full-width post list and a first article, Introducing Shellui.
- Make the header responsive with a mobile hamburger menu; dark mode moves into the menu on small screens.
- Add feature sub-pages for microfrontend, authentication, and storage.
- Add a Features flyout menu in the header with links to each sub-page.
- Add a custom 404 page at `/404.html` so GitHub Pages can serve it for missing URLs.

### 🛠 Improvements

- Drop the custom warm palette and self-hosted fonts; use Tailwind CSS default colors and the system font stack, with a honey-gold primary accent.
- Remake the footer with navigation links and a made-in-Zurich tagline.

### 🐛 Bug Fixes

- Ship sized favicon assets (ICO, 16/32 PNG, 180px Apple touch icon) so the tab icon works on iPad and other devices.
- Bust cached assets with a content-hash query string instead of renaming files, so GitHub Pages' 10-minute HTML cache cannot request hashed URLs a new deploy already replaced.

## [0.3.0] - 2026-05-14

### ✨ Feature

- Update references to latest release Shellui v0.3.0
- Highlight authentication, legal documents, the identity-service backend, and optional in-app admin panels

## [0.2.0] - 2026-02-20

### ✨ Feature

- Update references to latest release Shellui v0.2.0

## [0.1.0] - 2026-02-09

### ✨ Feature

- First website version
