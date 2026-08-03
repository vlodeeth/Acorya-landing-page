import React from 'react';

const liens = [
  { label: 'Mentions légales', href: '/mentions-legales' },
  { label: 'Confidentialité', href: '/mentions-legales#confidentialite' },
  { label: 'Cookies', href: '/mentions-legales#cookies' },
];

export default function PiedDePage() {
  const annee = new Date().getFullYear();

  return (
    <footer style={{ background: '#F5F0E8', paddingTop: '3rem', paddingBottom: '3rem' }}>
      <div className="cadre">
        <div
          className="pied-grille"
          style={{
            display: 'grid',
            gap: '2rem',
            alignItems: 'center',
            borderTop: '1px solid rgba(232, 201, 154, 0.8)',
            paddingTop: '2rem',
          }}
        >
          <img src="/logo-acorya-terre.svg" alt="Acorya" style={{ height: '1.4rem', width: 'auto' }} />

          <nav style={{ display: 'flex', flexWrap: 'wrap', gap: '0.5rem 2rem' }}>
            {liens.map((l) => (
              <a
                key={l.href}
                href={l.href}
                className="lien-fin cartel cartel-fin"
                style={{ color: 'rgba(61, 74, 82, 0.6)' }}
              >
                {l.label}
              </a>
            ))}
          </nav>

          <p className="cartel cartel-fin" style={{ color: 'rgba(61, 74, 82, 0.45)' }}>
            Saint-Martin · © {annee}
          </p>
        </div>
      </div>

      <style>{`
        @media (min-width: 800px) {
          .pied-grille {
            grid-template-columns: auto 1fr auto;
            gap: 3rem;
          }
          .pied-grille nav { justify-content: center; }
          .pied-grille p { text-align: right; }
        }
      `}</style>
    </footer>
  );
}
