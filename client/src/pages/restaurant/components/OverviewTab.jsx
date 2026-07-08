import React from 'react';

const mockOrders = [
  { id: '#CR-1049', items: '2x Spicy Paneer Pizza, 1x Coke', total: 649, status: 'In Kitchen' },
  { id: '#CR-1048', items: '1x Veg Cheese Burger, 1x French Fries', total: 299, status: 'Out for Delivery' },
  { id: '#CR-1047', items: '3x Veg Hakka Noodles', total: 450, status: 'Completed' }
];

export default function OverviewTab() {
  return (
    <div className="space-y-6">
      {/* Live Orders table */}
      <div className="bg-white dark:bg-slate-900 rounded-xl border border-slate-150 dark:border-slate-800 shadow-sm overflow-hidden">
        <div className="p-5 border-b border-slate-100 dark:border-slate-800 flex justify-between items-center">
          <h4 className="font-extrabold text-base">Active Orders Monitor</h4>
          <button className="text-xs text-[#c74a09] hover:underline font-bold cursor-pointer">Refresh Feed</button>
        </div>
        <div className="overflow-x-auto">
          <table className="w-full text-left border-collapse">
            <thead>
              <tr className="bg-slate-50 dark:bg-slate-800 text-slate-500 dark:text-slate-400 text-[10px] font-black uppercase tracking-wider">
                <th className="p-4">Order ID</th>
                <th className="p-4">Dishes</th>
                <th className="p-4 text-right">Total Amount</th>
                <th className="p-4 text-center">Status</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-slate-100 dark:divide-slate-800/60 text-xs">
              {mockOrders.map(order => (
                <tr key={order.id} className="hover:bg-slate-50/50 dark:hover:bg-slate-800/30">
                  <td className="p-4 font-black">{order.id}</td>
                  <td className="p-4 text-slate-600 dark:text-slate-400 font-medium">{order.items}</td>
                  <td className="p-4 text-right font-bold">₹{order.total}</td>
                  <td className="p-4 text-center">
                    <span className={`px-2.5 py-1 rounded text-[9px] font-black uppercase tracking-wider ${
                      order.status === 'Completed'
                        ? 'bg-green-500/10 text-green-600 dark:text-green-400'
                        : order.status === 'Kitchen' || order.status === 'In Kitchen'
                        ? 'bg-amber-500/10 text-amber-600 dark:text-amber-400'
                        : 'bg-blue-500/10 text-blue-600 dark:text-blue-400'
                    }`}>
                      {order.status}
                    </span>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
}
