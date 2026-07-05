import { motion } from "framer-motion";
import { useNavigate } from "react-router-dom";
import { ArrowRight } from "lucide-react";

export default function CTASection() {
  const navigate = useNavigate();

  return (
    <section className="py-28 relative overflow-hidden">
      <div className="absolute inset-0" style={{ background: "linear-gradient(135deg, #0F766E 0%, #14B8A6 50%, #10B981 100%)" }} />
      <motion.div
        className="absolute top-[-20%] right-[-10%] w-[500px] h-[500px] rounded-full opacity-20 pointer-events-none"
        style={{ background: "radial-gradient(circle, white 0%, transparent 70%)" }}
        animate={{ scale: [1, 1.2, 1] }} transition={{ duration: 8, repeat: Infinity }}
      />
      <motion.div
        className="absolute bottom-[-20%] left-[-10%] w-[400px] h-[400px] rounded-full opacity-15 pointer-events-none"
        style={{ background: "radial-gradient(circle, white 0%, transparent 70%)" }}
        animate={{ scale: [1, 1.3, 1] }} transition={{ duration: 10, repeat: Infinity, delay: 2 }}
      />

      <div className="relative z-10 max-w-3xl mx-auto px-6 text-center">
        <motion.h2
          initial={{ opacity: 0, y: 30 }} whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }} transition={{ duration: 0.7 }}
          className="text-4xl md:text-6xl font-black text-white mb-6 leading-tight"
        >
          Ready to start shopping?
        </motion.h2>
        <motion.p
          initial={{ opacity: 0, y: 20 }} whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }} transition={{ duration: 0.7, delay: 0.1 }}
          className="text-lg text-white/80 mb-10"
        >
          Join thousands of happy customers and discover your next favourite product today.
        </motion.p>
        <motion.button
          initial={{ opacity: 0, scale: 0.9 }} whileInView={{ opacity: 1, scale: 1 }}
          viewport={{ once: true }} transition={{ duration: 0.5, delay: 0.2 }}
          whileHover={{ scale: 1.06 }} whileTap={{ scale: 0.97 }}
          onClick={() => navigate("/products")}
          className="inline-flex items-center gap-3 px-10 py-5 rounded-2xl bg-white font-bold text-lg"
          style={{ color: "#0F766E", boxShadow: "0 12px 40px rgba(0,0,0,0.2)" }}
        >
          Enter Kartify <ArrowRight size={22} />
        </motion.button>
      </div>
    </section>
  );
}
