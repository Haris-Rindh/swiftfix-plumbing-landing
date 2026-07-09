import React from 'react';

export default function AnalyticsCharts({ leads }) {
  // --- 1. Compute Weekly Trends (Last 7 Days) ---
  const getWeeklyData = () => {
    const dayCounts = {};
    const days = [];
    
    // Get last 7 days keys (e.g. "Jul 7")
    for (let i = 6; i >= 0; i--) {
      const d = new Date();
      d.setDate(d.getDate() - i);
      const dayName = d.toLocaleDateString(undefined, { month: 'short', day: 'numeric' });
      days.push(dayName);
      dayCounts[dayName] = 0;
    }

    // Populate counts
    leads.forEach(lead => {
      const dateName = new Date(lead.createdAt).toLocaleDateString(undefined, { month: 'short', day: 'numeric' });
      if (dayCounts[dateName] !== undefined) {
        dayCounts[dateName]++;
      }
    });

    return days.map(day => ({
      day,
      count: dayCounts[day]
    }));
  };

  const weeklyData = getWeeklyData();
  const maxCount = Math.max(...weeklyData.map(d => d.count), 5); // Fallback to min height 5 for scale

  // --- 2. Compute Distribution Data (Categories) ---
  const categories = {
    emergency: { label: 'Emergency', color: '#ef4444', count: 0 },
    leak: { label: 'Leak Repair', color: '#0ea5e9', count: 0 },
    clog: { label: 'Drain Clog', color: '#3b82f6', count: 0 },
    heater: { label: 'Heaters', color: '#f59e0b', count: 0 },
    install: { label: 'Installations', color: '#10b981', count: 0 }
  };

  leads.forEach(lead => {
    if (categories[lead.issue] !== undefined) {
      categories[lead.issue].count++;
    }
  });

  const totalCategorized = Object.values(categories).reduce((sum, c) => sum + c.count, 0);

  // --- Donut Calculations ---
  let accumulatedPercent = 0;
  const donutData = Object.values(categories)
    .filter(c => c.count > 0)
    .map(c => {
      const percent = totalCategorized > 0 ? (c.count / totalCategorized) * 100 : 0;
      const startPercent = accumulatedPercent;
      accumulatedPercent += percent;
      return {
        ...c,
        percent,
        startPercent
      };
    });

  // SVG parameters
  const chartWidth = 500;
  const chartHeight = 180;
  const paddingX = 40;
  const paddingY = 20;

  // Calculate coordinates for line chart points
  const points = weeklyData.map((data, index) => {
    const x = paddingX + (index * (chartWidth - paddingX * 2)) / 6;
    const y = chartHeight - paddingY - (data.count * (chartHeight - paddingY * 2)) / maxCount;
    return { x, y, count: data.count, day: data.day };
  });

  // Build SVG path
  const linePath = points.map((p, i) => `${i === 0 ? 'M' : 'L'} ${p.x} ${p.y}`).join(' ');
  const areaPath = points.length > 0
    ? `${linePath} L ${points[points.length - 1].x} ${chartHeight - paddingY} L ${points[0].x} ${chartHeight - paddingY} Z`
    : '';

  return (
    <div className="grid grid-cols-1 lg:grid-cols-3 gap-6 mb-8 text-left">
      
      {/* Chart 1: Line Chart (Weekly Lead Volume) */}
      <div className="lg:col-span-2 bg-white p-6 rounded-2xl border border-slate-200 shadow-sm">
        <h3 className="text-lg font-bold text-slate-900 mb-4 flex items-center gap-2">
          <span className="w-2.5 h-2.5 rounded-full bg-swift-blue"></span>
          Weekly Lead Trends
        </h3>
        
        <div className="relative">
          <svg viewBox={`0 0 ${chartWidth} ${chartHeight}`} className="w-full h-auto">
            {/* Definitions for Gradients */}
            <defs>
              <linearGradient id="areaGrad" x1="0" y1="0" x2="0" y2="1">
                <stop offset="0%" stopColor="#0ea5e9" stopOpacity="0.25" />
                <stop offset="100%" stopColor="#0ea5e9" stopOpacity="0.00" />
              </linearGradient>
            </defs>

            {/* Grid Lines */}
            {[0, 1, 2, 3, 4].map((grid, index) => {
              const y = paddingY + (index * (chartHeight - paddingY * 2)) / 4;
              const value = Math.round(maxCount - (index * maxCount) / 4);
              return (
                <g key={index} className="opacity-40">
                  <line 
                    x1={paddingX} 
                    y1={y} 
                    x2={chartWidth - paddingX} 
                    y2={y} 
                    stroke="#cbd5e1" 
                    strokeWidth="1" 
                    strokeDasharray="4 4" 
                  />
                  <text 
                    x={paddingX - 10} 
                    y={y + 4} 
                    fill="#64748b" 
                    fontSize="10" 
                    textAnchor="end"
                    fontWeight="bold"
                  >
                    {value}
                  </text>
                </g>
              );
            })}

            {/* Area Fill */}
            {areaPath && <path d={areaPath} fill="url(#areaGrad)" />}

            {/* Line Path */}
            {linePath && (
              <path 
                d={linePath} 
                fill="none" 
                stroke="#0ea5e9" 
                strokeWidth="3.5" 
                strokeLinecap="round"
                strokeLinejoin="round"
              />
            )}

            {/* Data Dots & Tooltips */}
            {points.map((p, i) => (
              <g key={i} className="group">
                <circle 
                  cx={p.x} 
                  cy={p.y} 
                  r="5" 
                  fill="#0ea5e9" 
                  stroke="#ffffff" 
                  strokeWidth="2.5" 
                  className="transition-all duration-200 cursor-pointer hover:r-7" 
                />
                <circle 
                  cx={p.x} 
                  cy={p.y} 
                  r="12" 
                  fill="#0ea5e9" 
                  fillOpacity="0"
                  className="cursor-pointer"
                />
                <text
                  x={p.x}
                  y={p.y - 12}
                  fill="#0284c7"
                  fontSize="10"
                  fontWeight="bold"
                  textAnchor="middle"
                  className="opacity-0 group-hover:opacity-100 transition-opacity bg-white"
                >
                  {p.count}
                </text>
              </g>
            ))}

            {/* X-Axis Labels */}
            {points.map((p, i) => (
              <text 
                key={i} 
                x={p.x} 
                y={chartHeight - 4} 
                fill="#64748b" 
                fontSize="10" 
                textAnchor="middle"
                fontWeight="semibold"
              >
                {p.day}
              </text>
            ))}
          </svg>
        </div>
      </div>

      {/* Chart 2: Donut Chart (Issue Distribution) */}
      <div className="bg-white p-6 rounded-2xl border border-slate-200 shadow-sm flex flex-col justify-between">
        <div>
          <h3 className="text-lg font-bold text-slate-900 mb-4 flex items-center gap-2">
            <span className="w-2.5 h-2.5 rounded-full bg-yellow-500"></span>
            Service Distribution
          </h3>
        </div>

        {totalCategorized === 0 ? (
          <div className="py-12 text-center text-slate-400 font-medium">
            No data available
          </div>
        ) : (
          <div className="flex flex-col sm:flex-row items-center gap-6">
            
            {/* SVG Donut */}
            <div className="relative w-36 h-36 flex-shrink-0">
              <svg viewBox="0 0 200 200" className="w-full h-full transform -rotate-90">
                <circle 
                  cx="100" 
                  cy="100" 
                  r="75" 
                  fill="none" 
                  stroke="#f1f5f9" 
                  strokeWidth="20" 
                />
                {donutData.map((data, index) => {
                  const r = 75;
                  const circumference = 2 * Math.PI * r;
                  const strokeLength = (data.percent / 100) * circumference;
                  const strokeOffset = circumference - ((data.startPercent / 100) * circumference);

                  return (
                    <circle
                      key={index}
                      cx="100"
                      cy="100"
                      r={r}
                      fill="none"
                      stroke={data.color}
                      strokeWidth="20"
                      strokeDasharray={`${strokeLength} ${circumference}`}
                      strokeDashoffset={strokeOffset}
                      strokeLinecap="round"
                    />
                  );
                })}
              </svg>
              <div className="absolute inset-0 flex flex-col justify-center items-center">
                <span className="text-xl font-black text-slate-900">{totalCategorized}</span>
                <span className="text-[10px] uppercase font-bold text-slate-400">Total Leads</span>
              </div>
            </div>

            {/* Legend */}
            <div className="space-y-2 text-xs w-full">
              {Object.keys(categories).map(key => {
                const count = categories[key].count;
                if (count === 0) return null;
                const percent = Math.round((count / totalCategorized) * 100);
                
                return (
                  <div key={key} className="flex justify-between items-center font-medium">
                    <div className="flex items-center gap-2">
                      <span className="w-2.5 h-2.5 rounded-full flex-shrink-0" style={{ backgroundColor: categories[key].color }}></span>
                      <span className="text-slate-600">{categories[key].label}</span>
                    </div>
                    <span className="font-bold text-slate-900">{count} ({percent}%)</span>
                  </div>
                );
              })}
            </div>
          </div>
        )}
      </div>

    </div>
  );
}
