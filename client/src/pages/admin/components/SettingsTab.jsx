import React from 'react';

function SettingsTab() {
  return (
    <div className="max-w-4xl space-y-8 pb-10">
      
      {/* Profile Settings */}
      <section className="bg-white/70 dark:bg-slate-900/70 backdrop-blur-xl border border-white/50 dark:border-slate-800/50 rounded-3xl p-8 shadow-[0_8px_30px_rgb(0,0,0,0.04)]">
        <h3 className="text-xl font-black text-slate-900 dark:text-white mb-6 border-b border-slate-200 dark:border-slate-800 pb-4">Admin Profile</h3>
        
        <div className="flex flex-col md:flex-row gap-8 items-start">
            <div className="flex flex-col items-center gap-4">
                <div className="relative">
                    <img src="https://placehold.co/400x400?text=A" alt="Profile" className="w-32 h-32 rounded-full ring-4 ring-orange-500/30 object-cover" />
                    <button className="absolute bottom-0 right-0 w-10 h-10 bg-[#c74a09] text-white rounded-full flex items-center justify-center shadow-lg hover:scale-110 transition-transform border-2 border-white dark:border-slate-900">
                        <i className="bi bi-camera-fill"></i>
                    </button>
                </div>
                <p className="text-xs font-semibold text-slate-500">Allowed: JPG, PNG (Max 2MB)</p>
            </div>

            <div className="flex-1 w-full space-y-4">
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    <div>
                        <label className="block text-xs font-bold uppercase tracking-wider text-slate-500 mb-2">Full Name</label>
                        <input type="text" defaultValue="Super Admin" className="w-full bg-slate-50 dark:bg-slate-800 border border-slate-200 dark:border-slate-700 rounded-xl px-4 py-3 font-semibold text-slate-900 dark:text-white outline-none focus:border-orange-500 focus:ring-2 focus:ring-orange-500/20 transition-all" />
                    </div>
                    <div>
                        <label className="block text-xs font-bold uppercase tracking-wider text-slate-500 mb-2">Email Address</label>
                        <input type="email" defaultValue="admin@craving.com" className="w-full bg-slate-50 dark:bg-slate-800 border border-slate-200 dark:border-slate-700 rounded-xl px-4 py-3 font-semibold text-slate-900 dark:text-white outline-none focus:border-orange-500 focus:ring-2 focus:ring-orange-500/20 transition-all" />
                    </div>
                </div>
                <div>
                    <label className="block text-xs font-bold uppercase tracking-wider text-slate-500 mb-2">Phone Number</label>
                    <input type="tel" defaultValue="+1234567890" className="w-full bg-slate-50 dark:bg-slate-800 border border-slate-200 dark:border-slate-700 rounded-xl px-4 py-3 font-semibold text-slate-900 dark:text-white outline-none focus:border-orange-500 focus:ring-2 focus:ring-orange-500/20 transition-all" />
                </div>
                <div className="pt-4">
                    <button className="bg-[#c74a09] text-white px-6 py-3 rounded-xl font-bold shadow-md shadow-orange-500/20 hover:bg-[#b34006] transition-colors">
                        Save Changes
                    </button>
                </div>
            </div>
        </div>
      </section>

      {/* System Settings */}
      <section className="bg-white/70 dark:bg-slate-900/70 backdrop-blur-xl border border-white/50 dark:border-slate-800/50 rounded-3xl p-8 shadow-[0_8px_30px_rgb(0,0,0,0.04)]">
        <h3 className="text-xl font-black text-slate-900 dark:text-white mb-6 border-b border-slate-200 dark:border-slate-800 pb-4">System Configurations</h3>
        
        <div className="space-y-6">
            <div className="flex items-center justify-between p-4 bg-slate-50 dark:bg-slate-800 rounded-2xl border border-slate-100 dark:border-slate-700">
                <div>
                    <h4 className="font-bold text-slate-900 dark:text-white">New Registrations</h4>
                    <p className="text-sm text-slate-500 mt-1">Allow new users and restaurants to register.</p>
                </div>
                <label className="relative inline-flex items-center cursor-pointer">
                    <input type="checkbox" className="sr-only peer" defaultChecked />
                    <div className="w-14 h-7 bg-slate-300 peer-focus:outline-none rounded-full peer dark:bg-slate-600 peer-checked:after:translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-[2px] after:left-[2px] after:bg-white after:border-slate-300 after:border after:rounded-full after:h-6 after:w-6 after:transition-all dark:border-slate-600 peer-checked:bg-green-500"></div>
                </label>
            </div>

            <div className="flex items-center justify-between p-4 bg-slate-50 dark:bg-slate-800 rounded-2xl border border-slate-100 dark:border-slate-700">
                <div>
                    <h4 className="font-bold text-slate-900 dark:text-white">Maintenance Mode</h4>
                    <p className="text-sm text-slate-500 mt-1">Take the system offline for updates.</p>
                </div>
                <label className="relative inline-flex items-center cursor-pointer">
                    <input type="checkbox" className="sr-only peer" />
                    <div className="w-14 h-7 bg-slate-300 peer-focus:outline-none rounded-full peer dark:bg-slate-600 peer-checked:after:translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-[2px] after:left-[2px] after:bg-white after:border-slate-300 after:border after:rounded-full after:h-6 after:w-6 after:transition-all dark:border-slate-600 peer-checked:bg-orange-500"></div>
                </label>
            </div>
        </div>
      </section>

    </div>
  );
}

export default SettingsTab;
