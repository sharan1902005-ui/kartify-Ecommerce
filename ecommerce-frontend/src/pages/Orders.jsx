import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { motion } from "framer-motion";
import { ArrowLeft, Zap, Package, Calendar, ChevronRight, ShoppingBag } from "lucide-react";
import api from "../services/api";

function formatPrice(price) {
  return new Intl.NumberFormat("en-IN", { maximumFractionDigits: 0 }).format(Number(price) || 0);
}

function OrderSkeleton() {
  return (
    <div className="flex items-center gap-4 p-5 bg-white rounded-2xl border border-slate-100 animate-pulse">
      <div className="w-14 h-14 rounded-xl bg-slate-100 shrink-0" />
      <div className="flex-1 space-y-2">
        <div className="h-4 w-1/3 bg-slate-100 rounded-lg" />
        <div className="h-3 w-1/4 bg-slate-100 rounded-lg" />
      </div>
      <div className="h-4 w-16 bg-slate-100 rounded-lg" />
    </div>
  );
}

export default function Orders() {
  const navigate = useNavigate();
  const [orders, setOrders] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchOrders = async () => {
      try {
        const res = await api.get("/orders/user/1");
        const data = Array.isArray(res.data) ? res.data : [];
        if (data.length > 0) {
          setOrders(data);
          return;
        }
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
      <header className="sticky top-0 z-50 bg-white border-b border-slate-100 shadow-sm">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 h-16 flex items-center gap-4">
          <a href="/products" className="flex items-center gap-2 shrink-0">
            <div className="w-8 h-8 rounded-lg bg-[#0F766E] flex items-center justify-center">
              <Zap size={18} className="text-white" fill="white" />
            </div>
            <span className="text-xl font-black text-[#0F766E] tracking-tight">Kartify</span>
          </a>
          <div className="h-5 w-px bg-slate-200" />
          <h1 className="text-base font-bold text-slate-700">My Orders</h1>
          <a
            href="/products"
            className="ml-auto hidden sm:inline-flex items-center gap-1.5 text-sm font-semibold text-slate-500 hover:text-[#0F766E] transition-colors"
          >
            <ArrowLeft size={15} /> Continue Shopping
          </a>
        </div>
      </header>

      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        <a
          href="/products"
          className="sm:hidden inline-flex items-center gap-2 text-sm font-semibold text-slate-500 hover:text-[#0F766E] transition-colors mb-6"
        >
          <ArrowLeft size={16} /> Continue Shopping
        </a>

        {loading ? (
          <div className="space-y-3">
            {[1, 2, 3].map((i) => <OrderSkeleton key={i} />)}
          </div>
        ) : orders.length === 0 ? (
          <div className="text-center py-20">
            <div className="w-16 h-16 mx-auto rounded-2xl bg-teal-50 flex items-center justify-center mb-5">
              <Package size={28} className="text-[#0F766E]" />
            </div>
            <h2 className="text-lg font-bold text-slate-800 mb-1">No orders yet</h2>
            <p className="text-sm text-slate-500 mb-6">
              Once you place an order, it'll show up here.
            </p>
            <button
              onClick={() => navigate("/products")}
              className="inline-flex items-center gap-2 px-5 py-2.5 bg-[#0F766E] hover:bg-[#0D6B63] text-white font-bold text-sm rounded-xl transition-colors"
            >
              <ShoppingBag size={15} /> Start Shopping
            </button>
          </div>
        ) : (
          <div className="space-y-3">
            <p className="text-xs font-semibold text-slate-400 uppercase tracking-widest mb-4">
              {orders.length} {orders.length === 1 ? "order" : "orders"}
            </p>
            {orders.map((order, i) => {
              const firstItem = order.items?.[0];
              const itemCount = order.items?.length ?? 0;
              const orderDate = new Date(order.date);

              return (
                <motion.div
                  key={order.id}
                  initial={{ opacity: 0, y: 12 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: i * 0.05 }}
                  className="flex items-center gap-4 p-5 bg-white rounded-2xl border border-slate-100 shadow-sm hover:shadow-md transition-shadow"
                >
                  <div className="w-14 h-14 rounded-xl border border-slate-100 bg-slate-50 flex items-center justify-center overflow-hidden shrink-0">
                    {firstItem?.imageUrl ? (
                      <img
                        src={firstItem.imageUrl}
                        alt={firstItem.name}
                        className="w-full h-full object-contain p-1"
                        onError={(e) => { e.currentTarget.style.display = "none"; }}
                      />
                    ) : (
                      <Package size={22} className="text-slate-300" />
                    )}
                  </div>

                  <div className="flex-1 min-w-0">
                    <p className="font-bold text-slate-800 text-sm truncate">
                      {firstItem?.name ?? "Order"}
                      {itemCount > 1 && (
                        <span className="text-slate-400 font-medium"> + {itemCount - 1} more</span>
                      )}
                    </p>
                    <div className="flex items-center gap-3 mt-1 text-xs text-slate-400">
                      <span className="flex items-center gap-1">
                        <Calendar size={11} /> {orderDate.toLocaleDateString("en-IN", dateOptions)}
                      </span>
                      <span>·</span>
                      <span>{order.id}</span>
                    </div>
                  </div>

                  <div className="text-right shrink-0">
                    <p className="text-xs text-slate-400 font-medium">Total</p>
                    <p className="font-black text-slate-900">₹{formatPrice(order.total)}</p>
                  </div>

                  <ChevronRight size={16} className="text-slate-300 shrink-0" />
                </motion.div>
              );
            })}
          </div>
        )}
      </div>
    </div>
  );
}
