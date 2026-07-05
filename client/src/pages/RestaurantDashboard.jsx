

function RestaurantDashboard() {
  const mockOrders = [
    { id: '#CR-1049', items: '2x Spicy Paneer Pizza, 1x Coke', total: 649, status: 'In Kitchen' },
    { id: '#CR-1048', items: '1x Veg Cheese Burger, 1x French Fries', total: 299, status: 'Out for Delivery' },
    { id: '#CR-1047', items: '3x Veg Hakka Noodles', total: 450, status: 'Completed' }
  ];

  return (
    <div className="min-h-screen bg-slate-50 dark:bg-slate-950 text-slate-800 dark:text-slate-100 py-16 px-4 transition-colors duration-300">
      <div className="mx-auto max-w-5xl">
        <div className="flex flex-col md:flex-row justify-between items-start md:items-center mb-8 gap-4">
          <div>
            <h1 className="text-3xl font-black">Restaurant Dashboard</h1>
            <p className="text-xs text-slate-500 dark:text-slate-400 mt-1">Manage kitchen prep, live orders, and payouts.</p>
          </div>
          <span className="bg-green-500/10 text-green-600 dark:text-green-400 border border-green-500/30 px-3.5 py-1.5 rounded-full text-xs font-black flex items-center gap-1.5">
            <span className="w-2.5 h-2.5 rounded-full bg-green-500 animate-pulse"></span>
            Accepting Live Orders
          </span>
        </div>

        {/* Dashboard Cards */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-10">
          <div className="bg-white dark:bg-slate-900 p-6 rounded-xl border border-slate-150 dark:border-slate-800 shadow-sm">
            <span className="text-xs font-bold text-slate-450 dark:text-slate-500 uppercase">Today's Revenue</span>
            <h3 className="text-3xl font-black text-[#c74a09] mt-2">₹12,450</h3>
            <span className="text-[10px] text-green-500 font-bold block mt-1">↑ 18% from yesterday</span>
          </div>
          <div className="bg-white dark:bg-slate-900 p-6 rounded-xl border border-slate-150 dark:border-slate-800 shadow-sm">
            <span className="text-xs font-bold text-slate-450 dark:text-slate-500 uppercase">Active Orders</span>
            <h3 className="text-3xl font-black text-slate-800 dark:text-white mt-2">2 Orders</h3>
            <span className="text-[10px] text-slate-400 dark:text-slate-500 block mt-1">Average prep: 14 mins</span>
          </div>
          <div className="bg-white dark:bg-slate-900 p-6 rounded-xl border border-slate-150 dark:border-slate-800 shadow-sm">
            <span className="text-xs font-bold text-slate-450 dark:text-slate-500 uppercase">Weekly Orders</span>
            <h3 className="text-3xl font-black text-slate-800 dark:text-white mt-2">142 Deliveries</h3>
            <span className="text-[10px] text-green-500 font-bold block mt-1">98.4% success rating</span>
          </div>
        </div>

        {/* Live Orders table */}
        <div className="bg-white dark:bg-slate-900 rounded-xl border border-slate-150 dark:border-slate-800 shadow-sm overflow-hidden">
          <div className="p-5 border-b border-slate-100 dark:border-slate-800 flex justify-between items-center">
            <h4 className="font-extrabold text-base">Active Orders Monitor</h4>
            <button className="text-xs text-[#c74a09] hover:underline font-bold cursor-pointer">Refresh Feed</button>
          </div>
          <div className="overflow-x-auto">
            <table className="w-full text-left border-collapse">
              <thead>
                <tr className="bg-slate-50 dark:bg-slate-850 text-slate-450 dark:text-slate-450 text-[10px] font-black uppercase tracking-wider">
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
    </div>
  );
}

export default RestaurantDashboard;
