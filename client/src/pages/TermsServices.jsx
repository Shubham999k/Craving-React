

function TermsServices() {
  return (
    <div className="min-h-screen bg-slate-50 dark:bg-slate-950 text-slate-800 dark:text-slate-100 py-16 px-4 transition-colors duration-300">
      <div className="mx-auto max-w-3xl">
        <h1 className="text-4xl font-black text-slate-900 dark:text-white mb-6 text-center">
          Terms of <span className="text-[#c74a09]">Service</span>
        </h1>
        <p className="text-xs text-slate-400 dark:text-slate-500 text-center mb-10">Last updated: July 2026</p>

        <div className="bg-white dark:bg-slate-900 p-8 rounded-2xl border border-slate-150 dark:border-slate-800 shadow-sm space-y-6 text-sm leading-relaxed text-slate-650 dark:text-slate-350">
          <section>
            <h3 className="text-base font-extrabold text-slate-800 dark:text-white mb-2">1. Agreement to Terms</h3>
            <p>
              By accessing or using the Cravings website and services, you agree to comply with and be bound by these terms. If you do not agree, please do not use our services.
            </p>
          </section>

          <section>
            <h3 className="text-base font-extrabold text-slate-800 dark:text-white mb-2">2. Account Registration</h3>
            <p>
              You are responsible for maintaining the confidentiality of your account credentials and are fully liable for all activities that occur under your registered profile.
            </p>
          </section>

          <section>
            <h3 className="text-base font-extrabold text-slate-800 dark:text-white mb-2">3. Orders, Pricing, and Payments</h3>
            <p>
              All prices listed on our platform are set in collaboration with partner restaurants. Cravings reserves the right to cancel orders in case of pricing errors or product unavailability. Payments are processed securely via verified gateways.
            </p>
          </section>

          <section>
            <h3 className="text-base font-extrabold text-slate-800 dark:text-white mb-2">4. Limitation of Liability</h3>
            <p>
              Cravings is a connector between customer, restaurant, and rider. We are not liable for food quality, preparation standards, or transport delays caused by unexpected traffic or weather issues.
            </p>
          </section>
        </div>
      </div>
    </div>
  );
}

export default TermsServices;
