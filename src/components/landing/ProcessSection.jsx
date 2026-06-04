import React, { useRef } from 'react';
import { motion, useScroll, useTransform } from 'framer-motion';
import { use3DTilt } from '@/hooks/use3DTilt';

const steps = [
  { num: '01', title: 'Diagnostic', description: "Compréhension du besoin, vérification de l'adéquation et faisabilité de la mission. Transparence totale.", color: '#C4724A' },
  { num: '02', title: 'Proposition Écrite', description: 'Périmètre précis, livrables définis, planning et conditions signés avant tout démarrage.', color: '#7A9E8E' },
  { num: '03', title: 'Lancement Structuré', description: "Cadrage de la mission, recueil des informations et accès aux outils nécessaires.", color: '#C4724A' },
  { num: '04', title: 'Réalisation & Suivi', description: 'Points réguliers avec compte-rendu écrit, alertes en temps réel, ajustements en continu.', color: '#7A9E8E' },
];

function StepCard({ step, i }) {
  const { ref, onMouseMove, onMouseLeave } = use3DTilt(10);
  return (
    <motion.div
      ref={ref}
      onMouseMove={onMouseMove}
      onMouseLeave={onMouseLeave}
      initial={{ opacity: 0, y: 50, scale: 0.95 }}
      whileInView={{ opacity: 1, y: 0, scale: 1 }}
      viewport={{ once: true, margin: '-30px' }}
      transition={{ duration: 0.6, delay: i * 0.14, ease: [0.22, 1, 0.36, 1] }}
      className="group rounded-2xl p-6 text-center relative overflow-hidden cursor-default border"
      style={{ background: 'rgba(245,240,232,0.06)', borderColor: 'rgba(196,114,74,0.20)', backdropFilter: 'blur(10px)', transformStyle: 'preserve-3d' }}
    >
      <motion.p
        className="font-heading font-semibold leading-none mb-4"
        style={{ fontSize: '5rem', color: step.color, opacity: 0.7 }}
        animate={{ y: [0, -5, 0] }}
        transition={{ duration: 4 + i * 0.8, repeat: Infinity, ease: 'easeInOut' }}
      >
        {step.num}
      </motion.p>
      <div className="w-6 h-px mx-auto mb-4" style={{ background: step.color }} />
      <h3 className="font-heading font-semibold text-lg mb-3" style={{ color: '#F5F0E8' }}>{step.title}</h3>
      <p className="font-body font-light text-xs leading-relaxed" style={{ color: 'rgba(245,240,232,0.55)' }}>{step.description}</p>

      {/* Inner glow on hover */}
      <div className="absolute inset-0 rounded-2xl opacity-0 group-hover:opacity-100 transition-opacity duration-500 pointer-events-none"
        style={{ boxShadow: `inset 0 0 40px ${step.color}20` }} />
      <div className="absolute top-0 left-0 right-0 h-px opacity-0 group-hover:opacity-100 transition-opacity duration-500"
        style={{ background: `linear-gradient(90deg, transparent, ${step.color}70, transparent)` }} />

      {/* Connector line (not on last) */}
      {i < steps.length - 1 && (
        <div className="hidden md:block absolute top-1/2 -right-3 w-6 h-px opacity-20"
          style={{ background: step.color }} />
      )}
    </motion.div>
  );
}

export default function ProcessSection() {
  const sectionRef = useRef(null);
  const { scrollYProgress } = useScroll({ target: sectionRef, offset: ['start end', 'end start'] });
  const titleX = useTransform(scrollYProgress, [0, 0.5], [-30, 0]);
  const titleOpacity = useTransform(scrollYProgress, [0, 0.2], [0, 1]);

  return (
    <section ref={sectionRef} id="methode" className="relative py-32 px-6 overflow-hidden" style={{ background: '#2a343b' }}>
      <div className="max-w-6xl mx-auto">
        <motion.div
          style={{ x: titleX, opacity: titleOpacity }}
          className="text-center mb-8"
        >
          <span className="text-xs font-body font-medium tracking-[0.25em] mb-4 block uppercase" style={{ color: 'rgba(122,158,142,0.9)' }}>
            Notre méthode
          </span>
          <h2 className="font-heading font-light text-4xl md:text-6xl tracking-tight mb-4" style={{ color: '#F5F0E8' }}>
            Une méthode simple.<br /><em className="gradient-text-terre">Une exécution rigoureuse.</em>
          </h2>
          <motion.p
            initial={{ opacity: 0 }}
            whileInView={{ opacity: 1 }}
            viewport={{ once: true }}
            transition={{ duration: 1, delay: 0.3 }}
            className="font-body font-light text-sm max-w-2xl mx-auto leading-relaxed"
            style={{ color: 'rgba(245,240,232,0.5)' }}
          >
            Chaque mission est menée avec le même niveau d'exigence que les projets stratégiques des grands groupes, adapté à la réalité des PME.
          </motion.p>
        </motion.div>

        <div className="mt-20 grid md:grid-cols-4 gap-6">
          {steps.map((step, i) => <StepCard key={step.num} step={step} i={i} />)}
        </div>
      </div>
    </section>
  );
}