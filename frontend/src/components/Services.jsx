import React from 'react';

export default function Services() {
  const handleCardClick = (e) => {
    e.preventDefault();
    const contactSection = document.getElementById('contact');
    if (contactSection) {
      contactSection.scrollIntoView({ behavior: 'smooth' });
    }
  };

  return (
    <section id="services" className="py-24 bg-white relative">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-16 max-w-2xl mx-auto reveal active">
          <h2 className="text-swift-blue font-bold tracking-wider uppercase mb-3 text-sm">Our Expertise</h2>
          <h3 className="text-3xl md:text-4xl font-extrabold text-slate-900 mb-6">Complete Plumbing Solutions</h3>
          <p className="text-slate-600 text-lg">We handle everything from minor repairs to major installations. If water runs through it, we fix it.</p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          {/* Card 1 */}
          <div className="reveal active group p-8 rounded-2xl bg-white border border-slate-100 shadow-lg hover:shadow-2xl hover:shadow-swift-blue/10 transition-all duration-300 relative overflow-hidden transform hover:-translate-y-2">
            <div className="absolute top-0 right-0 w-32 h-32 bg-swift-light/50 rounded-bl-full -mr-8 -mt-8 transition-transform duration-500 group-hover:scale-150 group-hover:bg-swift-light"></div>
            <div className="w-16 h-16 bg-swift-blue text-white rounded-2xl flex items-center justify-center mb-8 shadow-lg shadow-swift-blue/30 relative z-10 group-hover:rotate-6 transition-transform">
              <svg className="w-8 h-8" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M19.428 15.428a2 2 0 00-1.022-.547l-2.387-.477a6 6 0 00-3.86.517l-.318.158a6 6 0 01-3.86.517L6.05 15.21a2 2 0 00-1.806.547M8 4h8l-1 1v5.172a2 2 0 00.586 1.414l5 5c1.26 1.26.367 3.414-1.415 3.414H4.828c-1.782 0-2.674-2.154-1.414-3.414l5-5A2 2 0 009 10.172V5L8 4z" />
              </svg>
            </div>
            <h4 className="text-xl font-bold text-slate-900 mb-3 relative z-10">Leak Detection & Repair</h4>
            <p className="text-slate-600 mb-6 relative z-10">Stop wasting money on water bills. We use thermal imaging to find hidden leaks behind walls without damaging your home.</p>
            <a href="#contact" onClick={handleCardClick} className="text-swift-blue font-bold text-sm hover:underline inline-flex items-center gap-1 group/link relative z-10">
              Get Checked 
              <svg className="w-4 h-4 transform transition-transform group-hover/link:translate-x-1" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M17 8l4 4m0 0l-4 4m4-4H3" />
              </svg>
            </a>
          </div>

          {/* Card 2 */}
          <div className="reveal active group p-8 rounded-2xl bg-white border border-slate-100 shadow-lg hover:shadow-2xl hover:shadow-swift-blue/10 transition-all duration-300 relative overflow-hidden transform hover:-translate-y-2 delay-100">
            <div className="absolute top-0 right-0 w-32 h-32 bg-swift-light/50 rounded-bl-full -mr-8 -mt-8 transition-transform duration-500 group-hover:scale-150 group-hover:bg-swift-light"></div>
            <div className="w-16 h-16 bg-swift-blue text-white rounded-2xl flex items-center justify-center mb-8 shadow-lg shadow-swift-blue/30 relative z-10 group-hover:rotate-6 transition-transform">
              <svg className="w-8 h-8" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M19 7l-.867 12.142A2 2 0 0116.138 21H7.862a2 2 0 01-1.995-1.858L5 7m5 4v6m4-6v6m1-10V4a1 1 0 00-1-1h-4a1 1 0 00-1 1v3M4 7h16" />
              </svg>
            </div>
            <h4 className="text-xl font-bold text-slate-900 mb-3 relative z-10">Drain Cleaning</h4>
            <p className="text-slate-600 mb-6 relative z-10">Slow drains? Backups? We clear stubborn clogs safely using hydro-jetting technology to restore flow instantly.</p>
            <a href="#contact" onClick={handleCardClick} className="text-swift-blue font-bold text-sm hover:underline inline-flex items-center gap-1 group/link relative z-10">
              Unclog Now 
              <svg className="w-4 h-4 transform transition-transform group-hover/link:translate-x-1" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M17 8l4 4m0 0l-4 4m4-4H3" />
              </svg>
            </a>
          </div>

          {/* Card 3 */}
          <div className="reveal active group p-8 rounded-2xl bg-white border border-slate-100 shadow-lg hover:shadow-2xl hover:shadow-swift-blue/10 transition-all duration-300 relative overflow-hidden transform hover:-translate-y-2 delay-200">
            <div className="absolute top-0 right-0 w-32 h-32 bg-swift-light/50 rounded-bl-full -mr-8 -mt-8 transition-transform duration-500 group-hover:scale-150 group-hover:bg-swift-light"></div>
            <div className="w-16 h-16 bg-swift-blue text-white rounded-2xl flex items-center justify-center mb-8 shadow-lg shadow-swift-blue/30 relative z-10 group-hover:rotate-6 transition-transform">
              <svg className="w-8 h-8" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M10.325 4.317c.426-1.756 2.924-1.756 3.35 0a1.724 1.724 0 002.573 1.066c1.543-.94 3.31.826 2.37 2.37a1.724 1.724 0 001.065 2.572c1.756.426 1.756 2.924 0 3.35a1.724 1.724 0 00-1.066 2.573c.94 1.543-.826 3.31-2.37 2.37a1.724 1.724 0 00-2.572 1.065c-.426 1.756-2.924 1.756-3.35 0a1.724 1.724 0 00-2.573-1.066c-1.543.94-3.31-.826-2.37-2.37a1.724 1.724 0 00-1.065-2.572c-1.756-.426-1.756-2.924 0-3.35a1.724 1.724 0 001.066-2.573c-.94-1.543.826-3.31 2.37-2.37.996.608 2.296.07 2.572-1.065z" />
                <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M15 12a3 3 0 11-6 0 3 3 0 016 0z" />
              </svg>
            </div>
            <h4 className="text-xl font-bold text-slate-900 mb-3 relative z-10">Installations & Heaters</h4>
            <p className="text-slate-600 mb-6 relative z-10">Professional installation of water heaters, faucets, toilets, and garbage disposals. We haul away the old units.</p>
            <a href="#contact" onClick={handleCardClick} className="text-swift-blue font-bold text-sm hover:underline inline-flex items-center gap-1 group/link relative z-10">
              Get Quote 
              <svg className="w-4 h-4 transform transition-transform group-hover/link:translate-x-1" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M17 8l4 4m0 0l-4 4m4-4H3" />
              </svg>
            </a>
          </div>
        </div>
      </div>
    </section>
  );
}
