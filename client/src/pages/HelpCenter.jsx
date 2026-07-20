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
    <div className="min-h-screen bg-slate-50/50 dark:bg-slate-950/50 text-slate-800 dark:text-slate-100 py-24 px-4 transition-colors duration-300 relative overflow-hidden">
      {/* Dynamic Animated Background */}
      <div className="fixed inset-0 pointer-events-none z-0 overflow-hidden">
        <div className="absolute top-[0%] right-[10%] w-[40rem] h-[40rem] bg-gradient-to-br from-orange-500/20 to-red-500/10 rounded-full blur-3xl animate-float-slow mix-blend-multiply dark:mix-blend-screen opacity-70"></div>
        <div className="absolute bottom-[-10%] left-[-10%] w-[50rem] h-[50rem] bg-gradient-to-tr from-amber-500/20 to-orange-600/10 rounded-full blur-3xl animate-float mix-blend-multiply dark:mix-blend-screen opacity-60 delay-300"></div>
        <div className="absolute top-[40%] left-[20%] w-[30rem] h-[30rem] bg-gradient-to-r from-orange-400/10 to-transparent rounded-full blur-3xl animate-pulse-glow opacity-50"></div>
      </div>

      <div className="mx-auto max-w-4xl relative z-10 opacity-0 animate-fade-in-up">
        <div className="text-center mb-20 relative">
          <div className="absolute top-1/2 left-1/2 w-40 h-40 bg-orange-400/20 rounded-full blur-3xl transform -translate-x-1/2 -translate-y-1/2 -z-10 animate-pulse-glow"></div>
          <h1 className="text-5xl lg:text-7xl font-black text-slate-900 dark:text-white mb-6 tracking-tight drop-shadow-sm">
            Help <span className="text-transparent bg-clip-text bg-gradient-to-r from-orange-600 to-amber-500 animate-gradient-x">Center</span>
          </h1>
          <p className="text-lg lg:text-xl text-slate-600 dark:text-slate-350 max-w-2xl mx-auto leading-relaxed">
            Find answers to frequently asked questions, or reach out to our customer support team directly.
          </p>
        </div>

        {/* FAQs */}
        <div className="space-y-6 mb-24 opacity-0 animate-fade-in-up delay-100">
          <h3 className="text-3xl font-extrabold text-slate-900 dark:text-white mb-10 flex items-center gap-4">
            <div className="w-12 h-12 rounded-2xl bg-orange-100 dark:bg-orange-500/20 flex items-center justify-center">
              <i className="bi bi-patch-question-fill text-2xl text-[#c74a09] dark:text-orange-400"></i>
            </div>
            Frequently Asked Questions
          </h3>
          <div className="grid gap-5">
            {faqs.map((faq, i) => (
              <div 
                key={i} 
                className={`bg-white/60 dark:bg-slate-900/60 backdrop-blur-2xl rounded-[2rem] border ${activeFaq === i ? 'border-orange-500 shadow-lg shadow-orange-500/20' : 'border-white/50 dark:border-slate-700/50 hover:border-slate-300 dark:hover:border-slate-600'} transition-all duration-300 overflow-hidden cursor-pointer group shadow-[0_8px_30px_rgb(0,0,0,0.04)] dark:shadow-[0_8px_30px_rgb(0,0,0,0.2)]`}
                onClick={() => setActiveFaq(activeFaq === i ? null : i)}
              >
                <div className="p-8 flex justify-between items-center gap-6">
                  <h4 className={`font-bold text-lg md:text-xl transition-colors ${activeFaq === i ? 'text-orange-600 dark:text-orange-400' : 'text-slate-900 dark:text-slate-100 group-hover:text-[#c74a09] dark:group-hover:text-orange-300'}`}>
                    {faq.q}
                  </h4>
                  <div className={`w-10 h-10 shrink-0 rounded-full flex items-center justify-center transition-transform duration-500 ${activeFaq === i ? 'bg-gradient-to-r from-orange-600 to-[#c74a09] text-white rotate-180 shadow-md shadow-orange-500/30' : 'bg-slate-200/50 dark:bg-slate-800 text-slate-500 group-hover:bg-slate-200 dark:group-hover:bg-slate-700'}`}>
                    <i className="bi bi-chevron-down text-lg font-bold"></i>
                  </div>
                </div>
                <div className={`px-8 overflow-hidden transition-all duration-500 ease-in-out ${activeFaq === i ? 'max-h-60 pb-8 opacity-100' : 'max-h-0 opacity-0'}`}>
                  <p className="text-lg text-slate-600 dark:text-slate-400 leading-relaxed border-t border-slate-200 dark:border-slate-700 pt-6">
                    {faq.a}
                  </p>
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Live support */}
        <div className="relative overflow-hidden bg-gradient-to-br from-orange-500 to-[#c74a09] p-12 md:p-16 rounded-[3rem] text-center shadow-2xl shadow-orange-500/30 group opacity-0 animate-fade-in-up delay-200 hover:-translate-y-2 transition-transform duration-500">
          <div className="absolute top-0 right-0 w-64 h-64 bg-white/20 rounded-full blur-3xl transform translate-x-1/3 -translate-y-1/3 pointer-events-none group-hover:bg-white/30 transition-colors duration-500"></div>
          <div className="absolute bottom-0 left-0 w-64 h-64 bg-black/10 rounded-full blur-3xl transform -translate-x-1/3 translate-y-1/3 pointer-events-none"></div>
          
          <div className="w-20 h-20 bg-white/20 rounded-[2rem] flex items-center justify-center mx-auto mb-8 backdrop-blur-md shadow-inner animate-float">
            <i className="bi bi-headset text-4xl text-white"></i>
          </div>
          
          <h3 className="text-4xl font-extrabold text-white mb-6 relative z-10 drop-shadow-sm">Still need help?</h3>
          <p className="text-xl text-orange-100 mb-10 max-w-2xl mx-auto relative z-10 leading-relaxed">
            Our 24/7 client happiness team is always standing by to assist with any questions or order issues.
          </p>
          <a href="/contact-us" className="inline-flex items-center gap-3 bg-white text-[#c74a09] hover:bg-orange-50 hover:scale-105 font-extrabold text-lg py-4 px-10 rounded-2xl transition-all duration-300 shadow-[0_0_30px_rgba(255,255,255,0.3)] relative z-10">
            Contact Support Team
            <i className="bi bi-arrow-right"></i>
          </a>
        </div>
      </div>
    </div>
  );
}

export default HelpCenter;
