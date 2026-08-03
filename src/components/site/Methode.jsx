import React from 'react';
import { Section, EnTete, Reveal } from './Section';

/* Ici la numérotation dit quelque chose de vrai : c'est une séquence.
   Rien ne commence avant que l'étape précédente soit signée. */
const etapes = [
  {
    numero: '01',
    titre: 'Diagnostic',
    corps:
      "Compréhension du besoin, vérification de l'adéquation et de la faisabilité de la mission. Transparence totale.",
  },
  {
    numero: '02',
    titre: 'Proposition écrite',
    corps: 'Périmètre précis, livrables définis, planning et conditions signés avant tout démarrage.',
  },
  {
    numero: '03',
    titre: 'Lancement structuré',
    corps: "Cadrage de la mission, recueil des informations et accès aux outils nécessaires.",
  },
  {
    numero: '04',
    titre: 'Réalisation & suivi',
    corps: 'Points réguliers avec compte-rendu écrit, alertes en temps réel, ajustements en continu.',
  },
];

export default function Methode() {
  return (
    <Section id="methode" sombre>
      <EnTete
        sombre
        cartel="La méthode"
        titre="Rien ne démarre avant d'être écrit."
        chapo="Quatre étapes, dans cet ordre, sans exception. C'est la même exigence que sur les projets des grands groupes, appliquée à la réalité d'une PME."
      />

      <div className="grille-marge">
        <div />
        <ol style={{ listStyle: 'none', margin: 0, padding: 0 }}>
          {etapes.map((e, i) => (
            <Reveal key={e.numero} delai={i * 0.07}>
              <li
                className="etape-ligne ligne-survol"
                style={{
                  display: 'grid',
                  gap: '0.5rem 3rem',
                  paddingTop: '2.25rem',
                  paddingBottom: '2.25rem',
                  borderTop: '1px solid rgba(232, 201, 154, 0.18)',
                  ...(i === etapes.length - 1
                    ? { borderBottom: '1px solid rgba(232, 201, 154, 0.18)' }
                    : {}),
                }}
              >
                <span
                  style={{
                    fontFamily: 'var(--font-heading)',
                    fontWeight: 300,
                    fontSize: 'clamp(2rem, 1.5rem + 1.6vw, 3rem)',
                    lineHeight: 1,
                    color: 'rgba(196, 114, 74, 0.9)',
                  }}
                >
                  {e.numero}
                </span>

                <div>
                  <h3
                    className="titre-section"
                    style={{ color: '#F5F0E8', fontSize: 'clamp(1.375rem, 1.1rem + 0.9vw, 1.875rem)' }}
                  >
                    {e.titre}
                  </h3>
                  <p style={{ color: 'rgba(245, 240, 232, 0.62)', maxWidth: '40rem', marginTop: '0.75rem' }}>
                    {e.corps}
                  </p>
                </div>
              </li>
            </Reveal>
          ))}
        </ol>
      </div>

      <style>{`
        @media (min-width: 860px) {
          .etape-ligne { grid-template-columns: 6rem minmax(0, 1fr); align-items: start; }
        }
      `}</style>
    </Section>
  );
}
