import { motion } from "framer-motion";
import { LayoutGrid, Cpu, Home, BookOpen, Dumbbell, Package, Sparkles } from "lucide-react";

const CATEGORY_ICONS = {
  "All Products":   LayoutGrid,
  "Electronics":    Cpu,
  "Home & Kitchen": Home,
  "Books":          BookOpen,
  "Sports":         Dumbbell,
  "Accessories":    Package,
  "Beauty":         Sparkles,
};

const CATEGORY_COLORS = {
  "All Products":   { color: "#0F766E", bg: "#F0FDF4" },
  "Electronics":    { color: "#0F766E", bg: "#F0FDF4" },
  "Home & Kitchen": { color: "#F59E0B", bg: "#FFFBEB" },
  "Books":          { color: "#6366F1", bg: "#EEF2FF" },
  "Sports":         { color: "#10B981", bg: "#ECFDF5" },
  "Accessories":    { color: "#8B5CF6", bg: "#F5F3FF" },
  "Beauty":         { color: "#EC4899", bg: "#FDF2F8" },
};

const ALL_CATEGORIES = [
  "All Products", "Electronics", "Home & Kitchen",
  "Books", "Sports", "Accessories",
];

export default function CategorySidebar({ selectedCategory, onSelectCategory, productCounts = {} }) {
  return (
    <aside className="lg:w-56 lg:shrink-0">
      <div className="sticky top-24 bg-white rounded-2xl overflow-hidden"
        style={{ boxShadow: "0 2px 16px rgba(0,0,0,0.06)", border: "1px solid rgba(0,0,0,0.06)" }}>
        <div className="px-4 py-3.5 border-b border-slate-100">
          <h2 className="text-[10px] font-black uppercase tracking-widest text-slate-400">Browse</h2>
        </div>
        <nav className="p-2">
          {ALL_CATEGORIES.map((cat, i) => {
            const Icon  = CATEGORY_ICONS[cat] || Package;
            const { color, bg } = CATEGORY_COLORS[cat] || { color: "#0F766E", bg: "#F0FDF4" };
            const active = selectedCategory === cat;
            const count  = productCounts[cat];

            return (
              <motion.button
                key={cat}
                initial={{ opacity: 0, x: -10 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ delay: i * 0.04 }}
                onClick={() => onSelectCategory(cat)}
                className={`w-full flex items-center gap-3 px-3 py-2.5 rounded-xl text-sm font-semibold transition-all duration-150 mb-0.5 ${
                  active ? "text-white" : "text-slate-600 hover:bg-slate-50 hover:text-slate-800"
                }`}
                style={active ? {
                  background: `linear-gradient(135deg, ${color}, ${color}CC)`,
                  boxShadow: `0 4px 14px ${color}30`,
                } : {}}
              >
                <div className="w-7 h-7 rounded-lg flex items-center justify-center shrink-0"
                  style={{ background: active ? "rgba(255,255,255,0.2)" : bg }}>
                  <Icon size={14} color={active ? "white" : color} />
                </div>
                <span className="flex-1 text-left text-[13px]">{cat}</span>
                {count !== undefined && (
                  <span className={`text-[10px] font-bold px-1.5 py-0.5 rounded-md ${
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
