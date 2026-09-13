/**
 * Le grain. Une tuile de bruit tirée une seule fois en SVG, posée par-dessus
 * tout le site. C'est ce qui empêche les aplats noirs de ressembler à du
 * plastique : sans lui, la page a l'air d'un écran, avec lui elle a l'air d'une
 * surface.
 */
export function Grain() {
  return <div className="grain" aria-hidden="true" />
}
