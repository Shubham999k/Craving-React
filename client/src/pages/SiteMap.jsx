import { Link } from 'react-router-dom';

function SiteMap() {
  const sections = [
    {
      title: 'Main Navigation',
      icon: 'bi-compass',
      links: [
        { name: 'Home', path: '/' },
        { name: 'Menu', path: '/menu' },
        { name: 'Offers', path: '/offers' },
        { name: 'Cart', path: '/cart' },
      ]
    },
    {
      title: 'Partner with Us',
      icon: 'bi-briefcase',
      links: [
        { name: 'Restaurant Onboarding', path: '/partner' },
        { name: 'Become a Rider', path: '/rider' },
      ]
    },
    {
      title: 'Support & Help',
      icon: 'bi-headset',
      links: [
        { name: 'Help Center', path: '/help' },
        { name: 'Contact Us', path: '/contact-us' },
        { name: 'Feedback', path: '/feedback' },
      ]
    },
    {
      title: 'Legal',
      icon: 'bi-shield-check',
      links: [
        { name: 'Privacy Policy', path: '/privacy' },
        { name: 'Terms of Service', path: '/terms' },
      ]
    },
    {
      title: 'Company',
      icon: 'bi-building',
      links: [
        { name: 'About Us', path: '/about' },
        { name: 'Careers', path: '/careers' },
        { name: 'Blog', path: '/blog' },
      ]
    }
  ];

  return (
    <div className="min-h-screen bg-slate-50/50 dark:bg-slate-950/50 text-slate-800 dark:text-slate-100 py-24 px-4 transition-colors duration-300 relative overflow-hidden">
      {/* Dynamic Animated Background */}
      <div className="fixed inset-0 pointer-events-none z-0 overflow-hidden">
        <div className="absolute top-[0%] left-[0%] w-[40rem] h-[40rem] bg-gradient-to-br from-orange-500/20 to-red-500/10 rounded-full blur-3xl animate-float-slow mix-blend-multiply dark:mix-blend-screen opacity-70"></div>
        <div className="absolute bottom-[-10%] right-[-10%] w-[50rem] h-[50rem] bg-gradient-to-tr from-amber-500/20 to-orange-600/10 rounded-full blur-3xl animate-float mix-blend-multiply dark:mix-blend-screen opacity-60 delay-300"></div>
        <div className="absolute top-[40%] left-[30%] w-[30rem] h-[30rem] bg-orange-400/10 rounded-full blur-3xl animate-pulse-glow opacity-50"></div>
      </div>

      <div className="mx-auto max-w-5xl relative z-10 opacity-0 animate-fade-in-up">
        <div className="text-center mb-20 relative">
          <div className="absolute top-1/2 left-1/2 w-40 h-40 bg-orange-400/20 rounded-full blur-3xl transform -translate-x-1/2 -translate-y-1/2 -z-10 animate-pulse-glow"></div>
          <h1 className="text-5xl lg:text-7xl font-black text-slate-900 dark:text-white mb-6 tracking-tight drop-shadow-sm">
            Site <span className="text-transparent bg-clip-text bg-gradient-to-r from-orange-600 to-amber-500 animate-gradient-x">Map</span>
          </h1>
          <p className="text-lg lg:text-xl text-slate-600 dark:text-slate-350 max-w-2xl mx-auto leading-relaxed">
            Navigate through all sections of our platform easily. Everything you need is just a click away.
          </p>
        </div>

        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
          {sections.map((section, idx) => (
            <div 
              key={idx} 
              className="bg-white/60 dark:bg-slate-900/60 backdrop-blur-2xl p-8 rounded-[2.5rem] border border-white/50 dark:border-slate-700/50 shadow-[0_8px_30px_rgb(0,0,0,0.04)] dark:shadow-[0_8px_30px_rgb(0,0,0,0.2)] hover:shadow-2xl hover:shadow-orange-500/20 dark:hover:shadow-orange-500/10 hover:-translate-y-2 transition-all duration-500 group relative overflow-hidden flex flex-col h-full"
              style={{ animationDelay: `${idx * 100}ms` }}
            >
              <div className="absolute inset-0 bg-gradient-to-br from-orange-500/5 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500 pointer-events-none"></div>
              
              <div className="flex items-center gap-4 mb-8">
                <div className="w-14 h-14 rounded-2xl bg-orange-100 dark:bg-orange-500/20 flex items-center justify-center group-hover:scale-110 group-hover:rotate-6 transition-transform duration-500 shadow-inner shrink-0">
                  <i className={`bi ${section.icon} text-2xl text-[#c74a09] dark:text-orange-400`}></i>
                </div>
                <h3 className="text-2xl font-black text-slate-900 dark:text-white group-hover:text-orange-600 dark:group-hover:text-orange-400 transition-colors duration-300">
                  {section.title}
                </h3>
              </div>
              
              <ul className="space-y-4 flex-grow relative z-10">
                {section.links.map((link, lIdx) => (
                  <li key={lIdx} className="transform transition-transform duration-300 hover:translate-x-2">
                    <Link 
                      to={link.path} 
                      className="text-lg text-slate-600 dark:text-slate-400 hover:text-orange-600 dark:hover:text-orange-400 font-semibold flex items-center gap-3 transition-colors duration-300"
                    >
                      <span className="w-1.5 h-1.5 rounded-full bg-orange-500/50 group-hover:bg-orange-500 transition-colors duration-300"></span>
                      {link.name}
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
