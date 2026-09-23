---
title: Règles de design web
description: Règles d'interface, d'accessibilité et de chrome pour le site Shellui, la documentation et les applications dans le shell.
version: 1.1.1
---

Ces règles couvrent mise en page, interaction et langage visuel sur [shellui.com](https://shellui.com), [docs.shellui.com](https://docs.shellui.com), et les applications hébergées dans l'iframe Shellui. Associez-les aux [règles rédactionnelles](/guidelines/writing/) pour la copie. Mettez en avant le shell livré : navigation, authentification, administration, stockage, thèmes clair et sombre. Gardez le chrome AI, MCP et marketplace hors de l'UI par défaut.

Agents : chargez ce fichier. Ne scrapez pas la page HTML. Le champ `version` du frontmatter est le libellé public « Guidelines v… ».

## Comment utiliser ce fichier

- **Humains** : lisez la page sur `/guidelines/web-design/`, ou téléchargez ce markdown
- **Agents** : lisez `content/guidelines/web-design.md` dans ce dépôt, ou récupérez `https://shellui.com/guidelines/web-design.md`
- **Skill wrapper** : `skills/web-design-guidelines/SKILL.md`
- **Frère** : [règles rédactionnelles](/guidelines/writing/) pour voix et ton
- **Composer des pages avec** : [design.md](/design.md) (`fetch https://shellui.com/design.md`)
- **Hub** : [Guidelines](/guidelines/)

Relisez les fichiers contre chaque règle ci-dessous. Constats concis à haute signalisation. Sacrifiez la grammaire pour la brièveté.

## Chrome Shellui

Le produit est un shell microfrontend. L'hôte possède le chrome partagé ; l'iframe possède l'application.

- Chrome hôte : barre latérale, barre supérieure ou layout fenêtre, plus toasts, dialogues, tiroirs, thème et langue. Ne les reconstruisez pas dans l'iframe
- Les applications iframe dialoguent avec le shell via `@shellui/sdk` (`init`, postMessage). N'atteignez pas le DOM hôte
- Le mode de layout est une préoccupation du shell (`shellui.config.ts`). L'UI application doit fonctionner en sidebar, top-bar et layouts fenêtre
- Ne couvrez pas l'en-tête shell, la nav ou la zone toast. Les barres d'app fixes ont besoin d'un offset pour le chrome hôte
- Authentification, admin (`/admin`) et Files sont des surfaces shell. Deep linkez-les ; ne clonez pas leur navigation
- Thème et locale vivent dans le shell. Lisez-les ; ne livrez pas un second sélecteur de thème dans l'app sauf si l'app est la surface paramètres
- Préférez les tokens Tailwind existants. L'accent primaire est or miel (`--color-primary`, `--color-primary-ink`). N'inventez pas une seconde couleur de marque
- Chrome site marketing : en-tête fixe (`h-16`), gouttières `.page-top` et `.page-x`, footer. Mettez `.page-x` sur la bande externe et gardez les enfants `max-w-*` sans padding horizontal pour les aligner avec l'en-tête. L'UI sticky in-page doit dégager l'en-tête
- Logos et marques : téléchargez depuis [Brand assets](/brand-assets/). Ne déformez pas, ne recolorez pas et ne remplacez pas le wordmark

## Accessibilité et focus

- Les boutons icône seule ont besoin de `aria-label`
- Les contrôles de formulaire ont besoin d'un `<label>` ou `aria-label`
- Les éléments interactifs ont besoin de gestionnaires clavier (`onKeyDown` / `onKeyUp` lorsque le clic ne suffit pas)
- `<button>` pour les actions ; `<a>` pour la navigation. Jamais de `<div>` avec gestionnaire de clic
- Les images ont besoin de `alt` (ou `alt=""` si décoratif)
- Les icônes décoratives ont besoin de `aria-hidden="true"`
- Les mises à jour async (toasts, validation) ont besoin de `aria-live="polite"`. Les toasts shell vivent déjà dans l'hôte - utilisez le SDK, ne montez pas une seconde région live qui entre en conflit avec l'hôte
- HTML sémantique (`header`, `nav`, `main`, `footer`) avant ARIA
- Titres hiérarchiques `h1`–`h6` ; un seul `h1` par page
- Incluez un lien d'évitement vers le contenu principal sur un chrome long (shell et en-tête marketing)
- `scroll-margin-top` sur les ancres de titres pour que l'en-tête fixe ne couvre pas la cible
- Les médias significatifs ont besoin de légendes, transcriptions ou descriptions
- Les contrôles média ont besoin du clavier ; masquez les médias décoratifs aux technologies d'assistance
- Les éléments interactifs ont besoin d'un focus visible : `focus-visible:ring-*` ou équivalent
- Jamais `outline-none` sans remplacement de focus
- Utilisez `:focus-visible` plutôt que `:focus` (évitez un anneau au clic pointeur)
- Groupez le focus avec `:focus-within` pour les contrôles composés
- Piégez le focus dans les dialogues ; renvoyez-le au déclencheur à la fermeture
- Cibles tactiles : si le contrôle visuel fait < 24px, étendez la zone à ≥ 24px ; sur mobile ≥ 44px
- Le statut n'est pas la couleur seule ; incluez un libellé texte
- En-têtes, pieds et overlays sticky ne doivent pas couvrir l'élément focus (en-tête marketing 16 × 4px ; barre supérieure shell en layout top-bar)

## Formulaires et saisie

- Les champs ont besoin de `autocomplete` et d'un `name` significatif
- Utilisez le `type` correct (`email`, `tel`, `url`, `number`) et `inputmode`
- Ne bloquez jamais le collage (`onPaste` + `preventDefault`)
- Libellés cliquables (`htmlFor` ou enveloppant le contrôle)
- Désactivez le correcteur sur e-mails, codes, noms d'utilisateur, tokens (`spellCheck={false}`)
- Cases et radios : libellé et contrôle partagent une cible (pas de zones mortes)
- Envoyer reste actif jusqu'au début de la requête ; spinner pendant la requête ; conservez le libellé d'origine
- Ne pré-désactivez pas envoyer sur formulaires incomplets ; l'envoi affiche les erreurs
- Ne bloquez pas les frappes sur champs saisis ; validez après saisie
- Entrée envoie lorsqu'un champ texte est le seul contrôle ; dans `<textarea>`, ⌘/Ctrl+Entrée envoie
- Erreurs inline à côté des champs ; focus la première erreur à l'envoi
- Les placeholders se terminent par `…` et montrent un exemple (`your_access_token_here…`)
- `autocomplete="off"` sur champs non-auth pour éviter les déclencheurs de gestionnaire de mots de passe
- Avertissez avant navigation avec modifications non enregistrées (`beforeunload` ou garde routeur)
- Les champs auth appartiennent au shell lorsque l'app est hébergée. Ne dupliquez pas l'UI connexion dans l'iframe sauf si vous remplacez le backend identité

## Mouvement, toucher et mise en page

- Respectez `prefers-reduced-motion` (variante réduite ou désactivation). La révélation de thème marketing se désactive déjà sous cette media query - alignez-vous
- Animez `transform` et `opacity` uniquement (compatible compositeur)
- Jamais `transition: all` ; listez les propriétés explicitement
- Définissez le `transform-origin` correct
- SVG : transforms sur un wrapper `<g>` avec `transform-box: fill-box; transform-origin: center`
- Animations interruptibles - répondez à la saisie en cours d'animation
- Mouvement autoplay > 5 secondes : pause, stop ou masquage des contrôles
- Les boucles décoratives muettes doivent s'arrêter sous `prefers-reduced-motion`
- `touch-action: manipulation` (évite le délai double-tap zoom)
- Définissez `-webkit-tap-highlight-color` intentionnellement
- `overscroll-behavior: contain` dans modales, tiroirs et sheets - y compris tiroirs shell
- Pendant le drag : désactivez la sélection texte, `inert` sur éléments déplacés
- Drag, swipe, pinch et gestes de trajectoire : alternatives tap/clic et clavier sauf si le geste est le point central
- `autoFocus` avec parcimonie - bureau uniquement, une saisie primaire ; évitez sur mobile
- Layouts full-bleed : `env(safe-area-inset-*)` pour encoches
- Évitez scrollbars indésirables : corrigez overflow plutôt que masquer avec `overflow-x-hidden` sur `body`
- Flex et grid plutôt que mesure JavaScript pour la mise en page
- Rayons imbriqués : enfant ≤ parent, concentriques (`rounded-md` dans `rounded-xl`)
- Concevez états vide, sparse, dense et erreur
- Aide inline avant infobulles
- Apps iframe : ne supposez pas que la hauteur viewport égale la fenêtre. Le chrome shell consomme de l'espace. Préférez `%` / flex dans l'iframe, pas `100vh`, sauf si vous soustrayez le chrome hôte

## Langage visuel

- Densité : orientée développeur, pas surchargée. Alignez `page-top`, `page-x`, `max-w-5xl` / `max-w-3xl` prose, cartes `rounded-xl` et bordures grises déjà sur brand-assets et pages feature
- Clair et sombre sont tous deux first-class. Prévisualisez chaque écran dans les deux. Site marketing : `html.dark` plus `localStorage.theme`. Produit : thème `@shellui/core`
- `color-scheme: dark` sur `html` lorsque le thème sombre est actif (corrige scrollbar et contrôles natifs)
- Meta `theme-color` correspond au fond de page
- `<select>` natif : `background-color` et `color` explicites (mode sombre Windows)
- Ellipse `…`, pas trois points `...`. États de chargement : `Loading…`, `Saving…`
- Préférez le tiret `-` pour une pause dans la copie UI. Interdiction em dash (`—`) et en dash (`–`) comme ponctuation. Les tirets ordinaires restent
- Guillemets droits dans la source. Ne convertissez pas en guillemets courbes à la main
- `font-variant-numeric: tabular-nums` pour colonnes de nombres et comparaisons
- `text-wrap: balance` ou `text-pretty` sur les titres (évite veuves)
- Les conteneurs texte gèrent le contenu long : `truncate`, `line-clamp-*`, ou `break-words`
- Les enfants flex ont besoin de `min-w-0` pour permettre la troncature
- Gérez les états vides - ne rendez pas d'UI cassée pour chaînes ou tableaux vides
- Contenu utilisateur : anticipez saisies courtes, moyennes et très longues
- Boutons et liens : état `hover:`. Survol, actif et focus augmentent le contraste, ne l'aplatissent pas
- La copie UI suit les [règles rédactionnelles](/guidelines/writing/) : voix active, titres page en sentence case, libellés nav en Title Case, verbes de bouton précis (« Enregistrer le jeton », pas « Continuer »)
- Chiffres pour les comptages : « 8 apps », pas « eight »
- Les messages d'erreur incluent la prochaine étape, pas seulement le problème
- `&` plutôt que « and » seulement où l'espace est serré (nav, boutons)
- Le nom **Shellui** ne se traduit jamais : `translate="no"` sur le wordmark en HTML où la traduction auto le déformerait

## Performance et état

- `<img>` : `width` et `height` explicites (évite layout shift)
- Images below-fold : `loading="lazy"`
- Images critiques above-fold : `fetchpriority="high"`
- Grandes listes (> 50 éléments) : virtualisez ou `content-visibility: auto`
- Pas de lectures layout au render (`getBoundingClientRect`, `offsetHeight`, `offsetWidth`, `scrollTop`)
- Regroupez lectures et écritures DOM ; n'entrelacez pas
- Préférez inputs non contrôlés ; contrôlés doivent être peu coûteux par frappe
- Auto-hébergez scripts tiers quand c'est pertinent (`@shellui/sdk` tiny est servi depuis `/assets/js/`). Subresource Integrity si vous chargez depuis un CDN
- Polices critiques : preload avec `font-display: swap`. Ce site marketing utilise la stack système - n'ajoutez pas de webfont sans raison
- Préférez vidéo compressée au GIF animé ; fournissez une alternative fixe
- Courtes boucles décoratives : vidéo muette, media condition `prefers-reduced-motion`, repli fixe
- L'URL reflète l'état - filtres, onglets, pagination, panneaux ouverts en query params. Deep linkez l'UI stateful
- Les liens sont de vrais liens (`<a>`), pour Cmd/Ctrl+clic et clic molette
- Actions destructives : modale de confirmation ou fenêtre d'annulation - jamais immédiat
- Dates et heures : `Intl.DateTimeFormat`, pas chaînes en dur
- Nombres et devise : `Intl.NumberFormat`
- Détectez la langue via `Accept-Language` / `navigator.languages`, pas IP. Le shell possède déjà la locale
- Hydratation : inputs avec `value` ont besoin de `onChange` (ou `defaultValue` si non contrôlé)
- Rendu date/heure : garde contre mismatch serveur/client
- `suppressHydrationWarning` seulement où vraiment requis
- Pages Eleventy = HTML statique. N'hydratez pas toute une page marketing pour un toggle thème - gardez Alpine/JS scoped

## Anti-patterns (signalez ceux-ci)

- `user-scalable=no` ou `maximum-scale=1` désactivant le zoom
- `onPaste` avec `preventDefault`
- `transition: all`
- `outline-none` sans remplacement focus-visible
- Navigation par gestionnaire de clic sans `<a href>`
- `<div>` ou `<span>` avec gestionnaires de clic qui devraient être `<button>` ou `<a>`
- Images sans dimensions
- Grands tableaux `.map()` sans virtualisation
- Champs sans libellés
- Boutons icône sans `aria-label`
- Envoyer désactivé avant que l'utilisateur essaie (masque validation)
- Cibles < 24px (44px mobile) sans zone étendue
- Formats date/nombre en dur (utilisez `Intl.*`)
- `autoFocus` sans raison claire
- GIF animé quand vidéo compressée convient
- Action geste seul sans alternative tap/clic et clavier
- Em dash dans copie UI ; « corriger » les tirets ordinaires
- Reconstruire toasts, dialogues ou nav shell dans l'iframe
- Layouts `100vh` sous chrome hôte
- Second sélecteur de thème dans app hébergée
- UI produit livré menant avec chrome AI, MCP ou marketplace
- Styles thème sombre manquants (`dark:` ou tokens thème)
- Focus ou titres masqués sous en-tête marketing fixe ou barre supérieure shell

## Sortie de relecture

Groupez par fichier. Format `file:line` (cliquable dans VS Code). Constats concis.

```text
## src/guidelines/index.njk

src/guidelines/index.njk:12 - bouton icône sans aria-label
src/guidelines/index.njk:40 - cible titre sans scroll-margin-top
src/guidelines/index.njk:58 - animation sans prefers-reduced-motion

## src/assets/css/extras.css

src/assets/css/extras.css:22 - transition: all → listez propriétés
src/assets/css/extras.css:41 - outline-none sans remplacement focus-visible

## src/_includes/nav.njk

✓ pass
```

Signalez problème + emplacement. Pas d'explication sauf correctif non évident. Pas de préambule.
