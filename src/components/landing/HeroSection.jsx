import React, { useRef, useEffect, useState } from 'react';
import { motion, useScroll, useTransform, useSpring } from 'framer-motion';
import { ArrowDown, ArrowRight } from 'lucide-react';

const HERO_BG = 'https://media.base44.com/images/public/6a203fc30c4d0d558aed809a/9a6cd9eb3_generated_image.png';

function Particle({ delay, x, y, size, color }) {
  return (
    <motion.div
      className="absolute rounded-full pointer-events-none"
      style={{ left: `${x}%`, top: `${y}%`, width: size, height: size, background: color, filter: 'blur(1px)' }}
      animate={{ y: [0, -30, 0], opacity: [0, 0.6, 0], scale: [0.5, 1, 0.5] }}
      transition={{ duration: 4 + delay, repeat: Infinity, delay, ease: 'easeInOut' }}
    />
  );
}

const PARTICLES = [
  { delay: 0, x: 15, y: 70, size: 3, color: '#C4724A' },
  { delay: 1.2, x: 30, y: 40, size: 2, color: '#7A9E8E' },
  { delay: 0.5, x: 55, y: 80, size: 4, color: '#E8C99A' },
  { delay: 2, x: 70, y: 30, size: 2, color: '#C4724A' },
  { delay: 0.8, x: 82, y: 65, size: 3, color: '#7A9E8E' },
  { delay: 1.7, x: 45, y: 20, size: 2, color: '#E8C99A' },
  { delay: 3, x: 90, y: 45, size: 3, color: '#C4724A' },
  { delay: 2.5, x: 8, y: 50, size: 2, color: '#7A9E8E' },
];

const EXPERTISES = ['Pilotage Financier', 'Structuration & Process', 'IA & Automatisation', 'Juridique', 'Achat & Pricing'];

export default function HeroSection() {
  const ref = useRef(null);
  const { scrollYProgress } = useScroll({ target: ref, offset: ['start start', 'end start'] });
  const bgY = useTransform(scrollYProgress, [0, 1], [0, 200]);
  const textY = useTransform(scrollYProgress, [0, 1], [0, 80]);
  const opacity = useTransform(scrollYProgress, [0, 0.6], [1, 0]);

  const [mouse, setMouse] = useState({ x: 0, y: 0 });
  const springX = useSpring(0, { stiffness: 60, damping: 20 });
  const springY = useSpring(0, { stiffness: 60, damping: 20 });

  useEffect(() => {
    const h = (e) => {
      const x = (e.clientX / window.innerWidth - 0.5) * 40;
      const y = (e.clientY / window.innerHeight - 0.5) * 40;
      setMouse({ x, y });
      springX.set(x);
      springY.set(y);
    };
    window.addEventListener('mousemove', h);
    return () => window.removeEventListener('mousemove', h);
  }, []);

  return (
    <section ref={ref} id="hero" className="relative min-h-screen flex items-center justify-center overflow-hidden" style={{ background: '#2a343b' }}>

      {/* Parallax BG */}
      <motion.div style={{ y: bgY }} className="absolute inset-0">
        <img src={HERO_BG} alt="" className="w-full h-full object-cover opacity-25" />
        <div className="absolute inset-0 bg-gradient-to-b from-[#2a343b]/90 via-[#3D4A52]/65 to-[#2a343b]" />
      </motion.div>

      {/* Floating particles */}
      {PARTICLES.map((p, i) => <Particle key={i} {...p} />)}

      {/* Mouse-tracking orbs */}
      <motion.div className="absolute w-[500px] h-[500px] rounded-full blur-[120px] pointer-events-none"
        style={{
          background: 'radial-gradient(circle, #C4724A, transparent 70%)',
          opacity: 0.15, top: '40%', left: '40%',
          x: springX, y: springY,
          translateX: '-50%', translateY: '-50%',
        }}
      />
      <motion.div className="absolute w-[350px] h-[350px] rounded-full blur-[90px] pointer-events-none"
        style={{
          background: 'radial-gradient(circle, #7A9E8E, transparent 70%)',
          opacity: 0.10, top: '60%', left: '60%',
          x: useSpring(0, { stiffness: 40, damping: 15 }),
          translateX: '-50%', translateY: '-50%',
        }}
      />

      {/* Content - centered layout */}
      <motion.div style={{ y: textY, opacity }} className="relative z-10 px-6 w-full flex flex-col items-center justify-center min-h-screen">
        <div className="text-center max-w-3xl">
          
          <motion.h1
            initial={{ opacity: 0, y: 40 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 1, delay: 0.2 }}
            className="font-heading font-light leading-tight mb-2"
            style={{ fontSize: 'clamp(2.5rem, 5.5vw, 4.5rem)', color: '#F5F0E8', fontWeight: 600, textTransform: 'uppercase' }}
          >
            AU CŒUR DE VOS DÉCISIONS
          </motion.h1>

          <motion.p
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 0.8, delay: 0.35 }}
            className="font-body text-base md:text-lg max-w-2xl mx-auto leading-relaxed mb-3"
            style={{ color: '#F5F0E8', fontWeight: 600 }}
          >
            Le partenaire opérationnel des dirigeants.
          </motion.p>

          <motion.p
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 0.8, delay: 0.5 }}
            className="font-body font-light text-sm md:text-base max-w-xl mx-auto leading-relaxed mb-8"
            style={{ color: 'rgba(245,240,232,0.70)' }}
          >
            Nous apportons aux dirigeants la visibilité, la structure et les outils nécessaires pour piloter leur entreprise avec confiance.
          </motion.p>

          {/* CTA buttons - smaller */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.7 }}
            className="flex flex-col sm:flex-row items-center justify-center gap-4 mb-10"
          >
            <a href="#contact" 
              className="group relative px-6 py-2.5 overflow-hidden rounded-sm text-[10px] font-body font-bold tracking-[0.2em] text-white bg-[#C4724A] transition-all duration-400 shadow-lg hover:shadow-2xl"
              style={{ boxShadow: '0 4px 20px rgba(196,114,74,0.4)' }}
              onMouseEnter={e => {
                e.currentTarget.style.boxShadow = '0 0 40px rgba(196,114,74,0.6), 0 0 80px rgba(196,114,74,0.3)';
                e.currentTarget.style.transform = 'translateY(-2px)';
              }}
              onMouseLeave={e => {
                e.currentTarget.style.boxShadow = '0 4px 20px rgba(196,114,74,0.4)';
                e.currentTarget.style.transform = 'translateY(0)';
              }}
            >
              <span className="relative z-10 flex items-center gap-2">
                RÉSERVER UN ÉCHANGE
                <ArrowRight className="w-3.5 h-3.5 transition-transform group-hover:translate-x-1" />
              </span>
              <motion.span className="absolute inset-0 bg-white/20 origin-left" initial={{ scaleX: 0 }}
                whileHover={{ scaleX: 1 }} transition={{ duration: 0.4 }} />
            </a>
            <a href="#methode"
              className="px-6 py-2.5 glass-dark rounded-sm text-[10px] font-body font-medium tracking-[0.15em] transition-all duration-300 relative overflow-hidden group border border-white/10"
              style={{ color: 'rgba(245,240,232,0.7)' }}
              onMouseEnter={e => {
                e.currentTarget.style.color = '#F5F0E8';
                e.currentTarget.style.borderColor = 'rgba(196,114,74,0.4)';
                e.currentTarget.style.background = 'rgba(61,74,82,0.7)';
              }}
              onMouseLeave={e => {
                e.currentTarget.style.color = 'rgba(245,240,232,0.7)';
                e.currentTarget.style.borderColor = 'rgba(255,255,255,0.1)';
                e.currentTarget.style.background = 'rgba(61,74,82,0.4)';
              }}>
              NOTRE MÉTHODE
              <motion.span className="absolute bottom-0 left-0 h-px bg-[#7A9E8E] origin-left"
                initial={{ scaleX: 0 }} whileHover={{ scaleX: 1 }} transition={{ duration: 0.3 }} />
            </a>
          </motion.div>


        </div>
      </motion.div>

      {/* Scroll indicator */}
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 1.5 }}
        className="absolute bottom-8 left-1/2 -translate-x-1/2 flex flex-col items-center gap-3 cursor-pointer pointer-events-auto z-20"
        onClick={() => {
          const el = document.getElementById('pourquoi');
          if (el) {
            const top = el.getBoundingClientRect().top + window.scrollY - 80;
            window.scrollTo({ top, behavior: 'smooth' });
          }
        }}
      >
        <div className="flex flex-col items-center gap-1">
          <motion.div className="w-px h-8 origin-top"
            style={{ background: 'linear-gradient(to bottom, transparent, #C4724A)' }}
            animate={{ scaleY: [0, 1, 0], opacity: [0, 1, 0] }}
            transition={{ duration: 2, repeat: Infinity, ease: 'easeInOut' }} />
          <motion.div animate={{ y: [0, 6, 0] }} transition={{ duration: 2, repeat: Infinity }}>
            <ArrowDown className="w-3 h-3 text-[#C4724A]/50" />
          </motion.div>
        </div>
        <span className="text-[8px] font-body tracking-[0.3em] text-foreground/20">SCROLL</span>
      </motion.div>
    </section>
  );
}