function PrivacyPolicy() {
  return (
    <div className="min-h-screen bg-slate-50 dark:bg-slate-950 text-slate-800 dark:text-slate-100 py-20 px-4 transition-colors duration-300 relative">
      {/* Background Decor */}
      <div className="absolute top-0 left-0 w-full h-96 bg-gradient-to-b from-orange-500/10 to-transparent pointer-events-none"></div>
      
      <div className="mx-auto max-w-3xl relative z-10">
        <div className="text-center mb-16">
          <h1 className="text-4xl lg:text-5xl font-black text-slate-900 dark:text-white mb-6 tracking-tight">
            Privacy <span className="text-transparent bg-clip-text bg-gradient-to-r from-[#c74a09] to-orange-400">Policy</span>
          </h1>
          <p className="inline-block bg-orange-100 dark:bg-orange-500/10 text-orange-600 dark:text-orange-400 font-bold px-4 py-1.5 rounded-full text-sm">
            Last updated: July 2026
          </p>
        </div>

        <div className="bg-white/80 dark:bg-slate-900/80 backdrop-blur-xl p-8 md:p-12 rounded-[2rem] border border-slate-200/50 dark:border-slate-800/50 shadow-2xl shadow-slate-200/20 dark:shadow-none space-y-10 text-base leading-relaxed text-slate-600 dark:text-slate-400">
          
          <section className="relative">
            <div className="absolute -left-6 top-1 text-[#c74a09]/20 font-black text-4xl hidden md:block">01</div>
            <h3 className="text-xl font-extrabold text-slate-900 dark:text-white mb-4 flex items-center gap-2">
              <i className="bi bi-shield-check text-[#c74a09] text-2xl md:hidden"></i>
              Information We Collect
            </h3>
            <p>
              We collect information you provide directly to us (e.g. name, email, phone number, address, and payment information) when you create an account, place an order, or communicate with customer support. This helps us ensure a seamless experience.
            </p>
          </section>

          <div className="h-px bg-gradient-to-r from-transparent via-slate-200 dark:via-slate-800 to-transparent"></div>

          <section className="relative">
            <div className="absolute -left-6 top-1 text-[#c74a09]/20 font-black text-4xl hidden md:block">02</div>
            <h3 className="text-xl font-extrabold text-slate-900 dark:text-white mb-4 flex items-center gap-2">
              <i className="bi bi-gear-fill text-[#c74a09] text-2xl md:hidden"></i>
              How We Use Your Information
            </h3>
            <p>
              We use the collected details to process and fulfill your delivery orders, contact you regarding updates, personalize your food recommendation experience, and detect/prevent fraudulent transactions. We constantly strive to improve our platform using aggregated usage data.
            </p>
          </section>

          <div className="h-px bg-gradient-to-r from-transparent via-slate-200 dark:via-slate-800 to-transparent"></div>

          <section className="relative">
            <div className="absolute -left-6 top-1 text-[#c74a09]/20 font-black text-4xl hidden md:block">03</div>
            <h3 className="text-xl font-extrabold text-slate-900 dark:text-white mb-4 flex items-center gap-2">
              <i className="bi bi-share-fill text-[#c74a09] text-2xl md:hidden"></i>
              Information Sharing
            </h3>
            <p>
              We share necessary information (like address and phone number) with our partner restaurants and riders solely to deliver your orders successfully. We do not sell your personal data to third parties under any circumstances.
            </p>
          </section>

          <div className="h-px bg-gradient-to-r from-transparent via-slate-200 dark:via-slate-800 to-transparent"></div>

          <section className="relative">
            <div className="absolute -left-6 top-1 text-[#c74a09]/20 font-black text-4xl hidden md:block">04</div>
            <h3 className="text-xl font-extrabold text-slate-900 dark:text-white mb-4 flex items-center gap-2">
              <i className="bi bi-lock-fill text-[#c74a09] text-2xl md:hidden"></i>
              Security Measures
            </h3>
            <p>
              We use industry-standard encryption practices and security protocols to safeguard your personal data against unauthorized access, loss, or misuse. Your payment information is securely tokenized and never stored directly on our servers.
            </p>
          </section>

        </div>
      </div>
    </div>
  );
}

export default PrivacyPolicy;
