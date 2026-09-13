'use client'

import { useEffect, useState } from 'react'

export type ActMark = { id: string; numeral: string; name: string }

/**
 * Repère l'acte en cours de lecture.
 *
 * On vise la bande médiane de l'écran plutôt que le haut : c'est là que se
 * trouve ce que le visiteur regarde vraiment, et ça évite que l'indicateur
 * saute d'un acte à l'autre pendant un défilement rapide.
 */
export function useActiveAct(acts: readonly ActMark[]) {
  const [active, setActive] = useState(acts[0])

  useEffect(() => {
    const sections = acts
      .map((act) => {
        const el = document.getElementById(act.id)
        return el ? ({ act, el } as const) : null
      })
      .filter((entry): entry is { act: ActMark; el: HTMLElement } => entry !== null)

    if (sections.length === 0) return

    const observer = new IntersectionObserver(
      (entries) => {
        const visible = entries
          .filter((e) => e.isIntersecting)
          .sort((a, b) => b.intersectionRatio - a.intersectionRatio)[0]

        if (!visible) return
        const found = sections.find((s) => s.el === visible.target)
        if (found) setActive(found.act)
      },
      { rootMargin: '-45% 0px -45% 0px', threshold: [0, 0.01, 0.5, 1] },
    )

    sections.forEach(({ el }) => observer.observe(el))
    return () => observer.disconnect()
  }, [acts])

  return active
}
