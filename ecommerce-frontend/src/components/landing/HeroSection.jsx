import { motion } from "framer-motion";
import { useNavigate } from "react-router-dom";
import { ShoppingBag, Smartphone, Package, CreditCard, ShoppingCart, ArrowRight, ChevronDown } from "lucide-react";

const floatingIcons = [
  { Icon: ShoppingBag, delay: 0, x: "8%", y: "22%", color: "#0F766E" },
  { Icon: Smartphone, delay: 0.4, x: "82%", y: "18%", color: "#14B8A6" },
  { Icon: Package, delay: 0.8, x: "78%", y: "62%", color: "#10B981" },
  { Icon: CreditCard, delay: 0.2, x: "12%", y: "68%", color: "#0F766E" },
  { Icon: ShoppingCart, delay: 0.6, x: "48%", y: "82%", color: "#14B8A6" },
];

export default function HeroSection() {
  const navigate = useNavigate();

  return (
    <section className="relative min-h-screen flex flex-col items-center justify-center overflow-hidden bg-white">
      <div className="absolute inset-0 bg-gradient-to-br from-teal-50 via-white to-emerald-50" />

      <motion.div
        className="absolute top-[-10%] left-[-10%] w-[500px] h-[500px] rounded-full opacity-30 pointer-events-none"
        style={{ background: "radial-gradient(circle, #14B8A6 0%, transparent 70%)" }}
        animate={{ scale: [1, 1.15, 1], x: [0, 30, 0] }}
        transition={{ duration: 8, repeat: Infinity, ease: "easeInOut" }}
      />
      <motion.div
        className="absolute bottom-[-10%] right-[-5%] w-[600px] h-[600px] rounded-full opacity-20 pointer-events-none"
        style={{ background: "radial-gradient(circle, #0F766E 0%, transparent 70%)" }}
        animate={{ scale: [1, 1.2, 1], x: [0, -20, 0] }}
        transition={{ duration: 10, repeat: Infinity, ease: "easeInOut", delay: 2 }}
      />

      {floatingIcons.map(({ Icon, delay, x, y, color }, i) => (
        <motion.div
          key={i}
          className="absolute hidden md:flex items-center justify-center w-14 h-14 rounded-2xl"
          style={{
            left: x, top: y,
            background: "rgba(255,255,255,0.65)",
            backdropFilter: "blur(12px)",
            border: "1px solid rgba(255,255,255,0.8)",
            boxShadow: "0 8px 32px rgba(15,118,110,0.12)",
          }}
          initial={{ opacity: 0, scale: 0.5 }}
          animate={{ opacity: 1, scale: 1, y: [0, -14, 0] }}
          transition={{
            opacity: { delay, duration: 0.6 },
            scale: { delay, duration: 0.6 },
            y: { delay, duration: 4, repeat: Infinity, ease: "easeInOut" },
          }}
        >
          <Icon size={22} color={color} strokeWidth={1.5} />
        </motion.div>
      ))}

      <div className="relative z-10 max-w-4xl mx-auto px-6 text-center">
        <motion.div
          initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.6 }}
          className="inline-flex items-center gap-2 px-4 py-2 rounded-full text-sm font-medium mb-8"
          style={{ background: "rgba(20,184,166,0.1)", border: "1px solid rgba(20,184,166,0.3)", color: "#0F766E" }}
        >
          <span className="w-2 h-2 rounded-full bg-teal-500 animate-pulse" />
          Shop Smarter. Live Better.
        </motion.div>

        <motion.h1
          initial={{ opacity: 0, y: 30 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.7, delay: 0.1 }}
          className="text-5xl md:text-7xl font-black tracking-tight text-slate-900 leading-[1.05] mb-6"
        >
          Shopping,{" "}
          <span className="bg-clip-text text-transparent" style={{ backgroundImage: "linear-gradient(135deg, #0F766E, #10B981)" }}>
            Reimagined.
          </span>
        </motion.h1>

        <motion.p
          initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.7, delay: 0.2 }}
          className="text-lg md:text-xl text-slate-500 max-w-2xl mx-auto mb-10 leading-relaxed"
        >
          Discover thousands of quality products with an elegant shopping experience built for speed, simplicity and trust.
        </motion.p>

        <motion.div
          initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.7, delay: 0.3 }}
          className="flex flex-col sm:flex-row gap-4 justify-center items-center"
        >
          <motion.button
            whileHover={{ scale: 1.04 }} whileTap={{ scale: 0.97 }}
            onClick={() => navigate("/products")}
            className="flex items-center gap-2 px-8 py-4 rounded-2xl text-white font-semibold text-base"
            style={{ background: "linear-gradient(135deg, #0F766E, #14B8A6)", boxShadow: "0 8px 30px rgba(15,118,110,0.35)" }}
          >
            Start Shopping <ArrowRight size={18} />
          </motion.button>
          <motion.button
            whileHover={{ scale: 1.04 }} whileTap={{ scale: 0.97 }}
            onClick={() => document.getElementById("features")?.scrollIntoView({ behavior: "smooth" })}
            className="flex items-center gap-2 px-8 py-4 rounded-2xl font-semibold text-base border border-slate-200 bg-white/70 backdrop-blur-sm text-slate-700 hover:border-teal-300 transition-colors"
          >
            Explore Features
          </motion.button>
        </motion.div>

        <motion.div
          initial={{ opacity: 0, y: 30 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.8, delay: 0.5 }}
          className="mt-16 grid grid-cols-3 gap-4 max-w-lg mx-auto"
        >
          {[{ label: "Products", value: "270+" }, { label: "Happy Customers", value: "10K+" }, { label: "Categories", value: "12+" }].map(({ label, value }) => (
            <div key={label} className="rounded-2xl p-4 text-center"
              style={{ background: "rgba(255,255,255,0.6)", backdropFilter: "blur(16px)", border: "1px solid rgba(255,255,255,0.8)", boxShadow: "0 4px 24px rgba(15,118,110,0.08)" }}>
              <div className="text-2xl font-black text-slate-900">{value}</div>
              <div className="text-xs text-slate-500 mt-0.5">{label}</div>
            </div>
          ))}
        </motion.div>
      </div>

      <motion.div
        className="absolute bottom-8 left-1/2 -translate-x-1/2 flex flex-col items-center gap-1 text-slate-400"
        animate={{ y: [0, 8, 0] }} transition={{ duration: 2, repeat: Infinity }}
      >
        <span className="text-xs font-medium">Scroll to explore</span>
        <ChevronDown size={16} />
      </motion.div>
    </section>
  );
}
