'use client'

import { useRef } from 'react'
import { motion, useScroll, useTransform } from 'framer-motion'
import { InkGlitch } from '@/components/type/InkGlitch'
import { PROFILE } from '@/data/profile'
import { EASE_INK } from '@/lib/motion'

/**
 * ACTE I · LE SEUIL
 *
 * Pas de hero centré. Le nom déborde par la gauche, coupé par le bord de
 * l'écran comme une planche mal calée sous la presse ; la mention
 * d'alternance monte à la verticale sur le flanc droit ; le rôle n'arrive
 * qu'en bas, presque en note de bas de page.
 *
 * Tout ce qui bouge ici bouge à des vitesses différentes : c'est ce décalage
 * qui donne la profondeur, pas une ombre portée.
 */
export function ActSeuil() {
  const ref = useRef<HTMLElement>(null)
  const { scrollYProgress } = useScroll({
    target: ref,
    offset: ['start start', 'end start'],
  })

  const nameY = useTransform(scrollYProgress, [0, 1], ['0%', '-22%'])
  const nameOpacity = useTransform(scrollYProgress, [0, 0.75], [1, 0])
  const asideY = useTransform(scrollYProgress, [0, 1], ['0%', '38%'])
  const footY = useTransform(scrollYProgress, [0, 1], ['0%', '90%'])

  return (
    <section
      id="seuil"
      ref={ref}
      aria-label="Ouverture"
      className="relative flex min-h-[100svh] flex-col justify-end overflow-hidden pb-24 pt-32 sm:pb-28"
    >
      {/* Mention verticale sur le flanc droit. Rythme japonais, zéro caractère
          décoratif : c'est la direction de lecture qui fait le geste. */}
      <motion.p
        style={{ y: asideY }}
        className="label absolute right-5 top-[22vh] hidden text-vermillon-lit sm:right-9 md:block"
      >
        <span
          className="inline-block whitespace-nowrap"
          style={{ writingMode: 'vertical-rl' }}
        >
          Alternance · septembre 2026
        </span>
      </motion.p>

      {/* Note posée à un endroit inattendu plutôt qu'au centre.
          Sur mobile elle repasse dans le flux, juste au-dessus du nom : flottant
          en haut d'un écran étroit, elle laissait un trou de 250 px au milieu de
          la page et donnait l'impression d'un écran vide. */}
      <motion.div
        style={{ y: asideY }}
        className="mb-10 max-w-[15rem] md:absolute md:right-24 md:top-[24vh] md:mb-0 md:text-right"
      >
        <motion.p
          className="text-[11px] leading-relaxed text-paper-2"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 1, delay: 0.35, ease: EASE_INK }}
        >
          Étudiante en {PROFILE.study}. Huit semaines en agence, dix sites en
          production, une plateforme conçue de bout en bout.
        </motion.p>
      </motion.div>

      {/* Le nom. Il déborde volontairement par la gauche : la section est en
          overflow-hidden, donc le C se fait couper par le bord comme une
          planche mal calée sous la presse. */}
      <motion.div style={{ y: nameY, opacity: nameOpacity }} className="relative">
        <h1 className="display text-[clamp(4.2rem,17.5vw,15rem)]">
          <span className="sr-only">
            {PROFILE.first} {PROFILE.last}, {PROFILE.role}
          </span>

          <motion.span
            aria-hidden="true"
            className="-ml-[3vw] block sm:-ml-[3.5vw]"
            initial={{ opacity: 0, x: -26 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 1.2, delay: 0.1, ease: EASE_INK }}
          >
            <InkGlitch>
              CAMIL<span className="text-vermillon">[L]</span>IA
            </InkGlitch>
          </motion.span>

          {/* Pas de marge négative ici : la coupe est un geste réservé au
              prénom, le nom de famille doit rester entièrement lisible. */}
          <motion.span
            aria-hidden="true"
            className="mt-4 block text-[clamp(0.7rem,1.5vw,1.1rem)] font-normal uppercase text-paper-2"
            style={{ fontFamily: 'var(--font-mono)', letterSpacing: '0.5em' }}
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 1, delay: 0.75, ease: EASE_INK }}
          >
            {PROFILE.last}
          </motion.span>
        </h1>
      </motion.div>

      {/* Pied de l'acte : le rôle, et l'invitation à descendre. */}
      <motion.div
        style={{ y: footY }}
        className="mt-14 flex flex-wrap items-end justify-between gap-6 border-t border-ash-2/60 pt-5"
      >
        <motion.p
          className="max-w-2xl text-[12px] leading-relaxed text-paper-2"
          initial={{ opacity: 0, y: 12 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.9, delay: 0.95, ease: EASE_INK }}
        >
          <span className="text-paper">{PROFILE.role}</span>
          <span className="mx-2 text-ash" aria-hidden="true">/</span>
          {PROFILE.school}
        </motion.p>

        <motion.div
          className="label flex items-center gap-3 text-ash"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 0.9, delay: 1.2 }}
        >
          <span>Descendre</span>
          <motion.span
            className="block h-8 w-px bg-ash-2"
            animate={{ scaleY: [0.3, 1, 0.3] }}
            transition={{ duration: 2.4, repeat: Infinity, ease: 'easeInOut' }}
            style={{ transformOrigin: 'top' }}
          />
        </motion.div>
      </motion.div>
    </section>
  )
}
