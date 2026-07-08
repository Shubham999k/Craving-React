import React from 'react';

const activeDelivery = {
  id: '#CR-D902',
  pickup: 'Under The Mango Tree Restaurant',
  dropoff: 'Building 4B, Sector 62, City Center',
  payout: 75,
  distance: '3.4 km'
};

export default function ActiveTripTab() {
  return (
    <div className="space-y-6">
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
  );
}
