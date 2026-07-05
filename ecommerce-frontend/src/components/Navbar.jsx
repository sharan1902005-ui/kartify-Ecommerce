import { useState, useEffect, useRef } from "react";
import { ShoppingCart, Heart, User, Search, Menu, X, ChevronDown, Zap } from "lucide-react";
import { motion, AnimatePresence } from "framer-motion";

const CATEGORIES = [
  "All Products", "Electronics", "Home & Kitchen",
  "Books", "Sports", "Accessories",
];

export default function Navbar({ cartCount = 0, onSearch, onCategorySelect, selectedCategory }) {
  const [searchVal, setSearchVal] = useState("");
  const [mobileOpen, setMobileOpen] = useState(false);
  const [catOpen, setCatOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);
  const catRef = useRef(null);

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 10);
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  useEffect(() => {
    const handler = (e) => {
      if (catRef.current && !catRef.current.contains(e.target)) setCatOpen(false);
    };
    document.addEventListener("mousedown", handler);
    return () => document.removeEventListener("mousedown", handler);
  }, []);

  const handleSearch = (val) => {
    setSearchVal(val);
    onSearch?.(val);
  };

  const handleCat = (cat) => {
    onCategorySelect?.(cat);
    setCatOpen(false);
    setMobileOpen(false);
  };

  return (
    <header className={`sticky top-0 z-50 w-full transition-all duration-300 ${scrolled ? "bg-white shadow-lg" : "bg-white border-b border-slate-100"}`}>
      {/* Promo bar */}
      <div className="bg-[#0F766E] text-white text-xs text-center py-1.5 font-medium tracking-wide">
        🎉 Free shipping on orders above ₹499 &nbsp;|&nbsp; Use code <span className="font-bold">KARTIFY10</span> for 10% off
      </div>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center gap-4 h-16">

          {/* Logo */}
          <a href="/products" className="flex items-center gap-2 shrink-0">
            <div className="w-8 h-8 rounded-lg bg-[#0F766E] flex items-center justify-center">
              <Zap size={18} className="text-white" fill="white" />
            </div>
            <span className="text-xl font-black text-[#0F766E] tracking-tight">Kartify</span>
          </a>

          {/* Categories dropdown */}
          <div className="relative hidden md:block shrink-0" ref={catRef}>
            <button
              onClick={() => setCatOpen((v) => !v)}
              className="flex items-center gap-1.5 text-sm font-semibold text-slate-700 hover:text-[#0F766E] transition-colors px-3 py-2 rounded-lg hover:bg-teal-50"
            >
              <Menu size={16} />
              Categories
              <ChevronDown size={14} className={`transition-transform duration-200 ${catOpen ? "rotate-180" : ""}`} />
            </button>
            <AnimatePresence>
              {catOpen && (
                <motion.div
                  initial={{ opacity: 0, y: 8, scale: 0.97 }}
                  animate={{ opacity: 1, y: 0, scale: 1 }}
                  exit={{ opacity: 0, y: 8, scale: 0.97 }}
                  transition={{ duration: 0.15 }}
                  className="absolute top-full left-0 mt-2 w-52 bg-white rounded-2xl shadow-xl border border-slate-100 py-2 z-50"
                >
                  {CATEGORIES.map((cat) => (
                    <button
                      key={cat}
                      onClick={() => handleCat(cat)}
                      className={`w-full text-left px-4 py-2.5 text-sm font-medium transition-colors ${
                        selectedCategory === cat
                          ? "bg-teal-50 text-[#0F766E] font-semibold"
                          : "text-slate-700 hover:bg-slate-50 hover:text-[#0F766E]"
                      }`}
                    >
                      {cat}
                    </button>
                  ))}
                </motion.div>
              )}
            </AnimatePresence>
          </div>

          {/* Search bar */}
          <div className="flex-1 max-w-xl hidden sm:block">
            <div className="relative">
              <Search className="absolute left-3.5 top-1/2 -translate-y-1/2 text-slate-400" size={17} />
              <input
                type="text"
                value={searchVal}
                onChange={(e) => handleSearch(e.target.value)}
                placeholder="Search products, brands, categories…"
                className="w-full h-10 pl-10 pr-4 rounded-xl border border-slate-200 bg-slate-50 text-sm text-slate-800 placeholder-slate-400 outline-none focus:border-[#0F766E] focus:bg-white focus:ring-2 focus:ring-teal-100 transition-all"
              />
            </div>
          </div>

          {/* Right icons */}
          <div className="flex items-center gap-1 ml-auto">
            <a href="/products" className="relative p-2.5 rounded-xl hover:bg-slate-100 transition-colors hidden sm:flex items-center justify-center" title="Wishlist">
              <Heart size={20} className="text-slate-600" />
            </a>

            <a href="/cart" className="relative p-2.5 rounded-xl hover:bg-slate-100 transition-colors flex items-center justify-center" title="Cart">
              <ShoppingCart size={20} className="text-slate-600" />
              {cartCount > 0 && (
                <motion.span
                  key={cartCount}
                  initial={{ scale: 0.5 }}
                  animate={{ scale: 1 }}
                  className="absolute top-1 right-1 w-4 h-4 bg-[#0F766E] text-white text-[10px] font-bold rounded-full flex items-center justify-center"
                >
                  {cartCount}
                </motion.span>
              )}
            </a>

            <a href="/login" className="hidden sm:flex items-center gap-2 ml-1 px-3 py-2 rounded-xl hover:bg-slate-100 transition-colors">
              <User size={18} className="text-slate-600" />
              <span className="text-sm font-semibold text-slate-700">Account</span>
            </a>

            <button
              onClick={() => setMobileOpen((v) => !v)}
              className="sm:hidden p-2.5 rounded-xl hover:bg-slate-100 transition-colors"
            >
              {mobileOpen ? <X size={20} /> : <Menu size={20} />}
            </button>
          </div>
        </div>

        {/* Mobile search */}
        <div className="sm:hidden pb-3">
          <div className="relative">
            <Search className="absolute left-3.5 top-1/2 -translate-y-1/2 text-slate-400" size={16} />
            <input
              type="text"
              value={searchVal}
              onChange={(e) => handleSearch(e.target.value)}
              placeholder="Search products…"
              className="w-full h-10 pl-10 pr-4 rounded-xl border border-slate-200 bg-slate-50 text-sm outline-none focus:border-[#0F766E] focus:ring-2 focus:ring-teal-100 transition-all"
            />
          </div>
        </div>
      </div>

      {/* Mobile category menu */}
      <AnimatePresence>
        {mobileOpen && (
          <motion.div
            initial={{ height: 0, opacity: 0 }}
            animate={{ height: "auto", opacity: 1 }}
            exit={{ height: 0, opacity: 0 }}
            transition={{ duration: 0.2 }}
            className="overflow-hidden border-t border-slate-100 bg-white sm:hidden"
          >
            <div className="px-4 py-3 grid grid-cols-3 gap-2">
              {CATEGORIES.map((cat) => (
                <button
                  key={cat}
                  onClick={() => handleCat(cat)}
                  className={`text-xs font-semibold px-2 py-2 rounded-lg transition-colors ${
                    selectedCategory === cat
                      ? "bg-[#0F766E] text-white"
                      : "bg-slate-100 text-slate-700 hover:bg-teal-50 hover:text-[#0F766E]"
                  }`}
                >
                  {cat}
                </button>
              ))}
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </header>
  );
}
