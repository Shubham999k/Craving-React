import React, { useState, useEffect } from 'react';
import toast from 'react-hot-toast';
import api from '../../../utils/api';

const PRESET_AVATARS = [
    "https://api.dicebear.com/7.x/adventurer/svg?seed=Felix",
    "https://api.dicebear.com/7.x/adventurer/svg?seed=Rider",
    "https://api.dicebear.com/7.x/adventurer/svg?seed=Oliver",
    "https://api.dicebear.com/7.x/adventurer/svg?seed=Mimi"
];

export default function ProfileTab() {
  const [user, setUser] = useState(null);
  const [editName, setEditName] = useState('');
  const [editEmail, setEditEmail] = useState('');
  const [editPhone, setEditPhone] = useState('');
  const [editAvatar, setEditAvatar] = useState('');

  useEffect(() => {
    const storedUser = JSON.parse(localStorage.getItem('user')) || {};
    setUser(storedUser);
    setEditName(storedUser.name || '');
    setEditEmail(storedUser.email || '');
    setEditPhone(storedUser.phone || '');
    setEditAvatar(storedUser.profilePicture || PRESET_AVATARS[1]);
  }, []);

  const handleUpdateProfile = async (e) => {
    e.preventDefault();
    if (!editName || !editEmail) {
      toast.error("Name and Email are required");
      return;
    }

    const loadingToast = toast.loading("Updating profile...");
    try {
      const payload = {
        name: editName,
        email: editEmail,
        phone: editPhone,
        profilePicture: editAvatar
      };

      const response = await api.put("/auth/update-profile", payload);
      
      const updatedUser = {
        ...user,
        name: response.data.data.fullName,
        email: response.data.data.email,
        phone: response.data.data.phone,
        profilePicture: response.data.data.profilePic?.url || editAvatar
      };
      
      localStorage.setItem("user", JSON.stringify(updatedUser));
      setUser(updatedUser);
      
      toast.dismiss(loadingToast);
      toast.success("Profile updated successfully!");
      
      // Dispatch event so Navbar can update avatar
      window.dispatchEvent(new Event("auth-change"));

    } catch (error) {
      toast.dismiss(loadingToast);
      console.error("Profile update error:", error);
      toast.error(error.response?.data?.message || "Failed to update profile");
    }
  };

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

  if (!user) return null;

  const isCustom = editAvatar && !PRESET_AVATARS.includes(editAvatar);

  return (
    <div className="bg-white dark:bg-slate-900 rounded-2xl border border-slate-200 dark:border-slate-800 p-6 sm:p-8 shadow-sm">
      <div className="mb-8">
        <h3 className="font-black text-slate-800 dark:text-white text-xl">Rider Profile</h3>
        <p className="text-xs font-medium text-slate-500 dark:text-slate-400 mt-1">Manage your personal details and app preferences.</p>
      </div>

      <form onSubmit={handleUpdateProfile} className="space-y-8">
        
        {/* Avatar Selection */}
        <div className="space-y-4">
          <label className="block text-sm font-bold text-slate-700 dark:text-slate-300">Profile Picture</label>
          <div className="flex flex-wrap gap-4 items-center">
            {PRESET_AVATARS.map((avatar, i) => (
              <img
                key={i}
                src={avatar}
                alt={`Avatar ${i}`}
                className={`w-16 h-16 rounded-full cursor-pointer transition border-4 object-cover ${editAvatar === avatar ? 'border-[#c74a09] scale-110 shadow-lg shadow-orange-500/30' : 'border-transparent opacity-60 hover:opacity-100 bg-slate-100 dark:bg-slate-800'}`}
                onClick={() => setEditAvatar(avatar)}
              />
            ))}
            
            {isCustom && (
              <img
                src={editAvatar}
                alt="Custom Avatar"
                className="w-16 h-16 rounded-full border-4 border-[#c74a09] scale-110 shadow-lg shadow-orange-500/30 object-cover"
              />
            )}
            
            <label className="w-16 h-16 rounded-full border-2 border-dashed border-slate-300 dark:border-slate-600 flex items-center justify-center text-slate-400 cursor-pointer hover:border-[#c74a09] hover:text-[#c74a09] transition bg-slate-50 dark:bg-slate-800">
              <i className="bi bi-upload text-xl"></i>
              <input type="file" accept="image/*" className="hidden" onChange={handleCustomImageUpload} />
            </label>
          </div>
        </div>

        {/* Info Grid */}
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
          <div className="space-y-2">
            <label className="text-xs font-bold text-slate-500 dark:text-slate-400 uppercase tracking-wider">Full Name</label>
            <input 
              type="text" 
              value={editName}
              onChange={(e) => setEditName(e.target.value)}
              className="w-full bg-slate-50 dark:bg-slate-800 border border-slate-200 dark:border-slate-700 rounded-xl px-4 py-3 text-slate-800 dark:text-white font-medium focus:outline-none focus:border-[#c74a09] focus:ring-1 focus:ring-[#c74a09] transition"
              placeholder="Your Name"
            />
          </div>

          <div className="space-y-2">
            <label className="text-xs font-bold text-slate-500 dark:text-slate-400 uppercase tracking-wider">Email Address</label>
            <input 
              type="email" 
              value={editEmail}
              onChange={(e) => setEditEmail(e.target.value)}
              className="w-full bg-slate-50 dark:bg-slate-800 border border-slate-200 dark:border-slate-700 rounded-xl px-4 py-3 text-slate-800 dark:text-white font-medium focus:outline-none focus:border-[#c74a09] focus:ring-1 focus:ring-[#c74a09] transition opacity-70 cursor-not-allowed"
              placeholder="Your Email"
              disabled // Prevent email change since it's typically tied to login
            />
          </div>

          <div className="space-y-2">
            <label className="text-xs font-bold text-slate-500 dark:text-slate-400 uppercase tracking-wider">Phone Number</label>
            <input 
              type="tel" 
              value={editPhone}
              onChange={(e) => setEditPhone(e.target.value)}
              className="w-full bg-slate-50 dark:bg-slate-800 border border-slate-200 dark:border-slate-700 rounded-xl px-4 py-3 text-slate-800 dark:text-white font-medium focus:outline-none focus:border-[#c74a09] focus:ring-1 focus:ring-[#c74a09] transition"
              placeholder="Your Phone Number"
            />
          </div>
          
          <div className="space-y-2">
            <label className="text-xs font-bold text-slate-500 dark:text-slate-400 uppercase tracking-wider">Vehicle Type</label>
            <input 
              type="text" 
              value="Motorcycle"
              className="w-full bg-slate-50 dark:bg-slate-800 border border-slate-200 dark:border-slate-700 rounded-xl px-4 py-3 text-slate-500 dark:text-slate-400 font-medium focus:outline-none cursor-not-allowed"
              disabled
            />
          </div>
        </div>

        <div className="pt-6 border-t border-slate-100 dark:border-slate-800 flex justify-end">
          <button 
            type="submit"
            className="bg-[#c74a09] hover:bg-orange-700 text-white font-bold py-3 px-8 rounded-xl transition shadow-lg shadow-orange-500/30 flex items-center gap-2 cursor-pointer"
          >
            Save Changes <i className="bi bi-check2"></i>
          </button>
        </div>

      </form>
    </div>
  );
}
