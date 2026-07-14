import { useState } from 'react';

function PartnerWithUs() {
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    phone: '',
    restaurantName: '',
    cuisine: '',
    address: ''
  });

  const [submitted, setSubmitted] = useState(false);

  const handleSubmit = (e) => {
    e.preventDefault();
    setSubmitted(true);
  };

  return (
    <div className="min-h-screen bg-slate-50 dark:bg-slate-950 text-slate-800 dark:text-slate-100 py-20 px-4 transition-colors duration-300 relative overflow-hidden flex items-center justify-center">
      {/* Background Decor */}
      <div className="absolute top-0 right-0 w-[40rem] h-[40rem] bg-orange-500/10 rounded-full blur-3xl opacity-50 pointer-events-none transform translate-x-1/3 -translate-y-1/3"></div>
      <div className="absolute bottom-0 left-0 w-[30rem] h-[30rem] bg-orange-500/10 rounded-full blur-3xl opacity-50 pointer-events-none transform -translate-x-1/3 translate-y-1/3"></div>
      <div className="absolute top-1/2 left-1/2 w-[50rem] h-[50rem] bg-orange-400/5 rounded-full blur-3xl opacity-50 pointer-events-none transform -translate-x-1/2 -translate-y-1/2"></div>

      <div className="mx-auto w-full max-w-xl relative z-10">
        <div className="text-center mb-10">
          <div className="w-16 h-16 bg-white dark:bg-slate-800 rounded-2xl flex items-center justify-center mx-auto mb-6 shadow-xl shadow-orange-500/10 border border-slate-100 dark:border-slate-700">
            <i className="bi bi-shop text-3xl text-transparent bg-clip-text bg-gradient-to-r from-[#c74a09] to-orange-400"></i>
          </div>
          <h1 className="text-4xl lg:text-5xl font-black text-slate-900 dark:text-white mb-4 tracking-tight">
            Partner <span className="text-transparent bg-clip-text bg-gradient-to-r from-[#c74a09] to-orange-400">With Us</span>
          </h1>
          <p className="text-base text-slate-550 dark:text-slate-400 max-w-sm mx-auto">
            Grow your business and reach thousands of hungry customers by listing your kitchen on Cravings.
          </p>
        </div>

        <div className="bg-white/80 dark:bg-slate-900/80 backdrop-blur-xl p-8 md:p-10 rounded-[2rem] border border-slate-200/50 dark:border-slate-800/50 shadow-2xl shadow-slate-200/40 dark:shadow-none transition-all duration-300 relative overflow-hidden group">
          <div className="absolute inset-0 bg-gradient-to-br from-orange-500/5 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500 pointer-events-none"></div>
          
          {submitted ? (
            <div className="text-center space-y-6 py-8 animate-fade-in">
              <div className="relative w-24 h-24 mx-auto flex items-center justify-center">
                <div className="absolute inset-0 bg-green-500/20 rounded-full animate-ping"></div>
                <div className="relative w-20 h-20 bg-gradient-to-tr from-green-400 to-green-600 rounded-full text-white flex items-center justify-center shadow-lg shadow-green-500/30">
                  <i className="bi bi-check-lg text-4xl font-black"></i>
                </div>
              </div>
              <div>
                <h3 className="text-2xl font-black text-slate-900 dark:text-white mb-2">Application Submitted!</h3>
                <p className="text-sm text-slate-500 dark:text-slate-400 leading-relaxed max-w-xs mx-auto">
                  Thank you for applying. Our restaurant onboarding team will reach out to you within 24-48 business hours.
                </p>
              </div>
            </div>
          ) : (
            <form onSubmit={handleSubmit} className="space-y-5 relative z-10">
              <div>
                <label className="block text-xs font-bold uppercase tracking-wider text-slate-500 dark:text-slate-400 mb-2 ml-1">Contact Person Name</label>
                <input
                  type="text"
                  required
                  className="w-full rounded-xl border border-slate-200 dark:border-slate-700/50 bg-slate-50 dark:bg-slate-800/50 text-slate-800 dark:text-slate-100 px-4 py-3 outline-none transition-all focus:border-orange-500 focus:bg-white dark:focus:bg-slate-900 focus:ring-4 focus:ring-orange-500/10 placeholder-slate-400 font-medium shadow-inner"
                  value={formData.name}
                  onChange={e => setFormData({ ...formData, name: e.target.value })}
                />
              </div>
              <div className="grid md:grid-cols-2 gap-5">
                <div>
                  <label className="block text-xs font-bold uppercase tracking-wider text-slate-500 dark:text-slate-400 mb-2 ml-1">Email Address</label>
                  <input
                    type="email"
                    required
                    className="w-full rounded-xl border border-slate-200 dark:border-slate-700/50 bg-slate-50 dark:bg-slate-800/50 text-slate-800 dark:text-slate-100 px-4 py-3 outline-none transition-all focus:border-orange-500 focus:bg-white dark:focus:bg-slate-900 focus:ring-4 focus:ring-orange-500/10 placeholder-slate-400 font-medium shadow-inner"
                    value={formData.email}
                    onChange={e => setFormData({ ...formData, email: e.target.value })}
                  />
                </div>
                <div>
                  <label className="block text-xs font-bold uppercase tracking-wider text-slate-500 dark:text-slate-400 mb-2 ml-1">Phone Number</label>
                  <input
                    type="tel"
                    required
                    className="w-full rounded-xl border border-slate-200 dark:border-slate-700/50 bg-slate-50 dark:bg-slate-800/50 text-slate-800 dark:text-slate-100 px-4 py-3 outline-none transition-all focus:border-orange-500 focus:bg-white dark:focus:bg-slate-900 focus:ring-4 focus:ring-orange-500/10 placeholder-slate-400 font-medium shadow-inner"
                    value={formData.phone}
                    onChange={e => setFormData({ ...formData, phone: e.target.value })}
                  />
                </div>
              </div>
              <div>
                <label className="block text-xs font-bold uppercase tracking-wider text-slate-500 dark:text-slate-400 mb-2 ml-1">Restaurant Name</label>
                <input
                  type="text"
                  required
                  className="w-full rounded-xl border border-slate-200 dark:border-slate-700/50 bg-slate-50 dark:bg-slate-800/50 text-slate-800 dark:text-slate-100 px-4 py-3 outline-none transition-all focus:border-orange-500 focus:bg-white dark:focus:bg-slate-900 focus:ring-4 focus:ring-orange-500/10 placeholder-slate-400 font-medium shadow-inner"
                  value={formData.restaurantName}
                  onChange={e => setFormData({ ...formData, restaurantName: e.target.value })}
                />
              </div>
              <div>
                <label className="block text-xs font-bold uppercase tracking-wider text-slate-500 dark:text-slate-400 mb-2 ml-1">Cuisine Speciality</label>
                <input
                  type="text"
                  placeholder="e.g. Indian, Italian, Desserts"
                  required
                  className="w-full rounded-xl border border-slate-200 dark:border-slate-700/50 bg-slate-50 dark:bg-slate-800/50 text-slate-800 dark:text-slate-100 px-4 py-3 outline-none transition-all focus:border-orange-500 focus:bg-white dark:focus:bg-slate-900 focus:ring-4 focus:ring-orange-500/10 placeholder-slate-400 font-medium shadow-inner"
                  value={formData.cuisine}
                  onChange={e => setFormData({ ...formData, cuisine: e.target.value })}
                />
              </div>
              <div>
                <label className="block text-xs font-bold uppercase tracking-wider text-slate-500 dark:text-slate-400 mb-2 ml-1">Restaurant Address</label>
                <textarea
                  required
                  rows="3"
                  className="w-full rounded-xl border border-slate-200 dark:border-slate-700/50 bg-slate-50 dark:bg-slate-800/50 text-slate-800 dark:text-slate-100 px-4 py-3 outline-none transition-all focus:border-orange-500 focus:bg-white dark:focus:bg-slate-900 focus:ring-4 focus:ring-orange-500/10 placeholder-slate-400 font-medium resize-none shadow-inner"
                  value={formData.address}
                  onChange={e => setFormData({ ...formData, address: e.target.value })}
                />
              </div>
              <button type="submit" className="w-full mt-4 rounded-xl bg-gradient-to-r from-orange-600 to-[#c74a09] py-4 font-bold text-white transition-all hover:shadow-lg hover:shadow-orange-500/30 hover:scale-[1.02] active:scale-[0.98] flex items-center justify-center gap-2">
                Submit Partnership Request
                <i className="bi bi-arrow-right"></i>
              </button>
            </form>
          )}
        </div>
      </div>
    </div>
  );
}

export default PartnerWithUs;
