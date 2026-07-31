import React, { useState, useEffect } from 'react';
import { createPortal } from 'react-dom';
import toast from 'react-hot-toast';
import api from '../../config/api.config';

// Import Sub-Components
import OverviewTab from './components/OverviewTab';
import MenuTab from './components/MenuTab';
import TrackingTab from './components/TrackingTab';
import AnalyticsTab from './components/AnalyticsTab';
import ProfileTab from './components/ProfileTab';
import WishlistTab from './components/WishlistTab';




const UserDashboard = () => {
  const [user, setUser] = useState(() => {
    try {
      return JSON.parse(localStorage.getItem("user")) || {};
    } catch {
      return {};
    }
  });
  const [isSidebarOpen, setIsSidebarOpen] = useState(false);
  const [activeTab, setActiveTab] = useState('overview'); // overview, menu, tracking, analytics, profile, wishlist
  const [wishlist, setWishlist] = useState([]);
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
  const [editName, setEditName] = useState(() => {
    try {
      const u = JSON.parse(localStorage.getItem("user"));
      return u?.name || 'Demo User';
    } catch {
      return 'Demo User';
    }
  });
  const [editEmail, setEditEmail] = useState(() => {
    try {
      const u = JSON.parse(localStorage.getItem("user"));
      return u?.email || 'demo@example.com';
    } catch {
      return 'demo@example.com';
    }
  });
  const [editPhone, setEditPhone] = useState(() => {
    try {
      const u = JSON.parse(localStorage.getItem("user"));
      return u?.phone || '+1 (555) 019-2834';
    } catch {
      return '+1 (555) 019-2834';
    }
  });
  const [editAvatar, setEditAvatar] = useState(() => {
    try {
      const u = JSON.parse(localStorage.getItem("user"));
      return u?.profilePicture || PRESET_AVATARS[0];
    } catch {
      return PRESET_AVATARS[0];
    }
  });
  const [editBio, setEditBio] = useState('Food enthusiast | Always craving something delicious!');

  // Analytics Chart States
  const [selectedChart, setSelectedChart] = useState('line'); // 'line' or 'bar'
  const [hoveredIndex, setHoveredIndex] = useState(null);
  const [hoveredSlice, setHoveredSlice] = useState(null);
  const [orders, setOrders] = useState([]);

  // Load User Data & Trigger Cart
  useEffect(() => {
    // Handle cart trigger from restaurant page redirect
    const triggerCart = localStorage.getItem("dashboard_cart_trigger");
    if (triggerCart) {
      try {
        const parsed = JSON.parse(triggerCart);
        if (parsed && parsed.length > 0) {
          setCart(parsed);
          setIsCartOpen(true);
        }
      } catch (e) {
        console.error("Error loading triggered cart:", e);
      }
      localStorage.removeItem("dashboard_cart_trigger");
    }
  }, []);

  const fetchOrders = async (userId) => {
    if (!userId) return;
    try {
      const response = await api.get(`/orders/user/${userId}`);
      if (response.data && response.data.data) {
        setOrders(response.data.data);
      }
    } catch (error) {
      console.error("Error fetching orders:", error);
    }
  };

  useEffect(() => {
    if (user && user._id) {
      fetchOrders(user._id);
    }
  }, [user]);

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

  const toggleWishlist = (item) => {
    setWishlist(prev => {
      const exists = prev.find(i => i.id === item.id);
      if (exists) {
        toast.success(`Removed ${item.name} from Wishlist! 💔`);
        return prev.filter(i => i.id !== item.id);
      } else {
        toast.success(`Added ${item.name} to Wishlist! ❤️`);
        return [...prev, item];
      }
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

  const handleCheckout = async () => {
    if (cart.length === 0) {
      toast.error("Cart is empty!");
      return;
    }
    
    const loadingToast = toast.loading("Confirming your order with restaurant...");
    try {
      const subtotal = calculateSubtotal();
      const discount = calculateDiscount();
      const total = calculateTotal();

      const orderPayload = {
        userId: user._id || "64b0f1a9e4b0a42a1c2d3e4f", // Fallback guest ObjectId if _id is not found
        items: cart.map(item => ({
          id: item.id.toString(),
          name: item.name,
          price: item.price,
          qty: item.qty,
          category: item.category,
          image: item.image
        })),
        subtotal,
        discount,
        deliveryFee: 30,
        tax: 15,
        total
      };

      const response = await api.post("/orders", orderPayload);
      toast.dismiss(loadingToast);

      if (response.data && response.data.data) {
        setOrderItems([...cart]);
        setCart([]);
        setIsCartOpen(false);
        setCheckoutSuccess(true);
        setIsConfettiActive(true);
        setOrderStep(0);
        setOrderTimeRemaining(30);

        // Fetch updated orders history
        if (user && user._id) {
          fetchOrders(user._id);
        }

        // Trigger custom screen/confetti timeout
        setTimeout(() => {
          setIsConfettiActive(false);
        }, 5000);
      }
    } catch (error) {
      toast.dismiss(loadingToast);
      toast.error("Failed to confirm order. Please try again.");
      console.error("Order creation error:", error);
    }
  };

  const goToTrackingFromSuccess = () => {
    setCheckoutSuccess(false);
    setIsCartOpen(false);
    setActiveTab('tracking');
  };

  // Update Profile
  const handleUpdateProfile = async (e) => {
    e.preventDefault();
    
    if (!user || !user._id) {
      toast.error("User not found in session");
      return;
    }

    const loadingToast = toast.loading("Updating profile...");
    
    try {
      const payload = {
        userId: user._id,
        fullName: editName,
        phone: editPhone,
        profilePicture: editAvatar
      };

      const response = await api.put("/auth/update-profile", payload);
      
      const updatedUser = {
        ...user,
        name: editName,
        email: editEmail,
        phone: editPhone,
        profilePicture: response.data.data.profilePic?.url || editAvatar
      };
      
      localStorage.setItem("user", JSON.stringify(updatedUser));
      setUser(updatedUser);
      toast.dismiss(loadingToast);
      toast.success("Profile updated successfully!");
      
      // Dispatch auth-change to update Navbar
      window.dispatchEvent(new Event("auth-change"));
      setActiveTab('overview');
      
    } catch (error) {
      toast.dismiss(loadingToast);
      console.error("Profile update error:", error);
      toast.error(error.response?.data?.message || "Failed to update profile");
    }
  };

  // Dynamic analytics spend updates calculated from real order history
  const analyticsData = React.useMemo(() => {
    // Dynamic months setup (last 6 months)
    const months = [];
    const spendByMonth = {};
    for (let i = 5; i >= 0; i--) {
      const d = new Date();
      d.setMonth(d.getMonth() - i);
      const monthName = d.toLocaleString('default', { month: 'short' });
      months.push(monthName);
      spendByMonth[monthName] = 0;
    }

    let totalSpent = 0;
    orders.forEach(order => {
      const orderDate = new Date(order.createdAt);
      const monthName = orderDate.toLocaleString('default', { month: 'short' });
      if (spendByMonth[monthName] !== undefined) {
        spendByMonth[monthName] += order.total;
      }
      totalSpent += order.total;
    });

    const values = months.map(m => spendByMonth[m]);

    // Categories Distribution
    const categories = { Pizza: 0, Burger: 0, Biryani: 0, Desserts: 0, Beverages: 0 };
    let totalCount = 0;
    
    orders.forEach(order => {
      order.items.forEach(item => {
        let cat = item.category || 'Pizza';
        if (cat.toLowerCase().includes('drink') || cat.toLowerCase().includes('beverage') || cat.toLowerCase().includes('shake') || cat.toLowerCase().includes('water')) {
          cat = 'Beverages';
        } else if (cat.toLowerCase().includes('dessert') || cat.toLowerCase().includes('sweet') || cat.toLowerCase().includes('cake') || cat.toLowerCase().includes('ice')) {
          cat = 'Desserts';
        } else if (cat.toLowerCase().includes('pizza')) {
          cat = 'Pizza';
        } else if (cat.toLowerCase().includes('burger')) {
          cat = 'Burger';
        } else if (cat.toLowerCase().includes('biryani') || cat.toLowerCase().includes('rice') || cat.toLowerCase().includes('meal') || cat.toLowerCase().includes('wrap') || cat.toLowerCase().includes('panin') || cat.toLowerCase().includes('taco')) {
          cat = 'Biryani';
        } else {
          cat = 'Pizza';
        }
        categories[cat] = (categories[cat] || 0) + item.qty;
        totalCount += item.qty;
      });
    });

    return {
      monthlySpend: { months, values },
      categoryDistribution: { categories, totalCount },
      totalOrders: orders.length,
      totalSpent
    };
  }, [orders]);

  return (
    <div className="min-h-[calc(100vh-64px)] md:h-[calc(100vh-64px)] bg-slate-50 dark:bg-slate-950 flex flex-col md:flex-row relative overflow-hidden transition-colors duration-300">
      
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

      {/* Mobile Sidebar Overlay */}
      {isSidebarOpen && (
        <div 
          className="fixed inset-0 bg-slate-900/50 backdrop-blur-sm z-30 md:hidden"
          onClick={() => setIsSidebarOpen(false)}
        />
      )}

      {/* Left Sidebar Navigation */}
      <aside className={`w-[280px] md:w-64 bg-white dark:bg-slate-900 border-r border-slate-200 dark:border-slate-800 flex flex-col justify-between shrink-0 h-full fixed md:relative z-40 overflow-y-auto transition-transform duration-300 ${isSidebarOpen ? 'translate-x-0' : '-translate-x-full md:translate-x-0'}`}>
        <div>
          {/* User Profile Summary */}
          <div className="p-6 border-b border-slate-100 dark:border-slate-800 flex flex-col items-center text-center">
            <div className="relative group">
              <img
                src={editAvatar || null}
                alt="Avatar"
                className="w-20 h-20 rounded-full border-4 border-orange-500 shadow-md transform hover:rotate-6 transition duration-300 object-cover"
              />
              <span className="absolute bottom-0 right-1 bg-green-500 w-4 h-4 rounded-full border-2 border-white dark:border-slate-900"></span>
              {/* Pencil Edit Icon at right side of avatar */}
              <button
                onClick={() => {
                  setActiveTab('profile');
                  setIsCartOpen(false);
                  setIsSidebarOpen(false);
                }}
                className="absolute top-0 -right-2 bg-white dark:bg-slate-800 text-slate-700 dark:text-slate-200 hover:text-orange-600 dark:hover:text-orange-500 w-6 h-6 rounded-full flex items-center justify-center shadow-md border border-slate-200 dark:border-slate-700 hover:scale-110 transition cursor-pointer"
                title="Edit Profile"
              >
                <i className="bi bi-pencil-fill text-[11px]"></i>
              </button>
            </div>
            <h3 className="font-bold text-slate-800 dark:text-slate-100 text-lg mt-3">{user.name || "Loading..."}</h3>
            <p className="text-xs text-slate-500 dark:text-slate-400 font-medium">{user.email || "email@cravings.com"}</p>
            <div className="mt-2 bg-orange-100 dark:bg-orange-950/50 text-orange-800 dark:text-orange-300 px-3 py-1 rounded-full text-xs font-semibold">
              <i className="bi bi-star-fill mr-1 text-amber-500"></i> Elite Foodie
            </div>
          </div>

          {/* Navigation Links */}
          <nav className="p-4 space-y-2">
            {[
              { id: 'overview', label: 'Overview', icon: 'bi-grid-1x2-fill' },
              { id: 'menu', label: 'Order Menu', icon: 'bi-egg-fried' },
              { id: 'wishlist', label: 'My Wishlist', icon: 'bi-heart-fill', badge: wishlist.length > 0 ? wishlist.length.toString() : null },
              { id: 'tracking', label: 'Live Tracking', icon: 'bi-geo-alt-fill', badge: orderItems.length > 0 && orderStep < 3 ? 'Live' : null },
              { id: 'analytics', label: 'Spend & Insights', icon: 'bi-pie-chart-fill' }
            ].map(item => (
              <button
                key={item.id}
                onClick={() => {
                  setActiveTab(item.id);
                  setIsCartOpen(false);
                  setIsSidebarOpen(false);
                }}
                className={`w-full flex items-center justify-between px-4 py-3 rounded font-semibold text-sm transition-all duration-300 transform cursor-pointer ${
                  activeTab === item.id 
                    ? 'bg-gradient-to-r from-[#c74a09] to-orange-500 text-white shadow-lg scale-[1.02]' 
                    : 'text-slate-600 dark:text-slate-400 hover:bg-slate-100 dark:hover:bg-slate-800 hover:text-slate-900 dark:hover:text-slate-100'
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
        <div className="p-4 border-t border-slate-100 dark:border-slate-800">
          <button
            onClick={() => {
              setIsCartOpen(true);
              setIsSidebarOpen(false);
            }}
            className="w-full bg-slate-900 dark:bg-slate-800 hover:bg-slate-855 text-white font-bold py-3 px-4 rounded flex items-center justify-between transition duration-300 transform hover:scale-[1.02] cursor-pointer"
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

      <main className={`flex-1 min-h-0 w-full p-6 md:p-8 md:h-full pb-24 md:pb-8 scroll-smooth [-webkit-overflow-scrolling:touch] ${activeTab === 'tracking' ? 'overflow-hidden' : 'overflow-y-auto'}`}>
        
        {/* TOP BAR / GREETING */}
        <header className="flex flex-col md:flex-row justify-between items-start md:items-center gap-4 m-1">
          <div className="flex items-center gap-3">
            <button 
              onClick={() => setIsSidebarOpen(true)}
              className="md:hidden text-slate-800 dark:text-slate-100 hover:text-orange-600 focus:outline-none cursor-pointer"
            >
              <i className="bi bi-list text-3xl"></i>
            </button>
            <div>
              <h1 className="text-3xl font-extrabold text-slate-800 dark:text-slate-100 tracking-tight flex items-center gap-2">
                Hey {user.name || "Foodie"}! 
              </h1>
              <p className="text-slate-500 dark:text-slate-400 font-medium">Ready to treat your taste buds today?</p>
            </div>
          </div>
          <div className="flex items-center gap-3 bg-white dark:bg-slate-900 p-2 rounded-md shadow-sm border border-slate-100 dark:border-slate-800 transition-colors duration-300">
            <span className="w-2.5 h-2.5 bg-green-500 rounded-full animate-ping"></span>
            <span className="text-xs text-slate-600 dark:text-slate-300 font-semibold">Delivery active in: <b className="text-slate-800 dark:text-slate-200">Downtown Area</b></span>
          </div>
        </header>

        {/* TAB CONTENTS */}
        {activeTab === 'overview' && (
          <OverviewTab
            user={user}
            orderItems={orderItems}
            orderStep={orderStep}
            addToCart={addToCart}
            setSelectedCategory={setSelectedCategory}
            setActiveTab={setActiveTab}
            totalOrders={analyticsData.totalOrders}
            totalSpent={analyticsData.totalSpent}
          />
        )}

        {activeTab === 'menu' && (
          <MenuTab
            searchQuery={searchQuery}
            setSearchQuery={setSearchQuery}
            selectedCategory={selectedCategory}
            setSelectedCategory={setSelectedCategory}
            addToCart={addToCart}
            wishlist={wishlist}
            toggleWishlist={toggleWishlist}
          />
        )}

        {activeTab === 'wishlist' && (
          <WishlistTab
            wishlist={wishlist}
            toggleWishlist={toggleWishlist}
            addToCart={addToCart}
            setActiveTab={setActiveTab}
          />
        )}

        {activeTab === 'tracking' && (
          <TrackingTab
            orderItems={orderItems}
            orderStep={orderStep}
            setOrderStep={setOrderStep}
            orderTimeRemaining={orderTimeRemaining}
            setActiveTab={setActiveTab}
          />
        )}

        {activeTab === 'analytics' && (
          <AnalyticsTab
            selectedChart={selectedChart}
            setSelectedChart={setSelectedChart}
            hoveredIndex={hoveredIndex}
            setHoveredIndex={setHoveredIndex}
            hoveredSlice={hoveredSlice}
            setHoveredSlice={setHoveredSlice}
            orders={orders}
            monthlySpendData={analyticsData.monthlySpend}
            categoryDistribution={analyticsData.categoryDistribution}
          />
        )}

        {activeTab === 'profile' && (
          <ProfileTab
            handleUpdateProfile={handleUpdateProfile}
            editAvatar={editAvatar}
            setEditAvatar={setEditAvatar}
            editName={editName}
            setEditName={setEditName}
            editEmail={editEmail}
            setEditEmail={setEditEmail}
            editPhone={editPhone}
            setEditPhone={setEditPhone}
            editBio={editBio}
            setEditBio={setEditBio}
          />
        )}

      </main>

      {/* Floating Shopping Cart Drawer */}
      {isCartOpen && createPortal(
        <div className="fixed inset-0 z-40 flex justify-end">
          {/* Transparent click-away backdrop (no blur or background color) */}
          <div 
            onClick={() => setIsCartOpen(false)}
            className="absolute inset-0 bg-transparent transition-opacity duration-300"
          ></div>

          {/* Drawer container */}
          <div className="relative w-full max-w-md bg-white dark:bg-slate-900 text-slate-800 dark:text-slate-100 h-full shadow-2xl flex flex-col justify-between animate-slideLeft">
            
            {/* Header */}
            <div className="p-6 border-b border-slate-100 dark:border-slate-800 flex justify-between items-center">
              <h3 className="text-xl font-black text-slate-800 dark:text-slate-100 flex items-center gap-2">
                <i className="bi bi-cart3 text-orange-600"></i> Selected Items
              </h3>
              <button 
                onClick={() => setIsCartOpen(false)}
                className="w-8 h-8 rounded-full bg-slate-100 dark:bg-slate-800 flex items-center justify-center text-slate-600 dark:text-slate-300 hover:bg-slate-200 dark:hover:bg-slate-700 transition cursor-pointer"
              >
                <i className="bi bi-x-lg"></i>
              </button>
            </div>

            {/* Cart Items List */}
            <div className="flex-1 overflow-y-auto p-6 space-y-4">
              {cart.length > 0 ? (
                cart.map(item => (
                  <div key={item.id} className="flex gap-4 items-center bg-slate-50 dark:bg-slate-800/50 p-3 rounded border border-slate-100 dark:border-slate-800">
                    <img src={item.image} alt={item.name} onError={(e) => { e.target.src = '/default-food.png'; e.target.onerror = null; }} className="w-16 h-16 rounded-sm object-cover" />
                    <div className="flex-1 space-y-1">
                      <h4 className="font-extrabold text-sm text-slate-800 dark:text-slate-100 line-clamp-1">{item.name}</h4>
                      <p className="text-xs font-bold text-slate-600 dark:text-slate-450">₹{item.price}</p>
                      
                      {/* Quantity Selector */}
                      <div className="flex items-center gap-3 pt-1">
                        <button 
                          onClick={() => updateCartQty(item.id, -1)}
                          className="w-6 h-6 rounded-sm bg-white dark:bg-slate-800 border border-slate-200 dark:border-slate-700 flex items-center justify-center text-xs font-bold hover:bg-slate-100 dark:hover:bg-slate-750 cursor-pointer"
                        >
                          -
                        </button>
                        <span className="text-xs font-black text-slate-800 dark:text-slate-100">{item.qty}</span>
                        <button 
                          onClick={() => updateCartQty(item.id, 1)}
                          className="w-6 h-6 rounded-sm bg-white dark:bg-slate-800 border border-slate-200 dark:border-slate-700 flex items-center justify-center text-xs font-bold hover:bg-slate-100 dark:hover:bg-slate-750 cursor-pointer"
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
                  <h4 className="font-bold text-slate-500 dark:text-slate-400">Your cart is hungry!</h4>
                  <p className="text-xs text-slate-400 dark:text-slate-500">Add dishes from our menu to fill it up.</p>
                </div>
              )}
            </div>

            {/* Promocode and Calculations */}
            {cart.length > 0 && (
              <div className="p-6 border-t border-slate-100 dark:border-slate-800 bg-slate-50 dark:bg-slate-900/50 space-y-4">
                {/* Promocode Input */}
                <div className="flex gap-2">
                  <input
                    type="text"
                    placeholder="Enter promocode (CRAVING50)"
                    value={promoCode}
                    onChange={e => setPromoCode(e.target.value)}
                    className="flex-1 bg-white dark:bg-slate-800 border border-slate-200 dark:border-slate-700 text-slate-850 dark:text-slate-100 px-3 py-2 rounded text-xs font-semibold focus:outline-none focus:border-orange-500"
                  />
                  <button
                    onClick={handleApplyPromo}
                    className="bg-slate-900 dark:bg-slate-800 hover:bg-slate-800 dark:hover:bg-slate-700 text-white font-bold text-xs px-4 py-2 rounded cursor-pointer"
                  >
                    Apply
                  </button>
                </div>

                {/* Costs Detail */}
                <div className="space-y-1.5 text-xs text-slate-600 dark:text-slate-400 font-bold">
                  <div className="flex justify-between">
                    <span>Subtotal</span>
                    <span>₹{calculateSubtotal()}</span>
                  </div>
                  {appliedPromo && (
                    <div className="flex justify-between text-green-600 dark:text-green-400">
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
                  <div className="flex justify-between text-base font-black text-slate-800 dark:text-slate-100 pt-2 border-t border-slate-200 dark:border-slate-750">
                    <span>Grand Total</span>
                    <span>₹{calculateTotal()}</span>
                  </div>
                </div>

                {/* Checkout Trigger Button */}
                <button
                  onClick={handleCheckout}
                  className="w-full bg-[#c74a09] hover:bg-orange-700 text-white font-black py-3.5 rounded text-sm transition tracking-wider uppercase cursor-pointer"
                >
                  Confirm & Place Order
                </button>
              </div>
            )}

          </div>
        </div>,
        document.body
      )}

      {/* Checkout Success Full Screen Modal */}
      {checkoutSuccess && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-slate-900/60 backdrop-blur-sm">
          <div className="bg-white dark:bg-slate-900 rounded-md p-6 md:p-8 max-w-sm w-full text-center space-y-6 shadow-2xl animate-scaleUp">
            <div className="w-16 h-16 bg-green-100 dark:bg-green-950/50 text-green-600 dark:text-green-400 rounded-full flex items-center justify-center text-3xl mx-auto animate-pulse">
              <i className="bi bi-patch-check-fill"></i>
            </div>
            
            <div className="space-y-2">
              <h3 className="text-2xl font-black text-slate-800 dark:text-slate-100">Order Confirmed!</h3>
              <p className="text-sm text-slate-500 dark:text-slate-400">Your delicious food is being prepared. You can track the delivery in real-time.</p>
            </div>

            <button
              onClick={goToTrackingFromSuccess}
              className="w-full bg-slate-900 dark:bg-slate-800 hover:bg-slate-800 dark:hover:bg-slate-700 text-white font-bold py-3 rounded transition cursor-pointer"
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