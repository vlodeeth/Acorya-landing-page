import React, { useEffect, useState } from 'react';
import { Menu, X } from 'lucide-react';

const liens = [
  { label: 'Constat', href: '#constat' },
  { label: 'Expertises', href: '#expertises' },
  { label: 'Méthode', href: '#methode' },
  { label: 'Équipe', href: '#equipe' },
];

export default function SiteNav() {
  const [surLeHero, setSurLeHero] = useState(true);
  const [menuOuvert, setMenuOuvert] = useState(false);

  /* La barre se lit sur la position de défilement, pas sur un observateur :
     si l'observateur se désynchronise (resize, onglet restauré), on se
     retrouverait avec un logo crème sur une barre crème — donc illisible. */
  useEffect(() => {
    const mesurer = () => {
      const hero = document.getElementById('hero');
      const limite = hero ? hero.offsetHeight - 72 : 0;
      setSurLeHero(Boolean(hero) && window.scrollY < limite);
    };
    mesurer();
    window.addEventListener('scroll', mesurer, { passive: true });
    window.addEventListener('resize', mesurer);
    return () => {
      window.removeEventListener('scroll', mesurer);
      window.removeEventListener('resize', mesurer);
    };
  }, []);

  // Verrouille le défilement quand le menu plein écran est ouvert
  useEffect(() => {
    document.body.style.overflow = menuOuvert ? 'hidden' : '';
    return () => { document.body.style.overflow = ''; };
  }, [menuOuvert]);

  const encre = surLeHero ? '#F5F0E8' : '#3D4A52';

  return (
    <>
      <header
        className="fixed top-0 left-0 right-0 z-50"
        style={{
          background: surLeHero ? 'transparent' : 'rgba(245, 240, 232, 0.94)',
          backdropFilter: surLeHero ? 'none' : 'blur(12px)',
          WebkitBackdropFilter: surLeHero ? 'none' : 'blur(12px)',
          borderBottom: `1px solid ${surLeHero ? 'transparent' : 'rgba(232, 201, 154, 0.6)'}`,
          transition: 'background 400ms ease, border-color 400ms ease',
        }}
      >
        <div className="cadre flex items-center justify-between" style={{ height: '4.5rem' }}>
          {/* Les deux versions du logo sont superposées et se croisent en fondu :
              changer l'attribut src provoquait un clignotement à la bascule. */}
          <a
            href="#hero"
            aria-label="Acorya — retour en haut"
            style={{ position: 'relative', display: 'block', height: '1.6rem' }}
          >
            <img
              src="/logo-acorya-creme.svg"
              alt="Acorya"
              style={{
                height: '1.6rem',
                width: 'auto',
                opacity: surLeHero ? 1 : 0,
                transition: 'opacity 400ms ease',
              }}
            />
            <img
              src="/logo-acorya-terre.svg"
              alt=""
              aria-hidden="true"
              style={{
                position: 'absolute',
                top: 0,
                left: 0,
                height: '1.6rem',
                width: 'auto',
                opacity: surLeHero ? 0 : 1,
                transition: 'opacity 400ms ease',
              }}
            />
          </a>

          <nav className="hidden md:flex items-center" style={{ gap: '2.5rem' }}>
            {liens.map((lien) => (
              <a
                key={lien.href}
                href={lien.href}
                className="lien-fin"
                style={{
                  color: encre,
                  fontSize: '0.8125rem',
                  fontWeight: 300,
                  letterSpacing: '0.06em',
                  transition: 'color 400ms ease',
                }}
              >
                {lien.label}
              </a>
            ))}
            <a
              href="#contact"
              className="cartel"
              style={{
                color: surLeHero ? '#E8C99A' : '#C4724A',
                border: `1px solid ${surLeHero ? 'rgba(232,201,154,0.45)' : 'rgba(196,114,74,0.45)'}`,
                padding: '0.6rem 1.2rem',
                transition: 'color 400ms ease, border-color 400ms ease, background 300ms ease',
              }}
              onMouseEnter={(e) => {
                e.currentTarget.style.background = surLeHero ? 'rgba(232,201,154,0.12)' : 'rgba(196,114,74,0.08)';
              }}
              onMouseLeave={(e) => {
                e.currentTarget.style.background = 'transparent';
              }}
            >
              Réserver un échange
            </a>
          </nav>

          <button
            type="button"
            onClick={() => setMenuOuvert(true)}
            className="md:hidden"
            style={{ color: encre, padding: '0.5rem', margin: '-0.5rem' }}
            aria-label="Ouvrir le menu"
          >
            <Menu size={22} strokeWidth={1.25} />
          </button>
        </div>
      </header>

      {menuOuvert && (
        <div
          className="fixed inset-0 z-[60] md:hidden flex flex-col"
          style={{ background: '#3D4A52' }}
        >
          <div className="cadre flex items-center justify-between" style={{ height: '4.5rem' }}>
            <img src="/logo-acorya-creme.svg" alt="Acorya" style={{ height: '1.6rem', width: 'auto' }} />
            <button
              type="button"
              onClick={() => setMenuOuvert(false)}
              style={{ color: '#F5F0E8', padding: '0.5rem', margin: '-0.5rem' }}
              aria-label="Fermer le menu"
            >
              <X size={22} strokeWidth={1.25} />
            </button>
          </div>

          <nav className="cadre flex flex-col justify-center flex-1" style={{ gap: '0.25rem', paddingBottom: '6rem' }}>
            {liens.map((lien) => (
              <a
                key={lien.href}
                href={lien.href}
                onClick={() => setMenuOuvert(false)}
                className="titre-section"
                style={{
                  color: '#F5F0E8',
                  fontSize: 'clamp(2rem, 9vw, 3rem)',
                  padding: '0.6rem 0',
                  borderBottom: '1px solid rgba(232,201,154,0.16)',
                }}
              >
                {lien.label}
              </a>
            ))}
            <a
              href="#contact"
              onClick={() => setMenuOuvert(false)}
              className="cartel"
              style={{
                marginTop: '2.5rem',
                color: '#F5F0E8',
                background: '#C4724A',
                padding: '1rem 1.5rem',
                textAlign: 'center',
              }}
            >
              Réserver un échange
            </a>
          </nav>
        </div>
      )}
    </>
  );
}
