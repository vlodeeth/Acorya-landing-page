import React, { useRef, useEffect } from 'react';
import { motion, useScroll, useTransform, useSpring } from 'framer-motion';
import { ArrowDown, ArrowRight } from 'lucide-react';

const HERO_BG = 'https://media.base44.com/images/public/6a203fc30c4d0d558aed809a/9a6cd9eb3_generated_image.png';

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

// Version desktop avec tous les effets
function HeroDesktop() {
  const ref = useRef(null);
  const { scrollYProgress } = useScroll({ target: ref, offset: ['start start', 'end start'] });
  const bgY = useTransform(scrollYProgress, [0, 1], [0, 200]);
  const textY = useTransform(scrollYProgress, [0, 1], [0, 80]);
  const opacity = useTransform(scrollYProgress, [0, 0.6], [1, 0]);
  const springX = useSpring(0, { stiffness: 60, damping: 20 });
  const springY = useSpring(0, { stiffness: 60, damping: 20 });

  useEffect(() => {
    const h = (e) => {
      springX.set((e.clientX / window.innerWidth - 0.5) * 40);
      springY.set((e.clientY / window.innerHeight - 0.5) * 40);
    };
    window.addEventListener('mousemove', h);
    return () => window.removeEventListener('mousemove', h);
  }, []);

  return (
    <section ref={ref} id="hero" className="relative min-h-screen flex items-center justify-center overflow-hidden" style={{ background: '#2a343b' }}>
      <motion.div style={{ y: bgY }} className="absolute inset-0">
        <img src={HERO_BG} alt="" className="w-full h-full object-cover opacity-25" loading="lazy" />
        <div className="absolute inset-0 bg-gradient-to-b from-[#2a343b]/90 via-[#3D4A52]/65 to-[#2a343b]" />
      </motion.div>

      {PARTICLES.map((p, i) => (
        <motion.div key={i}
          className="absolute rounded-full pointer-events-none"
          style={{ left: `${p.x}%`, top: `${p.y}%`, width: p.size, height: p.size, background: p.color, filter: 'blur(1px)' }}
          animate={{ y: [0, -30, 0], opacity: [0, 0.6, 0], scale: [0.5, 1, 0.5] }}
          transition={{ duration: 4 + p.delay, repeat: Infinity, delay: p.delay, ease: 'easeInOut' }}
        />
      ))}

      <motion.div className="absolute w-[500px] h-[500px] rounded-full blur-[120px] pointer-events-none"
        style={{ background: 'radial-gradient(circle, #C4724A, transparent 70%)', opacity: 0.15, top: '40%', left: '40%', x: springX, y: springY, translateX: '-50%', translateY: '-50%' }}
      />

      <motion.div style={{ y: textY, opacity }} className="relative z-10 px-6 w-full flex flex-col items-center justify-center min-h-screen">
        <HeroContent />
      </motion.div>

      <HeroScrollIndicator />
    </section>
  );
}

// Version mobile allégée — zéro animation en boucle, zéro scroll JS
function HeroMobile() {
  return (
    <section id="hero" className="relative min-h-screen flex items-center justify-center overflow-hidden" style={{ background: '#2a343b' }}>
      <div className="absolute inset-0">
        <img src={HERO_BG} alt="" className="w-full h-full object-cover opacity-20" loading="lazy" />
        <div className="absolute inset-0 bg-gradient-to-b from-[#2a343b]/90 via-[#3D4A52]/65 to-[#2a343b]" />
      </div>

      <div className="relative z-10 px-6 w-full flex flex-col items-center justify-center min-h-screen">
        <HeroContent />
      </div>

      <HeroScrollIndicator />
    </section>
  );
}

function HeroContent() {
  return (
    <div className="text-center max-w-3xl">
      <motion.h1
        initial={{ opacity: 0, y: 40 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.8, delay: 0.1 }}
        className="font-heading font-light leading-tight mb-2"
        style={{ fontSize: 'clamp(2rem, 5.5vw, 4.5rem)', color: '#F5F0E8', fontWeight: 600, textTransform: 'uppercase' }}
      >
        AU CŒUR DE VOS DÉCISIONS
      </motion.h1>

      <motion.p
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ duration: 0.6, delay: 0.3 }}
        className="font-body text-base md:text-lg max-w-2xl mx-auto leading-relaxed mb-3"
        style={{ color: '#F5F0E8', fontWeight: 600 }}
      >
        Le partenaire opérationnel des dirigeants.
      </motion.p>

      <motion.p
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ duration: 0.6, delay: 0.45 }}
        className="font-body font-light text-sm md:text-base max-w-xl mx-auto leading-relaxed mb-8"
        style={{ color: 'rgba(245,240,232,0.70)' }}
      >
        Nous apportons aux dirigeants la visibilité, la structure et les outils nécessaires pour piloter leur entreprise avec confiance.
      </motion.p>

      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.6, delay: 0.6 }}
        className="flex flex-col sm:flex-row items-center justify-center gap-4 mb-10"
      >
        <a href="#contact"
          className="px-6 py-2.5 text-[10px] font-body font-bold tracking-[0.2em] text-white bg-[#C4724A] rounded-sm flex items-center gap-2"
          style={{ boxShadow: '0 4px 20px rgba(196,114,74,0.4)' }}
        >
          RÉSERVER UN ÉCHANGE <ArrowRight className="w-3.5 h-3.5" />
        </a>
        <a href="#methode"
          className="px-6 py-2.5 text-[10px] font-body font-medium tracking-[0.15em] rounded-sm border border-white/10"
          style={{ color: 'rgba(245,240,232,0.7)', background: 'rgba(61,74,82,0.4)' }}
        >
          NOTRE MÉTHODE
        </a>
      </motion.div>
    </div>
  );
}

function HeroScrollIndicator() {
  return (
    <div
      className="absolute bottom-8 left-1/2 -translate-x-1/2 flex flex-col items-center gap-3 cursor-pointer z-20"
      onClick={() => {
        const el = document.getElementById('pourquoi');
        if (el) window.scrollTo({ top: el.getBoundingClientRect().top + window.scrollY - 80, behavior: 'smooth' });
      }}
    >
      <div className="flex flex-col items-center gap-1">
        <div className="w-px h-8" style={{ background: 'linear-gradient(to bottom, transparent, #C4724A)' }} />
        <ArrowDown className="w-3 h-3 text-[#C4724A]/50" />
      </div>
      <span className="text-[8px] font-body tracking-[0.3em] text-foreground/20">SCROLL</span>
    </div>
  );
}

export default function HeroSection() {
  const isMobile = typeof window !== 'undefined' && window.innerWidth < 768;
  return isMobile ? <HeroMobile /> : <HeroDesktop />;
}
