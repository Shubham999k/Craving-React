import React from 'react';

function SiteMap() {
  const mapLinks = [
    { title: 'Core Pages', links: [{ n: 'Home', u: '/' }, { n: 'Login', u: '/login' }, { n: 'Register', u: '/register' }, { n: 'Contact Us', u: '/contact-us' }] },
    { title: 'Ordering', links: [{ n: 'Catalog & Menu', u: '/order' }, { n: 'About Cravings', u: '/about' }] },
    { title: 'Portals & Dashboards', links: [{ n: 'User Portal', u: '/user/dashboard' }, { n: 'Restaurant Onboarding', u: '/restaurant' }, { n: 'Restaurant Portal', u: '/restaurants-dashboard' }, { n: 'Rider Onboarding', u: '/rider' }, { n: 'Rider Portal', u: '/riders-dashboard' }] },
    { title: 'Support & Legal', links: [{ n: 'Help & FAQs', u: '/help-center' }, { n: 'Submit Feedback', u: '/feedback' }, { n: 'Privacy Policy', u: '/privacy-policy' }, { n: 'Terms of Service', u: '/terms-services' }] }
  ];

  return (
    <div className="min-h-screen bg-slate-50 dark:bg-slate-950 text-slate-800 dark:text-slate-100 py-16 px-4 transition-colors duration-300">
      <div className="mx-auto max-w-4xl">
        <h1 className="text-4xl font-black text-slate-900 dark:text-white mb-3 text-center">
          Site <span className="text-[#c74a09]">Map</span>
        </h1>
        <p className="text-sm text-slate-550 dark:text-slate-400 text-center mb-12">
          A structured index of all pages and directories within the Cravings food delivery ecosystem.
        </p>

        <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-8">
          {mapLinks.map((section, idx) => (
            <div key={idx} className="bg-white dark:bg-slate-900 p-6 rounded-xl border border-slate-150 dark:border-slate-800 shadow-sm">
              <h4 className="font-extrabold text-[#c74a09] text-sm mb-4 uppercase tracking-wider">{section.title}</h4>
              <ul className="space-y-2.5">
                {section.links.map((link, lIdx) => (
                  <li key={lIdx}>
                    <a href={link.u} className="text-xs text-slate-600 dark:text-slate-450 hover:text-orange-600 dark:hover:text-orange-400 font-bold transition">
                      {link.n}
                    </a>
                  </li>
                ))}
              </ul>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}

export default SiteMap;
