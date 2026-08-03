import React, { useEffect, useState } from 'react';
import { motion, useReducedMotion } from 'framer-motion';
import Mots from './Mots';
import FondCercles from './FondCercles';
import { DUREE_RIDEAU, rideauAJouer } from '../../lib/ouverture';

const sieges = ['Finance', 'Organisation', 'Technologie', 'Juridique', 'Achats'];

const T_TITRE = 0.25;
const T_PANNEAU = 0.85;
const T_SIEGE = 1.05;
const PAS_SIEGE = 0.1;
const T_OCCUPATION = T_SIEGE + sieges.length * PAS_SIEGE + 1.5;

export default function Hero() {
  const sansMouvement = useReducedMotion();

  /* Si le rideau d'ouverture joue, toute la séquence attend qu'il soit levé. */
  const [decalage] = useState(() => (!sansMouvement && rideauAJouer() ? DUREE_RIDEAU - 0.35 : 0));
  const [occupe, setOccupe] = useState(Boolean(sansMouvement));

  useEffect(() => {
    if (sansMouvement) return;
    const minuteur = setTimeout(() => setOccupe(true), (decalage + T_OCCUPATION) * 1000);
    return () => clearTimeout(minuteur);
  }, [sansMouvement, decalage]);

  const entree = (delai) =>
    sansMouvement
      ? {}
      : {
          initial: { opacity: 0, y: 14 },
          animate: { opacity: 1, y: 0 },
          transition: { duration: 0.8, delay: decalage + delai, ease: [0.16, 1, 0.3, 1] },
        };

  return (
    <section
      id="hero"
      className="grille-technique"
      style={{
        position: 'relative',
        background: 'radial-gradient(120% 90% at 70% 40%, hsl(var(--fond)) 0%, hsl(var(--vide)) 70%)',
        minHeight: '100svh',
        display: 'flex',
        alignItems: 'center',
        paddingTop: '8rem',
        paddingBottom: '5rem',
        overflow: 'hidden',
      }}
    >
      <FondCercles />

      <div className="cadre w-full" style={{ position: 'relative' }}>
        <div
          className="hero-grille"
          style={{ display: 'grid', gap: 'clamp(3.5rem, 5vw, 5.5rem)', alignItems: 'center' }}
        >
          {/* ── L'énoncé ─────────────────────────────────── */}
          <div>
            <motion.div
              {...entree(0.05)}
              style={{ display: 'flex', alignItems: 'center', gap: '0.85rem' }}
            >
              <span
                aria-hidden="true"
                style={{
                  width: 6,
                  height: 6,
                  background: '#C4724A',
                  boxShadow: '0 0 12px rgba(196,114,74,0.9)',
                  display: 'block',
                }}
              />
              <p className="donnee donnee-fine" style={{ color: 'rgba(232, 201, 154, 0.8)' }}>
                Acorya — au cœur de votre entreprise
              </p>
            </motion.div>

            <h1
              className="titre-display"
              style={{
                color: '#F5F0E8',
                marginTop: '2rem',
                textTransform: 'uppercase',
                letterSpacing: '0.02em',
              }}
            >
              <Mots texte="Cinq directions." delai={decalage + T_TITRE} pas={0.06} />
              <Mots
                texte="Un seul dirigeant."
                delai={decalage + T_TITRE + 0.3}
                pas={0.06}
                style={{ display: 'block', color: '#C4724A' }}
              />
            </h1>

            <motion.p
              {...entree(1.0)}
              className="chapo"
              style={{ maxWidth: '32rem', marginTop: '2.25rem' }}
            >
              Un grand groupe confie son entreprise à cinq directions. Vous les assurez seul.
              Acorya prend les cinq sièges — et les garde.
            </motion.p>

            <motion.div
              {...entree(1.15)}
              style={{ display: 'flex', flexWrap: 'wrap', alignItems: 'center', gap: '2rem', marginTop: '3rem' }}
            >
              <a href="#contact" className="bouton-terre">Réserver un échange</a>
              <a
                href="#methode"
                className="lien-fin donnee donnee-fine"
                style={{ color: 'rgba(245, 240, 232, 0.7)' }}
              >
                Voir la méthode
              </a>
            </motion.div>
          </div>

          {/* ── Le panneau d'état ────────────────────────── */}
          <motion.div
            {...entree(T_PANNEAU)}
            className="viseur"
            style={{
              width: '100%',
              padding: 'clamp(1.5rem, 2.5vw, 2.25rem)',
              background: 'hsl(var(--surface) / 0.42)',
              border: '1px solid rgba(232, 201, 154, 0.14)',
              backdropFilter: 'blur(6px)',
              WebkitBackdropFilter: 'blur(6px)',
              position: 'relative',
              overflow: 'hidden',
            }}
          >
            {/* Balayage : la lumière passe sur le panneau au moment de la prise de fonction */}
            {!sansMouvement && (
              <motion.div
                aria-hidden="true"
                initial={{ y: '-120%' }}
                animate={occupe ? { y: '120%' } : { y: '-120%' }}
                transition={{ duration: 1.1, ease: [0.16, 1, 0.3, 1] }}
                style={{
                  position: 'absolute',
                  left: 0,
                  right: 0,
                  height: '45%',
                  background:
                    'linear-gradient(180deg, transparent, rgba(196,114,74,0.16), transparent)',
                  pointerEvents: 'none',
                }}
              />
            )}

            <div style={{ display: 'flex', alignItems: 'baseline', justifyContent: 'space-between', gap: '1rem' }}>
              <p className="donnee donnee-fine" style={{ color: 'rgba(232, 201, 154, 0.6)' }}>
                Comité de direction
              </p>
              <motion.p
                className="donnee donnee-fine"
                animate={{ color: occupe ? '#C4724A' : 'rgba(245, 240, 232, 0.35)' }}
                transition={{ duration: 0.5 }}
              >
                {occupe ? 'Complet' : 'Incomplet'}
              </motion.p>
            </div>

            <hr className="filet" style={{ marginTop: '1.1rem' }} />

            {/* Le siège du dirigeant */}
            <div
              style={{
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'space-between',
                gap: '1rem',
                padding: '0.95rem 0',
                borderBottom: '1px solid rgba(232, 201, 154, 0.12)',
              }}
            >
              <span style={{ display: 'flex', alignItems: 'center', gap: '0.8rem' }}>
                <span
                  aria-hidden="true"
                  style={{
                    width: 6,
                    height: 6,
                    borderRadius: '50%',
                    background: '#E8C99A',
                    boxShadow: '0 0 10px rgba(232,201,154,0.8)',
                  }}
                />
                <span className="donnee" style={{ color: '#F5F0E8' }}>Vous</span>
              </span>
              <span className="donnee donnee-fine" style={{ color: 'rgba(245, 240, 232, 0.4)' }}>
                Direction générale
              </span>
            </div>

            <ul style={{ listStyle: 'none', margin: 0, padding: 0 }}>
              {sieges.map((siege, i) => (
                <motion.li
                  key={siege}
                  initial={sansMouvement ? false : { opacity: 0, x: -10 }}
                  animate={sansMouvement ? false : { opacity: 1, x: 0 }}
                  transition={{ duration: 0.6, delay: decalage + T_SIEGE + i * PAS_SIEGE, ease: [0.16, 1, 0.3, 1] }}
                  style={{
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'space-between',
                    gap: '1rem',
                    padding: '0.85rem 0',
                    borderBottom: i < sieges.length - 1 ? '1px solid rgba(232, 201, 154, 0.09)' : 'none',
                  }}
                >
                  <span style={{ display: 'flex', alignItems: 'center', gap: '0.8rem' }}>
                    {/* Témoin d'état : vide tant que le siège l'est */}
                    <motion.span
                      aria-hidden="true"
                      animate={{
                        background: occupe ? '#C4724A' : 'transparent',
                        boxShadow: occupe ? '0 0 10px rgba(196,114,74,0.85)' : '0 0 0 rgba(0,0,0,0)',
                      }}
                      transition={{ duration: 0.45, delay: occupe ? i * 0.07 : 0 }}
                      style={{
                        width: 6,
                        height: 6,
                        border: '1px solid rgba(232, 201, 154, 0.4)',
                        display: 'block',
                      }}
                    />
                    <span className="donnee" style={{ color: 'rgba(245, 240, 232, 0.8)' }}>{siege}</span>
                  </span>

                  <span
                    aria-hidden="true"
                    className="donnee donnee-fine"
                    style={{ minWidth: '5.5rem', textAlign: 'right', position: 'relative', height: '1em' }}
                  >
                    <motion.span
                      animate={{ opacity: occupe ? 0 : 1, y: occupe ? -6 : 0 }}
                      transition={{ duration: 0.35, delay: occupe ? i * 0.07 : decalage + T_SIEGE + i * PAS_SIEGE }}
                      style={{ position: 'absolute', right: 0, color: 'rgba(245, 240, 232, 0.35)' }}
                    >
                      Vacant
                    </motion.span>
                    <motion.span
                      initial={{ opacity: 0, y: 6 }}
                      animate={{ opacity: occupe ? 1 : 0, y: occupe ? 0 : 6 }}
                      transition={{ duration: 0.4, delay: occupe ? 0.15 + i * 0.07 : 0 }}
                      style={{ position: 'absolute', right: 0, color: '#C4724A' }}
                    >
                      Acorya
                    </motion.span>
                  </span>
                </motion.li>
              ))}
            </ul>
          </motion.div>
        </div>
      </div>

      <style>{`
        @media (min-width: 1000px) {
          .hero-grille {
            grid-template-columns: minmax(0, 1.1fr) minmax(21rem, 0.9fr);
          }
        }
      `}</style>
    </section>
  );
}
