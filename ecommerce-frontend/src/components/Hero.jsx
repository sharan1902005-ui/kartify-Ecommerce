import { motion } from "framer-motion";
import { ShoppingBag, ChevronRight, Star, Shield, Truck, Zap } from "lucide-react";

const TRUST_BADGES = [
  { icon: Truck,       label: "Free Delivery",   sub: "On orders ₹499+" },
  { icon: Shield,      label: "Secure Payments", sub: "100% protected" },
  { icon: Star,        label: "Top Rated",       sub: "4.9★ avg rating" },
];

export default function Hero({ productCount, onShopNow, onExplore }) {
  return (
    <section className="relative overflow-hidden"
      style={{ background: "linear-gradient(135deg, #0A3D38 0%, #0F766E 55%, #0C4A45 100%)" }}>
      {/* Background decorations */}
      <div className="absolute inset-0 overflow-hidden pointer-events-none">
        <div className="absolute -top-32 -right-32 w-[500px] h-[500px] rounded-full bg-white/[0.04]" />
        <div className="absolute top-1/2 -right-16 w-72 h-72 rounded-full bg-teal-400/[0.07]" />
        <div className="absolute -bottom-20 left-1/3 w-96 h-96 rounded-full bg-white/[0.03]" />
        {/* Dot grid */}
        <div className="absolute inset-0 opacity-[0.035]"
          style={{ backgroundImage: "radial-gradient(circle, rgba(255,255,255,0.8) 1px, transparent 1px)", backgroundSize: "32px 32px" }} />
      </div>

      <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-14 lg:py-20">
        <div className="flex flex-col lg:flex-row items-center gap-12">

          {/* Left content */}
          <div className="flex-1 text-center lg:text-left">
            <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.5 }}>
              <span className="inline-flex items-center gap-2 bg-white/12 backdrop-blur-sm text-white text-xs font-semibold px-4 py-1.5 rounded-full mb-5 border border-white/20">
                <span className="w-1.5 h-1.5 rounded-full bg-teal-300 animate-pulse" />
                {productCount > 0 ? `${productCount}+ Products Live` : "New Arrivals Every Week"}
              </span>

              <h1 className="text-4xl sm:text-5xl lg:text-6xl font-black text-white leading-[1.06] tracking-tight">
                Shop Smarter
                <br />
                <span className="text-transparent bg-clip-text"
                  style={{ backgroundImage: "linear-gradient(90deg, #5EEAD4, #A7F3D0)" }}>
                  with Kartify
                </span>
              </h1>

              <p className="mt-5 text-lg text-white/70 max-w-md mx-auto lg:mx-0 leading-relaxed">
                Discover premium products at unbeatable prices. Curated collections, fast delivery, and a shopping experience you'll love.
              </p>

              <div className="mt-8 flex flex-col sm:flex-row gap-3 justify-center lg:justify-start">
                <motion.button
                  whileHover={{ scale: 1.03, boxShadow: "0 12px 32px rgba(0,0,0,0.25)" }}
                  whileTap={{ scale: 0.97 }}
                  onClick={onShopNow}
                  className="inline-flex items-center justify-center gap-2 bg-white text-[#0F766E] font-bold px-7 py-3.5 rounded-2xl shadow-lg transition-all text-sm"
                >
                  <ShoppingBag size={17} />
                  Shop Now
                </motion.button>
                <motion.button
                  whileHover={{ scale: 1.03 }}
                  whileTap={{ scale: 0.97 }}
                  onClick={onExplore}
                  className="inline-flex items-center justify-center gap-2 bg-white/10 backdrop-blur-sm text-white font-bold px-7 py-3.5 rounded-2xl border border-white/20 hover:bg-white/18 transition-all text-sm"
                >
                  Explore Categories
                  <ChevronRight size={16} />
                </motion.button>
              </div>
            </motion.div>
          </div>

          {/* Right — floating cards */}
          <motion.div
            initial={{ opacity: 0, x: 30 }} animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.6, delay: 0.15 }}
            className="flex-1 flex justify-center lg:justify-end"
          >
            <div className="relative w-72 h-72 lg:w-80 lg:h-80">
              <div className="absolute inset-0 flex items-center justify-center">
                <div className="w-56 h-56 rounded-3xl flex items-center justify-center"
                  style={{ background: "rgba(255,255,255,0.07)", backdropFilter: "blur(12px)", border: "1px solid rgba(255,255,255,0.15)" }}>
                  <ShoppingBag size={80} className="text-white/20" />
                </div>
              </div>
              <motion.div animate={{ y: [0, -8, 0] }} transition={{ duration: 3, repeat: Infinity, ease: "easeInOut" }}
                className="absolute top-4 -left-4 bg-white rounded-2xl shadow-xl px-4 py-3 flex items-center gap-2.5">
                <div className="w-8 h-8 rounded-xl bg-amber-100 flex items-center justify-center">
                  <Star size={14} className="text-amber-500" fill="currentColor" />
                </div>
                <div>
                  <p className="text-xs font-bold text-slate-800">Top Rated</p>
                  <p className="text-[10px] text-slate-500">4.9 / 5.0</p>
                </div>
              </motion.div>
              <motion.div animate={{ y: [0, 8, 0] }} transition={{ duration: 3.5, repeat: Infinity, ease: "easeInOut", delay: 0.5 }}
                className="absolute bottom-8 -right-4 bg-white rounded-2xl shadow-xl px-4 py-3 flex items-center gap-2.5">
                <div className="w-8 h-8 rounded-xl bg-teal-100 flex items-center justify-center">
                  <Truck size={14} className="text-[#0F766E]" />
                </div>
                <div>
                  <p className="text-xs font-bold text-slate-800">Fast Delivery</p>
                  <p className="text-[10px] text-slate-500">Within 24 hrs</p>
                </div>
              </motion.div>
              <motion.div animate={{ y: [0, -6, 0] }} transition={{ duration: 4, repeat: Infinity, ease: "easeInOut", delay: 1 }}
                className="absolute bottom-2 left-4 flex items-center gap-2 px-3 py-2 rounded-xl"
                style={{ background: "linear-gradient(135deg, #F59E0B, #EF4444)", boxShadow: "0 6px 20px rgba(239,68,68,0.3)" }}>
                <Zap size={11} color="white" fill="white" />
                <span className="text-white text-[10px] font-bold">Flash Deals</span>
              </motion.div>
            </div>
          </motion.div>
        </div>

        {/* Trust badges */}
        <motion.div
          initial={{ opacity: 0, y: 16 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.5, delay: 0.3 }}
          className="mt-12 grid grid-cols-3 gap-4 border-t border-white/10 pt-8"
        >
          {TRUST_BADGES.map(({ icon: Icon, label, sub }) => (
            <div key={label} className="flex items-center gap-3">
              <div className="w-9 h-9 rounded-xl bg-white/10 flex items-center justify-center shrink-0">
                <Icon size={17} className="text-teal-200" />
              </div>
              <div className="hidden sm:block">
                <p className="text-sm font-semibold text-white">{label}</p>
                <p className="text-xs text-white/55">{sub}</p>
              </div>
            </div>
          ))}
        </motion.div>
      </div>
    </section>
  );
}
