import { useState } from 'react';
import toast from 'react-hot-toast';
import api from '../config/api.config.js';

function PartnerWithUs() {
  const [formData, setFormData] = useState({
    contactName: '',
    email: '',
    phone: '',
    restaurantName: '',
    cuisine: '',
    address: '',
    fssaiLicense: '',
    gstin: '',
    panNumber: ''
  });

  const [step, setStep] = useState(1);
  const [submitted, setSubmitted] = useState(false);
  const [loading, setLoading] = useState(false);

  const nextStep = () => {
    // Basic validation before moving next
    if (step === 1) {
      if (!formData.contactName || !formData.email || !formData.phone) {
        toast.error("Please fill all contact details");
        return;
      }
    }
    if (step === 2) {
      if (!formData.restaurantName || !formData.cuisine || !formData.address) {
        toast.error("Please fill all restaurant details");
        return;
      }
    }
    setStep((prev) => prev + 1);
  };

  const prevStep = () => setStep((prev) => prev - 1);

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!formData.fssaiLicense || !formData.panNumber) {
        toast.error("Please provide required legal details");
        return;
    }
    
    setLoading(true);
    try {
      const response = await api.post('/restaurant/register', formData);
      setSubmitted(true);
      toast.success(response?.data?.message || "Partnership request submitted!");
    } catch (error) {
      toast.error(error?.response?.data?.message || "Something went wrong. Please try again.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen bg-slate-50/50 dark:bg-slate-950/50 text-slate-800 dark:text-slate-100 py-24 px-4 transition-colors duration-300 relative overflow-hidden flex items-center justify-center">
      {/* Dynamic Animated Background */}
      <div className="fixed inset-0 pointer-events-none z-0 overflow-hidden">
        <div className="absolute top-[0%] right-[-10%] w-[40rem] h-[40rem] bg-gradient-to-br from-orange-500/20 to-red-500/10 rounded-full blur-3xl animate-float-slow mix-blend-multiply dark:mix-blend-screen opacity-70"></div>
        <div className="absolute bottom-[-10%] left-[-10%] w-[50rem] h-[50rem] bg-gradient-to-tr from-amber-500/20 to-orange-600/10 rounded-full blur-3xl animate-float mix-blend-multiply dark:mix-blend-screen opacity-60 delay-300"></div>
        <div className="absolute top-1/2 left-1/2 w-[60rem] h-[60rem] bg-orange-400/5 rounded-full blur-3xl animate-pulse-glow opacity-50 transform -translate-x-1/2 -translate-y-1/2"></div>
      </div>

      <div className="mx-auto w-full max-w-xl relative z-10 animate-fade-in-up">
        <div className="text-center mb-10 relative">
          <div className="absolute top-1/2 left-1/2 w-40 h-40 bg-orange-400/20 rounded-full blur-3xl transform -translate-x-1/2 -translate-y-1/2 -z-10 animate-pulse-glow"></div>
          
          <div className="w-16 h-16 bg-white/80 dark:bg-slate-800/80 backdrop-blur-md rounded-2xl flex items-center justify-center mx-auto mb-4 shadow-2xl shadow-orange-500/20 border border-slate-100/50 dark:border-slate-700/50 animate-float">
            <i className="bi bi-shop text-3xl text-transparent bg-clip-text bg-gradient-to-br from-[#c74a09] to-orange-400"></i>
          </div>
          
          <h1 className="text-4xl lg:text-5xl font-black text-slate-900 dark:text-white mb-3 tracking-tight drop-shadow-sm">
            Partner <span className="text-transparent bg-clip-text bg-gradient-to-r from-orange-600 to-amber-500 animate-gradient-x">With Us</span>
          </h1>
          <p className="text-base text-slate-600 dark:text-slate-350 max-w-sm mx-auto leading-relaxed">
            Grow your business and reach thousands of hungry customers by listing your kitchen on Cravings.
          </p>
        </div>

        <div className="bg-white/60 dark:bg-slate-900/60 backdrop-blur-2xl p-8 rounded-[2.5rem] border border-white/50 dark:border-slate-700/50 shadow-[0_8px_30px_rgb(0,0,0,0.04)] dark:shadow-[0_8px_30px_rgb(0,0,0,0.2)] hover:shadow-2xl hover:shadow-orange-500/20 dark:hover:shadow-orange-500/10 transition-all duration-500 relative overflow-hidden group min-h-[450px] flex flex-col">
          <div className="absolute inset-0 bg-gradient-to-br from-orange-500/5 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500 pointer-events-none"></div>
          
          {submitted ? (
            <div className="text-center space-y-6 py-8 animate-fade-in-up flex-1 flex flex-col items-center justify-center">
              <div className="relative w-28 h-28 mx-auto flex items-center justify-center">
                <div className="absolute inset-0 bg-green-500/20 rounded-full animate-ping"></div>
                <div className="relative w-24 h-24 bg-gradient-to-tr from-green-400 to-green-600 rounded-full text-white flex items-center justify-center shadow-lg shadow-green-500/30">
                  <i className="bi bi-check-lg text-5xl font-black"></i>
                </div>
              </div>
              <div>
                <h3 className="text-3xl font-black text-slate-900 dark:text-white mb-3">Application Submitted!</h3>
                <p className="text-base text-slate-600 dark:text-slate-400 leading-relaxed max-w-sm mx-auto">
                  Thank you for applying. Our restaurant onboarding team will reach out to you within 24-48 business hours to get you set up.
                </p>
              </div>
            </div>
          ) : (
            <div className="flex-1 flex flex-col relative z-10">
                {/* Stepper Progress */}
                <div className="mb-8">
                    <div className="flex justify-between items-center mb-2">
                        {[1, 2, 3].map((item) => (
                            <div key={item} className="flex flex-col items-center">
                                <div className={`w-10 h-10 rounded-full flex items-center justify-center text-sm font-bold transition-all duration-500 ${step >= item ? 'bg-gradient-to-r from-orange-600 to-[#c74a09] text-white shadow-lg shadow-orange-500/30 scale-110' : 'bg-slate-200 dark:bg-slate-800 text-slate-400'}`}>
                                    {step > item ? <i className="bi bi-check-lg text-lg"></i> : item}
                                </div>
                            </div>
                        ))}
                    </div>
                    <div className="relative h-2 bg-slate-200 dark:bg-slate-800 rounded-full overflow-hidden mt-[-24px] z-[-1] mx-5">
                        <div 
                            className="absolute top-0 left-0 h-full bg-gradient-to-r from-orange-600 to-[#c74a09] transition-all duration-500" 
                            style={{ width: `${((step - 1) / 2) * 100}%` }}
                        ></div>
                    </div>
                    <div className="flex justify-between text-xs font-semibold text-slate-500 dark:text-slate-400 mt-4 px-1">
                        <span className={step >= 1 ? "text-orange-600 dark:text-orange-500" : ""}>Contact</span>
                        <span className={step >= 2 ? "text-orange-600 dark:text-orange-500 text-center ml-2" : "text-center ml-2"}>Restaurant</span>
                        <span className={step >= 3 ? "text-orange-600 dark:text-orange-500" : ""}>Legal</span>
                    </div>
                </div>

              <form onSubmit={handleSubmit} className="flex-1 flex flex-col h-full space-y-4">
                
                {/* STEP 1 */}
                <div className={`transition-all duration-500 ${step === 1 ? 'block opacity-100 animate-fade-in-up' : 'hidden opacity-0 h-0 overflow-hidden'}`}>
                    <h3 className="text-xl font-bold text-slate-800 dark:text-slate-100 mb-5 flex items-center gap-2">
                        <i className="bi bi-person-badge text-orange-500"></i> Contact Details
                    </h3>
                    <div className="space-y-5">
                        <div>
                            <label className="block text-xs font-black uppercase tracking-widest text-slate-500 dark:text-slate-400 mb-2 ml-1">Contact Person Name</label>
                            <input
                                type="text"
                                className="w-full rounded-2xl border border-white/40 dark:border-slate-700/50 bg-slate-50/50 dark:bg-slate-800/50 backdrop-blur-sm text-slate-800 dark:text-slate-100 px-5 py-4 outline-none transition-all focus:border-orange-500 focus:bg-white dark:focus:bg-slate-900 focus:ring-4 focus:ring-orange-500/20 placeholder-slate-400 font-semibold shadow-inner"
                                value={formData.contactName}
                                onChange={e => setFormData({ ...formData, contactName: e.target.value })}
                            />
                        </div>
                        <div>
                            <label className="block text-xs font-black uppercase tracking-widest text-slate-500 dark:text-slate-400 mb-2 ml-1">Email Address</label>
                            <input
                                type="email"
                                className="w-full rounded-2xl border border-white/40 dark:border-slate-700/50 bg-slate-50/50 dark:bg-slate-800/50 backdrop-blur-sm text-slate-800 dark:text-slate-100 px-5 py-4 outline-none transition-all focus:border-orange-500 focus:bg-white dark:focus:bg-slate-900 focus:ring-4 focus:ring-orange-500/20 placeholder-slate-400 font-semibold shadow-inner"
                                value={formData.email}
                                onChange={e => setFormData({ ...formData, email: e.target.value })}
                            />
                        </div>
                        <div>
                            <label className="block text-xs font-black uppercase tracking-widest text-slate-500 dark:text-slate-400 mb-2 ml-1">Phone Number</label>
                            <input
                                type="tel"
                                className="w-full rounded-2xl border border-white/40 dark:border-slate-700/50 bg-slate-50/50 dark:bg-slate-800/50 backdrop-blur-sm text-slate-800 dark:text-slate-100 px-5 py-4 outline-none transition-all focus:border-orange-500 focus:bg-white dark:focus:bg-slate-900 focus:ring-4 focus:ring-orange-500/20 placeholder-slate-400 font-semibold shadow-inner"
                                value={formData.phone}
                                onChange={e => setFormData({ ...formData, phone: e.target.value })}
                            />
                        </div>
                    </div>
                </div>

                {/* STEP 2 */}
                <div className={`transition-all duration-500 ${step === 2 ? 'block opacity-100 animate-fade-in-up' : 'hidden opacity-0 h-0 overflow-hidden'}`}>
                    <h3 className="text-xl font-bold text-slate-800 dark:text-slate-100 mb-5 flex items-center gap-2">
                        <i className="bi bi-shop-window text-orange-500"></i> Restaurant Details
                    </h3>
                    <div className="space-y-5">
                        <div>
                            <label className="block text-xs font-black uppercase tracking-widest text-slate-500 dark:text-slate-400 mb-2 ml-1">Restaurant Name</label>
                            <input
                            type="text"
                            className="w-full rounded-2xl border border-white/40 dark:border-slate-700/50 bg-slate-50/50 dark:bg-slate-800/50 backdrop-blur-sm text-slate-800 dark:text-slate-100 px-5 py-4 outline-none transition-all focus:border-orange-500 focus:bg-white dark:focus:bg-slate-900 focus:ring-4 focus:ring-orange-500/20 placeholder-slate-400 font-semibold shadow-inner"
                            value={formData.restaurantName}
                            onChange={e => setFormData({ ...formData, restaurantName: e.target.value })}
                            />
                        </div>
                        <div>
                            <label className="block text-xs font-black uppercase tracking-widest text-slate-500 dark:text-slate-400 mb-2 ml-1">Cuisine Speciality</label>
                            <input
                            type="text"
                            placeholder="e.g. Indian, Italian, Desserts"
                            className="w-full rounded-2xl border border-white/40 dark:border-slate-700/50 bg-slate-50/50 dark:bg-slate-800/50 backdrop-blur-sm text-slate-800 dark:text-slate-100 px-5 py-4 outline-none transition-all focus:border-orange-500 focus:bg-white dark:focus:bg-slate-900 focus:ring-4 focus:ring-orange-500/20 placeholder-slate-400 font-semibold shadow-inner"
                            value={formData.cuisine}
                            onChange={e => setFormData({ ...formData, cuisine: e.target.value })}
                            />
                        </div>
                        <div>
                            <label className="block text-xs font-black uppercase tracking-widest text-slate-500 dark:text-slate-400 mb-2 ml-1">Restaurant Address</label>
                            <textarea
                            rows="2"
                            className="w-full rounded-2xl border border-white/40 dark:border-slate-700/50 bg-slate-50/50 dark:bg-slate-800/50 backdrop-blur-sm text-slate-800 dark:text-slate-100 px-5 py-4 outline-none transition-all focus:border-orange-500 focus:bg-white dark:focus:bg-slate-900 focus:ring-4 focus:ring-orange-500/20 placeholder-slate-400 font-semibold resize-none shadow-inner"
                            value={formData.address}
                            onChange={e => setFormData({ ...formData, address: e.target.value })}
                            />
                        </div>
                    </div>
                </div>

                {/* STEP 3 */}
                <div className={`transition-all duration-500 ${step === 3 ? 'block opacity-100 animate-fade-in-up' : 'hidden opacity-0 h-0 overflow-hidden'}`}>
                    <h3 className="text-xl font-bold text-slate-800 dark:text-slate-100 mb-5 flex items-center gap-2">
                        <i className="bi bi-file-earmark-text text-orange-500"></i> Legal Details
                    </h3>
                    <div className="space-y-5">
                        <div>
                            <label className="block text-xs font-black uppercase tracking-widest text-slate-500 dark:text-slate-400 mb-2 ml-1">FSSAI License Number</label>
                            <input
                            type="text"
                            placeholder="14-digit FSSAI Number"
                            className="w-full rounded-2xl border border-white/40 dark:border-slate-700/50 bg-slate-50/50 dark:bg-slate-800/50 backdrop-blur-sm text-slate-800 dark:text-slate-100 px-5 py-4 outline-none transition-all focus:border-orange-500 focus:bg-white dark:focus:bg-slate-900 focus:ring-4 focus:ring-orange-500/20 placeholder-slate-400 font-semibold shadow-inner"
                            value={formData.fssaiLicense}
                            onChange={e => setFormData({ ...formData, fssaiLicense: e.target.value })}
                            />
                        </div>
                        <div>
                            <label className="block text-xs font-black uppercase tracking-widest text-slate-500 dark:text-slate-400 mb-2 ml-1">Owner PAN Number</label>
                            <input
                            type="text"
                            placeholder="10-digit PAN"
                            className="w-full rounded-2xl border border-white/40 dark:border-slate-700/50 bg-slate-50/50 dark:bg-slate-800/50 backdrop-blur-sm text-slate-800 dark:text-slate-100 px-5 py-4 outline-none transition-all focus:border-orange-500 focus:bg-white dark:focus:bg-slate-900 focus:ring-4 focus:ring-orange-500/20 placeholder-slate-400 font-semibold shadow-inner"
                            value={formData.panNumber}
                            onChange={e => setFormData({ ...formData, panNumber: e.target.value })}
                            />
                        </div>
                        <div>
                            <label className="block text-xs font-black uppercase tracking-widest text-slate-500 dark:text-slate-400 mb-2 ml-1">GSTIN (Optional)</label>
                            <input
                            type="text"
                            placeholder="15-digit GSTIN"
                            className="w-full rounded-2xl border border-white/40 dark:border-slate-700/50 bg-slate-50/50 dark:bg-slate-800/50 backdrop-blur-sm text-slate-800 dark:text-slate-100 px-5 py-4 outline-none transition-all focus:border-orange-500 focus:bg-white dark:focus:bg-slate-900 focus:ring-4 focus:ring-orange-500/20 placeholder-slate-400 font-semibold shadow-inner"
                            value={formData.gstin}
                            onChange={e => setFormData({ ...formData, gstin: e.target.value })}
                            />
                        </div>
                    </div>
                </div>

                <div className="flex-1"></div> {/* Spacer */}

                {/* Navigation Buttons */}
                <div className="pt-6 mt-6 border-t border-slate-200 dark:border-slate-700/50 flex gap-4">
                    {step > 1 && (
                        <button 
                            type="button" 
                            onClick={prevStep}
                            className="w-1/3 rounded-2xl bg-white dark:bg-slate-800 border border-slate-200 dark:border-slate-700 py-4 font-bold text-slate-700 dark:text-slate-200 text-lg transition-all hover:bg-slate-50 dark:hover:bg-slate-700 active:scale-[0.98] flex items-center justify-center gap-2"
                        >
                            <i className="bi bi-arrow-left"></i> Back
                        </button>
                    )}
                    
                    {step < 3 ? (
                        <button 
                            type="button" 
                            onClick={nextStep}
                            className={`${step === 1 ? 'w-full' : 'w-2/3'} rounded-2xl bg-gradient-to-r from-orange-600 to-[#c74a09] py-4 font-extrabold text-white text-lg transition-all hover:shadow-[0_0_30px_rgba(249,115,22,0.4)] hover:scale-[1.02] active:scale-[0.98] flex items-center justify-center gap-2`}
                        >
                            Next Step <i className="bi bi-arrow-right"></i>
                        </button>
                    ) : (
                        <button 
                            type="submit" 
                            disabled={loading} 
                            className="w-2/3 rounded-2xl bg-gradient-to-r from-green-600 to-green-500 py-4 font-extrabold text-white text-lg transition-all hover:shadow-[0_0_30px_rgba(34,197,94,0.4)] hover:scale-[1.02] active:scale-[0.98] flex items-center justify-center gap-2 disabled:opacity-70 disabled:cursor-not-allowed"
                        >
                            {loading ? 'Submitting...' : 'Submit'}
                            {!loading && <i className="bi bi-check2-circle text-xl"></i>}
                        </button>
                    )}
                </div>

              </form>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}

export default PartnerWithUs;
