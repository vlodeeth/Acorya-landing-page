import React, { useEffect, useState } from 'react';
import { Menu, X } from 'lucide-react';

const liens = [
  { label: 'Constat', href: '#constat' },
  { label: 'Expertises', href: '#expertises' },
  { label: 'Méthode', href: '#methode' },
  { label: 'Équipe', href: '#equipe' },
];

export default function SiteNav() {
  const [ancree, setAncree] = useState(false);
  const [menuOuvert, setMenuOuvert] = useState(false);

  /* La barre se lit sur la position de défilement, pas sur un observateur :
     le résultat reste juste après un redimensionnement ou un retour d'onglet. */
  useEffect(() => {
    const mesurer = () => setAncree(window.scrollY > 40);
    mesurer();
    window.addEventListener('scroll', mesurer, { passive: true });
    return () => window.removeEventListener('scroll', mesurer);
  }, []);

  useEffect(() => {
    document.body.style.overflow = menuOuvert ? 'hidden' : '';
    return () => { document.body.style.overflow = ''; };
  }, [menuOuvert]);

  return (
    <>
      <header
        className="fixed top-0 left-0 right-0 z-50"
        style={{
          background: ancree ? 'hsl(var(--vide) / 0.82)' : 'transparent',
          backdropFilter: ancree ? 'blur(14px)' : 'none',
          WebkitBackdropFilter: ancree ? 'blur(14px)' : 'none',
          borderBottom: `1px solid ${ancree ? 'rgba(232, 201, 154, 0.14)' : 'transparent'}`,
          transition: 'background 420ms ease, border-color 420ms ease',
        }}
      >
        <div className="cadre flex items-center justify-between" style={{ height: '4.5rem' }}>
          <a href="#hero" aria-label="Acorya — retour en haut" style={{ display: 'block' }}>
            <img src="/logo-acorya-creme.svg" alt="Acorya" style={{ height: '1.55rem', width: 'auto' }} />
          </a>

          <nav className="hidden md:flex items-center" style={{ gap: '2.75rem' }}>
            {liens.map((lien) => (
              <a
                key={lien.href}
                href={lien.href}
                className="lien-fin donnee donnee-fine"
                style={{ color: 'rgba(245, 240, 232, 0.72)' }}
              >
                {lien.label}
              </a>
            ))}
            <a href="#contact" className="bouton-terre" style={{ padding: '0.7rem 1.35rem' }}>
              Réserver un échange
            </a>
          </nav>

          <button
            type="button"
            onClick={() => setMenuOuvert(true)}
            className="md:hidden"
            style={{ color: '#F5F0E8', padding: '0.5rem', margin: '-0.5rem' }}
            aria-label="Ouvrir le menu"
          >
            <Menu size={22} strokeWidth={1.25} />
          </button>
        </div>
      </header>

      {menuOuvert && (
        <div
          className="fixed inset-0 z-[60] md:hidden flex flex-col grille-technique"
          style={{ background: 'hsl(var(--vide))' }}
        >
          <div className="cadre flex items-center justify-between" style={{ height: '4.5rem' }}>
            <img src="/logo-acorya-creme.svg" alt="Acorya" style={{ height: '1.55rem', width: 'auto' }} />
            <button
              type="button"
              onClick={() => setMenuOuvert(false)}
              style={{ color: '#F5F0E8', padding: '0.5rem', margin: '-0.5rem' }}
              aria-label="Fermer le menu"
            >
              <X size={22} strokeWidth={1.25} />
            </button>
          </div>

          <nav className="cadre flex flex-col justify-center flex-1" style={{ gap: '0', paddingBottom: '6rem' }}>
            {liens.map((lien, i) => (
              <a
                key={lien.href}
                href={lien.href}
                onClick={() => setMenuOuvert(false)}
                style={{
                  display: 'flex',
                  alignItems: 'baseline',
                  gap: '1.25rem',
                  color: '#F5F0E8',
                  padding: '1.1rem 0',
                  borderBottom: '1px solid rgba(232, 201, 154, 0.14)',
                }}
              >
                <span className="donnee donnee-fine" style={{ color: 'rgba(196, 114, 74, 0.9)' }}>
                  {String(i + 1).padStart(2, '0')}
                </span>
                <span className="titre-section" style={{ fontSize: 'clamp(1.75rem, 8vw, 2.75rem)' }}>
                  {lien.label}
                </span>
              </a>
            ))}
            <a
              href="#contact"
              onClick={() => setMenuOuvert(false)}
              className="bouton-terre"
              style={{ marginTop: '2.5rem', justifyContent: 'center' }}
            >
              Réserver un échange
            </a>
          </nav>
        </div>
      )}
    </>
  );
}
