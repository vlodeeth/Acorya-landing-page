import React from 'react';

/**
 * Les deux cercles concentriques du logotype Acorya — le O de ACORYA.
 * Symbole du centre, de la présence au sein de l'entreprise.
 * Sert de marqueur pour tout ce qui désigne le dirigeant lui-même.
 */
export default function Coeur({ size = 14, exterieur = '#E8C99A', interieur = '#C4724A', className = '' }) {
  return (
    <svg
      width={size}
      height={size}
      viewBox="0 0 24 24"
      fill="none"
      aria-hidden="true"
      className={className}
      style={{ flexShrink: 0 }}
    >
      <circle cx="12" cy="12" r="11" stroke={exterieur} strokeWidth="1.2" />
      <circle cx="12" cy="12" r="5" fill={interieur} />
    </svg>
  );
}
