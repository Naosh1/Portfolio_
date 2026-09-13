'use client'

import { useEffect } from 'react'
import {
  motion,
  useMotionTemplate,
  useMotionValue,
  useReducedMotion,
  useSpring,
} from 'framer-motion'

/**
 * La tache de fond. Une lueur vermillon très basse en opacité qui suit le
 * curseur avec beaucoup de retard, comme si l'encre du papier réagissait à la
 * présence du visiteur sans jamais le rattraper.
 *
 * Volontairement énorme et diffuse : à cette échelle elle ne se lit pas comme
 * un effet, seulement comme de la profondeur.
 */
export function InkBlot() {
  const reduced = useReducedMotion()

  const rawX = useMotionValue(50)
  const rawY = useMotionValue(40)

  const springed = { stiffness: 38, damping: 26, mass: 1.4 }
  const x = useSpring(rawX, springed)
  const y = useSpring(rawY, springed)

  const left = useMotionTemplate`${x}%`
  const top = useMotionTemplate`${y}%`

  useEffect(() => {
    if (reduced) return
    if (!window.matchMedia('(pointer: fine)').matches) return

    const onMove = (e: PointerEvent) => {
      rawX.set((e.clientX / window.innerWidth) * 100)
      rawY.set((e.clientY / window.innerHeight) * 100)
    }

    window.addEventListener('pointermove', onMove, { passive: true })
    return () => window.removeEventListener('pointermove', onMove)
  }, [reduced, rawX, rawY])

  return (
    <div aria-hidden="true" className="pointer-events-none fixed inset-0 z-0 overflow-hidden">
      <motion.div
        className="absolute h-[85vmax] w-[85vmax] rounded-full"
        style={{
          left,
          top,
          translateX: '-50%',
          translateY: '-50%',
          background:
            'radial-gradient(circle, rgba(200,50,30,0.10) 0%, rgba(200,50,30,0.042) 32%, transparent 62%)',
        }}
      />

      {/* Une seconde nappe, fixe et froide, pour que le fond ne soit jamais
          uniformément noir même quand la souris ne bouge pas. */}
      <div
        className="absolute -left-[18vmax] top-[38vh] h-[70vmax] w-[70vmax] rounded-full"
        style={{
          background: 'radial-gradient(circle, rgba(232,228,220,0.032) 0%, transparent 60%)',
        }}
      />
    </div>
  )
}
