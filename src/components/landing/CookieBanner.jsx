import React, { useState, useEffect } from 'react';

export default function CookieBanner() {
  const [visible, setVisible] = useState(false);

  useEffect(() => {
    const choice = localStorage.getItem('acorya_cookies');
    if (!choice) setVisible(true);
  }, []);

  const accept = () => {
    localStorage.setItem('acorya_cookies', 'accepted');
    setVisible(false);
  };

  const refuse = () => {
    localStorage.setItem('acorya_cookies', 'refused');
    setVisible(false);
  };

  if (!visible) return null;

  return (
    <div
      className="fixed bottom-0 left-0 right-0 z-50 px-6 py-5"
      style={{ background: '#F5F0E8', borderTop: '1px solid rgba(61,74,82,0.12)' }}
    >
      <div className="max-w-6xl mx-auto flex flex-col sm:flex-row items-center justify-between gap-4">
        <p
          className="text-[11px] font-body tracking-[0.12em] text-center sm:text-left"
          style={{ color: '#3D4A52' }}
        >
          Nous utilisons des cookies pour améliorer votre expérience.{' '}
          <a
            href="/mentions-legales#cookies"
            className="underline hover:text-[#C4724A] transition-colors"
            style={{ color: '#3D4A52' }}
          >
            En savoir plus
          </a>
        </p>
        <div className="flex items-center gap-3">
          <button
            onClick={refuse}
            className="text-[10px] font-body font-semibold tracking-[0.18em] uppercase px-5 py-2 border transition-colors hover:border-[#C4724A] hover:text-[#C4724A]"
            style={{ color: '#3D4A52', borderColor: 'rgba(61,74,82,0.3)' }}
          >
            Refuser
          </button>
          <button
            onClick={accept}
            className="text-[10px] font-body font-semibold tracking-[0.18em] uppercase px-5 py-2 transition-colors hover:opacity-80"
            style={{ background: '#3D4A52', color: '#F5F0E8' }}
          >
            Accepter
          </button>
        </div>
      </div>
    </div>
  );
}
