'use client'

import { useEffect, useState } from 'react'
import { PROFILE } from '@/data/profile'

/**
 * L'heure locale, en direct.
 *
 * Rendue vide côté serveur puis remplie au montage : afficher une heure
 * calculée sur le serveur provoquerait un écart d'hydratation, et surtout ce
 * serait l'heure du serveur, pas celle de Camillia.
 */
export function LiveClock() {
  const [time, setTime] = useState<string | null>(null)

  useEffect(() => {
    const tick = () => {
      setTime(
        new Intl.DateTimeFormat('fr-FR', {
          hour: '2-digit',
          minute: '2-digit',
          second: '2-digit',
          timeZone: PROFILE.timezone,
        }).format(new Date()),
      )
    }

    tick()
    const id = window.setInterval(tick, 1000)
    return () => window.clearInterval(id)
  }, [])

  return (
    <span className="tabular-nums" suppressHydrationWarning>
      {time ?? '--:--:--'}
    </span>
  )
}
