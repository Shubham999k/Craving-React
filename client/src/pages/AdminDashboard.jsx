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
    <div className="h-full bg-[radial-gradient(ellipse_at_top_right,_var(--tw-gradient-stops))] from-orange-50 via-slate-50 to-slate-100 dark:from-orange-950/30 dark:via-slate-950 dark:to-slate-900 text-slate-800 dark:text-slate-100 flex flex-col md:flex-row transition-colors duration-500 font-sans relative overflow-hidden">
      
      {/* Decorative ambient orbs in background */}
      <div className="absolute top-0 right-0 w-[600px] h-[600px] bg-orange-500/10 dark:bg-orange-600/10 rounded-full blur-[120px] pointer-events-none -z-10 translate-x-1/3 -translate-y-1/3 animate-pulse"></div>
      <div className="absolute bottom-0 left-0 w-[500px] h-[500px] bg-blue-500/5 dark:bg-blue-600/10 rounded-full blur-[100px] pointer-events-none -z-10 -translate-x-1/3 translate-y-1/3"></div>

      {/* Mobile Sidebar Overlay */}
      {isSidebarOpen && (
        <div 
          className="fixed inset-0 bg-slate-900/40 backdrop-blur-md z-30 md:hidden transition-opacity duration-300"
          onClick={() => setIsSidebarOpen(false)}
        />
      )}

      {/* Sidebar Navigation - Glassmorphic */}
      <aside className={`w-[280px] md:w-64 bg-white/70 dark:bg-slate-900/60 backdrop-blur-2xl border-r border-slate-200/50 dark:border-slate-800/50 flex flex-col shadow-[20px_0_40px_-15px_rgba(0,0,0,0.05)] dark:shadow-[20px_0_40px_-15px_rgba(0,0,0,0.3)] z-40 fixed md:relative h-full transition-transform duration-300 ease-out ${isSidebarOpen ? 'translate-x-0' : '-translate-x-full md:translate-x-0'}`}>
        
        {/* Brand Area */}
        <div className="p-6 border-b border-slate-200/50 dark:border-slate-800/50 flex items-center gap-4 relative z-10">
          <div className="w-11 h-11 rounded-2xl bg-gradient-to-tr from-[#ff6b2b] to-[#c74a09] flex items-center justify-center text-white shadow-lg shadow-orange-500/40 hover:scale-105 hover:shadow-orange-500/50 transition-all duration-300">
            <i className="bi bi-shield-lock-fill text-xl"></i>
          </div>
          <div>
            <h1 className="text-xl font-black tracking-tight text-slate-900 dark:text-white">Super Admin</h1>
            <p className="text-[10px] uppercase font-bold text-orange-600 dark:text-orange-400 tracking-widest mt-0.5">Cravings System</p>
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
                    ? 'bg-gradient-to-r from-orange-500 to-[#c74a09] text-white shadow-lg shadow-orange-500/30 scale-[1.02]'
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
        <div className="p-4 m-4 rounded-2xl bg-white/50 dark:bg-slate-800/50 border border-slate-200/50 dark:border-slate-700/50 shadow-sm backdrop-blur-xl relative z-10 group hover:shadow-md hover:border-orange-200 dark:hover:border-orange-900/50 transition-all duration-300 cursor-pointer">
          <div className="flex items-center gap-3">
            <div className="relative">
              <img src="https://placehold.co/400x400?text=A" alt="Admin" className="w-10 h-10 rounded-full ring-2 ring-orange-500/50 p-0.5 object-cover group-hover:ring-orange-500 transition-all duration-300" />
              <div className="absolute -bottom-0.5 -right-0.5 w-3 h-3 bg-green-500 border-2 border-white dark:border-slate-900 rounded-full animate-pulse"></div>
            </div>
            <div className="flex-1 min-w-0">
              <p className="text-sm font-bold text-slate-900 dark:text-white truncate group-hover:text-orange-600 dark:group-hover:text-orange-400 transition-colors">Admin Root</p>
              <p className="text-[10px] uppercase font-bold text-slate-500 dark:text-slate-400 truncate tracking-wider mt-0.5">
                Online Now
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
              <h2 className="text-2xl font-black text-transparent bg-clip-text bg-gradient-to-r from-slate-900 to-slate-600 dark:from-white dark:to-slate-300 tracking-tight flex items-center gap-2">
                {currentTabName}
              </h2>
              <p className="text-xs font-semibold text-slate-500 dark:text-slate-400 mt-0.5 tracking-wide">Control panel and system analytics.</p>
            </div>
          </div>

          {/* Quick Stats/Actions */}
          <div className="flex items-center gap-4">
            <button className="relative w-11 h-11 rounded-full bg-white/80 dark:bg-slate-800/80 backdrop-blur-md border border-slate-200/50 dark:border-slate-700/50 flex items-center justify-center text-slate-600 dark:text-slate-300 hover:text-orange-600 dark:hover:text-orange-400 hover:scale-105 hover:shadow-lg hover:shadow-orange-500/10 transition-all duration-300">
                <i className="bi bi-bell-fill text-lg"></i>
                <span className="absolute top-2 right-2.5 w-2.5 h-2.5 bg-orange-500 border-2 border-white dark:border-slate-800 rounded-full animate-ping"></span>
                <span className="absolute top-2 right-2.5 w-2.5 h-2.5 bg-orange-500 border-2 border-white dark:border-slate-800 rounded-full"></span>
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

export default AdminDashboard;
