'use client'

import { useEffect, useState } from 'react'

/**
 * Vrai une fois que React a pris la main sur le HTML rendu par le serveur.
 *
 * À quoi ça sert : `useReducedMotion` interroge `matchMedia`, qui n'existe pas
 * côté serveur. Un composant qui change sa STRUCTURE selon cette valeur rend
 * donc un arbre sur le serveur et un autre à la première passe du client, et
 * React signale une désynchronisation d'hydratation.
 *
 * En passant par ce drapeau, la première passe client est identique au serveur,
 * et le basculement vers la version sans animation n'a lieu qu'ensuite.
 */
export function useMounted() {
  const [mounted, setMounted] = useState(false)
  useEffect(() => setMounted(true), [])
  return mounted
}
