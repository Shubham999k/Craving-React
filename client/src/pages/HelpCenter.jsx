import { useState } from 'react';

function HelpCenter() {
  const faqs = [
    { q: 'How long does a typical delivery take?', a: 'Deliveries usually arrive within 25-45 minutes depending on the preparation time of the restaurant and the rider distance.' },
    { q: 'Can I change my delivery address after placing an order?', a: 'Addresses can only be modified if the restaurant has not started preparing the food. Contact customer support immediately.' },
    { q: 'What payment options do you support?', a: 'We support all major Credit/Debit cards, UPI payments, digital wallets, and Cash on Delivery.' },
    { q: 'How can I register my restaurant on Cravings?', a: 'Navigate to the "Partner With Us" link in the footer, submit the business onboarding form, and our partner manager will contact you.' }
  ];

  const [activeFaq, setActiveFaq] = useState(null);

  return (
    <div className="min-h-screen bg-slate-50 dark:bg-slate-950 text-slate-800 dark:text-slate-100 py-20 px-4 transition-colors duration-300 relative overflow-hidden">
      {/* Background Decor */}
      <div className="absolute top-0 right-0 w-[40rem] h-[40rem] bg-orange-500/10 rounded-full blur-3xl opacity-50 pointer-events-none transform translate-x-1/3 -translate-y-1/3"></div>
      <div className="absolute bottom-0 left-0 w-[30rem] h-[30rem] bg-orange-500/10 rounded-full blur-3xl opacity-50 pointer-events-none transform -translate-x-1/3 translate-y-1/3"></div>

      <div className="mx-auto max-w-4xl relative z-10">
        <div className="text-center mb-16">
          <h1 className="text-5xl lg:text-6xl font-black text-slate-900 dark:text-white mb-6 tracking-tight">
            Help <span className="text-transparent bg-clip-text bg-gradient-to-r from-[#c74a09] to-orange-400">Center</span>
          </h1>
          <p className="text-lg lg:text-xl text-slate-600 dark:text-slate-350 max-w-2xl mx-auto leading-relaxed">
            Find answers to frequently asked questions, or reach out to our customer support team directly.
          </p>
        </div>

        {/* FAQs */}
        <div className="space-y-4 mb-20">
          <h3 className="text-2xl font-extrabold text-slate-800 dark:text-white mb-8 flex items-center gap-3">
            <i className="bi bi-patch-question-fill text-[#c74a09]"></i>
            Frequently Asked Questions
          </h3>
          <div className="grid gap-4">
            {faqs.map((faq, i) => (
              <div 
                key={i} 
                className={`bg-white/80 dark:bg-slate-900/80 backdrop-blur-md rounded-2xl border ${activeFaq === i ? 'border-orange-500 shadow-lg shadow-orange-500/10' : 'border-slate-200/50 dark:border-slate-800/50 hover:border-slate-300 dark:hover:border-slate-700'} transition-all duration-300 overflow-hidden cursor-pointer group`}
                onClick={() => setActiveFaq(activeFaq === i ? null : i)}
              >
                <div className="p-6 flex justify-between items-center gap-4">
                  <h4 className="font-bold text-slate-900 dark:text-slate-100 text-lg group-hover:text-orange-600 dark:group-hover:text-orange-400 transition-colors">
                    {faq.q}
                  </h4>
                  <div className={`w-8 h-8 shrink-0 rounded-full flex items-center justify-center transition-transform duration-300 ${activeFaq === i ? 'bg-[#c74a09] text-white rotate-180' : 'bg-slate-100 dark:bg-slate-800 text-slate-500'}`}>
                    <i className="bi bi-chevron-down text-sm font-bold"></i>
                  </div>
                </div>
                <div className={`px-6 overflow-hidden transition-all duration-300 ease-in-out ${activeFaq === i ? 'max-h-40 pb-6 opacity-100' : 'max-h-0 opacity-0'}`}>
                  <p className="text-base text-slate-600 dark:text-slate-400 leading-relaxed">
                    {faq.a}
                  </p>
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Live support */}
        <div className="relative overflow-hidden bg-gradient-to-br from-orange-500 to-[#c74a09] p-10 md:p-14 rounded-[2.5rem] text-center shadow-2xl shadow-orange-500/30">
          <div className="absolute top-0 right-0 w-64 h-64 bg-white/10 rounded-full blur-3xl transform translate-x-1/2 -translate-y-1/2 pointer-events-none"></div>
          
          <div className="w-16 h-16 bg-white/20 rounded-2xl flex items-center justify-center mx-auto mb-6 backdrop-blur-sm">
            <i className="bi bi-headset text-3xl text-white"></i>
          </div>
          
          <h3 className="text-3xl font-extrabold text-white mb-4 relative z-10">Still need help?</h3>
          <p className="text-lg text-orange-100 mb-8 max-w-xl mx-auto relative z-10">
            Our 24/7 client happiness team is always standing by to assist with any questions or order issues.
          </p>
          <a href="/contact-us" className="inline-block bg-white text-[#c74a09] hover:bg-orange-50 hover:scale-105 font-bold py-3.5 px-8 rounded-xl transition-all duration-300 shadow-lg relative z-10">
            Contact Support Team
          </a>
        </div>
      </div>
    </div>
  );
}

export default HelpCenter;
