import React from 'react';

export default function Reviews() {
  const starsSvg = (
    <div className="flex text-yellow-400">
      {[...Array(5)].map((_, i) => (
        <svg key={i} className="w-5 h-5" fill="currentColor" viewBox="0 0 20 20">
          <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z"/>
        </svg>
      ))}
    </div>
  );

  return (
    <section id="reviews" className="py-24 bg-white">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex flex-col md:flex-row justify-between items-end mb-12 gap-4 reveal active">
          <div>
            <h2 className="text-swift-blue font-bold tracking-wider uppercase mb-3 text-sm">Testimonials</h2>
            <h3 className="text-3xl md:text-4xl font-extrabold text-slate-900">What Your Neighbors Say</h3>
          </div>
          <div className="flex items-center gap-3 bg-slate-50 px-4 py-2 rounded-lg border border-slate-100">
            <span className="text-slate-900 font-bold text-3xl">4.9</span>
            <div className="flex flex-col">
              {starsSvg}
              <span className="text-slate-500 text-xs font-medium">based on 524 reviews</span>
            </div>
          </div>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          {/* Review 1 */}
          <div className="reveal active bg-slate-50 p-8 rounded-2xl border border-slate-100 hover:shadow-md transition">
            {starsSvg}
            <p className="text-slate-700 italic mb-6 leading-relaxed mt-4">"Woke up to a flooded basement at 3 AM. SwiftFix was here in 40 minutes and stopped the leak immediately. Truly lifesavers!"</p>
            <div className="flex items-center gap-3 border-t border-slate-200 pt-4">
              <div className="w-10 h-10 bg-gradient-to-br from-swift-blue to-cyan-400 rounded-full flex items-center justify-center font-bold text-white text-sm">SJ</div>
              <div>
                <p className="font-bold text-slate-900 text-sm">Sarah Jenkins</p>
                <p className="text-xs text-green-600 flex items-center gap-1">
                  <svg className="w-3 h-3" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z" />
                  </svg>
                  Verified Customer
                </p>
              </div>
            </div>
          </div>

          {/* Review 2 */}
          <div className="reveal active bg-slate-50 p-8 rounded-2xl border border-slate-100 hover:shadow-md transition delay-100">
            {starsSvg}
            <p className="text-slate-700 italic mb-6 leading-relaxed mt-4">"Professional, clean, and honest. They gave me a quote before starting work and stuck to it. No surprises."</p>
            <div className="flex items-center gap-3 border-t border-slate-200 pt-4">
              <div className="w-10 h-10 bg-gradient-to-br from-swift-blue to-cyan-400 rounded-full flex items-center justify-center font-bold text-white text-sm">MR</div>
              <div>
                <p className="font-bold text-slate-900 text-sm">Mike Ross</p>
                <p className="text-xs text-green-600 flex items-center gap-1">
                  <svg className="w-3 h-3" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z" />
                  </svg>
                  Verified Customer
                </p>
              </div>
            </div>
          </div>

          {/* Review 3 */}
          <div className="reveal active bg-slate-50 p-8 rounded-2xl border border-slate-100 hover:shadow-md transition delay-200">
            {starsSvg}
            <p className="text-slate-700 italic mb-6 leading-relaxed mt-4">"Finally a plumber who cleans up after himself! Highly recommended for anyone needing quick repairs."</p>
            <div className="flex items-center gap-3 border-t border-slate-200 pt-4">
              <div className="w-10 h-10 bg-gradient-to-br from-swift-blue to-cyan-400 rounded-full flex items-center justify-center font-bold text-white text-sm">DL</div>
              <div>
                <p className="font-bold text-slate-900 text-sm">David Lee</p>
                <p className="text-xs text-green-600 flex items-center gap-1">
                  <svg className="w-3 h-3" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z" />
                  </svg>
                  Verified Customer
                </p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
