import { motion } from "framer-motion";
import { CheckCircle2, ShoppingBag, Truck, ShieldCheck, RotateCcw, Star } from "lucide-react";

const perks = [
  { icon: ShoppingBag, title: "Premium Products", desc: "Every product is curated for quality and value." },
  { icon: Truck, title: "Fast Shipping", desc: "Delivered to your door in days, not weeks." },
  { icon: ShieldCheck, title: "Secure Payments", desc: "256-bit SSL encryption on every transaction." },
  { icon: RotateCcw, title: "Easy Returns", desc: "Hassle-free 30-day return policy, no questions asked." },
  { icon: Star, title: "Verified Reviews", desc: "Honest ratings from real, verified buyers only." },
];

export default function WhyKartify() {
  return (
    <section className="py-28 bg-white">
      <div className="max-w-7xl mx-auto px-6 lg:px-8">
        <div className="grid lg:grid-cols-2 gap-20 items-center">

          {/* Left — visual */}
          <motion.div
            initial={{ opacity: 0, x: -40 }} whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }} transition={{ duration: 0.7 }}
            className="relative flex items-center justify-center"
          >
            {/* Rings */}
            <div className="absolute w-[380px] h-[380px] rounded-full border border-teal-100" />
            <div className="absolute w-[480px] h-[480px] rounded-full border border-teal-50" />

            {/* Center orb */}
            <div className="w-72 h-72 rounded-full" style={{ background: "linear-gradient(135deg, rgba(15,118,110,0.08), rgba(16,185,129,0.05))" }} />

            {/* Floating icon */}
            <motion.div
              animate={{ y: [0, -16, 0] }} transition={{ duration: 4, repeat: Infinity, ease: "easeInOut" }}
              className="absolute w-44 h-44 rounded-[2.5rem] flex items-center justify-center"
              style={{ background: "linear-gradient(135deg, #0F766E, #14B8A6)", boxShadow: "0 32px 80px rgba(15,118,110,0.4)" }}
            >
              <ShoppingBag size={72} color="white" strokeWidth={1} />
            </motion.div>

            {/* Floating stat cards */}
            <motion.div
              animate={{ y: [0, -8, 0] }} transition={{ duration: 3, repeat: Infinity, ease: "easeInOut", delay: 0.5 }}
              className="absolute -right-4 top-12 flex items-center gap-3 px-4 py-3 rounded-2xl"
              style={{ background: "white", boxShadow: "0 8px 32px rgba(0,0,0,0.1)", border: "1px solid rgba(0,0,0,0.06)" }}
            >
              <div className="w-9 h-9 rounded-xl bg-green-100 flex items-center justify-center">
                <CheckCircle2 size={18} color="#10B981" />
              </div>
              <div>
                <div className="text-xs font-black text-slate-800">10K+ Orders</div>
                <div className="text-[10px] text-slate-500">Delivered safely</div>
              </div>
            </motion.div>

            <motion.div
              animate={{ y: [0, 8, 0] }} transition={{ duration: 3.5, repeat: Infinity, ease: "easeInOut", delay: 1 }}
              className="absolute -left-4 bottom-16 flex items-center gap-3 px-4 py-3 rounded-2xl"
              style={{ background: "white", boxShadow: "0 8px 32px rgba(0,0,0,0.1)", border: "1px solid rgba(0,0,0,0.06)" }}
            >
              <div className="w-9 h-9 rounded-xl bg-amber-100 flex items-center justify-center">
                <Star size={18} color="#F59E0B" fill="#F59E0B" />
              </div>
              <div>
                <div className="text-xs font-black text-slate-800">4.9 / 5.0</div>
                <div className="text-[10px] text-slate-500">Average rating</div>
              </div>
            </motion.div>
          </motion.div>

          {/* Right — content */}
          <motion.div
            initial={{ opacity: 0, x: 40 }} whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }} transition={{ duration: 0.7 }}
          >
            <p className="text-sm font-bold uppercase tracking-widest text-teal-600 mb-4">Why Kartify</p>
            <h2 className="text-4xl md:text-5xl font-black text-slate-900 mb-6 leading-tight">
              The smarter way<br />to shop online
            </h2>
            <p className="text-slate-500 text-lg mb-10 leading-relaxed">
              We've built Kartify from the ground up to give you the best possible shopping experience — fast, safe, and delightful.
            </p>

            <div className="space-y-5">
              {perks.map(({ icon: Icon, title, desc }, i) => (
                <motion.div
                  key={title}
                  initial={{ opacity: 0, x: 20 }} whileInView={{ opacity: 1, x: 0 }}
                  viewport={{ once: true }} transition={{ duration: 0.4, delay: i * 0.1 }}
                  className="flex items-start gap-4 p-4 rounded-2xl hover:bg-teal-50/50 transition-colors"
                >
                  <div className="w-11 h-11 rounded-xl flex items-center justify-center shrink-0"
                    style={{ background: "linear-gradient(135deg, rgba(15,118,110,0.1), rgba(16,185,129,0.08))" }}>
                    <Icon size={20} color="#0F766E" strokeWidth={1.8} />
                  </div>
                  <div>
                    <div className="font-bold text-slate-800 mb-0.5">{title}</div>
                    <div className="text-sm text-slate-500">{desc}</div>
                  </div>
                </motion.div>
              ))}
            </div>
          </motion.div>
        </div>
      </div>
    </section>
  );
}
