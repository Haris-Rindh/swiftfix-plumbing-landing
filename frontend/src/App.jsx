import React, { useState, useEffect } from 'react';
import Navbar from './components/Navbar';
import Hero from './components/Hero';
import Services from './components/Services';
import Process from './components/Process';
import Reviews from './components/Reviews';
import FAQ from './components/FAQ';
import Promise from './components/Promise';
import Footer from './components/Footer';
import AdminDashboard from './components/AdminDashboard';

function App() {
  const [showAdmin, setShowAdmin] = useState(false);
  const [activeSection, setActiveSection] = useState('home');

  // Check URL query parameters for ?admin=true on load
  useEffect(() => {
    const params = new URLSearchParams(window.location.search);
    if (params.get('admin') === 'true') {
      setShowAdmin(true);
    }
  }, []);

  // ScrollSpy to highlight active section in Navbar
  useEffect(() => {
    if (showAdmin) return; // Disable scrollspy in admin dashboard

    const handleScroll = () => {
      const sections = ['services', 'process', 'reviews', 'faq'];
      const scrollPosition = window.scrollY + 200;

      let currentSection = 'home';
      for (const sectionId of sections) {
        const el = document.getElementById(sectionId);
        if (el) {
          const top = el.offsetTop;
          const height = el.clientHeight;
          if (scrollPosition >= top && scrollPosition < top + height) {
            currentSection = sectionId;
            break;
          }
        }
      }
      setActiveSection(currentSection);

      // Back to Top button logic
      const backToTopBtn = document.getElementById('back-to-top');
      if (backToTopBtn) {
        if (window.scrollY > 500) {
          backToTopBtn.classList.remove('translate-y-20', 'opacity-0');
        } else {
          backToTopBtn.classList.add('translate-y-20', 'opacity-0');
        }
      }
    };

    window.addEventListener('scroll', handleScroll);
    handleScroll(); // Trigger initial check

    return () => window.removeEventListener('scroll', handleScroll);
  }, [showAdmin]);

  return (
    <div className="font-sans text-slate-800 antialiased bg-slate-50 relative min-h-screen flex flex-col">
      {/* Top Bar: Trust Indicators */}
      <div className="bg-swift-nav text-slate-300 text-xs py-2 hidden md:block border-b border-slate-800 text-left">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 flex justify-between items-center">
          <div className="flex gap-6">
            <span className="flex items-center gap-1.5 font-medium text-green-400">
              <span className="w-2 h-2 rounded-full bg-green-500 animate-pulse"></span> 
              Techs Available Now
            </span>
            <span>License #9822145</span>
            <span>Bonded & Insured</span>
          </div>
          <div className="flex gap-4">
            <span>Servicing Greater Metro Area</span>
            <a href="#reviews" className="hover:text-swift-blue transition flex items-center gap-1">
              <span className="text-yellow-400">★★★★★</span> 500+ Reviews
            </a>
          </div>
        </div>
      </div>

      {/* Navbar */}
      <Navbar 
        showAdmin={showAdmin} 
        setShowAdmin={setShowAdmin} 
        activeSection={activeSection} 
      />

      {/* Main Content Area */}
      <main className="flex-grow">
        {showAdmin ? (
          <AdminDashboard />
        ) : (
          <>
            <Hero />
            <Services />
            <Process />
            <Reviews />
            <FAQ />
            <Promise />
          </>
        )}
      </main>

      {/* Footer */}
      <Footer 
        showAdmin={showAdmin} 
        setShowAdmin={setShowAdmin} 
      />

      {/* Back to Top Button */}
      {!showAdmin && (
        <button 
          id="back-to-top" 
          onClick={() => window.scrollTo({ top: 0, behavior: 'smooth' })}
          className="fixed bottom-8 right-8 bg-swift-blue hover:bg-swift-dark text-white p-3 rounded-full shadow-lg transition-all duration-300 transform translate-y-20 opacity-0 z-50 hover:-translate-y-1"
        >
          <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M5 10l7-7m0 0l7 7m-7-7v18" />
          </svg>
        </button>
      )}
    </div>
  );
}

export default App;
