import { useRef, useCallback } from 'react';

/**
 * Returns { ref, onMouseMove, onMouseLeave }
 * Apply to a motion.div — the element will tilt in 3D on hover.
 */
export function use3DTilt(strength = 12) {
  const ref = useRef(null);
  const isMobile = typeof window !== 'undefined' && window.innerWidth < 1024;

  const onMouseMove = useCallback((e) => {
    if (isMobile) return;
    const el = ref.current;
    if (!el) return;
    const rect = el.getBoundingClientRect();
    const x = (e.clientX - rect.left) / rect.width - 0.5;
    const y = (e.clientY - rect.top) / rect.height - 0.5;
    el.style.transform = `perspective(800px) rotateY(${x * strength}deg) rotateX(${-y * strength}deg) translateZ(8px)`;
    el.style.transition = 'transform 0.1s ease-out';
  }, [strength]);

  const onMouseLeave = useCallback(() => {
    const el = ref.current;
    if (!el) return;
    el.style.transform = 'perspective(800px) rotateY(0deg) rotateX(0deg) translateZ(0px)';
    el.style.transition = 'transform 0.6s cubic-bezier(0.23, 1, 0.32, 1)';
  }, []);

  return { ref, onMouseMove, onMouseLeave };
}