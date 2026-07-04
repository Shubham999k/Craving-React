import React from 'react';
import { FOOD_ITEMS } from '../UserDashboard';

const MenuTab = ({ searchQuery, setSearchQuery, selectedCategory, setSelectedCategory, addToCart, wishlist = [], toggleWishlist }) => {
  return (
    <div className="space-y-6 animate-fadeIn duration-500">
      {/* Search & Filter Bar */}
      <div className="flex flex-col md:flex-row gap-4 justify-between items-stretch">
        <div className="relative flex-1">
          <i className="bi bi-search absolute left-4 top-1/2 transform -translate-y-1/2 text-slate-400"></i>
          <input
            type="text"
            placeholder="Search yummy foods (Biryani, Pizza, Burger...)"
            value={searchQuery}
            onChange={e => setSearchQuery(e.target.value)}
            className="w-full pl-12 pr-4 py-3 rounded-md bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 focus:outline-none focus:border-orange-500 focus:ring-2 focus:ring-orange-100 dark:focus:ring-orange-950/20 text-slate-800 dark:text-slate-100 transition shadow-sm font-semibold"
          />
        </div>

        {/* Category selector pills */}
        <div className="flex gap-2 overflow-x-auto pb-2 scrollbar-none">
          {['All', 'Pizza', 'Burger', 'Biryani', 'Wraps', 'Noodles', 'Sides', 'Beverages', 'Desserts'].map(cat => (
            <button
              key={cat}
              onClick={() => setSelectedCategory(cat)}
              className={`px-4 py-2 rounded font-bold text-xs shrink-0 cursor-pointer transition ${
                selectedCategory === cat
                  ? 'bg-orange-600 text-white'
                  : 'bg-white dark:bg-slate-900 text-slate-600 dark:text-slate-400 border border-slate-200 dark:border-slate-800 hover:bg-slate-50 dark:hover:bg-slate-850'
              }`}
            >
              {cat}
            </button>
          ))}
        </div>
      </div>

      {/* Food Cards Grid */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
        {FOOD_ITEMS
          .filter(item => selectedCategory === 'All' || item.category === selectedCategory)
          .filter(item => item.name.toLowerCase().includes(searchQuery.toLowerCase()))
          .map((item, index) => (
            <div 
              key={item.id}
              className="bg-white dark:bg-slate-900 rounded-md overflow-hidden border border-slate-100 dark:border-slate-800 shadow-sm hover:shadow-2xl transition-all duration-300 flex flex-col justify-between group transform hover:-translate-y-1.5 animate-fadeIn"
              style={{
                animationDelay: `${index * 80}ms`,
                animationFillMode: 'both'
              }}
            >
              <div className="relative overflow-hidden aspect-[4/3] bg-slate-100 dark:bg-slate-800">
                <img
                  src={item.image}
                  alt={item.name}
                  onError={(e) => { e.target.src = '/default-food.png'; e.target.onerror = null; }}
                  className="w-full h-full object-cover transform group-hover:scale-110 transition duration-500 ease-out"
                />
                {/* Veg / Non-Veg badge with premium styling */}
                <span className={`absolute top-4 left-4 px-3 py-1 rounded-sm text-[10px] font-black uppercase tracking-wider flex items-center gap-1.5 backdrop-blur-md shadow-md ${
                  item.type === 'veg' ? 'bg-green-500/90 text-white' : 'bg-red-500/90 text-white'
                }`}>
                  <span className="w-1.5 h-1.5 rounded-full bg-white animate-pulse"></span>
                  {item.type}
                </span>
                {/* Rating Badge */}
                <span className="absolute top-4 right-4 bg-white/95 dark:bg-slate-900/95 backdrop-blur-xs px-2.5 py-1 rounded-sm text-xs font-black text-slate-800 dark:text-slate-100 shadow-md flex items-center gap-1">
                  <i className="bi bi-star-fill text-amber-500"></i>
                  <span>{item.rating}</span>
                  <span className="text-[10px] text-slate-400 dark:text-slate-500 font-medium">({item.reviews})</span>
                </span>
                
                {/* Wishlist Heart Toggle */}
                <button
                  onClick={(e) => {
                    e.stopPropagation();
                    toggleWishlist(item);
                  }}
                  className={`absolute bottom-4 right-4 w-9 h-9 rounded-full flex items-center justify-center shadow-md backdrop-blur-md transition-all duration-300 transform hover:scale-110 active:scale-95 cursor-pointer ${
                    wishlist.some(w => w.id === item.id)
                      ? 'bg-red-500 text-white'
                      : 'bg-white/90 dark:bg-slate-900/90 text-slate-400 dark:text-slate-500 hover:text-red-500'
                  }`}
                >
                  <i className={`bi ${wishlist.some(w => w.id === item.id) ? 'bi-heart-fill' : 'bi-heart'} text-base`}></i>
                </button>
              </div>

              <div className="p-5 flex-1 flex flex-col justify-between space-y-4">
                <div>
                  <span className="text-[10px] font-extrabold text-orange-600 uppercase tracking-widest">{item.category}</span>
                  <h4 className="font-extrabold text-slate-800 dark:text-slate-100 text-base mt-1 group-hover:text-[#c74a09] transition-colors line-clamp-1">{item.name}</h4>
                  <p className="text-xs text-slate-400 dark:text-slate-400 mt-1 font-medium leading-relaxed line-clamp-2">{item.desc}</p>
                </div>

                <div className="flex justify-between items-center pt-4 border-t border-slate-100 dark:border-slate-800">
                  <div className="flex flex-col">
                    <span className="text-xs text-slate-400 dark:text-slate-500 font-bold leading-none">Price</span>
                    <span className="text-xl font-black text-slate-800 dark:text-slate-100">₹{item.price}</span>
                  </div>
                  <button
                    onClick={() => addToCart(item)}
                    className="bg-slate-900 dark:bg-slate-850 hover:bg-[#c74a09] dark:hover:bg-[#c74a09] text-white font-extrabold text-xs py-3 px-5 rounded flex items-center gap-1.5 transition-all duration-300 shadow-md hover:shadow-orange-200 dark:hover:shadow-none transform active:scale-95 cursor-pointer"
                  >
                    <i className="bi bi-plus-lg text-sm"></i>
                    <span>Add to Cart</span>
                  </button>
                </div>
              </div>
            </div>
          ))}
      </div>
    </div>
  );
};

export default MenuTab;
