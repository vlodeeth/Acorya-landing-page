import React, { useEffect, useState } from 'react';
import { AnimatePresence, motion, useReducedMotion } from 'framer-motion';
import { DUREE_RIDEAU, rideauAJouer } from '../../lib/ouverture';

/**
 * Première impression : le logotype se révèle par balayage sur fond ardoise,
 * puis le rideau se lève sur le comité de direction.
 * Ne se joue qu'une fois par session — un rideau qu'on revoit à chaque page
 * devient un péage.
 */
export default function Rideau() {
  const sansMouvement = useReducedMotion();
  const [visible, setVisible] = useState(false);

  useEffect(() => {
    if (sansMouvement) return;
    if (!rideauAJouer()) return;

    setVisible(true);
    document.body.style.overflow = 'hidden';

    const minuteur = setTimeout(() => {
      setVisible(false);
      document.body.style.overflow = '';
    }, DUREE_RIDEAU * 1000);

    return () => {
      clearTimeout(minuteur);
      document.body.style.overflow = '';
    };
  }, [sansMouvement]);

  return (
    <AnimatePresence>
      {visible && (
        <motion.div
          key="rideau"
          aria-hidden="true"
          exit={{ y: '-100%' }}
          transition={{ duration: 0.95, ease: [0.76, 0, 0.24, 1] }}
          style={{
            position: 'fixed',
            inset: 0,
            zIndex: 100,
            background: '#3D4A52',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
          }}
        >
          <div style={{ position: 'relative', width: 'min(30rem, 62vw)' }}>
            {/* Le logo se découvre par balayage : le SVG est en aplats,
                un tracé progressif n'aurait rien à dessiner. */}
            <motion.div
              initial={{ clipPath: 'inset(0 100% 0 0)' }}
              animate={{ clipPath: 'inset(0 0% 0 0)' }}
              transition={{ duration: 1.1, ease: [0.16, 1, 0.3, 1], delay: 0.12 }}
            >
              <img src="/logo-acorya-creme.svg" alt="" style={{ width: '100%', height: 'auto', display: 'block' }} />
            </motion.div>

            <motion.p
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ duration: 0.7, delay: 0.85 }}
              className="donnee donnee-fine"
              style={{
                color: 'rgba(232, 201, 154, 0.65)',
                textAlign: 'center',
                marginTop: '1.5rem',
                fontSize: '0.5625rem',
              }}
            >
              Au cœur de votre entreprise
            </motion.p>
          </div>
        </motion.div>
      )}
    </AnimatePresence>
  );
}
