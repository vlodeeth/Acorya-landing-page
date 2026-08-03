import React, { useEffect, useRef, useState } from 'react';
import { motion, useInView, useReducedMotion } from 'framer-motion';
import Mots from './Mots';

/**
 * Régime unique : nocturne. La profondeur ne vient plus de l'alternance
 * clair/sombre mais des niveaux de surface — vide, fond, surface.
 */
export function Section({ id, surface = false, children, style = {} }) {
  return (
    <section
      id={id}
      style={{
        position: 'relative',
        background: surface ? 'hsl(var(--surface) / 0.5)' : 'transparent',
        paddingTop: 'var(--marge-section)',
        paddingBottom: 'var(--marge-section)',
        ...style,
      }}
    >
      <div className="cadre">{children}</div>
    </section>
  );
}

/** En-tête de section : index technique en marge, titre en capitales fines. */
export function EnTete({ donnee, titre, chapo, index }) {
  const ancre = useRef(null);
  const enVue = useInView(ancre, { once: true, margin: '-120px' });
  const [secours, setSecours] = useState(false);

  useEffect(() => {
    const minuteur = setTimeout(() => setSecours(true), 1600);
    return () => clearTimeout(minuteur);
  }, []);

  return (
    <div className="grille-marge" style={{ marginBottom: 'clamp(3rem, 5vw, 5rem)' }} ref={ancre}>
      <Reveal>
        <div style={{ display: 'flex', alignItems: 'center', gap: '0.75rem', paddingTop: '0.55rem' }}>
          {index && (
            <span className="donnee donnee-fine" style={{ color: 'rgba(196, 114, 74, 0.85)' }}>
              {index}
            </span>
          )}
          <span
            aria-hidden="true"
            style={{ display: 'block', width: '1.5rem', height: '1px', background: 'rgba(232, 201, 154, 0.35)' }}
          />
          <p className="donnee donnee-fine" style={{ color: 'rgba(232, 201, 154, 0.8)' }}>
            {donnee}
          </p>
        </div>
      </Reveal>

      <div>
        <h2 className="titre-section" style={{ color: '#F5F0E8', maxWidth: '22ch' }}>
          <Mots texte={titre} declenche={enVue || secours} delai={0.05} />
        </h2>
        {chapo && (
          <Reveal delai={0.16}>
            <p className="chapo" style={{ maxWidth: '42rem', marginTop: '1.5rem' }}>
              {chapo}
            </p>
          </Reveal>
        )}
      </div>
    </div>
  );
}

/**
 * Révélation sobre au défilement. Une animation ne doit jamais conditionner
 * la lecture : si l'observateur ne répond pas, le contenu s'affiche quand même.
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
      transition={{ duration: 0.65, delay: enVue ? delai : 0, ease: [0.16, 1, 0.3, 1] }}
    >
      {children}
    </motion.div>
  );
}
