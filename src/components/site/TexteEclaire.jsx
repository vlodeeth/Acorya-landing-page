import React, { useRef } from 'react';
import { motion, useReducedMotion, useScroll, useTransform } from 'framer-motion';

function Mot({ mot, avancee, debut, fin, couleurFaible, couleur }) {
  const opacite = useTransform(avancee, [debut, fin], [0.18, 1]);
  const teinte = useTransform(avancee, [debut, fin], [couleurFaible, couleur]);
  return (
    <motion.span style={{ opacity: opacite, color: teinte, display: 'inline-block', marginRight: '0.28em' }}>
      {mot}
    </motion.span>
  );
}

/**
 * Le texte s'écrit au défilement : chaque mot passe de l'ombre à la pleine
 * lumière quand le lecteur arrive dessus. Réservé aux phrases qui portent
 * l'argument — l'appliquer partout annulerait l'effet.
 */
export default function TexteEclaire({
  texte,
  couleur = '#3D4A52',
  couleurFaible = 'rgba(61, 74, 82, 0.25)',
  className = '',
  style = {},
}) {
  const ancre = useRef(null);
  const sansMouvement = useReducedMotion();
  const { scrollYProgress } = useScroll({
    target: ancre,
    offset: ['start 0.9', 'end 0.55'],
  });

  const mots = String(texte).split(' ');

  if (sansMouvement) {
    return <p className={className} style={{ ...style, color: couleur }}>{texte}</p>;
  }

  return (
    <p ref={ancre} className={className} style={style}>
      {mots.map((mot, i) => {
        const debut = i / mots.length;
        const fin = Math.min(1, (i + 1.6) / mots.length);
        return (
          <Mot
            key={`${mot}-${i}`}
            mot={mot}
            avancee={scrollYProgress}
            debut={debut}
            fin={fin}
            couleur={couleur}
            couleurFaible={couleurFaible}
          />
        );
      })}
    </p>
  );
}
