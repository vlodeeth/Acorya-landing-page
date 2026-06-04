import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Menu, X } from 'lucide-react';

const navLinks = [
  { label: 'Pourquoi', href: '#pourquoi' },
  { label: 'Expertises', href: '#expertises' },
  { label: 'Méthode', href: '#methode' },
  { label: 'Équipe', href: '#equipe' },
];

// ID de la section Hero uniquement (première section)
const DARK_SECTIONS = ['hero'];

export default function Navbar() {
  const [mobileOpen, setMobileOpen] = useState(false);
  const [isDark, setIsDark] = useState(true); // Hero est sombre par défaut

  useEffect(() => {
    // On observe quelles sections sombres sont visibles dans le viewport
    const observers = [];

    const visibleDark = new Set();

    DARK_SECTIONS.forEach((id) => {
      const el = document.getElementById(id);
      if (!el) return;

      const obs = new IntersectionObserver(
        ([entry]) => {
          if (entry.isIntersecting) {
            visibleDark.add(id);
          } else {
            visibleDark.delete(id);
          }
          setIsDark(visibleDark.size > 0);
        },
        { threshold: 0.15 }
      );
      obs.observe(el);
      observers.push(obs);
    });

    return () => observers.forEach((o) => o.disconnect());
  }, []);

  // isDark = Hero visible → barre transparente + logo orange
  // !isDark = reste du site → barre crème + logo bleu
  const barStyle = isDark
    ? {
        background: 'transparent',
        border: 'none',
        borderRadius: '0',
        transition: 'background 0.4s, border-color 0.4s, box-shadow 0.4s',
      }
    : {
        background: 'rgba(245, 240, 232, 0.96)',
        backdropFilter: 'blur(20px)',
        WebkitBackdropFilter: 'blur(20px)',
        border: 'none',
        borderRadius: '0',
        boxShadow: '0 2px 20px rgba(61,74,82,0.08)',
        transition: 'background 0.4s, border-color 0.4s, box-shadow 0.4s',
      };

  const linkColor = isDark ? '#F5F0E8' : '#3D4A52';
  const linkHoverClass = isDark ? 'hover:text-white' : 'hover:text-[#C4724A]';
  const ctaBorder = isDark ? 'rgba(245,240,232,0.6)' : '#3D4A52';
  const ctaColor = isDark ? '#C4724A' : '#3D4A52';
  const ctaHover = isDark ? 'hover:bg-[#F5F0E8] hover:text-[#3D4A52]' : 'hover:bg-[#3D4A52] hover:text-white';
  const logoSrc = isDark
    ? 'https://media.base44.com/images/public/6a203fc30c4d0d558aed809a/373c20299_Logoorange.svg'
    : 'https://media.base44.com/images/public/6a203fc30c4d0d558aed809a/4128de782_Logobleu.svg';
  const mobileToggleColor = isDark ? 'text-white/70 hover:text-white' : 'text-[#3D4A52]/70 hover:text-[#3D4A52]';

  return (
    <>
      <motion.nav
        initial={{ y: -80, opacity: 0 }}
        animate={{ y: 0, opacity: 1 }}
        transition={{ duration: 0.6, ease: [0.22, 1, 0.36, 1] }}
        className="fixed top-0 left-0 right-0 z-50 flex justify-center"
      >
        <div
          className="w-full h-16 flex items-center justify-between px-10"
          style={barStyle}
        >
          {/* Logo */}
          <a href="#hero" className="flex items-center flex-shrink-0">
            <img
              src={logoSrc}
              alt="ACORYA"
              className="w-auto transition-all duration-400"
              style={{ height: '72px', maxHeight: '72px', objectFit: 'contain' }}
            />
          </a>

          {/* Desktop links */}
          <div className="hidden md:flex items-center gap-3">
            {navLinks.map((link) => (
              <a
                key={link.href}
                href={link.href}
                className={`text-[15px] font-body font-semibold transition-all duration-300 px-5 py-2.5 rounded-full ${linkHoverClass}`}
                style={{ color: linkColor, letterSpacing: '0.02em' }}
                onMouseEnter={e => {
                  e.currentTarget.style.background = isDark ? 'rgba(245,240,232,0.1)' : 'rgba(196,114,74,0.1)';
                }}
                onMouseLeave={e => {
                  e.currentTarget.style.background = 'transparent';
                }}
              >
                {link.label}
              </a>
            ))}
          </div>

          {/* CTA */}
          <div className="hidden md:flex items-center">
            <a
              href="#contact"
              className={`px-7 py-3 text-[15px] font-body font-semibold rounded-full transition-all duration-300 ${ctaHover}`}
              style={{ 
                color: ctaColor, 
                borderColor: ctaBorder, 
                letterSpacing: '0.02em',
                background: isDark ? 'transparent' : 'rgba(61,74,82,0.05)'
              }}
              onMouseEnter={e => {
                e.currentTarget.style.background = isDark ? 'rgba(196,114,74,0.2)' : '#3D4A52';
                e.currentTarget.style.color = isDark ? '#F5F0E8' : '#FFFFFF';
                e.currentTarget.style.borderColor = isDark ? 'rgba(196,114,74,0.4)' : '#3D4A52';
              }}
              onMouseLeave={e => {
                e.currentTarget.style.background = isDark ? 'transparent' : 'rgba(61,74,82,0.05)';
                e.currentTarget.style.color = ctaColor;
                e.currentTarget.style.borderColor = ctaBorder;
              }}
            >
              Contact
            </a>
          </div>

          {/* Mobile toggle */}
          <button onClick={() => setMobileOpen(!mobileOpen)} className={`md:hidden transition-colors ${mobileToggleColor}`}>
            {mobileOpen ? <X size={22} /> : <Menu size={22} />}
          </button>
        </div>
      </motion.nav>

      {/* Mobile menu */}
      <AnimatePresence>
        {mobileOpen && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 z-40 flex flex-col items-center justify-center gap-8"
            style={{ background: 'rgba(20,26,30,0.97)', backdropFilter: 'blur(30px)' }}
          >
            <button onClick={() => setMobileOpen(false)} className="absolute top-5 right-6">
              <X size={22} className="text-white/50 hover:text-white transition-colors" />
            </button>
            {navLinks.map((link, i) => (
              <motion.a
                key={link.href}
                href={link.href}
                onClick={() => setMobileOpen(false)}
                initial={{ opacity: 0, y: 16 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: i * 0.07 }}
                className="font-heading text-3xl font-light tracking-widest hover:text-[#C4724A] transition-colors"
                style={{ color: 'rgba(245,240,232,0.85)' }}
              >
                {link.label}
              </motion.a>
            ))}
            <motion.a
              href="#contact"
              onClick={() => setMobileOpen(false)}
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ delay: 0.35 }}
              className="mt-4 px-8 py-3 rounded-full border text-sm font-body font-light"
              style={{ color: '#F5F0E8', borderColor: 'rgba(255,255,255,0.3)' }}
            >
              Contact
            </motion.a>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
}