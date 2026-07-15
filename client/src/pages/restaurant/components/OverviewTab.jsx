import React from 'react';

const mockOrders = [
  { id: '#CR-1049', items: '2x Spicy Paneer Pizza, 1x Coke', total: 649, status: 'In Kitchen' },
  { id: '#CR-1048', items: '1x Veg Cheese Burger, 1x French Fries', total: 299, status: 'Out for Delivery' },
  { id: '#CR-1047', items: '3x Veg Hakka Noodles', total: 450, status: 'Completed' }
];

export default function OverviewTab() {
  return (
    <div className="space-y-8 animate-in fade-in duration-500">
      
      {/* Quick Stats Grid */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        {[
          { label: 'Today\'s Revenue', value: '₹14,590', icon: 'bi-currency-rupee', color: 'text-green-500', bg: 'bg-green-500/10' },
          { label: 'Active Orders', value: '12', icon: 'bi-box-seam', color: 'text-orange-500', bg: 'bg-orange-500/10' },
          { label: 'Completed Orders', value: '48', icon: 'bi-check-circle', color: 'text-blue-500', bg: 'bg-blue-500/10' }
        ].map((stat, i) => (
          <div key={i} className="bg-white/80 dark:bg-slate-900/80 backdrop-blur-md rounded-2xl p-6 border border-slate-200/50 dark:border-slate-700/50 shadow-sm hover:shadow-lg transition-all duration-300 hover:-translate-y-1">
            <div className="flex items-center gap-4">
              <div className={`w-12 h-12 rounded-xl flex items-center justify-center ${stat.bg} ${stat.color} text-2xl`}>
                <i className={`bi ${stat.icon}`}></i>
              </div>
              <div>
                <p className="text-xs font-bold text-slate-500 uppercase tracking-wider">{stat.label}</p>
                <h3 className="text-2xl font-black text-slate-900 dark:text-white mt-1">{stat.value}</h3>
              </div>
            </div>
          </div>
        ))}
      </div>

      {/* Live Orders Monitor */}
      <div className="bg-white/90 dark:bg-slate-900/90 backdrop-blur-xl rounded-2xl border border-slate-200/50 dark:border-slate-700/50 shadow-xl overflow-hidden">
        <div className="p-6 border-b border-slate-200/50 dark:border-slate-800/50 flex justify-between items-center bg-slate-50/50 dark:bg-slate-800/20">
          <div>
            <h4 className="font-black text-lg text-slate-900 dark:text-white tracking-tight">Active Orders Monitor</h4>
            <p className="text-xs text-slate-500 mt-1">Real-time status of current orders in the pipeline.</p>
          </div>
          <button className="flex items-center gap-2 px-4 py-2 bg-orange-50 dark:bg-orange-500/10 text-orange-600 dark:text-orange-400 rounded-lg text-xs font-bold hover:bg-orange-100 dark:hover:bg-orange-500/20 transition-colors cursor-pointer">
            <i className="bi bi-arrow-clockwise"></i> Refresh
          </button>
        </div>
        
        <div className="overflow-x-auto">
          <table className="w-full text-left border-collapse">
            <thead>
              <tr className="bg-slate-100/50 dark:bg-slate-800/50 text-slate-500 dark:text-slate-400 text-[10px] font-black uppercase tracking-widest">
                <th className="p-5 pl-8">Order ID</th>
                <th className="p-5">Dishes</th>
                <th className="p-5 text-right">Total Amount</th>
                <th className="p-5 text-center pr-8">Status</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-slate-100 dark:divide-slate-800/60 text-sm">
              {mockOrders.map(order => (
                <tr key={order.id} className="hover:bg-slate-50/80 dark:hover:bg-slate-800/40 transition-colors group">
                  <td className="p-5 pl-8 font-black text-slate-900 dark:text-white">
                    <span className="group-hover:text-orange-500 transition-colors">{order.id}</span>
                  </td>
                  <td className="p-5 text-slate-600 dark:text-slate-300 font-medium">{order.items}</td>
                  <td className="p-5 text-right font-bold text-slate-900 dark:text-white">₹{order.total}</td>
                  <td className="p-5 text-center pr-8">
                    <span className={`inline-flex items-center justify-center px-3 py-1.5 rounded-full text-[10px] font-black uppercase tracking-wider ${
                      order.status === 'Completed'
                        ? 'bg-green-100 text-green-700 dark:bg-green-500/20 dark:text-green-400'
                        : order.status === 'Kitchen' || order.status === 'In Kitchen'
                        ? 'bg-amber-100 text-amber-700 dark:bg-amber-500/20 dark:text-amber-400'
                        : 'bg-blue-100 text-blue-700 dark:bg-blue-500/20 dark:text-blue-400'
                    }`}>
                      {order.status === 'In Kitchen' && <span className="w-1.5 h-1.5 rounded-full bg-amber-500 mr-2 animate-pulse"></span>}
                      {order.status === 'Out for Delivery' && <span className="w-1.5 h-1.5 rounded-full bg-blue-500 mr-2"></span>}
                      {order.status === 'Completed' && <span className="w-1.5 h-1.5 rounded-full bg-green-500 mr-2"></span>}
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
