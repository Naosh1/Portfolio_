import { useEffect } from 'react'
import { useLocation } from 'react-router-dom'

/**
 * Remet la page en haut à chaque changement de route.
 * Le navigateur ne le fait pas tout seul dans une SPA.
 */
export default function ScrollToTop() {
  const { pathname } = useLocation()

  useEffect(() => {
    window.scrollTo({ top: 0, behavior: 'instant' })
  }, [pathname])

  return null
}
