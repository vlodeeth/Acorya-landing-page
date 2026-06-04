import React from 'react';
import { motion } from 'framer-motion';
import { Quote } from 'lucide-react';
import { use3DTilt } from '@/hooks/use3DTilt';

const testimonials = [
  {
    quote: "Pour la première fois, j'ai une vision claire de la santé financière de mon entreprise. Acorya a transformé ma façon de piloter.",
    author: "Dirigeant TPE",
    location: "Saint-Martin",
    color: "#C4724A",
  },
  {
    quote: "En 3 mois, on a structuré ce que je n'arrivais pas à faire en 3 ans seul. Ils sont dans le concret, pas dans la théorie.",
    author: "Gérant PME",
    location: "Guadeloupe",
    color: "#7A9E8E",
  },
  {
    quote: "L'IA ne me faisait pas peur, mais je ne savais pas par où commencer. Valentin a tout mis en place simplement.",
    author: "Entrepreneur",
    location: "Saint-Martin",
    color: "#C4724A",
  },
];

function TestimonialCard({ t, i }) {
  const { ref, onMouseMove, onMouseLeave } = use3DTilt(9);
  return (
    <motion.div
      ref={ref}
      onMouseMove={onMouseMove}
      onMouseLeave={onMouseLeave}
      initial={{ opacity: 0, y: 50, scale: 0.95 }}
      whileInView={{ opacity: 1, y: 0, scale: 1 }}
      viewport={{ once: true }}
      transition={{ duration: 0.65, delay: i * 0.15, ease: [0.22, 1, 0.36, 1] }}
      className="group rounded-2xl p-8 relative overflow-hidden cursor-default border"
      style={{ background: 'rgba(255,255,255,0.7)', borderColor: 'rgba(196,114,74,0.10)', backdropFilter: 'blur(10px)' }}
      style={{ transformStyle: 'preserve-3d' }}
    >
      <Quote className="w-8 h-8 mb-6 opacity-20" style={{ color: t.color }} />
      <p className="font-body font-light text-sm leading-relaxed mb-8 italic" style={{ color: 'rgba(61,74,82,0.65)' }}>
        "{t.quote}"
      </p>
      <div className="flex items-center gap-3">
        <div className="w-10 h-10 rounded-full flex items-center justify-center text-sm font-heading font-light"
          style={{ background: `${t.color}15`, color: t.color }}>
          {t.author[0]}
        </div>
        <div>
          <p className="text-sm font-body font-medium" style={{ color: 'rgba(61,74,82,0.75)' }}>{t.author}</p>
          <p className="text-xs font-body font-light" style={{ color: 'rgba(61,74,82,0.4)' }}>{t.location}</p>
        </div>
      </div>
      <div className="absolute -bottom-20 -right-20 w-40 h-40 rounded-full blur-[60px] opacity-0 group-hover:opacity-15 transition-opacity duration-700"
        style={{ background: t.color }} />
      <div className="absolute top-0 left-0 right-0 h-px opacity-0 group-hover:opacity-100 transition-opacity duration-500"
        style={{ background: `linear-gradient(90deg, transparent, ${t.color}40, transparent)` }} />
    </motion.div>
  );
}

export default function TestimonialSection() {
  return (
    <section className="relative py-32 px-6">
      <div className="max-w-6xl mx-auto">
        <motion.div
          initial={{ opacity: 0, y: 40 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: '-100px' }}
          transition={{ duration: 0.8 }}
          className="text-center mb-16"
        >
          <span className="text-xs font-body font-medium tracking-[0.2em] uppercase text-[#C4724A]/80 mb-4 block">
            Témoignages
          </span>
          <h2 className="font-heading font-light text-4xl md:text-5xl tracking-tight" style={{ color: '#3D4A52' }}>
            Ils nous font <em className="gradient-text-terre">confiance</em>.
          </h2>
        </motion.div>

        <div className="grid md:grid-cols-3 gap-6">
          {testimonials.map((t, i) => (
            <TestimonialCard key={i} t={t} i={i} />
          ))}
        </div>
      </div>
    </section>
  );
}