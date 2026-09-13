// ============================================================
// PROJETS
// `slug` sert d'URL : /projets/:slug
// ============================================================

export const CATEGORIES = ['Tous', 'Personnel', 'Professionnel', 'Universitaire']

// Une couleur par catégorie, pour différencier les cartes projet d'un coup d'œil.
// Choisies assez saturées pour rester lisibles en texte blanc sur fond plein
// (badge « En production »), pas seulement comme simple liséré.
export const CATEGORY_COLOR = {
  Personnel:     '#8b5cf6', // violet — cohérent avec l'accent du site
  Professionnel: '#2563eb', // bleu
  Universitaire: '#f59e0b', // ambre
}

export const PROJECTS = [
  // ══════════════════════════════════════════════════════════
  // PERSONNEL
  // ══════════════════════════════════════════════════════════
  {
    slug:        'elan',
    title:       'Élan',
    subtitle:    'Séances de fitness générées sur mesure, 100 % sur l\'appareil',
    description:
      "Application de fitness qui génère des programmes d'entraînement personnalisés — calculés " +
      "directement sur l'appareil, sans serveur ni compte à créer.",
    category: 'Personnel',
    domain:   'Frontend',
    year:     '2026',
    status:   'En cours',
    featured: true,
    tags:     ['Next.js', 'React', 'TypeScript', 'Tailwind CSS', 'Framer Motion', 'Local-first'],
    links:    { demo: null, github: null },
    images: [
      '/projects/elan/resume.webp',
      '/projects/elan/seance.webp',
      '/projects/elan/seance-detail.webp',
      '/projects/elan/exercice.webp',
      '/projects/elan/repos.webp',
      '/projects/elan/progres.webp',
      '/projects/elan/historique.webp',
      '/projects/elan/agenda.webp',
    ],
    detail: {
      role:     'Conception et développement complet, en solo',
      duration: '2026',
      context:
        "Un projet personnel né de l'envie d'une app de sport qui ne demande ni compte, ni connexion, " +
        "ni serveur : tout le calcul du programme (répartition force / cardio / full-body, rotation des " +
        "groupes musculaires, charge de travail) se fait sur l'appareil, à partir du profil renseigné " +
        "(poids, taille, niveau, objectifs, matériel disponible).",
      features: [
        "Génération de programmes sur mesure (force, cardio, full-body) selon profil et matériel disponible",
        "Agenda avec rotation intelligente des groupes musculaires pour éviter les redites",
        "Chronomètre de repos entre les séries, avec passage manuel et ressenti de la série",
        "Ajustement des charges et du nombre de séries en temps réel pendant l'entraînement",
        "Suivi des records personnels et historique complet avec courbes de progression par exercice",
        "Bibliothèque d'icônes dessinée sur mesure et direction artistique inspirée des interfaces iOS natives",
      ],
      stack: [
        { label: 'Frontend',    items: ['Next.js', 'React', 'TypeScript', 'Tailwind CSS'] },
        { label: 'Animations',  items: ['Framer Motion', 'Animations à ressort interruptibles'] },
        { label: 'Données',     items: ['Persistance locale', 'Aucun serveur, aucun compte'] },
      ],
      challenges: [],
      security: [
        "Aucune donnée personnelle ne quitte l'appareil : génération et sauvegarde entièrement locales",
      ],
    },
  },

  // ══════════════════════════════════════════════════════════
  // PROFESSIONNEL : stage VBWEB
  // ══════════════════════════════════════════════════════════
  {
    slug:        'saas-linkedin',
    title:       'Plateforme SaaS LinkedIn',
    subtitle:    'Programmation de publications assistée par IA',
    description:
      "Un SaaS qui permet de préprogrammer un mois entier de contenu LinkedIn en quelques minutes, " +
      "avec génération des textes par IA et publication réelle via l'API LinkedIn.",
    category: 'Professionnel',
    domain:   'Fullstack',
    year:     '2026',
    status:   'En production',
    featured: true,
    tags:     ['React', 'TypeScript', 'Express', 'MongoDB', 'OAuth 2.0', 'API IA'],
    links:    { demo: null, github: null },
    detail: {
      role:     'Conception et développement complet, en autonomie',
      duration: 'Mai à juillet 2026',
      context:
        "Mon tuteur avait identifié, à travers les retours de plusieurs clients de l'agence, un besoin " +
        "récurrent : gagner du temps sur la création de contenu LinkedIn tout en gardant une présence " +
        "régulière. Le projet devait aussi positionner l'agence comme capable de produire ses propres " +
        "outils SaaS, au-delà des sites vitrines. J'ai participé à la définition du cahier des charges " +
        "au fil des échanges, les fonctionnalités étant ajustées à mesure de l'avancement.",
      features: [
        "Génération de texte par IA : accroches, variantes, reformulation et hashtags",
        "Programmation mensuelle avec calendrier et repositionnement des posts en glisser-déposer",
        "Gestion multi-comptes, avec persona et calendrier indépendants pour chacun",
        "Publication réelle sur LinkedIn via l'API v2 (endpoint ugcPosts), et non simulée",
        "Upload natif d'images et de vidéos avec aperçu fidèle au rendu LinkedIn",
        "Tableau de bord analytics et historique des publications",
      ],
      stack: [
        { label: 'Frontend',  items: ['Vite', 'React 18', 'TypeScript', 'TailwindCSS', 'Zustand', 'React Query'] },
        { label: 'Backend',   items: ['Express (dev)', 'Netlify Functions (prod)', 'Scheduled Functions'] },
        { label: 'Données',   items: ['MongoDB', 'Mongoose'] },
        { label: 'APIs',      items: ['DeepSeek (génération de texte)', 'LinkedIn API v2 (OAuth 2.0)'] },
        { label: 'Infra',     items: ['Netlify', 'Cloudflare'] },
      ],
      challenges: [
        {
          problem:  "L'authentification OAuth LinkedIn cassait une fois déployée en serverless",
          cause:    "Les fonctions Netlify n'ont pas d'état persistant entre deux requêtes, ce qui rendait " +
                    "incompatible la gestion classique du paramètre state (la protection CSRF du flow OAuth), " +
                    "pensée pour un serveur conservant une session en mémoire.",
          solution: "Je l'ai remplacée par une version signée et sans état, recalculée dynamiquement à partir " +
                    "de l'URL de callback de la requête entrante plutôt que codée en dur.",
        },
        {
          problem:  'Des doublons de comptes LinkedIn apparaissaient en base',
          cause:    "Le script d'initialisation des comptes n'était pas conçu pour être rejoué plusieurs " +
                    "fois sans effet de bord.",
          solution: "Mise en place d'un index unique sur l'identifiant du compte et d'un seed idempotent, " +
                    "garantissant qu'une réexécution ne crée jamais de doublon.",
        },
        {
          problem:  "Les textes générés par l'IA ne collaient pas au ton attendu",
          cause:    "Un prompt trop générique, sans contexte suffisant sur le persona et son secteur, " +
                    "produisait des textes peu différenciés d'un compte à l'autre.",
          solution: "Un travail itératif de prompt engineering, en affinant progressivement le contexte " +
                    "fourni (persona, ton, secteur), a permis de se rapprocher du rendu souhaité.",
        },
      ],
      security: [
        'Jetons OAuth chiffrés en base en AES-256-GCM plutôt que stockés en clair',
        'Isolation des données par compte via une clé de référence en base',
      ],
    },
  },

  {
    slug:        'auberge-le-permayou',
    title:       'Auberge Le Permayou',
    subtitle:    'Site multilingue pour un hôtel-restaurant des Pyrénées',
    description:
      "Refonte complète du site d'un hôtel-restaurant-bar de huit chambres dans la Vallée d'Aspe. " +
      "Site trilingue FR/EN/ES avec back-office autonome, mené sur près de deux mois.",
    category: 'Professionnel',
    domain:   'Fullstack',
    year:     '2026',
    status:   'En production',
    featured: true,
    tags:     ['Next.js', 'MongoDB', 'i18n', 'SEO local', 'Back-office'],
    links:    { demo: null, github: null },
    detail: {
      role:     'Projet mené en autonomie quasi complète',
      duration: 'Du 15 mai au 9 juillet 2026 · 26 livraisons successives',
      context:
        "Le projet le plus conséquent du stage en dehors de la plateforme LinkedIn. L'auberge, reprise " +
        "par un jeune couple, avait besoin d'un site à la hauteur du lieu. Le travail a démarré par la " +
        "rédaction d'un cahier de conception détaillé : analyse du socle technique existant, palette " +
        "reprenant celle des menus imprimés, stratégie de contenu et roadmap. Il a permis de définir " +
        "l'arborescence complète, page par page.",
      features: [
        'Internationalisation complète FR / EN / ES : routage multilingue, libellés éditables depuis ' +
          "l'admin dans les trois langues, blog multilingue avec gestion des slugs par langue",
        'Modélisation en base des huit chambres regroupées en cinq types, avec équipements, capacité ' +
          'et tarifs éditables depuis le back-office',
        "Système à deux cartes pour le restaurant, mises à jour par upload direct d'un PDF ou d'une " +
          'photo depuis un téléphone par les gérants eux-mêmes',
        'Page Vallée d\'Aspe pensée comme un aimant SEO local, avec idées d\'itinéraires',
        'Intégration du moteur de réservation Amenitiz et des avis Google réels',
        'Refonte de la direction artistique : palette reprenant les quatre couleurs des menus de ' +
          "l'auberge, typographies éditoriales, sections tenant avec peu de photos",
      ],
      stack: [
        { label: 'Frontend',  items: ['Next.js', 'Routage i18n', 'Responsive mobile'] },
        { label: 'Backend',   items: ['CMS interne', 'Back-office éditable'] },
        { label: 'Données',   items: ['MongoDB'] },
        { label: 'Intégrations', items: ['Amenitiz', 'Avis Google'] },
      ],
      challenges: [
        {
          problem:  'Les cartes du restaurant devaient être modifiables sans intervention technique',
          cause:    "Les gérants changent leur carte régulièrement et n'ont pas de culture technique.",
          solution: "Un système d'upload direct de PDF ou de photo depuis le back-office, pensé pour être " +
                    "utilisable depuis un téléphone.",
        },
        {
          problem:  'Plusieurs coupures de connexion à la base MongoDB en production',
          cause:    'Configuration de connexion inadaptée à la charge réelle une fois le site en ligne.',
          solution: 'Correctifs successifs sur la gestion des connexions, accompagnés d\'ajustements ' +
                    "réguliers d'ergonomie mobile.",
        },
      ],
      security: [],
    },
  },

  {
    slug:        'entre-maman-et-moi',
    title:       'Entre Maman et Moi',
    subtitle:    'E-commerce de cuisine indienne',
    description:
      "Refonte complète d'un site e-commerce proposant kits à cuisiner, ateliers et offre traiteur, " +
      "avec paiement Stripe, cartes cadeaux et espace d'administration.",
    category: 'Professionnel',
    domain:   'Fullstack',
    year:     '2026',
    status:   'En production',
    featured: true,
    tags:     ['Next.js', 'Stripe', 'Resend', 'Mondial Relay', 'Back-office'],
    links:    { demo: 'https://entre-maman-et-moi.fr/', github: null },
    detail: {
      role:     'Refonte et développement des fonctionnalités e-commerce',
      duration: '2026',
      context:
        "Une marque de cuisine indienne basée près de Rennes, avec trois familles de produits : des kits " +
        "à cuisiner en trois formules, des ateliers de cuisine, et une offre traiteur. Le site existait " +
        "déjà mais devait gagner en fonctionnalités et en performance.",
      features: [
        'Ajout des cartes cadeaux et des codes promo au tunnel de paiement',
        'Paiement Stripe complet (checkout, gestion des mots de passe) en remplacement de PayPal, ' +
          'avec email de confirmation de commande automatisé',
        'Sélecteur de point relais Mondial Relay en modale, pensé responsive pour un usage mobile',
        'Remplacement de Formspree par Resend pour la gestion des formulaires',
        "Refonte de l'espace admin : réservations, personnalisation des cartes cadeaux, newsletter",
        'Pages de contenu éditables depuis le back-office (Contact, Traiteur, Atelier à domicile)',
        'Optimisations de performance pour réduire les lenteurs de navigation entre les pages',
      ],
      stack: [
        { label: 'Frontend',  items: ['Next.js', 'next/image', 'Responsive'] },
        { label: 'Paiement',  items: ['Stripe Checkout', 'Cartes cadeaux', 'Codes promo'] },
        { label: 'Emails',    items: ['Resend'] },
        { label: 'Livraison', items: ['Mondial Relay'] },
      ],
      challenges: [],
      security: [],
    },
  },

  {
    slug:        'shishi-samui',
    title:       'Shishi Samui',
    subtitle:    'Plateforme de réservation pour un club sportif',
    description:
      "Site et plateforme de réservation d'un club premium à Koh Samui : pickleball, tennis, fitness, " +
      "restaurant, kids club et piscine. Abonnements Stripe et système de crédits.",
    category: 'Professionnel',
    domain:   'Fullstack',
    year:     '2026',
    status:   'En production',
    featured: false,
    tags:     ['Stripe', 'Abonnements', 'Réservation', 'Back-office'],
    links:    { demo: 'https://shi-shi-samui.com/', github: null },
    detail: {
      role:     'Projet développé en autonomie',
      duration: '2026',
      context:
        "Développé en parallèle de la plateforme LinkedIn, ce projet illustre la confiance accordée par " +
        "mon tuteur et ma capacité à gérer un projet de bout en bout. Le club proposait six activités " +
        "très différentes, chacune avec sa propre logique de tarification.",
      features: [
        'Système d\'abonnement en ligne avec Stripe pour les paiements récurrents et les adhésions',
        'Distinction client de passage / adhérent via un champ de rôle en base, conditionnant les ' +
          'tarifs affichés et les fonctionnalités accessibles',
        'Système de crédits : lots achetés à l\'avance, déduits automatiquement à chaque réservation, ' +
          "quantités et règles paramétrables par le client depuis son espace d'administration",
        'Gestion différenciée par activité : tarif horaire pour le tennis, par séance pour le fitness, ' +
          'sélection du nombre d\'heures pour le Kids Club',
      ],
      stack: [
        { label: 'Frontend',  items: ['Next.js', 'Responsive'] },
        { label: 'Paiement',  items: ['Stripe', 'Abonnements récurrents'] },
        { label: 'Données',   items: ['MongoDB'] },
      ],
      challenges: [
        {
          problem:  "Les besoins du client évoluaient en cours de développement",
          cause:    'Un lancement complet prévu au 1er août, mais un système simplifié devait être ' +
                    'fonctionnel dès le 15 juillet.',
          solution: "Priorisation des fonctionnalités selon les contraintes de délai, et conception d'une " +
                    "interface d'administration assez flexible pour que le client fasse évoluer ses offres " +
                    'sans intervention technique.',
        },
      ],
      security: [],
    },
  },

  {
    slug:        'arti',
    title:       'Arti',
    subtitle:    'Cartes cadeaux en ligne pour un café-atelier céramique',
    description:
      "Site e-commerce permettant d'acheter des cartes cadeaux en ligne, avec génération de code unique, " +
      "date de péremption automatique et back-office de suivi des ventes.",
    category: 'Professionnel',
    domain:   'Fullstack',
    year:     '2026',
    status:   'En production',
    featured: false,
    tags:     ['Stripe', 'Resend', 'E-commerce', 'Back-office'],
    links:    { demo: 'https://articafeceramique.fr/', github: null },
    detail: {
      role:     'Mise en place de A à Z',
      duration: '2026',
      context:
        "Premier déploiement client du template e-commerce de l'agence, que j'avais contribué à moderniser : " +
        "refonte du tunnel de paiement pour le rendre modulaire, et ajout d'un module de carte cadeau complet.",
      features: [
        'Paiement en ligne sécurisé via Stripe',
        'Génération de code unique, vérifié en base avant validation pour écarter tout risque de collision',
        "Calcul automatique de la date de péremption : un an ajouté à la date d'achat, stockée avec la " +
          'carte et vérifiée à chaque utilisation',
        'Emails transactionnels via Resend : numéro unique, montant, date de péremption, message personnalisé',
        'Back-office permettant à la cliente de gérer ses cartes en autonomie (ventes, vérification des soldes)',
      ],
      stack: [
        { label: 'Frontend',  items: ['Next.js'] },
        { label: 'Paiement',  items: ['Stripe'] },
        { label: 'Emails',    items: ['Resend'] },
      ],
      challenges: [],
      security: [],
    },
  },

  // ══════════════════════════════════════════════════════════
  // UNIVERSITAIRE
  // ══════════════════════════════════════════════════════════
  {
    slug:        'visiteurs-jpo',
    title:       'Gestion Visiteurs JPO',
    subtitle:    'Application Journée Portes Ouvertes, IUT de Montreuil',
    description:
      "Application full-stack pour collecter et gérer les données des visiteurs lors de la JPO. " +
      "Interface tablette pour les visiteurs, back-office avec filtres et export CSV.",
    category: 'Universitaire',
    domain:   'Fullstack',
    year:     '2026',
    status:   'Terminé',
    featured: false,
    tags:     ['React', 'TypeScript', 'API REST', 'PostgreSQL', 'RGPD'],
    links:    { demo: null, github: 'https://github.com/Naosh1' },
    detail: {
      role:     'Projet en équipe : 3 développeurs, méthode agile',
      duration: 'Printemps 2026',
      context:
        "Lors de la Journée Portes Ouvertes de l'IUT, des lycéens visitent les différents départements. " +
        "L'application collecte et gère leurs données pour faciliter le suivi post-JPO (rappels, immersions).",
      features: [
        'Interface visiteurs simplifiée, optimisée pour la saisie sur tablette',
        'Saisie rapide : nom, bac, email, département visité, avec confirmation des coordonnées',
        'Interface gestionnaire avec filtres, tri et pagination',
        "Export CSV et génération de listes d'adresses mail",
        'Visualisations graphiques des données collectées',
        'Conformité RGPD : suppression automatique des données après la période Parcoursup',
      ],
      stack: [
        { label: 'Frontend',  items: ['React', 'TypeScript', 'Responsive tablette'] },
        { label: 'Backend',   items: ['API REST'] },
        { label: 'Données',   items: ['PostgreSQL'] },
        { label: 'Méthode',   items: ['Agile', 'Git / GitHub'] },
      ],
      challenges: [],
      security: [],
    },
  },

  {
    slug:        'assomanager',
    title:       'AssoManager',
    subtitle:    'Gestion de buvette associative',
    description:
      "Application web permettant à des associations de gérer leur buvette sans manipulation d'argent " +
      "liquide. Comptes adhérents, ventes au comptoir et rapports de trésorerie.",
    category: 'Universitaire',
    domain:   'Fullstack',
    year:     '2025',
    status:   'Terminé',
    featured: false,
    tags:     ['PHP', 'MySQL', 'MVC', 'LAMP', 'JavaScript'],
    links:    { demo: null, github: 'https://github.com/Naosh1' },
    detail: {
      role:     'Projet en équipe',
      duration: '2025 à 2026',
      context:
        "Une association souhaitait supprimer la manipulation d'argent liquide à sa buvette. L'objectif : " +
        "une plateforme multi-associations avec trois profils distincts : Client, Barman, Gestionnaire. " +
        "Développée en PHP sans framework, pour comprendre ce qu'un framework fait à notre place.",
      features: [
        'Gestion de plusieurs associations indépendantes sur la même plateforme',
        'Trois rôles utilisateurs avec routage dynamique selon les permissions',
        'Rechargement de compte et historique des achats',
        'Interface de vente fluide au comptoir',
        'Gestion des stocks et inventaires',
        'Rapport de trésorerie et analyse des pertes',
      ],
      stack: [
        { label: 'Backend',   items: ['PHP sans framework', 'Architecture MVC', 'Sessions', 'Routing dynamique'] },
        { label: 'Données',   items: ['MySQL', 'MCD / MLD', 'Modèle relationnel'] },
        { label: 'Frontend',  items: ['HTML / CSS', 'JavaScript'] },
        { label: 'Infra',     items: ['LAMP', 'Apache', 'Linux'] },
      ],
      challenges: [],
      security: [],
    },
  },

  {
    slug:        'kana-app',
    title:       'Kana App',
    subtitle:    "Apprentissage des alphabets japonais",
    description:
      "Single Page Application d'apprentissage des hiragana et katakana : tables interactives, " +
      "quiz avec score en temps réel, déployée en production.",
    category: 'Universitaire',
    domain:   'Frontend',
    year:     '2026',
    status:   'Terminé',
    featured: false,
    tags:     ['React', 'TypeScript', 'React Router', 'Vite', 'Vercel'],
    links: {
      demo:   'https://s4-projet-fil-rouge-camillia.vercel.app',
      github: 'https://github.com/Naosh1/S4_Projet_Fil_Rouge_Camillia',
    },
    detail: {
      role:     'Projet individuel',
      duration: '2026',
      context:
        "Projet fil rouge du BUT Informatique, développé progressivement sur quatre séances : créer une " +
        "application React d'apprentissage des deux alphabets japonais avec des quiz interactifs.",
      features: [
        'Affichage des tables hiragana et katakana complètes',
        'Quiz interactif avec score en temps réel',
        'Navigation entre mode Apprentissage et mode Quiz',
        "Gestion d'état avec useState et hooks personnalisés",
        'Routing entre les pages avec React Router',
        'Déploiement continu sur Vercel via GitHub',
      ],
      stack: [
        { label: 'Frontend',   items: ['React', 'TypeScript', 'JSX'] },
        { label: 'État',       items: ['useState', 'useEffect', 'Custom hooks'] },
        { label: 'Navigation', items: ['React Router'] },
        { label: 'Déploiement',items: ['Vite', 'Vercel', 'GitHub'] },
      ],
      challenges: [],
      security: [],
    },
  },
]

// ── Helpers ────────────────────────────────────────────────
export const getProjectBySlug = (slug) => PROJECTS.find((p) => p.slug === slug)

export const FEATURED_PROJECTS = PROJECTS.filter((p) => p.featured)

export const STATUS_VARIANT = {
  'En production': 'badge--live',
  'Terminé':       'badge--done',
  'En cours':      'badge--ongoing',
}
