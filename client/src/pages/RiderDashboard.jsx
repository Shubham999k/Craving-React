import React, { useState } from 'react';
import ActiveTripTab from './rider/components/ActiveTripTab';
import EarningsTab from './rider/components/EarningsTab';
import RatingsTab from './rider/components/RatingsTab';
import HistoryTab from './rider/components/HistoryTab';

function RiderDashboard() {
  const [activeTab, setActiveTab] = useState('trip');

  const renderTabContent = () => {
    switch (activeTab) {
      case 'trip':
        return <ActiveTripTab />;
      case 'earnings':
        return <EarningsTab />;
      case 'ratings':
        return <RatingsTab />;
      case 'history':
        return <HistoryTab />;
      default:
        return <ActiveTripTab />;
    }
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

        {/* Dashboard Feature Cards / Tabs Navigation */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-10">
          <div 
            onClick={() => setActiveTab('trip')}
            className={`cursor-pointer bg-white dark:bg-slate-900 p-6 rounded-xl border shadow-sm transition-all ${activeTab === 'trip' ? 'border-[#c74a09] ring-2 ring-[#c74a09]/20' : 'border-slate-150 dark:border-slate-800 hover:border-[#c74a09]/50'}`}>
            <span className="text-xs font-bold text-slate-450 dark:text-slate-500 uppercase">Live Assignment</span>
            <h3 className="text-xl font-black text-slate-800 dark:text-white mt-2">Active Trip</h3>
          </div>

          <div 
            onClick={() => setActiveTab('earnings')}
            className={`cursor-pointer bg-white dark:bg-slate-900 p-6 rounded-xl border shadow-sm transition-all ${activeTab === 'earnings' ? 'border-[#c74a09] ring-2 ring-[#c74a09]/20' : 'border-slate-150 dark:border-slate-800 hover:border-[#c74a09]/50'}`}>
            <span className="text-xs font-bold text-slate-450 dark:text-slate-500 uppercase">Today's Earnings</span>
            <h3 className="text-xl font-black text-[#c74a09] mt-2">₹480</h3>
          </div>
          
          <div 
            onClick={() => setActiveTab('ratings')}
            className={`cursor-pointer bg-white dark:bg-slate-900 p-6 rounded-xl border shadow-sm transition-all ${activeTab === 'ratings' ? 'border-[#c74a09] ring-2 ring-[#c74a09]/20' : 'border-slate-150 dark:border-slate-800 hover:border-[#c74a09]/50'}`}>
            <span className="text-xs font-bold text-slate-450 dark:text-slate-500 uppercase">Satisfaction Rate</span>
            <h3 className="text-xl font-black text-slate-800 dark:text-white mt-2">4.9 ★</h3>
          </div>
          
          <div 
            onClick={() => setActiveTab('history')}
            className={`cursor-pointer bg-white dark:bg-slate-900 p-6 rounded-xl border shadow-sm transition-all ${activeTab === 'history' ? 'border-[#c74a09] ring-2 ring-[#c74a09]/20' : 'border-slate-150 dark:border-slate-800 hover:border-[#c74a09]/50'}`}>
            <span className="text-xs font-bold text-slate-450 dark:text-slate-500 uppercase">Total Trips</span>
            <h3 className="text-xl font-black text-slate-800 dark:text-white mt-2">1,208 Trips</h3>
          </div>
        </div>

        {/* Dynamic Tab Content */}
        {renderTabContent()}
      </div>
    </div>
  );
}

export default RiderDashboard;
