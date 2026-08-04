import React from 'react';

export default function EarningsTab() {
  const weeklyEarnings = [
    { day: 'Mon', amount: 350, height: 'h-24' },
    { day: 'Tue', amount: 420, height: 'h-32' },
    { day: 'Wed', amount: 210, height: 'h-16' },
    { day: 'Thu', amount: 580, height: 'h-40' },
    { day: 'Fri', amount: 890, height: 'h-64' },
    { day: 'Sat', amount: 1250, height: 'h-[320px]' },
    { day: 'Sun', amount: 980, height: 'h-[240px]' },
  ];

  return (
    <div className="space-y-6">
      
      {/* Top Metrics Cards */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        <div className="bg-white dark:bg-slate-900 p-6 rounded-2xl border border-slate-200 dark:border-slate-800 shadow-sm relative overflow-hidden group hover:border-orange-500/50 transition-colors">
          <div className="absolute -right-6 -top-6 text-6xl text-slate-100 dark:text-slate-800/50 group-hover:scale-110 transition-transform"><i className="bi bi-wallet2"></i></div>
          <p className="text-sm font-bold text-slate-500 dark:text-slate-400 relative z-10">This Week's Balance</p>
          <h2 className="text-4xl font-black text-slate-800 dark:text-white mt-2 relative z-10">₹4,680</h2>
          <div className="mt-4 flex items-center gap-2 text-xs font-bold text-green-600 dark:text-green-500 relative z-10">
            <i className="bi bi-arrow-up-circle-fill"></i> +12.5% from last week
          </div>
        </div>
        
        <div className="bg-white dark:bg-slate-900 p-6 rounded-2xl border border-slate-200 dark:border-slate-800 shadow-sm relative overflow-hidden group hover:border-orange-500/50 transition-colors">
          <div className="absolute -right-6 -top-6 text-6xl text-slate-100 dark:text-slate-800/50 group-hover:scale-110 transition-transform"><i className="bi bi-bicycle"></i></div>
          <p className="text-sm font-bold text-slate-500 dark:text-slate-400 relative z-10">Trips Completed</p>
          <h2 className="text-4xl font-black text-slate-800 dark:text-white mt-2 relative z-10">42</h2>
          <div className="mt-4 flex items-center gap-2 text-xs font-bold text-slate-500 dark:text-slate-400 relative z-10">
            <i className="bi bi-clock-fill"></i> 38 hrs online time
          </div>
        </div>

        <div className="bg-white dark:bg-slate-900 p-6 rounded-2xl border border-slate-200 dark:border-slate-800 shadow-sm relative overflow-hidden group hover:border-orange-500/50 transition-colors">
          <div className="absolute -right-6 -top-6 text-6xl text-slate-100 dark:text-slate-800/50 group-hover:scale-110 transition-transform"><i className="bi bi-coin"></i></div>
          <p className="text-sm font-bold text-slate-500 dark:text-slate-400 relative z-10">Customer Tips</p>
          <h2 className="text-4xl font-black text-slate-800 dark:text-white mt-2 relative z-10">₹320</h2>
          <div className="mt-4 flex items-center gap-2 text-xs font-bold text-orange-600 dark:text-orange-500 relative z-10">
            <i className="bi bi-star-fill"></i> Great service rewards
          </div>
        </div>
      </div>

      {/* Chart Section */}
      <div className="bg-white dark:bg-slate-900 p-6 sm:p-8 rounded-2xl border border-slate-200 dark:border-slate-800 shadow-sm">
        <div className="flex justify-between items-end mb-8 border-b border-slate-100 dark:border-slate-800 pb-4">
          <div>
            <h3 className="font-black text-slate-800 dark:text-white text-xl">Earnings Overview</h3>
            <p className="text-xs font-medium text-slate-500 dark:text-slate-400 mt-1">July 17 - July 23, 2026</p>
          </div>
          <button className="text-[#c74a09] dark:text-orange-400 text-sm font-bold bg-orange-50 dark:bg-orange-500/10 px-4 py-2 rounded-lg hover:bg-orange-100 dark:hover:bg-orange-500/20 transition cursor-pointer">
            Cash Out <i className="bi bi-arrow-right"></i>
          </button>
        </div>

        {/* Visual Bar Chart (CSS-based) */}
        <div className="h-80 flex items-end justify-between gap-2 sm:gap-6 pt-10">
          {weeklyEarnings.map((day, idx) => (
            <div key={idx} className="flex-1 flex flex-col items-center gap-3 group">
              <span className="text-[10px] sm:text-xs font-bold text-slate-400 opacity-0 group-hover:opacity-100 transition-opacity transform group-hover:-translate-y-2">₹{day.amount}</span>
              <div className={`w-full max-w-[48px] rounded-t-xl bg-gradient-to-t from-orange-600 to-orange-400 opacity-80 group-hover:opacity-100 transition-all duration-300 ${day.height} cursor-pointer group-hover:shadow-[0_0_15px_rgba(249,115,22,0.4)]`}></div>
              <span className="text-xs font-bold text-slate-500 dark:text-slate-400">{day.day}</span>
            </div>
          ))}
        </div>
      </div>

    </div>
  );
}
