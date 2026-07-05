import { motion } from "framer-motion";
import { useNavigate } from "react-router-dom";
import { ShoppingBag, ArrowRight } from "lucide-react";

const wrap = (children, cta) => (
  <motion.div
    initial={{ opacity: 0, y: 24 }}
    animate={{ opacity: 1, y: 0 }}
    transition={{ duration: 0.4 }}
    className="flex flex-col items-center justify-center py-20 text-center px-4"
  >
    {children}
    {cta}
  </motion.div>
);

function Btn({ href, onClick, children }) {
  const navigate = useNavigate();
  const handle = () => { if (href) navigate(href); else onClick?.(); };
  return (
    <motion.button
      whileHover={{ scale: 1.03 }}
      whileTap={{ scale: 0.97 }}
      onClick={handle}
      className="inline-flex items-center gap-2 px-7 py-3 rounded-2xl text-white font-bold text-sm shadow-lg shadow-teal-200/50"
      style={{ background: "linear-gradient(135deg, #0F766E, #14B8A6)" }}
    >
      {children}
    </motion.button>
  );
}

/* ── Empty Cart ─────────────────────────────────────────────────────────── */
export function EmptyCart() {
  return wrap(
    <>
      <svg width="180" height="160" viewBox="0 0 180 160" fill="none" className="mb-8">
        <circle cx="90" cy="80" r="72" fill="#F0FDF4" />
        {/* Cart body */}
        <rect x="52" y="72" width="76" height="52" rx="10" fill="#0F766E" opacity="0.15" />
        <rect x="56" y="76" width="68" height="44" rx="8" fill="white" stroke="#0F766E" strokeWidth="2" />
        {/* Cart handle */}
        <path d="M44 60 L52 72 L128 72 L136 60" stroke="#0F766E" strokeWidth="2.5" strokeLinecap="round" fill="none" />
        <circle cx="44" cy="58" r="4" fill="#0F766E" opacity="0.4" />
        {/* Wheels */}
        <circle cx="72" cy="126" r="7" fill="white" stroke="#0F766E" strokeWidth="2" />
        <circle cx="108" cy="126" r="7" fill="white" stroke="#0F766E" strokeWidth="2" />
        {/* Sad face */}
        <circle cx="90" cy="96" r="14" fill="#0F766E" opacity="0.08" />
        <circle cx="85" cy="93" r="2" fill="#0F766E" opacity="0.5" />
        <circle cx="95" cy="93" r="2" fill="#0F766E" opacity="0.5" />
        <path d="M85 102 Q90 98 95 102" stroke="#0F766E" strokeWidth="1.5" strokeLinecap="round" fill="none" opacity="0.5" />
        {/* Sparkles */}
        <circle cx="38" cy="44" r="3" fill="#14B8A6" opacity="0.4" />
        <circle cx="142" cy="50" r="4" fill="#0F766E" opacity="0.3" />
        <circle cx="148" cy="100" r="2.5" fill="#14B8A6" opacity="0.4" />
      </svg>
      <h3 className="text-2xl font-black text-slate-800 mb-2">Your cart is empty</h3>
      <p className="text-slate-500 text-sm max-w-xs mb-8 leading-relaxed">
        Looks like you haven't added anything yet. Explore our catalog and find something you'll love!
      </p>
    </>,
    <Btn href="/products"><ShoppingBag size={16} /> Start Shopping</Btn>
  );
}

/* ── Empty Search ───────────────────────────────────────────────────────── */
export function EmptySearch({ onReset }) {
  return wrap(
    <>
      <svg width="180" height="160" viewBox="0 0 180 160" fill="none" className="mb-8">
        <circle cx="90" cy="80" r="72" fill="#F8FAFC" />
        {/* Magnifier */}
        <circle cx="82" cy="72" r="30" fill="white" stroke="#CBD5E1" strokeWidth="3" />
        <circle cx="82" cy="72" r="22" fill="#F1F5F9" />
        {/* X inside */}
        <path d="M74 64 L90 80 M90 64 L74 80" stroke="#94A3B8" strokeWidth="3" strokeLinecap="round" />
        {/* Handle */}
        <path d="M104 94 L122 112" stroke="#CBD5E1" strokeWidth="5" strokeLinecap="round" />
        {/* Dots */}
        <circle cx="44" cy="50" r="4" fill="#E2E8F0" />
        <circle cx="136" cy="44" r="5" fill="#E2E8F0" />
        <circle cx="148" cy="110" r="3" fill="#E2E8F0" />
      </svg>
      <h3 className="text-xl font-black text-slate-700 mb-2">No products found</h3>
      <p className="text-slate-500 text-sm max-w-xs mb-8 leading-relaxed">
        We couldn't find anything matching your search. Try different keywords or clear the filters.
      </p>
    </>,
    <Btn onClick={onReset}>Clear Filters <ArrowRight size={15} /></Btn>
  );
}

/* ── Empty Wishlist ─────────────────────────────────────────────────────── */
export function EmptyWishlist() {
  return wrap(
    <>
      <svg width="180" height="160" viewBox="0 0 180 160" fill="none" className="mb-8">
        <circle cx="90" cy="80" r="72" fill="#FFF1F2" />
        {/* Heart outline */}
        <path
          d="M90 116 C90 116 46 88 46 62 C46 50 56 42 66 42 C74 42 82 48 90 56 C98 48 106 42 114 42 C124 42 134 50 134 62 C134 88 90 116 90 116Z"
          fill="white" stroke="#FDA4AF" strokeWidth="3"
        />
        {/* Dashed inner heart */}
        <path
          d="M90 106 C90 106 58 84 58 64 C58 56 64 50 72 50 C78 50 84 54 90 60 C96 54 102 50 108 50 C116 50 122 56 122 64 C122 84 90 106 90 106Z"
          fill="none" stroke="#FDA4AF" strokeWidth="1.5" strokeDasharray="4 3" opacity="0.6"
        />
        {/* Plus sign */}
        <circle cx="90" cy="78" r="12" fill="#FFF1F2" />
        <path d="M90 72 L90 84 M84 78 L96 78" stroke="#F43F5E" strokeWidth="2.5" strokeLinecap="round" />
        <circle cx="50" cy="44" r="4" fill="#FDA4AF" opacity="0.4" />
        <circle cx="130" cy="40" r="5" fill="#FDA4AF" opacity="0.3" />
      </svg>
      <h3 className="text-xl font-black text-slate-700 mb-2">Your wishlist is empty</h3>
      <p className="text-slate-500 text-sm max-w-xs mb-8 leading-relaxed">
        Save items you love by tapping the heart icon on any product.
      </p>
    </>,
    <Btn href="/products"><ShoppingBag size={16} /> Explore Products</Btn>
  );
}

/* ── Empty Orders ───────────────────────────────────────────────────────── */
export function EmptyOrders() {
  return wrap(
    <>
      <svg width="180" height="160" viewBox="0 0 180 160" fill="none" className="mb-8">
        <circle cx="90" cy="80" r="72" fill="#F0FDF4" />
        {/* Box */}
        <rect x="54" y="64" width="72" height="60" rx="8" fill="white" stroke="#0F766E" strokeWidth="2" opacity="0.8" />
        {/* Box lid */}
        <path d="M50 64 L90 52 L130 64" stroke="#0F766E" strokeWidth="2" fill="none" />
        <path d="M90 52 L90 64" stroke="#0F766E" strokeWidth="2" />
        {/* Tape */}
        <rect x="78" y="64" width="24" height="10" rx="3" fill="#0F766E" opacity="0.2" />
        {/* Lines on box */}
        <path d="M66 84 L114 84" stroke="#0F766E" strokeWidth="1.5" strokeLinecap="round" opacity="0.3" />
        <path d="M66 94 L100 94" stroke="#0F766E" strokeWidth="1.5" strokeLinecap="round" opacity="0.3" />
        {/* Question mark */}
        <circle cx="90" cy="104" r="10" fill="#0F766E" opacity="0.08" />
        <text x="90" y="108" textAnchor="middle" fontSize="12" fill="#0F766E" opacity="0.5" fontWeight="bold">?</text>
        <circle cx="44" cy="46" r="4" fill="#14B8A6" opacity="0.3" />
        <circle cx="140" cy="52" r="5" fill="#0F766E" opacity="0.2" />
      </svg>
      <h3 className="text-xl font-black text-slate-700 mb-2">No orders yet</h3>
      <p className="text-slate-500 text-sm max-w-xs mb-8 leading-relaxed">
        Once you place an order, it'll show up here. Start shopping to place your first order!
      </p>
    </>,
    <Btn href="/products"><ShoppingBag size={16} /> Start Shopping</Btn>
  );
}

/* ── Empty Products (generic) ───────────────────────────────────────────── */
export function EmptyProducts({ onReset }) {
  return wrap(
    <>
      <svg width="180" height="160" viewBox="0 0 180 160" fill="none" className="mb-8">
        <circle cx="90" cy="80" r="72" fill="#F8FAFC" />
        <rect x="58" y="50" width="64" height="80" rx="10" fill="white" stroke="#E2E8F0" strokeWidth="2" />
        <rect x="66" y="62" width="48" height="8" rx="4" fill="#E2E8F0" />
        <rect x="66" y="76" width="36" height="6" rx="3" fill="#E2E8F0" />
        <rect x="66" y="88" width="42" height="6" rx="3" fill="#E2E8F0" />
        <circle cx="90" cy="112" r="8" fill="#F1F5F9" />
        <path d="M86 112 L94 112 M90 108 L90 116" stroke="#94A3B8" strokeWidth="2" strokeLinecap="round" />
      </svg>
      <h3 className="text-xl font-black text-slate-700 mb-2">No products available</h3>
      <p className="text-slate-500 text-sm max-w-xs mb-8 leading-relaxed">
        There are no products in this category right now. Try a different filter.
      </p>
    </>,
    onReset ? <Btn onClick={onReset}>Clear Filters <ArrowRight size={15} /></Btn> : null
  );
}
