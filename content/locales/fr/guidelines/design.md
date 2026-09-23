---
title: Design
description: Comment composer des pages Shellui conformes à la marque. Récupérez ce fichier en premier lors de la construction de surfaces site ou produit. La page HTML sur /guidelines/design/ est un handbook visuel pour humains - ne la scrapez pas.
version: 1.3.1
---

Agissez comme un excellent designer, rédacteur et architecte de l'information Shellui. Transformez le matériel disponible en page officielle signée Shellui. Façonnez l'argument et l'interface ensemble. Ne restylez pas un empilement de sections et n'assemblez pas une landing page générique.

Récupérez ce fichier sur `https://shellui.com/design.md`. C'est l'autorité de composition pour les agents. Les humains utilisent `/guidelines/design/` pour les swatches et exemples. Il ne remplace pas les handbooks rédaction et design web.

- Rédaction : `https://shellui.com/guidelines/writing.md`
- Design web : `https://shellui.com/guidelines/web-design.md`
- Skills : `skills/design-md/SKILL.md`, puis les skills rédaction et design web si besoin

## Produit

Shellui est une plateforme open source de développement d'applications web : un shell microfrontend avec navigation, authentification, administration et stockage partagés. Public : développeurs qui livrent un produit dans ce shell.

Précis, calme, direct, techniquement literate, fondé sur des faits, sobre. Le nom est **Shellui** uniquement. Jamais « The Host ». En prose, « the shell » (minuscules) est l'hôte en exécution. Mettez en avant ce qui est livré aujourd'hui (hôte iframe, `@shellui/sdk`, identity-service ou Supabase Auth, `/admin`, stockage, Files). Gardez AI, MCP, marketplace et chrome app-store discrets sauf si la page porte sur cette surface.

## Priorité

1. Préservez les faits fournis, noms de paquets, URL, unités, qualificateurs et contraintes de tâche.
2. Préservez la stack hôte : Eleventy 3, Tailwind CSS v4, patterns Tailwind Plus déjà dans ce dépôt, Alpine pour les démos légères, variables CSS compatibles shadcn. Pas de nouveau framework, bibliothèque CSS ou système de tokens, sauf l'exception d'îlot page-scoped sous Stack.
3. Rendez immédiatement clairs la question du lecteur, la réponse la mieux étayée et les preuves matérielles.
4. Établissez la paternité Shellui via le chrome nav/footer existant, la typo système, le fond gris et l'or primaire parcimonieux.
5. Choisissez une composition propre à ce matériel. Ne clonez pas une page sans rapport comme modèle.
6. Affinez le responsive et les détails sans affaiblir la hiérarchie.

Posez des questions seulement si continuer pourrait changer des claims produit, tarifs, sécurité ou CTA. Sinon omettez l'inconnu, signalez-le et avancez.

## Stack

- Templates : Nunjucks dans `src/`. Layouts : `base`, `page`, `feature`, `post`, `guidelines`, `guidelines-design`.
- CSS : `src/assets/css/input.css` → `/assets/css/site.css`. Valeurs de tokens : `src/_data/designTokens.js` (doit correspondre à `input.css`).
- JS : Alpine (`src/blocks/`), Plus Elements (`/assets/js/elements.js`), bascule de thème (`src/assets/js/site.js`).
- Islands : une page peut lazy-loader un bundle React pour une pièce interactive qu'elle n'exprime pas en Alpine. Source dans `src/islands/`, bundlé par esbuild avec son CSS inlined, importé à la vue. `/architecture/` utilise `@xyflow/react` ainsi. Livrez un fallback statique dans le Nunjucks et réutilisez les variables de tokens ; n'utilisez pas une island pour un toggle, une tab strip ou un carousel.
- Images : `img/`, logos depuis `/brand-assets/`. Ne déformez pas et ne recolorez pas le wordmark.
- Iframe : le site peut se charger dans le shell (`@shellui/sdk` tiny). Ne couvrez pas le chrome hôte. Le thème suit `html.dark`.
- Ne livrez pas de HTML monofichier, de rewrite React/Vite, ni de package design-system parallèle.

Chrome à réutiliser : `nav.njk` (fixe `h-16`), `footer.njk`, `logo.njk`. Padding principal : `.page-top` (sous l'en-tête fixe) et `.page-x` (gouttières horizontales). N'ajoutez pas de second header, mega-footer, barre d'annonce ou second sélecteur de thème.

## Tokens

Fond gris. L'or miel est la couleur d'action. Un lavis primaire doux derrière le hero de la page d'accueil est ambient de marque, pas un champ doré. Préférez les utilitaires de tokens (`bg-background`, `text-foreground`, `border-border`, `bg-muted`, `text-muted-foreground`, `bg-primary`, `text-primary-foreground`, `text-primary-ink`, `bg-card`). En dark, le texte doré est `dark:text-primary` car `primary-ink` n'est pas remappé.

| Token | Light | Dark | Rôle |
| --- | --- | --- | --- |
| `background` | `#ffffff` | `#030712` | Toile de page |
| `foreground` | `#111827` | `#f9fafb` | Texte principal |
| `muted` | `#f9fafb` | `rgb(255 255 255 / 0.05)` | Creux discrets |
| `muted-foreground` | `#4b5563` | `#9ca3af` | Texte secondaire |
| `border` | `#e5e7eb` | `#1f2937` | Traits, cartes |
| `card` | `#ffffff` | `#111827` | Surface surélevée |
| `primary` | `#e3a512` | `#e8b84a` | Accent / boutons |
| `primary-foreground` | `#1a1408` | `#1a1408` | Texte sur or |
| `primary-ink` | `#c4920a` | use `primary` | Texte or sur fond clair |
| `ring` | `#e3a512` | `#e8b84a` | Focus |
| radius | `rounded-xl` cartes (`0.75rem`) ; `rounded-md` contrôles (`0.375rem`) | idem | Forme |

Les pages existantes peuvent encore utiliser `bg-white dark:bg-gray-950`. Même palette. Les nouveaux travaux doivent utiliser les noms de tokens.

Typo : police système. Un seul `h1` (`text-4xl font-bold md:text-5xl` pages intérieures, ou `font-semibold tracking-tight` ouvertures feature). Lede `text-lg text-muted-foreground`. Section `text-2xl` / `text-3xl font-semibold tracking-tight`. Corps `text-base/7`. Mesure ~60-70 caractères. Bouton : `rounded-md bg-primary px-3.5 py-2.5 text-sm font-semibold text-primary-foreground`. Secondaire = lien texte. L'or est parcimonieux. Largeurs : `max-w-7xl` chrome feature, `max-w-5xl` guidelines, `max-w-3xl` prose de lecture. Enveloppe horizontale : `.page-x` (`px-4 sm:px-6 lg:px-8`) sur la bande externe uniquement ; gardez les enfants `max-w-*` sans padding horizontal pour aligner header, corps et footer. Espacement sections `.page-top`, `mt-10`, `mt-16`.

## Reuse

Préférez les patterns Tailwind Plus livrés. Collez dans Nunjucks ou `{% demo %}`. Restylez avec les tokens Shellui. `<dialog>` natif / `el-dialog` sur ce site ; SDK shell pour les toasts dans une app hébergée.

| Job | File | Pattern |
| --- | --- | --- |
| Ouverture produit | `src/index.njk` | Hero centré, double CTA |
| Nav | `src/_includes/nav.njk` | Flyouts, Alpine, pas de nouvelle lib menu |
| Split feature | `src/features/index.njk`, `layouts/feature.njk` | Deux colonnes, une pièce dominante |
| Tarifs | `src/pricing/index.md` | Deux niveaux |
| FAQ | `src/_includes/home-faq.njk` | Titre scindé + définitions |
| Article | `layouts/post.njk` | Mesure étroite |
| Page intérieure | `layouts/page.njk`, `guidelines.njk` | Fil d'Ariane, h1, lede, prose |
| Bande CTA | `layouts/feature.njk` | Une bande discrète |
| Code | `{% highlight %}` | Shiki |
| Demo | `src/blocks/*.njk` | HTML réel, pas d'iframe |

**L'ambient marque Shellui** est autorisé : lavis primaire / ambre doux (`blur-3xl`, `from-primary to-amber-200`) derrière le hero de la page d'accueil ou un CTA discret. Le statique suffit. Rejetez blobs multicolores, nuages de logos, champs dégradés, marquees témoignages et faux dashboards.

## Compose

Le premier viewport est l'argument, pas un masthead plus setup. Partez du job du lecteur. Parcours exécutif (identité, titres, une action) et parcours audit (commandes, config, tableaux) sont tous deux requis. La copie suit les règles rédactionnelles (tirets, pas de em dash, pas de `easy` / `simple` / `quick`).

Un fil conducteur au niveau page. Une relation focale par moment de lecture. Plissez les yeux : une claim dominante. Si chaque bloc a le même poids, repensez. Ne comblez jamais un trou de preuve avec des panneaux, icônes ou effets.

Passes : cadrer le job → choisir la composition → appliquer ce système visuel → inspecter les deux thèmes. Livrez l'implémentation, pas un score.

## Reject

- Eyebrows en capitales espacées comme décoration
- Em dash ou en dash comme ponctuation
- `easy`, `simple`, `quick`, `seamless`, `unlock`, `leverage`
- Lueurs multicolores, rayures, glass, ombres ornementales. L'ambient hero primaire/ambre est autorisé (voir Reuse)
- Hero centré générique plus grille de cartes à poids égal
- Cartes imbriquées, ou bordures pour réparer une hiérarchie faible
- Tuiles icônes arbitraires, nuages de logos, fausses captures
- Second sélecteur de thème, seconde nav, ou chrome hôte reconstruit dans une iframe
- Ouvrir une page produit livrée avec une atmosphère AI / MCP / marketplace
- Narration du processus d'auteur dans la copie de page

La retenue, c'est une hiérarchie précise, une typo lisible, de l'or parcimonieux et des preuves - pas des marges vides.

## A11y

Landmarks, un seul `h1`, titres ordonnés, contrôles natifs, anneaux `focus-visible` visibles. WCAG AA. L'ordre source est l'ordre de lecture. `min-w-0` sur les enfants flex/grid. Détails : `https://shellui.com/guidelines/web-design.md`.
