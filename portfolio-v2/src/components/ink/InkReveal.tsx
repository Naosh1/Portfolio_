'use client'

import { useEffect, useRef, useState, type ReactNode } from 'react'
import {
  animate,
  useInView,
  useMotionTemplate,
  useMotionValue,
  useReducedMotion,
  motion,
} from 'framer-motion'
import { EASE_INK } from '@/lib/motion'

type Props = {
  children: ReactNode
  className?: string
  /** Origine de la diffusion, en % de la boîte. */
  x?: number
  y?: number
  delay?: number
  duration?: number
  /** Part de l'élément qui doit être visible avant de lancer la diffusion. */
  amount?: number
}

/**
 * Le geste central du site.
 *
 * Le contenu n'apparaît pas en fondu : un masque radial part d'un point et
 * gonfle, pendant qu'un filtre de turbulence déchire son bord. On dirait de
 * l'encre qui gagne le papier. Dès la diffusion terminée on retire le filtre,
 * sinon le texte resterait flou et le GPU continuerait à travailler pour rien.
 */
export function InkReveal({
  children,
  className = '',
  x = 30,
  y = 50,
  delay = 0,
  duration = 1.15,
  amount = 0.35,
}: Props) {
  const ref = useRef<HTMLDivElement>(null)
  const inView = useInView(ref, { once: true, amount })
  const reduced = useReducedMotion()

  const [wet, setWet] = useState(false)

  const spread = useMotionValue(0)
  const opacity = useMotionValue(0)
  const maskSize = useMotionTemplate`${spread}% ${spread}%`

  useEffect(() => {
    if (!inView) return

    if (reduced) {
      spread.set(400)
      opacity.set(1)
      return
    }

    setWet(true)

    const fade = animate(opacity, 1, { duration: duration * 0.4, delay, ease: 'linear' })
    const bleed = animate(spread, 400, { duration, delay, ease: EASE_INK })

    bleed.then(() => setWet(false))

    return () => {
      fade.stop()
      bleed.stop()
    }
  }, [inView, reduced, delay, duration, spread, opacity])

  return (
    <motion.div
      ref={ref}
      className={`ink-mask ${wet ? 'ink-wet' : ''} ${className}`}
      style={{
        opacity,
        WebkitMaskSize: maskSize,
        maskSize,
        ['--ink-x' as string]: `${x}%`,
        ['--ink-y' as string]: `${y}%`,
      }}
    >
      {children}
    </motion.div>
  )
}
