import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Heart, ShoppingCart, Star, Eye, X, Zap, CheckCircle2, AlertCircle } from "lucide-react";

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

function QuickViewModal({ product, onClose, onAddToCart }) {
  const rating       = getFakeRating(product);
  const currentPrice = Number(product.price);
  const originalPrice = getFakeOriginalPrice(currentPrice);
  const discount     = getDiscount(originalPrice, currentPrice);
  const stock        = Number(product.stock ?? 10);
  const brand        = getFakeBrand(product);
  const [adding, setAdding] = useState(false);

  const handleAdd = async () => {
    setAdding(true);
    await onAddToCart(product);
    setAdding(false);
    onClose();
  };

  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      className="fixed inset-0 z-[200] flex items-center justify-center p-4"
      style={{ background: "rgba(0,0,0,0.5)", backdropFilter: "blur(4px)" }}
      onClick={onClose}
    >
      <motion.div
        initial={{ opacity: 0, scale: 0.92, y: 20 }}
        animate={{ opacity: 1, scale: 1, y: 0 }}
        exit={{ opacity: 0, scale: 0.92, y: 20 }}
        transition={{ type: "spring", stiffness: 300, damping: 25 }}
        className="bg-white rounded-3xl shadow-2xl w-full max-w-2xl overflow-hidden"
        onClick={(e) => e.stopPropagation()}
      >
        <div className="grid sm:grid-cols-2">
          {/* Image */}
          <div className="relative bg-gradient-to-br from-slate-50 to-teal-50/30 flex items-center justify-center p-10 min-h-64">
            {discount > 0 && (
              <div className="absolute top-4 left-4 bg-red-500 text-white text-xs font-black px-2.5 py-1 rounded-lg">
                {discount}% OFF
              </div>
            )}
            <img
              src={product.imageUrl}
              alt={product.name}
              className="max-h-52 w-full object-contain"
              onError={(e) => {
                e.currentTarget.src = "data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' width='160' height='160'%3E%3Crect width='160' height='160' fill='%23f1f5f9'/%3E%3Ctext x='50%25' y='50%25' dominant-baseline='middle' text-anchor='middle' font-size='40' fill='%23cbd5e1'%3E📦%3C/text%3E%3C/svg%3E";
              }}
            />
          </div>

          {/* Details */}
          <div className="p-7 flex flex-col">
            <button onClick={onClose} className="self-end w-8 h-8 rounded-xl bg-slate-100 flex items-center justify-center hover:bg-slate-200 transition-colors mb-4">
              <X size={15} />
            </button>

            <span className="inline-flex items-center gap-1 bg-teal-50 text-[#0F766E] text-[11px] font-bold px-2.5 py-1 rounded-full mb-2 self-start">
              <Zap size={10} fill="currentColor" />
              {product.category?.split(/[>|]/)[0]?.trim() || "General"}
            </span>

            <h2 className="font-black text-slate-900 text-lg leading-snug mb-1">{product.name}</h2>
            <p className="text-xs font-semibold text-slate-400 mb-3">{brand}</p>

            <div className="flex items-center gap-1.5 mb-4">
              <div className="flex">
                {Array.from({ length: 5 }).map((_, i) => (
                  <Star key={i} size={13} className={i < Math.round(rating) ? "text-amber-400" : "text-slate-200"} fill="currentColor" />
                ))}
              </div>
              <span className="text-xs font-semibold text-slate-500">{rating.toFixed(1)}</span>
              <span className="text-xs text-slate-400">({Math.floor(rating * 120 + 40)})</span>
            </div>

            <p className="text-sm text-slate-500 leading-relaxed mb-5 line-clamp-3">
              {product.description || "Premium quality product available exclusively on Kartify."}
            </p>

            <div className="flex items-baseline gap-2 mb-2">
              <span className="text-2xl font-black text-slate-900">₹{formatPrice(currentPrice)}</span>
              <span className="text-sm text-slate-400 line-through">₹{formatPrice(originalPrice)}</span>
              {discount > 0 && <span className="text-sm font-bold text-green-600">Save {discount}%</span>}
            </div>

            <p className={`text-xs font-semibold mb-5 flex items-center gap-1 ${stock <= 0 ? "text-red-500" : stock <= 5 ? "text-orange-500" : "text-green-600"}`}>
              {stock <= 0 ? <><AlertCircle size={12} /> Out of Stock</> : stock <= 5 ? <><AlertCircle size={12} /> Only {stock} left!</> : <><CheckCircle2 size={12} /> In Stock</>}
            </p>

            <motion.button
              whileTap={{ scale: 0.97 }}
              onClick={handleAdd}
              disabled={adding || stock <= 0}
              className="w-full flex items-center justify-center gap-2 py-3 rounded-2xl text-white font-bold text-sm disabled:bg-slate-300 transition-colors"
              style={{ background: "linear-gradient(135deg, #0F766E, #14B8A6)" }}
            >
              <ShoppingCart size={16} />
              {adding ? "Adding…" : "Add to Cart"}
            </motion.button>
          </div>
        </div>
      </motion.div>
    </motion.div>
  );
}

export default function ProductCard({ product, onAddToCart, index = 0 }) {
  const [wishlisted, setWishlisted] = useState(false);
  const [adding, setAdding]         = useState(false);
  const [quickView, setQuickView]   = useState(false);

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

  return (
    <>
      <motion.article
        initial={{ opacity: 0, y: 24 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.35, delay: index * 0.05 }}
        whileHover={{ y: -6, transition: { duration: 0.2 } }}
        className="group flex flex-col bg-white rounded-2xl border border-slate-100 shadow-sm hover:shadow-xl hover:shadow-slate-200/60 transition-shadow duration-300 overflow-hidden"
        style={{ minHeight: "520px" }}
      >
        {/* Image area */}
        <div className="relative bg-gradient-to-br from-slate-50 to-teal-50/20 border-b border-slate-100">
          {discount > 0 && (
            <div className="absolute top-3 left-3 z-10 bg-red-500 text-white text-[11px] font-black px-2 py-1 rounded-lg">
              {discount}% OFF
            </div>
          )}

          {/* Wishlist */}
          <motion.button
            whileHover={{ scale: 1.15 }}
            whileTap={{ scale: 0.9 }}
            onClick={() => setWishlisted((v) => !v)}
            className="absolute top-3 right-3 z-10 w-8 h-8 rounded-full bg-white shadow-md flex items-center justify-center"
          >
            <Heart
              size={14}
              className={wishlisted ? "text-red-500" : "text-slate-400"}
              fill={wishlisted ? "currentColor" : "none"}
            />
          </motion.button>

          {/* Image */}
          <div className="h-56 flex items-center justify-center p-5 overflow-hidden">
            <motion.img
              src={product.imageUrl}
              alt={product.name}
              onError={(e) => {
                e.currentTarget.src =
                  "data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' width='160' height='160'%3E%3Crect width='160' height='160' fill='%23f1f5f9'/%3E%3Ctext x='50%25' y='50%25' dominant-baseline='middle' text-anchor='middle' font-size='40' fill='%23cbd5e1'%3E📦%3C/text%3E%3C/svg%3E";
              }}
              className="h-full w-full object-contain transition-transform duration-500 group-hover:scale-110"
              loading="lazy"
            />
          </div>

          {/* Quick View overlay */}
          <motion.div
            initial={{ opacity: 0 }}
            whileHover={{ opacity: 1 }}
            className="absolute inset-0 bg-black/10 flex items-end justify-center pb-4 opacity-0 group-hover:opacity-100 transition-opacity duration-200"
          >
            <motion.button
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.97 }}
              onClick={() => setQuickView(true)}
              className="flex items-center gap-2 px-4 py-2 rounded-xl bg-white/95 backdrop-blur-sm text-slate-800 text-xs font-bold shadow-lg"
            >
              <Eye size={13} /> Quick View
            </motion.button>
          </motion.div>
        </div>

        {/* Content */}
        <div className="flex flex-col flex-1 p-4">
          <span className="inline-flex self-start items-center gap-1 bg-teal-50 text-[#0F766E] text-[11px] font-semibold px-2.5 py-1 rounded-full mb-2">
            <Zap size={10} fill="currentColor" />
            {product.category?.split(/[>|]/)[0]?.trim() || "General"}
          </span>

          <h3 className="font-bold text-base text-slate-800 leading-snug line-clamp-2 mb-0.5">
            {product.name}
          </h3>

          {/* Brand */}
          <p className="text-xs font-semibold text-slate-400 mb-2">{brand}</p>

          {/* Rating */}
          <div className="flex items-center gap-1.5 mb-2">
            <div className="flex items-center gap-0.5">
              {Array.from({ length: 5 }).map((_, i) => (
                <Star key={i} size={11} className={i < Math.round(rating) ? "text-amber-400" : "text-slate-200"} fill="currentColor" />
              ))}
            </div>
            <span className="text-xs font-semibold text-slate-500">{rating.toFixed(1)}</span>
            <span className="text-xs text-slate-400">({Math.floor(rating * 120 + 40)})</span>
          </div>

          <div className="mt-auto">
            {/* Price */}
            <div className="flex items-baseline gap-2 mb-1">
              <span className="text-xl font-black text-slate-900">₹{formatPrice(currentPrice)}</span>
              <span className="text-sm text-slate-400 line-through font-medium">₹{formatPrice(originalPrice)}</span>
            </div>

            {/* Stock */}
            <p className={`text-xs font-semibold mb-3 flex items-center gap-1 ${
              stock <= 0 ? "text-red-500" : stock <= 5 ? "text-orange-500" : "text-green-600"
            }`}>
              {stock <= 0
                ? <><AlertCircle size={11} /> Out of Stock</>
                : stock <= 5
                  ? <><AlertCircle size={11} /> Only {stock} left!</>
                  : <><CheckCircle2 size={11} /> In Stock</>
              }
            </p>

            {/* Buttons */}
            <div className="flex gap-2">
              <motion.button
                whileTap={{ scale: 0.96 }}
                onClick={handleAddToCart}
                disabled={adding || stock <= 0}
                className="flex-1 flex items-center justify-center gap-2 text-white text-sm font-bold py-2.5 rounded-xl transition-colors duration-200 shadow-sm hover:shadow-md disabled:bg-slate-300"
                style={stock > 0 ? { background: "linear-gradient(135deg, #0F766E, #14B8A6)" } : {}}
              >
                <ShoppingCart size={14} />
                {adding ? "Adding…" : "Add to Cart"}
              </motion.button>
              <motion.button
                whileTap={{ scale: 0.96 }}
                onClick={() => setQuickView(true)}
                className="w-10 h-10 flex items-center justify-center rounded-xl border-2 border-slate-200 hover:border-[#0F766E] hover:text-[#0F766E] text-slate-400 transition-colors duration-200"
              >
                <Eye size={15} />
              </motion.button>
            </div>
          </div>
        </div>
      </motion.article>

      {/* Quick View Modal */}
      <AnimatePresence>
        {quickView && (
          <QuickViewModal
            product={product}
            onClose={() => setQuickView(false)}
            onAddToCart={onAddToCart}
          />
        )}
      </AnimatePresence>
    </>
  );
}
