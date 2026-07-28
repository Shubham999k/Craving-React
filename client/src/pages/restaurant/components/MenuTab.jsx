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
  const [modalMode, setModalMode] = useState('add'); // 'add', 'edit', 'view'
  const [itemToDelete, setItemToDelete] = useState(null);
  const [newItem, setNewItem] = useState({ name: '', description: '', price: '', category: 'Main Course', status: 'available', image: '' });

  const [past, setPast] = useState([]);
  const [future, setFuture] = useState([]);

  const saveWithHistory = (newItems) => {
    setPast([...past, menuItems]);
    setFuture([]);
    setMenuItems(newItems);
  };

  const undo = () => {
    if (past.length === 0) return;
    const previous = past[past.length - 1];
    setFuture([menuItems, ...future]);
    setPast(past.slice(0, -1));
    setMenuItems(previous);
    toast.success("Undo successful", { icon: '↩️' });
  };

  const redo = () => {
    if (future.length === 0) return;
    const next = future[0];
    setPast([...past, menuItems]);
    setFuture(future.slice(1));
    setMenuItems(next);
    toast.success("Redo successful", { icon: '↪️' });
  };

  const openModal = (mode, item = null) => {
    setModalMode(mode);
    if (item) {
      setNewItem({ ...item });
    } else {
      setNewItem({ name: '', description: '', price: '', category: 'Main Course', status: 'available', image: '' });
    }
    setIsModalOpen(true);
  };

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

  const handleSaveItem = (e) => {
    e.preventDefault();
    if (modalMode === 'view') {
      setIsModalOpen(false);
      return;
    }
    if (!newItem.name || !newItem.price) {
      toast.error("Please fill required fields");
      return;
    }
    const item = {
      ...newItem,
      id: newItem.id || Date.now(),
      price: parseFloat(newItem.price),
      image: newItem.image || "https://images.unsplash.com/photo-1546069901-ba9599a7e63c?auto=format&fit=crop&w=300&q=80"
    };

    if (modalMode === 'edit') {
      saveWithHistory(menuItems.map(i => i.id === item.id ? item : i));
      toast.success("Menu item updated!");
    } else {
      saveWithHistory([item, ...menuItems]);
      toast.success("Menu item added!");
    }
    setIsModalOpen(false);
  };

  const confirmDelete = () => {
    if (!itemToDelete) return;
    saveWithHistory(menuItems.filter(item => item.id !== itemToDelete.id));
    toast.success("Item removed");
    setItemToDelete(null);
  };

  const handleStatusChange = (id, newStatus) => {
    saveWithHistory(menuItems.map(item => item.id === id ? { ...item, status: newStatus } : item));
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
        <div className="mt-4 md:mt-0 flex items-center gap-3">
          <div className="flex bg-slate-100 dark:bg-slate-800 p-1 rounded-xl shadow-inner border border-slate-200 dark:border-slate-700">
            <button 
              onClick={undo}
              disabled={past.length === 0}
              className={`w-10 h-10 rounded-lg flex items-center justify-center transition-all ${past.length > 0 ? 'text-slate-700 dark:text-slate-200 hover:bg-white dark:hover:bg-slate-700 shadow-sm' : 'text-slate-400 dark:text-slate-600 cursor-not-allowed'}`}
              title="Undo"
            >
              <i className="bi bi-arrow-90deg-left"></i>
            </button>
            <button 
              onClick={redo}
              disabled={future.length === 0}
              className={`w-10 h-10 rounded-lg flex items-center justify-center transition-all ${future.length > 0 ? 'text-slate-700 dark:text-slate-200 hover:bg-white dark:hover:bg-slate-700 shadow-sm' : 'text-slate-400 dark:text-slate-600 cursor-not-allowed'}`}
              title="Redo"
            >
              <i className="bi bi-arrow-90deg-right"></i>
            </button>
          </div>
          <button 
            onClick={() => openModal('add')}
            className="bg-gradient-to-r from-orange-600 to-rose-600 text-white px-6 py-3.5 rounded-xl text-sm font-black shadow-xl shadow-orange-500/30 hover:shadow-orange-500/50 hover:-translate-y-1 transition-all duration-300 flex items-center gap-2"
          >
            <i className="bi bi-plus-circle-fill text-lg"></i> Add New Item
          </button>
        </div>
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
                        <img src={item.image} alt={item.name} onError={(e) => { e.target.src = 'https://images.unsplash.com/photo-1546069901-ba9599a7e63c?auto=format&fit=crop&w=300&q=80'; e.target.onerror = null; }} className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-500" />
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
                    <div className="relative inline-block">
                      <select 
                        value={item.status || 'available'}
                        onChange={(e) => handleStatusChange(item.id, e.target.value)}
                        className={`text-[10px] font-black pl-3 pr-8 py-1.5 rounded-lg border uppercase tracking-wider outline-none cursor-pointer appearance-none shadow-sm transition-colors ${
                          item.status === 'available' ? 'bg-green-50 dark:bg-green-500/10 text-green-600 dark:text-green-400 border-green-200 dark:border-green-800' :
                          item.status === 'not available' ? 'bg-amber-50 dark:bg-amber-500/10 text-amber-600 dark:text-amber-400 border-amber-200 dark:border-amber-800' :
                          'bg-slate-100 dark:bg-slate-800 text-slate-500 dark:text-slate-400 border-slate-200 dark:border-slate-700'
                        }`}
                      >
                        <option value="available" className="font-bold text-green-600 dark:text-green-400 bg-white dark:bg-slate-900">Available</option>
                        <option value="not available" className="font-bold text-amber-600 dark:text-amber-400 bg-white dark:bg-slate-900">Not Available</option>
                        <option value="disabled" className="font-bold text-slate-600 dark:text-slate-400 bg-white dark:bg-slate-900">Disabled</option>
                      </select>
                      <div className="absolute inset-y-0 right-0 flex items-center px-2 pointer-events-none">
                        <i className={`bi bi-chevron-down text-[10px] font-black ${
                          item.status === 'available' ? 'text-green-600 dark:text-green-400' :
                          item.status === 'not available' ? 'text-amber-600 dark:text-amber-400' :
                          'text-slate-500 dark:text-slate-400'
                        }`}></i>
                      </div>
                    </div>
                  </td>
                  <td className="px-6 py-4 text-right">
                    <div className="flex items-center justify-end gap-2">
                       <button onClick={() => openModal('view', item)} className="w-9 h-9 rounded-xl bg-slate-100 dark:bg-slate-800 hover:bg-slate-200 dark:hover:bg-slate-700 text-slate-600 dark:text-slate-300 flex items-center justify-center transition-all hover:scale-105 active:scale-95" title="View Details">
                         <i className="bi bi-eye text-sm"></i>
                       </button>
                       <button onClick={() => openModal('edit', item)} className="w-9 h-9 rounded-xl bg-slate-100 dark:bg-slate-800 hover:bg-slate-200 dark:hover:bg-slate-700 text-slate-600 dark:text-slate-300 flex items-center justify-center transition-all hover:scale-105 active:scale-95" title="Edit Item">
                         <i className="bi bi-pencil-square text-sm"></i>
                       </button>
                       <button 
                         onClick={() => setItemToDelete(item)}
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

      {/* Add/Edit/View Item Modal */}
      {isModalOpen && createPortal(
        <div className="fixed inset-0 z-[9999] flex items-center justify-center p-4 sm:p-6 animate-fadeIn">
          <div className="absolute inset-0 bg-slate-900/40 dark:bg-black/60 backdrop-blur-md" onClick={() => setIsModalOpen(false)}></div>
          <div className="relative w-full max-w-xl bg-white dark:bg-slate-900 rounded-[2rem] shadow-2xl overflow-hidden animate-zoomIn border border-white/20 dark:border-slate-700/50 flex flex-col max-h-[90vh]">
            
            {/* Modal Header with Decorative Gradient Background */}
            <div className="relative pt-8 pb-6 px-8 overflow-hidden shrink-0">
              <div className="absolute top-0 inset-x-0 h-1 bg-gradient-to-r from-orange-500 via-rose-500 to-amber-500"></div>
              <div className="absolute -top-24 -right-24 w-48 h-48 bg-orange-500/10 dark:bg-orange-500/20 rounded-full blur-3xl"></div>
              <div className="absolute -bottom-24 -left-24 w-48 h-48 bg-rose-500/10 dark:bg-rose-500/20 rounded-full blur-3xl"></div>
              
              <div className="relative flex justify-between items-start">
                <div>
                  <h3 className="text-2xl font-black text-slate-800 dark:text-white flex items-center gap-3 tracking-tight">
                    <span className="w-10 h-10 rounded-2xl bg-gradient-to-br from-orange-400 to-rose-600 text-white flex items-center justify-center shadow-lg shadow-orange-500/30">
                      <i className="bi bi-stars text-xl"></i>
                    </span>
                    {modalMode === 'view' ? 'View Menu Item' : modalMode === 'edit' ? 'Edit Menu Item' : 'Create Menu Item'}
                  </h3>
                  <p className="text-slate-500 dark:text-slate-400 text-sm font-medium mt-2 ml-[52px]">
                    {modalMode === 'view' ? 'Details of your menu item.' : modalMode === 'edit' ? 'Update your menu item details.' : 'Craft a new delicious addition to your menu.'}
                  </p>
                </div>
                <button 
                  onClick={() => setIsModalOpen(false)} 
                  className="group w-10 h-10 rounded-full bg-slate-100 dark:bg-slate-800 flex items-center justify-center hover:bg-rose-100 dark:hover:bg-rose-500/20 text-slate-500 dark:text-slate-400 hover:text-rose-500 transition-all duration-300 relative z-10"
                >
                  <i className="bi bi-x-lg group-hover:rotate-90 transition-transform duration-300"></i>
                </button>
              </div>
            </div>

            {/* Modal Form Scrollable Content */}
            <form id="add-item-form" onSubmit={handleSaveItem} className="flex-1 overflow-y-auto px-8 py-2 space-y-6 scrollbar-thin scrollbar-thumb-slate-200 dark:scrollbar-thumb-slate-700 pb-8">
              
              {/* Image Upload Area - Premium Design */}
              <div className="group relative w-full h-40 rounded-2xl overflow-hidden bg-slate-50 dark:bg-slate-800/30 border-2 border-dashed border-slate-200 dark:border-slate-700 hover:border-orange-500 dark:hover:border-orange-500 transition-colors flex items-center justify-center cursor-pointer">
                {newItem.image ? (
                  <>
                    <img src={newItem.image} alt="Preview" onError={(e) => { e.target.src = 'https://images.unsplash.com/photo-1546069901-ba9599a7e63c?auto=format&fit=crop&w=300&q=80'; e.target.onerror = null; }} className="w-full h-full object-cover" />
                    {modalMode !== 'view' && (
                      <div className="absolute inset-0 bg-black/40 opacity-0 group-hover:opacity-100 transition-opacity flex items-center justify-center">
                        <span className="bg-white/20 backdrop-blur-md text-white px-4 py-2 rounded-xl font-bold text-sm flex items-center gap-2">
                          <i className="bi bi-camera"></i> Change Image
                        </span>
                      </div>
                    )}
                  </>
                ) : (
                  <div className="text-center p-6">
                    <div className="w-12 h-12 rounded-full bg-orange-100 dark:bg-orange-500/20 text-orange-600 dark:text-orange-400 flex items-center justify-center mx-auto mb-3 group-hover:scale-110 group-hover:bg-orange-200 dark:group-hover:bg-orange-500/30 transition-all">
                      <i className="bi bi-image text-xl"></i>
                    </div>
                    <p className="text-sm font-bold text-slate-600 dark:text-slate-300">Click to upload image</p>
                    <p className="text-xs text-slate-400 mt-1">or paste a URL below (Max 2MB)</p>
                  </div>
                )}
                <input type="file" accept="image/*" disabled={modalMode === 'view'} className="absolute inset-0 w-full h-full opacity-0 cursor-pointer disabled:cursor-auto" onChange={handleCustomImageUpload} />
              </div>

              {/* Or Paste URL */}
              {!newItem.image && modalMode !== 'view' && (
                <div className="flex items-center gap-3">
                  <div className="flex-1 h-px bg-slate-200 dark:bg-slate-700"></div>
                  <span className="text-[10px] font-black uppercase tracking-widest text-slate-400">OR PASTE URL</span>
                  <div className="flex-1 h-px bg-slate-200 dark:bg-slate-700"></div>
                </div>
              )}
              
              {!newItem.image && modalMode !== 'view' && (
                <div className="relative group">
                  <i className="bi bi-link-45deg absolute left-4 top-1/2 -translate-y-1/2 text-slate-400 group-focus-within:text-orange-500 transition-colors text-lg"></i>
                  <input type="url" value={newItem.image} disabled={modalMode === 'view'} onChange={e => setNewItem({...newItem, image: e.target.value})} className="w-full pl-11 pr-4 py-3.5 rounded-xl bg-slate-50 dark:bg-slate-800/50 border border-slate-200 dark:border-slate-700 focus:outline-none focus:border-orange-500 focus:ring-4 focus:ring-orange-500/10 transition-all font-semibold text-slate-800 dark:text-white disabled:opacity-70 disabled:cursor-not-allowed" placeholder="https://example.com/image.jpg" />
                </div>
              )}

              {/* Inputs Grid */}
              <div className="space-y-5">
                <div className="space-y-1.5">
                  <label className="block text-xs font-black text-slate-500 dark:text-slate-400 uppercase tracking-wider ml-1">Item Name</label>
                  <input required type="text" value={newItem.name} disabled={modalMode === 'view'} onChange={e => setNewItem({...newItem, name: e.target.value})} className="w-full px-4 py-3.5 rounded-xl bg-slate-50 dark:bg-slate-800/50 border border-slate-200 dark:border-slate-700 focus:outline-none focus:border-orange-500 focus:ring-4 focus:ring-orange-500/10 transition-all font-bold text-slate-800 dark:text-white disabled:opacity-70 disabled:cursor-not-allowed placeholder:text-slate-400 placeholder:font-medium" placeholder="e.g. Signature Truffle Burger" />
                </div>

                <div className="grid grid-cols-1 sm:grid-cols-2 gap-5">
                  <div className="space-y-1.5">
                    <label className="block text-xs font-black text-slate-500 dark:text-slate-400 uppercase tracking-wider ml-1">Price</label>
                    <div className="relative group">
                      <span className="absolute left-4 top-1/2 -translate-y-1/2 font-black text-slate-400 group-focus-within:text-orange-500 transition-colors">$</span>
                      <input required type="number" step="0.01" value={newItem.price} disabled={modalMode === 'view'} onChange={e => setNewItem({...newItem, price: e.target.value})} className="w-full pl-8 pr-4 py-3.5 rounded-xl bg-slate-50 dark:bg-slate-800/50 border border-slate-200 dark:border-slate-700 focus:outline-none focus:border-orange-500 focus:ring-4 focus:ring-orange-500/10 transition-all font-bold text-slate-800 dark:text-white disabled:opacity-70 disabled:cursor-not-allowed placeholder:text-slate-400 placeholder:font-medium" placeholder="0.00" />
                    </div>
                  </div>
                  
                  <div className="space-y-1.5">
                    <label className="block text-xs font-black text-slate-500 dark:text-slate-400 uppercase tracking-wider ml-1">Category</label>
                    <div className="relative">
                      <select value={newItem.category} disabled={modalMode === 'view'} onChange={e => setNewItem({...newItem, category: e.target.value})} className="w-full px-4 py-3.5 rounded-xl bg-slate-50 dark:bg-slate-800/50 border border-slate-200 dark:border-slate-700 focus:outline-none focus:border-orange-500 focus:ring-4 focus:ring-orange-500/10 transition-all font-bold text-slate-800 dark:text-white disabled:opacity-70 appearance-none cursor-pointer disabled:cursor-auto">
                        <option>Appetizers</option>
                        <option>Main Course</option>
                        <option>Desserts</option>
                        <option>Beverages</option>
                      </select>
                      <i className="bi bi-chevron-down absolute right-4 top-1/2 -translate-y-1/2 text-slate-400 pointer-events-none font-bold text-sm"></i>
                    </div>
                  </div>
                </div>

                <div className="space-y-1.5">
                  <label className="block text-xs font-black text-slate-500 dark:text-slate-400 uppercase tracking-wider ml-1">Status</label>
                  <div className="relative">
                    <select value={newItem.status} disabled={modalMode === 'view'} onChange={e => setNewItem({...newItem, status: e.target.value})} className="w-full px-4 py-3.5 rounded-xl bg-slate-50 dark:bg-slate-800/50 border border-slate-200 dark:border-slate-700 focus:outline-none focus:border-orange-500 focus:ring-4 focus:ring-orange-500/10 transition-all font-bold text-slate-800 dark:text-white disabled:opacity-70 appearance-none cursor-pointer disabled:cursor-auto">
                      <option value="available">✨ Available (Active)</option>
                      <option value="not available">⛔ Not Available (Out of stock)</option>
                      <option value="disabled">👁️‍🗨️ Hidden (Disabled)</option>
                    </select>
                    <i className="bi bi-chevron-down absolute right-4 top-1/2 -translate-y-1/2 text-slate-400 pointer-events-none font-bold text-sm"></i>
                  </div>
                </div>

                <div className="space-y-1.5 pb-2">
                  <label className="block text-xs font-black text-slate-500 dark:text-slate-400 uppercase tracking-wider ml-1">Description</label>
                  <textarea required rows="3" value={newItem.description} disabled={modalMode === 'view'} onChange={e => setNewItem({...newItem, description: e.target.value})} className="w-full px-4 py-3.5 rounded-xl bg-slate-50 dark:bg-slate-800/50 border border-slate-200 dark:border-slate-700 focus:outline-none focus:border-orange-500 focus:ring-4 focus:ring-orange-500/10 transition-all font-semibold text-slate-800 dark:text-white disabled:opacity-70 disabled:cursor-not-allowed resize-none placeholder:text-slate-400 placeholder:font-medium" placeholder="What makes this dish special?..."></textarea>
                </div>
              </div>
            </form>

            {/* Modal Footer */}
            <div className="p-6 bg-slate-50 dark:bg-slate-800/80 border-t border-slate-200 dark:border-slate-700/50 shrink-0 flex gap-4 justify-end">
              <button type="button" onClick={() => setIsModalOpen(false)} className="px-6 py-3.5 rounded-xl font-bold text-slate-600 dark:text-slate-300 hover:bg-slate-200 dark:hover:bg-slate-700 transition-colors">
                {modalMode === 'view' ? 'Close' : 'Cancel'}
              </button>
              {modalMode !== 'view' && (
                <button type="submit" form="add-item-form" className="px-8 py-3.5 bg-gradient-to-r from-orange-600 to-rose-600 hover:from-orange-500 hover:to-rose-500 text-white font-black rounded-xl shadow-lg shadow-orange-500/30 hover:shadow-orange-500/50 hover:-translate-y-0.5 transition-all flex items-center gap-2">
                  <i className="bi bi-check2-circle text-lg"></i> {modalMode === 'edit' ? 'Save Changes' : 'Add Item'}
                </button>
              )}
            </div>
            
          </div>
        </div>,
        document.body
      )}

      {/* Delete Confirmation Modal */}
      {itemToDelete && createPortal(
        <div className="fixed inset-0 z-[9999] flex items-center justify-center p-4 sm:p-6 animate-fadeIn">
          <div className="absolute inset-0 bg-slate-900/40 dark:bg-black/60 backdrop-blur-md" onClick={() => setItemToDelete(null)}></div>
          <div className="relative w-full max-w-sm bg-white dark:bg-slate-900 rounded-[2rem] shadow-2xl overflow-hidden animate-zoomIn border border-white/20 dark:border-slate-700/50 flex flex-col">
            <div className="p-8 text-center space-y-4">
              <div className="w-16 h-16 rounded-full bg-red-100 dark:bg-red-500/20 text-red-500 flex items-center justify-center mx-auto shadow-inner">
                <i className="bi bi-exclamation-triangle text-3xl"></i>
              </div>
              <h3 className="text-xl font-black text-slate-800 dark:text-white">Delete Item?</h3>
              <p className="text-sm text-slate-500 dark:text-slate-400 font-medium">
                Are you sure you want to delete <span className="text-slate-700 dark:text-slate-200 font-bold">{itemToDelete.name}</span>? This action can be undone later using the undo button.
              </p>
            </div>
            <div className="p-6 bg-slate-50 dark:bg-slate-800/80 border-t border-slate-200 dark:border-slate-700/50 flex gap-3">
              <button onClick={() => setItemToDelete(null)} className="flex-1 py-3 rounded-xl font-bold text-slate-600 dark:text-slate-300 hover:bg-slate-200 dark:hover:bg-slate-700 transition-colors">
                Cancel
              </button>
              <button onClick={confirmDelete} className="flex-1 py-3 bg-red-500 hover:bg-red-600 text-white font-black rounded-xl shadow-lg shadow-red-500/30 hover:shadow-red-500/50 hover:-translate-y-0.5 transition-all">
                Delete
              </button>
            </div>
          </div>
        </div>,
        document.body
      )}
    </div>
  );
}
