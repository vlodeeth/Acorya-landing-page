import React from 'react';
import { motion } from 'framer-motion';
import { HardHat, Hotel, ShoppingBag, Briefcase, Rocket } from 'lucide-react';

const sectors = [
  { icon: HardHat,    label: 'BTP', color: '#C4724A' },
  { icon: Hotel,      label: 'Hôtellerie', color: '#7A9E8E' },
  { icon: ShoppingBag, label: 'Commerce', color: '#C4724A' },
  { icon: Briefcase,  label: 'Services', color: '#7A9E8E' },
  { icon: Rocket,     label: 'Entreprises en croissance', color: '#C4724A' },
];

export default function ClientsSection() {
  return (
    <section className="relative py-20 px-6 overflow-hidden" style={{ background: '#F5F0E8' }}>
      <div className="max-w-5xl mx-auto">
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: '-80px' }}
          transition={{ duration: 0.8 }}
          className="text-center mb-14"
        >
          <span className="text-xs font-body font-medium tracking-[0.25em] uppercase mb-4 block" style={{ color: 'rgba(196,114,74,0.7)' }}>
            Secteurs accompagnés
          </span>
          <h2 className="font-heading font-light text-3xl md:text-5xl tracking-tight" style={{ color: '#3D4A52' }}>
            Nous accompagnons <em className="gradient-text-terre">principalement</em>
          </h2>
        </motion.div>

        <div className="flex flex-wrap justify-center gap-4">
          {sectors.map((s, i) => (
            <motion.div
              key={i}
              initial={{ opacity: 0, scale: 0.9 }}
              whileInView={{ opacity: 1, scale: 1 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5, delay: i * 0.1 }}
              whileHover={{ y: -4, scale: 1.03 }}
              className="flex items-center gap-3 px-6 py-4 rounded-xl border cursor-default"
              style={{ background: 'rgba(255,255,255,0.8)', borderColor: 'rgba(196,114,74,0.18)', boxShadow: '0 2px 16px rgba(61,74,82,0.07)' }}
            >
              <s.icon className="w-4 h-4 flex-shrink-0" style={{ color: s.color }} />
              <span className="font-body font-light text-sm tracking-[0.05em]" style={{ color: '#3D4A52' }}>{s.label}</span>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}