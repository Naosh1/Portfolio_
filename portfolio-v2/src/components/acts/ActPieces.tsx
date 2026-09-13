'use client'

import { useState } from 'react'
import { AnimatePresence, motion } from 'framer-motion'
import { ActHeading } from '@/components/acts/ActHeading'
import { WorkPlate } from '@/components/acts/WorkPlate'
import { WORKS, type Work } from '@/data/works'
import { EASE_INK } from '@/lib/motion'

/**
 * ACTE III · LES PIÈCES
 *
 * Pas de grille de cartes. Un index, comme au dos d'un catalogue : une ligne
 * par pièce, et la plaque correspondante qui se diffuse dans la colonne d'à
 * côté quand on la survole ou qu'on l'atteint au clavier.
 *
 * Le panneau de plaque déborde sur l'index : les deux colonnes se chevauchent
 * au lieu de se ranger côte à côte.
 */
export function ActPieces() {
  const [active, setActive] = useState(0)
  const work = WORKS[active]

  return (
    <section id="pieces" aria-labelledby="pieces-titre" className="relative py-28 sm:py-36">
      <h2 id="pieces-titre" className="sr-only">
        Les pièces
      </h2>

      <ActHeading numeral="III" name="Les pièces" align="right" />

      {/* ── Desktop : index + plaque qui se chevauchent ─────── */}
      {/* L'index s'arrête à la colonne 6, la plaque démarre à la 7 puis remonte
          sur lui : les deux se chevauchent sans que la plaque ne recouvre
          jamais du texte, parce que les lignes ne portent rien à droite. */}
      <div className="mt-16 hidden lg:grid lg:grid-cols-12 lg:gap-0">
        <ul className="lg:col-span-7 lg:pr-6">
          {WORKS.map((item, i) => (
            <IndexRow
              key={item.ref}
              work={item}
              active={i === active}
              onEnter={() => setActive(i)}
            />
          ))}
        </ul>

        <div className="relative lg:col-span-5 lg:-ml-32">
          <div className="sticky top-[18vh] lg:-mt-10">
            <AnimatePresence mode="wait">
              <motion.div
                key={work.ref}
                initial={{ opacity: 0, scale: 1.04 }}
                animate={{ opacity: 1, scale: 1 }}
                exit={{ opacity: 0 }}
                transition={{ duration: 0.55, ease: EASE_INK }}
              >
                <WorkPlate work={work} className="h-[46vh] max-h-[440px] min-h-[300px]" />
              </motion.div>
            </AnimatePresence>

            <AnimatePresence mode="wait">
              <motion.div
                key={`${work.ref}-meta`}
                className="mt-6"
                initial={{ opacity: 0, y: 10 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -6 }}
                transition={{ duration: 0.4, ease: EASE_INK }}
              >
                <p className="text-[12.5px] leading-[1.85] text-paper-2">{work.line}</p>
                <StackRow work={work} />
                {work.href && <VisitLink work={work} />}
              </motion.div>
            </AnimatePresence>
          </div>
        </div>
      </div>

      {/* ── Mobile : chaque pièce porte sa propre plaque ────── */}
      <ul className="mt-12 space-y-14 lg:hidden">
        {WORKS.map((item) => (
          <motion.li
            key={item.ref}
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, amount: 0.25 }}
            transition={{ duration: 0.7, ease: EASE_INK }}
          >
            <WorkPlate work={item} className="aspect-[16/10]" />

            <div className="mt-5 flex items-baseline gap-3">
              <span className="label text-vermillon-lit">{item.ref}</span>
              <h3 className="display text-[1.75rem] leading-none">{item.title}</h3>
            </div>

            <p className="label mt-2">
              {item.kind} · {item.year}
            </p>
            <p className="mt-3 text-[12.5px] leading-[1.85] text-paper-2">{item.line}</p>

            <StackRow work={item} />
            {item.href && <VisitLink work={item} />}
          </motion.li>
        ))}
      </ul>
    </section>
  )
}

/** Une ligne d'index. Focusable : le clavier change la plaque comme la souris. */
function IndexRow({
  work,
  active,
  onEnter,
}: {
  work: Work
  active: boolean
  onEnter: () => void
}) {
  // Survoler ou atteindre la ligne au clavier change la plaque ; la valider
  // ouvre le site quand il y en a un, pour qu'Entrée ne soit jamais un geste
  // sans effet.
  const open = () => {
    if (work.href) window.open(work.href, '_blank', 'noopener,noreferrer')
  }

  return (
    <li>
      <div
        tabIndex={0}
        role="button"
        aria-pressed={active}
        aria-label={
          `${work.title}, ${work.kind}, ${work.year}` +
          (work.href ? '. Ouvrir le site dans un nouvel onglet.' : '')
        }
        data-cursor="work"
        onMouseEnter={onEnter}
        onFocus={onEnter}
        onClick={() => {
          onEnter()
          open()
        }}
        onKeyDown={(e) => {
          if (e.key === 'Enter' || e.key === ' ') {
            e.preventDefault()
            onEnter()
            open()
          }
        }}
        className="group relative grid cursor-pointer grid-cols-[3rem_1fr] gap-x-4 border-b border-ash-2/40 py-6 outline-offset-4"
      >
        {/* Filet vermillon qui se tire sous la ligne active */}
        <motion.span
          aria-hidden="true"
          className="absolute inset-x-0 bottom-[-1px] h-px origin-left bg-vermillon"
          animate={{ scaleX: active ? 1 : 0 }}
          transition={{ duration: 0.6, ease: EASE_INK }}
        />

        <span
          className={`label pt-2 transition-colors duration-300 ${
            active ? 'text-vermillon-lit' : ''
          }`}
        >
          {work.ref}
        </span>

        <motion.div animate={{ x: active ? 12 : 0 }} transition={{ duration: 0.5, ease: EASE_INK }}>
          <h3
            className={`display text-[clamp(1.5rem,2.6vw,2.35rem)] leading-none transition-colors duration-300 ${
              active ? 'text-paper' : 'text-paper-2'
            }`}
          >
            {work.title}
          </h3>

          {/* Le relevé passe sous le titre : ainsi la moitié droite de la ligne
              reste vide et la plaque peut la recouvrir sans rien masquer. */}
          <p className="label mt-2.5">
            {work.kind}
            <span className="mx-2 text-ash" aria-hidden="true">·</span>
            {work.year}
            <span className="mx-2 text-ash" aria-hidden="true">·</span>
            {work.status === 'En production' ? (
              <span className={active ? 'text-vermillon-lit' : ''}>en ligne</span>
            ) : (
              'archive'
            )}
          </p>
        </motion.div>
      </div>
    </li>
  )
}

function StackRow({ work }: { work: Work }) {
  return (
    <ul className="mt-5 flex flex-wrap gap-x-4 gap-y-1.5">
      {work.stack.map((tool) => (
        <li key={tool} className="label text-ash">
          {tool}
        </li>
      ))}
    </ul>
  )
}

function VisitLink({ work }: { work: Work }) {
  if (!work.href) return null

  return (
    <a
      href={work.href}
      target="_blank"
      rel="noopener noreferrer"
      data-cursor="link"
      className="ink-link mt-6 inline-block text-[12px] uppercase tracking-[0.22em] text-paper transition-colors hover:text-vermillon-lit"
    >
      Voir le site en ligne <span aria-hidden="true">↗</span>
      <span className="sr-only">(nouvel onglet)</span>
    </a>
  )
}
