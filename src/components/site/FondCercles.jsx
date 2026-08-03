import React, { useEffect, useState } from 'react';
import { motion, useMotionValue, useReducedMotion, useSpring, useTransform } from 'framer-motion';

/**
 * Le O du logotype, agrandi à l'échelle de la page : des anneaux concentriques
 * qui dérivent lentement avec le curseur. C'est la seule matière du fond —
 * pas de halo diffus, pas de dégradé décoratif.
 */
export default function FondCercles() {
  const sansMouvement = useReducedMotion();
  const [tactile, setTactile] = useState(false);

  const sourisX = useMotionValue(0);
  const sourisY = useMotionValue(0);
  const doux = { stiffness: 40, damping: 20, mass: 1.2 };
  const x = useSpring(useTransform(sourisX, [-0.5, 0.5], [22, -22]), doux);
  const y = useSpring(useTransform(sourisY, [-0.5, 0.5], [16, -16]), doux);

  useEffect(() => {
    setTactile(window.matchMedia('(hover: none)').matches);
  }, []);

  useEffect(() => {
    if (sansMouvement || tactile) return;
    const suivre = (e) => {
      sourisX.set(e.clientX / window.innerWidth - 0.5);
      sourisY.set(e.clientY / window.innerHeight - 0.5);
    };
    window.addEventListener('pointermove', suivre, { passive: true });
    return () => window.removeEventListener('pointermove', suivre);
  }, [sansMouvement, tactile, sourisX, sourisY]);

  const anneaux = [
    { r: 46, opacite: 0.16, duree: 0 },
    { r: 33, opacite: 0.11, duree: 0 },
    { r: 20, opacite: 0.07, duree: 0 },
  ];

  return (
    <motion.div
      aria-hidden="true"
      style={{
        position: 'absolute',
        inset: 0,
        overflow: 'hidden',
        pointerEvents: 'none',
        x: sansMouvement || tactile ? 0 : x,
        y: sansMouvement || tactile ? 0 : y,
      }}
    >
      <svg
        viewBox="0 0 100 100"
        preserveAspectRatio="xMidYMid slice"
        style={{
          position: 'absolute',
          top: '50%',
          left: '68%',
          width: 'min(115vh, 92vw)',
          height: 'min(115vh, 92vw)',
          transform: 'translate(-50%, -50%)',
        }}
      >
        {anneaux.map((a) => (
          <circle
            key={a.r}
            cx="50"
            cy="50"
            r={a.r}
            fill="none"
            stroke="#E8C99A"
            strokeOpacity={a.opacite}
            strokeWidth="0.12"
          />
        ))}
        {/* Le cœur : un anneau terre, pas un halo diffus */}
        <circle cx="50" cy="50" r="7" fill="none" stroke="#C4724A" strokeOpacity="0.28" strokeWidth="0.14" />
      </svg>
    </motion.div>
  );
}
