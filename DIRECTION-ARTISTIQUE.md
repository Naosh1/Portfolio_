# Direction artistique — Portfolio Camillia Emtir

Recap de la DA telle qu'elle est implémentée dans le projet (`src/styles/global.css`, `src/pages/HomePage.jsx`, `src/components/Footer.jsx`).

## 1. Positionnement

Brutalist assumé : noir, blanc, un seul accent orange, aucune nuance intermédiaire pour les éléments structurants. L'idée est de trancher plutôt que d'adoucir : bordures franches, ombres portées dures (jamais de flou), typographie lourde en majuscules. Le site ne cherche pas à paraître "joli" au sens classique, mais net, technique et confiant.

## 2. Couleurs

| Rôle | Valeur | Usage |
|---|---|---|
| `--ink` | `#000000` | Texte, bordures, fonds sombres |
| `--paper` | `#ffffff` | Fond principal |
| `--accent` | `#ff4d1c` | Couleur signature : CTA, liens actifs, chiffres, hover |
| `--accent-dk` | `#d93c10` | Hover des éléments accent |
| `--grey-50` → `--grey-800` | du quasi-blanc au quasi-noir | Fonds secondaires, texte atténué, séparateurs |

Un seul accent, jamais deux couleurs vives ensemble. Le orange sert exclusivement à signaler ce qui est important ou interactif.

## 3. Typographie

- Police unique : **Montserrat** (300 à 900), pas de police secondaire.
- Titres : `font-weight: 900`, majuscules, `letter-spacing` négatif (texte resserré), `line-height` très compact (0.82 à 0.92) pour un effet d'affiche.
- Tailles fluides via `clamp()` : le titre d'accueil va de ~3.6rem sur mobile à ~11.5rem sur grand écran.
- Corps de texte : Montserrat normal, `line-height: 1.65`, beaucoup plus aéré que les titres — contraste volontaire entre gros titres compacts et texte courant lisible.

## 4. Structure visuelle

- **Bordures** : `2px solid` noir partout où un élément doit être "posé" (cartes, boutons, badges).
- **Ombres** : portées dures et sans flou (`4px 4px 0`, `6px 6px 0`, `8px 8px 0`), jamais de `box-shadow` classique avec flou. Au hover, l'élément se déplace vers le haut-gauche et l'ombre s'agrandit ; au clic, il "s'enfonce" (ombre réduite, translation inverse).
- **Grille** : conteneur limité à 1120px, grilles CSS simples (2 ou 3 colonnes), qui se replient en une colonne sur mobile.
- **Sections numérotées** : chaque bloc de contenu de la home est identifié par un gros numéro en contour (01, 02, 03) plutôt qu'un simple titre — renforce la lecture "dossier / portfolio" plutôt que "site marketing".

## 5. Page d'accueil — partis pris spécifiques

- **Hero** : le nom de Camillia passe en petite ligne discrète (plus de mise en scène sur le nom). Le vrai geste graphique est un mot qui change toutes les 2,6s après « Je construis des » : Sites → SaaS → Boutiques → Back-offices → API, avec une entrée lettre par lettre. Fond en grille technique (lignes fines) qui s'estompe vers les bords.
- **Bandeau défilant (marquee)** : stack technique en boucle continue sur fond orange plein, texture "sérigraphie d'atelier" plutôt que liste de compétences classique.
- **Projets en lignes** : liste numérotée sur fond noir, chaque ligne s'inverse en orange plein au survol avec une barre d'accent qui se déploie à gauche — pas de cartes, un rythme de lecture horizontal.
- **Sites en ligne** : trois cartes courtes avec badge "Live", pointant directement vers les sites réels (entre-maman-et-moi.fr, shi-shi-samui.com, articafeceramique.fr).
- **Sortie (outro)** : bloc noir plein écran, message alternance en très gros, email cliquable comme seul call-to-action — pas de formulaire, pas de page Contact séparée.

## 6. Footer

Simplifié à l'essentiel : identité (une seule occurrence du nom), navigation, un unique bloc "Me joindre" (email + GitHub), barre de copyright. Plus de signature géante en fond, plus de répétition du nom à chaque section.

## 7. Mouvement

- Révélations au scroll (`fadeUp`) sur les blocs de contenu, activées via `IntersectionObserver`.
- Curseur suiveur personnalisé sur desktop (souris fine uniquement), qui s'agrandit au survol des liens/boutons.
- Marquee en défilement continu, pulse discret sur le badge de disponibilité.
- Tout est neutralisé si `prefers-reduced-motion: reduce` est actif (contenu reste visible immédiatement, animations coupées) — vérifié en test.

## 8. Accessibilité

- Skip link, `focus-visible` avec contour orange épais, labels ARIA sur les liens qui ouvrent un nouvel onglet.
- Contrastes vérifiés sur fond noir (gris relevés à `--grey-400` minimum pour le texte secondaire).
- Aucun contenu n'est masqué sans JS ni bloqué par les animations.
