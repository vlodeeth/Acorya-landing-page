import React from 'react';
import { Section, Reveal } from './Section';

const secteurs = ['BTP', 'Hôtellerie', 'Commerce', 'Services', 'Entreprises en croissance'];

export default function Terrain() {
  return (
    <Section id="secteurs" style={{ paddingTop: '0', paddingBottom: 'var(--marge-section)' }}>
      <div className="grille-marge">
        <Reveal>
          <p className="cartel cartel-fin" style={{ color: '#C4724A', paddingTop: '0.6rem' }}>
            Le terrain
          </p>
        </Reveal>

        <div>
          <Reveal delai={0.08}>
            <p className="accroche" style={{ color: '#3D4A52', maxWidth: '30ch' }}>
              Basés à Saint-Martin, au contact direct des dirigeants que nous accompagnons.
            </p>
          </Reveal>

          <Reveal delai={0.16}>
            <ul
              style={{
                listStyle: 'none',
                display: 'flex',
                flexWrap: 'wrap',
                gap: '0.75rem 2rem',
                margin: '2.5rem 0 0',
                padding: '1.5rem 0 0',
                borderTop: '1px solid rgba(232, 201, 154, 0.7)',
              }}
            >
              {secteurs.map((s) => (
                <li key={s} className="cartel" style={{ color: 'rgba(61, 74, 82, 0.6)' }}>
                  {s}
                </li>
              ))}
            </ul>
          </Reveal>
        </div>
      </div>
    </Section>
  );
}
