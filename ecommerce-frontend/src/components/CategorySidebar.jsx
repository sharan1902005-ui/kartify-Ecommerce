import { motion } from "framer-motion";
import {
  LayoutGrid, Cpu, Shirt, Home, Sparkles,
  BookOpen, Dumbbell, Package, ShoppingBasket,
} from "lucide-react";

const CATEGORY_ICONS = {
  "All Products":    LayoutGrid,
  "Electronics":     Cpu,
  "Fashion":         Shirt,
  "Home & Kitchen":  Home,
  "Beauty":          Sparkles,
  "Books":           BookOpen,
  "Sports":          Dumbbell,
  "Accessories":     Package,
  "Groceries":       ShoppingBasket,
};

const ALL_CATEGORIES = [
  "All Products", "Electronics", "Fashion", "Home & Kitchen",
  "Beauty", "Books", "Sports", "Accessories", "Groceries",
];

export default function CategorySidebar({ selectedCategory, onSelectCategory, productCounts = {} }) {
  return (
    <aside className="lg:w-60 lg:shrink-0">
      <div className="sticky top-24 bg-white rounded-2xl border border-slate-100 shadow-sm overflow-hidden">
        <div className="px-4 py-3 border-b border-slate-100">
          <h2 className="text-xs font-bold uppercase tracking-widest text-slate-400">Browse</h2>
        </div>
        <nav className="p-2">
          {ALL_CATEGORIES.map((cat, i) => {
            const Icon = CATEGORY_ICONS[cat] || Package;
            const active = selectedCategory === cat;
            const count = productCounts[cat];
            return (
              <motion.button
                key={cat}
                initial={{ opacity: 0, x: -10 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ delay: i * 0.04 }}
                onClick={() => onSelectCategory(cat)}
                className={`w-full flex items-center gap-3 px-3 py-2.5 rounded-xl text-sm font-medium transition-all duration-150 mb-0.5 ${
                  active
                    ? "bg-[#0F766E] text-white shadow-md shadow-teal-200"
                    : "text-slate-600 hover:bg-slate-50 hover:text-[#0F766E]"
                }`}
              >
                <Icon size={16} className={active ? "text-white" : "text-slate-400"} />
                <span className="flex-1 text-left">{cat}</span>
                {count !== undefined && (
                  <span className={`text-xs font-semibold px-1.5 py-0.5 rounded-md ${
                    active ? "bg-white/20 text-white" : "bg-slate-100 text-slate-500"
                  }`}>
                    {count}
                  </span>
                )}
              </motion.button>
            );
          })}
        </nav>
      </div>
    </aside>
  );
}
