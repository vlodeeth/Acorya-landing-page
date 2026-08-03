import React from 'react';
import { motion, useReducedMotion } from 'framer-motion';
import Coeur from './Coeur';

/* Les cinq directions qu'un grand groupe emploie à plein temps,
   et que le dirigeant de PME assure seul. Ce sont exactement les
   cinq expertises d'Acorya : la table est le sommaire du site. */
const sieges = ['Finance', 'Organisation', 'Technologie', 'Juridique', 'Achats'];

export default function Hero() {
  const sansMouvement = useReducedMotion();

  // Séquence d'ouverture : le texte se pose, puis la table s'occupe siège par siège.
  const entree = (delai) =>
    sansMouvement
      ? {}
      : {
          initial: { opacity: 0, y: 12 },
          animate: { opacity: 1, y: 0 },
          transition: { duration: 0.7, delay: delai, ease: [0.22, 1, 0.36, 1] },
        };

  return (
    <section
      id="hero"
      style={{
        background: 'linear-gradient(180deg, #3D4A52 0%, #364149 100%)',
        minHeight: '100svh',
        display: 'flex',
        alignItems: 'center',
        paddingTop: '8rem',
        paddingBottom: '5rem',
      }}
    >
      <div className="cadre w-full">
        <div
          style={{
            display: 'grid',
            gap: 'clamp(3.5rem, 6vw, 6rem)',
            alignItems: 'center',
          }}
          className="hero-grille"
        >
          {/* ── Colonne de gauche : l'énoncé ─────────────────── */}
          <div>
            <motion.p {...entree(0.05)} className="cartel cartel-fin" style={{ color: '#E8C99A' }}>
              Au cœur de votre entreprise
            </motion.p>

            <motion.h1
              {...entree(0.15)}
              className="titre-display"
              style={{ color: '#F5F0E8', marginTop: '1.75rem', maxWidth: '18ch' }}
            >
              Un grand groupe confie son entreprise à cinq directions.
              <em style={{ display: 'block', color: '#E8C99A', fontStyle: 'italic', marginTop: '0.35em' }}>
                Vous les assurez seul.
              </em>
            </motion.h1>

            <motion.p
              {...entree(0.3)}
              className="chapo"
              style={{ color: 'rgba(245, 240, 232, 0.72)', maxWidth: '34rem', marginTop: '2.25rem' }}
            >
              Acorya occupe les cinq sièges vacants de votre comité de direction. Nous ne livrons pas
              un rapport&nbsp;: nous restons, nous suivons, nous ajustons.
            </motion.p>

            <motion.div
              {...entree(0.42)}
              style={{ display: 'flex', flexWrap: 'wrap', alignItems: 'center', gap: '2rem', marginTop: '3rem' }}
            >
              <a
                href="#contact"
                className="cartel"
                style={{
                  background: '#C4724A',
                  color: '#F5F0E8',
                  padding: '1.1rem 2rem',
                  fontWeight: 400,
                  transition: 'background 300ms ease',
                }}
                onMouseEnter={(e) => { e.currentTarget.style.background = '#B0603A'; }}
                onMouseLeave={(e) => { e.currentTarget.style.background = '#C4724A'; }}
              >
                Réserver un échange
              </a>
              <a
                href="#methode"
                className="lien-fin"
                style={{ color: 'rgba(245, 240, 232, 0.8)', fontSize: '0.9375rem', fontWeight: 300 }}
              >
                Voir la méthode
              </a>
            </motion.div>
          </div>

          {/* ── Colonne de droite : la table ─────────────────── */}
          <motion.div {...entree(0.5)} style={{ width: '100%' }}>
            <p className="cartel cartel-fin" style={{ color: 'rgba(232, 201, 154, 0.55)' }}>
              Comité de direction
            </p>

            <hr className="filet-sombre" style={{ marginTop: '1.25rem' }} />

            {/* Le siège du dirigeant — marqué par le cœur du logotype */}
            <div
              style={{
                display: 'flex',
                alignItems: 'baseline',
                justifyContent: 'space-between',
                gap: '1.5rem',
                padding: '1.15rem 0',
              }}
            >
              <span style={{ display: 'flex', alignItems: 'center', gap: '0.85rem' }}>
                <Coeur size={13} />
                <span className="cartel" style={{ color: '#F5F0E8', fontWeight: 400 }}>Vous</span>
              </span>
              <span style={{ fontSize: '0.875rem', fontWeight: 300, color: 'rgba(245, 240, 232, 0.55)' }}>
                Direction générale
              </span>
            </div>

            <hr className="filet-sombre" />

            {/* Les cinq sièges tenus par Acorya, réunis par une seule accolade */}
            <div style={{ display: 'flex', alignItems: 'stretch', gap: '1.5rem' }}>
              <ul style={{ flex: 1, listStyle: 'none', margin: 0, padding: 0 }}>
                {sieges.map((siege, i) => (
                  <motion.li
                    key={siege}
                    initial={sansMouvement ? false : { opacity: 0, x: -8 }}
                    animate={sansMouvement ? false : { opacity: 1, x: 0 }}
                    transition={{ duration: 0.55, delay: 0.72 + i * 0.09, ease: [0.22, 1, 0.36, 1] }}
                    className="cartel"
                    style={{
                      color: 'rgba(245, 240, 232, 0.82)',
                      padding: '1.05rem 0',
                      borderBottom: i < sieges.length - 1 ? '1px solid rgba(232, 201, 154, 0.12)' : 'none',
                    }}
                  >
                    {siege}
                  </motion.li>
                ))}
              </ul>

              {/* Un seul partenaire pour les cinq sièges */}
              <motion.div
                initial={sansMouvement ? false : { opacity: 0 }}
                animate={sansMouvement ? false : { opacity: 1 }}
                transition={{ duration: 0.8, delay: 1.2 }}
                style={{
                  display: 'flex',
                  alignItems: 'center',
                  gap: '1rem',
                  paddingLeft: '0.25rem',
                }}
              >
                <motion.span
                  initial={sansMouvement ? false : { scaleY: 0 }}
                  animate={sansMouvement ? false : { scaleY: 1 }}
                  transition={{ duration: 0.9, delay: 1.2, ease: [0.22, 1, 0.36, 1] }}
                  style={{
                    display: 'block',
                    width: '1px',
                    alignSelf: 'stretch',
                    background: 'rgba(196, 114, 74, 0.9)',
                    transformOrigin: 'top',
                  }}
                />
                <span
                  className="cartel"
                  style={{
                    writingMode: 'vertical-rl',
                    color: '#C4724A',
                    letterSpacing: '0.34em',
                    fontWeight: 400,
                  }}
                >
                  Acorya
                </span>
              </motion.div>
            </div>

            <hr className="filet-sombre" />
          </motion.div>
        </div>
      </div>

      <style>{`
        @media (min-width: 1000px) {
          .hero-grille {
            grid-template-columns: minmax(0, 1.15fr) minmax(20rem, 0.85fr);
          }
        }
      `}</style>
    </section>
  );
}
