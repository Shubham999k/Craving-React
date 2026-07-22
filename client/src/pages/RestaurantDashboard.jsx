import React, { useState } from 'react';
import OverviewTab from './restaurant/components/OverviewTab';
import OrdersTab from './restaurant/components/OrdersTab';
import MenuTab from './restaurant/components/MenuTab';
import AnalyticsTab from './restaurant/components/AnalyticsTab';
import ProfileTab from './restaurant/components/ProfileTab';

const TABS = [
  { id: 'overview', icon: 'bi-grid-1x2', title: 'Overview' },
  { id: 'orders', icon: 'bi-bag', title: 'Active Orders' },
  { id: 'menu', icon: 'bi-journal-text', title: 'Menu Management' },
  { id: 'analytics', icon: 'bi-graph-up', title: 'Analytics' },
  { id: 'profile', icon: 'bi-gear', title: 'Settings' },
];

function RestaurantDashboard() { 
  const [activeTab, setActiveTab] = useState('overview');
  const [isOpen, setIsOpen] = useState(true);

  const renderTabContent = () => {
    switch (activeTab) {
      case 'overview': return <OverviewTab />;
      case 'orders': return <OrdersTab />;
      case 'menu': return <MenuTab />;
      case 'analytics': return <AnalyticsTab />;
      case 'profile': return <ProfileTab />;
      default: return <OverviewTab />;
    }
  };

  const currentTabName = TABS.find(t => t.id === activeTab)?.title || 'Overview';

  return (
    <div className="h-full bg-gradient-to-br from-slate-50 to-slate-100 dark:from-slate-950 dark:to-slate-900 text-slate-800 dark:text-slate-100 flex flex-col md:flex-row transition-colors duration-300 font-sans">
      
      {/* Sidebar Navigation */}
      <aside className="w-full md:w-64 bg-white/70 dark:bg-slate-900/70 backdrop-blur-xl border-r border-slate-200/50 dark:border-slate-800/50 flex flex-col shadow-2xl z-20">
        
        {/* Brand Area */}
        <div className="p-6 border-b border-slate-200/50 dark:border-slate-800/50 flex items-center gap-3">
          <div className="w-10 h-10 rounded-xl bg-gradient-to-tr from-[#ff6b2b] to-[#c74a09] flex items-center justify-center text-white shadow-lg shadow-orange-500/30">
            <i className="bi bi-shop-window text-xl"></i>
          </div>
          <div>
            <h1 className="text-lg font-black tracking-tight text-slate-900 dark:text-white">Partner Panel</h1>
            <p className="text-[10px] uppercase font-bold text-slate-500 tracking-wider">Craving Admin</p>
          </div>
        </div>

        {/* Navigation Links */}
        <nav className="flex-1 overflow-y-auto p-4 space-y-2">
          {TABS.map((tab) => {
            const isActive = activeTab === tab.id;
            return (
              <button
                key={tab.id}
                onClick={() => setActiveTab(tab.id)}
                className={`w-full flex items-center gap-3 px-4 py-3 rounded-xl transition-all duration-300 cursor-pointer ${
                  isActive
                    ? 'bg-[#c74a09] text-white shadow-md shadow-orange-500/20 translate-x-1'
                    : 'text-slate-600 dark:text-slate-400 hover:bg-slate-100 dark:hover:bg-slate-800/50 hover:text-slate-900 dark:hover:text-white hover:translate-x-1'
                }`}
              >
                <i className={`bi ${tab.icon} text-lg ${isActive ? 'text-white' : ''}`}></i>
                <span className="font-bold text-sm">{tab.title}</span>
                {isActive && (
                  <div className="ml-auto w-1.5 h-1.5 rounded-full bg-white animate-pulse"></div>
                )}
              </button>
            );
          })}
        </nav>

        {/* User Profile Snippet at Bottom */}
        <div className="p-4 border-t border-slate-200/50 dark:border-slate-800/50">
          <div className="flex items-center gap-3 px-2">
            <img src="https://api.dicebear.com/7.x/initials/svg?seed=Admin" alt="Admin" className="w-9 h-9 rounded-full ring-2 ring-slate-200 dark:ring-slate-700" />
            <div className="flex-1 min-w-0">
              <p className="text-sm font-bold text-slate-900 dark:text-white truncate">Restaurant Manager</p>
              <p className="text-xs text-slate-500 truncate">Online</p>
            </div>
          </div>
        </div>
      </aside>

      {/* Main Content Area */}
      <main className="flex-1 flex flex-col h-full overflow-hidden relative">
        
        {/* Top Header */}
        <header className="h-20 px-6 md:px-10 flex items-center justify-between bg-white/40 dark:bg-slate-900/40 backdrop-blur-md border-b border-slate-200/50 dark:border-slate-800/50 z-10 sticky top-0">
          <div>
            <h2 className="text-2xl font-black text-slate-900 dark:text-white tracking-tight">{currentTabName}</h2>
            <p className="text-xs font-medium text-slate-500 dark:text-slate-400 mt-0.5">Manage your restaurant operations efficiently.</p>
          </div>

          {/* Glowing On/Off Toggle */}
          <div className="flex items-center gap-4 bg-white/80 dark:bg-slate-800/80 backdrop-blur-md px-4 py-2 rounded-2xl border border-slate-200/50 dark:border-slate-700/50 shadow-sm transition-all hover:shadow-md">
            <div className="flex items-center gap-2">
              <span className="relative flex h-2.5 w-2.5">
                {isOpen && <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-green-400 opacity-75"></span>}
                <span className={`relative inline-flex rounded-full h-2.5 w-2.5 ${isOpen ? 'bg-green-500' : 'bg-red-500'}`}></span>
              </span>
              <span className={`text-xs font-black uppercase tracking-wider ${isOpen ? 'text-green-600 dark:text-green-400' : 'text-red-500 dark:text-red-400'}`}>
                {isOpen ? 'Accepting Orders' : 'Offline'}
              </span>
            </div>
            
            <div className="w-px h-6 bg-slate-200 dark:bg-slate-700"></div>

            <button 
              onClick={() => setIsOpen(!isOpen)}
              className={`relative inline-flex h-7 w-12 items-center rounded-full transition-colors duration-300 focus:outline-none cursor-pointer shadow-inner ${
                isOpen ? 'bg-green-500' : 'bg-slate-300 dark:bg-slate-600'
              }`}
            >
              <span className="sr-only">Toggle Restaurant Status</span>
              <span
                className={`inline-block h-5 w-5 transform rounded-full bg-white transition-transform duration-300 shadow-md ${
                  isOpen ? 'translate-x-6' : 'translate-x-1'
                }`}
              />
            </button>
          </div>
        </header>

        {/* Tab Content Container */}
        <div className="flex-1 overflow-y-auto p-6 md:p-10 relative z-0">
          <div className="max-w-6xl mx-auto h-full pb-20">
            <div className="animate-in fade-in slide-in-from-bottom-4 duration-500">
              {renderTabContent()}
            </div>
          </div>
        </div>
      </main>

    </div>
  );
}

export default RestaurantDashboard;
