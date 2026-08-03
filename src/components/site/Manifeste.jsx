import React from 'react';
import TexteEclaire from './TexteEclaire';
import { Reveal } from './Section';

/**
 * La phrase centrale de la marque, telle qu'elle est écrite dans la charte.
 * Un seul bloc, pleine page, qui s'éclaire mot à mot au défilement : c'est
 * le seul endroit du site où le texte est le sujet et non le support.
 */
export default function Manifeste() {
  return (
    <section
      style={{
        background: '#F5F0E8',
        paddingTop: 'clamp(7rem, 5rem + 9vw, 13rem)',
        paddingBottom: 'clamp(7rem, 5rem + 9vw, 13rem)',
      }}
    >
      <div className="cadre">
        <div className="grille-marge">
          <Reveal>
            <p className="cartel cartel-fin" style={{ color: '#C4724A', paddingTop: '0.7rem' }}>
              Ce que nous cherchons
            </p>
          </Reveal>

          <TexteEclaire
            texte="Donner à chaque dirigeant de TPE et PME ce que seuls les patrons de grands groupes ont eu le droit d'avoir."
            className="titre-section"
            couleur="#3D4A52"
            couleurFaible="rgba(61, 74, 82, 0.16)"
            style={{ maxWidth: '18ch' }}
          />
        </div>
      </div>
    </section>
  );
}
