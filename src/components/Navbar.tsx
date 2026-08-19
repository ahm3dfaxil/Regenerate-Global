import React, { useState, useEffect, useRef } from 'react';
import { Menu, X } from 'lucide-react';
import type { PageView } from '../types';

const Logo: React.FC<{ className?: string }> = ({ className = "h-10 sm:h-12 w-auto object-contain" }) => (
  <img
    src="/logo-transparent.png"
    alt="Regenerate Global Logo"
    className={className}
  />
);

interface NavbarProps {
  activePage: PageView;
  setActivePage: (page: PageView) => void;
}

export const Navbar: React.FC<NavbarProps> = ({ activePage, setActivePage }) => {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [isVisible, setIsVisible] = useState(true);
  const [isScrolled, setIsScrolled] = useState(false);
  const lastScrollY = useRef(0);

  useEffect(() => {
    const handleScroll = () => {
      const currentScrollY = window.scrollY || document.documentElement.scrollTop || 0;

      setIsScrolled(currentScrollY > 20);

      if (currentScrollY <= 20) {
        setIsVisible(true);
      } else if (currentScrollY > lastScrollY.current && currentScrollY > 80) {
        // Scrolling DOWN -> Hide Navbar
        setIsVisible(false);
      } else if (currentScrollY < lastScrollY.current) {
        // Scrolling UP -> Reveal Navbar smoothly
        setIsVisible(true);
      }

      lastScrollY.current = currentScrollY;
    };

    window.addEventListener('scroll', handleScroll, { passive: true });
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const handleNavClick = (page: PageView, sectionId?: string) => {
    setActivePage(page);
    setMobileMenuOpen(false);
    setIsVisible(true);
    if (page === 'home' && sectionId) {
      setTimeout(() => {
        const element = document.getElementById(sectionId);
        if (element) {
          element.scrollIntoView({ behavior: 'smooth' });
        }
      }, 100);
    } else if (page === 'grading') {
      window.scrollTo({ top: 0, behavior: 'smooth' });
    }
  };

  return (
    <header
      className={`fixed top-0 left-0 right-0 z-50 w-full pt-3 sm:pt-4 pb-2 px-6 sm:px-12 md:px-20 lg:px-28 transition-all duration-300 ease-in-out ${
        isVisible ? 'translate-y-0 opacity-100' : '-translate-y-full opacity-0 pointer-events-none'
      }`}
    >
      <nav className="w-full flex items-center justify-between gap-3">
        {/* Desktop Navbar Container */}
        <div className="hidden lg:flex items-center justify-between w-full relative">
          {/* Far Top Left Logo (Aligned with 'R' in REGENERATE GLOBAL) */}
          <button
            onClick={() => handleNavClick('home')}
            className="flex items-center cursor-pointer focus:outline-none hover:opacity-90 transition-opacity shrink-0 z-10"
            title="Regenerate Global Home"
          >
            <Logo className="h-14 sm:h-16 md:h-18 lg:h-20 w-auto object-contain drop-shadow-md" />
          </button>

          {/* Centered Nav Links Pill in the Middle */}
          <div
            className={`absolute left-1/2 -translate-x-1/2 flex items-center gap-6 xl:gap-8 rounded-xl px-6 py-2.5 border border-[#E4E1DB] backdrop-blur-md transition-all duration-300 ${
              isScrolled ? 'shadow-md bg-[#EDEDED]/95 border-[#D6D1C8]' : 'shadow-sm bg-[#EDEDED]'
            }`}
          >
            <button
              onClick={() => handleNavClick('home')}
              className={`text-[13px] font-medium transition-colors duration-200 ${
                activePage === 'home' ? 'text-[#171717] font-semibold' : 'text-[#171717] hover:text-[#171717]'
              }`}
            >
              Home
            </button>
            <button
              onClick={() => handleNavClick('home', 'about')}
              className="text-[13px] font-medium text-[#171717] hover:text-[#171717] transition-colors duration-200"
            >
              About
            </button>
            <button
              onClick={() => handleNavClick('home', 'services')}
              className="text-[13px] font-medium text-[#171717] hover:text-[#171717] transition-colors duration-200"
            >
              Services
            </button>
            <button
              onClick={() => handleNavClick('home', 'wholesale')}
              className="text-[13px] font-medium text-[#171717] hover:text-[#171717] transition-colors duration-200"
            >
              Products / Wholesale
            </button>
            <button
              onClick={() => handleNavClick('grading')}
              className={`text-[13px] font-medium transition-colors duration-200 flex items-center gap-1.5 ${
                activePage === 'grading' ? 'text-[#0084C7] font-semibold' : 'text-[#171717] hover:text-[#0084C7]'
              }`}
            >
              Grading
              {activePage === 'grading' && (
                <span className="w-1.5 h-1.5 rounded-full bg-[#00A3E0]" />
              )}
            </button>
            <button
              onClick={() => handleNavClick('home', 'contact')}
              className="text-[13px] font-medium text-[#171717] hover:text-[#171717] transition-colors duration-200"
            >
              Contact
            </button>
          </div>
        </div>

        {/* Mobile Header Bar */}
        <div className={`flex lg:hidden items-center justify-between w-full backdrop-blur-md rounded-xl px-4 py-2 border border-[#E4E1DB] transition-all duration-300 ${
          isScrolled ? 'bg-[#EDEDED]/95 shadow-md border-[#D6D1C8]' : 'bg-[#EDEDED]/90 shadow-sm'
        }`}>
          <button
            onClick={() => handleNavClick('home')}
            className="flex items-center cursor-pointer focus:outline-none"
          >
            <Logo className="h-8 sm:h-9 w-auto object-contain" />
          </button>
          <button
            onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
            className="p-1.5 text-[#171717] hover:text-[#171717] rounded-lg focus:outline-none"
            aria-label="Toggle navigation menu"
          >
            {mobileMenuOpen ? <X size={20} /> : <Menu size={20} />}
          </button>
        </div>
      </nav>

      {/* Mobile Menu Dropdown */}
      {mobileMenuOpen && (
        <div className="lg:hidden mt-2 bg-white/95 backdrop-blur-lg rounded-2xl p-4 shadow-xl border border-[#E4E1DB] animate-in fade-in slide-in-from-top-2 duration-200">
          <div className="flex flex-col gap-2">
            <button
              onClick={() => handleNavClick('home')}
              className="text-left text-sm font-medium text-[#171717] hover:text-[#171717] px-3 py-2 rounded-lg hover:bg-[#F7F6F3] transition-colors"
            >
              Home
            </button>
            <button
              onClick={() => handleNavClick('home', 'about')}
              className="text-left text-sm font-medium text-[#171717] hover:text-[#171717] px-3 py-2 rounded-lg hover:bg-[#F7F6F3] transition-colors"
            >
              About
            </button>
            <button
              onClick={() => handleNavClick('home', 'services')}
              className="text-left text-sm font-medium text-[#171717] hover:text-[#171717] px-3 py-2 rounded-lg hover:bg-[#F7F6F3] transition-colors"
            >
              Services
            </button>
            <button
              onClick={() => handleNavClick('home', 'wholesale')}
              className="text-left text-sm font-medium text-[#171717] hover:text-[#171717] px-3 py-2 rounded-lg hover:bg-[#F7F6F3] transition-colors"
            >
              Products / Wholesale
            </button>
            <button
              onClick={() => handleNavClick('grading')}
              className="text-left text-sm font-medium text-[#171717] font-semibold px-3 py-2 rounded-lg bg-[#F1EFEA] transition-colors"
            >
              Device Grading
            </button>
            <button
              onClick={() => handleNavClick('home', 'contact')}
              className="text-left text-sm font-medium text-[#171717] hover:text-[#171717] px-3 py-2 rounded-lg hover:bg-[#F7F6F3] transition-colors"
            >
              Contact
            </button>
          </div>
        </div>
      )}
    </header>
  );
};
