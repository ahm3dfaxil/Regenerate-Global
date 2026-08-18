import React, { useState, useEffect } from 'react';
import Silk from './Silk';
import { EarthNeuralGlobe } from './EarthNeuralGlobe';
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
  // Typewriter effect state for main hero headline
  const [typedHeadline, setTypedHeadline] = useState("");
  const [typingComplete, setTypingComplete] = useState(false);

  useEffect(() => {
    let charIndex = 0;
    setTypedHeadline("");
    setTypingComplete(false);

    const typingTimer = setInterval(() => {
      if (charIndex < fullHeadlineText.length) {
        setTypedHeadline(fullHeadlineText.slice(0, charIndex + 1));
        charIndex++;
      } else {
        setTypingComplete(true);
        clearInterval(typingTimer);
      }
    }, 38);

    return () => clearInterval(typingTimer);
  }, [fullHeadlineText]);

  return (
    <section className="relative h-screen w-full overflow-hidden bg-[#041626] text-white flex flex-col justify-between pt-28 pb-10 px-6 sm:px-12 md:px-20 lg:px-28 select-none">
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

      {/* Right-Side 3D Earth Globe with Pure White Neural Network Lines */}
      <div className="absolute right-0 lg:right-4 top-0 h-full w-full md:w-[50%] lg:w-[46%] xl:w-[42%] z-15 pointer-events-none flex items-center justify-center p-4 overflow-visible opacity-95 transition-all duration-500">
        <EarthNeuralGlobe />
      </div>

      {/* Main Left Foreground Content */}
      <div className="relative z-20 max-w-xl sm:max-w-2xl lg:max-w-[58%] xl:max-w-[54%] my-auto">
        {/* Eyebrow Header - All Pure Crisp White */}
        <div className="animate-hero-badge mb-5 sm:mb-6">
          <div className="uppercase tracking-wider">
            <div className="text-[24px] sm:text-[30px] md:text-[35px] lg:text-[38px] font-black text-white leading-none mb-1.5 drop-shadow-sm">
              REGENERATE GLOBAL
            </div>
            <div className="text-[11.5px] sm:text-[12.5px] md:text-[13.5px] font-bold text-white/90 tracking-[0.22em]">
              - BUSINESS &amp; TECHNOLOGY SOLUTIONS.
            </div>
          </div>
        </div>

        {/* Main Headline - Pure Crisp White */}
        <h1 className="animate-hero-title text-[1.75rem] sm:text-[2.2rem] md:text-[2.65rem] lg:text-[3rem] xl:text-[3.25rem] leading-[1.08] font-bold text-white tracking-[-0.02em] mb-6 whitespace-pre-line min-h-[3.2em] drop-shadow-md">
          {typedHeadline}
          {!typingComplete && (
            <span className="inline-block w-[3px] h-[0.82em] bg-white ml-1 align-baseline animate-pulse" />
          )}
        </h1>

        {/* Executive Paragraph - Pure White */}
        <p className="animate-hero-text text-[15px] sm:text-[16px] md:text-[16.5px] text-white/90 font-normal leading-relaxed mb-8 max-w-[550px]">
          Regenerate Global Provides Technology, Telecommunications, Procurement And Business Solutions That Help Organisations Source, Develop And Grow.
        </p>

        {/* Action Buttons */}
        <div className="animate-hero-buttons flex flex-wrap items-center gap-4">
          <button
            onClick={() => handleCtaClick('home', 'about')}
            className="inline-flex items-center gap-2.5 text-[14px] font-semibold text-[#041626] bg-white hover:bg-white/90 rounded-full px-8 py-3.5 hover:shadow-xl hover:scale-[1.02] active:scale-[0.99] transition-all duration-300 group cursor-pointer"
          >
            Discover Regenerate Global
            <ArrowRight size={16} className="text-[#041626] transition-transform duration-300 group-hover:translate-x-1" />
          </button>
          <button
            onClick={() => handleCtaClick('home', 'contact')}
            className="inline-flex items-center gap-2.5 text-[14px] font-semibold text-white bg-white/10 backdrop-blur-md border border-white/30 hover:bg-white/20 rounded-full px-8 py-3.5 hover:shadow-md hover:scale-[1.02] active:scale-[0.99] transition-all duration-300 group cursor-pointer"
          >
            Contact Us
            <ArrowRight size={16} className="text-white transition-transform duration-300 group-hover:translate-x-1" />
          </button>
        </div>
      </div>

      {/* Executive Footer Trust Bar - Crisp White */}
      <div className="relative z-20 pt-6 border-t border-white/20 flex flex-wrap items-center justify-between gap-4 text-xs text-white/80">
        <div className="flex items-center gap-2">
          <Award size={14} className="text-white" />
          <span>ESTABLISHED 2013 • UNITED KINGDOM</span>
        </div>
        <div className="flex items-center gap-2">
          <Globe size={14} className="text-white" />
          <span>GLOBAL TECHNOLOGY DISTRIBUTION &amp; TELECOMMUNICATIONS</span>
        </div>
        <div className="flex items-center gap-2">
          <Shield size={14} className="text-white" />
          <span>ENTERPRISE GOVERNANCE &amp; COMPLIANCE</span>
        </div>
      </div>
    </section>
  );
};
