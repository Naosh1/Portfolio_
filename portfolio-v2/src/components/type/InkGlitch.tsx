'use client'

import { useEffect, useState, type ReactNode } from 'react'
import { useReducedMotion } from 'framer-motion'

type Props = {
  children: ReactNode
  className?: string
}

/**
 * Le décrochage.
 *
 * Toutes les huit à seize secondes, une copie vermillon du texte se décale de
 * deux pixels pendant 90 ms, puis tout se remet en place. C'est trop court pour
 * être regardé et juste assez long pour être vu : le site a l'air vivant, pas
 * cassé.
 *
 * Rien de tout ça ne se déclenche si le visiteur limite les animations.
 */
export function InkGlitch({ children, className = '' }: Props) {
  const reduced = useReducedMotion()
  const [off, setOff] = useState(false)

  useEffect(() => {
    if (reduced) return
    let timeout: number
    let release: number

    const schedule = () => {
      timeout = window.setTimeout(() => {
        setOff(true)
        release = window.setTimeout(() => {
          setOff(false)
          schedule()
        }, 90)
      }, 8000 + Math.random() * 8000)
    }

    schedule()
    return () => {
      window.clearTimeout(timeout)
      window.clearTimeout(release)
    }
  }, [reduced])

  return (
    <span className={`relative inline-block ${className}`}>
      <span className="relative z-10">{children}</span>
      <span
        aria-hidden="true"
        className="absolute inset-0 text-vermillon-lit transition-opacity duration-100"
        style={{
          opacity: off ? 0.85 : 0,
          transform: off ? 'translate(-2px, 1px)' : 'none',
          clipPath: off ? 'inset(18% 0 42% 0)' : undefined,
        }}
      >
        {children}
      </span>
    </span>
  )
}
