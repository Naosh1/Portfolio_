import { Link } from 'react-router-dom'
import GameHud from '../components/GameHud'
import GameFooter from '../components/GameFooter'
import { SKILLS, LEVEL_LABEL } from '../data/skills'
import { EDUCATION } from '../data/experience'

export default function SkillsPage() {
  return (
    <div className="game game--scroll">
      {/* ══ FOND ═══════════════════════════════════════════════ */}
      <div className="game-bg" aria-hidden="true">
        <span className="game-word sk-word">Skills</span>
        <div className="game-grid" />
        <div className="game-scan" />
      </div>

      <GameHud />

      {/* ══ CONTENU ══════════════════════════════════════════════ */}
      <section className="game-content sk-content container">
        <div className="sk-head">
          <span className="game-eyebrow">Arbre de compétences</span>
          <h1 className="game-h1">Ce que je maîtrise</h1>
          <p className="game-lede">
            Chaque branche est une famille de compétences. Les nœuds pleins sont les
            technologies pratiquées en production pendant mon stage ; les nœuds creux,
            celles pratiquées en projet universitaire.
          </p>
        </div>

        <div className="sk-legend">
          <span className="sk-legend-item">
            <span className="sk-legend-dot sk-legend-dot--pro" aria-hidden="true" />
            {LEVEL_LABEL.pro}
          </span>
          <span className="sk-legend-item">
            <span className="sk-legend-dot" aria-hidden="true" />
            {LEVEL_LABEL.school}
          </span>
        </div>

        {/* ── Arbre ────────────────────────────────────────── */}
        <div className="tree">
          {SKILLS.map((group) => (
            <div className="branch" key={group.id}>
              <div className="branch-root">
                <span className="branch-root-dot" aria-hidden="true" />
                <h2 className="branch-root-label">{group.label}</h2>
              </div>

              <ul className="branch-trunk">
                {group.items.map((item) => (
                  <li
                    key={item.name}
                    className={item.level === 'pro' ? 'node node--pro' : 'node'}
                    title={LEVEL_LABEL[item.level]}
                  >
                    <span className="node-stub" aria-hidden="true" />
                    <span className="node-dot" aria-hidden="true" />
                    <span className="node-name">{item.name}</span>
                  </li>
                ))}
              </ul>
            </div>
          ))}
        </div>
      </section>

      {/* ── Formation : parcours en ligne de progression ────── */}
      <section className="game-content sk-edu container">
        <div className="sk-edu-head">
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
            <p className="game-band-text">Ces compétences, en pratique</p>
            <p className="game-band-sub">
              Chaque projet détaille la stack utilisée et les problèmes techniques rencontrés.
            </p>
          </div>
          <Link className="game-band-cta" to="/projets">
            Voir les projets <span aria-hidden="true">→</span>
          </Link>
        </div>
      </section>

      <GameFooter />

      <style>{`
        .sk-word {
          right: 4vw; top: 12vh; left: auto;
          font-size: clamp(4rem, 11vw, 10rem);
          text-align: right;
        }

        .sk-content { padding-top: var(--sp-8); padding-bottom: var(--sp-7); }
        .sk-head { max-width: 60ch; margin-bottom: var(--sp-6); }

        .sk-legend {
          display: flex; flex-wrap: wrap; gap: var(--sp-5);
          margin-bottom: var(--sp-7); padding-bottom: var(--sp-4);
          border-bottom: 1px solid rgba(255,255,255,0.12);
        }
        .sk-legend-item {
          display: inline-flex; align-items: center; gap: 10px;
          font-size: var(--fs-xs); font-weight: 700; color: rgba(255,255,255,0.6);
        }
        .sk-legend-dot {
          width: 10px; height: 10px; border-radius: 50%;
          border: 2px solid rgba(255,255,255,0.4); background: transparent;
        }
        .sk-legend-dot--pro {
          background: var(--accent); border-color: var(--accent);
          box-shadow: 0 0 10px rgba(139,92,246,0.6);
        }

        /* ── Arbre de compétences ─────────────────────────── */
        .tree {
          display: grid;
          grid-template-columns: repeat(3, 1fr);
          gap: var(--sp-7) var(--sp-6);
        }

        .branch { display: flex; flex-direction: column; }

        .branch-root { display: flex; align-items: center; gap: 12px; margin-bottom: var(--sp-4); }
        .branch-root-dot {
          width: 13px; height: 13px; flex: none;
          background: var(--accent);
          transform: rotate(45deg);
          box-shadow: 0 0 14px rgba(139,92,246,0.55);
        }
        .branch-root-label {
          font-size: var(--fs-sm); font-weight: 900;
          letter-spacing: 0.02em; text-transform: uppercase;
          color: #fff;
        }

        .branch-trunk {
          position: relative;
          margin-left: 6px;
          padding-left: 24px;
          display: flex; flex-direction: column; gap: 4px;
        }
        .branch-trunk::before {
          content: '';
          position: absolute; left: 0; top: -6px; bottom: 16px;
          width: 2px;
          background: linear-gradient(to bottom, rgba(255,255,255,0.3), rgba(255,255,255,0.04));
        }

        .node { position: relative; padding: 7px 0; }
        .node-dot {
          position: absolute; left: -24px; top: 50%;
          width: 10px; height: 10px; border-radius: 50%;
          transform: translateY(-50%);
          border: 2px solid rgba(255,255,255,0.35);
          background: #05060a;
          transition: background 0.15s var(--ease), border-color 0.15s var(--ease), box-shadow 0.15s var(--ease);
        }
        .node-stub {
          position: absolute; left: -14px; top: 50%;
          width: 14px; height: 2px; transform: translateY(-50%);
          background: rgba(255,255,255,0.2);
        }
        .node-name {
          font-size: var(--fs-sm); font-weight: 700;
          color: rgba(255,255,255,0.68);
          transition: color 0.15s var(--ease);
        }
        .node--pro .node-dot {
          background: var(--accent); border-color: var(--accent);
          box-shadow: 0 0 10px rgba(139,92,246,0.6);
        }
        .node--pro .node-stub { background: var(--accent); opacity: 0.7; }
        .node--pro .node-name { color: #fff; font-weight: 800; }
        .node:hover .node-name { color: var(--accent); }

        /* ── Formation : ligne de progression ─────────────── */
        /* Les classes .road* sont des primitives partagées, définies dans game.css */
        .sk-edu { padding-block: var(--sp-7); border-top: 1px solid rgba(255,255,255,0.1); }
        .sk-edu-head { margin-bottom: var(--sp-7); }

        @media (max-width: 980px) {
          .tree { grid-template-columns: repeat(2, 1fr); }
        }
        @media (max-width: 640px) {
          .tree { grid-template-columns: 1fr; gap: var(--sp-6); }
          .sk-word { display: none; }
        }
      `}</style>
    </div>
  )
}
