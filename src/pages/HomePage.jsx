import { useRef, useState } from 'react'
import { Link } from 'react-router-dom'

import { PERSONAL_INFO, HOME_MENU } from '../data/info'

export default function HomePage() {
  const { firstName, lastName, role, school } = PERSONAL_INFO

  // L'item mis en avant : celui survolé / focalisé, sinon le premier (Moi)
  const [hovered, setHovered] = useState(null)
  const activeIndex = hovered ?? 0

  // Le fond vidéo est optionnel : s'il n'existe pas, on garde le dégradé CSS
  const [hasVideo, setHasVideo] = useState(true)
  const videoRef = useRef(null)

  return (
    <div className="game game--fixed">
      {/* ══ FOND ═══════════════════════════════════════════════ */}
      <div className="game-bg" aria-hidden="true">
        {hasVideo && (
          <video
            ref={videoRef}
            className="mh-video"
            autoPlay
            muted
            loop
            playsInline
            preload="metadata"
            poster={`${import.meta.env.BASE_URL}hero.jpg`}
            onError={() => setHasVideo(false)}
          >
            {/* Dépose tes fichiers dans public/ : hero.webm, hero.mp4, hero.jpg */}
            <source src={`${import.meta.env.BASE_URL}hero.webm`} type="video/webm" />
            <source src={`${import.meta.env.BASE_URL}hero.mp4`} type="video/mp4" />
          </video>
        )}

        <span className="game-word mh-word">{PERSONAL_INFO.lastName}</span>
        <div className="mh-veil" />
        <div className="game-grid" />
        <div className="game-scan" />
      </div>

      {/* ══ HUD HAUT ═══════════════════════════════════════════ */}
      <header className="game-hud">
        <span className="game-logo">
          CE<span aria-hidden="true">.</span>
        </span>
      </header>

      {/* ══ CORPS ══════════════════════════════════════════════ */}
      <div className="game-content mh-body">
        {/* ── Menu vertical ─────────────────────────────────── */}
        <div className="mh-left">
          <p className="mh-identity">
            <span className="mh-identity-bar" aria-hidden="true" />
            <span className="mh-identity-name">
              {firstName} <span className="mh-identity-accent">{lastName}</span>
            </span>
            <span className="mh-identity-role">{role}</span>
          </p>

          <nav className="mh-menu" aria-label="Navigation principale">
            <ul>
              {HOME_MENU.map((item, i) => {
                const isActive = i === activeIndex
                const inner = (
                  <>
                    <span className="mh-bullet" aria-hidden="true" />
                    <span className="mh-label">{item.label}</span>
                  </>
                )

                return (
                  <li
                    key={item.label}
                    className={isActive ? 'mh-item mh-item--on' : 'mh-item'}
                    onMouseEnter={() => setHovered(i)}
                    onMouseLeave={() => setHovered(null)}
                  >
                    {item.external ? (
                      <a
                        href={item.path}
                        target="_blank"
                        rel="noopener noreferrer"
                        onFocus={() => setHovered(i)}
                        onBlur={() => setHovered(null)}
                      >
                        {inner}
                        <span className="visually-hidden"> (nouvel onglet)</span>
                      </a>
                    ) : (
                      <Link
                        to={item.path}
                        onFocus={() => setHovered(i)}
                        onBlur={() => setHovered(null)}
                      >
                        {inner}
                      </Link>
                    )}
                  </li>
                )
              })}
            </ul>
          </nav>

          <p className="mh-school">{school}</p>
        </div>
      </div>

      <style>{`
        .mh-video {
          position: absolute; inset: 0;
          width: 100%; height: 100%;
          object-fit: cover;
          opacity: 0.55;
        }
        .mh-word {
          left: 50%; top: 50%;
          transform: translate(-50%, -50%);
          font-size: clamp(6rem, 14vw, 12rem);
        }
        .mh-veil {
          position: absolute; inset: 0;
          background:
            linear-gradient(90deg, rgba(5,6,10,0.95) 0%, rgba(5,6,10,0.72) 34%, rgba(5,6,10,0.25) 60%, rgba(5,6,10,0.85) 100%),
            linear-gradient(180deg, rgba(5,6,10,0.9) 0%, transparent 22%, transparent 74%, rgba(5,6,10,0.92) 100%);
        }

        /* ── Corps ───────────────────────────────────────── */
        .mh-body {
          flex: 1; min-height: 0;
          display: flex;
          align-items: center;
          padding: var(--sp-5) clamp(var(--sp-4), 4vw, var(--sp-7));
        }

        /* ── Colonne menu ────────────────────────────────── */
        .mh-left { display: flex; flex-direction: column; gap: clamp(1.25rem, 3vh, 2.5rem); min-width: 0; }

        .mh-identity { display: flex; flex-direction: column; gap: 14px; }
        .mh-identity-bar { width: 64px; height: 4px; background: var(--accent); }
        .mh-identity-name {
          font-size: clamp(1.2rem, 2.6vw, 2.1rem);
          font-weight: 900;
          line-height: 1;
          letter-spacing: -0.02em;
          text-transform: uppercase;
          color: rgba(255,255,255,0.92);
        }
        .mh-identity-accent { color: var(--accent); }
        .mh-identity-role {
          font-size: var(--fs-sm); font-weight: 700;
          letter-spacing: 0.16em; text-transform: uppercase;
          color: rgba(255,255,255,0.5);
        }

        .mh-menu ul { display: flex; flex-direction: column; gap: clamp(4px, 1.1vh, 14px); }

        .mh-item a {
          display: flex; align-items: center; gap: var(--sp-4);
          padding: 6px 0;
          width: max-content; max-width: 100%;
        }
        .mh-bullet {
          width: 11px; height: 11px; flex: none;
          background: rgba(255,255,255,0.45);
          transition: background 0.2s var(--ease), transform 0.2s var(--ease);
        }
        .mh-label {
          font-size: clamp(1.9rem, 5.4vw, 4.2rem);
          font-weight: 900;
          line-height: 1.02;
          letter-spacing: -0.035em;
          text-transform: uppercase;
          color: rgba(255,255,255,0.62);
          transition: color 0.2s var(--ease), transform 0.25s var(--ease),
                      text-shadow 0.2s var(--ease);
        }
        .mh-item--on .mh-bullet { background: var(--accent); transform: scale(1.35); }
        .mh-item--on .mh-label {
          color: var(--accent);
          transform: translateX(10px) scale(1.06);
          transform-origin: left center;
          text-shadow: 0 0 32px rgba(139,92,246,0.45);
        }

        .mh-school {
          font-size: var(--fs-sm); font-weight: 700;
          letter-spacing: 0.14em; text-transform: uppercase;
          color: rgba(255,255,255,0.4);
        }

        /* ── Responsive ──────────────────────────────────── */
        @media (max-width: 900px) {
          .game--fixed { height: auto; min-height: 100svh; overflow: visible; }
          .mh-body { align-items: start; padding-block: var(--sp-6); }
          .mh-word { display: none; }
        }

        @media (prefers-reduced-motion: reduce) {
          .mh-item--on .mh-label { transform: none; }
          .mh-video { display: none; }
        }
      `}</style>
    </div>
  )
}
