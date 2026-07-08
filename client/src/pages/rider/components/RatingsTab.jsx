import React from 'react';

export default function RatingsTab() {
  return (
    <div className="bg-white dark:bg-slate-900 rounded-xl border border-slate-150 dark:border-slate-800 shadow-sm p-6">
      <h3 className="text-xl font-bold mb-4">Customer Ratings</h3>
      <p className="text-sm text-slate-500 dark:text-slate-400">View feedback, comments, and satisfaction metrics from your deliveries.</p>
      {/* Placeholder for ratings UI */}
      <div className="mt-8 flex items-center justify-center h-48 border-2 border-dashed border-slate-200 dark:border-slate-700 rounded-xl text-slate-400">
        Ratings and reviews coming soon...
      </div>
    </div>
  );
}
