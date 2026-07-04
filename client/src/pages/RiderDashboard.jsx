import React from 'react';

function RiderDashboard() {
  const activeDelivery = {
    id: '#CR-D902',
    pickup: 'Under The Mango Tree Restaurant',
    dropoff: 'Building 4B, Sector 62, City Center',
    payout: 75,
    distance: '3.4 km'
  };

  return (
    <div className="min-h-screen bg-slate-50 dark:bg-slate-950 text-slate-800 dark:text-slate-100 py-16 px-4 transition-colors duration-300">
      <div className="mx-auto max-w-5xl">
        <div className="flex flex-col md:flex-row justify-between items-start md:items-center mb-8 gap-4">
          <div>
            <h1 className="text-3xl font-black">Rider Dashboard</h1>
            <p className="text-xs text-slate-500 dark:text-slate-400 mt-1">Track active deliveries, accept trips, and view earnings.</p>
          </div>
          <span className="bg-orange-500/10 text-[#c74a09] dark:text-orange-400 border border-orange-500/30 px-3.5 py-1.5 rounded-full text-xs font-black flex items-center gap-1.5">
            <span className="w-2.5 h-2.5 rounded-full bg-orange-600 animate-ping"></span>
            Online - Searching for Deliveries
          </span>
        </div>

        {/* Stats */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-10">
          <div className="bg-white dark:bg-slate-900 p-6 rounded-xl border border-slate-150 dark:border-slate-800 shadow-sm">
            <span className="text-xs font-bold text-slate-450 dark:text-slate-500 uppercase">Today's Earnings</span>
            <h3 className="text-3xl font-black text-[#c74a09] mt-2">₹480</h3>
            <span className="text-[10px] text-slate-400 dark:text-slate-500 block mt-1">6 completed trips</span>
          </div>
          <div className="bg-white dark:bg-slate-900 p-6 rounded-xl border border-slate-150 dark:border-slate-800 shadow-sm">
            <span className="text-xs font-bold text-slate-450 dark:text-slate-500 uppercase">Satisfaction Rate</span>
            <h3 className="text-3xl font-black text-slate-800 dark:text-white mt-2">4.9 ★</h3>
            <span className="text-[10px] text-green-500 font-bold block mt-1">Top-Tier Rider status</span>
          </div>
          <div className="bg-white dark:bg-slate-900 p-6 rounded-xl border border-slate-150 dark:border-slate-800 shadow-sm">
            <span className="text-xs font-bold text-slate-450 dark:text-slate-500 uppercase">Total Trips</span>
            <h3 className="text-3xl font-black text-slate-800 dark:text-white mt-2">1,208 Trips</h3>
            <span className="text-[10px] text-slate-400 dark:text-slate-500 block mt-1">Riding since Jan 2026</span>
          </div>
        </div>

        {/* Active delivery trip card */}
        <div className="bg-white dark:bg-slate-900 rounded-xl border border-orange-500/25 dark:border-orange-500/15 shadow-md p-6 max-w-2xl">
          <div className="flex justify-between items-center mb-6 pb-4 border-b border-slate-100 dark:border-slate-800">
            <h4 className="font-extrabold text-[#c74a09] text-sm uppercase tracking-wider">Active Trip Assignment</h4>
            <span className="text-xs font-black bg-orange-500/10 text-[#c74a09] px-2 py-0.5 rounded">₹{activeDelivery.payout} Payout</span>
          </div>
          <div className="space-y-4 text-xs font-medium">
            <div className="flex gap-3">
              <span className="text-sm">🏬</span>
              <div>
                <p className="text-[10px] text-slate-400 dark:text-slate-500 font-bold uppercase">Pickup Restaurant</p>
                <p className="font-extrabold text-slate-700 dark:text-slate-200 mt-0.5">{activeDelivery.pickup}</p>
              </div>
            </div>
            <div className="flex gap-3">
              <span className="text-sm">📍</span>
              <div>
                <p className="text-[10px] text-slate-400 dark:text-slate-500 font-bold uppercase">Delivery Destination</p>
                <p className="font-extrabold text-slate-700 dark:text-slate-200 mt-0.5">{activeDelivery.dropoff}</p>
              </div>
            </div>
          </div>
          <div className="mt-6 pt-4 border-t border-slate-100 dark:border-slate-800 flex items-center justify-between gap-4">
            <span className="text-slate-500 text-[10px] font-bold">Est. Distance: {activeDelivery.distance}</span>
            <div className="flex gap-2">
              <button className="bg-slate-900 hover:bg-slate-800 text-white font-extrabold px-4 py-2 rounded text-xs transition cursor-pointer">
                Directions
              </button>
              <button className="bg-[#c74a09] hover:bg-orange-700 text-white font-extrabold px-4 py-2 rounded text-xs transition cursor-pointer">
                Complete Pickup
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default RiderDashboard;
