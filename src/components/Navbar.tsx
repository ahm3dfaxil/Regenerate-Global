import React, { useState, useEffect } from 'react';
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
  const [isScrolled, setIsScrolled] = useState(false);
  const [activeSection, setActiveSection] = useState<string>('home');

  useEffect(() => {
    let running = false;

    const updateScrollState = () => {
      const currentScrollY = window.scrollY || document.documentElement.scrollTop || 0;
      setIsScrolled(currentScrollY > 20);

      if (activePage === 'home') {
        if (currentScrollY < 200) {
          setActiveSection('home');
        } else {
          const scrollPosition = currentScrollY + 220;
          const sectionIds = ['contact', 'about', 'wholesale', 'services'];
          let current = 'home';

          for (const id of sectionIds) {
            const el = document.getElementById(id);
            if (el) {
              const top = el.offsetTop;
              if (scrollPosition >= top) {
                current = id;
                break;
              }
            }
          }
          setActiveSection(current);
        }
      }
      running = false;
    };

    const handleScroll = () => {
      if (!running) {
        running = true;
        requestAnimationFrame(updateScrollState);
      }
    };

    updateScrollState();
    window.addEventListener('scroll', handleScroll, { passive: true });
    return () => window.removeEventListener('scroll', handleScroll);
  }, [activePage]);

  const handleNavClick = (page: PageView, sectionId?: string) => {
    setActivePage(page);
    setMobileMenuOpen(false);

    if (page === 'home') {
      if (sectionId) {
        setActiveSection(sectionId);
        setTimeout(() => {
          const element = document.getElementById(sectionId);
          if (element) {
            element.scrollIntoView({ behavior: 'smooth' });
          }
        }, 50);
      } else {
        setActiveSection('home');
        window.scrollTo({ top: 0, behavior: 'smooth' });
      }
    } else if (page === 'grading' || page === 'careers') {
      window.scrollTo({ top: 0, behavior: 'smooth' });
    }
  };

  const navItems = [
    { id: 'home', label: 'Home', isPage: 'home' as PageView, sectionId: undefined },
    { id: 'services', label: 'Services', isPage: 'home' as PageView, sectionId: 'services' },
    { id: 'wholesale', label: 'Products & Wholesale', isPage: 'home' as PageView, sectionId: 'wholesale' },
    { id: 'grading', label: 'Device Grading', isPage: 'grading' as PageView, sectionId: undefined },
    { id: 'careers', label: 'Careers', isPage: 'careers' as PageView, sectionId: undefined },
    { id: 'about', label: 'About', isPage: 'home' as PageView, sectionId: 'about' },
    { id: 'contact', label: 'Contact', isPage: 'home' as PageView, sectionId: 'contact' },
  ];

  const isItemActive = (item: typeof navItems[0]) => {
    if (item.isPage === 'grading') {
      return activePage === 'grading';
    }
    if (item.isPage === 'careers') {
      return activePage === 'careers';
    }
    if (activePage === 'grading' || activePage === 'careers') return false;
    if (!item.sectionId) return activeSection === 'home';
    return activeSection === item.sectionId;
  };

  return (
    <header
      className={`fixed top-0 left-0 right-0 z-50 w-full bg-white border-b border-[#E5E7EB] transition-all duration-300 ease-in-out ${isScrolled ? 'shadow-md border-[#DCD8D0]' : 'shadow-xs'
        }`}
    >
      <div className="w-full px-4 sm:px-8 md:px-12 lg:px-16 xl:px-20 h-20 sm:h-22 md:h-[96px] flex items-center justify-between gap-4 relative">
        {/* Desktop & Mobile Left Logo */}
        <button
          onClick={() => handleNavClick('home')}
          className="flex items-center cursor-pointer focus:outline-none hover:opacity-90 transition-opacity shrink-0 py-1 z-10 ml-6 sm:ml-12 md:ml-16 lg:ml-24 xl:ml-28"
          title="Regenerate Global Home"
        >
          <Logo className="h-14 sm:h-16 md:h-[78px] lg:h-[85px] w-auto object-contain" />
        </button>

        {/* Desktop Navigation Links Centered in Middle */}
        <nav className="hidden lg:flex items-center gap-7 xl:gap-9 absolute left-1/2 -translate-x-1/2">
          {navItems.map((item) => {
            const active = isItemActive(item);
            return (
              <button
                key={item.id}
                onClick={() => handleNavClick(item.isPage, item.sectionId)}
                className={`text-[15px] tracking-tight transition-colors duration-200 ease-in-out whitespace-nowrap cursor-pointer py-1 relative ${active
                    ? 'text-[#0084C7] font-semibold'
                    : 'text-[#2D3748] font-medium hover:text-[#0084C7]'
                  }`}
              >
                {item.label}
                {active && (
                  <span className="absolute bottom-[-10px] left-0 right-0 h-[2.5px] bg-[#0084C7] rounded-full" />
                )}
              </button>
            );
          })}
        </nav>

        {/* Mobile Menu Toggle Button */}
        <div className="flex lg:hidden items-center">
          <button
            onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
            className="p-2 text-[#171717] hover:text-[#0084C7] rounded-lg focus:outline-none transition-colors"
            aria-label="Toggle navigation menu"
          >
            {mobileMenuOpen ? <X size={24} /> : <Menu size={24} />}
          </button>
        </div>
      </div>

      {/* Mobile Menu Dropdown */}
      {mobileMenuOpen && (
        <div className="lg:hidden bg-white border-t border-[#E5E7EB] px-6 py-4 shadow-lg animate-in fade-in slide-in-from-top-2 duration-200">
          <div className="flex flex-col gap-2">
            {navItems.map((item) => {
              const active = isItemActive(item);
              return (
                <button
                  key={item.id}
                  onClick={() => handleNavClick(item.isPage, item.sectionId)}
                  className={`text-left text-sm tracking-tight px-4 py-2.5 rounded-lg transition-colors duration-200 ${active
                      ? 'bg-[#F0F9FF] text-[#0084C7] font-semibold'
                      : 'text-[#2D3748] font-medium hover:text-[#171717] hover:bg-gray-50'
                    }`}
                >
                  {item.label}
                </button>
              );
            })}
          </div>
        </div>
      )}
    </header>
  );
};
