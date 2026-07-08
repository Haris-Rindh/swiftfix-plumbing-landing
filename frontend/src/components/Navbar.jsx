import React, { useState } from 'react';
import { Link, useNavigate, useLocation } from 'react-router-dom';

export default function Navbar({ token, onLogout, activeSection }) {
  const [isOpen, setIsOpen] = useState(false);
  const navigate = useNavigate();
  const location = useLocation();

  const toggleMenu = () => {
    setIsOpen(!isOpen);
  };

  const handleLinkClick = (e, targetId) => {
    e.preventDefault();
    setIsOpen(false);

    if (location.pathname !== '/') {
      // If we are not on the homepage, navigate to '/' first and then scroll
      navigate('/', { replace: true });
      setTimeout(() => {
        const element = document.getElementById(targetId);
        if (element) {
          element.scrollIntoView({ behavior: 'smooth' });
        }
      }, 100);
    } else {
      // If we are already on the homepage, scroll smoothly
      const element = document.getElementById(targetId);
      if (element) {
        const headerOffset = 80;
        const elementPosition = element.getBoundingClientRect().top;
        const offsetPosition = elementPosition + window.pageYOffset - headerOffset;
        
        window.scrollTo({
          top: offsetPosition,
          behavior: 'smooth'
        });
      }
    }
  };

  const handleAdminClick = () => {
    setIsOpen(false);
    if (token) {
      navigate('/admin');
    } else {
      navigate('/login');
    }
  };

  const isHome = location.pathname === '/';

  return (
    <header className="sticky top-0 z-50 bg-white/95 backdrop-blur-md shadow-md border-b border-slate-100 transition-all duration-300" id="navbar">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between items-center h-20">
          {/* Logo */}
          <Link 
            to="/" 
            onClick={() => window.scrollTo({ top: 0, behavior: 'smooth' })}
            className="flex-shrink-0 flex items-center gap-2 cursor-pointer group"
          >
            <div className="relative">
              <svg xmlns="http://www.w3.org/2000/svg" className="h-8 w-8 text-swift-blue group-hover:rotate-12 transition-transform duration-300" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth="2.5">
                <path stroke-linecap="round" stroke-linejoin="round" d="M19.428 15.428a2 2 0 00-1.022-.547l-2.387-.477a6 6 0 00-3.86.517l-.318.158a6 6 0 01-3.86.517L6.05 15.21a2 2 0 00-1.806.547M8 4h8l-1 1v5.172a2 2 0 00.586 1.414l5 5c1.26 1.26.367 3.414-1.415 3.414H4.828c-1.782 0-2.674-2.154-1.414-3.414l5-5A2 2 0 009 10.172V5L8 4z" />
              </svg>
            </div>
            <span className="font-bold text-2xl tracking-tight text-slate-900">SwiftFix</span>
          </Link>

          {/* Desktop Menu */}
          <nav className="hidden md:flex space-x-8 items-center">
            <a 
              href="#services" 
              onClick={(e) => handleLinkClick(e, 'services')} 
              className={`nav-link text-sm font-semibold text-slate-600 hover:text-swift-blue transition uppercase tracking-wide py-1 ${isHome && activeSection === 'services' ? 'active' : ''}`}
            >
              Services
            </a>
            <a 
              href="#process" 
              onClick={(e) => handleLinkClick(e, 'process')} 
              className={`nav-link text-sm font-semibold text-slate-600 hover:text-swift-blue transition uppercase tracking-wide py-1 ${isHome && activeSection === 'process' ? 'active' : ''}`}
            >
              How It Works
            </a>
            <a 
              href="#reviews" 
              onClick={(e) => handleLinkClick(e, 'reviews')} 
              className={`nav-link text-sm font-semibold text-slate-600 hover:text-swift-blue transition uppercase tracking-wide py-1 ${isHome && activeSection === 'reviews' ? 'active' : ''}`}
            >
              Reviews
            </a>
            <a 
              href="#faq" 
              onClick={(e) => handleLinkClick(e, 'faq')} 
              className={`nav-link text-sm font-semibold text-slate-600 hover:text-swift-blue transition uppercase tracking-wide py-1 ${isHome && activeSection === 'faq' ? 'active' : ''}`}
            >
              FAQ
            </a>
            
            {token ? (
              <div className="flex items-center gap-4">
                <Link 
                  to="/admin" 
                  className={`text-sm font-semibold transition uppercase tracking-wide py-1 px-3 rounded ${location.pathname === '/admin' ? 'bg-swift-blue/10 text-swift-blue' : 'text-slate-600 hover:text-swift-blue'}`}
                >
                  Dashboard
                </Link>
                <button 
                  onClick={onLogout} 
                  className="text-sm font-semibold text-rose-600 hover:text-rose-800 uppercase tracking-wide py-1 transition"
                >
                  Logout
                </button>
              </div>
            ) : (
              <button 
                onClick={handleAdminClick}
                className={`text-sm font-semibold transition uppercase tracking-wide py-1 px-3 rounded ${location.pathname === '/login' ? 'bg-swift-blue/10 text-swift-blue' : 'text-slate-600 hover:text-swift-blue'}`}
              >
                Admin Login
              </button>
            )}
          </nav>

          {/* CTA Button */}
          <div className="hidden md:flex">
            <a href="tel:5550123" className="group bg-red-600 hover:bg-red-700 text-white px-5 py-2.5 rounded-lg font-bold shadow-lg shadow-red-600/20 transition transform hover:-translate-y-0.5 flex items-center gap-3">
              <div className="bg-white/20 p-1.5 rounded-full group-hover:bg-white/30 transition animate-pulse">
                <svg xmlns="http://www.w3.org/2000/svg" className="h-4 w-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M3 5a2 2 0 012-2h3.28a1 1 0 01.948.684l1.498 4.493a1 1 0 01-.502 1.21l-2.257 1.13a11.042 11.042 0 005.516 5.516l1.13-2.257a1 1 0 011.21-.502l4.493 1.498a1 1 0 01.684.949V19a2 2 0 01-2 2h-1C9.716 21 3 14.284 3 6V5z" />
                </svg>
              </div>
              <div className="flex flex-col items-start">
                <span className="block text-[10px] font-bold opacity-90 leading-none tracking-wider">24/7 EMERGENCY</span>
                <span className="text-lg leading-none font-bold">555-0123</span>
              </div>
            </a>
          </div>

          {/* Mobile menu button */}
          <div className="md:hidden flex items-center">
            <button 
              onClick={toggleMenu}
              className="text-slate-600 hover:text-slate-900 focus:outline-none p-2 rounded-md hover:bg-slate-100"
            >
              <svg className="h-7 w-7" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                {isOpen ? (
                  <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M6 18L18 6M6 6l12 12" />
                ) : (
                  <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M4 6h16M4 12h16M4 18h16" />
                )}
              </svg>
            </button>
          </div>
        </div>
      </div>

      {/* Mobile Menu Panel */}
      {isOpen && (
        <div id="mobile-menu" className="md:hidden bg-white border-t border-slate-100 absolute w-full shadow-xl transition-all z-40">
          <div className="px-4 pt-4 pb-6 space-y-2 sm:px-3">
            <a 
              href="#services" 
              onClick={(e) => handleLinkClick(e, 'services')} 
              className="block px-4 py-3 rounded-lg text-base font-semibold text-slate-700 hover:bg-slate-50 hover:text-swift-blue transition"
            >
              Services
            </a>
            <a 
              href="#process" 
              onClick={(e) => handleLinkClick(e, 'process')} 
              className="block px-4 py-3 rounded-lg text-base font-semibold text-slate-700 hover:bg-slate-50 hover:text-swift-blue transition"
            >
              Process
            </a>
            <a 
              href="#reviews" 
              onClick={(e) => handleLinkClick(e, 'reviews')} 
              className="block px-4 py-3 rounded-lg text-base font-semibold text-slate-700 hover:bg-slate-50 hover:text-swift-blue transition"
            >
              Reviews
            </a>
            <a 
              href="#faq" 
              onClick={(e) => handleLinkClick(e, 'faq')} 
              className="block px-4 py-3 rounded-lg text-base font-semibold text-slate-700 hover:bg-slate-50 hover:text-swift-blue transition"
            >
              FAQ
            </a>
            
            {token ? (
              <>
                <Link 
                  to="/admin" 
                  onClick={() => setIsOpen(false)}
                  className="block px-4 py-3 rounded-lg text-base font-semibold text-slate-700 hover:bg-slate-50 hover:text-swift-blue transition"
                >
                  Dashboard
                </Link>
                <button 
                  onClick={() => { setIsOpen(false); onLogout(); }} 
                  className="w-full text-left block px-4 py-3 rounded-lg text-base font-semibold text-rose-600 hover:bg-rose-50 transition"
                >
                  Logout
                </button>
              </>
            ) : (
              <button 
                onClick={handleAdminClick} 
                className="w-full text-left block px-4 py-3 rounded-lg text-base font-semibold text-slate-700 hover:bg-slate-50 hover:text-swift-blue transition"
              >
                Admin Login
              </button>
            )}
            <a href="tel:5550123" className="block mt-6 mx-2 px-4 py-4 rounded-xl text-lg font-bold text-center text-white bg-red-600 shadow-lg active:bg-red-700">
              Call Emergency: 555-0123
            </a>
          </div>
        </div>
      )}
    </header>
  );
}
