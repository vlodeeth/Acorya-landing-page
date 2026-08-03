import React from 'react';
import SiteNav from '../components/site/SiteNav';
import Hero from '../components/site/Hero';
import Constat from '../components/site/Constat';
import Sieges from '../components/site/Sieges';
import Resultats from '../components/site/Resultats';
import Methode from '../components/site/Methode';
import Equipe from '../components/site/Equipe';
import Terrain from '../components/site/Terrain';
import Contact from '../components/site/Contact';
import PiedDePage from '../components/site/PiedDePage';

export default function Home() {
  return (
    <div style={{ background: '#F5F0E8' }}>
      <SiteNav />
      <main>
        <Hero />
        <Constat />
        <Sieges />
        <Resultats />
        <Methode />
        <Equipe />
        <Terrain />
        <Contact />
      </main>
      <PiedDePage />
    </div>
  );
}
