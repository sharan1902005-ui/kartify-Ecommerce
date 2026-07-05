import { useEffect, useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Trash2, Plus, Minus, ShoppingBag, ArrowLeft, Tag, Truck, Shield, Zap } from "lucide-react";
import api from "../services/api";
import { EmptyCart } from "../components/EmptyState";

function formatPrice(price) {
  return new Intl.NumberFormat("en-IN", { maximumFractionDigits: 0 }).format(Number(price) || 0);
}

function CartItemSkeleton() {
  return (
    <div className="flex gap-4 p-5 bg-white rounded-2xl border border-slate-100 animate-pulse">
      <div className="w-24 h-24 rounded-xl bg-slate-100 shrink-0" />
      <div className="flex-1 space-y-2.5">
        <div className="h-4 w-3/4 bg-slate-100 rounded-lg" />
        <div className="h-3 w-1/3 bg-slate-100 rounded-lg" />
        <div className="h-3 w-1/4 bg-slate-100 rounded-lg" />
        <div className="h-8 w-28 bg-slate-100 rounded-xl" />
      </div>
    </div>
  );
}

export default function Cart() {
  const [cartItems, setCartItems] = useState([]);
  const [loading, setLoading]     = useState(true);
  const [coupon, setCoupon]       = useState("");
  const [couponApplied, setCouponApplied] = useState(false);

  // ── Existing API call — untouched ──────────────────────────────────────────
  useEffect(() => {
    fetchCart();
  }, []);

  const fetchCart = async () => {
    try {
      setLoading(true);
      const response = await api.get("/cart/user/1");
      console.log("Cart data:", response.data);
      // Enrich items with mock price/name since backend only returns productId + quantity
      const items = Array.isArray(response.data) ? response.data : [];
      setCartItems(items.map((item) => ({
        ...item,
        price: item.price ?? 999,
        name:  item.name  ?? `Product #${item.productId}`,
        imageUrl: item.imageUrl ?? null,
        category: item.category ?? "General",
      })));
    } catch (error) {
      console.log("Cart error:", error.response?.data || error.message);
    } finally {
      setLoading(false);
    }
  };

  // ── Existing checkout — untouched ──────────────────────────────────────────
  const checkout = async () => {
    alert("Demo checkout successful!");
  };

  const updateQty = (id, delta) => {
    setCartItems((prev) =>
      prev.map((item) =>
        item.id === id
          ? { ...item, quantity: Math.max(1, item.quantity + delta) }
          : item
      )
    );
  };

  const removeItem = (id) => {
    setCartItems((prev) => prev.filter((item) => item.id !== id));
  };

  const applyCoupon = () => {
    if (coupon.trim().toUpperCase() === "KARTIFY10") {
      setCouponApplied(true);
    } else {
      alert("Invalid coupon code");
    }
  };

  const subtotal  = cartItems.reduce((sum, item) => sum + Number(item.price) * item.quantity, 0);
  const discount  = couponApplied ? Math.round(subtotal * 0.1) : 0;
  const shipping  = subtotal > 499 ? 0 : 49;
  const gst       = Math.round((subtotal - discount) * 0.18);
  const grandTotal = subtotal - discount + shipping + gst;

  return (
    <div className="min-h-screen bg-[#F8FAFC]">
      {/* Header */}
      <header className="sticky top-0 z-50 bg-white border-b border-slate-100 shadow-sm">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 h-16 flex items-center gap-4">
          <a href="/products" className="flex items-center gap-2 shrink-0">
            <div className="w-8 h-8 rounded-lg bg-[#0F766E] flex items-center justify-center">
              <Zap size={18} className="text-white" fill="white" />
            </div>
            <span className="text-xl font-black text-[#0F766E] tracking-tight">Kartify</span>
          </a>
          <div className="h-5 w-px bg-slate-200" />
          <h1 className="text-base font-bold text-slate-700">Shopping Cart</h1>
          {cartItems.length > 0 && (
            <span className="ml-1 text-xs font-semibold bg-[#0F766E] text-white px-2 py-0.5 rounded-full">
              {cartItems.length}
            </span>
          )}
        </div>
      </header>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        {/* Back link */}
        <a href="/products" className="inline-flex items-center gap-2 text-sm font-semibold text-slate-500 hover:text-[#0F766E] transition-colors mb-6">
          <ArrowLeft size={16} /> Continue Shopping
        </a>

        {loading ? (
          <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
            <div className="lg:col-span-2 space-y-4">
              {[1, 2, 3].map((i) => <CartItemSkeleton key={i} />)}
            </div>
            <div className="h-80 bg-white rounded-2xl border border-slate-100 animate-pulse" />
          </div>
        ) : cartItems.length === 0 ? (
          <EmptyCart />
        ) : (
          <div className="grid grid-cols-1 lg:grid-cols-3 gap-8 items-start">

            {/* Cart items */}
            <div className="lg:col-span-2 space-y-4">
              <AnimatePresence>
                {cartItems.map((item) => (
                  <motion.div
                    key={item.id}
                    initial={{ opacity: 0, y: 16 }}
                    animate={{ opacity: 1, y: 0 }}
                    exit={{ opacity: 0, x: -40, transition: { duration: 0.2 } }}
                    className="flex gap-4 p-5 bg-white rounded-2xl border border-slate-100 shadow-sm hover:shadow-md transition-shadow"
                  >
                    {/* Image */}
                    <div className="w-24 h-24 rounded-xl bg-slate-50 border border-slate-100 flex items-center justify-center shrink-0 overflow-hidden">
                      {item.imageUrl ? (
                        <img
                          src={item.imageUrl}
                          alt={item.name}
                          className="w-full h-full object-contain p-1"
                          onError={(e) => { e.currentTarget.style.display = "none"; }}
                        />
                      ) : (
                        <ShoppingBag size={28} className="text-slate-300" />
                      )}
                    </div>

                    {/* Details */}
                    <div className="flex-1 min-w-0">
                      <div className="flex items-start justify-between gap-2">
                        <div className="min-w-0">
                          <h3 className="font-bold text-slate-800 text-sm leading-snug line-clamp-2">
                            {item.name}
                          </h3>
                          <span className="inline-block mt-1 text-[11px] font-semibold bg-teal-50 text-[#0F766E] px-2 py-0.5 rounded-full">
                            {item.category}
                          </span>
                        </div>
                        <button
                          onClick={() => removeItem(item.id)}
                          className="shrink-0 w-8 h-8 rounded-xl flex items-center justify-center text-slate-400 hover:bg-red-50 hover:text-red-500 transition-colors"
                        >
                          <Trash2 size={15} />
                        </button>
                      </div>

                      <div className="mt-3 flex items-center justify-between flex-wrap gap-3">
                        {/* Quantity controls */}
                        <div className="flex items-center gap-1 bg-slate-50 rounded-xl border border-slate-200 p-1">
                          <button
                            onClick={() => updateQty(item.id, -1)}
                            className="w-7 h-7 rounded-lg flex items-center justify-center text-slate-600 hover:bg-white hover:shadow-sm transition-all"
                          >
                            <Minus size={13} />
                          </button>
                          <span className="w-8 text-center text-sm font-bold text-slate-800">
                            {item.quantity}
                          </span>
                          <button
                            onClick={() => updateQty(item.id, 1)}
                            className="w-7 h-7 rounded-lg flex items-center justify-center text-slate-600 hover:bg-white hover:shadow-sm transition-all"
                          >
                            <Plus size={13} />
                          </button>
                        </div>

                        {/* Subtotal */}
                        <div className="text-right">
                          <p className="text-xs text-slate-400 font-medium">Subtotal</p>
                          <p className="text-base font-black text-slate-900">
                            ₹{formatPrice(Number(item.price) * item.quantity)}
                          </p>
                        </div>
                      </div>
                    </div>
                  </motion.div>
                ))}
              </AnimatePresence>
            </div>

            {/* Order summary */}
            <div className="space-y-4">
              {/* Coupon */}
              <div className="bg-white rounded-2xl border border-slate-100 shadow-sm p-5">
                <h3 className="text-sm font-bold text-slate-700 mb-3 flex items-center gap-2">
                  <Tag size={15} className="text-[#0F766E]" /> Apply Coupon
                </h3>
                {couponApplied ? (
                  <div className="flex items-center gap-2 bg-green-50 border border-green-200 rounded-xl px-3 py-2.5">
                    <span className="text-green-600 text-sm font-bold">✓ KARTIFY10 applied!</span>
                    <button
                      onClick={() => { setCouponApplied(false); setCoupon(""); }}
                      className="ml-auto text-xs text-slate-400 hover:text-red-500"
                    >
                      Remove
                    </button>
                  </div>
                ) : (
                  <div className="flex gap-2">
                    <input
                      type="text"
                      value={coupon}
                      onChange={(e) => setCoupon(e.target.value)}
                      placeholder="Enter coupon code"
                      className="flex-1 h-9 px-3 rounded-xl border border-slate-200 text-sm outline-none focus:border-[#0F766E] focus:ring-2 focus:ring-teal-100 transition-all"
                    />
                    <button
                      onClick={applyCoupon}
                      className="px-4 h-9 bg-[#0F766E] text-white text-sm font-bold rounded-xl hover:bg-[#0D6B63] transition-colors"
                    >
                      Apply
                    </button>
                  </div>
                )}
              </div>

              {/* Summary card */}
              <div className="bg-white rounded-2xl border border-slate-100 shadow-sm p-5">
                <h3 className="text-base font-black text-slate-800 mb-4">Order Summary</h3>

                <div className="space-y-3 text-sm">
                  <div className="flex justify-between text-slate-600">
                    <span>Subtotal ({cartItems.length} items)</span>
                    <span className="font-semibold text-slate-800">₹{formatPrice(subtotal)}</span>
                  </div>
                  {couponApplied && (
                    <div className="flex justify-between text-green-600">
                      <span>Discount (KARTIFY10)</span>
                      <span className="font-semibold">− ₹{formatPrice(discount)}</span>
                    </div>
                  )}
                  <div className="flex justify-between text-slate-600">
                    <span className="flex items-center gap-1.5">
                      <Truck size={13} /> Shipping
                    </span>
                    <span className={`font-semibold ${shipping === 0 ? "text-green-600" : "text-slate-800"}`}>
                      {shipping === 0 ? "FREE" : `₹${shipping}`}
                    </span>
                  </div>
                  <div className="flex justify-between text-slate-600">
                    <span>GST (18%)</span>
                    <span className="font-semibold text-slate-800">₹{formatPrice(gst)}</span>
                  </div>
                  <div className="border-t border-slate-100 pt-3 flex justify-between">
                    <span className="font-black text-slate-900 text-base">Grand Total</span>
                    <span className="font-black text-slate-900 text-lg">₹{formatPrice(grandTotal)}</span>
                  </div>
                </div>

                {shipping > 0 && (
                  <p className="mt-3 text-xs text-amber-600 bg-amber-50 rounded-lg px-3 py-2 font-medium">
                    Add ₹{formatPrice(499 - subtotal)} more for free shipping!
                  </p>
                )}

                <motion.button
                  whileHover={{ scale: 1.02 }}
                  whileTap={{ scale: 0.98 }}
                  onClick={checkout}
                  className="mt-5 w-full py-3.5 bg-[#0F766E] hover:bg-[#0D6B63] text-white font-black text-base rounded-xl transition-colors shadow-lg shadow-teal-200 flex items-center justify-center gap-2"
                >
                  <ShoppingBag size={18} />
                  Place Order · ₹{formatPrice(grandTotal)}
                </motion.button>

                <div className="mt-4 flex items-center justify-center gap-1.5 text-xs text-slate-400">
                  <Shield size={12} />
                  Secure & encrypted checkout
                </div>
              </div>
            </div>
          </div>
        )}
      </div>
    </div>
  );
}
