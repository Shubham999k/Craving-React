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
    <div className="min-h-screen bg-slate-50 dark:bg-slate-950 text-slate-800 dark:text-slate-100 py-20 px-4 transition-colors duration-300 relative overflow-hidden flex items-center justify-center">
      {/* Background Decor */}
      <div className="absolute top-0 left-0 w-full h-96 bg-gradient-to-b from-orange-500/10 to-transparent pointer-events-none"></div>
      <div className="absolute -bottom-24 -left-24 w-96 h-96 bg-orange-500/20 rounded-full blur-3xl opacity-50 pointer-events-none"></div>

      <div className="mx-auto w-full max-w-xl relative z-10">
        <div className="text-center mb-10">
          <h1 className="text-4xl lg:text-5xl font-black text-slate-900 dark:text-white mb-4 tracking-tight">
            Submit <span className="text-transparent bg-clip-text bg-gradient-to-r from-[#c74a09] to-orange-400">Feedback</span>
          </h1>
          <p className="text-base text-slate-550 dark:text-slate-400 max-w-sm mx-auto">
            Help us improve your ordering experience! We love reading your feedback and suggestions.
          </p>
        </div>

        <div className="bg-white/80 dark:bg-slate-900/80 backdrop-blur-xl p-8 md:p-10 rounded-[2rem] border border-slate-200/50 dark:border-slate-800/50 shadow-2xl shadow-slate-200/40 dark:shadow-none transition-all duration-300 relative overflow-hidden">
          
          {submitted ? (
            <div className="text-center space-y-6 py-6 animate-fade-in">
              <div className="relative w-24 h-24 mx-auto flex items-center justify-center">
                <div className="absolute inset-0 bg-green-500/20 rounded-full animate-ping"></div>
                <div className="relative w-20 h-20 bg-gradient-to-tr from-green-400 to-green-600 rounded-full text-white flex items-center justify-center shadow-lg shadow-green-500/30">
                  <i className="bi bi-check-lg text-4xl font-black"></i>
                </div>
              </div>
              <div>
                <h3 className="text-2xl font-black text-slate-900 dark:text-white mb-2">Feedback Submitted!</h3>
                <p className="text-sm text-slate-500 dark:text-slate-400 leading-relaxed max-w-xs mx-auto">
                  Thank you for sharing your thoughts with us. We appreciate your partnership in making Cravings better.
                </p>
              </div>
              <button 
                onClick={() => { setSubmitted(false); setComment(''); setRating(5); }}
                className="inline-block mt-4 text-sm font-bold text-orange-600 hover:text-orange-700 transition"
              >
                Submit another response
              </button>
            </div>
          ) : (
            <form onSubmit={handleSubmit} className="space-y-8 relative z-10">
              <div>
                <label className="block text-xs font-bold uppercase tracking-wider text-slate-450 dark:text-slate-500 mb-4 text-center">Rate Your Experience</label>
                <div className="flex justify-center gap-3">
                  {[1, 2, 3, 4, 5].map(star => (
                    <button
                      key={star}
                      type="button"
                      onClick={() => setRating(star)}
                      onMouseEnter={() => setHoverRating(star)}
                      onMouseLeave={() => setHoverRating(0)}
                      className="text-4xl transition-all duration-300 transform hover:scale-125 focus:outline-none"
                    >
                      <i className={`bi ${(hoverRating || rating) >= star ? 'bi-star-fill text-amber-500 drop-shadow-[0_0_8px_rgba(245,158,11,0.5)]' : 'bi-star text-slate-300 dark:text-slate-700'}`}></i>
                    </button>
                  ))}
                </div>
              </div>

              <div>
                <label className="block text-xs font-bold uppercase tracking-wider text-slate-500 dark:text-slate-400 mb-2 ml-1">Your Message or Suggestions</label>
                <textarea
                  required
                  rows="5"
                  placeholder="What did you enjoy, or how can we do better?"
                  className="w-full rounded-2xl border border-slate-200 dark:border-slate-700/50 bg-slate-50 dark:bg-slate-800/50 text-slate-800 dark:text-slate-100 px-5 py-4 outline-none transition-all focus:border-orange-500 focus:bg-white dark:focus:bg-slate-900 focus:ring-4 focus:ring-orange-500/10 placeholder-slate-400 font-medium resize-none shadow-inner"
                  value={comment}
                  onChange={e => setComment(e.target.value)}
                />
              </div>

              <button 
                type="submit" 
                disabled={isSubmitting}
                className="w-full rounded-xl bg-gradient-to-r from-orange-600 to-[#c74a09] py-4 font-bold text-white transition-all hover:shadow-lg hover:shadow-orange-500/30 active:scale-[0.98] disabled:opacity-70 disabled:cursor-not-allowed flex items-center justify-center gap-2"
              >
                {isSubmitting ? (
                  <>
                    <div className="w-5 h-5 border-2 border-white/30 border-t-white rounded-full animate-spin"></div>
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
