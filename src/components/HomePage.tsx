import React, { useState, useEffect, useRef } from 'react';
import emailjs from '@emailjs/browser';
import { SilkHero } from './SilkHero';
import LogoLoop from './LogoLoop';
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
  Send,
  AlertCircle,
  Loader2,
  Award,
  Truck,
  ShoppingBag
} from 'lucide-react';
import type { PageView } from '../types';
import ThreeDCarousel from './ThreeDCarousel';
import { TrustedUsers } from './TrustedUsers';
import { ThreeDScrollTriggerContainer, ThreeDScrollTriggerRow } from './ThreeDScrollTrigger';






interface HomePageProps {
  setActivePage: (page: PageView) => void;
}

export const HomePage: React.FC<HomePageProps> = ({ setActivePage }) => {
  const formRef = useRef<HTMLFormElement>(null);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [submitStatus, setSubmitStatus] = useState<'idle' | 'success' | 'error'>('idle');
  const [errorMessage, setErrorMessage] = useState('');
  const [formData, setFormData] = useState({
    name: '',
    company: '',
    email: '',
    service: 'General Business Enquiry',
    message: ''
  });

  useEffect(() => {
    const publicKey = import.meta.env.VITE_EMAILJS_PUBLIC_KEY;
    if (publicKey) {
      emailjs.init({
        publicKey: publicKey,
      });
    }
  }, []);

  const fullHeadlineText = "Connecting Technology,\nBusiness And Opportunity\nGlobally.";

  const handleFormSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    if (isSubmitting) return;

    setErrorMessage('');
    setSubmitStatus('idle');
    setIsSubmitting(true);

    const formElement = formRef.current || e.currentTarget;
    const serviceId = import.meta.env.VITE_EMAILJS_SERVICE_ID;
    const templateId = import.meta.env.VITE_EMAILJS_TEMPLATE_ID;
    const publicKey = import.meta.env.VITE_EMAILJS_PUBLIC_KEY;

    try {
      if (!serviceId || !templateId || !publicKey) {
        console.error("EmailJS environment variables (VITE_EMAILJS_PUBLIC_KEY, VITE_EMAILJS_SERVICE_ID, VITE_EMAILJS_TEMPLATE_ID) are missing or empty.");
        setSubmitStatus('error');
        setErrorMessage("EmailJS credentials are missing or empty in your .env file. Please add your keys to .env and restart your Vite server.");
        return;
      }

      await emailjs.sendForm(
        serviceId,
        templateId,
        formElement,
        publicKey
      );

      // On Success: reset form fields and set success state
      setSubmitStatus('success');
      setFormData({
        name: '',
        company: '',
        email: '',
        service: 'General Business Enquiry',
        message: ''
      });
    } catch (error) {
      console.error("EmailJS submission error:", error);
      setSubmitStatus('error');
      setErrorMessage("We couldn't send your enquiry. Please try again or contact us directly.");
    } finally {
      setIsSubmitting(false);
    }
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
      {/* 1. HERO SECTION WITH REACT BITS SILK CANVAS BACKGROUND                    */}
      {/* ========================================================================= */}
      <SilkHero
        setActivePage={setActivePage}
        fullHeadlineText={fullHeadlineText}
        handleCtaClick={handleCtaClick}
      />

      {/* ========================================================================= */}
      {/* 2. WHAT WE DO (CORE BUSINESS PILLARS)                                    */}
      {/* ========================================================================= */}
      {/* ========================================================================= */}
      {/* 2. WHAT WE DO (CORE BUSINESS PILLARS - 3D CAROUSEL)                      */}
      {/* ========================================================================= */}
      <section id="services" className="py-20 sm:py-28 px-4 sm:px-8 md:px-12 bg-[#041626] border-y border-[#00A3E0]/20 relative overflow-hidden">
        {/* Ambient glow background */}
        <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[600px] h-[350px] bg-[#00A3E0]/10 blur-[120px] rounded-full pointer-events-none" />

        <div className="max-w-7xl mx-auto relative z-10">
          <div className="text-center max-w-2xl mx-auto mb-6">
            <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-[#00A3E0]/15 border border-[#00A3E0]/40 text-[#00A3E0] text-xs font-semibold tracking-wide uppercase mb-3 shadow-sm">
              <Layers size={14} className="text-[#00A3E0]" /> Core Capabilities
            </div>
            <h2 className="text-2xl sm:text-3xl lg:text-4xl font-semibold tracking-tight text-white mb-4">
              What We Do
            </h2>
            <p className="text-sm sm:text-base text-gray-300 leading-relaxed">
              Regenerate Global provides an integrated suite of business solutions designed to support corporate growth, hardware distribution, and digital transformation.
            </p>
          </div>

          <ThreeDCarousel
            items={[
              {
                id: 1,
                title: "Technology & IT",
                brand: "Core Infrastructure",
                description: "Comprehensive IT solutions, enterprise systems integration, and technology management tailored to organizational objectives.",
                tags: ["IT Infrastructure", "Systems Integration", "Digital Deployment"],
                imageUrl: "https://images.unsplash.com/photo-1518770660439-4636190af475?q=80&w=1200&auto=format&fit=crop",
                link: "#contact",
                icon: <Cpu size={22} />,
                features: [
                  "IT Infrastructure Consulting",
                  "Technology Systems Integration",
                  "Digital Solution Deployment"
                ]
              },
              {
                id: 2,
                title: "Telecommunications",
                brand: "Connectivity Sourcing",
                description: "End-to-end telecommunications support, mobile network hardware sourcing, and corporate communications solutions.",
                tags: ["Telecom Hardware", "Mobile Enterprise", "Comms Strategy"],
                imageUrl: "https://images.unsplash.com/photo-1544197150-b99a580bb7a8?q=80&w=1200&auto=format&fit=crop",
                link: "#contact",
                icon: <Radio size={22} />,
                features: [
                  "Telecom Infrastructure Hardware",
                  "Mobile Enterprise Solutions",
                  "Communications Strategy"
                ]
              },
              {
                id: 3,
                title: "Procurement & Sourcing",
                brand: "Supply Chain & Risk",
                description: "Global vendor identification, strategic bidding support, supply chain tendering, and risk mitigation.",
                tags: ["Global Sourcing", "Tendering & Bids", "Vendor Management"],
                imageUrl: "https://images.unsplash.com/photo-1586528116311-ad8dd3c8310d?q=80&w=1200&auto=format&fit=crop",
                link: "#contact",
                icon: <ShieldCheck size={22} />,
                features: [
                  "International Supplier Sourcing",
                  "Tendering & Bidding Support",
                  "Vendor Relationship Management"
                ]
              },
              {
                id: 4,
                title: "B2B Business Solutions",
                brand: "Growth & Trade Advisory",
                description: "Commercial strategy consulting, business development advisory, and facilitating B2B trade partnerships.",
                tags: ["Growth Strategy", "B2B Partnerships", "Business Development"],
                imageUrl: "https://images.unsplash.com/photo-1486406146926-c627a92ad1ab?q=80&w=1200&auto=format&fit=crop",
                link: "#contact",
                icon: <Briefcase size={22} />,
                features: [
                  "Commercial Strategy & Growth",
                  "Cross-Border B2B Partnerships",
                  "Business Opportunity Development"
                ]
              },
              {
                id: 5,
                title: "Digital & Web Solutions",
                brand: "Engineering Platforms",
                description: "Custom website engineering, enterprise web platforms, mobile application design, and e-commerce systems.",
                tags: ["Web Engineering", "E-Commerce", "Mobile Apps"],
                imageUrl: "https://images.unsplash.com/photo-1555066931-4365d14bab8c?q=80&w=1200&auto=format&fit=crop",
                link: "#contact",
                icon: <Code size={22} />,
                features: [
                  "Enterprise Web Development",
                  "B2B E-Commerce Platforms",
                  "Mobile Application Design"
                ]
              },
              {
                id: 6,
                title: "Technology Trading & Wholesale",
                brand: "Hardware Distribution",
                description: "Wholesale distribution of new, pre-owned, and certified refurbished mobile devices, laptops, and consumer electronics.",
                tags: ["Wholesale Devices", "Refurbished Hardware", "Global Logistics"],
                imageUrl: "https://images.unsplash.com/photo-1511707171634-5f897ff02aa9?q=80&w=1200&auto=format&fit=crop",
                link: "#contact",
                icon: <Smartphone size={22} />,
                features: [
                  "Mobile Devices & Tablets",
                  "Pre-Owned & Refurbished Hardware",
                  "Global Wholesale Logistics"
                ]
              }
            ]}
            autoRotate={true}
            rotateInterval={4500}
            cardHeight={480}
          />
        </div>
      </section>

      {/* ========================================================================= */}
      {/* 3. TECHNOLOGY & WHOLESALE DIVISION                                       */}
      {/* ========================================================================= */}
      <section id="wholesale" className="py-20 sm:py-28 px-6 sm:px-12 md:px-20 lg:px-28 bg-white border-y border-[#E4E1DB]">
        <div className="max-w-7xl mx-auto">
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 items-center">
            <div className="lg:col-span-6">
              <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-[#041626] border border-[#00A3E0]/40 text-white text-xs font-semibold tracking-wide uppercase mb-4 shadow-sm">
                <Smartphone size={14} className="text-[#00A3E0]" /> Technology & Wholesale Division
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
                <div className="p-5 rounded-2xl bg-[#041626] text-white border border-[#00A3E0]/30 shadow-sm">
                  <h4 className="text-sm font-semibold text-white mb-1">New & Pre-Owned</h4>
                  <p className="text-xs text-white/80">Brand new sealed inventory alongside inspected pre-owned units.</p>
                </div>
                <div className="p-5 rounded-2xl bg-[#041626] text-white border border-[#00A3E0]/30 shadow-sm">
                  <h4 className="text-sm font-semibold text-white mb-1">Refurbished Tech</h4>
                  <p className="text-xs text-white/80">Certified refurbished devices extending technology lifecycles.</p>
                </div>
              </div>

              {/* Link to Dedicated Grading Page */}
              <div className="p-6 rounded-2xl bg-[#041626] text-white border border-[#00A3E0]/40 flex items-center justify-between gap-4 shadow-sm">
                <div>
                  <h4 className="text-sm font-semibold text-white">Device Grading Standards</h4>
                  <p className="text-xs text-white/80">View our 6-item grading framework & inspection process.</p>
                </div>
                <button
                  onClick={() => handleCtaClick('grading')}
                  className="px-5 py-2.5 rounded-xl bg-[#00A3E0] hover:bg-[#0084C7] text-white text-xs font-semibold shrink-0 transition-colors shadow-sm cursor-pointer"
                >
                  View Grading Page →
                </button>
              </div>
            </div>

            <div className="lg:col-span-6">
              <div className="bg-[#041626] text-white p-8 sm:p-10 rounded-3xl border border-[#00A3E0]/30 shadow-sm space-y-6">
                <h3 className="text-lg font-semibold text-white border-b border-white/15 pb-4">
                  Hardware Categories & Capabilities
                </h3>

                <div className="space-y-5">
                  <div className="flex items-start gap-4">
                    <div className="p-3 rounded-2xl bg-[#00A3E0]/15 border border-[#00A3E0]/40 text-[#00A3E0] shrink-0">
                      <Smartphone size={20} />
                    </div>
                    <div>
                      <h4 className="text-sm font-semibold text-white">Mobile Phones & Tablets</h4>
                      <p className="text-xs text-white/80 leading-relaxed">Bulk supply of major brand smartphones, enterprise tablets, and cellular devices.</p>
                    </div>
                  </div>

                  <div className="flex items-start gap-4">
                    <div className="p-3 rounded-2xl bg-[#00A3E0]/15 border border-[#00A3E0]/40 text-[#00A3E0] shrink-0">
                      <Monitor size={20} />
                    </div>
                    <div>
                      <h4 className="text-sm font-semibold text-white">Laptops & Workstations</h4>
                      <p className="text-xs text-white/80 leading-relaxed">Commercial laptops, computing hardware, and workplace technology setups.</p>
                    </div>
                  </div>

                  <div className="flex items-start gap-4">
                    <div className="p-3 rounded-2xl bg-[#00A3E0]/15 border border-[#00A3E0]/40 text-[#00A3E0] shrink-0">
                      <Server size={20} />
                    </div>
                    <div>
                      <h4 className="text-sm font-semibold text-white">Smart Electronics & Wearables</h4>
                      <p className="text-xs text-white/80 leading-relaxed">Smartwatches, wireless audio, connected IoT hardware, and accessories.</p>
                    </div>
                  </div>
                </div>

                <div className="pt-4 border-t border-white/15">
                  <button
                    onClick={() => handleCtaClick('home', 'contact')}
                    className="inline-flex items-center justify-center w-full gap-2 text-xs font-semibold text-white bg-[#00A3E0] hover:bg-[#0084C7] py-3.5 rounded-xl transition-colors shadow-sm cursor-pointer"
                  >
                    Request Wholesale Inventory Details & Catalog
                    <span>→</span>
                  </button>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* ========================================================================= */}
      {/* 3B. BRAND & PARTNER ECOSYSTEM (3 ANIMATION ROWS)                         */}
      {/* ========================================================================= */}
      <section id="brands" className="py-10 sm:py-14 px-4 sm:px-8 md:px-14 lg:px-20 bg-[#F7F6F3] border-b border-[#E4E1DB] overflow-hidden">
        <div className="max-w-7xl mx-auto space-y-8 sm:space-y-10">

          {/* Section Main Header */}
          <div className="text-center max-w-3xl mx-auto mb-2 sm:mb-4">
            <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-[#041626] border border-[#00A3E0]/40 text-white text-xs font-semibold tracking-wide uppercase mb-2 shadow-sm">
              <Award size={14} className="text-[#00A3E0]" /> Global Network & Partnerships
            </div>
            <h2 className="text-2xl sm:text-3xl font-semibold text-[#171717]">
              Our Global Partner Ecosystem
            </h2>
          </div>

          {/* --------------------------------------------------------------------- */}
          {/* ROW 1: OUR TOP BRANDS (Hardware & Devices)                             */}
          {/* --------------------------------------------------------------------- */}
          <div className="bg-white rounded-2xl border border-[#E4E1DB] p-4 sm:p-5 shadow-xs">
            <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-1 mb-3 pb-2 border-b border-[#E4E1DB]/60">
              <div className="flex items-center gap-2">
                <span className="p-1.5 rounded-lg bg-[#00A3E0]/10 text-[#00A3E0]">
                  <Award size={16} />
                </span>
                <h3 className="text-sm sm:text-base font-semibold text-[#171717]">
                  Our Top Brands
                </h3>
              </div>
              <p className="text-xs text-[#5F5B55]">
                We specialize in major white-label and global hardware brands across mobile phones, tablets, laptops & smart accessories.
              </p>
            </div>

            <LogoLoop
              logos={[
                { src: '/iphone-logo.png', alt: 'Apple', title: 'Apple' },
                { src: '/Samsung-Logo.png', alt: 'Samsung', title: 'Samsung' },
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
              speed={42}
              direction="left"
              logoHeight={60}
              gap={24}
              pauseOnHover={false}
              fadeOut
              ariaLabel="Top brand hardware logos"
              renderItem={(item: any) => (
                <div
                  title={item.title || item.alt}
                  className="h-16 sm:h-20 px-5 sm:px-8 bg-white rounded-2xl border border-[#E4E1DB] flex items-center justify-center p-3 shadow-xs hover:border-[#00A3E0]/50 hover:shadow-md transition-all shrink-0 min-w-[140px] sm:min-w-[180px] overflow-hidden group"
                >
                  <img
                    src={encodeURI(item.src)}
                    alt={item.alt || item.title}
                    onError={(e) => {
                      const img = e.currentTarget;
                      img.style.display = 'none';
                      const fallback = img.nextElementSibling as HTMLElement;
                      if (fallback) fallback.style.display = 'inline-block';
                    }}
                    className="h-10 sm:h-13 w-auto max-h-12 sm:max-h-14 max-w-36 sm:max-w-44 object-contain group-hover:scale-105 transition-transform"
                  />
                  <span className="hidden text-xs sm:text-sm font-semibold text-[#041626] whitespace-nowrap">
                    {item.title || item.alt}
                  </span>
                </div>
              )}
            />
          </div>

          {/* --------------------------------------------------------------------- */}
          {/* ROW 2: TRUSTED LOGISTICS PARTNERS                                    */}
          {/* --------------------------------------------------------------------- */}
          <div className="bg-white rounded-2xl border border-[#E4E1DB] p-4 sm:p-5 shadow-xs">
            <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-1 mb-3 pb-2 border-b border-[#E4E1DB]/60">
              <div className="flex items-center gap-2">
                <span className="p-1.5 rounded-lg bg-[#00A3E0]/10 text-[#00A3E0]">
                  <Truck size={16} />
                </span>
                <h3 className="text-sm sm:text-base font-semibold text-[#171717]">
                  Trusted Logistics Partners
                </h3>
              </div>
              <p className="text-xs text-[#5F5B55] font-medium">
                Fast UK &amp; Worldwide Courier Delivery
              </p>
            </div>

            <LogoLoop
              logos={[
                { src: '/FedEx.png', alt: 'FedEx', title: 'FedEx' },
                { src: '/Transglobal Express.png', alt: 'Transglobal Express', title: 'Transglobal Express' },
                { src: '/DHL Express.png', alt: 'DHL Express', title: 'DHL Express' },
                { src: '/Palletways.png', alt: 'Palletways', title: 'Palletways' },
                { src: '/Royal Mail Tracked 24.png', alt: 'Royal Mail Tracked 24', title: 'Royal Mail Tracked 24' }
              ]}
              speed={36}
              direction="right"
              logoHeight={60}
              gap={24}
              pauseOnHover={false}
              fadeOut
              ariaLabel="Trusted logistics partner logos"
              renderItem={(item: any) => (
                <div
                  title={item.title || item.alt}
                  className="h-16 sm:h-20 px-5 sm:px-8 bg-white rounded-2xl border border-[#E4E1DB] flex items-center justify-center p-3 shadow-xs hover:border-[#00A3E0]/50 hover:shadow-md transition-all shrink-0 min-w-[150px] sm:min-w-[190px] overflow-hidden group"
                >
                  <img
                    src={encodeURI(item.src)}
                    alt={item.alt || item.title}
                    onError={(e) => {
                      const img = e.currentTarget;
                      img.style.display = 'none';
                      const fallback = img.nextElementSibling as HTMLElement;
                      if (fallback) fallback.style.display = 'inline-block';
                    }}
                    className="h-10 sm:h-13 w-auto max-h-12 sm:max-h-14 max-w-36 sm:max-w-44 object-contain group-hover:scale-105 transition-transform"
                  />
                  <span className="hidden text-xs sm:text-sm font-semibold text-[#041626] whitespace-nowrap">
                    {item.title || item.alt}
                  </span>
                </div>
              )}
            />
          </div>

          {/* --------------------------------------------------------------------- */}
          {/* ROW 3: TRUSTED PARTNERS (Marketplaces & Platforms)                   */}
          {/* --------------------------------------------------------------------- */}
          <div className="bg-white rounded-2xl border border-[#E4E1DB] p-4 sm:p-5 shadow-xs">
            <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-1 mb-3 pb-2 border-b border-[#E4E1DB]/60">
              <div className="flex items-center gap-2">
                <span className="p-1.5 rounded-lg bg-[#00A3E0]/10 text-[#00A3E0]">
                  <ShoppingBag size={16} />
                </span>
                <h3 className="text-sm sm:text-base font-semibold text-[#171717]">
                  Trusted Partners
                </h3>
              </div>
              <p className="text-xs text-[#5F5B55] font-medium">
                Connected Marketplaces &amp; Business Platforms
              </p>
            </div>

            <LogoLoop
              logos={[
                { src: '/Walmart.png', alt: 'Walmart', title: 'Walmart' },
                { src: '/OnBuy.png', alt: 'OnBuy.com', title: 'OnBuy.com' },
                { src: '/Ebay Business.png', alt: 'Ebay Business', title: 'Ebay Business' },
                { src: '/GoGroopie.png', alt: 'GoGroopie', title: 'GoGroopie' },
                { src: '/Amazon Business.png', alt: 'Amazon Business', title: 'Amazon Business' },
                { src: '/Backmarket.png', alt: 'Backmarket', title: 'Backmarket' },
                { src: '/Esource.co.uk.png', alt: 'Esource.co.uk', title: 'Esource.co.uk' },
                { src: '/Wowcher.png', alt: 'Wowcher', title: 'Wowcher' },
                { src: '/Temu.png', alt: 'Temu', title: 'Temu' },
                { src: '/GSM Exchange.png', alt: 'GSM Exchange', title: 'GSM Exchange' },
                { src: '/A1 Tech Deals.png', alt: 'A1 Tech Deals', title: 'A1 Tech Deals' }
              ]}
              speed={38}
              direction="left"
              logoHeight={60}
              gap={24}
              pauseOnHover={false}
              fadeOut
              ariaLabel="Connected marketplace partner logos"
              renderItem={(item: any) => (
                <div
                  title={item.title || item.alt}
                  className="h-16 sm:h-20 px-5 sm:px-8 bg-white rounded-2xl border border-[#E4E1DB] flex items-center justify-center p-3 shadow-xs hover:border-[#00A3E0]/50 hover:shadow-md transition-all shrink-0 min-w-[150px] sm:min-w-[190px] overflow-hidden group"
                >
                  <img
                    src={encodeURI(item.src)}
                    alt={item.alt || item.title}
                    onError={(e) => {
                      const img = e.currentTarget;
                      img.style.display = 'none';
                      const fallback = img.nextElementSibling as HTMLElement;
                      if (fallback) fallback.style.display = 'inline-block';
                    }}
                    className="h-10 sm:h-13 w-auto max-h-12 sm:max-h-14 max-w-36 sm:max-w-44 object-contain group-hover:scale-105 transition-transform"
                  />
                  <span className="hidden text-xs sm:text-sm font-semibold text-[#041626] whitespace-nowrap">
                    {item.title || item.alt}
                  </span>
                </div>
              )}
            />
          </div>

        </div>
      </section>

      {/* ========================================================================= */}
      {/* 4. ABOUT REGENERATE GLOBAL                                                */}
      {/* ========================================================================= */}
      <section id="about" className="py-20 sm:py-28 px-6 sm:px-12 md:px-20 lg:px-28 bg-[#F7F6F3]">
        <div className="max-w-7xl mx-auto">
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 lg:gap-16 items-start">
            {/* Left Header Column */}
            <div className="lg:col-span-5">
              <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-[#041626] border border-[#00A3E0]/40 text-white text-xs font-semibold tracking-wide uppercase mb-4 shadow-sm">
                <Building2 size={14} className="text-[#00A3E0]" /> Corporate Profile
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

              <div className="p-6 rounded-2xl bg-[#041626] text-white border border-[#00A3E0]/30 shadow-md flex items-start gap-4">
                <div className="p-3 rounded-xl bg-[#00A3E0]/20 border border-[#00A3E0]/40 text-[#00A3E0] shrink-0">
                  <ShieldCheck size={24} />
                </div>
                <div>
                  <h4 className="text-sm font-semibold text-white mb-1">UK Registered Entity — Est. 2013</h4>
                  <p className="text-xs text-white/80 leading-relaxed">
                    Operating under full regulatory compliance, governance, and rigorous corporate standards across all business divisions.
                  </p>
                </div>
              </div>
            </div>

            {/* Right Capabilities Grid */}
            <div className="lg:col-span-7 grid grid-cols-1 sm:grid-cols-2 gap-5">
              <div className="p-6 rounded-2xl bg-[#041626] text-white border border-[#00A3E0]/30 shadow-sm flex items-start gap-4">
                <div className="p-3 rounded-2xl bg-[#00A3E0]/15 border border-[#00A3E0]/40 text-[#00A3E0] shrink-0">
                  <Globe size={22} />
                </div>
                <div>
                  <h3 className="text-base font-semibold text-white mb-1.5">Global Connectivity</h3>
                  <p className="text-xs sm:text-sm text-white/80 leading-relaxed">
                    Connecting commercial partners, device manufacturers, and enterprise networks across European and global markets.
                  </p>
                </div>
              </div>

              <div className="p-6 rounded-2xl bg-[#041626] text-white border border-[#00A3E0]/30 shadow-sm flex items-start gap-4">
                <div className="p-3 rounded-2xl bg-[#00A3E0]/15 border border-[#00A3E0]/40 text-[#00A3E0] shrink-0">
                  <Cpu size={22} />
                </div>
                <div>
                  <h3 className="text-base font-semibold text-white mb-1.5">Technology Ecosystems</h3>
                  <p className="text-xs sm:text-sm text-white/80 leading-relaxed">
                    Integrating hardware sourcing with digital infrastructure, enterprise software, and mobile platform architectures.
                  </p>
                </div>
              </div>

              <div className="p-6 rounded-2xl bg-[#041626] text-white border border-[#00A3E0]/30 shadow-sm flex items-start gap-4">
                <div className="p-3 rounded-2xl bg-[#00A3E0]/15 border border-[#00A3E0]/40 text-[#00A3E0] shrink-0">
                  <Search size={22} />
                </div>
                <div>
                  <h3 className="text-base font-semibold text-white mb-1.5">Strategic Procurement</h3>
                  <p className="text-xs sm:text-sm text-white/80 leading-relaxed">
                    End-to-end sourcing, tendering support, vendor auditing, and supply chain risk management for enterprise buyers.
                  </p>
                </div>
              </div>

              <div className="p-6 rounded-2xl bg-[#041626] text-white border border-[#00A3E0]/30 shadow-sm flex items-start gap-4">
                <div className="p-3 rounded-2xl bg-[#00A3E0]/15 border border-[#00A3E0]/40 text-[#00A3E0] shrink-0">
                  <Briefcase size={22} />
                </div>
                <div>
                  <h3 className="text-base font-semibold text-white mb-1.5">B2B Advisory</h3>
                  <p className="text-xs sm:text-sm text-white/80 leading-relaxed">
                    Tailored corporate consulting, market expansion strategy, and commercial opportunity development.
                  </p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* ========================================================================= */}
      {/* 5. BUSINESS & TECHNOLOGY ECOSYSTEM                                        */}
      {/* ========================================================================= */}
      <section id="ecosystem" className="py-20 sm:py-28 px-6 sm:px-12 md:px-20 lg:px-28 bg-white border-y border-[#E4E1DB]">
        <div className="max-w-7xl mx-auto">
          <div className="max-w-2xl mb-14">
            <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-[#041626] border border-[#00A3E0]/40 text-white text-xs font-semibold tracking-wide uppercase mb-3 shadow-sm">
              <TrendingUp size={14} className="text-[#00A3E0]" /> Connected Operations
            </div>
            <h2 className="text-2xl sm:text-3xl lg:text-4xl font-semibold tracking-tight text-[#171717] mb-4">
              Integrated Business & Technology Architecture
            </h2>
            <p className="text-sm sm:text-base text-[#5F5B55] leading-relaxed">
              Regenerate Global connects commercial decision-making with physical technology supply chains and digital execution.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            <div className="p-8 rounded-2xl bg-[#041626] text-white border border-[#00A3E0]/30 shadow-sm">
              <div className="w-12 h-12 rounded-2xl bg-[#00A3E0]/15 border border-[#00A3E0]/40 text-[#00A3E0] flex items-center justify-center mb-5">
                <Building2 size={22} />
              </div>
              <h3 className="text-lg font-semibold text-white mb-2">1. Corporate Strategy</h3>
              <p className="text-xs sm:text-sm text-white/80 leading-relaxed">
                Advising businesses on international market entry, vendor contract negotiation, and commercial risk management.
              </p>
            </div>

            <div className="p-8 rounded-2xl bg-[#041626] text-white border border-[#00A3E0]/30 shadow-sm">
              <div className="w-12 h-12 rounded-2xl bg-[#00A3E0]/15 border border-[#00A3E0]/40 text-[#00A3E0] flex items-center justify-center mb-5">
                <Monitor size={22} />
              </div>
              <h3 className="text-lg font-semibold text-white mb-2">2. Digital Systems</h3>
              <p className="text-xs sm:text-sm text-white/80 leading-relaxed">
                Developing robust e-commerce platforms, web tools, and application interfaces that drive modern B2B interactions.
              </p>
            </div>

            <div className="p-8 rounded-2xl bg-[#041626] text-white border border-[#00A3E0]/30 shadow-sm">
              <div className="w-12 h-12 rounded-2xl bg-[#00A3E0]/15 border border-[#00A3E0]/40 text-[#00A3E0] flex items-center justify-center mb-5">
                <Smartphone size={22} />
              </div>
              <h3 className="text-lg font-semibold text-white mb-2">3. Hardware Sourcing</h3>
              <p className="text-xs sm:text-sm text-white/80 leading-relaxed">
                Executing bulk procurement and distribution of consumer technology devices and telecommunications equipment.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* ========================================================================= */}
      {/* 6. OUR EXPERTISE (MULTIDISCIPLINARY AREAS)                                */}
      {/* ========================================================================= */}
      <section id="expertise" className="py-20 sm:py-28 px-6 sm:px-12 md:px-20 lg:px-28 bg-[#F7F6F3]">
        <div className="max-w-7xl mx-auto">
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 items-center">
            <div className="lg:col-span-5">
              <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-[#041626] border border-[#00A3E0]/40 text-white text-xs font-semibold tracking-wide uppercase mb-4 shadow-sm">
                <Compass size={14} className="text-[#00A3E0]" /> Domain Coverage
              </div>
              <h2 className="text-2xl sm:text-3xl lg:text-4xl font-semibold tracking-tight text-[#171717] mb-4">
                Multidisciplinary Areas of Expertise
              </h2>
              <p className="text-sm sm:text-base text-[#5F5B55] leading-relaxed mb-6">
                Regenerate Global operates across connected industrial and technological domains, providing unified oversight across procurement, digital platforms, and physical device supply chains.
              </p>
              <div className="p-5 rounded-2xl bg-white border-l-4 border-l-[#00A3E0] border border-[#E4E1DB]">
                <p className="text-xs sm:text-sm text-[#171717] font-medium leading-relaxed">
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
                    className="p-4 rounded-xl bg-white border border-[#E4E1DB] flex items-center justify-between group shadow-xs hover:border-[#00A3E0]/40 transition-colors"
                  >
                    <span className="text-xs sm:text-sm font-medium text-[#171717]">
                      {item}
                    </span>
                    <ChevronRight size={14} className="text-[#858078]" />
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* ========================================================================= */}
      {/* 7. OUR CONSULTATIVE APPROACH                                             */}
      {/* ========================================================================= */}
      <section id="approach" className="py-20 sm:py-28 px-6 sm:px-12 md:px-20 lg:px-28 bg-white border-y border-[#E4E1DB]">
        <div className="max-w-7xl mx-auto">
          <div className="text-center max-w-2xl mx-auto mb-16">
            <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-[#041626] border border-[#00A3E0]/40 text-white text-xs font-semibold tracking-wide uppercase mb-3 shadow-sm">
              <Workflow size={14} className="text-[#00A3E0]" /> Methodology
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
                className="bg-[#041626] text-white p-6 rounded-2xl border border-[#00A3E0]/30 shadow-sm flex flex-col justify-between"
              >
                <div>
                  <span className="text-xs font-bold text-[#00A3E0] bg-[#00A3E0]/20 px-2.5 py-1 rounded-lg tracking-wider inline-block mb-3 border border-[#00A3E0]/40">
                    {step.num}
                  </span>
                  <h3 className="text-base font-semibold text-white mb-2">
                    {step.title}
                  </h3>
                  <p className="text-xs text-white/80 leading-relaxed">
                    {step.desc}
                  </p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ========================================================================= */}
      {/* 8. CORPORATE INFORMATION & CREDENTIALS                                   */}
      {/* ========================================================================= */}
      <section id="corporate" className="py-20 sm:py-28 px-6 sm:px-12 md:px-20 lg:px-28 bg-[#F7F6F3]">
        <div className="max-w-7xl mx-auto">
          <div className="max-w-2xl mb-12">
            <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-[#041626] border border-[#00A3E0]/40 text-white text-xs font-semibold tracking-wide uppercase mb-3 shadow-sm">
              <ShieldCheck size={14} className="text-[#00A3E0]" /> Corporate Governance
            </div>
            <h2 className="text-2xl sm:text-3xl lg:text-4xl font-semibold tracking-tight text-[#171717] mb-4">
              Corporate Information & Credentials
            </h2>
            <p className="text-sm sm:text-base text-[#5F5B55] leading-relaxed">
              Transparent corporate status and verified company information for business partners and international clients.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
            <div className="p-6 rounded-2xl bg-[#041626] text-white border border-[#00A3E0]/30 shadow-sm">
              <span className="text-xs text-[#00A3E0] uppercase font-bold tracking-wider block mb-1">Company Name</span>
              <span className="text-base font-semibold text-white">Regenerate Global Limited</span>
            </div>

            <div className="p-6 rounded-2xl bg-[#041626] text-white border border-[#00A3E0]/30 shadow-sm">
              <span className="text-xs text-[#00A3E0] uppercase font-bold tracking-wider block mb-1">Incorporation Year</span>
              <span className="text-base font-semibold text-white">2013 (Established)</span>
            </div>

            <div className="p-6 rounded-2xl bg-[#041626] text-white border border-[#00A3E0]/30 shadow-sm">
              <span className="text-xs text-[#00A3E0] uppercase font-bold tracking-wider block mb-1">Jurisdiction</span>
              <span className="text-base font-semibold text-white">United Kingdom</span>
            </div>

            <div className="p-6 rounded-2xl bg-[#041626] text-white border border-[#00A3E0]/30 shadow-sm">
              <span className="text-xs text-[#00A3E0] uppercase font-bold tracking-wider block mb-1">Core Sectors</span>
              <span className="text-base font-semibold text-white">Telecom, IT, B2B & Wholesale</span>
            </div>
          </div>
        </div>
      </section>

      {/* ========================================================================= */}
      {/* 8.5 CLIENT REVIEWS & TRUSTED USERS                                         */}
      {/* ========================================================================= */}
      <section id="reviews" className="py-20 bg-[#041626] text-white border-t border-[#00A3E0]/20 overflow-hidden relative">
        <div className="max-w-7xl mx-auto px-6 mb-10 text-center">
          <h2 className="text-2xl sm:text-3xl lg:text-4xl font-semibold tracking-tight text-white mb-3">
            Trusted by Our Clients
          </h2>
          <p className="text-sm sm:text-base text-gray-300 max-w-2xl mx-auto leading-relaxed mb-6">
            See what our clients say about our device quality, fast delivery, and business technology solutions.
          </p>

          {/* Trusted Users Social Proof Component */}
          <TrustedUsers
            avatars={[
              "https://images.unsplash.com/photo-1534528741775-53994a69daeb?q=80&w=250&auto=format&fit=crop",
              "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?q=80&w=250&auto=format&fit=crop",
              "https://images.unsplash.com/photo-1573496359142-b8d87734a5a2?q=80&w=250&auto=format&fit=crop",
              "https://images.unsplash.com/photo-1500648767791-00dcc994a43e?q=80&w=250&auto=format&fit=crop",
              "https://images.unsplash.com/photo-1580489944761-15a19d654956?q=80&w=250&auto=format&fit=crop"
            ]}
            rating={5}
            totalUsersText={2500}
            caption="Trusted by over"
            starColorClass="text-yellow-400"
            ringColors={[
              "ring-[#00A3E0]",
              "ring-cyan-400",
              "ring-sky-500",
              "ring-[#00A3E0]",
              "ring-teal-400"
            ]}
            linkText="Clients"
            linkHref="#contact"
          />
        </div>

        {/* 3D Scroll Trigger Testimonials Rows */}
        <ThreeDScrollTriggerContainer className="space-y-6">
          {/* Row 1: Scrolling Right */}
          <ThreeDScrollTriggerRow baseVelocity={2} direction={1}>
            {[
              {
                name: "Marcus Vance",
                role: "VP of Procurement, Apex Telecommunications",
                initials: "MV",
                comment: "Regenerate Global transformed our hardware supply chain. Their transparent device grading system and prompt delivery saved us over 30% on enterprise device rollouts.",
                tag: "Verified Enterprise Client"
              },
              {
                name: "Elena Rostova",
                role: "Managing Director, Nexa Logistics Europe",
                initials: "ER",
                comment: "The web portal is extraordinarily responsive and transparent. Sourcing certified refurbished hardware for 500+ remote staff took less than 48 hours.",
                tag: "Verified Partner"
              },
              {
                name: "David Chen",
                role: "Chief Technology Officer, Summit Infrastructure",
                initials: "DC",
                comment: "Top-tier B2B partner. Their systems integration advisory helped us digitize our cross-border operations with complete confidence.",
                tag: "Verified Client"
              },
              {
                name: "Sarah Jenkins",
                role: "Head of Mobile Operations, CloudNet UK",
                initials: "SJ",
                comment: "Impeccable customer service! Quality assurance on mobile device batches is consistently Grade A+. We've trusted them for over 3 years.",
                tag: "Verified Corporate Partner"
              }
            ].map((rev, idx) => (
              <div
                key={idx}
                className="inline-flex flex-col justify-between w-[350px] sm:w-[420px] bg-[#020d18] text-white p-6 rounded-2xl border border-[#00A3E0]/30 shadow-lg mx-3 whitespace-normal hover:border-[#00A3E0]/60 transition-colors"
              >
                <div>
                  <div className="flex items-center justify-between mb-3">
                    <div className="flex items-center gap-1 text-[#00A3E0]">
                      {"★★★★★".split("").map((star, i) => (
                        <span key={i} className="text-sm">{star}</span>
                      ))}
                    </div>
                    <span className="text-[10px] uppercase font-bold tracking-wider px-2 py-0.5 rounded-full bg-[#00A3E0]/15 text-[#00A3E0] border border-[#00A3E0]/30">
                      {rev.tag}
                    </span>
                  </div>
                  <p className="text-xs sm:text-sm text-gray-200 leading-relaxed italic mb-4">
                    "{rev.comment}"
                  </p>
                </div>
                <div className="flex items-center gap-3 pt-3 border-t border-white/10">
                  <div className="w-9 h-9 rounded-full bg-[#00A3E0]/20 border border-[#00A3E0]/50 text-[#00A3E0] font-bold text-xs flex items-center justify-center shrink-0 shadow-[0_0_10px_rgba(0,163,224,0.3)]">
                    {rev.initials}
                  </div>
                  <div>
                    <h4 className="text-xs sm:text-sm font-semibold text-white">{rev.name}</h4>
                    <p className="text-[11px] text-gray-400">{rev.role}</p>
                  </div>
                </div>
              </div>
            ))}
          </ThreeDScrollTriggerRow>

          {/* Row 2: Scrolling Left */}
          <ThreeDScrollTriggerRow baseVelocity={2} direction={-1}>
            {[
              {
                name: "Julian Thorne",
                role: "Global Sourcing Lead, Horizon Group",
                initials: "JT",
                comment: "Fast quotes, transparent live inventory, and zero hassle. The portal’s ordering workflow makes wholesale procurement completely seamless.",
                tag: "Verified Client"
              },
              {
                name: "Amira Al-Mansoor",
                role: "Operations Director, Crescent Tech Dubai",
                initials: "AA",
                comment: "Cross-border B2B trade used to take weeks of paperwork. Regenerate Global streamlined our contract verification in record time.",
                tag: "Verified Enterprise Partner"
              },
              {
                name: "Robert Sterling",
                role: "Enterprise IT Director, Vanguard Systems",
                initials: "RS",
                comment: "Their customer support team went above and beyond when we needed custom device pre-configuration. 10/10 recommendation!",
                tag: "Verified Client"
              },
              {
                name: "Klaus Weber",
                role: "Procurement Lead, EuroDevice Trading",
                initials: "KW",
                comment: "Cleanest website interface and smoothest ordering workflow in the wholesale electronics sector. Authentic, reliable, and hyper-efficient.",
                tag: "Verified Wholesale Partner"
              }
            ].map((rev, idx) => (
              <div
                key={idx}
                className="inline-flex flex-col justify-between w-[350px] sm:w-[420px] bg-[#020d18] text-white p-6 rounded-2xl border border-[#00A3E0]/30 shadow-lg mx-3 whitespace-normal hover:border-[#00A3E0]/60 transition-colors"
              >
                <div>
                  <div className="flex items-center justify-between mb-3">
                    <div className="flex items-center gap-1 text-[#00A3E0]">
                      {"★★★★★".split("").map((star, i) => (
                        <span key={i} className="text-sm">{star}</span>
                      ))}
                    </div>
                    <span className="text-[10px] uppercase font-bold tracking-wider px-2 py-0.5 rounded-full bg-[#00A3E0]/15 text-[#00A3E0] border border-[#00A3E0]/30">
                      {rev.tag}
                    </span>
                  </div>
                  <p className="text-xs sm:text-sm text-gray-200 leading-relaxed italic mb-4">
                    "{rev.comment}"
                  </p>
                </div>
                <div className="flex items-center gap-3 pt-3 border-t border-white/10">
                  <div className="w-9 h-9 rounded-full bg-[#00A3E0]/20 border border-[#00A3E0]/50 text-[#00A3E0] font-bold text-xs flex items-center justify-center shrink-0 shadow-[0_0_10px_rgba(0,163,224,0.3)]">
                    {rev.initials}
                  </div>
                  <div>
                    <h4 className="text-xs sm:text-sm font-semibold text-white">{rev.name}</h4>
                    <p className="text-[11px] text-gray-400">{rev.role}</p>
                  </div>
                </div>
              </div>
            ))}
          </ThreeDScrollTriggerRow>
        </ThreeDScrollTriggerContainer>
      </section>

      {/* ========================================================================= */}
      {/* 9. CONTACT & BUSINESS ENQUIRIES                                           */}
      {/* ========================================================================= */}
      <section id="contact" className="py-20 sm:py-28 px-6 sm:px-12 md:px-20 lg:px-28 bg-white border-t border-[#E4E1DB]">
        <div className="max-w-7xl mx-auto">
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 items-start">
            {/* Left Contact Info */}
            <div className="lg:col-span-5">
              <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-[#041626] border border-[#00A3E0]/40 text-white text-xs font-semibold tracking-wide uppercase mb-4 shadow-sm">
                <Mail size={14} className="text-[#00A3E0]" /> Corporate Enquiries
              </div>
              <h2 className="text-2xl sm:text-3xl lg:text-4xl font-semibold tracking-tight text-[#171717] mb-6">
                Talk to Regenerate Global
              </h2>
              <p className="text-sm sm:text-base text-[#5F5B55] leading-relaxed mb-8">
                Whether you are exploring global technology procurement, seeking B2B consultancy, or evaluating wholesale hardware supply, our corporate team is ready to discuss your requirements.
              </p>

              <div className="space-y-4 mb-8">
                <div className="p-5 rounded-2xl bg-[#041626] text-white border border-[#00A3E0]/30 shadow-sm flex items-start gap-4">
                  <div className="p-3 rounded-2xl bg-[#00A3E0]/15 border border-[#00A3E0]/40 text-[#00A3E0] shrink-0">
                    <MapPin size={20} />
                  </div>
                  <div>
                    <h4 className="text-sm font-semibold text-white">Corporate Location</h4>
                    <p className="text-xs sm:text-sm text-white/80">United Kingdom</p>
                  </div>
                </div>

                <div className="p-5 rounded-2xl bg-[#041626] text-white border border-[#00A3E0]/30 shadow-sm flex items-start gap-4">
                  <div className="p-3 rounded-2xl bg-[#00A3E0]/15 border border-[#00A3E0]/40 text-[#00A3E0] shrink-0">
                    <Phone size={20} />
                  </div>
                  <div>
                    <h4 className="text-sm font-semibold text-white">Phone</h4>
                    <p className="text-xs sm:text-sm text-white/80 font-medium">+ 02080044421</p>
                  </div>
                </div>

                <div className="p-5 rounded-2xl bg-[#041626] text-white border border-[#00A3E0]/30 shadow-sm flex items-start gap-4">
                  <div className="p-3 rounded-2xl bg-[#00A3E0]/15 border border-[#00A3E0]/40 text-[#00A3E0] shrink-0">
                    <Mail size={20} />
                  </div>
                  <div>
                    <h4 className="text-sm font-semibold text-white">Business Enquiries</h4>
                    <a href="mailto:sales@regenerateglobal.com" className="text-xs sm:text-sm text-white/80 hover:text-[#00A3E0] transition-colors">
                      sales@regenerateglobal.com
                    </a>
                  </div>
                </div>

                <div className="p-5 rounded-2xl bg-[#041626] text-white border border-[#00A3E0]/30 shadow-sm flex items-start gap-4">
                  <div className="p-3 rounded-2xl bg-[#00A3E0]/15 border border-[#00A3E0]/40 text-[#00A3E0] shrink-0">
                    <Clock size={20} />
                  </div>
                  <div>
                    <h4 className="text-sm font-semibold text-white">Business Hours</h4>
                    <p className="text-xs sm:text-sm text-white/80">Mon – Sat: 9:00 am – 5:00 pm</p>
                    <p className="text-xs text-[#00A3E0] font-semibold mt-0.5">Sunday: CLOSED</p>
                  </div>
                </div>
              </div>
            </div>

            {/* Right Contact Form */}
            <div className="lg:col-span-7">
              <div className="bg-[#F7F6F3] p-8 sm:p-10 rounded-3xl border border-[#E4E1DB] shadow-sm hover:border-[#00A3E0]/30 transition-colors">
                <h3 className="text-xl font-semibold text-[#171717] mb-2">Submit a Business Enquiry</h3>
                <p className="text-xs sm:text-sm text-[#5F5B55] mb-6">
                  Fill out the form below to connect directly with our corporate team.
                </p>

                {submitStatus === 'success' && (
                  <div className="p-5 rounded-2xl bg-[#00A3E0]/10 border border-[#00A3E0]/30 text-[#041626] mb-6 animate-in fade-in duration-300">
                    <div className="flex items-start gap-3">
                      <CheckCircle2 size={22} className="text-[#0084C7] shrink-0 mt-0.5" />
                      <div>
                        <h4 className="text-sm font-semibold text-[#041626] mb-1">Enquiry Received</h4>
                        <p className="text-xs sm:text-sm text-[#5F5B55] leading-relaxed">
                          Thanks — your enquiry has been received. Our team will get back to you shortly.
                        </p>
                      </div>
                    </div>
                  </div>
                )}

                {submitStatus === 'error' && errorMessage && (
                  <div className="p-4 rounded-2xl bg-red-50 border border-red-200 text-red-800 mb-6 flex items-start gap-3 animate-in fade-in duration-300">
                    <AlertCircle size={20} className="text-red-600 shrink-0 mt-0.5" />
                    <p className="text-xs sm:text-sm font-medium leading-relaxed">
                      {errorMessage}
                    </p>
                  </div>
                )}

                <form ref={formRef} onSubmit={handleFormSubmit} className="space-y-4">
                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                    <div>
                      <label htmlFor="name" className="block text-xs font-semibold text-[#171717] uppercase tracking-wider mb-1.5">
                        Full Name *
                      </label>
                      <input
                        type="text"
                        id="name"
                        name="name"
                        required
                        value={formData.name}
                        onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                        placeholder="e.g. Sarah Jenkins"
                        className="w-full px-4 py-3 rounded-xl border border-[#E4E1DB] text-xs sm:text-sm focus:outline-none focus:border-[#00A3E0] focus:ring-2 focus:ring-[#00A3E0]/20 bg-white text-[#171717] transition-all"
                      />
                    </div>
                    <div>
                      <label htmlFor="company" className="block text-xs font-semibold text-[#171717] uppercase tracking-wider mb-1.5">
                        Company / Organisation *
                      </label>
                      <input
                        type="text"
                        id="company"
                        name="company"
                        required
                        value={formData.company}
                        onChange={(e) => setFormData({ ...formData, company: e.target.value })}
                        placeholder="e.g. Enterprise Solutions Ltd"
                        className="w-full px-4 py-3 rounded-xl border border-[#E4E1DB] text-xs sm:text-sm focus:outline-none focus:border-[#00A3E0] focus:ring-2 focus:ring-[#00A3E0]/20 bg-white text-[#171717] transition-all"
                      />
                    </div>
                  </div>

                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                    <div>
                      <label htmlFor="email" className="block text-xs font-semibold text-[#171717] uppercase tracking-wider mb-1.5">
                        Corporate Email *
                      </label>
                      <input
                        type="email"
                        id="email"
                        name="email"
                        required
                        value={formData.email}
                        onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                        placeholder="e.g. s.jenkins@company.com"
                        className="w-full px-4 py-3 rounded-xl border border-[#E4E1DB] text-xs sm:text-sm focus:outline-none focus:border-[#00A3E0] focus:ring-2 focus:ring-[#00A3E0]/20 bg-white text-[#171717] transition-all"
                      />
                    </div>
                    <div>
                      <label htmlFor="interest" className="block text-xs font-semibold text-[#171717] uppercase tracking-wider mb-1.5">
                        Primary Area of Interest
                      </label>
                      <select
                        id="interest"
                        name="interest"
                        value={formData.service}
                        onChange={(e) => setFormData({ ...formData, service: e.target.value })}
                        className="w-full px-4 py-3 rounded-xl border border-[#E4E1DB] text-xs sm:text-sm focus:outline-none focus:border-[#00A3E0] focus:ring-2 focus:ring-[#00A3E0]/20 bg-white text-[#171717] transition-all"
                      >
                        <option value="General Business Enquiry">General Business Enquiry</option>
                        <option value="Technology & IT Procurement">Technology & IT Procurement</option>
                        <option value="Telecommunications Solutions">Telecommunications Solutions</option>
                        <option value="B2B Consulting & Partnership">B2B Consulting & Partnership</option>
                        <option value="Digital & Web Development">Digital & Web Development</option>
                        <option value="Technology Trading & Wholesale">Technology Trading & Wholesale</option>
                      </select>
                    </div>
                  </div>

                  <div>
                    <label htmlFor="message" className="block text-xs font-semibold text-[#171717] uppercase tracking-wider mb-1.5">
                      Message / Details *
                    </label>
                    <textarea
                      id="message"
                      name="message"
                      required
                      rows={4}
                      value={formData.message}
                      onChange={(e) => setFormData({ ...formData, message: e.target.value })}
                      placeholder="Briefly describe your enquiry or business requirement..."
                      className="w-full px-4 py-3 rounded-xl border border-[#E4E1DB] text-xs sm:text-sm focus:outline-none focus:border-[#00A3E0] focus:ring-2 focus:ring-[#00A3E0]/20 bg-white text-[#171717] transition-all"
                    />
                  </div>

                  <button
                    type="submit"
                    disabled={isSubmitting}
                    className="inline-flex items-center justify-center gap-2 w-full text-xs sm:text-sm font-medium text-white bg-[#041626] hover:bg-[#0084C7] disabled:opacity-75 disabled:cursor-not-allowed py-3.5 px-6 rounded-xl transition-all duration-300 shadow-md hover:shadow-[0_4px_20px_rgba(0,163,224,0.3)] group cursor-pointer"
                  >
                    {isSubmitting ? (
                      <>
                        <span>Sending enquiry...</span>
                        <Loader2 size={16} className="animate-spin text-white" />
                      </>
                    ) : submitStatus === 'success' ? (
                      <>
                        <span>Enquiry Sent ✓</span>
                        <CheckCircle2 size={16} className="text-white" />
                      </>
                    ) : (
                      <>
                        <span>Talk to Regenerate Global</span>
                        <Send size={16} className="text-white transition-transform group-hover:translate-x-1" />
                      </>
                    )}
                  </button>
                </form>
              </div>
            </div>
          </div>
        </div>
      </section>
    </>
  );
};
