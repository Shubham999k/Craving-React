import React, { useState } from 'react';
import OverviewTab from './admin/components/OverviewTab';
import UsersTab from './admin/components/UsersTab';
import RestaurantsTab from './admin/components/RestaurantsTab';
import SettingsTab from './admin/components/SettingsTab';

const TABS = [
  { id: 'overview', icon: 'bi-speedometer2', title: 'System Overview' },
  { id: 'users', icon: 'bi-people', title: 'User Management' },
  { id: 'restaurants', icon: 'bi-shop', title: 'Restaurants' },
  { id: 'settings', icon: 'bi-gear-fill', title: 'System Settings' },
];

function AdminDashboard() { 
  const [activeTab, setActiveTab] = useState('overview');
  const [isSidebarOpen, setIsSidebarOpen] = useState(false);

  const renderTabContent = () => {
    switch (activeTab) {
      case 'overview': return <OverviewTab />;
      case 'users': return <UsersTab />;
      case 'restaurants': return <RestaurantsTab />;
      case 'settings': return <SettingsTab />;
      default: return <OverviewTab />;
    }
  };

  const currentTabName = TABS.find(t => t.id === activeTab)?.title || 'Overview';

  return (
    <div className="h-full bg-slate-100 dark:bg-slate-950 text-slate-800 dark:text-slate-100 flex flex-col md:flex-row transition-colors duration-300 font-sans">
      
      {/* Mobile Sidebar Overlay */}
      {isSidebarOpen && (
        <div 
          className="fixed inset-0 bg-slate-900/50 backdrop-blur-sm z-30 md:hidden"
          onClick={() => setIsSidebarOpen(false)}
        />
      )}

      {/* Sidebar Navigation */}
      <aside className={`w-[280px] md:w-64 bg-slate-900 text-white flex flex-col shadow-2xl z-40 fixed md:relative h-full overflow-hidden transition-transform duration-300 ${isSidebarOpen ? 'translate-x-0' : '-translate-x-full md:translate-x-0'}`}>
        
        {/* Decorative background glow in sidebar */}
        <div className="absolute top-0 left-0 w-full h-40 bg-gradient-to-b from-orange-500/20 to-transparent pointer-events-none"></div>

        {/* Brand Area */}
        <div className="p-6 border-b border-white/10 flex items-center gap-3 relative z-10">
          <div className="w-10 h-10 rounded-xl bg-gradient-to-tr from-[#ff6b2b] to-[#c74a09] flex items-center justify-center text-white shadow-lg shadow-orange-500/30">
            <i className="bi bi-shield-lock-fill text-xl"></i>
          </div>
          <div>
            <h1 className="text-lg font-black tracking-tight text-white">Super Admin</h1>
            <p className="text-[10px] uppercase font-bold text-orange-400 tracking-wider">Cravings System</p>
          </div>
        </div>

        {/* Navigation Links */}
        <nav className="flex-1 overflow-y-auto p-4 space-y-2 relative z-10">
          {TABS.map((tab) => {
            const isActive = activeTab === tab.id;
            return (
              <button
                key={tab.id}
                onClick={() => {
                  setActiveTab(tab.id);
                  setIsSidebarOpen(false);
                }}
                className={`w-full flex items-center gap-3 px-4 py-3 rounded-xl transition-all duration-300 cursor-pointer ${
                  isActive
                    ? 'bg-gradient-to-r from-orange-600 to-[#c74a09] text-white shadow-lg shadow-orange-500/20 translate-x-1'
                    : 'text-slate-400 hover:bg-white/5 hover:text-white hover:translate-x-1'
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
        <div className="p-4 border-t border-white/10 relative z-10 bg-slate-900/50 backdrop-blur-md">
          <div className="flex items-center gap-3 px-2">
            <img src="https://placehold.co/400x400?text=A" alt="Admin" className="w-9 h-9 rounded-full ring-2 ring-orange-500" />
            <div className="flex-1 min-w-0">
              <p className="text-sm font-bold text-white truncate">Admin Root</p>
              <p className="text-xs text-green-400 truncate flex items-center gap-1">
                <span className="w-1.5 h-1.5 rounded-full bg-green-500 animate-pulse"></span> Online
              </p>
            </div>
          </div>
        </div>
      </aside>

      {/* Main Content Area */}
      <main className="flex-1 flex flex-col h-full overflow-hidden relative bg-slate-50 dark:bg-slate-950">
        
        {/* Top Header */}
        <header className="h-20 px-6 md:px-10 flex items-center justify-between bg-white/70 dark:bg-slate-900/70 backdrop-blur-xl border-b border-slate-200/50 dark:border-slate-800/50 z-10 sticky top-0">
          <div className="flex items-center gap-3">
            <button 
              onClick={() => setIsSidebarOpen(true)}
              className="md:hidden text-slate-900 dark:text-white hover:text-orange-600 focus:outline-none cursor-pointer"
            >
              <i className="bi bi-list text-3xl"></i>
            </button>
            <div>
              <h2 className="text-2xl font-black text-slate-900 dark:text-white tracking-tight flex items-center gap-2">
                {currentTabName}
              </h2>
              <p className="text-xs font-medium text-slate-500 dark:text-slate-400 mt-0.5">Control panel and system analytics.</p>
            </div>
          </div>

          {/* Quick Stats/Actions */}
          <div className="flex items-center gap-4">
            <button className="relative w-10 h-10 rounded-full bg-white dark:bg-slate-800 border border-slate-200 dark:border-slate-700 flex items-center justify-center text-slate-600 dark:text-slate-300 hover:text-orange-600 dark:hover:text-orange-500 transition-colors shadow-sm">
                <i className="bi bi-bell-fill"></i>
                <span className="absolute top-0 right-0 w-3 h-3 bg-red-500 border-2 border-white dark:border-slate-900 rounded-full"></span>
            </button>
          </div>
        </header>

        {/* Tab Content Container */}
        <div className="flex-1 overflow-y-auto p-6 md:p-10 relative z-0">
          {/* Subtle background graphics */}
          <div className="absolute top-0 right-0 w-96 h-96 bg-orange-500/5 rounded-full blur-3xl pointer-events-none -z-10 transform translate-x-1/3 -translate-y-1/3"></div>
          
          <div className="max-w-7xl mx-auto h-full pb-20">
            <div className="animate-in fade-in slide-in-from-bottom-4 duration-500 h-full">
              {renderTabContent()}
            </div>
          </div>
        </div>
      </main>

    </div>
  );
}

export default AdminDashboard;
