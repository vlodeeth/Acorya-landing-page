import React from 'react';
import { Section, Reveal } from './Section';

const secteurs = ['BTP', 'Hôtellerie', 'Commerce', 'Services', 'Entreprises en croissance'];

export default function Terrain() {
  return (
    <Section id="secteurs" style={{ paddingTop: '0', paddingBottom: 'var(--marge-section)' }}>
      <div className="grille-marge">
        <Reveal>
          <p className="donnee donnee-fine" style={{ color: '#C4724A', paddingTop: '0.6rem' }}>
            Le terrain
          </p>
        </Reveal>

        <div>
          <Reveal delai={0.08}>
            <p className="voix" style={{ color: '#F5F0E8', maxWidth: '30ch' }}>
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
                borderTop: '1px solid rgba(232, 201, 154, 0.16)',
              }}
            >
              {secteurs.map((s) => (
                <li key={s} className="donnee" style={{ color: 'rgba(245, 240, 232, 0.55)' }}>
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
