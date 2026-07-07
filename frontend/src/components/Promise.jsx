import React from 'react';

export default function Promise() {
  return (
    <section id="why-us" className="py-24 bg-swift-blue/5">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-12 items-center">
          <div className="relative reveal active">
            <div className="absolute inset-0 bg-swift-blue rounded-3xl transform -rotate-3 opacity-20"></div>
            <img 
              src="https://images.unsplash.com/photo-1621905251189-08b45d6a269e?q=80&w=2069&auto=format&fit=crop" 
              alt="Plumber Tool Belt" 
              className="relative rounded-3xl shadow-2xl z-10 w-full h-auto object-cover transform transition duration-500 hover:scale-[1.02]"
            />
          </div>
          <div className="reveal active delay-100 text-left">
            <h3 className="text-3xl md:text-4xl font-extrabold mb-6 text-slate-900">The SwiftFix Promise</h3>
            <p className="text-slate-600 mb-8 text-lg leading-relaxed">We don't just fix pipes; we build trust. Our team is committed to leaving your home cleaner than we found it.</p>
            
            <ul className="space-y-4">
              <li className="flex items-center gap-3 bg-white p-3 rounded-lg shadow-sm border border-slate-100">
                <div className="w-8 h-8 rounded-full bg-green-100 flex items-center justify-center text-green-600 flex-shrink-0">
                  <svg className="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M5 13l4 4L19 7" />
                  </svg>
                </div>
                <span className="font-bold text-slate-800">2-Year Warranty on Repairs</span>
              </li>
              <li className="flex items-center gap-3 bg-white p-3 rounded-lg shadow-sm border border-slate-100">
                <div className="w-8 h-8 rounded-full bg-green-100 flex items-center justify-center text-green-600 flex-shrink-0">
                  <svg className="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M5 13l4 4L19 7" />
                  </svg>
                </div>
                <span className="font-bold text-slate-800">Background-Checked Technicians</span>
              </li>
              <li className="flex items-center gap-3 bg-white p-3 rounded-lg shadow-sm border border-slate-100">
                <div className="w-8 h-8 rounded-full bg-green-100 flex items-center justify-center text-green-600 flex-shrink-0">
                  <svg className="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M5 13l4 4L19 7" />
                  </svg>
                </div>
                <span className="font-bold text-slate-800">24/7 Live Answer - No Machines</span>
              </li>
            </ul>
          </div>
        </div>
      </div>
    </section>
  );
}
