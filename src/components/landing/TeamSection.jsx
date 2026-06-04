import React from 'react';
import { motion } from 'framer-motion';
import { use3DTilt } from '@/hooks/use3DTilt';

const team = [
  {
    name: 'Vincent Risso',
    role: 'Directeur Général',
    tags: ['Expérience terrain', 'Pilotage financier', 'Direction opérationnelle'],
    description: "Plus de 10 ans de direction d'entreprise et de pilotage de projets complexes. Vincent prend le lead opérationnel et commercial sur chaque mission. Sa vision : des solutions concrètes, pas des rapports.",
    color: '#C4724A',
    initial: 'VR',
  },
  {
    name: 'Valentin Laude',
    role: 'Président',
    tags: ['Structuration', 'Pilotage', 'Développement'],
    description: "Entrepreneur et chef de projet, spécialiste de la structuration et de l'automatisation. Valentin conçoit les outils de pilotage et les systèmes qui permettent aux dirigeants de reprendre le contrôle.",
    color: '#7A9E8E',
    initial: 'VL',
  },
];

function MemberCard({ member, i }) {
  const { ref, onMouseMove, onMouseLeave } = use3DTilt(8);
  return (
    <motion.div
      ref={ref}
      onMouseMove={onMouseMove}
      onMouseLeave={onMouseLeave}
      initial={{ opacity: 0, y: 50, scale: 0.96 }}
      whileInView={{ opacity: 1, y: 0, scale: 1 }}
      viewport={{ once: true }}
      transition={{ duration: 0.7, delay: i * 0.18, ease: [0.22, 1, 0.36, 1] }}
      className="group rounded-2xl p-7 relative overflow-hidden cursor-default border"
      style={{ background: 'rgba(255,255,255,0.8)', borderColor: 'rgba(196,114,74,0.18)', boxShadow: '0 4px 32px rgba(61,74,82,0.08)', transformStyle: 'preserve-3d' }}
    >
      {/* Portrait placeholder — à remplacer par photo pro */}
      <div className="w-full h-44 rounded-xl mb-6 flex items-center justify-center relative overflow-hidden"
        style={{ background: `linear-gradient(135deg, ${member.color}20, ${member.color}08)`, border: `1px solid ${member.color}25` }}>
        <div className="absolute inset-0 flex items-center justify-center">
          <span className="font-heading font-light" style={{ fontSize: '4rem', color: member.color, opacity: 0.25 }}>{member.initial}</span>
        </div>
        <span className="relative z-10 text-[9px] font-body tracking-[0.2em] uppercase" style={{ color: `${member.color}70` }}>Portrait à venir</span>
      </div>

      <div className="flex items-start justify-between mb-3">
        <div>
          <h3 className="font-heading font-semibold text-2xl mb-0.5" style={{ color: '#3D4A52' }}>{member.name}</h3>
          <p className="text-[9px] font-body font-medium tracking-[0.18em]" style={{ color: member.color }}>
            {member.role.toUpperCase()}
          </p>
        </div>
        <div className="w-10 h-10 rounded-xl flex items-center justify-center flex-shrink-0 mt-1"
          style={{ background: `${member.color}15`, color: member.color, fontFamily: 'var(--font-heading)', fontSize: '1rem', fontWeight: 300 }}>
          {member.initial}
        </div>
      </div>

      {/* Tags */}
      <div className="flex flex-wrap gap-1.5 mb-4">
        {member.tags.map((tag) => (
          <span key={tag} className="text-[8px] font-body font-medium tracking-[0.15em] uppercase px-2.5 py-1 rounded-full"
            style={{ background: `${member.color}15`, color: member.color }}>
            {tag}
          </span>
        ))}
      </div>

      <div className="w-8 h-px mb-4" style={{ background: member.color, opacity: 0.5 }} />
      <p className="font-body font-light text-sm leading-relaxed" style={{ color: 'rgba(61,74,82,0.65)' }}>{member.description}</p>

      <div className="absolute -bottom-20 -right-20 w-48 h-48 rounded-full blur-[60px] opacity-0 group-hover:opacity-15 transition-opacity duration-700"
        style={{ background: member.color }} />
      <div className="absolute top-0 left-0 right-0 h-px opacity-0 group-hover:opacity-100 transition-opacity duration-500"
        style={{ background: `linear-gradient(90deg, transparent, ${member.color}40, transparent)` }} />
    </motion.div>
  );
}

export default function TeamSection() {
  return (
    <section className="relative py-32 px-6 overflow-hidden" style={{ background: '#F5F0E8' }}>
      <div className="max-w-4xl mx-auto">
        <motion.div
          initial={{ opacity: 0, y: 40 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: '-100px' }}
          transition={{ duration: 0.8 }}
          className="text-center mb-20"
        >
          <span className="text-xs font-body font-medium tracking-[0.25em] text-[#C4724A]/80 mb-4 block uppercase">
            L'Équipe
          </span>
          <h2 className="font-heading font-light text-4xl md:text-5xl tracking-tight mb-4" style={{ color: '#3D4A52' }}>
            Des personnes <em className="gradient-text-terre">engagées</em>,<br />pas des consultants de passage.
          </h2>
          <p className="font-body font-light text-sm max-w-md mx-auto" style={{ color: 'rgba(61,74,82,0.6)' }}>
            Le conseil se vend par les personnes. Voici celles avec qui vous travaillerez.
          </p>
        </motion.div>

        <div className="grid md:grid-cols-2 gap-8">
          {team.map((member, i) => (
            <MemberCard key={member.name} member={member} i={i} />
          ))}
        </div>
      </div>
    </section>
  );
}