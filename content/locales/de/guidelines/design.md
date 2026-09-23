---
title: Design
description: Wie du on-brand Shellui-Seiten komponierst. Hole diese Datei zuerst, wenn du Website- oder Produktoberflächen baust. Die HTML-Seite unter /guidelines/design/ ist ein visuelles Handbuch für Menschen – nicht scrapen.
version: 1.3.1
---

Handeln du als exzellenter Shellui-Designer, Redakteur und Informationsarchitekt. Verwandeln du das verfügbare Material in eine offizielle von Shellui verfasste Seite. Gestalten du das Argument und die Schnittstelle zusammen. Ändern du keinen Dump von Abschnitten oder montieren du eine generische Landing Page.

Holen du sich diese Datei bei `https://shellui.com/design.md`. Es ist die Kompositionsbehörde für Agenten. Menschen verwenden `/guidelines/design/` für Muster und Beispiele. Es ersetzt nicht das Schreiben oder Web-Design-Handbücher.

- Schreiben: `https://shellui.com/guidelines/writing.md`
- Webdesign: `https://shellui.com/guidelines/web-design.md`
- Fähigkeiten: `skills/design-md/SKILL.md`, dann Schreib- und Webdesign-Fähigkeiten nach Bedarf

## Produkt

Shellui ist eine Open-Source-Web-App-Entwicklungsplattform: eine Microfrontend-Shell mit gemeinsamer Navigation, Authentifizierung, Verwaltung und Speicherung. Zielgruppe: Entwickler, die ein Produkt innerhalb dieser Shell versenden.

Präzise, ruhige, direkte, technisch gebildete, evidenzgeführte, zurückhaltende. Name ist nur **Shellui**. Niemals "Das Host". In der Prosa ist "the shell" (Kleinbuchstabe) der laufende Host. Führen du mit dem, was heute ausgeliefert wird (iframe Host, `@shellui/sdk`, Identity-Service oder Supabase Auth, `/admin`, Storage, Dateien). Halten du AI, MCP, Marketplace und App-Store-Chrom ruhig, es sei denn, die Seite enthält diese Oberfläche.

## Priorität

1. Bewahren du gelieferte Fakten, Paketnamen, URLs, Einheiten, Qualifikationen und Aufgabenbeschränkungen auf.
2. Bewahren du den Host-Stack: Eleventy 3, Tailwind CSS v4, Tailwind Plus-Muster bereits in diesem Repo, Alpine für leichte Demos, shadcn-kompatible CSS-Variablen. Kein neues Framework, CSS-Bibliothek oder Token-System, abgesehen von der seitenweiten Inselausnahme unter Stack.
3. Machen du die Frage des Lesers, die stärkste unterstützte Antwort und materielle Beweise sofort klar.
4. Etablieren du Shellui-Autorschaft durch vorhandenes Nav / Footer-Chrom, Systemtypografie, graue Leinwand und knappes Primärgold.
5. Wählen du eine für dieses Material spezifische Zusammensetzung. Klonen du keine nicht verwandte Seite als Vorlage.
6. Responsives Verhalten und Details verfeinern, ohne die Hierarchie zu schwächen.

Stellen du nur dann Fragen, wenn das Verfahren Produktansprüche, Preise, Sicherheit oder CTAs ändern könnte. Andernfalls das Unbekannte weglassen, es beschriften und fortfahren.

## Stack

- Vorlagen: Nunjucks in `src/`. Layouts: `base`, `page`, `feature`, `post`, `guidelines`, `guidelines-design`.
- CSS: `src/assets/css/input.css` → `/assets/css/site.css`. Token-Werte: `src/_data/designTokens.js` (muss `input.css` übereinstimmen).
- JS: Alpine (`src/blocks/`), Plus Elements (`/assets/js/elements.js`), Theme Toggle (`src/assets/js/site.js`).
- Inseln: Eine Seite kann ein React-Bundle für ein einzelnes interaktives Stück, das es nicht in Alpine ausdrücken kann, faul laden. Quelle in `src/islands/`, gebündelt von esbuild mit seinem CSS inlined, importiert auf Ansicht. `/architecture/` verwendet `@xyflow/react` auf diese Weise. Senden du einen statischen Fallback in den Nunjucks und verwenden du die Token-Variablen wieder; greifen du nicht nach einer Insel für einen Umschalter, einen Tab-Streifen oder ein Karussell.
- Bilder: `img/`, Logos von `/brand-assets/`. Dehnen oder färben du die Wortmarke nicht neu.
- Iframe: Site kann in der Shell geladen werden (`@shellui/sdk` winzig). Decken du Host-Chrom nicht ab. Das Thema folgt `html.dark`.
Liefern du keine Single-File-HTML-Deliverable, React/Vite-Rewrite oder ein paralleles Design-System-Paket.

Chrome zur Wiederverwendung: `nav.njk` (feste `h-16`), `footer.njk`, `logo.njk`. Hauptpolsterung: `.page-top` (unterhalb der festen Kopfzeile) und `.page-x` (horizontale Rinnen). Fügen du keinen zweiten Header, Mega-Footer, Ansageleiste oder zusätzlichen Theme Switcher hinzu.

## Tokens

Graue Leinwand. Honiggold ist die Aktionsfarbe. Eine weiche Primärwäsche hinter dem Homepage-Held ist Markenumgebung, kein Goldfeld. Bevorzugt Token Utilities (`bg-background`, `text-foreground`, `border-border`, `bg-muted`, `text-muted-foreground`, `bg-primary`, `text-primary-foreground`, `text-primary-ink`, `bg-card`). Im Dunkeln ist Goldtext `dark:text-primary`, weil `primary-ink` nicht neu zugeordnet wird.

|Token|Licht|Dunkel|Rolle|
| --- | --- | --- | --- |
| `background` | `#ffffff` | `#030712` |Seite Canvas|
| `foreground` | `#111827` | `#f9fafb` |Primärtext|
| `muted` | `#f9fafb` | `rgb(255 255 255 / 0.05)` |Ruhige Brunnen|
| `muted-foreground` | `#4b5563` | `#9ca3af` |Sekundärtext|
| `border` | `#e5e7eb` | `#1f2937` |Regeln, Karten|
| `card` | `#ffffff` | `#111827` |Höhere Oberfläche|
| `primary` | `#e3a512` | `#e8b84a` |Akzent / Buttons|
| `primary-foreground` | `#1a1408` | `#1a1408` |Text auf Gold|
| `primary-ink` | `#c4920a` | use `primary` |Gold Text auf Light|
| `ring` | `#e3a512` | `#e8b84a` |Schwerpunkt|
|Radius| `rounded-xl` cards (`0.75rem`); `rounded-md` controls (`0.375rem`) |gleich|Form|

Bestehende Seiten können weiterhin `bg-white dark:bg-gray-950` verwenden. Gleiche Palette. Neue Arbeit sollte Token-Namen verwenden.

Typ: Systemschrift. Eine `h1` (`text-4xl font-bold md:text-5xl` innere Seiten oder `font-semibold tracking-tight` auf Feature-Öffnungen). Lede `text-lg text-muted-foreground`. Abschnitt `text-2xl` / `text-3xl font-semibold tracking-tight`. Körper `text-base/7`. Measure ~ 60-70 Zeichen. Taste: `rounded-md bg-primary px-3.5 py-2.5 text-sm font-semibold text-primary-foreground`. Secondary ist ein Textlink. Gold ist knapp. Breiten: `max-w-7xl` Feature Chrom, `max-w-5xl` Richtlinien, `max-w-3xl` Leseprosa. Horizontale Shell: `.page-x` (`px-4 sm:px-6 lg:px-8`) nur auf dem äußeren Band; `max-w-*` Kinder ohne horizontale Polsterung so Kopf, Körper und Fußzeile teilen einen Inhalt Rand. Abschnittsschritte `.page-top`, `mt-10`, `mt-16`.

## Wiederverwendung

Bevorzugen du gesendete Tailwind Plus-Muster. Fügen du in Nunjucks oder `{% demo %}` ein. Restyle mit Shellui-Token. Native `<dialog>` / `el-dialog` auf dieser Website; Shell SDK für Toasts in einer gehosteten App.

| Job |Datei|Muster|
| --- | --- | --- |
|Produktöffnung| `src/index.njk` |Centered Hero, Dual CTA|
| Nav | `src/_includes/nav.njk` |Flyouts Alpine, keine neue Menübibliothek|
|Feature Split| `src/features/index.njk`, `layouts/feature.njk` |Zwei-Säulen, ein dominantes Stück|
|Preisgestaltung| `src/pricing/index.md` |Zweistufig|
| FAQ | `src/_includes/home-faq.njk` |Untergliederung nach Überschriften und Definitionen|
|Artikel| `layouts/post.njk` |Enge Maßnahme|
|Innere Seite| `layouts/page.njk`, `guidelines.njk` |Brotkrume, h1, Leinen, Prosa|
|CTA-Band| `layouts/feature.njk` |Eine ruhige Band|
|Code| `{% highlight %}` |Shiki|
|Demo| `src/blocks/*.njk` |Echtes HTML, kein iframe|

**Shellui Brand Ambient** ist erlaubt: eine weiche Primär- / Bernsteinwäsche (`blur-3xl`, `from-primary to-amber-200`) hinter dem Homepage-Helden oder eine ruhige CTA. Statisch ist in Ordnung. Lehnen du mehrfarbige Blobs, Logo-Wolken, Gradientenfelder, Testimonial-Zelte und gefälschte Dashboards ab.

## Komposition

First Viewport ist das Argument, kein Masthead plus Setup. Beginnen du mit dem Job des Lesers. Führungspfad (Identität, Überschriften, eine Aktion) und Überwachungspfad (Befehle, Konfiguration, Tabellen) sind beide erforderlich. Copy folgt Schreibrichtlinien (Bindestriche, keine Em-Dashes, keine `easy` / `simple` / `quick`).

Eine Seite-Level-throughline. Eine zentrale Beziehung pro Lesemoment. Squint: eine dominante Behauptung. Wenn jeder Block das gleiche Gewicht hat, Neugestaltung. Füllen du niemals eine Beweislücke mit Panels, Icons oder Effekten.

Passes: Rahmen du den Job → wählen du Komposition → wenden du dieses visuelle System an → prüfen du beide Themen. Liefern du die Umsetzung, keine Punktzahl.

## Ablehnen

- All-Caps verfolgt Augenbrauen als Dekoration
- Em dashes oder en dashes als Interpunktion
- `easy`, `simple`, `quick`, `seamless`, `unlock`, `leverage`
- Mehrfarbige Leuchten, Streifen, Glas, ornamentale Schatten. Soft Primary/Amber Hero Ambient ist erlaubt (siehe Reuse)
Generic Centered Hero plus gleichgewichtiges Kartenraster
Verschachtelte Karten oder Grenzen, die verwendet werden, um schwache Hierarchie zu reparieren
- Willkürliche Icon-Kacheln, Logo-Clouds, gefälschte Screenshots
Ein zweiter Theme-Picker, ein zweites Nav oder ein Host-Chrom, das in einem iframe neu aufgebaut wurde
- Führen einer Versandproduktseite mit AI / MCP / Marktplatzatmosphäre
- Authoring-Prozess Narration in Seitenkopie

Zurückhaltung ist eine präzise Hierarchie, lesbare Art, knappes Gold und Beweise - keine leeren Ränder.

## A11y

Landmarks, ein `h1`, bestellte Überschriften, native Kontrollen, sichtbare `focus-visible` Ringe. WCAG AA. Source Order ist Reading Order. `min-w-0` auf Flex / Grid Kinder. Details: `https://shellui.com/guidelines/web-design.md`.
