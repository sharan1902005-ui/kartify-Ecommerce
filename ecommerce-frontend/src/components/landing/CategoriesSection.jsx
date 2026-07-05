import { motion } from "framer-motion";
import { useNavigate } from "react-router-dom";
import { Cpu, Shirt, Home, Sparkles, BookOpen, Dumbbell, Watch } from "lucide-react";

const categories = [
  { icon: Cpu, label: "Electronics", color: "#0F766E", bg: "from-teal-500 to-cyan-400" },
  { icon: Shirt, label: "Fashion", color: "#7C3AED", bg: "from-violet-500 to-purple-400" },
  { icon: Home, label: "Home & Kitchen", color: "#D97706", bg: "from-amber-500 to-yellow-400" },
  { icon: Sparkles, label: "Beauty", color: "#DB2777", bg: "from-pink-500 to-rose-400" },
  { icon: BookOpen, label: "Books", color: "#2563EB", bg: "from-blue-500 to-indigo-400" },
  { icon: Dumbbell, label: "Sports", color: "#16A34A", bg: "from-green-500 to-emerald-400" },
  { icon: Watch, label: "Accessories", color: "#9333EA", bg: "from-purple-500 to-fuchsia-400" },
];

export default function CategoriesSection() {
  const navigate = useNavigate();

  return (
    <section className="py-24 bg-slate-50">
      <div className="max-w-6xl mx-auto px-6">
        <motion.div
          initial={{ opacity: 0, y: 20 }} whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }} transition={{ duration: 0.6 }}
          className="text-center mb-14"
        >
          <p className="text-sm font-semibold uppercase tracking-widest text-teal-600 mb-2">Categories</p>
          <h2 className="text-3xl md:text-4xl font-black text-slate-900">Shop by category</h2>
        </motion.div>

        <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-4 gap-5">
          {categories.map(({ icon: Icon, label, bg }, i) => (
            <motion.div
              key={label}
              initial={{ opacity: 0, scale: 0.9 }} whileInView={{ opacity: 1, scale: 1 }}
              viewport={{ once: true }} transition={{ duration: 0.4, delay: i * 0.07 }}
              whileHover={{ y: -8, scale: 1.03 }}
              onClick={() => navigate("/products")}
              className="relative rounded-2xl overflow-hidden cursor-pointer group"
              style={{ boxShadow: "0 4px 24px rgba(0,0,0,0.08)" }}
            >
              <div className={`bg-gradient-to-br ${bg} p-8 flex flex-col items-center gap-3`}>
                <div className="w-14 h-14 rounded-2xl bg-white/20 backdrop-blur-sm flex items-center justify-center">
                  <Icon size={26} color="white" strokeWidth={1.5} />
                </div>
                <span className="text-white font-bold text-sm text-center">{label}</span>
              </div>
              <div className="absolute inset-0 bg-black/0 group-hover:bg-black/10 transition-colors rounded-2xl" />
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}
