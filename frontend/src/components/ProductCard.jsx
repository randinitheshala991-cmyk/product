import { Pencil, Trash2, Tag, CheckCircle2, XCircle } from 'lucide-react';

const CATEGORY_COLORS = {
  Electronics: 'bg-blue-500/20 text-blue-400 border-blue-500/30',
  Clothing: 'bg-pink-500/20 text-pink-400 border-pink-500/30',
  'Food & Beverages': 'bg-amber-500/20 text-amber-400 border-amber-500/30',
  Books: 'bg-emerald-500/20 text-emerald-400 border-emerald-500/30',
  Sports: 'bg-orange-500/20 text-orange-400 border-orange-500/30',
  'Home & Garden': 'bg-green-500/20 text-green-400 border-green-500/30',
  Toys: 'bg-purple-500/20 text-purple-400 border-purple-500/30',
  Other: 'bg-slate-500/20 text-slate-400 border-slate-500/30',
};

export default function ProductCard({ product, onEdit, onDelete }) {
  const categoryStyle = CATEGORY_COLORS[product.category] || CATEGORY_COLORS.Other;

  return (
    <div className="group bg-slate-800/60 border border-slate-700/50 rounded-2xl p-5 hover:border-violet-500/40 hover:bg-slate-800/80 hover:shadow-lg hover:shadow-violet-500/10 hover:-translate-y-0.5">
      {/* Top row */}
      <div className="flex items-start justify-between gap-3 mb-3">
        <h3 className="text-white font-semibold text-base leading-snug line-clamp-1 flex-1">
          {product.name}
        </h3>
        <span className={`shrink-0 text-xs font-medium px-2.5 py-1 rounded-full border ${categoryStyle}`}>
          {product.category}
        </span>
      </div>

      {/* Description */}
      <p className="text-slate-400 text-sm leading-relaxed line-clamp-2 mb-4">
        {product.description}
      </p>

      {/* Price + Stock */}
      <div className="flex items-center justify-between mb-4">
        <div>
          <p className="text-slate-500 text-xs font-medium uppercase tracking-wide mb-0.5">Price</p>
          <p className="text-white font-bold text-xl">
            ${product.price.toFixed(2)}
          </p>
        </div>
        <div className="flex items-center gap-1.5">
          {product.inStock ? (
            <>
              <CheckCircle2 size={14} className="text-emerald-400" />
              <span className="text-emerald-400 text-sm font-medium">In Stock</span>
            </>
          ) : (
            <>
              <XCircle size={14} className="text-red-400" />
              <span className="text-red-400 text-sm font-medium">Out of Stock</span>
            </>
          )}
        </div>
      </div>

      {/* Divider */}
      <div className="border-t border-slate-700/50 pt-4 flex items-center justify-between">
        <p className="text-slate-600 text-xs">
          {new Date(product.createdAt).toLocaleDateString('en-US', {
            month: 'short', day: 'numeric', year: 'numeric'
          })}
        </p>
        <div className="flex items-center gap-2">
          <button
            onClick={() => onEdit(product)}
            className="flex items-center gap-1.5 px-3 py-1.5 rounded-lg bg-slate-700 hover:bg-violet-600 text-slate-300 hover:text-white text-xs font-medium cursor-pointer"
          >
            <Pencil size={12} />
            Edit
          </button>
          <button
            onClick={() => onDelete(product._id)}
            className="flex items-center gap-1.5 px-3 py-1.5 rounded-lg bg-slate-700 hover:bg-red-600 text-slate-300 hover:text-white text-xs font-medium cursor-pointer"
          >
            <Trash2 size={12} />
            Delete
          </button>
        </div>
      </div>
    </div>
  );
}
