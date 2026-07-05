

function PrivacyPolicy() {
  return (
    <div className="min-h-screen bg-slate-50 dark:bg-slate-950 text-slate-800 dark:text-slate-100 py-16 px-4 transition-colors duration-300">
      <div className="mx-auto max-w-3xl">
        <h1 className="text-4xl font-black text-slate-900 dark:text-white mb-6 text-center">
          Privacy <span className="text-[#c74a09]">Policy</span>
        </h1>
        <p className="text-xs text-slate-400 dark:text-slate-500 text-center mb-10">Last updated: July 2026</p>

        <div className="bg-white dark:bg-slate-900 p-8 rounded-2xl border border-slate-150 dark:border-slate-800 shadow-sm space-y-6 text-sm leading-relaxed text-slate-650 dark:text-slate-350">
          <section>
            <h3 className="text-base font-extrabold text-slate-800 dark:text-white mb-2">1. Information We Collect</h3>
            <p>
              We collect information you provide directly to us (e.g. name, email, phone number, address, and payment information) when you create an account, place an order, or communicate with customer support.
            </p>
          </section>

          <section>
            <h3 className="text-base font-extrabold text-slate-800 dark:text-white mb-2">2. How We Use Your Information</h3>
            <p>
              We use the collected details to process and fulfill your delivery orders, contact you regarding updates, personalize your food recommendation experience, and detect/prevent fraudulent transactions.
            </p>
          </section>

          <section>
            <h3 className="text-base font-extrabold text-slate-800 dark:text-white mb-2">3. Information Sharing</h3>
            <p>
              We share necessary information (like address and phone number) with our partner restaurants and riders solely to deliver your orders successfully. We do not sell your personal data to third parties.
            </p>
          </section>

          <section>
            <h3 className="text-base font-extrabold text-slate-800 dark:text-white mb-2">4. Security Measures</h3>
            <p>
              We use industry-standard encryption practices and security protocols to safeguard your personal data against unauthorized access, loss, or misuse.
            </p>
          </section>
        </div>
      </div>
    </div>
  );
}

export default PrivacyPolicy;
