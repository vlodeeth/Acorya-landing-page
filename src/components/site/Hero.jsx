import React, { useEffect, useState } from 'react';
import { AnimatePresence, motion, useReducedMotion } from 'framer-motion';
import Coeur from './Coeur';
import Mots from './Mots';
import FondCercles from './FondCercles';
import { DUREE_RIDEAU, rideauAJouer } from '../../lib/ouverture';

/* Les cinq directions qu'un grand groupe emploie à plein temps,
   et que le dirigeant de PME assure seul. Ce sont exactement les
   cinq expertises d'Acorya : la table est le sommaire du site. */
const sieges = ['Finance', 'Organisation', 'Technologie', 'Juridique', 'Achats'];

/* Repères de la séquence d'ouverture, en secondes. */
const T_TITRE = 0.25;
const T_TABLE = 0.9;
const T_SIEGE = 1.0;
const PAS_SIEGE = 0.09;
/* Les sièges restent visiblement vacants une bonne seconde avant qu'Acorya
   les occupe : sans cette pause, le basculement passe inaperçu. */
const T_OCCUPATION = T_SIEGE + sieges.length * PAS_SIEGE + 1.5;

export default function Hero() {
  const sansMouvement = useReducedMotion();

  /* Si le rideau d'ouverture joue, toute la séquence attend qu'il soit levé :
     sinon le hero se déroulerait derrière un écran opaque. */
  const [decalage] = useState(() => (!sansMouvement && rideauAJouer() ? DUREE_RIDEAU - 0.35 : 0));

  /* Les sièges sont d'abord vacants, puis Acorya les occupe.
     C'est tout l'argument du site, joué en deux secondes. */
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
          initial: { opacity: 0, y: 12 },
          animate: { opacity: 1, y: 0 },
          transition: { duration: 0.75, delay: decalage + delai, ease: [0.16, 1, 0.3, 1] },
        };

  return (
    <section
      id="hero"
      style={{
        position: 'relative',
        background: 'linear-gradient(180deg, #3D4A52 0%, #364149 100%)',
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
          style={{ display: 'grid', gap: 'clamp(3.5rem, 6vw, 6rem)', alignItems: 'center' }}
        >
          {/* ── Colonne de gauche : l'énoncé ─────────────────── */}
          <div>
            <motion.p {...entree(0.05)} className="cartel cartel-fin" style={{ color: '#E8C99A' }}>
              Au cœur de votre entreprise
            </motion.p>

            <h1 className="titre-display" style={{ color: '#F5F0E8', marginTop: '1.75rem', maxWidth: '18ch' }}>
              <Mots texte="Un grand groupe confie son entreprise à cinq directions." delai={decalage + T_TITRE} />
              <Mots
                as="em"
                texte="Vous les assurez seul."
                delai={decalage + T_TITRE + 0.42}
                style={{ display: 'block', color: '#E8C99A', fontStyle: 'italic', marginTop: '0.35em' }}
              />
            </h1>

            <motion.p
              {...entree(1.05)}
              className="chapo"
              style={{ color: 'rgba(245, 240, 232, 0.72)', maxWidth: '34rem', marginTop: '2.25rem' }}
            >
              Acorya occupe les cinq sièges vacants de votre comité de direction. Nous ne livrons pas
              un rapport&nbsp;: nous restons, nous suivons, nous ajustons.
            </motion.p>

            <motion.div
              {...entree(1.18)}
              style={{ display: 'flex', flexWrap: 'wrap', alignItems: 'center', gap: '2rem', marginTop: '3rem' }}
            >
              <a href="#contact" className="bouton-terre cartel">
                <span>Réserver un échange</span>
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
          <motion.div {...entree(T_TABLE)} style={{ width: '100%' }}>
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

            <div style={{ display: 'flex', alignItems: 'stretch', gap: '1.5rem' }}>
              <ul style={{ flex: 1, listStyle: 'none', margin: 0, padding: 0 }}>
                {sieges.map((siege, i) => (
                  <motion.li
                    key={siege}
                    initial={sansMouvement ? false : { opacity: 0, x: -10 }}
                    animate={sansMouvement ? false : { opacity: 1, x: 0 }}
                    transition={{ duration: 0.6, delay: T_SIEGE + i * PAS_SIEGE, ease: [0.16, 1, 0.3, 1] }}
                    style={{
                      display: 'flex',
                      alignItems: 'baseline',
                      justifyContent: 'space-between',
                      gap: '1rem',
                      padding: '1.05rem 0',
                      borderBottom: i < sieges.length - 1 ? '1px solid rgba(232, 201, 154, 0.12)' : 'none',
                    }}
                  >
                    <span className="cartel" style={{ color: 'rgba(245, 240, 232, 0.82)' }}>{siege}</span>

                    {/* Vacant, puis occupé : le basculement raconte l'offre */}
                    <span aria-hidden="true" style={{ position: 'relative', minWidth: '4.5rem', textAlign: 'right' }}>
                      <AnimatePresence>
                        {!occupe && (
                          <motion.span
                            key="vacant"
                            initial={{ opacity: 0 }}
                            animate={{ opacity: 1 }}
                            exit={{ opacity: 0, y: -6 }}
                            transition={{ duration: 0.4, delay: occupe ? 0 : T_SIEGE + i * PAS_SIEGE + 0.12 }}
                            className="cartel cartel-fin"
                            style={{ color: 'rgba(232, 201, 154, 0.5)', fontSize: '0.625rem' }}
                          >
                            Vacant
                          </motion.span>
                        )}
                      </AnimatePresence>
                    </span>
                  </motion.li>
                ))}
              </ul>

              {/* Un seul partenaire pour les cinq sièges */}
              <motion.div
                initial={sansMouvement ? false : { opacity: 0 }}
                animate={sansMouvement ? false : { opacity: occupe ? 1 : 0 }}
                transition={{ duration: 0.5 }}
                style={{ display: 'flex', alignItems: 'center', gap: '1rem', paddingLeft: '0.25rem' }}
              >
                <motion.span
                  initial={sansMouvement ? false : { scaleY: 0 }}
                  animate={sansMouvement ? false : { scaleY: occupe ? 1 : 0 }}
                  transition={{ duration: 0.85, ease: [0.16, 1, 0.3, 1] }}
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
                  style={{ writingMode: 'vertical-rl', color: '#C4724A', letterSpacing: '0.34em', fontWeight: 400 }}
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
