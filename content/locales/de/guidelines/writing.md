---
title: Schreibrichtlinien
description: Sprach-, Ton- und Überprüfungsregeln für Shellui-Website und Docs-Prosa.
version: 1.0.0
---

Diese Regeln umfassen Kopien auf [shellui.com](https://shellui.com), [docs.shellui.com](https://docs.shellui.com) und in-Produkt-Strings, die Entwickler lesen. Führen du mit dem, was Shellui heute liefert: eine Microfrontend-Shell mit gemeinsamer Navigation, Authentifizierung, Verwaltung und Speicherung. Halten du AI, MCP und Marketplace-Ideen ruhig, es sei denn, die Seite ist tatsächlich über diese Oberfläche.

Agenten: Laden du diese Datei. Scrapen du nicht die HTML-Seite. Das `version` Feld in der Frontmatter ist das öffentliche "Guidelines v..." Label.

## Wie man diese Datei verwendet

- **Menschen**: Lesen du die Seite unter `/guidelines/writing/` oder laden du diesen Markdown herunter
- **Agenten**: Lesen du `content/guidelines/writing.md` in diesem Repo oder holen du `https://shellui.com/guidelines/writing.md`
- **Skill Wrapper**: `skills/writing-guidelines/SKILL.md`
- ** Sibling**: [web design guidelines](/guidelines/web-design/) für UI, Zugänglichkeit und Chrom
- **Seiten zusammenstellen mit**: [design.md](/design.md) (`fetch https://shellui.com/design.md`)
- **Hub**: [Guidelines](/guidelines/)

Überprüfen du Dateien gegen jede Regel unten. Output prägnante High-Signal-Ergebnisse. Grammatik für Kürze opfern.

## Marke

- Der Produktname ist nur **Shellui**. Niemals "Das Host". Heben du niemals die letzten beiden Buchstaben oder Kamel-case den Namen; Pakete und Repos bleiben Kleinbuchstaben (`@shellui/sdk`, `shellui/identity-service`)
- In Prosa ist "the shell" (Kleinbuchstabe) der laufende Host rund um die iframe App. Das ist ein gemeinsames Substantiv, keine zweite Marke
Standard-One-Liner: Shellui ist eine Open-Source-Web-App-Entwicklungsplattform - eine Microfrontend-Shell, die deine Anwendung mit gemeinsamer Navigation, Authentifizierung, Speicherung und Verwaltung umhüllt
- Zielgruppe ist Entwickler, die ein Produkt in dieser Shell versenden, nicht generische "Benutzer" oder "Teams, die KI erkunden"
- Oberflächen: [docs.shellui.com](https://docs.shellui.com) für Dokumente, [playground.shellui.com](https://playground.shellui.com) zum Ausprobieren, [GitHub](https://github.com/shellui)Z für die Quelle. Erwähnen du [shellui.ai](https://shellui.ai) nur, wenn die Seite über diese Eigenschaft ist
- Visuelle Downloads (Logos, Marken, Wortmarken) live auf [Brand assets](/brand-assets/). Mischen du keine Logo-Nutzungsregeln in Produktdokumente

## Stimme und Ton

- Aktive Stimme. Mental Test: Anhängen "von Affen". Wenn der Satz noch Parses, umschreiben
- Direkte Adresse: `you`, niemals `the user` oder `one can`
- Imperativ für Schritte: "Call **init**", nicht "You will need to call **init**"
- Zielsätze unter 20 Wörtern
- Kontraktionen sind in Ordnung (`you'll`, `it's`)
Präsentiert, es sei denn, du beschreiben ein Verhalten, das noch nicht existiert
- Limit `we`: nur für eine bewusste Shellui-Aktion ("wir empfehlen", "wir veraltet"), niemals als Ersatz für "Sie"
- Keine rhetorischen Fragen (liest sich als Marketing)
- Zweitlesetest: Lesen du jeden Satz einmal im Sprachtempo. Wenn du erneut lesen, um es zu analysieren, nennen du das Thema, die Aktion und die Konsequenz. Töte Metaphernverben und Pronomen, die mehrere Sätze zurückreichen
- Developer-facing, nicht salesy. Beweise über Slogans. Name der API, Datei oder des Befehls

### Ton, nach Inhaltstyp

- **Tutorial**: warme, vorhersagbare Struktur, keine Fallen
- **How-to**: knapp, direkt (der Leser ist Mid-Task)
- **Referenz**: neutral, erschöpfend, zirkulierbar
- **Konzeptual**: Erklären Sie, als würde der Leser es zurück lehren; Beispiele willkommen
- **Troubleshooting**: Erkennen du den Fehler an und beheben du ihn dann. Empathie ohne Entschuldigung
- **Website / Blog **: gleiche Stimme wie docs. Führen du mit dem Versandprodukt, nicht mit der Roadmap

### Verbotene Wörter

- `easy`, `simple`, `quick`: setzt den Leser unter Druck und liest sich als Marketing. Ersetzen mit einer konkreten Beschreibung ("one command", "default settings", "most projects don't need this")
- `very`, `just`, `really`, `simply`: Füller; Schneiden oder Umschreiben
- `seamless`, `robust`, `powerful`, `next-generation`, `unlock`, `leverage`: Marketing Nebel;
- Teasen du keine unveröffentlichten AI-, MCP-, App-Store- oder Marktplatzarbeiten auf Seiten über Shell, Auth, Admin oder Storage

### Einschluss

Verdienen du jedes Detail: Schneiden du eine Zahl, einen Namen oder ein Implementierungsdetail aus, wenn eine allgemeinere Phrasierung das Verständnis oder die Handlung des Lesers nicht verändern würde
- Weasel-Wörter: Ersetzen du vage Qualifikationen (`significantly`, `many`, `often`, `typically`, `generally`) durch eine bestimmte Nummer oder Anspruch
- Vage Quantifikatoren: keine `near-zero`, `sub-second`, `most requests` ohne eine Zahl, hinter der du stehen können
- Füller oder Metaphernverben: Benennen du die Aktion (`moves through`, `lands`, `carries`, `hits` → der wörtliche Schritt)

### AI-generierte Tells (flaggen diese)

- Zusammenfassungs-Stilübergänge: Öffnen du niemals einen Absatz, indem du den letzten neu schreiben (`With this setup complete…`, `Now that we've explored…`). Pivot zum nächsten Punkt
Stop-Start-Sätze: Teilen du eine abhängige Idee nicht in abgehackte Fragmente (`Previously this was manual. Now it's automatic. This saves time.` → ein Satz). Kurze Sätze für die Betonung sind in Ordnung
Spec-sheet voice: Umschreiben von Sätzen, die sich wie ein Datenblatt lesen (`provides`, `is configurable`, `is explicitly labeled`)
Kalt-offene Absätze: Ein Körperabsatz, dessen erster Satz als eigenständige Überschrift funktioniert, hat keine Vorgeschichte. Führen du den vorherigen Betreff weiter (`Because…`, `Once…`)
Personifizierte Artefakte: Maschinen führen keine menschlich-physischen Handlungen aus (`hand the browser a URL` → `the browser fetches the URL`; `the token holds…` → `the token is stored…`)
- Wiederverwendetes Framing: Der Winkel muss von dieser Seite kommen, keine Vorlage (`Das question most teams face is whether…`)

## Struktur und Formatierung

Regeln, wie eine Seite geplant, betitelt und markiert wird.

### Planung und Inhaltstyp

- Jede Docs-Seite hat einen Plan (Übersicht, Ziel, Zielgruppe, Inhaltsplan, offene Fragen), auf den verwiesen oder verlinkt wird
- Inhaltstyp deklariert, wenn das docs-System es unterstützt: `Tutorial`, `How-to`, `Reference`, `Conceptual`, `Troubleshooting` oder `Landing`
- Titel ist benutzerförmig (die Frage des Lesers), nicht funktionsförmig (Name des Ingenieurs)
Seite macht einen Job: Tutorial oder How-to oder Referenz, nicht drei auf einmal
- Ziel ist verborientiert: "configure", "explain", "debug" (testbar)
- Mehr Zielgruppesseiten: kurzer gemeinsamer Opener, dann technische Unterabschnitte
- Website-Marketing-Seiten benötigen immer noch einen One-Paragraph-Öffner, der angibt, wofür die Seite ist

### Überschriften

- Satzfall für Seitenüberschriften (`H1` `H2`Z `H3`): "Konfigurieren des iframe SDK", nicht "Konfigurieren des Iframe SDK"
Titelfall für Nav Labels: "Writing Guidelines"
- `meta.title` (oder die Seite `title`) wird zum `H1`; nav labels bleiben kurz
- Unterüberschriften beschreibend, nicht süß: "Caveats beim Hosting auf einer benutzerdefinierten Domain", nicht "Caveats"
- Der Leser sollte den Abschnitt aus der Überschrift allein erraten

### Seitenstruktur

- Jede Seite öffnet sich mit einem Absatz TL; DR von dem, was sie abdeckt
- Jeder Hauptabschnitt beginnt mit einem zusammenfassenden Satz
- Schreibe Akronyme beim ersten Gebrauch aus: "JSON Web Key Set (JWKS) ist, wie die Shell Token verifiziert"
- Definieren du jeden Begriff, wenn du ihn zum ersten Mal verwenden (Link zu seiner Konzeptseite, wenn einer existiert)
- Referenzdokumente nach Oberfläche organisiert; Bildungsdokumente nach Leseraufgabe organisiert
- Halten du Absätze zu 2 bis 4 Sätzen. Etwas länger teilen oder zwei Ideen abdecken

### Listen

- Drei oder mehr listenförmige Elemente in einem Absatz: Konvertieren in eine Liste
- Bulleted für ungeordnet; nummeriert für bestellt (Lebenszyklen, sequentielle Schritte)
Führen du immer eine Liste mit einem Doppelpunkt ein
- Keine Perioden am Ende der Liste Elemente, es sei denn, sie sind volle Sätze
- Fettdruck/Beschreibungsformat: `- **Term**: description here` (Kolon nach dem fetten Begriff)

### Code

- Codeblöcke benötigen ein Sprach-Tag für Syntax-Hervorhebung
- TypeScript ist der Standard für neue Beispiele, es sei denn, die Oberfläche ist eine andere Sprache (Python für Identity-Service, bash für CLI)
- Mehrstufige Flüsse sollten Struktur zeigen (nummerierte Schritte oder separate Blöcke mit Prosa zwischen ihnen)
- Heben du tragende Linien hervor, wenn der Renderer sie unterstützt
- ≤80 Spalten pro Zeile in Snippets
- ≤25 Zeilen pro Snippet; längere Blöcke mit Prosa teilen
Standardabweichungen auslassen; Variablendefinitionen nicht wiederholen, einen gemeinsamen Namen verwenden
Minimale Kommentare in Codeblöcken; Prosa bevorzugen
- Erklären Sie, was jeder Codeblock in Prosa macht (nicht fallen und laufen)
- Zeigen du nicht auf eine vollständige Beispieldatei am Ende eines Leitfadens ("Siehe `app.ts`"); der Leitfaden ist das Lieferbare
- Bevorzugt echte Shellui-Namen: `shellui.config.ts`, `@shellui/sdk`, `init`, Identitätsservice, Speicherservice

```typescript
import { init } from "@shellui/sdk";

await init({
  clientId: your_client_id_here,
});
```

### Platzhalter

- Textplatzhalter: `snake_case`, Beschreibung: `your_access_token_here` (damit der Leser doppelklicken kann, um vor dem Einfügen auszuwählen)
Anzahl Platzhalter: Zählen `1234567890123`Z (als Fälschung erkennbar, vorhersehbar)
- Niemals Winkelhalter-Token, `xxx`, `your-token` oder generische ALL CAPS

### Datengrößen und -einheiten

- Raum + Großbuchstabeneinheit: `64 KB`, `5 KB`, `200 ms`
- Ausnahme: Sekunden sind nackt: `30s`
Bleiben du konsistent, damit die Leser scannen können

### Preisseiten

- Shellui ist MIT-lizenziert und frei zu laufen. Sagen du das deutlich
- Wenn du bezahlte Hilfe erwähnen, sagen Sie, was es ist (Architektur, kundenspezifische Arbeit, Support) und was es nicht ist
- Implizieren du niemals einen gehosteten Plan oder ein Nutzungsmessgerät, das nicht existiert
Tabellen, wenn du Optionen vergleichen; nicht davon ausgehen, dass der Leser das Modell kennt

### Betonung

- **Bold** bedeutet ein UI-Element oder eine kritische Tatsache, niemals Betonung für Betonung
- Wenn du nach fett für den Ton greifst, ist der Satz schwach; schreibe ihn um
- `Inline code` für Pfade, Dateierweiterungen, Bezeichner, kurze Schnipsel: `/admin`, `.tsx`, `init`, `shellui.config.ts`
- Regel: Wenn es ohne eine Monospace-Schriftart seltsam aussehen würde, monospace es

### Punktuierung und Typografie

- Bevorzugen du einen Bindestrich `-` für eine Pause oder Pause in der Prosa: "Halten du Chrom in der Schale - Layouts, Toasts und Thema enthalten."
- Ban em dashes (`—`) und en dashes (`–`) als Interpunktion verwendet. Nicht "fix" gewöhnliche Bindestriche
Hyphen in zusammengesetzten Wörtern, Paketnamen und Flaggen bleiben: `microfrontend`, `identity-service`, `--serve`
- Gerade Zitate in Markdown-Quelle (`"` `'`). Konvertieren du nicht in lockige Zitate von Hand
- Ellipsis `…`, nicht drei Punkte `...`
- Ladezustände enden mit `…`: `Loading…`, `Saving…`
- `&` über "und" nur dort, wo der Platz eng ist (Nav-Etiketten, Schaltflächen)

### Source Formatierung

- Keine harten Absätze: Jeder Absatz ist eine Zeile in der Quelle, lassen du den Editor umwickeln
- Eine leere Linie vor Überschriften; eine leere Linie vor und nach Codeblöcken
- Keine `---` horizontale Regeln zwischen den Abschnitten
Keine zusätzlichen leeren Linien zwischen Elementen, die keine Absatzbrüche sind

### Links

Definieren du jeden Begriff, wenn er zum ersten Mal erscheint; Link zu seiner konzeptionellen Seite, wenn einer existiert
- Ankertext benennt das Ziel; niemals URLs oder `here` / `link`
- Kanonische Dokumente: [docs.shellui.com](https://docs.shellui.com)
- Playground: [playground.shellui.com](https://playground.shellui.com)
Quelle: [github.com/shellui](https://github.com/shellui)
- Markendateien: [shellui.com/brand-assets](https://shellui.com/brand-assets/)
- Erfinden du keine Dashboard Deep Links. Link zum realen Pfad (`/admin`, docs Seite, GitHub repo)

## Was zu erwähnen (und was zu überspringen)

- **Standard zum Versand**: iframe host, `@shellui/sdk`, Identity-Service oder Supabase Auth, Administrator bei `/admin`, Storage-Service oder Supabase Storage, Dateien
- **Skip, es sei denn, die Seite ist darüber **: AI-Funktionen, MCP, ein App Store, ein Marktplatz, unveröffentlichte Roadmap-Elemente
- **Roadmap-Seiten** können bevorstehende Arbeiten auflisten. Überall sonst ist die bevorstehende Arbeit eine Fußnote, nicht die lede
- Gestalten du Shellui nicht als KI-Plattform. Es ist eine Shell rund um deine App

## Überprüfung

Wie Entwürfe überprüft werden - von einer Person oder einem Agenten.

### AI Workflow

- du sind verantwortlich für die Inhalte, die du produzieren, wie auch immer sie erstellt werden
- du sind der letzte Schiedsrichter; das Modell schlägt vor, du verfügen
- Halten du die technische Genauigkeit auf einem hohen Standard: Dokumente werden auch von LLMs verbraucht, und falsche Dokumente trainieren falsche Modelle
- Folgen du `AGENTS.md` und dieser Datei, bevor du eine Website oder eine Prosa erstellen
- Plan zuerst; der Plan ist die Spezifikation, gegen die das Modell arbeitet
- Nach einem Entwurf, Test: "Angesichts des Ziels dieser Seite, kann ein Leser (oder ein Modell) die Aufgabe mit nur dieser Seite abschließen?"
Endgültige menschliche Überprüfung immer
- Offenlegung des Modells in der PR, wenn der Entwurf generiert wurde

### Qualitätscheckliste (erforderliche Boxen sind nicht verhandelbar)

- **Findability**: Die Seite wird von nav, docs oder der Parent Feature Page verlinkt
- **Accuracy**: Code Samples laufen; Screenshots entsprechen der aktuellen UI
- **Relevanz**: Codebeispiele, bei denen sie helfen (TypeScript zuerst; Python oder bash, wenn das die Oberfläche ist)
- **Clarity**: opener deckt wer/was/wo/warum ab; Voraussetzungen für Tutorials; Schritte sind konkret; empfehlen den kürzesten Weg, wenn mehrere existieren
- **Vollständigkeit**: Limits dokumentiert; die Ziele des Content Plans werden angesprochen
- **Lesbarkeit**: nav-Namen scannbar und Aktionsverben verwenden; Unterüberschriften beschreibend; Abschnitte beginnen mit Zusammenfassungen; Codeblöcke formatiert; aktive Stimme

### Pull Requests

PR-Beschreibung sagt, was zu überprüfen und verknüpft die Vorschau-URL
- Der Autor ist verantwortlich, nicht der Rezensent; Rezensenten können mit Nissen zustimmen
- Vorschlagskommentare für kleine Textfixes; ein blockierender Kommentar für etwas Größeres
- Meinungsverschiedenheiten sind in Ordnung; lehnen du mit einem einzeiligen Grund ab und gehen du weiter

## Anti-Muster (flaggen diese)

- Em dashes (`—`) oder en dashes (`–`) als Interpunktion verwendet
- `easy`, `simple`, `quick` bei Leseraktionen
- Passive Stimme (Anwendung der "by monkeys" Test)
Titelfall in Seitenüberschriften (Satzfall in `H1` durch `H6`)
- Generische Platzhalter: Winkelhaltermarken, `xxx`, `your-token`, `ABC123`
Codeblöcke ohne Sprach-Tag
- JavaScript Beispiele, bei denen TypeScript die Konvention ist
- Code blockiert über 25 Zeilen ohne Prosa zwischen
- Hard-Wrapped Prosa Absätze (mehrere Zeilen für einen Absatz in der Quelle)
- `---` horizontale Regeln zwischen Abschnitten
- Untertitel, die einzelne generische Wörter sind: `Overview`, `Caveats`, `Notes`
- Fett für die Betonung anstelle eines UI-Elements oder einer kritischen Tatsache verwendet
Seite oder Abschnitt ohne Eröffnungszusammenfassung
- Drei Punkte (`...`) statt Ellipse (`…`) im Ladeexemplar
- Akronyme, die verwendet werden, bevor sie ausgeschrieben werden
- Bare Einheitsnummern (`64KB`, `5kb`, `200MS`) anstelle von `64 KB`, `5 KB`, `200 ms`
- "Wir" stehen für "Sie"
- Rhetorische Fragen
- Füllwörter: `very`, `just`, `really`, `simply`
- Verweise auf "die vollständige Beispieldatei am Ende des Handbuchs" anstatt den Code einzufügen
- "Laden..." statt "Laden..."
- Zusammenfassungsstilübergänge, die den vorherigen Absatz wiederholen (`With this setup complete…`)
Stop-Start-Fragmente, die eine abhängige Idee in abgehackte Sätze aufteilen
- Spec-Sheet-Stimme lesen wie ein Datenblatt (`provides`, `is configurable`, `is explicitly labeled`)
Kalte Körperparagraphen, deren erster Satz keine Vorgeschichte hat
- Personifizierte Artefakte, die menschliche körperliche Handlungen ausführen (`hand the browser a URL`)
- Wiederverwendetes / Template Framing, das nicht für die Seite spezifisch ist (`Das question most teams face is whether…`)
- Weasel-Wörter anstelle eines spezifischen Anspruchs (`significantly`, `many`, `often`, `typically`, `generally`)
Vage Quantifikatoren ohne Zahl (`near-zero`, `sub-second`, `most requests`)
- Füller- oder Metaphernverben anstelle des wörtlichen Schritts (`moves through`, `lands`, `carries`, `hits`)
Sätze, die eine zweite Lesung benötigen, um zu analysieren
Paragraphen über 4 Sätze oder zwei Ideen
- Bare URLs oder `here`/`link` als Ankertext
- Das Produkt "Das Host" oder eine andere Schreibweise als Shellui
Führen einer Versandproduktseite mit AI, MCP oder Marktplatzkopie
- Gewöhnliche Bindestriche als Fehler gekennzeichnet (Bindestriche werden bevorzugt)

## Review Output

Gruppe nach Datei. Verwenden du das Format `file:line` (klickbar im VS-Code). Tolle Ergebnisse.

```text
## src/features/apps-and-navigation/index.njk

src/features/apps-and-navigation/index.njk:18 - banned word "easy"
src/features/apps-and-navigation/index.njk:24 - em dash in prose; use a hyphen
src/features/apps-and-navigation/index.njk:31 - "the user" → "you"
src/features/apps-and-navigation/index.njk:47 - placeholder YOUR_TOKEN → your_access_token_here

## src/architecture/index.njk

✓ pass
```

Staatliche Ausgabe + Standort. Überspringen du die Erklärung, es sei denn, der Fix ist nicht offensichtlich. Keine Präambel.
