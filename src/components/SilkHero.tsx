import React from 'react';
import Silk from './Silk';
import RotatingEarth from '@/components/ui/wireframe-dotted-globe';
import type { PageView } from '../types';
import { ArrowRight, Shield, Globe, Award } from 'lucide-react';

interface SilkHeroProps {
  setActivePage?: (page: PageView) => void;
  fullHeadlineText?: string;
  handleCtaClick: (page: PageView, sectionId?: string) => void;
}

export const SilkHero: React.FC<SilkHeroProps> = ({
  setActivePage: _setActivePage,
  fullHeadlineText = "Connecting Technology,\nBusiness And Opportunity\nGlobally.",
  handleCtaClick
}) => {
  return (
    <section className="relative min-h-screen md:h-screen w-full overflow-hidden bg-[#041626] text-white flex flex-col justify-between pt-28 sm:pt-32 md:pt-36 pb-6 sm:pb-10 px-4 sm:px-8 md:px-12 lg:px-16 xl:px-20 select-none">
      {/* Background 3D Silk Canvas - Smooth, slow, royal enterprise blue silk texture */}
      <div className="absolute inset-0 w-full h-full z-0 opacity-80 pointer-events-none">
        <Silk
          speed={2.2}
          scale={0.9}
          color="#00A3E0"
          noiseIntensity={0.7}
          rotation={0.3}
        />
      </div>

      {/* Luxury Depth Overlays */}
      <div className="absolute inset-0 bg-gradient-to-r from-[#041626]/95 via-[#041626]/65 to-transparent z-10 pointer-events-none" />
      <div className="absolute inset-0 bg-gradient-to-t from-[#041626] via-transparent to-[#041626]/40 z-10 pointer-events-none" />

      {/* Right-Side 3D Wireframe Dotted Globe - Perfectly bounded between Navbar (top) and Trust Bar (bottom) */}
      <div className="absolute right-4 sm:right-8 md:right-12 lg:right-16 xl:right-20 top-24 sm:top-28 md:top-24 bottom-16 md:bottom-20 my-auto w-[90%] sm:w-[80%] md:w-[48%] lg:w-[45%] xl:w-[43%] z-10 flex items-center justify-center pointer-events-none opacity-20 md:opacity-95 transition-all duration-500">
        <div className="w-full max-w-[420px] sm:max-w-[460px] lg:max-w-[500px] xl:max-w-[530px] aspect-square flex items-center justify-center">
          <RotatingEarth width={540} height={540} speed={1.2} className="w-full h-full" />
        </div>
      </div>

      {/* Main Left Foreground Content */}
      <div className="relative z-20 max-w-xl sm:max-w-2xl lg:max-w-[54%] xl:max-w-[52%] my-auto py-4 md:py-0">
        {/* Eyebrow Header - All Pure Crisp White */}
        <div className="animate-hero-badge mb-3 sm:mb-6">
          <div className="uppercase tracking-wider">
            <div className="text-[20px] xs:text-[22px] sm:text-[30px] md:text-[35px] lg:text-[38px] font-black text-white leading-none mb-1.5 drop-shadow-sm">
              REGENERATE GLOBAL
            </div>
            <div className="text-[10.5px] sm:text-[12.5px] md:text-[13.5px] font-bold text-white/90 tracking-[0.18em] sm:tracking-[0.22em]">
              - BUSINESS &amp; TECHNOLOGY SOLUTIONS.
            </div>
          </div>
        </div>

        {/* Main Headline - Editorial Instrument Serif */}
        <h1
          className="animate-hero-title text-[1.8rem] xs:text-[2.1rem] sm:text-[2.8rem] md:text-[3.3rem] lg:text-[3.75rem] xl:text-[4.1rem] leading-[1.08] font-normal text-white tracking-[-0.01em] mb-4 sm:mb-6 whitespace-pre-line drop-shadow-md"
          style={{ fontFamily: "'Instrument Serif', Georgia, serif" }}
        >
          {fullHeadlineText}
        </h1>

        {/* Executive Paragraph - Pure White */}
        <p className="animate-hero-text text-[13.5px] sm:text-[16px] md:text-[16.5px] text-white/90 font-normal leading-relaxed mb-6 sm:mb-8 max-w-[550px]">
          Regenerate Global Provides Technology, Telecommunications, Procurement And Business Solutions That Help Organisations Source, Develop And Grow.
        </p>

        {/* Action Buttons */}
        <div className="animate-hero-buttons flex flex-col sm:flex-row items-stretch sm:items-center gap-3 sm:gap-4 w-full sm:w-auto">
          <button
            onClick={() => handleCtaClick('home', 'services')}
            className="inline-flex items-center justify-center gap-2.5 text-[13.5px] sm:text-[14px] font-semibold text-[#041626] bg-white hover:bg-white/90 rounded-full px-6 sm:px-8 py-3 sm:py-3.5 hover:shadow-xl hover:scale-[1.02] active:scale-[0.99] transition-all duration-300 group cursor-pointer w-full sm:w-auto"
          >
            Explore Solutions
            <ArrowRight size={16} className="text-[#041626] transition-transform duration-300 group-hover:translate-x-1" />
          </button>
          <button
            onClick={() => handleCtaClick('home', 'wholesale')}
            className="inline-flex items-center justify-center gap-2.5 text-[13.5px] sm:text-[14px] font-semibold text-white bg-white/10 backdrop-blur-md border border-white/30 hover:bg-white/20 rounded-full px-6 sm:px-8 py-3 sm:py-3.5 hover:shadow-md hover:scale-[1.02] active:scale-[0.99] transition-all duration-300 group cursor-pointer w-full sm:w-auto"
          >
            Products &amp; Wholesale
            <ArrowRight size={16} className="text-white transition-transform duration-300 group-hover:translate-x-1" />
          </button>
        </div>
      </div>

      {/* Executive Footer Trust Bar - Crisp White */}
      <div className="relative z-20 mt-6 sm:mt-0 pt-4 sm:pt-6 border-t border-white/20 flex flex-col sm:flex-row items-start sm:items-center justify-between gap-2 sm:gap-4 text-[11px] sm:text-xs text-white/80">
        <div className="flex items-center gap-2">
          <Award size={14} className="text-white shrink-0" />
          <span>ESTABLISHED 2013 • UNITED KINGDOM</span>
        </div>
        <div className="flex items-center gap-2">
          <Globe size={14} className="text-white shrink-0" />
          <span>GLOBAL TECHNOLOGY DISTRIBUTION &amp; TELECOMMUNICATIONS</span>
        </div>
        <div className="flex items-center gap-2">
          <Shield size={14} className="text-white shrink-0" />
          <span>ENTERPRISE GOVERNANCE &amp; COMPLIANCE</span>
        </div>
      </div>
    </section>
  );
};
