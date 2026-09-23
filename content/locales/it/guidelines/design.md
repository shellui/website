---
title: Design
description: Come comporre pagine Shellui on-brand. Carica questo file per primo quando costruisci sito o superfici prodotto. La pagina HTML su /guidelines/design/ è un manuale visivo per le persone - non fare scraping.
version: 1.3.1
---

Agisci come un eccellente designer, editor e information architect Shellui. Trasforma il materiale disponibile in una pagina ufficiale firmata Shellui. Modella insieme l'argomento e l'interfaccia. Non ridistribuire sezioni in blocco né assemblare una landing generica.

Carica questo file da `https://shellui.com/design.md`. È l'autorità di composizione per gli agenti. Le persone usano `/guidelines/design/` per campioni ed esempi. Non sostituisce i manuali di scrittura o web design.

- Scrittura: `https://shellui.com/guidelines/writing.md`
- Web design: `https://shellui.com/guidelines/web-design.md`
- Skill: `skills/design-md/SKILL.md`, poi le skill di scrittura e web design se servono

## Prodotto

Shellui è una piattaforma open source per lo sviluppo di web app: una shell microfrontend con navigazione, autenticazione, amministrazione e storage condivisi. Pubblico: sviluppatori che rilasciano un prodotto dentro quella shell.

Preciso, calmo, diretto, tecnicamente competente, basato su evidenze, sobrio. Il nome è solo **Shellui**. Mai "The Host". Nel testo, "the shell" (minuscolo) è l'host in esecuzione. Parti da ciò che esiste oggi (host iframe, `@shellui/sdk`, identity-service o Supabase Auth, `/admin`, storage, Files). Tieni AI, MCP, marketplace e chrome da app store fuori focus salvo che la pagina tratti proprio quella superficie.

## Priorità

1. Conserva fatti forniti, nomi pacchetti, URL, unità, qualificatori e vincoli di task.
2. Conserva lo stack host: Eleventy 3, Tailwind CSS v4, pattern Tailwind Plus già in repo, Alpine per demo leggere, variabili CSS compatibili shadcn. Niente nuovo framework, libreria CSS o sistema di token, salvo l'eccezione island per pagina sotto Stack.
3. Rendono immediati la domanda del lettore, la risposta più solida e le evidenze.
4. Stabilisci la paternità Shellui con nav/footer esistenti, tipografia di sistema, canvas grigio e honey gold usato con parsimonia.
5. Scegli una composizione specifica per questo materiale. Non clonare una pagina non correlata come template.
6. Affina il responsive e i dettagli senza indebolire la gerarchia.

Fai domande solo se procedere potrebbe cambiare claim di prodotto, prezzi, sicurezza o CTA. Altrimenti ometti l'ignoto, etichettalo e procedi.

## Stack

- Template: Nunjucks in `src/`. Layout: `base`, `page`, `feature`, `post`, `guidelines`, `guidelines-design`.
- CSS: `src/assets/css/input.css` → `/assets/css/site.css`. Valori token: `src/_data/designTokens.js` (devono combaciare con `input.css`).
- JS: Alpine (`src/blocks/`), Plus Elements (`/assets/js/elements.js`), toggle tema (`src/assets/js/site.js`).
- Islands: una pagina può caricare lazy un bundle React per un solo pezzo interattivo che Alpine non esprime. Sorgente in `src/islands/`, bundle esbuild con CSS inlined, import on view. `/architecture/` usa `@xyflow/react` così. Fornisci fallback statico in Nunjucks e riusa i token; non usare un island per un toggle, tab strip o carousel.
- Immagini: `img/`, logo da `/brand-assets/`. Non stirare o ricolorare il wordmark.
- Iframe: il sito può caricarsi nella shell (`@shellui/sdk` tiny). Non coprire l'host chrome. Il tema segue `html.dark`.
- Non consegnare HTML monofile, rewrite React/Vite o pacchetto design system parallelo.

Chrome da riusare: `nav.njk` (fisso `h-16`), `footer.njk`, `logo.njk`. Padding main: `.page-top` (sotto header fisso) e `.page-x` (margini orizzontali). Niente secondo header, mega-footer, announcement bar o theme switcher extra.

## Token

Canvas grigio. Honey gold è il colore d'azione. Un wash primary morbido dietro l'hero homepage è ambient brand, non un campo dorato. Preferisci utility token (`bg-background`, `text-foreground`, `border-border`, `bg-muted`, `text-muted-foreground`, `bg-primary`, `text-primary-foreground`, `text-primary-ink`, `bg-card`). In dark, testo gold è `dark:text-primary` perché `primary-ink` non è rimappato.

| Token | Light | Dark | Ruolo |
| --- | --- | --- | --- |
| `background` | `#ffffff` | `#030712` | Canvas pagina |
| `foreground` | `#111827` | `#f9fafb` | Testo primario |
| `muted` | `#f9fafb` | `rgb(255 255 255 / 0.05)` | Pozzetti quieti |
| `muted-foreground` | `#4b5563` | `#9ca3af` | Testo secondario |
| `border` | `#e5e7eb` | `#1f2937` | Regole, card |
| `card` | `#ffffff` | `#111827` | Superficie rialzata |
| `primary` | `#e3a512` | `#e8b84a` | Accento / pulsanti |
| `primary-foreground` | `#1a1408` | `#1a1408` | Testo su gold |
| `primary-ink` | `#c4920a` | usa `primary` | Testo gold su light |
| `ring` | `#e3a512` | `#e8b84a` | Focus |
| radius | `rounded-xl` card (`0.75rem`); `rounded-md` controlli (`0.375rem`) | same | Forma |

Pagine esistenti possono usare ancora `bg-white dark:bg-gray-950`. Stessa palette. Lavoro nuovo: nomi token.

Tipo: font di sistema. Un solo `h1` (`text-4xl font-bold md:text-5xl` pagine interne, o `font-semibold tracking-tight` su aperture feature). Lede `text-lg text-muted-foreground`. Sezione `text-2xl` / `text-3xl font-semibold tracking-tight`. Body `text-base/7`. Misura ~60-70 caratteri. Pulsante: `rounded-md bg-primary px-3.5 py-2.5 text-sm font-semibold text-primary-foreground`. Secondario è link testuale. Gold è scarso. Larghezze: `max-w-7xl` chrome feature, `max-w-5xl` guidelines, `max-w-3xl` prosa di lettura. Shell orizzontale: `.page-x` (`px-4 sm:px-6 lg:px-8`) solo sulla fascia esterna; mantieni figli `max-w-*` senza padding orizzontale così header, body e footer condividono lo stesso bordo contenuto. Step sezione `.page-top`, `mt-10`, `mt-16`.

## Riuso

Preferisci pattern Tailwind Plus già in produzione. Incolla in Nunjucks o `{% demo %}`. Restyla con token Shellui. `<dialog>` nativo / `el-dialog` su questo sito; SDK shell per toast dentro un'app hostata.

| Compito | File | Pattern |
| --- | --- | --- |
| Apertura prodotto | `src/index.njk` | Hero centrato, doppia CTA |
| Nav | `src/_includes/nav.njk` | Flyout, Alpine, niente nuova libreria menu |
| Split feature | `src/features/index.njk`, `layouts/feature.njk` | Due colonne, un pezzo dominante |
| Prezzi | `src/pricing/index.md` | Due tier |
| FAQ | `src/_includes/home-faq.njk` | Titolo split + definizioni |
| Articolo | `layouts/post.njk` | Misura stretta |
| Pagina interna | `layouts/page.njk`, `guidelines.njk` | Breadcrumb, h1, lede, prose |
| Banda CTA | `layouts/feature.njk` | Una banda quiet |
| Codice | `{% highlight %}` | Shiki |
| Demo | `src/blocks/*.njk` | HTML reale, no iframe |

**Ambient brand Shellui** è consentito: wash morbido primary / amber (`blur-3xl`, `from-primary to-amber-200`) dietro hero homepage o CTA quiet. Statico va bene. Rifiuta blob multicolore, logo cloud, campi gradiente, marquee testimonial e dashboard finte.

## Componi

Il primo viewport è l'argomento, non masthead più setup. Parti dal compito del lettore. Servono sia percorso executive (identità, titoli, un'azione) sia percorso audit (comandi, config, tabelle). Il copy segue le linee guida di scrittura (trattini, niente em dash, niente `easy` / `simple` / `quick`).

Un filo conduttore a livello pagina. Una relazione focale per momento di lettura. Strizzando gli occhi: un claim dominante. Se ogni blocco ha lo stesso peso, ridisegna. Non riempire un buco di evidenze con pannelli, icone o effetti.

Passaggi: inquadra il compito → scegli composizione → applica questo sistema visivo → ispeziona entrambi i temi. Consegna l'implementazione, non un punteggio.

## Rifiuta

- Eyebrow tutto maiuscolo con tracking come decorazione
- Em dash o en dash come punteggiatura
- `easy`, `simple`, `quick`, `seamless`, `unlock`, `leverage`
- Glow multicolore, strisce, vetro, ombre ornamentali. Ambient primary/amber hero consentito (vedi Riuso)
- Hero centrato generico più griglia card a peso uguale
- Card annidate, o bordi per riparare gerarchia debole
- Tile icona arbitrarie, logo cloud, screenshot finti
- Secondo theme picker, seconda nav o host chrome ricostruito in iframe
- Aprire una pagina prodotto in shipping con atmosfera AI / MCP / marketplace
- Narrazione del processo autoriale nel copy di pagina

La sobrietà è gerarchia precisa, tipo leggibile, gold scarso ed evidenze - non margini vuoti.

## A11y

Landmark, un `h1`, heading ordinati, controlli nativi, anelli `focus-visible` visibili. WCAG AA. L'ordine sorgente è l'ordine di lettura. `min-w-0` su figli flex/grid. Dettagli: `https://shellui.com/guidelines/web-design.md`.
