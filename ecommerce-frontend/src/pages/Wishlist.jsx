import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { motion, AnimatePresence } from "framer-motion";
import {
  Heart, ShoppingCart, Trash2, ArrowLeft, Zap,
  Package, ShoppingBag, AlertCircle, CheckCircle2,
} from "lucide-react";
import api from "../services/api";
import { toast } from "../components/Toast";

function formatPrice(price) {
  return new Intl.NumberFormat("en-IN", { maximumFractionDigits: 0 }).format(Number(price) || 0);
}

function WishlistSkeleton() {
  return (
    <div className="flex gap-4 p-5 bg-white rounded-2xl border border-slate-100 animate-pulse">
      <div className="w-28 h-28 rounded-xl bg-slate-100 shrink-0" />
      <div className="flex-1 space-y-2.5 py-1">
        <div className="h-4 w-2/3 bg-slate-100 rounded-lg" />
        <div className="h-3 w-1/4 bg-slate-100 rounded-full" />
        <div className="h-3 w-1/3 bg-slate-100 rounded-lg" />
        <div className="h-9 w-36 bg-slate-100 rounded-xl mt-2" />
      </div>
    </div>
  );
}

function StockBadge({ stock }) {
  if (stock <= 0) return (
    <span className="inline-flex items-center gap-1 text-[10px] font-bold text-red-500 bg-red-50 px-2 py-0.5 rounded-full">
      <AlertCircle size={9} /> Out of Stock
    </span>
  );
  if (stock <= 5) return (
    <span className="inline-flex items-center gap-1 text-[10px] font-bold text-orange-500 bg-orange-50 px-2 py-0.5 rounded-full">
      <AlertCircle size={9} /> Only {stock} left
    </span>
  );
  return (
    <span className="inline-flex items-center gap-1 text-[10px] font-bold text-emerald-600 bg-emerald-50 px-2 py-0.5 rounded-full">
      <CheckCircle2 size={9} /> In Stock
    </span>
  );
}

export default function Wishlist() {
  const navigate = useNavigate();
  const [items, setItems]     = useState([]);
  const [loading, setLoading] = useState(true);
  const [adding, setAdding]   = useState(null); // productId being added to cart

  useEffect(() => {
    const token = localStorage.getItem("token");
    if (token) {
      // Logged in — fetch from API
      api.get("/wishlist")
        .then((res) => setItems(Array.isArray(res.data) ? res.data : []))
        .catch(() => toast.error("Failed to load wishlist"))
        .finally(() => setLoading(false));
    } else {
      // Guest — load from localStorage + enrich with product data
      const guestIds = JSON.parse(localStorage.getItem("guest_wishlist") || "[]");
      if (guestIds.length === 0) { setLoading(false); return; }
      api.get("/products")
        .then((res) => {
          const all = Array.isArray(res.data) ? res.data : [];
          const matched = all
            .filter((p) => guestIds.includes(p.id))
            .map((p) => ({
              wishlistId:  p.id,
              productId:   p.id,
              name:        p.name,
              description: p.description,
              price:       p.price,
              stock:       p.stock,
              imageUrl:    p.imageUrl,
              category:    p.category,
            }));
          setItems(matched);
        })
        .catch(() => toast.error("Failed to load wishlist"))
        .finally(() => setLoading(false));
    }
  }, []);

  const removeItem = async (productId) => {
    const token = localStorage.getItem("token");
    if (token) {
      try {
        await api.delete(`/wishlist/${productId}`);
      } catch {
        toast.error("Failed to remove item");
        return;
      }
    } else {
      const saved = JSON.parse(localStorage.getItem("guest_wishlist") || "[]");
      localStorage.setItem("guest_wishlist", JSON.stringify(saved.filter((id) => id !== productId)));
    }
    setItems((prev) => prev.filter((i) => i.productId !== productId));
    toast.remove("Removed from wishlist");
  };

  const addToCart = async (item) => {
    const userId = localStorage.getItem("userId") || 1;
    setAdding(item.productId);
    try {
      await api.post("/cart/add", { userId, productId: item.productId, quantity: 1 });
      toast.cart(`"${item.name.slice(0, 30)}" added to cart`);
    } catch {
      toast.error("Failed to add to cart");
    } finally {
      setAdding(null);
    }
  };

  return (
    <div className="min-h-screen bg-[#F8FAFC]">
      {/* Header */}
      <header className="sticky top-0 z-50 bg-white border-b border-slate-100 shadow-sm">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 h-16 flex items-center gap-4">
          <a href="/products" className="flex items-center gap-2 shrink-0">
            <div className="w-8 h-8 rounded-lg flex items-center justify-center"
              style={{ background: "linear-gradient(135deg, #0F766E, #14B8A6)" }}>
              <Zap size={18} className="text-white" fill="white" />
            </div>
            <span className="text-xl font-black tracking-tight"
              style={{ background: "linear-gradient(135deg, #0F766E, #0D9488)", WebkitBackgroundClip: "text", WebkitTextFillColor: "transparent" }}>
              Kartify
            </span>
          </a>
          <div className="h-5 w-px bg-slate-200" />
          <Heart size={16} className="text-rose-500" fill="currentColor" />
          <h1 className="text-base font-bold text-slate-700">My Wishlist</h1>
          {items.length > 0 && (
            <span className="text-xs font-bold px-2 py-0.5 rounded-full text-white bg-rose-500">
              {items.length}
            </span>
          )}
          <a href="/products"
            className="ml-auto hidden sm:inline-flex items-center gap-1.5 text-sm font-semibold text-slate-500 hover:text-[#0F766E] transition-colors">
            <ArrowLeft size={14} /> Continue Shopping
          </a>
        </div>
      </header>

      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        <a href="/products"
          className="sm:hidden inline-flex items-center gap-2 text-sm font-semibold text-slate-500 hover:text-[#0F766E] transition-colors mb-6">
          <ArrowLeft size={15} /> Continue Shopping
        </a>

        {loading ? (
          <div className="space-y-4">
            {[1, 2, 3].map((i) => <WishlistSkeleton key={i} />)}
          </div>
        ) : items.length === 0 ? (
          <motion.div
            initial={{ opacity: 0, y: 24 }} animate={{ opacity: 1, y: 0 }}
            className="text-center py-24"
          >
            <div className="w-20 h-20 mx-auto rounded-3xl flex items-center justify-center mb-6"
              style={{ background: "linear-gradient(135deg, rgba(239,68,68,0.08), rgba(239,68,68,0.04))", border: "1px solid rgba(239,68,68,0.12)" }}>
              <Heart size={32} className="text-rose-400" />
            </div>
            <h2 className="text-xl font-black text-slate-800 mb-2">Your wishlist is empty</h2>
            <p className="text-sm text-slate-500 mb-8 max-w-xs mx-auto leading-relaxed">
              Save items you love by tapping the heart icon on any product.
            </p>
            <motion.button
              whileHover={{ scale: 1.03, boxShadow: "0 8px 24px rgba(15,118,110,0.3)" }}
              whileTap={{ scale: 0.97 }}
              onClick={() => navigate("/products")}
              className="inline-flex items-center gap-2 px-6 py-3 text-white font-bold text-sm rounded-2xl transition-all"
              style={{ background: "linear-gradient(135deg, #0F766E, #14B8A6)" }}
            >
              <ShoppingBag size={15} /> Explore Products
            </motion.button>
          </motion.div>
        ) : (
          <div className="space-y-4">
            <p className="text-xs font-bold text-slate-400 uppercase tracking-widest mb-5">
              {items.length} {items.length === 1 ? "item" : "items"} saved
            </p>
            <AnimatePresence>
              {items.map((item, i) => (
                <motion.div
                  key={item.wishlistId}
                  initial={{ opacity: 0, y: 16 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={{ opacity: 0, x: -40, transition: { duration: 0.2 } }}
                  transition={{ delay: i * 0.04, ease: [0.16, 1, 0.3, 1] }}
                  className="flex gap-4 p-5 bg-white rounded-2xl border border-slate-100 shadow-sm hover:shadow-md transition-shadow"
                >
                  {/* Image */}
                  <div className="w-28 h-28 rounded-xl flex items-center justify-center shrink-0 overflow-hidden"
                    style={{ background: "linear-gradient(135deg, #F8FAFC, #F0FDF4)", border: "1px solid rgba(0,0,0,0.05)" }}>
                    {item.imageUrl ? (
                      <img src={item.imageUrl} alt={item.name}
                        className="w-full h-full object-contain p-2"
                        onError={(e) => { e.currentTarget.style.display = "none"; }} />
                    ) : (
                      <Package size={28} className="text-slate-300" />
                    )}
                  </div>

                  {/* Details */}
                  <div className="flex-1 min-w-0">
                    <div className="flex items-start justify-between gap-2">
                      <div className="min-w-0">
                        <span className="inline-block text-[10px] font-bold bg-teal-50 text-[#0F766E] px-2 py-0.5 rounded-full mb-1.5 uppercase tracking-wide">
                          {item.category?.split(/[>|]/)[0]?.trim() || "General"}
                        </span>
                        <h3 className="font-bold text-slate-800 text-sm leading-snug line-clamp-2">
                          {item.name}
                        </h3>
                      </div>
                      <button
                        onClick={() => removeItem(item.productId)}
                        className="shrink-0 w-8 h-8 rounded-xl flex items-center justify-center text-slate-400 hover:bg-red-50 hover:text-red-500 transition-colors"
                      >
                        <Trash2 size={14} />
                      </button>
                    </div>

                    <p className="text-lg font-black text-slate-900 mt-2">
                      ₹{formatPrice(item.price)}
                    </p>

                    <div className="mt-1 mb-3">
                      <StockBadge stock={item.stock ?? 10} />
                    </div>

                    <div className="flex items-center gap-2 flex-wrap">
                      <motion.button
                        whileTap={{ scale: 0.96 }}
                        onClick={() => addToCart(item)}
                        disabled={adding === item.productId || (item.stock ?? 10) <= 0}
                        className="flex items-center gap-2 px-4 py-2 rounded-xl text-white text-sm font-bold transition-all disabled:opacity-50"
                        style={(item.stock ?? 10) > 0 ? {
                          background: "linear-gradient(135deg, #0F766E, #14B8A6)",
                          boxShadow: "0 4px 14px rgba(15,118,110,0.25)",
                        } : { background: "#E2E8F0", color: "#94A3B8" }}
                      >
                        <ShoppingCart size={14} />
                        {adding === item.productId ? "Adding…" : (item.stock ?? 10) <= 0 ? "Out of Stock" : "Add to Cart"}
                      </motion.button>
                      <button
                        onClick={() => removeItem(item.productId)}
                        className="flex items-center gap-1.5 px-3 py-2 rounded-xl text-xs font-semibold text-rose-500 hover:bg-rose-50 border border-rose-100 transition-colors"
                      >
                        <Heart size={12} fill="currentColor" /> Remove
                      </button>
                    </div>
                  </div>
                </motion.div>
              ))}
            </AnimatePresence>
          </div>
        )}
      </div>
    </div>
  );
}
