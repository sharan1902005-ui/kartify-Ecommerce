import { useState, memo, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Heart, ShoppingCart, Star, Eye, X, Zap, CheckCircle2, AlertCircle, Package } from "lucide-react";
import api from "../services/api";
import { toast } from "./Toast";

const BRANDS = ["Samsung", "Apple", "Sony", "LG", "Philips", "Bosch", "Nike", "Adidas", "Penguin", "Prestige"];

function getFakeRating(product) {
  const seed = Number(product.id ?? String(product.name).length);
  return 3.8 + (seed % 12) / 10;
}
function getFakeOriginalPrice(price) {
  const p = Number(price);
  return Math.round(p * [1.25, 1.3, 1.35, 1.4, 1.45, 1.5][Math.floor(p) % 6]);
}
function getDiscount(original, current) {
  return Math.round(((original - current) / original) * 100);
}
function formatPrice(price) {
  return new Intl.NumberFormat("en-IN", { maximumFractionDigits: 0 }).format(Number(price) || 0);
}
function getFakeBrand(product) {
  const seed = Number(product.id ?? 1);
  return BRANDS[seed % BRANDS.length];
}

const PLACEHOLDER = "data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' width='200' height='200'%3E%3Crect width='200' height='200' fill='%23f1f5f9'/%3E%3Ctext x='50%25' y='50%25' dominant-baseline='middle' text-anchor='middle' font-size='48' fill='%23cbd5e1'%3E📦%3C/text%3E%3C/svg%3E";

function StarRating({ rating, size = 11 }) {
  return (
    <div className="flex items-center gap-0.5">
      {Array.from({ length: 5 }).map((_, i) => (
        <Star key={i} size={size}
          className={i < Math.floor(rating) ? "text-amber-400" : i < rating ? "text-amber-300" : "text-slate-200"}
          fill="currentColor" />
      ))}
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

function QuickViewModal({ product, onClose, onAddToCart }) {
  const rating        = getFakeRating(product);
  const currentPrice  = Number(product.price);
  const originalPrice = getFakeOriginalPrice(currentPrice);
  const discount      = getDiscount(originalPrice, currentPrice);
  const stock         = Number(product.stock ?? 10);
  const brand         = getFakeBrand(product);
  const [adding, setAdding] = useState(false);

  const handleAdd = async () => {
    setAdding(true);
    await onAddToCart(product);
    setAdding(false);
    onClose();
  };

  return (
    <motion.div
      initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }}
      className="fixed inset-0 z-[200] flex items-center justify-center p-4"
      style={{ background: "rgba(0,0,0,0.6)", backdropFilter: "blur(8px)" }}
      onClick={onClose}
    >
      <motion.div
        initial={{ opacity: 0, scale: 0.9, y: 24 }}
        animate={{ opacity: 1, scale: 1, y: 0 }}
        exit={{ opacity: 0, scale: 0.9, y: 24 }}
        transition={{ type: "spring", stiffness: 320, damping: 28 }}
        className="bg-white rounded-3xl shadow-2xl w-full max-w-2xl overflow-hidden"
        onClick={(e) => e.stopPropagation()}
      >
        <div className="grid sm:grid-cols-2">
          {/* Image */}
          <div className="relative flex items-center justify-center p-10 min-h-72"
            style={{ background: "linear-gradient(135deg, #F8FAFC 0%, #F0FDF4 100%)" }}>
            {discount > 0 && (
              <div className="absolute top-4 left-4 flex items-center gap-1 bg-red-500 text-white text-xs font-black px-2.5 py-1 rounded-xl shadow-lg">
                <Zap size={10} fill="white" /> {discount}% OFF
              </div>
            )}
            <img src={product.imageUrl} alt={product.name}
              className="max-h-52 w-full object-contain drop-shadow-lg"
              onError={(e) => { e.currentTarget.src = PLACEHOLDER; }} />
          </div>

          {/* Details */}
          <div className="p-7 flex flex-col">
            <div className="flex items-start justify-between mb-4">
              <span className="inline-flex items-center gap-1 bg-teal-50 text-[#0F766E] text-[11px] font-bold px-2.5 py-1 rounded-full">
                <Zap size={9} fill="currentColor" />
                {product.category?.split(/[>|]/)[0]?.trim() || "General"}
              </span>
              <button onClick={onClose}
                className="w-8 h-8 rounded-xl bg-slate-100 flex items-center justify-center hover:bg-slate-200 transition-colors">
                <X size={14} />
              </button>
            </div>

            <h2 className="font-black text-slate-900 text-xl leading-snug mb-1">{product.name}</h2>
            <p className="text-xs font-bold text-slate-400 uppercase tracking-wider mb-3">{brand}</p>

            <div className="flex items-center gap-2 mb-4">
              <StarRating rating={rating} size={13} />
              <span className="text-xs font-bold text-slate-600">{rating.toFixed(1)}</span>
              <span className="text-xs text-slate-400">({Math.floor(rating * 120 + 40)} reviews)</span>
            </div>

            <p className="text-sm text-slate-500 leading-relaxed mb-5 line-clamp-3">
              {product.description || "Premium quality product available exclusively on Kartify. Crafted for performance and built to last."}
            </p>

            <div className="flex items-baseline gap-2.5 mb-3">
              <span className="text-3xl font-black text-slate-900">₹{formatPrice(currentPrice)}</span>
              <span className="text-sm text-slate-400 line-through">₹{formatPrice(originalPrice)}</span>
              {discount > 0 && (
                <span className="text-sm font-bold text-emerald-600 bg-emerald-50 px-2 py-0.5 rounded-lg">
                  Save {discount}%
                </span>
              )}
            </div>

            <div className="mb-5"><StockBadge stock={stock} /></div>

            <motion.button
              whileTap={{ scale: 0.97 }}
              onClick={handleAdd}
              disabled={adding || stock <= 0}
              className="w-full flex items-center justify-center gap-2 py-3.5 rounded-2xl text-white font-bold text-sm disabled:opacity-50 transition-all"
              style={{ background: stock > 0 ? "linear-gradient(135deg, #0F766E, #14B8A6)" : "#CBD5E1", boxShadow: stock > 0 ? "0 8px 24px rgba(15,118,110,0.3)" : "none" }}
            >
              <ShoppingCart size={16} />
              {adding ? "Adding to Cart…" : stock <= 0 ? "Out of Stock" : "Add to Cart"}
            </motion.button>
          </div>
        </div>
      </motion.div>
    </motion.div>
  );
}

const ProductCard = memo(function ProductCard({ product, onAddToCart, index = 0, initialWishlisted = false }) {
  const [wishlisted, setWishlisted] = useState(initialWishlisted);
  const [wishlistLoading, setWishlistLoading] = useState(false);
  const [adding, setAdding]         = useState(false);
  const [quickView, setQuickView]   = useState(false);
  const [imgLoaded, setImgLoaded]   = useState(false);

  useEffect(() => { setWishlisted(initialWishlisted); }, [initialWishlisted]);

  const rating        = getFakeRating(product);
  const currentPrice  = Number(product.price);
  const originalPrice = getFakeOriginalPrice(currentPrice);
  const discount      = getDiscount(originalPrice, currentPrice);
  const stock         = Number(product.stock ?? 10);
  const brand         = getFakeBrand(product);

  const handleAddToCart = async () => {
    setAdding(true);
    await onAddToCart(product);
    setAdding(false);
  };

  const handleWishlist = async (e) => {
    e.stopPropagation();
    const token = localStorage.getItem("token");

    // ── Guest: use localStorage ──────────────────────────────────────────
    if (!token) {
      const saved = JSON.parse(localStorage.getItem("guest_wishlist") || "[]");
      if (wishlisted) {
        const updated = saved.filter((id) => id !== product.id);
        localStorage.setItem("guest_wishlist", JSON.stringify(updated));
        setWishlisted(false);
        toast.remove("Removed from wishlist");
      } else {
        saved.push(product.id);
        localStorage.setItem("guest_wishlist", JSON.stringify(saved));
        setWishlisted(true);
        toast.success("Added to wishlist ❤️");
      }
      return;
    }

    // ── Logged in: use API ───────────────────────────────────────────────
    setWishlistLoading(true);
    try {
      if (wishlisted) {
        await api.delete(`/wishlist/${product.id}`);
        setWishlisted(false);
        toast.remove("Removed from wishlist");
      } else {
        await api.post(`/wishlist/${product.id}`);
        setWishlisted(true);
        toast.success("Added to wishlist ❤️");
      }
    } catch (err) {
      console.error("Wishlist error:", err?.response?.status, err?.message);
      toast.error("Something went wrong. Try again.");
    } finally {
      setWishlistLoading(false);
    }
  };

  return (
    <>
      <motion.article
        initial={{ opacity: 0, y: 28 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.4, delay: index * 0.05, ease: [0.16, 1, 0.3, 1] }}
        whileHover={{ y: -8, transition: { duration: 0.25, ease: [0.16, 1, 0.3, 1] } }}
        className="group flex flex-col bg-white rounded-3xl overflow-hidden cursor-pointer"
        style={{
          minHeight: "480px",
          boxShadow: "0 1px 3px rgba(0,0,0,0.06), 0 4px 16px rgba(0,0,0,0.04)",
          border: "1px solid rgba(0,0,0,0.06)",
          transition: "box-shadow 0.3s ease",
        }}
        onMouseEnter={(e) => { e.currentTarget.style.boxShadow = "0 20px 60px rgba(15,118,110,0.12), 0 4px 16px rgba(0,0,0,0.06)"; }}
        onMouseLeave={(e) => { e.currentTarget.style.boxShadow = "0 1px 3px rgba(0,0,0,0.06), 0 4px 16px rgba(0,0,0,0.04)"; }}
      >
        {/* Image area */}
        <div className="relative overflow-hidden" style={{ background: "linear-gradient(135deg, #F8FAFC 0%, #F0FDF4 60%, #F8FAFC 100%)" }}>
          {/* Badges */}
          <div className="absolute top-3 left-3 z-10 flex flex-col gap-1.5">
            {discount > 0 && (
              <span className="flex items-center gap-1 bg-red-500 text-white text-[10px] font-black px-2 py-1 rounded-xl shadow-sm">
                <Zap size={8} fill="white" /> {discount}% OFF
              </span>
            )}
            {stock <= 5 && stock > 0 && (
              <span className="bg-orange-500 text-white text-[10px] font-black px-2 py-1 rounded-xl shadow-sm">
                Almost Gone
              </span>
            )}
          </div>

          {/* Wishlist */}
          <motion.button
            whileHover={{ scale: 1.15 }} whileTap={{ scale: 0.85 }}
            onClick={handleWishlist}
            disabled={wishlistLoading}
            className="absolute top-3 right-3 z-10 w-9 h-9 rounded-2xl flex items-center justify-center transition-all duration-200 disabled:opacity-60"
            style={{
              background: wishlisted ? "rgba(239,68,68,0.1)" : "rgba(255,255,255,0.9)",
              backdropFilter: "blur(8px)",
              boxShadow: "0 2px 12px rgba(0,0,0,0.1)",
              border: wishlisted ? "1px solid rgba(239,68,68,0.2)" : "1px solid rgba(255,255,255,0.8)",
            }}
          >
            <Heart size={14} className={wishlisted ? "text-red-500" : "text-slate-400"} fill={wishlisted ? "currentColor" : "none"} />
          </motion.button>

          {/* Image */}
          <div className="h-56 flex items-center justify-center p-6 overflow-hidden">
            {!imgLoaded && (
              <div className="absolute inset-0 flex items-center justify-center">
                <Package size={40} className="text-slate-200 animate-pulse" />
              </div>
            )}
            <motion.img
              src={product.imageUrl}
              alt={product.name}
              onLoad={() => setImgLoaded(true)}
              onError={(e) => { e.currentTarget.src = PLACEHOLDER; setImgLoaded(true); }}
              className={`h-full w-full object-contain transition-all duration-500 group-hover:scale-110 drop-shadow-sm ${imgLoaded ? "opacity-100" : "opacity-0"}`}
              loading="lazy"
            />
          </div>

          {/* Quick View overlay */}
          <div className="absolute inset-0 bg-gradient-to-t from-black/20 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300 flex items-end justify-center pb-4">
            <motion.button
              initial={{ y: 8, opacity: 0 }}
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.97 }}
              onClick={(e) => { e.stopPropagation(); setQuickView(true); }}
              className="flex items-center gap-2 px-4 py-2 rounded-xl text-slate-800 text-xs font-bold shadow-xl translate-y-2 group-hover:translate-y-0 transition-transform duration-300"
              style={{ background: "rgba(255,255,255,0.95)", backdropFilter: "blur(12px)" }}
            >
              <Eye size={12} /> Quick View
            </motion.button>
          </div>
        </div>

        {/* Content */}
        <div className="flex flex-col flex-1 p-4 pt-3.5">
          {/* Category */}
          <span className="inline-flex self-start items-center gap-1 bg-teal-50 text-[#0F766E] text-[10px] font-bold px-2.5 py-1 rounded-full mb-2.5 uppercase tracking-wide">
            {product.category?.split(/[>|]/)[0]?.trim() || "General"}
          </span>

          {/* Name */}
          <h3 className="font-bold text-[15px] text-slate-800 leading-snug line-clamp-2 mb-1 group-hover:text-[#0F766E] transition-colors duration-200">
            {product.name}
          </h3>

          {/* Brand */}
          <p className="text-[11px] font-semibold text-slate-400 uppercase tracking-wider mb-2.5">{brand}</p>

          {/* Rating */}
          <div className="flex items-center gap-1.5 mb-3">
            <StarRating rating={rating} />
            <span className="text-[11px] font-bold text-slate-600">{rating.toFixed(1)}</span>
            <span className="text-[11px] text-slate-400">({Math.floor(rating * 120 + 40)})</span>
          </div>

          <div className="mt-auto">
            {/* Price */}
            <div className="flex items-baseline gap-2 mb-2">
              <span className="text-xl font-black text-slate-900">₹{formatPrice(currentPrice)}</span>
              <span className="text-xs text-slate-400 line-through">₹{formatPrice(originalPrice)}</span>
              {discount > 0 && (
                <span className="text-[10px] font-bold text-emerald-600">-{discount}%</span>
              )}
            </div>

            {/* Stock */}
            <div className="mb-3"><StockBadge stock={stock} /></div>

            {/* Buttons */}
            <div className="flex gap-2">
              <motion.button
                whileTap={{ scale: 0.96 }}
                onClick={handleAddToCart}
                disabled={adding || stock <= 0}
                className="flex-1 flex items-center justify-center gap-2 text-white text-sm font-bold py-2.5 rounded-2xl transition-all duration-200 disabled:opacity-50"
                style={stock > 0 ? {
                  background: "linear-gradient(135deg, #0F766E, #14B8A6)",
                  boxShadow: "0 4px 14px rgba(15,118,110,0.25)",
                } : { background: "#E2E8F0", color: "#94A3B8" }}
              >
                <ShoppingCart size={14} />
                {adding ? "Adding…" : "Add to Cart"}
              </motion.button>
              <motion.button
                whileTap={{ scale: 0.96 }}
                onClick={() => setQuickView(true)}
                className="w-10 h-10 flex items-center justify-center rounded-2xl border border-slate-200 hover:border-[#0F766E]/40 hover:bg-teal-50 text-slate-400 hover:text-[#0F766E] transition-all duration-200"
              >
                <Eye size={14} />
              </motion.button>
            </div>
          </div>
        </div>
      </motion.article>

      <AnimatePresence>
        {quickView && (
          <QuickViewModal product={product} onClose={() => setQuickView(false)} onAddToCart={onAddToCart} />
        )}
      </AnimatePresence>
    </>
  );
});

export default ProductCard;
