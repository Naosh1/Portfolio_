import { useCallback, useEffect, useRef, useState } from 'react'

/**
 * Carrousel de captures d'écran : slides centrées avec effet de profondeur
 * (les voisines sont réduites et assombries), navigation par flèches, points
 * et glisser tactile natif (scroll-snap). Le clic sur la slide active ouvre
 * une visionneuse plein écran.
 */
const AUTOPLAY_MS = 3800

export default function ProjectGallery({ images, title }) {
  const [active, setActive] = useState(0)
  const [lightbox, setLightbox] = useState(false)
  const [paused, setPaused] = useState(false)
  const trackRef = useRef(null)
  const rafRef = useRef(null)
  const resumeTimerRef = useRef(null)

  const count = images.length

  // Centre une slide en scrollant uniquement le carrousel (scrollLeft), jamais la page :
  // scrollIntoView peut faire remonter tout le document, on l'évite complètement.
  const centerSlide = (index, behavior = 'smooth') => {
    const track = trackRef.current
    const el = track?.children[index]
    if (!track || !el) return
    const target = el.offsetLeft - (track.clientWidth - el.clientWidth) / 2
    track.scrollTo({ left: target, behavior })
  }

  const scrollToIndex = useCallback((i, loop = false) => {
    const clamped = loop ? (i + count) % count : Math.max(0, Math.min(count - 1, i))
    if (!trackRef.current?.children[clamped]) return
    centerSlide(clamped)
    setActive(clamped)
  }, [count])

  const prev = useCallback(() => scrollToIndex(active - 1), [active, scrollToIndex])
  const next = useCallback(() => scrollToIndex(active + 1), [active, scrollToIndex])

  // Défilement auto en boucle, en pause au survol / focus / visionneuse ouverte
  useEffect(() => {
    const reduceMotion = window.matchMedia?.('(prefers-reduced-motion: reduce)').matches
    if (count <= 1 || paused || lightbox || reduceMotion) return undefined
    const id = setInterval(() => {
      setActive((a) => {
        const target = (a + 1) % count
        centerSlide(target)
        return target
      })
    }, AUTOPLAY_MS)
    return () => clearInterval(id)
  }, [paused, lightbox, count])

  // Une interaction manuelle (glisser, flèche…) met l'auto-défilement en pause quelques secondes
  const nudgePause = () => {
    setPaused(true)
    if (resumeTimerRef.current) clearTimeout(resumeTimerRef.current)
    resumeTimerRef.current = setTimeout(() => setPaused(false), AUTOPLAY_MS)
  }

  // Garde les points synchronisés quand on glisse à la main (sans re-déclencher de scroll)
  const handleScroll = () => {
    if (rafRef.current) cancelAnimationFrame(rafRef.current)
    rafRef.current = requestAnimationFrame(() => {
      const track = trackRef.current
      if (!track) return
      const trackCenter = track.getBoundingClientRect().left + track.clientWidth / 2
      let closest = 0
      let bestDist = Infinity
      Array.from(track.children).forEach((child, i) => {
        const r = child.getBoundingClientRect()
        const dist = Math.abs(r.left + r.width / 2 - trackCenter)
        if (dist < bestDist) { bestDist = dist; closest = i }
      })
      setActive((a) => (a === closest ? a : closest))
    })
  }

  useEffect(() => () => {
    if (rafRef.current) cancelAnimationFrame(rafRef.current)
    if (resumeTimerRef.current) clearTimeout(resumeTimerRef.current)
  }, [])

  // Navigation clavier dans la visionneuse (le défilement reste possible pendant qu'elle est ouverte)
  useEffect(() => {
    if (!lightbox) return undefined
    const onKeyDown = (e) => {
      if (e.key === 'Escape') setLightbox(false)
      if (e.key === 'ArrowLeft') prev()
      if (e.key === 'ArrowRight') next()
    }
    window.addEventListener('keydown', onKeyDown)
    return () => window.removeEventListener('keydown', onKeyDown)
  }, [lightbox, prev, next])

  if (count === 0) return null

  return (
    <div
      className="pg"
      onMouseEnter={() => setPaused(true)}
      onMouseLeave={() => setPaused(false)}
    >
      <div
        className="pg-track"
        ref={trackRef}
        onScroll={handleScroll}
        onPointerDown={nudgePause}
        onFocus={() => setPaused(true)}
        onBlur={() => setPaused(false)}
        tabIndex={0}
        role="group"
        aria-label={`Captures d'écran de ${title}`}
        onKeyDown={(e) => {
          if (e.key === 'ArrowLeft') { prev(); nudgePause() }
          if (e.key === 'ArrowRight') { next(); nudgePause() }
        }}
      >
        {images.map((src, i) => (
          <button
            key={src}
            type="button"
            className={i === active ? 'pg-slide pg-slide--active' : 'pg-slide'}
            onClick={() => {
              if (i === active) setLightbox(true)
              else { scrollToIndex(i); nudgePause() }
            }}
            aria-label={i === active ? "Agrandir l'image" : `Voir l'image ${i + 1}`}
          >
            <img
              src={src}
              alt={`Capture d'écran ${i + 1} de ${title}`}
              loading={i === 0 ? 'eager' : 'lazy'}
              draggable={false}
            />
          </button>
        ))}
      </div>

      {count > 1 && (
        <>
          <button
            type="button"
            className="pg-arrow pg-arrow--prev"
            onClick={() => { prev(); nudgePause() }}
            disabled={active === 0}
            aria-label="Image précédente"
          >
            ‹
          </button>
          <button
            type="button"
            className="pg-arrow pg-arrow--next"
            onClick={() => { next(); nudgePause() }}
            disabled={active === count - 1}
            aria-label="Image suivante"
          >
            ›
          </button>

          <div className="pg-dots" role="tablist" aria-label="Choisir une capture">
            {images.map((_, i) => (
              <button
                key={i}
                type="button"
                role="tab"
                className={i === active ? 'pg-dot pg-dot--on' : 'pg-dot'}
                aria-selected={i === active}
                aria-label={`Aller à l'image ${i + 1}`}
                onClick={() => { scrollToIndex(i); nudgePause() }}
              />
            ))}
          </div>
        </>
      )}

      {lightbox && (
        <div
          className="pg-lightbox"
          role="dialog"
          aria-modal="true"
          aria-label={`${title} — capture ${active + 1} sur ${count}`}
          onClick={(e) => { if (e.target === e.currentTarget) setLightbox(false) }}
        >
          <button
            type="button"
            className="pg-lightbox-close"
            onClick={() => setLightbox(false)}
            aria-label="Fermer"
          >
            ✕
          </button>

          {active > 0 && (
            <button
              type="button"
              className="pg-lightbox-nav pg-lightbox-nav--prev"
              onClick={prev}
              aria-label="Image précédente"
            >
              ‹
            </button>
          )}

          <img
            src={images[active]}
            alt={`Capture d'écran ${active + 1} de ${title}`}
            className="pg-lightbox-img"
          />

          {active < count - 1 && (
            <button
              type="button"
              className="pg-lightbox-nav pg-lightbox-nav--next"
              onClick={next}
              aria-label="Image suivante"
            >
              ›
            </button>
          )}

          <span className="pg-lightbox-count">{active + 1} / {count}</span>
        </div>
      )}

      <style>{`
        .pg { position: relative; margin-bottom: var(--sp-6); }

        .pg-track {
          display: flex;
          gap: var(--sp-4);
          overflow-x: auto;
          scroll-snap-type: x mandatory;
          padding-block: var(--sp-3) var(--sp-5);
          padding-inline: calc(50% - 130px);
          scrollbar-width: none;
          outline: none;
        }
        .pg-track::-webkit-scrollbar { display: none; }

        .pg-slide {
          flex: none;
          scroll-snap-align: center;
          width: min(70vw, 260px);
          aspect-ratio: 640 / 1391;
          border-radius: 22px;
          overflow: hidden;
          border: 1px solid rgba(255,255,255,0.14);
          background: #0b0810;
          opacity: 0.4;
          transform: scale(0.88);
          transition: opacity 0.35s var(--ease), transform 0.35s var(--ease), border-color 0.35s var(--ease);
          cursor: pointer;
        }
        .pg-slide img { width: 100%; height: 100%; object-fit: cover; display: block; }

        .pg-slide--active {
          opacity: 1;
          transform: scale(1);
          border-color: color-mix(in srgb, var(--accent) 50%, transparent);
          box-shadow: 0 20px 60px rgba(0,0,0,0.5), 0 0 40px color-mix(in srgb, var(--accent) 18%, transparent);
          cursor: zoom-in;
        }

        .pg-arrow {
          position: absolute; top: calc(50% - var(--sp-4)); z-index: 2;
          width: 44px; height: 44px; border-radius: 50%;
          display: flex; align-items: center; justify-content: center;
          font-size: 1.5rem; line-height: 1;
          color: #fff;
          background: rgba(10,7,20,0.65);
          border: 1px solid rgba(255,255,255,0.18);
          backdrop-filter: blur(6px);
          transition: background 0.15s var(--ease), border-color 0.15s var(--ease), opacity 0.15s var(--ease);
        }
        .pg-arrow:hover:not(:disabled) { background: color-mix(in srgb, var(--accent) 35%, transparent); border-color: var(--accent); }
        .pg-arrow:disabled { opacity: 0.25; cursor: default; }
        .pg-arrow--prev { left: var(--sp-3); }
        .pg-arrow--next { right: var(--sp-3); }

        .pg-dots { display: flex; align-items: center; justify-content: center; gap: 8px; margin-top: var(--sp-2); }
        .pg-dot {
          width: 7px; height: 7px; border-radius: 50%;
          background: rgba(255,255,255,0.25);
          transition: background 0.2s var(--ease), width 0.2s var(--ease);
        }
        .pg-dot:hover { background: rgba(255,255,255,0.5); }
        .pg-dot--on { width: 22px; border-radius: 4px; background: var(--accent); }

        /* ── Visionneuse plein écran ─────────────────────────── */
        .pg-lightbox {
          position: fixed; inset: 0; z-index: 60;
          display: flex; align-items: center; justify-content: center;
          padding: var(--sp-5);
          background: rgba(4,3,8,0.92);
          backdrop-filter: blur(10px);
          animation: pg-fade 0.18s var(--ease) both;
        }
        .pg-lightbox-img {
          max-width: min(90vw, 480px);
          max-height: 86vh;
          width: auto; height: auto;
          border-radius: 20px;
          border: 1px solid color-mix(in srgb, var(--accent) 35%, transparent);
          box-shadow: 0 30px 90px rgba(0,0,0,0.6);
          animation: pg-rise 0.22s var(--ease) both;
        }
        .pg-lightbox-close {
          position: absolute; top: var(--sp-5); right: var(--sp-5);
          width: 40px; height: 40px;
          display: flex; align-items: center; justify-content: center;
          color: rgba(255,255,255,0.7);
          border: 1px solid rgba(255,255,255,0.2);
          border-radius: 50%;
          transition: color 0.15s var(--ease), border-color 0.15s var(--ease);
        }
        .pg-lightbox-close:hover { color: #fff; border-color: var(--accent); }

        .pg-lightbox-nav {
          position: absolute; top: 50%; transform: translateY(-50%);
          width: 52px; height: 52px; border-radius: 50%;
          display: flex; align-items: center; justify-content: center;
          font-size: 1.8rem; color: #fff;
          background: rgba(255,255,255,0.06);
          border: 1px solid rgba(255,255,255,0.18);
          transition: background 0.15s var(--ease), border-color 0.15s var(--ease);
        }
        .pg-lightbox-nav:hover { background: color-mix(in srgb, var(--accent) 35%, transparent); border-color: var(--accent); }
        .pg-lightbox-nav--prev { left: var(--sp-4); }
        .pg-lightbox-nav--next { right: var(--sp-4); }

        .pg-lightbox-count {
          position: absolute; bottom: var(--sp-5); left: 50%; transform: translateX(-50%);
          font-size: var(--fs-xs); font-weight: 700;
          letter-spacing: 0.1em;
          color: rgba(255,255,255,0.55);
        }

        @keyframes pg-fade { from { opacity: 0; } to { opacity: 1; } }
        @keyframes pg-rise { from { opacity: 0; transform: scale(0.96); } to { opacity: 1; transform: none; } }

        @media (max-width: 640px) {
          .pg-arrow { width: 38px; height: 38px; font-size: 1.3rem; }
          .pg-lightbox-nav { width: 44px; height: 44px; font-size: 1.5rem; }
        }

        @media (prefers-reduced-motion: reduce) {
          .pg-slide, .pg-lightbox, .pg-lightbox-img { animation: none; transition: none; }
        }
      `}</style>
    </div>
  )
}
