'use client'

import { useCallback, useEffect, useRef, useState } from 'react'
import {
  AnimatePresence,
  animate,
  motion,
  useMotionTemplate,
  useMotionValue,
  useReducedMotion,
  useTransform,
} from 'framer-motion'
import { Seal } from '@/components/ink/Seal'
import { EASE_INK } from '@/lib/motion'
import { PROFILE } from '@/data/profile'
import { BOOT_KEY } from '@/lib/boot'

const READOUT = [
  'encre.sys · initialisation',
  'lecture du support ....... ok',
  `profil  : ${PROFILE.last.toLowerCase()}.${PROFILE.first.toLowerCase()}`,
  `alias   : ${PROFILE.alias.toLowerCase()}`,
  'poste   : développeuse web full-stack',
  'statut  : disponible · sept. 2026',
]

/**
 * Le seuil.
 *
 * Une goutte tombe, l'encre gagne le papier et découvre le nom en dessous ;
 * le sceau se pose ; le voile s'essuie vers le haut. Rien n'apparaît en fondu :
 * tout est révélé par la diffusion.
 *
 * La séquence n'est jouée qu'une fois par session. Au retour, un script inline
 * dans le <head> pose `data-booted` sur <html> avant la première peinture, donc
 * le visiteur ne voit même pas un éclair de noir.
 */
export function BootSequence() {
  const reduced = useReducedMotion()
  const [done, setDone] = useState(false)
  const [phase, setPhase] = useState(0)
  const timers = useRef<number[]>([])

  // Voile qui s'essuie vers le haut à la toute fin.
  const wipe = useMotionValue(0)
  const wipeLow = useTransform(wipe, (v) => v - 16)
  const maskImage = useMotionTemplate`linear-gradient(to top, transparent ${wipeLow}%, #000 ${wipe}%)`

  const finish = useCallback(() => {
    timers.current.forEach(clearTimeout)
    timers.current = []
    try {
      sessionStorage.setItem(BOOT_KEY, '1')
      document.documentElement.dataset.booted = '1'
    } catch {
      /* mode privé : on rejouera la séquence, ce n'est pas grave */
    }
    setDone(true)
  }, [])

  const skip = useCallback(() => {
    animate(wipe, 130, { duration: 0.5, ease: EASE_INK }).then(finish)
  }, [wipe, finish])

  useEffect(() => {
    let alreadySeen = false
    try {
      alreadySeen = sessionStorage.getItem(BOOT_KEY) === '1'
    } catch {
      alreadySeen = false
    }

    if (alreadySeen || reduced) {
      finish()
      return
    }

    // On bloque le défilement le temps de la séquence, jamais au-delà.
    const previousOverflow = document.body.style.overflow
    document.body.style.overflow = 'hidden'

    const at = (ms: number, fn: () => void) => {
      timers.current.push(window.setTimeout(fn, ms))
    }

    at(260, () => setPhase(1)) // la goutte
    at(620, () => setPhase(2)) // la diffusion, le nom
    at(1750, () => setPhase(3)) // le rôle
    at(2150, () => setPhase(4)) // le sceau
    at(2750, () => {
      animate(wipe, 130, { duration: 0.75, ease: EASE_INK }).then(finish)
    })

    return () => {
      timers.current.forEach(clearTimeout)
      document.body.style.overflow = previousOverflow
    }
  }, [reduced, finish, wipe])

  // Le défilement est rendu dès que le voile est parti.
  useEffect(() => {
    if (done) document.body.style.overflow = ''
  }, [done])

  useEffect(() => {
    const onKey = (e: KeyboardEvent) => {
      if (e.key === 'Escape' && !done) skip()
    }
    window.addEventListener('keydown', onKey)
    return () => window.removeEventListener('keydown', onKey)
  }, [done, skip])

  return (
    <AnimatePresence>
      {!done && (
        <motion.div
          id="boot"
          role="status"
          aria-live="polite"
          aria-label="Ouverture du site"
          className="fixed inset-0 z-[120] overflow-hidden bg-void"
          style={{ WebkitMaskImage: maskImage, maskImage }}
          exit={{ opacity: 0, transition: { duration: 0.2 } }}
        >
          {/* La goutte, puis sa diffusion */}
          <div className="pointer-events-none absolute inset-0 grid place-items-center">
            <AnimatePresence>
              {phase >= 1 && (
                <motion.div
                  key="drop"
                  className="absolute rounded-full"
                  style={{
                    background: 'var(--color-vermillon)',
                    filter: 'url(#ink-drop)',
                  }}
                  initial={{ width: 0, height: 0, opacity: 0 }}
                  animate={
                    phase >= 2
                      ? { width: '78vmax', height: '78vmax', opacity: 0 }
                      : { width: 9, height: 9, opacity: 1 }
                  }
                  transition={{
                    duration: phase >= 2 ? 1.5 : 0.34,
                    ease: EASE_INK,
                  }}
                />
              )}
            </AnimatePresence>
          </div>

          {/* Nom, rôle et sceau : empilés en flux normal plutôt que superposés
              en absolu, pour que rien ne puisse se chevaucher quelle que soit
              la taille de l'écran. */}
          <div className="absolute inset-0 flex flex-col items-center justify-center px-6">
            <div className="min-h-[1.1em]">{phase >= 2 && <BootName />}</div>

            <motion.p
              className="label mt-7 text-center"
              initial={{ opacity: 0, y: 8 }}
              animate={phase >= 3 ? { opacity: 1, y: 0 } : {}}
              transition={{ duration: 0.7, ease: EASE_INK }}
            >
              Développeuse web · {PROFILE.study}
            </motion.p>

            <div className="mt-9 h-[46px]">{phase >= 4 && <Seal size={46} stamp />}</div>
          </div>

          {/* Le relevé, en bas à gauche */}
          <div className="absolute bottom-6 left-5 max-w-[80vw] sm:bottom-8 sm:left-8">
            {READOUT.map((line, i) => (
              <motion.p
                key={line}
                className="whitespace-pre text-[10px] leading-[1.9] text-ash sm:text-[11px]"
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{ delay: 0.14 + i * 0.16, duration: 0.25 }}
              >
                {line}
                {i === READOUT.length - 1 && (
                  <motion.span
                    className="ml-1 inline-block h-[0.9em] w-[0.5em] translate-y-[0.1em] bg-vermillon"
                    animate={{ opacity: [1, 1, 0, 0] }}
                    transition={{ duration: 0.9, repeat: Infinity, times: [0, 0.5, 0.5, 1] }}
                  />
                )}
              </motion.p>
            ))}
          </div>

          <button
            type="button"
            onClick={skip}
            className="absolute bottom-6 right-5 text-[10px] uppercase tracking-[0.24em] text-ash transition-colors hover:text-paper sm:bottom-8 sm:right-8 sm:text-[11px]"
          >
            passer <span className="text-ash-2">[échap]</span>
          </button>
        </motion.div>
      )}
    </AnimatePresence>
  )
}

/** Le nom découvert par un masque qui gonfle, filtre de turbulence à l'appui. */
function BootName() {
  const spread = useMotionValue(0)
  const maskSize = useMotionTemplate`${spread}% ${spread}%`
  const [wet, setWet] = useState(true)

  useEffect(() => {
    const run = animate(spread, 420, { duration: 1.5, ease: EASE_INK })
    run.then(() => setWet(false))
    return () => run.stop()
  }, [spread])

  return (
    <motion.h1
      className={`ink-mask ${wet ? 'ink-wet' : ''} display text-center text-[clamp(2.6rem,13vw,9rem)]`}
      style={{
        WebkitMaskSize: maskSize,
        maskSize,
        ['--ink-x' as string]: '50%',
        ['--ink-y' as string]: '50%',
      }}
    >
      CAMIL<span className="text-vermillon-lit">[L]</span>IA
    </motion.h1>
  )
}
