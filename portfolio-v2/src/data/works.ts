export type Work = {
  /** Numéro de pièce, affiché dans la marge. */
  ref: string
  title: string
  kind: string
  year: string
  /** Une phrase. Pas deux. */
  line: string
  stack: readonly string[]
  href: string | null
  status: 'En production' | 'Terminé'
  /**
   * Graine de la plaque d'encre : deux teintes et une position de source.
   * Chaque pièce a sa propre tache, générée, jamais une image plaquée.
   */
  plate: {
    hue: number
    tilt: number
    x: number
    y: number
  }
}

export const WORKS: readonly Work[] = [
  {
    ref: 'I',
    title: 'Plateforme SaaS LinkedIn',
    kind: 'Produit · conçu de bout en bout',
    year: '2026',
    line: "Un mois entier de contenu LinkedIn préprogrammé en quelques minutes, textes générés par IA et publication réelle via l'API v2.",
    stack: ['React', 'TypeScript', 'Express', 'MongoDB', 'OAuth 2.0'],
    href: null,
    status: 'En production',
    plate: { hue: 8, tilt: -6, x: 32, y: 38 },
  },
  {
    ref: 'II',
    title: 'Auberge Le Permayou',
    kind: 'Site trilingue · back-office',
    year: '2026',
    line: "Refonte complète d'un hôtel-restaurant de la Vallée d'Aspe, en trois langues, avec un back-office que les gérants pilotent depuis leur téléphone.",
    stack: ['Next.js', 'MongoDB', 'i18n', 'SEO local'],
    href: null,
    status: 'En production',
    plate: { hue: 22, tilt: 8, x: 62, y: 30 },
  },
  {
    ref: 'III',
    title: 'Entre Maman et Moi',
    kind: 'E-commerce',
    year: '2026',
    line: "Kits de cuisine indienne, ateliers et traiteur : paiement Stripe, cartes cadeaux, points relais et espace d'administration refondu.",
    stack: ['Next.js', 'Stripe', 'Resend', 'Mondial Relay'],
    href: 'https://entre-maman-et-moi.fr/',
    status: 'En production',
    plate: { hue: 0, tilt: -3, x: 45, y: 62 },
  },
  {
    ref: 'IV',
    title: 'Shishi Samui',
    kind: 'Réservation · abonnements',
    year: '2026',
    line: "Six activités, six logiques de tarification : abonnements Stripe, système de crédits déductibles et règles paramétrables par le club lui-même.",
    stack: ['Next.js', 'Stripe', 'MongoDB'],
    href: 'https://shi-shi-samui.com/',
    status: 'En production',
    plate: { hue: 14, tilt: 5, x: 70, y: 55 },
  },
  {
    ref: 'V',
    title: 'Arti',
    kind: 'Cartes cadeaux en ligne',
    year: '2026',
    line: "Un café-atelier céramique qui vend ses cartes cadeaux en ligne : code unique vérifié en base, péremption calculée, emails transactionnels.",
    stack: ['Next.js', 'Stripe', 'Resend'],
    href: 'https://articafeceramique.fr/',
    status: 'En production',
    plate: { hue: 30, tilt: -9, x: 28, y: 58 },
  },
  {
    ref: 'VI',
    title: 'Gestion Visiteurs JPO',
    kind: 'Universitaire · équipe de trois',
    year: '2026',
    line: "Collecte des visiteurs d'une journée portes ouvertes sur tablette, back-office filtrable, export CSV et purge RGPD automatique.",
    stack: ['React', 'TypeScript', 'API REST', 'PostgreSQL'],
    href: null,
    status: 'Terminé',
    plate: { hue: 18, tilt: 4, x: 55, y: 45 },
  },
]
