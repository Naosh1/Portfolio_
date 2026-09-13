import type { Transition } from 'framer-motion'

/** Courbe unique du site : départ franc, arrivée qui s'étale comme de l'encre. */
export const EASE_INK = [0.16, 1, 0.3, 1] as const

/** Le sceau, lui, claque. */
export const EASE_SEAL = [0.34, 1.56, 0.64, 1] as const

export const inkTransition = (duration = 0.9, delay = 0): Transition => ({
  duration,
  delay,
  ease: EASE_INK,
})

/** Apparition standard : une remontée courte, jamais un fondu seul. */
export const rise = {
  hidden: { opacity: 0, y: 18 },
  shown: { opacity: 1, y: 0 },
}

export const riseTransition: Transition = {
  duration: 0.8,
  ease: EASE_INK,
}

/** Décalage entre enfants d'une même série. */
export const stagger = (each = 0.06, delay = 0): Transition => ({
  staggerChildren: each,
  delayChildren: delay,
})
