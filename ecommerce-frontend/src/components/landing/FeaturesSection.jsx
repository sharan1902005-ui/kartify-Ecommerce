import { motion } from "framer-motion";
import { Search, Truck, ShieldCheck, Heart, MapPin, Star, Zap, Headphones } from "lucide-react";

const features = [
  { icon: Search,      title: "Smart Search",     desc: "Find exactly what you need with intelligent filters and instant results.",          color: "#0F766E" },
  { icon: Truck,       title: "Fast Delivery",    desc: "Get your orders delivered to your doorstep in record time. Free on orders ₹499+.", color: "#6366F1" },
  { icon: ShieldCheck, title: "Secure Payments",  desc: "Every transaction is protected with bank-grade 256-bit SSL encryption.",           color: "#10B981" },
  { icon: Heart,       title: "Wishlist",         desc: "Save your favourite products and come back to them anytime.",                      color: "#EF4444" },
  { icon: MapPin,      title: "Order Tracking",   desc: "Real-time updates so you always know exactly where your order is.",               color: "#F59E0B" },
  { icon: Star,        title: "Verified Reviews", desc: "Honest reviews from verified buyers only — no fake ratings.",                     color: "#8B5CF6" },
  { icon: Zap,         title: "Instant Checkout", desc: "One-click checkout with saved addresses and payment methods.",                    color: "#14B8A6" },
  { icon: Headphones,  title: "24/7 Support",     desc: "Our support team is always here to help you with any issue.",                     color: "#EC4899" },
];

export default function FeaturesSection() {
  return (
    <section id="features" className="py-28 bg-white">
      <div className="max-w-7xl mx-auto px-6 lg:px-8">
        <motion.div
          initial={{ opacity: 0, y: 24 }} whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }} transition={{ duration: 0.6 }}
          className="text-center mb-16"
        >
          <p className="text-sm font-bold uppercase tracking-widest text-teal-600 mb-3">Features</p>
          <h2 className="text-4xl md:text-5xl font-black text-slate-900 mb-4">Everything you need</h2>
          <p className="text-slate-500 max-w-md mx-auto text-lg leading-relaxed">
            Built for speed, simplicity, and a shopping experience you'll love.
          </p>
        </motion.div>

        <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
          {features.map(({ icon: Icon, title, desc, color }, i) => (
            <motion.div
              key={title}
              initial={{ opacity: 0, y: 28 }} whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }} transition={{ duration: 0.5, delay: i * 0.06 }}
              whileHover={{ y: -8, transition: { duration: 0.25 } }}
              className="p-6 rounded-3xl cursor-default"
              style={{
                background: `${color}06`,
                border: `1px solid ${color}18`,
                boxShadow: `0 2px 16px ${color}08`,
                transition: "box-shadow 0.3s ease",
              }}
              onMouseEnter={(e) => { e.currentTarget.style.boxShadow = `0 20px 48px ${color}18`; }}
              onMouseLeave={(e) => { e.currentTarget.style.boxShadow = `0 2px 16px ${color}08`; }}
            >
              <motion.div
                whileHover={{ rotate: 8, scale: 1.1 }}
                className="w-12 h-12 rounded-2xl flex items-center justify-center mb-5"
                style={{ background: `${color}14` }}
              >
                <Icon size={21} color={color} strokeWidth={1.8} />
              </motion.div>
              <h3 className="text-base font-bold text-slate-900 mb-2">{title}</h3>
              <p className="text-sm text-slate-500 leading-relaxed">{desc}</p>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}
