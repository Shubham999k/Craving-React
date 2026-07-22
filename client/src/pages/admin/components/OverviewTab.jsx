import React from 'react';

function OverviewTab() {
  const stats = [
    { title: 'Total Revenue', value: '$24,500', icon: 'bi-currency-dollar', color: 'text-green-500', bg: 'bg-green-500/10' },
    { title: 'Active Users', value: '1,234', icon: 'bi-people', color: 'text-blue-500', bg: 'bg-blue-500/10' },
    { title: 'Total Orders', value: '856', icon: 'bi-bag-check', color: 'text-orange-500', bg: 'bg-orange-500/10' },
    { title: 'Restaurants', value: '42', icon: 'bi-shop', color: 'text-purple-500', bg: 'bg-purple-500/10' },
  ];

  return (
    <div className="space-y-6">
      {/* Welcome Banner */}
      <div className="bg-gradient-to-r from-slate-900 to-slate-800 rounded-3xl p-8 relative overflow-hidden shadow-2xl">
        <div className="absolute top-0 right-0 w-64 h-64 bg-orange-500/20 rounded-full blur-3xl -translate-y-1/2 translate-x-1/3"></div>
        <div className="relative z-10 flex flex-col md:flex-row md:items-center justify-between gap-6">
          <div>
            <h3 className="text-3xl font-black text-white mb-2 tracking-tight">System Status: <span className="text-green-400">Optimal</span></h3>
            <p className="text-slate-400 font-medium">Here's what's happening across the Cravings platform today.</p>
          </div>
          <button className="bg-[#c74a09] text-white px-6 py-3 rounded-xl font-bold shadow-lg shadow-orange-500/30 hover:bg-[#b34006] transition-colors whitespace-nowrap">
            <i className="bi bi-cloud-arrow-down mr-2"></i> Generate Report
          </button>
        </div>
      </div>

      {/* Stats Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
        {stats.map((stat, idx) => (
          <div key={idx} className="bg-white/70 dark:bg-slate-900/70 backdrop-blur-xl border border-white/50 dark:border-slate-800/50 p-6 rounded-3xl shadow-[0_8px_30px_rgb(0,0,0,0.04)] dark:shadow-[0_8px_30px_rgb(0,0,0,0.2)] hover:shadow-xl transition-shadow group">
            <div className="flex items-center justify-between mb-4">
              <div className={`w-12 h-12 rounded-2xl flex items-center justify-center ${stat.bg} ${stat.color} transition-transform group-hover:scale-110 duration-300`}>
                <i className={`bi ${stat.icon} text-2xl`}></i>
              </div>
              <span className="text-xs font-bold text-green-500 bg-green-500/10 px-2 py-1 rounded-lg">+12.5%</span>
            </div>
            <div>
              <h4 className="text-3xl font-black text-slate-900 dark:text-white tracking-tight">{stat.value}</h4>
              <p className="text-sm font-semibold text-slate-500 dark:text-slate-400">{stat.title}</p>
            </div>
          </div>
        ))}
      </div>

      {/* Recent Activity / Chart Placeholder */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        <div className="lg:col-span-2 bg-white/70 dark:bg-slate-900/70 backdrop-blur-xl border border-white/50 dark:border-slate-800/50 p-8 rounded-3xl shadow-[0_8px_30px_rgb(0,0,0,0.04)] min-h-[400px] flex flex-col justify-center items-center relative overflow-hidden group">
            <div className="absolute inset-0 bg-gradient-to-tr from-orange-500/5 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500"></div>
            <i className="bi bi-graph-up text-6xl text-slate-300 dark:text-slate-700 mb-4"></i>
            <h4 className="text-xl font-bold text-slate-400 dark:text-slate-500">Revenue Chart Data Here</h4>
        </div>

        <div className="bg-white/70 dark:bg-slate-900/70 backdrop-blur-xl border border-white/50 dark:border-slate-800/50 p-6 rounded-3xl shadow-[0_8px_30px_rgb(0,0,0,0.04)]">
            <h4 className="text-lg font-black text-slate-900 dark:text-white mb-6 flex items-center gap-2">
                <i className="bi bi-activity text-orange-500"></i> Recent Activity
            </h4>
            <div className="space-y-6">
                {[
                    { title: "New Restaurant Joined", desc: "Spicy Grill requested partnership", time: "2 min ago", icon: "bi-shop", color: "text-orange-500", bg: "bg-orange-500/10" },
                    { title: "Large Order Placed", desc: "$145 order at Pizza Hut", time: "15 min ago", icon: "bi-bag-check", color: "text-green-500", bg: "bg-green-500/10" },
                    { title: "User Reported Issue", desc: "Delivery delayed for Order #459", time: "1 hr ago", icon: "bi-exclamation-triangle", color: "text-red-500", bg: "bg-red-500/10" },
                    { title: "New Rider Registered", desc: "John Doe joined the fleet", time: "2 hrs ago", icon: "bi-bicycle", color: "text-blue-500", bg: "bg-blue-500/10" }
                ].map((item, idx) => (
                    <div key={idx} className="flex gap-4">
                        <div className={`w-10 h-10 rounded-full flex items-center justify-center shrink-0 ${item.bg} ${item.color}`}>
                            <i className={`bi ${item.icon}`}></i>
                        </div>
                        <div>
                            <h5 className="text-sm font-bold text-slate-900 dark:text-white">{item.title}</h5>
                            <p className="text-xs text-slate-500">{item.desc}</p>
                            <p className="text-[10px] font-bold text-slate-400 mt-1">{item.time}</p>
                        </div>
                    </div>
                ))}
            </div>
        </div>
      </div>
    </div>
  );
}

export default OverviewTab;
