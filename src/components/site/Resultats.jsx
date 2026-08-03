import React from 'react';
import { Section, EnTete, Reveal } from './Section';

const resultats = [
  {
    titre: 'Retrouver de la visibilité',
    corps:
      "Comprendre la rentabilité réelle de l'entreprise, anticiper la trésorerie et prendre des décisions éclairées.",
  },
  {
    titre: 'Structurer la croissance',
    corps:
      "Clarifier l'organisation, fluidifier les opérations et préparer le développement de l'entreprise.",
  },
  {
    titre: 'Gagner du temps',
    corps:
      "Réduire les tâches à faible valeur ajoutée grâce à l'automatisation et à des processus adaptés.",
  },
];

export default function Resultats() {
  return (
    <Section id="resultats">
      <EnTete
        donnee="Ce que ça change"
        titre="Des résultats concrets, pas des livrables."
        chapo="Ce que viennent chercher les dirigeants qui nous appellent."
      />

      <div className="grille-marge">
        <div />
        <div className="resultats-grille" style={{ display: 'grid', gap: '2.5rem' }}>
          {resultats.map((r, i) => (
            <Reveal key={r.titre} delai={i * 0.09}>
              <div
                style={{
                  borderTop: '1px solid rgba(196, 114, 74, 0.55)',
                  paddingTop: '1.5rem',
                  height: '100%',
                }}
              >
                <h3
                  className="titre-section"
                  style={{ color: '#F5F0E8', fontSize: 'clamp(1.375rem, 1.1rem + 0.9vw, 1.75rem)' }}
                >
                  {r.titre}
                </h3>
                <p style={{ color: 'rgba(245, 240, 232, 0.62)', marginTop: '0.9rem' }}>{r.corps}</p>
              </div>
            </Reveal>
          ))}
        </div>
      </div>

      <style>{`
        @media (min-width: 800px) {
          .resultats-grille { grid-template-columns: repeat(3, minmax(0, 1fr)); gap: 3rem; }
        }
      `}</style>
    </Section>
  );
}
