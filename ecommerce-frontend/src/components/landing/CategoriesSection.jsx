import { motion } from "framer-motion";
import { useNavigate } from "react-router-dom";
import { Cpu, Home, BookOpen, Dumbbell, Watch, Sparkles, ArrowRight } from "lucide-react";

const categories = [
  { icon: Cpu,      label: "Electronics",    sub: "Phones, Laptops & more",  from: "#0F766E", to: "#14B8A6", light: "#F0FDF4", shadow: "rgba(15,118,110,0.35)" },
  { icon: Home,     label: "Home & Kitchen", sub: "Appliances & Decor",       from: "#F59E0B", to: "#F97316", light: "#FFFBEB", shadow: "rgba(245,158,11,0.35)" },
  { icon: BookOpen, label: "Books",          sub: "Fiction, Non-fiction",     from: "#6366F1", to: "#8B5CF6", light: "#EEF2FF", shadow: "rgba(99,102,241,0.35)" },
  { icon: Dumbbell, label: "Sports",         sub: "Fitness & Outdoor",        from: "#10B981", to: "#059669", light: "#ECFDF5", shadow: "rgba(16,185,129,0.35)" },
  { icon: Watch,    label: "Accessories",    sub: "Bags, Watches & more",     from: "#8B5CF6", to: "#EC4899", light: "#F5F3FF", shadow: "rgba(139,92,246,0.35)" },
  { icon: Sparkles, label: "Beauty",         sub: "Skincare & Wellness",      from: "#EC4899", to: "#F43F5E", light: "#FDF2F8", shadow: "rgba(244,63,94,0.35)" },
];

export default function CategoriesSection() {
  const navigate = useNavigate();

  return (
    <section id="categories" className="py-28 bg-slate-50/80">
      <div className="max-w-7xl mx-auto px-6 lg:px-8">
        <motion.div
          initial={{ opacity: 0, y: 24 }} whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }} transition={{ duration: 0.6 }}
          className="flex flex-col md:flex-row md:items-end justify-between gap-4 mb-14"
        >
          <div>
            <p className="text-sm font-bold uppercase tracking-widest text-teal-600 mb-3">Categories</p>
            <h2 className="text-4xl md:text-5xl font-black text-slate-900">Shop by category</h2>
            <p className="text-slate-500 mt-2 max-w-sm">Everything you need, organized beautifully.</p>
          </div>
          <motion.button
            whileHover={{ scale: 1.03 }} whileTap={{ scale: 0.97 }}
            onClick={() => navigate("/products")}
            className="flex items-center gap-2 px-6 py-3 rounded-2xl font-bold text-sm border-2 border-teal-600 text-teal-600 hover:bg-teal-600 hover:text-white transition-all shrink-0"
          >
            View All <ArrowRight size={16} />
          </motion.button>
        </motion.div>

        <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-6 gap-4">
          {categories.map(({ icon: Icon, label, sub, from, to, light, shadow }, i) => (
            <motion.div
              key={label}
              initial={{ opacity: 0, y: 32 }} whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }} transition={{ duration: 0.5, delay: i * 0.07 }}
              whileHover={{ y: -10, boxShadow: `0 24px 56px ${shadow}` }}
              onClick={() => navigate("/products")}
              className="group cursor-pointer rounded-3xl overflow-hidden"
              style={{ boxShadow: "0 2px 16px rgba(0,0,0,0.07)", transition: "box-shadow 0.3s ease, transform 0.3s ease" }}
            >
              {/* Gradient card */}
              <div className="relative p-7 flex flex-col items-center gap-4 overflow-hidden"
                style={{ background: `linear-gradient(145deg, ${from}, ${to})` }}>
                {/* Shine */}
                <div className="absolute top-0 left-0 w-full h-1/2 opacity-[0.18]"
                  style={{ background: "linear-gradient(180deg, white, transparent)" }} />
                {/* Hover overlay */}
                <div className="absolute inset-0 bg-white/0 group-hover:bg-white/10 transition-colors duration-300" />
                {/* Animated border glow */}
                <div className="absolute inset-0 rounded-3xl opacity-0 group-hover:opacity-100 transition-opacity duration-300"
                  style={{ boxShadow: `inset 0 0 0 1.5px rgba(255,255,255,0.4)` }} />

                <motion.div
                  whileHover={{ rotate: 12, scale: 1.12 }}
                  transition={{ type: "spring", stiffness: 300, damping: 20 }}
                  className="w-14 h-14 rounded-2xl flex items-center justify-center relative z-10"
                  style={{ background: "rgba(255,255,255,0.22)", backdropFilter: "blur(8px)" }}
                >
                  <Icon size={26} color="white" strokeWidth={1.5} />
                </motion.div>

                <div className="text-center relative z-10">
                  <div className="text-white font-bold text-sm leading-tight">{label}</div>
                  <div className="text-white/65 text-[11px] mt-1 hidden md:block leading-tight">{sub}</div>
                </div>
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}
