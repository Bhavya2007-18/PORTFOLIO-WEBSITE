'use client';

import dynamic from 'next/dynamic';
import CustomCursor from '@/components/CustomCursor';
import Navbar from '@/components/Navbar';
import HeroOverlay from '@/components/HeroOverlay';
import EditorialSection from '@/components/sections/Editorial';
import WhatIBuildSection from '@/components/sections/WhatIBuild';
import WorkSection from '@/components/sections/Work';
import LocalAISection from '@/components/sections/LocalAI';
import PhilosophySection from '@/components/sections/Philosophy';
import LabSection from '@/components/sections/Lab';
import StackSection from '@/components/sections/Stack';
import AboutSection from '@/components/sections/About';
import CurrentlySection from '@/components/sections/Currently';
import FooterSection from '@/components/sections/Footer';

// Dynamic R3F Canvas import with SSR disabled
const CanvasBackground = dynamic(() => import('@/components/CanvasBackground'), {
  ssr: false,
  loading: () => <div className="fixed inset-0 z-0 bg-[#080808]" />,
});

export default function Home() {
  return (
    <main className="relative min-h-screen bg-[#080808] text-[#f0ede8] selection:bg-[#3C9952] selection:text-[#080808]">
      {/* High-visibility glowing custom cursor */}
      <CustomCursor />

      {/* Fixed 3D WebGL Background Layer (fixed inset-0 z-0 pointer-events-none) */}
      <CanvasBackground />

      {/* Retro scanline texture overlay */}
      <div className="fixed inset-0 z-[1] scanlines pointer-events-none opacity-40" />

      {/* Top Navigation */}
      <Navbar />

      {/* 2D Scrollable Content Layer (z-10) */}
      <div className="relative z-10">
        <HeroOverlay />
        <EditorialSection />
        <WhatIBuildSection />
        <LocalAISection />
        <WorkSection />
        <PhilosophySection />
        <LabSection />
        <StackSection />
        <AboutSection />
        <CurrentlySection />
        <FooterSection />
      </div>
    </main>
  );
}
