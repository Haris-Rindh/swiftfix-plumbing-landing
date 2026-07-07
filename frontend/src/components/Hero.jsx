import React, { useState, useEffect } from 'react';

export default function Hero() {
  const [formData, setFormData] = useState({
    name: '',
    phone: '',
    issue: ''
  });
  
  const [isSubmitted, setIsSubmitted] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const [errorMsg, setErrorMsg] = useState('');

  // Check localStorage on mount
  useEffect(() => {
    if (localStorage.getItem('swiftfix_quote_submitted')) {
      setIsSubmitted(true);
    }
  }, []);

  const handleChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value
    });
  };

  const handleFormSubmit = async (e) => {
    e.preventDefault();
    setIsLoading(true);
    setErrorMsg('');

    try {
      // AJAX (Fetch) request to save lead in backend MongoDB
      const response = await fetch('/api/leads', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json'
        },
        body: JSON.stringify(formData)
      });

      const data = await response.json();

      if (data.success) {
        setIsSubmitted(true);
        localStorage.setItem('swiftfix_quote_submitted', 'true');
      } else {
        setErrorMsg(data.error || 'Failed to submit quote. Please try again.');
      }
    } catch (err) {
      setErrorMsg('Network error. Please check your connection and try again.');
      console.error('AJAX Quote Submission Error:', err);
    } finally {
      setIsLoading(false);
    }
  };

  const resetForm = () => {
    setFormData({ name: '', phone: '', issue: '' });
    localStorage.removeItem('swiftfix_quote_submitted');
    setIsSubmitted(false);
  };

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

          {/* Lead Capture Form with Value Add */}
          <div className="lg:col-span-5 relative reveal active delay-200">
            {/* Trust Badge floating */}
            <div className="absolute -top-6 -right-6 hidden lg:block bg-yellow-400 text-slate-900 font-bold rounded-full h-24 w-24 flex items-center justify-center transform rotate-12 shadow-xl z-20 border-4 border-white animate-bounce-slow">
              <div className="text-center text-[13px] leading-tight font-black uppercase tracking-wide">
                Same <br />Day<br />Service
              </div>
            </div>

            <div className="bg-white p-6 md:p-8 rounded-2xl shadow-2xl w-full border border-slate-200 relative overflow-hidden" id="contact">
              
              {/* Initial Form State */}
              {!isSubmitted ? (
                <div id="form-container">
                  {/* Coupon Header */}
                  <div className="coupon-border p-4 mb-6 bg-swift-light/30 rounded-lg text-center cursor-pointer hover:bg-swift-light/50 transition">
                    <p className="text-swift-blue font-bold text-lg uppercase tracking-wider">New Customer Offer</p>
                    <p className="text-slate-600 text-sm">Get <span class="font-bold text-slate-900 bg-yellow-300 px-1">$50 OFF</span> your first service call</p>
                  </div>
                  
                  <h3 className="text-2xl font-bold text-slate-900 mb-1">Get Your Free Quote</h3>
                  <p className="text-slate-500 text-sm mb-6">Claim your discount by filling out the form below.</p>
                  
                  {errorMsg && (
                    <div className="p-3 mb-4 bg-red-50 text-red-700 text-sm rounded-lg border border-red-200">
                      {errorMsg}
                    </div>
                  )}

                  <form id="quote-form" className="space-y-4" onSubmit={handleFormSubmit}>
                    <div className="grid grid-cols-2 gap-4">
                      <div>
                        <label htmlFor="name" className="block text-xs font-semibold text-slate-600 uppercase mb-1">Name</label>
                        <input 
                          type="text" 
                          id="name" 
                          name="name" 
                          value={formData.name}
                          onChange={handleChange}
                          required 
                          className="w-full px-4 py-3 rounded-lg border border-slate-300 focus:border-swift-blue focus:ring-4 focus:ring-swift-blue/20 outline-none transition bg-slate-50" 
                          placeholder="John Doe"
                        />
                      </div>
                      <div>
                        <label htmlFor="phone" className="block text-xs font-semibold text-slate-600 uppercase mb-1">Phone</label>
                        <input 
                          type="tel" 
                          id="phone" 
                          name="phone" 
                          value={formData.phone}
                          onChange={handleChange}
                          required 
                          className="w-full px-4 py-3 rounded-lg border border-slate-300 focus:border-swift-blue focus:ring-4 focus:ring-swift-blue/20 outline-none transition bg-slate-50" 
                          placeholder="(555) 123-4567"
                        />
                      </div>
                    </div>

                    <div>
                      <label htmlFor="issue" className="block text-xs font-semibold text-slate-600 uppercase mb-1">How can we help?</label>
                      <select 
                        id="issue" 
                        name="issue" 
                        value={formData.issue}
                        onChange={handleChange}
                        required 
                        className="w-full px-4 py-3 rounded-lg border border-slate-300 focus:border-swift-blue focus:ring-4 focus:ring-swift-blue/20 outline-none transition bg-slate-50 cursor-pointer"
                      >
                        <option value="" disabled>Select issue...</option>
                        <option value="emergency">🚨 Emergency (Burst Pipe, etc)</option>
                        <option value="clog">Blocked Drain / Toilet</option>
                        <option value="leak">Leak Repair</option>
                        <option value="heater">Water Heater</option>
                        <option value="install">Installation Quote</option>
                      </select>
                    </div>

                    <button 
                      type="submit" 
                      id="submit-btn" 
                      disabled={isLoading}
                      className="w-full bg-swift-blue hover:bg-swift-dark text-white font-bold py-4 rounded-lg shadow-lg shadow-swift-blue/30 transition transform active:scale-95 flex justify-center items-center gap-2 text-lg disabled:opacity-75 disabled:cursor-not-allowed"
                    >
                      {isLoading ? (
                        <>
                          <svg className="animate-spin -ml-1 mr-3 h-5 w-5 text-white" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
                            <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" stroke-width="4"></circle>
                            <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
                          </svg>
                          Processing...
                        </>
                      ) : (
                        <>
                          <span>Lock in $50 Discount</span>
                          <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                            <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M14 5l7 7m0 0l-7 7m7-7H3" />
                          </svg>
                        </>
                      )}
                    </button>
                    <p className="text-center text-xs text-slate-400 mt-3 flex items-center justify-center gap-1">
                      <svg className="w-3 h-3" fill="currentColor" viewBox="0 0 20 20">
                        <path fillRule="evenodd" d="M5 9V7a5 5 0 0110 0v2a2 2 0 012 2v5a2 2 0 01-2 2H5a2 2 0 01-2-2v-5a2 2 0 012-2zm8-2v2H7V7a3 3 0 016 0z" clipRule="evenodd" />
                      </svg>
                      Your information is secure.
                    </p>
                  </form>
                </div>
              ) : (
                /* Success Message State */
                <div id="success-message" className="h-full flex flex-col justify-center items-center text-center py-12">
                  <div className="w-20 h-20 bg-green-100 rounded-full flex items-center justify-center mx-auto mb-6 animate-bounce">
                    <svg className="w-10 h-10 text-green-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path stroke-linecap="round" stroke-linejoin="round" stroke-width="3" d="M5 13l4 4L19 7" />
                    </svg>
                  </div>
                  <h4 className="text-2xl font-bold text-slate-900 mb-2">Discount Locked In!</h4>
                  <div className="bg-green-50 border border-green-200 rounded-lg p-4 mb-6 max-w-xs mx-auto">
                    <p className="text-green-800 font-medium">Coupon Code: <span className="font-bold">SWIFT50</span></p>
                    <p className="text-xs text-green-600 mt-1">Applied to your account</p>
                  </div>
                  <p className="text-slate-600 mb-6">A technician has been notified and will call you at the number provided within 15 minutes.</p>
                  <button 
                    onClick={resetForm} 
                    className="text-sm text-swift-blue font-semibold hover:text-swift-dark underline decoration-2 underline-offset-4"
                  >
                    Submit another request
                  </button>
                </div>
              )}
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
