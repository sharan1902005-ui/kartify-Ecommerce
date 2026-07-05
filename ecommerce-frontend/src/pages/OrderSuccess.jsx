import { useEffect } from "react";
import { useNavigate, useLocation } from "react-router-dom";
import { motion } from "framer-motion";
import { CheckCircle2, Package, Calendar, CreditCard, ShoppingBag, ListOrdered } from "lucide-react";

function formatPrice(price) {
  return new Intl.NumberFormat("en-IN", { maximumFractionDigits: 0 }).format(Number(price) || 0);
}

export default function OrderSuccess() {
  const navigate = useNavigate();
  const location = useLocation();
  const order = location.state?.order;

  useEffect(() => {
    if (!order) navigate("/products", { replace: true });
  }, [order, navigate]);

  if (!order) return null;

  const orderDate = new Date(order.date);
  const deliveryStart = new Date(orderDate);
  deliveryStart.setDate(deliveryStart.getDate() + 3);
  const deliveryEnd = new Date(orderDate);
  deliveryEnd.setDate(deliveryEnd.getDate() + 5);

  const dateOptions = { day: "numeric", month: "short", year: "numeric" };

  return (
    <div className="min-h-screen bg-[#F8FAFC] flex items-center justify-center px-4 py-12">
      <motion.div
        initial={{ opacity: 0, y: 24 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.4, ease: "easeOut" }}
        className="w-full max-w-lg bg-white rounded-3xl shadow-xl border border-slate-100 p-8 sm:p-10"
      >
        {/* Animated checkmark */}
        <div className="flex justify-center mb-6">
          <motion.div
            initial={{ scale: 0 }}
            animate={{ scale: 1 }}
            transition={{ type: "spring", stiffness: 200, damping: 12, delay: 0.1 }}
            className="w-20 h-20 rounded-full bg-green-50 flex items-center justify-center"
          >
            <CheckCircle2 size={48} className="text-green-500" strokeWidth={2} />
          </motion.div>
        </div>

        <motion.h1
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.4 }}
          className="text-2xl font-black text-slate-900 text-center mb-1"
        >
          Order Placed Successfully
        </motion.h1>
        <p className="text-sm text-slate-500 text-center mb-8">
          Thank you for shopping with Kartify
        </p>

        {/* Order details card */}
        <motion.div
          initial={{ opacity: 0, y: 10 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.5 }}
          className="bg-slate-50 rounded-2xl border border-slate-100 p-5 space-y-4 mb-6"
        >
          <div className="flex items-center justify-between">
            <span className="flex items-center gap-2 text-sm text-slate-500 font-medium">
              <Package size={15} /> Order ID
            </span>
            <span className="text-sm font-bold text-slate-800">{order.id}</span>
          </div>
          <div className="flex items-center justify-between">
            <span className="flex items-center gap-2 text-sm text-slate-500 font-medium">
              <Calendar size={15} /> Order Date
            </span>
            <span className="text-sm font-bold text-slate-800">
              {orderDate.toLocaleDateString("en-IN", dateOptions)}
            </span>
          </div>
          <div className="flex items-center justify-between">
            <span className="flex items-center gap-2 text-sm text-slate-500 font-medium">
              <ListOrdered size={15} /> Estimated Delivery
            </span>
            <span className="text-sm font-bold text-slate-800">
              {deliveryStart.toLocaleDateString("en-IN", dateOptions)} – {deliveryEnd.toLocaleDateString("en-IN", dateOptions)}
            </span>
          </div>
          <div className="flex items-center justify-between">
            <span className="flex items-center gap-2 text-sm text-slate-500 font-medium">
              <CreditCard size={15} /> Payment Status
            </span>
            <span className="text-sm font-bold text-green-600">Successful</span>
          </div>
          <div className="border-t border-slate-200 pt-4 flex items-center justify-between">
            <span className="text-sm font-bold text-slate-700">Total Amount</span>
            <span className="text-lg font-black text-slate-900">₹{formatPrice(order.total)}</span>
          </div>
        </motion.div>

        {/* Buttons */}
        <motion.div
          initial={{ opacity: 0, y: 10 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.6 }}
          className="flex flex-col sm:flex-row gap-3"
        >
          <button
            onClick={() => navigate("/products")}
            className="flex-1 flex items-center justify-center gap-2 py-3 rounded-xl border border-slate-200 text-slate-700 font-bold text-sm hover:bg-slate-50 transition-colors"
          >
            <ShoppingBag size={16} /> Continue Shopping
          </button>
          <button
            onClick={() => navigate("/products")}
            className="flex-1 flex items-center justify-center gap-2 py-3 rounded-xl bg-[#0F766E] hover:bg-[#0D6B63] text-white font-bold text-sm transition-colors"
          >
            <ListOrdered size={16} /> View Orders
          </button>
        </motion.div>
      </motion.div>
    </div>
  );
}
