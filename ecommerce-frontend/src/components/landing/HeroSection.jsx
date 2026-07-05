import { motion } from "framer-motion";
import { useNavigate } from "react-router-dom";
import { ArrowRight, ShoppingBag, Star, Truck, ShieldCheck, Zap, Sparkles } from "lucide-react";

const floatingCards = [
  { label: "Free Delivery", sub: "On orders ₹499+", icon: Truck, color: "#0F766E", bg: "#F0FDF4", delay: 0, pos: "left-[-20px] top-[18%]" },
  { label: "4.9★ Rating", sub: "10K+ happy buyers", icon: Star, color: "#F59E0B", bg: "#FFFBEB", delay: 0.3, pos: "right-[-20px] top-[30%]" },
  { label: "Secure Pay", sub: "256-bit SSL", icon: ShieldCheck, color: "#6366F1", bg: "#EEF2FF", delay: 0.6, pos: "left-[0px] bottom-[20%]" },
];

function ShoppingIllustration() {
  return (
    <svg viewBox="0 0 400 400" fill="none" xmlns="http://www.w3.org/2000/svg" className="w-full h-full">
      <circle cx="200" cy="200" r="180" fill="url(#bgGrad)" opacity="0.1" />
      <rect x="110" y="155" width="180" height="155" rx="24" fill="url(#bagGrad)" />
      <rect x="110" y="155" width="180" height="155" rx="24" fill="url(#bagShine)" />
      <path d="M155 155 C155 118 245 118 245 155" stroke="url(#handleGrad)" strokeWidth="14" strokeLinecap="round" fill="none" />
      <rect x="110" y="188" width="180" height="16" fill="rgba(255,255,255,0.15)" />
      <rect x="160" y="222" width="80" height="34" rx="10" fill="rgba(255,255,255,0.2)" />
      <circle cx="200" cy="239" r="8" fill="rgba(255,255,255,0.65)" />
      <g transform="translate(28, 58)">
        <rect width="100" height="72" rx="16" fill="white" filter="url(#cardShadow)" />
        <rect x="8" y="8" width="36" height="36" rx="10" fill="#F0FDF4" />
        <circle cx="26" cy="26" r="10" fill="#0F766E" opacity="0.75" />
        <rect x="52" y="14" width="40" height="7" rx="3.5" fill="#E2E8F0" />
        <rect x="52" y="26" width="28" height="6" rx="3" fill="#E2E8F0" />
        <rect x="8" y="52" width="84" height="12" rx="6" fill="#0F766E" opacity="0.12" />
      </g>
      <g transform="translate(272, 42)">
        <rect width="100" height="72" rx="16" fill="white" filter="url(#cardShadow)" />
        <rect x="8" y="8" width="36" height="36" rx="10" fill="#FFFBEB" />
        <circle cx="26" cy="26" r="10" fill="#F59E0B" opacity="0.75" />
        <rect x="52" y="14" width="40" height="7" rx="3.5" fill="#E2E8F0" />
        <rect x="52" y="26" width="28" height="6" rx="3" fill="#E2E8F0" />
        <rect x="8" y="52" width="84" height="12" rx="6" fill="#F59E0B" opacity="0.12" />
      </g>
      <g transform="translate(268, 292)">
        <rect width="108" height="68" rx="16" fill="white" filter="url(#cardShadow)" />
        <rect x="8" y="8" width="32" height="32" rx="8" fill="#EEF2FF" />
        <circle cx="24" cy="24" r="9" fill="#6366F1" opacity="0.75" />
        <rect x="48" y="12" width="52" height="7" rx="3.5" fill="#E2E8F0" />
        <rect x="48" y="24" width="36" height="6" rx="3" fill="#E2E8F0" />
        <rect x="8" y="48" width="92" height="12" rx="6" fill="#6366F1" opacity="0.1" />
      </g>
      <circle cx="78" cy="178" r="4" fill="#F59E0B" opacity="0.5" />
      <circle cx="322" cy="198" r="3" fill="#0F766E" opacity="0.4" />
      <circle cx="58" cy="302" r="3" fill="#6366F1" opacity="0.35" />
      <circle cx="342" cy="138" r="5" fill="#F59E0B" opacity="0.35" />
      <path d="M70 128 L73 118 L76 128 L86 131 L76 134 L73 144 L70 134 L60 131 Z" fill="#0F766E" opacity="0.2" />
      <path d="M326 258 L328 251 L330 258 L337 260 L330 262 L328 269 L326 262 L319 260 Z" fill="#F59E0B" opacity="0.25" />
      <defs>
        <linearGradient id="bgGrad" x1="0" y1="0" x2="400" y2="400" gradientUnits="userSpaceOnUse">
          <stop stopColor="#0F766E" /><stop offset="1" stopColor="#10B981" />
        </linearGradient>
        <linearGradient id="bagGrad" x1="110" y1="155" x2="290" y2="310" gradientUnits="userSpaceOnUse">
          <stop stopColor="#0F766E" /><stop offset="0.5" stopColor="#14B8A6" /><stop offset="1" stopColor="#10B981" />
        </linearGradient>
        <linearGradient id="bagShine" x1="110" y1="155" x2="200" y2="220" gradientUnits="userSpaceOnUse">
          <stop stopColor="white" stopOpacity="0.2" /><stop offset="1" stopColor="white" stopOpacity="0" />
        </linearGradient>
        <linearGradient id="handleGrad" x1="155" y1="120" x2="245" y2="155" gradientUnits="userSpaceOnUse">
          <stop stopColor="#0F766E" /><stop offset="1" stopColor="#14B8A6" />
        </linearGradient>
        <filter id="cardShadow" x="-20%" y="-20%" width="140%" height="140%">
          <feDropShadow dx="0" dy="6" stdDeviation="10" floodColor="#0F766E" floodOpacity="0.08" />
        </filter>
      </defs>
    </svg>
  );
}

export default function HeroSection() {
  const navigate = useNavigate();

  return (
    <section className="relative min-h-screen flex items-center overflow-hidden bg-white pt-16">
      {/* Background */}
      <div className="absolute inset-0 bg-gradient-to-br from-teal-50/60 via-white to-emerald-50/40" />
      <div className="absolute top-0 right-0 w-[900px] h-[900px] rounded-full opacity-[0.05] pointer-events-none"
        style={{ background: "radial-gradient(circle, #0F766E 0%, transparent 70%)", transform: "translate(40%, -40%)" }} />
      <div className="absolute bottom-0 left-0 w-[700px] h-[700px] rounded-full opacity-[0.04] pointer-events-none"
        style={{ background: "radial-gradient(circle, #14B8A6 0%, transparent 70%)", transform: "translate(-40%, 40%)" }} />
      {/* Subtle dot grid */}
      <div className="absolute inset-0 opacity-[0.018] pointer-events-none"
        style={{ backgroundImage: "radial-gradient(circle, #0F766E 1px, transparent 1px)", backgroundSize: "40px 40px" }} />

      <div className="relative z-10 max-w-7xl mx-auto px-6 lg:px-8 w-full py-20 lg:py-0">
        <div className="grid lg:grid-cols-2 gap-16 items-center min-h-screen lg:min-h-0 lg:py-24">

          {/* Left — copy */}
          <div>
            <motion.div
              initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.5 }}
              className="inline-flex items-center gap-2 px-4 py-2 rounded-full text-sm font-semibold mb-8 border"
              style={{ background: "rgba(15,118,110,0.06)", borderColor: "rgba(15,118,110,0.18)", color: "#0F766E" }}
            >
              <span className="w-2 h-2 rounded-full bg-teal-500 animate-pulse" />
              <Sparkles size={13} />
              New arrivals every week
            </motion.div>

            <motion.h1
              initial={{ opacity: 0, y: 32 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.7, delay: 0.1 }}
              className="text-5xl md:text-6xl lg:text-[72px] font-black tracking-tight text-slate-900 leading-[1.02] mb-6"
            >
              Shop{" "}
              <span className="relative inline-block">
                <span className="bg-clip-text text-transparent"
                  style={{ backgroundImage: "linear-gradient(135deg, #0F766E 0%, #10B981 100%)" }}>
                  Smarter.
                </span>
                <motion.span
                  className="absolute -bottom-1 left-0 h-[3px] rounded-full w-full"
                  style={{ background: "linear-gradient(90deg, #0F766E, #10B981)" }}
                  initial={{ scaleX: 0, originX: 0 }} animate={{ scaleX: 1 }}
                  transition={{ duration: 1, delay: 0.8 }}
                />
              </span>
              <br />
              <span className="text-slate-700">Live Better.</span>
            </motion.h1>

            <motion.p
              initial={{ opacity: 0, y: 16 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.6, delay: 0.2 }}
              className="text-lg text-slate-500 max-w-lg mb-10 leading-relaxed"
            >
              Discover thousands of premium products with an experience built for speed, simplicity, and trust. Your next favourite thing is one click away.
            </motion.p>

            <motion.div
              initial={{ opacity: 0, y: 16 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.6, delay: 0.3 }}
              className="flex flex-col sm:flex-row gap-4 mb-14"
            >
              <motion.button
                whileHover={{ scale: 1.03, boxShadow: "0 20px 52px rgba(15,118,110,0.45)" }}
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
                whileHover={{ scale: 1.03, borderColor: "#0F766E" }}
                whileTap={{ scale: 0.97 }}
                onClick={() => document.getElementById("categories")?.scrollIntoView({ behavior: "smooth" })}
                className="flex items-center justify-center gap-2 px-8 py-4 rounded-2xl font-bold text-base border-2 border-slate-200 text-slate-700 hover:text-teal-700 transition-all bg-white"
              >
                Browse Categories
              </motion.button>
            </motion.div>

            {/* Stats */}
            <motion.div
              initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ duration: 0.6, delay: 0.5 }}
              className="flex items-center gap-8"
            >
              {[["270+", "Products"], ["10K+", "Customers"], ["4.9★", "Rating"]].map(([val, label]) => (
                <div key={label} className="text-center">
                  <div className="text-2xl font-black text-slate-900">{val}</div>
                  <div className="text-xs text-slate-500 font-medium mt-0.5">{label}</div>
                </div>
              ))}
              <div className="h-8 w-px bg-slate-200 hidden sm:block" />
              <div className="hidden sm:flex items-center gap-1.5">
                {[...Array(5)].map((_, i) => (
                  <Star key={i} size={14} fill="#F59E0B" color="#F59E0B" />
                ))}
              </div>
            </motion.div>
          </div>

          {/* Right — illustration */}
          <motion.div
            initial={{ opacity: 0, x: 50 }} animate={{ opacity: 1, x: 0 }} transition={{ duration: 0.9, delay: 0.2 }}
            className="relative hidden lg:flex items-center justify-center"
          >
            <div className="absolute w-[440px] h-[440px] rounded-full"
              style={{ background: "radial-gradient(circle, rgba(15,118,110,0.1) 0%, transparent 70%)" }} />
            <div className="absolute w-[540px] h-[540px] rounded-full border border-teal-100/50" />
            <div className="absolute w-[640px] h-[640px] rounded-full border border-teal-50/40" />

            <motion.div
              animate={{ y: [0, -14, 0] }} transition={{ duration: 5.5, repeat: Infinity, ease: "easeInOut" }}
              className="relative w-[380px] h-[380px]"
            >
              <ShoppingIllustration />
            </motion.div>

            {floatingCards.map(({ label, sub, icon: Icon, color, bg, delay, pos }, i) => (
              <motion.div
                key={label}
                initial={{ opacity: 0, scale: 0.8 }}
                animate={{ opacity: 1, scale: 1, y: [0, i % 2 === 0 ? -10 : 10, 0] }}
                transition={{
                  opacity: { delay: delay + 0.5, duration: 0.5 },
                  scale: { delay: delay + 0.5, duration: 0.5 },
                  y: { delay, duration: 3.5 + i * 0.5, repeat: Infinity, ease: "easeInOut" },
                }}
                className={`absolute ${pos} flex items-center gap-3 px-4 py-3 rounded-2xl`}
                style={{ background: "rgba(255,255,255,0.95)", backdropFilter: "blur(20px)", boxShadow: "0 8px 32px rgba(0,0,0,0.1)", border: "1px solid rgba(255,255,255,0.9)" }}
              >
                <div className="w-9 h-9 rounded-xl flex items-center justify-center" style={{ background: bg }}>
                  <Icon size={17} color={color} />
                </div>
                <div>
                  <div className="text-xs font-bold text-slate-800">{label}</div>
                  <div className="text-[10px] text-slate-500">{sub}</div>
                </div>
              </motion.div>
            ))}

            <motion.div
              initial={{ opacity: 0, scale: 0 }} animate={{ opacity: 1, scale: 1 }}
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
        initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ delay: 1.5 }}
        className="absolute bottom-8 left-1/2 -translate-x-1/2 flex flex-col items-center gap-2 cursor-pointer"
        onClick={() => document.getElementById("categories")?.scrollIntoView({ behavior: "smooth" })}
      >
        <span className="text-[10px] text-slate-400 font-semibold tracking-widest uppercase">Scroll</span>
        <motion.div animate={{ y: [0, 8, 0] }} transition={{ duration: 1.5, repeat: Infinity }}
          className="w-5 h-8 rounded-full border-2 border-slate-300 flex items-start justify-center pt-1.5">
          <div className="w-1 h-2 rounded-full bg-slate-400" />
        </motion.div>
      </motion.div>
    </section>
  );
}
