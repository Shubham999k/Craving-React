import React, { useState } from 'react';

function UsersTab() {
  const [search, setSearch] = useState('');

  const users = [
    { id: '1', name: 'Alice Smith', email: 'alice@example.com', role: 'Customer', status: 'Active', date: '2026-07-20' },
    { id: '2', name: 'Bob Jones', email: 'bob@example.com', role: 'Rider', status: 'Active', date: '2026-07-21' },
    { id: '3', name: 'Charlie Brown', email: 'charlie@example.com', role: 'Customer', status: 'Blocked', date: '2026-07-19' },
    { id: '4', name: 'David Lee', email: 'david@example.com', role: 'Restaurant', status: 'Active', date: '2026-07-22' },
  ];

  return (
    <div className="bg-white/70 dark:bg-slate-900/70 backdrop-blur-xl border border-white/50 dark:border-slate-800/50 rounded-3xl shadow-[0_8px_30px_rgb(0,0,0,0.04)] overflow-hidden flex flex-col h-full">
      {/* Header & Controls */}
      <div className="p-6 md:p-8 border-b border-slate-200/50 dark:border-slate-800/50 flex flex-col md:flex-row md:items-center justify-between gap-4">
        <div>
          <h3 className="text-2xl font-black text-slate-900 dark:text-white tracking-tight">User Management</h3>
          <p className="text-sm font-medium text-slate-500">Manage all registered users, riders, and customers.</p>
        </div>
        
        <div className="flex items-center gap-3">
            <div className="relative">
                <i className="bi bi-search absolute left-4 top-1/2 -translate-y-1/2 text-slate-400"></i>
                <input 
                    type="text" 
                    placeholder="Search users..." 
                    className="pl-11 pr-4 py-2.5 rounded-xl border border-slate-200 dark:border-slate-700 bg-white dark:bg-slate-800 text-sm font-medium outline-none focus:border-orange-500 focus:ring-2 focus:ring-orange-500/20 w-64 transition-all"
                    value={search}
                    onChange={(e) => setSearch(e.target.value)}
                />
            </div>
            <button className="bg-slate-100 dark:bg-slate-800 text-slate-700 dark:text-slate-200 px-4 py-2.5 rounded-xl font-bold hover:bg-slate-200 dark:hover:bg-slate-700 transition-colors flex items-center gap-2">
                <i className="bi bi-funnel"></i> Filter
            </button>
        </div>
      </div>

      {/* Table */}
      <div className="flex-1 overflow-x-auto">
        <table className="w-full text-left border-collapse min-w-[800px]">
          <thead>
            <tr className="bg-slate-50/50 dark:bg-slate-800/50">
              <th className="px-8 py-5 text-xs font-black uppercase tracking-wider text-slate-500">User Details</th>
              <th className="px-8 py-5 text-xs font-black uppercase tracking-wider text-slate-500">Role</th>
              <th className="px-8 py-5 text-xs font-black uppercase tracking-wider text-slate-500">Status</th>
              <th className="px-8 py-5 text-xs font-black uppercase tracking-wider text-slate-500">Joined</th>
              <th className="px-8 py-5 text-xs font-black uppercase tracking-wider text-slate-500 text-right">Actions</th>
            </tr>
          </thead>
          <tbody className="divide-y divide-slate-200/50 dark:divide-slate-800/50">
            {users.map((user) => (
              <tr key={user.id} className="hover:bg-slate-50/50 dark:hover:bg-slate-800/30 transition-colors group cursor-pointer">
                <td className="px-8 py-4">
                    <div className="flex items-center gap-3">
                        <div className="w-10 h-10 rounded-full bg-gradient-to-tr from-slate-200 to-slate-300 dark:from-slate-700 dark:to-slate-600 flex items-center justify-center text-slate-700 dark:text-slate-300 font-bold shadow-sm">
                            {user.name.charAt(0)}
                        </div>
                        <div>
                            <p className="text-sm font-bold text-slate-900 dark:text-white group-hover:text-orange-600 dark:group-hover:text-orange-400 transition-colors">{user.name}</p>
                            <p className="text-xs text-slate-500">{user.email}</p>
                        </div>
                    </div>
                </td>
                <td className="px-8 py-4">
                  <span className={`inline-flex items-center px-2.5 py-1 rounded-lg text-xs font-bold border ${
                      user.role === 'Customer' ? 'bg-blue-50 text-blue-700 border-blue-200 dark:bg-blue-500/10 dark:text-blue-400 dark:border-blue-500/20' :
                      user.role === 'Rider' ? 'bg-purple-50 text-purple-700 border-purple-200 dark:bg-purple-500/10 dark:text-purple-400 dark:border-purple-500/20' :
                      'bg-orange-50 text-orange-700 border-orange-200 dark:bg-orange-500/10 dark:text-orange-400 dark:border-orange-500/20'
                  }`}>
                    {user.role}
                  </span>
                </td>
                <td className="px-8 py-4">
                  <div className="flex items-center gap-2">
                    <div className={`w-2 h-2 rounded-full ${user.status === 'Active' ? 'bg-green-500 animate-pulse' : 'bg-red-500'}`}></div>
                    <span className="text-sm font-semibold text-slate-700 dark:text-slate-300">{user.status}</span>
                  </div>
                </td>
                <td className="px-8 py-4 text-sm font-medium text-slate-600 dark:text-slate-400">
                  {user.date}
                </td>
                <td className="px-8 py-4 text-right">
                  <button className="text-slate-400 hover:text-[#c74a09] transition-colors p-2 rounded-lg hover:bg-orange-50 dark:hover:bg-orange-500/10">
                    <i className="bi bi-three-dots-vertical text-lg"></i>
                  </button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>

      {/* Pagination Placeholder */}
      <div className="p-4 border-t border-slate-200/50 dark:border-slate-800/50 flex items-center justify-between text-sm text-slate-500">
          <span>Showing 1 to 4 of 4 entries</span>
          <div className="flex gap-1">
              <button className="w-8 h-8 rounded-lg border border-slate-200 dark:border-slate-700 flex items-center justify-center hover:bg-slate-100 dark:hover:bg-slate-800 disabled:opacity-50" disabled><i className="bi bi-chevron-left"></i></button>
              <button className="w-8 h-8 rounded-lg bg-[#c74a09] text-white flex items-center justify-center font-bold shadow-md shadow-orange-500/20">1</button>
              <button className="w-8 h-8 rounded-lg border border-slate-200 dark:border-slate-700 flex items-center justify-center hover:bg-slate-100 dark:hover:bg-slate-800 disabled:opacity-50" disabled><i className="bi bi-chevron-right"></i></button>
          </div>
      </div>
    </div>
  );
}

export default UsersTab;
