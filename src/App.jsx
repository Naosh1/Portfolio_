import { Routes, Route } from 'react-router-dom'

import ScrollToTop from './components/ScrollToTop'

import HomePage          from './pages/HomePage'
import AboutPage         from './pages/AboutPage'
import ProjectsPage      from './pages/ProjectsPage'
import ProjectDetailPage from './pages/ProjectDetailPage'
import SkillsPage        from './pages/SkillsPage'
import NotFoundPage      from './pages/NotFoundPage'

// Toutes les pages portent leur propre HUD (GameHud) dans la DA sombre :
// il n'y a plus de navbar/footer clairs partagés au niveau de l'App.
export default function App() {
  return (
    <>
      <a className="skip-link" href="#contenu">Aller au contenu</a>

      <ScrollToTop />

      <main id="contenu">
        <Routes>
          <Route path="/"                element={<HomePage />} />
          <Route path="/moi"             element={<AboutPage />} />
          <Route path="/projets"         element={<ProjectsPage />} />
          <Route path="/projets/:slug"   element={<ProjectDetailPage />} />
          <Route path="/competences"     element={<SkillsPage />} />
          <Route path="*"                element={<NotFoundPage />} />
        </Routes>
      </main>
    </>
  )
}
