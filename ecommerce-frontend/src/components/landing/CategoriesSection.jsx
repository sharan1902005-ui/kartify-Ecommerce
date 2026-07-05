import { motion } from "framer-motion";
import { useNavigate } from "react-router-dom";
import { Cpu, Home, BookOpen, Dumbbell, Watch, Sparkles } from "lucide-react";

const categories = [
  { icon: Cpu, label: "Electronics", sub: "Phones, Laptops & more", from: "#0F766E", to: "#14B8A6", shadow: "rgba(15,118,110,0.4)" },
  { icon: Home, label: "Home & Kitchen", sub: "Appliances & Decor", from: "#F59E0B", to: "#F97316", shadow: "rgba(245,158,11,0.4)" },
  { icon: BookOpen, label: "Books", sub: "Fiction, Non-fiction & more", from: "#6366F1", to: "#8B5CF6", shadow: "rgba(99,102,241,0.4)" },
  { icon: Dumbbell, label: "Sports", sub: "Fitness & Outdoor", from: "#10B981", to: "#059669", shadow: "rgba(16,185,129,0.4)" },
  { icon: Watch, label: "Accessories", sub: "Bags, Watches & more", from: "#8B5CF6", to: "#EC4899", shadow: "rgba(139,92,246,0.4)" },
  { icon: Sparkles, label: "Beauty", sub: "Skincare & Wellness", from: "#EC4899", to: "#F43F5E", shadow: "rgba(244,63,94,0.4)" },
];

export default function CategoriesSection() {
  const navigate = useNavigate();

  return (
    <section id="categories" className="py-28 bg-slate-50">
      <div className="max-w-7xl mx-auto px-6 lg:px-8">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
          className="text-center mb-16"
        >
          <p className="text-sm font-bold uppercase tracking-widest text-teal-600 mb-3">Categories</p>
          <h2 className="text-4xl md:text-5xl font-black text-slate-900 mb-4">Shop by category</h2>
          <p className="text-slate-500 max-w-md mx-auto">Everything you need, organized beautifully.</p>
        </motion.div>

        <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-6 gap-5">
          {categories.map(({ icon: Icon, label, sub, from, to, shadow }, i) => (
            <motion.div
              key={label}
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5, delay: i * 0.07 }}
              whileHover={{ y: -12, boxShadow: `0 28px 64px ${shadow}` }}
              onClick={() => navigate("/products")}
              className="group cursor-pointer rounded-3xl overflow-hidden"
              style={{ boxShadow: "0 4px 20px rgba(0,0,0,0.08)" }}
            >
              <div
                className="p-7 flex flex-col items-center gap-4 relative overflow-hidden"
                style={{ background: `linear-gradient(135deg, ${from}, ${to})` }}
              >
                <div className="absolute inset-0 bg-white/0 group-hover:bg-white/10 transition-colors duration-300" />
                {/* Shine effect */}
                <div
                  className="absolute top-0 left-0 w-full h-1/2 opacity-20"
                  style={{ background: "linear-gradient(180deg, white, transparent)" }}
                />
                <motion.div
                  whileHover={{ rotate: 15, scale: 1.15 }}
                  transition={{ type: "spring", stiffness: 300 }}
                  className="w-14 h-14 rounded-2xl bg-white/25 backdrop-blur-sm flex items-center justify-center relative z-10"
                >
                  <Icon size={26} color="white" strokeWidth={1.5} />
                </motion.div>
                <div className="text-center relative z-10">
                  <div className="text-white font-bold text-sm">{label}</div>
                  <div className="text-white/70 text-[11px] mt-0.5 hidden md:block">{sub}</div>
                </div>
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}
