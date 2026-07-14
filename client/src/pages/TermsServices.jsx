function TermsServices() {
  return (
    <div className="min-h-screen bg-slate-50 dark:bg-slate-950 text-slate-800 dark:text-slate-100 py-20 px-4 transition-colors duration-300 relative overflow-hidden">
      {/* Background Decor */}
      <div className="absolute top-0 right-0 w-[40rem] h-[40rem] bg-orange-500/10 rounded-full blur-3xl opacity-50 pointer-events-none transform translate-x-1/3 -translate-y-1/3"></div>
      <div className="absolute bottom-0 left-0 w-[30rem] h-[30rem] bg-orange-500/10 rounded-full blur-3xl opacity-50 pointer-events-none transform -translate-x-1/3 translate-y-1/3"></div>

      <div className="mx-auto max-w-3xl relative z-10">
        <div className="text-center mb-16 relative">
          <div className="absolute top-1/2 left-1/2 w-32 h-32 bg-orange-400/20 rounded-full blur-2xl transform -translate-x-1/2 -translate-y-1/2 -z-10"></div>
          <h1 className="text-4xl lg:text-5xl font-black text-slate-900 dark:text-white mb-6 tracking-tight">
            Terms of <span className="text-transparent bg-clip-text bg-gradient-to-r from-[#c74a09] to-orange-400">Service</span>
          </h1>
          <p className="inline-block bg-orange-100 dark:bg-orange-500/10 text-orange-600 dark:text-orange-400 font-bold px-5 py-2 rounded-full text-sm shadow-sm border border-orange-200 dark:border-orange-500/20">
            <i className="bi bi-clock-history mr-2"></i>
            Last updated: July 2026
          </p>
        </div>

        <div className="space-y-6">
          
          <section className="relative group bg-white/80 dark:bg-slate-900/80 backdrop-blur-xl p-8 md:p-10 rounded-[2rem] border border-slate-200/50 dark:border-slate-800/50 shadow-lg shadow-slate-200/20 dark:shadow-none hover:shadow-2xl hover:shadow-orange-500/10 hover:-translate-y-1 transition-all duration-300">
            <div className="absolute -left-4 -top-4 w-12 h-12 bg-gradient-to-br from-orange-400 to-[#c74a09] text-white rounded-xl flex items-center justify-center font-black text-xl shadow-lg shadow-orange-500/30 transform -rotate-6 group-hover:rotate-0 transition-transform duration-300 hidden md:flex">01</div>
            <h3 className="text-xl font-extrabold text-slate-900 dark:text-white mb-4 flex items-center gap-3">
              <div className="w-10 h-10 rounded-lg bg-orange-100 dark:bg-orange-500/20 flex items-center justify-center md:hidden">
                <i className="bi bi-file-earmark-check text-[#c74a09] dark:text-orange-400 text-xl"></i>
              </div>
              Agreement to Terms
            </h3>
            <p className="text-base leading-relaxed text-slate-600 dark:text-slate-400 md:pl-4 border-l-2 border-transparent md:group-hover:border-orange-500/30 transition-colors duration-300">
              By accessing or using the Cravings website and services, you agree to comply with and be bound by these terms. If you do not agree with any part of these terms, please discontinue use of our services immediately.
            </p>
          </section>

          <section className="relative group bg-white/80 dark:bg-slate-900/80 backdrop-blur-xl p-8 md:p-10 rounded-[2rem] border border-slate-200/50 dark:border-slate-800/50 shadow-lg shadow-slate-200/20 dark:shadow-none hover:shadow-2xl hover:shadow-orange-500/10 hover:-translate-y-1 transition-all duration-300">
            <div className="absolute -left-4 -top-4 w-12 h-12 bg-gradient-to-br from-orange-400 to-[#c74a09] text-white rounded-xl flex items-center justify-center font-black text-xl shadow-lg shadow-orange-500/30 transform -rotate-6 group-hover:rotate-0 transition-transform duration-300 hidden md:flex">02</div>
            <h3 className="text-xl font-extrabold text-slate-900 dark:text-white mb-4 flex items-center gap-3">
              <div className="w-10 h-10 rounded-lg bg-orange-100 dark:bg-orange-500/20 flex items-center justify-center md:hidden">
                <i className="bi bi-person-badge text-[#c74a09] dark:text-orange-400 text-xl"></i>
              </div>
              Account Registration
            </h3>
            <p className="text-base leading-relaxed text-slate-600 dark:text-slate-400 md:pl-4 border-l-2 border-transparent md:group-hover:border-orange-500/30 transition-colors duration-300">
              You are responsible for maintaining the confidentiality of your account credentials and are fully liable for all activities that occur under your registered profile. You must notify us immediately of any unauthorized use of your account.
            </p>
          </section>

          <section className="relative group bg-white/80 dark:bg-slate-900/80 backdrop-blur-xl p-8 md:p-10 rounded-[2rem] border border-slate-200/50 dark:border-slate-800/50 shadow-lg shadow-slate-200/20 dark:shadow-none hover:shadow-2xl hover:shadow-orange-500/10 hover:-translate-y-1 transition-all duration-300">
            <div className="absolute -left-4 -top-4 w-12 h-12 bg-gradient-to-br from-orange-400 to-[#c74a09] text-white rounded-xl flex items-center justify-center font-black text-xl shadow-lg shadow-orange-500/30 transform -rotate-6 group-hover:rotate-0 transition-transform duration-300 hidden md:flex">03</div>
            <h3 className="text-xl font-extrabold text-slate-900 dark:text-white mb-4 flex items-center gap-3">
              <div className="w-10 h-10 rounded-lg bg-orange-100 dark:bg-orange-500/20 flex items-center justify-center md:hidden">
                <i className="bi bi-credit-card-2-front text-[#c74a09] dark:text-orange-400 text-xl"></i>
              </div>
              Orders, Pricing, and Payments
            </h3>
            <p className="text-base leading-relaxed text-slate-600 dark:text-slate-400 md:pl-4 border-l-2 border-transparent md:group-hover:border-orange-500/30 transition-colors duration-300">
              All prices listed on our platform are set in collaboration with partner restaurants. Cravings reserves the right to cancel orders in case of pricing errors or product unavailability. Payments are processed securely via verified gateways and are subject to validation checks.
            </p>
          </section>

          <section className="relative group bg-white/80 dark:bg-slate-900/80 backdrop-blur-xl p-8 md:p-10 rounded-[2rem] border border-slate-200/50 dark:border-slate-800/50 shadow-lg shadow-slate-200/20 dark:shadow-none hover:shadow-2xl hover:shadow-orange-500/10 hover:-translate-y-1 transition-all duration-300">
            <div className="absolute -left-4 -top-4 w-12 h-12 bg-gradient-to-br from-orange-400 to-[#c74a09] text-white rounded-xl flex items-center justify-center font-black text-xl shadow-lg shadow-orange-500/30 transform -rotate-6 group-hover:rotate-0 transition-transform duration-300 hidden md:flex">04</div>
            <h3 className="text-xl font-extrabold text-slate-900 dark:text-white mb-4 flex items-center gap-3">
              <div className="w-10 h-10 rounded-lg bg-orange-100 dark:bg-orange-500/20 flex items-center justify-center md:hidden">
                <i className="bi bi-exclamation-triangle text-[#c74a09] dark:text-orange-400 text-xl"></i>
              </div>
              Limitation of Liability
            </h3>
            <p className="text-base leading-relaxed text-slate-600 dark:text-slate-400 md:pl-4 border-l-2 border-transparent md:group-hover:border-orange-500/30 transition-colors duration-300">
              Cravings is a connector between customer, restaurant, and rider. We are not directly liable for food quality, preparation standards, or transport delays caused by unexpected traffic or severe weather issues, though we will assist in resolving disputes.
            </p>
          </section>

        </div>
      </div>
    </div>
  );
}

export default TermsServices;
