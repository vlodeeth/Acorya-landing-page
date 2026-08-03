import React from 'react';
import { Section, EnTete, Reveal } from './Section';
import Coeur from './Coeur';

const equipe = [
  {
    nom: 'Vincent Risso',
    role: 'Directeur général',
    domaines: ['Expérience terrain', 'Pilotage financier', 'Direction opérationnelle'],
    corps:
      "Plus de 10 ans de direction d'entreprise et de pilotage de projets complexes. Vincent prend le lead opérationnel et commercial sur chaque mission. Sa vision : des solutions concrètes, pas des rapports.",
  },
  {
    nom: 'Valentin Laude',
    role: 'Président',
    domaines: ['Structuration', 'Pilotage', 'Développement'],
    corps:
      "Entrepreneur et chef de projet, spécialiste de la structuration et de l'automatisation. Valentin conçoit les outils de pilotage et les systèmes qui permettent aux dirigeants de reprendre le contrôle.",
  },
];

export default function Equipe() {
  return (
    <Section id="equipe">
      <EnTete
        donnee="L'équipe"
        titre="Vous saurez toujours qui est en face."
        chapo="Le conseil se vend par les personnes. Voici celles avec qui vous travaillerez — les mêmes du premier échange à la dernière réunion."
      />

      <div className="grille-marge">
        <div />
        <div className="equipe-grille" style={{ display: 'grid', gap: '3rem' }}>
          {equipe.map((membre, i) => (
            <Reveal key={membre.nom} delai={i * 0.1}>
              <article style={{ borderTop: '1px solid rgba(196, 114, 74, 0.55)', paddingTop: '1.75rem' }}>
                <div style={{ display: 'flex', alignItems: 'center', gap: '0.75rem' }}>
                  <Coeur size={12} exterieur="#C4724A" interieur="#C4724A" />
                  <p className="donnee" style={{ color: '#C4724A' }}>{membre.role}</p>
                </div>

                <h3
                  className="titre-section"
                  style={{ color: '#F5F0E8', fontSize: 'clamp(1.75rem, 1.3rem + 1.4vw, 2.5rem)', marginTop: '1rem' }}
                >
                  {membre.nom}
                </h3>

                <p style={{ color: 'rgba(245, 240, 232, 0.62)', marginTop: '1rem', maxWidth: '32rem' }}>
                  {membre.corps}
                </p>

                <ul
                  style={{
                    listStyle: 'none',
                    display: 'flex',
                    flexWrap: 'wrap',
                    gap: '0.5rem 1.25rem',
                    margin: '1.5rem 0 0',
                    padding: 0,
                  }}
                >
                  {membre.domaines.map((d) => (
                    <li key={d} className="donnee donnee-fine" style={{ color: 'rgba(245, 240, 232, 0.5)' }}>
                      {d}
                    </li>
                  ))}
                </ul>
              </article>
            </Reveal>
          ))}
        </div>
      </div>

      <style>{`
        @media (min-width: 800px) {
          .equipe-grille { grid-template-columns: repeat(2, minmax(0, 1fr)); gap: 4rem; }
        }
      `}</style>
    </Section>
  );
}
