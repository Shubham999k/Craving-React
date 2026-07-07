import { useState } from 'react';
import toast from 'react-hot-toast';

const TrackingTab = ({ orderItems = [], orderStep, setOrderStep, orderTimeRemaining, setActiveTab }) => {
  const [isSummaryOpen, setIsSummaryOpen] = useState(false);
  
  if (!orderItems || orderItems.length === 0) {
    return (
      <div className="max-w-xl mx-auto bg-white dark:bg-slate-900 rounded-2xl border border-gray-100 dark:border-slate-800 p-12 text-center shadow-xl space-y-6 mt-10 mb-10">
        <div className="w-24 h-24 bg-orange-50 dark:bg-orange-950/30 text-orange-600 rounded-full flex items-center justify-center text-5xl mx-auto shadow-sm">
          <i className="bi bi-basket-fill"></i>
        </div>
        <div className="space-y-2">
          <h3 className="text-2xl font-bold text-gray-800 dark:text-gray-100">No Active Orders</h3>
          <p className="text-gray-500 dark:text-gray-400 max-w-sm mx-auto">Looks like you haven't ordered anything yet. Let's fix that!</p>
        </div>
        <button
          onClick={() => setActiveTab('menu')}
          className="bg-orange-600 hover:bg-orange-700 text-white font-bold px-8 py-3 rounded-xl transition-all shadow-md"
        >
          Browse Menu
        </button>
      </div>
    );
  }

  const displayItems = orderItems;
  const isDelivered = orderStep === 3;

  return (
    <div className="mx-auto bg-white dark:bg-slate-900 rounded-2xl border border-gray-200 dark:border-slate-800 overflow-hidden shadow-xl flex flex-col md:flex-row font-sans mt-4 mb-10 xl:mt-8 h-auto lg:h-[510px]">
      
      {/* MAP AREA */}
      <div className="w-full md:w-[55%] h-[300px] md:h-full bg-slate-100 dark:bg-slate-950 relative overflow-hidden flex-shrink-0">
        <div className="absolute inset-0 opacity-50 dark:opacity-20 pointer-events-none">
           <svg className="w-full h-full" xmlns="http://www.w3.org/2000/svg" preserveAspectRatio="none" viewBox="0 0 600 600">
            <defs>
              <pattern id="zomato-grid" width="100" height="100" patternUnits="userSpaceOnUse">
                <path d="M 20,20 L 80,20 L 80,80 L 20,80 Z" fill="currentColor" className="text-slate-200 dark:text-slate-800" rx="4" />
              </pattern>
            </defs>
            <rect width="100%" height="100%" fill="url(#zomato-grid)" />
            <path d="M -100,600 C 100,500 300,600 400,200 C 500,0 700,100 900,-50" fill="none" stroke="currentColor" className="text-white dark:text-slate-900" strokeWidth="20" strokeLinecap="round" />
            <path d="M -100,100 C 200,200 400,100 600,400 C 700,600 900,500 1100,700" fill="none" stroke="currentColor" className="text-white dark:text-slate-900" strokeWidth="16" strokeLinecap="round" />
          </svg>
        </div>

        <div className="absolute inset-0 pointer-events-none">
          <svg className="w-full h-full" xmlns="http://www.w3.org/2000/svg" preserveAspectRatio="none" viewBox="0 0 600 600">
             <path 
               id="z-route"
               d="M 150,450 Q 250,350 350,300 T 450,150" 
               fill="none" 
               stroke="#4285f4" 
               strokeWidth="5" 
               strokeLinecap="round" 
               strokeDasharray="8 8"
               className="opacity-40"
             />
             {orderStep >= 1 && (
               <path 
                 d={
                   orderStep === 1 ? "M 150,450 Q 180,420 200,400" :
                   orderStep === 2 ? "M 150,450 Q 250,350 350,300 T 400,225" :
                   "M 150,450 Q 250,350 350,300 T 450,150"
                 } 
                 fill="none" 
                 stroke="#f97316" 
                 strokeWidth="5" 
                 strokeLinecap="round"
                 className="drop-shadow-sm transition-all duration-1000"
               />
             )}
          </svg>
        </div>

        {/* Restaurant Pin */}
        <div className="absolute flex flex-col items-center z-10" style={{ left: '25%', top: '75%', transform: 'translate(-50%, -100%)' }}>
          <div className="w-8 h-8 bg-gray-800 dark:bg-slate-700 rounded-full flex items-center justify-center shadow-md border-2 border-white dark:border-slate-800">
            <i className="bi bi-shop text-white text-sm"></i>
          </div>
        </div>

        {/* Home Pin */}
        <div className="absolute flex flex-col items-center z-10" style={{ left: '75%', top: '25%', transform: 'translate(-50%, -100%)' }}>
          <div className="w-8 h-8 bg-emerald-500 rounded-full flex items-center justify-center shadow-md border-2 border-white dark:border-slate-800">
            <i className="bi bi-house-door-fill text-white text-sm"></i>
          </div>
        </div>

        {/* Valet Pin */}
        {orderStep > 0 && orderStep < 3 && (
          <div 
            className="absolute flex flex-col items-center z-20 transition-all duration-1000 ease-in-out"
            style={{
              left: orderStep === 1 ? '33.3%' : '66.6%',
              top: orderStep === 1 ? '66.6%' : '37.5%',
              transform: 'translate(-50%, -50%)'
            }}
          >
            <div className="w-12 h-12 bg-white dark:bg-slate-800 rounded-full flex items-center justify-center shadow-lg relative border-2 border-white dark:border-slate-800">
               <img src="https://api.dicebear.com/7.x/notionists/svg?seed=Rohan" alt="valet" className="w-10 h-10 rounded-full" />
               <div className="absolute -bottom-1 -right-1 w-5 h-5 bg-white dark:bg-slate-700 rounded-full flex items-center justify-center shadow-sm">
                 <i className="bi bi-bicycle text-orange-600 text-[10px]"></i>
               </div>
            </div>
          </div>
        )}
      </div>

      {/* RIGHT PANEL */}
      <div className="w-full md:w-[45%] bg-white dark:bg-slate-900 flex flex-col z-30 border-t md:border-t-0 md:border-l border-gray-100 dark:border-slate-800">
        
        <div className="flex-1 px-5 md:px-6 py-4 md:py-6 overflow-y-auto custom-scrollbar">
          
          {/* Header & ETA */}
          <div className="pt-1 md:pt-2 pb-4 border-b border-gray-100 dark:border-slate-800">
            <h2 className="text-3xl font-extrabold text-gray-900 dark:text-gray-100 tracking-tight">
              {isDelivered ? 'Delivered' : `Arriving in ${orderTimeRemaining} mins`}
            </h2>
            <p className="text-gray-500 dark:text-gray-400 text-sm font-medium mt-1">
              Order #{Math.floor(Math.random() * 900000) + 100000}
            </p>
          </div>

          {/* Stepper (Vertical Timeline) */}
          <div className="py-4 space-y-5">
            {[
              { title: "Order accepted", desc: "The restaurant has confirmed your order", icon: "bi-card-checklist" },
              { title: "Food is being prepared", desc: "Your food is getting ready", icon: "bi-fire" },
              { title: "Out for delivery", desc: "Valet is on the way to your location", icon: "bi-bicycle" },
              { title: "Delivered", desc: "Enjoy your meal!", icon: "bi-house-check" }
            ].map((step, idx) => {
              const isCompleted = orderStep >= idx;
              const isActive = orderStep === idx;
              
              return (
                <div key={idx} className="flex gap-4 relative">
                  {/* Vertical Line */}
                  {idx < 3 && (
                    <div className="absolute left-4 top-10 bottom-[-24px] w-0.5 bg-gray-200 dark:bg-slate-800" />
                  )}
                  {idx < 3 && isCompleted && orderStep > idx && (
                    <div className="absolute left-4 top-10 bottom-[-24px] w-0.5 bg-green-500" />
                  )}

                  {/* Icon Circle */}
                  <div className={`w-8 h-8 rounded-full flex items-center justify-center shrink-0 z-10 transition-colors duration-300
                    ${isCompleted 
                      ? (isActive && !isDelivered ? 'bg-orange-100 dark:bg-orange-900/30 text-orange-600 ring-4 ring-orange-50 dark:ring-orange-950' : 'bg-green-500 text-white')
                      : 'bg-gray-100 dark:bg-slate-800 text-gray-400 dark:text-slate-500'
                    }`}
                  >
                    {isCompleted && !isActive ? (
                      <i className="bi bi-check-lg text-lg"></i>
                    ) : (
                      <i className={`bi ${step.icon} text-sm ${isActive && !isDelivered ? 'animate-pulse' : ''}`}></i>
                    )}
                  </div>

                  {/* Text Details */}
                  <div className="pb-2">
                    <h4 className={`text-base font-bold ${isActive || isCompleted ? 'text-gray-900 dark:text-gray-200' : 'text-gray-400 dark:text-slate-600'}`}>
                      {step.title}
                    </h4>
                    {isActive && !isDelivered && (
                      <p className="text-sm text-gray-500 dark:text-gray-400 mt-0.5 leading-snug">{step.desc}</p>
                    )}
                    {isDelivered && idx === 3 && (
                      <p className="text-sm text-gray-500 dark:text-gray-400 mt-0.5 leading-snug">{step.desc}</p>
                    )}
                  </div>
                </div>
              );
            })}
          </div>

          {/* Valet / Driver Section */}
          {orderStep >= 2 && (
            <div className="my-2 p-4 bg-gray-50 dark:bg-slate-800/50 rounded-2xl border border-gray-100 dark:border-slate-800 flex items-center justify-between">
              <div className="flex items-center gap-4">
                <div className="relative">
                  <img src="https://api.dicebear.com/7.x/notionists/svg?seed=Rohan" alt="Valet" className="w-12 h-12 rounded-full border border-gray-200 dark:border-slate-700 bg-white dark:bg-slate-900" />
                  <div className="absolute -bottom-2 left-1/2 -translate-x-1/2 bg-white dark:bg-slate-900 px-1.5 py-0.5 rounded text-[10px] font-bold border border-gray-100 dark:border-slate-700 flex items-center gap-0.5 shadow-sm text-slate-800 dark:text-slate-200">
                    4.9 <i className="bi bi-star-fill text-yellow-400 text-[8px]"></i>
                  </div>
                </div>
                <div>
                  <h5 className="font-bold text-gray-900 dark:text-gray-200 text-sm">Rohan Sharma</h5>
                  <p className="text-xs text-gray-500 dark:text-gray-400 font-medium">Delivery Partner</p>
                </div>
              </div>
              
              <div className="flex items-center gap-3">
                <button 
                  onClick={() => toast.success("Calling Rohan...")}
                  className="w-10 h-10 rounded-full bg-green-100 dark:bg-green-900/30 text-green-700 dark:text-green-400 flex items-center justify-center hover:bg-green-200 dark:hover:bg-green-900/50 transition"
                >
                  <i className="bi bi-telephone-fill"></i>
                </button>
              </div>
            </div>
          )}

          <hr className="border-gray-100 dark:border-slate-800 my-4" />

          {/* Collapsible Order & Delivery Details */}
          <div className="border border-slate-100 dark:border-slate-800 rounded-xl overflow-hidden mb-2">
            <button 
              onClick={() => setIsSummaryOpen(!isSummaryOpen)}
              className="w-full flex justify-between items-center p-3 bg-slate-50 dark:bg-slate-800/50 hover:bg-slate-100 dark:hover:bg-slate-800 transition"
            >
              <span className="text-sm font-bold text-gray-800 dark:text-gray-200">View Order Details</span>
              <i className={`bi bi-chevron-down text-gray-500 transition-transform ${isSummaryOpen ? 'rotate-180' : ''}`}></i>
            </button>
            
            {isSummaryOpen && (
              <div className="p-4 bg-white dark:bg-slate-900 border-t border-slate-100 dark:border-slate-800">
                {/* Order Bill / Items Summary */}
                <h3 className="text-sm font-bold text-gray-900 dark:text-gray-200 mb-2">Bill Details</h3>
                <div className="space-y-2 mb-3">
                  {displayItems.map((item, idx) => (
                    <div key={idx} className="flex justify-between items-start text-xs">
                      <div className="flex items-start gap-2">
                        <i className="bi bi-stop-btn text-green-600 mt-0.5"></i>
                        <span className="text-gray-700 dark:text-gray-300 max-w-[200px] leading-tight">
                          {item.name} <span className="text-gray-400">x{item.qty || 1}</span>
                        </span>
                      </div>
                      <span className="font-medium text-gray-800 dark:text-gray-200">₹{(item.price || 0) * (item.qty || 1)}</span>
                    </div>
                  ))}
                </div>
                
                <div className="flex justify-between items-center pt-2 border-t border-gray-100 dark:border-slate-800 border-dashed text-sm">
                  <span className="font-bold text-gray-900 dark:text-gray-200">Total Paid</span>
                  <span className="font-bold text-gray-900 dark:text-gray-200">
                    ₹{displayItems.reduce((acc, curr) => acc + ((curr.price || 0) * (curr.qty || 1)), 0) + 45}
                  </span>
                </div>

                <div className="mt-4 pt-4 border-t border-gray-100 dark:border-slate-800">
                  <div className="flex items-start gap-3">
                    <i className="bi bi-geo-alt text-gray-400 mt-1"></i>
                    <div>
                      <p className="font-bold text-gray-800 dark:text-gray-200 text-sm">Delivery Address</p>
                      <p className="text-xs text-gray-500 dark:text-gray-400 mt-0.5">123 Cravings Street, Foodville, NY 10001</p>
                    </div>
                  </div>
                </div>
              </div>
            )}
          </div>
        </div>

        {/* Action Footer */}
        <div className="bg-white dark:bg-slate-900 border-t border-gray-100 dark:border-slate-800 p-3 flex gap-3 z-40 mt-auto rounded-b-2xl md:rounded-bl-none shrink-0">
          <button 
            onClick={() => {
              if (orderStep < 3) {
                setOrderStep(p => p + 1);
                toast.success("Simulation advanced! ⚡");
              }
            }}
            className="flex-1 bg-orange-50 dark:bg-orange-900/30 hover:bg-orange-100 dark:hover:bg-orange-900/50 text-orange-600 dark:text-orange-400 font-bold py-3 rounded-xl transition text-sm flex justify-center items-center gap-2"
          >
            <i className="bi bi-fast-forward-fill"></i> Simulate Next Step
          </button>
          
          <button 
            onClick={() => setActiveTab('overview')} 
            className="bg-white dark:bg-slate-800 border border-gray-200 dark:border-slate-700 hover:bg-gray-50 dark:hover:bg-slate-700 text-gray-700 dark:text-gray-300 font-bold px-5 py-3 rounded-xl transition text-sm"
          >
            Back
          </button>
        </div>

      </div>
    </div>
  );
};

export default TrackingTab;
