import React, { useState } from 'react';
import { createPortal } from 'react-dom';
import toast from 'react-hot-toast';
import api from '../../../config/api.config';

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

  const [galleryFiles, setGalleryFiles] = useState([]);
  const [isUploading, setIsUploading] = useState(false);
  const [isImageModalOpen, setIsImageModalOpen] = useState(false);

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

    // Also update the main user object so the Navbar DP updates
    try {
      const userStr = localStorage.getItem("user");
      if (userStr) {
        const userObj = JSON.parse(userStr);
        userObj.profilePicture = editLogo;
        userObj.name = editName;
        localStorage.setItem("user", JSON.stringify(userObj));
        window.dispatchEvent(new Event("auth-change"));
      }
    } catch (err) {
      console.error("Error updating user storage:", err);
    }

    toast.success("Restaurant profile updated successfully!");
  };

  const handleGalleryFileSelect = (e) => {
    const files = Array.from(e.target.files);
    // Limit to 10 files
    if (files.length > 10) {
      toast.error("You can only upload up to 10 images at once");
      return;
    }
    setGalleryFiles(files);
  };

  const handleGalleryUpload = async () => {
    if (galleryFiles.length === 0) {
      toast.error("Please select images to upload");
      return;
    }

    setIsUploading(true);
    const loadingToast = toast.loading("Uploading gallery images...");

    try {
      const formData = new FormData();
      galleryFiles.forEach(file => {
        formData.append("gallery", file);
      });

      // Using the seeded restaurant ID for demo purposes
      // In a real app, this would be fetched dynamically
      const restaurantId = "6a60cf6803c19942d8c2fea9"; 
      
      const response = await api.post(`/restaurant/gallery/${restaurantId}`, formData, {
        headers: { "Content-Type": "multipart/form-data" }
      });

      toast.dismiss(loadingToast);
      toast.success("Gallery images uploaded successfully!");
      setGalleryFiles([]); // Clear selection after successful upload
      
    } catch (error) {
      toast.dismiss(loadingToast);
      console.error("Gallery upload error:", error);
      toast.error(error.response?.data?.message || "Failed to upload gallery images");
    } finally {
      setIsUploading(false);
    }
  };

  const isCustom = editLogo && !PRESET_LOGOS.includes(editLogo);

  return (
    <div className="w-full animate-fadeIn pb-10">
      {/* Professional Profile Header */}
      <div className="flex flex-col md:flex-row items-center md:items-end gap-6 md:gap-8 mb-12 bg-white dark:bg-slate-900/80 p-8 rounded-3xl border border-slate-200/60 dark:border-slate-800/60 shadow-xl shadow-slate-200/20 dark:shadow-black/20">
        <div 
          onClick={() => setIsImageModalOpen(true)}
          className="relative w-32 h-32 md:w-36 md:h-36 rounded-[2rem] border border-slate-200 dark:border-slate-700 shadow-lg overflow-hidden bg-slate-50 dark:bg-slate-800 cursor-pointer shrink-0 group"
        >
          <img src={editLogo} className="w-full h-full object-cover transition-transform duration-500 hover:scale-105" alt="Restaurant Logo" />
          <div className="absolute inset-0 bg-black/40 opacity-0 group-hover:opacity-100 flex items-center justify-center transition-opacity duration-300">
             <i className="bi bi-arrows-fullscreen text-white text-2xl"></i>
          </div>
        </div>
        
        <div className="text-center md:text-left flex-1 pb-2">
          <h1 className="text-3xl md:text-4xl font-black text-slate-800 dark:text-white tracking-tight">
            {editName || 'Restaurant Name'}
          </h1>
          <p className="text-slate-500 dark:text-slate-400 font-medium text-sm md:text-base mt-2 flex items-center justify-center md:justify-start gap-2">
            <i className="bi bi-geo-alt-fill text-slate-400"></i>
            {editAddress || 'Address not set'}
          </p>
        </div>

        <div className="shrink-0 pb-2">
          <div className="inline-flex items-center gap-2 bg-green-50 dark:bg-green-500/10 text-green-600 dark:text-green-400 px-4 py-2 rounded-xl font-bold text-sm border border-green-200 dark:border-green-500/20">
            <i className="bi bi-patch-check-fill"></i> Verified Partner
          </div>
        </div>
      </div>

      <div className="grid grid-cols-1 xl:grid-cols-3 gap-8 px-2 md:px-0">
        {/* Left Column: Logo Selection & Tips */}
        <div className="xl:col-span-1 space-y-6 md:space-y-8">
          <div className="bg-white dark:bg-slate-900/80 backdrop-blur-xl p-6 md:p-8 rounded-3xl border border-slate-200/60 dark:border-slate-800/60 shadow-xl shadow-slate-200/20 dark:shadow-black/20 relative overflow-hidden">
            <div className="absolute top-0 left-0 w-full h-1.5 bg-gradient-to-r from-orange-400 to-[#c74a09]"></div>
            <h3 className="text-xl font-black text-slate-800 dark:text-white mb-6 flex items-center gap-2">
              <i className="bi bi-palette text-[#c74a09]"></i> Brand Identity
            </h3>
            
            <p className="text-sm text-slate-500 dark:text-slate-400 mb-4 font-medium">Select a preset or upload your own icon.</p>
            
            <div className="grid grid-cols-3 gap-3 md:gap-4">
              {/* Custom Image Upload Button */}
              <label className="flex flex-col items-center justify-center aspect-square rounded-2xl border-2 border-dashed border-slate-300 dark:border-slate-700 hover:border-[#c74a09] dark:hover:border-[#c74a09] hover:bg-orange-50 dark:hover:bg-orange-500/10 transition-all duration-300 cursor-pointer bg-slate-50 dark:bg-slate-800/50 group">
                <div className="flex flex-col items-center justify-center text-slate-400 group-hover:text-[#c74a09]">
                  <i className="bi bi-cloud-arrow-up text-2xl md:text-3xl mb-1 group-hover:-translate-y-1 transition-transform"></i>
                  <span className="text-[10px] font-bold uppercase tracking-wider">Upload</span>
                </div>
                <input type="file" accept="image/*" className="hidden" onChange={handleCustomImageUpload} />
              </label>

              {isCustom && (
                <div className="relative aspect-square">
                  <button
                    type="button"
                    onClick={() => setEditLogo(editLogo)}
                    className={`w-full h-full rounded-2xl border-4 transition-all duration-300 cursor-pointer overflow-hidden ${
                      editLogo === editLogo ? 'border-[#c74a09] scale-105 shadow-lg' : 'border-transparent'
                    }`}
                  >
                    <img src={editLogo} alt="Custom Logo" className="w-full h-full object-cover bg-slate-100 dark:bg-slate-800" />
                  </button>
                  <span className="absolute -top-2 -right-2 bg-slate-900 text-white text-[10px] font-extrabold px-2 py-0.5 rounded-full shadow-md">Custom</span>
                </div>
              )}

              {PRESET_LOGOS.map((logo, idx) => (
                <button
                  key={idx}
                  type="button"
                  onClick={() => setEditLogo(logo)}
                  className={`aspect-square rounded-2xl border-4 transition-all duration-300 cursor-pointer overflow-hidden ${
                    editLogo === logo ? 'border-[#c74a09] scale-105 shadow-lg z-10 relative' : 'border-transparent hover:border-slate-300 dark:hover:border-slate-700 hover:scale-105 opacity-80 hover:opacity-100'
                  }`}
                >
                  <img src={logo} alt={`Logo-${idx}`} className="w-full h-full object-cover bg-slate-100 dark:bg-slate-800" />
                </button>
              ))}
            </div>
          </div>

          <div className="bg-gradient-to-br from-[#c74a09] to-orange-500 p-6 md:p-8 rounded-3xl text-white shadow-xl shadow-orange-500/20 relative overflow-hidden group">
            <div className="absolute -right-4 -bottom-4 opacity-10 group-hover:scale-110 transition-transform duration-500">
              <i className="bi bi-lightning-fill text-9xl"></i>
            </div>
            <h3 className="text-lg font-black mb-2 flex items-center gap-2">
              <i className="bi bi-stars text-yellow-300"></i> Optimization Tip
            </h3>
            <p className="text-orange-50 text-sm md:text-base leading-relaxed font-medium">
              A high-quality logo and complete profile details can increase your incoming orders by up to <strong className="text-white text-lg">30%</strong>. Make your brand stand out!
            </p>
          </div>
        </div>

        {/* Right Column: Profile Form */}
        <div className="xl:col-span-2">
          <form onSubmit={handleUpdateProfile} className="bg-white dark:bg-slate-900/80 backdrop-blur-xl p-6 md:p-10 rounded-3xl border border-slate-200/60 dark:border-slate-800/60 shadow-xl shadow-slate-200/20 dark:shadow-black/20 space-y-10">
            
            {/* Section 1 */}
            <div>
              <h3 className="text-xl font-black text-slate-800 dark:text-white mb-6 border-b border-slate-100 dark:border-slate-800/60 pb-4 flex items-center gap-3">
                <div className="w-8 h-8 rounded-lg bg-orange-100 dark:bg-orange-500/20 text-[#c74a09] flex items-center justify-center">
                  <i className="bi bi-info-circle-fill"></i>
                </div>
                General Information
              </h3>
              
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6 md:gap-8">
                <div className="md:col-span-2">
                  <label className="block text-xs uppercase tracking-wider font-black text-slate-500 dark:text-slate-400 mb-2 ml-1">Restaurant Name</label>
                  <input
                    type="text"
                    value={editName}
                    onChange={e => setEditName(e.target.value)}
                    required
                    className="w-full px-5 py-3.5 rounded-2xl bg-slate-50 dark:bg-slate-950/50 border border-slate-200 dark:border-slate-800 text-slate-800 dark:text-slate-100 focus:outline-none focus:border-[#c74a09] focus:ring-4 focus:ring-orange-500/10 transition-all font-semibold text-lg"
                  />
                </div>

                <div className="md:col-span-2">
                  <label className="block text-xs uppercase tracking-wider font-black text-slate-500 dark:text-slate-400 mb-2 ml-1">About the Restaurant</label>
                  <textarea
                    value={editDescription}
                    onChange={e => setEditDescription(e.target.value)}
                    required
                    rows="4"
                    className="w-full px-5 py-3.5 rounded-2xl bg-slate-50 dark:bg-slate-950/50 border border-slate-200 dark:border-slate-800 text-slate-800 dark:text-slate-100 focus:outline-none focus:border-[#c74a09] focus:ring-4 focus:ring-orange-500/10 transition-all font-semibold resize-none"
                    placeholder="Tell your customers what makes your food special..."
                  ></textarea>
                </div>
              </div>
            </div>

            {/* Section 2 */}
            <div>
              <h3 className="text-xl font-black text-slate-800 dark:text-white mb-6 border-b border-slate-100 dark:border-slate-800/60 pb-4 flex items-center gap-3">
                <div className="w-8 h-8 rounded-lg bg-orange-100 dark:bg-orange-500/20 text-[#c74a09] flex items-center justify-center">
                  <i className="bi bi-telephone-fill"></i>
                </div>
                Contact Details
              </h3>
              
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6 md:gap-8">
                <div>
                  <label className="block text-xs uppercase tracking-wider font-black text-slate-500 dark:text-slate-400 mb-2 ml-1">Email Address</label>
                  <input
                    type="email"
                    value={editEmail}
                    onChange={e => setEditEmail(e.target.value)}
                    className="w-full px-5 py-3.5 rounded-2xl bg-slate-100/50 dark:bg-slate-950/30 border border-slate-200 dark:border-slate-800 text-slate-500 dark:text-slate-500 font-semibold disabled:cursor-not-allowed"
                    disabled
                  />
                  <p className="text-[11px] text-slate-400 mt-2 ml-1 font-medium"><i className="bi bi-lock-fill mr-1"></i> Contact support to change your account email.</p>
                </div>

                <div>
                  <label className="block text-xs uppercase tracking-wider font-black text-slate-500 dark:text-slate-400 mb-2 ml-1">Phone Number</label>
                  <input
                    type="tel"
                    value={editPhone}
                    onChange={e => setEditPhone(e.target.value)}
                    required
                    className="w-full px-5 py-3.5 rounded-2xl bg-slate-50 dark:bg-slate-950/50 border border-slate-200 dark:border-slate-800 text-slate-800 dark:text-slate-100 focus:outline-none focus:border-[#c74a09] focus:ring-4 focus:ring-orange-500/10 transition-all font-semibold"
                  />
                </div>

                <div className="md:col-span-2">
                  <label className="block text-xs uppercase tracking-wider font-black text-slate-500 dark:text-slate-400 mb-2 ml-1">Street Address</label>
                  <input
                    type="text"
                    value={editAddress}
                    onChange={e => setEditAddress(e.target.value)}
                    required
                    className="w-full px-5 py-3.5 rounded-2xl bg-slate-50 dark:bg-slate-950/50 border border-slate-200 dark:border-slate-800 text-slate-800 dark:text-slate-100 focus:outline-none focus:border-[#c74a09] focus:ring-4 focus:ring-orange-500/10 transition-all font-semibold"
                  />
                </div>
              </div>
            </div>

            {/* Section 3: Restaurant Gallery */}
            <div>
              <h3 className="text-xl font-black text-slate-800 dark:text-white mb-6 border-b border-slate-100 dark:border-slate-800/60 pb-4 flex items-center gap-3">
                <div className="w-8 h-8 rounded-lg bg-orange-100 dark:bg-orange-500/20 text-[#c74a09] flex items-center justify-center">
                  <i className="bi bi-images"></i>
                </div>
                Restaurant Gallery
              </h3>
              
              <div className="bg-slate-50 dark:bg-slate-950/50 rounded-2xl border border-slate-200 dark:border-slate-800 p-6">
                <div className="flex flex-col md:flex-row gap-6 items-start md:items-center justify-between">
                  <div>
                    <h4 className="font-bold text-slate-800 dark:text-slate-200">Bulk Upload Images</h4>
                    <p className="text-sm text-slate-500 dark:text-slate-400 mt-1">Upload multiple pictures of your restaurant interior, exterior, or signature dishes (Max 10).</p>
                  </div>
                  
                  <div className="flex flex-col sm:flex-row gap-3 w-full md:w-auto shrink-0">
                    <label className="bg-white dark:bg-slate-800 border border-slate-300 dark:border-slate-600 hover:bg-slate-50 dark:hover:bg-slate-700 text-slate-700 dark:text-slate-200 font-semibold py-2.5 px-5 rounded-xl cursor-pointer transition-colors text-center shadow-sm">
                      <i className="bi bi-folder-plus mr-2"></i> Select Files
                      <input 
                        type="file" 
                        multiple 
                        accept="image/*" 
                        className="hidden" 
                        onChange={handleGalleryFileSelect} 
                        disabled={isUploading}
                      />
                    </label>
                    
                    <button
                      type="button"
                      onClick={handleGalleryUpload}
                      disabled={isUploading || galleryFiles.length === 0}
                      className="bg-[#c74a09] hover:bg-[#a63d07] text-white font-bold py-2.5 px-6 rounded-xl transition-all shadow-md shadow-orange-500/20 disabled:opacity-50 disabled:cursor-not-allowed flex items-center justify-center gap-2"
                    >
                      {isUploading ? (
                        <><i className="bi bi-arrow-repeat animate-spin"></i> Uploading...</>
                      ) : (
                        <><i className="bi bi-cloud-arrow-up-fill"></i> Upload {galleryFiles.length > 0 ? `(${galleryFiles.length})` : ''}</>
                      )}
                    </button>
                  </div>
                </div>

                {/* Preview Selected Files */}
                {galleryFiles.length > 0 && (
                  <div className="mt-6 pt-6 border-t border-slate-200 dark:border-slate-800">
                    <h5 className="text-xs uppercase tracking-wider font-bold text-slate-500 dark:text-slate-400 mb-4 ml-1">Selected for Upload:</h5>
                    <div className="flex gap-3 overflow-x-auto pb-2 custom-scrollbar">
                      {galleryFiles.map((file, idx) => (
                        <div key={idx} className="relative w-20 h-20 shrink-0 rounded-lg overflow-hidden border border-slate-300 dark:border-slate-600">
                          <img 
                            src={URL.createObjectURL(file)} 
                            alt={`Preview ${idx}`} 
                            className="w-full h-full object-cover"
                            onLoad={() => URL.revokeObjectURL(file)} 
                          />
                        </div>
                      ))}
                    </div>
                  </div>
                )}
              </div>
            </div>

            <div className="pt-6 mt-6 border-t border-slate-100 dark:border-slate-800/60 flex items-center justify-between">
              <p className="text-sm text-slate-500 dark:text-slate-400 font-medium hidden sm:block">
                Last updated: Just now
              </p>
              <button
                type="submit"
                className="w-full sm:w-auto bg-[#c74a09] hover:bg-[#a63d07] hover:-translate-y-1 shadow-lg hover:shadow-orange-500/30 text-white font-extrabold px-8 py-4 rounded-xl transition-all duration-300 cursor-pointer flex items-center justify-center gap-2"
              >
                <i className="bi bi-check-circle-fill"></i>
                Save Profile Changes
              </button>
            </div>
          </form>
        </div>
      </div>

      {/* WhatsApp Style Image Modal */}
      {isImageModalOpen && createPortal(
        <div 
          className="fixed inset-0 z-[9999] flex items-center justify-center bg-black/90 backdrop-blur-md p-4 cursor-pointer"
          onClick={() => setIsImageModalOpen(false)}
        >
          <div className="relative max-w-[80vw] md:max-w-md aspect-square bg-transparent overflow-hidden shadow-2xl shadow-black/50 rounded-2xl scale-in-center cursor-default" onClick={e => e.stopPropagation()}>
             <img src={editLogo} alt="Restaurant Logo Full" className="w-full h-full object-cover bg-black" />
             <button 
               onClick={() => setIsImageModalOpen(false)}
               className="absolute top-4 right-4 w-10 h-10 bg-black/40 hover:bg-black/80 rounded-full text-white flex items-center justify-center backdrop-blur-md transition-all hover:scale-110"
             >
               <i className="bi bi-x text-2xl"></i>
             </button>
          </div>
        </div>,
        document.body
      )}
    </div>
  );
};

export default ProfileTab;
