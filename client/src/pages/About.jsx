

function About() {
  return (
    <div className="min-h-screen bg-slate-50 dark:bg-slate-950 text-slate-800 dark:text-slate-100 py-16 px-4 transition-colors duration-300">
      <div className="mx-auto max-w-4xl">
        <h1 className="text-4xl lg:text-5xl font-black text-slate-900 dark:text-white mb-6 text-center">
          About <span className="text-[#c74a09]">Cravings</span>
        </h1>
        <p className="text-lg text-slate-600 dark:text-slate-350 text-center max-w-2xl mx-auto mb-12">
          We connect food lovers with their favorite local kitchens, delivered fast and fresh straight to their doors.
        </p>

        <div className="grid md:grid-cols-2 gap-8 mb-12">
          <div className="bg-white dark:bg-slate-900 p-6 rounded-xl border border-slate-150 dark:border-slate-800 shadow-sm">
            <h3 className="text-xl font-bold text-[#c74a09] mb-3">Our Mission</h3>
            <p className="text-sm leading-relaxed text-slate-600 dark:text-slate-400">
              To empower local restaurants by extending their reach, providing riders with stable opportunities, and delivering joy in every bite to our customers.
            </p>
          </div>

          <div className="bg-white dark:bg-slate-900 p-6 rounded-xl border border-slate-150 dark:border-slate-800 shadow-sm">
            <h3 className="text-xl font-bold text-[#c74a09] mb-3">Our Values</h3>
            <p className="text-sm leading-relaxed text-slate-600 dark:text-slate-400">
              Quality, efficiency, and fairness are at the core of everything we do. We believe that good food should be accessible to anyone, anywhere.
            </p>
          </div>
        </div>

        <div className="bg-orange-500/5 border border-orange-500/20 p-8 rounded-2xl text-center">
          <h2 className="text-2xl font-extrabold mb-4">Want to partner with us?</h2>
          <p className="text-sm text-slate-600 dark:text-slate-400 mb-6">
            Whether you own a restaurant or are looking to earn on your own schedule as a rider, join our growing ecosystem.
          </p>
          <div className="flex flex-wrap justify-center gap-4">
            <a href="/restaurant" className="bg-[#c74a09] hover:bg-orange-700 text-white font-bold py-2.5 px-6 rounded-lg transition text-sm">
              Partner Restaurant
            </a>
            <a href="/rider" className="bg-slate-900 dark:bg-slate-800 hover:bg-slate-800 dark:hover:bg-slate-700 text-white font-bold py-2.5 px-6 rounded-lg transition text-sm">
              Become a Rider
            </a>
          </div>
        </div>
      </div>
    </div>
  );
}

export default About;
