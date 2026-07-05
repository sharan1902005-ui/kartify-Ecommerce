import { motion } from "framer-motion";
import { Search, Truck, ShieldCheck, Heart, MapPin, Star } from "lucide-react";

const features = [
  { icon: Search, title: "Smart Search", desc: "Find exactly what you need with intelligent filters and instant results." },
  { icon: Truck, title: "Fast Delivery", desc: "Get your orders delivered to your doorstep in record time." },
  { icon: ShieldCheck, title: "Secure Payments", desc: "Every transaction is protected with bank-grade encryption." },
  { icon: Heart, title: "Wishlist", desc: "Save your favourite products and come back to them anytime." },
  { icon: MapPin, title: "Order Tracking", desc: "Real-time updates so you always know where your order is." },
  { icon: Star, title: "Product Reviews", desc: "Honest reviews from verified buyers to help you decide." },
];

export default function FeaturesSection() {
  return (
    <section id="features" className="py-24 bg-gradient-to-b from-white to-slate-50">
      <div className="max-w-6xl mx-auto px-6">
        <motion.div
          initial={{ opacity: 0, y: 20 }} whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }} transition={{ duration: 0.6 }}
          className="text-center mb-14"
        >
          <p className="text-sm font-semibold uppercase tracking-widest text-teal-600 mb-2">Features</p>
          <h2 className="text-3xl md:text-4xl font-black text-slate-900">Everything you need to shop smarter</h2>
        </motion.div>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
          {features.map(({ icon: Icon, title, desc }, i) => (
            <motion.div
              key={title}
              initial={{ opacity: 0, y: 30 }} whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }} transition={{ duration: 0.5, delay: i * 0.08 }}
              whileHover={{ y: -6, boxShadow: "0 20px 60px rgba(15,118,110,0.15)" }}
              className="rounded-2xl p-7 cursor-default transition-shadow"
              style={{ background: "rgba(255,255,255,0.8)", backdropFilter: "blur(12px)", border: "1px solid rgba(20,184,166,0.12)", boxShadow: "0 4px 24px rgba(15,118,110,0.06)" }}
            >
              <div className="w-12 h-12 rounded-xl flex items-center justify-center mb-5"
                style={{ background: "linear-gradient(135deg, #0F766E, #14B8A6)" }}>
                <Icon size={22} color="white" strokeWidth={1.8} />
              </div>
              <h3 className="text-lg font-bold text-slate-900 mb-2">{title}</h3>
              <p className="text-sm text-slate-500 leading-relaxed">{desc}</p>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}
