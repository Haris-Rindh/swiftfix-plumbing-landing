import React from 'react';

export default function Process() {
  return (
    <section id="process" className="py-24 bg-slate-50 border-t border-slate-200">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-16 reveal active">
          <h3 className="text-3xl font-extrabold text-slate-900">How It Works</h3>
          <p className="text-slate-600 mt-2">Plumbing problems are stressful. Our process is simple.</p>
        </div>

        <div className="relative reveal active">
          {/* Connecting Line (Desktop) */}
          <div className="hidden md:block absolute top-1/2 left-0 right-0 h-1 bg-gradient-to-r from-transparent via-slate-200 to-transparent -translate-y-1/2 z-0"></div>

          <div className="grid grid-cols-1 md:grid-cols-4 gap-8 relative z-10">
            {/* Step 1 */}
            <div className="bg-white p-8 rounded-2xl shadow-sm text-center border border-slate-100 transform hover:-translate-y-1 transition duration-300">
              <div className="w-14 h-14 bg-swift-blue text-white rounded-full flex items-center justify-center text-xl font-bold mx-auto mb-6 border-4 border-white shadow-lg relative z-10">1</div>
              <h4 class="font-bold text-slate-900 mb-2 text-lg">Request Service</h4>
              <p className="text-sm text-slate-500 leading-relaxed">Call us or fill out the form to claim your coupon.</p>
            </div>
            {/* Step 2 */}
            <div className="bg-white p-8 rounded-2xl shadow-sm text-center border border-slate-100 transform hover:-translate-y-1 transition duration-300">
              <div className="w-14 h-14 bg-swift-blue text-white rounded-full flex items-center justify-center text-xl font-bold mx-auto mb-6 border-4 border-white shadow-lg relative z-10">2</div>
              <h4 class="font-bold text-slate-900 mb-2 text-lg">Fast Dispatch</h4>
              <p className="text-sm text-slate-500 leading-relaxed">We send a licensed tech to your door ASAP.</p>
            </div>
            {/* Step 3 */}
            <div className="bg-white p-8 rounded-2xl shadow-sm text-center border border-slate-100 transform hover:-translate-y-1 transition duration-300">
              <div className="w-14 h-14 bg-swift-blue text-white rounded-full flex items-center justify-center text-xl font-bold mx-auto mb-6 border-4 border-white shadow-lg relative z-10">3</div>
              <h4 class="font-bold text-slate-900 mb-2 text-lg">Expert Repair</h4>
              <p className="text-sm text-slate-500 leading-relaxed">We diagnose and fix the issue with upfront pricing.</p>
            </div>
            {/* Step 4 */}
            <div className="bg-white p-8 rounded-2xl shadow-sm text-center border border-slate-100 transform hover:-translate-y-1 transition duration-300">
              <div className="w-14 h-14 bg-green-500 text-white rounded-full flex items-center justify-center text-xl font-bold mx-auto mb-6 border-4 border-white shadow-lg relative z-10">
                <svg className="w-6 h-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M5 13l4 4L19 7" />
                </svg>
              </div>
              <h4 class="font-bold text-slate-900 mb-2 text-lg">Problem Solved</h4>
              <p className="text-sm text-slate-500 leading-relaxed">We clean up and ensure you are 100% satisfied.</p>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
