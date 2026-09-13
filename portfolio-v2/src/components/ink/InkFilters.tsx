/**
 * Les filtres qui donnent sa matière au site.
 *
 * `ink-bleed` déchire le bord d'un masque pendant qu'il gonfle : c'est ce qui
 * transforme un cercle propre en tache d'encre. On ne l'applique jamais en
 * permanence — seulement le temps de la diffusion, puis on le retire pour que
 * le texte redevienne parfaitement net.
 *
 * `ink-plate` sert aux plaques des pièces : même turbulence, amplitude plus
 * large, appliquée à des aplats et non à du texte.
 */
export function InkFilters() {
  return (
    <svg
      aria-hidden="true"
      focusable="false"
      width="0"
      height="0"
      style={{ position: 'absolute', pointerEvents: 'none' }}
    >
      <defs>
        <filter id="ink-bleed" x="-25%" y="-25%" width="150%" height="150%">
          <feTurbulence
            type="fractalNoise"
            baseFrequency="0.014 0.022"
            numOctaves={3}
            seed={7}
            result="noise"
          />
          <feDisplacementMap
            in="SourceGraphic"
            in2="noise"
            scale={16}
            xChannelSelector="R"
            yChannelSelector="G"
          />
        </filter>

        <filter id="ink-plate" x="-30%" y="-30%" width="160%" height="160%">
          <feTurbulence
            type="fractalNoise"
            baseFrequency="0.008 0.011"
            numOctaves={4}
            seed={23}
            result="noise"
          />
          <feDisplacementMap
            in="SourceGraphic"
            in2="noise"
            scale={42}
            xChannelSelector="R"
            yChannelSelector="G"
          />
          <feGaussianBlur stdDeviation="0.4" />
        </filter>

        <filter id="ink-drop" x="-60%" y="-60%" width="220%" height="220%">
          <feTurbulence
            type="fractalNoise"
            baseFrequency="0.02"
            numOctaves={3}
            seed={41}
            result="noise"
          />
          <feDisplacementMap
            in="SourceGraphic"
            in2="noise"
            scale={26}
            xChannelSelector="R"
            yChannelSelector="G"
          />
        </filter>
      </defs>
    </svg>
  )
}
