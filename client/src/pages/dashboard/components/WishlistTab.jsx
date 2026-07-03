import React from 'react';

const WishlistTab = ({ wishlist, toggleWishlist, addToCart, setActiveTab }) => {
  return (
    <div className="space-y-6 animate-fadeIn duration-500">
      <div>
        <h2 className="text-2xl font-black text-slate-800 dark:text-slate-100 flex items-center gap-2">
          <i className="bi bi-heart-fill text-red-500"></i> My Wishlist
        </h2>
        <p className="text-xs text-slate-500 dark:text-slate-400 font-medium mt-0.5">Your favorite cravings saved in one place</p>
      </div>

      {wishlist.length === 0 ? (
        <div className="bg-white dark:bg-slate-900 rounded-md p-12 text-center border border-slate-100 dark:border-slate-800 shadow-sm max-w-xl mx-auto space-y-4">
          <div className="text-6xl">❤️</div>
          <h3 className="text-lg font-bold text-slate-700 dark:text-slate-200">Your Wishlist is Empty</h3>
          <p className="text-xs text-slate-400 dark:text-slate-400 max-w-xs mx-auto leading-relaxed">
            Browse our delicious order menu and save your favorite dishes to order them instantly later!
          </p>
          <button
            onClick={() => setActiveTab('menu')}
            className="bg-orange-600 hover:bg-orange-700 text-white font-extrabold px-6 py-2.5 rounded text-xs shadow transition duration-200 cursor-pointer"
          >
            Explore Food Menu
          </button>
        </div>
      ) : (
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
          {wishlist.map(item => (
            <div 
              key={item.id}
              className="bg-white dark:bg-slate-900 rounded-md overflow-hidden border border-slate-100 dark:border-slate-800 shadow-sm hover:shadow-2xl transition-all duration-300 flex flex-col justify-between group transform hover:-translate-y-1.5"
            >
              <div className="relative overflow-hidden aspect-[4/3] bg-slate-100 dark:bg-slate-800">
                <img
                  src={item.image}
                  alt={item.name}
                  onError={(e) => { e.target.src = '/default-food.png'; e.target.onerror = null; }}
                  className="w-full h-full object-cover transform group-hover:scale-110 transition duration-500 ease-out"
                />
                {/* Veg / Non-Veg badge */}
                <span className={`absolute top-4 left-4 px-3 py-1 rounded-sm text-[10px] font-black uppercase tracking-wider flex items-center gap-1.5 backdrop-blur-md shadow-md ${
                  item.type === 'veg' ? 'bg-green-500/90 text-white' : 'bg-red-500/90 text-white'
                }`}>
                  <span className="w-1.5 h-1.5 rounded-full bg-white animate-pulse"></span>
                  {item.type}
                </span>
                
                {/* Wishlist Heart Button - Active Red */}
                <button
                  onClick={() => toggleWishlist(item)}
                  className="absolute bottom-4 right-4 w-9 h-9 rounded-full flex items-center justify-center shadow-md bg-red-500 text-white transition-all duration-300 transform hover:scale-110 active:scale-95 cursor-pointer"
                >
                  <i className="bi bi-heart-fill text-base animate-pulse"></i>
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
      )}
    </div>
  );
};

export default WishlistTab;
