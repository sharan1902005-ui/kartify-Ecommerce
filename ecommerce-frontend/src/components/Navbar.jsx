import { useState, useEffect, useRef } from "react";
import {
  ShoppingCart, Heart, User, Search, Menu, X,
  ChevronDown, Zap, Cpu, Home, BookOpen, Dumbbell,
  Watch, Sparkles, Tag, Package, LogOut, LogIn,
} from "lucide-react";
import { motion, AnimatePresence } from "framer-motion";

const CATEGORIES = [
  { label: "Electronics",    icon: Cpu,       color: "#0F766E" },
  { label: "Home & Kitchen", icon: Home,      color: "#F59E0B" },
  { label: "Books",          icon: BookOpen,  color: "#6366F1" },
  { label: "Sports",         icon: Dumbbell,  color: "#10B981" },
  { label: "Accessories",    icon: Watch,     color: "#8B5CF6" },
  { label: "Beauty",         icon: Sparkles,  color: "#EC4899" },
];

export default function Navbar({ cartCount = 0, onSearch, onCategorySelect, selectedCategory }) {
  const [searchVal, setSearchVal]   = useState("");
  const [mobileOpen, setMobileOpen] = useState(false);
  const [catOpen, setCatOpen]       = useState(false);
  const [scrolled, setScrolled]     = useState(false);
  const [searchOpen, setSearchOpen] = useState(false);
  const [profileOpen, setProfileOpen] = useState(false);
  const catRef     = useRef(null);
  const profileRef = useRef(null);
  const searchRef  = useRef(null);

  const isLoggedIn = !!localStorage.getItem("token");
  const userName   = localStorage.getItem("userName") || "Account";

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 10);
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  useEffect(() => {
    const handler = (e) => {
      if (catRef.current     && !catRef.current.contains(e.target))     setCatOpen(false);
      if (profileRef.current && !profileRef.current.contains(e.target)) setProfileOpen(false);
      if (searchRef.current  && !searchRef.current.contains(e.target))  setSearchOpen(false);
    };
    document.addEventListener("mousedown", handler);
    return () => document.removeEventListener("mousedown", handler);
  }, []);

  const handleSearch = (val) => { setSearchVal(val); onSearch?.(val); };
  const handleCat    = (cat) => { onCategorySelect?.(cat === "All Products" ? cat : cat); setCatOpen(false); setMobileOpen(false); };
  const handleLogout = () => { localStorage.removeItem("token"); localStorage.removeItem("userId"); window.location.href = "/login"; };

  return (
    <header
      className={`sticky top-0 z-50 w-full transition-all duration-300 ${
        scrolled
          ? "bg-white/95 backdrop-blur-xl shadow-lg shadow-slate-200/50"
          : "bg-white border-b border-slate-100"
      }`}
    >
      {/* Promo bar */}
      <div className="bg-[#0F766E] text-white text-xs text-center py-1.5 font-medium tracking-wide">
        🎉 Free shipping on orders above ₹499 &nbsp;|&nbsp; Use code{" "}
        <span className="font-black bg-white/20 px-1.5 py-0.5 rounded">KARTIFY10</span> for 10% off
      </div>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center gap-3 h-16">

          {/* Logo */}
          <a href="/products" className="flex items-center gap-2 shrink-0 group">
            <div className="w-8 h-8 rounded-lg bg-[#0F766E] flex items-center justify-center group-hover:scale-105 transition-transform">
              <Zap size={17} className="text-white" fill="white" />
            </div>
            <span className="text-xl font-black text-[#0F766E] tracking-tight">Kartify</span>
          </a>

          {/* Desktop nav */}
          <nav className="hidden lg:flex items-center gap-1 ml-2">

            {/* Categories mega dropdown */}
            <div className="relative" ref={catRef}>
              <button
                onClick={() => setCatOpen((v) => !v)}
                className="flex items-center gap-1.5 text-sm font-semibold text-slate-700 hover:text-[#0F766E] px-3 py-2 rounded-xl hover:bg-teal-50 transition-colors"
              >
                <Menu size={15} />
                Categories
                <ChevronDown size={13} className={`transition-transform duration-200 ${catOpen ? "rotate-180" : ""}`} />
              </button>

              <AnimatePresence>
                {catOpen && (
                  <motion.div
                    initial={{ opacity: 0, y: 10, scale: 0.97 }}
                    animate={{ opacity: 1, y: 0, scale: 1 }}
                    exit={{ opacity: 0, y: 10, scale: 0.97 }}
                    transition={{ duration: 0.15 }}
                    className="absolute top-full left-0 mt-2 w-72 bg-white rounded-2xl shadow-2xl border border-slate-100 p-3 z-50"
                  >
                    <button
                      onClick={() => handleCat("All Products")}
                      className="w-full flex items-center gap-3 px-3 py-2.5 rounded-xl text-sm font-semibold text-slate-700 hover:bg-teal-50 hover:text-[#0F766E] transition-colors mb-1"
                    >
                      All Products
                    </button>
                    <div className="h-px bg-slate-100 mb-2" />
                    <div className="grid grid-cols-2 gap-1">
                      {CATEGORIES.map(({ label, icon: Icon, color }) => (
                        <button
                          key={label}
                          onClick={() => handleCat(label)}
                          className={`flex items-center gap-2.5 px-3 py-2.5 rounded-xl text-sm font-semibold transition-colors ${
                            selectedCategory === label
                              ? "bg-teal-50 text-[#0F766E]"
                              : "text-slate-700 hover:bg-slate-50"
                          }`}
                        >
                          <div className="w-7 h-7 rounded-lg flex items-center justify-center shrink-0" style={{ background: `${color}15` }}>
                            <Icon size={14} color={color} />
                          </div>
                          <span className="truncate">{label}</span>
                        </button>
                      ))}
                    </div>
                  </motion.div>
                )}
              </AnimatePresence>
            </div>

            <a href="/products?filter=deals" className="flex items-center gap-1.5 text-sm font-semibold text-slate-700 hover:text-[#0F766E] px-3 py-2 rounded-xl hover:bg-teal-50 transition-colors">
              <Tag size={14} />
              Deals
            </a>
            <a href="/products?filter=new" className="flex items-center gap-1.5 text-sm font-semibold text-slate-700 hover:text-[#0F766E] px-3 py-2 rounded-xl hover:bg-teal-50 transition-colors">
              <Zap size={14} />
              New Arrivals
            </a>
            <a href="/orders" className="flex items-center gap-1.5 text-sm font-semibold text-slate-700 hover:text-[#0F766E] px-3 py-2 rounded-xl hover:bg-teal-50 transition-colors">
              <Package size={14} />
              Orders
            </a>
          </nav>

          {/* Search bar — desktop */}
          <div className="flex-1 max-w-md hidden md:block mx-2">
            <div className="relative">
              <Search className="absolute left-3.5 top-1/2 -translate-y-1/2 text-slate-400" size={16} />
              <input
                type="text"
                value={searchVal}
                onChange={(e) => handleSearch(e.target.value)}
                placeholder="Search products, brands…"
                className="w-full h-10 pl-10 pr-4 rounded-xl border border-slate-200 bg-slate-50 text-sm text-slate-800 placeholder-slate-400 outline-none focus:border-[#0F766E] focus:bg-white focus:ring-2 focus:ring-teal-100 transition-all"
              />
            </div>
          </div>

          {/* Right icons */}
          <div className="flex items-center gap-0.5 ml-auto">

            {/* Mobile search toggle */}
            <button
              onClick={() => setSearchOpen((v) => !v)}
              className="md:hidden p-2.5 rounded-xl hover:bg-slate-100 transition-colors"
            >
              <Search size={19} className="text-slate-600" />
            </button>

            {/* Wishlist */}
            <a href="/products" title="Wishlist" className="hidden sm:flex p-2.5 rounded-xl hover:bg-slate-100 transition-colors items-center justify-center">
              <Heart size={19} className="text-slate-600" />
            </a>

            {/* Cart */}
            <a href="/cart" title="Cart" className="relative p-2.5 rounded-xl hover:bg-slate-100 transition-colors flex items-center justify-center">
              <ShoppingCart size={19} className="text-slate-600" />
              <AnimatePresence>
                {cartCount > 0 && (
                  <motion.span
                    key={cartCount}
                    initial={{ scale: 0 }}
                    animate={{ scale: 1 }}
                    exit={{ scale: 0 }}
                    className="absolute top-1 right-1 w-4 h-4 bg-[#0F766E] text-white text-[10px] font-black rounded-full flex items-center justify-center"
                  >
                    {cartCount > 9 ? "9+" : cartCount}
                  </motion.span>
                )}
              </AnimatePresence>
            </a>

            {/* Profile dropdown */}
            <div className="relative hidden sm:block" ref={profileRef}>
              <button
                onClick={() => setProfileOpen((v) => !v)}
                className="flex items-center gap-2 ml-1 px-3 py-2 rounded-xl hover:bg-slate-100 transition-colors"
              >
                <div className="w-7 h-7 rounded-full bg-teal-100 flex items-center justify-center">
                  <User size={15} className="text-[#0F766E]" />
                </div>
                <span className="text-sm font-semibold text-slate-700 hidden lg:block max-w-[80px] truncate">
                  {isLoggedIn ? userName : "Login"}
                </span>
                <ChevronDown size={13} className={`text-slate-400 transition-transform ${profileOpen ? "rotate-180" : ""}`} />
              </button>

              <AnimatePresence>
                {profileOpen && (
                  <motion.div
                    initial={{ opacity: 0, y: 8, scale: 0.97 }}
                    animate={{ opacity: 1, y: 0, scale: 1 }}
                    exit={{ opacity: 0, y: 8, scale: 0.97 }}
                    transition={{ duration: 0.15 }}
                    className="absolute top-full right-0 mt-2 w-52 bg-white rounded-2xl shadow-2xl border border-slate-100 py-2 z-50"
                  >
                    {isLoggedIn ? (
                      <>
                        <div className="px-4 py-3 border-b border-slate-100">
                          <p className="text-xs text-slate-400 font-medium">Signed in as</p>
                          <p className="text-sm font-bold text-slate-800 truncate">{userName}</p>
                        </div>
                        <a href="/orders" className="flex items-center gap-2.5 px-4 py-2.5 text-sm font-medium text-slate-700 hover:bg-slate-50 hover:text-[#0F766E] transition-colors">
                          <Package size={15} /> My Orders
                        </a>
                        <a href="/cart" className="flex items-center gap-2.5 px-4 py-2.5 text-sm font-medium text-slate-700 hover:bg-slate-50 hover:text-[#0F766E] transition-colors">
                          <ShoppingCart size={15} /> My Cart
                        </a>
                        <div className="h-px bg-slate-100 my-1" />
                        <button
                          onClick={handleLogout}
                          className="w-full flex items-center gap-2.5 px-4 py-2.5 text-sm font-medium text-red-500 hover:bg-red-50 transition-colors"
                        >
                          <LogOut size={15} /> Sign Out
                        </button>
                      </>
                    ) : (
                      <>
                        <a href="/login" className="flex items-center gap-2.5 px-4 py-2.5 text-sm font-semibold text-slate-700 hover:bg-teal-50 hover:text-[#0F766E] transition-colors">
                          <LogIn size={15} /> Sign In
                        </a>
                        <a href="/register" className="flex items-center gap-2.5 px-4 py-2.5 text-sm font-semibold text-slate-700 hover:bg-teal-50 hover:text-[#0F766E] transition-colors">
                          <User size={15} /> Create Account
                        </a>
                      </>
                    )}
                  </motion.div>
                )}
              </AnimatePresence>
            </div>

            {/* Mobile hamburger */}
            <button
              onClick={() => setMobileOpen((v) => !v)}
              className="lg:hidden p-2.5 rounded-xl hover:bg-slate-100 transition-colors"
            >
              {mobileOpen ? <X size={20} /> : <Menu size={20} />}
            </button>
          </div>
        </div>

        {/* Mobile search bar */}
        <AnimatePresence>
          {searchOpen && (
            <motion.div
              ref={searchRef}
              initial={{ height: 0, opacity: 0 }}
              animate={{ height: "auto", opacity: 1 }}
              exit={{ height: 0, opacity: 0 }}
              transition={{ duration: 0.2 }}
              className="overflow-hidden md:hidden pb-3"
            >
              <div className="relative">
                <Search className="absolute left-3.5 top-1/2 -translate-y-1/2 text-slate-400" size={16} />
                <input
                  autoFocus
                  type="text"
                  value={searchVal}
                  onChange={(e) => handleSearch(e.target.value)}
                  placeholder="Search products…"
                  className="w-full h-10 pl-10 pr-4 rounded-xl border border-slate-200 bg-slate-50 text-sm outline-none focus:border-[#0F766E] focus:ring-2 focus:ring-teal-100 transition-all"
                />
              </div>
            </motion.div>
          )}
        </AnimatePresence>
      </div>

      {/* Mobile menu */}
      <AnimatePresence>
        {mobileOpen && (
          <motion.div
            initial={{ height: 0, opacity: 0 }}
            animate={{ height: "auto", opacity: 1 }}
            exit={{ height: 0, opacity: 0 }}
            transition={{ duration: 0.22 }}
            className="overflow-hidden border-t border-slate-100 bg-white lg:hidden"
          >
            <div className="px-4 py-4 space-y-1">
              {/* Mobile search */}
              <div className="relative mb-3">
                <Search className="absolute left-3.5 top-1/2 -translate-y-1/2 text-slate-400" size={16} />
                <input
                  type="text"
                  value={searchVal}
                  onChange={(e) => handleSearch(e.target.value)}
                  placeholder="Search products…"
                  className="w-full h-10 pl-10 pr-4 rounded-xl border border-slate-200 bg-slate-50 text-sm outline-none focus:border-[#0F766E] focus:ring-2 focus:ring-teal-100 transition-all"
                />
              </div>

              {/* Nav links */}
              {[
                { href: "/products", icon: Tag,     label: "Deals" },
                { href: "/products", icon: Zap,     label: "New Arrivals" },
                { href: "/orders",   icon: Package, label: "My Orders" },
                { href: "/cart",     icon: ShoppingCart, label: "Cart" },
                { href: "/products", icon: Heart,   label: "Wishlist" },
              ].map(({ href, icon: Icon, label }) => (
                <a
                  key={label}
                  href={href}
                  onClick={() => setMobileOpen(false)}
                  className="flex items-center gap-3 px-3 py-2.5 rounded-xl text-sm font-semibold text-slate-700 hover:bg-teal-50 hover:text-[#0F766E] transition-colors"
                >
                  <Icon size={16} /> {label}
                </a>
              ))}

              <div className="h-px bg-slate-100 my-2" />

              {/* Categories */}
              <p className="text-[11px] font-bold text-slate-400 uppercase tracking-widest px-3 mb-2">Categories</p>
              <div className="grid grid-cols-3 gap-2">
                {CATEGORIES.map(({ label, icon: Icon, color }) => (
                  <button
                    key={label}
                    onClick={() => handleCat(label)}
                    className={`flex flex-col items-center gap-1.5 p-2.5 rounded-xl text-xs font-semibold transition-colors ${
                      selectedCategory === label
                        ? "bg-[#0F766E] text-white"
                        : "bg-slate-100 text-slate-700 hover:bg-teal-50 hover:text-[#0F766E]"
                    }`}
                  >
                    <Icon size={16} />
                    {label.split(" ")[0]}
                  </button>
                ))}
              </div>

              <div className="h-px bg-slate-100 my-2" />
              {isLoggedIn ? (
                <button
                  onClick={handleLogout}
                  className="w-full flex items-center gap-2 px-3 py-2.5 rounded-xl text-sm font-semibold text-red-500 hover:bg-red-50 transition-colors"
                >
                  <LogOut size={16} /> Sign Out
                </button>
              ) : (
                <a href="/login" className="flex items-center gap-2 px-3 py-2.5 rounded-xl text-sm font-semibold text-slate-700 hover:bg-teal-50 hover:text-[#0F766E] transition-colors">
                  <LogIn size={16} /> Sign In
                </a>
              )}
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </header>
  );
}
