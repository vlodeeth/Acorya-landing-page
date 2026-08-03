import React, { useEffect, useState } from 'react';

/**
 * Bandeau discret, ancré en bas à gauche : il informe sans bloquer la lecture.
 * Le choix est conservé localement, comme avant.
 */
export default function Cookies() {
  const [visible, setVisible] = useState(false);

  useEffect(() => {
    if (!localStorage.getItem('acorya_cookies')) setVisible(true);
  }, []);

  const repondre = (choix) => {
    localStorage.setItem('acorya_cookies', choix);
    setVisible(false);
  };

  if (!visible) return null;

  return (
    <div
      role="dialog"
      aria-label="Cookies"
      style={{
        position: 'fixed',
        left: 'clamp(1rem, 3vw, 2rem)',
        right: 'clamp(1rem, 3vw, 2rem)',
        bottom: 'clamp(1rem, 3vw, 2rem)',
        zIndex: 70,
        maxWidth: '30rem',
        background: '#3D4A52',
        border: '1px solid rgba(232, 201, 154, 0.25)',
        padding: '1.5rem',
        boxShadow: '0 12px 40px rgba(30, 38, 43, 0.25)',
      }}
    >
      <p style={{ color: 'rgba(245, 240, 232, 0.78)', fontSize: '0.875rem', lineHeight: 1.6 }}>
        Nous mesurons l'audience du site pour l'améliorer.{' '}
        <a href="/mentions-legales#cookies" className="lien-fin" style={{ color: '#E8C99A' }}>
          Ce que nous collectons
        </a>
      </p>

      <div style={{ display: 'flex', gap: '0.75rem', marginTop: '1.25rem' }}>
        <button
          type="button"
          onClick={() => repondre('accepted')}
          className="donnee"
          style={{ background: '#E8C99A', color: '#F5F0E8', padding: '0.7rem 1.25rem', fontWeight: 400 }}
        >
          Accepter
        </button>
        <button
          type="button"
          onClick={() => repondre('refused')}
          className="donnee"
          style={{
            background: 'transparent',
            color: 'rgba(245, 240, 232, 0.75)',
            border: '1px solid rgba(232, 201, 154, 0.3)',
            padding: '0.7rem 1.25rem',
          }}
        >
          Refuser
        </button>
      </div>
    </div>
  );
}
