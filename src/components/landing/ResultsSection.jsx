import React from 'react';
import { motion } from 'framer-motion';
import { Eye, TrendingUp, Clock } from 'lucide-react';

const results = [
  {
    icon: Eye,
    title: 'Retrouver de la visibilité',
    body: 'Comprendre la rentabilité réelle de l\'entreprise, anticiper la trésorerie et prendre des décisions éclairées.',
    color: '#C4724A',
  },
  {
    icon: TrendingUp,
    title: 'Structurer la croissance',
    body: 'Clarifier l\'organisation, fluidifier les opérations et préparer le développement de l\'entreprise.',
    color: '#7A9E8E',
  },
  {
    icon: Clock,
    title: 'Gagner du temps',
    body: 'Réduire les tâches à faible valeur ajoutée grâce à l\'automatisation et à des processus adaptés.',
    color: '#C4724A',
  },
];

export default function ResultsSection() {
  return (
    <section className="relative py-28 px-6 overflow-hidden" style={{ background: '#F5F0E8' }}>
      <div className="max-w-5xl mx-auto">
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: '-80px' }}
          transition={{ duration: 0.8 }}
          className="text-center mb-16"
        >
          <span className="text-xs font-body font-medium tracking-[0.25em] uppercase mb-4 block" style={{ color: 'rgba(122,158,142,0.9)' }}>
            Ce que recherchent nos clients
          </span>
          <h2 className="font-heading font-light text-3xl md:text-5xl tracking-tight" style={{ color: '#3D4A52' }}>
            Des résultats concrets,<br /><em className="gradient-text-terre">pas des livrables.</em>
          </h2>
        </motion.div>

        <div className="grid md:grid-cols-3 gap-6">
          {results.map((r, i) => (
            <motion.div
              key={i}
              initial={{ opacity: 0, y: 40, scale: 0.95 }}
              whileInView={{ opacity: 1, y: 0, scale: 1 }}
              viewport={{ once: true, margin: '-40px' }}
              transition={{ duration: 0.6, delay: i * 0.12, ease: [0.22, 1, 0.36, 1] }}
              whileHover={{ y: -8, boxShadow: '0 12px 48px rgba(61,74,82,0.12)' }}
              className="group rounded-2xl p-8 border relative overflow-hidden"
              style={{ background: 'rgba(255,255,255,0.8)', borderColor: 'rgba(196,114,74,0.15)', boxShadow: '0 4px 32px rgba(61,74,82,0.07)' }}
            >
              <motion.div 
                className="w-10 h-10 rounded-xl flex items-center justify-center mb-6"
                style={{ background: `${r.color}25` }}
                whileHover={{ scale: 1.1, background: `${r.color}35` }}
                transition={{ duration: 0.3 }}
              >
                <r.icon className="w-5 h-5" style={{ color: r.color }} />
              </motion.div>
              <motion.div 
                className="w-6 h-px mb-4" 
                style={{ background: r.color }}
                initial={{ width: 0 }}
                whileInView={{ width: '1.5rem' }}
                viewport={{ once: true }}
                transition={{ duration: 0.6, delay: 0.3 + i * 0.1 }}
              />
              <h3 className="font-heading font-semibold text-xl mb-3" style={{ color: '#3D4A52' }}>{r.title}</h3>
              <p className="font-body font-light text-sm leading-relaxed" style={{ color: 'rgba(61,74,82,0.65)' }}>{r.body}</p>
              <motion.div 
                className="absolute -bottom-10 -right-10 w-32 h-32 rounded-full blur-[50px] opacity-0 group-hover:opacity-15 transition-opacity duration-500 pointer-events-none"
                style={{ background: r.color }}
              />
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}