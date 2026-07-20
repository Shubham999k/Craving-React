import { useState } from 'react';

function Feedback() {
  const [rating, setRating] = useState(5);
  const [comment, setComment] = useState('');
  const [submitted, setSubmitted] = useState(false);
  const [hoverRating, setHoverRating] = useState(0);
  const [isSubmitting, setIsSubmitting] = useState(false);

  const handleSubmit = (e) => {
    e.preventDefault();
    setIsSubmitting(true);
    // Simulate network delay for effect
    setTimeout(() => {
      setIsSubmitting(false);
      setSubmitted(true);
    }, 1000);
  };

  return (
    <div className="min-h-screen bg-slate-50/50 dark:bg-slate-950/50 text-slate-800 dark:text-slate-100 py-24 px-4 transition-colors duration-300 relative overflow-hidden flex items-center justify-center">
      {/* Dynamic Animated Background */}
      <div className="fixed inset-0 pointer-events-none z-0 overflow-hidden">
        <div className="absolute top-[10%] left-[-10%] w-[40rem] h-[40rem] bg-gradient-to-br from-orange-500/20 to-red-500/10 rounded-full blur-3xl animate-float-slow mix-blend-multiply dark:mix-blend-screen opacity-70"></div>
        <div className="absolute bottom-[-10%] right-[-10%] w-[50rem] h-[50rem] bg-gradient-to-tr from-amber-500/20 to-orange-600/10 rounded-full blur-3xl animate-float mix-blend-multiply dark:mix-blend-screen opacity-60 delay-300"></div>
        <div className="absolute top-1/2 left-1/2 w-[30rem] h-[30rem] bg-orange-400/5 rounded-full blur-3xl animate-pulse-glow opacity-50 transform -translate-x-1/2 -translate-y-1/2"></div>
      </div>

      <div className="mx-auto w-full max-w-xl relative z-10 opacity-0 animate-fade-in-up">
        <div className="text-center mb-12 relative">
          <div className="absolute top-1/2 left-1/2 w-40 h-40 bg-orange-400/20 rounded-full blur-3xl transform -translate-x-1/2 -translate-y-1/2 -z-10 animate-pulse-glow"></div>
          
          <h1 className="text-5xl lg:text-6xl font-black text-slate-900 dark:text-white mb-4 tracking-tight drop-shadow-sm">
            Submit <span className="text-transparent bg-clip-text bg-gradient-to-r from-orange-600 to-amber-500 animate-gradient-x">Feedback</span>
          </h1>
          <p className="text-lg text-slate-600 dark:text-slate-350 max-w-sm mx-auto leading-relaxed">
            Help us improve your ordering experience! We love reading your feedback and suggestions.
          </p>
        </div>

        <div className="bg-white/60 dark:bg-slate-900/60 backdrop-blur-2xl p-8 md:p-12 rounded-[2.5rem] border border-white/50 dark:border-slate-700/50 shadow-[0_8px_30px_rgb(0,0,0,0.04)] dark:shadow-[0_8px_30px_rgb(0,0,0,0.2)] hover:shadow-2xl hover:shadow-orange-500/20 dark:hover:shadow-orange-500/10 hover:-translate-y-2 transition-all duration-500 relative overflow-hidden group">
          <div className="absolute inset-0 bg-gradient-to-br from-orange-500/5 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500 pointer-events-none"></div>
          
          {submitted ? (
            <div className="text-center space-y-6 py-8 animate-fade-in-up">
              <div className="relative w-28 h-28 mx-auto flex items-center justify-center">
                <div className="absolute inset-0 bg-green-500/20 rounded-full animate-ping"></div>
                <div className="relative w-24 h-24 bg-gradient-to-tr from-green-400 to-green-600 rounded-full text-white flex items-center justify-center shadow-lg shadow-green-500/30">
                  <i className="bi bi-check-lg text-5xl font-black"></i>
                </div>
              </div>
              <div>
                <h3 className="text-3xl font-black text-slate-900 dark:text-white mb-3">Feedback Submitted!</h3>
                <p className="text-base text-slate-600 dark:text-slate-400 leading-relaxed max-w-sm mx-auto">
                  Thank you for sharing your thoughts with us. We appreciate your partnership in making Cravings better.
                </p>
              </div>
              <button 
                onClick={() => { setSubmitted(false); setComment(''); setRating(5); }}
                className="inline-block mt-4 text-base font-extrabold text-orange-600 hover:text-orange-700 hover:underline transition"
              >
                Submit another response
              </button>
            </div>
          ) : (
            <form onSubmit={handleSubmit} className="space-y-8 relative z-10">
              <div className="bg-white/50 dark:bg-slate-800/50 p-6 rounded-[2rem] shadow-inner border border-white/40 dark:border-slate-700/50 backdrop-blur-sm">
                <label className="block text-xs font-black uppercase tracking-widest text-slate-500 dark:text-slate-400 mb-5 text-center">Rate Your Experience</label>
                <div className="flex justify-center gap-4">
                  {[1, 2, 3, 4, 5].map(star => (
                    <button
                      key={star}
                      type="button"
                      onClick={() => setRating(star)}
                      onMouseEnter={() => setHoverRating(star)}
                      onMouseLeave={() => setHoverRating(0)}
                      className="text-5xl transition-all duration-300 transform hover:scale-125 focus:outline-none"
                    >
                      <i className={`bi ${(hoverRating || rating) >= star ? 'bi-star-fill text-amber-500 drop-shadow-[0_0_15px_rgba(245,158,11,0.6)] animate-pulse-glow' : 'bi-star text-slate-300 dark:text-slate-600 hover:text-slate-400 dark:hover:text-slate-500'}`}></i>
                    </button>
                  ))}
                </div>
              </div>

              <div>
                <label className="block text-xs font-black uppercase tracking-widest text-slate-500 dark:text-slate-400 mb-2 ml-1">Your Message or Suggestions</label>
                <textarea
                  required
                  rows="5"
                  placeholder="What did you enjoy, or how can we do better?"
                  className="w-full rounded-2xl border border-white/40 dark:border-slate-700/50 bg-slate-50/50 dark:bg-slate-800/50 backdrop-blur-sm text-slate-800 dark:text-slate-100 px-5 py-4 outline-none transition-all focus:border-orange-500 focus:bg-white dark:focus:bg-slate-900 focus:ring-4 focus:ring-orange-500/20 placeholder-slate-400 font-semibold resize-none shadow-inner"
                  value={comment}
                  onChange={e => setComment(e.target.value)}
                />
              </div>

              <button 
                type="submit" 
                disabled={isSubmitting}
                className="w-full mt-6 rounded-2xl bg-gradient-to-r from-orange-600 to-[#c74a09] py-5 font-extrabold text-white text-lg transition-all hover:shadow-[0_0_40px_rgba(249,115,22,0.4)] hover:scale-[1.02] active:scale-[0.98] disabled:opacity-70 disabled:cursor-not-allowed flex items-center justify-center gap-3"
              >
                {isSubmitting ? (
                  <>
                    <div className="w-6 h-6 border-2 border-white/30 border-t-white rounded-full animate-spin"></div>
                    Submitting...
                  </>
                ) : (
                  <>
                    Send Feedback
                    <i className="bi bi-arrow-right"></i>
                  </>
                )}
              </button>
            </form>
          )}
        </div>
      </div>
    </div>
  );
}

export default Feedback;
