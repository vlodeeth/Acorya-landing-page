import React from 'react';
import { motion } from 'framer-motion';

const stats = [
  { value: '10+', label: "ans d'expérience terrain" },
  { value: 'PME', label: 'notre spécialisation' },
  { value: 'Saint-Martin', label: 'ancrage local fort' },
  { value: 'Partenaire', label: 'engagé dans la durée' },
];

export default function CredibilityBar() {
  return (
    <section className="relative py-8 px-6 overflow-hidden" style={{ background: '#2a343b', borderBottom: '1px solid rgba(196,114,74,0.12)' }}>
      {/* Subtle ambient glow */}
      <div className="absolute inset-0 pointer-events-none" style={{ background: 'radial-gradient(ellipse 60% 100% at 50% 50%, rgba(196,114,74,0.05), transparent)' }} />
      <div className="relative z-10 max-w-5xl mx-auto flex flex-wrap items-center justify-center gap-0 divide-x" style={{ divideColor: 'rgba(245,240,232,0.08)' }}>
        {stats.map((s, i) => (
          <motion.div
            key={i}
            initial={{ opacity: 0, y: 10 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5, delay: i * 0.08 }}
            className="flex items-center gap-3 px-8 py-2"
          >
            <span className="font-heading font-light" style={{ fontSize: '1.4rem', color: '#C4724A' }}>
              {s.value}
            </span>
            <span className="w-px h-5 opacity-20" style={{ background: '#E8C99A', display: 'inline-block' }} />
            <p className="font-body font-light text-[10px] tracking-[0.12em] uppercase" style={{ color: 'rgba(245,240,232,0.45)' }}>
              {s.label}
            </p>
          </motion.div>
        ))}
      </div>
    </section>
  );
}