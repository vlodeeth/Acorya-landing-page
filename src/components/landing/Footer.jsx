import React from 'react';

export default function Footer() {
  const currentYear = new Date().getFullYear();
  return (
    <footer className="relative py-4 px-6" style={{ background: '#F5F0E8', borderTop: '1px solid rgba(61,74,82,0.08)' }}>
      <div className="max-w-6xl mx-auto flex items-center justify-between gap-4">
        <p className="text-[8px] font-body font-semibold tracking-[0.2em] uppercase"
          style={{ color: '#3D4A52' }}>
          © {currentYear} ACORYA
        </p>
        <div className="flex items-center gap-4">
          <a href="/mentions-legales"
            className="text-[8px] font-body font-semibold tracking-[0.15em] transition-colors hover:text-[#C4724A]"
            style={{ color: '#3D4A52' }}>
            Mentions légales
          </a>
          <span className="text-[8px]" style={{ color: 'rgba(61,74,82,0.3)' }}>·</span>
          <a href="/mentions-legales#confidentialite"
            className="text-[8px] font-body font-semibold tracking-[0.15em] transition-colors hover:text-[#C4724A]"
            style={{ color: '#3D4A52' }}>
            Confidentialité
          </a>
          <span className="text-[8px]" style={{ color: 'rgba(61,74,82,0.3)' }}>·</span>
          <a href="/mentions-legales#cookies"
            className="text-[8px] font-body font-semibold tracking-[0.15em] transition-colors hover:text-[#C4724A]"
            style={{ color: '#3D4A52' }}>
            Cookies
          </a>
        </div>
        <p className="text-[8px] font-body font-semibold tracking-[0.15em]"
          style={{ color: '#3D4A52' }}>
          Saint-Martin
        </p>
      </div>
    </footer>
  );
}