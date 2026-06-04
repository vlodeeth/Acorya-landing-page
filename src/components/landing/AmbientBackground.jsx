import React, { useEffect, useRef } from 'react';

function AmbientCanvas() {
  const canvasRef = useRef(null);

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext('2d');

    let W = canvas.width = window.innerWidth;
    let H = canvas.height = window.innerHeight;
    let raf;

    const resize = () => {
      W = canvas.width = window.innerWidth;
      H = canvas.height = window.innerHeight;
    };
    window.addEventListener('resize', resize);

    const STARS = Array.from({ length: 80 }, () => ({
      x: Math.random() * W,
      y: Math.random() * H,
      r: Math.random() * 1.0 + 0.2,
      speed: Math.random() * 0.2 + 0.04,
      color: Math.random() > 0.5 ? '#C4724A' : Math.random() > 0.5 ? '#7A9E8E' : '#3D4A52',
      alpha: Math.random() * 0.18 + 0.04,
      pulse: Math.random() * Math.PI * 2,
    }));

    const draw = () => {
      ctx.clearRect(0, 0, W, H);
      STARS.forEach(s => {
        s.pulse += 0.02;
        const a = s.alpha * (0.5 + 0.5 * Math.sin(s.pulse));
        ctx.beginPath();
        ctx.arc(s.x, s.y, s.r, 0, Math.PI * 2);
        ctx.fillStyle = s.color;
        ctx.globalAlpha = a;
        ctx.fill();
        s.y -= s.speed;
        if (s.y < -4) { s.y = H + 4; s.x = Math.random() * W; }
      });
      ctx.globalAlpha = 1;
      raf = requestAnimationFrame(draw);
    };
    draw();

    return () => { cancelAnimationFrame(raf); window.removeEventListener('resize', resize); };
  }, []);

  return (
    <canvas
      ref={canvasRef}
      className="fixed inset-0 pointer-events-none z-0"
      style={{ mixBlendMode: 'screen' }}
      aria-hidden
    />
  );
}

export default function AmbientBackground() {
  // Ne rendre le canvas que sur desktop
  if (typeof window !== 'undefined' && window.innerWidth < 1024) return null;
  return <AmbientCanvas />;
}
