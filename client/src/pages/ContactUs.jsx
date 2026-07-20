import { useState } from 'react';

function ContactUs() {
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    subject: '',
    message: ''
  });

  const [submitted, setSubmitted] = useState(false);

  const handleSubmit = (e) => {
    e.preventDefault();
    setSubmitted(true);
  };

  return (
    <div className="min-h-screen bg-slate-50/50 dark:bg-slate-950/50 text-slate-800 dark:text-slate-100 py-24 px-4 transition-colors duration-300 relative overflow-hidden">
      {/* Dynamic Animated Background */}
      <div className="fixed inset-0 pointer-events-none z-0 overflow-hidden">
        <div className="absolute top-[0%] right-[0%] w-[40rem] h-[40rem] bg-gradient-to-br from-orange-500/20 to-red-500/10 rounded-full blur-3xl animate-float-slow mix-blend-multiply dark:mix-blend-screen opacity-70"></div>
        <div className="absolute bottom-[-10%] left-[-10%] w-[50rem] h-[50rem] bg-gradient-to-tr from-amber-500/20 to-orange-600/10 rounded-full blur-3xl animate-float mix-blend-multiply dark:mix-blend-screen opacity-60 delay-300"></div>
        <div className="absolute top-[40%] left-[20%] w-[30rem] h-[30rem] bg-gradient-to-r from-orange-400/10 to-transparent rounded-full blur-3xl animate-pulse-glow opacity-50"></div>
      </div>

      <div className="mx-auto max-w-6xl relative z-10 opacity-0 animate-fade-in-up">
        <div className="text-center mb-20 relative">
          <div className="absolute top-1/2 left-1/2 w-40 h-40 bg-orange-400/20 rounded-full blur-3xl transform -translate-x-1/2 -translate-y-1/2 -z-10 animate-pulse-glow"></div>
          <h1 className="text-5xl lg:text-7xl font-black text-slate-900 dark:text-white mb-6 tracking-tight drop-shadow-sm">
            Contact <span className="text-transparent bg-clip-text bg-gradient-to-r from-orange-600 to-amber-500 animate-gradient-x">Us</span>
          </h1>
          <p className="text-lg lg:text-xl text-slate-600 dark:text-slate-350 max-w-2xl mx-auto leading-relaxed">
            Have a question, concern, or just want to say hi? We'd love to hear from you.
          </p>
        </div>

        <div className="grid lg:grid-cols-5 gap-12 items-start">
          {/* Contact Info Cards */}
          <div className="lg:col-span-2 space-y-6">
            <div className="bg-white/60 dark:bg-slate-900/60 backdrop-blur-2xl p-8 rounded-[2.5rem] border border-white/50 dark:border-slate-700/50 shadow-[0_8px_30px_rgb(0,0,0,0.04)] dark:shadow-[0_8px_30px_rgb(0,0,0,0.2)] hover:shadow-2xl hover:shadow-orange-500/20 dark:hover:shadow-orange-500/10 hover:-translate-y-2 transition-all duration-500 group relative overflow-hidden">
              <div className="absolute inset-0 bg-gradient-to-br from-orange-500/5 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500 pointer-events-none"></div>
              <div className="w-16 h-16 rounded-2xl bg-orange-100 dark:bg-orange-500/20 flex items-center justify-center mb-6 group-hover:scale-110 group-hover:rotate-6 transition-transform duration-500">
                <i className="bi bi-geo-alt-fill text-3xl text-[#c74a09] dark:text-orange-400"></i>
              </div>
              <h3 className="text-2xl font-black text-slate-900 dark:text-white mb-3">Headquarters</h3>
              <p className="text-lg text-slate-600 dark:text-slate-400 leading-relaxed">
                123 Cravings Blvd,<br />
                Foodie City, FC 90210
              </p>
            </div>

            <div className="bg-white/60 dark:bg-slate-900/60 backdrop-blur-2xl p-8 rounded-[2.5rem] border border-white/50 dark:border-slate-700/50 shadow-[0_8px_30px_rgb(0,0,0,0.04)] dark:shadow-[0_8px_30px_rgb(0,0,0,0.2)] hover:shadow-2xl hover:shadow-orange-500/20 dark:hover:shadow-orange-500/10 hover:-translate-y-2 transition-all duration-500 group relative overflow-hidden">
              <div className="absolute inset-0 bg-gradient-to-br from-orange-500/5 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500 pointer-events-none"></div>
              <div className="w-16 h-16 rounded-2xl bg-orange-100 dark:bg-orange-500/20 flex items-center justify-center mb-6 group-hover:scale-110 group-hover:-rotate-6 transition-transform duration-500">
                <i className="bi bi-envelope-paper-fill text-3xl text-[#c74a09] dark:text-orange-400"></i>
              </div>
              <h3 className="text-2xl font-black text-slate-900 dark:text-white mb-3">Email Us</h3>
              <p className="text-lg text-slate-600 dark:text-slate-400 leading-relaxed">
                support@cravings.com<br />
                partners@cravings.com
              </p>
            </div>

            <div className="bg-white/60 dark:bg-slate-900/60 backdrop-blur-2xl p-8 rounded-[2.5rem] border border-white/50 dark:border-slate-700/50 shadow-[0_8px_30px_rgb(0,0,0,0.04)] dark:shadow-[0_8px_30px_rgb(0,0,0,0.2)] hover:shadow-2xl hover:shadow-orange-500/20 dark:hover:shadow-orange-500/10 hover:-translate-y-2 transition-all duration-500 group relative overflow-hidden">
              <div className="absolute inset-0 bg-gradient-to-br from-orange-500/5 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500 pointer-events-none"></div>
              <div className="w-16 h-16 rounded-2xl bg-orange-100 dark:bg-orange-500/20 flex items-center justify-center mb-6 group-hover:scale-110 group-hover:rotate-6 transition-transform duration-500">
                <i className="bi bi-telephone-fill text-3xl text-[#c74a09] dark:text-orange-400"></i>
              </div>
              <h3 className="text-2xl font-black text-slate-900 dark:text-white mb-3">Call Us</h3>
              <p className="text-lg text-slate-600 dark:text-slate-400 leading-relaxed">
                +1 (555) 123-4567<br />
                Mon-Sun from 8am to 11pm
              </p>
            </div>
          </div>

          {/* Contact Form */}
          <div className="lg:col-span-3 bg-white/60 dark:bg-slate-900/60 backdrop-blur-2xl p-8 md:p-12 rounded-[3rem] border border-white/50 dark:border-slate-700/50 shadow-[0_8px_30px_rgb(0,0,0,0.04)] dark:shadow-[0_8px_30px_rgb(0,0,0,0.2)] relative overflow-hidden group">
            <div className="absolute inset-0 bg-gradient-to-br from-orange-500/5 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500 pointer-events-none"></div>
            
            {submitted ? (
              <div className="text-center space-y-6 py-12 animate-fade-in-up">
                <div className="relative w-32 h-32 mx-auto flex items-center justify-center">
                  <div className="absolute inset-0 bg-green-500/20 rounded-full animate-ping"></div>
                  <div className="relative w-28 h-28 bg-gradient-to-tr from-green-400 to-green-600 rounded-full text-white flex items-center justify-center shadow-lg shadow-green-500/30">
                    <i className="bi bi-check-lg text-6xl font-black"></i>
                  </div>
                </div>
                <div>
                  <h3 className="text-4xl font-black text-slate-900 dark:text-white mb-4">Message Sent!</h3>
                  <p className="text-lg text-slate-600 dark:text-slate-400 leading-relaxed max-w-sm mx-auto">
                    Thanks for reaching out! A member of our support team will get back to you within 24 hours.
                  </p>
                </div>
              </div>
            ) : (
              <form onSubmit={handleSubmit} className="space-y-6 relative z-10">
                <h3 className="text-3xl font-extrabold text-slate-900 dark:text-white mb-8 border-b border-slate-200 dark:border-slate-700/50 pb-6">Send us a message</h3>
                <div className="grid md:grid-cols-2 gap-6">
                  <div>
                    <label className="block text-xs font-black uppercase tracking-widest text-slate-500 dark:text-slate-400 mb-2 ml-1">Your Name</label>
                    <input
                      type="text"
                      required
                      className="w-full rounded-2xl border border-white/40 dark:border-slate-700/50 bg-slate-50/50 dark:bg-slate-800/50 backdrop-blur-sm text-slate-800 dark:text-slate-100 px-5 py-4 outline-none transition-all focus:border-orange-500 focus:bg-white dark:focus:bg-slate-900 focus:ring-4 focus:ring-orange-500/20 placeholder-slate-400 font-semibold shadow-inner"
                      value={formData.name}
                      onChange={e => setFormData({ ...formData, name: e.target.value })}
                    />
                  </div>
                  <div>
                    <label className="block text-xs font-black uppercase tracking-widest text-slate-500 dark:text-slate-400 mb-2 ml-1">Email Address</label>
                    <input
                      type="email"
                      required
                      className="w-full rounded-2xl border border-white/40 dark:border-slate-700/50 bg-slate-50/50 dark:bg-slate-800/50 backdrop-blur-sm text-slate-800 dark:text-slate-100 px-5 py-4 outline-none transition-all focus:border-orange-500 focus:bg-white dark:focus:bg-slate-900 focus:ring-4 focus:ring-orange-500/20 placeholder-slate-400 font-semibold shadow-inner"
                      value={formData.email}
                      onChange={e => setFormData({ ...formData, email: e.target.value })}
                    />
                  </div>
                </div>
                <div>
                  <label className="block text-xs font-black uppercase tracking-widest text-slate-500 dark:text-slate-400 mb-2 ml-1">Subject</label>
                  <input
                    type="text"
                    required
                    className="w-full rounded-2xl border border-white/40 dark:border-slate-700/50 bg-slate-50/50 dark:bg-slate-800/50 backdrop-blur-sm text-slate-800 dark:text-slate-100 px-5 py-4 outline-none transition-all focus:border-orange-500 focus:bg-white dark:focus:bg-slate-900 focus:ring-4 focus:ring-orange-500/20 placeholder-slate-400 font-semibold shadow-inner"
                    value={formData.subject}
                    onChange={e => setFormData({ ...formData, subject: e.target.value })}
                  />
                </div>
                <div>
                  <label className="block text-xs font-black uppercase tracking-widest text-slate-500 dark:text-slate-400 mb-2 ml-1">Message</label>
                  <textarea
                    required
                    rows="6"
                    className="w-full rounded-2xl border border-white/40 dark:border-slate-700/50 bg-slate-50/50 dark:bg-slate-800/50 backdrop-blur-sm text-slate-800 dark:text-slate-100 px-5 py-4 outline-none transition-all focus:border-orange-500 focus:bg-white dark:focus:bg-slate-900 focus:ring-4 focus:ring-orange-500/20 placeholder-slate-400 font-semibold resize-none shadow-inner"
                    value={formData.message}
                    onChange={e => setFormData({ ...formData, message: e.target.value })}
                  />
                </div>
                <button type="submit" className="w-full mt-6 rounded-2xl bg-gradient-to-r from-orange-600 to-[#c74a09] py-5 font-extrabold text-white text-lg transition-all hover:shadow-[0_0_40px_rgba(249,115,22,0.4)] hover:scale-[1.02] active:scale-[0.98] flex items-center justify-center gap-3">
                  Send Message
                  <i className="bi bi-send-fill"></i>
                </button>
              </form>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}

export default ContactUs;