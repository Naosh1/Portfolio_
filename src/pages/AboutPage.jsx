import { Link } from 'react-router-dom'
import GameHud from '../components/GameHud'
import GameFooter from '../components/GameFooter'
import { PERSONAL_INFO } from '../data/info'
import { EXPERIENCES, EDUCATION } from '../data/experience'

export default function AboutPage() {
  const { firstName, lastName, presentation } = PERSONAL_INFO

  return (
    <div className="game game--scroll">
      {/* ══ FOND ═══════════════════════════════════════════════ */}
      <div className="game-bg" aria-hidden="true">
        <span className="game-word ab-word">Moi</span>
        <div className="game-grid" />
        <div className="game-scan" />
      </div>

      <GameHud />

      {/* ══ EN-TÊTE ══════════════════════════════════════════════ */}
      <section className="game-content ab-hero container">
        <span className="game-eyebrow">Qui suis-je</span>
        <h1 className="game-h1">
          {firstName} <span className="ab-hero-accent">{lastName}</span>
        </h1>
        <p className="game-lede ab-hero-text">{presentation}</p>
      </section>

      {/* ══ EXPÉRIENCE ═══════════════════════════════════════════ */}
      <section className="game-content ab-exp container">
        <div className="ab-section-head">
          <span className="game-eyebrow">Expérience</span>
          <h2 className="game-h2">Ce que j'ai déjà fait</h2>
        </div>

        <div className="ab-exp-list">
          {EXPERIENCES.map((exp) => (
            <article
              key={exp.id}
              className={exp.featured ? 'game-card game-card--top ab-exp-card' : 'game-card ab-exp-card'}
            >
              <div className="ab-exp-head">
                <div>
                  <h3 className="ab-exp-role">{exp.role}</h3>
                  <p className="ab-exp-company">
                    {exp.company} <span aria-hidden="true">·</span> {exp.kind}
                  </p>
                </div>
                <div className="ab-exp-meta">
                  <span className="game-tag">{exp.period}</span>
                  <span className="ab-exp-location">{exp.location}</span>
                </div>
              </div>

              <p className="ab-exp-summary">{exp.summary}</p>

              {exp.highlights.length > 0 && (
                <ul className="ab-exp-highlights">
                  {exp.highlights.map((h) => (
                    <li key={h}>
                      <span className="ab-exp-arrow" aria-hidden="true">→</span>
                      {h}
                    </li>
                  ))}
                </ul>
              )}

              <div className="game-tag-row">
                {exp.stack.map((s) => (
                  <span className="game-tag" key={s}>{s}</span>
                ))}
              </div>
            </article>
          ))}
        </div>
      </section>

      {/* ══ FORMATION ════════════════════════════════════════════ */}
      <section className="game-content ab-edu container">
        <div className="ab-section-head">
          <span className="game-eyebrow">Formation</span>
          <h2 className="game-h2">Mon parcours</h2>
        </div>

        <ol className="road">
          {EDUCATION.map((e, i) => (
            <li key={e.id} className={i === 0 ? 'road-item road-item--now' : 'road-item'}>
              <span className="road-dot" aria-hidden="true" />
              <span className="road-period">{e.period}</span>
              <h3 className="road-title">{e.title}</h3>
              <p className="road-school">{e.school}</p>
              {e.detail && <p className="road-detail">{e.detail}</p>}
            </li>
          ))}
        </ol>

        <div className="game-band" style={{ marginTop: 'var(--sp-7)' }}>
          <div>
            <p className="game-band-text">Envie de voir ce que ça donne en vrai ?</p>
            <p className="game-band-sub">
              Les projets détaillent la stack utilisée et les problèmes techniques rencontrés.
            </p>
          </div>
          <Link className="game-band-cta" to="/projets">
            Voir les projets <span aria-hidden="true">→</span>
          </Link>
        </div>
      </section>

      <GameFooter />

      <style>{`
        .ab-word {
          right: 4vw; top: 10vh; left: auto;
          font-size: clamp(4rem, 12vw, 11rem);
          text-align: right;
        }

        /* ── En-tête ─────────────────────────────────────── */
        .ab-hero { padding-top: var(--sp-8); padding-bottom: var(--sp-7); max-width: 68ch; }
        .ab-hero-accent { color: var(--accent); }
        .ab-hero-text { margin-top: var(--sp-4); max-width: 62ch; font-size: 1.05rem; }

        /* ── Sections ────────────────────────────────────── */
        .ab-exp, .ab-edu { padding-block: var(--sp-7); border-top: 1px solid rgba(255,255,255,0.1); }
        .ab-section-head { margin-bottom: var(--sp-6); }

        /* ── Cartes d'expérience ─────────────────────────── */
        .ab-exp-list { display: flex; flex-direction: column; gap: var(--sp-5); }
        .ab-exp-card { padding: clamp(var(--sp-5), 3vw, var(--sp-6)); }

        .ab-exp-head {
          display: flex; flex-wrap: wrap; justify-content: space-between; gap: var(--sp-4);
          margin-bottom: var(--sp-4);
        }
        .ab-exp-role {
          font-size: 1.15rem; font-weight: 900;
          letter-spacing: -0.02em; text-transform: uppercase;
          color: #fff;
        }
        .ab-exp-company {
          margin-top: 4px;
          font-size: var(--fs-sm); font-weight: 700;
          color: rgba(255,255,255,0.55);
        }
        .ab-exp-meta { display: flex; flex-direction: column; align-items: flex-end; gap: 6px; }
        .ab-exp-location {
          font-size: var(--fs-xs); font-weight: 700;
          letter-spacing: 0.08em; text-transform: uppercase;
          color: rgba(255,255,255,0.4);
        }

        .ab-exp-summary {
          font-size: var(--fs-sm); line-height: 1.65;
          color: rgba(255,255,255,0.65);
          max-width: 68ch;
          margin-bottom: var(--sp-4);
        }

        .ab-exp-highlights {
          display: flex; flex-direction: column; gap: 8px;
          margin-bottom: var(--sp-5);
        }
        .ab-exp-highlights li {
          display: flex; align-items: flex-start; gap: 10px;
          font-size: var(--fs-sm); color: rgba(255,255,255,0.75);
        }
        .ab-exp-arrow { flex: none; color: var(--accent); font-weight: 800; }

        @media (max-width: 640px) {
          .ab-exp-meta { align-items: flex-start; }
          .ab-word { display: none; }
        }
      `}</style>
    </div>
  )
}
