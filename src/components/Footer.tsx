import React from 'react';
import type { PageView } from '../types';

const Logo: React.FC = () => (
  <svg
    width="18"
    height="18"
    viewBox="0 0 256 256"
    fill="none"
    xmlns="http://www.w3.org/2000/svg"
  >
    <path
      fill="rgb(84, 84, 84)"
      d="M 160 88 L 194 34 L 216 0 L 256 0 L 256 40 L 221.5 93.5 L 200 128 L 256 128 L 256 256 L 96 256 L 96 168 L 64.246 220 L 40 256 L 0 256 L 0 216 L 34 162 L 56 128 L 0 128 L 0 0 L 160 0 Z"
    />
  </svg>
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
      } else if (page === 'grading') {
        window.scrollTo({ top: 0, behavior: 'smooth' });
      }
    }
  };

  return (
    <footer className="bg-[#0D0D0D] text-[#858078] py-16 px-6 sm:px-12 md:px-20 lg:px-28 border-t border-[#171717]">
      <div className="max-w-7xl mx-auto">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-5 gap-10 pb-12 border-b border-[#171717]">
          <div className="lg:col-span-2">
            <div className="flex items-center gap-3 mb-4">
              <div className="flex items-center justify-center rounded-full w-9 h-9 bg-white/10 shrink-0">
                <Logo />
              </div>
              <span className="text-sm font-semibold tracking-tight text-white">
                REGENERATE GLOBAL LIMITED
              </span>
            </div>
            <p className="text-xs leading-relaxed text-[#858078] max-w-sm mb-6">
              Connecting technology, business and opportunity globally. A UK incorporated enterprise operating across technology, telecommunications, procurement, and B2B solutions since 2013.
            </p>
            <p className="text-[11px] text-[#858078]">
              © {new Date().getFullYear()} Regenerate Global Limited. All rights reserved.
            </p>
          </div>

          <div>
            <h4 className="text-xs font-semibold uppercase tracking-wider text-white mb-4">Corporate</h4>
            <ul className="space-y-2.5 text-xs">
              <li>
                <button onClick={() => navigateTo('home', 'about')} className="hover:text-[#C5A46D] transition-colors text-left">
                  About Us
                </button>
              </li>
              <li>
                <button onClick={() => navigateTo('home', 'corporate')} className="hover:text-[#C5A46D] transition-colors text-left">
                  Governance & Credentials
                </button>
              </li>
              <li>
                <button onClick={() => navigateTo('home', 'approach')} className="hover:text-[#C5A46D] transition-colors text-left">
                  Business Methodology
                </button>
              </li>
              <li>
                <button onClick={() => navigateTo('home', 'contact')} className="hover:text-[#C5A46D] transition-colors text-left">
                  Contact Enquiries
                </button>
              </li>
            </ul>
          </div>

          <div>
            <h4 className="text-xs font-semibold uppercase tracking-wider text-white mb-4">Capabilities</h4>
            <ul className="space-y-2.5 text-xs">
              <li>
                <button onClick={() => navigateTo('home', 'services')} className="hover:text-[#C5A46D] transition-colors text-left">
                  Technology & IT
                </button>
              </li>
              <li>
                <button onClick={() => navigateTo('home', 'services')} className="hover:text-[#C5A46D] transition-colors text-left">
                  Telecommunications
                </button>
              </li>
              <li>
                <button onClick={() => navigateTo('home', 'services')} className="hover:text-[#C5A46D] transition-colors text-left">
                  Global Procurement
                </button>
              </li>
              <li>
                <button onClick={() => navigateTo('grading')} className="hover:text-[#C5A46D] transition-colors text-left text-[#B08D57]">
                  Device Grading
                </button>
              </li>
            </ul>
          </div>

          <div>
            <h4 className="text-xs font-semibold uppercase tracking-wider text-white mb-4">Divisions</h4>
            <ul className="space-y-2.5 text-xs">
              <li>
                <button onClick={() => navigateTo('home', 'wholesale')} className="hover:text-[#C5A46D] transition-colors text-left">
                  Hardware & Electronics
                </button>
              </li>
              <li>
                <button onClick={() => navigateTo('grading')} className="hover:text-[#C5A46D] transition-colors text-left">
                  Refurbished Devices & Grading
                </button>
              </li>
              <li>
                <button onClick={() => navigateTo('home', 'ecosystem')} className="hover:text-[#C5A46D] transition-colors text-left">
                  Commercial Ecosystem
                </button>
              </li>
              <li>
                <button onClick={() => navigateTo('home', 'contact')} className="hover:text-[#C5A46D] transition-colors text-left">
                  B2B Trade Support
                </button>
              </li>
            </ul>
          </div>
        </div>

        <div className="pt-8 flex flex-col sm:flex-row items-center justify-between text-[11px] text-[#858078] gap-4">
          <p>Regenerate Global Limited is registered in England & Wales (Established 2013).</p>
          <div className="flex items-center gap-6">
            <a href="#" className="hover:text-[#C5A46D] transition-colors">Privacy Policy</a>
            <a href="#" className="hover:text-[#C5A46D] transition-colors">Terms of Business</a>
            <a href="#" className="hover:text-[#C5A46D] transition-colors">Regulatory Compliance</a>
          </div>
        </div>
      </div>
    </footer>
  );
};
