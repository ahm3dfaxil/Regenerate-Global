import React from 'react';
import type { PageView } from '../types';

const Logo: React.FC<{ className?: string }> = ({ className = "h-20 sm:h-24 md:h-28 w-auto object-contain" }) => (
  <img
    src="/logo-transparent.png"
    alt="Regenerate Global Logo"
    className={className}
  />
);

interface FooterProps {
  setActivePage?: (page: PageView) => void;
}

export const Footer: React.FC<FooterProps> = ({ setActivePage }) => {
  const navigateTo = (page: PageView, sectionId?: string) => {
    if (setActivePage) {
      setActivePage(page);
      if (page === 'home' && sectionId) {
        setTimeout(() => {
          const el = document.getElementById(sectionId);
          if (el) el.scrollIntoView({ behavior: 'smooth' });
        }, 100);
      } else if (page === 'grading' || page === 'careers') {
        window.scrollTo({ top: 0, behavior: 'smooth' });
      }
    }
  };

  return (
    <footer className="bg-[#041626] text-[#858078] py-12 sm:py-16 px-4 sm:px-8 md:px-12 lg:px-16 xl:px-20 border-t border-[#00A3E0]/30 relative overflow-hidden">
      <div className="max-w-7xl mx-auto relative z-10">
        <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-5 gap-8 sm:gap-10 pb-12 border-b border-white/10">
          <div className="col-span-2 lg:col-span-2">
            <button
              onClick={() => navigateTo('home')}
              className="flex items-center cursor-pointer hover:opacity-90 transition-opacity mb-4 text-left focus:outline-none"
              title="Regenerate Global Home"
            >
              <Logo className="h-20 sm:h-24 md:h-28 w-auto object-contain drop-shadow-md" />
            </button>
            <p className="text-xs sm:text-sm leading-relaxed text-white/70 max-w-sm mb-6">
              Connecting technology, business and opportunity globally. A UK incorporated enterprise operating across technology, telecommunications, procurement, and B2B solutions since 2013.
            </p>
            <p className="text-[11px] sm:text-xs text-white/50">
              © {new Date().getFullYear()} Regenerate Global Limited. All rights reserved.
            </p>
          </div>

          <div>
            <h4 className="text-xs font-semibold uppercase tracking-wider text-[#00A3E0] mb-4">Corporate</h4>
            <ul className="space-y-2.5 text-xs">
              <li>
                <button onClick={() => navigateTo('home', 'about')} className="text-white/80 hover:text-[#00A3E0] transition-colors text-left">
                  About Us
                </button>
              </li>
              <li>
                <button onClick={() => navigateTo('careers')} className="text-[#00A3E0] font-semibold hover:underline transition-colors text-left">
                  Careers &amp; Placements
                </button>
              </li>
              <li>
                <button onClick={() => navigateTo('home', 'corporate')} className="text-white/80 hover:text-[#00A3E0] transition-colors text-left">
                  Governance &amp; Credentials
                </button>
              </li>
              <li>
                <button onClick={() => navigateTo('home', 'approach')} className="text-white/80 hover:text-[#00A3E0] transition-colors text-left">
                  Business Methodology
                </button>
              </li>
              <li>
                <button onClick={() => navigateTo('home', 'contact')} className="text-white/80 hover:text-[#00A3E0] transition-colors text-left">
                  Contact Enquiries
                </button>
              </li>
            </ul>
          </div>

          <div>
            <h4 className="text-xs font-semibold uppercase tracking-wider text-[#00A3E0] mb-4">Capabilities</h4>
            <ul className="space-y-2.5 text-xs">
              <li>
                <button onClick={() => navigateTo('home', 'services')} className="text-white/80 hover:text-[#00A3E0] transition-colors text-left">
                  Technology &amp; IT
                </button>
              </li>
              <li>
                <button onClick={() => navigateTo('home', 'services')} className="text-white/80 hover:text-[#00A3E0] transition-colors text-left">
                  Telecommunications
                </button>
              </li>
              <li>
                <button onClick={() => navigateTo('home', 'services')} className="text-white/80 hover:text-[#00A3E0] transition-colors text-left">
                  Global Procurement
                </button>
              </li>
              <li>
                <button onClick={() => navigateTo('grading')} className="text-white/80 hover:text-[#00A3E0] transition-colors text-left">
                  Device Grading
                </button>
              </li>
            </ul>
          </div>

          <div className="col-span-2 sm:col-span-1">
            <h4 className="text-xs font-semibold uppercase tracking-wider text-[#00A3E0] mb-4">Divisions</h4>
            <ul className="space-y-2.5 text-xs grid grid-cols-2 sm:block gap-2">
              <li>
                <button onClick={() => navigateTo('home', 'wholesale')} className="text-white/80 hover:text-[#00A3E0] transition-colors text-left">
                  Hardware &amp; Electronics
                </button>
              </li>
              <li>
                <button onClick={() => navigateTo('grading')} className="text-white/80 hover:text-[#00A3E0] transition-colors text-left">
                  Refurbished Devices &amp; Grading
                </button>
              </li>
              <li>
                <button onClick={() => navigateTo('home', 'ecosystem')} className="text-white/80 hover:text-[#00A3E0] transition-colors text-left">
                  Commercial Ecosystem
                </button>
              </li>
              <li>
                <button onClick={() => navigateTo('home', 'contact')} className="text-white/80 hover:text-[#00A3E0] transition-colors text-left">
                  B2B Trade Support
                </button>
              </li>
            </ul>
          </div>
        </div>

        <div className="pt-8 flex flex-col sm:flex-row items-center justify-between text-[11px] sm:text-xs text-white/50 gap-4 text-center sm:text-left">
          <p>
            Regenerate Global Limited is registered in England &amp; Wales{' '}
            <span className="inline-block whitespace-nowrap">(Established 2013).</span>
          </p>
          <div className="flex flex-wrap items-center justify-center gap-4 sm:gap-6">
            <a href="#" className="hover:text-[#00A3E0] transition-colors">Privacy Policy</a>
            <a href="#" className="hover:text-[#00A3E0] transition-colors">Terms of Business</a>
            <a href="#" className="hover:text-[#00A3E0] transition-colors">Regulatory Compliance</a>
          </div>
        </div>
      </div>
    </footer>
  );
};
