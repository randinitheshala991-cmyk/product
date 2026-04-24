import { useState, useEffect } from 'react';
import toast, { Toaster } from 'react-hot-toast';
import { Plus, Search, Loader2, PackageX } from 'lucide-react';

import Navbar from './components/Navbar';
import ProductCard from './components/ProductCard';
import ProductModal from './components/ProductModal';
import { getProducts, createProduct, updateProduct, deleteProduct } from './services/api';

export default function App() {
  const [products, setProducts] = useState([]);
  const [loading, setLoading] = useState(true);
  const [modalOpen, setModalOpen] = useState(false);
  const [editProduct, setEditProduct] = useState(null);
  const [search, setSearch] = useState('');
  const [filterCategory, setFilterCategory] = useState('All');
  const [filterStock, setFilterStock] = useState('All');

  // Fetch all products
  const fetchProducts = async () => {
    try {
      setLoading(true);
      const res = await getProducts();
      setProducts(res.data.data);
    } catch (err) {
      toast.error('Failed to fetch products');
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchProducts();
  }, []);

  // Filtered list
  const filtered = products.filter((p) => {
    const matchSearch =
      p.name.toLowerCase().includes(search.toLowerCase()) ||
      p.description.toLowerCase().includes(search.toLowerCase());
    const matchCat = filterCategory === 'All' || p.category === filterCategory;
    const matchStock =
      filterStock === 'All' ||
      (filterStock === 'In Stock' && p.inStock) ||
      (filterStock === 'Out of Stock' && !p.inStock);
    return matchSearch && matchCat && matchStock;
  });

  // Unique categories
  const categories = ['All', ...new Set(products.map((p) => p.category))];

  // Handlers
  const handleOpenCreate = () => {
    setEditProduct(null);
    setModalOpen(true);
  };

  const handleOpenEdit = (product) => {
    setEditProduct(product);
    setModalOpen(true);
  };

  const handleSubmit = async (formData) => {
    try {
      if (editProduct) {
        await updateProduct(editProduct._id, formData);
        toast.success('Product updated!');
      } else {
        await createProduct(formData);
        toast.success('Product created!');
      }
      setModalOpen(false);
      fetchProducts();
    } catch (err) {
      toast.error(err?.response?.data?.message || 'Something went wrong');
    }
  };

  const handleDelete = async (id) => {
    if (!window.confirm('Are you sure you want to delete this product?')) return;
    try {
      await deleteProduct(id);
      toast.success('Product deleted');
      fetchProducts();
    } catch (err) {
      toast.error('Failed to delete product');
    }
  };

  return (
    <div className="min-h-screen bg-slate-950">
      <Toaster
        position="top-right"
        toastOptions={{
          style: {
            background: '#1e293b',
            color: '#e2e8f0',
            border: '1px solid #334155',
            borderRadius: '12px',
            fontSize: '14px',
          },
        }}
      />

      <Navbar count={products.length} />

      <main className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-10">
        {/* Hero */}
        <div className="mb-10">
          <h1 className="text-4xl font-bold text-white mb-2">
            Product{' '}
            <span className="bg-gradient-to-r from-violet-400 to-indigo-400 bg-clip-text text-transparent">
              Inventory
            </span>
          </h1>
          <p className="text-slate-400 text-base">
            Manage your products with full Create, Read, Update & Delete capabilities.
          </p>
        </div>

        {/* Controls */}
        <div className="flex flex-col sm:flex-row gap-3 mb-8">
          {/* Search */}
          <div className="relative flex-1">
            <Search size={16} className="absolute left-3.5 top-1/2 -translate-y-1/2 text-slate-500" />
            <input
              type="text"
              value={search}
              onChange={(e) => setSearch(e.target.value)}
              placeholder="Search products..."
              className="w-full bg-slate-800 border border-slate-700 rounded-xl pl-10 pr-4 py-2.5 text-white placeholder-slate-500 text-sm outline-none focus:border-violet-500 focus:ring-2 focus:ring-violet-500/20"
            />
          </div>

          {/* Category filter */}
          <select
            value={filterCategory}
            onChange={(e) => setFilterCategory(e.target.value)}
            className="bg-slate-800 border border-slate-700 rounded-xl px-4 py-2.5 text-slate-300 text-sm outline-none focus:border-violet-500 cursor-pointer min-w-[140px]"
          >
            {categories.map((c) => (
              <option key={c} value={c} className="bg-slate-800">{c}</option>
            ))}
          </select>

          {/* Stock filter */}
          <select
            value={filterStock}
            onChange={(e) => setFilterStock(e.target.value)}
            className="bg-slate-800 border border-slate-700 rounded-xl px-4 py-2.5 text-slate-300 text-sm outline-none focus:border-violet-500 cursor-pointer min-w-[140px]"
          >
            <option className="bg-slate-800">All</option>
            <option className="bg-slate-800">In Stock</option>
            <option className="bg-slate-800">Out of Stock</option>
          </select>

          {/* Add button */}
          <button
            onClick={handleOpenCreate}
            className="flex items-center gap-2 bg-gradient-to-r from-violet-600 to-indigo-600 hover:from-violet-500 hover:to-indigo-500 text-white rounded-xl px-5 py-2.5 text-sm font-semibold shadow-lg shadow-violet-500/25 cursor-pointer whitespace-nowrap"
          >
            <Plus size={16} />
            Add Product
          </button>
        </div>

        {/* Stats strip */}
        <div className="flex gap-4 mb-6">
          {[
            { label: 'Total', value: products.length, color: 'text-violet-400' },
            { label: 'In Stock', value: products.filter((p) => p.inStock).length, color: 'text-emerald-400' },
            { label: 'Out of Stock', value: products.filter((p) => !p.inStock).length, color: 'text-red-400' },
            { label: 'Showing', value: filtered.length, color: 'text-slate-300' },
          ].map((stat) => (
            <div key={stat.label} className="bg-slate-800/50 border border-slate-700/50 rounded-xl px-4 py-3">
              <p className="text-slate-500 text-xs font-medium uppercase tracking-wide">{stat.label}</p>
              <p className={`text-xl font-bold ${stat.color}`}>{stat.value}</p>
            </div>
          ))}
        </div>

        {/* Grid / States */}
        {loading ? (
          <div className="flex flex-col items-center justify-center py-24 gap-4">
            <Loader2 size={36} className="text-violet-500 animate-spin" />
            <p className="text-slate-400 font-medium">Loading products...</p>
          </div>
        ) : filtered.length === 0 ? (
          <div className="flex flex-col items-center justify-center py-24 gap-4">
            <div className="w-16 h-16 rounded-2xl bg-slate-800 border border-slate-700 flex items-center justify-center">
              <PackageX size={28} className="text-slate-500" />
            </div>
            <div className="text-center">
              <p className="text-white font-semibold text-lg">No products found</p>
              <p className="text-slate-500 text-sm mt-1">
                {search || filterCategory !== 'All' || filterStock !== 'All'
                  ? 'Try adjusting your filters'
                  : 'Add your first product to get started'}
              </p>
            </div>
            {!search && filterCategory === 'All' && filterStock === 'All' && (
              <button
                onClick={handleOpenCreate}
                className="flex items-center gap-2 bg-gradient-to-r from-violet-600 to-indigo-600 text-white rounded-xl px-5 py-2.5 text-sm font-semibold cursor-pointer"
              >
                <Plus size={16} /> Add First Product
              </button>
            )}
          </div>
        ) : (
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-4">
            {filtered.map((product) => (
              <ProductCard
                key={product._id}
                product={product}
                onEdit={handleOpenEdit}
                onDelete={handleDelete}
              />
            ))}
          </div>
        )}
      </main>

      <ProductModal
        isOpen={modalOpen}
        onClose={() => setModalOpen(false)}
        onSubmit={handleSubmit}
        editProduct={editProduct}
      />
    </div>
  );
}
