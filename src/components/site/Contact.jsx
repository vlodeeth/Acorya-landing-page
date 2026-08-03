import React from 'react';
import { Section, Reveal } from './Section';
import Coeur from './Coeur';

const EMAIL = 'contact@acorya.fr';

export default function Contact() {
  return (
    <Section id="contact" sombre>
      <div className="grille-marge">
        <Reveal>
          <p className="donnee donnee-fine" style={{ color: 'rgba(232, 201, 154, 0.75)', paddingTop: '0.6rem' }}>
            L'échange
          </p>
        </Reveal>

        <div>
          <Reveal delai={0.08}>
            <h2 className="titre-section" style={{ color: '#F5F0E8', maxWidth: '16ch' }}>
              Parlons de votre entreprise.
            </h2>
          </Reveal>

          <Reveal delai={0.16}>
            <p className="chapo" style={{ color: 'rgba(245, 240, 232, 0.7)', maxWidth: '38rem', marginTop: '1.5rem' }}>
              Un premier échange de 30 minutes pour comprendre votre situation et identifier vos priorités.
              Sans engagement, et sans document à préparer.
            </p>
          </Reveal>

          <Reveal delai={0.24}>
            <div style={{ marginTop: '3rem', borderTop: '1px solid rgba(232, 201, 154, 0.22)', paddingTop: '2rem' }}>
              <p className="donnee donnee-fine" style={{ color: 'rgba(245, 240, 232, 0.45)' }}>
                Écrivez-nous
              </p>
              <a
                href={`mailto:${EMAIL}?subject=${encodeURIComponent('Demande d’échange — Acorya')}`}
                className="lien-fin"
                style={{
                  display: 'inline-block',
                  marginTop: '0.85rem',
                  fontFamily: 'var(--font-heading)',
                  fontWeight: 300,
                  fontSize: 'clamp(1.75rem, 1.2rem + 2.2vw, 3rem)',
                  lineHeight: 1.1,
                  color: '#E8C99A',
                  letterSpacing: '-0.01em',
                }}
              >
                {EMAIL}
              </a>
            </div>
          </Reveal>

          <Reveal delai={0.3}>
            <p
              style={{
                display: 'flex',
                alignItems: 'center',
                gap: '0.75rem',
                marginTop: '2.5rem',
                color: 'rgba(245, 240, 232, 0.5)',
                fontSize: '0.875rem',
              }}
            >
              <Coeur size={12} />
              Vous parlerez directement à Vincent ou Valentin — pas à un service commercial.
            </p>
          </Reveal>
        </div>
      </div>
    </Section>
  );
}
