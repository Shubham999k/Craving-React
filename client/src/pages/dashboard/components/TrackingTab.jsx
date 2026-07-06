import { useState } from 'react';
import toast from 'react-hot-toast';

const TrackingTab = ({ orderItems = [], orderStep, setOrderStep, orderTimeRemaining, setActiveTab }) => {
  const [isSummaryOpen, setIsSummaryOpen] = useState(false);
  
  if (!orderItems || orderItems.length === 0) {
    return (
      <div className="max-w-xl mx-auto bg-white rounded-2xl border border-gray-100 p-12 text-center shadow-xl space-y-6 mt-10">
        <div className="w-24 h-24 bg-red-50 text-red-600 rounded-full flex items-center justify-center text-5xl mx-auto shadow-sm">
          <i className="bi bi-basket-fill"></i>
        </div>
        <div className="space-y-2">
          <h3 className="text-2xl font-bold text-gray-800">No Active Orders</h3>
          <p className="text-gray-500 max-w-sm mx-auto">Looks like you haven't ordered anything yet. Let's fix that!</p>
        </div>
        <button
          onClick={() => setActiveTab('menu')}
          className="bg-red-600 hover:bg-red-700 text-white font-bold px-8 py-3 rounded-xl transition-all shadow-md"
        >
          Browse Menu
        </button>
      </div>
    );
  }

  const displayItems = orderItems;
  const isDelivered = orderStep === 3;

  return (
    <div className="max-w-6xl mx-auto bg-gray-50 rounded-2xl border border-gray-200 overflow-hidden relative shadow-lg flex flex-col md:flex-row h-[700px] md:h-[650px] font-sans">
      
      {/* MAP AREA (Background on mobile, Left pane on desktop) */}
      <div className="absolute inset-0 md:relative md:w-[55%] h-full bg-[#f1f3f4] overflow-hidden">
        {/* Simple Google Maps-like styling */}
        <div className="absolute inset-0 opacity-50 pointer-events-none">
           <svg className="w-full h-full" xmlns="http://www.w3.org/2000/svg">
            <defs>
              <pattern id="zomato-grid" width="100" height="100" patternUnits="userSpaceOnUse">
                {/* City Blocks */}
                <path d="M 20,20 L 80,20 L 80,80 L 20,80 Z" fill="#e8eaed" rx="4" />
              </pattern>
            </defs>
            <rect width="100%" height="100%" fill="url(#zomato-grid)" />
            {/* Major Roads */}
            <path d="M -100,600 C 100,500 300,600 400,200 C 500,0 700,100 900,-50" fill="none" stroke="#ffffff" strokeWidth="20" strokeLinecap="round" />
            <path d="M -100,100 C 200,200 400,100 600,400 C 700,600 900,500 1100,700" fill="none" stroke="#ffffff" strokeWidth="16" strokeLinecap="round" />
          </svg>
        </div>

        {/* Route Line */}
        <div className="absolute inset-0 pointer-events-none">
          <svg className="w-full h-full" xmlns="http://www.w3.org/2000/svg">
             {/* Base Route */}
             <path 
               id="z-route"
               d="M 150,400 Q 250,300 350,250 T 450,150" 
               fill="none" 
               stroke="#4285f4" 
               strokeWidth="5" 
               strokeLinecap="round" 
               strokeDasharray="8 8"
               className="opacity-40"
             />
             {/* Progress Route */}
             {orderStep >= 1 && (
               <path 
                 d={
                   orderStep === 1 ? "M 150,400 Q 180,370 200,350" :
                   orderStep === 2 ? "M 150,400 Q 250,300 350,250 T 400,200" :
                   "M 150,400 Q 250,300 350,250 T 450,150"
                 } 
                 fill="none" 
                 stroke="#4285f4" 
                 strokeWidth="5" 
                 strokeLinecap="round"
                 className="drop-shadow-sm transition-all duration-1000"
               />
             )}
          </svg>
        </div>

        {/* Restaurant Pin */}
        <div className="absolute flex flex-col items-center z-10" style={{ left: '150px', top: '400px', transform: 'translate(-50%, -100%)' }}>
          <div className="w-8 h-8 bg-gray-800 rounded-full flex items-center justify-center shadow-md border-2 border-white">
            <i className="bi bi-shop text-white text-sm"></i>
          </div>
        </div>

        {/* Home Pin */}
        <div className="absolute flex flex-col items-center z-10" style={{ left: '450px', top: '150px', transform: 'translate(-50%, -100%)' }}>
          <div className="w-8 h-8 bg-red-600 rounded-full flex items-center justify-center shadow-md border-2 border-white">
            <i className="bi bi-house-door-fill text-white text-sm"></i>
          </div>
        </div>

        {/* Valet Pin */}
        {orderStep > 0 && orderStep < 3 && (
          <div 
            className="absolute flex flex-col items-center z-20 transition-all duration-1000 ease-in-out"
            style={{
              left: orderStep === 1 ? '200px' : '400px',
              top: orderStep === 1 ? '350px' : '200px',
              transform: 'translate(-50%, -50%)'
            }}
          >
            <div className="w-12 h-12 bg-white rounded-full flex items-center justify-center shadow-[0_2px_10px_rgba(0,0,0,0.15)] relative">
               <img src="https://api.dicebear.com/7.x/notionists/svg?seed=Rohan" alt="valet" className="w-10 h-10 rounded-full" />
               <div className="absolute -bottom-1 -right-1 w-5 h-5 bg-white rounded-full flex items-center justify-center shadow-sm">
                 <i className="bi bi-bicycle text-red-600 text-[10px]"></i>
               </div>
            </div>
          </div>
        )}
      </div>

      {/* FOREGROUND PANEL (Bottom sheet on mobile, Right pane on desktop) */}
      <div className="absolute bottom-0 left-0 right-0 md:relative md:w-[45%] h-[60%] md:h-full bg-white md:rounded-none rounded-t-3xl shadow-[0_-10px_40px_rgba(0,0,0,0.08)] md:shadow-none flex flex-col z-30 transition-transform duration-300 border-l border-gray-100">
        
        {/* Mobile Drag Handle */}
        <div className="w-full flex justify-center py-3 md:hidden">
          <div className="w-12 h-1.5 bg-gray-200 rounded-full"></div>
        </div>

        <div className="flex-1 overflow-y-auto px-6 md:px-8 pb-24 md:pb-6 custom-scrollbar">
          
          {/* Header & ETA */}
          <div className="pt-2 md:pt-8 pb-6 border-b border-gray-100">
            <h2 className="text-3xl font-extrabold text-gray-900 tracking-tight">
              {isDelivered ? 'Delivered' : `Arriving in ${orderTimeRemaining} mins`}
            </h2>
            <p className="text-gray-500 text-sm font-medium mt-1">
              Order #{Math.floor(Math.random() * 900000) + 100000}
            </p>
          </div>

          {/* Stepper (Vertical Timeline) */}
          <div className="py-6 space-y-6">
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
                    <div className="absolute left-4 top-10 bottom-[-24px] w-0.5 bg-gray-200" />
                  )}
                  {idx < 3 && isCompleted && orderStep > idx && (
                    <div className="absolute left-4 top-10 bottom-[-24px] w-0.5 bg-green-500" />
                  )}

                  {/* Icon Circle */}
                  <div className={`w-8 h-8 rounded-full flex items-center justify-center shrink-0 z-10 transition-colors duration-300
                    ${isCompleted 
                      ? (isActive && !isDelivered ? 'bg-red-100 text-red-600 ring-4 ring-red-50' : 'bg-green-500 text-white')
                      : 'bg-gray-100 text-gray-400'
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
                    <h4 className={`text-base font-bold ${isActive || isCompleted ? 'text-gray-900' : 'text-gray-400'}`}>
                      {step.title}
                    </h4>
                    {isActive && !isDelivered && (
                      <p className="text-sm text-gray-500 mt-0.5 leading-snug">{step.desc}</p>
                    )}
                    {isDelivered && idx === 3 && (
                      <p className="text-sm text-gray-500 mt-0.5 leading-snug">{step.desc}</p>
                    )}
                  </div>
                </div>
              );
            })}
          </div>

          {/* Valet / Driver Section (Zomato style) */}
          {orderStep >= 2 && (
            <div className="my-2 p-4 bg-gray-50 rounded-2xl border border-gray-100 flex items-center justify-between">
              <div className="flex items-center gap-4">
                <div className="relative">
                  <img src="https://api.dicebear.com/7.x/notionists/svg?seed=Rohan" alt="Valet" className="w-12 h-12 rounded-full border border-gray-200 bg-white" />
                  <div className="absolute -bottom-2 left-1/2 -translate-x-1/2 bg-white px-1.5 py-0.5 rounded text-[10px] font-bold border border-gray-100 flex items-center gap-0.5 shadow-sm">
                    4.9 <i className="bi bi-star-fill text-yellow-400 text-[8px]"></i>
                  </div>
                </div>
                <div>
                  <h5 className="font-bold text-gray-900 text-sm">Rohan Sharma</h5>
                  <p className="text-xs text-gray-500 font-medium">Delivery Partner</p>
                </div>
              </div>
              
              <div className="flex items-center gap-3">
                <button 
                  onClick={() => toast.success("Calling Rohan...")}
                  className="w-10 h-10 rounded-full bg-green-100 text-green-700 flex items-center justify-center hover:bg-green-200 transition"
                >
                  <i className="bi bi-telephone-fill"></i>
                </button>
              </div>
            </div>
          )}

          <hr className="border-gray-100 my-6" />

          {/* Order Bill / Items Summary */}
          <div>
            <h3 className="text-lg font-bold text-gray-900 mb-4">Bill Details</h3>
            <div className="space-y-3 mb-4">
              {displayItems.map((item, idx) => (
                <div key={idx} className="flex justify-between items-start text-sm">
                  <div className="flex items-start gap-2">
                    <i className="bi bi-stop-btn text-green-600 mt-0.5 text-xs"></i>
                    <span className="text-gray-700 max-w-[200px] leading-tight">
                      {item.name} <span className="text-gray-400">x{item.qty || 1}</span>
                    </span>
                  </div>
                  <span className="font-medium text-gray-800">₹{(item.price || 0) * (item.qty || 1)}</span>
                </div>
              ))}
            </div>
            
            <div className="flex justify-between items-center pt-3 border-t border-gray-100 border-dashed">
              <span className="font-bold text-gray-900">Total Paid</span>
              <span className="font-bold text-gray-900">
                ₹{displayItems.reduce((acc, curr) => acc + ((curr.price || 0) * (curr.qty || 1)), 0) + 45}
              </span>
            </div>
          </div>

          <hr className="border-gray-100 my-6" />

          <div className="space-y-4 mb-4">
             <div className="flex items-start gap-3">
               <i className="bi bi-geo-alt text-gray-400 mt-1"></i>
               <div>
                 <p className="font-bold text-gray-800 text-sm">Delivery Address</p>
                 <p className="text-sm text-gray-500 mt-0.5">123 Cravings Street, Foodville, NY 10001</p>
               </div>
             </div>
          </div>
        </div>

        {/* Sticky Action Footer */}
        <div className="absolute md:relative bottom-0 left-0 right-0 bg-white border-t border-gray-100 p-4 flex gap-3 z-40 shadow-[0_-4px_15px_rgba(0,0,0,0.02)]">
          <button 
            onClick={() => {
              if (orderStep < 3) {
                setOrderStep(p => p + 1);
                toast.success("Simulation advanced! ⚡");
              }
            }}
            className="flex-1 bg-red-50 hover:bg-red-100 text-red-600 font-bold py-3.5 rounded-xl transition text-sm flex justify-center items-center gap-2"
          >
            <i className="bi bi-fast-forward-fill"></i> Simulate Next Step
          </button>
          
          <button 
            onClick={() => setActiveTab('overview')} 
            className="bg-white border border-gray-200 hover:bg-gray-50 text-gray-700 font-bold px-6 py-3.5 rounded-xl transition text-sm"
          >
            Back
          </button>
        </div>

      </div>
    </div>
  );
};

export default TrackingTab;
