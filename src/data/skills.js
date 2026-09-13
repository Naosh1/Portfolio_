// ============================================================
// COMPÉTENCES
// `level` : 'pro' = pratiqué en production pendant le stage
//           'school' = pratiqué en projet universitaire
// ============================================================

export const SKILLS = [
  {
    id:    'langages',
    label: 'Langages',
    items: [
      { name: 'JavaScript', level: 'pro'    },
      { name: 'TypeScript', level: 'pro'    },
      { name: 'PHP',        level: 'school' },
      { name: 'Java',       level: 'school' },
      { name: 'Python',     level: 'school' },
      { name: 'SQL',        level: 'school' },
      { name: 'HTML / CSS', level: 'pro'    },
    ],
  },
  {
    id:    'frontend',
    label: 'Front-end',
    items: [
      { name: 'React',        level: 'pro'    },
      { name: 'Next.js',      level: 'pro'    },
      { name: 'TailwindCSS',  level: 'pro'    },
      { name: 'Zustand',      level: 'pro'    },
      { name: 'React Query',  level: 'pro'    },
      { name: 'Angular',      level: 'school' },
    ],
  },
  {
    id:    'backend',
    label: 'Back-end & APIs',
    items: [
      { name: 'Node / Express', level: 'pro'    },
      { name: 'API REST',       level: 'pro'    },
      { name: 'OAuth 2.0',      level: 'pro'    },
      { name: 'Stripe',         level: 'pro'    },
      { name: 'APIs IA',        level: 'pro'    },
      { name: 'Flask',          level: 'school' },
    ],
  },
  {
    id:    'data',
    label: 'Bases de données',
    items: [
      { name: 'MongoDB',    level: 'pro'    },
      { name: 'PostgreSQL', level: 'school' },
      { name: 'MySQL',      level: 'school' },
      { name: 'Mongoose',   level: 'pro'    },
      { name: 'MCD / MLD',  level: 'school' },
    ],
  },
  {
    id:    'infra',
    label: 'Déploiement & outils',
    items: [
      { name: 'Git / GitHub', level: 'pro'    },
      { name: 'Netlify',      level: 'pro'    },
      { name: 'Vercel',       level: 'pro'    },
      { name: 'Cloudflare',   level: 'pro'    },
      { name: 'Vite',         level: 'pro'    },
      { name: 'Linux',        level: 'school' },
    ],
  },
  {
    id:    'method',
    label: 'Méthode & transverse',
    items: [
      { name: 'SEO / GEO',        level: 'pro'    },
      { name: 'Relation client',  level: 'pro'    },
      { name: 'Agile',            level: 'school' },
      { name: 'MVC',              level: 'school' },
      { name: 'UML',              level: 'school' },
      { name: 'RGPD',             level: 'school' },
    ],
  },
]

export const LEVEL_LABEL = {
  pro:    'Pratiqué en production',
  school: 'Pratiqué en projet',
}
