import React from 'react';

export default function MenuTab() {
  return (
    <div className="bg-white dark:bg-slate-900 rounded-xl border border-slate-150 dark:border-slate-800 shadow-sm p-6">
      <div className="flex justify-between items-center mb-6">
        <div>
          <h3 className="text-xl font-bold">Manage Menu</h3>
          <p className="text-sm text-slate-500 dark:text-slate-400 mt-1">Add, edit, or remove items from your restaurant menu.</p>
        </div>
        <button className="bg-[#c74a09] text-white px-4 py-2 rounded-lg text-sm font-bold hover:bg-orange-700 transition">
          + Add New Item
        </button>
      </div>
      {/* Placeholder for menu items list */}
      <div className="mt-8 flex items-center justify-center h-48 border-2 border-dashed border-slate-200 dark:border-slate-700 rounded-xl text-slate-400">
        Menu management interface coming soon...
      </div>
    </div>
  );
}
