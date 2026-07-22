import React from 'react';

const reviews = [
  { id: 1, name: "Arjun M.", rating: 5, date: "2 days ago", comment: "Super fast delivery! Food was piping hot.", tags: ["Fast", "Friendly"] },
  { id: 2, name: "Sneha P.", rating: 5, date: "4 days ago", comment: "Very polite rider, followed delivery instructions perfectly.", tags: ["Followed Instructions", "Polite"] },
  { id: 3, name: "Rahul K.", rating: 4, date: "1 week ago", comment: "Good delivery, but finding my building took a bit of time.", tags: [] },
  { id: 4, name: "Priya S.", rating: 5, date: "2 weeks ago", comment: "Always smiling and quick. Great job!", tags: ["Friendly", "Careful with Food"] },
];

export default function RatingsTab() {
  return (
    <div className="space-y-6">
      
      {/* Top Section */}
      <div className="grid grid-cols-1 md:grid-cols-12 gap-6">
        
        {/* Overall Rating Card */}
        <div className="md:col-span-5 bg-[#c74a09] rounded-2xl p-8 text-white flex flex-col items-center justify-center text-center shadow-lg relative overflow-hidden">
          <div className="absolute -right-10 -top-10 text-9xl text-white/10"><i className="bi bi-star-fill"></i></div>
          <h3 className="text-sm font-bold uppercase tracking-widest text-white/80 mb-2 relative z-10">Overall Rating</h3>
          <div className="flex items-end justify-center gap-1 relative z-10">
            <h1 className="text-7xl font-black">4.9</h1>
            <span className="text-2xl font-bold text-white/70 mb-2">/5</span>
          </div>
          <div className="flex text-yellow-400 text-xl mt-3 relative z-10">
            <i className="bi bi-star-fill"></i>
            <i className="bi bi-star-fill"></i>
            <i className="bi bi-star-fill"></i>
            <i className="bi bi-star-fill"></i>
            <i className="bi bi-star-half"></i>
          </div>
          <p className="text-sm font-medium text-white/80 mt-4 relative z-10">Based on 1,024 lifetime trips</p>
        </div>

        {/* Rating Breakdown */}
        <div className="md:col-span-7 bg-white dark:bg-slate-900 rounded-2xl border border-slate-200 dark:border-slate-800 p-8 shadow-sm flex flex-col justify-center">
          <h3 className="font-black text-slate-800 dark:text-white text-lg mb-6">Rating Breakdown</h3>
          <div className="space-y-4">
            {[
              { stars: 5, pct: 92, count: 942 },
              { stars: 4, pct: 6, count: 61 },
              { stars: 3, pct: 1, count: 15 },
              { stars: 2, pct: 0.5, count: 4 },
              { stars: 1, pct: 0.5, count: 2 },
            ].map(row => (
              <div key={row.stars} className="flex items-center gap-4">
                <div className="flex items-center gap-1 w-12 text-sm font-bold text-slate-700 dark:text-slate-300">
                  {row.stars} <i className="bi bi-star-fill text-yellow-400 text-xs"></i>
                </div>
                <div className="flex-1 h-3 bg-slate-100 dark:bg-slate-800 rounded-full overflow-hidden">
                  <div className={`h-full rounded-full ${row.stars >= 4 ? 'bg-green-500' : row.stars === 3 ? 'bg-yellow-500' : 'bg-red-500'}`} style={{ width: `${row.pct}%` }}></div>
                </div>
                <div className="w-10 text-right text-xs font-bold text-slate-500 dark:text-slate-400">
                  {row.pct}%
                </div>
              </div>
            ))}
          </div>
        </div>

      </div>

      {/* Customer Feedback List */}
      <div className="bg-white dark:bg-slate-900 rounded-2xl border border-slate-200 dark:border-slate-800 p-6 shadow-sm">
        <div className="flex items-center justify-between mb-6 pb-4 border-b border-slate-100 dark:border-slate-800">
          <h3 className="font-black text-slate-800 dark:text-white text-lg">Recent Feedback</h3>
          <button className="text-[#c74a09] dark:text-orange-400 text-xs font-bold bg-orange-50 dark:bg-orange-500/10 px-3 py-1.5 rounded-md hover:bg-orange-100 dark:hover:bg-orange-500/20 transition cursor-pointer">
            View All
          </button>
        </div>

        <div className="space-y-6">
          {reviews.map(review => (
            <div key={review.id} className="flex gap-4">
              <div className="w-10 h-10 rounded-full bg-slate-200 dark:bg-slate-800 flex items-center justify-center font-bold text-slate-600 dark:text-slate-400 shrink-0">
                {review.name.charAt(0)}
              </div>
              <div className="flex-1 space-y-2">
                <div className="flex justify-between items-start">
                  <div>
                    <h4 className="font-bold text-slate-800 dark:text-white text-sm">{review.name}</h4>
                    <p className="text-[10px] text-slate-500 dark:text-slate-400">{review.date}</p>
                  </div>
                  <div className="flex text-yellow-400 text-xs gap-0.5">
                    {Array.from({ length: 5 }).map((_, i) => (
                      <i key={i} className={`bi bi-star${i < review.rating ? '-fill' : ''} ${i >= review.rating ? 'text-slate-300 dark:text-slate-700' : ''}`}></i>
                    ))}
                  </div>
                </div>
                <p className="text-sm text-slate-700 dark:text-slate-300 font-medium">"{review.comment}"</p>
                {review.tags.length > 0 && (
                  <div className="flex gap-2 flex-wrap pt-1">
                    {review.tags.map(tag => (
                      <span key={tag} className="bg-slate-100 dark:bg-slate-800 text-slate-600 dark:text-slate-400 px-2 py-0.5 rounded text-[10px] font-bold uppercase tracking-wider">
                        {tag}
                      </span>
                    ))}
                  </div>
                )}
              </div>
            </div>
          ))}
        </div>
      </div>

    </div>
  );
}
