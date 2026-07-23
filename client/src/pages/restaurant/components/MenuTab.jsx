import React, { useState, useEffect } from 'react';
import { createPortal } from 'react-dom';
import toast from 'react-hot-toast';

export default function MenuTab() {
  const [menuItems, setMenuItems] = useState(() => {
    try {
      const saved = localStorage.getItem('restaurantMenu');
      if (saved) return JSON.parse(saved);
    } catch (e) {}
    return [
      { id: 1, name: "Spicy Beef Burger", description: "Juicy beef patty with jalapenos and special sauce.", price: 12.99, category: "Main Course", status: "available", image: "https://images.unsplash.com/photo-1568901346375-23c9450c58cd?auto=format&fit=crop&w=300&q=80" },
      { id: 2, name: "Crispy Fries", description: "Golden crinkle-cut fries with sea salt.", price: 4.99, category: "Appetizers", status: "not available", image: "https://images.unsplash.com/photo-1576107232684-1279f390859f?auto=format&fit=crop&w=300&q=80" }
    ];
  });

  const [isModalOpen, setIsModalOpen] = useState(false);
  const [newItem, setNewItem] = useState({ name: '', description: '', price: '', category: 'Main Course', status: 'available', image: '' });

  useEffect(() => {
    localStorage.setItem('restaurantMenu', JSON.stringify(menuItems));
  }, [menuItems]);

  const handleCustomImageUpload = (e) => {
    const file = e.target.files[0];
    if (file) {
      if (file.size > 2 * 1024 * 1024) {
        toast.error("Image size must be less than 2MB");
        return;
      }
      const reader = new FileReader();
      reader.onloadend = () => {
        setNewItem({...newItem, image: reader.result});
        toast.success("Image loaded!");
      };
      reader.readAsDataURL(file);
    }
  };

  const handleAddItem = (e) => {
    e.preventDefault();
    if (!newItem.name || !newItem.price) {
      toast.error("Please fill required fields");
      return;
    }
    const item = {
      ...newItem,
      id: Date.now(),
      price: parseFloat(newItem.price),
      image: newItem.image || "https://images.unsplash.com/photo-1546069901-ba9599a7e63c?auto=format&fit=crop&w=300&q=80"
    };
    setMenuItems([item, ...menuItems]);
    setIsModalOpen(false);
    setNewItem({ name: '', description: '', price: '', category: 'Main Course', status: 'available', image: '' });
    toast.success("Menu item added!");
  };

  const handleDeleteItem = (id) => {
    setMenuItems(menuItems.filter(item => item.id !== id));
    toast.success("Item removed");
  };

  const handleStatusChange = (id, newStatus) => {
    setMenuItems(menuItems.map(item => item.id === id ? { ...item, status: newStatus } : item));
    toast.success("Status updated");
  };

  return (
    <div className="w-full animate-fadeIn pb-10">
      {/* Header */}
      <div className="flex flex-col md:flex-row justify-between items-start md:items-center bg-white dark:bg-slate-900/80 p-6 md:p-8 rounded-3xl border border-slate-200/60 dark:border-slate-800/60 shadow-xl shadow-slate-200/20 dark:shadow-black/20 mb-8">
        <div>
          <h3 className="text-2xl font-black text-slate-800 dark:text-white flex items-center gap-2">
             <i className="bi bi-journal-text text-[#c74a09]"></i> Manage Menu
          </h3>
          <p className="text-sm text-slate-500 dark:text-slate-400 mt-1 font-medium">Add, edit, or remove items from your restaurant menu.</p>
        </div>
        <button 
          onClick={() => setIsModalOpen(true)}
          className="mt-4 md:mt-0 bg-[#c74a09] text-white px-6 py-3 rounded-xl text-sm font-extrabold shadow-lg hover:shadow-orange-500/30 hover:-translate-y-0.5 transition-all flex items-center gap-2"
        >
          <i className="bi bi-plus-lg"></i> Add New Item
        </button>
      </div>

      {/* Menu Grid */}
      {menuItems.length === 0 ? (
        <div className="flex flex-col items-center justify-center py-16 bg-white dark:bg-slate-900/50 rounded-3xl border border-dashed border-slate-300 dark:border-slate-700">
           <i className="bi bi-emoji-frown text-4xl text-slate-400 mb-4"></i>
           <p className="text-slate-500 font-medium">No menu items found. Add some delicious food!</p>
        </div>
      ) : (
        <div className="w-full overflow-x-auto rounded-3xl border border-slate-200/60 dark:border-slate-800/60 shadow-xl shadow-slate-200/20 dark:shadow-black/20 bg-white dark:bg-slate-900/50">
          <table className="w-full text-left border-collapse min-w-[800px]">
            <thead>
              <tr className="bg-slate-50 dark:bg-slate-800/80 text-slate-500 dark:text-slate-400 text-[11px] uppercase tracking-widest border-b border-slate-200/60 dark:border-slate-800/60">
                <th className="px-6 py-5 font-black">Item Name & Description</th>
                <th className="px-6 py-5 font-black">Type</th>
                <th className="px-6 py-5 font-black">Price</th>
                <th className="px-6 py-5 font-black">Status</th>
                <th className="px-6 py-5 font-black text-right">Action</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-slate-100 dark:divide-slate-800/60">
              {menuItems.map(item => (
                <tr key={item.id} className="hover:bg-slate-50/80 dark:hover:bg-slate-800/40 transition-colors group">
                  <td className="px-6 py-4">
                    <div className="flex items-center gap-4">
                      <div className="w-14 h-14 shrink-0 rounded-xl overflow-hidden shadow-sm border border-slate-100 dark:border-slate-800 relative">
                        <img src={item.image} alt={item.name} className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-500" />
                        <div className="absolute inset-0 bg-black/5 group-hover:bg-transparent transition-colors"></div>
                      </div>
                      <div className="flex-1 min-w-0">
                        <h4 className="font-bold text-slate-800 dark:text-slate-100 text-sm mb-0.5 truncate group-hover:text-[#c74a09] transition-colors">{item.name}</h4>
                        <p className="text-xs text-slate-500 dark:text-slate-400 line-clamp-1 font-medium max-w-[280px]">
                          {item.description}
                        </p>
                      </div>
                    </div>
                  </td>
                  <td className="px-6 py-4">
                    <span className="text-[10px] font-black px-2.5 py-1 rounded-lg bg-slate-100 dark:bg-slate-800 text-slate-600 dark:text-slate-300 border border-slate-200/60 dark:border-slate-700/60 uppercase tracking-wider whitespace-nowrap">
                      {item.category}
                    </span>
                  </td>
                  <td className="px-6 py-4">
                    <span className="font-black text-slate-800 dark:text-slate-100 text-sm whitespace-nowrap">
                      ${item.price.toFixed(2)}
                    </span>
                  </td>
                  <td className="px-6 py-4">
                    <select 
                      value={item.status || 'available'}
                      onChange={(e) => handleStatusChange(item.id, e.target.value)}
                      className={`text-[10px] font-black px-3 py-1.5 rounded-lg border uppercase tracking-wider outline-none cursor-pointer appearance-none shadow-sm transition-colors ${
                        item.status === 'available' ? 'bg-green-50 dark:bg-green-500/10 text-green-600 dark:text-green-400 border-green-200 dark:border-green-800' :
                        item.status === 'not available' ? 'bg-amber-50 dark:bg-amber-500/10 text-amber-600 dark:text-amber-400 border-amber-200 dark:border-amber-800' :
                        'bg-slate-100 dark:bg-slate-800 text-slate-500 dark:text-slate-400 border-slate-200 dark:border-slate-700'
                      }`}
                    >
                      <option value="available" className="text-slate-800 font-bold">Available</option>
                      <option value="not available" className="text-slate-800 font-bold">Not Available</option>
                      <option value="disabled" className="text-slate-800 font-bold">Disabled</option>
                    </select>
                  </td>
                  <td className="px-6 py-4 text-right">
                    <div className="flex items-center justify-end gap-2">
                       <button className="w-9 h-9 rounded-xl bg-slate-100 dark:bg-slate-800 hover:bg-slate-200 dark:hover:bg-slate-700 text-slate-600 dark:text-slate-300 flex items-center justify-center transition-all hover:scale-105 active:scale-95" title="View Details">
                         <i className="bi bi-eye text-sm"></i>
                       </button>
                       <button className="w-9 h-9 rounded-xl bg-slate-100 dark:bg-slate-800 hover:bg-slate-200 dark:hover:bg-slate-700 text-slate-600 dark:text-slate-300 flex items-center justify-center transition-all hover:scale-105 active:scale-95" title="Edit Item">
                         <i className="bi bi-pencil-square text-sm"></i>
                       </button>
                       <button 
                         onClick={() => handleDeleteItem(item.id)}
                         className="w-9 h-9 rounded-xl bg-red-50 dark:bg-red-500/10 hover:bg-red-100 dark:hover:bg-red-500/20 text-red-500 flex items-center justify-center transition-all hover:scale-105 active:scale-95"
                         title="Delete Item"
                       >
                         <i className="bi bi-trash text-sm"></i>
                       </button>
                    </div>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      )}

      {/* Add Item Modal */}
      {isModalOpen && createPortal(
        <div className="fixed inset-0 z-[9999] flex items-center justify-center bg-black/60 backdrop-blur-sm p-4 animate-fadeIn">
          <div className="bg-white dark:bg-slate-900 w-full max-w-lg rounded-3xl shadow-2xl overflow-hidden animate-zoomIn border border-slate-200 dark:border-slate-800">
            <div className="flex justify-between items-center p-6 border-b border-slate-100 dark:border-slate-800/60">
              <h3 className="text-xl font-black text-slate-800 dark:text-white flex items-center gap-2">
                <div className="w-8 h-8 rounded-lg bg-orange-100 dark:bg-orange-500/20 text-[#c74a09] flex items-center justify-center">
                  <i className="bi bi-plus-circle-fill"></i>
                </div>
                Add Menu Item
              </h3>
              <button onClick={() => setIsModalOpen(false)} className="text-slate-400 hover:text-slate-600 dark:hover:text-slate-200 bg-slate-100 dark:bg-slate-800 hover:bg-slate-200 dark:hover:bg-slate-700 w-8 h-8 rounded-full flex items-center justify-center transition-colors">
                <i className="bi bi-x-lg"></i>
              </button>
            </div>
            <form onSubmit={handleAddItem} className="p-6 space-y-5">
              <div>
                <label className="block text-xs uppercase tracking-wider font-bold text-slate-500 mb-1.5 ml-1">Item Name</label>
                <input required type="text" value={newItem.name} onChange={e => setNewItem({...newItem, name: e.target.value})} className="w-full px-5 py-3 rounded-xl bg-slate-50 dark:bg-slate-950/50 border border-slate-200 dark:border-slate-800 focus:outline-none focus:border-[#c74a09] focus:ring-2 focus:ring-orange-500/20 transition-all font-semibold text-slate-800 dark:text-white" placeholder="e.g. Classic Cheeseburger" />
              </div>
              <div className="grid grid-cols-1 md:grid-cols-3 gap-5">
                <div>
                  <label className="block text-xs uppercase tracking-wider font-bold text-slate-500 mb-1.5 ml-1">Price ($)</label>
                  <input required type="number" step="0.01" value={newItem.price} onChange={e => setNewItem({...newItem, price: e.target.value})} className="w-full px-5 py-3 rounded-xl bg-slate-50 dark:bg-slate-950/50 border border-slate-200 dark:border-slate-800 focus:outline-none focus:border-[#c74a09] focus:ring-2 focus:ring-orange-500/20 transition-all font-semibold text-slate-800 dark:text-white" placeholder="0.00" />
                </div>
                <div>
                  <label className="block text-xs uppercase tracking-wider font-bold text-slate-500 mb-1.5 ml-1">Category</label>
                  <select value={newItem.category} onChange={e => setNewItem({...newItem, category: e.target.value})} className="w-full px-5 py-3 rounded-xl bg-slate-50 dark:bg-slate-950/50 border border-slate-200 dark:border-slate-800 focus:outline-none focus:border-[#c74a09] focus:ring-2 focus:ring-orange-500/20 transition-all font-semibold text-slate-800 dark:text-white cursor-pointer">
                    <option>Appetizers</option>
                    <option>Main Course</option>
                    <option>Desserts</option>
                    <option>Beverages</option>
                  </select>
                </div>
                <div>
                  <label className="block text-xs uppercase tracking-wider font-bold text-slate-500 mb-1.5 ml-1">Status</label>
                  <select value={newItem.status} onChange={e => setNewItem({...newItem, status: e.target.value})} className="w-full px-5 py-3 rounded-xl bg-slate-50 dark:bg-slate-950/50 border border-slate-200 dark:border-slate-800 focus:outline-none focus:border-[#c74a09] focus:ring-2 focus:ring-orange-500/20 transition-all font-semibold text-slate-800 dark:text-white cursor-pointer">
                    <option value="available">Available</option>
                    <option value="not available">Not Available</option>
                    <option value="disabled">Disabled</option>
                  </select>
                </div>
              </div>
              <div>
                <label className="block text-xs uppercase tracking-wider font-bold text-slate-500 mb-1.5 ml-1">Description</label>
                <textarea required rows="2" value={newItem.description} onChange={e => setNewItem({...newItem, description: e.target.value})} className="w-full px-5 py-3 rounded-xl bg-slate-50 dark:bg-slate-950/50 border border-slate-200 dark:border-slate-800 focus:outline-none focus:border-[#c74a09] focus:ring-2 focus:ring-orange-500/20 transition-all font-semibold text-slate-800 dark:text-white resize-none" placeholder="Briefly describe the item..."></textarea>
              </div>
              <div>
                <label className="block text-xs uppercase tracking-wider font-bold text-slate-500 mb-1.5 ml-1">Item Photo</label>
                <div className="flex flex-col gap-3">
                  <div className="flex items-center gap-3">
                    <label className="cursor-pointer shrink-0 bg-slate-100 hover:bg-slate-200 dark:bg-slate-800 dark:hover:bg-slate-700 text-slate-700 dark:text-slate-300 font-bold py-3 px-4 rounded-xl transition-colors flex items-center gap-2">
                      <i className="bi bi-camera-fill"></i> Upload
                      <input type="file" accept="image/*" className="hidden" onChange={handleCustomImageUpload} />
                    </label>
                    <span className="text-slate-400 text-[10px] font-black uppercase tracking-wider">OR</span>
                    <input type="url" value={newItem.image} onChange={e => setNewItem({...newItem, image: e.target.value})} className="flex-1 w-full px-5 py-3 rounded-xl bg-slate-50 dark:bg-slate-950/50 border border-slate-200 dark:border-slate-800 focus:outline-none focus:border-[#c74a09] focus:ring-2 focus:ring-orange-500/20 transition-all font-semibold text-slate-800 dark:text-white" placeholder="Paste URL" />
                  </div>
                  {newItem.image && (
                    <div className="relative w-full h-32 rounded-xl overflow-hidden border-2 border-slate-200 dark:border-slate-700 mt-2">
                       <img src={newItem.image} alt="Preview" className="w-full h-full object-cover" />
                       <button type="button" onClick={() => setNewItem({...newItem, image: ''})} className="absolute top-2 right-2 bg-black/50 text-white rounded-full w-8 h-8 flex items-center justify-center hover:bg-black/80 transition-colors backdrop-blur"><i className="bi bi-x-lg"></i></button>
                    </div>
                  )}
                </div>
              </div>
              <div className="pt-2">
                <button type="submit" className="w-full bg-[#c74a09] hover:bg-[#a63d07] hover:-translate-y-1 text-white font-black py-4 rounded-xl transition-all duration-300 shadow-lg hover:shadow-orange-500/30 flex items-center justify-center gap-2">
                  <i className="bi bi-check-circle-fill"></i> Add Item to Menu
                </button>
              </div>
            </form>
          </div>
        </div>,
        document.body
      )}
    </div>
  );
}
