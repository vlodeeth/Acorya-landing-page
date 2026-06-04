import React from 'react';
import AmbientBackground from '../components/landing/AmbientBackground';
import Navbar from '../components/landing/Navbar';
import HeroSection from '../components/landing/HeroSection';
import CredibilityBar from '../components/landing/CredibilityBar';
import ValueProps from '../components/landing/ValueProps';
import ServicesSection from '../components/landing/ServicesSection';
import ResultsSection from '../components/landing/ResultsSection';
import ProcessSection from '../components/landing/ProcessSection';
import TeamSection from '../components/landing/TeamSection';
import ClientsSection from '../components/landing/ClientsSection';
import CTASection from '../components/landing/CTASection';
import Footer from '../components/landing/Footer';
import SectionArrow from '../components/landing/SectionArrow';

export default function Home() {
  return (
    <div className="min-h-screen bg-background">
      <AmbientBackground />
      <Navbar />
      <HeroSection />
      <div id="pourquoi"><ValueProps /></div>
      <SectionArrow targetId="expertises" />
      <div id="expertises"><ServicesSection /></div>
      <SectionArrow targetId="resultats" fromDark />
      <div id="resultats"><ResultsSection /></div>
      <SectionArrow targetId="methode" />
      <div id="methode"><ProcessSection /></div>
      <SectionArrow targetId="equipe" fromDark />
      <div id="equipe"><TeamSection /></div>
      <SectionArrow targetId="secteurs" />
      <div id="secteurs"><ClientsSection /></div>
      <SectionArrow targetId="contact" />
      <CTASection />
      <Footer />
    </div>
  );
}