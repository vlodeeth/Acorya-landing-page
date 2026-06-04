import React, { useRef } from 'react';
import { motion, useScroll, useTransform } from 'framer-motion';
import { use3DTilt } from '@/hooks/use3DTilt';

const problems = [
  {
    num: '01',
    title: 'Un dirigeant seul face à la complexité',
    body: 'Dans une PME, le dirigeant gère simultanément les finances, les opérations, les fournisseurs, les équipes et les imprévus. Il remplace souvent à lui seul plusieurs fonctions stratégiques.',
    color: '#C4724A',
  },
  {
    num: '02',
    title: 'Les outils des grands groupes restent inaccessibles',
    body: 'Pilotage, reporting, structuration, automatisation : les méthodes les plus efficaces existent mais sont rarement adaptées aux PME.',
    color: '#7A9E8E',
  },
  {
    num: '03',
    title: 'Trop de consultants, pas assez de partenaires',
    body: 'De nombreux cabinets livrent des recommandations puis disparaissent. Acorya reste impliqué, suit les actions engagées et accompagne leur mise en œuvre.',
    color: '#C4724A',
  },
];

function TiltCard({ p, i }) {
  const { ref, onMouseMove, onMouseLeave } = use3DTilt(8);
  return (
    <motion.div
      key={p.num}
      initial={{ opacity: 0, y: 60, rotateX: 15 }}
      whileInView={{ opacity: 1, y: 0, rotateX: 0 }}
      viewport={{ once: true, margin: '-60px' }}
      transition={{ duration: 0.7, delay: i * 0.15, ease: [0.22, 1, 0.36, 1] }}
      className="group rounded-2xl p-8 relative overflow-hidden cursor-default border"
      style={{ background: 'rgba(255,255,255,0.75)', borderColor: 'rgba(196,114,74,0.18)', backdropFilter: 'blur(10px)', transformStyle: 'preserve-3d', boxShadow: '0 4px 32px rgba(61,74,82,0.07)' }}
      ref={ref}
      onMouseMove={onMouseMove}
      onMouseLeave={onMouseLeave}
    >
      {/* Floating number — large graphic element */}
      <motion.p
        className="font-heading font-semibold leading-none mb-4"
        style={{ fontSize: '7rem', color: p.color, opacity: 0.55, lineHeight: 1 }}
        animate={{ y: [0, -6, 0] }}
        transition={{ duration: 5 + i, repeat: Infinity, ease: 'easeInOut' }}
      >
        {p.num}
      </motion.p>

      <div className="w-8 h-px mb-4" style={{ background: p.color }} />
      <h3 className="font-heading font-semibold text-2xl mb-4" style={{ color: '#3D4A52' }}>{p.title}</h3>
      <p className="font-body font-light text-sm leading-relaxed" style={{ color: 'rgba(61,74,82,0.65)' }}>{p.body}</p>

      {/* Hover glow */}
      <div
        className="absolute -bottom-16 -right-16 w-40 h-40 rounded-full blur-[60px] opacity-0 group-hover:opacity-15 transition-opacity duration-700 pointer-events-none"
        style={{ background: p.color }}
      />
      {/* Top shine line */}
      <div className="absolute top-0 left-0 right-0 h-px opacity-0 group-hover:opacity-100 transition-opacity duration-500"
        style={{ background: `linear-gradient(90deg, transparent, ${p.color}40, transparent)` }} />
    </motion.div>
  );
}

export default function ValueProps() {
  const sectionRef = useRef(null);
  const { scrollYProgress } = useScroll({ target: sectionRef, offset: ['start end', 'end start'] });
  const bgY = useTransform(scrollYProgress, [0, 1], ['-5%', '5%']);

  return (
    <section ref={sectionRef} id="pourquoi" className="relative py-32 px-6 overflow-hidden" style={{ background: '#F5F0E8' }}>
      {/* Subtle parallax bg gradient */}
      <motion.div style={{ y: bgY }} className="absolute inset-0 pointer-events-none">
        <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[800px] h-[800px] rounded-full blur-[200px] opacity-[0.05]"
          style={{ background: 'radial-gradient(circle, #C4724A, #7A9E8E)' }} />
      </motion.div>

      <div className="relative z-10 max-w-6xl mx-auto">
        <motion.div
          initial={{ opacity: 0, y: 40 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: '-100px' }}
          transition={{ duration: 0.9, ease: [0.22, 1, 0.36, 1] }}
          className="text-center mb-20"
        >
          <motion.span
            initial={{ opacity: 0, letterSpacing: '0.1em' }}
            whileInView={{ opacity: 1, letterSpacing: '0.25em' }}
            viewport={{ once: true }}
            transition={{ duration: 1 }}
            className="text-xs font-body font-medium tracking-[0.25em] text-[#C4724A]/80 mb-4 block uppercase"
          >
            Pourquoi Acorya
          </motion.span>
          <h2 className="font-heading font-light text-4xl md:text-6xl tracking-tight mb-4" style={{ color: '#3D4A52' }}>
            Le partenaire des <em className="gradient-text-terre">dirigeants</em>
          </h2>
          <p className="font-body font-light text-sm max-w-md mx-auto" style={{ color: 'rgba(61,74,82,0.6)' }}>
            Pour structurer, piloter et développer leur entreprise.
          </p>
        </motion.div>

        <div className="grid md:grid-cols-3 gap-6">
          {problems.map((p, i) => <TiltCard key={p.num} p={p} i={i} />)}
        </div>
      </div>
    </section>
  );
}