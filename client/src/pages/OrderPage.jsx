import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import toast from "react-hot-toast";
import { FOOD_ITEMS } from "../data/mockData";

function OrderPage() {
    const navigate = useNavigate();
    const [searchQuery, setSearchQuery] = useState("");
    const [selectedCategory, setSelectedCategory] = useState("All");
    const [cart, setCart] = useState([]);

    // Load cart from localStorage
    useEffect(() => {
        const savedCart = localStorage.getItem("cart");
        if (savedCart) {
            try {
                setCart(JSON.parse(savedCart));
            } catch {
                setCart([]);
            }
        }
    }, []);

    // Save cart to localStorage
    const saveCart = (newCart) => {
        setCart(newCart);
        localStorage.setItem("cart", JSON.stringify(newCart));
    };

    const addToCart = (item) => {
        const existing = cart.find(i => i.id === item.id);
        const newQty = existing ? existing.qty + 1 : 1;
        toast.success(`${item.name} added to cart! (${newQty} in cart) 😋`);

        const newCart = existing 
            ? cart.map(i => i.id === item.id ? { ...i, qty: i.qty + 1 } : i)
            : [...cart, { ...item, qty: 1 }];
        saveCart(newCart);
    };

    const updateCartQty = (id, delta) => {
        const newCart = cart.map(item => {
            if (item.id === id) {
                const newQty = item.qty + delta;
                return newQty <= 0 ? null : { ...item, qty: newQty };
            }
            return item;
        }).filter(Boolean);
        saveCart(newCart);
    };

    const calculateSubtotal = () => cart.reduce((acc, curr) => acc + (curr.price * curr.qty), 0);
    const calculateTotal = () => {
        const sub = calculateSubtotal();
        return sub > 0 ? (sub + 30 + 15) : 0;
    };

    const handleCheckout = () => {
        if (cart.length === 0) {
            toast.error("Cart is empty!");
            return;
        }

        const token = localStorage.getItem("token");
        if (!token) {
            toast.error("Please login to complete your order!");
            navigate("/login");
            return;
        }

        localStorage.setItem("dashboard_cart_trigger", JSON.stringify(cart));
        toast.success("Redirecting to your dashboard to complete payment! 🛵");
        navigate("/user/dashboard");
    };

    // Filter items
    const filteredItems = FOOD_ITEMS.filter(item => {
        const matchesCategory = selectedCategory === "All" || item.category === selectedCategory;
        const matchesSearch = item.name.toLowerCase().includes(searchQuery.toLowerCase()) || 
                              item.desc.toLowerCase().includes(searchQuery.toLowerCase());
        return matchesCategory && matchesSearch;
    });

    const categories = ["All", "Pizza", "Burger", "Biryani", "Desserts", "Wraps", "Noodles", "Sides", "Beverages"];

    return (
        <div className="min-h-screen bg-slate-50 dark:bg-slate-950 text-slate-800 dark:text-slate-100 transition-colors duration-300">
            {/* Page Header */}
            <div className="bg-gradient-to-r from-orange-600/10 via-orange-950/5 to-slate-900/10 dark:from-orange-950/20 dark:via-slate-950/40 dark:to-slate-950 py-12 border-b border-slate-100 dark:border-slate-900">
                <div className="max-w-7xl mx-auto px-4 text-center space-y-4">
                    <h1 className="text-4xl md:text-5xl font-black tracking-tight text-slate-850 dark:text-slate-100">
                        Order <span className="text-orange-600">Now</span>
                    </h1>
                    <p className="text-slate-500 dark:text-slate-400 font-medium max-w-lg mx-auto">
                        Browse all dishes from our partner restaurants and order right to your doorstep.
                    </p>
                </div>
            </div>

            {/* Content Section */}
            <div className="max-w-7xl mx-auto px-4 py-8 grid grid-cols-1 lg:grid-cols-12 gap-8">
                
                {/* Left Column: Menu Items list */}
                <div className="lg:col-span-8 space-y-8">
                    {/* Search & Filter Bar */}
                    <div className="space-y-4">
                        <div className="relative">
                            <i className="bi bi-search absolute left-4 top-1/2 -translate-y-1/2 text-slate-400"></i>
                            <input
                                type="text"
                                placeholder="Search dishes or cuisines..."
                                value={searchQuery}
                                onChange={(e) => setSearchQuery(e.target.value)}
                                className="w-full pl-12 pr-4 py-3 rounded-xl bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 text-slate-800 dark:text-slate-100 placeholder:text-slate-400 focus:outline-none focus:border-orange-500 transition shadow-sm font-semibold"
                            />
                        </div>

                        {/* Category Pills */}
                        <div className="flex gap-2 overflow-x-auto pb-2 scrollbar-none">
                            {categories.map(cat => (
                                <button
                                    key={cat}
                                    onClick={() => setSelectedCategory(cat)}
                                    className={`px-4 py-2 rounded-full text-xs font-bold transition whitespace-nowrap cursor-pointer ${
                                        selectedCategory === cat
                                            ? "bg-[#c74a09] text-white shadow-md scale-[1.02]"
                                            : "bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 text-slate-600 dark:text-slate-400 hover:bg-slate-100 dark:hover:bg-slate-800"
                                    }`}
                                >
                                    {cat}
                                </button>
                            ))}
                        </div>
                    </div>

                    {/* Food Grid */}
                    <div className="grid gap-6 md:grid-cols-2">
                        {filteredItems.length > 0 ? (
                            filteredItems.map((item, index) => (
                                <div 
                                    key={item.id} 
                                    className="bg-white dark:bg-slate-900 border border-slate-100 dark:border-slate-800 rounded-xl overflow-hidden shadow-sm hover:shadow-lg transition duration-300 flex flex-col justify-between animate-fadeIn"
                                    style={{
                                        animationDelay: `${index * 80}ms`,
                                        animationFillMode: 'both'
                                    }}
                                >
                                    <div className="relative h-44">
                                        <img 
                                            src={item.image} 
                                            alt={item.name} 
                                            onError={(e) => { e.target.src = '/default-food.png'; e.target.onerror = null; }}
                                            className={`w-full h-full object-cover ${!item.isAvailable ? 'grayscale opacity-70' : ''}`}
                                        />
                                        <span className="absolute top-3 left-3 bg-white/95 dark:bg-slate-900/95 backdrop-blur-xs px-2.5 py-0.5 rounded-sm text-xs font-black text-slate-800 dark:text-slate-100 shadow-md">
                                            ₹{item.price}
                                        </span>
                                        <div className="absolute top-3 right-3 flex flex-col gap-2 items-end">
                                            <span className={`px-2 py-0.5 rounded text-[9px] font-black uppercase tracking-wider text-white ${item.type === 'veg' ? 'bg-green-600' : 'bg-red-650'}`}>
                                                {item.type}
                                            </span>
                                            {!item.isAvailable && (
                                                <span className="px-2 py-1 rounded bg-slate-800 text-white text-[10px] font-black uppercase tracking-wider shadow-md">
                                                    Out of Stock
                                                </span>
                                            )}
                                        </div>
                                    </div>
                                    <div className="p-4 flex-1 flex flex-col justify-between space-y-4">
                                        <div>
                                            <h3 className="font-extrabold text-slate-800 dark:text-slate-100 text-lg line-clamp-1">{item.name}</h3>
                                            <p className="text-xs text-slate-500 dark:text-slate-400 mt-1 line-clamp-2">{item.desc}</p>
                                        </div>
                                        <button 
                                            onClick={() => item.isAvailable && addToCart(item)}
                                            disabled={!item.isAvailable}
                                            className={`w-full font-bold py-2 rounded text-sm transition ${
                                                item.isAvailable 
                                                    ? 'bg-[#c74a09] hover:bg-orange-700 text-white cursor-pointer' 
                                                    : 'bg-slate-200 dark:bg-slate-800 text-slate-400 dark:text-slate-500 cursor-not-allowed'
                                            }`}
                                        >
                                            {item.isAvailable ? 'Add to Cart' : 'Currently Unavailable'}
                                        </button>
                                    </div>
                                </div>
                            ))
                        ) : (
                            <div className="col-span-2 text-center py-12 space-y-3">
                                <div className="text-5xl">🍽️</div>
                                <h4 className="font-bold text-slate-500 dark:text-slate-400">No dishes match your search</h4>
                                <p className="text-xs text-slate-400 dark:text-slate-550">Try typing another dish or category.</p>
                            </div>
                        )}
                    </div>
                </div>

                {/* Right Column: Checkout Widget */}
                <div className="lg:col-span-4">
                    <div className="bg-white dark:bg-slate-900 border border-slate-100 dark:border-slate-800 rounded-xl p-6 shadow-md sticky top-8 flex flex-col gap-6 max-h-[calc(100vh-8rem)]">
                        <h3 className="text-xl font-black text-slate-800 dark:text-slate-100 flex items-center gap-2 border-b border-slate-100 dark:border-slate-800 pb-3 shrink-0">
                            <i className="bi bi-cart3 text-orange-600"></i> Selected Items
                        </h3>

                        <div className="flex-1 overflow-y-auto scrollbar-thin scrollbar-thumb-slate-300 dark:scrollbar-thumb-slate-700 space-y-4 pr-2">
                            {cart.length > 0 ? (
                                cart.map(item => (
                                    <div key={item.id} className="flex gap-4 items-center bg-slate-50 dark:bg-slate-800/50 p-3 rounded border border-slate-100 dark:border-slate-800">
                                        <img src={item.image} alt={item.name} onError={(e) => { e.target.src = '/default-food.png'; e.target.onerror = null; }} className="w-12 h-12 rounded object-cover" />
                                        <div className="flex-1 space-y-1">
                                            <h4 className="font-extrabold text-sm text-slate-800 dark:text-slate-100 line-clamp-1">{item.name}</h4>
                                            <p className="text-xs font-bold text-slate-600 dark:text-slate-400">₹{item.price}</p>
                                            
                                            <div className="flex items-center gap-3 pt-1">
                                                <button 
                                                    onClick={() => updateCartQty(item.id, -1)}
                                                    className="w-5 h-5 rounded bg-white dark:bg-slate-800 border border-slate-200 dark:border-slate-700 flex items-center justify-center text-xs font-bold hover:bg-slate-100 dark:hover:bg-slate-700 cursor-pointer"
                                                >
                                                    -
                                                </button>
                                                <span className="text-xs font-black text-slate-800 dark:text-slate-100">{item.qty}</span>
                                                <button 
                                                    onClick={() => updateCartQty(item.id, 1)}
                                                    className="w-5 h-5 rounded bg-white dark:bg-slate-800 border border-slate-200 dark:border-slate-700 flex items-center justify-center text-xs font-bold hover:bg-slate-100 dark:hover:bg-slate-700 cursor-pointer"
                                                >
                                                    +
                                                </button>
                                            </div>
                                        </div>
                                    </div>
                                ))
                            ) : (
                                <div className="text-center py-8 space-y-3">
                                    <div className="text-4xl">🛒</div>
                                    <h4 className="font-bold text-slate-500 dark:text-slate-400 text-sm">Your cart is empty</h4>
                                </div>
                            )}
                        </div>

                        {cart.length > 0 && (
                            <div className="space-y-4 border-t border-slate-100 dark:border-slate-800 pt-4 shrink-0">
                                <div className="space-y-1.5 text-xs text-slate-600 dark:text-slate-400 font-bold">
                                    <div className="flex justify-between">
                                        <span>Subtotal</span>
                                        <span>₹{calculateSubtotal()}</span>
                                    </div>
                                    <div className="flex justify-between">
                                        <span>Delivery Fee</span>
                                        <span>₹30</span>
                                    </div>
                                    <div className="flex justify-between">
                                        <span>Govt. Taxes</span>
                                        <span>₹15</span>
                                    </div>
                                    <div className="flex justify-between text-base font-black text-slate-800 dark:text-slate-100 pt-2 border-t border-slate-200 dark:border-slate-800">
                                        <span>Grand Total</span>
                                        <span>₹{calculateTotal()}</span>
                                    </div>
                                </div>

                                <button
                                    onClick={handleCheckout}
                                    className="w-full bg-[#c74a09] hover:bg-orange-700 text-white font-black py-3 rounded text-sm transition tracking-wider uppercase cursor-pointer"
                                >
                                    Proceed to Checkout
                                </button>
                            </div>
                        )}
                    </div>
                </div>

            </div>
        </div>
    );
}

export default OrderPage;
