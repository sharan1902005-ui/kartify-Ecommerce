import { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { useNavigate } from "react-router-dom";
import { ShoppingBag, Menu, X, Zap } from "lucide-react";

const NAV_LINKS = [
  { label: "Categories", id: "categories" },
  { label: "Trending", id: "trending" },
  { label: "Deals", id: "deals" },
  { label: "Reviews", id: "reviews" },
];

export default function LandingNav() {
  const [scrolled, setScrolled] = useState(false);
  const [open, setOpen] = useState(false);
  const navigate = useNavigate();

  useEffect(() => {
    const handler = () => setScrolled(window.scrollY > 20);
    window.addEventListener("scroll", handler, { passive: true });
    return () => window.removeEventListener("scroll", handler);
  }, []);

  const scrollTo = (id) => {
    document.getElementById(id)?.scrollIntoView({ behavior: "smooth" });
    setOpen(false);
  };

  return (
    <motion.nav
      initial={{ y: -60, opacity: 0 }}
      animate={{ y: 0, opacity: 1 }}
      transition={{ duration: 0.5 }}
      className="fixed top-0 left-0 right-0 z-50 transition-all duration-300"
      style={
        scrolled
          ? {
              background: "rgba(255,255,255,0.92)",
              backdropFilter: "blur(24px)",
              borderBottom: "1px solid rgba(15,118,110,0.1)",
              boxShadow: "0 4px 32px rgba(15,118,110,0.08)",
            }
          : {}
      }
    >
      <div className="max-w-7xl mx-auto px-6 h-16 flex items-center justify-between">
        {/* Logo */}
        <div
          className="flex items-center gap-2 cursor-pointer select-none"
          onClick={() => window.scrollTo({ top: 0, behavior: "smooth" })}
        >
          <div
            className="w-9 h-9 rounded-xl flex items-center justify-center"
            style={{ background: "linear-gradient(135deg, #0F766E, #14B8A6)" }}
          >
            <Zap size={18} color="white" fill="white" />
          </div>
          <span className="font-black text-xl text-slate-900 tracking-tight">Kartify</span>
        </div>

        {/* Desktop links */}
        <div className="hidden md:flex items-center gap-1 text-sm font-semibold text-slate-600">
          {NAV_LINKS.map(({ label, id }) => (
            <button
              key={id}
              onClick={() => scrollTo(id)}
              className="px-4 py-2 rounded-xl hover:bg-teal-50 hover:text-teal-700 transition-colors"
            >
              {label}
            </button>
          ))}
          <button
            onClick={() => navigate("/login")}
            className="px-4 py-2 rounded-xl hover:bg-slate-100 transition-colors ml-2"
          >
            Login
          </button>
          <motion.button
            whileHover={{ scale: 1.04, boxShadow: "0 8px 24px rgba(15,118,110,0.35)" }}
            whileTap={{ scale: 0.97 }}
            onClick={() => navigate("/products")}
            className="ml-2 px-5 py-2.5 rounded-xl text-white font-bold text-sm flex items-center gap-2"
            style={{ background: "linear-gradient(135deg, #0F766E, #14B8A6)" }}
          >
            <ShoppingBag size={15} />
            Shop Now
          </motion.button>
        </div>

        {/* Mobile toggle */}
        <button
          className="md:hidden p-2 rounded-xl hover:bg-slate-100 transition-colors"
          onClick={() => setOpen((o) => !o)}
        >
          {open ? <X size={22} /> : <Menu size={22} />}
        </button>
      </div>

      {/* Mobile menu */}
      <AnimatePresence>
        {open && (
          <motion.div
            initial={{ opacity: 0, height: 0 }}
            animate={{ opacity: 1, height: "auto" }}
            exit={{ opacity: 0, height: 0 }}
            transition={{ duration: 0.2 }}
            className="md:hidden overflow-hidden border-t border-slate-100"
            style={{ background: "rgba(255,255,255,0.97)", backdropFilter: "blur(20px)" }}
          >
            <div className="px-6 py-4 flex flex-col gap-1">
              {NAV_LINKS.map(({ label, id }) => (
                <button
                  key={id}
                  onClick={() => scrollTo(id)}
                  className="text-left py-2.5 px-3 rounded-xl text-slate-700 font-semibold hover:bg-teal-50 hover:text-teal-700 transition-colors"
                >
                  {label}
                </button>
              ))}
              <button
                onClick={() => { navigate("/login"); setOpen(false); }}
                className="text-left py-2.5 px-3 rounded-xl text-slate-700 font-semibold hover:bg-slate-100 transition-colors"
              >
                Login
              </button>
              <button
                onClick={() => navigate("/products")}
                className="mt-2 py-3 rounded-xl text-white font-bold text-center"
                style={{ background: "linear-gradient(135deg, #0F766E, #14B8A6)" }}
              >
                Start Shopping
              </button>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </motion.nav>
  );
}
