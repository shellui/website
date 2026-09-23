---
title: Webdesign-Richtlinien
description: UI, Zugänglichkeit und Chromregeln für Shellui-Websites, Dokumente und In-Shell-Apps.
version: 1.1.1
---

Diese Regeln umfassen Layout, Interaktion und visuelle Sprache auf [shellui.com](https://shellui.com), [docs.shellui.com](https://docs.shellui.com) und Apps, die im Shellui iframe gehostet werden. Kombinieren du sie mit dem [writing guidelines](/guidelines/writing/) zum Kopieren. Führen du mit der Versandhülle: Navigation, Authentifizierung, Verwaltung, Storage, helle und dunkle Themen. Halten du AI, MCP und Marketplace Chrome aus der Standard-UI heraus.

Agenten: Laden du diese Datei. Scrapen du nicht die HTML-Seite. Das `version` Feld in der Frontmatter ist das öffentliche "Guidelines v..." Label.

## Wie man diese Datei verwendet

- **Menschen**: Lesen du die Seite unter `/guidelines/web-design/` oder laden du diesen Markdown herunter
- **Agenten**: Lesen du `content/guidelines/web-design.md` in diesem Repo oder holen du `https://shellui.com/guidelines/web-design.md`
- **Skill Wrapper**: `skills/web-design-guidelines/SKILL.md`
- **Sibling**: [writing guidelines](/guidelines/writing/) für Stimme und Ton
- **Seiten zusammenstellen mit**: [design.md](/design.md) (`fetch https://shellui.com/design.md`)
- **Hub**: [Guidelines](/guidelines/)

Überprüfen du Dateien gegen jede Regel unten. Output prägnante High-Signal-Ergebnisse. Grammatik für Kürze opfern.

Shellui-Chrom

Das Produkt ist eine Microfrontend-Shell. Der Host besitzt gemeinsames Chrom; der iframe besitzt die App.

Host-Chrom: Sidebar, Topbar oder Fensterlayout, plus Toasts, Dialoge, Schubladen, Thema und Sprache. Rekonstruieren du diese nicht innerhalb des iframe
- Iframe Apps sprechen mit der Shell mit `@shellui/sdk` (`init`, postMessage). Nicht in Host DOM erreichen
- Layout-Modus ist ein Shell-Anliegen (`shellui.config.ts`). App UI muss in Sidebar-, Top-Bar- und Fensterlayouts funktionieren
- Bedecken du nicht die Shell Header, Nav oder Toast Region. Fixe App-Bars benötigen einen Offset für Host-Chrom
Authentifizierung, Admin (`/admin`) und Dateien sind Shell-Oberflächen. Deep-link sie; Klonen du ihre Navigation nicht
- Theme und Locale leben in der Shell. Lesen sie sie; senden sie keinen zweiten thema-picker in der app, es sei denn, die app ist die einstellungsoberfläche.
- Bevorzugen du vorhandene Tailwind-Token. Primärer Akzent ist Honiggold (`--color-primary`, `--color-primary-ink`). Erfinden du keine zweite Markenfarbe
- Marketing-Site Chrom: Fixed Header (`h-16`), `.page-top` und `.page-x` Rinnen, Fußzeile. Setzen du `.page-x` auf das äußere Band und halten du `max-w-*` Kinder ungepolstert, so dass sie sich mit dem Header ausrichten. Sticky In-Page UI muss den Header löschen
- Logos und Marken: Download von [Brand assets](/brand-assets/). Dehnen, färben oder tauschen du keine andere Wortmarke

## Zugänglichkeit und Fokus

- Icon-only Buttons benötigen `aria-label`
Formularkontrollen benötigen eine `<label>` oder `aria-label`
- Interaktive Elemente benötigen Tastaturhandler (`onKeyDown` / `onKeyUp`) Wo Klick nicht genug ist
- `<button>` für Aktionen; `<a>` für Navigation. Niemals ein `<div>` mit einem Click-Handler
- Bilder benötigen `alt` (oder `alt=""` wenn dekorativ)
- Dekorative Icons benötigen `aria-hidden="true"`
- Async-Updates (Toasts, Validierung) benötigen `aria-live="polite"`. Shell-Toasts leben bereits im Host - verwenden du das SDK, montieren du keine zweite Live-Region, die den Host bekämpft
Semantisches HTML (`header`, `nav`, `main`, `footer`) vor ARIA
- Überschriften hierarchisch `h1`–`h6`; ein `h1` pro Seite
- Fügen du einen Skip-Link zu Hauptinhalten auf Long Chrome (Shell und Marketing-Header) hinzu
- `scroll-margin-top` auf Kopfankern, so dass der feste Header das Ziel nicht abdeckt
Sinnvolle Medien brauchen Bildunterschriften, Transkripte oder Beschreibungen
Mediensteuerungen benötigen Tastaturunterstützung; dekorative Medien vor assistiver Technologie verstecken
- Interaktive Elemente brauchen sichtbaren Fokus: `focus-visible:ring-*` oder gleichwertig
- Niemals `outline-none` ohne Fokusersatz
- Verwenden du `:focus-visible` über `:focus` (vermeiden du einen Ring auf Zeigerklick)
- Gruppenfokus mit `:focus-within` für Compound Controls
- Trap Fokus in Dialogen; zurück zum Trigger auf schließen
Trefferziele: Wenn die visuelle Steuerung < 24px ist, erweitern du den Trefferbereich auf ≥ 24px; auf Mobilgeräten ≥ 44px
- Status ist nicht nur Farbe; fügen du ein Textlabel hinzu
- Sticky Header, Footer und Overlays dürfen das fokussierte Element nicht abdecken (16 × 4px Marketing Header; Shell Top Bar im Top-Bar-Layout)

## Formulare und Eingabe

- Inputs benötigen `autocomplete` und eine sinnvolle `name`
- Verwenden du die richtige `type` (`email`, `tel`, `url`, `number`) und `inputmode`
- Niemals Paste blockieren (`onPaste` + `preventDefault`)
- Etiketten anklickbar (`htmlFor` oder das Steuerelement umschließen)
- Deaktivieren du die Rechtschreibprüfung von E-Mails, Codes, Benutzernamen, Token (`spellCheck={false}`)
Checkboxen und Radios: Label und Control teilen sich ein Trefferziel (keine toten Zonen)
- Senden bleibt aktiviert, bis die Anfrage beginnt; Spinner während der Anfrage; behalten du das ursprüngliche Label
- Keine Vorabdeaktivierung der Einreichung von unvollständigen Formularen; Einreichung von Oberflächenfehlern
Blockieren du keine Tastenanschläge auf eingegebenen Feldern; validieren du nach Eingabe
- Geben du ein, wenn eine Texteingabe das einzige Steuerelement ist; in `<textarea>`, ⌘/Ctrl+ Einreichungsanträge
- Fehler inline neben Feldern; Fokussieren du den ersten Fehler auf senden
- Platzhalter enden mit `…` und zeigen ein Beispielmuster (`your_access_token_here…`)
- `autocomplete="off"` auf Nicht-Auth-Feldern, um Passwort-Manager-Trigger zu vermeiden
- Warnung vor der Navigation mit nicht gespeicherten Änderungen (`beforeunload` oder ein Router Guard)
Auth-Felder gehören in die Shell, wenn die App gehostet wird. Duplizieren du die Anmeldeoberfläche im iframe nicht, es sei denn, du ersetzen das Identitäts-Backend

## Bewegung, Berührung und Layout

- Ehre `prefers-reduced-motion` (reduzierte Variante oder Deaktivierung). Das Marketing-Thema zeigt bereits Deaktivierungen unter dieser Medienabfrage - passen du es an
- Animate nur `transform` und `opacity` (kompositorfreundlich)
- Nie `transition: all`; Eigenschaften explizit auflisten
- Stellen du die richtige `transform-origin` ein
- SVG: transformiert auf einem `<g>` Wrapper mit `transform-box: fill-box; transform-origin: center`
- Animationen unterbrechbar - reagieren auf Eingabe Mid-Animation
Autoplay-Bewegung länger als 5 Sekunden muss anhalten, stoppen oder die Steuerung verstecken
- Muted dekorative Schleifen müssen unter `prefers-reduced-motion` aufhören
`touch-action: manipulation` (verhindert doppelte Zoomverzögerung)
- `-webkit-tap-highlight-color` absichtlich einstellen
- `overscroll-behavior: contain` in Modals, Schubladen und Blättern - einschließlich Schalenschubladen
- Während des Ziehens: Deaktivieren der Textauswahl, `inert` auf gezogenen Elementen
Drag, swipe, pinch und path-gesten benötigen tipp-klick- und tastaturalternativen, es sei denn, die geste ist der ganze punkt.
- `autoFocus` sparsam - nur Desktop, einzelner Primäreingang; vermeiden du es auf dem Handy
- Vollblutlayouts benötigen `env(safe-area-inset-*)` für Kerben
- Vermeiden du unerwünschte Scrollleisten: Beheben du den Überlauf, anstatt ihn mit `overflow-x-hidden` auf `body` zu maskieren
Flex und Grid over JavaScript Messung für Layout
- Verschachtelte Radien: Kind ≤ Elternteil, konzentrisch (`rounded-md` innerhalb von `rounded-xl`)
Design leer, spärlich, dicht und Fehlerzustände
- Inline-Hilfe vor Tooltips
Iframe-Apps: Gehen du nicht davon aus, dass die Höhe des Viewports dem Fenster entspricht. Das Shell Chrom frisst den Raum. `%` / flex innerhalb des iframe, nicht `100vh`, es sei denn, du subtrahieren Hostchrom

## Visuelle Sprache

- Dichte: entwicklerorientiert, nicht überfüllt. Bestehende `page-top`, `page-x`, `max-w-5xl` / `max-w-3xl` Prosa, `rounded-xl` Karten und graue Ränder bereits auf Marken-Assets und Feature-Seiten
Hell und dunkel sind beide erstklassig. Vorschau jeden Bildschirm in beiden. Marketingseite: `html.dark` plus `localStorage.theme`. Produkt: `@shellui/core` Thema
- `color-scheme: dark` auf `html`, wenn das dunkle Thema aktiv ist (behebt die Scrollleiste und native Steuerelemente)
- `theme-color` Meta passt zum Seitenhintergrund
- Native `<select>`: explizit `background-color` und `color` (Dunkler Fenstermodus)
- Ellipsis `…`, nicht drei Punkte `...`. Ladezustände: `Loading…`, `Saving…`
- Bevorzugen du Bindestrich `-` für eine Pause in UI-Kopie. Ban em dashes (`—`) und en dashes (`–`) als Interpunktion verwendet. Gewöhnliche Bindestriche bleiben
- Gerade Zitate in der Quelle. Konvertieren du nicht in lockige Zitate von Hand
- `font-variant-numeric: tabular-nums` für Zahlenspalten und Vergleiche
- `text-wrap: balance` oder `text-pretty` auf Überschriften (verhindert Witwen)
- Textcontainer behandeln lange Inhalte: `truncate`, `line-clamp-*` oder `break-words`
- Flex-Kinder brauchen `min-w-0`, um eine Abkürzung zu ermöglichen
Behandeln du leere Zustände - Rendern du keine defekte UI für leere Strings oder Arrays
Benutzergenerierte Inhalte: Erwarten du kurze, durchschnittliche und sehr lange Eingaben
- Tasten und Links benötigen einen `hover:`-Zustand. Schweben, aktiv und Fokus sollte den Kontrast erhöhen, nicht abflachen
- Kopieren in der UI folgt dem [writing guidelines](/guidelines/writing/): aktive Stimme, Satz-Fall-Seitenüberschriften, Title Case Nav-Labels, spezifische Button-Verben ("Token speichern", nicht "Weiter")
- Zahlen für Zählungen: "8 Apps", nicht "acht"
- Fehlermeldungen beinhalten den nächsten Schritt, nicht nur das Problem
- `&` über "und" nur dort, wo der Platz eng ist (nav, Tasten)
- Markenname **Shellui** nie übersetzt: `translate="no"` auf der Wortmarke in HTML, wo Auto-Übersetzer es verstümmeln würde

## Leistung und Zustand

`<img>` benötigt explizit `width` und `height` (verhindert Layoutverschiebung)
- Untergeordnete Bilder: `loading="lazy"`
- Übergeordnete kritische Bilder: `fetchpriority="high"`
- Große Listen (mehr als 50 Artikel): virtualisieren oder `content-visibility: auto`
- Kein Layout im Render (`getBoundingClientRect`, `offsetHeight`, `offsetWidth`, `scrollTop`)
Batch DOM liest und schreibt; interleave nicht
- Unkontrollierte Eingaben bevorzugen; kontrollierte Eingaben müssen pro Tastendruck billig sein
- Selbst-Host-Drittanbieter-Scripts, wenn praktisch (`@shellui/sdk` winzige Schiffe von `/assets/js/`). Verwenden du Subresource Integrity, wenn du von einem CDN laden müssen
- Kritische Schriftarten: Vorladen mit `font-display: swap`. Diese Marketing-Website verwendet den System-Stack - fügen du keinen Webfont ohne Grund hinzu
- Bevorzugt komprimiertes Video über animiertes GIF; bieten eine noch Alternative
- Kurze dekorative Loops: mutiertes Video, `prefers-reduced-motion` Medienzustand, noch Fallback
- URL spiegelt den Zustand wider - Filter, Tabs, Paginierung, erweiterte Panels in Abfrageparams. Deep-Link Stateful UI
- Links sind echte Links (`<a>`), so Cmd / Strg + Klick und Mittelklick arbeiten
- Destruktive Aktionen benötigen einen Bestätigungsmodal oder ein Undo-Fenster - niemals sofort
- Datum und Uhrzeit: `Intl.DateTimeFormat`, nicht hartcodierte Strings
- Zahlen und Währung: `Intl.NumberFormat`
- Sprache erkennen über `Accept-Language` / `navigator.languages`, nicht IP. Die Shell besitzt bereits Locale
- Hydration: Eingaben mit `value` benötigen `onChange` (oder `defaultValue`Z, wenn unkontrolliert)
Datum/Uhrzeit-Rendering: Schutz vor Server/Client-Mismatch
- `suppressHydrationWarning` nur dort, wo es wirklich benötigt wird
Elfzig Seiten sind statisches HTML. Hydratisieren du nicht eine ganze Marketingseite für ein Thema - halten du Alpine / JS scoped

## Anti-Muster (flaggen diese)

`user-scalable=no` oder `maximum-scale=1` Deaktivierung des Zooms
- `onPaste` mit `preventDefault`
- `transition: all`
- `outline-none` ohne fokussierbaren Ersatz
- Click Handler Navigation ohne `<a href>`
- `<div>` oder `<span>` mit Klick-Handlern, die `<button>` oder `<a>` sein sollten
- Bilder ohne Dimensionen
- Große Arrays `.map()` ohne Virtualisierung
- Formulareingaben ohne Labels
- Icon Buttons ohne `aria-label`
- Absenden deaktiviert, bevor der Benutzer versucht (versteckt Validierung)
- Ziele unter 24px (44px auf dem Handy) ohne erweiterten Bereich
- Hardcoded Datum / Zahlenformate (verwenden `Intl.*`)
- `autoFocus` ohne klaren Grund
Animiertes GIF, wenn komprimiertes Video geeignet ist
- Gesten-only-Aktion ohne Tap / Klick und Tastatur Alternative
- Em Striche in UI-Kopie; "Fixing" gewöhnliche Bindestriche
Rebuilding Shell Toasts, Dialoge oder Nav innerhalb des iframe
- `100vh` Layouts, die unter Host-Chrom sitzen
- Ein zweiter Theme Picker in einer gehosteten App
Versandprodukt-UI, die mit AI, MCP oder Marketplace Chrom führt
- Fehlende Dark-Theme-Styles (`dark:` oder Theme-Token)
- Fokus oder Überschriften, die unter dem Fixed Marketing Header oder Shell Top Bar versteckt sind

## Review Output

Gruppe nach Datei. Verwenden du das Format `file:line` (klickbar im VS-Code). Tolle Ergebnisse.

```text
## src/guidelines/index.njk

src/guidelines/index.njk:12 - icon button missing aria-label
src/guidelines/index.njk:40 - heading target missing scroll-margin-top
src/guidelines/index.njk:58 - animation missing prefers-reduced-motion

## src/assets/css/extras.css

src/assets/css/extras.css:22 - transition: all → list properties
src/assets/css/extras.css:41 - outline-none without focus-visible replacement

## src/_includes/nav.njk

✓ pass
```

Staatliche Ausgabe + Standort. Überspringen du die Erklärung, es sei denn, der Fix ist nicht offensichtlich. Keine Präambel.
