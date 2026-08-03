import React from 'react';
import { Section, EnTete, Reveal } from './Section';

/* Trois réalités, pas trois étapes : aucune numérotation — l'ordre ne porte rien. */
const constats = [
  {
    titre: 'Un dirigeant seul face à la complexité',
    corps:
      "Dans une PME, le dirigeant gère simultanément les finances, les opérations, les fournisseurs, les équipes et les imprévus. Il remplace souvent à lui seul plusieurs fonctions stratégiques.",
  },
  {
    titre: 'Les outils des grands groupes restent inaccessibles',
    corps:
      "Pilotage, reporting, structuration, automatisation : les méthodes les plus efficaces existent mais sont rarement adaptées aux PME.",
  },
  {
    titre: 'Trop de consultants, pas assez de partenaires',
    corps:
      "De nombreux cabinets livrent des recommandations puis disparaissent. Acorya reste impliqué, suit les actions engagées et accompagne leur mise en œuvre.",
  },
];

export default function Constat() {
  return (
    <Section id="constat">
      <EnTete
        cartel="Le constat"
        titre="C'est une question de structure, pas de compétence."
        chapo="Trois réalités que nous retrouvons chez la plupart des dirigeants que nous rencontrons."
      />

      <div className="grille-marge">
        <div />
        <div>
          {constats.map((c, i) => (
            <Reveal key={c.titre} delai={i * 0.08}>
              <article
                style={{
                  display: 'grid',
                  gap: '0.75rem 3rem',
                  paddingTop: '2.25rem',
                  paddingBottom: '2.25rem',
                  borderTop: '1px solid rgba(232, 201, 154, 0.7)',
                  ...(i === constats.length - 1 ? { borderBottom: '1px solid rgba(232, 201, 154, 0.7)' } : {}),
                }}
                className="constat-ligne"
              >
                <h3
                  className="accroche"
                  style={{ color: '#3D4A52', fontStyle: 'normal', fontSize: 'clamp(1.375rem, 1.1rem + 1vw, 1.875rem)' }}
                >
                  {c.titre}
                </h3>
                <p style={{ color: 'rgba(61, 74, 82, 0.72)', maxWidth: '38rem' }}>{c.corps}</p>
              </article>
            </Reveal>
          ))}
        </div>
      </div>

      <style>{`
        @media (min-width: 860px) {
          .constat-ligne { grid-template-columns: minmax(0, 0.85fr) minmax(0, 1fr); align-items: start; }
        }
      `}</style>
    </Section>
  );
}
