import { useEffect } from 'react'
import { useParams, Link, Navigate } from 'react-router-dom'
import GameHud from '../components/GameHud'
import GameFooter from '../components/GameFooter'
import ProjectGallery from '../components/ProjectGallery'
import { getProjectBySlug, PROJECTS, CATEGORY_COLOR } from '../data/projects'

const STATUS_CLASS = {
  'En production': 'game-badge--live',
  'Terminé':       'game-badge--done',
  'En cours':      'game-badge--ongoing',
}

export default function ProjectDetailPage() {
  const { slug } = useParams()
  const project = getProjectBySlug(slug)

  // Titre d'onglet dynamique, utile quand on partage un lien direct
  useEffect(() => {
    if (!project) return
    const previous = document.title
    document.title = `${project.title} · Camillia Emtir`
    return () => { document.title = previous }
  }, [project])

  if (!project) return <Navigate to="/projets" replace />

  const { title, subtitle, description, tags, status, domain, year, links, detail, images, category } = project
  const badgeClass = STATUS_CLASS[status] ?? 'game-badge--ongoing'
  const catColor = CATEGORY_COLOR[category] ?? '#8b5cf6'

  const index = PROJECTS.findIndex((p) => p.slug === slug)
  const next  = PROJECTS[(index + 1) % PROJECTS.length]

  return (
    // --accent est réassigné localement à la couleur de la catégorie : tous les
    // éléments de la page (badges, puces, CTA…) qui s'appuient sur var(--accent)
    // en héritent automatiquement, sans avoir à retoucher chaque règle.
    <div className="game game--scroll" style={{ '--accent': catColor }}>
      {/* ══ FOND ═══════════════════════════════════════════════ */}
      <div className="game-bg" aria-hidden="true">
        <div className="game-grid" />
        <div className="game-scan" />
      </div>

      <GameHud />

      <article className="game-content pd">
        {/* ── En-tête ────────────────────────────────────────── */}
        <header className="container pd-head-section">
          <Link to="/projets" className="game-back">
            <span aria-hidden="true">←</span> Tous les projets
          </Link>

          <div className="pd-head">
            <div>
              <div className="pd-meta">
                <span className="pd-eyebrow">{domain} · {year}</span>
                <span className={`game-badge ${badgeClass}`}>{status}</span>
              </div>
              <h1 className="game-h1 pd-title">{title}</h1>
              <p className="pd-sub">{subtitle}</p>
              <p className="game-lede pd-lede">{description}</p>

              <div className="game-tag-row pd-tags">
                {tags.map((t) => <span key={t} className="game-tag">{t}</span>)}
              </div>
            </div>

            <aside className="game-card pd-side">
              <dl>
                <dt className="pd-eyebrow">Rôle</dt>
                <dd>{detail.role}</dd>
                <dt className="pd-eyebrow">Période</dt>
                <dd>{detail.duration}</dd>
              </dl>

              {(links.demo || links.github) && (
                <div className="pd-links">
                  {links.demo && (
                    <a className="game-band-cta pd-link-btn"
                       href={links.demo} target="_blank" rel="noopener noreferrer">
                      Voir le site <span aria-hidden="true">↗</span>
                    </a>
                  )}
                  {links.github && (
                    <a className="pd-link-outline"
                       href={links.github} target="_blank" rel="noopener noreferrer">
                      Code source <span aria-hidden="true">↗</span>
                    </a>
                  )}
                </div>
              )}

              {!links.demo && !links.github && (
                <p className="pd-private">
                  Projet client, code privé. Je peux en parler en entretien.
                </p>
              )}
            </aside>
          </div>
        </header>

        {/* ── Galerie ────────────────────────────────────────── */}
        {images?.length > 0 && (
          <section className="container">
            <ProjectGallery images={images} title={title} />
          </section>
        )}

        {/* ── Contexte ───────────────────────────────────────── */}
        <section className="pd-band container">
          <div className="pd-narrow">
            <span className="game-eyebrow">Contexte</span>
            <p className="pd-context">{detail.context}</p>
          </div>
        </section>

        {/* ── Fonctionnalités ────────────────────────────────── */}
        <section className="container pd-section">
          <div className="pd-cols">
            <div>
              <span className="game-eyebrow">Ce que j'ai développé</span>
              <ul className="pd-feature-list">
                {detail.features.map((f) => (
                  <li key={f}>
                    <span className="pd-feature-bullet" aria-hidden="true">▪</span>
                    <span>{f}</span>
                  </li>
                ))}
              </ul>
            </div>

            <div>
              <span className="game-eyebrow">Stack technique</span>
              <div className="pd-stack-groups">
                {detail.stack.map((group) => (
                  <div key={group.label} className="pd-stack-group">
                    <h3 className="pd-stack-label">{group.label}</h3>
                    <div className="game-tag-row">
                      {group.items.map((i) => <span key={i} className="game-tag">{i}</span>)}
                    </div>
                  </div>
                ))}
              </div>

              {detail.security?.length > 0 && (
                <div className="pd-security">
                  <h3 className="pd-stack-label">Sécurité</h3>
                  <ul className="pd-feature-list">
                    {detail.security.map((s) => (
                      <li key={s}>
                        <span className="pd-feature-bullet" aria-hidden="true">▪</span>
                        <span>{s}</span>
                      </li>
                    ))}
                  </ul>
                </div>
              )}
            </div>
          </div>
        </section>

        {/* ── Difficultés ────────────────────────────────────── */}
        {detail.challenges?.length > 0 && (
          <section className="pd-band container">
            <div className="pd-section-head">
              <span className="game-eyebrow">Difficultés rencontrées</span>
              <h2 className="game-h2">Les problèmes, et comment je les ai réglés</h2>
            </div>

            <div className="pd-challenges">
              {detail.challenges.map((c, i) => (
                <div key={c.problem} className="game-card pd-challenge">
                  <div className="pd-challenge-head">
                    <span className="pd-eyebrow">Problème {String(i + 1).padStart(2, '0')}</span>
                  </div>
                  <div className="pd-challenge-body">
                    <h3 className="pd-challenge-title">{c.problem}</h3>
                    <div className="pd-challenge-row">
                      <span className="pd-challenge-tag">Cause</span>
                      <p>{c.cause}</p>
                    </div>
                    <div className="pd-challenge-row">
                      <span className="pd-challenge-tag pd-challenge-tag--fix">Solution</span>
                      <p>{c.solution}</p>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </section>
        )}

        {/* ── Projet suivant ─────────────────────────────────── */}
        <nav className="pd-next" aria-label="Projet suivant">
          <div className="container pd-next-inner">
            <div>
              <span className="game-eyebrow">Projet suivant</span>
              <p className="pd-next-title">{next.title}</p>
            </div>
            <Link to={`/projets/${next.slug}`} className="game-band-cta">
              Découvrir <span aria-hidden="true">→</span>
            </Link>
          </div>
        </nav>
      </article>

      <GameFooter />

      <style>{`
        .pd-head-section { padding-block: var(--sp-7) var(--sp-6); }

        .pd-head {
          display: grid; grid-template-columns: 1fr 300px;
          gap: var(--sp-6); align-items: start;
          margin-top: var(--sp-5);
        }
        .pd-meta { display: flex; align-items: center; gap: var(--sp-3); flex-wrap: wrap; }
        .pd-eyebrow {
          font-size: var(--fs-xs); font-weight: 800;
          letter-spacing: 0.14em; text-transform: uppercase;
          color: rgba(255,255,255,0.45);
        }
        .pd-title { margin-top: var(--sp-3); margin-bottom: var(--sp-2); }
        .pd-sub   { font-size: 1.05rem; font-weight: 600; color: rgba(255,255,255,0.55); }
        .pd-lede  { margin-top: var(--sp-4); }
        .pd-tags  { margin-top: var(--sp-5); }

        .pd-side { padding: var(--sp-5); }
        .pd-side dt { margin-bottom: 3px; }
        .pd-side dd { margin-bottom: var(--sp-4); font-size: var(--fs-sm); font-weight: 600; color: #fff; }
        .pd-side dd:last-of-type { margin-bottom: 0; }
        .pd-links { display: flex; flex-direction: column; gap: var(--sp-2); margin-top: var(--sp-4); }
        .pd-link-btn { justify-content: center; }
        .pd-link-outline {
          display: flex; align-items: center; justify-content: center; gap: 8px;
          border: 1px solid rgba(255,255,255,0.25);
          padding: 11px 22px;
          font-size: var(--fs-sm); font-weight: 800;
          letter-spacing: 0.04em; text-transform: uppercase;
          color: rgba(255,255,255,0.85);
          transition: border-color 0.15s var(--ease), color 0.15s var(--ease);
        }
        .pd-link-outline:hover { border-color: #fff; color: #fff; }
        .pd-private { margin-top: var(--sp-4); line-height: 1.5; font-size: var(--fs-xs); color: rgba(255,255,255,0.5); }

        .pd-band { padding-block: var(--sp-7); border-top: 1px solid rgba(255,255,255,0.1); }
        .pd-narrow  { max-width: 780px; }
        .pd-context { margin-top: var(--sp-3); font-size: 1rem; line-height: 1.75; color: rgba(255,255,255,0.75); }

        .pd-section { padding-block: var(--sp-7); }
        .pd-cols { display: grid; grid-template-columns: 1.15fr 1fr; gap: var(--sp-7); }

        .pd-feature-list { display: flex; flex-direction: column; gap: var(--sp-3); margin-top: var(--sp-4); }
        .pd-feature-list li {
          display: flex; gap: var(--sp-3);
          font-size: var(--fs-sm); line-height: 1.6; color: rgba(255,255,255,0.7);
        }
        .pd-feature-bullet { color: var(--accent); flex-shrink: 0; }

        .pd-stack-groups { display: flex; flex-direction: column; gap: var(--sp-4); margin-top: var(--sp-4); }
        .pd-stack-label {
          font-size: var(--fs-xs); font-weight: 800; letter-spacing: 0.1em;
          text-transform: uppercase; margin-bottom: var(--sp-2); color: rgba(255,255,255,0.55);
        }
        .pd-security { margin-top: var(--sp-6); padding-top: var(--sp-5); border-top: 1px solid rgba(255,255,255,0.1); }

        .pd-section-head { margin-bottom: var(--sp-6); }
        .pd-challenges { display: flex; flex-direction: column; gap: var(--sp-4); }
        .pd-challenge-head { padding: 10px 18px; border-bottom: 1px solid rgba(255,255,255,0.1); background: rgba(255,255,255,0.02); }
        .pd-challenge-body { padding: var(--sp-5) 18px; display: flex; flex-direction: column; gap: var(--sp-3); }
        .pd-challenge-title { font-size: 1.1rem; font-weight: 800; letter-spacing: -0.02em; color: #fff; }
        .pd-challenge-row { display: flex; gap: var(--sp-3); align-items: flex-start; }
        .pd-challenge-row p { font-size: var(--fs-sm); line-height: 1.6; color: rgba(255,255,255,0.7); }
        .pd-challenge-tag {
          flex-shrink: 0; width: 74px;
          font-size: var(--fs-xs); font-weight: 800; letter-spacing: 0.06em;
          text-transform: uppercase; text-align: center;
          border: 1px solid rgba(255,255,255,0.3); padding: 2px 0;
          color: rgba(255,255,255,0.7);
        }
        .pd-challenge-tag--fix { background: var(--accent); color: #05060a; border-color: var(--accent); }

        .pd-next { border-top: 1px solid rgba(255,255,255,0.1); }
        .pd-next-inner {
          padding-block: var(--sp-6);
          display: flex; align-items: center; justify-content: space-between;
          gap: var(--sp-4); flex-wrap: wrap;
        }
        .pd-next-title { font-size: 1.6rem; font-weight: 900; letter-spacing: -0.03em; margin-top: var(--sp-1); color: #fff; }

        @media (max-width: 900px) {
          .pd-head, .pd-cols { grid-template-columns: 1fr; }
        }
        @media (max-width: 520px) {
          .pd-challenge-row { flex-direction: column; gap: var(--sp-2); }
          .pd-challenge-tag { width: 84px; }
        }
      `}</style>
    </div>
  )
}
