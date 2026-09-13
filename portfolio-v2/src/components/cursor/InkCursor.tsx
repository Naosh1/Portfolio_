'use client'

import { useEffect, useState } from 'react'
import { motion, useMotionValue, useReducedMotion, useSpring } from 'framer-motion'

type Mode = 'idle' | 'link' | 'work'

const RING: Record<Mode, number> = { idle: 18, link: 32, work: 54 }

/**
 * Le curseur.
 *
 * Deux éléments seulement : un point qui colle exactement au pointeur, et un
 * anneau qui traîne derrière. C'est le décalage entre les deux qui donne la
 * sensation d'inertie, pas la taille.
 *
 * Le curseur natif n'est masqué que lorsqu'un vrai remplacement est actif :
 * pointeur fin, animations autorisées. Au tactile ou en mouvement réduit, on ne
 * touche à rien.
 */
export function InkCursor() {
  const reduced = useReducedMotion()
  const [enabled, setEnabled] = useState(false)
  const [mode, setMode] = useState<Mode>('idle')
  const [visible, setVisible] = useState(false)

  const x = useMotionValue(-100)
  const y = useMotionValue(-100)

  const ringX = useSpring(x, { stiffness: 380, damping: 34, mass: 0.5 })
  const ringY = useSpring(y, { stiffness: 380, damping: 34, mass: 0.5 })

  useEffect(() => {
    if (reduced) return
    const fine = window.matchMedia('(pointer: fine)')
    if (!fine.matches) return

    setEnabled(true)
    document.body.dataset.inkCursor = 'on'

    const onMove = (e: PointerEvent) => {
      x.set(e.clientX)
      y.set(e.clientY)
      setVisible(true)

      const target = (e.target as Element | null)?.closest?.('[data-cursor]')
      const next = target?.getAttribute('data-cursor')
      setMode(next === 'work' ? 'work' : next === 'link' ? 'link' : 'idle')
    }

    const onLeave = () => setVisible(false)

    window.addEventListener('pointermove', onMove, { passive: true })
    document.addEventListener('pointerleave', onLeave)

    return () => {
      window.removeEventListener('pointermove', onMove)
      document.removeEventListener('pointerleave', onLeave)
      delete document.body.dataset.inkCursor
    }
  }, [reduced, x, y])

  if (!enabled) return null

  return (
    <div aria-hidden="true" className="pointer-events-none fixed inset-0 z-[130]">
      {/* L'anneau, en retard */}
      <motion.div
        className="absolute rounded-full border"
        style={{
          x: ringX,
          y: ringY,
          translateX: '-50%',
          translateY: '-50%',
          borderColor: mode === 'idle' ? 'var(--color-ash)' : 'var(--color-vermillon)',
          backgroundColor:
            mode === 'work' ? 'rgba(200,50,30,0.10)' : 'transparent',
        }}
        animate={{
          width: RING[mode],
          height: RING[mode],
          opacity: visible ? 1 : 0,
        }}
        transition={{ duration: 0.3, ease: [0.16, 1, 0.3, 1] }}
      >
        <motion.span
          className="absolute inset-0 grid place-items-center text-[9px] uppercase tracking-[0.2em] text-paper"
          animate={{ opacity: mode === 'work' ? 1 : 0 }}
          transition={{ duration: 0.18 }}
        >
          voir
        </motion.span>
      </motion.div>

      {/* Le point, exactement sous le doigt */}
      <motion.div
        className="absolute h-[3px] w-[3px] rounded-full bg-vermillon-lit"
        style={{ x, y, translateX: '-50%', translateY: '-50%' }}
        animate={{ opacity: visible && mode !== 'work' ? 1 : 0 }}
        transition={{ duration: 0.18 }}
      />
    </div>
  )
}
