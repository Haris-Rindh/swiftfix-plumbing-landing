import React from 'react';

export default function FAQ() {
  return (
    <section id="faq" className="py-24 bg-slate-900 text-white border-t border-slate-800">
      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-16 reveal active">
          <h3 className="text-3xl font-extrabold mb-4">Frequently Asked Questions</h3>
          <p className="text-slate-400">Common questions from our customers.</p>
        </div>

        <div className="space-y-4 reveal active delay-100">
          {/* FAQ Item 1 */}
          <details className="bg-slate-800 rounded-lg overflow-hidden group cursor-pointer border border-slate-700 open:border-swift-blue open:ring-1 open:ring-swift-blue transition-all text-left">
            <summary className="flex justify-between items-center p-6 font-bold text-lg select-none hover:bg-slate-700 transition">
              How much do you charge?
              <svg className="w-6 h-6 text-swift-blue transform group-open:rotate-180 transition-transform" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M19 9l-7 7-7-7" />
              </svg>
            </summary>
            <div className="px-6 pb-6 text-slate-300 leading-relaxed border-t border-slate-700 bg-slate-800/50 pt-4">
              We offer flat-rate pricing, meaning you'll know the exact cost before we start any work. No hourly billing surprises. Fill out the form above for a free estimate!
            </div>
          </details>

          {/* FAQ Item 2 */}
          <details className="bg-slate-800 rounded-lg overflow-hidden group cursor-pointer border border-slate-700 open:border-swift-blue open:ring-1 open:ring-swift-blue transition-all text-left">
            <summary className="flex justify-between items-center p-6 font-bold text-lg select-none hover:bg-slate-700 transition">
              How fast can you get here?
              <svg className="w-6 h-6 text-swift-blue transform group-open:rotate-180 transition-transform" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M19 9l-7 7-7-7" />
              </svg>
            </summary>
            <div className="px-6 pb-6 text-slate-300 leading-relaxed border-t border-slate-700 bg-slate-800/50 pt-4">
              For emergency calls, our average arrival time is 45 minutes. We have dispatched trucks throughout the city ready to roll 24/7.
            </div>
          </details>

          {/* FAQ Item 3 */}
          <details className="bg-slate-800 rounded-lg overflow-hidden group cursor-pointer border border-slate-700 open:border-swift-blue open:ring-1 open:ring-swift-blue transition-all text-left">
            <summary className="flex justify-between items-center p-6 font-bold text-lg select-none hover:bg-slate-700 transition">
              Are you licensed and insured?
              <svg className="w-6 h-6 text-swift-blue transform group-open:rotate-180 transition-transform" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M19 9l-7 7-7-7" />
              </svg>
            </summary>
            <div className="px-6 pb-6 text-slate-300 leading-relaxed border-t border-slate-700 bg-slate-800/50 pt-4">
              Absolutely. We are fully licensed, bonded, and insured. Our license number is #9822145. You and your home are fully protected.
            </div>
          </details>
        </div>
        
        <div className="text-center mt-12 reveal active delay-200">
          <p className="text-slate-400 mb-4">Still have questions?</p>
          <a href="tel:5550123" className="inline-block bg-swift-blue hover:bg-swift-dark text-white font-bold px-8 py-4 rounded-lg transition transform hover:-translate-y-1 shadow-lg shadow-swift-blue/20">Call Us Now: 555-0123</a>
        </div>
      </div>
    </section>
  );
}
