import { useState } from 'react';
import toast from 'react-hot-toast';

const TrackingTab = ({ orderItems = [], orderStep, setOrderStep, orderTimeRemaining, setActiveTab }) => {
  const [isSummaryOpen, setIsSummaryOpen] = useState(false);
  
  if (!orderItems || orderItems.length === 0) {
    return (
      <div className="max-w-xl mx-auto bg-white dark:bg-slate-900 rounded-2xl border border-slate-100 dark:border-slate-800 p-12 text-center shadow-xl space-y-6 animate-fadeIn text-slate-800 dark:text-slate-100 mt-10">
        <div className="w-24 h-24 bg-orange-50 dark:bg-orange-950/30 text-[#c74a09] rounded-full flex items-center justify-center text-5xl mx-auto animate-bounce shadow-sm">
          <i className="bi bi-geo-alt-fill"></i>
        </div>
        <div className="space-y-2">
          <h3 className="text-3xl font-extrabold text-slate-800 dark:text-slate-100">No Active Deliveries</h3>
          <p className="text-base text-slate-500 dark:text-slate-400 max-w-sm mx-auto font-medium">You don't have any live orders right now. Pick something delicious from our menu and we'll track it right here!</p>
        </div>
        <button
          onClick={() => setActiveTab('menu')}
          className="bg-orange-600 hover:bg-orange-700 text-white font-extrabold px-8 py-3.5 rounded-full text-sm transition-all duration-300 shadow-md hover:shadow-xl hover:-translate-y-0.5 cursor-pointer"
        >
          Explore Menu
        </button>
      </div>
    );
  }

  const displayItems = orderItems;
  
  // Progress Calculation
  const progressPercentage = orderStep === 0 ? 15 : orderStep === 1 ? 40 : orderStep === 2 ? 75 : 100;

  return (
    <div className="max-w-5xl mx-auto bg-white dark:bg-slate-900 rounded-2xl border border-slate-100 dark:border-slate-800 shadow-2xl overflow-hidden animate-fadeIn text-slate-800 dark:text-slate-100 flex flex-col lg:flex-row transition-colors duration-300">
      
      {/* CSS Keyframes for scooter moving */}
      <style>{`
        @keyframes scooterMove {
          0% { transform: translateY(0px) rotate(0deg); }
          50% { transform: translateY(-3px) rotate(2deg); }
          100% { transform: translateY(0px) rotate(0deg); }
        }
        .animate-scooter {
          animation: scooterMove 1s ease-in-out infinite;
        }
        @keyframes dashMove {
          to { stroke-dashoffset: -20; }
        }
        .animate-dash {
          animation: dashMove 1s linear infinite;
        }
      `}</style>

      {/* LEFT COLUMN: Map Area */}
      <div className="lg:w-3/5 h-[350px] lg:h-auto bg-slate-50 dark:bg-slate-950 relative overflow-hidden border-b lg:border-b-0 lg:border-r border-slate-200 dark:border-slate-800 transition-colors duration-300">
        
        {/* Map Pattern SVG */}
        <div className="absolute inset-0 opacity-40 dark:opacity-20 pointer-events-none">
          <svg className="w-full h-full text-slate-300 dark:text-slate-600" xmlns="http://www.w3.org/2000/svg">
            <defs>
              <pattern id="city-grid" width="60" height="60" patternUnits="userSpaceOnUse">
                <rect width="60" height="60" fill="none" stroke="currentColor" strokeWidth="1" rx="8" className="opacity-30" />
                <path d="M 10,10 L 50,10 L 50,50 L 10,50 Z" fill="none" stroke="currentColor" strokeWidth="0.5" className="opacity-20" />
              </pattern>
            </defs>
            <rect width="100%" height="100%" fill="url(#city-grid)" />
            
            {/* Roads */}
            <path d="M -50,300 C 150,250 250,350 400,200 C 500,100 650,150 800,50" fill="none" stroke="currentColor" strokeWidth="24" strokeLinecap="round" className="opacity-40" />
            <path d="M -50,300 C 150,250 250,350 400,200 C 500,100 650,150 800,50" fill="none" stroke="#fff" strokeWidth="2" strokeDasharray="10 10" className="opacity-60 dark:opacity-10" />
          </svg>
        </div>

        {/* Route Line */}
        <div className="absolute inset-0 pointer-events-none">
          <svg className="w-full h-full" xmlns="http://www.w3.org/2000/svg">
             {/* Actual Path */}
             <path 
               id="delivery-route"
               d="M 100,280 Q 250,280 350,180 T 550,100" 
               fill="none" 
               stroke="#cbd5e1" 
               strokeWidth="6" 
               strokeLinecap="round" 
               className="dark:stroke-slate-700 transition-colors"
             />
             
             {/* Active Path (grows based on step) */}
             {orderStep >= 1 && (
               <path 
                 d={
                   orderStep === 1 ? "M 100,280 Q 150,280 180,250" :
                   orderStep === 2 ? "M 100,280 Q 250,280 350,180 T 450,140" :
                   "M 100,280 Q 250,280 350,180 T 550,100"
                 } 
                 fill="none" 
                 stroke="#f97316" 
                 strokeWidth="6" 
                 strokeLinecap="round"
                 strokeDasharray={orderStep === 2 ? "8 6" : "none"}
                 className={orderStep === 2 ? "animate-dash drop-shadow-md" : "drop-shadow-md transition-all duration-1000"}
               />
             )}
          </svg>
        </div>

        {/* Restaurant Pin */}
        <div className="absolute flex flex-col items-center z-10" style={{ left: '100px', top: '280px', transform: 'translate(-50%, -100%)' }}>
          <div className="bg-white dark:bg-slate-800 text-slate-800 dark:text-white text-[10px] font-bold px-2.5 py-1 rounded-full shadow-lg mb-2 border border-slate-100 dark:border-slate-700">
            Restaurant
          </div>
          <div className="w-12 h-12 bg-white dark:bg-slate-800 rounded-full flex items-center justify-center shadow-xl border-4 border-orange-100 dark:border-orange-950/50">
            <i className="bi bi-shop text-orange-600 text-xl"></i>
          </div>
        </div>

        {/* Destination Pin */}
        <div className="absolute flex flex-col items-center z-10" style={{ left: '550px', top: '100px', transform: 'translate(-50%, -100%)' }}>
          <div className="bg-white dark:bg-slate-800 text-slate-800 dark:text-white text-[10px] font-bold px-2.5 py-1 rounded-full shadow-lg mb-2 border border-slate-100 dark:border-slate-700">
            Home
          </div>
          <div className="w-12 h-12 bg-white dark:bg-slate-800 rounded-full flex items-center justify-center shadow-xl border-4 border-emerald-100 dark:border-emerald-950/50">
            <i className="bi bi-house-heart-fill text-emerald-600 text-xl"></i>
          </div>
        </div>

        {/* Scooter Icon (Moves based on orderStep) */}
        {orderStep > 0 && orderStep < 3 && (
          <div 
            className="absolute flex flex-col items-center z-20 transition-all duration-1000 ease-in-out"
            style={{
              left: orderStep === 1 ? '180px' : '450px',
              top: orderStep === 1 ? '250px' : '140px',
              transform: `translate(-50%, -50%) ${orderStep === 1 ? 'rotate(-20deg)' : 'rotate(-15deg)'}`
            }}
          >
            <div className="bg-orange-600 text-white w-14 h-14 rounded-full flex items-center justify-center shadow-2xl border-4 border-white dark:border-slate-800 animate-scooter relative">
               <i className="bi bi-scooter text-2xl"></i>
               {/* Small pulse dot */}
               <span className="absolute -top-1 -right-1 w-3 h-3 bg-emerald-500 rounded-full border-2 border-white dark:border-slate-800 animate-ping"></span>
               <span className="absolute -top-1 -right-1 w-3 h-3 bg-emerald-500 rounded-full border-2 border-white dark:border-slate-800"></span>
            </div>
          </div>
        )}
      </div>

      {/* RIGHT COLUMN: Order Details */}
      <div className="lg:w-2/5 p-6 lg:p-8 flex flex-col space-y-6 lg:max-h-[600px] overflow-y-auto custom-scrollbar relative">
        
        {/* ETA Header */}
        <div className="text-center space-y-1">
          <h4 className="text-sm font-bold text-orange-600 dark:text-orange-500 uppercase tracking-wide">
            {orderStep === 3 ? 'Delivered' : 'Arriving In'}
          </h4>
          <h2 className="text-5xl font-black text-slate-800 dark:text-slate-100 tracking-tighter">
            {orderStep === 3 ? '0' : orderTimeRemaining} <span className="text-2xl text-slate-400 font-bold tracking-normal">mins</span>
          </h2>
          <p className="text-sm font-medium text-slate-500 dark:text-slate-400 mt-2">
            Order #{Math.floor(Math.random() * 90000) + 10000}
          </p>
        </div>

        {/* Minimal Progress Bar */}
        <div className="space-y-3">
          <div className="flex justify-between text-xs font-bold text-slate-400 dark:text-slate-500">
            <span>Confirmed</span>
            <span>Prep</span>
            <span>On the way</span>
            <span>Delivered</span>
          </div>
          <div className="h-2.5 bg-slate-100 dark:bg-slate-800 rounded-full overflow-hidden">
            <div 
              className="h-full bg-orange-500 rounded-full transition-all duration-700 ease-out"
              style={{ width: `${progressPercentage}%` }}
            ></div>
          </div>
        </div>

        {/* Current Status Box */}
        <div className="bg-orange-50 dark:bg-orange-950/20 border border-orange-100 dark:border-orange-900/30 rounded-xl p-4 flex items-start gap-4 transition-colors">
          <div className="w-12 h-12 bg-white dark:bg-slate-800 rounded-full flex items-center justify-center shrink-0 shadow-sm text-orange-600 text-xl">
            {orderStep === 0 && <i className="bi bi-receipt"></i>}
            {orderStep === 1 && <i className="bi bi-fire animate-pulse text-amber-500"></i>}
            {orderStep === 2 && <i className="bi bi-bicycle text-orange-600 animate-bounce"></i>}
            {orderStep === 3 && <i className="bi bi-check2-circle text-emerald-500"></i>}
          </div>
          <div>
            <h4 className="font-bold text-slate-800 dark:text-slate-200 text-lg">
              {orderStep === 0 && "Order Confirmed"}
              {orderStep === 1 && "Food is being prepared"}
              {orderStep === 2 && "Out for Delivery"}
              {orderStep === 3 && "Order Delivered"}
            </h4>
            <p className="text-xs text-slate-500 dark:text-slate-400 mt-1 font-medium leading-relaxed">
              {orderStep === 0 && "The restaurant has received your order and will start preparing it soon."}
              {orderStep === 1 && "Your food is being freshly cooked and packed with care."}
              {orderStep === 2 && "Our delivery partner has picked up your order and is heading to your location."}
              {orderStep === 3 && "Enjoy your delicious meal! Don't forget to rate your experience."}
            </p>
          </div>
        </div>

        {/* Driver / Valet Card (Show if out for delivery or delivered) */}
        {orderStep >= 2 && (
          <div className="bg-white dark:bg-slate-800 border border-slate-100 dark:border-slate-700 rounded-xl p-4 flex items-center justify-between shadow-sm transition-colors">
            <div className="flex items-center gap-3">
              <div className="relative">
                <img src="https://api.dicebear.com/7.x/notionists/svg?seed=Rohan" alt="Valet" className="w-12 h-12 rounded-full bg-slate-50 dark:bg-slate-900 border-2 border-slate-200 dark:border-slate-700" />
                <div className="absolute -bottom-1 -right-1 bg-amber-500 text-white text-[9px] font-bold px-1.5 py-0.5 rounded shadow flex items-center gap-0.5">
                  <i className="bi bi-star-fill text-[8px]"></i> 4.9
                </div>
              </div>
              <div>
                <h5 className="font-bold text-sm text-slate-800 dark:text-slate-200">Rohan Sharma</h5>
                <span className="text-[11px] font-semibold text-slate-500 dark:text-slate-400">Delivery Partner</span>
              </div>
            </div>
            <div className="flex gap-2">
              <button onClick={() => toast.success("Calling Rohan...")} className="w-10 h-10 rounded-full bg-slate-100 dark:bg-slate-700 text-slate-600 dark:text-slate-300 flex items-center justify-center hover:bg-slate-200 dark:hover:bg-slate-600 transition cursor-pointer">
                <i className="bi bi-telephone-fill"></i>
              </button>
            </div>
          </div>
        )}

        {/* Order Details Accordion */}
        <div className="border border-slate-100 dark:border-slate-800 rounded-xl overflow-hidden transition-colors">
          <button 
            onClick={() => setIsSummaryOpen(!isSummaryOpen)}
            className="w-full flex items-center justify-between p-4 bg-slate-50 dark:bg-slate-800/50 hover:bg-slate-100 dark:hover:bg-slate-800 text-sm font-bold text-slate-700 dark:text-slate-300 transition cursor-pointer"
          >
            <span>Order Summary ({displayItems.length} items)</span>
            <i className={`bi transition-transform duration-300 ${isSummaryOpen ? 'bi-chevron-up' : 'bi-chevron-down'}`}></i>
          </button>
          
          {isSummaryOpen && (
            <div className="p-4 bg-white dark:bg-slate-900 space-y-3 border-t border-slate-100 dark:border-slate-800 text-sm animate-fadeIn">
              {displayItems.map((item, idx) => (
                <div key={idx} className="flex justify-between items-center text-slate-600 dark:text-slate-400">
                  <div className="flex items-center gap-2">
                    <span className="bg-slate-100 dark:bg-slate-800 w-6 h-6 flex items-center justify-center rounded text-xs font-bold">
                      {item.qty || 1}x
                    </span>
                    <span className="font-medium truncate max-w-[150px] sm:max-w-[200px]">{item.name}</span>
                  </div>
                  <span className="font-bold">₹{(item.price || 0) * (item.qty || 1)}</span>
                </div>
              ))}
              <div className="pt-3 mt-3 border-t border-slate-100 dark:border-slate-800 flex justify-between items-center font-bold text-slate-800 dark:text-slate-200 text-base">
                <span>Total Paid</span>
                <span>₹{displayItems.reduce((acc, curr) => acc + ((curr.price || 0) * (curr.qty || 1)), 0) + 45}</span>
              </div>
            </div>
          )}
        </div>

        {/* Delivery Details */}
        <div className="bg-slate-50 dark:bg-slate-800/30 rounded-xl p-4 border border-slate-100 dark:border-slate-800 space-y-4 transition-colors">
          <h4 className="text-sm font-bold text-slate-800 dark:text-slate-200 border-b border-slate-200 dark:border-slate-700 pb-2">Delivery Details</h4>
          
          <div className="flex gap-3 text-sm">
            <div className="text-orange-500 mt-0.5"><i className="bi bi-geo-alt-fill text-lg"></i></div>
            <div>
              <p className="font-bold text-slate-700 dark:text-slate-300">Home Address</p>
              <p className="text-xs text-slate-500 dark:text-slate-400 mt-0.5 leading-relaxed">123 Cravings Street, Foodville, NY 10001</p>
            </div>
          </div>
          
          <div className="flex gap-3 text-sm">
            <div className="text-emerald-500 mt-0.5"><i className="bi bi-credit-card-fill text-lg"></i></div>
            <div>
              <p className="font-bold text-slate-700 dark:text-slate-300">Payment Information</p>
              <p className="text-xs text-slate-500 dark:text-slate-400 mt-0.5">Paid securely via Credit Card ending in 4242</p>
            </div>
          </div>
          
          <div className="flex gap-3 text-sm">
            <div className="text-blue-500 mt-0.5"><i className="bi bi-info-circle-fill text-lg"></i></div>
            <div>
              <p className="font-bold text-slate-700 dark:text-slate-300">Need Help?</p>
              <p className="text-xs text-orange-600 dark:text-orange-500 mt-0.5 cursor-pointer hover:underline transition">Contact Customer Support</p>
            </div>
          </div>
        </div>

        {/* Action Buttons */}
        <div className="sticky bottom-0 bg-white/90 dark:bg-slate-900/90 backdrop-blur-sm pt-2 pb-2 mt-auto flex gap-3 border-t border-slate-100 dark:border-slate-800">
          <button 
            onClick={() => {
              if (orderStep < 3) {
                setOrderStep(p => p + 1);
                toast.success("Simulation advanced! ⚡");
              }
            }}
            className="flex-1 bg-slate-100 dark:bg-slate-800 hover:bg-slate-200 dark:hover:bg-slate-700 text-slate-700 dark:text-slate-300 font-bold py-3 rounded-xl text-sm transition-colors cursor-pointer flex items-center justify-center gap-2"
          >
            <i className="bi bi-fast-forward-fill text-orange-500"></i> Fast Forward
          </button>
          <button 
            onClick={() => setActiveTab('overview')} 
            className="bg-white dark:bg-slate-900 border-2 border-slate-200 dark:border-slate-800 hover:border-slate-300 dark:hover:border-slate-700 text-slate-600 dark:text-slate-400 font-bold px-6 py-3 rounded-xl text-sm transition-colors cursor-pointer"
          >
            Back
          </button>
        </div>

      </div>
    </div>
  );
};

export default TrackingTab;
