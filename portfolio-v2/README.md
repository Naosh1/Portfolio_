# ENCRE

Landing page de portfolio de **Camillia Emtir** (alias Naoshi), développeuse web
full-stack, étudiante en BUT Informatique.

---

## L'idée

Le site n'est pas un écran, c'est une **surface**. Le contenu ne s'affiche pas en
fondu : il **se diffuse**, comme de l'encre qui gagne le papier.

Tout le reste découle de là. Un masque radial part d'un point et gonfle pendant
qu'un filtre de turbulence SVG déchire son bord ; dès la diffusion terminée le
filtre est retiré et le texte redevient net. C'est le geste unique du site, et il
sert partout : à l'ouverture, sur les phrases fortes, sur les plaques des projets.

Les références (interfaces de jeu, encre japonaise, atmosphères nocturnes) sont
digérées, jamais citées : pas un logo, pas un personnage, pas un néon. Ce qui en
reste, c'est le noir qui dévore, le vide autour du texte, et un seul rouge.

## La matière

| Rôle | Valeur | Usage |
|---|---|---|
| `void` | `#0a0a0b` | Le fond, presque tout le site |
| `paper` | `#e8e4dc` | Le texte. Jamais de blanc pur, toujours un peu chaud |
| `paper-2` | `#b7b3ab` | Texte secondaire (9,5:1) |
| `ash` | `#827e75` | Libellés mono (4,9:1, seuil AA à 10 px) |
| `ash-2` | `#3a3833` | Filets, graduations, bordures |
| `vermillon` | `#c8321e` | Aplats : sceau, filets actifs |
| `vermillon-lit` | `#e04a32` | Le même en version texte (4,9:1) |

L'accent apparaît quatre ou cinq fois sur toute la page. C'est délibéré : c'est sa
rareté qui le rend fort.

**Typographie** : Instrument Serif pour l'affichage, JetBrains Mono pour tout le
reste. Les deux sont **auto-hébergées** dans `src/fonts` — aucune requête vers
Google, rien qui dépende d'un service tiers.

## Les cinq actes

La page se lit d'une traite, comme une planche numérotée. Pas de barre de
navigation, pas de menu : le cadre aux quatre coins dit simplement où l'on est.

1. **Le seuil** — Le nom déborde par la gauche et se fait couper par le bord.
   Chaque élément défile à une vitesse différente : c'est ce décalage qui fait la
   profondeur, pas une ombre.
2. **Le relevé** — Trois fragments annotés en marge, quatre mesures graduées.
3. **Les pièces** — Un index, pas une grille de cartes. La plaque du projet
   survolé se diffuse dans la colonne voisine, qui chevauche l'index.
4. **Le métier** — Deux bandes d'outils entraînées par le défilement, pas par une
   boucle automatique. Le visiteur tient la manivelle.
5. **Le sceau** — Presque vide. Une adresse, et c'est tout.

## Détails d'implémentation

- **Les plaques des projets sont générées**, pas photographiées. Chaque pièce a
  une graine (teinte, inclinaison, position) qui dessine sa propre tache. Le point
  clé : les disques ont un **bord franc** — un dégradé flou resterait flou une
  fois déformé et donnerait une lueur, pas de l'encre.
- **La séquence d'ouverture ne joue qu'une fois par session.** Un script inline
  dans le `<head>` pose l'attribut avant la première peinture : au retour, le
  visiteur ne voit même pas un éclair de noir.
- **Le curseur** est deux éléments : un point collé au pointeur, un anneau en
  retard. C'est l'écart entre les deux qui donne l'inertie, pas la taille.
- **Le grain** est une tuile SVG tirée une fois. Sans lui, les aplats noirs ont
  l'air de plastique.

## Accessibilité

- Contrastes vérifiés : tout le texte porteur d'information passe WCAG AA.
- `prefers-reduced-motion` coupe la séquence d'ouverture, les masques, les
  filtres, les boucles et le curseur personnalisé. Le contenu arrive d'un bloc.
- **Sans JavaScript**, une règle `<noscript>` force tous les éléments animés à
  leur état final : le site perd ses animations mais reste entièrement lisible.
- Navigation clavier complète, lien d'évitement, libellés ARIA sur les liens
  externes. Les bandes décoratives sont doublées d'une liste pour lecteurs
  d'écran.
- Le curseur natif n'est masqué que lorsqu'un vrai remplacement est actif
  (pointeur fin, animations autorisées).

## Développement

```bash
npm install
npm run dev     # http://localhost:3000
npm run build
```

Next.js 15 (App Router) · TypeScript · Tailwind CSS 4 · Framer Motion.

## Où modifier quoi

| Je veux changer… | Fichier |
|---|---|
| Mon nom, mon email, mes chiffres, mes outils | `src/data/profile.ts` |
| Mes projets | `src/data/works.ts` |
| Les couleurs, les polices, les courbes | `src/app/globals.css` (bloc `@theme`) |
| Le texte de la séquence d'ouverture | `src/components/boot/BootSequence.tsx` |
| Un acte en particulier | `src/components/acts/Act*.tsx` |

Pour ajouter un projet : une entrée dans `WORKS`, avec un `ref` en chiffre romain
et une graine `plate` (`hue` entre 0 et 40 pour rester dans la famille vermillon).
Rien d'autre à toucher — l'index, la plaque et la version mobile suivent.
