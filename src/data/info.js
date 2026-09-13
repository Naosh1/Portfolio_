// ============================================================
// INFOS PERSONNELLES
// ============================================================

export const PERSONAL_INFO = {
  firstName: 'Camillia',
  lastName:  'Emtir',
  fullName:  'Camillia Emtir',
  role:      'Développeuse full-stack',
  school:    'IUT de Montreuil, Université Paris 8',
  diploma:   'BUT Informatique',

  // Version courte (meta description, footer)
  short:
    "Étudiante en BUT Informatique, développeuse full-stack React / Next.js / Node.",

  // Courte présentation affichée sur la page « Moi »
  presentation:
    "Tout a commencé par curiosité : comprendre ce qui se cache derrière un site qui marche bien. " +
    "Depuis, je passe mon temps à construire des projets du premier croquis jusqu'à la mise en ligne, " +
    "avec un faible pour les détails que personne ne remarque mais qui changent tout. Toujours partante " +
    "pour tester un outil que je ne connais pas encore.",

  contact: {
    email:    'camilliaetr@gmail.com',
    github:   'https://github.com/Naosh1',
    // ⚠️ Remplace par l'URL de ton profil, ou laisse à null : le lien ne s'affichera pas.
    linkedin: null,
  },
}

// ============================================================
// BANDEAU DÉFILANT : accueil
// ============================================================
export const MARQUEE_WORDS = [
  'React',
  'Next.js',
  'TypeScript',
  'Node',
  'MongoDB',
  'Stripe',
  'OAuth 2.0',
  'PostgreSQL',
  'Tailwind',
  'Vercel',
]

// ============================================================
// NAVIGATION
// ============================================================
export const NAV_ITEMS = [
  { label: 'Accueil',     path: '/'            },
  { label: 'Moi',         path: '/moi'         },
  { label: 'Projets',     path: '/projets'     },
  { label: 'Compétences', path: '/competences' },
]

// Menu réutilisé par les écrans "jeu" (Projets, Compétences…) : la nav + GitHub
export const SITE_MENU = [
  ...NAV_ITEMS.map((item) => ({ ...item, external: false })),
  { label: 'GitHub', path: PERSONAL_INFO.contact.github, external: true },
]

// Menu de l'écran d'accueil : pas d'entrée "Accueil" (on y est déjà)
export const HOME_MENU = SITE_MENU.filter((item) => item.path !== '/')
