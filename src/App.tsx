import { useState, useEffect } from 'react';
import type { PageView } from './types';
import { Navbar } from './components/Navbar';
import { Footer } from './components/Footer';
import { HomePage } from './components/HomePage';
import { GradingPage } from './components/GradingPage';

export default function App() {
  const [activePage, setActivePage] = useState<PageView>('home');

  useEffect(() => {
    const handleHashChange = () => {
      if (window.location.hash === '#grading') {
        setActivePage('grading');
      }
    };
    handleHashChange();
    window.addEventListener('hashchange', handleHashChange);
    return () => window.removeEventListener('hashchange', handleHashChange);
  }, []);

  return (
    <div className="min-h-screen bg-[#F7F6F3] text-[#171717] font-sans antialiased flex flex-col justify-between selection:bg-[#00A3E0] selection:text-white">
      <div>
        <Navbar activePage={activePage} setActivePage={setActivePage} />

        <main>
          {activePage === 'home' ? (
            <HomePage setActivePage={setActivePage} />
          ) : (
            <GradingPage setActivePage={setActivePage} />
          )}
        </main>
      </div>

      <Footer setActivePage={setActivePage} />
    </div>
  );
}
