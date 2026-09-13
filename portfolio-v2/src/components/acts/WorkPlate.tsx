'use client'

import type { Work } from '@/data/works'

/**
 * La plaque d'une pièce.
 *
 * Aucune capture d'écran, aucune image plaquée : chaque projet a sa propre
 * tache, dessinée à partir de sa graine (teinte, inclinaison, position de la
 * source). Deux projets ne peuvent pas produire la même plaque, et le site ne
 * dépend d'aucun visuel externe.
 *
 * Le point clé : les disques sont à bord FRANC, pas en dégradé doux. Un dégradé
 * flou reste flou une fois déformé — on obtient une lueur. C'est la turbulence
 * appliquée à un bord net qui produit une vraie frange d'encre.
 */
export function WorkPlate({ work, className = '' }: { work: Work; className?: string }) {
  const { hue, tilt, x, y } = work.plate

  return (
    <div
      className={`relative overflow-hidden border border-ash-2/50 bg-void-2 ${className}`}
      aria-hidden="true"
    >
      {/* Halo diffus : la nappe d'eau sur laquelle l'encre va se poser */}
      <div
        className="absolute inset-0"
        style={{
          background: `radial-gradient(circle at ${x}% ${y}%, hsl(${hue} 58% 20% / 0.55) 0%, transparent 64%)`,
        }}
      />

      {/* Les disques d'encre, déchirés par la turbulence */}
      <div
        className="absolute inset-0"
        style={{
          filter: 'url(#ink-plate)',
          transform: `rotate(${tilt}deg) scale(1.35)`,
        }}
      >
        <div
          className="absolute inset-0"
          style={{
            background: `radial-gradient(circle at ${x}% ${y}%, hsl(${hue} 66% 25% / 0.9) 0%, hsl(${hue} 66% 25% / 0.9) 30%, transparent 31%)`,
          }}
        />
        <div
          className="absolute inset-0"
          style={{
            background: `radial-gradient(circle at ${x + 16}% ${y + 12}%, hsl(${hue + 10} 74% 33% / 0.6) 0%, hsl(${hue + 10} 74% 33% / 0.6) 15%, transparent 16%)`,
          }}
        />
        <div
          className="absolute inset-0"
          style={{
            background: `radial-gradient(circle at ${100 - x}% ${100 - y}%, hsl(${hue - 6} 45% 11% / 0.75) 0%, hsl(${hue - 6} 45% 11% / 0.75) 22%, transparent 23%)`,
          }}
        />

        {/* Réserve claire : l'endroit où le papier n'a pas bu */}
        <div
          className="absolute inset-0"
          style={{
            background: `radial-gradient(circle at ${x + 6}% ${y - 16}%, rgba(232,228,220,0.09) 0%, rgba(232,228,220,0.09) 9%, transparent 10%)`,
          }}
        />
      </div>

      {/* Graduations d'atelier, à peine perceptibles */}
      <div
        className="absolute inset-0 opacity-[0.045]"
        style={{
          backgroundImage:
            'linear-gradient(to right, var(--color-paper) 1px, transparent 1px), linear-gradient(to bottom, var(--color-paper) 1px, transparent 1px)',
          backgroundSize: '52px 52px',
        }}
      />

      {/* Vignetage : la plaque doit rester un fond, jamais un sujet */}
      <div
        className="absolute inset-0"
        style={{
          background:
            'radial-gradient(ellipse at 50% 45%, rgba(10,10,11,0.18) 20%, rgba(10,10,11,0.86) 100%)',
        }}
      />

      {/* Voile final : sans lui la tache devient le sujet de la page */}
      <div className="absolute inset-0 bg-void/30" />

      {/* Numéro de planche, gravé en creux */}
      <span
        className="display absolute bottom-3 right-5 select-none text-[3.2rem] leading-none text-transparent"
        style={{ WebkitTextStroke: '1px rgba(232,228,220,0.30)' }}
      >
        {work.ref}
      </span>
    </div>
  )
}
