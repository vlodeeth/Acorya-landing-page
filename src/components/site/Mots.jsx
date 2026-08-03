import React from 'react';
import { motion, useReducedMotion } from 'framer-motion';

/**
 * Révélation typographique par masque : chaque mot monte depuis sa propre
 * ligne de base, comme un texte qu'on compose. Le masque est ce qui distingue
 * une vraie révélation d'un simple fondu.
 */
export default function Mots({
  texte,
  delai = 0,
  pas = 0.045,
  declenche = true,
  style = {},
  className = '',
  as: Balise = 'span',
}) {
  const sansMouvement = useReducedMotion();
  const mots = String(texte).split(' ');

  if (sansMouvement) {
    return <Balise className={className} style={style}>{texte}</Balise>;
  }

  return (
    <Balise className={className} style={style}>
      {mots.map((mot, i) => (
        <span
          key={`${mot}-${i}`}
          style={{
            display: 'inline-block',
            overflow: 'hidden',
            verticalAlign: 'bottom',
            /* Laisse respirer les jambages des lettres descendantes */
            paddingBottom: '0.12em',
            marginBottom: '-0.12em',
          }}
        >
          <motion.span
            style={{ display: 'inline-block', willChange: 'transform' }}
            initial={{ y: '110%' }}
            animate={declenche ? { y: '0%' } : { y: '110%' }}
            transition={{
              duration: 0.85,
              delay: delai + i * pas,
              ease: [0.16, 1, 0.3, 1],
            }}
          >
            {mot}
            {i < mots.length - 1 ? ' ' : ''}
          </motion.span>
        </span>
      ))}
    </Balise>
  );
}
