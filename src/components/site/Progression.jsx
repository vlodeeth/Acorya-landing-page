import React, { useEffect, useState } from 'react';
import { motion, useScroll, useSpring, useTransform } from 'framer-motion';

const SECTIONS = [
  { id: 'constat', label: 'Constat' },
  { id: 'expertises', label: 'Sièges' },
  { id: 'resultats', label: 'Résultats' },
  { id: 'methode', label: 'Méthode' },
  { id: 'equipe', label: 'Équipe' },
  { id: 'contact', label: 'Échange' },
];

/**
 * Anneau de lecture : le O du logotype qui se referme au fil de la page.
 * Le libellé de la section courante s'écrit à côté — c'est le repère de
 * position dans un document long, pas une seconde navigation.
 */
export default function Progression() {
  const { scrollYProgress } = useScroll();
  const avancee = useSpring(scrollYProgress, { stiffness: 90, damping: 26, mass: 0.5 });
  const offset = useTransform(avancee, [0, 1], [126, 0]);
  const [courante, setCourante] = useState(null);
  const [visible, setVisible] = useState(false);

  useEffect(() => {
    const mesurer = () => {
      const milieu = window.scrollY + window.innerHeight * 0.4;
      let trouvee = null;
      SECTIONS.forEach((s) => {
        const el = document.getElementById(s.id);
        if (el && el.offsetTop <= milieu) trouvee = s;
      });
      setCourante(trouvee);
      setVisible(window.scrollY > window.innerHeight * 0.6);
    };
    mesurer();
    window.addEventListener('scroll', mesurer, { passive: true });
    window.addEventListener('resize', mesurer);
    return () => {
      window.removeEventListener('scroll', mesurer);
      window.removeEventListener('resize', mesurer);
    };
  }, []);

  return (
    <motion.div
      aria-hidden="true"
      initial={false}
      animate={{ opacity: visible ? 1 : 0, y: visible ? 0 : 10 }}
      transition={{ duration: 0.45, ease: [0.16, 1, 0.3, 1] }}
      className="progression"
      style={{
        position: 'fixed',
        right: 'clamp(1rem, 2.5vw, 2.5rem)',
        bottom: 'clamp(1rem, 2.5vw, 2.5rem)',
        zIndex: 55,
        display: 'flex',
        alignItems: 'center',
        gap: '0.85rem',
        pointerEvents: 'none',
      }}
    >
      <span
        className="donnee donnee-fine"
        style={{ color: 'rgba(245, 240, 232, 0.45)', fontSize: '0.5625rem', mixBlendMode: 'difference' }}
      >
        {courante ? courante.label : ''}
      </span>

      <svg width="46" height="46" viewBox="0 0 46 46" style={{ transform: 'rotate(-90deg)' }}>
        <circle cx="23" cy="23" r="20" fill="none" stroke="rgba(196, 114, 74, 0.22)" strokeWidth="1" />
        <motion.circle
          cx="23"
          cy="23"
          r="20"
          fill="none"
          stroke="#C4724A"
          strokeWidth="1.5"
          strokeLinecap="round"
          strokeDasharray="126"
          style={{ strokeDashoffset: offset }}
        />
        <circle cx="23" cy="23" r="4" fill="#C4724A" fillOpacity="0.85" />
      </svg>
    </motion.div>
  );
}
