'use client'

import { useRef } from 'react'
import { motion, useScroll, useTransform } from 'framer-motion'
import { ActHeading } from '@/components/acts/ActHeading'
import { PROFILE } from '@/data/profile'

/**
 * ACTE IV · LE MÉTIER
 *
 * Les outils ne sont pas une liste à puces ni une grille de logos : deux
 * bandes qui glissent en sens inverse, entraînées par le défilement de la page
 * et non par une boucle automatique. Quand le visiteur s'arrête, elles
 * s'arrêtent — c'est lui qui tient la manivelle.
 */
export function ActMetier() {
  const ref = useRef<HTMLElement>(null)
  const { scrollYProgress } = useScroll({
    target: ref,
    offset: ['start end', 'end start'],
  })

  const leftward = useTransform(scrollYProgress, [0, 1], ['2%', '-32%'])
  const rightward = useTransform(scrollYProgress, [0, 1], ['-30%', '4%'])
  const ghostX = useTransform(scrollYProgress, [0, 1], ['-8%', '8%'])

  // Deux passes pour que la bande ne se termine jamais dans le vide.
  const band = [...PROFILE.craft, ...PROFILE.craft]

  return (
    <section
      id="metier"
      ref={ref}
      aria-labelledby="metier-titre"
      className="relative overflow-hidden pb-20 pt-28 sm:pb-24 sm:pt-36"
    >
      <h2 id="metier-titre" className="sr-only">
        Le métier
      </h2>

      <ActHeading numeral="IV" name="Le métier" />

      {/* Mot fantôme, très large, qui dérive derrière les bandes */}
      <motion.p
        aria-hidden="true"
        style={{ x: ghostX }}
        className="display pointer-events-none absolute left-0 top-1/2 w-full -translate-y-1/2 select-none whitespace-nowrap text-center text-[22vw] leading-none text-transparent"
      >
        <span style={{ WebkitTextStroke: '1px rgba(106,103,95,0.13)' }}>
          savoir-faire
        </span>
      </motion.p>

      <div
        className="relative mt-20 space-y-6"
        style={{
          // Les bandes s'effacent aux bords plutôt que d'être coupées net
          WebkitMaskImage:
            'linear-gradient(to right, transparent, #000 12%, #000 88%, transparent)',
          maskImage:
            'linear-gradient(to right, transparent, #000 12%, #000 88%, transparent)',
        }}
      >
        <motion.ul
          style={{ x: leftward }}
          className="flex w-max items-center gap-8 sm:gap-12"
        >
          {band.map((tool, i) => (
            <li
              key={`a-${tool}-${i}`}
              className="display flex items-center gap-8 whitespace-nowrap text-[clamp(1.6rem,3.4vw,2.9rem)] leading-none text-paper sm:gap-12"
            >
              {tool}
              <span className="text-[0.4em] text-vermillon" aria-hidden="true">
                ✳
              </span>
            </li>
          ))}
        </motion.ul>

        <motion.ul
          style={{ x: rightward }}
          className="flex w-max items-center gap-8 sm:gap-12"
        >
          {band.map((tool, i) => (
            <li
              key={`b-${tool}-${i}`}
              className="flex items-center gap-8 whitespace-nowrap text-[11px] uppercase tracking-[0.34em] text-ash sm:gap-12"
            >
              {tool}
              <span className="text-ash" aria-hidden="true">
                /
              </span>
            </li>
          ))}
        </motion.ul>
      </div>

      {/* Liste réelle pour les lecteurs d'écran : les bandes sont décoratives */}
      <ul className="sr-only">
        {PROFILE.craft.map((tool) => (
          <li key={tool}>{tool}</li>
        ))}
      </ul>

      <div className="mt-20 grid gap-8 border-t border-ash-2/50 pt-8 sm:grid-cols-2">
        <p className="text-[12.5px] leading-[1.85] text-paper-2">
          Le reste s&apos;apprend. Ce que je ramène d&apos;un stage en agence, ce
          n&apos;est pas une liste d&apos;outils : c&apos;est l&apos;habitude de
          livrer quelque chose qui tourne, chez de vrais clients, et de le
          maintenir après.
        </p>
        <p className="label leading-relaxed sm:text-right">
          {PROFILE.school}
          <br />
          <span className="text-vermillon-lit">{PROFILE.seeking.label}</span>
        </p>
      </div>
    </section>
  )
}
