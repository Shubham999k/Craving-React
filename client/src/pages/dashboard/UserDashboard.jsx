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
  const [editAvatar, setEditAvatar] = useState(null);
  const [editBio, setEditBio] = useState('Food enthusiast | Always craving something delicious!');

  // Analytics Chart States
  const [selectedChart, setSelectedChart] = useState('line'); // 'line' or 'bar'
  const [hoveredIndex, setHoveredIndex] = useState(null);
  const [hoveredSlice, setHoveredSlice] = useState(null);

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
    const existing = cart.find(i => i.id === item.id);
    const newQty = existing ? existing.qty + 1 : 1;
    toast.success(`${item.name} added to cart! (${newQty} in cart) 😋`);

    setCart(prevCart => {
      const exists = prevCart.find(i => i.id === item.id);
      if (exists) {
        return prevCart.map(i => i.id === item.id ? { ...i, qty: i.qty + 1 } : i);
      }
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
    
    const loadingToast = toast.loading("Confirming your order with restaurant...");
    setTimeout(() => {
      toast.dismiss(loadingToast);
      setOrderItems([...cart]);
      setCart([]);
      setIsCartOpen(false);
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
    setIsCartOpen(false);
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
    setActiveTab('overview');
  };

  // Mock analytics spend updates
  const categoriesOrdered = { Pizza: 3, Burger: 5, Biryani: 2, Desserts: 4, Beverages: 6 };
  const monthlySpendData = [1200, 1800, 2200, 1500, 2900, 3400]; // last 6 months

  return (
    <div className="min-h-[calc(100vh-64px)] md:h-[calc(100vh-64px)] bg-slate-50 flex flex-col md:flex-row relative overflow-hidden">
      
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
      <aside className="w-full md:w-64 bg-white border-r border-slate-200 flex flex-col justify-between shrink-0 md:h-full md:overflow-y-auto">
        <div>
          {/* User Profile Summary */}
          <div className="p-6 border-b border-slate-100 flex flex-col items-center text-center">
            <div className="relative group">
              <img
                src={editAvatar || null}
                alt="Avatar"
                className="w-20 h-20 rounded-full border-4 border-orange-500 shadow-md transform hover:rotate-6 transition duration-300"
              />
              <span className="absolute bottom-0 right-1 bg-green-500 w-4 h-4 rounded-full border-2 border-white"></span>
              {/* Pencil Edit Icon at right side of avatar */}
              <button
                onClick={() => {
                  setActiveTab('profile');
                  setIsCartOpen(false);
                }}
                className="absolute top-0 -right-2 bg-white text-slate-700 hover:text-orange-600 w-6 h-6 rounded-full flex items-center justify-center shadow-md border border-slate-200 hover:scale-110 transition cursor-pointer"
                title="Edit Profile"
              >
                <i className="bi bi-pencil-fill text-[11px]"></i>
              </button>
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
              { id: 'analytics', label: 'Spend & Insights', icon: 'bi-pie-chart-fill' }
            ].map(item => (
              <button
                key={item.id}
                onClick={() => {
                  setActiveTab(item.id);
                  setIsCartOpen(false);
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
      <main className={`flex-1 p-6 md:p-8 md:h-full pb-24 md:pb-8 ${activeTab === 'tracking' ? 'overflow-hidden' : 'overflow-y-auto'}`}>
        
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
            <div className="grid grid-cols-2 lg:grid-cols-4 gap-6">
              {[
                { title: "Total Orders", value: "28", icon: "bi-bag-check-fill", gradient: "from-blue-500 to-indigo-600", lightBg: "bg-blue-50 text-blue-600", action: () => setActiveTab('menu') },
                { title: "Amount Spent", value: "₹4,890", icon: "bi-wallet2", gradient: "from-emerald-500 to-teal-600", lightBg: "bg-emerald-50 text-emerald-600", action: () => setActiveTab('analytics') },
                { title: "Saved (Promo)", value: "₹1,240", icon: "bi-tag-fill", gradient: "from-rose-500 to-red-600", lightBg: "bg-rose-50 text-rose-600", action: () => setActiveTab('analytics') },
                { title: "Reward Points", value: "840 pts", icon: "bi-trophy-fill", gradient: "from-amber-500 to-orange-600", lightBg: "bg-amber-50 text-amber-600", action: () => toast.success("You have 840 Reward Points! Redeem them for discounts at checkout. 🏆") }
              ].map((stat, idx) => (
                <div key={idx} onClick={stat.action} className="group relative bg-white p-6 rounded-3xl border border-slate-100 shadow-sm hover:shadow-xl transition-all duration-300 transform hover:-translate-y-1.5 overflow-hidden cursor-pointer">
                  <div className={`absolute top-0 left-0 w-full h-1 bg-gradient-to-r ${stat.gradient} opacity-80`}></div>
                  <div className="flex justify-between items-center mb-4">
                    <span className="text-xs font-extrabold text-slate-400 uppercase tracking-widest">{stat.title}</span>
                    <div className={`w-10 h-10 rounded-2xl flex items-center justify-center transition-all duration-300 group-hover:scale-110 ${stat.lightBg}`}>
                      <i className={`bi ${stat.icon} text-lg`}></i>
                    </div>
                  </div>
                  <h3 className="text-2xl font-black text-slate-800 tracking-tight transition-colors duration-300">{stat.value}</h3>
                  <div className="absolute -right-2 -bottom-2 opacity-5 text-6xl transform rotate-12 transition-transform duration-300 group-hover:scale-125 group-hover:rotate-0">
                    <i className={`bi ${stat.icon}`}></i>
                  </div>
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
                  onClick={() => {
                    setIsCartOpen(false);
                    if (orderItems.length > 0) {
                      setActiveTab('tracking');
                    } else {
                      setActiveTab('menu');
                    }
                  }}
                  className="w-full mt-6 bg-orange-600 hover:bg-orange-500 text-white font-bold py-2 rounded-xl text-xs tracking-wider uppercase transition duration-200 cursor-pointer"
                >
                  {orderItems.length > 0 ? "Track Live Order" : "Browse Food Menu"}
                </button>
              </div>

            </div>

            {/* Recommended Food Cards */}
            <div className="space-y-4">
              <h3 className="text-xl font-black text-slate-800 flex items-center gap-2">
                <i className="bi bi-heart-fill text-red-500"></i> Recommended for You
              </h3>
              <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
                {FOOD_ITEMS.filter(item => item.rating >= 4.8).slice(0, 3).map(item => (
                  <div 
                    key={item.id}
                    onClick={() => addToCart(item)}
                    className="bg-white rounded-3xl overflow-hidden border border-slate-100 shadow-sm hover:shadow-2xl transition-all duration-300 flex flex-col justify-between group transform hover:-translate-y-1.5 cursor-pointer"
                  >
                    <div className="relative overflow-hidden aspect-[4/3] bg-slate-100">
                      <img
                        src={item.image}
                        alt={item.name}
                        className="w-full h-full object-cover transform group-hover:scale-110 transition duration-500 ease-out"
                      />
                      <span className={`absolute top-4 left-4 px-3 py-1 rounded-full text-[10px] font-black uppercase tracking-wider flex items-center gap-1.5 backdrop-blur-md shadow-md ${
                        item.type === 'veg' ? 'bg-green-500/90 text-white' : 'bg-red-500/90 text-white'
                      }`}>
                        <span className="w-1.5 h-1.5 rounded-full bg-white animate-pulse"></span>
                        {item.type}
                      </span>
                      <span className="absolute top-4 right-4 bg-white/95 backdrop-blur-xs px-2.5 py-1 rounded-full text-xs font-black text-slate-800 shadow-md flex items-center gap-1">
                        <i className="bi bi-star-fill text-amber-500"></i>
                        <span>{item.rating}</span>
                      </span>
                    </div>

                    <div className="p-5 flex-1 flex flex-col justify-between space-y-4">
                      <div>
                        <span className="text-[10px] font-extrabold text-orange-600 uppercase tracking-widest">{item.category}</span>
                        <h4 className="font-extrabold text-slate-800 text-base mt-1 group-hover:text-[#c74a09] transition-colors line-clamp-1">{item.name}</h4>
                        <p className="text-xs text-slate-400 mt-1 font-medium leading-relaxed line-clamp-2">{item.desc}</p>
                      </div>

                      <div className="flex justify-between items-center pt-4 border-t border-slate-100" onClick={e => e.stopPropagation()}>
                        <div className="flex flex-col">
                          <span className="text-xs text-slate-400 font-bold leading-none">Price</span>
                          <span className="text-xl font-black text-slate-800">₹{item.price}</span>
                        </div>
                        <button
                          onClick={() => addToCart(item)}
                          className="bg-slate-900 hover:bg-[#c74a09] text-white font-extrabold text-xs py-3 px-5 rounded-2xl flex items-center gap-1.5 transition-all duration-300 shadow-md hover:shadow-orange-200 transform active:scale-95 cursor-pointer"
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
                    className="bg-white rounded-3xl overflow-hidden border border-slate-100 shadow-sm hover:shadow-2xl transition-all duration-300 flex flex-col justify-between group transform hover:-translate-y-1.5"
                  >
                    <div className="relative overflow-hidden aspect-[4/3] bg-slate-100">
                      <img
                        src={item.image}
                        alt={item.name}
                        className="w-full h-full object-cover transform group-hover:scale-110 transition duration-500 ease-out"
                      />
                      {/* Veg / Non-Veg badge with premium styling */}
                      <span className={`absolute top-4 left-4 px-3 py-1 rounded-full text-[10px] font-black uppercase tracking-wider flex items-center gap-1.5 backdrop-blur-md shadow-md ${
                        item.type === 'veg' ? 'bg-green-500/90 text-white' : 'bg-red-500/90 text-white'
                      }`}>
                        <span className="w-1.5 h-1.5 rounded-full bg-white animate-pulse"></span>
                        {item.type}
                      </span>
                      {/* Rating Badge */}
                      <span className="absolute top-4 right-4 bg-white/95 backdrop-blur-xs px-2.5 py-1 rounded-full text-xs font-black text-slate-800 shadow-md flex items-center gap-1">
                        <i className="bi bi-star-fill text-amber-500"></i>
                        <span>{item.rating}</span>
                        <span className="text-[10px] text-slate-400 font-medium">({item.reviews})</span>
                      </span>
                    </div>

                    <div className="p-5 flex-1 flex flex-col justify-between space-y-4">
                      <div>
                        <span className="text-[10px] font-extrabold text-orange-600 uppercase tracking-widest">{item.category}</span>
                        <h4 className="font-extrabold text-slate-800 text-base mt-1 group-hover:text-[#c74a09] transition-colors line-clamp-1">{item.name}</h4>
                        <p className="text-xs text-slate-400 mt-1 font-medium leading-relaxed line-clamp-2">{item.desc}</p>
                      </div>

                      <div className="flex justify-between items-center pt-4 border-t border-slate-100">
                        <div className="flex flex-col">
                          <span className="text-xs text-slate-400 font-bold leading-none">Price</span>
                          <span className="text-xl font-black text-slate-800">₹{item.price}</span>
                        </div>
                        <button
                          onClick={() => addToCart(item)}
                          className="bg-slate-900 hover:bg-[#c74a09] text-white font-extrabold text-xs py-3 px-5 rounded-2xl flex items-center gap-1.5 transition-all duration-300 shadow-md hover:shadow-orange-200 transform active:scale-95 cursor-pointer"
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
        )}

        {/* 3. LIVE ORDER TRACKING TAB */}
        {activeTab === 'tracking' && (
          <div className="bg-white p-5 rounded-3xl border border-slate-100 shadow-sm max-w-3xl mx-auto animate-fadeIn duration-500 space-y-4">
            <h2 className="text-xl font-black text-slate-800 flex items-center gap-2">
              <i className="bi bi-compass text-orange-600"></i> Track Your Meal
            </h2>

            {orderItems.length > 0 ? (
              <div className="space-y-4">
                {/* Delivery Map Simulation / 3D Isometric Screen */}
                <div className="relative bg-[#090d16] h-[250px] rounded-3xl overflow-hidden flex items-center justify-center text-white border border-slate-800 shadow-2xl">
                  {/* CSS Styles injection for animations */}
                  <style>{`
                    @keyframes trackingScanline {
                      0% { transform: translateY(-100%); }
                      100% { transform: translateY(250px); }
                    }
                    @keyframes markerFloat {
                      0%, 100% { transform: translate(-50%, -50%) translate3d(0, 0px, 0) rotateX(-55deg) rotateZ(25deg); }
                      50% { transform: translate(-50%, -50%) translate3d(0, -8px, 0) rotateX(-55deg) rotateZ(25deg); }
                    }
                    @keyframes pulseRadar {
                      0% { transform: scale(0.5); opacity: 0.8; }
                      100% { transform: scale(2.5); opacity: 0; }
                    }
                    @keyframes laserDash {
                      to { stroke-dashoffset: -40; }
                    }
                    @keyframes cameraOrbit {
                      0%, 100% { transform: rotateX(54deg) rotateZ(-22deg) scale(0.96); }
                      50% { transform: rotateX(58deg) rotateZ(-28deg) scale(0.93); }
                    }
                  `}</style>

                  {/* Video Screening CRT Scanline & Glare Effect Overlay */}
                  <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_center,_var(--tw-gradient-stops))] from-teal-500/10 via-transparent to-black/80 pointer-events-none z-20"></div>
                  <div 
                    className="absolute inset-0 w-full h-[2px] bg-gradient-to-r from-transparent via-teal-500/30 to-transparent pointer-events-none z-20"
                    style={{ animation: 'trackingScanline 5s linear infinite' }}
                  ></div>
                  {/* Screen Glare Lines */}
                  <div className="absolute inset-0 bg-gradient-to-tr from-transparent via-white/5 to-transparent pointer-events-none z-20"></div>
                  {/* Subtle Grid Lines Overlay */}
                  <div className="absolute inset-0 bg-[linear-gradient(rgba(18,24,38,0.3)_1px,transparent_1px),linear-gradient(90deg,rgba(18,24,38,0.3)_1px,transparent_1px)] bg-[size:16px_16px] pointer-events-none z-10"></div>

                  {/* HUD / OSD Overlay Details */}
                  <div className="absolute inset-6 pointer-events-none z-20 flex flex-col justify-between font-mono text-[10px] tracking-wider text-teal-400/90">
                    {/* Top Row */}
                    <div className="flex justify-between items-start">
                      <div className="flex items-center gap-2">
                        <span className="flex h-2 w-2 relative">
                          <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-red-500 opacity-75"></span>
                          <span className="relative inline-flex rounded-full h-2 w-2 bg-red-600"></span>
                        </span>
                        <span className="font-extrabold text-red-500 uppercase tracking-widest text-[9px] bg-red-500/10 px-1.5 py-0.5 rounded border border-red-500/20">LIVE CAMERA FEED</span>
                      </div>
                      <div className="text-right flex flex-col gap-0.5">
                        <span>CAM-3D // DOWNTOWN</span>
                        <span>GRID: 28.5283° N, 77.2190° E</span>
                      </div>
                    </div>

                    {/* Camera Corner Borders */}
                    <div className="absolute inset-0 border border-teal-500/10">
                      <div className="absolute top-0 left-0 w-4 h-4 border-t-2 border-l-2 border-teal-500/50"></div>
                      <div className="absolute top-0 right-0 w-4 h-4 border-t-2 border-r-2 border-teal-500/50"></div>
                      <div className="absolute bottom-0 left-0 w-4 h-4 border-b-2 border-l-2 border-teal-500/50"></div>
                      <div className="absolute bottom-0 right-0 w-4 h-4 border-b-2 border-r-2 border-teal-500/50"></div>
                    </div>

                    {/* Bottom Row */}
                    <div className="flex justify-between items-end">
                      <div className="flex gap-4">
                        <div>
                          <span className="text-slate-500 block text-[8px]">ESTIMATED TIME</span>
                          <span className="text-sm font-black text-white">{orderTimeRemaining} MINS</span>
                        </div>
                        <div>
                          <span className="text-slate-500 block text-[8px]">STATUS</span>
                          <span className="text-sm font-black text-amber-400">
                            {['DISPATCHING', 'PREPARING', 'IN TRANSIT', 'ARRIVED'][orderStep]}
                          </span>
                        </div>
                      </div>
                      <div className="text-right">
                        <span className="text-slate-500 block text-[8px]">DRONE SIGNAL</span>
                        <span className="text-teal-400 font-bold"><i className="bi bi-wifi mr-1"></i> 98.4% STABLE</span>
                      </div>
                    </div>
                  </div>

                  {/* 3D Isometric Viewport Container */}
                  <div 
                    className="relative w-[500px] h-[210px] transition-all duration-700 ease-out"
                    style={{
                      perspective: '1200px',
                      transformStyle: 'preserve-3d'
                    }}
                  >
                    {/* The Tilted Ground Map Plane */}
                    <div 
                      className="absolute inset-0 border border-slate-700/40 rounded-2xl transition-all duration-500"
                      style={{
                        background: '#090d16',
                        animation: 'cameraOrbit 20s ease-in-out infinite',
                        boxShadow: '0 30px 60px -15px rgba(0,0,0,0.8), inset 0 0 40px rgba(6,182,212,0.15)',
                        transformStyle: 'preserve-3d'
                      }}
                    >
                      {/* Interactive Radar Ring sweep under map */}
                      <div className="absolute top-1/2 left-1/2 w-36 h-36 -translate-x-1/2 -translate-y-1/2 pointer-events-none">
                        <div className="absolute inset-0 rounded-full border border-cyan-500/10 animate-[pulseRadar_4s_infinite]"></div>
                        <div className="absolute inset-0 rounded-full border border-cyan-500/20 animate-[pulseRadar_4s_infinite_delay-2s]"></div>
                      </div>

                      {/* City Blueprint SVG - Road grid, blocks, river, park zones */}
                      <svg className="absolute inset-0 w-full h-full opacity-60" xmlns="http://www.w3.org/2000/svg">
                        <defs>
                          <pattern id="streetGrid" width="60" height="60" patternUnits="userSpaceOnUse">
                            <rect width="52" height="52" x="4" y="4" rx="6" fill="#0b0f19" stroke="#1e293b" strokeWidth="0.8" />
                          </pattern>
                        </defs>
                        {/* City blocks layout */}
                        <rect width="100%" height="100%" fill="url(#streetGrid)" />
                        
                        {/* Winding Blue River */}
                        <path d="M 0,90 Q 120,80 200,150 T 400,200 T 500,160" fill="none" stroke="#0e3252" strokeWidth="20" strokeLinecap="round" opacity="0.4" />
                        <path d="M 0,90 Q 120,80 200,150 T 400,200 T 500,160" fill="none" stroke="#0369a1" strokeWidth="2" strokeLinecap="round" opacity="0.6" />

                        {/* Park Area */}
                        <rect x="280" y="40" width="80" height="50" rx="10" fill="#064e3b" opacity="0.25" stroke="#059669" strokeWidth="0.5" strokeDasharray="3,3" />
                        <text x="320" y="70" fill="#059669" fontSize="8" fontFamily="monospace" fontWeight="bold" textAnchor="middle" opacity="0.8">CENTRAL RESERVE</text>

                        {/* Neighborhood labels */}
                        <text x="70" y="80" fill="#475569" fontSize="8" fontFamily="monospace" fontWeight="bold" opacity="0.6">SECTOR 4 (BIZ HUB)</text>
                        <text x="380" y="270" fill="#475569" fontSize="8" fontFamily="monospace" fontWeight="bold" opacity="0.6">RESIDENTIAL AREA B</text>

                        {/* Road Names */}
                        <text x="180" y="125" fill="#334155" fontSize="6" fontFamily="monospace" opacity="0.8" transform="rotate(-10 180 125)">BROADWAY BLVD</text>
                        <text x="290" y="220" fill="#334155" fontSize="6" fontFamily="monospace" opacity="0.8">METRO DRIVE</text>

                        {/* Main Laser Route (Broken into completed vs planned segments) */}
                        {/* Completed Road Segment */}
                        <path
                          d="M 60,200 L 150,140 L 250,130 L 320,80 L 440,40"
                          fill="none"
                          stroke="#1e293b"
                          strokeWidth="6"
                          strokeLinecap="round"
                        />
                        {/* Base active trace path */}
                        <path
                          d="M 60,200 L 150,140 L 250,130 L 320,80 L 440,40"
                          fill="none"
                          stroke="#0284c7"
                          strokeWidth="2.5"
                          strokeLinecap="round"
                          className="opacity-20"
                        />
                        
                        {/* Real-time segment highlighting */}
                        {orderStep >= 2 ? (
                          <>
                            {/* Completed neon route */}
                            <path
                              d={orderStep === 3 
                                ? "M 60,200 L 150,140 L 250,130 L 320,80 L 440,40" 
                                : "M 60,200 L 150,140 L 250,130"
                              }
                              fill="none"
                              stroke="#10b981"
                              strokeWidth="2"
                              strokeLinecap="round"
                              opacity="0.8"
                            />
                            {/* In-flight segment pulsing */}
                            {orderStep === 2 && (
                              <path
                                d="M 250,130 L 320,80 L 440,40"
                                fill="none"
                                stroke="#f59e0b"
                                strokeWidth="2.5"
                                strokeLinecap="round"
                                strokeDasharray="6 8"
                                style={{ animation: 'laserDash 2s linear infinite' }}
                              />
                            )}
                          </>
                        ) : (
                          /* Planned route dotted segment */
                          <path
                            d="M 60,200 L 150,140 L 250,130 L 320,80 L 440,40"
                            fill="none"
                            stroke="#06b6d4"
                            strokeWidth="2"
                            strokeLinecap="round"
                            strokeDasharray="4 6"
                          />
                        )}
                      </svg>

                      {/* 1. RESTAURANT Node (Upright glassmorphism design) */}
                      <div 
                        className="absolute flex flex-col items-center"
                        style={{
                          left: '60px',
                          top: '200px',
                          transform: 'translate(-50%, -50%)',
                          transformStyle: 'preserve-3d',
                          animation: 'markerFloat 3s ease-in-out infinite'
                        }}
                      >
                        {/* 3D Standing Card */}
                        <div className="bg-slate-950/90 border border-orange-500/50 backdrop-blur-md px-2 py-1 rounded shadow-[0_4px_12px_rgba(249,115,22,0.15)] flex items-center gap-1.5 min-w-[70px] justify-center">
                          <span className="w-1.5 h-1.5 rounded-full bg-orange-500 animate-pulse"></span>
                          <span className="text-[8px] font-black tracking-wider text-slate-300 font-mono">RESTAURANT</span>
                        </div>
                        {/* Connector Pin Line */}
                        <div className="w-0.5 h-6 bg-gradient-to-t from-orange-500/80 to-transparent"></div>
                        {/* Pulse Ring on floor */}
                        <div className="w-4 h-4 rounded-full bg-orange-500/10 border border-orange-500/40 flex items-center justify-center -mt-2">
                          <span className="w-1.5 h-1.5 rounded-full bg-orange-500"></span>
                        </div>
                      </div>

                      {/* 2. RIDER / SCOOTER Drone Node */}
                      {(() => {
                        // Interpolate positions based on active phase
                        let riderPos = { x: '60px', y: '200px', status: 'WAITING', color: 'border-orange-500/80', glow: 'rgba(249,115,22,0.25)', text: 'text-orange-400' };
                        if (orderStep === 1) {
                          riderPos = { x: '150px', y: '140px', status: 'PREPARING', color: 'border-amber-500/80', glow: 'rgba(245,158,11,0.25)', text: 'text-amber-400' };
                        } else if (orderStep === 2) {
                          riderPos = { x: '260px', y: '100px', status: 'IN ROUTE', color: 'border-cyan-400', glow: 'rgba(34,211,238,0.4)', text: 'text-cyan-400' };
                        } else if (orderStep === 3) {
                          riderPos = { x: '440px', y: '40px', status: 'DELIVERED', color: 'border-emerald-500', glow: 'rgba(16,185,129,0.3)', text: 'text-emerald-400' };
                        }
                        return (
                          <>
                            {/* 3D Camera Crosshair Tracker targeting the rider */}
                            <div 
                              className="absolute pointer-events-none transition-all duration-1000 ease-in-out flex items-center justify-center"
                              style={{
                                left: riderPos.x,
                                top: riderPos.y,
                                width: '60px',
                                height: '60px',
                                transform: 'translate(-50%, -50%)',
                                transformStyle: 'preserve-3d',
                              }}
                            >
                              <div className="absolute inset-0 border border-dashed border-teal-500/20 rounded-full animate-spin"></div>
                              <div className="w-2 h-2 border-t border-l border-teal-400"></div>
                              <div className="absolute w-2 h-2 border-b border-r border-teal-400 bottom-0 right-0"></div>
                            </div>

                            <div 
                              className="absolute flex flex-col items-center z-30"
                              style={{
                                left: riderPos.x,
                                top: riderPos.y,
                                transform: 'translate(-50%, -50%)',
                                transformStyle: 'preserve-3d',
                                animation: 'markerFloat 2.2s ease-in-out infinite',
                                transition: 'all 2s cubic-bezier(0.4, 0, 0.2, 1)'
                              }}
                            >
                              {/* Sleek Glass HUD Tag */}
                              <div className={`bg-slate-950/95 border-2 ${riderPos.color} px-2.5 py-1.5 rounded-lg shadow-[0_8px_16px_${riderPos.glow}] flex flex-col min-w-[95px] text-center`}>
                                <div className="flex items-center gap-1 justify-center">
                                  <span className="relative flex items-center justify-center w-4 h-4 mr-1">
                                    <span className="text-xs animate-pulse">🛸</span>
                                    <span className="absolute -top-1.5 left-[-2px] w-2 h-[1px] bg-cyan-400 opacity-90 animate-spin" style={{ transformOrigin: 'center', animationDuration: '0.2s' }}></span>
                                    <span className="absolute -top-1.5 right-[-2px] w-2 h-[1px] bg-cyan-400 opacity-90 animate-spin" style={{ transformOrigin: 'center', animationDuration: '0.2s' }}></span>
                                  </span>
                                  <span className="text-[8px] font-black text-slate-300 font-mono tracking-wider">ACTIVE DRONE</span>
                                </div>
                                <span className={`text-[9px] font-black font-mono leading-none mt-1 uppercase ${riderPos.text}`}>
                                  {riderPos.status}
                                </span>
                              </div>
                              <div className="w-0.5 h-6 bg-gradient-to-t from-cyan-400/80 to-transparent"></div>
                              <div className="w-5 h-5 rounded-full bg-cyan-400/10 border border-cyan-400/50 flex items-center justify-center -mt-2.5">
                                <span className="w-2 h-2 rounded-full bg-cyan-400 animate-ping absolute"></span>
                                <span className="w-1.5 h-1.5 rounded-full bg-cyan-400"></span>
                              </div>
                            </div>
                          </>
                        );
                      })()}

                      {/* 3. HOME Node (Upright glassmorphism design) */}
                      <div 
                        className="absolute flex flex-col items-center"
                        style={{
                          left: '440px',
                          top: '40px',
                          transform: 'translate(-50%, -50%)',
                          transformStyle: 'preserve-3d',
                          animation: 'markerFloat 3.5s ease-in-out infinite'
                        }}
                      >
                        {/* 3D Standing Card */}
                        <div className="bg-slate-950/90 border border-emerald-500/50 backdrop-blur-md px-2 py-1 rounded shadow-[0_4px_12px_rgba(16,185,129,0.15)] flex items-center gap-1.5 min-w-[70px] justify-center">
                          <span className="w-1.5 h-1.5 rounded-full bg-emerald-500 animate-pulse"></span>
                          <span className="text-[8px] font-black tracking-wider text-slate-300 font-mono">DESTINATION</span>
                        </div>
                        {/* Connector Pin Line */}
                        <div className="w-0.5 h-6 bg-gradient-to-t from-emerald-500/80 to-transparent"></div>
                        {/* Pulse Ring on floor */}
                        <div className="w-4 h-4 rounded-full bg-emerald-500/10 border border-emerald-500/40 flex items-center justify-center -mt-2">
                          <span className="w-1.5 h-1.5 rounded-full bg-emerald-500"></span>
                        </div>
                      </div>

                    </div>
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
            <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4">
              <div>
                <h2 className="text-2xl font-black text-slate-800 flex items-center gap-2">
                  <i className="bi bi-pie-chart text-orange-600"></i> Spend Insights & Habits
                </h2>
                <p className="text-xs text-slate-500 font-medium mt-0.5">Visualize your dining habits and monthly expenses</p>
              </div>

              {/* Chart Selector Segmented Control */}
              <div className="flex bg-slate-100 p-1 rounded-xl border border-slate-200">
                <button
                  onClick={() => setSelectedChart('line')}
                  className={`px-3 py-1.5 rounded-lg text-xs font-bold transition flex items-center gap-1.5 cursor-pointer ${
                    selectedChart === 'line'
                      ? 'bg-white text-orange-600 shadow-sm'
                      : 'text-slate-500 hover:text-slate-800'
                  }`}
                >
                  <i className="bi bi-graph-up"></i> Area Flow
                </button>
                <button
                  onClick={() => setSelectedChart('bar')}
                  className={`px-3 py-1.5 rounded-lg text-xs font-bold transition flex items-center gap-1.5 cursor-pointer ${
                    selectedChart === 'bar'
                      ? 'bg-white text-orange-600 shadow-sm'
                      : 'text-slate-500 hover:text-slate-800'
                  }`}
                >
                  <i className="bi bi-bar-chart-line-fill"></i> Pillars
                </button>
              </div>
            </div>

            <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
              
              {/* Spend Chart SVG */}
              <div className="bg-white p-6 rounded-3xl border border-slate-100 shadow-sm space-y-6 relative overflow-hidden group">
                <div className="flex justify-between items-start">
                  <div>
                    <h3 className="font-black text-slate-800 text-lg">Monthly Spending</h3>
                    <p className="text-xs text-slate-400 font-medium">Last 6 Months Trend</p>
                  </div>
                  <div className="text-right">
                    <span className="text-xs font-bold text-slate-400">Total Spent</span>
                    <h4 className="text-xl font-black text-slate-800">₹14,990</h4>
                  </div>
                </div>

                {/* SVG Graph Container */}
                <div className="relative h-64 w-full bg-gradient-to-b from-slate-50 to-white rounded-2xl flex flex-col justify-between p-4 border border-slate-100/80 shadow-inner overflow-hidden">
                  
                  {/* Grid Lines */}
                  <div className="absolute inset-0 flex flex-col justify-between p-4 py-8 pointer-events-none opacity-45">
                    <div className="border-b border-dashed border-slate-200 w-full flex justify-between">
                      <span></span>
                      <span className="text-[9px] text-slate-400 font-semibold -mt-3.5">₹4,000</span>
                    </div>
                    <div className="border-b border-dashed border-slate-200 w-full flex justify-between">
                      <span></span>
                      <span className="text-[9px] text-slate-400 font-semibold -mt-3.5">₹2,000</span>
                    </div>
                    <div className="border-b border-dashed border-slate-200 w-full flex justify-between">
                      <span></span>
                      <span className="text-[9px] text-slate-400 font-semibold -mt-3.5">₹0</span>
                    </div>
                  </div>

                  {/* Chart display logic */}
                  {selectedChart === 'line' ? (
                    <div className="relative w-full h-44 mt-auto">
                      <svg className="w-full h-full overflow-visible" viewBox="0 0 500 150" preserveAspectRatio="none">
                        <defs>
                          <linearGradient id="chartAreaGrad" x1="0" y1="0" x2="0" y2="1">
                            <stop offset="0%" stopColor="#f97316" stopOpacity="0.4" />
                            <stop offset="100%" stopColor="#f97316" stopOpacity="0.0" />
                          </linearGradient>
                          <linearGradient id="chartLineGrad" x1="0" y1="0" x2="1" y2="0">
                            <stop offset="0%" stopColor="#ea580c" />
                            <stop offset="50%" stopColor="#f97316" />
                            <stop offset="100%" stopColor="#f59e0b" />
                          </linearGradient>
                          <filter id="glow" x="-20%" y="-20%" width="140%" height="140%">
                            <feDropShadow dx="0" dy="4" stdDeviation="4" floodColor="#f97316" floodOpacity="0.3" />
                          </filter>
                        </defs>

                        {/* Spline Area Path */}
                        <path
                          d="M 50,114 C 90,105 90,96 130,96 C 170,96 170,84 210,84 C 250,84 250,105 290,105 C 330,105 330,63 370,63 C 410,63 410,48 450,48 L 450,150 L 50,150 Z"
                          fill="url(#chartAreaGrad)"
                        />

                        {/* Spline Line Path */}
                        <path
                          d="M 50,114 C 90,105 90,96 130,96 C 170,96 170,84 210,84 C 250,84 250,105 290,105 C 330,105 330,63 370,63 C 410,63 410,48 450,48"
                          fill="none"
                          stroke="url(#chartLineGrad)"
                          strokeWidth="3.5"
                          strokeLinecap="round"
                          filter="url(#glow)"
                        />

                        {/* Chart Grid dots / interactive points */}
                        {[
                          { cx: 50, cy: 114, val: 1200 },
                          { cx: 130, cy: 96, val: 1800 },
                          { cx: 210, cy: 84, val: 2200 },
                          { cx: 290, cy: 105, val: 1500 },
                          { cx: 370, cy: 63, val: 2900 },
                          { cx: 450, cy: 48, val: 3400 },
                        ].map((pt, i) => (
                          <g key={i} className="cursor-pointer" onMouseEnter={() => setHoveredIndex(i)} onMouseLeave={() => setHoveredIndex(null)}>
                            {/* Inner Circle Glow */}
                            <circle
                              cx={pt.cx}
                              cy={pt.cy}
                              r={hoveredIndex === i ? 9 : 5}
                              className="fill-orange-500 stroke-white stroke-2 transition-all duration-300"
                            />
                            {hoveredIndex === i && (
                              <circle
                                cx={pt.cx}
                                cy={pt.cy}
                                r="15"
                                className="fill-transparent stroke-orange-500/30 stroke-1 animate-ping"
                              />
                            )}
                          </g>
                        ))}
                      </svg>

                      {/* Tooltip Overlay */}
                      {hoveredIndex !== null && (
                        <div
                          className="absolute bg-slate-900 text-white px-3 py-1.5 rounded-xl text-xs font-black shadow-lg pointer-events-none transition-all duration-200 -translate-x-1/2 -translate-y-full border border-slate-800 flex flex-col items-center"
                          style={{
                            left: `${(hoveredIndex * 80) + 50}px`,
                            top: `${(150 - (monthlySpendData[hoveredIndex] / 4000) * 120) - 20}px`
                          }}
                        >
                          <span className="text-[10px] text-slate-400 uppercase font-bold">
                            {['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun'][hoveredIndex]} Spend
                          </span>
                          <span className="text-sm text-amber-400">₹{monthlySpendData[hoveredIndex]}</span>
                        </div>
                      )}

                      {/* X Axis labels */}
                      <div className="absolute left-0 right-0 bottom-0 flex justify-between px-3 text-[10px] font-black text-slate-500 pointer-events-none">
                        <span>Jan</span>
                        <span>Feb</span>
                        <span>Mar</span>
                        <span>Apr</span>
                        <span>May</span>
                        <span>Jun</span>
                      </div>
                    </div>
                  ) : (
                    <div className="relative flex justify-around items-end w-full h-44 z-10">
                      {monthlySpendData.map((val, idx) => {
                        const percentage = (val / 4000) * 100;
                        const months = ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun'];
                        const isHovered = hoveredIndex === idx;
                        return (
                          <div
                            key={idx}
                            className="flex flex-col items-center group w-12 cursor-pointer relative"
                            onMouseEnter={() => setHoveredIndex(idx)}
                            onMouseLeave={() => setHoveredIndex(null)}
                          >
                            {/* Animated Tooltip */}
                            <span className={`transition-all duration-300 bg-slate-950 text-white text-[10px] px-2.5 py-1.5 rounded-xl absolute -top-12 font-black shadow-lg z-20 flex flex-col items-center border border-slate-800 ${
                              isHovered ? 'scale-100 opacity-100 translate-y-0' : 'scale-90 opacity-0 translate-y-2 pointer-events-none'
                            }`}>
                              <span className="text-[8px] text-slate-400 uppercase tracking-widest">{months[idx]}</span>
                              <span className="text-amber-400 font-black">₹{val}</span>
                            </span>

                            {/* Animated Pillar with Glow */}
                            <div 
                              className={`w-8 rounded-t-xl transition-all duration-500 shadow-md ${
                                isHovered 
                                  ? 'bg-gradient-to-t from-orange-600 to-amber-500 scale-x-110 shadow-orange-200' 
                                  : 'bg-gradient-to-t from-orange-500 to-amber-400'
                              }`}
                              style={{ height: `${percentage}%` }}
                            ></div>
                            <span className={`text-[10px] font-black mt-2 transition-colors duration-200 ${
                              isHovered ? 'text-orange-600' : 'text-slate-500'
                            }`}>{months[idx]}</span>
                          </div>
                        );
                      })}
                    </div>
                  )}

                </div>
              </div>

              {/* Pie/Donut Categories Ordered */}
              <div className="bg-white p-6 rounded-3xl border border-slate-100 shadow-sm space-y-4">
                <div>
                  <h3 className="font-black text-slate-800 text-lg">Category Distribution</h3>
                  <p className="text-xs text-slate-400 font-medium">Favorite dishes based on orders count</p>
                </div>

                <div className="flex flex-col sm:flex-row items-center justify-around gap-6 py-4">
                  {/* SVG Donut Representation */}
                  <div className="relative w-40 h-40 flex items-center justify-center">
                    <svg className="w-full h-full transform -rotate-90" viewBox="0 0 36 36">
                      {/* Grey Track */}
                      <circle cx="18" cy="18" r="15.915" fill="transparent" stroke="#f1f5f9" strokeWidth="3" />

                      {/* Pizza: 3 (15%) */}
                      <circle
                        cx="18"
                        cy="18"
                        r="15.915"
                        fill="transparent"
                        stroke="#f97316"
                        strokeWidth={hoveredSlice === 'Pizza' ? "4.5" : "3.5"}
                        strokeDasharray="15 85"
                        strokeDashoffset="0"
                        className="transition-all duration-300 cursor-pointer"
                        onMouseEnter={() => setHoveredSlice('Pizza')}
                        onMouseLeave={() => setHoveredSlice(null)}
                      />
                      {/* Burger: 5 (25%) */}
                      <circle
                        cx="18"
                        cy="18"
                        r="15.915"
                        fill="transparent"
                        stroke="#ef4444"
                        strokeWidth={hoveredSlice === 'Burger' ? "4.5" : "3.5"}
                        strokeDasharray="25 85"
                        strokeDashoffset="-15"
                        className="transition-all duration-300 cursor-pointer"
                        onMouseEnter={() => setHoveredSlice('Burger')}
                        onMouseLeave={() => setHoveredSlice(null)}
                      />
                      {/* Biryani: 2 (10%) */}
                      <circle
                        cx="18"
                        cy="18"
                        r="15.915"
                        fill="transparent"
                        stroke="#3b82f6"
                        strokeWidth={hoveredSlice === 'Biryani' ? "4.5" : "3.5"}
                        strokeDasharray="10 85"
                        strokeDashoffset="-40"
                        className="transition-all duration-300 cursor-pointer"
                        onMouseEnter={() => setHoveredSlice('Biryani')}
                        onMouseLeave={() => setHoveredSlice(null)}
                      />
                      {/* Desserts: 4 (20%) */}
                      <circle
                        cx="18"
                        cy="18"
                        r="15.915"
                        fill="transparent"
                        stroke="#10b981"
                        strokeWidth={hoveredSlice === 'Desserts' ? "4.5" : "3.5"}
                        strokeDasharray="20 85"
                        strokeDashoffset="-50"
                        className="transition-all duration-300 cursor-pointer"
                        onMouseEnter={() => setHoveredSlice('Desserts')}
                        onMouseLeave={() => setHoveredSlice(null)}
                      />
                      {/* Beverages: 6 (30%) */}
                      <circle
                        cx="18"
                        cy="18"
                        r="15.915"
                        fill="transparent"
                        stroke="#f59e0b"
                        strokeWidth={hoveredSlice === 'Beverages' ? "4.5" : "3.5"}
                        strokeDasharray="30 85"
                        strokeDashoffset="-70"
                        className="transition-all duration-300 cursor-pointer"
                        onMouseEnter={() => setHoveredSlice('Beverages')}
                        onMouseLeave={() => setHoveredSlice(null)}
                      />
                    </svg>

                    {/* Donut Center Label */}
                    <div className="absolute text-center flex flex-col items-center justify-center pointer-events-none">
                      {hoveredSlice ? (
                        <>
                          <span className="text-[10px] font-extrabold text-slate-400 uppercase tracking-wider">{hoveredSlice}</span>
                          <span className="text-xl font-black text-slate-800">
                            {hoveredSlice === 'Burger' && '25%'}
                            {hoveredSlice === 'Beverages' && '30%'}
                            {hoveredSlice === 'Desserts' && '20%'}
                            {hoveredSlice === 'Pizza' && '15%'}
                            {hoveredSlice === 'Biryani' && '10%'}
                          </span>
                        </>
                      ) : (
                        <>
                          <span className="text-[10px] font-extrabold text-slate-400 uppercase tracking-wider">Total</span>
                          <span className="text-xl font-black text-slate-800">20 Dishes</span>
                        </>
                      )}
                    </div>
                  </div>

                  {/* Legends */}
                  <div className="space-y-2.5">
                    {[
                      { cat: 'Burger', color: 'bg-red-500', count: 5, pct: '25%' },
                      { cat: 'Beverages', color: 'bg-yellow-500', count: 6, pct: '30%' },
                      { cat: 'Desserts', color: 'bg-emerald-500', count: 4, pct: '20%' },
                      { cat: 'Pizza', color: 'bg-orange-500', count: 3, pct: '15%' },
                      { cat: 'Biryani', color: 'bg-blue-500', count: 2, pct: '10%' }
                    ].map((el, i) => (
                      <div
                        key={i}
                        className={`flex items-center gap-3 px-3 py-1.5 rounded-xl text-xs font-bold text-slate-700 transition cursor-pointer border ${
                          hoveredSlice === el.cat
                            ? 'bg-slate-50 border-slate-100 scale-105'
                            : 'border-transparent hover:bg-slate-50'
                        }`}
                        onMouseEnter={() => setHoveredSlice(el.cat)}
                        onMouseLeave={() => setHoveredSlice(null)}
                      >
                        <span className={`w-3 h-3 rounded-full shrink-0 ${el.color} ${
                          hoveredSlice === el.cat ? 'ring-4 ring-offset-0 ring-slate-100' : ''
                        }`}></span>
                        <span>{el.cat} <b className="text-slate-400 font-medium">({el.count} - {el.pct})</b></span>
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
          {/* Transparent click-away backdrop (no blur or background color) */}
          <div 
            onClick={() => setIsCartOpen(false)}
            className="absolute inset-0 bg-transparent transition-opacity duration-300"
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