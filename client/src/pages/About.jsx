import { Link } from 'react-router-dom';

function About() {
  return (
    <div className="min-h-screen bg-slate-50 dark:bg-slate-950 text-slate-800 dark:text-slate-100 py-20 px-4 transition-colors duration-300 relative overflow-hidden">
      {/* Background Decor */}
      <div className="absolute top-0 left-0 w-full h-96 bg-gradient-to-b from-orange-500/10 to-transparent pointer-events-none"></div>
      <div className="absolute -top-24 -right-24 w-96 h-96 bg-orange-500/20 rounded-full blur-3xl opacity-50 pointer-events-none"></div>
      
      <div className="mx-auto max-w-5xl relative z-10">
        <div className="text-center mb-16">
          <h1 className="text-5xl lg:text-6xl font-black text-slate-900 dark:text-white mb-6 tracking-tight">
            About <span className="text-transparent bg-clip-text bg-gradient-to-r from-[#c74a09] to-orange-400">Cravings</span>
          </h1>
          <p className="text-lg lg:text-xl text-slate-600 dark:text-slate-350 max-w-2xl mx-auto leading-relaxed">
            We connect food lovers with their favorite local kitchens, delivered fast and fresh straight to their doors.
          </p>
        </div>

        <div className="grid md:grid-cols-2 gap-8 mb-20">
          <div className="bg-white/80 dark:bg-slate-900/80 backdrop-blur-xl p-8 rounded-3xl border border-slate-200/50 dark:border-slate-800/50 shadow-xl shadow-slate-200/20 dark:shadow-none hover:-translate-y-2 hover:shadow-orange-500/10 transition-all duration-300 group">
            <div className="w-14 h-14 bg-orange-100 dark:bg-orange-500/20 rounded-2xl flex items-center justify-center mb-6 group-hover:scale-110 transition-transform duration-300">
              <i className="bi bi-bullseye text-2xl text-[#c74a09] dark:text-orange-400"></i>
            </div>
            <h3 className="text-2xl font-bold text-slate-900 dark:text-white mb-4">Our Mission</h3>
            <p className="text-base leading-relaxed text-slate-600 dark:text-slate-400">
              To empower local restaurants by extending their reach, providing riders with stable opportunities, and delivering joy in every bite to our customers.
            </p>
          </div>

          <div className="bg-white/80 dark:bg-slate-900/80 backdrop-blur-xl p-8 rounded-3xl border border-slate-200/50 dark:border-slate-800/50 shadow-xl shadow-slate-200/20 dark:shadow-none hover:-translate-y-2 hover:shadow-orange-500/10 transition-all duration-300 group">
            <div className="w-14 h-14 bg-orange-100 dark:bg-orange-500/20 rounded-2xl flex items-center justify-center mb-6 group-hover:scale-110 transition-transform duration-300">
              <i className="bi bi-heart text-2xl text-[#c74a09] dark:text-orange-400"></i>
            </div>
            <h3 className="text-2xl font-bold text-slate-900 dark:text-white mb-4">Our Values</h3>
            <p className="text-base leading-relaxed text-slate-600 dark:text-slate-400">
              Quality, efficiency, and fairness are at the core of everything we do. We believe that good food should be accessible to anyone, anywhere.
            </p>
          </div>
        </div>

        <div className="relative overflow-hidden bg-gradient-to-br from-orange-500 to-[#c74a09] p-10 md:p-14 rounded-[2.5rem] text-center shadow-2xl shadow-orange-500/30">
          <div className="absolute top-0 right-0 w-64 h-64 bg-white/10 rounded-full blur-3xl transform translate-x-1/2 -translate-y-1/2 pointer-events-none"></div>
          <div className="absolute bottom-0 left-0 w-64 h-64 bg-black/10 rounded-full blur-3xl transform -translate-x-1/2 translate-y-1/2 pointer-events-none"></div>
          
          <h2 className="text-3xl md:text-4xl font-extrabold text-white mb-6 relative z-10">Want to partner with us?</h2>
          <p className="text-lg text-orange-100 mb-10 max-w-xl mx-auto relative z-10">
            Whether you own a restaurant or are looking to earn on your own schedule as a rider, join our growing ecosystem.
          </p>
          <div className="flex flex-wrap justify-center gap-5 relative z-10">
            <Link to="/restaurant" className="bg-white text-[#c74a09] hover:bg-orange-50 hover:scale-105 font-bold py-3.5 px-8 rounded-xl transition-all duration-300 shadow-lg">
              Partner Restaurant
            </Link>
            <Link to="/rider" className="bg-slate-900 text-white hover:bg-slate-800 hover:scale-105 font-bold py-3.5 px-8 rounded-xl transition-all duration-300 shadow-lg border border-slate-700/50">
              Become a Rider
            </Link>
          </div>
        </div>
      </div>
    </div>
  );
}

export default About;
