import { Link } from 'react-router-dom'
import GameHud from '../components/GameHud'

export default function NotFoundPage() {
  return (
    <div className="game game--fixed">
      {/* ══ FOND ═══════════════════════════════════════════════ */}
      <div className="game-bg" aria-hidden="true">
        <span className="game-word nf-word">404</span>
        <div className="game-grid" />
        <div className="game-scan" />
      </div>

      <GameHud />

      <div className="game-content nf-body">
        <p className="nf-code">404</p>
        <h1 className="game-h1">Cette page n'existe pas</h1>
        <p className="game-lede nf-lede">
          Le lien est peut-être obsolète, ou l'adresse comporte une faute de frappe.
        </p>

        <div className="nf-actions">
          <Link to="/" className="game-band-cta">Retour à l'accueil</Link>
          <Link to="/projets" className="nf-link-outline">Voir les projets</Link>
        </div>
      </div>

      <style>{`
        .nf-word {
          left: 50%; top: 50%;
          transform: translate(-50%, -50%);
          font-size: clamp(10rem, 32vw, 26rem);
        }

        .nf-body {
          flex: 1; min-height: 0;
          display: flex; flex-direction: column; align-items: center; justify-content: center;
          text-align: center;
          padding: var(--sp-6) clamp(var(--sp-4), 4vw, var(--sp-7));
        }
        .nf-code {
          font-size: clamp(3rem, 9vw, 5rem); font-weight: 900;
          line-height: 0.85; letter-spacing: -0.05em; color: var(--accent);
          margin-bottom: var(--sp-3);
        }
        .nf-lede { margin: var(--sp-3) auto 0; }
        .nf-actions {
          display: flex; gap: var(--sp-3); justify-content: center;
          flex-wrap: wrap; margin-top: var(--sp-6);
        }
        .nf-link-outline {
          display: inline-flex; align-items: center; gap: 8px;
          border: 1px solid rgba(255,255,255,0.25);
          padding: 11px 22px;
          font-size: var(--fs-sm); font-weight: 800;
          letter-spacing: 0.04em; text-transform: uppercase;
          color: rgba(255,255,255,0.85);
          transition: border-color 0.15s var(--ease), color 0.15s var(--ease);
        }
        .nf-link-outline:hover { border-color: #fff; color: #fff; }

        @media (max-width: 900px) {
          .game--fixed { height: auto; min-height: 100svh; overflow: visible; }
        }
        @media (max-width: 640px) {
          .nf-word { display: none; }
        }
      `}</style>
    </div>
  )
}
