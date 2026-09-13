import { ActSeuil } from '@/components/acts/ActSeuil'
import { ActReleve } from '@/components/acts/ActReleve'
import { ActPieces } from '@/components/acts/ActPieces'
import { ActMetier } from '@/components/acts/ActMetier'
import { ActSceau } from '@/components/acts/ActSceau'

/**
 * La page se lit d'une traite, en cinq actes.
 *
 * Une seule gouttière, volontairement large sur les côtés : le cadre du HUD
 * occupe les marges, et le contenu ne doit jamais passer dessous.
 */
export default function Page() {
  return (
    <main className="mx-auto w-full max-w-[1560px] px-6 sm:px-12 lg:px-28">
      <ActSeuil />
      <ActReleve />
      <ActPieces />
      <ActMetier />
      <ActSceau />
    </main>
  )
}
