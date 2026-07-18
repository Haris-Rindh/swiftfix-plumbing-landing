import React, { useState } from 'react';

export default function EstimateWizard({ onSuccess }) {
  const [step, setStep] = useState(1);
  const [category, setCategory] = useState('');
  const [option, setOption] = useState('');
  const [formData, setFormData] = useState({
    name: '',
    phone: ''
  });
  
  const [isLoading, setIsLoading] = useState(false);
  const [errorMsg, setErrorMsg] = useState('');
  const [successInfo, setSuccessInfo] = useState(null);

  // Quote structures
  const pricingData = {
    leak: {
      label: 'Leak Detection',
      options: [
        { key: 'visible', label: 'Visible leak (Faucets, visible pipes)', min: 120, max: 220 },
        { key: 'hidden', label: 'Hidden leak (Behind walls or underground)', min: 290, max: 490 },
        { key: 'toilet', label: 'Running/leaking toilet', min: 95, max: 180 }
      ]
    },
    clog: {
      label: 'Drain Cleaning',
      options: [
        { key: 'single', label: 'Single sink, shower or tub clog', min: 89, max: 150 },
        { key: 'toilet', label: 'Clogged toilet', min: 99, max: 175 },
        { key: 'main', label: 'Main sewer line backup', min: 250, max: 480 }
      ]
    },
    heater: {
      label: 'Water Heaters',
      options: [
        { key: 'repair', label: 'Water heater repair / no hot water', min: 150, max: 350 },
        { key: 'tank', label: 'Install new standard tank heater', min: 1100, max: 1900 },
        { key: 'tankless', label: 'Install new tankless water heater', min: 1900, max: 3200 }
      ]
    },
    install: {
      label: 'Installations',
      options: [
        { key: 'faucet', label: 'Faucet or shower fixture replacement', min: 110, max: 230 },
        { key: 'toilet', label: 'New toilet installation', min: 180, max: 320 },
        { key: 'disposal', label: 'Garbage disposal installation', min: 150, max: 280 }
      ]
    },
    emergency: {
      label: 'Emergency Service',
      options: [
        { key: 'burst', label: 'Burst / frozen pipe active leak', min: 350, max: 650 },
        { key: 'sewage', label: 'Sewage backup in home', min: 390, max: 790 },
        { key: 'flooding', label: 'Active flooding / sump pump failure', min: 300, max: 600 }
      ]
    }
  };

  const handleCategorySelect = (catKey) => {
    setCategory(catKey);
    setOption('');
    setStep(2);
  };

  const handleOptionSelect = (optKey) => {
    setOption(optKey);
    setStep(3);
  };

  const handleInputChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const getActiveOptionDetails = () => {
    if (!category || !option) return null;
    return pricingData[category].options.find(o => o.key === option);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setIsLoading(true);
    setErrorMsg('');

    const selectedCategory = pricingData[category];
    if (!selectedCategory || step !== 3) {
      setErrorMsg('Please complete the estimate steps before submitting.');
      setIsLoading(false);
      return;
    }

    const name = formData.name.trim();
    const phone = formData.phone.trim();
    if (!name || !phone) {
      setErrorMsg('Please enter your name and phone number.');
      setIsLoading(false);
      return;
    }

    if (phone.replace(/\D/g, '').length < 7) {
      setErrorMsg('Please enter a valid phone number.');
      setIsLoading(false);
      return;
    }

    const optDetails = getActiveOptionDetails();
    if (!optDetails || typeof optDetails.min !== 'number' || typeof optDetails.max !== 'number' || optDetails.min > optDetails.max) {
      setErrorMsg('Pricing error. Please restart the wizard.');
      setIsLoading(false);
      return;
    }

    const payload = {
      name,
      phone,
      issue: category,
      estimateMin: optDetails.min,
      estimateMax: optDetails.max,
      details: `Selected Issue: ${selectedCategory.label} -> Option: ${optDetails.label}`
    };

    const API_URL = import.meta.env.VITE_API_URL || '';

    try {
      // AJAX POST request
      const response = await fetch(`${API_URL}/api/leads`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json'
        },
        body: JSON.stringify(payload)
      });

      const data = await response.json();

      if (data.success) {
        localStorage.setItem('swiftfix_quote_submitted', 'true');
        setSuccessInfo(optDetails);
        setStep(4);
        if (onSuccess) onSuccess();
      } else {
        setErrorMsg(data.error || 'Failed to submit estimate request.');
      }
    } catch (err) {
      setErrorMsg('Network error. Make sure the database and backend server are running.');
      console.error('AJAX Wizard Error:', err);
    } finally {
      setIsLoading(false);
    }
  };

  const restartWizard = () => {
    setCategory('');
    setOption('');
    setFormData({ name: '', phone: '' });
    localStorage.removeItem('swiftfix_quote_submitted');
    setSuccessInfo(null);
    setStep(1);
  };

  // Step 1: Select Category
  if (step === 1) {
    return (
      <div className="reveal active">
        <div className="coupon-border p-4 mb-6 bg-swift-light/30 rounded-xl text-center">
          <p className="text-swift-blue font-bold text-lg uppercase tracking-wider">Interactive Estimator</p>
          <p className="text-slate-600 text-sm">Select a category to get an instant pricing estimate range</p>
        </div>
        <h3 className="text-2xl font-bold text-slate-900 mb-6 text-center">What plumbing help do you need?</h3>
        
        <div className="grid grid-cols-1 gap-3">
          {Object.keys(pricingData).map((key) => (
            <button
              key={key}
              onClick={() => handleCategorySelect(key)}
              className="flex items-center justify-between p-4 border border-slate-200 rounded-xl hover:border-swift-blue hover:bg-slate-50 transition text-left cursor-pointer shadow-sm group"
            >
              <div className="flex items-center gap-3">
                <span className="text-xl">
                  {key === 'emergency' ? '🚨' : key === 'clog' ? '💧' : key === 'leak' ? '🔎' : key === 'heater' ? '🔥' : '🔧'}
                </span>
                <span className="font-bold text-slate-800 text-base">{pricingData[key].label}</span>
              </div>
              <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 text-slate-400 group-hover:text-swift-blue group-hover:translate-x-1 transition" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2.5" d="M9 5l7 7-7 7" />
              </svg>
            </button>
          ))}
        </div>
      </div>
    );
  }

  // Step 2: Select Details
  if (step === 2) {
    return (
      <div className="reveal active">
        <button 
          onClick={() => setStep(1)} 
          className="flex items-center gap-1.5 text-xs font-bold text-slate-500 hover:text-swift-blue mb-4 uppercase tracking-wider"
        >
          <svg xmlns="http://www.w3.org/2000/svg" className="h-4 w-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2.5" d="M15 19l-7-7 7-7" />
          </svg>
          Back
        </button>
        
        <h3 className="text-xl font-extrabold text-slate-900 mb-6">Tell us more about the {pricingData[category].label}:</h3>
        
        <div className="grid grid-cols-1 gap-3">
          {pricingData[category].options.map((opt) => (
            <button
              key={opt.key}
              onClick={() => handleOptionSelect(opt.key)}
              className="flex items-center justify-between p-4 border border-slate-200 rounded-xl hover:border-swift-blue hover:bg-slate-50 transition text-left cursor-pointer shadow-sm group"
            >
              <span className="font-semibold text-slate-700 text-sm">{opt.label}</span>
              <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 text-slate-400 group-hover:text-swift-blue group-hover:translate-x-1 transition" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2.5" d="M9 5l7 7-7 7" />
              </svg>
            </button>
          ))}
        </div>
      </div>
    );
  }

  // Step 3: Show estimate and capture details
  if (step === 3) {
    const optDetails = getActiveOptionDetails();
    return (
      <div className="reveal active">
        <button 
          onClick={() => setStep(2)} 
          className="flex items-center gap-1.5 text-xs font-bold text-slate-500 hover:text-swift-blue mb-4 uppercase tracking-wider"
        >
          <svg xmlns="http://www.w3.org/2000/svg" className="h-4 w-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2.5" d="M15 19l-7-7 7-7" />
          </svg>
          Back
        </button>

        {/* Calculated Estimate Box */}
        <div className="bg-sky-50 border border-sky-200 rounded-xl p-5 mb-6 text-center">
          <p className="text-xs uppercase font-bold text-sky-700 tracking-widest mb-1">Calculated Estimate Range</p>
          <h4 className="text-3xl font-black text-sky-950">${optDetails.min} - ${optDetails.max}*</h4>
          <p className="text-xs text-sky-600 mt-2 font-medium">*Includes standard labor & service diagnostics.</p>
        </div>

        <h3 className="text-xl font-extrabold text-slate-900 mb-1">Lock in Estimate & Discount</h3>
        <p className="text-slate-500 text-xs mb-6">Enter details below to lock in this estimate and a **$50 booking discount**.</p>
        
        {errorMsg && (
          <div className="p-3 mb-4 bg-red-50 text-red-700 text-sm rounded-lg border border-red-200">
            {errorMsg}
          </div>
        )}

        <form onSubmit={handleSubmit} className="space-y-4">
          <div className="grid grid-cols-2 gap-4">
            <div>
              <label htmlFor="name" className="block text-xs font-semibold text-slate-600 uppercase mb-1">Name</label>
              <input 
                type="text" 
                id="name" 
                name="name" 
                value={formData.name}
                onChange={handleInputChange}
                required 
                className="w-full px-4 py-3 rounded-lg border border-slate-300 focus:border-swift-blue focus:ring-4 focus:ring-swift-blue/20 outline-none transition bg-slate-50 text-sm" 
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
                onChange={handleInputChange}
                required 
                className="w-full px-4 py-3 rounded-lg border border-slate-300 focus:border-swift-blue focus:ring-4 focus:ring-swift-blue/20 outline-none transition bg-slate-50 text-sm" 
                placeholder="(555) 123-4567"
              />
            </div>
          </div>

          <button 
            type="submit" 
            disabled={isLoading}
            className="w-full bg-swift-blue hover:bg-swift-dark text-white font-bold py-4 rounded-lg shadow-lg shadow-swift-blue/30 transition transform active:scale-95 flex justify-center items-center gap-2 text-lg disabled:opacity-75 disabled:cursor-not-allowed cursor-pointer"
          >
            {isLoading ? (
              <>
                <svg className="animate-spin -ml-1 mr-3 h-5 w-5 text-white" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
                  <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" stroke-width="4"></circle>
                  <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
                </svg>
                Locking Quote...
              </>
            ) : (
              <>
                <span>Lock in Quote & $50 Off</span>
                <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" stroke-width="2" d="M14 5l7 7m0 0l-7 7m7-7H3" />
                </svg>
              </>
            )}
          </button>
          
          <p className="text-center text-xs text-slate-400 mt-3 flex items-center justify-center gap-1">
            <svg className="w-3.5 h-3.5 text-slate-400" fill="currentColor" viewBox="0 0 20 20">
              <path fillRule="evenodd" d="M5 9V7a5 5 0 0110 0v2a2 2 0 012 2v5a2 2 0 01-2 2H5a2 2 0 01-2-2v-5a2 2 0 012-2zm8-2v2H7V7a3 3 0 016 0z" clipRule="evenodd" />
            </svg>
            Your information is secure.
          </p>
        </form>
      </div>
    );
  }

  // Step 4: Success state
  if (step === 4) {
    return (
      <div id="success-message" className="h-full flex flex-col justify-center items-center text-center py-6 reveal active">
        <div className="w-16 h-16 bg-green-100 rounded-full flex items-center justify-center mx-auto mb-5 animate-bounce">
          <svg className="w-9 h-9 text-green-600" fill="none" viewBox="0 0 24 24" stroke="currentColor">
            <path stroke-linecap="round" stroke-linejoin="round" stroke-width="3" d="M5 13l4 4L19 7" />
          </svg>
        </div>
        
        <h4 className="text-2xl font-bold text-slate-900 mb-1">Quote Locked In!</h4>
        <p className="text-slate-500 text-sm mb-4">Your diagnostic pricing estimate is secured:</p>
        
        <div className="bg-sky-50 border border-sky-200 rounded-xl p-4 mb-4 max-w-sm w-full">
          <p className="text-xs uppercase font-bold text-sky-700 tracking-wider">Locked Estimate</p>
          <h4 className="text-2xl font-black text-sky-950">${successInfo.min - 50} - ${successInfo.max - 50}*</h4>
          <p className="text-[10px] text-sky-600 mt-1 font-medium">*Calculated after your $50 coupon is applied.</p>
        </div>

        <div className="bg-green-50 border border-green-200 rounded-lg p-3 mb-5 max-w-xs w-full">
          <p className="text-green-800 font-bold text-sm">Coupon Applied: <span className="font-extrabold text-green-900">SWIFT50</span></p>
        </div>
        
        <p className="text-slate-600 text-sm max-w-xs mb-6">A technician has been notified and will call you at your number within 15 minutes to schedule dispatch.</p>
        
        <button 
          onClick={restartWizard} 
          className="text-sm text-swift-blue font-semibold hover:text-swift-dark underline decoration-2 underline-offset-4 cursor-pointer"
        >
          Calculate another estimate
        </button>
      </div>
    );
  }

  return null;
}
