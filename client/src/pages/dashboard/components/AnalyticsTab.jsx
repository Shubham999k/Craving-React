import React from 'react';

const AnalyticsTab = ({
  selectedChart,
  setSelectedChart,
  hoveredIndex,
  setHoveredIndex,
  hoveredSlice,
  setHoveredSlice,
  orders = [],
  monthlySpendData = { months: ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun'], values: [0, 0, 0, 0, 0, 0] },
  categoryDistribution = { categories: { Pizza: 0, Burger: 0, Biryani: 0, Desserts: 0, Beverages: 0 }, totalCount: 0 }
}) => {
  const totalSpent = orders.reduce((sum, order) => sum + order.total, 0);
  const { months = ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun'], values = [0, 0, 0, 0, 0, 0] } = monthlySpendData || {};
  const { categories = { Pizza: 0, Burger: 0, Biryani: 0, Desserts: 0, Beverages: 0 }, totalCount = 0 } = categoryDistribution || {};

  // Chart coordinate calculations
  const xCoords = [50, 130, 210, 290, 370, 450];
  const maxVal = Math.max(...values, 1000);
  const yCoords = values.map(v => 140 - (v / maxVal) * 100); // map to y-range 40-140

  // Build dynamic spline path
  const buildSplinePath = () => {
    if (values.every(v => v === 0)) {
      return `M 50,140 L 130,140 L 210,140 L 290,140 L 370,140 L 450,140`;
    }
    let path = `M ${xCoords[0]},${yCoords[0]}`;
    for (let i = 0; i < 5; i++) {
      const cx1 = (xCoords[i] + xCoords[i + 1]) / 2;
      const cy1 = yCoords[i];
      const cx2 = (xCoords[i] + xCoords[i + 1]) / 2;
      const cy2 = yCoords[i + 1];
      path += ` C ${cx1},${cy1} ${cx2},${cy2} ${xCoords[i + 1]},${yCoords[i + 1]}`;
    }
    return path;
  };

  const linePath = buildSplinePath();
  const areaPath = `${linePath} L 450,150 L 50,150 Z`;

  // Pre-calculate category donut slices
  const categoryConfig = [
    { cat: 'Burger', color: 'bg-red-500', stroke: '#ef4444' },
    { cat: 'Beverages', color: 'bg-yellow-500', stroke: '#f59e0b' },
    { cat: 'Desserts', color: 'bg-emerald-500', stroke: '#10b981' },
    { cat: 'Pizza', color: 'bg-orange-500', stroke: '#f97316' },
    { cat: 'Biryani', color: 'bg-blue-500', stroke: '#3b82f6' }
  ];

  let accumulatedPercent = 0;
  const categoriesList = categoryConfig.map(el => {
    const count = categories[el.cat] || 0;
    const pct = totalCount > 0 ? Math.round((count / totalCount) * 100) : 0;
    const strokeDasharray = `${pct} ${100 - pct}`;
    const strokeDashoffset = -accumulatedPercent;
    accumulatedPercent += pct;

    return {
      ...el,
      count,
      pct,
      strokeDasharray,
      strokeDashoffset
    };
  });

  const isEmpty = orders.length === 0;

  return (
    <div className="space-y-8 animate-fadeIn duration-500">
      <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4">
        <div>
          <h2 className="text-2xl font-black text-slate-800 dark:text-slate-100 flex items-center gap-2">
            <i className="bi bi-pie-chart text-orange-600"></i> Spend Insights & Habits
          </h2>
          <p className="text-xs text-slate-500 dark:text-slate-400 font-medium mt-0.5">Visualize your dining habits and monthly expenses</p>
        </div>

        {/* Chart Selector Segmented Control */}
        <div className="relative flex bg-slate-100 dark:bg-slate-900 p-1 rounded border border-slate-200 dark:border-slate-800 w-[220px] select-none">
          {/* Sliding Indicator */}
          <div 
            className="absolute top-1 bottom-1 left-1 bg-white dark:bg-slate-800 rounded-sm shadow-sm transition-all duration-300 ease-out z-0"
            style={{
              width: 'calc(50% - 4px)',
              transform: selectedChart === 'bar' ? 'translateX(100%)' : 'translateX(0)'
            }}
          ></div>
          
          <button
            onClick={() => setSelectedChart('line')}
            className={`relative z-10 w-1/2 py-1.5 rounded-sm text-xs font-bold transition-colors duration-300 flex items-center justify-center gap-1.5 cursor-pointer ${
              selectedChart === 'line'
                ? 'text-orange-600 dark:text-orange-500'
                : 'text-slate-500 dark:text-slate-400 hover:text-slate-800 dark:hover:text-slate-200'
            }`}
          >
            <i className="bi bi-graph-up"></i> Area Flow
          </button>
          
          <button
            onClick={() => setSelectedChart('bar')}
            className={`relative z-10 w-1/2 py-1.5 rounded-sm text-xs font-bold transition-colors duration-300 flex items-center justify-center gap-1.5 cursor-pointer ${
              selectedChart === 'bar'
                ? 'text-orange-600 dark:text-orange-500'
                : 'text-slate-500 dark:text-slate-400 hover:text-slate-800 dark:hover:text-slate-200'
            }`}
          >
            <i className="bi bi-bar-chart-line-fill"></i> Pillars
          </button>
        </div>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 relative">
        
        {/* Empty state overlay for charts */}
        {isEmpty && (
          <div className="absolute inset-0 bg-slate-50/50 dark:bg-slate-950/50 backdrop-blur-xs z-30 rounded-md flex flex-col items-center justify-center p-8 text-center border border-dashed border-slate-300 dark:border-slate-800">
            <div className="w-16 h-16 rounded-full bg-orange-50 dark:bg-orange-950/20 flex items-center justify-center mb-4">
              <i className="bi bi-graph-up-arrow text-2xl text-orange-600"></i>
            </div>
            <h3 className="text-lg font-black text-slate-800 dark:text-slate-100">No Analytics Yet</h3>
            <p className="text-xs text-slate-500 dark:text-slate-400 max-w-sm mt-1">Place your first order using the Menu to generate spending flow and dining habits reports!</p>
          </div>
        )}

        {/* Spend Chart SVG */}
        <div className={`bg-white dark:bg-slate-900 p-6 rounded-md border border-slate-100 dark:border-slate-800 shadow-sm space-y-6 relative overflow-hidden group ${isEmpty ? 'opacity-40' : ''}`}>
          <div className="flex justify-between items-start">
            <div>
              <h3 className="font-black text-slate-800 dark:text-slate-100 text-lg">Monthly Spending</h3>
              <p className="text-xs text-slate-400 dark:text-slate-500 font-medium">Last 6 Months Trend</p>
            </div>
            <div className="text-right">
              <span className="text-xs font-bold text-slate-400 dark:text-slate-500">Total Spent</span>
              <h4 className="text-xl font-black text-slate-800 dark:text-slate-100">₹{totalSpent.toLocaleString()}</h4>
            </div>
          </div>

          {/* SVG Graph Container */}
          <div className="relative h-64 w-full bg-gradient-to-b from-slate-50 to-white dark:from-slate-950 dark:to-slate-900 rounded flex flex-col justify-between p-4 border border-slate-100/80 dark:border-slate-800/80 shadow-inner overflow-visible">
            
            {/* Grid Lines */}
            <div className="absolute inset-0 flex flex-col justify-between p-4 py-8 pointer-events-none opacity-45">
              <div className="border-b border-dashed border-slate-200 dark:border-slate-800 w-full flex justify-between">
                <span></span>
                <span className="text-[9px] text-slate-400 dark:text-slate-500 font-semibold -mt-3.5">₹{Math.round(maxVal).toLocaleString()}</span>
              </div>
              <div className="border-b border-dashed border-slate-200 dark:border-slate-800 w-full flex justify-between">
                <span></span>
                <span className="text-[9px] text-slate-400 dark:text-slate-500 font-semibold -mt-3.5">₹{Math.round(maxVal / 2).toLocaleString()}</span>
              </div>
              <div className="border-b border-dashed border-slate-200 dark:border-slate-800 w-full flex justify-between">
                <span></span>
                <span className="text-[9px] text-slate-400 dark:text-slate-500 font-semibold -mt-3.5">₹0</span>
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
                    d={areaPath}
                    fill="url(#chartAreaGrad)"
                  />

                  {/* Spline Line Path */}
                  <path
                    d={linePath}
                    fill="none"
                    stroke="url(#chartLineGrad)"
                    strokeWidth="3.5"
                    strokeLinecap="round"
                    filter="url(#glow)"
                  />

                  {/* Chart Grid dots / interactive points */}
                  {values.map((val, i) => (
                    <g key={i} className="cursor-pointer" onMouseEnter={() => setHoveredIndex(i)} onMouseLeave={() => setHoveredIndex(null)}>
                      {/* Inner Circle Glow */}
                      <circle
                        cx={xCoords[i]}
                        cy={yCoords[i]}
                        r={hoveredIndex === i ? 9 : 5}
                        className="fill-orange-500 stroke-white dark:stroke-slate-900 stroke-2 transition-all duration-300"
                      />
                      {hoveredIndex === i && (
                        <circle
                          cx={xCoords[i]}
                          cy={yCoords[i]}
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
                    className="absolute bg-slate-900 dark:bg-slate-800 text-white px-3 py-1.5 rounded text-xs font-black shadow-lg pointer-events-none transition-all duration-200 -translate-x-1/2 translate-y-2 border border-slate-800 dark:border-slate-700 flex flex-col items-center z-20"
                    style={{
                      left: `${(hoveredIndex * 80) + 50}px`,
                      top: `${yCoords[hoveredIndex] + 12}px`
                    }}
                  >
                    <span className="text-[10px] text-slate-400 dark:text-slate-500 uppercase font-bold">
                      {months[hoveredIndex]} Spend
                    </span>
                    <span className="text-sm text-amber-400">₹{values[hoveredIndex].toLocaleString()}</span>
                  </div>
                )}

                {/* X Axis labels */}
                <div className="absolute left-0 right-0 bottom-0 flex justify-between px-3 text-[10px] font-black text-slate-500 dark:text-slate-400 pointer-events-none">
                  {months.map((month, idx) => (
                    <span key={idx}>{month}</span>
                  ))}
                </div>
              </div>
            ) : (
              <div className="relative flex justify-around items-end w-full h-44 z-10">
                {values.map((val, idx) => {
                  const percentage = (val / maxVal) * 100;
                  const isHovered = hoveredIndex === idx;
                  return (
                    <div
                      key={idx}
                      className="flex flex-col items-center justify-end h-full group w-12 cursor-pointer relative"
                      onMouseEnter={() => setHoveredIndex(idx)}
                      onMouseLeave={() => setHoveredIndex(null)}
                    >
                      {/* Animated Tooltip */}
                      <span className={`transition-all duration-300 bg-slate-900 dark:bg-slate-850 text-white text-[10px] px-2.5 py-1.5 rounded absolute top-[102%] font-black shadow-lg z-20 flex flex-col items-center border border-slate-800/80 dark:border-slate-700 ${
                        isHovered ? 'scale-100 opacity-100 translate-y-0' : 'scale-90 opacity-0 translate-y-[-4px] pointer-events-none'
                      }`}>
                        <span className="text-[8px] text-slate-400 dark:text-slate-500 uppercase tracking-widest">{months[idx]}</span>
                        <span className="text-amber-400 font-black">₹{val.toLocaleString()}</span>
                      </span>

                      {/* Animated Pillar with Glow */}
                      <div 
                        className={`w-8 rounded-t-sm transition-all duration-500 shadow-md ${
                          isHovered 
                            ? 'bg-gradient-to-t from-orange-600 to-amber-500 scale-x-110 shadow-orange-200' 
                            : 'bg-gradient-to-t from-orange-500 to-amber-400'
                        }`}
                        style={{ height: `${percentage}%` }}
                      ></div>
                      <span className={`text-[10px] font-black mt-2 transition-colors duration-200 ${
                        isHovered ? 'text-orange-600' : 'text-slate-500 dark:text-slate-400'
                      }`}>{months[idx]}</span>
                    </div>
                  );
                })}
              </div>
            )}

          </div>
        </div>

        {/* Pie/Donut Categories Ordered */}
        <div className={`bg-white dark:bg-slate-900 p-6 rounded-md border border-slate-100 dark:border-slate-800 shadow-sm space-y-4 ${isEmpty ? 'opacity-40' : ''}`}>
          <div>
            <h3 className="font-black text-slate-800 dark:text-slate-100 text-lg">Category Distribution</h3>
            <p className="text-xs text-slate-400 dark:text-slate-500 font-medium">Favorite dishes based on orders count</p>
          </div>

          <div className="flex flex-col sm:flex-row items-center justify-around gap-6 py-4">
            {/* SVG Donut Representation */}
            <div className="relative w-40 h-40 flex items-center justify-center">
              <svg className="w-full h-full transform -rotate-90" viewBox="0 0 36 36">
                {/* Grey Track */}
                <circle cx="18" cy="18" r="15.915" fill="transparent" stroke="#1e293b" strokeWidth="3" />

                {/* Categories slices rendering */}
                {categoriesList.map((el, i) => (
                  <circle
                    key={i}
                    cx="18"
                    cy="18"
                    r="15.915"
                    fill="transparent"
                    stroke={el.stroke}
                    strokeWidth={hoveredSlice === el.cat ? "4.5" : "3.5"}
                    strokeDasharray={el.strokeDasharray}
                    strokeDashoffset={el.strokeDashoffset}
                    className="transition-all duration-300 cursor-pointer"
                    onMouseEnter={() => setHoveredSlice(el.cat)}
                    onMouseLeave={() => setHoveredSlice(null)}
                  />
                ))}
              </svg>

              {/* Donut Center Label */}
              <div className="absolute text-center flex flex-col items-center justify-center pointer-events-none">
                {hoveredSlice ? (
                  <>
                    <span className="text-[10px] font-extrabold text-slate-400 dark:text-slate-500 uppercase tracking-wider">{hoveredSlice}</span>
                    <span className="text-xl font-black text-slate-800 dark:text-slate-100">
                      {Math.round((categories[hoveredSlice] || 0) / (totalCount || 1) * 100)}%
                    </span>
                  </>
                ) : (
                  <>
                    <span className="text-[10px] font-extrabold text-slate-400 dark:text-slate-500 uppercase tracking-wider">Total</span>
                    <span className="text-xl font-black text-slate-800 dark:text-slate-100">{totalCount} Item{totalCount !== 1 ? 's' : ''}</span>
                  </>
                )}
              </div>
            </div>

            {/* Legends */}
            <div className="space-y-2.5">
              {categoriesList.map((el, i) => (
                <div
                  key={i}
                  className={`flex items-center gap-3 px-3 py-1.5 rounded-sm text-xs font-bold text-slate-700 dark:text-slate-300 transition cursor-pointer border ${
                    hoveredSlice === el.cat
                      ? 'bg-slate-50 dark:bg-slate-800 border-slate-100 dark:border-slate-700 scale-105'
                      : 'border-transparent hover:bg-slate-50 dark:hover:bg-slate-800/50'
                  }`}
                  onMouseEnter={() => setHoveredSlice(el.cat)}
                  onMouseLeave={() => setHoveredSlice(null)}
                >
                  <span className={`w-3 h-3 rounded-full shrink-0 ${el.color} ${
                    hoveredSlice === el.cat ? 'ring-4 ring-offset-0 ring-slate-100 dark:ring-slate-800' : ''
                  }`}></span>
                  <span>{el.cat} <b className="text-slate-400 dark:text-slate-500 font-medium">({el.count} - {el.pct}%)</b></span>
                </div>
              ))}
            </div>
          </div>
        </div>

      </div>
    </div>
  );
};

export default AnalyticsTab;
