import React from 'react';
import { motion } from 'framer-motion';

const items = [
  { label: 'Pilotage Financier' },
  { label: 'Structuration & Process' },
  { label: 'IA & Automatisation' },
  { label: 'Accompagnement Juridique' },
  { label: 'Achat & Pricing' },
  { label: 'Saint-Martin · Guadeloupe' },
  { label: 'Partenaire, pas consultant' },
];

export default function StatsMarquee() {
  const doubled = [...items, ...items];
  return (
    <div className="relative py-4 overflow-hidden border-y"
      style={{ borderColor: 'rgba(196,114,74,0.15)', background: 'rgba(232,201,154,0.18)' }}>
      {/* Left/right fade masks */}
      <div className="absolute left-0 top-0 bottom-0 w-24 z-10 pointer-events-none"
        style={{ background: 'linear-gradient(to right, #F5F0E8, transparent)' }} />
      <div className="absolute right-0 top-0 bottom-0 w-24 z-10 pointer-events-none"
        style={{ background: 'linear-gradient(to left, #F5F0E8, transparent)' }} />

      {/* Scanning line */}
      <motion.div className="absolute top-0 bottom-0 w-px pointer-events-none z-20"
        style={{ background: 'linear-gradient(to bottom, transparent, #C4724A, transparent)' }}
        animate={{ x: ['-10vw', '110vw'] }}
        transition={{ duration: 6, repeat: Infinity, ease: 'linear', repeatDelay: 2 }} />

      <div className="animate-marquee flex gap-0 whitespace-nowrap">
        {doubled.map((item, i) => (
          <span key={i} className="flex items-center flex-shrink-0">
            <span className="text-[9px] font-body font-medium tracking-[0.28em] uppercase" style={{ color: 'rgba(61,74,82,0.4)' }}>
              {item.label}
            </span>
            <span className="mx-8 text-xs" style={{ color: 'rgba(196,114,74,0.4)' }}>✦</span>
          </span>
        ))}
      </div>
    </div>
  );
}