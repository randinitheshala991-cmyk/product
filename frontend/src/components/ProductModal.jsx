import { useState, useEffect } from 'react';
import { X, Save, Plus } from 'lucide-react';

const CATEGORIES = ['Electronics', 'Clothing', 'Food & Beverages', 'Books', 'Sports', 'Home & Garden', 'Toys', 'Other'];

const emptyForm = { name: '', description: '', price: '', category: '', inStock: true };

export default function ProductModal({ isOpen, onClose, onSubmit, editProduct }) {
  const [form, setForm] = useState(emptyForm);
  const [errors, setErrors] = useState({});

  useEffect(() => {
    if (editProduct) {
      setForm({ ...editProduct, price: editProduct.price.toString() });
    } else {
      setForm(emptyForm);
    }
    setErrors({});
  }, [editProduct, isOpen]);

  const validate = () => {
    const errs = {};
    if (!form.name.trim()) errs.name = 'Name is required';
    if (!form.description.trim()) errs.description = 'Description is required';
    if (!form.price || isNaN(form.price) || Number(form.price) < 0) errs.price = 'Valid price is required';
    if (!form.category) errs.category = 'Category is required';
    setErrors(errs);
    return Object.keys(errs).length === 0;
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    if (!validate()) return;
    onSubmit({ ...form, price: Number(form.price) });
  };

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4">
      {/* Backdrop */}
      <div
        className="absolute inset-0 bg-black/60 backdrop-blur-sm"
        onClick={onClose}
      />

      {/* Modal */}
      <div className="relative w-full max-w-lg bg-slate-900 border border-slate-700 rounded-2xl shadow-2xl shadow-black/50 overflow-hidden">
        {/* Header */}
        <div className="flex items-center justify-between p-6 border-b border-slate-700/50">
          <div className="flex items-center gap-3">
            <div className="w-8 h-8 rounded-lg bg-gradient-to-br from-violet-500 to-indigo-600 flex items-center justify-center">
              {editProduct ? <Save size={16} className="text-white" /> : <Plus size={16} className="text-white" />}
            </div>
            <h2 className="text-white font-semibold text-lg">
              {editProduct ? 'Edit Product' : 'Add New Product'}
            </h2>
          </div>
          <button
            onClick={onClose}
            className="w-8 h-8 flex items-center justify-center rounded-lg text-slate-400 hover:text-white hover:bg-slate-800 cursor-pointer"
          >
            <X size={18} />
          </button>
        </div>

        {/* Form */}
        <form onSubmit={handleSubmit} className="p-6 space-y-5">
          {/* Name */}
          <div>
            <label className="block text-sm font-medium text-slate-300 mb-1.5">Product Name</label>
            <input
              type="text"
              value={form.name}
              onChange={(e) => setForm({ ...form, name: e.target.value })}
              placeholder="Enter product name"
              className={`w-full bg-slate-800 border rounded-xl px-4 py-2.5 text-white placeholder-slate-500 text-sm outline-none focus:ring-2 focus:ring-violet-500/50 ${
                errors.name ? 'border-red-500' : 'border-slate-700 focus:border-violet-500'
              }`}
            />
            {errors.name && <p className="text-red-400 text-xs mt-1">{errors.name}</p>}
          </div>

          {/* Description */}
          <div>
            <label className="block text-sm font-medium text-slate-300 mb-1.5">Description</label>
            <textarea
              value={form.description}
              onChange={(e) => setForm({ ...form, description: e.target.value })}
              placeholder="Enter product description"
              rows={3}
              className={`w-full bg-slate-800 border rounded-xl px-4 py-2.5 text-white placeholder-slate-500 text-sm outline-none focus:ring-2 focus:ring-violet-500/50 resize-none ${
                errors.description ? 'border-red-500' : 'border-slate-700 focus:border-violet-500'
              }`}
            />
            {errors.description && <p className="text-red-400 text-xs mt-1">{errors.description}</p>}
          </div>

          {/* Price + Category */}
          <div className="grid grid-cols-2 gap-4">
            <div>
              <label className="block text-sm font-medium text-slate-300 mb-1.5">Price ($)</label>
              <input
                type="number"
                value={form.price}
                onChange={(e) => setForm({ ...form, price: e.target.value })}
                placeholder="0.00"
                min="0"
                step="0.01"
                className={`w-full bg-slate-800 border rounded-xl px-4 py-2.5 text-white placeholder-slate-500 text-sm outline-none focus:ring-2 focus:ring-violet-500/50 ${
                  errors.price ? 'border-red-500' : 'border-slate-700 focus:border-violet-500'
                }`}
              />
              {errors.price && <p className="text-red-400 text-xs mt-1">{errors.price}</p>}
            </div>
            <div>
              <label className="block text-sm font-medium text-slate-300 mb-1.5">Category</label>
              <select
                value={form.category}
                onChange={(e) => setForm({ ...form, category: e.target.value })}
                className={`w-full bg-slate-800 border rounded-xl px-4 py-2.5 text-white text-sm outline-none focus:ring-2 focus:ring-violet-500/50 cursor-pointer ${
                  errors.category ? 'border-red-500' : 'border-slate-700 focus:border-violet-500'
                }`}
              >
                <option value="" className="bg-slate-800">Select...</option>
                {CATEGORIES.map((cat) => (
                  <option key={cat} value={cat} className="bg-slate-800">{cat}</option>
                ))}
              </select>
              {errors.category && <p className="text-red-400 text-xs mt-1">{errors.category}</p>}
            </div>
          </div>

          {/* In Stock Toggle */}
          <div className="flex items-center justify-between bg-slate-800 border border-slate-700 rounded-xl px-4 py-3">
            <span className="text-sm font-medium text-slate-300">In Stock</span>
            <button
              type="button"
              onClick={() => setForm({ ...form, inStock: !form.inStock })}
              className={`relative w-12 h-6 rounded-full transition-colors duration-200 cursor-pointer ${
                form.inStock ? 'bg-emerald-500' : 'bg-slate-600'
              }`}
            >
              <span
                className={`absolute top-0.5 left-0.5 w-5 h-5 bg-white rounded-full shadow transition-transform duration-200 ${
                  form.inStock ? 'translate-x-6' : 'translate-x-0'
                }`}
              />
            </button>
          </div>

          {/* Actions */}
          <div className="flex gap-3 pt-1">
            <button
              type="button"
              onClick={onClose}
              className="flex-1 bg-slate-800 hover:bg-slate-700 border border-slate-700 text-slate-300 hover:text-white rounded-xl py-2.5 text-sm font-medium cursor-pointer"
            >
              Cancel
            </button>
            <button
              type="submit"
              className="flex-1 bg-gradient-to-r from-violet-600 to-indigo-600 hover:from-violet-500 hover:to-indigo-500 text-white rounded-xl py-2.5 text-sm font-semibold shadow-lg shadow-violet-500/25 cursor-pointer flex items-center justify-center gap-2"
            >
              {editProduct ? <><Save size={15} /> Save Changes</> : <><Plus size={15} /> Add Product</>}
            </button>
          </div>
        </form>
      </div>
    </div>
  );
}
