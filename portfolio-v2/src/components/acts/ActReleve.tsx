'use client'

import { motion } from 'framer-motion'
import { ActHeading } from '@/components/acts/ActHeading'
import { InkReveal } from '@/components/ink/InkReveal'
import { SplitLines } from '@/components/type/SplitLines'
import { PROFILE } from '@/data/profile'
import { EASE_INK } from '@/lib/motion'

/**
 * ACTE II · LE RELEVÉ
 *
 * Trois fragments et quatre mesures, disposés comme les annotations d'un
 * manuscrit : la clé vit dans la marge, le texte occupe la colonne, et les
 * chiffres se lisent comme des relevés d'instrument plutôt que comme des
 * arguments de vente.
 */
export function ActReleve() {
  return (
    <section
      id="releve"
      aria-labelledby="releve-titre"
      className="relative py-28 sm:py-36"
    >
      <h2 id="releve-titre" className="sr-only">
        Le relevé
      </h2>

      <ActHeading numeral="II" name="Le relevé" />

      <div className="mt-16 grid gap-x-12 gap-y-14 lg:grid-cols-12">
        {/* Colonne décalée : la phrase forte n'occupe jamais toute la largeur. */}
        <div className="lg:col-span-5 lg:col-start-2">
          <InkReveal x={20} y={40}>
            <p className="display text-[clamp(1.9rem,4.2vw,3.1rem)] leading-[1.05]">
              Je ne fais pas
              <br />
              <span className="text-vermillon-lit">joli</span>. Je fais
              <br />
              en production.
            </p>
          </InkReveal>
        </div>

        {/* Les fragments, en marge annotée. */}
        <div className="lg:col-span-5 lg:col-start-8">
          <dl className="space-y-9">
            {PROFILE.register.map((entry, i) => (
              <motion.div
                key={entry.k}
                className="grid grid-cols-[auto_1fr] gap-x-5 border-t border-ash-2/50 pt-4"
                initial={{ opacity: 0, y: 16 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true, amount: 0.5 }}
                transition={{ duration: 0.8, delay: i * 0.12, ease: EASE_INK }}
              >
                <dt className="label pt-1 text-vermillon-lit">
                  {String(i + 1).padStart(2, '0')}
                </dt>
                <dd>
                  <p className="label mb-2 text-paper">{entry.k}</p>
                  <p className="text-[12.5px] leading-[1.85] text-paper-2">{entry.v}</p>
                </dd>
              </motion.div>
            ))}
          </dl>
        </div>
      </div>

      {/* Les mesures. Graduations plutôt que grosses cartes. */}
      <div className="mt-20 grid grid-cols-2 gap-px border border-ash-2/40 bg-ash-2/40 sm:grid-cols-4">
        {PROFILE.readings.map((reading, i) => (
          <motion.div
            key={reading.label}
            className="bg-void px-5 py-7"
            initial={{ opacity: 0 }}
            whileInView={{ opacity: 1 }}
            viewport={{ once: true, amount: 0.6 }}
            transition={{ duration: 0.7, delay: i * 0.08 }}
          >
            <div className="tick mb-4 h-3 w-full opacity-40" aria-hidden="true" />
            <p className="display text-[2.6rem] leading-none text-paper">
              {reading.value}
            </p>
            <p className="label mt-3 leading-relaxed">{reading.label}</p>
          </motion.div>
        ))}
      </div>

      {/* Une dernière ligne, en travers, pour rompre la grille. */}
      <div className="mt-16 lg:pl-[16%]">
        <SplitLines
          text="Ce que je cherche : une équipe qui livre, et des gens à qui poser des questions."
          className="display block text-[clamp(1.15rem,2.4vw,1.9rem)] leading-[1.25] text-paper-2"
        />
      </div>
    </section>
  )
}
