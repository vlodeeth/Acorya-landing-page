import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { ArrowRight, CheckCircle2 } from 'lucide-react';

export default function CTASection() {
  const [email, setEmail] = useState('');
  const [submitted, setSubmitted] = useState(false);
  const isDesktop = typeof window !== 'undefined' && window.innerWidth >= 768;

  return (
    <section id="contact" className="relative py-32 px-6 overflow-hidden" style={{ background: '#3D4A52' }}>
      {/* Animated background orbs — desktop only */}
      {isDesktop && (
        <>
          <motion.div
            animate={{ scale: [1, 1.3, 1], opacity: [0.08, 0.18, 0.08] }}
            transition={{ duration: 8, repeat: Infinity }}
            className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[600px] h-[600px] rounded-full blur-[140px] pointer-events-none"
            style={{ background: '#C4724A' }}
          />
          <motion.div
            animate={{ scale: [1.3, 1, 1.3], opacity: [0.05, 0.12, 0.05] }}
            transition={{ duration: 10, repeat: Infinity }}
            className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[400px] h-[400px] rounded-full blur-[100px] pointer-events-none"
            style={{ background: '#7A9E8E' }}
          />
        </>
      )}
      {/* Fond statique mobile */}
      {!isDesktop && (
        <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-64 h-64 rounded-full pointer-events-none"
          style={{ background: 'radial-gradient(circle, rgba(196,114,74,0.15), transparent 70%)' }} />
      )}

      <div className="relative z-10 max-w-3xl mx-auto text-center">
        <motion.div
          initial={{ opacity: 0, y: 40 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: '-60px' }}
          transition={{ duration: 0.8 }}
        >
          <span className="text-xs font-body font-medium tracking-[0.25em] text-[#7A9E8E]/80 mb-6 block uppercase">
            Échange · Sans engagement
          </span>
          <h2 className="font-heading font-light text-5xl md:text-7xl tracking-tight mb-6" style={{ color: '#F5F0E8' }}>
            Parlons de votre<br /><em className="gradient-text-terre">entreprise.</em>
          </h2>
          <p className="font-body font-light text-sm max-w-lg mx-auto mb-12 leading-relaxed" style={{ color: 'rgba(245,240,232,0.65)' }}>
            Un premier échange de 30 minutes pour comprendre votre situation et identifier vos priorités.
          </p>

          {!submitted ? (
            <form onSubmit={(e) => { e.preventDefault(); if (email) setSubmitted(true); }}
              className="flex flex-col sm:flex-row gap-3 max-w-md mx-auto">
              <input
                type="email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                placeholder="votre@email.com"
                required
                className="flex-1 px-6 py-4 rounded-xl text-sm font-body font-light
                  focus:outline-none focus:ring-1 focus:ring-[#C4724A]/40 transition-all duration-300"
                style={{ background: 'rgba(245,240,232,0.1)', border: '1px solid rgba(245,240,232,0.15)', color: '#F5F0E8' }}
              />
              <motion.button
                type="submit"
                whileHover={{ scale: 1.02 }}
                whileTap={{ scale: 0.97 }}
                className="px-8 py-4 bg-[#C4724A] text-white rounded-xl text-xs font-body font-medium tracking-[0.15em] uppercase
                  hover:bg-[#b5633c] transition-all duration-300 flex items-center justify-center gap-2 shadow-lg"
              style={{ boxShadow: '0 0 30px rgba(196,114,74,0.35), 0 4px 20px rgba(0,0,0,0.3)' }}
              >
                RÉSERVER UN ÉCHANGE <ArrowRight className="w-3.5 h-3.5" />
              </motion.button>
            </form>
          ) : (
            <motion.div
              initial={{ opacity: 0, scale: 0.95 }}
              animate={{ opacity: 1, scale: 1 }}
              className="flex items-center justify-center gap-3"
            >
              <CheckCircle2 className="w-5 h-5 text-[#7A9E8E]" />
              <span className="font-body font-light text-sm" style={{ color: 'rgba(245,240,232,0.6)' }}>
                Merci ! Nous vous recontactons très vite.
              </span>
            </motion.div>
          )}
        </motion.div>
      </div>
    </section>
  );
}