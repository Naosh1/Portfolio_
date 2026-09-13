import { Link } from 'react-router-dom'
import { PERSONAL_INFO, NAV_ITEMS } from '../data/info'

/**
 * Pied de page partagé des écrans sombres. Reprend le contenu de l'ancien
 * Footer clair (identité, navigation, contact) dans la DA « jeu ».
 */
export default function GameFooter() {
  const { contact, firstName, lastName, diploma, school } = PERSONAL_INFO
  const year = new Date().getFullYear()

  const toTop = () => {
    const calm = window.matchMedia('(prefers-reduced-motion: reduce)').matches
    window.scrollTo({ top: 0, behavior: calm ? 'auto' : 'smooth' })
  }

  return (
    <footer className="game-footer game-content">
      <div className="container game-footer-grid">
        <div>
          <p className="game-footer-name">
            {firstName} <span>{lastName}</span>
          </p>
          <p className="game-footer-meta">{diploma}</p>
          <p className="game-footer-meta game-footer-meta--dim">{school}</p>
        </div>

        <nav className="game-footer-col" aria-labelledby="gf-nav">
          <h2 className="game-footer-head" id="gf-nav">Navigation</h2>
          <ul>
            {NAV_ITEMS.map((item) => (
              <li key={item.path}>
                <Link to={item.path} className="game-footer-link">
                  <span className="game-footer-arrow" aria-hidden="true">→</span>
                  {item.label}
                </Link>
              </li>
            ))}
          </ul>
        </nav>

        <div className="game-footer-col game-footer-reach">
          <h2 className="game-footer-head">Me joindre</h2>

          <a className="game-footer-mail" href={`mailto:${contact.email}`}>
            {contact.email}
          </a>

          <div className="game-footer-social">
            <a
              className="game-footer-link"
              href={contact.github}
              target="_blank"
              rel="noopener noreferrer"
            >
              <span className="game-footer-arrow" aria-hidden="true">→</span>
              GitHub
              <span className="visually-hidden"> (nouvel onglet)</span>
            </a>
            {contact.linkedin && (
              <a
                className="game-footer-link"
                href={contact.linkedin}
                target="_blank"
                rel="noopener noreferrer"
              >
                <span className="game-footer-arrow" aria-hidden="true">→</span>
                LinkedIn
                <span className="visually-hidden"> (nouvel onglet)</span>
              </a>
            )}
          </div>

          <button type="button" className="game-footer-top" onClick={toTop}>
            <span aria-hidden="true">↑</span> Haut de page
          </button>
        </div>
      </div>

      <div className="container game-footer-bar">
        <span>© {year}</span>
        <span className="game-footer-bar-dim">React · Vite · déployé sur Vercel</span>
      </div>
    </footer>
  )
}
