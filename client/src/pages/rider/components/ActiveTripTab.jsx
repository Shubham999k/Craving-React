import React, { useState, useEffect } from 'react';

const activeDelivery = {
  id: '#CR-D902',
  pickup: 'Under The Mango Tree Restaurant',
  dropoff: 'Building 4B, Sector 62, City Center',
  payout: 75,
  distance: '3.4 km',
  timeRemaining: '12 min',
  status: 'picking_up' // picking_up, delivering, arrived
};

export default function ActiveTripTab() {
  const [tripStatus, setTripStatus] = useState(activeDelivery.status);

  // Map placeholders
  const mapImage = "https://images.unsplash.com/photo-1524661135-423995f22d0b?ixlib=rb-4.0.3&auto=format&fit=crop&w=1600&q=80";

  const styles = {
    layoutGrid: "grid grid-cols-1 lg:grid-cols-3 gap-6",
    leftColumn: "lg:col-span-2 space-y-6",
    cardBase: "bg-white dark:bg-slate-900 rounded-2xl border border-slate-200 dark:border-slate-800 shadow-sm overflow-hidden flex flex-col",
    mapContainer: "h-64 sm:h-80 w-full relative bg-slate-200 dark:bg-slate-800",
    mapImage: "w-full h-full object-cover opacity-80",
    mapGradient: "absolute inset-0 bg-gradient-to-t from-slate-900/50 to-transparent",
    mapFab: "absolute bottom-4 right-4 bg-white dark:bg-slate-800 text-slate-800 dark:text-white p-3 rounded-full shadow-lg border border-slate-200 dark:border-slate-700 hover:scale-105 transition-transform cursor-pointer",
    mapFabIcon: "bi bi-geo-alt-fill text-xl text-orange-600",
    statusBadge: "bg-white/90 dark:bg-slate-900/90 backdrop-blur-md text-slate-800 dark:text-white px-4 py-2 rounded-xl text-sm font-black shadow-lg flex items-center gap-2 border border-slate-200/50 dark:border-slate-700/50",
    pulseIndicator: "w-2.5 h-2.5 rounded-full bg-green-500 animate-pulse",
    headerFlex: "flex justify-between items-end mb-8",
    labelSmall: "text-xs font-bold text-slate-500 dark:text-slate-400 uppercase tracking-wider mb-1",
    valueLarge: "text-xl font-black text-slate-800 dark:text-white",
    payoutAmount: "text-3xl font-black text-green-600 dark:text-green-500",
    timelineContainer: "relative pl-6 space-y-8 before:content-[''] before:absolute before:left-[11px] before:top-2 before:bottom-2 before:w-[2px] before:bg-slate-200 dark:before:bg-slate-800",
    timelineNodeBase: "absolute -left-[31px] w-6 h-6 rounded-full border-4 border-white dark:border-slate-900 flex items-center justify-center",
    timelineTitle: "font-extrabold text-slate-800 dark:text-white",
    timelineDesc: "text-sm text-slate-600 dark:text-slate-400 font-medium mt-1",
    timelineAlert: "text-xs font-bold text-orange-600 dark:text-orange-500 mt-2 flex items-center gap-1",
    timelineAlertBlue: "text-xs font-bold text-blue-600 dark:text-blue-500 mt-2 flex items-center gap-1",
    actionCard: "bg-white dark:bg-slate-900 rounded-2xl border border-slate-200 dark:border-slate-800 p-6 shadow-sm",
    cardTitle: "font-black text-slate-800 dark:text-white text-lg mb-4",
    primaryBtn: "w-full bg-[#c74a09] hover:bg-orange-700 text-white font-black py-4 rounded-xl text-sm transition shadow-lg shadow-orange-500/30 flex items-center justify-center gap-2 cursor-pointer",
    successBtn: "w-full bg-green-600 hover:bg-green-700 text-white font-black py-4 rounded-xl text-sm transition shadow-lg shadow-green-500/30 flex items-center justify-center gap-2 cursor-pointer",
    secondaryBtn: "bg-slate-100 dark:bg-slate-800 hover:bg-slate-200 dark:hover:bg-slate-700 text-slate-700 dark:text-slate-300 font-bold py-3 rounded-xl text-xs transition cursor-pointer flex items-center justify-center gap-2",
    dangerBtn: "bg-red-50 dark:bg-red-500/10 hover:bg-red-100 dark:hover:bg-red-500/20 text-red-600 dark:text-red-400 font-bold py-3 rounded-xl text-xs transition cursor-pointer flex items-center justify-center gap-2",
    notesBox: "bg-orange-50 dark:bg-orange-500/10 border border-orange-100 dark:border-orange-500/20 p-4 rounded-xl",
    notesText: "text-sm text-slate-700 dark:text-slate-300 font-medium italic",
    customerRow: "mt-6 flex items-center gap-4 pt-6 border-t border-slate-100 dark:border-slate-800",
    customerAvatar: "w-12 h-12 rounded-full bg-slate-200 dark:bg-slate-800 flex items-center justify-center text-xl",
    callBtn: "ml-auto w-10 h-10 rounded-full bg-green-100 text-green-600 dark:bg-green-500/20 dark:text-green-400 flex items-center justify-center hover:bg-green-200 dark:hover:bg-green-500/30 transition cursor-pointer"
  };

  return (
    <div className="space-y-6">
      
      <div className={styles.layoutGrid}>
        
        {/* Left Column: Map & Route Info */}
        <div className={styles.leftColumn}>
          <div className={styles.cardBase}>
            {/* Fake Map Area */}
            <div className={styles.mapContainer}>
              <img src={mapImage} alt="Map Route" className={styles.mapImage} />
              <div className={styles.mapGradient}></div>
              
              {/* Floating Action Button on Map */}
              <button className={styles.mapFab}>
                <i className={styles.mapFabIcon}></i>
              </button>

              {/* Status Badge */}
              <div className="absolute top-4 left-4">
                <span className={styles.statusBadge}>
                  <span className={styles.pulseIndicator}></span>
                  {tripStatus === 'picking_up' ? 'Heading to Restaurant' : 'Heading to Customer'}
                </span>
              </div>
            </div>

            {/* Trip Timeline Details */}
            <div className="p-6">
              <div className={styles.headerFlex}>
                <div>
                  <p className={styles.labelSmall}>Order ID</p>
                  <h3 className={styles.valueLarge}>{activeDelivery.id}</h3>
                </div>
                <div className="text-right">
                  <h2 className={styles.payoutAmount}>₹{activeDelivery.payout}</h2>
                  <p className="text-xs font-bold text-slate-500 dark:text-slate-400 mt-1">Est. Payout</p>
                </div>
              </div>

              {/* Timeline */}
              <div className={styles.timelineContainer}>
                {/* Pickup Node */}
                <div className="relative">
                  <div className={`${styles.timelineNodeBase} ${tripStatus === 'picking_up' ? 'bg-orange-500 shadow-[0_0_15px_rgba(249,115,22,0.5)]' : 'bg-slate-300 dark:bg-slate-700'}`}>
                    {tripStatus !== 'picking_up' && <i className="bi bi-check text-white text-xs"></i>}
                  </div>
                  <div className={`${tripStatus === 'picking_up' ? 'opacity-100' : 'opacity-50'} transition-opacity`}>
                    <h4 className={styles.timelineTitle}>Pickup</h4>
                    <p className={styles.timelineDesc}>{activeDelivery.pickup}</p>
                    {tripStatus === 'picking_up' && (
                      <p className={styles.timelineAlert}>
                        <i className="bi bi-clock-fill"></i> Arriving in 4 mins
                      </p>
                    )}
                  </div>
                </div>

                {/* Dropoff Node */}
                <div className="relative">
                  <div className={`${styles.timelineNodeBase} bg-slate-300 dark:bg-slate-700 ${tripStatus === 'delivering' ? 'bg-blue-500 shadow-[0_0_15px_rgba(59,130,246,0.5)]' : ''}`}></div>
                  <div className={`${tripStatus === 'delivering' ? 'opacity-100' : 'opacity-50'} transition-opacity`}>
                    <h4 className={styles.timelineTitle}>Dropoff</h4>
                    <p className={styles.timelineDesc}>{activeDelivery.dropoff}</p>
                    {tripStatus === 'delivering' && (
                      <p className={styles.timelineAlertBlue}>
                        <i className="bi bi-clock-fill"></i> {activeDelivery.timeRemaining} away ({activeDelivery.distance})
                      </p>
                    )}
                  </div>
                </div>
              </div>

            </div>
          </div>
        </div>

        {/* Right Column: Actions & Customer Info */}
        <div className="space-y-6">
          
          {/* Action Card */}
          <div className={styles.actionCard}>
            <h3 className={styles.cardTitle}>Trip Actions</h3>
            
            {tripStatus === 'picking_up' ? (
              <button 
                onClick={() => setTripStatus('delivering')}
                className={styles.primaryBtn}
              >
                Confirm Pickup <i className="bi bi-arrow-right"></i>
              </button>
            ) : (
              <button 
                onClick={() => setTripStatus('picking_up')} // Reset for demo
                className={styles.successBtn}
              >
                Complete Delivery <i className="bi bi-check-circle-fill"></i>
              </button>
            )}

            <div className="grid grid-cols-2 gap-3 mt-4">
              <button className={styles.secondaryBtn}>
                <i className="bi bi-telephone-fill"></i> Call Rest.
              </button>
              <button className={styles.dangerBtn}>
                <i className="bi bi-x-circle-fill"></i> Issue
              </button>
            </div>
          </div>

          {/* Customer Details */}
          <div className={styles.actionCard}>
            <h3 className={styles.cardTitle}>Delivery Notes</h3>
            <div className={styles.notesBox}>
              <p className={styles.notesText}>
                "Please ring the doorbell and leave the package on the small table near the door. Beware of dog."
              </p>
            </div>

            <div className={styles.customerRow}>
              <div className={styles.customerAvatar}>
                👤
              </div>
              <div>
                <h4 className="font-bold text-slate-800 dark:text-white">Aman Verma</h4>
                <p className="text-xs text-slate-500 dark:text-slate-400">Customer</p>
              </div>
              <button className={styles.callBtn}>
                <i className="bi bi-telephone-fill"></i>
              </button>
            </div>
          </div>

        </div>

      </div>
    </div>
  );
}
