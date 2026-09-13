'use client'

import { motion } from 'framer-motion'
import { EASE_INK } from '@/lib/motion'

type Props = {
  numeral: string
  name: string
  /** Aligne le bloc à droite pour casser la colonne d'un acte à l'autre. */
  align?: 'left' | 'right'
}

/**
 * L'en-tête d'un acte : un chiffre romain en creux, le nom de l'acte, et un
 * filet qui se tire. Aucun titre de section classique — la page se lit comme
 * une planche numérotée, pas comme un site.
 */
export function ActHeading({ numeral, name, align = 'left' }: Props) {
  return (
    <div className={`flex items-center gap-4 ${align === 'right' ? 'flex-row-reverse' : ''}`}>
      <span
        className="display select-none text-[2.75rem] leading-none text-transparent sm:text-[3.5rem]"
        style={{ WebkitTextStroke: '1px var(--color-ash-2)' }}
        aria-hidden="true"
      >
        {numeral}
      </span>

      <span className="label whitespace-nowrap text-paper-2">{name}</span>

      <motion.span
        className="rule-h flex-1"
        initial={{ scaleX: 0 }}
        whileInView={{ scaleX: 1 }}
        viewport={{ once: true, amount: 0.8 }}
        transition={{ duration: 1.1, ease: EASE_INK }}
        style={{ transformOrigin: align === 'right' ? 'right' : 'left' }}
      />
    </div>
  )
}
