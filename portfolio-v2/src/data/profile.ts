export const PROFILE = {
  first: 'Camillia',
  last: 'Emtir',
  alias: 'Naoshi',

  role: 'Développeuse web full-stack',
  study: 'BUT Informatique',
  school: 'IUT de Montreuil · Université Paris 8',

  // Coordonnées affichées dans le HUD. Décoratives, mais vraies.
  place: 'Paris, FR',
  coords: '48.8566°N 2.3522°E',
  timezone: 'Europe/Paris',

  seeking: {
    label: 'Alternance · septembre 2026',
    long: "Je cherche une alternance en développement web full-stack à partir de septembre 2026.",
  },

  email: 'camilliaetr@gmail.com',
  github: 'https://github.com/Naosh1',
  githubHandle: 'Naosh1',

  /** Ce que le relevé raconte, en trois fragments. */
  register: [
    {
      k: 'Terrain',
      v: "Huit semaines en agence web, en autonomie quasi complète : prise de besoin, conception, développement, mise en production, itérations avec les clients finaux.",
    },
    {
      k: 'Méthode',
      v: "Je pars du problème, pas de la stack. Un cahier de conception avant la première ligne, des livraisons courtes et fréquentes, et un back-office pensé pour que le client n'ait plus jamais besoin de moi.",
    },
    {
      k: 'Obsession',
      v: "Ce qui se passe quand ça casse. L'OAuth qui tombe en serverless, les doublons en base, la connexion qui lâche en production : c'est là que le métier commence.",
    },
  ],

  /** Relevés techniques, affichés comme des mesures. */
  readings: [
    { label: 'Sites en production', value: '10+' },
    { label: 'Semaines en agence', value: '08' },
    { label: 'APIs tierces intégrées', value: '05' },
    { label: 'Pages SEO générées', value: '80+' },
  ],

  craft: [
    'TypeScript',
    'React',
    'Next.js',
    'Node',
    'Express',
    'MongoDB',
    'PostgreSQL',
    'Stripe',
    'OAuth 2.0',
    'API REST',
    'Tailwind',
    'Zustand',
    'React Query',
    'PHP',
    'Java',
    'Python',
    'Git',
    'Netlify',
    'Vercel',
    'Cloudflare',
  ],
} as const
