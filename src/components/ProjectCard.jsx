import { Link } from 'react-router-dom'
import { CATEGORY_COLOR } from '../data/projects'

// Statut → variante de badge (découplé de l'ancien design clair)
const STATUS_CLASS = {
  'En production': 'game-badge--live',
  'Terminé':       'game-badge--done',
  'En cours':      'game-badge--ongoing',
}

/**
 * Carte projet : c'est un <Link>, donc focusable et activable au clavier
 * nativement (Entrée), sans avoir à rajouter tabIndex ni onKeyDown.
 * La couleur (--cat) varie selon la catégorie (Personnel / Professionnel /
 * Universitaire) pour les différencier visuellement d'un coup d'œil.
 */
export default function ProjectCard({ project }) {
  const { slug, title, subtitle, description, tags, status, domain, year, category } = project
  const badgeClass = STATUS_CLASS[status] ?? 'game-badge--ongoing'
  const catColor = CATEGORY_COLOR[category] ?? 'var(--accent)'

  return (
    <Link
      to={`/projets/${slug}`}
      className="pc game-card game-card--top"
      style={{ '--cat': catColor }}
      aria-label={`${title}, voir le projet en détail`}
    >
      <div className="pc-head">
        <div className="pc-head-left">
          <span className="pc-category">{category}</span>
          <span className="pc-eyebrow">{domain} · {year}</span>
        </div>
        <span className={`game-badge ${badgeClass}`}>{status}</span>
      </div>

      <div className="pc-body">
        <div>
          <h3 className="pc-title">{title}</h3>
          <p className="pc-sub">{subtitle}</p>
        </div>

        <p className="pc-desc">{description}</p>

        <div className="game-tag-row">
          {tags.slice(0, 5).map((tag) => (
            <span key={tag} className="game-tag">{tag}</span>
          ))}
        </div>

        <div className="pc-foot">
          Voir le projet <span className="pc-chev" aria-hidden="true">→</span>
        </div>
      </div>

      <style>{`
        .pc {
          display: flex; flex-direction: column; height: 100%;
          transition: background 0.2s var(--ease), border-color 0.2s var(--ease),
                      transform 0.2s var(--ease), box-shadow 0.2s var(--ease);
        }
        /* Bandeau du haut : couleur de catégorie plutôt que l'accent global */
        .pc.game-card--top::before { background: var(--cat); transform: scaleX(0); transform-origin: left; transition: transform 0.25s var(--ease); }
        .pc:hover, .pc:focus-visible {
          background: rgba(255,255,255,0.06);
          border-color: color-mix(in srgb, var(--cat) 45%, rgba(255,255,255,0.28));
          transform: translateY(-3px);
          box-shadow: 0 16px 40px rgba(0,0,0,0.35), 0 0 0 1px color-mix(in srgb, var(--cat) 25%, transparent);
        }
        .pc:hover::before, .pc:focus-visible::before { transform: scaleX(1); }

        .pc-head {
          display: flex; align-items: center; justify-content: space-between;
          gap: var(--sp-3);
          padding: 12px 18px;
          border-bottom: 1px solid rgba(255,255,255,0.1);
        }
        .pc-head-left { display: flex; align-items: center; gap: 10px; flex-wrap: wrap; }
        .pc-category {
          display: inline-flex; align-items: center; gap: 6px;
          font-size: var(--fs-xs); font-weight: 800;
          letter-spacing: 0.1em; text-transform: uppercase;
          color: var(--cat);
          border: 1px solid color-mix(in srgb, var(--cat) 55%, transparent);
          padding: 2px 8px;
        }
        .pc-category::before {
          content: ''; width: 6px; height: 6px; border-radius: 50%;
          background: var(--cat); flex: none;
        }
        .pc-eyebrow {
          font-size: var(--fs-xs); font-weight: 800;
          letter-spacing: 0.14em; text-transform: uppercase;
          color: rgba(255,255,255,0.45);
        }

        .pc-body {
          padding: var(--sp-5) 18px;
          display: flex; flex-direction: column; gap: var(--sp-3);
          flex: 1;
        }
        .pc-title {
          font-size: 1.4rem; font-weight: 900;
          letter-spacing: -0.03em; line-height: 1.15;
          text-transform: uppercase;
          color: #fff;
        }
        .pc-sub {
          margin-top: 3px;
          font-size: var(--fs-sm); font-weight: 600;
          color: rgba(255,255,255,0.5);
        }
        .pc-desc {
          font-size: var(--fs-sm); line-height: 1.6;
          color: rgba(255,255,255,0.65);
        }

        .pc:hover .game-tag, .pc:focus-visible .game-tag { border-color: color-mix(in srgb, var(--cat) 50%, rgba(255,255,255,0.4)); }

        .pc-foot {
          margin-top: auto;
          padding-top: var(--sp-3);
          border-top: 1px solid rgba(255,255,255,0.1);
          font-size: var(--fs-sm); font-weight: 800;
          letter-spacing: 0.04em; text-transform: uppercase;
          color: rgba(255,255,255,0.85);
        }
        .pc-chev { color: var(--cat); transition: transform 0.2s var(--ease); display: inline-block; }
        .pc:hover .pc-chev, .pc:focus-visible .pc-chev { transform: translateX(5px); }
      `}</style>
    </Link>
  )
}
