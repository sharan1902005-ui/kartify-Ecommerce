import { useState, useEffect } from "react";
import { motion } from "framer-motion";
import { useNavigate } from "react-router-dom";
import { ShoppingBag, Menu, X } from "lucide-react";

export default function LandingNav() {
  const [scrolled, setScrolled] = useState(false);
  const [open, setOpen] = useState(false);
  const navigate = useNavigate();

  useEffect(() => {
    const handler = () => setScrolled(window.scrollY > 20);
    window.addEventListener("scroll", handler);
    return () => window.removeEventListener("scroll", handler);
  }, []);

  const scrollTo = (id) => { document.getElementById(id)?.scrollIntoView({ behavior: "smooth" }); setOpen(false); };

  return (
    <motion.nav
      initial={{ y: -60, opacity: 0 }} animate={{ y: 0, opacity: 1 }} transition={{ duration: 0.5 }}
      className="fixed top-0 left-0 right-0 z-50 transition-all duration-300"
      style={scrolled ? { background: "rgba(255,255,255,0.85)", backdropFilter: "blur(20px)", borderBottom: "1px solid rgba(20,184,166,0.12)", boxShadow: "0 4px 24px rgba(15,118,110,0.06)" } : {}}
    >
      <div className="max-w-6xl mx-auto px-6 h-16 flex items-center justify-between">
        <div className="flex items-center gap-2 cursor-pointer" onClick={() => window.scrollTo({ top: 0, behavior: "smooth" })}>
          <div className="w-8 h-8 rounded-xl flex items-center justify-center" style={{ background: "linear-gradient(135deg, #0F766E, #14B8A6)" }}>
            <ShoppingBag size={16} color="white" strokeWidth={1.8} />
          </div>
          <span className="font-black text-lg text-slate-900">Kartify</span>
        </div>

        {/* Desktop links */}
        <div className="hidden md:flex items-center gap-8 text-sm font-medium text-slate-600">
          <button onClick={() => scrollTo("features")} className="hover:text-teal-600 transition-colors">Features</button>
          <button onClick={() => scrollTo("categories")} className="hover:text-teal-600 transition-colors">Categories</button>
          <button onClick={() => navigate("/login")} className="hover:text-teal-600 transition-colors">Login</button>
          <motion.button
            whileHover={{ scale: 1.04 }} whileTap={{ scale: 0.97 }}
            onClick={() => navigate("/products")}
            className="px-5 py-2 rounded-xl text-white font-semibold text-sm"
            style={{ background: "linear-gradient(135deg, #0F766E, #14B8A6)" }}
          >
            Start Shopping
          </motion.button>
        </div>

        {/* Mobile menu toggle */}
        <button className="md:hidden" onClick={() => setOpen(o => !o)}>
          {open ? <X size={22} /> : <Menu size={22} />}
        </button>
      </div>

      {/* Mobile menu */}
      {open && (
        <motion.div
          initial={{ opacity: 0, y: -10 }} animate={{ opacity: 1, y: 0 }}
          className="md:hidden px-6 pb-4 flex flex-col gap-3 text-sm font-medium"
          style={{ background: "rgba(255,255,255,0.95)", backdropFilter: "blur(20px)" }}
        >
          <button onClick={() => scrollTo("features")} className="text-left py-2 text-slate-700 hover:text-teal-600">Features</button>
          <button onClick={() => scrollTo("categories")} className="text-left py-2 text-slate-700 hover:text-teal-600">Categories</button>
          <button onClick={() => { navigate("/login"); setOpen(false); }} className="text-left py-2 text-slate-700 hover:text-teal-600">Login</button>
          <button onClick={() => navigate("/products")} className="py-3 rounded-xl text-white font-semibold text-center"
            style={{ background: "linear-gradient(135deg, #0F766E, #14B8A6)" }}>
            Start Shopping
          </button>
        </motion.div>
      )}
    </motion.nav>
  );
}
