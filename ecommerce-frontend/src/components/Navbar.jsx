import { useState, useEffect, useRef } from "react";
import {
  ShoppingCart, Heart, User, Search, Menu, X,
  ChevronDown, Zap, Cpu, Home, BookOpen, Dumbbell,
  Watch, Sparkles, Tag, Package, LogOut, LogIn, Bell,
} from "lucide-react";
import { motion, AnimatePresence } from "framer-motion";

const CATEGORIES = [
  { label: "Electronics",    icon: Cpu,       color: "#0F766E", bg: "#F0FDF4" },
  { label: "Home & Kitchen", icon: Home,      color: "#F59E0B", bg: "#FFFBEB" },
  { label: "Books",          icon: BookOpen,  color: "#6366F1", bg: "#EEF2FF" },
  { label: "Sports",         icon: Dumbbell,  color: "#10B981", bg: "#ECFDF5" },
  { label: "Accessories",    icon: Watch,     color: "#8B5CF6", bg: "#F5F3FF" },
  { label: "Beauty",         icon: Sparkles,  color: "#EC4899", bg: "#FDF2F8" },
];

export default function Navbar({ cartCount = 0, wishlistCount = 0, onSearch, onCategorySelect, selectedCategory }) {
  const [searchVal, setSearchVal]     = useState("");
  const [mobileOpen, setMobileOpen]   = useState(false);
  const [catOpen, setCatOpen]         = useState(false);
  const [scrolled, setScrolled]       = useState(false);
  const [searchOpen, setSearchOpen]   = useState(false);
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
  const handleCat    = (cat) => { onCategorySelect?.(cat); setCatOpen(false); setMobileOpen(false); };
  const handleLogout = () => { localStorage.removeItem("token"); localStorage.removeItem("userId"); window.location.href = "/login"; };

  return (
    <header className={`sticky top-0 z-50 w-full transition-all duration-500 ${
      scrolled
        ? "bg-white/90 backdrop-blur-2xl shadow-[0_1px_40px_rgba(15,118,110,0.08)] border-b border-white/60"
        : "bg-white/80 backdrop-blur-xl border-b border-slate-100/80"
    }`}>
      {/* Promo bar */}
      <div className="bg-gradient-to-r from-[#0C4A45] via-[#0F766E] to-[#0C4A45] text-white text-xs text-center py-2 font-medium tracking-wide">
        <span className="inline-flex items-center gap-2">
          <Zap size={11} fill="currentColor" className="text-yellow-300" />
          Free shipping on orders above ₹499 &nbsp;·&nbsp; Use code{" "}
          <span className="font-black bg-white/20 px-2 py-0.5 rounded-md tracking-wider">KARTIFY10</span>
          {" "}for 10% off
          <Zap size={11} fill="currentColor" className="text-yellow-300" />
        </span>
      </div>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center gap-3 h-16">

          {/* Logo */}
          <a href="/products" className="flex items-center gap-2.5 shrink-0 group mr-1">
            <div className="relative w-9 h-9 rounded-xl flex items-center justify-center overflow-hidden"
              style={{ background: "linear-gradient(135deg, #0F766E, #14B8A6)", boxShadow: "0 4px 14px rgba(15,118,110,0.4)" }}>
              <Zap size={18} className="text-white relative z-10" fill="white" />
            </div>
            <span className="text-xl font-black tracking-tight" style={{ background: "linear-gradient(135deg, #0F766E, #0D9488)", WebkitBackgroundClip: "text", WebkitTextFillColor: "transparent" }}>
              Kartify
            </span>
          </a>

          {/* Desktop nav */}
          <nav className="hidden lg:flex items-center gap-0.5 ml-1">
            {/* Categories mega dropdown */}
            <div className="relative" ref={catRef}>
              <button
                onClick={() => setCatOpen((v) => !v)}
                className={`flex items-center gap-1.5 text-sm font-semibold px-3.5 py-2 rounded-xl transition-all duration-200 ${
                  catOpen ? "bg-teal-50 text-[#0F766E]" : "text-slate-600 hover:text-[#0F766E] hover:bg-teal-50/70"
                }`}
              >
                <Menu size={14} />
                Categories
                <ChevronDown size={12} className={`transition-transform duration-300 ${catOpen ? "rotate-180" : ""}`} />
              </button>

              <AnimatePresence>
                {catOpen && (
                  <motion.div
                    initial={{ opacity: 0, y: 12, scale: 0.96 }}
                    animate={{ opacity: 1, y: 0, scale: 1 }}
                    exit={{ opacity: 0, y: 12, scale: 0.96 }}
                    transition={{ duration: 0.18, ease: [0.16, 1, 0.3, 1] }}
                    className="absolute top-full left-0 mt-2.5 w-80 rounded-2xl z-50 overflow-hidden"
                    style={{ background: "rgba(255,255,255,0.98)", backdropFilter: "blur(24px)", boxShadow: "0 24px 64px rgba(0,0,0,0.12), 0 0 0 1px rgba(0,0,0,0.06)" }}
                  >
                    <div className="p-2">
                      <button
                        onClick={() => handleCat("All Products")}
                        className="w-full flex items-center gap-3 px-3.5 py-2.5 rounded-xl text-sm font-semibold text-slate-700 hover:bg-teal-50 hover:text-[#0F766E] transition-colors mb-1"
                      >
                        <div className="w-7 h-7 rounded-lg bg-slate-100 flex items-center justify-center">
                          <Menu size={13} className="text-slate-500" />
                        </div>
                        All Products
                      </button>
                      <div className="h-px bg-slate-100 mx-2 mb-2" />
                      <div className="grid grid-cols-2 gap-1">
                        {CATEGORIES.map(({ label, icon: Icon, color, bg }) => (
                          <button
                            key={label}
                            onClick={() => handleCat(label)}
                            className={`flex items-center gap-2.5 px-3 py-2.5 rounded-xl text-sm font-semibold transition-all duration-150 ${
                              selectedCategory === label
                                ? "text-[#0F766E]"
                                : "text-slate-700 hover:bg-slate-50"
                            }`}
                            style={selectedCategory === label ? { background: bg } : {}}
                          >
                            <div className="w-7 h-7 rounded-lg flex items-center justify-center shrink-0" style={{ background: bg }}>
                              <Icon size={13} color={color} />
                            </div>
                            <span className="truncate text-xs">{label}</span>
                          </button>
                        ))}
                      </div>
                    </div>
                  </motion.div>
                )}
              </AnimatePresence>
            </div>

            {[
              { href: "/products?filter=deals", icon: Tag, label: "Deals" },
              { href: "/products?filter=new", icon: Zap, label: "New Arrivals" },
              { href: "/orders", icon: Package, label: "Orders" },
            ].map(({ href, icon: Icon, label }) => (
              <a key={label} href={href}
                className="flex items-center gap-1.5 text-sm font-semibold text-slate-600 hover:text-[#0F766E] px-3.5 py-2 rounded-xl hover:bg-teal-50/70 transition-all duration-200">
                <Icon size={14} />
                {label}
              </a>
            ))}
          </nav>

          {/* Search bar — desktop */}
          <div className="flex-1 max-w-sm hidden md:block mx-3">
            <div className="relative group">
              <Search className="absolute left-3.5 top-1/2 -translate-y-1/2 text-slate-400 group-focus-within:text-[#0F766E] transition-colors" size={15} />
              <input
                type="text"
                value={searchVal}
                onChange={(e) => handleSearch(e.target.value)}
                placeholder="Search products, brands…"
                className="w-full h-10 pl-10 pr-4 rounded-xl border border-slate-200/80 bg-slate-50/80 text-sm text-slate-800 placeholder-slate-400 outline-none focus:border-[#0F766E]/50 focus:bg-white focus:ring-2 focus:ring-teal-100/80 transition-all duration-200"
              />
            </div>
          </div>

          {/* Right icons */}
          <div className="flex items-center gap-0.5 ml-auto">
            {/* Mobile search */}
            <button onClick={() => setSearchOpen((v) => !v)}
              className="md:hidden p-2.5 rounded-xl hover:bg-slate-100 transition-colors text-slate-600">
              <Search size={18} />
            </button>

            {/* Wishlist */}
            <a href="/wishlist" title="Wishlist"
              className="hidden sm:flex relative p-2.5 rounded-xl hover:bg-slate-100 transition-colors items-center justify-center text-slate-600 hover:text-rose-500">
              <Heart size={18} />
              <AnimatePresence>
                {wishlistCount > 0 && (
                  <motion.span
                    key={wishlistCount}
                    initial={{ scale: 0 }} animate={{ scale: 1 }} exit={{ scale: 0 }}
                    transition={{ type: "spring", stiffness: 400, damping: 20 }}
                    className="absolute -top-0.5 -right-0.5 min-w-[18px] h-[18px] px-1 text-white text-[10px] font-black rounded-full flex items-center justify-center bg-rose-500"
                  >
                    {wishlistCount > 9 ? "9+" : wishlistCount}
                  </motion.span>
                )}
              </AnimatePresence>
            </a>

            {/* Notifications */}
            <button className="hidden sm:flex p-2.5 rounded-xl hover:bg-slate-100 transition-colors items-center justify-center text-slate-600 relative">
              <Bell size={18} />
              <span className="absolute top-2 right-2 w-1.5 h-1.5 bg-red-500 rounded-full" />
            </button>

            {/* Cart */}
            <a href="/cart" title="Cart"
              className="relative p-2.5 rounded-xl hover:bg-slate-100 transition-colors flex items-center justify-center text-slate-600 hover:text-[#0F766E]">
              <ShoppingCart size={18} />
              <AnimatePresence>
                {cartCount > 0 && (
                  <motion.span
                    key={cartCount}
                    initial={{ scale: 0, rotate: -10 }}
                    animate={{ scale: 1, rotate: 0 }}
                    exit={{ scale: 0 }}
                    transition={{ type: "spring", stiffness: 400, damping: 20 }}
                    className="absolute -top-0.5 -right-0.5 min-w-[18px] h-[18px] px-1 text-white text-[10px] font-black rounded-full flex items-center justify-center"
                    style={{ background: "linear-gradient(135deg, #0F766E, #14B8A6)" }}
                  >
                    {cartCount > 9 ? "9+" : cartCount}
                  </motion.span>
                )}
              </AnimatePresence>
            </a>

            {/* Profile dropdown */}
            <div className="relative hidden sm:block ml-1" ref={profileRef}>
              <button
                onClick={() => setProfileOpen((v) => !v)}
                className={`flex items-center gap-2 px-3 py-2 rounded-xl transition-all duration-200 ${
                  profileOpen ? "bg-teal-50" : "hover:bg-slate-100"
                }`}
              >
                <div className="w-7 h-7 rounded-full flex items-center justify-center text-white text-xs font-bold shrink-0"
                  style={{ background: "linear-gradient(135deg, #0F766E, #14B8A6)" }}>
                  {isLoggedIn ? userName.charAt(0).toUpperCase() : <User size={14} />}
                </div>
                <span className="text-sm font-semibold text-slate-700 hidden lg:block max-w-[72px] truncate">
                  {isLoggedIn ? userName.split(" ")[0] : "Login"}
                </span>
                <ChevronDown size={12} className={`text-slate-400 transition-transform duration-300 ${profileOpen ? "rotate-180" : ""}`} />
              </button>

              <AnimatePresence>
                {profileOpen && (
                  <motion.div
                    initial={{ opacity: 0, y: 10, scale: 0.96 }}
                    animate={{ opacity: 1, y: 0, scale: 1 }}
                    exit={{ opacity: 0, y: 10, scale: 0.96 }}
                    transition={{ duration: 0.18, ease: [0.16, 1, 0.3, 1] }}
                    className="absolute top-full right-0 mt-2.5 w-56 rounded-2xl z-50 overflow-hidden"
                    style={{ background: "rgba(255,255,255,0.98)", backdropFilter: "blur(24px)", boxShadow: "0 24px 64px rgba(0,0,0,0.12), 0 0 0 1px rgba(0,0,0,0.06)" }}
                  >
                    {isLoggedIn ? (
                      <>
                        <div className="px-4 py-3.5 border-b border-slate-100">
                          <div className="flex items-center gap-2.5">
                            <div className="w-9 h-9 rounded-full flex items-center justify-center text-white font-bold text-sm shrink-0"
                              style={{ background: "linear-gradient(135deg, #0F766E, #14B8A6)" }}>
                              {userName.charAt(0).toUpperCase()}
                            </div>
                            <div className="min-w-0">
                              <p className="text-sm font-bold text-slate-800 truncate">{userName}</p>
                              <p className="text-xs text-slate-400">Premium Member</p>
                            </div>
                          </div>
                        </div>
                        <div className="p-1.5">
                          {[
                            { href: "/orders", icon: Package, label: "My Orders" },
                            { href: "/cart", icon: ShoppingCart, label: "My Cart" },
                            { href: "/wishlist", icon: Heart, label: "Wishlist" },
                          ].map(({ href, icon: Icon, label }) => (
                            <a key={label} href={href}
                              className="flex items-center gap-2.5 px-3 py-2.5 text-sm font-medium text-slate-700 hover:bg-teal-50 hover:text-[#0F766E] rounded-xl transition-colors">
                              <Icon size={14} /> {label}
                            </a>
                          ))}
                          <div className="h-px bg-slate-100 my-1" />
                          <button onClick={handleLogout}
                            className="w-full flex items-center gap-2.5 px-3 py-2.5 text-sm font-medium text-red-500 hover:bg-red-50 rounded-xl transition-colors">
                            <LogOut size={14} /> Sign Out
                          </button>
                        </div>
                      </>
                    ) : (
                      <div className="p-1.5">
                        <a href="/login"
                          className="flex items-center gap-2.5 px-3 py-2.5 text-sm font-semibold text-slate-700 hover:bg-teal-50 hover:text-[#0F766E] rounded-xl transition-colors">
                          <LogIn size={14} /> Sign In
                        </a>
                        <a href="/register"
                          className="flex items-center gap-2.5 px-3 py-2.5 text-sm font-semibold text-slate-700 hover:bg-teal-50 hover:text-[#0F766E] rounded-xl transition-colors">
                          <User size={14} /> Create Account
                        </a>
                      </div>
                    )}
                  </motion.div>
                )}
              </AnimatePresence>
            </div>

            {/* Mobile hamburger */}
            <button onClick={() => setMobileOpen((v) => !v)}
              className="lg:hidden p-2.5 rounded-xl hover:bg-slate-100 transition-colors ml-1">
              <AnimatePresence mode="wait" initial={false}>
                <motion.div key={mobileOpen ? "x" : "menu"}
                  initial={{ rotate: -90, opacity: 0 }} animate={{ rotate: 0, opacity: 1 }} exit={{ rotate: 90, opacity: 0 }}
                  transition={{ duration: 0.15 }}>
                  {mobileOpen ? <X size={20} className="text-slate-700" /> : <Menu size={20} className="text-slate-700" />}
                </motion.div>
              </AnimatePresence>
            </button>
          </div>
        </div>

        {/* Mobile search bar */}
        <AnimatePresence>
          {searchOpen && (
            <motion.div ref={searchRef}
              initial={{ height: 0, opacity: 0 }} animate={{ height: "auto", opacity: 1 }} exit={{ height: 0, opacity: 0 }}
              transition={{ duration: 0.2 }} className="overflow-hidden md:hidden pb-3">
              <div className="relative">
                <Search className="absolute left-3.5 top-1/2 -translate-y-1/2 text-slate-400" size={15} />
                <input autoFocus type="text" value={searchVal} onChange={(e) => handleSearch(e.target.value)}
                  placeholder="Search products…"
                  className="w-full h-10 pl-10 pr-4 rounded-xl border border-slate-200 bg-slate-50 text-sm outline-none focus:border-[#0F766E] focus:ring-2 focus:ring-teal-100 transition-all" />
              </div>
            </motion.div>
          )}
        </AnimatePresence>
      </div>

      {/* Mobile menu */}
      <AnimatePresence>
        {mobileOpen && (
          <motion.div
            initial={{ height: 0, opacity: 0 }} animate={{ height: "auto", opacity: 1 }} exit={{ height: 0, opacity: 0 }}
            transition={{ duration: 0.25, ease: [0.16, 1, 0.3, 1] }}
            className="overflow-hidden border-t border-slate-100 lg:hidden"
            style={{ background: "rgba(255,255,255,0.98)", backdropFilter: "blur(24px)" }}
          >
            <div className="px-4 py-4 space-y-1">
              <div className="relative mb-4">
                <Search className="absolute left-3.5 top-1/2 -translate-y-1/2 text-slate-400" size={15} />
                <input type="text" value={searchVal} onChange={(e) => handleSearch(e.target.value)}
                  placeholder="Search products…"
                  className="w-full h-10 pl-10 pr-4 rounded-xl border border-slate-200 bg-slate-50 text-sm outline-none focus:border-[#0F766E] focus:ring-2 focus:ring-teal-100 transition-all" />
              </div>

              {[
                { href: "/products", icon: Tag, label: "Deals" },
                { href: "/products", icon: Zap, label: "New Arrivals" },
                { href: "/orders", icon: Package, label: "My Orders" },
                { href: "/cart", icon: ShoppingCart, label: "Cart" },
                { href: "/wishlist", icon: Heart, label: "Wishlist" },
              ].map(({ href, icon: Icon, label }) => (
                <a key={label} href={href} onClick={() => setMobileOpen(false)}
                  className="flex items-center gap-3 px-3.5 py-2.5 rounded-xl text-sm font-semibold text-slate-700 hover:bg-teal-50 hover:text-[#0F766E] transition-colors">
                  <Icon size={15} /> {label}
                </a>
              ))}

              <div className="h-px bg-slate-100 my-2" />
              <p className="text-[10px] font-bold text-slate-400 uppercase tracking-widest px-3.5 mb-2">Categories</p>
              <div className="grid grid-cols-3 gap-2">
                {CATEGORIES.map(({ label, icon: Icon, color, bg }) => (
                  <button key={label} onClick={() => handleCat(label)}
                    className={`flex flex-col items-center gap-1.5 p-2.5 rounded-xl text-xs font-semibold transition-all ${
                      selectedCategory === label ? "text-[#0F766E]" : "text-slate-600 hover:bg-slate-50"
                    }`}
                    style={selectedCategory === label ? { background: bg } : { background: "#F8FAFC" }}>
                    <div className="w-8 h-8 rounded-lg flex items-center justify-center" style={{ background: bg }}>
                      <Icon size={15} color={color} />
                    </div>
                    {label.split(" ")[0]}
                  </button>
                ))}
              </div>

              <div className="h-px bg-slate-100 my-2" />
              {isLoggedIn ? (
                <button onClick={handleLogout}
                  className="w-full flex items-center gap-2.5 px-3.5 py-2.5 rounded-xl text-sm font-semibold text-red-500 hover:bg-red-50 transition-colors">
                  <LogOut size={15} /> Sign Out
                </button>
              ) : (
                <a href="/login"
                  className="flex items-center gap-2.5 px-3.5 py-2.5 rounded-xl text-sm font-semibold text-slate-700 hover:bg-teal-50 hover:text-[#0F766E] transition-colors">
                  <LogIn size={15} /> Sign In
                </a>
              )}
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </header>
  );
}
