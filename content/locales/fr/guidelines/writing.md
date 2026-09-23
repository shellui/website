---
title: Règles rédactionnelles
description: Voix, ton et règles de relecture pour la prose du site et de la documentation Shellui.
version: 1.0.0
---

Ces règles couvrent la copie sur [shellui.com](https://shellui.com), [docs.shellui.com](https://docs.shellui.com), et les chaînes in-product lues par les développeurs. Mettez en avant ce que Shellui livre aujourd'hui : un shell microfrontend avec navigation, authentification, administration et stockage partagés. Gardez AI, MCP et marketplace discrets sauf si la page porte vraiment sur cette surface.

Agents : chargez ce fichier. Ne scrapez pas la page HTML. Le champ `version` du frontmatter est le libellé public « Guidelines v… ».

## Comment utiliser ce fichier

- **Humains** : lisez la page sur `/guidelines/writing/`, ou téléchargez ce markdown
- **Agents** : lisez `content/guidelines/writing.md` dans ce dépôt, ou récupérez `https://shellui.com/guidelines/writing.md`
- **Skill wrapper** : `skills/writing-guidelines/SKILL.md`
- **Frère** : [règles de design web](/guidelines/web-design/) pour UI, accessibilité et chrome
- **Composer des pages avec** : [design.md](/design.md) (`fetch https://shellui.com/design.md`)
- **Hub** : [Guidelines](/guidelines/)

Relisez les fichiers contre chaque règle ci-dessous. Constats concis à haute signalisation. Sacrifiez la grammaire pour la brièveté.

## Marque

- Le nom produit est **Shellui** uniquement. Jamais « The Host ». Ne surélevez pas les deux dernières lettres ni camel-casez le nom ; paquets et dépôts restent en minuscules (`@shellui/sdk`, `shellui/identity-service`)
- En prose, « the shell » (minuscules) est l'hôte en exécution autour de l'app iframe. C'est un nom commun, pas une seconde marque
- One-liner par défaut : Shellui est une plateforme open source de développement d'applications web - un shell microfrontend qui enveloppe votre application avec navigation, authentification, stockage et administration partagés
- Le public est les développeurs qui livrent un produit dans ce shell, pas des « users » génériques ou « teams exploring AI »
- Surfaces : [docs.shellui.com](https://docs.shellui.com) pour la doc, [playground.shellui.com](https://playground.shellui.com) pour l'essayer, [GitHub](https://github.com/shellui) pour le code source. Mentionnez [shellui.ai](https://shellui.ai) seulement lorsque la page concerne cette propriété
- Téléchargements visuels (logos, marques, wordmarks) sur [Brand assets](/brand-assets/). Ne mélangez pas les règles d'usage logo dans la doc produit

## Voix et ton

- Voix active. Test mental : ajoutez « by monkeys ». Si la phrase tient encore, réécrivez
- Adresse directe : `you`, jamais `the user` ou `one can`
- Impératif pour les étapes : « Call **init** », pas « You will need to call **init** »
- Visez des phrases de moins de 20 mots
- Les contractions conviennent (`you'll`, `it's`)
- Présent sauf pour décrire un comportement qui n'existe pas encore
- Limitez `we` : seulement pour une action Shellui délibérée (« we recommend », « we deprecated »), jamais comme substitut de « you »
- Pas de questions rhétoriques (effet marketing)
- Test de seconde lecture : lisez chaque phrase une fois à voix haute. Si vous relisez pour comprendre, nommez sujet, action et conséquence. Éliminez verbes métaphoriques et pronoms qui renvoient plusieurs phrases en arrière
- Orienté développeur, pas commercial. Preuves plutôt que slogans. Nommez l'API, le fichier ou la commande

### Ton, par type de contenu

- **Tutorial** : structure chaleureuse et prévisible, sans pièges
- **How-to** : sec, direct (le lecteur est en pleine tâche)
- **Reference** : neutre, exhaustif, citable
- **Conceptual** : expliquez comme si le lecteur devait le réenseigner ; exemples bienvenus
- **Troubleshooting** : reconnaissez l'échec, puis corrigez. Empathie sans excuses
- **Site / blog** : même voix que la doc. Mettez en avant le produit livré, pas la roadmap

### Mots interdits

- `easy`, `simple`, `quick` : met la pression sur le lecteur et sonne marketing. Remplacez par une description concrète (« one command », « default settings », « most projects don't need this »)
- `very`, `just`, `really`, `simply` : remplissage ; coupez ou réécrivez
- `seamless`, `robust`, `powerful`, `next-generation`, `unlock`, `leverage` : brouillard marketing ; nommez le comportement
- Ne teasez pas le travail AI, MCP, app-store ou marketplace non livré sur les pages shell, auth, admin ou stockage

### Concision

- Chaque détail doit mériter sa place : coupez un chiffre, un nom ou un détail d'implémentation si une formulation plus générale ne change ni la compréhension ni l'action du lecteur
- Mots-vides : remplacez qualificatifs vagues (`significantly`, `many`, `often`, `typically`, `generally`) par un chiffre ou une affirmation précise
- Quantificateurs vagues : pas de `near-zero`, `sub-second`, `most requests` sans chiffre que vous pouvez assumer
- Verbes remplissage ou métaphore : nommez l'action (`moves through`, `lands`, `carries`, `hits` → l'étape littérale)

### Signes de texte IA (signalez)

- Transitions récap : n'ouvrez jamais un paragraphe en résumant le précédent (`With this setup complete…`, `Now that we've explored…`). Pivotez vers le point suivant
- Phrases hachées : ne scindez pas une idée dépendante en fragments (`Previously this was manual. Now it's automatic. This saves time.` → une phrase). Phrases courtes pour l'emphase conviennent
- Voix fiche technique : réécrivez les phrases qui sonnent datasheet (`provides`, `is configurable`, `is explicitly labeled`)
- Paragraphes à froid : un corps dont la première phrase tient comme titre seul n'a pas d'antécédent. Reportez le sujet précédent (`Because…`, `Once…`)
- Artefacts personnifiés : les machines ne font pas d'actions physiques humaines (`hand the browser a URL` → `the browser fetches the URL` ; `the token holds…` → `the token is stored…`)
- Cadrage réutilisé : l'angle doit venir de cette page, pas d'un modèle (`The question most teams face is whether…`)

## Structure et formatage

Règles pour planifier, titrer et baliser une page.

### Planification et type de contenu

- Chaque page doc a un plan (overview, goal, audience, content plan, open questions) référencé ou lié
- Type de contenu déclaré lorsque le système doc le supporte : `Tutorial`, `How-to`, `Reference`, `Conceptual`, `Troubleshooting`, ou `Landing`
- Le titre suit la question du lecteur, pas le nom de la feature (ingénieur)
- Une page = un job : tutorial ou how-to ou reference, pas trois à la fois
- Objectif piloté par un verbe : « configure », « explain », « debug » (testable)
- Pages multi-publics : courte ouverture partagée, puis sous-sections techniques
- Les pages marketing ont toujours besoin d'un paragraphe d'ouverture qui dit à quoi sert la page

### Titres

- Sentence case pour titres de page (`H1` `H2` `H3`) : « Configure the iframe SDK », pas « Configure The Iframe SDK »
- Title case pour libellés nav : « Writing Guidelines »
- `meta.title` (ou le `title` de page) devient le `H1` ; libellés nav restent courts
- Sous-titres descriptifs, pas cute : « Caveats when hosting on a custom domain », pas « Caveats »
- Le lecteur doit deviner la section depuis le titre seul

### Structure de page

- Chaque page ouvre sur un TL;DR d'un paragraphe sur ce qu'elle couvre
- Chaque section majeure ouvre sur une phrase résumé
- Épelez les acronymes à la première utilisation : « JSON Web Key Set (JWKS) is how the shell verifies tokens »
- Définissez chaque terme à la première utilisation (lien vers la page conceptuelle si elle existe)
- Docs reference organisées par surface ; docs éducation par tâche lecteur
- Paragraphes de 2 à 4 phrases. Scindez ce qui est plus long ou couvre deux idées

### Listes

- Trois éléments ou plus en forme de liste dans un paragraphe : convertissez en liste
- Puces pour non ordonné ; numéros pour ordonné (cycles de vie, étapes séquentielles)
- Introduisez toujours une liste par deux-points
- Pas de point en fin d'item sauf phrases complètes
- Format gras/description : `- **Term**: description here` (deux-points après le terme en gras)

### Code

- Les blocs code ont besoin d'une balise langue pour la coloration
- TypeScript par défaut pour nouveaux exemples sauf surface autre langue (Python pour identity-service, bash pour CLI)
- Flux multi-étapes : structure visible (étapes numérotées ou blocs séparés avec prose entre)
- Mettez en évidence les lignes porteuses si le renderer le supporte
- ≤80 colonnes par ligne dans les snippets
- ≤25 lignes par snippet ; scindez les blocs longs avec prose
- Omettez les défauts ; ne répétez pas les définitions de variables, nom partagé
- Commentaires minimaux dans blocs code ; préférez la prose
- Expliquez en prose ce que fait chaque bloc (pas drop and run)
- Ne renvoyez pas vers un fichier exemple complet en fin de guide (« See `app.ts` ») ; le guide est le livrable
- Préférez les vrais noms Shellui : `shellui.config.ts`, `@shellui/sdk`, `init`, identity-service, storage-service

```typescript
import { init } from "@shellui/sdk";

await init({
  clientId: your_client_id_here,
});
```

### Placeholders

- Placeholders texte : `snake_case`, descriptifs : `your_access_token_here` (double-clic sélection avant collage)
- Placeholders nombre : incrémentez `1234567890123` (reconnaissable comme faux, prévisible)
- Jamais tokens entre chevrons, `xxx`, `your-token`, ou ALL_CAPS générique

### Tailles et unités

- Espace + unité majuscule : `64 KB`, `5 KB`, `200 ms`
- Exception : secondes sans unité : `30s`
- Restez cohérent pour le scan lecteur

### Pages tarifs

- Shellui est MIT et gratuit à exécuter. Dites-le clairement
- Si vous mentionnez l'aide payante, dites ce que c'est (architecture, sur-mesure, support) et ce que ce n'est pas
- N'impliquez jamais un plan hébergé ou compteur d'usage inexistant
- Tableaux pour comparer options ; ne supposez pas que le lecteur connaît le modèle

### Emphase

- **Gras** = élément UI ou fait critique, jamais emphase pour emphase
- Si vous cherchez le gras pour le ton, la phrase est faible ; réécrivez
- `Code inline` pour chemins, extensions, identifiants, courts snippets : `/admin`, `.tsx`, `init`, `shellui.config.ts`
- Règle : si ça serait bizarre sans monospace, monospacez

### Ponctuation et typographie

- Préférez le tiret `-` pour une pause en prose : « Keep chrome in the shell - layouts, toasts, and theme included. »
- Interdiction em dash (`—`) et en dash (`–`) comme ponctuation. Ne « corrigez » pas les tirets ordinaires
- Tirets dans mots composés, noms de paquets et flags restent : `microfrontend`, `identity-service`, `--serve`
- Guillemets droits dans source markdown (`"` `'`). Ne convertissez pas en guillemets courbes à la main
- Ellipse `…`, pas trois points `...`
- États de chargement se terminent par `…` : `Loading…`, `Saving…`
- `&` plutôt que « and » où l'espace est serré (libellés nav, boutons)

### Formatage source

- Ne hard-wrappez pas : chaque paragraphe = une ligne source, laissez l'éditeur couper
- Une ligne vide avant titres ; une avant et après blocs code
- Pas de `---` entre sections
- Pas de lignes vides extra entre éléments qui ne sont pas sauts de paragraphe

### Liens

- Définissez chaque terme à la première apparition ; lien vers la page conceptuelle si elle existe
- Le texte d'ancre nomme la destination ; jamais URL nue ou `here` / `link`
- Docs canoniques : [docs.shellui.com](https://docs.shellui.com)
- Playground : [playground.shellui.com](https://playground.shellui.com)
- Source : [github.com/shellui](https://github.com/shellui)
- Fichiers marque : [shellui.com/brand-assets](https://shellui.com/brand-assets/)
- N'inventez pas de deep links dashboard. Liez le vrai chemin (`/admin`, page doc, dépôt GitHub)

## Quoi mentionner (et quoi omettre)

- **Par défaut livré** : hôte iframe, `@shellui/sdk`, identity-service ou Supabase Auth, admin sur `/admin`, storage-service ou Supabase Storage, Files
- **Omettre sauf si la page en parle** : fonctionnalités AI, MCP, app store, marketplace, items roadmap non livrés
- **Pages roadmap** peuvent lister le travail à venir. Ailleurs, le futur est une note de bas de page, pas le lede
- Ne présentez pas Shellui comme plateforme AI. C'est un shell autour de votre app

## Relecture

Comment les brouillons sont vérifiés - par une personne ou un agent.

### Workflow IA

- Vous êtes responsable du contenu produit, quelle que soit la façon de le créer
- Vous tranchez ; le modèle propose, vous disposez
- Exigez une exactitude technique élevée : la doc est aussi lue par des LLM, et une mauvaise doc entraîne de mauvais modèles
- Suivez `AGENTS.md` et ce fichier avant de générer prose site ou doc
- Planifiez d'abord ; le plan est le spec contre lequel le modèle travaille
- Après brouillon, testez : « given this page's goal, can a reader (or a model) complete the task using only this page? »
- Relecture humaine finale toujours
- Divulguez le modèle dans la PR si le brouillon a été généré

### Checklist qualité (cases requises non négociables)

- **Findability** : la page est liée depuis nav, doc ou page feature parente
- **Accuracy** : exemples code exécutables ; captures = UI actuelle
- **Relevance** : exemples code utiles (TypeScript d'abord ; Python ou bash selon surface)
- **Clarity** : ouverture who/what/where/why ; prérequis sur tutorials ; étapes concrètes ; chemin le plus court quand plusieurs existent
- **Completeness** : limites documentées ; objectifs du plan de contenu couverts
- **Readability** : noms nav scannables et verbes d'action ; sous-titres descriptifs ; sections commencent par résumés ; blocs code formatés ; voix active

### Pull requests

- Description PR : quoi relire et lien preview
- L'auteur est responsable, pas le relecteur ; approbation avec nits possible
- Commentaires suggestion pour petits fixes texte ; commentaire bloquant pour plus gros
- Désaccord OK ; rejetez en une ligne et avancez

## Anti-patterns (signalez)

- Em dash (`—`) ou en dash (`–`) comme ponctuation
- `easy`, `simple`, `quick` décrivant actions lecteur
- Voix passive (test « by monkeys »)
- Title Case dans titres page (sentence case en `H1` à `H6`)
- Placeholders génériques : tokens entre chevrons, `xxx`, `your-token`, `ABC123`
- Blocs code sans balise langue
- Exemples JavaScript où TypeScript est la convention
- Blocs code > 25 lignes sans prose entre
- Paragraphes prose hard-wrap (plusieurs lignes pour un paragraphe en source)
- `---` entre sections
- Sous-titres mot générique seul : `Overview`, `Caveats`, `Notes`
- Gras pour emphase au lieu d'élément UI ou fait critique
- Page ou section sans résumé d'ouverture
- Trois points (`...`) au lieu d'ellipse (`…`) dans copie de chargement
- Acronymes avant épellation
- Nombres d'unité nus (`64KB`, `5kb`, `200MS`) au lieu de `64 KB`, `5 KB`, `200 ms`
- « We » substituant « you »
- Questions rhétoriques
- Mots de remplissage : `very`, `just`, `really`, `simply`
- Références au « full example file at the end of the guide » plutôt qu'inliner le code
- « Loading... » au lieu de « Loading… »
- Transitions récap du paragraphe précédent (`With this setup complete…`)
- Fragments hachés scindant une idée dépendante
- Voix fiche technique (`provides`, `is configurable`, `is explicitly labeled`)
- Paragraphes corps à froid sans antécédent
- Artefacts personnifiés (`hand the browser a URL`)
- Cadrage modèle non spécifique à la page (`The question most teams face is whether…`)
- Mots-vides au lieu d'affirmation précise (`significantly`, `many`, `often`, `typically`, `generally`)
- Quantificateurs vagues sans chiffre (`near-zero`, `sub-second`, `most requests`)
- Verbes remplissage/métaphore au lieu de l'étape littérale (`moves through`, `lands`, `carries`, `hits`)
- Phrases nécessitant une seconde lecture
- Paragraphes > 4 phrases ou deux idées
- URL nues ou `here`/`link` comme ancre
- Appeler le produit « The Host » ou autre orthographe que Shellui
- Mener page produit livré avec copie AI, MCP ou marketplace
- Tirets ordinaires signalés comme erreurs (tirets préférés)

## Sortie de relecture

Groupez par fichier. Format `file:line` (cliquable VS Code). Constats concis.

```text
## src/features/apps-and-navigation/index.njk

src/features/apps-and-navigation/index.njk:18 - mot interdit « easy »
src/features/apps-and-navigation/index.njk:24 - em dash en prose ; utilisez un tiret
src/features/apps-and-navigation/index.njk:31 - « the user » → « you »
src/features/apps-and-navigation/index.njk:47 - placeholder YOUR_TOKEN → your_access_token_here

## src/architecture/index.njk

✓ pass
```

Signalez problème + emplacement. Pas d'explication sauf correctif non évident. Pas de préambule.
