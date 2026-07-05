import { useEffect, useRef, useState } from "react";
import { motion, useInView } from "framer-motion";
import { Package, Users, Star, Truck, ShieldCheck } from "lucide-react";

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

  return <span ref={ref}>{count.toLocaleString()}{suffix}</span>;
}

const stats = [
  { icon: Package,     value: 270,   suffix: "+",  label: "Products",         color: "#0F766E", bg: "#F0FDF4" },
  { icon: Users,       value: 10000, suffix: "+",  label: "Happy Customers",  color: "#6366F1", bg: "#EEF2FF" },
  { icon: Star,        value: 4.9,   suffix: "★",  label: "Avg Rating",       color: "#F59E0B", bg: "#FFFBEB", isFloat: true },
  { icon: Truck,       value: 99,    suffix: "%",  label: "On-time Delivery", color: "#10B981", bg: "#ECFDF5" },
  { icon: ShieldCheck, value: 100,   suffix: "%",  label: "Secure Payments",  color: "#3B82F6", bg: "#EFF6FF" },
];

export default function TrustSection() {
  return (
    <section className="py-16 bg-white border-y border-slate-100/80">
      <div className="max-w-7xl mx-auto px-6 lg:px-8">
        <div className="grid grid-cols-2 md:grid-cols-5 gap-4">
          {stats.map(({ icon: Icon, value, suffix, label, color, bg, isFloat }, i) => (
            <motion.div
              key={label}
              initial={{ opacity: 0, y: 24 }} whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }} transition={{ duration: 0.5, delay: i * 0.08 }}
              className="flex flex-col items-center text-center gap-3 p-6 rounded-2xl transition-all duration-300 hover:-translate-y-1"
              style={{ background: bg, border: `1px solid ${color}18` }}
            >
              <div className="w-11 h-11 rounded-xl flex items-center justify-center" style={{ background: `${color}18` }}>
                <Icon size={20} color={color} strokeWidth={1.5} />
              </div>
              <div className="text-3xl font-black text-slate-900">
                {isFloat ? value + suffix : <Counter target={value} suffix={suffix} />}
              </div>
              <div className="text-xs font-semibold text-slate-600 leading-tight">{label}</div>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}
