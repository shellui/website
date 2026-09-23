---
title: Linee guida di scrittura
description: Voce, tono e regole di revisione per i testi del sito Shellui e della documentazione.
version: 1.0.0
---

Queste regole coprono i testi su [shellui.com](https://shellui.com), [docs.shellui.com](https://docs.shellui.com) e le stringhe in-product che leggono gli sviluppatori. Parti da ciò che Shellui offre oggi: una shell microfrontend con navigazione, autenticazione, amministrazione e storage condivisi. Tieni AI, MCP e marketplace fuori focus salvo che la pagina tratti proprio quella superficie.

Agenti: carica questo file. Non fare scraping della pagina HTML. Il campo `version` nel frontmatter è l'etichetta pubblica « Guidelines v… ».

## Come usare questo file

- **Umani**: leggi la pagina su `/guidelines/writing/` o scarica questo markdown
- **Agenti**: leggi `content/guidelines/writing.md` in questo repo, o fetch `https://shellui.com/guidelines/writing.md`
- **Skill wrapper**: `skills/writing-guidelines/SKILL.md`
- **Correlato**: [linee guida di web design](/guidelines/web-design/) per UI, accessibilità e chrome
- **Componi le pagine con**: [design.md](/design.md) (`fetch https://shellui.com/design.md`)
- **Hub**: [Guidelines](/guidelines/)

Rivedi i file rispetto a ogni regola sotto. Output conciso e ad alto segnale. Sacrifica la grammatica per la brevità.

## Brand

- Il nome prodotto è solo **Shellui**. Mai « The Host ». Non alzare le ultime due lettere né camel-case il nome; pacchetti e repo restano minuscoli (`@shellui/sdk`, `shellui/identity-service`)
- In prosa, « the shell » (minuscolo) è l'host in esecuzione intorno all'app iframe. È un sostantivo comune, non un secondo brand
- One-liner predefinito: Shellui è una piattaforma open source per lo sviluppo di web app - una shell microfrontend che avvolge la tua applicazione con navigazione, autenticazione, storage e amministrazione condivisi
- Il pubblico sono sviluppatori che rilasciano un prodotto dentro quella shell, non generici « users » o « teams exploring AI »
- Superfici: [docs.shellui.com](https://docs.shellui.com) per la doc, [playground.shellui.com](https://playground.shellui.com) per provarla, [GitHub](https://github.com/shellui) per il codice. Menziona [shellui.ai](https://shellui.ai) solo quando la pagina riguarda quella proprietà
- Download visivi (logos, mark, wordmarks) su [Brand assets](/brand-assets/). Non mescolare regole d'uso del logo nella doc prodotto

## Voce e tono

- Voce attiva. Test mentale: aggiungi « by monkeys ». Se la frase regge ancora, riscrivi
- Indirizzo diretto: `you`, mai `the user` o `one can`
- Imperativo per i passi: "Call **init**", non "You will need call **init**"
- Decidere frasi in 20 parole
- Le contrazioni vanno bene (`you'll`, `it's`)
- Tenso presente a meno che non stai descrivendo il comportamento che non esiste ancora
- Limit `we`: solo per un'azione deliberata Shellui ("si consiglia", "noi deprecato"), mai come stand-in per "tu"
- Nessuna domanda retorica (leggi come marketing)
- Secondo test: leggere ogni frase una volta al ritmo del discorso. Se rileggete per analizzarlo, nominare il soggetto, l'azione e la conseguenza. Uccidere verbi metafori e pronomi che raggiungono diverse frasi
- Sviluppatore, non commerciale. Prove su slogan. Nome dell'API, del file o del comando

### Tone, per tipo di contenuto

- **Tutorial**: struttura calda e prevedibile, senza trappole
- ** How-to**: terse, direct (il lettore è mid-task)
- **Riferimento * neutrale, esaustivo, quotabile
- **Concettuale**: spiega come il lettore lo insegnerà; esempi benvenuti
- **Troubleshooting**: riconoscere il fallimento, quindi risolvere. Empathy senza scuse
- **Sito / blog**: stessa voce dei doc. Piombo con il prodotto di spedizione, non la roadmap

### Parole bannate

- `easy`, `simple`, `quick`: mette pressione sul lettore e legge come marketing. Sostituire con una descrizione concreta ("un comando", "impostazioni di default", "la maggior parte dei progetti non ne hanno bisogno")
- `very`, `just`, `really`, `simply`: riempimento; taglio o riscrittura
- `seamless`, `robust`, `powerful`, `next-generation`, `unlock`, `leverage`: fog di marketing; nome del comportamento
- Non prendere in giro AI, MCP, app-store, o il lavoro di mercato su pagine su shell, auth, admin o storage

## Concision

- Guadagnare ogni dettaglio: tagliare un numero, un nome o un dettaglio di implementazione se un fraseggio più generale non cambierebbe la comprensione o l'azione del lettore
- Parole Weasel: sostituire le qualifiche vaghe (`significantly`, `many`, `often`, `typically`, `generally`) con un numero o un reclamo specifico
- Quantificatori vaghi: no `near-zero`, `sub-second`, `most requests` senza una cifra si può stare dietro
- Filler o verbi metaforici: nominare l'azione (`moves through`, `lands`, `carries`, `hits` → il passaggio letterale)

#### AI-generated dice (flag questi)

- Transizioni in stile sommario: non aprire mai un paragrafo riprendendo l'ultimo (`With this setup complete…`, `Now that we've explored…`). Pivot al punto successivo
- frasi di stop-start: non dividere un'idea dipendente in frammenti taglienti (`Previously this was manual. Now it's automatic. This saves time.` → una frase). Le frasi brevi per l'enfasi sono belle
- Spec-sheet voice: riscrivere frasi che leggono come un foglio di dati (`provides`, `is configurable`, `is explicitly labeled`)
- paragrafi aperti a freddo: un paragrafo del corpo la cui prima frase funziona come voce standalone non ha antecedente. Portare avanti il soggetto precedente (`Because…`, `Once…`)
- Artifici personali: le macchine non svolgono azioni umane-fisiche (`hand the browser a URL` → `the browser fetches the URL`; `the token holds…` → `the token is stored…`)
- Inquadratura riutilizzata: l'angolo deve venire da questa pagina, non un modello (`The question most teams face is whether…`)

## Struttura e formattazione

Regole per come una pagina è pianificata, intitolata, e contrassegnata.

## Programmazione e tipo di contenuto

- Ogni pagina dei documenti ha un piano (overview, goal, audience, content plan, open questions) di riferimento o di collegamento
- Tipo di contenuto dichiarato quando il sistema doc lo supporta: `Tutorial`, `How-to`, `Reference`, `Conceptual`, `Troubleshooting`, o `Landing`
- Il titolo è a forma di utente (questione del lettore), non a forma di caratteristica (nome dell'ingegnere)
- La pagina fa un lavoro: tutorial o come-to o riferimento, non tre alla volta
- Goal è verb-driven: "configure", "spiegare", "debug" (testabile)
- Pagine a più udienze: apertura condivisa breve, poi sottosezioni tecniche
- Le pagine di marketing del sito hanno ancora bisogno di un apri-paragrafo che afferma ciò che la pagina è per

####

- Caso di separazione per le intestazioni di pagina (`H1` `H2` `H3`): "Configurare l'iframe SDK", non "Configurare l'iframe SDK"
- Caso di titolo per le etichette nav: "Guida di scrittura"
- `meta.title` (o la pagina `title`) diventa `H1`; le etichette nav rimangono brevi
- Subheadings descrittivo, non carino: "Caveats quando si ospita su un dominio personalizzato", non "Caveats"
- Il lettore deve indovinare la sezione della rubrica da solo

## Struttura della pagina

- Ogni pagina si apre con un TL monoparagrafo;DR di ciò che copre
- Ogni sezione principale si apre con una frase sommaria
- Spell out acronimi sul primo uso: "JSON Web Key Set (JWKS) è il modo in cui la shell verifica tokens"
- Definire ogni termine la prima volta che lo si utilizza (collegare alla sua pagina concettuale quando si esiste)
- Documenti di riferimento organizzati per superficie; documenti di istruzione organizzati dal compito del lettore
- Tenere i paragrafi da 2 a 4 frasi. Spalare qualcosa di più o coprire due idee

## Liste

- Tre o più elementi a forma di elenco in un paragrafo: convertiti in un elenco
- Bulleted per non ordinato; numerato per ordinato (cicli, passi sequenziali)
- Introdurre sempre una lista con un colon
- Nessun periodo alla fine della lista, a meno che non siano frasi complete
- Formato Bold/descrizione: `- **Term**: description here` (colon dopo il termine audace)

### Code

- I blocchi di codice hanno bisogno di un tag di lingua per evidenziare la sintassi
- TypeScript è il default per nuovi esempi a meno che la superficie non sia un'altra lingua (Python per l'identità-servizio, bash per CLI)
- I flussi multi-step devono mostrare la struttura (passi numerici, o blocchi separati con prosa tra loro)
- Evidenziare le linee portanti quando il renderizzatore lo supporta
- colonne ≤80 per linea in frammenti
- ≤25 linee per snippet; dividere i blocchi più lunghi con prosa
- Omit defaults; non ripetere le definizioni variabili, utilizzare un nome condiviso
- commenti minimi in blocchi di codice; preferi la prosa
- Spiegare cosa fa ogni blocco di codice in prosa (non cadere ed eseguire)
- Non puntare a un file di esempio completo alla fine di una guida ("Vedi `app.ts`"); la guida è la consegnabile
- Preferire i veri nomi Shellui: `shellui.config.ts`, `@shellui/sdk`, `init`, identitÃ-service, storage-service

```typescript
import { init } from "@shellui/sdk";

await init({
  clientId: your_client_id_here,
});
```

##

- segnaposto di testo: `snake_case`, descrittivo: `your_access_token_here` (così il lettore può fare doppio clic per selezionare prima di incollare)
- Numero segnaposto: contare su `1234567890123` (riconoscibile come falso, prevedibile)
- Mai token di angolo-bracket, `xxx`, `your-token`, o generico ALL CAPS

### Dimensioni e unità dati

- Spazio + unità maiuscola: `64 KB`, `5 KB`, `200 ms`
- Eccezione: i secondi sono nudi: `30s`
- Resta coerente in modo che i lettori possano scansionare

### Le pagine dei prezzi

- Shellui è MIT-licenziato e libero di correre. Dillo chiaramente
- Se si parla di aiuto pagato, dire che cosa è (architettura, lavoro personalizzato, supporto) e che cosa non è
- Non implica mai un piano o un metro di utilizzo ospitato che non esiste
- Tavoli quando si confrontano le opzioni; non assumere il lettore conosce il modello

## Emphasis #

- **Bold** significa un elemento dell'interfaccia utente o un fatto critico, mai enfasi-for-emphasis-sake
- Se raggiungi per il tono, la frase è debole; riscrivila
- `Inline code` per percorsi, estensioni di file, identificatori, snippet corti: `/admin`, `.tsx`, `init`, `shellui.config.ts`
- Regola: se sembrerebbe strano senza un carattere monospazio, lo monospazio

## # Puntuazione e tipografia

- Preferire un trattino `-` per una pausa o una pausa in prosa: "Casco cromo nella shell - layout, toast e tema incluso."
- Ban em dashes (`—`) e en dashes (`–`) utilizzati come punteggiatura. Non "fisso" i tratti ordinari
- Iphens in parole composte, nomi dei pacchetti e bandiere rimangono: `microfrontend`, `identity-service`, `--serve`
- Citazioni diritte nella sorgente di markdown (`"` `'`). Non convertire in ricci citazioni a mano
- Ellipsis `…`, non tre punti `...`
- Gli stati di caricamento terminano con `…`: `Loading…`, `Saving…`
- `&` sopra "e" solo dove lo spazio è stretto (etichetta nav, pulsanti)

### Formattazione sorgente

- Non fare i paragrafi difficili: ogni paragrafo è una riga nella fonte, lasciare che l'editor si involucri
- Una riga vuota prima delle voci; una riga vuota prima e dopo blocchi di codice
- No regole orizzontali `---` tra le sezioni
- Niente linee vuote extra tra elementi che non sono interruzioni di paragrafo

### Links

- Definire ogni termine la prima volta che appare; collegare alla sua pagina concettuale quando si esiste
- Il testo di ancoraggio nomina la destinazione; mai gli URL a nudo o `here` / `link`
- Documenti canonici: [docs.shellui.com](https://docs.shellui.com)
- Parco giochi: [playground.shellui.com](https://playground.shellui.com)
- Fonte: [github.com/shellui](https://github.com/shellui)
- File di marca: [shellui.com/brand-assets](https://shellui.com/brand-assets/)
- Non inventare i collegamenti profondi del cruscotto. Link al percorso reale (`/admin`, docs page, GitHub repo)

## Che dire (e cosa saltare)

- **Default to shipping**: host iframe, `@shellui/sdk`, servizio di identità o Supabase Auth, admin a `/admin`, storage-service o Supabase Storage, file
- A meno che la pagina non ci sia. Caratteristiche AI, MCP, un app store, un mercato, articoli roadmap non rilasciati
Le pagine della mappa possono elencare i prossimi lavori. Ovunque, il prossimo lavoro è una nota a piè di pagina, non il lede
- Non incastrare Shellui come piattaforma AI. È un guscio intorno alla tua app

## Recensione

Come vengono controllate le bozze da una persona o da un agente.

### flusso di lavoro AI

- Sei responsabile per il contenuto che produci, tuttavia è creato
- Sei l'arbitro finale; il modello propone, si smalti
- Tenere l'accuratezza tecnica ad un alto livello: i documenti sono anche consumati da LLM, e i documenti sbagliati formano modelli sbagliati
- Seguire `AGENTS.md` e questo file prima di generare sito web o doc prose
- Piano primo; il piano è lo spec il modello funziona contro
- Dopo una bozza, prova: "dato l'obiettivo di questa pagina, può un lettore (o un modello) completare l'attività utilizzando solo questa pagina?"
- Rivista umana finale sempre
- Chiudere il modello nella PR quando il progetto è stato generato

### Checklist di qualità (le caselle richieste non sono negoziabili)

- **Findability**: la pagina è collegata da nav, doc, o la pagina principale
- **Accuracy**: eseguire i campioni di codice; gli screenshot corrispondono all'interfaccia utente corrente
- **Rilevanza**: campioni di codice dove aiutano (TypeScript prima; Python o bash quando è la superficie)
- **Clarity**: le copertine di apertura che/cosa/dove/perché; i prerequisiti sui tutorial; i passi sono concreti; consiglia il percorso più breve quando esistono diversi
- **Completezza**: limiti documentati; gli obiettivi del piano di contenuto sono affrontati
- **Readability**: nomi nav scannable and use action verbs; sottovoci descrittivi; sezioni iniziano con riassunti; blocchi di codice formattati; voce attiva

### Estrarre le richieste

- PR descrizione dice cosa recensire e collega l'URL di anteprima
- L'autore è responsabile, non il recensore; i recensori possono approvare con le lendini
- Commenti di suggerimento per piccole correzioni di testo; un commento di blocco per qualcosa di più grande
- Il disagreement va bene; rifiutare con una ragione di una linea e andare avanti

## Anti-patterns (flag questi)

- Em dashes (`—`) o en dashes (`–`) utilizzato come punteggiatura
- `easy`, `simple`, `quick` che descrive le azioni del lettore
- Voce passiva (apply the "by Monkeys" test)
- Titolo Caso in intestazioni di pagina (caso di riferimento in `H1` attraverso `H6`)
- Detentori generici: gettoni angolo-bracket, `xxx`, `your-token`, `ABC123`
- Blocchi di codice senza un tag di lingua
- Esempi JavaScript dove TypeScript è la convention
- Blocchi di codice oltre 25 linee senza prosa tra
- Difficili paragrafi di prosa (molte linee per un paragrafo nella fonte)
- regole orizzontali `---` tra le sezioni
- Sottovoci che sono parole generiche singole: `Overview`, `Caveats`, `Notes`
- Bullone utilizzato per l'enfasi invece di un elemento UI o di fatto critico
- Pagina o sezione senza sommario di apertura
- Tre punti (`...`) invece di ellipsi (`…`) in copia di caricamento
- Acronimi utilizzati prima di essere scritto
- Numeri di unità di barra (`64KB`, `5kb`, `200MS`) invece di `64 KB`, `5 KB`, `200 ms`
- "Noi" siamo qui per "tu"
- Domande retoriche
- Parole di riempimento: `very`, `just`, `really`, `simply`
- Riferimenti a "il file di esempio completo alla fine della guida" piuttosto che inlineare il codice
- "Loading..." invece di "Loading..."
- Transizioni in stile sommario che ritraggono il paragrafo precedente (`With this setup complete…`)
- I frammenti di stop-start spaccano un'idea dipendente in frasi taglienti
- Lettura vocale spettrale come un foglio di dati (`provides`, `is configurable`, `is explicitly labeled`)
- Sezioni corporee aperte a freddo la cui prima frase non ha antecedente
- Artifici personificati che eseguono azioni umane-fisiche (`hand the browser a URL`)
- Riutilizzato/templato non specifico alla pagina (`The question most teams face is whether…`)
- Parole di Weasel al posto di un reclamo specifico (`significantly`, `many`, `often`, `typically`, `generally`)
- Quantificatori vaghi senza una cifra (`near-zero`, `sub-second`, `most requests`)
- Filler o verbi metaforici invece del passaggio letterale (`moves through`, `lands`, `carries`, `hits`)
- Sentenze che hanno bisogno di una seconda lettura
- Paragrafi su 4 frasi o due idee
- URL di barra o `here`/`link` come testo di ancoraggio
- Chiamare il prodotto "L'host" o qualsiasi ortografia diversa da Shellui
- Guidare una pagina di prodotto di spedizione con AI, MCP o copia del mercato
- Isfie ordinarie contrassegnate come errori (gli ifi sono preferiti)

## Emissione di revisione

Gruppo per file. Utilizzare il formato `file:line` (cliccabile nel codice VS). Risulta Terse.

```text
## src/features/apps-and-navigation/index.njk

src/features/apps-and-navigation/index.njk:18 - banned word "easy"
src/features/apps-and-navigation/index.njk:24 - em dash in prose; use a hyphen
src/features/apps-and-navigation/index.njk:31 - "the user" → "you"
src/features/apps-and-navigation/index.njk:47 - placeholder YOUR_TOKEN → your_access_token_here

## src/architecture/index.njk

✓ pass
```

Numero di Stato + posizione. Salta la spiegazione a meno che la correzione non sia ovvia. Niente preambolo.
