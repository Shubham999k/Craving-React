import React, { useState } from 'react';

const historyData = [
  { id: '#CR-D901', date: 'Jul 23, 2026', time: '14:30', restaurant: 'Pizza Palace', payout: 65, distance: '2.1 km', status: 'Completed' },
  { id: '#CR-D899', date: 'Jul 23, 2026', time: '13:15', restaurant: 'Burger Hub', payout: 45, distance: '1.5 km', status: 'Completed' },
  { id: '#CR-D895', date: 'Jul 23, 2026', time: '12:00', restaurant: 'Spice Kitchen', payout: 0, distance: '3.8 km', status: 'Cancelled' },
  { id: '#CR-D892', date: 'Jul 22, 2026', time: '20:45', restaurant: 'Under The Mango Tree', payout: 85, distance: '4.2 km', status: 'Completed' },
  { id: '#CR-D888', date: 'Jul 22, 2026', time: '19:30', restaurant: 'Pasta Express', payout: 55, distance: '1.8 km', status: 'Completed' },
  { id: '#CR-D881', date: 'Jul 21, 2026', time: '18:20', restaurant: 'Pizza Palace', payout: 70, distance: '2.5 km', status: 'Completed' },
];

export default function HistoryTab() {
  const [filter, setFilter] = useState('All');

  const filteredHistory = historyData.filter(trip => filter === 'All' || trip.status === filter);

  return (
    <div className="bg-white dark:bg-slate-900 rounded-2xl border border-slate-200 dark:border-slate-800 shadow-sm overflow-hidden flex flex-col">
      
      {/* Header & Filters */}
      <div className="p-6 border-b border-slate-200 dark:border-slate-800 flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4">
        <div>
          <h3 className="font-black text-slate-800 dark:text-white text-xl">Trip History</h3>
          <p className="text-xs font-medium text-slate-500 dark:text-slate-400 mt-1">Review your past deliveries and earnings.</p>
        </div>
        
        <div className="flex bg-slate-100 dark:bg-slate-800 p-1 rounded-lg">
          {['All', 'Completed', 'Cancelled'].map(status => (
            <button
              key={status}
              onClick={() => setFilter(status)}
              className={`px-4 py-1.5 rounded-md text-xs font-bold transition-colors ${filter === status ? 'bg-white dark:bg-slate-900 text-slate-800 dark:text-white shadow-sm' : 'text-slate-500 hover:text-slate-700 dark:hover:text-slate-300'}`}
            >
              {status}
            </button>
          ))}
        </div>
      </div>

      {/* Table Area */}
      <div className="overflow-x-auto">
        <table className="w-full text-left border-collapse">
          <thead>
            <tr className="bg-slate-50 dark:bg-slate-800/50 border-b border-slate-200 dark:border-slate-800">
              <th className="p-4 text-xs font-black uppercase text-slate-500 dark:text-slate-400 tracking-wider whitespace-nowrap">Trip ID</th>
              <th className="p-4 text-xs font-black uppercase text-slate-500 dark:text-slate-400 tracking-wider whitespace-nowrap">Date & Time</th>
              <th className="p-4 text-xs font-black uppercase text-slate-500 dark:text-slate-400 tracking-wider whitespace-nowrap">Restaurant</th>
              <th className="p-4 text-xs font-black uppercase text-slate-500 dark:text-slate-400 tracking-wider whitespace-nowrap">Distance</th>
              <th className="p-4 text-xs font-black uppercase text-slate-500 dark:text-slate-400 tracking-wider whitespace-nowrap">Payout</th>
              <th className="p-4 text-xs font-black uppercase text-slate-500 dark:text-slate-400 tracking-wider whitespace-nowrap">Status</th>
            </tr>
          </thead>
          <tbody className="divide-y divide-slate-100 dark:divide-slate-800">
            {filteredHistory.map((trip) => (
              <tr key={trip.id} className="hover:bg-slate-50/50 dark:hover:bg-slate-800/20 transition-colors">
                <td className="p-4 text-sm font-bold text-slate-800 dark:text-white whitespace-nowrap">{trip.id}</td>
                <td className="p-4 whitespace-nowrap">
                  <div className="text-sm font-bold text-slate-700 dark:text-slate-300">{trip.date}</div>
                  <div className="text-[10px] text-slate-500 font-bold">{trip.time}</div>
                </td>
                <td className="p-4 text-sm font-bold text-slate-700 dark:text-slate-300 whitespace-nowrap flex items-center gap-2">
                  <div className="w-6 h-6 rounded bg-orange-100 dark:bg-orange-500/20 text-[#c74a09] dark:text-orange-400 flex items-center justify-center text-xs">
                    <i className="bi bi-shop"></i>
                  </div>
                  {trip.restaurant}
                </td>
                <td className="p-4 text-sm font-bold text-slate-600 dark:text-slate-400 whitespace-nowrap">{trip.distance}</td>
                <td className="p-4 text-sm font-black text-green-600 dark:text-green-500 whitespace-nowrap">
                  {trip.payout > 0 ? `₹${trip.payout}` : '-'}
                </td>
                <td className="p-4 whitespace-nowrap">
                  <span className={`inline-flex items-center gap-1.5 px-2.5 py-1 rounded-md text-[10px] font-black uppercase tracking-wider ${
                    trip.status === 'Completed' ? 'bg-green-100 text-green-700 dark:bg-green-500/10 dark:text-green-400' : 'bg-red-100 text-red-700 dark:bg-red-500/10 dark:text-red-400'
                  }`}>
                    {trip.status === 'Completed' ? <i className="bi bi-check-circle-fill"></i> : <i className="bi bi-x-circle-fill"></i>}
                    {trip.status}
                  </span>
                </td>
              </tr>
            ))}
            
            {filteredHistory.length === 0 && (
              <tr>
                <td colSpan="6" className="p-8 text-center text-slate-500 dark:text-slate-400 font-bold text-sm">
                  No trips found for the selected filter.
                </td>
              </tr>
            )}
          </tbody>
        </table>
      </div>
      
    </div>
  );
}
