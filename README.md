# Portfolio · Camillia Emtir

Portfolio personnel d'une étudiante en BUT Informatique (IUT de Montreuil, Université Paris 8),
développeuse full-stack. Présente les projets menés en agence web et à l'université.

**Stack :** React 19 · React Router · Vite · CSS custom properties · EmailJS

---

## Démarrer

```bash
npm install
cp .env.example .env    # puis remplis les 3 clés EmailJS
npm run dev
```

| Commande          | Effet                                     |
| ----------------- | ----------------------------------------- |
| `npm run dev`     | Serveur de développement (port 5173)      |
| `npm run build`   | Build de production dans `dist/`          |
| `npm run preview` | Prévisualise le build de production       |

Sans fichier `.env`, le site fonctionne : seul le formulaire de contact bascule
sur un message invitant à écrire directement par email.

---

## Structure

```
src/
├── components/       Composants réutilisables
│   ├── Navbar.jsx        Navigation + menu mobile
│   ├── Footer.jsx
│   ├── ProjectCard.jsx   Carte projet (un <Link>, donc navigable au clavier)
│   ├── StatsStrip.jsx    Bandeau de chiffres clés
│   └── ScrollToTop.jsx   Remonte en haut à chaque changement de route
├── data/             Tout le contenu éditorial, séparé de l'affichage
│   ├── info.js           Infos perso, chiffres, navigation
│   ├── experience.js     Expérience professionnelle + formation
│   ├── projects.js       Projets (source des pages /projets/:slug)
│   └── skills.js         Compétences par catégorie
├── hooks/
│   ├── useFormValidation.js
│   └── useTypingEffect.js
├── pages/            Une page par route
└── styles/
    └── global.css        Design system : tokens + classes réutilisables
```

**Pour ajouter un projet :** une entrée dans `src/data/projects.js`. Le `slug`
devient l'URL, la page de détail se génère toute seule, et le projet apparaît
dans les filtres. Mets `featured: true` pour qu'il remonte sur la page d'accueil.

---

## Routes

| URL              | Page                                          |
| ---------------- | --------------------------------------------- |
| `/`              | Accueil : hero, stage, projets phares |
| `/projets`       | Tous les projets (filtre dans l'URL : `?filtre=Professionnel`) |
| `/projets/:slug` | Fiche détaillée d'un projet                   |
| `/competences`   | Compétences et parcours                       |
| `/contact`       | Formulaire de contact                         |
| *(autre)*        | Page 404                                      |

---

## Déploiement

Le site est une SPA : le serveur doit renvoyer `index.html` sur toutes les routes,
sinon ouvrir `/projets/saas-linkedin` directement donne une 404.

- **Netlify** : `public/_redirects` s'en charge.
- **Vercel** : `vercel.json` s'en charge.
- **Autre hébergeur** : configure une réécriture de `/*` vers `/index.html`.

Pense à déclarer les trois variables `VITE_EMAILJS_*` dans les réglages de
l'hébergeur : le fichier `.env` local n'est pas versionné.

---

## Design system

Tout est piloté par des variables CSS dans `src/styles/global.css`.
Changer l'accent orange du site entier :

```css
:root {
  --accent: #ff4d1c;
}
```

Classes principales : `.btn`, `.card`, `.tag`, `.badge`, `.kicker`, `.eyebrow`,
`.title-display`, `.title-lg`, `.strip`, `.field`, `.container`, `.section`.
