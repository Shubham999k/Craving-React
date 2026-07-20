import { Link } from 'react-router-dom';

function About() {
  return (
    <div className="min-h-screen bg-slate-50/50 dark:bg-slate-950/50 text-slate-800 dark:text-slate-100 py-24 px-4 transition-colors duration-300 relative overflow-hidden">
      {/* Dynamic Animated Background */}
      <div className="fixed inset-0 pointer-events-none z-0 overflow-hidden">
        <div className="absolute top-[0%] left-[-10%] w-[40rem] h-[40rem] bg-gradient-to-br from-orange-500/20 to-red-500/10 rounded-full blur-3xl animate-float-slow mix-blend-multiply dark:mix-blend-screen opacity-70"></div>
        <div className="absolute bottom-[-10%] right-[-10%] w-[50rem] h-[50rem] bg-gradient-to-tr from-amber-500/20 to-orange-600/10 rounded-full blur-3xl animate-float mix-blend-multiply dark:mix-blend-screen opacity-60 delay-300"></div>
        <div className="absolute top-[50%] left-[50%] w-[40rem] h-[40rem] bg-orange-400/10 rounded-full blur-3xl animate-pulse-glow opacity-50 transform -translate-x-1/2 -translate-y-1/2"></div>
      </div>

      <div className="mx-auto max-w-5xl relative z-10 opacity-0 animate-fade-in-up">
        {/* Header Section */}
        <div className="text-center mb-20 relative">
          <div className="absolute top-1/2 left-1/2 w-40 h-40 bg-orange-400/20 rounded-full blur-3xl transform -translate-x-1/2 -translate-y-1/2 -z-10 animate-pulse-glow"></div>
          <h1 className="text-5xl lg:text-7xl font-black text-slate-900 dark:text-white mb-6 tracking-tight drop-shadow-sm">
            About <span className="text-transparent bg-clip-text bg-gradient-to-r from-orange-600 to-amber-500 animate-gradient-x">Cravings</span>
          </h1>
          <p className="text-xl text-slate-600 dark:text-slate-350 max-w-3xl mx-auto leading-relaxed">
            Delivering happiness one meal at a time. We're on a mission to connect hungry diners with the best local and national restaurants.
          </p>
        </div>

        {/* Vision & Mission */}
        <div className="grid md:grid-cols-2 gap-8 mb-20">
          <div className="bg-white/60 dark:bg-slate-900/60 backdrop-blur-2xl p-10 md:p-12 rounded-[2.5rem] border border-white/50 dark:border-slate-700/50 shadow-[0_8px_30px_rgb(0,0,0,0.04)] dark:shadow-[0_8px_30px_rgb(0,0,0,0.2)] hover:shadow-2xl hover:shadow-orange-500/20 dark:hover:shadow-orange-500/10 hover:-translate-y-2 transition-all duration-500 group relative overflow-hidden">
            <div className="absolute inset-0 bg-gradient-to-br from-orange-500/5 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500 pointer-events-none"></div>
            <div className="w-16 h-16 rounded-2xl bg-orange-100 dark:bg-orange-500/20 flex items-center justify-center mb-6 group-hover:scale-110 group-hover:rotate-6 transition-transform duration-500 shadow-inner">
              <i className="bi bi-eye text-3xl text-[#c74a09] dark:text-orange-400"></i>
            </div>
            <h3 className="text-3xl font-black text-slate-900 dark:text-white mb-4 relative z-10">Our Vision</h3>
            <p className="text-lg text-slate-600 dark:text-slate-350 leading-relaxed relative z-10">
              To be the most reliable and loved food delivery platform in the world, making great food accessible to everyone, everywhere, at any time.
            </p>
          </div>

          <div className="bg-white/60 dark:bg-slate-900/60 backdrop-blur-2xl p-10 md:p-12 rounded-[2.5rem] border border-white/50 dark:border-slate-700/50 shadow-[0_8px_30px_rgb(0,0,0,0.04)] dark:shadow-[0_8px_30px_rgb(0,0,0,0.2)] hover:shadow-2xl hover:shadow-orange-500/20 dark:hover:shadow-orange-500/10 hover:-translate-y-2 transition-all duration-500 group relative overflow-hidden">
            <div className="absolute inset-0 bg-gradient-to-br from-orange-500/5 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500 pointer-events-none"></div>
            <div className="w-16 h-16 rounded-2xl bg-orange-100 dark:bg-orange-500/20 flex items-center justify-center mb-6 group-hover:scale-110 group-hover:-rotate-6 transition-transform duration-500 shadow-inner">
              <i className="bi bi-rocket-takeoff text-3xl text-[#c74a09] dark:text-orange-400"></i>
            </div>
            <h3 className="text-3xl font-black text-slate-900 dark:text-white mb-4 relative z-10">Our Mission</h3>
            <p className="text-lg text-slate-600 dark:text-slate-350 leading-relaxed relative z-10">
              Empowering local businesses while providing a seamless, fast, and enjoyable experience for customers looking to satisfy their cravings.
            </p>
          </div>
        </div>

        {/* Stats Section */}
        <div className="bg-gradient-to-r from-orange-600 to-[#c74a09] rounded-[3rem] p-12 md:p-16 text-white mb-20 shadow-2xl shadow-orange-500/30 relative overflow-hidden group">
          <div className="absolute top-0 right-0 w-64 h-64 bg-white/20 rounded-full blur-3xl transform translate-x-1/2 -translate-y-1/2 pointer-events-none transition-transform duration-700 group-hover:scale-150"></div>
          <div className="absolute bottom-0 left-0 w-64 h-64 bg-black/10 rounded-full blur-3xl transform -translate-x-1/2 translate-y-1/2 pointer-events-none"></div>
          
          <div className="grid grid-cols-2 md:grid-cols-4 gap-8 relative z-10 text-center">
            <div className="p-4 transform hover:-translate-y-2 transition-transform duration-300">
              <div className="text-5xl md:text-6xl font-black mb-2 drop-shadow-md">50k+</div>
              <div className="text-orange-100 font-bold uppercase tracking-wider text-sm">Restaurant Partners</div>
            </div>
            <div className="p-4 transform hover:-translate-y-2 transition-transform duration-300">
              <div className="text-5xl md:text-6xl font-black mb-2 drop-shadow-md">2M+</div>
              <div className="text-orange-100 font-bold uppercase tracking-wider text-sm">Happy Customers</div>
            </div>
            <div className="p-4 transform hover:-translate-y-2 transition-transform duration-300">
              <div className="text-5xl md:text-6xl font-black mb-2 drop-shadow-md">100+</div>
              <div className="text-orange-100 font-bold uppercase tracking-wider text-sm">Cities Served</div>
            </div>
            <div className="p-4 transform hover:-translate-y-2 transition-transform duration-300">
              <div className="text-5xl md:text-6xl font-black mb-2 drop-shadow-md">10M+</div>
              <div className="text-orange-100 font-bold uppercase tracking-wider text-sm">Orders Delivered</div>
            </div>
          </div>
        </div>

        {/* Call to action */}
        <div className="text-center bg-white/60 dark:bg-slate-900/60 backdrop-blur-2xl p-12 md:p-16 rounded-[3rem] border border-white/50 dark:border-slate-700/50 shadow-[0_8px_30px_rgb(0,0,0,0.04)] dark:shadow-[0_8px_30px_rgb(0,0,0,0.2)]">
          <h2 className="text-4xl font-black text-slate-900 dark:text-white mb-6">Ready to join our community?</h2>
          <p className="text-xl text-slate-600 dark:text-slate-400 mb-10 max-w-2xl mx-auto leading-relaxed">
            Whether you're looking to partner your restaurant or start earning as a rider, we'd love to have you on board.
          </p>
          <div className="flex flex-col sm:flex-row justify-center gap-6">
            <Link to="/partner" className="bg-gradient-to-r from-orange-600 to-[#c74a09] text-white px-8 py-4 rounded-2xl font-extrabold text-lg shadow-lg hover:shadow-orange-500/30 hover:scale-105 active:scale-95 transition-all flex items-center justify-center gap-3">
              <i className="bi bi-shop"></i> Partner with us
            </Link>
            <Link to="/rider" className="bg-white dark:bg-slate-800 text-slate-900 dark:text-white border-2 border-slate-200 dark:border-slate-700 px-8 py-4 rounded-2xl font-extrabold text-lg shadow-sm hover:border-orange-500 dark:hover:border-orange-500 hover:text-orange-600 dark:hover:text-orange-400 hover:scale-105 active:scale-95 transition-all flex items-center justify-center gap-3">
              <i className="bi bi-bicycle"></i> Become a Rider
            </Link>
          </div>
        </div>
      </div>
    </div>
  );
}

export default About;
