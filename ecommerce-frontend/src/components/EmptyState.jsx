import { motion } from "framer-motion";
import { SearchX, ShoppingCart } from "lucide-react";

export function EmptySearch({ onReset }) {
  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      className="flex flex-col items-center justify-center py-24 text-center"
    >
      <div className="w-24 h-24 rounded-3xl bg-slate-100 flex items-center justify-center mb-6">
        <SearchX size={40} className="text-slate-300" />
      </div>
      <h3 className="text-xl font-bold text-slate-700 mb-2">No products found</h3>
      <p className="text-slate-500 text-sm max-w-xs mb-6">
        We couldn't find anything matching your search. Try different keywords or clear the filters.
      </p>
      <button
        onClick={onReset}
        className="px-6 py-2.5 bg-[#0F766E] text-white text-sm font-bold rounded-xl hover:bg-[#0D6B63] transition-colors"
      >
        Clear Filters
      </button>
    </motion.div>
  );
}

export function EmptyCart() {
  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      className="flex flex-col items-center justify-center py-24 text-center"
    >
      <div className="relative w-32 h-32 mb-6">
        <div className="absolute inset-0 rounded-full bg-teal-50" />
        <div className="absolute inset-0 flex items-center justify-center">
          <ShoppingCart size={52} className="text-[#0F766E]/30" />
        </div>
        <div className="absolute -top-1 -right-1 w-8 h-8 rounded-full bg-slate-100 flex items-center justify-center text-lg">
          😢
        </div>
      </div>
      <h3 className="text-2xl font-black text-slate-800 mb-2">Your cart is empty</h3>
      <p className="text-slate-500 text-sm max-w-xs mb-8">
        Looks like you haven't added anything yet. Explore our catalog and find something you'll love!
      </p>
      <a
        href="/products"
        className="inline-flex items-center gap-2 px-8 py-3 bg-[#0F766E] text-white font-bold rounded-xl hover:bg-[#0D6B63] transition-colors shadow-lg shadow-teal-200"
      >
        <ShoppingCart size={18} />
        Start Shopping
      </a>
    </motion.div>
  );
}
