import { motion } from "framer-motion";
import { CheckCircle2, ShoppingBag } from "lucide-react";

const perks = [
  "Premium Products — curated for quality",
  "Fast Shipping — delivered in days, not weeks",
  "Secure Payments — 256-bit SSL encryption",
  "Easy Returns — hassle-free 30-day policy",
  "Trusted Reviews — from verified buyers only",
];

export default function WhyKartify() {
  return (
    <section className="py-24 bg-white">
      <div className="max-w-6xl mx-auto px-6">
        <div className="grid md:grid-cols-2 gap-16 items-center">
          {/* Illustration */}
          <motion.div
            initial={{ opacity: 0, x: -40 }} whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }} transition={{ duration: 0.7 }}
            className="relative flex items-center justify-center"
          >
            <div className="w-72 h-72 rounded-full"
              style={{ background: "linear-gradient(135deg, rgba(15,118,110,0.12), rgba(16,185,129,0.08))" }} />
            <motion.div
              className="absolute flex items-center justify-center w-40 h-40 rounded-3xl"
              style={{ background: "linear-gradient(135deg, #0F766E, #14B8A6)", boxShadow: "0 20px 60px rgba(15,118,110,0.35)" }}
              animate={{ y: [0, -12, 0] }} transition={{ duration: 4, repeat: Infinity, ease: "easeInOut" }}
            >
              <ShoppingBag size={60} color="white" strokeWidth={1.2} />
            </motion.div>
            {/* Decorative rings */}
            <div className="absolute w-80 h-80 rounded-full border border-teal-100" />
            <div className="absolute w-96 h-96 rounded-full border border-teal-50" />
          </motion.div>

          {/* Checklist */}
          <motion.div
            initial={{ opacity: 0, x: 40 }} whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }} transition={{ duration: 0.7 }}
          >
            <p className="text-sm font-semibold uppercase tracking-widest text-teal-600 mb-3">Why Kartify</p>
            <h2 className="text-3xl md:text-4xl font-black text-slate-900 mb-8 leading-tight">
              The smarter way<br />to shop online
            </h2>
            <ul className="space-y-4">
              {perks.map((perk, i) => (
                <motion.li
                  key={perk}
                  initial={{ opacity: 0, x: 20 }} whileInView={{ opacity: 1, x: 0 }}
                  viewport={{ once: true }} transition={{ duration: 0.4, delay: i * 0.1 }}
                  className="flex items-start gap-3"
                >
                  <CheckCircle2 size={22} color="#10B981" className="mt-0.5 shrink-0" strokeWidth={2} />
                  <span className="text-slate-700 font-medium">{perk}</span>
                </motion.li>
              ))}
            </ul>
          </motion.div>
        </div>
      </div>
    </section>
  );
}
