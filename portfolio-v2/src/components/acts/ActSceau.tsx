'use client'

import { motion } from 'framer-motion'
import { InkReveal } from '@/components/ink/InkReveal'
import { Seal } from '@/components/ink/Seal'
import { PROFILE } from '@/data/profile'
import { EASE_INK } from '@/lib/motion'

/**
 * ACTE V · LE SCEAU
 *
 * La fin est presque vide. Beaucoup de noir, un sceau, une adresse : après
 * quatre actes denses, le silence est ce qui reste en mémoire.
 *
 * Un seul geste possible ici — écrire. Pas de formulaire, pas de champs à
 * remplir, pas de bouton qui promet un rappel.
 */
export function ActSceau() {
  const year = new Date().getFullYear()

  return (
    <section
      id="sceau"
      aria-labelledby="sceau-titre"
      className="relative flex min-h-[92svh] flex-col justify-end pb-16 pt-32"
    >
      <h2 id="sceau-titre" className="sr-only">
        Le sceau
      </h2>

      <div className="flex-1" />

      <motion.div
        initial={{ opacity: 0 }}
        whileInView={{ opacity: 1 }}
        viewport={{ once: true, amount: 0.4 }}
        transition={{ duration: 0.9, ease: EASE_INK }}
        className="mb-12 flex items-center gap-6"
      >
        <Seal size={68} />
        <p className="label max-w-[16rem] leading-relaxed">
          {PROFILE.seeking.long}
        </p>
      </motion.div>

      <InkReveal x={18} y={60} duration={1.35}>
        <a
          href={`mailto:${PROFILE.email}`}
          data-cursor="link"
          className="ink-link display block break-all text-[clamp(1.8rem,7.5vw,5.6rem)] leading-[0.95] transition-colors duration-500 hover:text-vermillon-lit"
        >
          {PROFILE.email}
        </a>
      </InkReveal>

      <div className="mt-14 flex flex-wrap items-end justify-between gap-6 border-t border-ash-2/60 pt-6">
        <div className="flex flex-wrap items-center gap-x-8 gap-y-3">
          <a
            href={PROFILE.github}
            target="_blank"
            rel="noopener noreferrer"
            data-cursor="link"
            className="ink-link label text-paper transition-colors hover:text-vermillon-lit"
          >
            github / {PROFILE.githubHandle}
            <span className="sr-only">(nouvel onglet)</span>
          </a>

          <button
            type="button"
            data-cursor="link"
            onClick={() =>
              window.scrollTo({
                top: 0,
                behavior: window.matchMedia('(prefers-reduced-motion: reduce)').matches
                  ? 'auto'
                  : 'smooth',
              })
            }
            className="label transition-colors hover:text-paper"
          >
            ↑ retour au seuil
          </button>
        </div>

        <p className="label text-ash-2">
          © {year} {PROFILE.first} {PROFILE.last} · {PROFILE.place}
        </p>
      </div>
    </section>
  )
}
