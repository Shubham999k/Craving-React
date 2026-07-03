import React, { useState } from 'react';
import toast from 'react-hot-toast';

const TrackingTab = ({ orderItems, orderStep, setOrderStep, orderTimeRemaining, setActiveTab }) => {
  const [isSummaryOpen, setIsSummaryOpen] = useState(false);
  const displayItems = orderItems && orderItems.length > 0 ? orderItems : [{ name: 'Classic Pepperoni Pizza', qty: 1, price: 349 }];
  const primaryItem = displayItems[0];
  const dishName = primaryItem.name || 'Your Delicious Meal';

  return (
    <div className="max-w-6xl mx-auto bg-slate-900 rounded-md border border-slate-800 shadow-2xl overflow-hidden animate-fadeIn text-slate-100">
      
      {/* CSS Keyframes for neon pulses & radar sweeps */}
      <style>{`
        @keyframes pulseGlow {
          0%, 100% { box-shadow: 0 0 8px rgba(249, 115, 22, 0.4); }
          50% { box-shadow: 0 0 20px rgba(249, 115, 22, 0.8); }
        }
        @keyframes pulseGreen {
          0%, 100% { box-shadow: 0 0 8px rgba(16, 185, 129, 0.4); }
          50% { box-shadow: 0 0 20px rgba(16, 185, 129, 0.8); }
        }
        @keyframes lineDash {
          to { stroke-dashoffset: -40; }
        }
        @keyframes radarScan {
          0% { transform: rotate(0deg); }
          100% { transform: rotate(360deg); }
        }
      `}</style>

      {/* Main Grid: Left is Map (7 cols), Right is Status Hub (5 cols) */}
      <div className="grid grid-cols-1 lg:grid-cols-12">
        
        {/* LEFT COLUMN: Map & Telemetry Viewport (7 Cols) */}
        <div className="lg:col-span-7 h-[300px] lg:h-[480px] bg-[#0b0f19] relative flex flex-col justify-between p-5 border-b lg:border-b-0 lg:border-r border-slate-850">
          
          {/* Map Scanline Overlay & Radar Sweep */}
          <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_center,_var(--tw-gradient-stops))] from-blue-500/5 via-transparent to-black/40 pointer-events-none z-10"></div>
          
          {/* Header Indicators */}
          <div className="relative z-10 flex justify-between items-center pointer-events-none">
            <div className="bg-slate-950/80 border border-slate-800 backdrop-blur-md px-3 py-1.5 rounded-full flex items-center gap-2">
              <span className="h-2 w-2 rounded-full bg-emerald-500 animate-ping"></span>
              <span className="text-[10px] font-black font-mono tracking-widest text-emerald-400">GPS SIGNAL LINKED</span>
            </div>
            <span className="text-[9px] font-mono text-slate-500">VALET-TRAK SYSTEM v4.12</span>
          </div>

          {/* Interactive Map Canvas Grid */}
          <div className="absolute inset-0 z-0 opacity-80 overflow-hidden">
            {/* Radar Scan Layer */}
            <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[400px] h-[400px] rounded-full border border-blue-500/10 pointer-events-none">
              <div 
                className="absolute inset-0 bg-gradient-to-r from-blue-500/10 to-transparent rounded-full origin-center"
                style={{ animation: 'radarScan 10s linear infinite', transformOrigin: '50% 50%' }}
              ></div>
            </div>

            {/* Glowing Map Blueprint Streets */}
            <svg className="w-full h-full" xmlns="http://www.w3.org/2000/svg">
              {/* Street grid pattern background */}
              <defs>
                <pattern id="grid" width="40" height="40" patternUnits="userSpaceOnUse">
                  <rect width="40" height="40" fill="none" stroke="#1e293b" strokeWidth="0.5" opacity="0.3" />
                </pattern>
              </defs>
              <rect width="100%" height="100%" fill="url(#grid)" />

              {/* Waterway River */}
              <path d="M -20,200 Q 150,150 250,280 T 600,320" fill="none" stroke="#0f2b48" strokeWidth="32" opacity="0.5" />
              <path d="M -20,200 Q 150,150 250,280 T 600,320" fill="none" stroke="#0284c7" strokeWidth="2" opacity="0.2" />

              {/* Road Blueprint Paths */}
              <path d="M 50,380 L 180,290 L 350,260 L 420,130 L 520,70" fill="none" stroke="#1e293b" strokeWidth="12" strokeLinecap="round" />
              
              {/* Active Route Guideline */}
              <path d="M 50,380 L 180,290 L 350,260 L 420,130 L 520,70" fill="none" stroke="#334155" strokeWidth="3" strokeLinecap="round" strokeDasharray="5 5" />
              
              {/* Completed tracking segment */}
              {orderStep >= 2 && (
                <path 
                  d={orderStep === 3 
                    ? "M 50,380 L 180,290 L 350,260 L 420,130 L 520,70" 
                    : "M 50,380 L 180,290 L 350,260"
                  } 
                  fill="none" 
                  stroke="#10b981" 
                  strokeWidth="3.5" 
                  strokeLinecap="round" 
                />
              )}

              {/* Moving In-Transit Segment */}
              {orderStep === 2 && (
                <path 
                  d="M 350,260 L 420,130 L 520,70" 
                  fill="none" 
                  stroke="#f59e0b" 
                  strokeWidth="3.5" 
                  strokeLinecap="round" 
                  strokeDasharray="6 8"
                  style={{ animation: 'lineDash 2s linear infinite' }}
                />
              )}
            </svg>

            {/* Map Nodes (Upright Pins) */}
            
            {/* Restaurant Node */}
            <div 
              className="absolute flex flex-col items-center" 
              style={{ left: '50px', top: '380px', transform: 'translate(-50%, -85%)' }}
            >
              <div className="bg-slate-900 border border-orange-500/80 px-2 py-1 rounded-sm text-[9px] font-black font-mono text-orange-400 mb-1 shadow-md">
                RESTAURANT
              </div>
              <div className="w-8 h-8 rounded-full bg-orange-500/20 border-2 border-orange-500 flex items-center justify-center text-orange-500 shadow-lg" style={{ animation: 'pulseGlow 2.5s infinite' }}>
                <i className="bi bi-shop text-sm"></i>
              </div>
            </div>

            {/* Courier Rider Node */}
            {(() => {
              let pos = { x: '50px', y: '380px', rotate: 'rotate-0' };
              if (orderStep === 1) pos = { x: '180px', y: '290px', rotate: 'rotate-12' };
              else if (orderStep === 2) pos = { x: '380px', y: '200px', rotate: 'rotate-45' };
              else if (orderStep === 3) pos = { x: '520px', y: '70px', rotate: 'rotate-0' };
              return (
                <div 
                  className="absolute flex flex-col items-center z-20 transition-all duration-[2000ms] ease-in-out" 
                  style={{ left: pos.x, top: pos.y, transform: 'translate(-50%, -85%)' }}
                >
                  <div className="bg-slate-950/90 border border-cyan-400 px-2 py-0.5 rounded-sm text-[8px] font-bold font-mono text-cyan-400 mb-1 shadow-md uppercase">
                    {orderStep === 3 ? "ARRIVED" : "Rider"}
                  </div>
                  <div className="w-10 h-10 rounded-full bg-cyan-500/20 border-2 border-cyan-400 flex items-center justify-center text-cyan-400 shadow-xl scale-110">
                    <i className={`bi bi-bicycle text-lg ${pos.rotate} transition-transform`}></i>
                  </div>
                </div>
              );
            })()}

            {/* Destination Home Node */}
            <div 
              className="absolute flex flex-col items-center" 
              style={{ left: '520px', top: '70px', transform: 'translate(-50%, -85%)' }}
            >
              <div className="bg-slate-900 border border-emerald-500/80 px-2 py-1 rounded-sm text-[9px] font-black font-mono text-emerald-400 mb-1 shadow-md">
                DESTINATION
              </div>
              <div className="w-8 h-8 rounded-full bg-emerald-500/20 border-2 border-emerald-500 flex items-center justify-center text-emerald-500 shadow-lg" style={{ animation: 'pulseGreen 2.5s infinite' }}>
                <i className="bi bi-house-heart text-sm"></i>
              </div>
            </div>

          </div>

          {/* Bottom Telemetry HUD */}
          <div className="relative z-10 grid grid-cols-3 bg-slate-950/90 border border-slate-800 backdrop-blur-md p-4 rounded gap-4 font-mono text-xs">
            <div>
              <span className="text-[10px] text-slate-500 block">EST. DISPATCH TIME</span>
              <span className="text-sm font-bold text-slate-200">12:35 PM</span>
            </div>
            <div>
              <span className="text-[10px] text-slate-500 block">LIVE TRAFFIC</span>
              <span className="text-sm font-bold text-emerald-400">CLEAR</span>
            </div>
            <div>
              <span className="text-[10px] text-slate-500 block">VEHICLE LOG</span>
              <span className="text-sm font-bold text-cyan-400">RIDER-SCOOT</span>
            </div>
          </div>

        </div>

        {/* RIGHT COLUMN: Order Status Hub (5 Cols) */}
        <div className="lg:col-span-5 p-4 md:p-5 flex flex-col justify-between bg-slate-900 space-y-4 lg:h-[480px]">
          
          {/* ETA / Header Section */}
          <div className="space-y-1">
            <span className="text-[10px] font-bold text-orange-500 uppercase tracking-widest block">ORDER TRACKING</span>
            <div className="flex justify-between items-end">
              <div>
                <h3 className="text-2xl font-black tracking-tight">{orderTimeRemaining} mins</h3>
                <p className="text-[10px] text-slate-400 font-semibold mt-0.5">Estimated Delivery Time</p>
              </div>
              <span className="text-[10px] bg-emerald-950 text-emerald-400 px-2 py-1 rounded-sm font-bold border border-emerald-900/30 flex items-center gap-1">
                <span className="w-1.5 h-1.5 rounded-full bg-emerald-400 animate-pulse"></span> ON TIME
              </span>
            </div>
          </div>

          {/* Stepper Steps (swiggy/zomato style) */}
          <div className="space-y-3">
            {[
              { title: "Order Confirmed", desc: "We've received your order and are cooking it up!", statusIndex: 0, icon: "bi-check-circle-fill" },
              { title: "Kitchen Prep", desc: "Chef is packing and wrapping your food items.", statusIndex: 1, icon: "bi-egg-fried" },
              { title: "Out for Delivery", desc: "Our valet has picked up the order & is on the way.", statusIndex: 2, icon: "bi-bicycle" },
              { title: "Arrived", desc: "Order has reached your location. Enjoy your hot food!", statusIndex: 3, icon: "bi-house-heart-fill" }
            ].map((step, idx) => {
              const isDone = orderStep >= step.statusIndex;
              const isActive = orderStep === step.statusIndex;
              return (
                <div key={idx} className="flex gap-3 relative">
                  {/* Vertical Line Connector */}
                  {idx < 3 && (
                    <div className={`absolute left-2.5 top-6 bottom-[-15px] w-0.5 ${orderStep > idx ? 'bg-orange-500' : 'bg-slate-800'}`}></div>
                  )}
                  {/* Status Circle */}
                  <div className={`w-5 h-5 rounded-full flex items-center justify-center border z-10 transition duration-300 ${
                    isDone 
                      ? 'bg-orange-500 border-orange-500 text-slate-900 shadow-[0_0_8px_rgba(249,115,22,0.3)]' 
                      : 'bg-slate-950 border-slate-800 text-slate-600'
                  }`}>
                    <i className={`bi ${step.icon} text-[9px]`}></i>
                  </div>
                  {/* Details */}
                  <div className="flex-1">
                    <h4 className={`text-xs font-bold transition ${isDone ? 'text-white' : 'text-slate-500'}`}>
                      {step.title} {isActive && <span className="text-[9px] text-orange-500 font-bold ml-1.5 tracking-wider uppercase animate-pulse">Active</span>}
                    </h4>
                    <p className={`text-[10px] mt-0.5 leading-relaxed transition ${isDone ? 'text-slate-400' : 'text-slate-600'}`}>{step.desc}</p>
                  </div>
                </div>
              );
            })}
          </div>

          {/* Valet Driver Contact Card */}
          <div className="bg-slate-950/60 border border-slate-850 p-3 rounded flex items-center justify-between">
            <div className="flex items-center gap-3.5">
              <img 
                src="https://api.dicebear.com/7.x/pixel-art/svg?seed=John" 
                alt="Valet Avatar" 
                className="w-9 h-9 rounded-sm border border-slate-800 bg-slate-900" 
              />
              <div>
                <h5 className="font-bold text-xs text-slate-200">Rohan Sharma</h5>
                <span className="text-[9px] font-bold text-amber-500"><i className="bi bi-star-fill"></i> 4.9 (Valet)</span>
              </div>
            </div>
            <div className="flex gap-2">
              <a href="tel:+15550192834" className="w-8 h-8 rounded-sm bg-slate-900 border border-slate-800 text-slate-300 flex items-center justify-center hover:bg-slate-800 transition">
                <i className="bi bi-telephone-fill text-[10px]"></i>
              </a>
              <button 
                onClick={() => toast.success("Rider message: 'Navigating through traffic. Be there soon!'")} 
                className="w-8 h-8 rounded-sm bg-orange-600 text-white flex items-center justify-center hover:bg-orange-700 transition"
              >
                <i className="bi bi-chat-text-fill text-[10px]"></i>
              </button>
            </div>
          </div>

          {/* Collapsible Order Summary & Actions */}
          <div className="space-y-3 pt-2 border-t border-slate-850">
            <button 
              onClick={() => setIsSummaryOpen(!isSummaryOpen)}
              className="w-full flex items-center justify-between text-xs font-bold text-slate-400 hover:text-white transition"
            >
              <span>{isSummaryOpen ? "Hide" : "Show"} Order Details ({displayItems.length} items)</span>
              <i className={`bi ${isSummaryOpen ? 'bi-chevron-up' : 'bi-chevron-down'}`}></i>
            </button>

            {isSummaryOpen && (
              <div className="bg-slate-950/40 p-3.5 rounded border border-slate-850 text-xs font-mono space-y-2 animate-fadeIn">
                {displayItems.map((item, idx) => (
                  <div key={idx} className="flex justify-between text-slate-300">
                    <span>{item.name} x{item.qty || 1}</span>
                    <span>₹{(item.price || 0) * (item.qty || 1)}</span>
                  </div>
                ))}
                <div className="border-t border-slate-800/60 pt-2 flex justify-between font-bold text-white">
                  <span>Total Amount Paid</span>
                  <span>₹{displayItems.reduce((acc, curr) => acc + ((curr.price || 0) * (curr.qty || 1)), 0) + 45}</span>
                </div>
              </div>
            )}

            {/* Simulation Skipper Fast-Forward */}
            <div className="flex gap-2 w-full">
              <button 
                onClick={() => {
                  if (orderStep < 3) {
                    setOrderStep(p => p + 1);
                    toast.success("Order status updated! ⚡");
                  } else {
                    toast.success("Order already arrived at destination! 🏡");
                  }
                }}
                className="flex-1 bg-slate-800 hover:bg-slate-700 text-white font-bold py-2 rounded text-xs transition flex items-center justify-center gap-1.5"
              >
                <i className="bi bi-fast-forward-fill"></i> Fast Forward Status
              </button>
              
              <button 
                onClick={() => setActiveTab('overview')} 
                className="bg-slate-950 border border-slate-850 hover:bg-slate-900 text-slate-300 font-bold px-4 py-2 rounded text-xs transition"
              >
                Go Back
              </button>
            </div>
          </div>

        </div>

      </div>

    </div>
  );
};

export default TrackingTab;
