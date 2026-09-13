'use client'

import { MotionConfig } from 'framer-motion'
import type { ReactNode } from 'react'

/**
 * Un seul endroit règle le mouvement de tout le site.
 *
 * `reducedMotion="user"` suit le réglage du système : chez un visiteur qui
 * demande moins d'animations, Framer Motion coupe les déplacements et les
 * mises à l'échelle, et ne garde que les fondus. Le CSS s'occupe du reste
 * (masques, filtres, boucles), et la séquence d'ouverture est sautée.
 */
export function MotionProvider({ children }: { children: ReactNode }) {
  return <MotionConfig reducedMotion="user">{children}</MotionConfig>
}
