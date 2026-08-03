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
  const [isSidebarOpen, setIsSidebarOpen] = useState(false);

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
    <div className="h-full bg-[radial-gradient(ellipse_at_top_right,_var(--tw-gradient-stops))] from-amber-50 via-slate-50 to-slate-100 dark:from-amber-950/20 dark:via-slate-950 dark:to-slate-900 text-slate-800 dark:text-slate-100 flex flex-col md:flex-row transition-colors duration-500 font-sans relative overflow-hidden">
      
      {/* Decorative ambient orbs in background */}
      <div className="absolute top-0 right-0 w-[500px] h-[500px] bg-amber-500/10 dark:bg-amber-600/10 rounded-full blur-[120px] pointer-events-none -z-10 translate-x-1/3 -translate-y-1/3 animate-pulse"></div>
      <div className="absolute bottom-0 left-0 w-[600px] h-[600px] bg-rose-500/5 dark:bg-rose-600/5 rounded-full blur-[100px] pointer-events-none -z-10 -translate-x-1/3 translate-y-1/3"></div>

      {/* Mobile Sidebar Overlay */}
      {isSidebarOpen && (
        <div 
          className="fixed inset-0 bg-slate-900/40 backdrop-blur-md z-30 md:hidden transition-opacity duration-300"
          onClick={() => setIsSidebarOpen(false)}
        />
      )}

      {/* Sidebar Navigation */}
      <aside className={`w-[280px] md:w-64 bg-white/70 dark:bg-slate-900/60 backdrop-blur-2xl border-r border-slate-200/50 dark:border-slate-800/50 flex flex-col shadow-[20px_0_40px_-15px_rgba(0,0,0,0.05)] dark:shadow-[20px_0_40px_-15px_rgba(0,0,0,0.3)] z-40 fixed md:relative h-full transition-transform duration-300 ease-out ${isSidebarOpen ? 'translate-x-0' : '-translate-x-full md:translate-x-0'}`}>
        
        {/* Brand Area */}
        <div className="p-6 border-b border-slate-200/50 dark:border-slate-800/50 flex items-center gap-4 relative z-10">
          <div className="w-11 h-11 rounded-2xl bg-gradient-to-tr from-[#ff6b2b] to-[#c74a09] flex items-center justify-center text-white shadow-lg shadow-orange-500/40 hover:scale-105 hover:shadow-orange-500/50 transition-all duration-300">
            <i className="bi bi-shop-window text-xl"></i>
          </div>
          <div>
            <h1 className="text-xl font-black tracking-tight text-slate-900 dark:text-white">Partner Panel</h1>
            <p className="text-[10px] uppercase font-bold text-amber-600 dark:text-amber-500 tracking-widest mt-0.5">Craving Admin</p>
          </div>
        </div>

        {/* Navigation Links */}
        <nav className="flex-1 overflow-y-auto p-4 space-y-2 relative z-10 scrollbar-none">
          {TABS.map((tab) => {
            const isActive = activeTab === tab.id;
            return (
              <button
                key={tab.id}
                onClick={() => {
                  setActiveTab(tab.id);
                  setIsSidebarOpen(false);
                }}
                className={`w-full flex items-center gap-3 px-4 py-3.5 rounded-xl transition-all duration-300 cursor-pointer group ${
                  isActive
                    ? 'bg-gradient-to-r from-[#e85d04] to-[#c74a09] text-white shadow-lg shadow-orange-500/30 scale-[1.02]'
                    : 'text-slate-600 dark:text-slate-400 hover:bg-orange-50 dark:hover:bg-orange-500/10 hover:text-orange-600 dark:hover:text-orange-400 hover:scale-[1.02]'
                }`}
              >
                <i className={`bi ${tab.icon} text-lg transition-transform duration-300 ${isActive ? 'text-white scale-110' : 'group-hover:scale-110'}`}></i>
                <span className="font-bold text-sm tracking-wide">{tab.title}</span>
                {isActive && (
                  <div className="ml-auto flex items-center justify-center w-5 h-5 rounded-full bg-white/20 backdrop-blur-sm">
                    <div className="w-1.5 h-1.5 rounded-full bg-white animate-pulse"></div>
                  </div>
                )}
              </button>
            );
          })}
        </nav>

        {/* User Profile Snippet at Bottom */}
        <div className="p-4 m-4 rounded-2xl bg-white/50 dark:bg-slate-800/50 border border-slate-200/50 dark:border-slate-700/50 shadow-sm backdrop-blur-xl relative z-10 group hover:shadow-md hover:border-amber-200 dark:hover:border-amber-900/50 transition-all duration-300 cursor-pointer">
          <div className="flex items-center gap-3">
            <div className="relative">
              <img src="https://api.dicebear.com/7.x/initials/svg?seed=Admin" alt="Admin" className="w-10 h-10 rounded-full ring-2 ring-amber-500/50 p-0.5 object-cover group-hover:ring-amber-500 transition-all duration-300" />
            </div>
            <div className="flex-1 min-w-0">
              <p className="text-sm font-bold text-slate-900 dark:text-white truncate group-hover:text-amber-600 dark:group-hover:text-amber-400 transition-colors">Restaurant Manager</p>
              <p className="text-[10px] uppercase font-bold text-slate-500 dark:text-slate-400 truncate tracking-wider mt-0.5">
                Logged In
              </p>
            </div>
          </div>
        </div>
      </aside>

      {/* Main Content Area */}
      <main className="flex-1 flex flex-col h-full overflow-hidden relative z-10">
        
        {/* Top Header - Glassmorphic */}
        <header className="h-20 px-6 md:px-10 flex items-center justify-between bg-white/60 dark:bg-slate-950/60 backdrop-blur-xl border-b border-slate-200/50 dark:border-slate-800/50 z-20 sticky top-0 transition-colors duration-300">
          <div className="flex items-center gap-4">
            <button 
              onClick={() => setIsSidebarOpen(true)}
              className="md:hidden w-10 h-10 flex items-center justify-center rounded-xl bg-white dark:bg-slate-800 border border-slate-200 dark:border-slate-700 text-slate-900 dark:text-white hover:text-orange-600 dark:hover:text-orange-400 hover:border-orange-200 dark:hover:border-orange-900/50 shadow-sm focus:outline-none transition-all duration-300"
            >
              <i className="bi bi-list text-xl"></i>
            </button>
            <div>
              <h2 className="text-2xl font-black text-transparent bg-clip-text bg-gradient-to-r from-slate-900 to-slate-600 dark:from-white dark:to-slate-300 tracking-tight">
                {currentTabName}
              </h2>
              <p className="text-xs font-semibold text-slate-500 dark:text-slate-400 mt-0.5 tracking-wide">Manage your restaurant operations efficiently.</p>
            </div>
          </div>

          {/* Glowing On/Off Toggle */}
          <div className={`flex items-center gap-4 px-5 py-2.5 rounded-full border shadow-sm transition-all duration-500 ${isOpen ? 'bg-green-50/80 dark:bg-green-950/30 border-green-200/50 dark:border-green-800/50 shadow-green-500/10' : 'bg-white/80 dark:bg-slate-800/80 border-slate-200/50 dark:border-slate-700/50'}`}>
            <div className="flex items-center gap-2.5">
              <span className="relative flex h-3 w-3">
                {isOpen && <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-green-400 opacity-75"></span>}
                <span className={`relative inline-flex rounded-full h-3 w-3 ${isOpen ? 'bg-green-500 shadow-[0_0_8px_rgba(34,197,94,0.8)]' : 'bg-slate-400 dark:bg-slate-600'}`}></span>
              </span>
              <span className={`text-xs font-black uppercase tracking-widest hidden sm:inline-block ${isOpen ? 'text-green-700 dark:text-green-400' : 'text-slate-500 dark:text-slate-400'}`}>
                {isOpen ? 'Accepting Orders' : 'Offline'}
              </span>
            </div>
            
            <div className={`w-px h-6 mx-1 transition-colors duration-300 ${isOpen ? 'bg-green-200 dark:bg-green-800/50' : 'bg-slate-200 dark:bg-slate-700'}`}></div>

            <button 
              onClick={() => setIsOpen(!isOpen)}
              className={`relative inline-flex h-8 w-14 items-center rounded-full transition-all duration-300 focus:outline-none cursor-pointer shadow-inner ${
                isOpen ? 'bg-gradient-to-r from-green-500 to-green-400 shadow-[inset_0_2px_4px_rgba(0,0,0,0.1)]' : 'bg-slate-300 dark:bg-slate-700'
              }`}
            >
              <span className="sr-only">Toggle Restaurant Status</span>
              <span
                className={`inline-flex h-6 w-6 transform items-center justify-center rounded-full bg-white transition-all duration-300 shadow-md ${
                  isOpen ? 'translate-x-7' : 'translate-x-1'
                }`}
              >
                {isOpen && <i className="bi bi-check text-green-500 text-sm font-bold"></i>}
              </span>
            </button>
          </div>
        </header>

        {/* Tab Content Container */}
        <div className="flex-1 overflow-y-auto p-6 md:p-10 relative z-0 scrollbar-thin scrollbar-thumb-slate-200 dark:scrollbar-thumb-slate-800">
          <div className="max-w-7xl mx-auto h-full pb-20">
            <div className="animate-in fade-in slide-in-from-bottom-8 duration-700 ease-out h-full">
              {renderTabContent()}
            </div>
          </div>
        </div>
      </main>

    </div>
  );
}

export default RestaurantDashboard;
