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
          
          {/* On/Off Toggle Switch */}
          <div className="flex items-center gap-3 bg-white dark:bg-slate-900 px-5 py-2.5 rounded-full border border-slate-200 dark:border-slate-800 shadow-sm">
            <div className="flex items-center gap-2">
              <span className={`w-2 h-2 rounded-full ${isOpen ? 'bg-green-500 animate-pulse' : 'bg-red-500'}`}></span>
              <span className={`text-sm font-extrabold ${isOpen ? 'text-green-600 dark:text-green-400' : 'text-red-500 dark:text-red-400'}`}>
                {isOpen ? 'Accepting Orders' : 'Not Accepting Orders'}
              </span>
            </div>
            
            <div className="w-px h-5 bg-slate-200 dark:bg-slate-700"></div>

            <button 
              onClick={() => setIsOpen(!isOpen)}
              className={`relative inline-flex h-7 w-12 items-center rounded-full transition-colors duration-300 focus:outline-none focus:ring-2 focus:ring-orange-500 focus:ring-offset-2 dark:focus:ring-offset-slate-900 cursor-pointer shadow-inner ${
                isOpen ? 'bg-green-500' : 'bg-slate-300 dark:bg-slate-700'
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
        </div>

        {/* Chrome Browser Window Mockup */}
        <div className="rounded-xl border border-slate-300 dark:border-slate-700 shadow-2xl overflow-hidden bg-[#dee1e6] dark:bg-[#1e1e1e] flex flex-col">
          
          {/* Chrome Tab Bar */}
          <div className="flex items-end pt-2 px-2 gap-1 overflow-x-auto hide-scrollbar">
            {[
              { id: 'overview', icon: 'bi-grid-1x2', title: 'Live Monitor' },
              { id: 'orders', icon: 'bi-bag', title: 'Active Orders' },
              { id: 'menu', icon: 'bi-journal-text', title: 'Restaurant Menu' },
              { id: 'analytics', icon: 'bi-graph-up', title: 'Revenue Analytics' },
              { id: 'profile', icon: 'bi-gear', title: 'Settings & Profile' },
            ].map((tab, index, arr) => {
              const isActive = activeTab === tab.id;
              // To handle Chrome's separator lines properly
              const nextIsActive = arr[index + 1] && activeTab === arr[index + 1].id;
              
              return (
                <div 
                  key={tab.id}
                  onClick={() => setActiveTab(tab.id)}
                  className={`group cursor-pointer flex items-center gap-2 px-3 relative transition-all flex-shrink-0 ${
                    isActive 
                      ? 'bg-slate-50 dark:bg-[#202124] text-slate-800 dark:text-slate-100 rounded-t-xl z-10' 
                      : 'text-slate-600 dark:text-slate-400 hover:bg-[#d0d4d9] dark:hover:bg-[#28292c] rounded-lg'
                  }`}
                  style={{
                    height: isActive ? '36px' : '32px',
                    marginBottom: isActive ? '0' : '2px',
                    width: '240px',
                    maxWidth: '100%'
                  }}
                >
                  {/* Faux Favicon */}
                  <div className={`w-4 h-4 rounded flex items-center justify-center text-xs ${isActive ? 'text-[#c74a09]' : 'text-slate-500'}`}>
                    <i className={`bi ${tab.icon}`}></i>
                  </div>
                  
                  <span className="text-xs font-medium truncate flex-1">{tab.title}</span>
                  
                  {/* Close button */}
                  <div className={`w-5 h-5 rounded-full flex items-center justify-center transition-colors ${
                    isActive 
                      ? 'hover:bg-slate-200 dark:hover:bg-slate-800 text-slate-500 hover:text-slate-800 dark:hover:text-slate-200' 
                      : 'opacity-0 group-hover:opacity-100 hover:bg-[#c2c5ca] dark:hover:bg-[#3a3b3f] text-slate-500'
                  }`}>
                    <i className="bi bi-x text-sm"></i>
                  </div>

                  {/* Chrome Separator Line (Only show if not active, next is not active, and not last tab) */}
                  {!isActive && !nextIsActive && index !== arr.length - 1 && (
                    <div className="absolute right-[-1px] top-1/2 -translate-y-1/2 w-[1px] h-4 bg-slate-400 dark:bg-slate-600 group-hover:opacity-0 transition-opacity"></div>
                  )}
                </div>
              );
            })}
            
            {/* New Tab "+" Button */}
            <div className="w-8 h-8 flex items-center justify-center rounded-full text-slate-600 dark:text-slate-400 hover:bg-[#d0d4d9] dark:hover:bg-[#28292c] ml-1 mb-0.5 cursor-pointer transition-colors flex-shrink-0">
              <i className="bi bi-plus text-xl"></i>
            </div>
          </div>

          {/* Chrome Toolbar / Address Bar */}
          <div className="bg-slate-50 dark:bg-[#202124] px-3 py-1.5 flex items-center gap-3 border-b border-slate-300 dark:border-black/50 relative z-20">
            <div className="flex gap-1 text-slate-500 dark:text-slate-400">
              <div className="w-8 h-8 rounded-full flex items-center justify-center hover:bg-slate-200 dark:hover:bg-[#3a3b3f] cursor-pointer transition-colors">
                <i className="bi bi-arrow-left text-lg"></i>
              </div>
              <div className="w-8 h-8 rounded-full flex items-center justify-center hover:bg-slate-200 dark:hover:bg-[#3a3b3f] cursor-pointer transition-colors opacity-50">
                <i className="bi bi-arrow-right text-lg"></i>
              </div>
              <div className="w-8 h-8 rounded-full flex items-center justify-center hover:bg-slate-200 dark:hover:bg-[#3a3b3f] cursor-pointer transition-colors">
                <i className="bi bi-arrow-clockwise text-base"></i>
              </div>
            </div>
            
            <div className="flex-1 bg-white dark:bg-[#171717] border border-transparent hover:border-slate-300 dark:hover:border-slate-600 rounded-full px-4 py-1.5 flex items-center gap-3 shadow-sm transition-all focus-within:ring-2 focus-within:ring-orange-500/50">
              <div className="w-5 h-5 rounded-full hover:bg-slate-100 dark:hover:bg-slate-800 flex items-center justify-center cursor-pointer -ml-1 text-slate-500">
                <i className="bi bi-info-circle text-[11px]"></i>
              </div>
              <span className="text-[13px] text-slate-800 dark:text-slate-200 font-normal flex-1 truncate">
                localhost:5173/dashboard/<span className="text-slate-500 dark:text-slate-400">{activeTab}</span>
              </span>
              <i className="bi bi-star text-slate-400 hover:text-yellow-500 cursor-pointer transition text-sm"></i>
            </div>

            <div className="flex items-center gap-1.5 text-slate-500 dark:text-slate-400 ml-2">
              <div className="w-8 h-8 rounded-full flex items-center justify-center hover:bg-slate-200 dark:hover:bg-[#3a3b3f] cursor-pointer transition-colors">
                <i className="bi bi-puzzle text-sm"></i>
              </div>
              <div className="w-7 h-7 rounded-full bg-[#c74a09]/20 text-[#c74a09] flex items-center justify-center font-bold text-[11px] uppercase cursor-pointer ml-1 ring-2 ring-transparent hover:ring-[#c74a09]/30 transition-all">
                R
              </div>
              <div className="w-8 h-8 rounded-full flex items-center justify-center hover:bg-slate-200 dark:hover:bg-[#3a3b3f] cursor-pointer transition-colors">
                <i className="bi bi-three-dots-vertical text-base"></i>
              </div>
            </div>
          </div>

          {/* Dynamic Tab Content */}
          <div className="bg-slate-50 dark:bg-slate-950 p-6 md:p-8 min-h-[600px]">
            {renderTabContent()}
          </div>
        </div>
      </div>
    </div>
  );
}

export default RestaurantDashboard;
