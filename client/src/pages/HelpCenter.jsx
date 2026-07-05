

function HelpCenter() {
  const faqs = [
    { q: 'How long does a typical delivery take?', a: 'Deliveries usually arrive within 25-45 minutes depending on the preparation time of the restaurant and the rider distance.' },
    { q: 'Can I change my delivery address after placing an order?', a: 'Addresses can only be modified if the restaurant has not started preparing the food. Contact customer support immediately.' },
    { q: 'What payment options do you support?', a: 'We support all major Credit/Debit cards, UPI payments, digital wallets, and Cash on Delivery.' },
    { q: 'How can I register my restaurant on Cravings?', a: 'Navigate to the "Partner With Us" link in the footer, submit the business onboarding form, and our partner manager will contact you.' }
  ];

  return (
    <div className="min-h-screen bg-slate-50 dark:bg-slate-950 text-slate-800 dark:text-slate-100 py-16 px-4 transition-colors duration-300">
      <div className="mx-auto max-w-3xl">
        <h1 className="text-4xl lg:text-5xl font-black text-slate-900 dark:text-white mb-3 text-center">
          Help <span className="text-[#c74a09]">Center</span>
        </h1>
        <p className="text-sm text-slate-550 dark:text-slate-400 text-center mb-12">
          Find answers to frequently asked questions, or reach out to our customer support team directly.
        </p>

        {/* FAQs */}
        <div className="space-y-6 mb-12">
          <h3 className="text-xl font-extrabold text-slate-800 dark:text-white mb-4">Frequently Asked Questions</h3>
          {faqs.map((faq, i) => (
            <div key={i} className="bg-white dark:bg-slate-900 p-6 rounded-xl border border-slate-150 dark:border-slate-800 shadow-sm">
              <h4 className="font-extrabold text-slate-800 dark:text-slate-100 text-sm mb-2">Q: {faq.q}</h4>
              <p className="text-xs text-slate-500 dark:text-slate-400 leading-relaxed font-medium">A: {faq.a}</p>
            </div>
          ))}
        </div>

        {/* Live support */}
        <div className="bg-orange-500/5 border border-orange-500/20 p-8 rounded-2xl text-center">
          <h3 className="text-xl font-bold mb-2">Still need help?</h3>
          <p className="text-xs text-slate-600 dark:text-slate-400 mb-6">Our 24/7 client happiness team is always standing by to assist with any questions or order issues.</p>
          <a href="/contact-us" className="bg-[#c74a09] hover:bg-orange-700 text-white font-bold py-2.5 px-6 rounded-lg transition text-xs shadow-md">
            Contact Support Team
          </a>
        </div>
      </div>
    </div>
  );
}

export default HelpCenter;
