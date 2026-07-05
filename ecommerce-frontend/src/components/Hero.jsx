import { motion } from "framer-motion";
import { ShoppingBag, ChevronRight, Star, Shield, Truck } from "lucide-react";

const TRUST_BADGES = [
  { icon: Truck, label: "Free Delivery", sub: "On orders ₹499+" },
  { icon: Shield, label: "Secure Payments", sub: "100% protected" },
  { icon: Star, label: "Top Rated", sub: "4.8★ avg rating" },
];

export default function Hero({ productCount, onShopNow, onExplore }) {
  return (
    <section className="relative overflow-hidden bg-gradient-to-br from-[#0F766E] via-[#0D6B63] to-[#134E4A]">
      {/* Background decoration */}
      <div className="absolute inset-0 overflow-hidden pointer-events-none">
        <div className="absolute -top-24 -right-24 w-96 h-96 rounded-full bg-white/5" />
        <div className="absolute top-1/2 -right-12 w-64 h-64 rounded-full bg-teal-400/10" />
        <div className="absolute -bottom-16 left-1/3 w-80 h-80 rounded-full bg-white/5" />
        <div className="absolute top-8 left-1/4 w-2 h-2 rounded-full bg-teal-300/60" />
        <div className="absolute top-16 left-1/3 w-1.5 h-1.5 rounded-full bg-white/40" />
        <div className="absolute bottom-12 right-1/4 w-2 h-2 rounded-full bg-teal-300/50" />
        {/* Grid pattern */}
        <svg className="absolute inset-0 w-full h-full opacity-[0.04]" xmlns="http://www.w3.org/2000/svg">
          <defs>
            <pattern id="grid" width="40" height="40" patternUnits="userSpaceOnUse">
              <path d="M 40 0 L 0 0 0 40" fill="none" stroke="white" strokeWidth="1" />
            </pattern>
          </defs>
          <rect width="100%" height="100%" fill="url(#grid)" />
        </svg>
      </div>

      <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16 lg:py-24">
        <div className="flex flex-col lg:flex-row items-center gap-12">

          {/* Left content */}
          <div className="flex-1 text-center lg:text-left">
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5 }}
            >
              <span className="inline-flex items-center gap-2 bg-white/15 backdrop-blur-sm text-white text-xs font-semibold px-4 py-1.5 rounded-full mb-5 border border-white/20">
                <span className="w-1.5 h-1.5 rounded-full bg-teal-300 animate-pulse" />
                {productCount > 0 ? `${productCount}+ Products Live` : "New Arrivals Every Week"}
              </span>

              <h1 className="text-4xl sm:text-5xl lg:text-6xl font-black text-white leading-[1.08] tracking-tight">
                Shop Smarter
                <br />
                <span className="text-transparent bg-clip-text bg-gradient-to-r from-teal-200 to-cyan-200">
                  with Kartify
                </span>
              </h1>

              <p className="mt-5 text-lg text-white/75 max-w-md mx-auto lg:mx-0 leading-relaxed">
                Discover premium products at unbeatable prices. Curated collections, fast delivery, and a shopping experience you'll love.
              </p>

              <div className="mt-8 flex flex-col sm:flex-row gap-3 justify-center lg:justify-start">
                <motion.button
                  whileHover={{ scale: 1.03 }}
                  whileTap={{ scale: 0.97 }}
                  onClick={onShopNow}
                  className="inline-flex items-center justify-center gap-2 bg-white text-[#0F766E] font-bold px-7 py-3.5 rounded-xl shadow-lg hover:shadow-xl transition-all text-sm"
                >
                  <ShoppingBag size={18} />
                  Shop Now
                </motion.button>
                <motion.button
                  whileHover={{ scale: 1.03 }}
                  whileTap={{ scale: 0.97 }}
                  onClick={onExplore}
                  className="inline-flex items-center justify-center gap-2 bg-white/10 backdrop-blur-sm text-white font-bold px-7 py-3.5 rounded-xl border border-white/25 hover:bg-white/20 transition-all text-sm"
                >
                  Explore Categories
                  <ChevronRight size={16} />
                </motion.button>
              </div>
            </motion.div>
          </div>

          {/* Right illustration */}
          <motion.div
            initial={{ opacity: 0, x: 30 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.6, delay: 0.15 }}
            className="flex-1 flex justify-center lg:justify-end"
          >
            <div className="relative w-72 h-72 lg:w-80 lg:h-80">
              {/* Floating cards */}
              <div className="absolute inset-0 flex items-center justify-center">
                <div className="w-56 h-56 rounded-3xl bg-white/10 backdrop-blur-sm border border-white/20 flex items-center justify-center">
                  <ShoppingBag size={80} className="text-white/30" />
                </div>
              </div>
              {/* Floating badge 1 */}
              <motion.div
                animate={{ y: [0, -8, 0] }}
                transition={{ duration: 3, repeat: Infinity, ease: "easeInOut" }}
                className="absolute top-4 -left-4 bg-white rounded-2xl shadow-xl px-4 py-3 flex items-center gap-2"
              >
                <div className="w-8 h-8 rounded-xl bg-green-100 flex items-center justify-center">
                  <Star size={14} className="text-green-600" fill="currentColor" />
                </div>
                <div>
                  <p className="text-xs font-bold text-slate-800">Top Rated</p>
                  <p className="text-[10px] text-slate-500">4.8 / 5.0</p>
                </div>
              </motion.div>
              {/* Floating badge 2 */}
              <motion.div
                animate={{ y: [0, 8, 0] }}
                transition={{ duration: 3.5, repeat: Infinity, ease: "easeInOut", delay: 0.5 }}
                className="absolute bottom-8 -right-4 bg-white rounded-2xl shadow-xl px-4 py-3 flex items-center gap-2"
              >
                <div className="w-8 h-8 rounded-xl bg-teal-100 flex items-center justify-center">
                  <Truck size={14} className="text-[#0F766E]" />
                </div>
                <div>
                  <p className="text-xs font-bold text-slate-800">Fast Delivery</p>
                  <p className="text-[10px] text-slate-500">Within 24 hrs</p>
                </div>
              </motion.div>
            </div>
          </motion.div>
        </div>

        {/* Trust badges */}
        <motion.div
          initial={{ opacity: 0, y: 16 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5, delay: 0.3 }}
          className="mt-12 grid grid-cols-3 gap-4 border-t border-white/15 pt-8"
        >
          {TRUST_BADGES.map(({ icon: Icon, label, sub }) => (
            <div key={label} className="flex items-center gap-3">
              <div className="w-9 h-9 rounded-xl bg-white/10 flex items-center justify-center shrink-0">
                <Icon size={18} className="text-teal-200" />
              </div>
              <div className="hidden sm:block">
                <p className="text-sm font-semibold text-white">{label}</p>
                <p className="text-xs text-white/60">{sub}</p>
              </div>
            </div>
          ))}
        </motion.div>
      </div>
    </section>
  );
}
