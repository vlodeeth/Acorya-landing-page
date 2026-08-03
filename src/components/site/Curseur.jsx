import React, { useEffect, useState } from 'react';
import { motion, useMotionValue, useReducedMotion, useSpring } from 'framer-motion';

/**
 * Le curseur devient le O du logotype : deux cercles concentriques.
 * L'anneau extérieur suit avec du retard, le point central colle au pointeur.
 * Activé uniquement au pointeur fin — le curseur système n'est masqué que
 * lorsque ce composant est bien monté, jamais par une feuille de style.
 */
export default function Curseur() {
  const sansMouvement = useReducedMotion();
  const [actif, setActif] = useState(false);
  const [survol, setSurvol] = useState(false);

  const x = useMotionValue(-100);
  const y = useMotionValue(-100);
  const anneauX = useSpring(x, { stiffness: 220, damping: 26, mass: 0.6 });
  const anneauY = useSpring(y, { stiffness: 220, damping: 26, mass: 0.6 });

  useEffect(() => {
    if (sansMouvement) return;
    if (!window.matchMedia('(pointer: fine)').matches) return;

    setActif(true);
    document.documentElement.classList.add('curseur-perso');

    const bouger = (e) => {
      x.set(e.clientX);
      y.set(e.clientY);
      const cible = e.target instanceof Element ? e.target.closest('a, button, [data-survol]') : null;
      setSurvol(Boolean(cible));
    };
    const sortir = () => {
      x.set(-100);
      y.set(-100);
    };

    window.addEventListener('pointermove', bouger, { passive: true });
    document.addEventListener('pointerleave', sortir);
    return () => {
      window.removeEventListener('pointermove', bouger);
      document.removeEventListener('pointerleave', sortir);
      document.documentElement.classList.remove('curseur-perso');
    };
  }, [sansMouvement, x, y]);

  if (!actif) return null;

  return (
    <>
      <motion.div
        aria-hidden="true"
        style={{
          position: 'fixed',
          top: 0,
          left: 0,
          x: anneauX,
          y: anneauY,
          zIndex: 90,
          pointerEvents: 'none',
          translateX: '-50%',
          translateY: '-50%',
        }}
      >
        <motion.div
          animate={{
            width: survol ? 52 : 30,
            height: survol ? 52 : 30,
            borderColor: survol ? 'rgba(196, 114, 74, 0.9)' : 'rgba(232, 201, 154, 0.55)',
          }}
          transition={{ duration: 0.32, ease: [0.16, 1, 0.3, 1] }}
          style={{ borderWidth: 1, borderStyle: 'solid', borderRadius: '50%' }}
        />
      </motion.div>

      <motion.div
        aria-hidden="true"
        style={{
          position: 'fixed',
          top: 0,
          left: 0,
          x,
          y,
          zIndex: 90,
          pointerEvents: 'none',
          translateX: '-50%',
          translateY: '-50%',
        }}
      >
        <motion.div
          animate={{ scale: survol ? 0.4 : 1 }}
          transition={{ duration: 0.32, ease: [0.16, 1, 0.3, 1] }}
          style={{ width: 6, height: 6, borderRadius: '50%', background: '#C4724A' }}
        />
      </motion.div>
    </>
  );
}
