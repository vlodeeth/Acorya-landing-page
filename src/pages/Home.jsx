import React from 'react';
import SiteNav from '../components/site/SiteNav';
import Hero from '../components/site/Hero';
import Constat from '../components/site/Constat';
import SiegesScroll from '../components/site/SiegesScroll';
import Resultats from '../components/site/Resultats';
import Manifeste from '../components/site/Manifeste';
import Methode from '../components/site/Methode';
import Equipe from '../components/site/Equipe';
import Terrain from '../components/site/Terrain';
import Contact from '../components/site/Contact';
import PiedDePage from '../components/site/PiedDePage';
import Progression from '../components/site/Progression';

export default function Home() {
  return (
    <div style={{ background: '#F5F0E8' }}>
      <SiteNav />
      <main>
        <Hero />
        <Constat />
        <SiegesScroll />
        <Resultats />
        <Manifeste />
        <Methode />
        <Equipe />
        <Terrain />
        <Contact />
      </main>
      <PiedDePage />
      <Progression />
    </div>
  );
}
