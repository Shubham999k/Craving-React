import { useState } from 'react';

function Feedback() {
  const [rating, setRating] = useState(5);
  const [comment, setComment] = useState('');
  const [submitted, setSubmitted] = useState(false);

  const handleSubmit = (e) => {
    e.preventDefault();
    setSubmitted(true);
  };

  return (
    <div className="min-h-screen bg-slate-50 dark:bg-slate-950 text-slate-800 dark:text-slate-100 py-16 px-4 transition-colors duration-300">
      <div className="mx-auto max-w-lg">
        <h1 className="text-4xl font-black text-slate-900 dark:text-white mb-3 text-center">
          Submit <span className="text-[#c74a09]">Feedback</span>
        </h1>
        <p className="text-sm text-slate-550 dark:text-slate-400 text-center mb-8">
          Help us improve your ordering experience! We love reading your feedback and suggestions.
        </p>

        {submitted ? (
          <div className="bg-green-500/10 border border-green-500/30 p-8 rounded-xl text-center space-y-3">
            <div className="w-12 h-12 rounded-full bg-green-500 text-white flex items-center justify-center mx-auto text-xl font-bold">
              ✓
            </div>
            <h3 className="text-xl font-bold text-green-600 dark:text-green-400">Feedback Submitted!</h3>
            <p className="text-xs text-slate-500 dark:text-slate-400">
              Thank you for sharing your thoughts with us. We appreciate your partnership in making Cravings better.
            </p>
          </div>
        ) : (
          <form onSubmit={handleSubmit} className="bg-white dark:bg-slate-900 p-8 rounded-2xl border border-slate-150 dark:border-slate-800 shadow-md space-y-6">
            <div>
              <label className="block text-xs font-black uppercase text-slate-450 dark:text-slate-500 mb-3 text-center">Rate Your Experience</label>
              <div className="flex justify-center gap-3">
                {[1, 2, 3, 4, 5].map(star => (
                  <button
                    key={star}
                    type="button"
                    onClick={() => setRating(star)}
                    className="text-3xl transition duration-200 transform hover:scale-115 cursor-pointer"
                  >
                    <span className={star <= rating ? 'text-amber-500' : 'text-slate-300 dark:text-slate-700'}>★</span>
                  </button>
                ))}
              </div>
            </div>
            <div>
              <label className="block text-xs font-bold text-slate-650 dark:text-slate-350 mb-1">Your Message or Suggestions</label>
              <textarea
                required
                rows="5"
                placeholder="What did you enjoy, or how can we do better?"
                className="w-full px-4 py-3 bg-slate-50 dark:bg-slate-800 border border-slate-200 dark:border-slate-700 rounded-lg outline-none focus:border-orange-500 resize-none text-sm font-medium"
                value={comment}
                onChange={e => setComment(e.target.value)}
              />
            </div>
            <button type="submit" className="w-full bg-[#c74a09] hover:bg-orange-700 text-white font-bold py-3 rounded-lg transition text-sm cursor-pointer shadow-md">
              Send Feedback
            </button>
          </form>
        )}
      </div>
    </div>
  );
}

export default Feedback;
