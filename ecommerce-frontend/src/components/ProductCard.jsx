import { useState } from "react";
import { motion } from "framer-motion";
import { Heart, ShoppingCart, Star, Eye, Zap } from "lucide-react";

function getFakeRating(product) {
  const seed = Number(product.id ?? String(product.name).length);
  return 3.8 + (seed % 12) / 10;
}

function getFakeOriginalPrice(price) {
  const p = Number(price);
  const multipliers = [1.25, 1.3, 1.35, 1.4, 1.45, 1.5];
  const idx = Math.floor(p) % multipliers.length;
  return Math.round(p * multipliers[idx]);
}

function getDiscount(original, current) {
  return Math.round(((original - current) / original) * 100);
}

function formatPrice(price) {
  return new Intl.NumberFormat("en-IN", { maximumFractionDigits: 0 }).format(Number(price) || 0);
}

export default function ProductCard({ product, onAddToCart, index = 0 }) {
  const [wishlisted, setWishlisted] = useState(false);
  const [adding, setAdding] = useState(false);

  const rating = getFakeRating(product);
  const currentPrice = Number(product.price);
  const originalPrice = getFakeOriginalPrice(currentPrice);
  const discount = getDiscount(originalPrice, currentPrice);
  const stock = Number(product.stock ?? 10);

  const handleAddToCart = async () => {
    setAdding(true);
    await onAddToCart(product);
    setAdding(false);
  };

  return (
    <motion.article
      initial={{ opacity: 0, y: 24 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.35, delay: index * 0.05 }}
      whileHover={{ y: -6, transition: { duration: 0.2 } }}
      className="group flex flex-col bg-white rounded-2xl border border-slate-100 shadow-sm hover:shadow-xl hover:shadow-slate-200/60 transition-shadow duration-300 overflow-hidden"
      style={{ minHeight: "520px" }}
    >
      {/* Image area */}
      <div className="relative bg-slate-50 border-b border-slate-100">
        {/* Discount badge */}
        {discount > 0 && (
          <div className="absolute top-3 left-3 z-10 bg-red-500 text-white text-[11px] font-bold px-2 py-1 rounded-lg">
            {discount}% OFF
          </div>
        )}

        {/* Wishlist */}
        <button
          onClick={() => setWishlisted((v) => !v)}
          className="absolute top-3 right-3 z-10 w-8 h-8 rounded-full bg-white shadow-md flex items-center justify-center transition-transform hover:scale-110"
        >
          <Heart
            size={15}
            className={wishlisted ? "text-red-500" : "text-slate-400"}
            fill={wishlisted ? "currentColor" : "none"}
          />
        </button>

        {/* Image */}
        <div className="h-60 flex items-center justify-center p-5 overflow-hidden">
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
      </div>

      {/* Content */}
      <div className="flex flex-col flex-1 p-4">
        {/* Category pill */}
        <span className="inline-flex self-start items-center gap-1 bg-teal-50 text-[#0F766E] text-[11px] font-semibold px-2.5 py-1 rounded-full mb-2">
          <Zap size={10} fill="currentColor" />
          {product.category?.split(/[>|]/)[0]?.trim() || "General"}
        </span>

        {/* Name */}
        <h3 className="font-bold text-base text-slate-800 leading-snug line-clamp-2 mb-1.5">
          {product.name}
        </h3>

        {/* Rating */}
        <div className="flex items-center gap-1.5 mb-2">
          <div className="flex items-center gap-0.5">
            {Array.from({ length: 5 }).map((_, i) => (
              <Star
                key={i}
                size={12}
                className={i < Math.round(rating) ? "text-amber-400" : "text-slate-200"}
                fill="currentColor"
              />
            ))}
          </div>
          <span className="text-xs font-semibold text-slate-500">{rating.toFixed(1)}</span>
          <span className="text-xs text-slate-400">({Math.floor(rating * 120 + 40)})</span>
        </div>

        {/* Description */}
        <p className="text-sm text-slate-500 line-clamp-2 leading-relaxed mb-3">
          {product.description || "Premium quality product available exclusively on Kartify."}
        </p>

        {/* Push everything below to bottom */}
        <div className="mt-auto">
          {/* Price row */}
          <div className="flex items-baseline gap-2 mb-1">
            <span className="text-xl font-black text-slate-900">
              ₹{formatPrice(currentPrice)}
            </span>
            <span className="text-sm text-slate-400 line-through font-medium">
              ₹{formatPrice(originalPrice)}
            </span>
          </div>

          {/* Stock */}
          <p className={`text-xs font-semibold mb-3 ${stock <= 5 && stock > 0 ? "text-orange-500" : "text-green-600"}`}>
            {stock <= 0 ? "Out of Stock" : stock <= 5 ? `Only ${stock} left!` : "✓ In Stock"}
          </p>

          {/* Buttons */}
          <div className="flex gap-2">
            <motion.button
              whileTap={{ scale: 0.96 }}
              onClick={handleAddToCart}
              disabled={adding || stock <= 0}
              className="flex-1 flex items-center justify-center gap-2 bg-[#0F766E] hover:bg-[#0D6B63] disabled:bg-slate-300 text-white text-sm font-bold py-2.5 rounded-xl transition-colors duration-200 shadow-sm hover:shadow-md"
            >
              <ShoppingCart size={15} />
              {adding ? "Adding…" : "Add to Cart"}
            </motion.button>
            <motion.button
              whileTap={{ scale: 0.96 }}
              className="w-10 h-10 flex items-center justify-center rounded-xl border-2 border-slate-200 hover:border-[#0F766E] hover:text-[#0F766E] text-slate-400 transition-colors duration-200"
            >
              <Eye size={16} />
            </motion.button>
          </div>
        </div>
      </div>
    </motion.article>
  );
}
