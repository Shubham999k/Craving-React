import { useState, useEffect } from "react";
import { useParams, Link, useNavigate } from "react-router-dom";
import toast from "react-hot-toast";
import { restaurants } from "../data/restaurants";
import { FOOD_ITEMS } from "../data/mockData";

function RestaurantDetails() {
    const { id } = useParams();
    const navigate = useNavigate();
    const [restaurant, setRestaurant] = useState(null);
    const [menuItems, setMenuItems] = useState([]);
    const [cart, setCart] = useState([]);

    // Find restaurant and its dynamic menu
    useEffect(() => {
        const found = restaurants.find(r => r.id === parseInt(id));
        if (!found) {
            toast.error("Restaurant not found!");
            navigate("/");
            return;
        }
        setRestaurant(found);

        // Map tags to categories
        const tagToCategoryMap = {
            "Indian": ["Biryani"],
            "North Indian": ["Biryani"],
            "Italian": ["Pizza"],
            "Fast Food": ["Burger", "Wraps", "Sides"],
            "American": ["Burger", "Sides"],
            "Chinese": ["Noodles"]
        };

        // Gather all categories for this restaurant's tags
        let targetCategories = [];
        found.tags.forEach(tag => {
            if (tagToCategoryMap[tag]) {
                targetCategories = [...targetCategories, ...tagToCategoryMap[tag]];
            }
        });

        // Unique categories
        targetCategories = [...new Set(targetCategories)];

        // If no matches, fallback to all categories
        const filtered = FOOD_ITEMS.filter(item => 
            targetCategories.length > 0 ? targetCategories.includes(item.category) : true
        );
        setMenuItems(filtered);
    }, [id, navigate]);

    // Load cart from localStorage on mount
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
        return sub > 0 ? (sub + 30 + 15) : 0; // subtotal + delivery(30) + taxes(15)
    };

    const handleCheckout = () => {
        if (cart.length === 0) {
            toast.error("Cart is empty!");
            return;
        }
        
        // Save cart to global session so Dashboard can pick it up or redirect
        const token = localStorage.getItem("token");
        if (!token) {
            toast.error("Please login to complete your order!");
            navigate("/login");
            return;
        }

        // Store selected cart items specifically for checkout and go to dashboard
        localStorage.setItem("dashboard_cart_trigger", JSON.stringify(cart));
        toast.success("Redirecting to your dashboard to complete payment! 🛵");
        navigate("/user/dashboard");
    };

    if (!restaurant) {
        return (
            <div className="min-h-screen flex items-center justify-center bg-slate-50 dark:bg-slate-950 text-slate-800 dark:text-slate-100">
                <p className="animate-pulse text-lg font-bold">Loading restaurant...</p>
            </div>
        );
    }

    return (
        <div className="min-h-screen bg-slate-50 dark:bg-slate-950 text-slate-800 dark:text-slate-100 transition-colors duration-300">
            {/* Custom Animations Style Block */}
            <style>{`
                @keyframes slideRight {
                    from { opacity: 0; transform: translateX(-40px); }
                    to { opacity: 1; transform: translateX(0); }
                }
                @keyframes slideLeft {
                    from { opacity: 0; transform: translateX(40px); }
                    to { opacity: 1; transform: translateX(0); }
                }
                .animate-slideRight {
                    animation: slideRight 0.8s cubic-bezier(0.16, 1, 0.3, 1) forwards;
                }
                .animate-slideLeft {
                    animation: slideLeft 0.8s cubic-bezier(0.16, 1, 0.3, 1) forwards;
                }
            `}</style>

            {/* Header / Premium Info Section */}
            <div className="relative bg-gradient-to-r from-orange-650/5 via-orange-950/5 to-slate-900/5 dark:from-orange-950/20 dark:via-slate-950/40 dark:to-slate-950 py-10 border-b border-slate-100 dark:border-slate-900">
                {/* Back Button */}
                <div className="max-w-7xl mx-auto px-4 mb-6">
                    <Link 
                        to="/" 
                        className="inline-flex bg-white/80 dark:bg-slate-900/80 hover:bg-orange-600 dark:hover:bg-orange-655 hover:text-white backdrop-blur-md text-slate-700 dark:text-slate-200 border border-slate-200 dark:border-slate-800 px-4 py-2 rounded-full text-xs font-bold items-center gap-2 transition duration-300 shadow-sm hover:scale-105"
                    >
                        <i className="bi bi-arrow-left"></i> Back to Restaurants
                    </Link>
                </div>

                <div className="max-w-7xl mx-auto px-4 grid grid-cols-1 md:grid-cols-12 gap-8 items-center">
                    {/* Left: Restaurant Image with Animation */}
                    <div className="md:col-span-5 lg:col-span-4 relative group overflow-hidden rounded-2xl shadow-2xl border-4 border-white dark:border-slate-800 transform hover:rotate-1 hover:scale-102 transition-all duration-550 animate-slideRight">
                        <img 
                            src={restaurant.image} 
                            alt={restaurant.name} 
                            className="w-full h-56 md:h-64 object-cover group-hover:scale-110 transition duration-700"
                        />
                        <div className="absolute inset-0 bg-gradient-to-t from-black/40 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300"></div>
                    </div>

                    {/* Right: Restaurant Details with Animation */}
                    <div className="md:col-span-7 lg:col-span-8 space-y-4 animate-slideLeft">
                        <div className="flex flex-wrap gap-2">
                            {restaurant.tags.map((tag, idx) => (
                                <span key={idx} className="bg-orange-100 dark:bg-orange-950/50 text-orange-700 dark:text-orange-300 px-3 py-1 rounded-full text-[10px] font-black tracking-wider uppercase border border-orange-200/50 dark:border-orange-900/30">
                                    {tag}
                                </span>
                            ))}
                        </div>
                        
                        <h1 className="text-4xl md:text-5xl font-black tracking-tight text-slate-850 dark:text-slate-100">
                            {restaurant.name}
                        </h1>
                        
                        <p className="text-sm md:text-base text-slate-600 dark:text-slate-400 font-medium leading-relaxed max-w-2xl">
                            {restaurant.description}
                        </p>

                        <div className="flex flex-wrap items-center gap-6 pt-2 text-xs md:text-sm font-bold text-slate-500 dark:text-slate-400">
                            <span className="bg-[#c74a09] px-3 py-1 rounded text-white flex items-center gap-1 font-black shadow-md">
                                ★ {restaurant.rating} Rating
                            </span>
                            <span className="flex items-center gap-1.5">
                                <i className="bi bi-clock-fill text-orange-600"></i> 30-40 mins Delivery
                            </span>
                            <span className="flex items-center gap-1.5">
                                <i className="bi bi-patch-check-fill text-emerald-500"></i> Free Delivery Eligible
                            </span>
                        </div>
                    </div>
                </div>
            </div>

            {/* Content Container */}
            <div className="max-w-7xl mx-auto px-4 py-8 grid grid-cols-1 lg:grid-cols-12 gap-8">
                
                {/* Left Column: Menu list */}
                <div className="lg:col-span-8 space-y-6">
                    <div>
                        <h2 className="text-2xl font-black text-slate-800 dark:text-slate-100 flex items-center gap-2">
                            <i className="bi bi-journal-text text-orange-600"></i> Explore Menu
                        </h2>
                        <p className="text-xs text-slate-500 dark:text-slate-400 font-medium mt-0.5">Freshly prepared local dishes</p>
                    </div>

                    <div className="grid gap-6 md:grid-cols-2">
                        {menuItems.map(item => (
                            <div 
                                key={item.id} 
                                className="bg-white dark:bg-slate-900 border border-slate-100 dark:border-slate-800 rounded-xl overflow-hidden shadow-sm hover:shadow-lg transition duration-300 flex flex-col justify-between"
                            >
                                <div className="relative h-44">
                                    <img 
                                        src={item.image} 
                                        alt={item.name} 
                                        onError={(e) => { e.target.src = '/default-food.png'; e.target.onerror = null; }}
                                        className="w-full h-full object-cover"
                                    />
                                    <span className="absolute top-3 left-3 bg-white/95 dark:bg-slate-900/95 backdrop-blur-xs px-2.5 py-0.5 rounded-sm text-xs font-black text-slate-800 dark:text-slate-100 shadow-md">
                                        ₹{item.price}
                                    </span>
                                </div>
                                <div className="p-4 flex-1 flex flex-col justify-between space-y-4">
                                    <div>
                                        <h3 className="font-extrabold text-slate-800 dark:text-slate-100 text-lg line-clamp-1">{item.name}</h3>
                                        <p className="text-xs text-slate-500 dark:text-slate-400 mt-1 line-clamp-2">{item.desc}</p>
                                    </div>
                                    <button 
                                        onClick={() => addToCart(item)}
                                        className="w-full bg-[#c74a09] hover:bg-orange-700 text-white font-bold py-2 rounded text-sm transition cursor-pointer"
                                    >
                                        Add to Cart
                                    </button>
                                </div>
                            </div>
                        ))}
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

export default RestaurantDetails;
