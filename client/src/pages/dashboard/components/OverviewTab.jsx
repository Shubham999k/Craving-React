
import toast from 'react-hot-toast';
import { FOOD_ITEMS } from '../../../data/mockData';

const OverviewTab = ({ orderItems, orderStep, addToCart, setSelectedCategory, setActiveTab, totalOrders = 0, totalSpent = 0 }) => {
  return (
    <div className="space-y-8 animate-fadeIn duration-500">
      
      {/* Promo banner */}
      <div className="relative rounded-md bg-gradient-to-r from-red-600 via-orange-500 to-amber-500 p-6 md:p-8 text-white shadow-xl overflow-hidden group">
        <div className="absolute right-0 bottom-0 opacity-15 transform translate-x-12 translate-y-12 group-hover:scale-110 transition duration-500">
          <i className="bi bi-egg-fried text-[220px]"></i>
        </div>
        <div className="relative z-10 max-w-lg">
          <span className="bg-white/20 text-white text-xs font-bold uppercase tracking-wider px-3 py-1 rounded-sm backdrop-blur-md">
            Limited Time Offer
          </span>
          <h2 className="text-3xl font-black mt-3 leading-tight">Get 50% discount using code: <br /><span className="text-yellow-300 underline font-extrabold">CRAVING50</span></h2>
          <p className="mt-2 text-white/90 text-sm">Valid on all pizzas, wraps, sides and milkshakes today only.</p>
          <button
            onClick={() => setActiveTab('menu')}
            className="mt-6 bg-white text-orange-600 hover:bg-orange-50 font-black px-6 py-2.5 rounded shadow-lg transition duration-300 transform hover:scale-105 cursor-pointer"
          >
            Order Now <i className="bi bi-arrow-right-short ml-1"></i>
          </button>
        </div>
      </div>

      {/* Quick Stats Grid */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 md:gap-6">
        {[
          { title: "Total Orders", value: totalOrders.toString(), icon: "bi-bag-check-fill", gradient: "from-blue-500 to-indigo-600", lightBg: "bg-blue-50 dark:bg-blue-950/40 text-blue-600 dark:text-blue-400", action: () => setActiveTab('menu') },
          { title: "Amount Spent", value: `₹${totalSpent.toLocaleString()}`, icon: "bi-wallet2", gradient: "from-emerald-500 to-teal-600", lightBg: "bg-emerald-50 dark:bg-emerald-950/40 text-emerald-600 dark:text-emerald-400", action: () => setActiveTab('analytics') },
          { title: "Saved (Promo)", value: `₹${Math.floor(totalSpent * 0.15).toLocaleString()}`, icon: "bi-tag-fill", gradient: "from-rose-500 to-red-600", lightBg: "bg-rose-50 dark:bg-rose-950/40 text-rose-600 dark:text-rose-400", action: () => setActiveTab('analytics') },
          { title: "Reward Points", value: `${Math.floor(totalSpent * 0.1)} pts`, icon: "bi-trophy-fill", gradient: "from-amber-500 to-orange-600", lightBg: "bg-amber-50 dark:bg-amber-955/40 text-amber-600 dark:text-amber-400", action: () => toast.success(`You have ${Math.floor(totalSpent * 0.1)} Reward Points! Redeem them for discounts at checkout. 🏆`) }
        ].map((stat, idx) => (
          <div key={idx} onClick={stat.action} className="group relative bg-white dark:bg-slate-900 p-6 rounded-md border border-slate-100 dark:border-slate-800 shadow-sm hover:shadow-xl transition-all duration-300 transform hover:scale-105 overflow-hidden cursor-pointer">
            <div className={`absolute top-0 left-0 w-full h-1 bg-gradient-to-r ${stat.gradient} opacity-80`}></div>
            <div className="flex justify-between items-center mb-4">
              <span className="text-xs font-extrabold text-slate-400 dark:text-slate-500 uppercase tracking-widest">{stat.title}</span>
              <div className={`w-10 h-10 rounded-sm flex items-center justify-center transition-all duration-300 group-hover:scale-110 ${stat.lightBg}`}>
                <i className={`bi ${stat.icon} text-lg`}></i>
              </div>
            </div>
            <h3 className="text-2xl font-black text-slate-800 dark:text-slate-100 tracking-tight transition-colors duration-300">{stat.value}</h3>
            <div className="absolute -right-2 -bottom-2 opacity-5 text-6xl transform rotate-12 transition-transform duration-300 group-hover:scale-125 group-hover:rotate-0">
              <i className={`bi ${stat.icon}`}></i>
            </div>
          </div>
        ))}
      </div>

      {/* Recommended & Favorite Cuisines */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        
        {/* Categories Circles */}
        <div className="bg-white dark:bg-slate-900 p-6 rounded-md border border-slate-100 dark:border-slate-800 shadow-sm lg:col-span-2">
          <h3 className="text-lg font-black text-slate-800 dark:text-slate-100 mb-4 flex items-center gap-2">
            <i className="bi bi-tag text-orange-600"></i> Explore Categories
          </h3>
          <div className="grid grid-cols-3 sm:grid-cols-5 gap-4">
            {[
              { name: 'Pizza', icon: '🍕' },
              { name: 'Burger', icon: '🍔' },
              { name: 'Biryani', icon: '🍛' },
              { name: 'Desserts', icon: '🍰' },
              { name: 'Drinks', icon: '🥤' }
            ].map((cat, i) => (
              <button
                key={i}
                onClick={() => {
                  setSelectedCategory(cat.name === 'Drinks' ? 'Beverages' : cat.name);
                  setActiveTab('menu');
                }}
                className="flex flex-col items-center p-3 rounded-sm hover:bg-orange-50 dark:hover:bg-slate-800/50 border border-transparent hover:border-orange-200 dark:hover:border-orange-950/20 transition duration-300 group cursor-pointer"
              >
                <span className="text-3xl mb-2 transform group-hover:scale-110 transition duration-200">{cat.icon}</span>
                <span className="text-xs font-bold text-slate-700 dark:text-slate-300">{cat.name}</span>
              </button>
            ))}
          </div>
        </div>

        {/* Quick Info card */}
        <div className="bg-slate-900 dark:bg-slate-925 text-white p-6 rounded-md shadow-sm flex flex-col justify-between border border-slate-800">
          <div>
            <div className="flex justify-between items-center mb-4">
              <span className="text-xs font-black text-orange-400 uppercase tracking-widest">Active Order Status</span>
              <i className="bi bi-clock-history text-lg"></i>
            </div>
            {orderItems.length > 0 ? (
              <div>
                <p className="text-sm font-medium text-slate-300">Your order is being tracked live.</p>
                <h4 className="text-xl font-bold mt-2 text-white">Status: {['Preparing 👨‍🍳', 'In Transit 🛵', 'Arrived 🍕'][orderStep] || 'Placed 🧾'}</h4>
                <div className="w-full bg-slate-800 h-2 rounded-full mt-4 overflow-hidden">
                  <div 
                    className="bg-gradient-to-r from-orange-500 to-amber-400 h-full transition-all duration-1000"
                    style={{ width: `${(orderStep + 1) * 25}%` }}
                  ></div>
                </div>
              </div>
            ) : (
              <div>
                <p className="text-sm text-slate-400">No active delivery right now.</p>
                <h4 className="text-lg font-bold text-slate-200 mt-2">Ready to place a new order?</h4>
              </div>
            )}
          </div>
          <button
            onClick={() => {
              if (orderItems.length > 0) {
                setActiveTab('tracking');
              } else {
                setActiveTab('menu');
              }
            }}
            className="w-full mt-6 bg-orange-600 hover:bg-orange-500 text-white font-bold py-2 rounded text-xs tracking-wider uppercase transition duration-200 cursor-pointer"
          >
            {orderItems.length > 0 ? "Track Live Order" : "Browse Food Menu"}
          </button>
        </div>

      </div>

      {/* Recommended Food Cards */}
      <div className="space-y-4">
        <h3 className="text-xl font-black text-slate-800 dark:text-slate-100 flex items-center gap-2">
          <i className="bi bi-heart-fill text-red-500"></i> Recommended for You
        </h3>
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
          {FOOD_ITEMS.filter(item => item.rating >= 4.8).slice(0, 3).map(item => (
            <div 
              key={item.id}
              onClick={() => addToCart(item)}
              className="bg-white dark:bg-slate-900 rounded-md overflow-hidden border border-slate-100 dark:border-slate-800 shadow-sm hover:shadow-2xl transition-all duration-300 flex flex-col justify-between group transform hover:scale-105 cursor-pointer"
            >
              <div className="relative overflow-hidden aspect-[4/3] bg-slate-100 dark:bg-slate-850">
                <img
                  src={item.image}
                  alt={item.name}
                  onError={(e) => { e.target.src = '/default-food.png'; e.target.onerror = null; }}
                  className="w-full h-full object-cover transform group-hover:scale-110 transition duration-500 ease-out"
                />
                <span className={`absolute top-4 left-4 px-3 py-1 rounded-sm text-[10px] font-black uppercase tracking-wider flex items-center gap-1.5 backdrop-blur-md shadow-md ${
                  item.type === 'veg' ? 'bg-green-500/90 text-white' : 'bg-red-500/90 text-white'
                }`}>
                  <span className="w-1.5 h-1.5 rounded-full bg-white animate-pulse"></span>
                  {item.type}
                </span>
                <span className="absolute top-4 right-4 bg-white/95 dark:bg-slate-900/95 backdrop-blur-xs px-2.5 py-1 rounded-sm text-xs font-black text-slate-800 dark:text-slate-100 shadow-md flex items-center gap-1">
                  <i className="bi bi-star-fill text-amber-500"></i>
                  <span>{item.rating}</span>
                </span>
              </div>

              <div className="p-5 flex-1 flex flex-col justify-between space-y-4">
                <div>
                  <span className="text-[10px] font-extrabold text-orange-600 uppercase tracking-widest">{item.category}</span>
                  <h4 className="font-extrabold text-slate-800 dark:text-slate-100 text-base mt-1 group-hover:text-[#c74a09] transition-colors line-clamp-1">{item.name}</h4>
                  <p className="text-xs text-slate-400 dark:text-slate-400 mt-1 font-medium leading-relaxed line-clamp-2">{item.desc}</p>
                </div>

                <div className="flex justify-between items-center pt-4 border-t border-slate-100 dark:border-slate-800" onClick={e => e.stopPropagation()}>
                  <div className="flex flex-col">
                    <span className="text-xs text-slate-400 dark:text-slate-500 font-bold leading-none">Price</span>
                    <span className="text-xl font-black text-slate-800 dark:text-slate-100">₹{item.price}</span>
                  </div>
                  <button
                    onClick={() => addToCart(item)}
                    className="bg-slate-900 dark:bg-slate-850 hover:bg-[#c74a09] dark:hover:bg-[#c74a09] text-white font-extrabold text-xs py-3 px-5 rounded flex items-center gap-1.5 transition-all duration-300 shadow-md hover:shadow-orange-200 transform active:scale-95 cursor-pointer"
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

    </div>
  );
};

export default OverviewTab;
