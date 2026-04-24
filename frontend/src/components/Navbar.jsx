import { Package, Boxes } from 'lucide-react';

export default function Navbar({ count }) {
  return (
    <nav className="sticky top-0 z-50 bg-slate-900/80 backdrop-blur-md border-b border-slate-700/50">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-16">
          {/* Logo */}
          <div className="flex items-center gap-3">
            <div className="w-9 h-9 rounded-xl bg-gradient-to-br from-violet-500 to-indigo-600 flex items-center justify-center shadow-lg shadow-violet-500/25">
              <Boxes size={18} className="text-white" />
            </div>
            <div>
              <span className="text-white font-bold text-lg leading-none">ProductHub</span>
              <p className="text-slate-400 text-xs font-medium">MERN CRUD App</p>
            </div>
          </div>

          {/* Stats */}
          <div className="flex items-center gap-2 bg-slate-800 border border-slate-700 rounded-full px-4 py-2">
            <Package size={14} className="text-violet-400" />
            <span className="text-slate-300 text-sm font-medium">
              <span className="text-white font-bold">{count}</span> products
            </span>
          </div>
        </div>
      </div>
    </nav>
  );
}
