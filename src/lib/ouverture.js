/**
 * Décide une seule fois par session si le rideau d'ouverture doit jouer.
 * Le rideau et le hero doivent tomber d'accord quel que soit leur ordre de
 * montage : c'est le premier appel qui tranche, les suivants lisent la
 * même réponse.
 */
let decision = null;

export const DUREE_RIDEAU = 1.75;

export function rideauAJouer() {
  if (decision !== null) return decision;

  try {
    decision = !sessionStorage.getItem('acorya_rideau_vu');
    if (decision) sessionStorage.setItem('acorya_rideau_vu', '1');
  } catch {
    /* Navigation privée ou stockage refusé : on se passe du rideau. */
    decision = false;
  }
  return decision;
}
