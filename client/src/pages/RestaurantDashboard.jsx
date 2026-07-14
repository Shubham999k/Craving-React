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
    <div className="min-h-screen bg-slate-50 dark:bg-slate-950 text-slate-800 dark:text-slate-100 py-16 px-4 md:px-8 transition-colors duration-300">
      <div className="mx-auto w-full max-w-[1600px]">
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
        <div className="rounded-xl border border-slate-300 dark:border-slate-700 shadow-2xl overflow-hidden bg-slate-900 flex flex-col">
          
          {/* Chrome Tab Bar (Dark Theme) */}
          <div className="flex items-end pt-2 px-2 gap-1 overflow-x-hidden bg-slate-900">
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
                  className={`group cursor-pointer flex items-center gap-3 px-4 relative transition-all min-w-[40px] flex-1 max-w-[240px] ${
                    isActive 
                      ? 'bg-slate-50 dark:bg-slate-950 text-slate-800 dark:text-slate-100 rounded-t-xl z-10' 
                      : 'text-slate-400 hover:bg-slate-800/70 rounded-t-lg'
                  }`}
                  style={{
                    height: isActive ? '38px' : '32px',
                    marginBottom: '0',
                  }}
                >
                  {/* Faux Favicon */}
                  <div className={`w-4 h-4 rounded flex items-center justify-center text-xs shrink-0 ${isActive ? 'text-[#c74a09]' : 'text-slate-500'}`}>
                    <i className={`bi ${tab.icon}`}></i>
                  </div>
                  
                  <span className="text-xs font-semibold truncate flex-1">{tab.title}</span>

                  {/* Chrome Separator Line (Only show if not active, next is not active, and not last tab) */}
                  {!isActive && !nextIsActive && index !== arr.length - 1 && (
                    <div className="absolute right-[-1px] top-1/2 -translate-y-1/2 w-[1px] h-4 bg-slate-700 group-hover:opacity-0 transition-opacity"></div>
                  )}
                </div>
              );
            })}
            
            {/* New Tab "+" Button */}
            <div className="w-8 h-8 flex items-center justify-center rounded-full text-slate-400 hover:bg-slate-800 ml-1 mb-1 cursor-pointer transition-colors shrink-0">
              <i className="bi bi-plus text-xl"></i>
            </div>
          </div>

          {/* Dynamic Tab Content */}
          <div className="bg-slate-50 dark:bg-slate-950 p-6 md:p-8 min-h-[600px] relative z-0">
            {renderTabContent()}
          </div>
        </div>
      </div>
    </div>
  );
}

export default RestaurantDashboard;
