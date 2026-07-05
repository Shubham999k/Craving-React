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
    <div className="min-h-screen bg-slate-50 dark:bg-slate-950 text-slate-800 dark:text-slate-100 py-16 px-4 transition-colors duration-300">
      <div className="mx-auto max-w-xl">
        <h1 className="text-4xl font-black text-slate-900 dark:text-white mb-3 text-center">
          Partner <span className="text-[#c74a09]">With Us</span>
        </h1>
        <p className="text-sm text-slate-550 dark:text-slate-400 text-center mb-8">
          Grow your business and reach thousands of hungry customers by listing your kitchen on Cravings.
        </p>

        {submitted ? (
          <div className="bg-green-500/10 border border-green-500/30 p-8 rounded-xl text-center space-y-3">
            <div className="w-12 h-12 rounded-full bg-green-500 text-white flex items-center justify-center mx-auto text-xl font-bold">
              ✓
            </div>
            <h3 className="text-xl font-bold text-green-600 dark:text-green-400">Application Submitted!</h3>
            <p className="text-xs text-slate-500 dark:text-slate-400">
              Thank you for applying. Our restaurant onboarding team will reach out to you within 24-48 business hours.
            </p>
          </div>
        ) : (
          <form onSubmit={handleSubmit} className="bg-white dark:bg-slate-900 p-8 rounded-2xl border border-slate-150 dark:border-slate-800 shadow-md space-y-4">
            <div>
              <label className="block text-xs font-bold text-slate-650 dark:text-slate-350 mb-1">Contact Person Name</label>
              <input
                type="text"
                required
                className="w-full px-4 py-2 bg-slate-50 dark:bg-slate-800 border border-slate-200 dark:border-slate-700 rounded-lg outline-none focus:border-orange-500"
                value={formData.name}
                onChange={e => setFormData({ ...formData, name: e.target.value })}
              />
            </div>
            <div className="grid grid-cols-2 gap-4">
              <div>
                <label className="block text-xs font-bold text-slate-650 dark:text-slate-350 mb-1">Email Address</label>
                <input
                  type="email"
                  required
                  className="w-full px-4 py-2 bg-slate-50 dark:bg-slate-800 border border-slate-200 dark:border-slate-700 rounded-lg outline-none focus:border-orange-500"
                  value={formData.email}
                  onChange={e => setFormData({ ...formData, email: e.target.value })}
                />
              </div>
              <div>
                <label className="block text-xs font-bold text-slate-650 dark:text-slate-350 mb-1">Phone Number</label>
                <input
                  type="tel"
                  required
                  className="w-full px-4 py-2 bg-slate-50 dark:bg-slate-800 border border-slate-200 dark:border-slate-700 rounded-lg outline-none focus:border-orange-500"
                  value={formData.phone}
                  onChange={e => setFormData({ ...formData, phone: e.target.value })}
                />
              </div>
            </div>
            <div>
              <label className="block text-xs font-bold text-slate-650 dark:text-slate-350 mb-1">Restaurant Name</label>
              <input
                type="text"
                required
                className="w-full px-4 py-2 bg-slate-50 dark:bg-slate-800 border border-slate-200 dark:border-slate-700 rounded-lg outline-none focus:border-orange-500"
                value={formData.restaurantName}
                onChange={e => setFormData({ ...formData, restaurantName: e.target.value })}
              />
            </div>
            <div>
              <label className="block text-xs font-bold text-slate-650 dark:text-slate-350 mb-1">Cuisine / Dishes Speciality</label>
              <input
                type="text"
                placeholder="e.g. Indian, Italian, Desserts"
                required
                className="w-full px-4 py-2 bg-slate-50 dark:bg-slate-800 border border-slate-200 dark:border-slate-700 rounded-lg outline-none focus:border-orange-500"
                value={formData.cuisine}
                onChange={e => setFormData({ ...formData, cuisine: e.target.value })}
              />
            </div>
            <div>
              <label className="block text-xs font-bold text-slate-650 dark:text-slate-350 mb-1">Restaurant Location Address</label>
              <textarea
                required
                rows="3"
                className="w-full px-4 py-2 bg-slate-50 dark:bg-slate-800 border border-slate-200 dark:border-slate-700 rounded-lg outline-none focus:border-orange-500 resize-none"
                value={formData.address}
                onChange={e => setFormData({ ...formData, address: e.target.value })}
              />
            </div>
            <button type="submit" className="w-full bg-[#c74a09] hover:bg-orange-700 text-white font-bold py-3 rounded-lg transition text-sm cursor-pointer shadow-md">
              Submit Partnership Request
            </button>
          </form>
        )}
      </div>
    </div>
  );
}

export default PartnerWithUs;
