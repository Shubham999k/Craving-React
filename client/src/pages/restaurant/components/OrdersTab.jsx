import React from 'react';

export default function OrdersTab() {
  return (
    <div className="bg-white dark:bg-slate-900 rounded-xl border border-slate-150 dark:border-slate-800 shadow-sm p-6">
      <h3 className="text-xl font-bold mb-4">Manage Orders</h3>
      <p className="text-sm text-slate-500 dark:text-slate-400">View and update the status of your current and past orders.</p>
      {/* Placeholder for orders management UI */}
      <div className="mt-8 flex items-center justify-center h-48 border-2 border-dashed border-slate-200 dark:border-slate-700 rounded-xl text-slate-400">
        Orders management interface coming soon...
      </div>
    </div>
  );
}
