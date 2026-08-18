import React, { useState, useEffect, useRef } from 'react';
import { Menu, X } from 'lucide-react';
import type { PageView } from '../types';

const Logo: React.FC = () => (
  <img
    src="/logo-transparent.png"
    alt="Regenerate Global Logo"
    className="w-8 h-8 object-contain"
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
      className={`fixed top-0 left-0 right-0 z-50 w-full pt-3 sm:pt-4 pb-2 px-4 sm:px-8 transition-all duration-300 ease-in-out ${
        isVisible ? 'translate-y-0 opacity-100' : '-translate-y-full opacity-0 pointer-events-none'
      }`}
    >
      <nav className="max-w-7xl mx-auto flex items-center justify-between gap-3">
        {/* Desktop Navbar Container */}
        <div className="hidden lg:flex items-center justify-center w-full gap-3">
          <button
            onClick={() => handleNavClick('home')}
            className={`flex items-center justify-center rounded-full w-10 h-10 sm:w-11 sm:h-11 shrink-0 shadow-sm hover:opacity-90 transition-all focus:outline-none ${
              isScrolled ? 'shadow-md' : ''
            }`}
            style={{ backgroundColor: '#EDEDED' }}
            title="Regenerate Global Home"
          >
            <Logo />
          </button>

          <div
            className={`flex items-center gap-6 xl:gap-8 rounded-xl px-6 py-2.5 border border-[#E4E1DB] backdrop-blur-md transition-all duration-300 ${
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
                activePage === 'grading' ? 'text-[#B08D57] font-semibold' : 'text-[#171717] hover:text-[#B08D57]'
              }`}
            >
              Grading
              {activePage === 'grading' && (
                <span className="w-1.5 h-1.5 rounded-full bg-[#171717]" />
              )}
            </button>
            <button
              onClick={() => handleNavClick('home', 'contact')}
              className="text-[13px] font-medium text-[#171717] hover:text-[#171717] transition-colors duration-200"
            >
              Contact
            </button>
          </div>

          <button
            onClick={() => handleNavClick('home', 'contact')}
            className={`inline-flex items-center gap-1.5 text-[13px] font-medium text-white bg-[#171717] rounded-xl px-5 py-2.5 hover:bg-[#171717] transition-all shadow-sm cursor-pointer ${
              isScrolled ? 'shadow-md' : ''
            }`}
          >
            Get in Touch
          </button>
        </div>

        {/* Mobile Header Bar */}
        <div className={`flex lg:hidden items-center justify-between w-full backdrop-blur-md rounded-xl px-4 py-2.5 border border-[#E4E1DB] transition-all duration-300 ${
          isScrolled ? 'bg-[#EDEDED]/95 shadow-md border-[#D6D1C8]' : 'bg-[#EDEDED]/90 shadow-sm'
        }`}>
          <div
            onClick={() => handleNavClick('home')}
            className="flex items-center gap-3 cursor-pointer"
          >
            <div className="flex items-center justify-center rounded-full w-9 h-9 shrink-0 bg-[#EDEDED]">
              <Logo />
            </div>
            <span className="text-xs font-semibold tracking-tight text-[#171717]">
              REGENERATE GLOBAL
            </span>
          </div>
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
            <button
              onClick={() => handleNavClick('home', 'contact')}
              className="mt-2 text-center text-sm font-medium text-white bg-[#171717] px-4 py-2.5 rounded-xl hover:bg-[#171717] transition-colors"
            >
              Get in Touch
            </button>
          </div>
        </div>
      )}
    </header>
  );
};
