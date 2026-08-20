import React from 'react';
import {
  Smartphone,
  ShieldCheck,
  Cpu,
  CheckCircle2,
  Award,
  Box,
  RefreshCw,
  Search,
  Sparkles,
  Layers,
  ChevronRight
} from 'lucide-react';
import type { PageView } from '../types';
import { DEVICE_GRADES, GRADING_CRITERIA } from '../data/gradingData';
import { AngledSlider } from './lightswind/angled-slider';

interface GradingPageProps {
  setActivePage: (page: PageView) => void;
}

export const GradingPage: React.FC<GradingPageProps> = ({ setActivePage }) => {
  const getGradeIcon = (index: number) => {
    switch (index) {
      case 0: return <Box size={22} />;
      case 1: return <Award size={22} />;
      case 2: return <Sparkles size={22} />;
      case 3: return <CheckCircle2 size={22} />;
      case 4: return <RefreshCw size={22} />;
      default: return <ShieldCheck size={22} />;
    }
  };

  const getCriteriaIcon = (iconName: string) => {
    switch (iconName) {
      case 'Smartphone': return <Smartphone size={20} />;
      case 'CheckCircle2': return <CheckCircle2 size={20} />;
      case 'Cpu': return <Cpu size={20} />;
      case 'ShieldCheck': return <ShieldCheck size={20} />;
      default: return <Search size={20} />;
    }
  };

  const handleCtaClick = (page: PageView, sectionId?: string) => {
    setActivePage(page);
    if (page === 'home' && sectionId) {
      setTimeout(() => {
        const el = document.getElementById(sectionId);
        if (el) el.scrollIntoView({ behavior: 'smooth' });
      }, 100);
    }
  };

  return (
    <div className="min-h-screen bg-[#F7F6F3] text-[#171717] font-sans antialiased">
      {/* ------------------------------------------------------------------------- */}
      {/* 1 & 2. UNIFIED DEVICE GRADING & CLASSIFICATION SECTION                   */}
      {/* ------------------------------------------------------------------------- */}
      <section className="pt-28 pb-14 sm:pb-20 px-4 sm:px-8 md:px-12 lg:px-16 xl:px-20 bg-white overflow-hidden">
        <div className="max-w-7xl mx-auto">
          <div className="max-w-3xl mx-auto text-center mb-10 sm:mb-14">
            <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-[#041626] border border-[#00A3E0]/40 text-white text-xs font-semibold tracking-wider uppercase mb-4 shadow-sm">
              <Layers size={14} className="text-[#00A3E0]" /> DEVICE GRADING
            </div>
            <h1 className="text-3xl sm:text-4xl md:text-5xl font-semibold tracking-tight text-[#171717] mb-4">
              Standardized Device Classification
            </h1>
            <p className="text-base sm:text-lg text-[#5F5B55] leading-relaxed max-w-2xl mx-auto">
              Every unit in our inventory is benchmarked against rigorous criteria to ensure full operational confidence and accurate commercial expectations.
            </p>
          </div>

          <div className="w-full overflow-hidden py-2 sm:py-4">
            <AngledSlider
              speed={11}
              angle={18}
              containerHeight="430px"
              cardWidth="340px"
              gap="32px"
              hoverScale={1.08}
              showControls={true}
              className="bg-white"
              childrenNodes={DEVICE_GRADES.map((item, idx) => (
                <div
                  key={`${item.id}-${idx}`}
                  className="bg-[#041626] text-white p-5 sm:p-7 rounded-2xl border border-[#00A3E0]/30 shadow-2xl flex flex-col justify-between h-full hover:border-[#00A3E0] transition-colors duration-300 relative overflow-hidden select-none"
                >
                  {/* Subtle corner cyan gradient highlight */}
                  <div className="absolute -top-12 -right-12 w-28 h-28 bg-[#00A3E0]/20 rounded-full blur-xl pointer-events-none" />

                  <div>
                    <div className="flex items-center justify-between gap-2 mb-4 sm:mb-5">
                      <div className="w-10 h-10 sm:w-12 sm:h-12 rounded-2xl bg-[#00A3E0]/15 border border-[#00A3E0]/40 text-[#00A3E0] flex items-center justify-center shrink-0 shadow-inner">
                        {getGradeIcon(idx)}
                      </div>
                      <span className="px-2.5 sm:px-3.5 py-1 rounded-full bg-[#00A3E0]/20 border border-[#00A3E0]/40 text-[#00A3E0] text-[10px] sm:text-[11px] font-semibold tracking-wide">
                        {item.badge}
                      </span>
                    </div>

                    <h3 className="text-lg sm:text-xl font-bold text-white mb-1.5 sm:mb-2 tracking-tight">
                      {item.grade}
                    </h3>
                    <p className="text-xs sm:text-sm text-white/80 leading-relaxed mb-4 sm:mb-6">
                      {item.description}
                    </p>
                  </div>

                  <div className="pt-3 sm:pt-4 border-t border-white/15 flex items-center justify-between">
                    <span className="text-[10px] sm:text-[11px] font-semibold text-white/60 uppercase tracking-wider">
                      Warranty Scope
                    </span>
                    <span className="text-[11px] sm:text-xs font-semibold text-[#00A3E0] bg-[#00A3E0]/15 px-2.5 sm:px-3 py-1 rounded-lg border border-[#00A3E0]/30">
                      {item.warranty}
                    </span>
                  </div>
                </div>
              ))}
            />
          </div>
        </div>
      </section>

      {/* ------------------------------------------------------------------------- */}
      {/* 3. INSPECTION INTRODUCTION STATEMENT                                      */}
      {/* ------------------------------------------------------------------------- */}
      <section className="py-14 px-4 sm:px-8 md:px-12 lg:px-16 xl:px-20 bg-white border-y border-[#E4E1DB]">
        <div className="max-w-4xl mx-auto text-center">
          <p className="text-lg sm:text-xl md:text-2xl font-medium text-[#171717] leading-relaxed">
            At <strong className="text-[#0084C7] font-semibold">Regenerate Global</strong>, we employ advanced diagnostic tools to thoroughly test every device’s functionality.
          </p>
        </div>
      </section>

      {/* ------------------------------------------------------------------------- */}
      {/* 4. OUR RIGOROUS INSPECTION PROCESS PANEL                                  */}
      {/* ------------------------------------------------------------------------- */}
      <section className="py-20 px-4 sm:px-8 md:px-12 lg:px-16 xl:px-20 bg-[#F7F6F3]">
        <div className="max-w-5xl mx-auto">
          {/* Corporate Information Panel */}
          <div className="bg-[#041626] text-white p-8 sm:p-12 rounded-3xl border border-[#00A3E0]/30 shadow-sm relative overflow-hidden">
            {/* Decorative Silk Cyan Accent Line */}
            <div className="absolute top-0 left-0 right-0 h-1.5 bg-gradient-to-r from-[#00A3E0] via-white to-[#00A3E0]" />

            <div className="flex items-center gap-3 mb-4">
              <div className="p-3 rounded-2xl bg-[#00A3E0]/15 text-[#00A3E0] border border-[#00A3E0]/40">
                <Search size={20} />
              </div>
              <span className="text-xs font-semibold uppercase tracking-wider text-[#00A3E0]">
                Inspection Methodology
              </span>
            </div>

            <h2 className="text-2xl sm:text-3xl font-semibold text-white mb-2">
              Our Rigorous Inspection Process
            </h2>
            <h3 className="text-base sm:text-lg font-medium text-white/80 mb-6">
              Thorough checks for condition and performance accuracy.
            </h3>

            <div className="space-y-4 text-xs sm:text-sm text-white/80 leading-relaxed border-t border-white/15 pt-6">
              <p>
                Every device we handle undergoes a meticulous inspection process. We evaluate physical appearance, functionality and performance to ensure accurate grading. Our team uses advanced tools and expertise to check every detail, from screens to internal components.
              </p>
              <p>
                This rigorous process guarantees transparency and reliability. By the time a device is graded, we ensure it meets the specific criteria we’ve set, providing you with complete confidence in your purchase.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* ------------------------------------------------------------------------- */}
      {/* 5. GRADING CRITERIA MATRIX                                                */}
      {/* ------------------------------------------------------------------------- */}
      <section className="py-20 px-4 sm:px-8 md:px-12 lg:px-16 xl:px-20 bg-white border-y border-[#E4E1DB]">
        <div className="max-w-7xl mx-auto">
          <div className="text-center max-w-2xl mx-auto mb-14">
            <h2 className="text-2xl sm:text-3xl font-semibold text-[#171717] mb-3">
              Comprehensive Evaluation Criteria
            </h2>
            <p className="text-xs sm:text-sm text-[#5F5B55] leading-relaxed">
              Our technical evaluation covers four distinct performance parameters before a grade is finalized.
            </p>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
            {GRADING_CRITERIA.map((cat) => (
              <div key={cat.title} className="bg-[#041626] text-white p-6 rounded-2xl border border-[#00A3E0]/30 shadow-sm">
                <div className="w-12 h-12 rounded-2xl bg-[#00A3E0]/15 border border-[#00A3E0]/40 text-[#00A3E0] flex items-center justify-center mb-4">
                  {getCriteriaIcon(cat.iconName)}
                </div>
                <h3 className="text-base font-semibold text-white mb-3">
                  {cat.title}
                </h3>
                <ul className="space-y-2.5">
                  {cat.items.map((item) => (
                    <li key={item} className="flex items-center gap-2 text-xs text-white/80 font-medium">
                      <ChevronRight size={14} className="text-[#00A3E0] shrink-0" />
                      {item}
                    </li>
                  ))}
                </ul>
              </div>
            ))}
          </div>
        </div>
      </section>


      {/* ------------------------------------------------------------------------- */}
      {/* 7. TRANSPARENCY / CONFIDENCE & CTA SECTION                                */}
      {/* ------------------------------------------------------------------------- */}
      <section className="py-20 px-4 sm:px-8 md:px-12 lg:px-16 xl:px-20 bg-[#041626] text-white relative overflow-hidden">
        <div className="absolute top-0 right-0 w-[500px] h-[500px] bg-[#00A3E0]/15 rounded-full blur-3xl pointer-events-none" />
        <div className="max-w-4xl mx-auto text-center relative z-10">
          <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-[#00A3E0]/20 border border-[#00A3E0]/40 text-[#00A3E0] text-xs font-semibold uppercase mb-4 shadow-sm">
            <ShieldCheck size={14} /> Quality Guarantee
          </div>
          <h2 className="text-2xl sm:text-3xl lg:text-4xl font-semibold text-white mb-4">
            Quality You Can Understand
          </h2>
          <p className="text-sm sm:text-base text-white/80 leading-relaxed max-w-2xl mx-auto mb-8">
            Our grading process is designed to give customers a clear understanding of device condition before purchase. Every grade represents a defined level of condition, functionality and quality.
          </p>

          <div className="flex flex-wrap items-center justify-center gap-4">
            <button
              onClick={() => handleCtaClick('home', 'wholesale')}
              className="inline-flex items-center gap-2 text-[13.5px] font-semibold text-[#041626] bg-[#00A3E0] hover:bg-white rounded-full px-7 py-3.5 transition-all duration-300 shadow-md cursor-pointer group"
            >
              Explore Our Products
              <span className="text-[#041626] transition-transform group-hover:translate-x-1">→</span>
            </button>
            <button
              onClick={() => handleCtaClick('home', 'contact')}
              className="inline-flex items-center gap-2 text-[13.5px] font-semibold text-white bg-white/10 border border-white/30 rounded-full px-7 py-3.5 hover:bg-white/20 transition-all duration-300 shadow-sm cursor-pointer group"
            >
              Contact Us
              <span className="text-white transition-transform group-hover:translate-x-1">→</span>
            </button>
          </div>
        </div>
      </section>
    </div>
  );
};
