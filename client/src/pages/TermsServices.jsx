function TermsServices() {
  return (
    <div className="min-h-screen bg-slate-50/50 dark:bg-slate-950/50 text-slate-800 dark:text-slate-100 py-24 px-4 transition-colors duration-300 relative overflow-hidden">
      {/* Dynamic Animated Background */}
      <div className="fixed inset-0 pointer-events-none z-0 overflow-hidden">
        <div className="absolute top-[-10%] right-[-5%] w-[40rem] h-[40rem] bg-gradient-to-br from-orange-500/20 to-red-500/10 rounded-full blur-3xl animate-float-slow mix-blend-multiply dark:mix-blend-screen opacity-70"></div>
        <div className="absolute bottom-[-10%] left-[-10%] w-[50rem] h-[50rem] bg-gradient-to-tr from-amber-500/20 to-orange-600/10 rounded-full blur-3xl animate-float mix-blend-multiply dark:mix-blend-screen opacity-60 delay-300"></div>
        <div className="absolute top-[40%] left-[20%] w-[30rem] h-[30rem] bg-gradient-to-r from-orange-400/10 to-transparent rounded-full blur-3xl animate-pulse-glow opacity-50"></div>
      </div>

      <div className="mx-auto max-w-4xl relative z-10 opacity-0 animate-fade-in-up">
        <div className="text-center mb-20 relative">
          <div className="absolute top-1/2 left-1/2 w-40 h-40 bg-orange-400/20 rounded-full blur-3xl transform -translate-x-1/2 -translate-y-1/2 -z-10 animate-pulse-glow"></div>
          <h1 className="text-5xl lg:text-7xl font-black text-slate-900 dark:text-white mb-6 tracking-tight drop-shadow-sm">
            Terms of <span className="text-transparent bg-clip-text bg-gradient-to-r from-orange-600 to-amber-500 animate-gradient-x">Service</span>
          </h1>
          <p className="inline-flex items-center bg-white/80 dark:bg-slate-800/80 backdrop-blur-md text-orange-600 dark:text-orange-400 font-bold px-6 py-2.5 rounded-full text-sm shadow-lg border border-orange-100 dark:border-slate-700 hover:scale-105 transition-transform duration-300 cursor-default">
            <i className="bi bi-clock-history mr-2 animate-spin-slow"></i>
            Last updated: July 2026
          </p>
        </div>

        <div className="space-y-8">
          
          <section className="relative group bg-white/60 dark:bg-slate-900/60 backdrop-blur-2xl p-8 md:p-12 rounded-[2.5rem] border border-white/50 dark:border-slate-700/50 shadow-[0_8px_30px_rgb(0,0,0,0.04)] dark:shadow-[0_8px_30px_rgb(0,0,0,0.2)] hover:shadow-2xl hover:shadow-orange-500/20 dark:hover:shadow-orange-500/10 hover:-translate-y-2 transition-all duration-500 opacity-0 animate-fade-in-up delay-100 overflow-hidden">
            <div className="absolute inset-0 bg-gradient-to-br from-orange-500/5 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500 pointer-events-none"></div>
            <div className="absolute -left-4 -top-4 w-14 h-14 bg-gradient-to-br from-orange-500 to-[#c74a09] text-white rounded-2xl flex items-center justify-center font-black text-2xl shadow-xl shadow-orange-500/30 transform -rotate-6 group-hover:rotate-0 group-hover:scale-110 transition-all duration-500 hidden md:flex z-10">01</div>
            
            <h3 className="text-2xl font-extrabold text-slate-900 dark:text-white mb-5 flex items-center gap-4 relative z-10">
              <div className="w-12 h-12 rounded-xl bg-gradient-to-br from-orange-100 to-orange-50 dark:from-orange-500/20 dark:to-orange-500/5 flex items-center justify-center md:hidden shadow-inner">
                <i className="bi bi-file-earmark-check text-[#c74a09] dark:text-orange-400 text-2xl"></i>
              </div>
              Agreement to Terms
            </h3>
            <p className="text-lg leading-relaxed text-slate-600 dark:text-slate-350 md:pl-6 border-l-4 border-transparent md:group-hover:border-orange-500/40 transition-colors duration-500 relative z-10">
              By accessing or using the Cravings website and services, you agree to comply with and be bound by these terms. If you do not agree with any part of these terms, please discontinue use of our services immediately.
            </p>
          </section>

          <section className="relative group bg-white/60 dark:bg-slate-900/60 backdrop-blur-2xl p-8 md:p-12 rounded-[2.5rem] border border-white/50 dark:border-slate-700/50 shadow-[0_8px_30px_rgb(0,0,0,0.04)] dark:shadow-[0_8px_30px_rgb(0,0,0,0.2)] hover:shadow-2xl hover:shadow-orange-500/20 dark:hover:shadow-orange-500/10 hover:-translate-y-2 transition-all duration-500 opacity-0 animate-fade-in-up delay-200 overflow-hidden">
            <div className="absolute inset-0 bg-gradient-to-br from-orange-500/5 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500 pointer-events-none"></div>
            <div className="absolute -left-4 -top-4 w-14 h-14 bg-gradient-to-br from-orange-500 to-[#c74a09] text-white rounded-2xl flex items-center justify-center font-black text-2xl shadow-xl shadow-orange-500/30 transform -rotate-6 group-hover:rotate-0 group-hover:scale-110 transition-all duration-500 hidden md:flex z-10">02</div>
            
            <h3 className="text-2xl font-extrabold text-slate-900 dark:text-white mb-5 flex items-center gap-4 relative z-10">
              <div className="w-12 h-12 rounded-xl bg-gradient-to-br from-orange-100 to-orange-50 dark:from-orange-500/20 dark:to-orange-500/5 flex items-center justify-center md:hidden shadow-inner">
                <i className="bi bi-person-badge text-[#c74a09] dark:text-orange-400 text-2xl"></i>
              </div>
              Account Registration
            </h3>
            <p className="text-lg leading-relaxed text-slate-600 dark:text-slate-350 md:pl-6 border-l-4 border-transparent md:group-hover:border-orange-500/40 transition-colors duration-500 relative z-10">
              You are responsible for maintaining the confidentiality of your account credentials and are fully liable for all activities that occur under your registered profile. You must notify us immediately of any unauthorized use of your account.
            </p>
          </section>

          <section className="relative group bg-white/60 dark:bg-slate-900/60 backdrop-blur-2xl p-8 md:p-12 rounded-[2.5rem] border border-white/50 dark:border-slate-700/50 shadow-[0_8px_30px_rgb(0,0,0,0.04)] dark:shadow-[0_8px_30px_rgb(0,0,0,0.2)] hover:shadow-2xl hover:shadow-orange-500/20 dark:hover:shadow-orange-500/10 hover:-translate-y-2 transition-all duration-500 opacity-0 animate-fade-in-up delay-300 overflow-hidden">
            <div className="absolute inset-0 bg-gradient-to-br from-orange-500/5 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500 pointer-events-none"></div>
            <div className="absolute -left-4 -top-4 w-14 h-14 bg-gradient-to-br from-orange-500 to-[#c74a09] text-white rounded-2xl flex items-center justify-center font-black text-2xl shadow-xl shadow-orange-500/30 transform -rotate-6 group-hover:rotate-0 group-hover:scale-110 transition-all duration-500 hidden md:flex z-10">03</div>
            
            <h3 className="text-2xl font-extrabold text-slate-900 dark:text-white mb-5 flex items-center gap-4 relative z-10">
              <div className="w-12 h-12 rounded-xl bg-gradient-to-br from-orange-100 to-orange-50 dark:from-orange-500/20 dark:to-orange-500/5 flex items-center justify-center md:hidden shadow-inner">
                <i className="bi bi-credit-card-2-front text-[#c74a09] dark:text-orange-400 text-2xl"></i>
              </div>
              Orders, Pricing, and Payments
            </h3>
            <p className="text-lg leading-relaxed text-slate-600 dark:text-slate-350 md:pl-6 border-l-4 border-transparent md:group-hover:border-orange-500/40 transition-colors duration-500 relative z-10">
              All prices listed on our platform are set in collaboration with partner restaurants. Cravings reserves the right to cancel orders in case of pricing errors or product unavailability. Payments are processed securely via verified gateways and are subject to validation checks.
            </p>
          </section>

          <section className="relative group bg-white/60 dark:bg-slate-900/60 backdrop-blur-2xl p-8 md:p-12 rounded-[2.5rem] border border-white/50 dark:border-slate-700/50 shadow-[0_8px_30px_rgb(0,0,0,0.04)] dark:shadow-[0_8px_30px_rgb(0,0,0,0.2)] hover:shadow-2xl hover:shadow-orange-500/20 dark:hover:shadow-orange-500/10 hover:-translate-y-2 transition-all duration-500 opacity-0 animate-fade-in-up delay-400 overflow-hidden">
            <div className="absolute inset-0 bg-gradient-to-br from-orange-500/5 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500 pointer-events-none"></div>
            <div className="absolute -left-4 -top-4 w-14 h-14 bg-gradient-to-br from-orange-500 to-[#c74a09] text-white rounded-2xl flex items-center justify-center font-black text-2xl shadow-xl shadow-orange-500/30 transform -rotate-6 group-hover:rotate-0 group-hover:scale-110 transition-all duration-500 hidden md:flex z-10">04</div>
            
            <h3 className="text-2xl font-extrabold text-slate-900 dark:text-white mb-5 flex items-center gap-4 relative z-10">
              <div className="w-12 h-12 rounded-xl bg-gradient-to-br from-orange-100 to-orange-50 dark:from-orange-500/20 dark:to-orange-500/5 flex items-center justify-center md:hidden shadow-inner">
                <i className="bi bi-exclamation-triangle text-[#c74a09] dark:text-orange-400 text-2xl"></i>
              </div>
              Limitation of Liability
            </h3>
            <p className="text-lg leading-relaxed text-slate-600 dark:text-slate-350 md:pl-6 border-l-4 border-transparent md:group-hover:border-orange-500/40 transition-colors duration-500 relative z-10">
              Cravings is a connector between customer, restaurant, and rider. We are not directly liable for food quality, preparation standards, or transport delays caused by unexpected traffic or severe weather issues, though we will assist in resolving disputes.
            </p>
          </section>

        </div>
      </div>
    </div>
  );
}

export default TermsServices;
