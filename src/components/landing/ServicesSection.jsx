import React, { useState, useRef } from 'react';
import { motion, AnimatePresence, useScroll, useTransform } from 'framer-motion';
import { TrendingUp, Cpu, Scale, Coins, ShoppingCart } from 'lucide-react';

const SERVICES_BG = 'https://media.base44.com/images/public/6a203fc30c4d0d558aed809a/737506674_generated_image.png';

const services = [
  { icon: TrendingUp, tag: 'FINANCE', title: 'Pilotage Financier', description: 'Tableaux de bord, analyse des marges réelles, trésorerie prévisionnelle, reporting mensuel de direction, projection financière.', color: '#C4724A' },
  { icon: Cpu, tag: 'ORGANISATION', title: 'Structuration & Process', description: "Audit organisationnel, déploiement de process opérationnels, sélection et mise en place des outils de suivi et contrôle.", color: '#7A9E8E' },
  { icon: ShoppingCart, tag: 'TECHNOLOGIE', title: 'IA & Automatisation', description: "Formation à l'IA générative, cartographie des tâches automatisables, déploiement et connexion des outils adaptés.", color: '#C4724A' },
  { icon: Scale, tag: 'JURIDIQUE', title: 'Accompagnement Juridique', description: 'Gestion contractuelle, relations clients et fournisseurs, protection du dirigeant. Conseil opérationnel uniquement.', color: '#7A9E8E' },
  { icon: Coins, tag: 'ACHATS', title: 'Achat & Pricing', description: "Audit achat, consultation fournisseurs, négociation des prix, catalogue tarifaire, conditions générales de vente et d'achat.", color: '#C4724A' },
];

export default function ServicesSection() {
  const [active, setActive] = useState(0);
  const sectionRef = useRef(null);
  const { scrollYProgress } = useScroll({ target: sectionRef, offset: ['start end', 'end start'] });
  const bgScale = useTransform(scrollYProgress, [0, 1], [1.05, 1.15]);
  const bgOpacity = useTransform(scrollYProgress, [0, 0.3, 0.7, 1], [0, 0.12, 0.12, 0]);

  return (
    <section ref={sectionRef} id="expertises" className="relative py-32 px-6 overflow-hidden" style={{ background: '#2a343b' }}>
      {/* Parallax BG */}
      <motion.div className="absolute inset-0" style={{ scale: bgScale }}>
        <motion.img src={SERVICES_BG} alt="" className="w-full h-full object-cover" style={{ opacity: bgOpacity }} />
      </motion.div>
      <div className="absolute inset-0 pointer-events-none" style={{ background: 'linear-gradient(to bottom, #2a343b, rgba(42,52,59,0.95), #2a343b)' }} />

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
            5 Domaines d'Expertise
          </motion.span>
          <h2 className="font-heading font-light text-4xl md:text-6xl tracking-tight mb-4" style={{ color: '#F5F0E8' }}>
            Une direction <em className="gradient-text-terre">complète</em>
            <br />à vos côtés.
          </h2>
          <p className="font-body font-light text-sm max-w-md mx-auto" style={{ color: 'rgba(245,240,232,0.45)' }}>
            Cinq domaines d'expertise pour accompagner les décisions qui comptent.
          </p>
        </motion.div>

        <div className="grid lg:grid-cols-[1fr_1.2fr] gap-8 items-start">
          {/* List */}
          <div className="space-y-2">
            {services.map((s, i) => (
              <motion.button
                key={s.title}
                initial={{ opacity: 0, x: -40 }}
                whileInView={{ opacity: 1, x: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.5, delay: i * 0.09, ease: [0.22, 1, 0.36, 1] }}
                onClick={() => setActive(i)}
                className={`w-full text-left p-5 rounded-xl transition-all duration-400 flex items-center gap-4`}
                style={active === i
                  ? { background: 'rgba(245,240,232,0.08)', border: '1px solid rgba(196,114,74,0.25)', backdropFilter: 'blur(10px)' }
                  : { background: 'transparent', border: '1px solid transparent' }}
              >
                <motion.div
                  animate={{ scale: active === i ? 1.1 : 1 }}
                  transition={{ duration: 0.3 }}
                  className="w-10 h-10 rounded-lg flex items-center justify-center flex-shrink-0"
                  style={{ background: active === i ? `${s.color}20` : 'rgba(255,255,255,0.03)' }}
                >
                  <s.icon className="w-5 h-5 transition-colors"
                    style={{ color: active === i ? s.color : 'rgba(255,255,255,0.2)' }} />
                </motion.div>
                <div>
                  <span className="text-[8px] font-body font-medium tracking-[0.2em] block mb-0.5"
                    style={{ color: active === i ? s.color : 'rgba(245,240,232,0.3)' }}>{s.tag}</span>
                  <span className="font-heading font-semibold text-lg transition-colors"
                    style={{ color: active === i ? '#F5F0E8' : 'rgba(245,240,232,0.35)' }}>{s.title}</span>
                </div>
                {active === i && (
                  <motion.div layoutId="service-indicator" className="ml-auto w-1 h-8 rounded-full"
                    style={{ background: s.color }} />
                )}
              </motion.button>
            ))}
          </div>

          {/* Detail panel */}
          <AnimatePresence mode="wait">
            <motion.div
              key={active}
              initial={{ opacity: 0, y: 24, rotateX: 8 }}
              animate={{ opacity: 1, y: 0, rotateX: 0 }}
              exit={{ opacity: 0, y: -24, rotateX: -8 }}
              transition={{ duration: 0.45, ease: [0.22, 1, 0.36, 1] }}
              className="rounded-2xl p-10 relative overflow-hidden border"
              style={{ background: 'rgba(245,240,232,0.06)', borderColor: 'rgba(196,114,74,0.25)', backdropFilter: 'blur(12px)', transformStyle: 'preserve-3d' }}
            >
              {/* Animated glow orb */}
              <motion.div
                animate={{ scale: [1, 1.2, 1], opacity: [0.08, 0.15, 0.08] }}
                transition={{ duration: 4, repeat: Infinity }}
                className="absolute top-0 right-0 w-48 h-48 rounded-full blur-[80px] pointer-events-none"
                style={{ background: services[active].color }}
              />

              <span className="text-[8px] font-body font-medium tracking-[0.2em] block mb-6"
                style={{ color: services[active].color }}>{services[active].tag}</span>

              <motion.div
                animate={{ rotate: [0, 5, 0] }}
                transition={{ duration: 6, repeat: Infinity, ease: 'easeInOut' }}
                className="w-12 h-12 rounded-xl flex items-center justify-center mb-6"
                style={{ background: `${services[active].color}15` }}
              >
                {React.createElement(services[active].icon, {
                  className: 'w-6 h-6', style: { color: services[active].color }
                })}
              </motion.div>

              <h3 className="font-heading font-semibold text-3xl mb-4" style={{ color: '#F5F0E8' }}>{services[active].title}</h3>
              <p className="font-body font-light text-sm leading-relaxed mb-8" style={{ color: 'rgba(245,240,232,0.6)' }}>
                {services[active].description}
              </p>

              <motion.a
                href="#contact"
                whileHover={{ gap: '1rem', paddingLeft: '1.75rem', paddingRight: '1.75rem' }}
                className="inline-flex items-center gap-2 px-6 py-3 rounded-sm text-xs font-body font-medium tracking-[0.15em] transition-colors duration-300"
                style={{ background: `${services[active].color}15`, color: services[active].color }}
              >
                PRENDRE CONTACT <span>→</span>
              </motion.a>
            </motion.div>
          </AnimatePresence>
        </div>
      </div>
    </section>
  );
}