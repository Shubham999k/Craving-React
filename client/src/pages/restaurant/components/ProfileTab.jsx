import React, { useState } from 'react';
import toast from 'react-hot-toast';

const PRESET_LOGOS = [
  "https://api.dicebear.com/7.x/initials/svg?seed=BurgerKing&backgroundColor=e63946",
  "https://api.dicebear.com/7.x/initials/svg?seed=PizzaHut&backgroundColor=f4a261",
  "https://api.dicebear.com/7.x/initials/svg?seed=SushiBar&backgroundColor=2a9d8f",
  "https://api.dicebear.com/7.x/initials/svg?seed=KFC&backgroundColor=e76f51",
];

const ProfileTab = () => {
  const [editLogo, setEditLogo] = useState(() => {
    try {
      const p = JSON.parse(localStorage.getItem("restaurantProfile"));
      return p?.logo || PRESET_LOGOS[0];
    } catch {
      return PRESET_LOGOS[0];
    }
  });
  
  const [editName, setEditName] = useState(() => {
    try {
      const p = JSON.parse(localStorage.getItem("restaurantProfile"));
      return p?.name || 'My Awesome Restaurant';
    } catch {
      return 'My Awesome Restaurant';
    }
  });

  const [editEmail, setEditEmail] = useState(() => {
    try {
      const p = JSON.parse(localStorage.getItem("restaurantProfile"));
      return p?.email || 'restaurant@example.com';
    } catch {
      return 'restaurant@example.com';
    }
  });

  const [editPhone, setEditPhone] = useState(() => {
    try {
      const p = JSON.parse(localStorage.getItem("restaurantProfile"));
      return p?.phone || '+1 (555) 123-4567';
    } catch {
      return '+1 (555) 123-4567';
    }
  });

  const [editAddress, setEditAddress] = useState(() => {
    try {
      const p = JSON.parse(localStorage.getItem("restaurantProfile"));
      return p?.address || '123 Food Street, Culinary City';
    } catch {
      return '123 Food Street, Culinary City';
    }
  });

  const [editDescription, setEditDescription] = useState(() => {
    try {
      const p = JSON.parse(localStorage.getItem("restaurantProfile"));
      return p?.description || 'Serving the best food in town!';
    } catch {
      return 'Serving the best food in town!';
    }
  });

  const handleCustomImageUpload = (e) => {
    const file = e.target.files[0];
    if (file) {
      if (file.size > 2 * 1024 * 1024) {
        toast.error("Image size must be less than 2MB");
        return;
      }
      const reader = new FileReader();
      reader.onloadend = () => {
        setEditLogo(reader.result);
        toast.success("Custom logo loaded!");
      };
      reader.readAsDataURL(file);
    }
  };

  const handleUpdateProfile = (e) => {
    e.preventDefault();
    
    const updatedProfile = {
      name: editName,
      email: editEmail,
      phone: editPhone,
      address: editAddress,
      description: editDescription,
      logo: editLogo
    };
    
    localStorage.setItem("restaurantProfile", JSON.stringify(updatedProfile));
    toast.success("Restaurant profile updated successfully!");
  };

  const isCustom = editLogo && !PRESET_LOGOS.includes(editLogo);

  return (
    <div className="max-w-3xl mx-auto bg-white dark:bg-slate-900 p-6 rounded-xl border border-slate-100 dark:border-slate-800 shadow-sm animate-fadeIn duration-500 space-y-6">
      <h2 className="text-2xl font-black text-slate-800 dark:text-slate-100 flex items-center gap-2">
        <i className="bi bi-shop text-[#c74a09]"></i> Restaurant Profile
      </h2>

      <form onSubmit={handleUpdateProfile} className="space-y-6">
        {/* Logo Selector */}
        <div>
          <label className="block text-sm font-bold text-slate-600 dark:text-slate-400 mb-2">Choose Logo or Upload Custom Image</label>
          <div className="flex gap-4 items-center overflow-x-auto py-2">
            {/* Custom Image Upload Button */}
            <label className="flex flex-col items-center justify-center w-16 h-16 rounded border-2 border-dashed border-slate-300 dark:border-slate-700 hover:border-[#c74a09] dark:hover:border-[#c74a09] transition-all duration-200 cursor-pointer shrink-0 bg-slate-50 dark:bg-slate-800/50">
              <div className="flex flex-col items-center justify-center text-slate-400 hover:text-[#c74a09]">
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

            {/* Custom Image Option preview if uploaded */}
            {isCustom && (
              <div className="relative shrink-0">
                <button
                  type="button"
                  onClick={() => setEditLogo(editLogo)}
                  className={`p-1.5 rounded border-4 transition-all duration-200 cursor-pointer ${
                    editLogo === editLogo ? 'border-[#c74a09] scale-105 bg-orange-50 dark:bg-orange-950/20' : 'border-transparent'
                  }`}
                >
                  <img src={editLogo} alt="Custom Logo" className="w-16 h-16 rounded-sm object-cover bg-slate-100 dark:bg-slate-800" />
                </button>
                <span className="absolute -top-1.5 -right-1.5 bg-[#c74a09] text-white text-[8px] font-extrabold px-1 rounded shadow">Custom</span>
              </div>
            )}

            {PRESET_LOGOS.map((logo, idx) => (
              <button
                key={idx}
                type="button"
                onClick={() => setEditLogo(logo)}
                className={`p-1.5 rounded border-4 transition-all duration-200 cursor-pointer shrink-0 ${
                  editLogo === logo ? 'border-[#c74a09] scale-105 bg-orange-50 dark:bg-orange-950/20' : 'border-transparent hover:border-slate-300 dark:hover:border-slate-700'
                }`}
              >
                <img src={logo} alt={`Logo-${idx}`} className="w-16 h-16 rounded-sm object-cover bg-slate-100 dark:bg-slate-800" />
              </button>
            ))}
          </div>
        </div>

        {/* Form Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <div>
            <label className="block text-sm font-bold text-slate-700 dark:text-slate-300 mb-1.5">Restaurant Name</label>
            <input
              type="text"
              value={editName}
              onChange={e => setEditName(e.target.value)}
              required
              className="w-full px-4 py-2.5 rounded bg-slate-50 dark:bg-slate-800 border border-slate-200 dark:border-slate-700 text-slate-800 dark:text-slate-100 focus:outline-none focus:border-[#c74a09] transition font-semibold"
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
            <label className="block text-sm font-bold text-slate-700 dark:text-slate-300 mb-1.5">Contact Phone</label>
            <input
              type="tel"
              value={editPhone}
              onChange={e => setEditPhone(e.target.value)}
              required
              className="w-full px-4 py-2.5 rounded bg-slate-50 dark:bg-slate-800 border border-slate-200 dark:border-slate-700 text-slate-800 dark:text-slate-100 focus:outline-none focus:border-[#c74a09] transition font-semibold"
            />
          </div>

          <div>
            <label className="block text-sm font-bold text-slate-700 dark:text-slate-300 mb-1.5">Restaurant Address</label>
            <input
              type="text"
              value={editAddress}
              onChange={e => setEditAddress(e.target.value)}
              required
              className="w-full px-4 py-2.5 rounded bg-slate-50 dark:bg-slate-800 border border-slate-200 dark:border-slate-700 text-slate-800 dark:text-slate-100 focus:outline-none focus:border-[#c74a09] transition font-semibold"
            />
          </div>

          <div className="md:col-span-2">
            <label className="block text-sm font-bold text-slate-700 dark:text-slate-300 mb-1.5">Restaurant Description</label>
            <textarea
              value={editDescription}
              onChange={e => setEditDescription(e.target.value)}
              required
              rows="3"
              className="w-full px-4 py-2.5 rounded bg-slate-50 dark:bg-slate-800 border border-slate-200 dark:border-slate-700 text-slate-800 dark:text-slate-100 focus:outline-none focus:border-[#c74a09] transition font-semibold resize-none"
            ></textarea>
          </div>
        </div>

        <div className="pt-4 border-t border-slate-100 dark:border-slate-800 flex justify-end">
          <button
            type="submit"
            className="bg-[#c74a09] hover:bg-[#a63d07] text-white font-extrabold px-6 py-2.5 rounded transition cursor-pointer"
          >
            Save Profile Changes
          </button>
        </div>
      </form>
    </div>
  );
};

export default ProfileTab;
