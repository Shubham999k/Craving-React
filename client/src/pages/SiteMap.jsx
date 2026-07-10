import { Link } from 'react-router-dom';

function SiteMap() {
  const mapLinks = [
    { title: 'Core Pages', icon: 'bi-house-door', links: [{ n: 'Home', u: '/' }, { n: 'Login', u: '/login' }, { n: 'Register', u: '/register' }, { n: 'Contact Us', u: '/contact-us' }] },
    { title: 'Ordering', icon: 'bi-bag', links: [{ n: 'Catalog & Menu', u: '/order' }, { n: 'About Cravings', u: '/about' }] },
    { title: 'Portals & Dashboards', icon: 'bi-laptop', links: [{ n: 'User Portal', u: '/user/dashboard' }, { n: 'Restaurant Onboarding', u: '/restaurant' }, { n: 'Restaurant Portal', u: '/restaurants-dashboard' }, { n: 'Rider Onboarding', u: '/rider' }, { n: 'Rider Portal', u: '/riders-dashboard' }] },
    { title: 'Support & Legal', icon: 'bi-info-circle', links: [{ n: 'Help & FAQs', u: '/help-center' }, { n: 'Submit Feedback', u: '/feedback' }, { n: 'Privacy Policy', u: '/privacy-policy' }, { n: 'Terms of Service', u: '/terms-services' }] }
  ];

  return (
    <div className="min-h-screen bg-slate-50 dark:bg-slate-950 text-slate-800 dark:text-slate-100 py-20 px-4 transition-colors duration-300 relative overflow-hidden">
      {/* Background Decor */}
      <div className="absolute top-0 right-0 w-[40rem] h-[40rem] bg-orange-500/10 rounded-full blur-3xl opacity-50 pointer-events-none transform translate-x-1/3 -translate-y-1/3"></div>
      <div className="absolute bottom-0 left-0 w-[30rem] h-[30rem] bg-orange-500/10 rounded-full blur-3xl opacity-50 pointer-events-none transform -translate-x-1/3 translate-y-1/3"></div>

      <div className="mx-auto max-w-6xl relative z-10">
        <div className="text-center mb-16">
          <h1 className="text-5xl lg:text-6xl font-black text-slate-900 dark:text-white mb-6 tracking-tight">
            Site <span className="text-transparent bg-clip-text bg-gradient-to-r from-[#c74a09] to-orange-400">Map</span>
          </h1>
          <p className="text-lg lg:text-xl text-slate-600 dark:text-slate-350 max-w-2xl mx-auto leading-relaxed">
            A structured index of all pages and directories within the Cravings food delivery ecosystem.
          </p>
        </div>

        <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-8">
          {mapLinks.map((section, idx) => (
            <div key={idx} className="bg-white/80 dark:bg-slate-900/80 backdrop-blur-xl p-8 rounded-3xl border border-slate-200/50 dark:border-slate-800/50 shadow-xl shadow-slate-200/20 dark:shadow-none hover:-translate-y-2 hover:shadow-orange-500/10 transition-all duration-300 group">
              <div className="w-12 h-12 bg-orange-100 dark:bg-orange-500/20 rounded-2xl flex items-center justify-center mb-6 group-hover:scale-110 transition-transform duration-300 text-[#c74a09] dark:text-orange-400">
                <i className={`bi ${section.icon} text-xl`}></i>
              </div>
              
              <h4 className="font-extrabold text-slate-900 dark:text-white text-lg mb-6 tracking-wide">{section.title}</h4>
              
              <ul className="space-y-4">
                {section.links.map((link, lIdx) => (
                  <li key={lIdx}>
                    <Link 
                      to={link.u} 
                      className="flex items-center gap-2 text-sm text-slate-600 dark:text-slate-400 hover:text-[#c74a09] dark:hover:text-orange-400 font-semibold transition-all duration-300 hover:translate-x-2 group/link"
                    >
                      <i className="bi bi-chevron-right text-xs opacity-0 -ml-4 group-hover/link:opacity-100 group-hover/link:ml-0 transition-all duration-300"></i>
                      {link.n}
                    </Link>
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
