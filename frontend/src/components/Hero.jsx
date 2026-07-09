import React, { useState, useEffect } from 'react';
import EstimateWizard from './EstimateWizard';

export default function Hero() {
  const [isWizardSubmitted, setIsWizardSubmitted] = useState(false);

  useEffect(() => {
    if (localStorage.getItem('swiftfix_quote_submitted')) {
      setIsWizardSubmitted(true);
    }
  }, []);

  return (
    <section className="relative bg-slate-900 lg:min-h-[700px] flex items-center pt-8 pb-16 lg:py-0 overflow-hidden" id="home">
      {/* Background Image */}
      <div className="absolute inset-0 z-0">
        <img 
          src="https://images.unsplash.com/photo-1505798577917-a651a5d40320?q=80&w=2072&auto=format&fit=crop" 
          alt="Professional Plumber Fixing Sink" 
          className="w-full h-full object-cover opacity-90"
        />
        <div className="absolute inset-0 hero-overlay"></div>
      </div>

      <div className="relative z-10 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 w-full">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 items-center">
          
          {/* Hero Text */}
          <div className="lg:col-span-7 text-center lg:text-left text-white reveal active">
            <div className="inline-flex items-center gap-2 bg-white/10 border border-white/20 rounded-full px-4 py-1.5 mb-6 backdrop-blur-md shadow-lg">
              <span className="flex h-2 w-2 relative">
                <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-green-400 opacity-75"></span>
                <span className="relative inline-flex rounded-full h-2 w-2 bg-green-500"></span>
              </span>
              <span className="text-slate-100 font-semibold text-xs uppercase tracking-wider">Avg Arrival: 45 Mins</span>
            </div>
            <h1 className="text-4xl lg:text-6xl font-extrabold leading-tight mb-6 tracking-tight">
              Plumbing Emergency? <br />
              <span className="text-transparent bg-clip-text bg-gradient-to-r from-swift-blue to-cyan-300">We Fix It Fast.</span>
            </h1>
            <p className="text-lg md:text-xl text-slate-300 mb-8 max-w-lg mx-auto lg:mx-0 leading-relaxed font-light">
              Licensed experts providing same-day repairs and upfront pricing. Don't let a leak ruin your day—we're here 24/7.
            </p>
            
            {/* Hero Benefits */}
            <div className="grid grid-cols-2 md:grid-cols-3 gap-y-4 gap-x-4 text-sm font-medium text-slate-300 max-w-lg mx-auto lg:mx-0 mb-8">
              <div className="flex items-center gap-2">
                <svg className="w-5 h-5 text-swift-blue flex-shrink-0" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z" />
                </svg>
                <span>Licensed & Bonded</span>
              </div>
              <div className="flex items-center gap-2">
                <svg className="w-5 h-5 text-swift-blue flex-shrink-0" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M12 8c-1.657 0-3 .895-3 2s1.343 2 3 2 3 .895 3 2-1.343 2-3 2m0-8c1.11 0 2.08.402 2.599 1M12 8V7m0 1v8m0 0v1m0-1c-1.11 0-2.08-.402-2.599-1M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
                </svg>
                <span>Upfront Pricing</span>
              </div>
              <div className="flex items-center gap-2">
                <svg className="w-5 h-5 text-swift-blue flex-shrink-0" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M19 11H5m14 0a2 2 0 012 2v6a2 2 0 01-2 2H5a2 2 0 01-2-2v-6a2 2 0 012-2m14 0V9a2 2 0 00-2-2M5 11V9a2 2 0 012-2m0 0V5a2 2 0 012-2h6a2 2 0 012 2v2M7 7h10" />
                </svg>
                <span>Clean Up Guarantee</span>
              </div>
              <div className="flex items-center gap-2">
                <svg className="w-5 h-5 text-swift-blue flex-shrink-0" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z" />
                </svg>
                <span>24/7 Support</span>
              </div>
              <div className="flex items-center gap-2">
                <svg className="w-5 h-5 text-swift-blue flex-shrink-0" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M11.049 2.927c.3-.921 1.603-.921 1.902 0l1.519 4.674a1 1 0 00.95.69h4.915c.969 0 1.371 1.24.588 1.81l-3.976 2.888a1 1 0 00-.363 1.118l1.518 4.674c.3.922-.755 1.688-1.538 1.118l-3.976-2.888a1 1 0 00-1.176 0l-3.976 2.888c-.783.57-1.838-.197-1.538-1.118l1.518-4.674a1 1 0 00-.363-1.118l-3.976-2.888c-.784-.57-.38-1.81.588-1.81h4.914a1 1 0 00.951-.69l1.519-4.674z" />
                </svg>
                <span>5-Star Rated</span>
              </div>
            </div>
          </div>

          {/* Estimator Card */}
          <div className="lg:col-span-5 relative reveal active delay-200">
            {/* Trust Badge floating */}
            <div className="absolute -top-6 -right-6 hidden lg:block bg-yellow-400 text-slate-900 font-bold rounded-full h-24 w-24 flex items-center justify-center transform rotate-12 shadow-xl z-20 border-4 border-white animate-bounce-slow">
              <div className="text-center text-[13px] leading-tight font-black uppercase tracking-wide">
                Same <br />Day<br />Service
              </div>
            </div>

            <div className="bg-white p-6 md:p-8 rounded-2xl shadow-2xl w-full border border-slate-200 relative overflow-hidden" id="contact">
              <EstimateWizard onSuccess={() => setIsWizardSubmitted(true)} />
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
