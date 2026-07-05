import { useEffect, useRef, useState } from "react";
import { motion, useInView } from "framer-motion";
import { Zap, ShieldCheck, Truck, Headphones } from "lucide-react";

function Counter({ target, suffix = "" }) {
  const [count, setCount] = useState(0);
  const ref = useRef(null);
  const inView = useInView(ref, { once: true });

  useEffect(() => {
    if (!inView) return;
    let start = 0;
    const step = Math.ceil(target / 60);
    const timer = setInterval(() => {
      start += step;
      if (start >= target) { setCount(target); clearInterval(timer); }
      else setCount(start);
    }, 20);
    return () => clearInterval(timer);
  }, [inView, target]);

  return <span ref={ref}>{count}{suffix}</span>;
}

const stats = [
  { value: 270, suffix: "+", label: "Products", icon: null },
  { icon: Zap, label: "Fast Checkout", badge: "Instant" },
  { icon: ShieldCheck, label: "Secure Payments", badge: "256-bit SSL" },
  { icon: Truck, label: "Free Delivery", badge: "On orders ₹499+" },
  { icon: Headphones, label: "24/7 Support", badge: "Always on" },
];

export default function TrustSection() {
  return (
    <section className="py-20 bg-white">
      <div className="max-w-6xl mx-auto px-6">
        <motion.div
          initial={{ opacity: 0, y: 20 }} whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }} transition={{ duration: 0.6 }}
          className="text-center mb-12"
        >
          <p className="text-sm font-semibold uppercase tracking-widest text-teal-600 mb-2">Why Kartify</p>
          <h2 className="text-3xl md:text-4xl font-black text-slate-900">Built for trust, designed for speed</h2>
        </motion.div>

        <div className="grid grid-cols-2 md:grid-cols-5 gap-4">
          {stats.map(({ value, suffix, label, icon: Icon, badge }, i) => (
            <motion.div
              key={label}
              initial={{ opacity: 0, y: 30 }} whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }} transition={{ duration: 0.5, delay: i * 0.1 }}
              className="rounded-2xl p-6 text-center flex flex-col items-center gap-2"
              style={{ background: "rgba(255,255,255,0.7)", border: "1px solid rgba(20,184,166,0.15)", boxShadow: "0 4px 24px rgba(15,118,110,0.07)" }}
            >
              {Icon ? (
                <div className="w-12 h-12 rounded-xl flex items-center justify-center mb-1"
                  style={{ background: "linear-gradient(135deg, rgba(15,118,110,0.1), rgba(16,185,129,0.1))" }}>
                  <Icon size={22} color="#0F766E" strokeWidth={1.5} />
                </div>
              ) : (
                <div className="text-4xl font-black text-slate-900">
                  <Counter target={value} suffix={suffix} />
                </div>
              )}
              <div className="text-sm font-semibold text-slate-700">{label}</div>
              {badge && <div className="text-xs text-teal-600 font-medium">{badge}</div>}
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}
