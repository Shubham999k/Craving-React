import React, { useState } from 'react';
import OverviewTab from './restaurant/components/OverviewTab';
import OrdersTab from './restaurant/components/OrdersTab';
import MenuTab from './restaurant/components/MenuTab';
import AnalyticsTab from './restaurant/components/AnalyticsTab';
import ProfileTab from './restaurant/components/ProfileTab';

function RestaurantDashboard() {
  const [activeTab, setActiveTab] = useState('overview');
  const [isOpen, setIsOpen] = useState(true);

  const renderTabContent = () => {
    switch (activeTab) {
      case 'overview':
        return <OverviewTab />;
      case 'orders':
        return <OrdersTab />;
      case 'menu':
        return <MenuTab />;
      case 'analytics':
        return <AnalyticsTab />;
      case 'profile':
        return <ProfileTab />;
      default:
        return <OverviewTab />;
    }
  };

  return (
    <div className="min-h-screen bg-slate-50 dark:bg-slate-950 text-slate-800 dark:text-slate-100 py-16 px-4 transition-colors duration-300">
      <div className="mx-auto max-w-5xl">
        <div className="flex flex-col md:flex-row justify-between items-start md:items-center mb-8 gap-4">
          <div>
            <h1 className="text-3xl font-black">Restaurant Dashboard</h1>
            <p className="text-xs text-slate-500 dark:text-slate-400 mt-1">Manage kitchen prep, live orders, and payouts.</p>
          </div>
          <button 
            onClick={() => setIsOpen(!isOpen)}
            className={`px-3.5 py-1.5 rounded-full text-xs font-black flex items-center gap-1.5 transition-colors duration-300 border cursor-pointer shadow-sm ${
              isOpen 
                ? 'bg-green-500/10 text-green-600 dark:text-green-400 border-green-500/30 hover:bg-green-500/20' 
                : 'bg-red-500/10 text-red-600 dark:text-red-400 border-red-500/30 hover:bg-red-500/20'
            }`}>
            <span className={`w-2.5 h-2.5 rounded-full ${isOpen ? 'bg-green-500 animate-pulse' : 'bg-red-500'}`}></span>
            {isOpen ? 'Accepting Live Orders' : 'Not Accepting Orders'}
          </button>
        </div>

        {/* Dashboard Feature Cards / Tabs Navigation */}
        <div className="grid grid-cols-1 md:grid-cols-3 lg:grid-cols-5 gap-4 mb-10">
          <div 
            onClick={() => setActiveTab('overview')}
            className={`cursor-pointer bg-white dark:bg-slate-900 p-6 rounded-xl border shadow-sm transition-all ${activeTab === 'overview' ? 'border-[#c74a09] ring-2 ring-[#c74a09]/20' : 'border-slate-150 dark:border-slate-800 hover:border-[#c74a09]/50'}`}>
            <span className="text-xs font-bold text-slate-450 dark:text-slate-500 uppercase">Dashboard Overview</span>
            <h3 className="text-xl font-black text-slate-800 dark:text-white mt-2">Live Monitor</h3>
          </div>
          
          <div 
            onClick={() => setActiveTab('orders')}
            className={`cursor-pointer bg-white dark:bg-slate-900 p-6 rounded-xl border shadow-sm transition-all ${activeTab === 'orders' ? 'border-[#c74a09] ring-2 ring-[#c74a09]/20' : 'border-slate-150 dark:border-slate-800 hover:border-[#c74a09]/50'}`}>
            <span className="text-xs font-bold text-slate-450 dark:text-slate-500 uppercase">Active Orders</span>
            <h3 className="text-xl font-black text-slate-800 dark:text-white mt-2">2 Orders</h3>
          </div>
          
          <div 
            onClick={() => setActiveTab('menu')}
            className={`cursor-pointer bg-white dark:bg-slate-900 p-6 rounded-xl border shadow-sm transition-all ${activeTab === 'menu' ? 'border-[#c74a09] ring-2 ring-[#c74a09]/20' : 'border-slate-150 dark:border-slate-800 hover:border-[#c74a09]/50'}`}>
            <span className="text-xs font-bold text-slate-450 dark:text-slate-500 uppercase">Restaurant Menu</span>
            <h3 className="text-xl font-black text-slate-800 dark:text-white mt-2">Manage Items</h3>
          </div>

          <div 
            onClick={() => setActiveTab('analytics')}
            className={`cursor-pointer bg-white dark:bg-slate-900 p-6 rounded-xl border shadow-sm transition-all ${activeTab === 'analytics' ? 'border-[#c74a09] ring-2 ring-[#c74a09]/20' : 'border-slate-150 dark:border-slate-800 hover:border-[#c74a09]/50'}`}>
            <span className="text-xs font-bold text-slate-450 dark:text-slate-500 uppercase">Today's Revenue</span>
            <h3 className="text-xl font-black text-[#c74a09] mt-2">₹12,450</h3>
          </div>
          
          <div 
            onClick={() => setActiveTab('profile')}
            className={`cursor-pointer bg-white dark:bg-slate-900 p-6 rounded-xl border shadow-sm transition-all ${activeTab === 'profile' ? 'border-[#c74a09] ring-2 ring-[#c74a09]/20' : 'border-slate-150 dark:border-slate-800 hover:border-[#c74a09]/50'}`}>
            <span className="text-xs font-bold text-slate-450 dark:text-slate-500 uppercase">Settings</span>
            <h3 className="text-xl font-black text-slate-800 dark:text-white mt-2">Profile</h3>
          </div>
        </div>

        {/* Dynamic Tab Content */}
        {renderTabContent()}
      </div>
    </div>
  );
}

export default RestaurantDashboard;
