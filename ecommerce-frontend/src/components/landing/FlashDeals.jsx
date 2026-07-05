import { useEffect, useState } from "react";
import { motion } from "framer-motion";
import { useNavigate } from "react-router-dom";
import { Zap, ArrowRight, Clock, ShoppingCart } from "lucide-react";
import api from "../../services/api";

function formatPrice(p) {
  return new Intl.NumberFormat("en-IN", { maximumFractionDigits: 0 }).format(Number(p) || 0);
}
function getOriginalPrice(price) {
  const p = Number(price);
  return Math.round(p * [1.4, 1.5, 1.45, 1.55, 1.6][Math.floor(p) % 5]);
}

function useCountdown(hours = 5) {
  const [time, setTime] = useState(hours * 3600);
  useEffect(() => {
    const t = setInterval(() => setTime((s) => (s > 0 ? s - 1 : 0)), 1000);
    return () => clearInterval(t);
  }, []);
  return {
    h: String(Math.floor(time / 3600)).padStart(2, "0"),
    m: String(Math.floor((time % 3600) / 60)).padStart(2, "0"),
    s: String(time % 60).padStart(2, "0"),
  };
}

function TimeBlock({ value, label }) {
  return (
    <div className="flex flex-col items-center">
      <motion.div
        key={value}
        initial={{ rotateX: -90, opacity: 0 }}
        animate={{ rotateX: 0, opacity: 1 }}
        transition={{ duration: 0.3 }}
        className="w-16 h-16 rounded-2xl flex items-center justify-center text-2xl font-black text-white"
        style={{ background: "rgba(255,255,255,0.18)", backdropFilter: "blur(10px)", border: "1px solid rgba(255,255,255,0.25)" }}
      >
        {value}
      </motion.div>
      <span className="text-[10px] text-white/60 font-semibold mt-1.5 uppercase tracking-widest">{label}</span>
    </div>
  );
}

function DealCard({ product, index }) {
  const navigate = useNavigate();
  const original = getOriginalPrice(product.price);
  const discount = Math.round(((original - product.price) / original) * 100);
  const sold = 30 + (Number(product.id ?? 1) % 60);

  return (
    <motion.div
      initial={{ opacity: 0, y: 30 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true }}
      transition={{ duration: 0.5, delay: index * 0.1 }}
      whileHover={{ y: -8, boxShadow: "0 28px 64px rgba(0,0,0,0.35)" }}
      onClick={() => navigate("/products")}
      className="rounded-3xl overflow-hidden cursor-pointer group"
      style={{ background: "rgba(255,255,255,0.08)", backdropFilter: "blur(20px)", border: "1px solid rgba(255,255,255,0.15)" }}
    >
      {/* Image */}
      <div className="relative h-48 flex items-center justify-center p-5 overflow-hidden"
        style={{ background: "rgba(255,255,255,0.06)" }}>
        <span className="absolute top-3 left-3 bg-red-500 text-white text-[11px] font-black px-2.5 py-1 rounded-lg z-10 flex items-center gap-1">
          <Zap size={10} fill="white" /> {discount}% OFF
        </span>
        <motion.img
          src={product.imageUrl}
          alt={product.name}
          className="h-full w-full object-contain transition-transform duration-500 group-hover:scale-110"
          onError={(e) => {
            e.currentTarget.src = "data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' width='160' height='160'%3E%3Crect width='160' height='160' fill='%23ffffff10'/%3E%3Ctext x='50%25' y='50%25' dominant-baseline='middle' text-anchor='middle' font-size='40' fill='%23ffffff40'%3E📦%3C/text%3E%3C/svg%3E";
          }}
        />
      </div>

      {/* Content */}
      <div className="p-5">
        <p className="text-white/50 text-[11px] font-semibold uppercase tracking-wide mb-1">
          {product.category?.split(/[>|]/)[0]?.trim() || "General"}
        </p>
        <h3 className="text-white font-bold text-sm line-clamp-2 mb-3">{product.name}</h3>

        {/* Progress bar */}
        <div className="mb-3">
          <div className="flex justify-between text-[10px] text-white/50 mb-1.5">
            <span>Sold: {sold}%</span>
            <span>{100 - sold} left</span>
          </div>
          <div className="h-1.5 rounded-full bg-white/10 overflow-hidden">
            <motion.div
              initial={{ width: 0 }}
              whileInView={{ width: `${sold}%` }}
              viewport={{ once: true }}
              transition={{ duration: 1, delay: index * 0.1 }}
              className="h-full rounded-full"
              style={{ background: "linear-gradient(90deg, #FCD34D, #F59E0B)" }}
            />
          </div>
        </div>

        <div className="flex items-center justify-between">
          <div>
            <span className="text-white font-black text-xl">₹{formatPrice(product.price)}</span>
            <span className="text-white/40 text-xs line-through ml-2">₹{formatPrice(original)}</span>
          </div>
          <motion.button
            whileHover={{ scale: 1.1 }}
            whileTap={{ scale: 0.95 }}
            onClick={(e) => { e.stopPropagation(); navigate("/products"); }}
            className="w-9 h-9 rounded-xl flex items-center justify-center"
            style={{ background: "rgba(255,255,255,0.2)", border: "1px solid rgba(255,255,255,0.3)" }}
          >
            <ShoppingCart size={15} color="white" />
          </motion.button>
        </div>
      </div>
    </motion.div>
  );
}

export default function FlashDeals() {
  const [deals, setDeals] = useState([]);
  const { h, m, s } = useCountdown(5);
  const navigate = useNavigate();

  useEffect(() => {
    api.get("/products")
      .then((res) => {
        const all = Array.isArray(res.data) ? res.data : [];
        setDeals([...all].sort((a, b) => Number(b.price) - Number(a.price)).slice(0, 4));
      })
      .catch(() => setDeals([]));
  }, []);

  return (
    <section id="deals" className="py-28 relative overflow-hidden">
      <div className="absolute inset-0" style={{ background: "linear-gradient(135deg, #0C4A45 0%, #0F766E 45%, #115E59 100%)" }} />
      <div className="absolute top-0 right-0 w-[700px] h-[700px] rounded-full opacity-[0.08] pointer-events-none"
        style={{ background: "radial-gradient(circle, white 0%, transparent 70%)", transform: "translate(30%, -30%)" }} />
      <div className="absolute bottom-0 left-0 w-[500px] h-[500px] rounded-full opacity-[0.06] pointer-events-none"
        style={{ background: "radial-gradient(circle, #14B8A6 0%, transparent 70%)", transform: "translate(-30%, 30%)" }} />
      {/* Dot pattern */}
      <div className="absolute inset-0 opacity-[0.04] pointer-events-none"
        style={{ backgroundImage: "radial-gradient(circle, white 1px, transparent 1px)", backgroundSize: "32px 32px" }} />

      <div className="relative z-10 max-w-7xl mx-auto px-6 lg:px-8">
        {/* Header */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
          className="flex flex-col md:flex-row md:items-center justify-between gap-8 mb-14"
        >
          <div>
            <div className="flex items-center gap-2 mb-3">
              <Zap size={20} color="#FCD34D" fill="#FCD34D" />
              <p className="text-sm font-bold uppercase tracking-widest text-yellow-300">Flash Deals</p>
            </div>
            <h2 className="text-4xl md:text-5xl font-black text-white">Deals end in</h2>
            <p className="text-white/50 mt-2">Grab them before they're gone!</p>
          </div>

          {/* Countdown */}
          <div className="flex items-center gap-3">
            <Clock size={18} color="rgba(255,255,255,0.4)" />
            <div className="flex items-center gap-2">
              <TimeBlock value={h} label="hrs" />
              <span className="text-white/40 text-2xl font-black pb-5">:</span>
              <TimeBlock value={m} label="min" />
              <span className="text-white/40 text-2xl font-black pb-5">:</span>
              <TimeBlock value={s} label="sec" />
            </div>
          </div>
        </motion.div>

        {/* Deal cards */}
        <div className="grid grid-cols-2 lg:grid-cols-4 gap-5 mb-12">
          {deals.map((product, i) => (
            <DealCard key={product.id} product={product} index={i} />
          ))}
        </div>

        <div className="text-center">
          <motion.button
            whileHover={{ scale: 1.04, boxShadow: "0 16px 48px rgba(0,0,0,0.3)" }}
            whileTap={{ scale: 0.97 }}
            onClick={() => navigate("/products")}
            className="inline-flex items-center gap-2.5 px-10 py-4 rounded-2xl font-bold text-base bg-white"
            style={{ color: "#0F766E", boxShadow: "0 8px 32px rgba(0,0,0,0.2)" }}
          >
            Shop All Deals <ArrowRight size={18} />
          </motion.button>
        </div>
      </div>
    </section>
  );
}
