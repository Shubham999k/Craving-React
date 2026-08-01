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

  const styles = {
    layout: "h-full bg-slate-50 dark:bg-slate-950 text-slate-800 dark:text-slate-100 flex flex-col md:flex-row transition-colors duration-300 font-sans",
    mobileHeader: "md:hidden flex items-center justify-between p-4 bg-white dark:bg-slate-900 border-b border-slate-200 dark:border-slate-800 shrink-0",
    flexCenter: "flex items-center gap-3",
    sidebarBase: "fixed inset-y-0 left-0 z-50 w-72 bg-white dark:bg-slate-900 border-r border-slate-200 dark:border-slate-800 transform md:relative md:translate-x-0 transition-transform duration-300 ease-in-out shrink-0 flex flex-col",
    sidebarHeader: "p-6 border-b border-slate-200 dark:border-slate-800 flex justify-between items-center",
    sidebarTitle: "text-2xl font-black text-slate-800 dark:text-white tracking-tight flex items-center gap-2",
    toggleWrap: "relative inline-flex items-center w-full cursor-pointer h-12 bg-slate-200 dark:bg-slate-700 rounded-full p-1 shadow-inner select-none transition-colors duration-300",
    navLinkBase: "w-full flex items-center gap-3 px-4 py-3.5 rounded-xl transition-all duration-200 text-sm font-bold group cursor-pointer",
    navLinkActive: "bg-[#c74a09] text-white shadow-md shadow-orange-500/20",
    navLinkInactive: "text-slate-600 dark:text-slate-400 hover:bg-orange-50 dark:hover:bg-slate-800 hover:text-[#c74a09] dark:hover:text-orange-400",
    navIconInactive: "text-slate-400 dark:text-slate-500 group-hover:text-[#c74a09] dark:group-hover:text-orange-400",
    mainContent: "flex-1 flex flex-col min-w-0 bg-slate-50 dark:bg-slate-950 relative overflow-hidden",
    topHeader: "h-20 bg-white/80 dark:bg-slate-900/80 backdrop-blur-md border-b border-slate-200 dark:border-slate-800 flex items-center justify-between px-6 shrink-0 z-10 hidden md:flex",
    scrollContent: "flex-1 overflow-y-auto p-4 md:p-8 scrollbar-thin scrollbar-thumb-slate-300 dark:scrollbar-thumb-slate-700 bg-slate-50 dark:bg-slate-950/50 relative",
    offlineNotice: "bg-slate-800 text-white p-4 rounded-xl shadow-md flex items-center justify-between border-l-4 border-slate-500 animate-fadeIn"
  };

  return (
    <div className={styles.layout}>
      
      {/* Mobile Header */}
      <div className={styles.mobileHeader}>
        <div className={styles.flexCenter}>
          <button onClick={() => setIsSidebarOpen(true)} className="text-2xl text-slate-600 dark:text-slate-300 focus:outline-none">
            <i className="bi bi-list"></i>
          </button>
          <h1 className="text-lg font-black text-slate-800 dark:text-white">Rider App</h1>
        </div>
        <div className={styles.flexCenter}>
          {/* Online Toggle Mobile */}
          <label className="relative inline-flex items-center cursor-pointer">
            <input type="checkbox" className="sr-only peer" checked={isOnline} onChange={() => setIsOnline(!isOnline)} />
            <div className="w-9 h-5 bg-slate-200 peer-focus:outline-none rounded-full peer dark:bg-slate-700 peer-checked:after:translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-[2px] after:left-[2px] after:bg-white after:border-slate-300 after:border after:rounded-full after:h-4 after:w-4 after:transition-all dark:border-slate-600 peer-checked:bg-[#c74a09]"></div>
          </label>
        </div>
      </div>

      {/* Sidebar Navigation */}
      <div className={`${styles.sidebarBase} ${isSidebarOpen ? 'translate-x-0' : '-translate-x-full'}`}>
        {/* Sidebar Header */}
        <div className={styles.sidebarHeader}>
          <div>
            <h2 className={styles.sidebarTitle}>
              Rider<span className="text-[#c74a09]">Dash</span>
            </h2>
            <p className="text-xs text-slate-500 dark:text-slate-400 mt-1 font-semibold">Delivery Partner Portal</p>
          </div>
          <button onClick={() => setIsSidebarOpen(false)} className="md:hidden text-slate-500 text-xl">
            <i className="bi bi-x-lg"></i>
          </button>
        </div>

        {/* Sidebar Status Toggle */}
        <div className="p-6 border-b border-slate-200 dark:border-slate-800 bg-slate-50/50 dark:bg-slate-800/20">
          <div className="flex items-center justify-between mb-2">
            <span className="text-sm font-bold text-slate-700 dark:text-slate-300">Status</span>
            <span className={`text-xs font-black px-2 py-0.5 rounded uppercase tracking-wider ${isOnline ? 'bg-green-100 text-green-700 dark:bg-green-500/10 dark:text-green-400' : 'bg-slate-200 text-slate-700 dark:bg-slate-800 dark:text-slate-400'}`}>
              {isOnline ? 'Online' : 'Offline'}
            </span>
          </div>
          <label className={styles.toggleWrap}>
            <input type="checkbox" className="sr-only peer" checked={isOnline} onChange={() => setIsOnline(!isOnline)} />
            
            {/* Background pill that slides */}
            <div className={`absolute top-1 bottom-1 w-[calc(50%-4px)] rounded-full transition-all duration-300 shadow-sm ${isOnline ? 'bg-green-500 left-[calc(50%+2px)]' : 'bg-white left-1'}`}></div>
            
            {/* Text labels over the sliding pill */}
            <div className="relative flex w-full z-10 text-xs font-black tracking-wider">
              <div className={`flex-1 text-center transition-colors duration-300 ${isOnline ? 'text-slate-500' : 'text-slate-800 dark:text-slate-800'}`}>
                OFFLINE
              </div>
              <div className={`flex-1 text-center transition-colors duration-300 ${isOnline ? 'text-white' : 'text-slate-400'}`}>
                ONLINE
              </div>
            </div>
          </label>
        </div>

        {/* Navigation Links */}
        <div className="p-4 flex-1 overflow-y-auto space-y-1 scrollbar-thin scrollbar-thumb-slate-200 dark:scrollbar-thumb-slate-700">
          {TABS.map((tab) => {
            const isActive = activeTab === tab.id;
            return (
              <button
                key={tab.id}
                onClick={() => { setActiveTab(tab.id); setIsSidebarOpen(false); }}
                className={`${styles.navLinkBase} ${
                  isActive ? styles.navLinkActive : styles.navLinkInactive
                }`}
              >
                <i className={`bi ${tab.icon} text-lg transition-colors ${isActive ? 'text-white' : styles.navIconInactive}`}></i>
                {tab.title}
              </button>
            );
          })}
        </div>
      </div>

      {/* Main Content Area */}
      <div className={styles.mainContent}>
        {/* Top Header */}
        <div className={styles.topHeader}>
          <div className="flex items-center gap-4">
            <h2 className="text-2xl font-black text-slate-800 dark:text-slate-100 tracking-tight">{currentTabName}</h2>
          </div>
          <div className="flex items-center gap-5">
            <div className="hidden lg:block text-right mr-2">
              <p className="text-sm font-bold text-slate-800 dark:text-slate-100">{user?.name || "Rider"}</p>
              <p className="text-[10px] font-bold text-[#c74a09] uppercase tracking-wider">Top Rated Rider</p>
            </div>
            <div className="w-10 h-10 rounded-full border-2 border-orange-500 overflow-hidden shadow-sm flex items-center justify-center bg-orange-100">
              {user?.profilePicture ? (
                <img src={user.profilePicture} alt="Rider Profile" className="w-full h-full object-cover" />
              ) : (
                <i className="bi bi-person-fill text-orange-500 text-xl"></i>
              )}
            </div>
          </div>
        </div>

        {/* Scrollable Content Container */}
        <div className={styles.scrollContent}>
          
          {/* Overlay for mobile sidebar */}
          {isSidebarOpen && (
            <div 
              className="fixed inset-0 bg-slate-900/50 backdrop-blur-sm z-40 md:hidden"
              onClick={() => setIsSidebarOpen(false)}
            ></div>
          )}

          <div className="max-w-6xl mx-auto space-y-6">
            {!isOnline && (
              <div className={styles.offlineNotice}>
                <div className={styles.flexCenter}>
                  <i className="bi bi-moon-stars-fill text-xl text-slate-400"></i>
                  <div>
                    <h4 className="font-bold">You are Offline</h4>
                    <p className="text-xs text-slate-400 mt-0.5">Go online to start receiving delivery requests.</p>
                  </div>
                </div>
              </div>
            )}

            <div className="animate-fadeIn">
              {renderTabContent()}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default RiderDashboard;
