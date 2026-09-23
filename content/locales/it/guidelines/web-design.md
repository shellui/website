---
title: Linee guida di web design
description: Regole per UI, accessibilità e chrome del sito Shellui, della documentazione e delle app nella shell.
version: 1.1.1
---

Queste regole coprono layout, interazione e linguaggio visivo su [shellui.com](https://shellui.com), [docs.shellui.com](https://docs.shellui.com) e le app ospitate nell'iframe Shellui. Abbinalle alle [linee guida di scrittura](/guidelines/writing/) per i testi. Guida con la shell che rilasci oggi: navigazione, autenticazione, amministrazione, storage, temi chiaro e scuro. Tieni AI, MCP e marketplace fuori dall'UI predefinita.

Agenti: carica questo file. Non fare scraping della pagina HTML. Il campo `version` nel frontmatter è l'etichetta pubblica « Guidelines v… ».

## Come usare questo file

- **Umani**: leggi la pagina su `/guidelines/web-design/` o scarica questo markdown
- **Agenti**: leggi `content/guidelines/web-design.md` in questo repo, o fetch `https://shellui.com/guidelines/web-design.md`
- **Skill wrapper**: `skills/web-design-guidelines/SKILL.md`
- [linee guida di scrittura](/guidelines/writing/) per voce e tono
- **Componi le pagine con**: [design.md](/design.md) (`fetch https://shellui.com/design.md`)
- **Hub**: [Guidelines](/guidelines/)

Rivedi i file rispetto a ogni regola sotto. Output conciso e ad alto segnale. Sacrifica la grammatica per la brevità.

## Chrome Shellui

Il prodotto è una shell microfrontend. L'host possiede il chrome condiviso; l'iframe possiede l'app.

- Host cromo: barra laterale, barra superiore, o layout finestra, più toast, dialoghi, cassetti, tema e lingua. Non ricostruire quelli all'interno dell'iframe
- Le app Iframe parlano alla shell con `@shellui/sdk` (`init`, postMessage). Non raggiungere in host DOM
- La modalità di layout è una preoccupazione shell (`shellui.config.ts`). App UI deve lavorare nella barra laterale, nella barra superiore e nei layout delle finestre
- Non coprire l'intestazione del guscio, il nav, o la regione del toast. Barre app fisse hanno bisogno di un offset per il cromo host
- Autenticazione, amministrazione (`/admin`), e file sono superfici di shell. Li collega profondamente; non clonare la loro navigazione
- Tema e locale vivono nel guscio. Leggili; non spedire un secondo raccoglitore a tema nell'app a meno che l'app non sia la superficie delle impostazioni
- Preferisci i gettoni Tailwind esistenti. L'accento primario è l'oro miele (`--color-primary`, `--color-primary-ink`). Non inventare un secondo colore di marca
- Sito di marketing cromato: intestazione fissa (`h-16`), `.page-top` e `.page-x`, piè di pagina. Mettere `.page-x` sulla banda esterna e mantenere i bambini `max-w-*` non imbottiti in modo da allineare con l'intestazione. Sticky in-page UI deve cancellare l'intestazione
- Logos e segni: scarica da [Brand assets](/brand-assets/). Non allungare, ricolorare, o scambiare in una parola diversa

## Accessibilità e concentrazione

- I pulsanti di sola icona hanno bisogno di `aria-label`
- I controlli del modulo hanno bisogno di un `<label>` o `aria-label`
- Gli elementi interattivi hanno bisogno di manopole tastiera (`onKeyDown` / `onKeyUp` dove il clic non è sufficiente)
- `<button>` per azioni; `<a>` per la navigazione. Mai un `<div>` con un click handler
- Le immagini hanno bisogno di `alt` (o `alt=""` se decorativo)
- Le icone decorative hanno bisogno di `aria-hidden="true"`
- Aggiornamenti asinciani (tosti, validazione) hanno bisogno di `aria-live="polite"`. I toast conchiglia già vivono nell'host - utilizzare il SDK, non montare una seconda regione dal vivo che combatte l'host
- HTML semantico (`header`, `nav`, `main`, `footer`) prima di ARIA
- I bambini gerarchici `h1`–`h6`; uno `h1` per pagina
- Includi un link skip al contenuto principale su cromo lungo (chiusura e intestazione di marketing)
- `scroll-margin-top` su ancoraggi intestati in modo che l'intestazione fissa non copra l'obiettivo
- I media significativi hanno bisogno di didascalie, trascrizioni o descrizioni
- I controlli multimediali hanno bisogno di supporto tastiera; nascondere i supporti decorativi dalla tecnologia assistiva
- Gli elementi interattivi hanno bisogno di una messa a fuoco visibile: `focus-visible:ring-*` o equivalente
- Mai `outline-none` senza la sostituzione del fuoco
- Utilizzare `:focus-visible` su `:focus` (evitare un anello sul click puntatore)
- Concentrazione di gruppo con `:focus-within` per controlli composti
- Tracciare la messa a fuoco nelle finestre di dialogo; restituiscilo al trigger da vicino
- Colpire gli obiettivi: se il controllo visivo è < 24px, espandere l'area di successo a ≥ 24px; su mobile ≥ 44px
- Lo stato non è il colore da solo; includere un'etichetta di testo
- Intestazioni appiccicose, piè di pagina e sovrapposizioni non devono coprire l'elemento focalizzato (16 × 4px intestazione di marketing; barra superiore shell nel layout della barra superiore)

## Forms and input

- Gli input hanno bisogno di `autocomplete` e di un significativo `name`
- Utilizzare il corretto `type` (`email`, `tel`, `url`, `number`) e `inputmode`
- Non bloccare mai la pasta (`onPaste` + `preventDefault`)
- Etichette cliccabili (`htmlFor` o avvolgere il controllo)
- Disattivare l'ortografia su e-mail, codici, nome utente, token (`spellCheck={false}`)
- Checkbox e radio: etichetta e controllo condividono un target di successo (senza zone morte)
- Invia soggiorni abilitati fino all'inizio della richiesta; spinner durante la richiesta; tieni l'etichetta originale
- Non predisabilitare la presentazione su forme incomplete; presentare errori di superfici
- Non bloccare i tasti sui campi digitati; convalidare dopo l'ingresso
- Inserire i messaggi quando un input di testo è l'unico controllo; in `<textarea>`, ⌘/Ctrl+ Inserisci i messaggi
- Errori in linea accanto ai campi; focalizzare il primo errore sul presente
- I segnaposto terminano con `…` e mostrano un modello di esempio (`your_access_token_here…`)
- `autocomplete="off"` su campi non autentici per evitare trigger password-manager
- Avvertire prima della navigazione con modifiche non salvate (`beforeunload` o una guardia router)
- I campi di Auth appartengono al guscio quando l'app è ospitata. Non duplicare l'interfaccia utente firmata nell'iframe a meno che non si sostituisce il backend dell'identità

## Moto, tocco e layout

- Honor `prefers-reduced-motion` (versione ridotta o disattivabile). Il tema di marketing rivela già disabilita sotto quella query media - abbinarlo
- Animate `transform` e `opacity` solo (compositor-friendly)
- Mai `transition: all`; elencare le proprietà esplicitamente
- Impostare il corretto `transform-origin`
- SVG: si trasforma in un wrapper `<g>` con `transform-box: fill-box; transform-origin: center`
- Animazioni interrompibili - rispondere a input midanimation
- Autoplay moto più di 5 secondi ha bisogno di pausa, stop o nascondere i controlli
- I loop decorativi muti devono fermarsi sotto `prefers-reduced-motion`
- `touch-action: manipulation` (previene il ritardo dello zoom a doppio giro)
- Impostare `-webkit-tap-highlight-color` intenzionalmente
- `overscroll-behavior: contain` in modali, cassetti e fogli - compresi i cassetti
- Durante la resistenza: disabilitare la selezione del testo, `inert` su elementi trascinati
- Trascinare, scorrere, pizzicare e i gesti del percorso hanno bisogno di opzioni di tap/click e tastiera a meno che il gesto non sia l'intero punto
- `autoFocus` - solo desktop, ingresso primario singolo; evitare sul cellulare
- I layout a emorragia completa hanno bisogno di `env(safe-area-inset-*)` per tacche
- Evitare le barre di scorrimento indesiderate: risolvere il overflow piuttosto che mascherarlo con `overflow-x-hidden` su `body`
- Flex e griglia sulla misurazione JavaScript per il layout
- Radii nidi: genitore ≤ bambino, concentrico (`rounded-md` dentro `rounded-xl`)
- Progettazione di stati vuoti, radi, densi e di errore
- Inline aiuto prima di tooltips
- App Iframe: non assumere l'altezza viewport equivale alla finestra. Il guscio cromato mangia spazio. Preferire `%` / flex all'interno dell'iframe, non `100vh`, a meno che non si sottrae cromo dell'host

# Lingua visiva

- Densità: rivolto agli sviluppatori, non affollato. Abbinamento esistente `page-top`, `page-x`, `max-w-5xl` / `max-w-3xl` prosa, schede `rounded-xl`, e bordi grigi già su brand-assets e pagine delle caratteristiche
- Luce e buio sono entrambi di prima classe. Anteprima ogni schermo in entrambi. Sito di vendita: `html.dark` più `localStorage.theme`. Prodotto: `@shellui/core` tema
- `color-scheme: dark` su `html` quando il tema scuro è attivo (fissa la barra di scorrimento e controlli nativi)
- `theme-color` meta corrisponde allo sfondo della pagina
- Nativo `<select>`: esplicito `background-color` e `color` (Modalità oscura di Windows)
- Ellipsis `…`, non tre punti `...`. Stati di caricamento: `Loading…`, `Saving…`
- Preferire hyphen `-` per una pausa nella copia UI. Ban em dashes (`—`) e en dashes (`–`) utilizzati come punteggiatura. Soggiorni ordinari di trattini
- Citazioni dritte nella fonte. Non convertire in ricci citazioni a mano
- `font-variant-numeric: tabular-nums` per colonne e confronti numerici
- `text-wrap: balance` o `text-pretty` sulle voci (previene vedove)
- I contenitori di testo gestiscono contenuti lunghi: `truncate`, `line-clamp-*`, o `break-words`
- I bambini Flex hanno bisogno di `min-w-0` per consentire la tronca
- Maniglia stati vuoti - non rendere l'interfaccia utente rotta per stringhe vuote o array
- Contenuto generato dall'utente: anticipare ingressi brevi, medi e molto lunghi
- Pulsanti e collegamenti hanno bisogno di uno stato `hover:`. Hover, attivo e messa a fuoco dovrebbe aumentare il contrasto, non appiattirlo
- Copia nell'interfaccia utente segue l'[writing guidelines](/guidelines/writing/): voce attiva, intestazioni di pagina del caso di frase, etichette del caso titolo, specifici verbi del pulsante ("Salva token", non "Continue")
- Numeri per i conti: "8 app", non "eight"
- I messaggi di errore includono il passo successivo, non solo il problema
- `&` sopra "e" solo dove lo spazio è stretto (nav, pulsanti)
- Brand name **Shellui** non traduce mai: `translate="no"` sul wordmark in HTML dove l'autotraslato la guasta

## Performance e stato

- `<img>` ha bisogno di `width` esplicita e `height` (previene il turno di layout)
- Immagini sotto-cartella: `loading="lazy"`
- Immagini critiche soprapiegate: `fetchpriority="high"`
- Grandi liste (oltre 50 articoli): virtualizzare o `content-visibility: auto`
- Nessun layout legge nel render (`getBoundingClientRect`, `offsetHeight`, `offsetWidth`, `scrollTop`)
- Batch DOM legge e scrive; non interleave
- Preferire ingressi incontrollati; gli input controllati devono essere economici per tasto
- script di terze parti self-host quando pratico (`@shellui/sdk` piccole navi da `/assets/js/`). Utilizzare Integrity subresource se si deve caricare da un CDN
- font critici: precarico con `font-display: swap`. Questo sito di marketing utilizza lo stack di sistema - non aggiungere un webfont senza un motivo
- Preferire video compresso su GIF animato; fornire un'alternativa ancora alternativa
- Corti loop decorativi: video muto, `prefers-reduced-motion` media condizione, ancora fallback
- URL riflette stato - filtri, schede, impaginazione, pannelli espansi in params query. UI profondo del link
- I collegamenti sono collegamenti reali (`<a>`), quindi Cmd/Ctrl+cliccare e fare clic sul lavoro
- Le azioni distruttive hanno bisogno di una modalità di conferma o di una finestra dismessa - mai immediata
- Date e orari: `Intl.DateTimeFormat`, stringhe non codificate
- Numeri e valuta: `Intl.NumberFormat`
- Rileva la lingua tramite `Accept-Language` / `navigator.languages`, non IP. Il guscio possiede già locale
- Idratazione: gli ingressi con `value` hanno bisogno di `onChange` (o `defaultValue` se incontrollato)
- Data/ora di rendering: guardia contro server/cliente errore
- `suppressHydrationWarning` solo dove è veramente richiesto
- Undici pagine sono HTML statico. Non idratare un'intera pagina di marketing per un gioco a tema - mantenere Alpine/JS

## Anti-patterns (flag questi)

- `user-scalable=no` o `maximum-scale=1` che disabilita lo zoom
- `onPaste` con `preventDefault`
- `transition: all`
- `outline-none` senza una sostituzione visibile
- Fare clic sulla navigazione del manubrio senza `<a href>`
- `<div>` o `<span>` con manici click che dovrebbero essere `<button>` o `<a>`
- Immagini senza dimensioni
- Grandi array `.map()` senza virtualizzazione
- Ingressi forma senza etichette
- Pulsanti icon senza `aria-label`
- Inviare disabilitato prima che l'utente prova (convalida delle navate)
- Colpire obiettivi sotto 24px (44px su mobile) senza area espansa
- Formati di data/numero codificati (uso `Intl.*`)
- `autoFocus` senza una ragione chiara
- GIF Animato quando il video compresso è adatto
- Azione di sola getura senza tap / click e alternativa tastiera
- Em dashes in UI copia; "fissare" ordinaria iphens
- Ricostruire brindisi, dialoghi, o nav all'interno dell'iframe
- `100vh` layout che siedono sotto cromo ospite
- Un secondo picker a tema in un'app ospitata
- UI prodotto di spedizione che conduce con AI, MCP, o cromato di mercato
- Mancanti stili di tema scuro (`dark:` o token a tema)
- Focus o intestazioni nascoste sotto l'intestazione di marketing fisso o la barra superiore della shell

## Emissione di revisione

Gruppo per file. Utilizzare il formato `file:line` (cliccabile nel codice VS). Risulta Terse.

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

Numero di Stato + posizione. Salta la spiegazione a meno che la correzione non sia ovvia. Niente preambolo.
