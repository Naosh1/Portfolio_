/** Clé de session qui retient qu'un visiteur a déjà vu la séquence d'ouverture. */
export const BOOT_KEY = 'encre.boot'

/**
 * Script posé dans le <head>, exécuté avant la première peinture.
 *
 * Sans lui, un visiteur qui navigue puis revient verrait le voile noir
 * réapparaître un instant avant que React ne l'enlève. Ici la classe est déjà
 * posée sur <html> quand le navigateur peint : il ne voit rien du tout.
 */
export const BOOT_SCRIPT = `try{if(sessionStorage.getItem('${BOOT_KEY}')==='1'){document.documentElement.dataset.booted='1'}}catch(e){}`
