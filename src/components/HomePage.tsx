import React, { useState, useEffect } from 'react';
import {
  Globe,
  Cpu,
  ShieldCheck,
  Building2,
  Smartphone,
  Search,
  Code,
  Workflow,
  Mail,
  Phone,
  CheckCircle2,
  Layers,
  Briefcase,
  Radio,
  ChevronRight,
  Monitor,
  Server,
  TrendingUp,
  Compass,
  MapPin,
  Clock,
  Send
} from 'lucide-react';
import type { PageView } from '../types';

interface HomePageProps {
  setActivePage: (page: PageView) => void;
}

export const HomePage: React.FC<HomePageProps> = ({ setActivePage }) => {
  const [formSubmitted, setFormSubmitted] = useState(false);
  const [formData, setFormData] = useState({
    name: '',
    company: '',
    email: '',
    service: 'General Business Enquiry',
    message: ''
  });

  // Typewriter effect state for main hero headline
  const fullHeadlineText = "Connecting Technology,\nBusiness And Opportunity\nGlobally.";
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
  }, []);

  const handleFormSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setFormSubmitted(true);
    setTimeout(() => {
      setFormSubmitted(false);
      setFormData({ name: '', company: '', email: '', service: 'General Business Enquiry', message: '' });
    }, 5000);
  };

  const handleCtaClick = (page: PageView, sectionId?: string) => {
    if (page === 'grading') {
      setActivePage('grading');
      window.scrollTo({ top: 0, behavior: 'smooth' });
    } else if (sectionId) {
      const el = document.getElementById(sectionId);
      if (el) el.scrollIntoView({ behavior: 'smooth' });
    }
  };

  return (
    <>
      {/* ========================================================================= */}
      {/* HERO SECTION WITH PRESERVED VIDEO BACKGROUND                              */}
      {/* ========================================================================= */}
      <section className="relative h-screen w-full overflow-hidden bg-white flex flex-col justify-center pt-20 pb-10 px-6 sm:px-12 md:px-20 lg:px-28">
        {/* Right-Aligned Hand Video Container (Layered behind foreground text with z-0) */}
        <div className="absolute inset-y-0 right-0 w-full md:w-[70%] lg:w-[60%] xl:w-[55%] h-full z-0 pointer-events-none overflow-hidden flex items-center justify-end">
          <video
            autoPlay
            loop
            muted
            playsInline
            className="w-full h-full object-cover object-[75%_center] scale-120 md:scale-130 lg:scale-140 translate-x-6 sm:translate-x-10 md:translate-x-14 origin-center pointer-events-none animate-hero-video mix-blend-multiply brightness-[1.08] contrast-[1.05]"
            src="https://d8j0ntlcm91z4.cloudfront.net/user_38xzZboKViGWJOttwIXH07lWA1P/hf_20260508_215831_c6a8989c-d716-4d8d-8745-e972a2eec711.mp4"
          />
        </div>

        {/* Foreground Content Container (Layered in front with z-20) */}
        <div className="relative z-20 max-w-xl sm:max-w-2xl lg:max-w-[60%] xl:max-w-[56%] mt-8 sm:mt-6">
          {/* Eyebrow Header (Bigger REGENERATE GLOBAL & comparatively smaller sub-tagline) */}
          <div className="animate-hero-badge mb-5 sm:mb-6">
            <div className="uppercase tracking-wider">
              <div className="text-[23px] sm:text-[28px] md:text-[33px] lg:text-[36px] font-black text-[#B08D57] leading-none mb-1.5">
                REGENERATE GLOBAL
              </div>
              <div className="text-[11.5px] sm:text-[12.5px] md:text-[13.5px] font-bold text-[#B08D57]/85 tracking-[0.2em]">
                - BUSINESS &amp; TECHNOLOGY SOLUTIONS.
              </div>
            </div>
          </div>

          {/* Headline (Decreased font size with smooth typewriter typing animation) */}
          <h1 className="animate-hero-title text-[1.65rem] sm:text-[2.1rem] md:text-[2.5rem] lg:text-[2.85rem] xl:text-[3.1rem] leading-[1.08] font-bold text-[#171717] tracking-[-0.02em] mb-6 max-w-2xl sm:max-w-3xl whitespace-pre-line min-h-[3.3em]">
            {typedHeadline}
            {!typingComplete && (
              <span className="inline-block w-[3px] h-[0.82em] bg-[#B08D57] ml-1 align-baseline animate-pulse" />
            )}
          </h1>

          {/* Supporting Text */}
          <p className="animate-hero-text text-[14.5px] sm:text-[15.5px] md:text-[16px] text-[#4A4640] font-normal leading-relaxed mb-8 max-w-[540px]">
            Regenerate Global Provides Technology, Telecommunications, Procurement And Business Solutions That Help Organisations Source, Develop And Grow.
          </p>

          {/* Action Buttons */}
          <div className="animate-hero-buttons flex flex-wrap items-center gap-3.5">
            <button
              onClick={() => handleCtaClick('home', 'about')}
              className="inline-flex items-center gap-2.5 text-[13.5px] font-semibold text-white bg-[#171717] border border-[#171717] rounded-full px-7 py-3.5 hover:bg-[#3A3834] hover:shadow-md hover:scale-[1.01] active:scale-[0.99] transition-all duration-300 group cursor-pointer"
            >
              Discover Regenerate Global
              <span className="inline-block transition-transform duration-300 group-hover:translate-x-1 text-[#C5A46D]">
                →
              </span>
            </button>
            <button
              onClick={() => handleCtaClick('home', 'contact')}
              className="inline-flex items-center gap-2.5 text-[13.5px] font-semibold text-[#171717] bg-white/90 backdrop-blur-md border border-[#D6D1C8] rounded-full px-7 py-3.5 hover:border-[#B08D57] hover:bg-[#171717] hover:text-white hover:shadow-sm hover:scale-[1.01] active:scale-[0.99] transition-all duration-300 group cursor-pointer"
            >
              Contact Us
              <span className="inline-block transition-transform duration-300 group-hover:translate-x-1 text-[#B08D57] group-hover:text-[#C5A46D]">
                →
              </span>
            </button>
          </div>
        </div>
      </section>

      {/* ========================================================================= */}
      {/* SECTION 1: ABOUT REGENERATE GLOBAL                                        */}
      {/* ========================================================================= */}
      <section id="about" className="py-20 sm:py-28 px-6 sm:px-12 md:px-20 lg:px-28 bg-white border-b border-[#E4E1DB]">
        <div className="max-w-7xl mx-auto">
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 lg:gap-16 items-start">
            {/* Left Header Column */}
            <div className="lg:col-span-5">
              <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-[#F1EFEA] border border-[#E4E1DB] text-[#B08D57] text-xs font-semibold tracking-wide uppercase mb-4">
                <Building2 size={14} /> Corporate Profile
              </div>
              <h2 className="text-2xl sm:text-3xl lg:text-4xl font-semibold tracking-tight text-[#171717] leading-snug mb-6">
                About Regenerate Global Limited
              </h2>
              <p className="text-[#5F5B55] text-sm sm:text-base leading-relaxed mb-6">
                Established in 2013 in the United Kingdom, Regenerate Global Limited operates as a multidisciplinary corporate entity spanning international technology distribution, telecommunications consulting, global procurement, and strategic B2B solutions.
              </p>
              <p className="text-[#5F5B55] text-sm sm:text-base leading-relaxed mb-8">
                Over more than a decade of active commercial operations, the group has developed deep domain expertise in sourcing enterprise technology, managing complex supply contracts, and building cross-border commercial bridges between international suppliers and enterprise clients.
              </p>

              <div className="p-6 rounded-2xl bg-[#F7F6F3] border border-[#E4E1DB] flex items-start gap-4">
                <div className="p-3 rounded-xl bg-[#171717] text-[#C5A46D] shrink-0">
                  <ShieldCheck size={24} />
                </div>
                <div>
                  <h4 className="text-sm font-semibold text-[#171717] mb-1">UK Registered Entity — Est. 2013</h4>
                  <p className="text-xs text-[#5F5B55] leading-relaxed">
                    Operating under full regulatory compliance, governance, and rigorous corporate standards across all business divisions.
                  </p>
                </div>
              </div>
            </div>

            {/* Right Capabilities Grid */}
            <div className="lg:col-span-7 grid grid-cols-1 sm:grid-cols-2 gap-5">
              <div className="p-6 rounded-2xl bg-[#F7F6F3] hover:bg-[#F1EFEA]/80 border border-[#E4E1DB] transition-all duration-200 group">
                <div className="w-10 h-10 rounded-xl bg-[#F1EFEA] border border-[#E4E1DB] flex items-center justify-center text-[#B08D57] mb-4 group-hover:scale-105 transition-transform">
                  <Globe size={20} />
                </div>
                <h3 className="text-base font-semibold text-[#171717] mb-2">Global Connectivity</h3>
                <p className="text-xs sm:text-sm text-[#5F5B55] leading-relaxed">
                  Connecting commercial partners, device manufacturers, and enterprise networks across European and global markets.
                </p>
              </div>

              <div className="p-6 rounded-2xl bg-[#F7F6F3] hover:bg-[#F1EFEA]/80 border border-[#E4E1DB] transition-all duration-200 group">
                <div className="w-10 h-10 rounded-xl bg-[#F1EFEA] border border-[#E4E1DB] flex items-center justify-center text-[#B08D57] mb-4 group-hover:scale-105 transition-transform">
                  <Cpu size={20} />
                </div>
                <h3 className="text-base font-semibold text-[#171717] mb-2">Technology Ecosystems</h3>
                <p className="text-xs sm:text-sm text-[#5F5B55] leading-relaxed">
                  Integrating hardware sourcing with digital infrastructure, enterprise software, and mobile platform architectures.
                </p>
              </div>

              <div className="p-6 rounded-2xl bg-[#F7F6F3] hover:bg-[#F1EFEA]/80 border border-[#E4E1DB] transition-all duration-200 group">
                <div className="w-10 h-10 rounded-xl bg-[#F1EFEA] border border-[#E4E1DB] flex items-center justify-center text-[#B08D57] mb-4 group-hover:scale-105 transition-transform">
                  <Search size={20} />
                </div>
                <h3 className="text-base font-semibold text-[#171717] mb-2">Strategic Procurement</h3>
                <p className="text-xs sm:text-sm text-[#5F5B55] leading-relaxed">
                  End-to-end sourcing, tendering support, vendor auditing, and supply chain risk management for enterprise buyers.
                </p>
              </div>

              <div className="p-6 rounded-2xl bg-[#F7F6F3] hover:bg-[#F1EFEA]/80 border border-[#E4E1DB] transition-all duration-200 group">
                <div className="w-10 h-10 rounded-xl bg-[#F1EFEA] border border-[#E4E1DB] flex items-center justify-center text-[#B08D57] mb-4 group-hover:scale-105 transition-transform">
                  <Briefcase size={20} />
                </div>
                <h3 className="text-base font-semibold text-[#171717] mb-2">B2B Advisory</h3>
                <p className="text-xs sm:text-sm text-[#5F5B55] leading-relaxed">
                  Tailored corporate consulting, market expansion strategy, and commercial opportunity development.
                </p>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* ========================================================================= */}
      {/* SECTION 2: WHAT WE DO (CORE BUSINESS PILLARS)                            */}
      {/* ========================================================================= */}
      <section id="services" className="py-20 sm:py-28 px-6 sm:px-12 md:px-20 lg:px-28 bg-[#F7F6F3]">
        <div className="max-w-7xl mx-auto">
          <div className="text-center max-w-2xl mx-auto mb-16">
            <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-[#F1EFEA] border border-[#E4E1DB] text-[#B08D57] text-xs font-semibold tracking-wide uppercase mb-3">
              <Layers size={14} /> Core Capabilities
            </div>
            <h2 className="text-2xl sm:text-3xl lg:text-4xl font-semibold tracking-tight text-[#171717] mb-4">
              What We Do
            </h2>
            <p className="text-sm sm:text-base text-[#5F5B55] leading-relaxed">
              Regenerate Global provides an integrated suite of business solutions designed to support corporate growth, hardware distribution, and digital transformation.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {/* Pillar 1: Technology & IT */}
            <div className="bg-white p-8 rounded-2xl border border-[#E4E1DB] shadow-sm hover:border-[#D6D1C8] hover:shadow-md transition-all duration-200 flex flex-col justify-between">
              <div>
                <div className="w-12 h-12 rounded-xl bg-[#F1EFEA] border border-[#E4E1DB] text-[#B08D57] flex items-center justify-center mb-6">
                  <Cpu size={24} />
                </div>
                <h3 className="text-lg font-semibold text-[#171717] mb-3">Technology & IT</h3>
                <p className="text-xs sm:text-sm text-[#5F5B55] leading-relaxed mb-6">
                  Comprehensive IT solutions, enterprise systems integration, and technology management tailored to organizational objectives.
                </p>
                <ul className="space-y-2 mb-6">
                  {['IT Infrastructure Consulting', 'Technology Systems Integration', 'Digital Solution Deployment'].map((item) => (
                    <li key={item} className="flex items-center gap-2 text-xs text-[#3A3834] font-medium">
                      <CheckCircle2 size={14} className="text-[#B08D57] shrink-0" />
                      {item}
                    </li>
                  ))}
                </ul>
              </div>
            </div>

            {/* Pillar 2: Telecommunications */}
            <div className="bg-white p-8 rounded-2xl border border-[#E4E1DB] shadow-sm hover:border-[#D6D1C8] hover:shadow-md transition-all duration-200 flex flex-col justify-between">
              <div>
                <div className="w-12 h-12 rounded-xl bg-[#F1EFEA] border border-[#E4E1DB] text-[#B08D57] flex items-center justify-center mb-6">
                  <Radio size={24} />
                </div>
                <h3 className="text-lg font-semibold text-[#171717] mb-3">Telecommunications</h3>
                <p className="text-xs sm:text-sm text-[#5F5B55] leading-relaxed mb-6">
                  End-to-end telecommunications support, mobile network hardware sourcing, and corporate communications solutions.
                </p>
                <ul className="space-y-2 mb-6">
                  {['Telecom Infrastructure Hardware', 'Mobile Enterprise Solutions', 'Communications Strategy'].map((item) => (
                    <li key={item} className="flex items-center gap-2 text-xs text-[#3A3834] font-medium">
                      <CheckCircle2 size={14} className="text-[#B08D57] shrink-0" />
                      {item}
                    </li>
                  ))}
                </ul>
              </div>
            </div>

            {/* Pillar 3: Procurement & Sourcing */}
            <div className="bg-white p-8 rounded-2xl border border-[#E4E1DB] shadow-sm hover:border-[#D6D1C8] hover:shadow-md transition-all duration-200 flex flex-col justify-between">
              <div>
                <div className="w-12 h-12 rounded-xl bg-[#F1EFEA] border border-[#E4E1DB] text-[#B08D57] flex items-center justify-center mb-6">
                  <ShieldCheck size={24} />
                </div>
                <h3 className="text-lg font-semibold text-[#171717] mb-3">Procurement & Sourcing</h3>
                <p className="text-xs sm:text-sm text-[#5F5B55] leading-relaxed mb-6">
                  Global vendor identification, strategic bidding support, supply chain tendering, and risk mitigation.
                </p>
                <ul className="space-y-2 mb-6">
                  {['International Supplier Sourcing', 'Tendering & Bidding Support', 'Vendor Relationship Management'].map((item) => (
                    <li key={item} className="flex items-center gap-2 text-xs text-[#3A3834] font-medium">
                      <CheckCircle2 size={14} className="text-[#B08D57] shrink-0" />
                      {item}
                    </li>
                  ))}
                </ul>
              </div>
            </div>

            {/* Pillar 4: B2B Solutions */}
            <div className="bg-white p-8 rounded-2xl border border-[#E4E1DB] shadow-sm hover:border-[#D6D1C8] hover:shadow-md transition-all duration-200 flex flex-col justify-between">
              <div>
                <div className="w-12 h-12 rounded-xl bg-[#F1EFEA] border border-[#E4E1DB] text-[#B08D57] flex items-center justify-center mb-6">
                  <Briefcase size={24} />
                </div>
                <h3 className="text-lg font-semibold text-[#171717] mb-3">B2B Business Solutions</h3>
                <p className="text-xs sm:text-sm text-[#5F5B55] leading-relaxed mb-6">
                  Commercial strategy consulting, business development advisory, and facilitating B2B trade partnerships.
                </p>
                <ul className="space-y-2 mb-6">
                  {['Commercial Strategy & Growth', 'Cross-Border B2B Partnerships', 'Business Opportunity Development'].map((item) => (
                    <li key={item} className="flex items-center gap-2 text-xs text-[#3A3834] font-medium">
                      <CheckCircle2 size={14} className="text-[#B08D57] shrink-0" />
                      {item}
                    </li>
                  ))}
                </ul>
              </div>
            </div>

            {/* Pillar 5: Digital & Web */}
            <div className="bg-white p-8 rounded-2xl border border-[#E4E1DB] shadow-sm hover:border-[#D6D1C8] hover:shadow-md transition-all duration-200 flex flex-col justify-between">
              <div>
                <div className="w-12 h-12 rounded-xl bg-[#F1EFEA] border border-[#E4E1DB] text-[#B08D57] flex items-center justify-center mb-6">
                  <Code size={24} />
                </div>
                <h3 className="text-lg font-semibold text-[#171717] mb-3">Digital & Web Solutions</h3>
                <p className="text-xs sm:text-sm text-[#5F5B55] leading-relaxed mb-6">
                  Custom website engineering, enterprise web platforms, mobile application design, and e-commerce systems.
                </p>
                <ul className="space-y-2 mb-6">
                  {['Enterprise Web Development', 'B2B E-Commerce Platforms', 'Mobile Application Design'].map((item) => (
                    <li key={item} className="flex items-center gap-2 text-xs text-[#3A3834] font-medium">
                      <CheckCircle2 size={14} className="text-[#B08D57] shrink-0" />
                      {item}
                    </li>
                  ))}
                </ul>
              </div>
            </div>

            {/* Pillar 6: Technology Trading & Wholesale */}
            <div className="bg-white p-8 rounded-2xl border border-[#E4E1DB] shadow-sm hover:border-[#D6D1C8] hover:shadow-md transition-all duration-200 flex flex-col justify-between">
              <div>
                <div className="w-12 h-12 rounded-xl bg-[#F1EFEA] border border-[#E4E1DB] text-[#B08D57] flex items-center justify-center mb-6">
                  <Smartphone size={24} />
                </div>
                <h3 className="text-lg font-semibold text-[#171717] mb-3">Technology Trading & Wholesale</h3>
                <p className="text-xs sm:text-sm text-[#5F5B55] leading-relaxed mb-6">
                  Wholesale distribution of new, pre-owned, and certified refurbished mobile devices, laptops, and consumer electronics.
                </p>
                <ul className="space-y-2 mb-6">
                  {['Mobile Devices & Tablets', 'Pre-Owned & Refurbished Hardware', 'Global Wholesale Logistics'].map((item) => (
                    <li key={item} className="flex items-center gap-2 text-xs text-[#3A3834] font-medium">
                      <CheckCircle2 size={14} className="text-[#B08D57] shrink-0" />
                      {item}
                    </li>
                  ))}
                </ul>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* ========================================================================= */}
      {/* SECTION 3: OUR EXPERTISE (MULTIDISCIPLINARY AREAS)                        */}
      {/* ========================================================================= */}
      <section id="expertise" className="py-20 sm:py-28 px-6 sm:px-12 md:px-20 lg:px-28 bg-white border-y border-[#E4E1DB]">
        <div className="max-w-7xl mx-auto">
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 items-center">
            <div className="lg:col-span-5">
              <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-[#F1EFEA] border border-[#E4E1DB] text-[#B08D57] text-xs font-semibold tracking-wide uppercase mb-4">
                <Compass size={14} /> Domain Coverage
              </div>
              <h2 className="text-2xl sm:text-3xl lg:text-4xl font-semibold tracking-tight text-[#171717] mb-4">
                Multidisciplinary Areas of Expertise
              </h2>
              <p className="text-sm sm:text-base text-[#5F5B55] leading-relaxed mb-6">
                Regenerate Global operates across connected industrial and technological domains, providing unified oversight across procurement, digital platforms, and physical device supply chains.
              </p>
              <div className="p-5 rounded-2xl bg-[#F7F6F3] border border-[#E4E1DB]">
                <p className="text-xs sm:text-sm text-[#3A3834] font-medium leading-relaxed">
                  "Our cross-sector capability allows us to advise, source, and deliver across complex business requirements without domain silos."
                </p>
              </div>
            </div>

            <div className="lg:col-span-7">
              <div className="grid grid-cols-2 sm:grid-cols-3 gap-3">
                {[
                  'Telecommunications',
                  'IT & Infrastructure',
                  'Global Procurement',
                  'B2B Solutions',
                  'Technology Sourcing',
                  'Digital Development',
                  'E-Commerce Platforms',
                  'Mobile Applications',
                  'Business Consulting',
                  'Sales & Distribution',
                  'Wholesale Trading',
                  'Supply Chain Strategy'
                ].map((item) => (
                  <div
                    key={item}
                    className="p-4 rounded-xl bg-[#F7F6F3] border border-[#E4E1DB] hover:border-[#B08D57]/40 hover:bg-[#F1EFEA] transition-all duration-200 flex items-center justify-between group"
                  >
                    <span className="text-xs sm:text-sm font-medium text-[#3A3834] group-hover:text-[#B08D57]">
                      {item}
                    </span>
                    <ChevronRight size={14} className="text-[#858078] group-hover:text-[#B08D57] transition-transform group-hover:translate-x-0.5" />
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* ========================================================================= */}
      {/* SECTION 4: OUR CONSULTATIVE APPROACH                                     */}
      {/* ========================================================================= */}
      <section id="approach" className="py-20 sm:py-28 px-6 sm:px-12 md:px-20 lg:px-28 bg-[#F7F6F3]">
        <div className="max-w-7xl mx-auto">
          <div className="text-center max-w-2xl mx-auto mb-16">
            <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-[#F1EFEA] border border-[#E4E1DB] text-[#B08D57] text-xs font-semibold tracking-wide uppercase mb-3">
              <Workflow size={14} /> Methodology
            </div>
            <h2 className="text-2xl sm:text-3xl lg:text-4xl font-semibold tracking-tight text-[#171717] mb-4">
              Our Business Approach
            </h2>
            <p className="text-sm sm:text-base text-[#5F5B55] leading-relaxed">
              We employ a structured, consultative approach to understand specific business challenges before deploying solutions or sourcing hardware.
            </p>
          </div>

          {/* Workflow Steps Grid */}
          <div className="grid grid-cols-1 md:grid-cols-3 lg:grid-cols-6 gap-4">
            {[
              { num: '01', title: 'Understand', desc: 'Analyzing client requirements, technical specifications, and strategic goals.' },
              { num: '02', title: 'Source', desc: 'Leveraging global vendor networks to procure optimal hardware or services.' },
              { num: '03', title: 'Develop', desc: 'Engineering custom digital platforms, web systems, or procurement frameworks.' },
              { num: '04', title: 'Connect', desc: 'Facilitating commercial B2B relationships, agreements, and supply channels.' },
              { num: '05', title: 'Deliver', desc: 'Executing quality assurance, logistics management, and solution deployment.' },
              { num: '06', title: 'Grow', desc: 'Providing ongoing strategic advisory to enable long-term operational scale.' }
            ].map((step) => (
              <div
                key={step.num}
                className="bg-white p-6 rounded-2xl border border-[#E4E1DB] shadow-sm hover:border-[#B08D57]/50 transition-all duration-200 flex flex-col justify-between"
              >
                <div>
                  <span className="text-xs font-bold text-[#B08D57] tracking-wider block mb-2">
                    {step.num}
                  </span>
                  <h3 className="text-base font-semibold text-[#171717] mb-2">
                    {step.title}
                  </h3>
                  <p className="text-xs text-[#5F5B55] leading-relaxed">
                    {step.desc}
                  </p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ========================================================================= */}
      {/* SECTION 5: BUSINESS & TECHNOLOGY ECOSYSTEM                                */}
      {/* ========================================================================= */}
      <section id="ecosystem" className="py-20 sm:py-28 px-6 sm:px-12 md:px-20 lg:px-28 bg-white border-y border-[#E4E1DB]">
        <div className="max-w-7xl mx-auto">
          <div className="max-w-2xl mb-14">
            <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-[#F1EFEA] border border-[#E4E1DB] text-[#B08D57] text-xs font-semibold tracking-wide uppercase mb-3">
              <TrendingUp size={14} /> Connected Operations
            </div>
            <h2 className="text-2xl sm:text-3xl lg:text-4xl font-semibold tracking-tight text-[#171717] mb-4">
              Integrated Business & Technology Architecture
            </h2>
            <p className="text-sm sm:text-base text-[#5F5B55] leading-relaxed">
              Regenerate Global connects commercial decision-making with physical technology supply chains and digital execution.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            <div className="p-8 rounded-2xl bg-[#F7F6F3] border border-[#E4E1DB]">
              <div className="w-10 h-10 rounded-xl bg-[#F1EFEA] border border-[#E4E1DB] flex items-center justify-center text-[#B08D57] mb-5">
                <Building2 size={20} />
              </div>
              <h3 className="text-lg font-semibold text-[#171717] mb-2">1. Corporate Strategy</h3>
              <p className="text-xs sm:text-sm text-[#5F5B55] leading-relaxed">
                Advising businesses on international market entry, vendor contract negotiation, and commercial risk management.
              </p>
            </div>

            <div className="p-8 rounded-2xl bg-[#F7F6F3] border border-[#E4E1DB]">
              <div className="w-10 h-10 rounded-xl bg-[#F1EFEA] border border-[#E4E1DB] flex items-center justify-center text-[#B08D57] mb-5">
                <Monitor size={20} />
              </div>
              <h3 className="text-lg font-semibold text-[#171717] mb-2">2. Digital Systems</h3>
              <p className="text-xs sm:text-sm text-[#5F5B55] leading-relaxed">
                Developing robust e-commerce platforms, web tools, and application interfaces that drive modern B2B interactions.
              </p>
            </div>

            <div className="p-8 rounded-2xl bg-[#F7F6F3] border border-[#E4E1DB]">
              <div className="w-10 h-10 rounded-xl bg-[#F1EFEA] border border-[#E4E1DB] flex items-center justify-center text-[#B08D57] mb-5">
                <Smartphone size={20} />
              </div>
              <h3 className="text-lg font-semibold text-[#171717] mb-2">3. Hardware Sourcing</h3>
              <p className="text-xs sm:text-sm text-[#5F5B55] leading-relaxed">
                Executing bulk procurement and distribution of consumer technology devices and telecommunications equipment.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* ========================================================================= */}
      {/* SECTION 6: TECHNOLOGY & WHOLESALE DIVISION                                */}
      {/* ========================================================================= */}
      <section id="wholesale" className="py-20 sm:py-28 px-6 sm:px-12 md:px-20 lg:px-28 bg-[#F7F6F3]">
        <div className="max-w-7xl mx-auto">
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 items-center">
            <div className="lg:col-span-6">
              <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-[#F1EFEA] border border-[#E4E1DB] text-[#B08D57] text-xs font-semibold tracking-wide uppercase mb-4">
                <Smartphone size={14} /> Technology & Wholesale Division
              </div>
              <h2 className="text-2xl sm:text-3xl lg:text-4xl font-semibold tracking-tight text-[#171717] mb-6">
                Global Electronics & Mobile Hardware Sourcing
              </h2>
              <p className="text-sm sm:text-base text-[#5F5B55] leading-relaxed mb-6">
                As part of the company's broader operational portfolio, Regenerate Global conducts international trading and wholesale supply of consumer and enterprise electronics.
              </p>
              <p className="text-sm sm:text-base text-[#5F5B55] leading-relaxed mb-8">
                The division caters to enterprise buyers, retailers, and commercial partners seeking reliable bulk access to mobile devices, computers, and smart accessories across varied condition grades.
              </p>

              <div className="grid grid-cols-2 gap-4 mb-6">
                <div className="p-4 rounded-xl bg-white border border-[#E4E1DB]">
                  <h4 className="text-sm font-semibold text-[#171717] mb-1">New & Pre-Owned</h4>
                  <p className="text-xs text-[#5F5B55]">Brand new sealed inventory alongside inspected pre-owned units.</p>
                </div>
                <div className="p-4 rounded-xl bg-white border border-[#E4E1DB]">
                  <h4 className="text-sm font-semibold text-[#171717] mb-1">Refurbished Tech</h4>
                  <p className="text-xs text-[#5F5B55]">Certified refurbished devices extending technology lifecycles.</p>
                </div>
              </div>

              {/* Link to Dedicated Grading Page */}
              <div className="p-5 rounded-2xl bg-[#F1EFEA] border border-[#E4E1DB] flex items-center justify-between gap-4">
                <div>
                  <h4 className="text-sm font-semibold text-[#171717]">Device Grading Standards</h4>
                  <p className="text-xs text-[#5F5B55]">View our 6-item grading framework & inspection process.</p>
                </div>
                <button
                  onClick={() => handleCtaClick('grading')}
                  className="px-4 py-2 rounded-xl bg-[#171717] hover:bg-[#3A3834] text-white text-xs font-semibold shrink-0 transition-colors cursor-pointer"
                >
                  View Grading Page →
                </button>
              </div>
            </div>

            <div className="lg:col-span-6">
              <div className="bg-white p-8 rounded-2xl border border-[#E4E1DB] shadow-sm space-y-6">
                <h3 className="text-lg font-semibold text-[#171717] border-b border-[#E4E1DB] pb-4">
                  Hardware Categories & Capabilities
                </h3>

                <div className="space-y-4">
                  <div className="flex items-start gap-4">
                    <div className="p-2.5 rounded-lg bg-[#F1EFEA] text-[#B08D57] shrink-0">
                      <Smartphone size={18} />
                    </div>
                    <div>
                      <h4 className="text-sm font-semibold text-[#171717]">Mobile Phones & Tablets</h4>
                      <p className="text-xs text-[#5F5B55]">Bulk supply of major brand smartphones, enterprise tablets, and cellular devices.</p>
                    </div>
                  </div>

                  <div className="flex items-start gap-4">
                    <div className="p-2.5 rounded-lg bg-[#F1EFEA] text-[#B08D57] shrink-0">
                      <Monitor size={18} />
                    </div>
                    <div>
                      <h4 className="text-sm font-semibold text-[#171717]">Laptops & Workstations</h4>
                      <p className="text-xs text-[#5F5B55]">Commercial laptops, computing hardware, and workplace technology setups.</p>
                    </div>
                  </div>

                  <div className="flex items-start gap-4">
                    <div className="p-2.5 rounded-lg bg-[#F1EFEA] text-[#B08D57] shrink-0">
                      <Server size={18} />
                    </div>
                    <div>
                      <h4 className="text-sm font-semibold text-[#171717]">Smart Electronics & Wearables</h4>
                      <p className="text-xs text-[#5F5B55]">Smartwatches, wireless audio, connected IoT hardware, and accessories.</p>
                    </div>
                  </div>
                </div>

                <div className="pt-4 border-t border-[#E4E1DB]">
                  <button
                    onClick={() => handleCtaClick('home', 'contact')}
                    className="inline-flex items-center justify-center w-full gap-2 text-xs font-semibold text-[#171717] bg-[#F1EFEA] hover:bg-[#171717] hover:text-white py-3 rounded-xl transition-all duration-200 border border-[#E4E1DB] group cursor-pointer"
                  >
                    Request Wholesale Inventory Details & Catalog
                    <span className="text-[#B08D57] group-hover:text-[#C5A46D] transition-transform group-hover:translate-x-0.5">→</span>
                  </button>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* ========================================================================= */}
      {/* SECTION 7: CORPORATE INFORMATION                                         */}
      {/* ========================================================================= */}
      <section id="corporate" className="py-20 sm:py-28 px-6 sm:px-12 md:px-20 lg:px-28 bg-white border-y border-[#E4E1DB]">
        <div className="max-w-7xl mx-auto">
          <div className="max-w-2xl mb-12">
            <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-[#F1EFEA] border border-[#E4E1DB] text-[#B08D57] text-xs font-semibold tracking-wide uppercase mb-3">
              <ShieldCheck size={14} /> Corporate Governance
            </div>
            <h2 className="text-2xl sm:text-3xl lg:text-4xl font-semibold tracking-tight text-[#171717] mb-4">
              Corporate Information & Credentials
            </h2>
            <p className="text-sm sm:text-base text-[#5F5B55] leading-relaxed">
              Transparent corporate status and verified company information for business partners and international clients.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
            <div className="p-6 rounded-2xl bg-[#F7F6F3] border border-[#E4E1DB]">
              <span className="text-xs text-[#858078] uppercase font-semibold tracking-wider block mb-1">Company Name</span>
              <span className="text-base font-semibold text-[#171717]">Regenerate Global Limited</span>
            </div>

            <div className="p-6 rounded-2xl bg-[#F7F6F3] border border-[#E4E1DB]">
              <span className="text-xs text-[#858078] uppercase font-semibold tracking-wider block mb-1">Incorporation Year</span>
              <span className="text-base font-semibold text-[#171717]">2013 (Established)</span>
            </div>

            <div className="p-6 rounded-2xl bg-[#F7F6F3] border border-[#E4E1DB]">
              <span className="text-xs text-[#858078] uppercase font-semibold tracking-wider block mb-1">Jurisdiction</span>
              <span className="text-base font-semibold text-[#171717]">United Kingdom</span>
            </div>

            <div className="p-6 rounded-2xl bg-[#F7F6F3] border border-[#E4E1DB]">
              <span className="text-xs text-[#858078] uppercase font-semibold tracking-wider block mb-1">Core Sectors</span>
              <span className="text-base font-semibold text-[#171717]">Telecom, IT, B2B & Wholesale</span>
            </div>
          </div>
        </div>
      </section>

      {/* ========================================================================= */}
      {/* SECTION 8: CONTACT & BUSINESS ENQUIRIES                                   */}
      {/* ========================================================================= */}
      <section id="contact" className="py-20 sm:py-28 px-6 sm:px-12 md:px-20 lg:px-28 bg-[#F7F6F3]">
        <div className="max-w-7xl mx-auto">
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 items-start">
            {/* Left Contact Info */}
            <div className="lg:col-span-5">
              <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-[#F1EFEA] border border-[#E4E1DB] text-[#B08D57] text-xs font-semibold tracking-wide uppercase mb-4">
                <Mail size={14} /> Corporate Enquiries
              </div>
              <h2 className="text-2xl sm:text-3xl lg:text-4xl font-semibold tracking-tight text-[#171717] mb-6">
                Talk to Regenerate Global
              </h2>
              <p className="text-sm sm:text-base text-[#5F5B55] leading-relaxed mb-8">
                Whether you are exploring global technology procurement, seeking B2B consultancy, or evaluating wholesale hardware supply, our corporate team is ready to discuss your requirements.
              </p>

              <div className="space-y-6 mb-8">
                <div className="flex items-start gap-4">
                  <div className="p-3 rounded-xl bg-[#F1EFEA] border border-[#E4E1DB] text-[#B08D57] shrink-0">
                    <MapPin size={20} />
                  </div>
                  <div>
                    <h4 className="text-sm font-semibold text-[#171717]">Corporate Location</h4>
                    <p className="text-xs sm:text-sm text-[#5F5B55]">United Kingdom</p>
                  </div>
                </div>

                <div className="flex items-start gap-4">
                  <div className="p-3 rounded-xl bg-[#F1EFEA] border border-[#E4E1DB] text-[#B08D57] shrink-0">
                    <Phone size={20} />
                  </div>
                  <div>
                    <h4 className="text-sm font-semibold text-[#171717]">Phone</h4>
                    <p className="text-xs sm:text-sm text-[#5F5B55] font-medium">+ 02080044421</p>
                  </div>
                </div>

                <div className="flex items-start gap-4">
                  <div className="p-3 rounded-xl bg-[#F1EFEA] border border-[#E4E1DB] text-[#B08D57] shrink-0">
                    <Mail size={20} />
                  </div>
                  <div>
                    <h4 className="text-sm font-semibold text-[#171717]">Business Enquiries</h4>
                    <p className="text-xs sm:text-sm text-[#5F5B55]">contact@regenerateglobal.com</p>
                  </div>
                </div>

                <div className="flex items-start gap-4">
                  <div className="p-3 rounded-xl bg-[#F1EFEA] border border-[#E4E1DB] text-[#B08D57] shrink-0">
                    <Clock size={20} />
                  </div>
                  <div>
                    <h4 className="text-sm font-semibold text-[#171717]">Business Hours</h4>
                    <p className="text-xs sm:text-sm text-[#5F5B55]">Mon – Sat: 9:00 am – 5:00 pm</p>
                    <p className="text-xs sm:text-sm text-[#858078] font-semibold">Sunday: CLOSED</p>
                  </div>
                </div>
              </div>
            </div>

            {/* Right Contact Form */}
            <div className="lg:col-span-7">
              <div className="bg-white p-8 sm:p-10 rounded-3xl border border-[#E4E1DB] shadow-sm">
                <h3 className="text-xl font-semibold text-[#171717] mb-2">Submit a Business Enquiry</h3>
                <p className="text-xs sm:text-sm text-[#5F5B55] mb-6">
                  Fill out the form below to connect directly with our corporate team.
                </p>

                {formSubmitted ? (
                  <div className="p-6 rounded-2xl bg-[#F1EFEA] border border-[#B08D57]/40 text-[#171717] text-center animate-in fade-in duration-300">
                    <CheckCircle2 size={36} className="mx-auto mb-3 text-[#B08D57]" />
                    <h4 className="text-base font-semibold mb-1">Enquiry Received</h4>
                    <p className="text-xs text-[#5F5B55]">
                      Thank you for contacting Regenerate Global. A business representative will review your message and reach out shortly.
                    </p>
                  </div>
                ) : (
                  <form onSubmit={handleFormSubmit} className="space-y-4">
                    <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                      <div>
                        <label className="block text-xs font-semibold text-[#3A3834] uppercase tracking-wider mb-1.5">
                          Full Name *
                        </label>
                        <input
                          type="text"
                          required
                          value={formData.name}
                          onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                          placeholder="e.g. Sarah Jenkins"
                          className="w-full px-4 py-3 rounded-xl border border-[#E4E1DB] text-xs sm:text-sm focus:outline-none focus:border-[#B08D57] focus:ring-1 focus:ring-[#B08D57] bg-[#F7F6F3] text-[#171717]"
                        />
                      </div>
                      <div>
                        <label className="block text-xs font-semibold text-[#3A3834] uppercase tracking-wider mb-1.5">
                          Company / Organisation *
                        </label>
                        <input
                          type="text"
                          required
                          value={formData.company}
                          onChange={(e) => setFormData({ ...formData, company: e.target.value })}
                          placeholder="e.g. Enterprise Solutions Ltd"
                          className="w-full px-4 py-3 rounded-xl border border-[#E4E1DB] text-xs sm:text-sm focus:outline-none focus:border-[#B08D57] focus:ring-1 focus:ring-[#B08D57] bg-[#F7F6F3] text-[#171717]"
                        />
                      </div>
                    </div>

                    <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                      <div>
                        <label className="block text-xs font-semibold text-[#3A3834] uppercase tracking-wider mb-1.5">
                          Corporate Email *
                        </label>
                        <input
                          type="email"
                          required
                          value={formData.email}
                          onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                          placeholder="e.g. s.jenkins@company.com"
                          className="w-full px-4 py-3 rounded-xl border border-[#E4E1DB] text-xs sm:text-sm focus:outline-none focus:border-[#B08D57] focus:ring-1 focus:ring-[#B08D57] bg-[#F7F6F3] text-[#171717]"
                        />
                      </div>
                      <div>
                        <label className="block text-xs font-semibold text-[#3A3834] uppercase tracking-wider mb-1.5">
                          Primary Area of Interest
                        </label>
                        <select
                          value={formData.service}
                          onChange={(e) => setFormData({ ...formData, service: e.target.value })}
                          className="w-full px-4 py-3 rounded-xl border border-[#E4E1DB] text-xs sm:text-sm focus:outline-none focus:border-[#B08D57] focus:ring-1 focus:ring-[#B08D57] bg-[#F7F6F3] text-[#171717]"
                        >
                          <option>General Business Enquiry</option>
                          <option>Technology & IT Procurement</option>
                          <option>Telecommunications Solutions</option>
                          <option>B2B Consulting & Partnership</option>
                          <option>Digital & Web Development</option>
                          <option>Technology Trading & Wholesale</option>
                        </select>
                      </div>
                    </div>

                    <div>
                      <label className="block text-xs font-semibold text-[#3A3834] uppercase tracking-wider mb-1.5">
                        Message / Details *
                      </label>
                      <textarea
                        required
                        rows={4}
                        value={formData.message}
                        onChange={(e) => setFormData({ ...formData, message: e.target.value })}
                        placeholder="Briefly describe your enquiry or business requirement..."
                        className="w-full px-4 py-3 rounded-xl border border-[#E4E1DB] text-xs sm:text-sm focus:outline-none focus:border-[#B08D57] focus:ring-1 focus:ring-[#B08D57] bg-[#F7F6F3] text-[#171717]"
                      />
                    </div>

                    <button
                      type="submit"
                      className="inline-flex items-center justify-center gap-2 w-full text-xs sm:text-sm font-medium text-white bg-[#171717] hover:bg-[#3A3834] py-3.5 px-6 rounded-xl transition-all duration-200 shadow-md group cursor-pointer"
                    >
                      Talk to Regenerate Global
                      <Send size={16} className="text-[#C5A46D] transition-transform group-hover:translate-x-0.5" />
                    </button>
                  </form>
                )}
              </div>
            </div>
          </div>
        </div>
      </section>
    </>
  );
};
