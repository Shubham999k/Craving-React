
import { FOOD_ITEMS } from '../../../data/mockData';



const MenuTab = ({ searchQuery, setSearchQuery, selectedCategory, setSelectedCategory, addToCart, wishlist = [], toggleWishlist }) => {
  const styles = {
    container: "space-y-6 animate-fadeIn duration-500",
    searchBar: {
      wrapper: "flex flex-col md:flex-row gap-4 justify-between items-center",
      inputContainer: "relative flex-1 w-full",
      icon: "bi bi-search absolute left-4 top-1/2 transform -translate-y-1/2 text-slate-400",
      input: "w-full h-12 pl-12 pr-4 rounded-md bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 focus:outline-none focus:border-orange-500 focus:ring-2 focus:ring-orange-100 dark:focus:ring-orange-950/20 text-slate-800 dark:text-slate-100 transition shadow-sm font-semibold"
    },
    categories: {
      wrapper: "flex gap-2 overflow-x-auto scrollbar-none w-full md:w-auto",
      buttonBase: "h-12 px-5 rounded font-bold text-sm shrink-0 cursor-pointer transition flex items-center justify-center",
      buttonActive: "bg-orange-600 text-white",
      buttonInactive: "bg-white dark:bg-slate-900 text-slate-600 dark:text-slate-400 border border-slate-200 dark:border-slate-800 hover:bg-slate-50 dark:hover:bg-slate-850"
    },
    grid: "grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6",
    card: {
      wrapper: "bg-white dark:bg-slate-900 rounded-md overflow-hidden border border-slate-100 dark:border-slate-800 shadow-sm hover:shadow-2xl transition-all duration-300 flex flex-col justify-between group transform hover:-translate-y-1.5 animate-fadeIn",
      imageContainer: "relative overflow-hidden aspect-[4/3] bg-slate-100 dark:bg-slate-800",
      image: "w-full h-full object-cover transform group-hover:scale-110 transition duration-500 ease-out",
      badgesWrapper: "absolute top-4 left-4 flex flex-col gap-2 items-start",
      typeBadge: "px-3 py-1 rounded-sm text-[10px] font-black uppercase tracking-wider flex items-center gap-1.5 backdrop-blur-md shadow-md",
      typeBadgeDot: "w-1.5 h-1.5 rounded-full bg-white animate-pulse",
      outOfStockBadge: "px-2 py-1 rounded-sm bg-slate-900/90 text-white text-[10px] font-black uppercase tracking-wider backdrop-blur-md shadow-md",
      ratingBadge: "absolute top-4 right-4 bg-white/95 dark:bg-slate-900/95 backdrop-blur-xs px-2.5 py-1 rounded-sm text-xs font-black text-slate-800 dark:text-slate-100 shadow-md flex items-center gap-1",
      wishlistBtnBase: "absolute bottom-4 right-4 w-9 h-9 rounded-full flex items-center justify-center shadow-md backdrop-blur-md transition-all duration-300 transform hover:scale-110 active:scale-95 cursor-pointer",
      wishlistActive: "bg-red-500 text-white",
      wishlistInactive: "bg-white/90 dark:bg-slate-900/90 text-slate-400 dark:text-slate-500 hover:text-red-500",
      content: "p-5 flex-1 flex flex-col justify-between space-y-4",
      category: "text-[10px] font-extrabold text-orange-600 uppercase tracking-widest",
      title: "font-extrabold text-slate-800 dark:text-slate-100 text-base mt-1 group-hover:text-[#c74a09] transition-colors line-clamp-1",
      desc: "text-xs text-slate-400 dark:text-slate-400 mt-1 font-medium leading-relaxed line-clamp-2",
      footer: "flex justify-between items-center pt-4 border-t border-slate-100 dark:border-slate-800",
      priceLabel: "text-xs text-slate-400 dark:text-slate-500 font-bold leading-none",
      price: "text-xl font-black text-slate-800 dark:text-slate-100",
      addBtnBase: "font-extrabold text-xs py-3 px-5 rounded flex items-center gap-1.5 transition-all duration-300 shadow-md transform",
      addBtnActive: "bg-slate-900 dark:bg-slate-850 hover:bg-[#c74a09] dark:hover:bg-[#c74a09] text-white hover:shadow-orange-200 dark:hover:shadow-none active:scale-95 cursor-pointer",
      addBtnInactive: "bg-slate-200 dark:bg-slate-800 text-slate-400 dark:text-slate-500 cursor-not-allowed"
    }
  };

  return (
    <div className={styles.container}>
      {/* Search & Filter Bar */}
      <div className={styles.searchBar.wrapper}>
        <div className={styles.searchBar.inputContainer}>
          <i className={styles.searchBar.icon}></i>
          <input
            type="text"
            placeholder="Search yummy foods (Biryani, Pizza, Burger...)"
            value={searchQuery}
            onChange={e => setSearchQuery(e.target.value)}
            className={styles.searchBar.input}
          />
        </div>

        {/* Category selector pills */}
        <div className={styles.categories.wrapper}>
          {['All', 'Pizza', 'Burger', 'Biryani', 'Wraps', 'Noodles', 'Sides', 'Beverages', 'Desserts'].map(cat => (
            <button
              key={cat}
              onClick={() => setSelectedCategory(cat)}
              className={`${styles.categories.buttonBase} ${
                selectedCategory === cat ? styles.categories.buttonActive : styles.categories.buttonInactive
              }`}
            >
              {cat}
            </button>
          ))}
        </div>
      </div>

      {/* Food Cards Grid */}
      <div className={styles.grid}>
        {FOOD_ITEMS
          .filter(item => selectedCategory === 'All' || item.category === selectedCategory)
          .filter(item => item.name.toLowerCase().includes(searchQuery.toLowerCase()))
          .map((item, index) => (
            <div 
              key={item.id}
              className={styles.card.wrapper}
              style={{
                animationDelay: `${index * 80}ms`,
                animationFillMode: 'both'
              }}
            >
              <div className={styles.card.imageContainer}>
                <img
                  src={item.image}
                  alt={item.name}
                  onError={(e) => { e.target.src = '/default-food.png'; e.target.onerror = null; }}
                  className={`${styles.card.image} ${!item.isAvailable ? 'grayscale opacity-70' : ''}`}
                />
                <div className={styles.card.badgesWrapper}>
                  <span className={`${styles.card.typeBadge} ${item.type === 'veg' ? 'bg-green-500/90 text-white' : 'bg-red-500/90 text-white'}`}>
                    <span className={styles.card.typeBadgeDot}></span>
                    {item.type}
                  </span>
                  {!item.isAvailable && (
                    <span className={styles.card.outOfStockBadge}>
                        Out of Stock
                    </span>
                  )}
                </div>
                {/* Rating Badge */}
                <span className={styles.card.ratingBadge}>
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
                  className={`${styles.card.wishlistBtnBase} ${
                    wishlist.some(w => w.id === item.id) ? styles.card.wishlistActive : styles.card.wishlistInactive
                  }`}
                >
                  <i className={`bi ${wishlist.some(w => w.id === item.id) ? 'bi-heart-fill' : 'bi-heart'} text-base`}></i>
                </button>
              </div>

              <div className={styles.card.content}>
                <div>
                  <span className={styles.card.category}>{item.category}</span>
                  <h4 className={styles.card.title}>{item.name}</h4>
                  <p className={styles.card.desc}>{item.desc}</p>
                </div>

                <div className={styles.card.footer}>
                  <div className="flex flex-col">
                    <span className={styles.card.priceLabel}>Price</span>
                    <span className={styles.card.price}>₹{item.price}</span>
                  </div>
                  <button
                    onClick={() => item.isAvailable && addToCart(item)}
                    disabled={!item.isAvailable}
                    className={`${styles.card.addBtnBase} ${
                        item.isAvailable ? styles.card.addBtnActive : styles.card.addBtnInactive
                    }`}
                  >
                    <i className={item.isAvailable ? "bi bi-plus-lg text-sm" : "bi bi-x-lg text-sm"}></i>
                    <span>{item.isAvailable ? 'Add to Cart' : 'Unavailable'}</span>
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
