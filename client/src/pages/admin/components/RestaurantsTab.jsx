import React, { useState } from 'react';

function RestaurantsTab() {
  const [filter, setFilter] = useState('all');

  const restaurants = [
    { id: '1', name: 'Spicy Grill', owner: 'David Lee', status: 'Pending', rating: '-', orders: 0, image: 'https://images.unsplash.com/photo-1514933651103-005eec06c04b?w=200&q=80' },
    { id: '2', name: 'Pizza Heaven', owner: 'Sarah Connor', status: 'Approved', rating: '4.8', orders: 1245, image: 'https://images.unsplash.com/photo-1513104890138-7c749659a591?w=200&q=80' },
    { id: '3', name: 'Sushi Master', owner: 'Kenji Sato', status: 'Approved', rating: '4.9', orders: 856, image: 'https://images.unsplash.com/photo-1579871494447-9811cf80d66c?w=200&q=80' },
    { id: '4', name: 'Burger Joint', owner: 'Mike Ross', status: 'Rejected', rating: '-', orders: 0, image: 'https://images.unsplash.com/photo-1568901346375-23c9450c58cd?w=200&q=80' },
  ];

  return (
    <div className="space-y-6 h-full flex flex-col">
      {/* Filters */}
      <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
        <div className="flex gap-2 p-1 bg-slate-200/50 dark:bg-slate-800/50 rounded-xl w-max">
          {['all', 'pending', 'approved', 'rejected'].map((f) => (
            <button
              key={f}
              onClick={() => setFilter(f)}
              className={`px-4 py-2 rounded-lg text-sm font-bold capitalize transition-all ${filter === f
                  ? 'bg-white dark:bg-slate-700 text-slate-900 dark:text-white shadow-sm'
                  : 'text-slate-500 hover:text-slate-700 dark:hover:text-slate-300'
                }`}
            >
              {f}
            </button>
          ))}
        </div>
        <button className="bg-[#c74a09] text-white px-5 py-2.5 rounded-xl font-bold shadow-md shadow-orange-500/20 hover:bg-[#b34006] transition-colors flex items-center gap-2">
          <i className="bi bi-plus-lg"></i> Add Restaurant
        </button>
      </div>

      {/* Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-6 overflow-y-auto pb-4">
        {restaurants.map((restaurant) => (
          <div key={restaurant.id} className="bg-white/70 dark:bg-slate-900/70 backdrop-blur-xl border border-white/50 dark:border-slate-800/50 rounded-3xl p-5 shadow-[0_8px_30px_rgb(0,0,0,0.04)] dark:shadow-[0_8px_30px_rgb(0,0,0,0.2)] hover:shadow-xl hover:border-orange-500/30 transition-all group flex flex-col">
            <div className="flex items-start gap-4 mb-4">
              <div className="w-20 h-20 rounded-2xl overflow-hidden shrink-0 shadow-md">
                <img src={restaurant.image} alt={restaurant.name} className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-500" />
              </div>
              <div className="flex-1 min-w-0">
                <h4 className="text-lg font-black text-slate-900 dark:text-white truncate group-hover:text-[#c74a09] transition-colors">{restaurant.name}</h4>
                <p className="text-sm text-slate-500 truncate mb-2">Owner: {restaurant.owner}</p>
                <span className={`inline-flex items-center px-2 py-0.5 rounded-md text-[10px] font-bold uppercase tracking-wider ${restaurant.status === 'Approved' ? 'bg-green-100 text-green-700 dark:bg-green-500/10 dark:text-green-400' :
                    restaurant.status === 'Pending' ? 'bg-amber-100 text-amber-700 dark:bg-amber-500/10 dark:text-amber-400' :
                      'bg-red-100 text-red-700 dark:bg-red-500/10 dark:text-red-400'
                  }`}>
                  {restaurant.status}
                </span>
              </div>
              <button className="text-slate-400 hover:text-slate-600 dark:hover:text-slate-200 transition-colors">
                <i className="bi bi-three-dots-vertical"></i>
              </button>
            </div>

            <div className="mt-auto pt-4 border-t border-slate-100 dark:border-slate-800 flex items-center justify-between">
              <div className="flex gap-4">
                <div className="text-center">
                  <p className="text-xs text-slate-500 font-semibold mb-0.5">Rating</p>
                  <p className="text-sm font-black text-slate-900 dark:text-white flex items-center gap-1">
                    <i className="bi bi-star-fill text-amber-400 text-xs"></i> {restaurant.rating}
                  </p>
                </div>
                <div className="w-px h-8 bg-slate-200 dark:bg-slate-700"></div>
                <div className="text-center">
                  <p className="text-xs text-slate-500 font-semibold mb-0.5">Orders</p>
                  <p className="text-sm font-black text-slate-900 dark:text-white">{restaurant.orders.toLocaleString()}</p>
                </div>
              </div>
              {restaurant.status === 'Pending' && (
                <div className="flex gap-2">
                  <button className="w-8 h-8 rounded-full bg-red-100 text-red-600 dark:bg-red-500/10 dark:text-red-400 flex items-center justify-center hover:bg-red-200 dark:hover:bg-red-500/20 transition-colors" title="Reject">
                    <i className="bi bi-x-lg text-sm font-bold"></i>
                  </button>
                  <button className="w-8 h-8 rounded-full bg-green-100 text-green-600 dark:bg-green-500/10 dark:text-green-400 flex items-center justify-center hover:bg-green-200 dark:hover:bg-green-500/20 transition-colors" title="Approve">
                    <i className="bi bi-check-lg text-lg font-bold"></i>
                  </button>
                </div>
              )}
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}

export default RestaurantsTab;
