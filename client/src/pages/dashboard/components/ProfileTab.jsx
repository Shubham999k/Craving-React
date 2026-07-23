import { PRESET_AVATARS } from '../../../data/mockData';
import toast from 'react-hot-toast';

const ProfileTab = ({
  handleUpdateProfile,
  editAvatar,
  setEditAvatar,
  editName,
  setEditName,
  editEmail,
  setEditEmail,
  editPhone,
  setEditPhone,
  editBio,
  setEditBio
}) => {
  const handleCustomImageUpload = (e) => {
    const file = e.target.files[0];
    if (file) {
      if (file.size > 2 * 1024 * 1024) {
        toast.error("Image size must be less than 2MB");
        return;
      }
      const reader = new FileReader();
      reader.onloadend = () => {
        setEditAvatar(reader.result);
        toast.success("Custom image loaded!");
      };
      reader.readAsDataURL(file);
    }
  };

  const isCustom = editAvatar && !PRESET_AVATARS.includes(editAvatar);

  return (
    <div className="max-w-2xl mx-auto bg-white dark:bg-slate-900 p-6 rounded-md border border-slate-100 dark:border-slate-800 shadow-sm animate-fadeIn duration-500 space-y-6">
      <h2 className="text-2xl font-black text-slate-800 dark:text-slate-100 flex items-center gap-2">
        <i className="bi bi-person-gear text-orange-600"></i> Settings & Profile
      </h2>

      <form onSubmit={handleUpdateProfile} className="space-y-6">
        {/* Avatar Selector */}
        <div>
          <label className="block text-sm font-bold text-slate-600 dark:text-slate-400 mb-2">Choose Avatar or Upload Custom Image</label>
          <div className="flex gap-4 items-center overflow-x-auto py-2">
            {/* Custom Image Upload Button */}
            <label className="flex flex-col items-center justify-center w-16 h-16 rounded border-2 border-dashed border-slate-300 dark:border-slate-700 hover:border-orange-500 dark:hover:border-orange-500 transition-all duration-200 cursor-pointer shrink-0 bg-slate-50 dark:bg-slate-800/50">
              <div className="flex flex-col items-center justify-center text-slate-400 hover:text-orange-500">
                <i className="bi bi-cloud-arrow-up text-xl"></i>
                <span className="text-[10px] font-bold">Upload</span>
              </div>
              <input
                type="file"
                accept="image/*"
                className="hidden"
                onChange={handleCustomImageUpload}
              />
            </label>

            {/* Custom Image Option preview if uploaded*/}
            {isCustom && (
              <div className="relative shrink-0">
                <button
                  type="button"
                  onClick={() => setEditAvatar(editAvatar)}
                  className={`p-1.5 rounded border-4 transition-all duration-200 cursor-pointer ${
                    editAvatar === editAvatar ? 'border-orange-500 scale-105 bg-orange-50 dark:bg-orange-950/20' : 'border-transparent'
                  }`}
                >
                  <img src={editAvatar} alt="Custom Profile" className="w-16 h-16 rounded-sm object-cover bg-slate-100 dark:bg-slate-800" />
                </button>
                <span className="absolute -top-1.5 -right-1.5 bg-orange-500 text-white text-[8px] font-extrabold px-1 rounded shadow">Custom</span>
              </div>
            )}

            {PRESET_AVATARS.map((avatar, idx) => (
              <button
                key={idx}
                type="button"
                onClick={() => setEditAvatar(avatar)}
                className={`p-1.5 rounded border-4 transition-all duration-200 cursor-pointer shrink-0 ${
                  editAvatar === avatar ? 'border-orange-500 scale-105 bg-orange-50 dark:bg-orange-950/20' : 'border-transparent hover:border-slate-300 dark:hover:border-slate-700'
                }`}
              >
                <img src={avatar} alt={`Avatar-${idx}`} className="w-16 h-16 rounded-sm object-cover bg-slate-100 dark:bg-slate-800" />
              </button>
            ))}
          </div>
        </div>

        {/* Form Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <div>
            <label className="block text-sm font-bold text-slate-700 dark:text-slate-300 mb-1.5">Full Name</label>
            <input
              type="text"
              value={editName}
              onChange={e => setEditName(e.target.value)}
              required
              className="w-full px-4 py-2.5 rounded bg-slate-50 dark:bg-slate-800 border border-slate-200 dark:border-slate-700 text-slate-800 dark:text-slate-100 focus:outline-none focus:border-orange-500 transition font-semibold"
            />
          </div>

          <div>
            <label className="block text-sm font-bold text-slate-700 dark:text-slate-300 mb-1.5">Email Address</label>
            <input
              type="email"
              value={editEmail}
              onChange={e => setEditEmail(e.target.value)}
              className="w-full px-4 py-2.5 rounded bg-slate-50 dark:bg-slate-800 border border-slate-200 dark:border-slate-700 text-slate-500 dark:text-slate-400 font-semibold disabled:bg-gray-200 dark:disabled:bg-slate-950 disabled:cursor-not-allowed"
              disabled
            />
          </div>

          <div>
            <label className="block text-sm font-bold text-slate-700 dark:text-slate-300 mb-1.5">Phone Number</label>
            <input
              type="tel"
              value={editPhone}
              onChange={e => setEditPhone(e.target.value)}
              className="w-full px-4 py-2.5 rounded bg-slate-50 dark:bg-slate-800 border border-slate-200 dark:border-slate-700 text-slate-800 dark:text-slate-100 focus:outline-none focus:border-orange-500 transition font-semibold"
            />
          </div>

          <div>
            <label className="block text-sm font-bold text-slate-700 dark:text-slate-300 mb-1.5">Profile Bio</label>
            <input
              type="text"
              value={editBio}
              onChange={e => setEditBio(e.target.value)}
              className="w-full px-4 py-2.5 rounded bg-slate-50 dark:bg-slate-800 border border-slate-200 dark:border-slate-700 text-slate-800 dark:text-slate-100 focus:outline-none focus:border-orange-500 transition font-semibold"
            />
          </div>
        </div>

        <div className="pt-4 border-t border-slate-100 dark:border-slate-800 flex justify-end">
          <button
            type="submit"
            className="bg-orange-600 hover:bg-orange-700 text-white font-extrabold px-6 py-2.5 rounded transition cursor-pointer"
          >
            Save Profile Changes
          </button>
        </div>
      </form>
    </div>
  );
};

export default ProfileTab;
