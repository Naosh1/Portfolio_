import { useSearchParams } from 'react-router-dom'
import GameHud from '../components/GameHud'
import GameFooter from '../components/GameFooter'
import ProjectCard from '../components/ProjectCard'
import { PROJECTS, CATEGORIES } from '../data/projects'
import { PERSONAL_INFO } from '../data/info'

export default function ProjectsPage() {
  // Le filtre vit dans l'URL : /projets?filtre=Professionnel est partageable.
  const [searchParams, setSearchParams] = useSearchParams()
  const raw = searchParams.get('filtre')
  const active = CATEGORIES.includes(raw) ? raw : 'Tous'

  const filtered = active === 'Tous'
    ? PROJECTS
    : PROJECTS.filter((p) => p.category === active)

  function setFilter(category) {
    if (category === 'Tous') setSearchParams({}, { replace: true })
    else setSearchParams({ filtre: category }, { replace: true })
  }

  return (
    <div className="game game--scroll">
      {/* ══ FOND ═══════════════════════════════════════════════ */}
      <div className="game-bg" aria-hidden="true">
        <span className="game-word gp-word">Projets</span>
        <div className="game-grid" />
        <div className="game-scan" />
      </div>

      <GameHud />

      {/* ══ CONTENU ══════════════════════════════════════════════ */}
      <section className="game-content gp-content container">
        <div className="gp-head">
          <span className="game-eyebrow">Sélection</span>
          <h1 className="game-h1">Projets</h1>
          <p className="game-lede">
            Des sites et applications livrés en production pendant mon stage en agence web,
            et des projets menés dans le cadre du BUT Informatique.
          </p>
        </div>

        <div className="game-filter-bar" role="group" aria-label="Filtrer les projets">
          {CATEGORIES.map((c) => (
            <button
              key={c}
              className={active === c ? 'game-filter game-filter--on' : 'game-filter'}
              aria-pressed={active === c}
              onClick={() => setFilter(c)}
            >
              {c}
              {c !== 'Tous' && (
                <span className="game-filter-count">
                  {' '}({PROJECTS.filter((p) => p.category === c).length})
                </span>
              )}
            </button>
          ))}
        </div>

        <p className="visually-hidden" aria-live="polite">
          {filtered.length} projet{filtered.length > 1 ? 's' : ''} affiché
          {filtered.length > 1 ? 's' : ''}.
        </p>

        {filtered.length > 0 ? (
          <div className="gp-grid">
            {filtered.map((p) => (
              <ProjectCard key={p.slug} project={p} />
            ))}
          </div>
        ) : (
          <p className="game-empty">Aucun projet dans cette catégorie.</p>
        )}

        <div className="game-band" style={{ marginTop: 'var(--sp-7)' }}>
          <p className="game-band-text">D'autres projets sont disponibles sur GitHub</p>
          <a
            className="game-band-cta"
            href={PERSONAL_INFO.contact.github}
            target="_blank"
            rel="noopener noreferrer"
          >
            github.com/Naosh1 <span aria-hidden="true">→</span>
          </a>
        </div>
      </section>

      <GameFooter />

      <style>{`
        .gp-word {
          right: 4vw; top: 14vh;
          left: auto;
          font-size: clamp(4rem, 10vw, 9rem);
          text-align: right;
        }

        .gp-content { padding-block: var(--sp-8); }
        .gp-head { max-width: 60ch; margin-bottom: var(--sp-7); }

        .gp-grid {
          display: grid;
          grid-template-columns: repeat(3, 1fr);
          gap: var(--sp-5);
        }

        @media (max-width: 980px) {
          .gp-grid { grid-template-columns: repeat(2, 1fr); }
        }
        @media (max-width: 640px) {
          .gp-grid { grid-template-columns: 1fr; }
          .gp-word { display: none; }
        }
      `}</style>
    </div>
  )
}
