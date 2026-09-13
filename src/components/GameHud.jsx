import { Link, useLocation } from 'react-router-dom'
import { SITE_MENU } from '../data/info'

/**
 * En-tête partagé des écrans sombres (Projets, Compétences, Détail projet, 404) :
 * logo + onglets horizontaux. L'onglet « Projets » reste actif sur les pages
 * de détail (/projets/:slug), pas seulement sur /projets exact.
 */
export default function GameHud() {
  const { pathname } = useLocation()

  return (
    <header className="game-hud">
      <Link to="/" className="game-logo" aria-label="Retour à l'accueil">
        CE<span aria-hidden="true">.</span>
      </Link>

      <nav className="game-tabs" aria-label="Navigation principale">
        {SITE_MENU.map((item) => {
          const isActive =
            !item.external &&
            (pathname === item.path || (item.path !== '/' && pathname.startsWith(`${item.path}/`)))
          const className = isActive ? 'game-tab game-tab--on' : 'game-tab'

          return item.external ? (
            <a
              key={item.label}
              href={item.path}
              target="_blank"
              rel="noopener noreferrer"
              className={className}
            >
              {item.label}
              <span className="visually-hidden"> (nouvel onglet)</span>
            </a>
          ) : (
            <Link
              key={item.label}
              to={item.path}
              aria-current={isActive ? 'page' : undefined}
              className={className}
            >
              {item.label}
            </Link>
          )
        })}
      </nav>
    </header>
  )
}
