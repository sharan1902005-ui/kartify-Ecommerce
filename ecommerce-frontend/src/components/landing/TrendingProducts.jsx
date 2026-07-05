import { useEffect, useState, memo } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { useNavigate } from "react-router-dom";
import { ShoppingCart, Star, ArrowRight, TrendingUp, Heart, Zap } from "lucide-react";
import api from "../../services/api";

const TABS = ["All", "Electronics", "Home & Kitchen", "Books", "Sports", "Accessories"];

function formatPrice(p) {
  return new Intl.NumberFormat("en-IN", { maximumFractionDigits: 0 }).format(Number(p) || 0);
}
function getOriginalPrice(price) {
  const p = Number(price);
  return Math.round(p * [1.25, 1.3, 1.35, 1.4, 1.45][Math.floor(p) % 5]);
}
function getRating(id) {
  return (3.8 + (Number(id ?? 1) % 12) / 10).toFixed(1);
}

const ProductCard = memo(function ProductCard({ product, index }) {
  const navigate = useNavigate();
  const [liked, setLiked] = useState(false);
  const [imgLoaded, setImgLoaded] = useState(false);
  const original = getOriginalPrice(product.price);
  const discount = Math.round(((original - product.price) / original) * 100);
  const rating = getRating(product.id);

  return (
    <motion.div
      initial={{ opacity: 0, y: 28 }} whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true }} transition={{ duration: 0.45, delay: index * 0.06, ease: [0.16, 1, 0.3, 1] }}
      whileHover={{ y: -8, transition: { duration: 0.25 } }}
      className="group bg-white rounded-3xl overflow-hidden cursor-pointer"
      style={{ boxShadow: "0 2px 16px rgba(0,0,0,0.06)", border: "1px solid rgba(0,0,0,0.05)" }}
      onClick={() => navigate("/products")}
      onMouseEnter={(e) => { e.currentTarget.style.boxShadow = "0 20px 56px rgba(15,118,110,0.12)"; }}
      onMouseLeave={(e) => { e.currentTarget.style.boxShadow = "0 2px 16px rgba(0,0,0,0.06)"; }}
    >
      {/* Image */}
      <div className="relative h-52 flex items-center justify-center p-6 overflow-hidden"
        style={{ background: "linear-gradient(135deg, #F8FAFC 0%, #F0FDF4 100%)" }}>
        {discount > 0 && (
          <div className="absolute top-3 left-3 flex items-center gap-1 bg-red-500 text-white text-[10px] font-black px-2 py-1 rounded-xl z-10 shadow-sm">
            <Zap size={8} fill="white" /> {discount}% OFF
          </div>
        )}
        <motion.button
          whileHover={{ scale: 1.15 }} whileTap={{ scale: 0.85 }}
          onClick={(e) => { e.stopPropagation(); setLiked((l) => !l); }}
          className="absolute top-3 right-3 w-8 h-8 rounded-xl flex items-center justify-center z-10 transition-all"
          style={{
            background: liked ? "rgba(239,68,68,0.1)" : "rgba(255,255,255,0.9)",
            backdropFilter: "blur(8px)",
            boxShadow: "0 2px 8px rgba(0,0,0,0.08)",
            border: liked ? "1px solid rgba(239,68,68,0.2)" : "1px solid rgba(255,255,255,0.8)",
          }}
        >
          <Heart size={13} className={liked ? "text-red-500 fill-red-500" : "text-slate-400"} />
        </motion.button>
        {!imgLoaded && <div className="absolute inset-0 bg-slate-100 animate-pulse" />}
        <motion.img
          src={product.imageUrl} alt={product.name}
          className={`h-full w-full object-contain transition-all duration-500 group-hover:scale-110 drop-shadow-sm ${imgLoaded ? "opacity-100" : "opacity-0"}`}
          onLoad={() => setImgLoaded(true)}
          onError={(e) => { e.currentTarget.src = "data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' width='160' height='160'%3E%3Crect width='160' height='160' fill='%23f1f5f9'/%3E%3Ctext x='50%25' y='50%25' dominant-baseline='middle' text-anchor='middle' font-size='40' fill='%23cbd5e1'%3E📦%3C/text%3E%3C/svg%3E"; setImgLoaded(true); }}
          loading="lazy"
        />
      </div>

      {/* Content */}
      <div className="p-5">
        <p className="text-[10px] font-bold text-teal-600 uppercase tracking-widest mb-1.5">
          {product.category?.split(/[>|]/)[0]?.trim() || "General"}
        </p>
        <h3 className="font-bold text-slate-800 text-sm leading-snug line-clamp-2 mb-3 group-hover:text-[#0F766E] transition-colors">
          {product.name}
        </h3>

        <div className="flex items-center gap-1.5 mb-4">
          <div className="flex">
            {Array.from({ length: 5 }).map((_, i) => (
              <Star key={i} size={11} className={i < Math.round(rating) ? "text-amber-400" : "text-slate-200"} fill="currentColor" />
            ))}
          </div>
          <span className="text-xs text-slate-500 font-semibold">{rating}</span>
        </div>

        <div className="flex items-center justify-between">
          <div>
            <span className="text-lg font-black text-slate-900">₹{formatPrice(product.price)}</span>
            <span className="text-xs text-slate-400 line-through ml-2">₹{formatPrice(original)}</span>
          </div>
          <motion.button
            whileHover={{ scale: 1.1, boxShadow: "0 8px 20px rgba(15,118,110,0.4)" }}
            whileTap={{ scale: 0.95 }}
            className="w-9 h-9 rounded-xl flex items-center justify-center text-white shadow-sm"
            style={{ background: "linear-gradient(135deg, #0F766E, #14B8A6)" }}
            onClick={(e) => { e.stopPropagation(); navigate("/products"); }}
          >
            <ShoppingCart size={14} />
          </motion.button>
        </div>
      </div>
    </motion.div>
  );
});

function SkeletonCard() {
  return (
    <div className="bg-white rounded-3xl overflow-hidden animate-pulse" style={{ border: "1px solid rgba(0,0,0,0.05)" }}>
      <div className="h-52 bg-slate-100" />
      <div className="p-5 space-y-3">
        <div className="h-2.5 w-1/3 bg-slate-100 rounded-full" />
        <div className="h-4 w-3/4 bg-slate-100 rounded-lg" />
        <div className="h-3 w-1/2 bg-slate-100 rounded-lg" />
        <div className="h-5 w-1/3 bg-slate-100 rounded-lg" />
      </div>
    </div>
  );
}

export default function TrendingProducts() {
  const [products, setProducts] = useState([]);
  const [loading, setLoading]   = useState(true);
  const [activeTab, setActiveTab] = useState("All");
  const navigate = useNavigate();

  useEffect(() => {
    api.get("/products")
      .then((res) => setProducts(Array.isArray(res.data) ? res.data : []))
      .catch(() => setProducts([]))
      .finally(() => setLoading(false));
  }, []);

  const filtered = activeTab === "All"
    ? products.slice(0, 8)
    : products.filter((p) => p.category?.toLowerCase().includes(activeTab.toLowerCase())).slice(0, 8);

  return (
    <section id="trending" className="py-28 bg-white">
      <div className="max-w-7xl mx-auto px-6 lg:px-8">
        <motion.div
          initial={{ opacity: 0, y: 24 }} whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }} transition={{ duration: 0.6 }}
          className="flex flex-col md:flex-row md:items-end justify-between gap-4 mb-10"
        >
          <div>
            <div className="flex items-center gap-2 mb-3">
              <div className="w-7 h-7 rounded-lg flex items-center justify-center" style={{ background: "rgba(15,118,110,0.1)" }}>
                <TrendingUp size={15} color="#0F766E" />
              </div>
              <p className="text-sm font-bold uppercase tracking-widest text-teal-600">Trending Now</p>
            </div>
            <h2 className="text-4xl md:text-5xl font-black text-slate-900">Most popular picks</h2>
          </div>
          <motion.button
            whileHover={{ scale: 1.03 }} whileTap={{ scale: 0.97 }}
            onClick={() => navigate("/products")}
            className="flex items-center gap-2 px-6 py-3 rounded-2xl font-bold text-sm border-2 border-teal-600 text-teal-600 hover:bg-teal-600 hover:text-white transition-all shrink-0"
          >
            View All <ArrowRight size={16} />
          </motion.button>
        </motion.div>

        {/* Tabs */}
        <div className="flex gap-2 flex-wrap mb-10">
          {TABS.map((tab) => (
            <motion.button
              key={tab} whileTap={{ scale: 0.96 }}
              onClick={() => setActiveTab(tab)}
              className="px-4 py-2 rounded-xl text-sm font-semibold transition-all duration-200"
              style={activeTab === tab
                ? { background: "linear-gradient(135deg, #0F766E, #14B8A6)", color: "white", boxShadow: "0 4px 16px rgba(15,118,110,0.3)" }
                : { background: "#F1F5F9", color: "#475569" }}
            >
              {tab}
            </motion.button>
          ))}
        </div>

        <AnimatePresence mode="wait">
          <motion.div
            key={activeTab}
            initial={{ opacity: 0, y: 12 }} animate={{ opacity: 1, y: 0 }} exit={{ opacity: 0, y: -12 }}
            transition={{ duration: 0.3 }}
            className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-5"
          >
            {loading
              ? Array.from({ length: 8 }).map((_, i) => <SkeletonCard key={i} />)
              : filtered.length > 0
                ? filtered.map((p, i) => <ProductCard key={p.id} product={p} index={i} />)
                : (
                  <div className="col-span-4 text-center py-20">
                    <div className="text-4xl mb-3">🔍</div>
                    <p className="text-slate-400 font-medium">No products in this category yet.</p>
                  </div>
                )
            }
          </motion.div>
        </AnimatePresence>
      </div>
    </section>
  );
}
