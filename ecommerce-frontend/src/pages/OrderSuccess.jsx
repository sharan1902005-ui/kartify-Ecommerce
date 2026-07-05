import { useEffect, useRef } from "react";
import { useNavigate, useLocation } from "react-router-dom";
import { motion } from "framer-motion";
import { Package, Calendar, CreditCard, ShoppingBag, ListOrdered, Truck, CheckCircle2 } from "lucide-react";

function formatPrice(price) {
  return new Intl.NumberFormat("en-IN", { maximumFractionDigits: 0 }).format(Number(price) || 0);
}

/* ── Confetti burst ─────────────────────────────────────────────────────── */
function Confetti() {
  const canvasRef = useRef(null);

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext("2d");
    canvas.width  = window.innerWidth;
    canvas.height = window.innerHeight;

    const colors = ["#0F766E", "#14B8A6", "#10B981", "#F59E0B", "#6366F1", "#EC4899"];
    const particles = Array.from({ length: 120 }, () => ({
      x: Math.random() * canvas.width,
      y: -10,
      r: Math.random() * 6 + 3,
      color: colors[Math.floor(Math.random() * colors.length)],
      vx: (Math.random() - 0.5) * 4,
      vy: Math.random() * 4 + 2,
      alpha: 1,
      rot: Math.random() * 360,
      rotV: (Math.random() - 0.5) * 6,
    }));

    let frame;
    const draw = () => {
      ctx.clearRect(0, 0, canvas.width, canvas.height);
      particles.forEach((p) => {
        p.x   += p.vx;
        p.y   += p.vy;
        p.rot += p.rotV;
        p.vy  += 0.08;
        p.alpha = Math.max(0, p.alpha - 0.008);
        ctx.save();
        ctx.globalAlpha = p.alpha;
        ctx.translate(p.x, p.y);
        ctx.rotate((p.rot * Math.PI) / 180);
        ctx.fillStyle = p.color;
        ctx.fillRect(-p.r / 2, -p.r / 2, p.r, p.r * 1.6);
        ctx.restore();
      });
      if (particles.some((p) => p.alpha > 0)) frame = requestAnimationFrame(draw);
    };
    draw();
    return () => cancelAnimationFrame(frame);
  }, []);

  return <canvas ref={canvasRef} className="fixed inset-0 pointer-events-none z-[300]" />;
}

const steps = [
  { icon: CheckCircle2, label: "Order Confirmed",  color: "#10B981", done: true },
  { icon: Package,      label: "Being Packed",     color: "#0F766E", done: true },
  { icon: Truck,        label: "Out for Delivery",  color: "#6366F1", done: false },
  { icon: ShoppingBag,  label: "Delivered",         color: "#F59E0B", done: false },
];

export default function OrderSuccess() {
  const navigate  = useNavigate();
  const location  = useLocation();
  const order     = location.state?.order;

  useEffect(() => {
    if (!order) navigate("/products", { replace: true });
  }, [order, navigate]);

  if (!order) return null;

  const orderDate    = new Date(order.date);
  const deliveryDate = new Date(orderDate);
  deliveryDate.setDate(deliveryDate.getDate() + 5);
  const fmt = { day: "numeric", month: "short", year: "numeric" };

  return (
    <div className="min-h-screen bg-gradient-to-br from-teal-50/60 via-white to-emerald-50/40 flex items-center justify-center px-4 py-12">
      <Confetti />

      <motion.div
        initial={{ opacity: 0, y: 32 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5, ease: "easeOut" }}
        className="w-full max-w-lg"
      >
        {/* Card */}
        <div className="bg-white rounded-3xl shadow-2xl shadow-teal-100/50 border border-slate-100 overflow-hidden">
          {/* Top gradient bar */}
          <div className="h-1.5 bg-gradient-to-r from-[#0F766E] via-[#14B8A6] to-[#10B981]" />

          <div className="p-8 sm:p-10">
            {/* Animated check */}
            <div className="flex justify-center mb-6">
              <motion.div
                initial={{ scale: 0, rotate: -180 }}
                animate={{ scale: 1, rotate: 0 }}
                transition={{ type: "spring", stiffness: 200, damping: 14, delay: 0.15 }}
                className="relative"
              >
                <div className="w-24 h-24 rounded-full flex items-center justify-center"
                  style={{ background: "linear-gradient(135deg, #0F766E, #14B8A6)", boxShadow: "0 16px 48px rgba(15,118,110,0.35)" }}>
                  <CheckCircle2 size={48} color="white" strokeWidth={2} />
                </div>
                {/* Pulse ring */}
                <motion.div
                  animate={{ scale: [1, 1.5, 1], opacity: [0.4, 0, 0.4] }}
                  transition={{ duration: 2, repeat: Infinity }}
                  className="absolute inset-0 rounded-full border-2 border-teal-400"
                />
              </motion.div>
            </div>

            <motion.div
              initial={{ opacity: 0, y: 12 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.35 }}
              className="text-center mb-8"
            >
              <div className="text-4xl mb-2">🎉</div>
              <h1 className="text-2xl font-black text-slate-900 mb-1">Order Successful!</h1>
              <p className="text-sm text-slate-500">Thank you for shopping with Kartify</p>
            </motion.div>

            {/* Order details */}
            <motion.div
              initial={{ opacity: 0, y: 12 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.45 }}
              className="bg-slate-50 rounded-2xl border border-slate-100 p-5 space-y-3.5 mb-6"
            >
              {[
                { icon: Package,     label: "Order ID",          value: order.id },
                { icon: Calendar,    label: "Order Date",        value: orderDate.toLocaleDateString("en-IN", fmt) },
                { icon: Truck,       label: "Estimated Delivery", value: deliveryDate.toLocaleDateString("en-IN", fmt) },
                { icon: CreditCard,  label: "Payment",           value: "Successful", green: true },
              ].map(({ icon: Icon, label, value, green }) => (
                <div key={label} className="flex items-center justify-between">
                  <span className="flex items-center gap-2 text-sm text-slate-500 font-medium">
                    <Icon size={14} /> {label}
                  </span>
                  <span className={`text-sm font-bold ${green ? "text-green-600" : "text-slate-800"}`}>{value}</span>
                </div>
              ))}
              <div className="border-t border-slate-200 pt-3.5 flex items-center justify-between">
                <span className="font-black text-slate-800">Total Paid</span>
                <span className="text-xl font-black text-[#0F766E]">₹{formatPrice(order.total)}</span>
              </div>
            </motion.div>

            {/* Delivery timeline */}
            <motion.div
              initial={{ opacity: 0, y: 12 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.55 }}
              className="mb-8"
            >
              <p className="text-xs font-bold text-slate-400 uppercase tracking-widest mb-4">Order Status</p>
              <div className="flex items-center justify-between relative">
                <div className="absolute top-4 left-4 right-4 h-0.5 bg-slate-100" />
                <div className="absolute top-4 left-4 h-0.5 bg-[#0F766E] transition-all" style={{ width: "35%" }} />
                {steps.map(({ icon: Icon, label, color, done }, i) => (
                  <div key={label} className="flex flex-col items-center gap-2 relative z-10">
                    <div
                      className="w-8 h-8 rounded-full flex items-center justify-center"
                      style={{ background: done ? color : "#F1F5F9", boxShadow: done ? `0 4px 12px ${color}40` : "none" }}
                    >
                      <Icon size={15} color={done ? "white" : "#CBD5E1"} />
                    </div>
                    <span className={`text-[10px] font-semibold text-center max-w-[56px] leading-tight ${done ? "text-slate-700" : "text-slate-400"}`}>
                      {label}
                    </span>
                  </div>
                ))}
              </div>
            </motion.div>

            {/* CTA buttons */}
            <motion.div
              initial={{ opacity: 0, y: 12 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.65 }}
              className="flex flex-col sm:flex-row gap-3"
            >
              <motion.button
                whileHover={{ scale: 1.02 }}
                whileTap={{ scale: 0.97 }}
                onClick={() => navigate("/products")}
                className="flex-1 flex items-center justify-center gap-2 py-3.5 rounded-2xl border-2 border-slate-200 text-slate-700 font-bold text-sm hover:border-teal-300 hover:text-teal-700 transition-colors"
              >
                <ShoppingBag size={16} /> Continue Shopping
              </motion.button>
              <motion.button
                whileHover={{ scale: 1.02, boxShadow: "0 12px 32px rgba(15,118,110,0.35)" }}
                whileTap={{ scale: 0.97 }}
                onClick={() => navigate("/orders")}
                className="flex-1 flex items-center justify-center gap-2 py-3.5 rounded-2xl text-white font-bold text-sm"
                style={{ background: "linear-gradient(135deg, #0F766E, #14B8A6)" }}
              >
                <ListOrdered size={16} /> View Orders
              </motion.button>
            </motion.div>
          </div>
        </div>
      </motion.div>
    </div>
  );
}
