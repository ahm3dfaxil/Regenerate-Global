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
import LogoLoop from './LogoLoop';

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
      {/* 1. PAGE INTRODUCTION HEADER                                              */}
      {/* ------------------------------------------------------------------------- */}
      <section className="pt-24 pb-16 px-6 sm:px-12 md:px-20 lg:px-28 bg-[#F1EFEA] border-b border-[#E4E1DB]">
        <div className="max-w-4xl mx-auto text-center">
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-white border border-[#E4E1DB] text-[#171717] text-xs font-semibold tracking-wider uppercase mb-4 shadow-sm">
            <Layers size={14} /> DEVICE GRADING
          </div>
          <h1 className="text-3xl sm:text-4xl md:text-5xl font-semibold tracking-tight text-[#171717] mb-4">
            Grading Explained
          </h1>
          <p className="text-base sm:text-lg text-[#5F5B55] leading-relaxed max-w-2xl mx-auto">
            Clear, detailed grading for devices, from pristine to used, ensuring you understand quality before every purchase.
          </p>
        </div>
      </section>

      {/* ------------------------------------------------------------------------- */}
      {/* 2. DEVICE GRADES GRID (SIX-ITEM SYSTEM)                                   */}
      {/* ------------------------------------------------------------------------- */}
      <section className="py-20 px-6 sm:px-12 md:px-20 lg:px-28 bg-[#F7F6F3]">
        <div className="max-w-7xl mx-auto">
          <div className="text-center max-w-2xl mx-auto mb-14">
            <h2 className="text-2xl sm:text-3xl font-semibold text-[#171717] mb-3">
              Standardized Device Classification
            </h2>
            <p className="text-xs sm:text-sm text-[#5F5B55] leading-relaxed">
              Every unit in our inventory is benchmarked against rigorous criteria to ensure full operational confidence and accurate commercial expectations.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {DEVICE_GRADES.map((item, idx) => (
              <div
                key={`${item.id}-${idx}`}
                className="bg-white p-7 rounded-2xl border border-[#E4E1DB] shadow-sm hover:shadow-md hover:border-[#D6D1C8] transition-all duration-200 flex flex-col justify-between"
              >
                <div>
                  <div className="flex items-center justify-between gap-3 mb-5">
                    {/* Subtle warm-neutral circular icon container */}
                    <div className="w-12 h-12 rounded-full bg-[#F1EFEA] border border-[#E4E1DB] text-[#171717] flex items-center justify-center shrink-0">
                      {getGradeIcon(idx)}
                    </div>
                    <span className="px-3 py-1 rounded-full bg-[#F1EFEA] border border-[#E4E1DB] text-[#171717] text-[11px] font-semibold tracking-wide">
                      {item.badge}
                    </span>
                  </div>

                  <h3 className="text-xl font-semibold text-[#171717] mb-2">
                    {item.grade}
                  </h3>
                  <p className="text-xs sm:text-sm text-[#5F5B55] leading-relaxed mb-6">
                    {item.description}
                  </p>
                </div>

                <div className="pt-4 border-t border-[#E4E1DB] flex items-center justify-between">
                  <span className="text-[11px] font-semibold text-[#858078] uppercase tracking-wider">
                    Warranty Scope
                  </span>
                  <span className="text-xs font-semibold text-[#171717] bg-[#F7F6F3] px-2.5 py-1 rounded-md border border-[#E4E1DB]">
                    {item.warranty}
                  </span>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ------------------------------------------------------------------------- */}
      {/* 3. INSPECTION INTRODUCTION STATEMENT                                      */}
      {/* ------------------------------------------------------------------------- */}
      <section className="py-14 px-6 sm:px-12 md:px-20 lg:px-28 bg-white border-y border-[#E4E1DB]">
        <div className="max-w-4xl mx-auto text-center">
          <p className="text-lg sm:text-xl md:text-2xl font-medium text-[#171717] leading-relaxed">
            At <strong className="text-[#171717] font-semibold">Regenerate Global</strong>, we employ advanced diagnostic tools to thoroughly test every device’s functionality.
          </p>
        </div>
      </section>

      {/* ------------------------------------------------------------------------- */}
      {/* 4. OUR RIGOROUS INSPECTION PROCESS PANEL                                  */}
      {/* ------------------------------------------------------------------------- */}
      <section className="py-20 px-6 sm:px-12 md:px-20 lg:px-28 bg-[#F7F6F3]">
        <div className="max-w-5xl mx-auto">
          {/* Corporate Information Panel */}
          <div className="bg-white p-8 sm:p-12 rounded-3xl border border-[#E4E1DB] shadow-sm relative overflow-hidden">
            {/* Decorative Gold Accent Line */}
            <div className="absolute top-0 left-0 right-0 h-1 bg-gradient-to-r from-[#171717] via-[#171717] to-[#171717]" />

            <div className="flex items-center gap-3 mb-4">
              <div className="p-2.5 rounded-xl bg-[#F1EFEA] text-[#171717] border border-[#E4E1DB]">
                <Search size={20} />
              </div>
              <span className="text-xs font-semibold uppercase tracking-wider text-[#171717]">
                Inspection Methodology
              </span>
            </div>

            <h2 className="text-2xl sm:text-3xl font-semibold text-[#171717] mb-2">
              Our Rigorous Inspection Process
            </h2>
            <h3 className="text-base sm:text-lg font-medium text-[#171717] mb-6">
              Thorough checks for condition and performance accuracy.
            </h3>

            <div className="space-y-4 text-xs sm:text-sm text-[#5F5B55] leading-relaxed border-t border-[#E4E1DB] pt-6">
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
      <section className="py-20 px-6 sm:px-12 md:px-20 lg:px-28 bg-white border-y border-[#E4E1DB]">
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
              <div key={cat.title} className="bg-[#F7F6F3] p-6 rounded-2xl border border-[#E4E1DB]">
                <div className="w-10 h-10 rounded-xl bg-[#F1EFEA] border border-[#E4E1DB] text-[#171717] flex items-center justify-center mb-4">
                  {getCriteriaIcon(cat.iconName)}
                </div>
                <h3 className="text-base font-semibold text-[#171717] mb-3">
                  {cat.title}
                </h3>
                <ul className="space-y-2">
                  {cat.items.map((item) => (
                    <li key={item} className="flex items-center gap-2 text-xs text-[#171717] font-medium">
                      <ChevronRight size={14} className="text-[#171717] shrink-0" />
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
      {/* 6. OUR TOP BRANDS                                                        */}
      {/* ------------------------------------------------------------------------- */}
      <section className="py-20 px-6 sm:px-12 md:px-20 lg:px-28 bg-[#F7F6F3] overflow-hidden">
        <div className="max-w-7xl mx-auto">
          <div className="text-center max-w-2xl mx-auto mb-12">
            <h2 className="text-2xl sm:text-3xl font-semibold text-[#171717] mb-3">
              Our Top Brands
            </h2>
            <p className="text-sm text-[#5F5B55] leading-relaxed">
              We specialize in all white label brands, from Alcatel to Huawei, covering mobile phones, tablets, and related products.
            </p>
          </div>

          <div className="py-8">
            <LogoLoop
              logos={[
                { src: '/iphone-logo.png', alt: 'Apple', title: 'Apple' },
                { src: '/Samsung-Logo.jpg', alt: 'Samsung', title: 'Samsung' },
                { src: '/huawei-.png', alt: 'Huawei', title: 'Huawei' },
                { src: '/Alcatel-logo.wine.png', alt: 'Alcatel', title: 'Alcatel' },
                { src: '/lenovo-logo.svg', alt: 'Lenovo', title: 'Lenovo' },
                { src: '/Xiaomi-Logo-2014.png', alt: 'Xiaomi', title: 'Xiaomi' },
                { src: '/google-logo.svg', alt: 'Google', title: 'Google' },
                { src: '/Motorola.png', alt: 'Motorola', title: 'Motorola' },
                { src: '/Sony.png', alt: 'Sony', title: 'Sony' },
                { src: '/LG logo.svg', alt: 'LG', title: 'LG' },
                { src: '/Oppo-Logo.wine.svg', alt: 'OPPO', title: 'OPPO' }
              ]}
              speed={130}
              direction="left"
              logoHeight={84}
              gap={32}
              pauseOnHover={false}
              scaleOnHover
              fadeOut
              ariaLabel="Top brand logos"
              renderItem={(item: any) => (
                <div
                  title={item.title}
                  className="w-28 h-28 sm:w-36 sm:h-36 bg-white rounded-3xl border border-[#E4E1DB] flex items-center justify-center p-5 shadow-sm hover:shadow-lg hover:border-[#171717] transition-all group cursor-pointer"
                >
                  <img
                    src={item.src}
                    alt={item.alt || item.title}
                    className="max-h-20 max-w-20 sm:max-h-24 sm:max-w-26 object-contain transition-transform duration-300 group-hover:scale-115"
                  />
                </div>
              )}
            />
          </div>
        </div>
      </section>

      {/* ------------------------------------------------------------------------- */}
      {/* 7. TRANSPARENCY / CONFIDENCE & CTA SECTION                                */}
      {/* ------------------------------------------------------------------------- */}
      <section className="py-20 px-6 sm:px-12 md:px-20 lg:px-28 bg-white border-t border-[#E4E1DB]">
        <div className="max-w-4xl mx-auto text-center">
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-[#F1EFEA] border border-[#E4E1DB] text-[#171717] text-xs font-semibold uppercase mb-4">
            <ShieldCheck size={14} /> Quality Guarantee
          </div>
          <h2 className="text-2xl sm:text-3xl lg:text-4xl font-semibold text-[#171717] mb-4">
            Quality You Can Understand
          </h2>
          <p className="text-sm sm:text-base text-[#5F5B55] leading-relaxed max-w-2xl mx-auto mb-8">
            Our grading process is designed to give customers a clear understanding of device condition before purchase. Every grade represents a defined level of condition, functionality and quality.
          </p>

          <div className="flex flex-wrap items-center justify-center gap-4">
            <button
              onClick={() => handleCtaClick('home', 'wholesale')}
              className="inline-flex items-center gap-2 text-[13px] font-medium text-white bg-[#171717] border border-[#171717] rounded-full px-7 py-3.5 hover:bg-[#171717] transition-all shadow-sm cursor-pointer group"
            >
              Explore Our Products
              <span className="text-[#171717] transition-transform group-hover:translate-x-0.5">→</span>
            </button>
            <button
              onClick={() => handleCtaClick('home', 'contact')}
              className="inline-flex items-center gap-2 text-[13px] font-medium text-[#171717] bg-white border border-[#D6D1C8] rounded-full px-7 py-3.5 hover:border-[#171717] hover:bg-[#171717] hover:text-white transition-all shadow-sm cursor-pointer group"
            >
              Contact Us
              <span className="text-[#171717] group-hover:text-[#171717] transition-transform group-hover:translate-x-0.5">→</span>
            </button>
          </div>
        </div>
      </section>
    </div>
  );
};
