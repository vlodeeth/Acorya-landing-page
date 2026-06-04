import React from 'react';
import { motion } from 'framer-motion';
import { ChevronDown } from 'lucide-react';

export default function SectionArrow({ targetId, fromDark = false }) {
  const handleClick = () => {
    const el = document.getElementById(targetId);
    if (el) {
      const top = el.getBoundingClientRect().top + window.scrollY - 80;
      window.scrollTo({ top, behavior: 'smooth' });
    }
  };

  // bg matches the section ABOVE this arrow
  const bg = fromDark ? '#2a343b' : '#F5F0E8';
  const lineColor = fromDark
    ? 'linear-gradient(to bottom, transparent, rgba(245,240,232,0.35))'
    : 'linear-gradient(to bottom, transparent, rgba(196,114,74,0.5))';
  const chevronColor = fromDark ? 'rgba(245,240,232,0.35)' : 'rgba(196,114,74,0.5)';

  return (
    <div className="flex justify-center py-6" style={{ background: bg }}>
      <motion.button
        onClick={handleClick}
        animate={{ y: [0, 8, 0] }}
        transition={{ duration: 2, repeat: Infinity, ease: 'easeInOut' }}
        whileHover={{ scale: 1.15 }}
        className="flex flex-col items-center gap-1 group focus:outline-none"
        aria-label="Section suivante"
      >
        <motion.div
          className="w-px h-6 origin-top"
          style={{ background: lineColor }}
          animate={{ scaleY: [0, 1, 0], opacity: [0, 1, 0] }}
          transition={{ duration: 2, repeat: Infinity, ease: 'easeInOut' }}
        />
        <ChevronDown
          className="w-5 h-5 transition-colors duration-300 group-hover:scale-110"
          style={{ color: chevronColor }}
        />
      </motion.button>
    </div>
  );
}