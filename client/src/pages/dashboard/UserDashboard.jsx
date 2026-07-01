import React, { useState, useEffect } from 'react';
import toast from 'react-hot-toast';

const FOOD_ITEMS = [
  {
    id: 1,
    name: "Classic Pepperoni Pizza",
    category: "Pizza",
    price: 349,
    rating: 4.8,
    reviews: 120,
    type: "non-veg",
    desc: "Double pepperoni, mozzarella cheese, and signature tomato sauce.",
    image: "https://images.unsplash.com/photo-1628840042765-356cda07504e?w=500&auto=format&fit=crop&q=60"
  },
  {
    id: 2,
    name: "Truffle Cheese Burger",
    category: "Burger",
    price: 249,
    rating: 4.7,
    reviews: 95,
    type: "veg",
    desc: "Gourmet truffle mayo, grilled paneer patty, aged cheddar, caramelized onions.",
    image: "https://images.unsplash.com/photo-1568901346375-23c9450c58cd?w=500&auto=format&fit=crop&q=60"
  },
  {
    id: 3,
    name: "Hyderabadi Chicken Biryani",
    category: "Biryani",
    price: 399,
    rating: 4.9,
    reviews: 340,
    type: "non-veg",
    desc: "Basmati rice slow cooked with aromatic spices and tender chicken.",
    image: "https://images.unsplash.com/photo-1563379091339-03b21ab4a4f8?w=500&auto=format&fit=crop&q=60"
  },
  {
    id: 4,
    name: "Molten Lava Chocolate Cake",
    category: "Desserts",
    price: 189,
    rating: 4.9,
    reviews: 210,
    type: "veg",
    desc: "Rich chocolate cake with a warm liquid chocolate center.",
    image: "https://images.unsplash.com/photo-1606313564200-e75d5e30476c?w=500&auto=format&fit=crop&q=60"
  },
  {
    id: 5,
    name: "Crunchy Paneer Wrap",
    category: "Wraps",
    price: 199,
    rating: 4.5,
    reviews: 80,
    type: "veg",
    desc: "Crispy paneer strips with sweet chili sauce, shredded lettuce, and onions.",
    image: "https://images.unsplash.com/photo-1626700051175-6518c4793f4f?w=500&auto=format&fit=crop&q=60"
  },
  {
    id: 6,
    name: "Spicy Hakka Noodles",
    category: "Noodles",
    price: 219,
    rating: 4.6,
    reviews: 150,
    type: "veg",
    desc: "Stir-fried noodles with fresh bell peppers, spring onions, and garlic sauce.",
    image: "https://images.unsplash.com/photo-1585032226651-759b368d7246?w=500&auto=format&fit=crop&q=60"
  },
  {
    id: 7,
    name: "Crispy Chicken Wings",
    category: "Sides",
    price: 279,
    rating: 4.7,
    reviews: 110,
    type: "non-veg",
    desc: "Juicy fried chicken wings tossed in spicy Buffalo sauce.",
    image: "https://images.unsplash.com/photo-1567620832903-9fc6debc209f?w=500&auto=format&fit=crop&q=60"
  },
  {
    id: 8,
    name: "Strawberry Cream Shake",
    category: "Beverages",
    price: 159,
    rating: 4.4,
    reviews: 65,
    type: "veg",
    desc: "Thick creamy milkshake made with real strawberries and vanilla ice cream.",
    image: "https://images.unsplash.com/photo-1579954115545-a95591f28bfc?w=500&auto=format&fit=crop&q=60"
  }
];

const PRESET_AVATARS = [
  "https://api.dicebear.com/7.x/adventurer/svg?seed=Felix",
  "https://api.dicebear.com/7.x/adventurer/svg?seed=Aneka",
  "https://api.dicebear.com/7.x/adventurer/svg?seed=Jack",
  "https://api.dicebear.com/7.x/adventurer/svg?seed=Cookie",
  "https://api.dicebear.com/7.x/adventurer/svg?seed=Lucky"
];

const UserDashboard = () => {
  const [user, setUser] = useState({});
  const [activeTab, setActiveTab] = useState('overview'); // overview, menu, tracking, analytics, profile
  const [cart, setCart] = useState([]);
  const [isCartOpen, setIsCartOpen] = useState(false);
  const [searchQuery, setSearchQuery] = useState('');
  const [selectedCategory, setSelectedCategory] = useState('All');
  const [promoCode, setPromoCode] = useState('');
  const [appliedPromo, setAppliedPromo] = useState(null);
  
  // Checkout & Order simulation state
  const [checkoutSuccess, setCheckoutSuccess] = useState(false);
  const [orderStep, setOrderStep] = useState(0); // 0: Placed, 1: Preparing, 2: Out for delivery, 3: Arrived
  const [orderItems, setOrderItems] = useState([]);
  const [orderTimeRemaining, setOrderTimeRemaining] = useState(30); // minutes
  const [isConfettiActive, setIsConfettiActive] = useState(false);

  // Profile Edit fields
  const [editName, setEditName] = useState('');
  const [editEmail, setEditEmail] = useState('');
  const [editPhone, setEditPhone] = useState('');
  const [editAvatar, setEditAvatar] = useState('');
  const [editBio, setEditBio] = useState('Food enthusiast | Always craving something delicious!');

  // Load User Data
  useEffect(() => {
    const userData = JSON.parse(localStorage.getItem("user")) || {};
    setUser(userData);
    setEditName(userData.name || 'Demo User');
    setEditEmail(userData.email || 'demo@example.com');
    setEditPhone(userData.phone || '+1 (555) 019-2834');
    setEditAvatar(userData.profilePicture || PRESET_AVATARS[0]);
  }, []);

  // Update order steps timer simulation
  useEffect(() => {
    let interval;
    if (activeTab === 'tracking' && orderStep < 3) {
      interval = setInterval(() => {
        setOrderStep(prev => {
          if (prev < 3) {
            const nextStep = prev + 1;
            if (nextStep === 1) toast("Chef started preparing your meal! 🍳", { icon: '👨‍🍳' });
            if (nextStep === 2) toast("Delivery agent picked up your order! 🛵", { icon: '🛵' });
            if (nextStep === 3) toast("Order has arrived at your location! 🎉", { icon: '🍕' });
            return nextStep;
          }
          return prev;
        });
        setOrderTimeRemaining(prev => Math.max(0, prev - 10));
      }, 10000); // Progress every 10 seconds for demo purposes
    }
    return () => clearInterval(interval);
  }, [activeTab, orderStep]);

  // Handle Cart Operations
  const addToCart = (item) => {
    setCart(prevCart => {
      const existing = prevCart.find(i => i.id === item.id);
      if (existing) {
        return prevCart.map(i => i.id === item.id ? { ...i, qty: i.qty + 1 } : i);
      }
      toast.success(`${item.name} added to cart! 😋`);
      return [...prevCart, { ...item, qty: 1 }];
    });
  };

  const updateCartQty = (id, delta) => {
    setCart(prevCart => 
      prevCart.map(item => {
        if (item.id === id) {
          const newQty = item.qty + delta;
          return newQty <= 0 ? null : { ...item, qty: newQty };
        }
        return item;
      }).filter(Boolean)
    );
  };

  const handleApplyPromo = () => {
    if (promoCode.toUpperCase() === 'CRAVING50') {
      setAppliedPromo('CRAVING50');
      toast.success("Promo CRAVING50 applied! 50% discount granted.");
    } else {
      toast.error("Invalid Promo Code");
    }
  };

  const calculateSubtotal = () => cart.reduce((acc, curr) => acc + (curr.price * curr.qty), 0);
  const calculateDiscount = () => appliedPromo ? calculateSubtotal() * 0.5 : 0;
  const calculateTotal = () => {
    const sub = calculateSubtotal();
    const disc = calculateDiscount();
    return sub > 0 ? (sub - disc + 30 + 15) : 0; // subtotal - discount + delivery(30) + taxes(15)
  };

  const handleCheckout = () => {
    if (cart.length === 0) {
      toast.error("Cart is empty!");
      return;
    }
    
    // Animate loader
    const loadingToast = toast.loading("Confirming your order with restaurant...");
    setTimeout(() => {
      toast.dismiss(loadingToast);
      setOrderItems([...cart]);
      setCart([]);
      setCheckoutSuccess(true);
      setIsConfettiActive(true);
      setOrderStep(0);
      setOrderTimeRemaining(30);

      // Trigger custom screen/confetti timeout
      setTimeout(() => {
        setIsConfettiActive(false);
      }, 5000);
    }, 1500);
  };

  const goToTrackingFromSuccess = () => {
    setCheckoutSuccess(false);
    setActiveTab('tracking');
  };

  // Update Profile
  const handleUpdateProfile = (e) => {
    e.preventDefault();
    const updatedUser = {
      ...user,
      name: editName,
      email: editEmail,
      phone: editPhone,
      profilePicture: editAvatar
    };
    localStorage.setItem("user", JSON.stringify(updatedUser));
    setUser(updatedUser);
    toast.success("Profile updated successfully!");
    // Dispatch auth-change to update Navbar
    window.dispatchEvent(new Event("auth-change"));
  };

  // Mock analytics spend updates
  const categoriesOrdered = { Pizza: 3, Burger: 5, Biryani: 2, Desserts: 4, Beverages: 6 };
  const monthlySpendData = [1200, 1800, 2200, 1500, 2900, 3400]; // last 6 months

  return (
    <div className="min-h-screen bg-slate-50 flex flex-col md:flex-row relative overflow-hidden">
      
      {/* Confetti Animation overlay for checkout success */}
      {isConfettiActive && (
        <div className="fixed inset-0 z-50 pointer-events-none flex items-center justify-center">
          <div className="absolute inset-0 bg-white/20 backdrop-blur-xs flex items-center justify-center">
            <div className="text-center animate-bounce">
              <span className="text-8xl">🎉</span>
              <h2 className="text-4xl font-extrabold text-[#c74a09] mt-4">Order Placed!</h2>
            </div>
          </div>
        </div>
      )}

      {/* Left Sidebar Navigation */}
      <aside className="w-full md:w-64 bg-white border-r border-slate-200 flex flex-col justify-between shrink-0">
        <div>
          {/* User Profile Summary */}
          <div className="p-6 border-b border-slate-100 flex flex-col items-center text-center">
            <div className="relative group">
              <img
                src={editAvatar}
                alt="Avatar"
                className="w-20 h-20 rounded-full border-4 border-orange-500 shadow-md transform hover:rotate-6 transition duration-300"
              />
              <span className="absolute bottom-0 right-1 bg-green-500 w-4 h-4 rounded-full border-2 border-white"></span>
            </div>
            <h3 className="font-bold text-slate-800 text-lg mt-3">{user.name || "Loading..."}</h3>
            <p className="text-xs text-slate-500 font-medium">{user.email || "email@cravings.com"}</p>
            <div className="mt-2 bg-orange-100 text-orange-800 px-3 py-1 rounded-full text-xs font-semibold">
              <i className="bi bi-star-fill mr-1 text-amber-500"></i> Elite Foodie
            </div>
          </div>

          {/* Navigation Links */}
          <nav className="p-4 space-y-2">
            {[
              { id: 'overview', label: 'Overview', icon: 'bi-grid-1x2-fill' },
              { id: 'menu', label: 'Order Menu', icon: 'bi-egg-fried' },
              { id: 'tracking', label: 'Live Tracking', icon: 'bi-compass-fill', badge: orderItems.length > 0 && orderStep < 3 ? 'Live' : null },
              { id: 'analytics', label: 'Spend & Insights', icon: 'bi-pie-chart-fill' },
              { id: 'profile', label: 'Settings', icon: 'bi-gear-fill' }
            ].map(item => (
              <button
                key={item.id}
                onClick={() => {
                  setActiveTab(item.id);
                  if (item.id === 'menu') setIsCartOpen(false);
                }}
                className={`w-full flex items-center justify-between px-4 py-3 rounded-xl font-semibold text-sm transition-all duration-300 transform cursor-pointer ${
                  activeTab === item.id 
                    ? 'bg-gradient-to-r from-[#c74a09] to-orange-500 text-white shadow-lg scale-[1.02]' 
                    : 'text-slate-600 hover:bg-slate-100 hover:text-slate-900'
                }`}
              >
                <div className="flex items-center gap-3">
                  <i className={`bi ${item.icon} text-lg`}></i>
                  <span>{item.label}</span>
                </div>
                {item.badge && (
                  <span className="bg-red-500 text-white text-[10px] uppercase font-extrabold px-2 py-0.5 rounded-full animate-pulse">
                    {item.badge}
                  </span>
                )}
              </button>
            ))}
          </nav>
        </div>

        {/* Quick Cart Button */}
        <div className="p-4 border-t border-slate-100">
          <button
            onClick={() => setIsCartOpen(true)}
            className="w-full bg-slate-900 hover:bg-slate-800 text-white font-bold py-3 px-4 rounded-xl flex items-center justify-between transition duration-300 transform hover:scale-[1.02] cursor-pointer"
          >
            <div className="flex items-center gap-2">
              <i className="bi bi-cart3 text-lg"></i>
              <span>Your Cart</span>
            </div>
            <span className="bg-orange-500 text-white text-xs font-extrabold h-6 px-2 min-w-[24px] flex items-center justify-center rounded-full">
              {cart.reduce((a, b) => a + b.qty, 0)}
            </span>
          </button>
        </div>
      </aside>

      {/* Main Dashboard Area */}
      <main className="flex-1 p-6 md:p-8 overflow-y-auto max-h-screen pb-24 md:pb-8">
        
        {/* TOP BAR / GREETING */}
        <header className="flex flex-col md:flex-row justify-between items-start md:items-center gap-4 mb-8">
          <div>
            <h1 className="text-3xl font-extrabold text-slate-800 tracking-tight flex items-center gap-2">
              Hey {user.name || "Foodie"}! 👋
            </h1>
            <p className="text-slate-500 font-medium">Ready to treat your taste buds today?</p>
          </div>
          <div className="flex items-center gap-3 bg-white p-2 rounded-2xl shadow-sm border border-slate-100">
            <span className="w-2.5 h-2.5 bg-green-500 rounded-full animate-ping"></span>
            <span className="text-xs text-slate-600 font-semibold">Delivery active in: <b className="text-slate-800">Downtown Area</b></span>
          </div>
        </header>

        {/* TAB CONTENTS */}

        {/* 1. OVERVIEW TAB */}
        {activeTab === 'overview' && (
          <div className="space-y-8 animate-fadeIn duration-500">
            
            {/* Promo banner */}
            <div className="relative rounded-3xl bg-gradient-to-r from-red-600 via-orange-500 to-amber-500 p-6 md:p-8 text-white shadow-xl overflow-hidden group">
              <div className="absolute right-0 bottom-0 opacity-15 transform translate-x-12 translate-y-12 group-hover:scale-110 transition duration-500">
                <i className="bi bi-egg-fried text-[220px]"></i>
              </div>
              <div className="relative z-10 max-w-lg">
                <span className="bg-white/20 text-white text-xs font-bold uppercase tracking-wider px-3 py-1 rounded-full backdrop-blur-md">
                  Limited Time Offer
                </span>
                <h2 className="text-3xl font-black mt-3 leading-tight">Get 50% discount using code: <br /><span className="text-yellow-300 underline font-extrabold">CRAVING50</span></h2>
                <p className="mt-2 text-white/90 text-sm">Valid on all pizzas, wraps, sides and milkshakes today only.</p>
                <button
                  onClick={() => setActiveTab('menu')}
                  className="mt-6 bg-white text-orange-600 hover:bg-orange-50 font-black px-6 py-2.5 rounded-full shadow-lg transition duration-300 transform hover:scale-105 cursor-pointer"
                >
                  Order Now <i className="bi bi-arrow-right-short ml-1"></i>
                </button>
              </div>
            </div>

            {/* Quick Stats Grid */}
            <div className="grid grid-cols-2 lg:grid-cols-4 gap-4">
              {[
                { title: "Total Orders", value: "28", icon: "bi-bag-check-fill", color: "bg-blue-500 text-blue-500" },
                { title: "Amount Spent", value: "₹4,890", icon: "bi-wallet2", color: "bg-emerald-500 text-emerald-500" },
                { title: "Saved (Promo)", value: "₹1,240", icon: "bi-tag-fill", color: "bg-rose-500 text-rose-500" },
                { title: "Reward Points", value: "840 pts", icon: "bi-trophy-fill", color: "bg-amber-500 text-amber-500" }
              ].map((stat, idx) => (
                <div key={idx} className="bg-white p-5 rounded-2xl border border-slate-100 shadow-sm hover:shadow-md transition duration-300 transform hover:-translate-y-1">
                  <div className="flex justify-between items-center mb-3">
                    <span className="text-xs font-bold text-slate-500 uppercase tracking-wider">{stat.title}</span>
                    <div className={`p-2 rounded-xl bg-opacity-10 ${stat.color}`}>
                      <i className={`bi ${stat.icon} text-lg`}></i>
                    </div>
                  </div>
                  <h3 className="text-2xl font-black text-slate-800">{stat.value}</h3>
                </div>
              ))}
            </div>

            {/* Recommended & Favorite Cuisines */}
            <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
              
              {/* Categories Circles */}
              <div className="bg-white p-6 rounded-2xl border border-slate-100 shadow-sm lg:col-span-2">
                <h3 className="text-lg font-black text-slate-800 mb-4 flex items-center gap-2">
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
                      className="flex flex-col items-center p-3 rounded-xl hover:bg-orange-50 border border-transparent hover:border-orange-200 transition duration-300 group cursor-pointer"
                    >
                      <span className="text-3xl mb-2 transform group-hover:scale-110 transition duration-200">{cat.icon}</span>
                      <span className="text-xs font-bold text-slate-700">{cat.name}</span>
                    </button>
                  ))}
                </div>
              </div>

              {/* Quick Info card */}
              <div className="bg-slate-900 text-white p-6 rounded-2xl shadow-sm flex flex-col justify-between">
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
                  onClick={() => orderItems.length > 0 ? setActiveTab('tracking') : setActiveTab('menu')}
                  className="w-full mt-6 bg-orange-600 hover:bg-orange-500 text-white font-bold py-2 rounded-xl text-xs tracking-wider uppercase transition duration-200 cursor-pointer"
                >
                  {orderItems.length > 0 ? "Track Live Order" : "Browse Food Menu"}
                </button>
              </div>

            </div>
          </div>
        )}

        {/* 2. ORDER MENU TAB */}
        {activeTab === 'menu' && (
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
                  className="w-full pl-12 pr-4 py-3 rounded-2xl bg-white border border-slate-200 focus:outline-none focus:border-orange-500 focus:ring-2 focus:ring-orange-100 transition shadow-sm font-semibold"
                />
              </div>

              {/* Category selector pills */}
              <div className="flex gap-2 overflow-x-auto pb-2 scrollbar-none">
                {['All', 'Pizza', 'Burger', 'Biryani', 'Wraps', 'Noodles', 'Sides', 'Beverages', 'Desserts'].map(cat => (
                  <button
                    key={cat}
                    onClick={() => setSelectedCategory(cat)}
                    className={`px-4 py-2 rounded-full font-bold text-xs shrink-0 cursor-pointer transition ${
                      selectedCategory === cat
                        ? 'bg-orange-600 text-white'
                        : 'bg-white text-slate-600 border border-slate-200 hover:bg-slate-50'
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
                .map(item => (
                  <div 
                    key={item.id}
                    className="bg-white rounded-2xl overflow-hidden border border-slate-100 shadow-sm hover:shadow-xl transition-all duration-300 flex flex-col justify-between group transform hover:-translate-y-1"
                  >
                    <div className="relative overflow-hidden aspect-[4/3] bg-slate-100">
                      <img
                        src={item.image}
                        alt={item.name}
                        className="w-full h-full object-cover transform group-hover:scale-110 transition duration-500"
                      />
                      <span className={`absolute top-3 left-3 px-2 py-0.5 rounded text-[10px] font-black uppercase tracking-wider flex items-center gap-1 ${
                        item.type === 'veg' ? 'bg-green-100 text-green-700' : 'bg-red-100 text-red-700'
                      }`}>
                        <span className="w-1.5 h-1.5 rounded-full bg-current"></span>
                        {item.type}
                      </span>
                      <span className="absolute bottom-3 right-3 bg-white/95 px-2 py-0.5 rounded-full text-xs font-black text-slate-800 shadow-md">
                        ★ {item.rating} ({item.reviews})
                      </span>
                    </div>

                    <div className="p-4 space-y-2 flex-1 flex flex-col justify-between">
                      <div>
                        <h4 className="font-extrabold text-slate-800 group-hover:text-[#c74a09] transition-colors">{item.name}</h4>
                        <p className="text-xs text-slate-500 line-clamp-2">{item.desc}</p>
                      </div>

                      <div className="flex justify-between items-center pt-3 border-t border-slate-50">
                        <span className="text-lg font-black text-slate-800">₹{item.price}</span>
                        <button
                          onClick={() => addToCart(item)}
                          className="bg-orange-600 hover:bg-orange-700 text-white font-bold text-xs py-2 px-4 rounded-xl flex items-center gap-1 transition duration-200 transform active:scale-95 cursor-pointer"
                        >
                          <i className="bi bi-plus-lg"></i> Add
                        </button>
                      </div>
                    </div>
                  </div>
                ))}
            </div>
          </div>
        )}

        {/* 3. LIVE ORDER TRACKING TAB */}
        {activeTab === 'tracking' && (
          <div className="bg-white p-6 rounded-3xl border border-slate-100 shadow-sm max-w-3xl mx-auto animate-fadeIn duration-500 space-y-8">
            <h2 className="text-2xl font-black text-slate-800 flex items-center gap-2">
              <i className="bi bi-compass text-orange-600"></i> Track Your Meal
            </h2>

            {orderItems.length > 0 ? (
              <div className="space-y-8">
                {/* Delivery Map Simulation / SVG */}
                <div className="relative bg-slate-900 h-48 rounded-2xl overflow-hidden flex items-center justify-center text-white border border-slate-800 shadow-inner">
                  <div className="absolute inset-0 bg-[radial-gradient(#334155_1px,transparent_1px)] [background-size:16px_16px] opacity-30"></div>
                  
                  {/* SVG Roads & Map */}
                  <svg className="absolute inset-0 w-full h-full opacity-20" xmlns="http://www.w3.org/2000/svg">
                    <line x1="10%" y1="10%" x2="90%" y2="80%" stroke="white" strokeWidth="4" strokeDasharray="5,5" />
                    <line x1="80%" y1="20%" x2="20%" y2="70%" stroke="white" strokeWidth="4" />
                    <circle cx="20%" cy="70%" r="8" fill="#f97316" />
                    <circle cx="80%" cy="20%" r="8" fill="#f97316" />
                  </svg>

                  <div className="relative text-center z-10">
                    <div className="inline-block animate-bounce mb-2">
                      <i className="bi bi-geo-alt-fill text-red-500 text-4xl"></i>
                    </div>
                    <h4 className="font-extrabold text-sm uppercase tracking-wider text-orange-400">Order Delivery Tracker</h4>
                    <p className="text-xs text-slate-300 mt-1">Estimating arrival in <b className="text-white text-sm">{orderTimeRemaining} minutes</b></p>
                  </div>
                </div>

                {/* Tracking Stepper */}
                <div className="grid grid-cols-4 relative pt-4">
                  {/* Line backdrop */}
                  <div className="absolute top-8 left-[12.5%] right-[12.5%] h-1 bg-slate-100 -z-0">
                    <div 
                      className="bg-gradient-to-r from-orange-500 to-[#c74a09] h-full transition-all duration-1000"
                      style={{ width: `${orderStep * 33.3}%` }}
                    ></div>
                  </div>

                  {[
                    { label: "Confirmed", icon: "bi-check-circle-fill", desc: "Order details received" },
                    { label: "Kitchen", icon: "bi-egg-fried", desc: "Prepping food items" },
                    { label: "On the Road", icon: "bi-bicycle", desc: "Valet picked up order" },
                    { label: "Arrived", icon: "bi-house-heart-fill", desc: "Enjoy your food!" }
                  ].map((step, idx) => (
                    <div key={idx} className="flex flex-col items-center text-center relative z-10">
                      <div className={`w-10 h-10 rounded-full flex items-center justify-center shadow transition-all duration-500 ${
                        orderStep >= idx 
                          ? 'bg-[#c74a09] text-white scale-110' 
                          : 'bg-white text-slate-400 border-2 border-slate-200'
                      }`}>
                        <i className={`bi ${step.icon} text-lg`}></i>
                      </div>
                      <h4 className={`text-xs font-black mt-3 ${orderStep >= idx ? 'text-slate-800' : 'text-slate-400'}`}>{step.label}</h4>
                      <p className="text-[10px] text-slate-400 max-w-[100px] mt-0.5 hidden sm:block">{step.desc}</p>
                    </div>
                  ))}
                </div>

                {/* Delivery Agent Details */}
                <div className="bg-slate-50 p-4 rounded-2xl flex items-center justify-between border border-slate-100">
                  <div className="flex items-center gap-3">
                    <img 
                      src="https://api.dicebear.com/7.x/pixel-art/svg?seed=John" 
                      alt="Rider" 
                      className="w-12 h-12 rounded-full border bg-orange-100"
                    />
                    <div>
                      <h5 className="font-extrabold text-slate-800 text-sm">Rohan Sharma</h5>
                      <span className="text-[11px] font-bold text-amber-500"><i className="bi bi-star-fill"></i> 4.9 (120 deliveries)</span>
                    </div>
                  </div>
                  <div className="flex gap-2">
                    <a href="tel:+15550192834" className="w-10 h-10 rounded-xl bg-orange-100 text-orange-600 flex items-center justify-center hover:bg-orange-200 transition">
                      <i className="bi bi-telephone-fill"></i>
                    </a>
                    <button 
                      onClick={() => toast.success("Valet says: 'On my way, traffic is clear!'")}
                      className="w-10 h-10 rounded-xl bg-slate-900 text-white flex items-center justify-center hover:bg-slate-800 transition cursor-pointer"
                    >
                      <i className="bi bi-chat-text-fill"></i>
                    </button>
                  </div>
                </div>

                {/* Simulated Speed Up button */}
                <div className="flex justify-center">
                  <button
                    onClick={() => {
                      if (orderStep < 3) {
                        setOrderStep(p => p + 1);
                        toast.success("Order phase skipped manually! ⚡");
                      } else {
                        toast.success("Meal already delivered! Check your door 🚪");
                      }
                    }}
                    className="bg-orange-100 hover:bg-orange-200 text-orange-700 font-bold px-4 py-2 rounded-full text-xs transition cursor-pointer"
                  >
                    ⚡ Fast Forward Simulation Step
                  </button>
                </div>
              </div>
            ) : (
              <div className="text-center py-12 space-y-4">
                <div className="text-6xl">🚚</div>
                <h4 className="text-xl font-bold text-slate-600">No Active Deliveries</h4>
                <p className="text-sm text-slate-500 max-w-sm mx-auto">You haven't ordered anything recently. Visit the Menu to grab something tasty!</p>
                <button
                  onClick={() => setActiveTab('menu')}
                  className="bg-orange-600 hover:bg-orange-700 text-white font-extrabold px-6 py-2.5 rounded-xl text-sm shadow transition duration-200 cursor-pointer"
                >
                  Order Pizza/Burger
                </button>
              </div>
            )}
          </div>
        )}

        {/* 4. ANALYTICS & INSIGHTS TAB */}
        {activeTab === 'analytics' && (
          <div className="space-y-8 animate-fadeIn duration-500">
            <h2 className="text-2xl font-black text-slate-800 flex items-center gap-2">
              <i className="bi bi-pie-chart text-orange-600"></i> Spend Insights & Habits
            </h2>

            <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
              
              {/* Spend Chart SVG */}
              <div className="bg-white p-6 rounded-3xl border border-slate-100 shadow-sm space-y-4">
                <div>
                  <h3 className="font-extrabold text-slate-800">Monthly Spending (Last 6 Months)</h3>
                  <p className="text-xs text-slate-500">Total spent this half-year: ₹14,990</p>
                </div>

                {/* SVG Graph */}
                <div className="relative h-64 w-full bg-slate-50 rounded-2xl flex items-end p-4 border border-slate-100">
                  <div className="absolute inset-0 flex flex-col justify-between p-4 pointer-events-none opacity-40">
                    <span className="text-[10px] border-b border-dashed border-slate-300 w-full text-right font-semibold">₹4,000</span>
                    <span className="text-[10px] border-b border-dashed border-slate-300 w-full text-right font-semibold">₹2,000</span>
                    <span className="text-[10px] border-b border-dashed border-slate-300 w-full text-right font-semibold">₹0</span>
                  </div>

                  <div className="relative flex justify-around items-end w-full h-44 z-10">
                    {monthlySpendData.map((val, idx) => {
                      const percentage = (val / 4000) * 100;
                      const months = ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun'];
                      return (
                        <div key={idx} className="flex flex-col items-center group w-12 cursor-pointer">
                          {/* Tooltip value */}
                          <span className="opacity-0 group-hover:opacity-100 transition bg-slate-900 text-white text-[10px] px-2 py-1 rounded absolute -top-8 font-black shadow z-20">
                            ₹{val}
                          </span>
                          {/* Animated Pillar */}
                          <div 
                            className="bg-gradient-to-t from-orange-600 to-amber-400 w-8 rounded-t-lg transition-all duration-1000 group-hover:from-orange-700 group-hover:to-amber-500"
                            style={{ height: `${percentage}%` }}
                          ></div>
                          <span className="text-[10px] font-black text-slate-600 mt-2">{months[idx]}</span>
                        </div>
                      );
                    })}
                  </div>
                </div>
              </div>

              {/* Pie Categories Ordered */}
              <div className="bg-white p-6 rounded-3xl border border-slate-100 shadow-sm space-y-4">
                <div>
                  <h3 className="font-extrabold text-slate-800">Favorite Food Categories</h3>
                  <p className="text-xs text-slate-500">Based on your count of ordered dishes</p>
                </div>

                <div className="flex flex-col sm:flex-row items-center justify-around gap-6 py-4">
                  {/* SVG Pie Representation */}
                  <svg className="w-40 h-40 transform -rotate-90" viewBox="0 0 32 32">
                    {/* Pizza: 3 (15%) */}
                    <circle cx="16" cy="16" r="14" fill="transparent" stroke="#f97316" strokeWidth="4" strokeDasharray="15 85" strokeDashoffset="0" />
                    {/* Burger: 5 (25%) */}
                    <circle cx="16" cy="16" r="14" fill="transparent" stroke="#ef4444" strokeWidth="4" strokeDasharray="25 85" strokeDashoffset="-15" />
                    {/* Biryani: 2 (10%) */}
                    <circle cx="16" cy="16" r="14" fill="transparent" stroke="#3b82f6" strokeWidth="4" strokeDasharray="10 85" strokeDashoffset="-40" />
                    {/* Desserts: 4 (20%) */}
                    <circle cx="16" cy="16" r="14" fill="transparent" stroke="#10b981" strokeWidth="4" strokeDasharray="20 85" strokeDashoffset="-50" />
                    {/* Beverages: 6 (30%) */}
                    <circle cx="16" cy="16" r="14" fill="transparent" stroke="#f59e0b" strokeWidth="4" strokeDasharray="30 85" strokeDashoffset="-70" />
                  </svg>

                  <div className="space-y-2">
                    {[
                      { cat: 'Burger', color: 'bg-red-500', count: 5, pct: '25%' },
                      { cat: 'Beverages', color: 'bg-yellow-500', count: 6, pct: '30%' },
                      { cat: 'Desserts', color: 'bg-emerald-500', count: 4, pct: '20%' },
                      { cat: 'Pizza', color: 'bg-orange-500', count: 3, pct: '15%' },
                      { cat: 'Biryani', color: 'bg-blue-500', count: 2, pct: '10%' }
                    ].map((el, i) => (
                      <div key={i} className="flex items-center gap-3 text-xs font-bold text-slate-700">
                        <span className={`w-3 h-3 rounded-full ${el.color}`}></span>
                        <span>{el.cat} ({el.count} times - {el.pct})</span>
                      </div>
                    ))}
                  </div>
                </div>
              </div>

            </div>
          </div>
        )}

        {/* 5. USER SETTINGS / PROFILE TAB */}
        {activeTab === 'profile' && (
          <div className="max-w-2xl mx-auto bg-white p-6 rounded-3xl border border-slate-100 shadow-sm animate-fadeIn duration-500 space-y-6">
            <h2 className="text-2xl font-black text-slate-800 flex items-center gap-2">
              <i className="bi bi-person-gear text-orange-600"></i> Settings & Profile
            </h2>

            <form onSubmit={handleUpdateProfile} className="space-y-6">
              {/* Avatar Selector */}
              <div>
                <label className="block text-sm font-bold text-slate-600 mb-2">Choose Avatar Profile</label>
                <div className="flex gap-4 overflow-x-auto py-2">
                  {PRESET_AVATARS.map((avatar, idx) => (
                    <button
                      key={idx}
                      type="button"
                      onClick={() => setEditAvatar(avatar)}
                      className={`p-1.5 rounded-full border-4 transition-all duration-200 cursor-pointer shrink-0 ${
                        editAvatar === avatar ? 'border-orange-500 scale-105 bg-orange-50' : 'border-transparent hover:border-slate-300'
                      }`}
                    >
                      <img src={avatar} alt={`Avatar-${idx}`} className="w-16 h-16 rounded-full bg-slate-100" />
                    </button>
                  ))}
                </div>
              </div>

              {/* Form Grid */}
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div>
                  <label className="block text-sm font-bold text-slate-700 mb-1.5">Full Name</label>
                  <input
                    type="text"
                    value={editName}
                    onChange={e => setEditName(e.target.value)}
                    required
                    className="w-full px-4 py-2.5 rounded-xl bg-slate-50 border border-slate-200 focus:outline-none focus:border-orange-500 transition font-semibold"
                  />
                </div>

                <div>
                  <label className="block text-sm font-bold text-slate-700 mb-1.5">Email Address</label>
                  <input
                    type="email"
                    value={editEmail}
                    onChange={e => setEditEmail(e.target.value)}
                    required
                    className="w-full px-4 py-2.5 rounded-xl bg-slate-50 border border-slate-200 focus:outline-none focus:border-orange-500 transition font-semibold"
                  />
                </div>

                <div>
                  <label className="block text-sm font-bold text-slate-700 mb-1.5">Phone Number</label>
                  <input
                    type="tel"
                    value={editPhone}
                    onChange={e => setEditPhone(e.target.value)}
                    className="w-full px-4 py-2.5 rounded-xl bg-slate-50 border border-slate-200 focus:outline-none focus:border-orange-500 transition font-semibold"
                  />
                </div>

                <div>
                  <label className="block text-sm font-bold text-slate-700 mb-1.5">Profile Bio</label>
                  <input
                    type="text"
                    value={editBio}
                    onChange={e => setEditBio(e.target.value)}
                    className="w-full px-4 py-2.5 rounded-xl bg-slate-50 border border-slate-200 focus:outline-none focus:border-orange-500 transition font-semibold"
                  />
                </div>
              </div>

              <div className="pt-4 border-t border-slate-100 flex justify-end">
                <button
                  type="submit"
                  className="bg-orange-600 hover:bg-orange-700 text-white font-extrabold px-6 py-2.5 rounded-xl transition cursor-pointer"
                >
                  Save Profile Changes
                </button>
              </div>
            </form>
          </div>
        )}

      </main>

      {/* Floating Shopping Cart Drawer */}
      {isCartOpen && (
        <div className="fixed inset-0 z-40 flex justify-end">
          {/* Backdrop blur overlay */}
          <div 
            onClick={() => setIsCartOpen(false)}
            className="absolute inset-0 bg-black/40 backdrop-blur-xs transition-opacity duration-300"
          ></div>

          {/* Drawer container */}
          <div className="relative w-full max-w-md bg-white h-full shadow-2xl flex flex-col justify-between animate-slideLeft">
            
            {/* Header */}
            <div className="p-6 border-b border-slate-100 flex justify-between items-center">
              <h3 className="text-xl font-black text-slate-800 flex items-center gap-2">
                <i className="bi bi-cart3 text-orange-600"></i> Selected Items
              </h3>
              <button 
                onClick={() => setIsCartOpen(false)}
                className="w-8 h-8 rounded-full bg-slate-100 flex items-center justify-center text-slate-600 hover:bg-slate-200 transition cursor-pointer"
              >
                <i className="bi bi-x-lg"></i>
              </button>
            </div>

            {/* Cart Items List */}
            <div className="flex-1 overflow-y-auto p-6 space-y-4">
              {cart.length > 0 ? (
                cart.map(item => (
                  <div key={item.id} className="flex gap-4 items-center bg-slate-50 p-3 rounded-xl border border-slate-100">
                    <img src={item.image} alt={item.name} className="w-16 h-16 rounded-lg object-cover" />
                    <div className="flex-1 space-y-1">
                      <h4 className="font-extrabold text-sm text-slate-800 line-clamp-1">{item.name}</h4>
                      <p className="text-xs font-bold text-slate-600">₹{item.price}</p>
                      
                      {/* Quantity Selector */}
                      <div className="flex items-center gap-3 pt-1">
                        <button 
                          onClick={() => updateCartQty(item.id, -1)}
                          className="w-6 h-6 rounded-md bg-white border border-slate-200 flex items-center justify-center text-xs font-bold hover:bg-slate-100 cursor-pointer"
                        >
                          -
                        </button>
                        <span className="text-xs font-black text-slate-800">{item.qty}</span>
                        <button 
                          onClick={() => updateCartQty(item.id, 1)}
                          className="w-6 h-6 rounded-md bg-white border border-slate-200 flex items-center justify-center text-xs font-bold hover:bg-slate-100 cursor-pointer"
                        >
                          +
                        </button>
                      </div>
                    </div>
                  </div>
                ))
              ) : (
                <div className="text-center py-12 space-y-3">
                  <div className="text-5xl">🛒</div>
                  <h4 className="font-bold text-slate-500">Your cart is hungry!</h4>
                  <p className="text-xs text-slate-400">Add dishes from our menu to fill it up.</p>
                </div>
              )}
            </div>

            {/* Promocode and Calculations */}
            {cart.length > 0 && (
              <div className="p-6 border-t border-slate-100 bg-slate-50 space-y-4">
                {/* Promocode Input */}
                <div className="flex gap-2">
                  <input
                    type="text"
                    placeholder="Enter promocode (CRAVING50)"
                    value={promoCode}
                    onChange={e => setPromoCode(e.target.value)}
                    className="flex-1 bg-white border border-slate-200 px-3 py-2 rounded-xl text-xs font-semibold focus:outline-none focus:border-orange-500"
                  />
                  <button
                    onClick={handleApplyPromo}
                    className="bg-slate-900 hover:bg-slate-800 text-white font-bold text-xs px-4 py-2 rounded-xl cursor-pointer"
                  >
                    Apply
                  </button>
                </div>

                {/* Costs Detail */}
                <div className="space-y-1.5 text-xs text-slate-600 font-bold">
                  <div className="flex justify-between">
                    <span>Subtotal</span>
                    <span>₹{calculateSubtotal()}</span>
                  </div>
                  {appliedPromo && (
                    <div className="flex justify-between text-green-600">
                      <span>Promo Discount (50%)</span>
                      <span>-₹{calculateDiscount()}</span>
                    </div>
                  )}
                  <div className="flex justify-between">
                    <span>Delivery Charge</span>
                    <span>₹30</span>
                  </div>
                  <div className="flex justify-between">
                    <span>Govt. Taxes</span>
                    <span>₹15</span>
                  </div>
                  <div className="flex justify-between text-base font-black text-slate-800 pt-2 border-t border-slate-200">
                    <span>Grand Total</span>
                    <span>₹{calculateTotal()}</span>
                  </div>
                </div>

                {/* Checkout Trigger Button */}
                <button
                  onClick={handleCheckout}
                  className="w-full bg-[#c74a09] hover:bg-orange-700 text-white font-black py-3.5 rounded-xl text-sm transition tracking-wider uppercase cursor-pointer"
                >
                  Confirm & Place Order
                </button>
              </div>
            )}

          </div>
        </div>
      )}

      {/* Checkout Success Full Screen Modal */}
      {checkoutSuccess && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-slate-900/60 backdrop-blur-sm">
          <div className="bg-white rounded-3xl p-6 md:p-8 max-w-sm w-full text-center space-y-6 shadow-2xl animate-scaleUp">
            <div className="w-16 h-16 bg-green-100 text-green-600 rounded-full flex items-center justify-center text-3xl mx-auto animate-pulse">
              <i className="bi bi-patch-check-fill"></i>
            </div>
            
            <div className="space-y-2">
              <h3 className="text-2xl font-black text-slate-800">Order Confirmed!</h3>
              <p className="text-sm text-slate-500">Your delicious food is being prepared. You can track the delivery in real-time.</p>
            </div>

            <button
              onClick={goToTrackingFromSuccess}
              className="w-full bg-slate-900 hover:bg-slate-800 text-white font-bold py-3 rounded-xl transition cursor-pointer"
            >
              Track Live Order 🛵
            </button>
          </div>
        </div>
      )}

    </div>
  );
};

export default UserDashboard;