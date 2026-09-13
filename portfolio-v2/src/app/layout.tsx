import type { Metadata, Viewport } from 'next'
import localFont from 'next/font/local'

import './globals.css'

import { BootSequence } from '@/components/boot/BootSequence'
import { InkCursor } from '@/components/cursor/InkCursor'
import { HudFrame } from '@/components/hud/HudFrame'
import { Grain } from '@/components/ink/Grain'
import { InkBlot } from '@/components/ink/InkBlot'
import { InkFilters } from '@/components/ink/InkFilters'
import { MotionProvider } from '@/components/MotionProvider'
import { BOOT_SCRIPT } from '@/lib/boot'
import { PROFILE } from '@/data/profile'

/**
 * Polices auto-hébergées : aucune requête vers Google, rien à charger depuis un
 * tiers, et le rendu ne dépend pas d'un service extérieur. Les fichiers vivent
 * dans src/fonts et sont versionnés avec le projet.
 */
const display = localFont({
  src: [
    { path: '../fonts/instrument-serif-400.woff2', weight: '400', style: 'normal' },
    { path: '../fonts/instrument-serif-400-ext.woff2', weight: '400', style: 'normal' },
  ],
  variable: '--font-instrument',
  display: 'swap',
  fallback: ['Times New Roman', 'serif'],
})

const mono = localFont({
  src: [
    { path: '../fonts/jetbrains-mono-var.woff2', weight: '100 800', style: 'normal' },
    { path: '../fonts/jetbrains-mono-var-ext.woff2', weight: '100 800', style: 'normal' },
  ],
  variable: '--font-jetbrains',
  display: 'swap',
  fallback: ['ui-monospace', 'SFMono-Regular', 'monospace'],
})

export const metadata: Metadata = {
  title: `${PROFILE.first} ${PROFILE.last} · ${PROFILE.role}`,
  description:
    "Développeuse web full-stack, étudiante en BUT Informatique. Dix sites livrés en production, une plateforme SaaS conçue de bout en bout. En recherche d'alternance pour septembre 2026.",
  authors: [{ name: `${PROFILE.first} ${PROFILE.last}` }],
  openGraph: {
    title: `${PROFILE.first} ${PROFILE.last} · ${PROFILE.role}`,
    description:
      "Dix sites livrés en production, une plateforme SaaS conçue de bout en bout. En recherche d'alternance pour septembre 2026.",
    locale: 'fr_FR',
    type: 'website',
  },
}

export const viewport: Viewport = {
  themeColor: '#0a0a0b',
  colorScheme: 'dark',
}

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="fr" className={`${display.variable} ${mono.variable}`}>
      <head>
        {/* Posé avant la première peinture : au retour dans la même session,
            le voile d'ouverture n'a jamais l'occasion de clignoter. */}
        <script dangerouslySetInnerHTML={{ __html: BOOT_SCRIPT }} />

        {/* Sans JavaScript, les éléments animés resteraient à opacité zéro et la
            page paraîtrait vide. On force alors tout à l'état final : le site
            perd ses animations mais reste entièrement lisible. */}
        <noscript>
          <style>{`
            #boot { display: none !important; }
            main *, main *::before, main *::after {
              opacity: 1 !important;
              transform: none !important;
              -webkit-mask-image: none !important;
              mask-image: none !important;
              filter: none !important;
            }
          `}</style>
        </noscript>
      </head>
      <body>
        <a href="#seuil" className="skip-link">
          Aller au contenu
        </a>

        <MotionProvider>
          <InkFilters />
          <InkBlot />

          <div className="relative z-10">{children}</div>

          <Grain />
          <HudFrame />
          <InkCursor />
          <BootSequence />
        </MotionProvider>
      </body>
    </html>
  )
}
