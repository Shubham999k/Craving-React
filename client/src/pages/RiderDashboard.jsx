import React, { useState, useEffect } from 'react';
import ActiveTripTab from './rider/components/ActiveTripTab';
import EarningsTab from './rider/components/EarningsTab';
import RatingsTab from './rider/components/RatingsTab';
import HistoryTab from './rider/components/HistoryTab';
import ProfileTab from './rider/components/ProfileTab';

const TABS = [
  { id: 'trip', icon: 'bi-bicycle', title: 'Active Trip' },
  { id: 'earnings', icon: 'bi-wallet2', title: 'Earnings' },
  { id: 'ratings', icon: 'bi-star-fill', title: 'Ratings & Reviews' },
  { id: 'history', icon: 'bi-clock-history', title: 'Trip History' },
  { id: 'profile', icon: 'bi-person-gear', title: 'Profile settings' },
];

function RiderDashboard() {
  const [activeTab, setActiveTab] = useState('trip');
  const [isSidebarOpen, setIsSidebarOpen] = useState(false);
  const [isOnline, setIsOnline] = useState(true);
  const [user, setUser] = useState({});

  useEffect(() => {
    setUser(JSON.parse(localStorage.getItem('user')) || {});
    // listen to auth-change for avatar updates
    const handleAuthChange = () => {
      setUser(JSON.parse(localStorage.getItem('user')) || {});
    };
    window.addEventListener("auth-change", handleAuthChange);
    return () => window.removeEventListener("auth-change", handleAuthChange);
  }, []);

  const renderTabContent = () => {
    switch (activeTab) {
      case 'trip': return <ActiveTripTab />;
      case 'earnings': return <EarningsTab />;
      case 'ratings': return <RatingsTab />;
      case 'history': return <HistoryTab />;
      case 'profile': return <ProfileTab />;
      default: return <ActiveTripTab />;
    }
  };

  const currentTabName = TABS.find(t => t.id === activeTab)?.title || 'Overview';

  return (
    <div className="h-full bg-[radial-gradient(ellipse_at_top_left,_var(--tw-gradient-stops))] from-orange-50 via-slate-50 to-slate-100 dark:from-orange-950/20 dark:via-slate-950 dark:to-slate-900 text-slate-800 dark:text-slate-100 flex flex-col md:flex-row transition-colors duration-500 font-sans relative overflow-hidden">

      {/* Decorative ambient orbs in background */}
      <div className="absolute top-1/4 left-0 w-[400px] h-[400px] bg-orange-500/10 dark:bg-orange-600/10 rounded-full blur-[100px] pointer-events-none -z-10 -translate-x-1/2 animate-pulse"></div>
      <div className="absolute bottom-0 right-0 w-[500px] h-[500px] bg-indigo-500/5 dark:bg-indigo-600/10 rounded-full blur-[120px] pointer-events-none -z-10 translate-x-1/3 translate-y-1/3"></div>

      {/* Mobile Sidebar Overlay */}
      {isSidebarOpen && (
        <div
          className="fixed inset-0 bg-slate-900/40 backdrop-blur-md z-40 md:hidden transition-opacity duration-300"
          onClick={() => setIsSidebarOpen(false)}
        ></div>
      )}

      {/* Mobile Header (Only visible on small screens) */}
      <div className="md:hidden flex items-center justify-between p-4 bg-white/80 dark:bg-slate-950/80 backdrop-blur-xl border-b border-slate-200/50 dark:border-slate-800/50 shrink-0 z-30 relative shadow-sm">
        <div className="flex items-center gap-4">
          <button onClick={() => setIsSidebarOpen(true)} className="w-10 h-10 flex items-center justify-center rounded-xl bg-white dark:bg-slate-800 border border-slate-200 dark:border-slate-700 text-slate-900 dark:text-white hover:text-orange-600 dark:hover:text-orange-400 focus:outline-none transition-colors">
            <i className="bi bi-list text-xl"></i>
          </button>
          <h1 className="text-xl font-black text-transparent bg-clip-text bg-gradient-to-r from-slate-900 to-slate-600 dark:from-white dark:to-slate-300">Rider App</h1>
        </div>
        <div className="flex items-center">
          {/* Online Toggle Mobile */}
          <label className="relative inline-flex items-center cursor-pointer group">
            <input type="checkbox" className="sr-only peer" checked={isOnline} onChange={() => setIsOnline(!isOnline)} />
            <div className="w-12 h-6 bg-slate-300 dark:bg-slate-700 peer-focus:outline-none rounded-full peer peer-checked:after:translate-x-full after:content-[''] after:absolute after:top-[2px] after:left-[2px] after:bg-white after:rounded-full after:h-5 after:w-5 after:transition-all peer-checked:bg-gradient-to-r peer-checked:from-green-500 peer-checked:to-green-400 shadow-inner"></div>
          </label>
        </div>
      </div>

      {/* Sidebar Navigation */}
      <div className={`fixed inset-y-0 left-0 z-50 w-72 bg-white/70 dark:bg-slate-900/60 backdrop-blur-2xl border-r border-slate-200/50 dark:border-slate-800/50 transform ${isSidebarOpen ? 'translate-x-0' : '-translate-x-full'} md:relative md:translate-x-0 transition-transform duration-300 ease-out shrink-0 flex flex-col shadow-[20px_0_40px_-15px_rgba(0,0,0,0.05)] dark:shadow-[20px_0_40px_-15px_rgba(0,0,0,0.3)]`}>
        
        {/* Sidebar Header */}
        <div className="p-6 border-b border-slate-200/50 dark:border-slate-800/50 flex justify-between items-center relative z-10">
          <div>
            <h2 className="text-2xl font-black text-slate-800 dark:text-white tracking-tight flex items-center gap-2">
              Rider<span className="text-transparent bg-clip-text bg-gradient-to-r from-orange-500 to-[#c74a09]">Dash</span>
            </h2>
            <p className="text-[10px] uppercase font-bold text-slate-500 dark:text-slate-400 mt-1 tracking-widest">Delivery Partner Portal</p>
          </div>
          <button onClick={() => setIsSidebarOpen(false)} className="md:hidden w-8 h-8 flex items-center justify-center rounded-lg bg-slate-100 dark:bg-slate-800 text-slate-500 hover:text-orange-500 hover:bg-orange-50 dark:hover:bg-orange-500/10 transition-colors">
            <i className="bi bi-x-lg text-sm font-bold"></i>
          </button>
        </div>

        {/* Sidebar Status Toggle (Desktop & Mobile Drawer) */}
        <div className="p-6 border-b border-slate-200/50 dark:border-slate-800/50 bg-white/30 dark:bg-slate-800/30 backdrop-blur-sm relative z-10">
          <div className="flex items-center justify-between mb-4">
            <span className="text-sm font-bold text-slate-700 dark:text-slate-300">Shift Status</span>
            <span className={`text-[10px] font-black px-2.5 py-1 rounded-full uppercase tracking-widest transition-colors duration-300 ${isOnline ? 'bg-green-100/80 text-green-700 dark:bg-green-500/20 dark:text-green-400 shadow-[0_0_10px_rgba(34,197,94,0.2)]' : 'bg-slate-200/80 text-slate-700 dark:bg-slate-700 dark:text-slate-300'}`}>
              {isOnline ? 'Active' : 'Offline'}
            </span>
          </div>
          <label className="relative inline-flex items-center w-full cursor-pointer h-12 bg-slate-200/50 dark:bg-slate-800/50 rounded-2xl p-1 shadow-inner select-none transition-colors duration-300 border border-slate-300/50 dark:border-slate-700/50">
            <input type="checkbox" className="sr-only peer" checked={isOnline} onChange={() => setIsOnline(!isOnline)} />

            {/* Background pill that slides */}
            <div className={`absolute top-1 bottom-1 w-[calc(50%-4px)] rounded-xl transition-all duration-300 ease-out shadow-md ${isOnline ? 'bg-gradient-to-r from-green-500 to-green-400 left-[calc(50%+2px)] shadow-[0_0_15px_rgba(34,197,94,0.4)]' : 'bg-white dark:bg-slate-600 left-1'}`}></div>

            {/* Text labels over the sliding pill */}
            <div className="relative flex w-full z-10 text-xs font-black tracking-widest uppercase">
              <div className={`flex-1 text-center py-2 transition-colors duration-300 ${isOnline ? 'text-slate-500 dark:text-slate-400' : 'text-slate-800 dark:text-white'}`}>
                Offline
              </div>
              <div className={`flex-1 text-center py-2 transition-colors duration-300 ${isOnline ? 'text-white' : 'text-slate-400 dark:text-slate-500'}`}>
                Online
              </div>
            </div>
          </label>
        </div>

        {/* Navigation Links */}
        <div className="p-4 flex-1 overflow-y-auto space-y-2 relative z-10 scrollbar-none">
          {TABS.map((tab) => {
            const isActive = activeTab === tab.id;
            return (
              <button
                key={tab.id}
                onClick={() => { setActiveTab(tab.id); setIsSidebarOpen(false); }}
                className={`w-full flex items-center gap-3 px-4 py-3.5 rounded-xl transition-all duration-300 cursor-pointer group ${isActive
                  ? 'bg-gradient-to-r from-orange-500 to-[#c74a09] text-white shadow-lg shadow-orange-500/30 scale-[1.02]'
                  : 'text-slate-600 dark:text-slate-400 hover:bg-orange-50 dark:hover:bg-orange-500/10 hover:text-orange-600 dark:hover:text-orange-400 hover:scale-[1.02]'
                  }`}
              >
                <i className={`bi ${tab.icon} text-lg transition-transform duration-300 ${isActive ? 'text-white scale-110' : 'text-slate-400 dark:text-slate-500 group-hover:text-orange-600 dark:group-hover:text-orange-400 group-hover:scale-110'}`}></i>
                <span className="font-bold text-sm tracking-wide">{tab.title}</span>
                {isActive && (
                  <div className="ml-auto flex items-center justify-center w-5 h-5 rounded-full bg-white/20 backdrop-blur-sm">
                    <div className="w-1.5 h-1.5 rounded-full bg-white animate-pulse"></div>
                  </div>
                )}
              </button>
            );
          })}
        </div>
      </div>

      {/* Main Content Area */}
      <div className="flex-1 flex flex-col min-w-0 bg-transparent relative z-10 overflow-hidden">
        
        {/* Top Header - Desktop Only */}
        <div className="h-20 bg-white/60 dark:bg-slate-950/60 backdrop-blur-xl border-b border-slate-200/50 dark:border-slate-800/50 hidden md:flex items-center justify-between px-8 shrink-0 z-20 sticky top-0 transition-colors duration-300">
          <div className="flex items-center gap-4">
            <h2 className="text-2xl font-black text-transparent bg-clip-text bg-gradient-to-r from-slate-900 to-slate-600 dark:from-white dark:to-slate-300 tracking-tight">{currentTabName}</h2>
          </div>
          <div className="flex items-center gap-5 group cursor-pointer p-2 hover:bg-white/50 dark:hover:bg-slate-800/50 rounded-2xl transition-colors">
            <div className="text-right mr-1">
              <p className="text-sm font-bold text-slate-900 dark:text-white group-hover:text-orange-600 dark:group-hover:text-orange-400 transition-colors">{user?.name || "Rider Profile"}</p>
              <p className="text-[10px] font-black text-orange-600 dark:text-orange-500 uppercase tracking-widest mt-0.5">Top Rated Rider</p>
            </div>
            <div className="w-11 h-11 rounded-full border-2 border-orange-500 overflow-hidden shadow-sm flex items-center justify-center bg-orange-100 group-hover:shadow-orange-500/20 group-hover:scale-105 transition-all duration-300">
              {user?.profilePicture ? (
                <img src={user.profilePicture} alt="Rider Profile" className="w-full h-full object-cover" />
              ) : (
                <i className="bi bi-person-fill text-orange-500 text-2xl"></i>
              )}
            </div>
          </div>
        </div>

        {/* Scrollable Content Container */}
        <div className="flex-1 overflow-y-auto p-4 md:p-8 scrollbar-thin scrollbar-thumb-slate-200 dark:scrollbar-thumb-slate-800 relative">
          <div className="max-w-6xl mx-auto space-y-6 pb-20 h-full">
            
            {/* Offline Alert Banner */}
            {!isOnline && (
              <div className="bg-slate-800/90 backdrop-blur-md text-white p-5 rounded-2xl shadow-xl flex items-center justify-between border border-slate-700 animate-in slide-in-from-top-4 fade-in duration-500 relative overflow-hidden">
                <div className="absolute top-0 right-0 w-32 h-32 bg-white/5 rounded-full blur-2xl -translate-y-1/2 translate-x-1/2 pointer-events-none"></div>
                <div className="flex items-center gap-4 relative z-10">
                  <div className="w-12 h-12 rounded-full bg-slate-700/50 flex items-center justify-center border border-slate-600">
                    <i className="bi bi-moon-stars-fill text-2xl text-slate-300"></i>
                  </div>
                  <div>
                    <h4 className="font-black text-lg tracking-tight">You are Offline</h4>
                    <p className="text-sm text-slate-400 mt-0.5 font-medium">Go online to start receiving delivery requests.</p>
                  </div>
                </div>
                <button 
                  onClick={() => setIsOnline(true)}
                  className="hidden sm:block px-5 py-2.5 bg-white text-slate-900 rounded-xl font-bold text-sm hover:bg-orange-50 transition-colors shadow-sm relative z-10"
                >
                  Go Online
                </button>
              </div>
            )}

            <div className="animate-in fade-in slide-in-from-bottom-8 duration-700 ease-out h-full">
              {renderTabContent()}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default RiderDashboard;
