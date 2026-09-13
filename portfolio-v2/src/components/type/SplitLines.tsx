'use client'

import { motion, useReducedMotion } from 'framer-motion'
import { EASE_INK } from '@/lib/motion'
import { useMounted } from '@/hooks/useMounted'

type Props = {
  text: string
  className?: string
  delay?: number
  /** Décalage entre deux mots. Plus c'est court, plus la phrase arrive d'un bloc. */
  each?: number
}

/**
 * Une phrase qui se pose mot à mot.
 *
 * Chaque mot monte derrière une ligne de coupe : c'est le débordement caché du
 * conteneur qui fait l'effet, pas une opacité. Le texte reste sélectionnable et
 * lisible par un lecteur d'écran d'un seul tenant.
 */
export function SplitLines({ text, className = '', delay = 0, each = 0.035 }: Props) {
  const reduced = useReducedMotion()
  const mounted = useMounted()
  const words = text.split(' ')

  // Tant que l'hydratation n'a pas eu lieu, on rend exactement ce que le
  // serveur a produit ; sinon les deux arbres divergent.
  if (mounted && reduced) return <span className={className}>{text}</span>

  return (
    <span className={className}>
      <span className="sr-only">{text}</span>
      <motion.span
        aria-hidden="true"
        initial="hidden"
        whileInView="shown"
        viewport={{ once: true, amount: 0.4 }}
        transition={{ staggerChildren: each, delayChildren: delay }}
      >
        {words.map((word, i) => (
          <span key={`${word}-${i}`} className="inline-block overflow-hidden align-bottom">
            <motion.span
              className="inline-block"
              variants={{
                hidden: { y: '110%' },
                shown: { y: '0%' },
              }}
              transition={{ duration: 0.75, ease: EASE_INK }}
            >
              {word}
              {i < words.length - 1 ? ' ' : ''}
            </motion.span>
          </span>
        ))}
      </motion.span>
    </span>
  )
}
