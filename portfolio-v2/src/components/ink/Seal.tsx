'use client'

import { motion, useReducedMotion } from 'framer-motion'
import { EASE_SEAL } from '@/lib/motion'
import { useMounted } from '@/hooks/useMounted'

type Props = {
  size?: number
  /** Anime la pose du sceau, comme un tampon qu'on applique. */
  stamp?: boolean
  delay?: number
  className?: string
}

/**
 * La signature. Un sceau carré vermillon aux bords volontairement irréguliers
 * — un tampon n'est jamais parfaitement droit — avec les initiales gravées en
 * creux et l'alias en dessous.
 *
 * C'est l'élément qui rend le portfolio reconnaissable sans le nom : on le
 * retrouve au démarrage, dans le coin de l'écran, puis en grand à la fin.
 */
export function Seal({ size = 40, stamp = false, delay = 0, className = '' }: Props) {
  const reduced = useReducedMotion()
  const mounted = useMounted()

  const body = (
    <div
      className={`relative grid place-items-center ${className}`}
      style={{
        width: size,
        height: size,
        background: 'var(--color-vermillon)',
        // Bord taillé à la main : chaque coin est légèrement décalé.
        clipPath:
          'polygon(3% 1%, 97% 4%, 99% 96%, 94% 99%, 6% 97%, 1% 92%, 2% 8%)',
      }}
    >
      <span
        className="display select-none leading-none"
        style={{
          fontSize: size * 0.46,
          color: 'var(--color-void)',
          letterSpacing: '-0.06em',
        }}
      >
        CE
      </span>
      {/* Sous 34 px l'alias devient une bouillie de pixels : on ne l'affiche
          que lorsqu'il est réellement lisible. */}
      {size >= 34 && (
        <span
          className="absolute select-none"
          style={{
            bottom: size * 0.12,
            fontSize: size * 0.145,
            letterSpacing: '0.2em',
            color: 'var(--color-void)',
          }}
        >
          NAOSHI
        </span>
      )}
    </div>
  )

  if (!stamp || (mounted && reduced)) return body

  return (
    <motion.div
      initial={{ scale: 1.7, opacity: 0, rotate: -8 }}
      animate={{ scale: 1, opacity: 1, rotate: -2 }}
      transition={{ duration: 0.55, delay, ease: EASE_SEAL }}
    >
      {body}
    </motion.div>
  )
}
