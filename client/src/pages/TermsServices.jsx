function TermsServices() {
  return (
    <div className="min-h-screen bg-slate-50 dark:bg-slate-950 text-slate-800 dark:text-slate-100 py-20 px-4 transition-colors duration-300 relative">
      {/* Background Decor */}
      <div className="absolute top-0 left-0 w-full h-96 bg-gradient-to-b from-orange-500/10 to-transparent pointer-events-none"></div>
      
      <div className="mx-auto max-w-3xl relative z-10">
        <div className="text-center mb-16">
          <h1 className="text-4xl lg:text-5xl font-black text-slate-900 dark:text-white mb-6 tracking-tight">
            Terms of <span className="text-transparent bg-clip-text bg-gradient-to-r from-[#c74a09] to-orange-400">Service</span>
          </h1>
          <p className="inline-block bg-orange-100 dark:bg-orange-500/10 text-orange-600 dark:text-orange-400 font-bold px-4 py-1.5 rounded-full text-sm">
            Last updated: July 2026
          </p>
        </div>

        <div className="bg-white/80 dark:bg-slate-900/80 backdrop-blur-xl p-8 md:p-12 rounded-[2rem] border border-slate-200/50 dark:border-slate-800/50 shadow-2xl shadow-slate-200/20 dark:shadow-none space-y-10 text-base leading-relaxed text-slate-600 dark:text-slate-400">
          
          <section className="relative">
            <div className="absolute -left-6 top-1 text-[#c74a09]/20 font-black text-4xl hidden md:block">01</div>
            <h3 className="text-xl font-extrabold text-slate-900 dark:text-white mb-4 flex items-center gap-2">
              <i className="bi bi-file-earmark-check text-[#c74a09] text-2xl md:hidden"></i>
              Agreement to Terms
            </h3>
            <p>
              By accessing or using the Cravings website and services, you agree to comply with and be bound by these terms. If you do not agree with any part of these terms, please discontinue use of our services immediately.
            </p>
          </section>

          <div className="h-px bg-gradient-to-r from-transparent via-slate-200 dark:via-slate-800 to-transparent"></div>

          <section className="relative">
            <div className="absolute -left-6 top-1 text-[#c74a09]/20 font-black text-4xl hidden md:block">02</div>
            <h3 className="text-xl font-extrabold text-slate-900 dark:text-white mb-4 flex items-center gap-2">
              <i className="bi bi-person-badge text-[#c74a09] text-2xl md:hidden"></i>
              Account Registration
            </h3>
            <p>
              You are responsible for maintaining the confidentiality of your account credentials and are fully liable for all activities that occur under your registered profile. You must notify us immediately of any unauthorized use of your account.
            </p>
          </section>

          <div className="h-px bg-gradient-to-r from-transparent via-slate-200 dark:via-slate-800 to-transparent"></div>

          <section className="relative">
            <div className="absolute -left-6 top-1 text-[#c74a09]/20 font-black text-4xl hidden md:block">03</div>
            <h3 className="text-xl font-extrabold text-slate-900 dark:text-white mb-4 flex items-center gap-2">
              <i className="bi bi-credit-card-2-front text-[#c74a09] text-2xl md:hidden"></i>
              Orders, Pricing, and Payments
            </h3>
            <p>
              All prices listed on our platform are set in collaboration with partner restaurants. Cravings reserves the right to cancel orders in case of pricing errors or product unavailability. Payments are processed securely via verified gateways and are subject to validation checks.
            </p>
          </section>

          <div className="h-px bg-gradient-to-r from-transparent via-slate-200 dark:via-slate-800 to-transparent"></div>

          <section className="relative">
            <div className="absolute -left-6 top-1 text-[#c74a09]/20 font-black text-4xl hidden md:block">04</div>
            <h3 className="text-xl font-extrabold text-slate-900 dark:text-white mb-4 flex items-center gap-2">
              <i className="bi bi-exclamation-triangle text-[#c74a09] text-2xl md:hidden"></i>
              Limitation of Liability
            </h3>
            <p>
              Cravings is a connector between customer, restaurant, and rider. We are not directly liable for food quality, preparation standards, or transport delays caused by unexpected traffic or severe weather issues, though we will assist in resolving disputes.
            </p>
          </section>

        </div>
      </div>
    </div>
  );
}

export default TermsServices;
