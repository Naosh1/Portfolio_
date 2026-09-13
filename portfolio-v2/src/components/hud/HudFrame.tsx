'use client'

import { motion, useScroll, useSpring, useTransform } from 'framer-motion'
import { Seal } from '@/components/ink/Seal'
import { LiveClock } from '@/components/hud/LiveClock'
import { useActiveAct, type ActMark } from '@/hooks/useActiveAct'
import { PROFILE } from '@/data/profile'

export const ACTS: readonly ActMark[] = [
  { id: 'seuil', numeral: 'I', name: 'Le seuil' },
  { id: 'releve', numeral: 'II', name: 'Le relevé' },
  { id: 'pieces', numeral: 'III', name: 'Les pièces' },
  { id: 'metier', numeral: 'IV', name: 'Le métier' },
  { id: 'sceau', numeral: 'V', name: 'Le sceau' },
]

/**
 * Le cadre.
 *
 * Quatre coins, quatre informations, et rien au milieu : pas de barre de
 * navigation qui flotte, pas de menu hamburger. Le site se lit d'une traite,
 * le cadre se contente de dire où l'on est.
 *
 * Les traits de coupe aux angles viennent de l'imprimerie, pas du jeu vidéo :
 * c'est ce qui donne l'impression d'une planche gravée plutôt que d'un HUD.
 */
export function HudFrame() {
  const active = useActiveAct(ACTS)

  const { scrollYProgress } = useScroll()
  const progress = useSpring(scrollYProgress, { stiffness: 90, damping: 26, mass: 0.4 })
  const percent = useTransform(progress, (v) => `${Math.round(v * 100)}`.padStart(3, '0'))

  return (
    <>
      {/* ── Traits de coupe ─────────────────────────────────── */}
      <div aria-hidden="true" className="pointer-events-none fixed inset-0 z-[100]">
        {(
          [
            'left-4 top-4 border-l border-t',
            'right-4 top-4 border-r border-t',
            'left-4 bottom-4 border-l border-b',
            'right-4 bottom-4 border-r border-b',
          ] as const
        ).map((position) => (
          <span
            key={position}
            className={`absolute h-4 w-4 border-ash-2/70 sm:h-5 sm:w-5 ${position}`}
          />
        ))}
      </div>

      {/* ── Coin haut gauche : la signature ─────────────────── */}
      {/* Décalés vers l'intérieur pour ne jamais chevaucher les traits de coupe */}
      <div className="pointer-events-none fixed left-7 top-6 z-[100] flex items-center gap-3 sm:left-12 sm:top-8">
        <Seal size={26} />
        <span className="label hidden text-paper-2 sm:inline">
          {PROFILE.first} {PROFILE.last}
        </span>
      </div>

      {/* ── Coin haut droit : où et quand ───────────────────── */}
      <div className="pointer-events-none fixed right-7 top-6 z-[100] text-right sm:right-12 sm:top-8">
        <p className="label text-paper-2">
          <LiveClock />
        </p>
        <p className="label mt-0.5 hidden text-ash sm:block">{PROFILE.coords}</p>
      </div>

      {/* ── Coin bas gauche : la progression ────────────────── */}
      {/* Desktop : une règle verticale graduée, comme une réglette d'atelier. */}
      <div className="pointer-events-none fixed bottom-8 left-8 z-[100] hidden items-end gap-3 lg:flex">
        <div className="relative h-28 w-px bg-ash-2">
          <motion.div
            className="absolute inset-x-0 top-0 origin-top bg-vermillon"
            style={{ height: '100%', scaleY: progress }}
          />
        </div>
        <div className="tick h-28 w-1.5 opacity-50" />
        <motion.span className="label translate-y-1 text-paper-2 tabular-nums">
          {percent}
        </motion.span>
      </div>

      {/* Mobile : un simple filet en bas de l'écran. */}
      <div className="pointer-events-none fixed inset-x-0 bottom-0 z-[100] h-px bg-ash-2/60 lg:hidden">
        <motion.div
          className="h-full origin-left bg-vermillon"
          style={{ scaleX: progress }}
        />
      </div>

      {/* ── Coin bas droit : l'acte en cours ────────────────── */}
      <div className="pointer-events-none fixed bottom-7 right-7 z-[100] text-right sm:bottom-8 sm:right-12">
        <p className="label text-paper-2">
          <span className="text-vermillon-lit">{active.numeral}</span>
          <span className="mx-1.5 text-ash" aria-hidden="true">/</span>
          <span className="hidden sm:inline">{active.name}</span>
          <span className="sm:hidden">{ACTS.length}</span>
        </p>
      </div>
    </>
  )
}
