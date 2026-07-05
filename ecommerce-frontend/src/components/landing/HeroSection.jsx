import { motion } from "framer-motion";
import { useNavigate } from "react-router-dom";
import { ArrowRight, ShoppingBag, Star, Truck, ShieldCheck, Zap } from "lucide-react";

const floatingCards = [
  { label: "Free Delivery", sub: "On orders ₹499+", icon: Truck, color: "#0F766E", delay: 0, pos: "left-[-28px] top-[15%]" },
  { label: "4.9 Rating", sub: "10K+ reviews", icon: Star, color: "#F59E0B", delay: 0.3, pos: "right-[-28px] top-[28%]" },
  { label: "Secure Pay", sub: "256-bit SSL", icon: ShieldCheck, color: "#6366F1", delay: 0.6, pos: "left-[-16px] bottom-[18%]" },
];

function ShoppingIllustration() {
  return (
    <svg viewBox="0 0 400 400" fill="none" xmlns="http://www.w3.org/2000/svg" className="w-full h-full">
      {/* Background circle */}
      <circle cx="200" cy="200" r="180" fill="url(#bgGrad)" opacity="0.12" />

      {/* Main shopping bag */}
      <rect x="110" y="155" width="180" height="155" rx="22" fill="url(#bagGrad)" />
      <rect x="110" y="155" width="180" height="155" rx="22" fill="url(#bagShine)" />
      {/* Bag handle */}
      <path d="M155 155 C155 120 245 120 245 155" stroke="url(#handleGrad)" strokeWidth="14" strokeLinecap="round" fill="none" />
      {/* Bag stripe */}
      <rect x="110" y="185" width="180" height="18" fill="rgba(255,255,255,0.18)" />
      {/* Bag label */}
      <rect x="158" y="220" width="84" height="36" rx="10" fill="rgba(255,255,255,0.22)" />
      <circle cx="200" cy="238" r="8" fill="rgba(255,255,255,0.7)" />

      {/* Floating product cards */}
      {/* Card 1 — top left */}
      <g transform="translate(28, 60)">
        <rect width="100" height="72" rx="14" fill="white" filter="url(#cardShadow)" />
        <rect width="100" height="72" rx="14" fill="white" />
        <rect x="8" y="8" width="36" height="36" rx="8" fill="#F0FDF4" />
        <circle cx="26" cy="26" r="10" fill="#0F766E" opacity="0.7" />
        <rect x="52" y="14" width="40" height="7" rx="3.5" fill="#E2E8F0" />
        <rect x="52" y="26" width="28" height="6" rx="3" fill="#E2E8F0" />
        <rect x="8" y="52" width="50" height="12" rx="6" fill="#0F766E" opacity="0.15" />
        <rect x="10" y="55" width="46" height="6" rx="3" fill="#0F766E" opacity="0.5" />
      </g>

      {/* Card 2 — top right */}
      <g transform="translate(272, 44)">
        <rect width="100" height="72" rx="14" fill="white" filter="url(#cardShadow)" />
        <rect width="100" height="72" rx="14" fill="white" />
        <rect x="8" y="8" width="36" height="36" rx="8" fill="#FFF7ED" />
        <circle cx="26" cy="26" r="10" fill="#F59E0B" opacity="0.7" />
        <rect x="52" y="14" width="40" height="7" rx="3.5" fill="#E2E8F0" />
        <rect x="52" y="26" width="28" height="6" rx="3" fill="#E2E8F0" />
        <rect x="8" y="52" width="50" height="12" rx="6" fill="#F59E0B" opacity="0.15" />
        <rect x="10" y="55" width="46" height="6" rx="3" fill="#F59E0B" opacity="0.5" />
      </g>

      {/* Card 3 — bottom right */}
      <g transform="translate(268, 290)">
        <rect width="108" height="68" rx="14" fill="white" filter="url(#cardShadow)" />
        <rect width="108" height="68" rx="14" fill="white" />
        <rect x="8" y="8" width="32" height="32" rx="8" fill="#EFF6FF" />
        <circle cx="24" cy="24" r="9" fill="#6366F1" opacity="0.7" />
        <rect x="48" y="12" width="52" height="7" rx="3.5" fill="#E2E8F0" />
        <rect x="48" y="24" width="36" height="6" rx="3" fill="#E2E8F0" />
        <rect x="8" y="48" width="92" height="12" rx="6" fill="#6366F1" opacity="0.12" />
        <rect x="10" y="51" width="88" height="6" rx="3" fill="#6366F1" opacity="0.4" />
      </g>

      {/* Stars scattered */}
      <circle cx="80" cy="180" r="4" fill="#F59E0B" opacity="0.6" />
      <circle cx="320" cy="200" r="3" fill="#0F766E" opacity="0.5" />
      <circle cx="60" cy="300" r="3" fill="#6366F1" opacity="0.4" />
      <circle cx="340" cy="140" r="5" fill="#F59E0B" opacity="0.4" />
      <circle cx="350" cy="320" r="3" fill="#10B981" opacity="0.5" />

      {/* Sparkles */}
      <path d="M72 130 L75 120 L78 130 L88 133 L78 136 L75 146 L72 136 L62 133 Z" fill="#0F766E" opacity="0.25" />
      <path d="M328 260 L330 253 L332 260 L339 262 L332 264 L330 271 L328 264 L321 262 Z" fill="#F59E0B" opacity="0.3" />

      {/* Defs */}
      <defs>
        <linearGradient id="bgGrad" x1="0" y1="0" x2="400" y2="400" gradientUnits="userSpaceOnUse">
          <stop stopColor="#0F766E" />
          <stop offset="1" stopColor="#10B981" />
        </linearGradient>
        <linearGradient id="bagGrad" x1="110" y1="155" x2="290" y2="310" gradientUnits="userSpaceOnUse">
          <stop stopColor="#0F766E" />
          <stop offset="0.5" stopColor="#14B8A6" />
          <stop offset="1" stopColor="#10B981" />
        </linearGradient>
        <linearGradient id="bagShine" x1="110" y1="155" x2="200" y2="220" gradientUnits="userSpaceOnUse">
          <stop stopColor="white" stopOpacity="0.18" />
          <stop offset="1" stopColor="white" stopOpacity="0" />
        </linearGradient>
        <linearGradient id="handleGrad" x1="155" y1="120" x2="245" y2="155" gradientUnits="userSpaceOnUse">
          <stop stopColor="#0F766E" />
          <stop offset="1" stopColor="#14B8A6" />
        </linearGradient>
        <filter id="cardShadow" x="-20%" y="-20%" width="140%" height="140%">
          <feDropShadow dx="0" dy="4" stdDeviation="8" floodColor="#0F766E" floodOpacity="0.1" />
        </filter>
      </defs>
    </svg>
  );
}

export default function HeroSection() {
  const navigate = useNavigate();

  return (
    <section className="relative min-h-screen flex items-center overflow-hidden bg-white pt-16">
      {/* Background gradients */}
      <div className="absolute inset-0 bg-gradient-to-br from-teal-50/70 via-white to-emerald-50/50" />
      <div
        className="absolute top-0 right-0 w-[800px] h-[800px] rounded-full opacity-[0.06] pointer-events-none"
        style={{ background: "radial-gradient(circle, #0F766E 0%, transparent 70%)", transform: "translate(35%, -35%)" }}
      />
      <div
        className="absolute bottom-0 left-0 w-[600px] h-[600px] rounded-full opacity-[0.05] pointer-events-none"
        style={{ background: "radial-gradient(circle, #14B8A6 0%, transparent 70%)", transform: "translate(-35%, 35%)" }}
      />
      {/* Subtle grid */}
      <div
        className="absolute inset-0 opacity-[0.025] pointer-events-none"
        style={{ backgroundImage: "linear-gradient(#0F766E 1px, transparent 1px), linear-gradient(90deg, #0F766E 1px, transparent 1px)", backgroundSize: "60px 60px" }}
      />

      <div className="relative z-10 max-w-7xl mx-auto px-6 lg:px-8 w-full py-20 lg:py-0">
        <div className="grid lg:grid-cols-2 gap-16 items-center">

          {/* Left — copy */}
          <div>
            <motion.div
              initial={{ opacity: 0, y: 16 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5 }}
              className="inline-flex items-center gap-2 px-4 py-2 rounded-full text-sm font-semibold mb-8 border"
              style={{ background: "rgba(15,118,110,0.06)", borderColor: "rgba(15,118,110,0.2)", color: "#0F766E" }}
            >
              <span className="w-2 h-2 rounded-full bg-teal-500 animate-pulse" />
              New arrivals every week
            </motion.div>

            <motion.h1
              initial={{ opacity: 0, y: 28 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.65, delay: 0.1 }}
              className="text-5xl md:text-6xl lg:text-7xl font-black tracking-tight text-slate-900 leading-[1.04] mb-6"
            >
              Shop{" "}
              <span className="relative inline-block">
                <span
                  className="bg-clip-text text-transparent"
                  style={{ backgroundImage: "linear-gradient(135deg, #0F766E 0%, #10B981 100%)" }}
                >
                  Smarter.
                </span>
                <motion.span
                  className="absolute -bottom-1 left-0 h-[3px] rounded-full w-full"
                  style={{ background: "linear-gradient(90deg, #0F766E, #10B981)" }}
                  initial={{ scaleX: 0, originX: 0 }}
                  animate={{ scaleX: 1 }}
                  transition={{ duration: 0.9, delay: 0.75 }}
                />
              </span>
              <br />Live Better.
            </motion.h1>

            <motion.p
              initial={{ opacity: 0, y: 16 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 0.2 }}
              className="text-lg text-slate-500 max-w-lg mb-10 leading-relaxed"
            >
              Discover thousands of premium products with an experience built for speed, simplicity, and trust. Your next favourite thing is one click away.
            </motion.p>

            <motion.div
              initial={{ opacity: 0, y: 16 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 0.3 }}
              className="flex flex-col sm:flex-row gap-4 mb-14"
            >
              <motion.button
                whileHover={{ scale: 1.03, boxShadow: "0 20px 52px rgba(15,118,110,0.42)" }}
                whileTap={{ scale: 0.97 }}
                onClick={() => navigate("/products")}
                className="flex items-center justify-center gap-2.5 px-8 py-4 rounded-2xl text-white font-bold text-base"
                style={{ background: "linear-gradient(135deg, #0F766E, #14B8A6)", boxShadow: "0 8px 32px rgba(15,118,110,0.3)" }}
              >
                <ShoppingBag size={18} />
                Start Shopping
                <ArrowRight size={16} />
              </motion.button>
              <motion.button
                whileHover={{ scale: 1.03 }}
                whileTap={{ scale: 0.97 }}
                onClick={() => document.getElementById("categories")?.scrollIntoView({ behavior: "smooth" })}
                className="flex items-center justify-center gap-2 px-8 py-4 rounded-2xl font-bold text-base border-2 border-slate-200 text-slate-700 hover:border-teal-300 hover:text-teal-700 transition-colors bg-white"
              >
                Browse Categories
              </motion.button>
            </motion.div>

            {/* Stats */}
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ duration: 0.6, delay: 0.5 }}
              className="flex items-center gap-8"
            >
              {[["270+", "Products"], ["10K+", "Customers"], ["4.9★", "Rating"]].map(([val, label]) => (
                <div key={label}>
                  <div className="text-2xl font-black text-slate-900">{val}</div>
                  <div className="text-xs text-slate-500 font-medium">{label}</div>
                </div>
              ))}
            </motion.div>
          </div>

          {/* Right — illustration */}
          <motion.div
            initial={{ opacity: 0, x: 50 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.9, delay: 0.2 }}
            className="relative hidden lg:flex items-center justify-center"
          >
            {/* Glow ring */}
            <div
              className="absolute w-[420px] h-[420px] rounded-full"
              style={{ background: "radial-gradient(circle, rgba(15,118,110,0.12) 0%, transparent 70%)" }}
            />
            <div
              className="absolute w-[520px] h-[520px] rounded-full border border-teal-100/60"
            />

            {/* Animated illustration */}
            <motion.div
              animate={{ y: [0, -14, 0] }}
              transition={{ duration: 5.5, repeat: Infinity, ease: "easeInOut" }}
              className="relative w-[380px] h-[380px]"
            >
              <ShoppingIllustration />
            </motion.div>

            {/* Floating info cards */}
            {floatingCards.map(({ label, sub, icon: Icon, color, delay, pos }, i) => (
              <motion.div
                key={label}
                initial={{ opacity: 0, scale: 0.8 }}
                animate={{
                  opacity: 1,
                  scale: 1,
                  y: [0, i % 2 === 0 ? -10 : 10, 0],
                }}
                transition={{
                  opacity: { delay: delay + 0.5, duration: 0.5 },
                  scale: { delay: delay + 0.5, duration: 0.5 },
                  y: { delay, duration: 3.5 + i * 0.5, repeat: Infinity, ease: "easeInOut" },
                }}
                className={`absolute ${pos} flex items-center gap-3 px-4 py-3 rounded-2xl`}
                style={{
                  background: "rgba(255,255,255,0.96)",
                  backdropFilter: "blur(20px)",
                  boxShadow: "0 8px 32px rgba(0,0,0,0.12)",
                  border: "1px solid rgba(255,255,255,0.9)",
                }}
              >
                <div className="w-9 h-9 rounded-xl flex items-center justify-center" style={{ background: `${color}18` }}>
                  <Icon size={18} color={color} />
                </div>
                <div>
                  <div className="text-xs font-bold text-slate-800">{label}</div>
                  <div className="text-[10px] text-slate-500">{sub}</div>
                </div>
              </motion.div>
            ))}

            {/* Flash deal badge */}
            <motion.div
              initial={{ opacity: 0, scale: 0 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ delay: 1.1, type: "spring", stiffness: 200 }}
              className="absolute -bottom-4 right-10 flex items-center gap-2 px-4 py-2.5 rounded-2xl cursor-pointer"
              style={{ background: "linear-gradient(135deg, #F59E0B, #EF4444)", boxShadow: "0 8px 24px rgba(239,68,68,0.35)" }}
              onClick={() => document.getElementById("deals")?.scrollIntoView({ behavior: "smooth" })}
            >
              <Zap size={14} color="white" fill="white" />
              <span className="text-white text-xs font-bold">Flash Deals Live!</span>
            </motion.div>
          </motion.div>
        </div>
      </div>

      {/* Scroll indicator */}
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 1.5 }}
        className="absolute bottom-8 left-1/2 -translate-x-1/2 flex flex-col items-center gap-2 cursor-pointer"
        onClick={() => document.getElementById("categories")?.scrollIntoView({ behavior: "smooth" })}
      >
        <span className="text-xs text-slate-400 font-medium tracking-widest uppercase">Scroll</span>
        <motion.div
          animate={{ y: [0, 8, 0] }}
          transition={{ duration: 1.5, repeat: Infinity }}
          className="w-5 h-8 rounded-full border-2 border-slate-300 flex items-start justify-center pt-1.5"
        >
          <div className="w-1 h-2 rounded-full bg-slate-400" />
        </motion.div>
      </motion.div>
    </section>
  );
}
