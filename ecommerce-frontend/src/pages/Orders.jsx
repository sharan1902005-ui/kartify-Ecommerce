import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { motion, AnimatePresence } from "framer-motion";
import {
  ArrowLeft, Zap, Package, Calendar,
  ChevronRight, ShoppingBag, CheckCircle2, Clock,
} from "lucide-react";
import api from "../services/api";

function formatPrice(price) {
  return new Intl.NumberFormat("en-IN", { maximumFractionDigits: 0 }).format(Number(price) || 0);
}

function OrderSkeleton() {
  return (
    <div className="flex items-center gap-4 p-5 bg-white rounded-2xl animate-pulse"
      style={{ border: "1px solid rgba(0,0,0,0.05)", boxShadow: "0 2px 12px rgba(0,0,0,0.04)" }}>
      <div className="w-16 h-16 rounded-2xl bg-slate-100 shrink-0" />
      <div className="flex-1 space-y-2.5">
        <div className="h-4 w-1/2 bg-slate-100 rounded-lg" />
        <div className="h-3 w-1/3 bg-slate-100 rounded-lg" />
        <div className="h-3 w-1/4 bg-slate-100 rounded-full" />
      </div>
      <div className="h-5 w-20 bg-slate-100 rounded-lg" />
    </div>
  );
}

export default function Orders() {
  const navigate = useNavigate();
  const [orders, setOrders]   = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchOrders = async () => {
      try {
        const res = await api.get("/orders/user/1");
        const data = Array.isArray(res.data) ? res.data : [];
        if (data.length > 0) { setOrders(data); return; }
        throw new Error("empty");
      } catch {
        const local = JSON.parse(localStorage.getItem("kartify_orders") || "[]");
        setOrders(local);
      } finally {
        setLoading(false);
      }
    };
    fetchOrders();
  }, []);

  const dateOptions = { day: "numeric", month: "short", year: "numeric" };

  return (
    <div className="min-h-screen bg-[#F8FAFC]">
      {/* Header */}
      <header className="sticky top-0 z-50 bg-white/90 backdrop-blur-xl border-b border-slate-100"
        style={{ boxShadow: "0 1px 24px rgba(0,0,0,0.06)" }}>
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 h-16 flex items-center gap-4">
          <a href="/products" className="flex items-center gap-2.5 shrink-0">
            <div className="w-8 h-8 rounded-xl flex items-center justify-center"
              style={{ background: "linear-gradient(135deg, #0F766E, #14B8A6)" }}>
              <Zap size={16} className="text-white" fill="white" />
            </div>
            <span className="text-xl font-black tracking-tight"
              style={{ background: "linear-gradient(135deg, #0F766E, #0D9488)", WebkitBackgroundClip: "text", WebkitTextFillColor: "transparent" }}>
              Kartify
            </span>
          </a>
          <div className="h-5 w-px bg-slate-200" />
          <h1 className="text-base font-bold text-slate-700">My Orders</h1>
          {orders.length > 0 && (
            <span className="text-xs font-bold px-2 py-0.5 rounded-full text-white"
              style={{ background: "linear-gradient(135deg, #0F766E, #14B8A6)" }}>
              {orders.length}
            </span>
          )}
          <a href="/products"
            className="ml-auto hidden sm:inline-flex items-center gap-1.5 text-sm font-semibold text-slate-500 hover:text-[#0F766E] transition-colors">
            <ArrowLeft size={14} /> Continue Shopping
          </a>
        </div>
      </header>

      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        <a href="/products"
          className="sm:hidden inline-flex items-center gap-2 text-sm font-semibold text-slate-500 hover:text-[#0F766E] transition-colors mb-6">
          <ArrowLeft size={15} /> Continue Shopping
        </a>

        {loading ? (
          <div className="space-y-3">
            {[1, 2, 3].map((i) => <OrderSkeleton key={i} />)}
          </div>
        ) : orders.length === 0 ? (
          <motion.div
            initial={{ opacity: 0, y: 24 }} animate={{ opacity: 1, y: 0 }}
            className="text-center py-24"
          >
            <div className="w-20 h-20 mx-auto rounded-3xl flex items-center justify-center mb-6"
              style={{ background: "linear-gradient(135deg, rgba(15,118,110,0.08), rgba(20,184,166,0.06))", border: "1px solid rgba(15,118,110,0.12)" }}>
              <Package size={32} className="text-[#0F766E]" />
            </div>
            <h2 className="text-xl font-black text-slate-800 mb-2">No orders yet</h2>
            <p className="text-sm text-slate-500 mb-8 max-w-xs mx-auto leading-relaxed">
              Once you place an order, it'll show up here. Start shopping to place your first order!
            </p>
            <motion.button
              whileHover={{ scale: 1.03, boxShadow: "0 8px 24px rgba(15,118,110,0.3)" }}
              whileTap={{ scale: 0.97 }}
              onClick={() => navigate("/products")}
              className="inline-flex items-center gap-2 px-6 py-3 text-white font-bold text-sm rounded-2xl transition-all"
              style={{ background: "linear-gradient(135deg, #0F766E, #14B8A6)" }}
            >
              <ShoppingBag size={15} /> Start Shopping
            </motion.button>
          </motion.div>
        ) : (
          <div className="space-y-3">
            <p className="text-xs font-bold text-slate-400 uppercase tracking-widest mb-5">
              {orders.length} {orders.length === 1 ? "order" : "orders"}
            </p>
            <AnimatePresence>
              {orders.map((order, i) => {
                const firstItem = order.items?.[0];
                const itemCount = order.items?.length ?? 0;
                const orderDate = new Date(order.date);
                const isRecent  = Date.now() - orderDate.getTime() < 86400000 * 3;

                return (
                  <motion.div
                    key={order.id}
                    initial={{ opacity: 0, y: 16 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ delay: i * 0.05, ease: [0.16, 1, 0.3, 1] }}
                    className="flex items-center gap-4 p-5 bg-white rounded-2xl transition-all duration-200 cursor-pointer"
                    style={{ border: "1px solid rgba(0,0,0,0.05)", boxShadow: "0 2px 12px rgba(0,0,0,0.04)" }}
                    onMouseEnter={(e) => { e.currentTarget.style.boxShadow = "0 8px 32px rgba(15,118,110,0.1)"; e.currentTarget.style.borderColor = "rgba(15,118,110,0.15)"; }}
                    onMouseLeave={(e) => { e.currentTarget.style.boxShadow = "0 2px 12px rgba(0,0,0,0.04)"; e.currentTarget.style.borderColor = "rgba(0,0,0,0.05)"; }}
                  >
                    {/* Product image */}
                    <div className="w-16 h-16 rounded-2xl flex items-center justify-center overflow-hidden shrink-0"
                      style={{ background: "linear-gradient(135deg, #F8FAFC, #F0FDF4)", border: "1px solid rgba(0,0,0,0.05)" }}>
                      {firstItem?.imageUrl ? (
                        <img src={firstItem.imageUrl} alt={firstItem.name}
                          className="w-full h-full object-contain p-1.5"
                          onError={(e) => { e.currentTarget.style.display = "none"; }} />
                      ) : (
                        <Package size={22} className="text-slate-300" />
                      )}
                    </div>

                    {/* Details */}
                    <div className="flex-1 min-w-0">
                      <div className="flex items-center gap-2 mb-0.5">
                        <p className="font-bold text-slate-800 text-sm truncate">
                          {firstItem?.name ?? "Order"}
                          {itemCount > 1 && (
                            <span className="text-slate-400 font-medium"> +{itemCount - 1} more</span>
                          )}
                        </p>
                        {isRecent && (
                          <span className="shrink-0 text-[10px] font-bold text-emerald-600 bg-emerald-50 px-2 py-0.5 rounded-full border border-emerald-100">
                            Recent
                          </span>
                        )}
                      </div>
                      <div className="flex items-center gap-3 text-xs text-slate-400 mt-1">
                        <span className="flex items-center gap-1">
                          <Calendar size={10} />
                          {orderDate.toLocaleDateString("en-IN", dateOptions)}
                        </span>
                        <span>·</span>
                        <span className="font-mono text-[11px] truncate max-w-[120px]">{order.id}</span>
                      </div>
                      <div className="flex items-center gap-1 mt-1.5">
                        <CheckCircle2 size={11} className="text-emerald-500" />
                        <span className="text-[11px] font-semibold text-emerald-600">Delivered</span>
                      </div>
                    </div>

                    {/* Total */}
                    <div className="text-right shrink-0">
                      <p className="text-[10px] text-slate-400 font-medium mb-0.5">Total</p>
                      <p className="font-black text-slate-900 text-base">₹{formatPrice(order.total)}</p>
                    </div>

                    <ChevronRight size={15} className="text-slate-300 shrink-0" />
                  </motion.div>
                );
              })}
            </AnimatePresence>
          </div>
        )}
      </div>
    </div>
  );
}
