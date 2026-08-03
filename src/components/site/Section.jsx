import React, { useEffect, useRef, useState } from 'react';
import { motion, useInView, useReducedMotion } from 'framer-motion';

/**
 * Deux régimes seulement, et l'alternance porte du sens :
 *  — clair  : le monde du dirigeant (son constat, ses résultats, ses interlocuteurs)
 *  — sombre : ce qu'Acorya prend en charge (les sièges, la méthode, l'échange)
 */
export function Section({ id, sombre = false, children, style = {} }) {
  return (
    <section
      id={id}
      style={{
        background: sombre ? '#3D4A52' : '#F5F0E8',
        paddingTop: 'var(--marge-section)',
        paddingBottom: 'var(--marge-section)',
        ...style,
      }}
    >
      <div className="cadre">{children}</div>
    </section>
  );
}

/** En-tête de section : le cartel vit dans la colonne de marge, comme une note de document. */
export function EnTete({ cartel, titre, chapo, sombre = false }) {
  return (
    <div className="grille-marge" style={{ marginBottom: 'clamp(3rem, 5vw, 5rem)' }}>
      <Reveal>
        <p
          className="cartel cartel-fin"
          style={{ color: sombre ? 'rgba(232, 201, 154, 0.75)' : '#C4724A', paddingTop: '0.6rem' }}
        >
          {cartel}
        </p>
      </Reveal>
      <div>
        <Reveal delai={0.08}>
          <h2 className="titre-section" style={{ color: sombre ? '#F5F0E8' : '#3D4A52', maxWidth: '20ch' }}>
            {titre}
          </h2>
        </Reveal>
        {chapo && (
          <Reveal delai={0.16}>
            <p
              className="chapo"
              style={{
                color: sombre ? 'rgba(245, 240, 232, 0.7)' : 'rgba(61, 74, 82, 0.75)',
                maxWidth: '42rem',
                marginTop: '1.5rem',
              }}
            >
              {chapo}
            </p>
          </Reveal>
        )}
      </div>
    </div>
  );
}

/**
 * Révélation sobre au défilement — jamais en boucle, désactivée si le visiteur l'a demandé.
 * Une animation ne doit jamais conditionner la lecture : si l'observateur ne répond pas
 * (navigateur exotique, onglet restauré, capture automatisée), le contenu s'affiche quand même.
 */
export function Reveal({ children, delai = 0, className, style }) {
  const sansMouvement = useReducedMotion();
  const ref = useRef(null);
  const enVue = useInView(ref, { once: true, margin: '-60px' });
  const [secours, setSecours] = useState(false);

  useEffect(() => {
    const minuteur = setTimeout(() => setSecours(true), 1600);
    return () => clearTimeout(minuteur);
  }, []);

  const visible = sansMouvement || enVue || secours;

  return (
    <motion.div
      ref={ref}
      className={className}
      style={style}
      initial={false}
      animate={visible ? { opacity: 1, y: 0 } : { opacity: 0, y: 14 }}
      transition={{ duration: 0.65, delay: enVue ? delai : 0, ease: [0.22, 1, 0.36, 1] }}
    >
      {children}
    </motion.div>
  );
}
