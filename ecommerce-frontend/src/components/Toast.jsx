import { useState, useCallback, useEffect, createContext, useContext, useRef } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { CheckCircle2, AlertCircle, Info, X, ShoppingCart, Heart, Package, LogIn, Trash2 } from "lucide-react";

/* ── Types ──────────────────────────────────────────────────────────────── */
const ICONS = {
  success:  { Icon: CheckCircle2, bg: "#F0FDF4", border: "#BBF7D0", text: "#15803D", icon: "#22C55E" },
  error:    { Icon: AlertCircle,  bg: "#FFF1F2", border: "#FECDD3", text: "#BE123C", icon: "#F43F5E" },
  info:     { Icon: Info,         bg: "#F0FDFA", border: "#99F6E4", text: "#0F766E", icon: "#14B8A6" },
  cart:     { Icon: ShoppingCart, bg: "#F0FDFA", border: "#99F6E4", text: "#0F766E", icon: "#0F766E" },
  wishlist: { Icon: Heart,        bg: "#FFF1F2", border: "#FECDD3", text: "#BE123C", icon: "#F43F5E" },
  order:    { Icon: Package,      bg: "#F0FDF4", border: "#BBF7D0", text: "#15803D", icon: "#22C55E" },
  login:    { Icon: LogIn,        bg: "#F0FDFA", border: "#99F6E4", text: "#0F766E", icon: "#14B8A6" },
  remove:   { Icon: Trash2,       bg: "#FFF7ED", border: "#FED7AA", text: "#C2410C", icon: "#F97316" },
};

/* ── Context ────────────────────────────────────────────────────────────── */
const ToastCtx = createContext(null);

let _addToast = null;

export function toast(message, type = "info") {
  _addToast?.({ message, type, id: Date.now() + Math.random() });
}
toast.success  = (msg) => toast(msg, "success");
toast.error    = (msg) => toast(msg, "error");
toast.info     = (msg) => toast(msg, "info");
toast.cart     = (msg) => toast(msg, "cart");
toast.wishlist = (msg) => toast(msg, "wishlist");
toast.order    = (msg) => toast(msg, "order");
toast.login    = (msg) => toast(msg, "login");
toast.remove   = (msg) => toast(msg, "remove");

/* ── Single toast item ──────────────────────────────────────────────────── */
function ToastItem({ id, message, type, onRemove }) {
  const cfg = ICONS[type] || ICONS.info;
  const { Icon } = cfg;
  const timerRef = useRef(null);

  useEffect(() => {
    timerRef.current = setTimeout(() => onRemove(id), 4000);
    return () => clearTimeout(timerRef.current);
  }, [id, onRemove]);

  return (
    <motion.div
      layout
      initial={{ opacity: 0, y: -16, scale: 0.95 }}
      animate={{ opacity: 1, y: 0, scale: 1 }}
      exit={{ opacity: 0, y: -12, scale: 0.95 }}
      transition={{ type: "spring", stiffness: 400, damping: 28 }}
      className="flex items-center gap-3 px-4 py-3.5 rounded-2xl shadow-xl min-w-[280px] max-w-sm cursor-pointer select-none"
      style={{
        background: cfg.bg,
        border: `1px solid ${cfg.border}`,
        boxShadow: `0 8px 32px ${cfg.icon}22`,
      }}
      onClick={() => onRemove(id)}
    >
      <div className="w-8 h-8 rounded-xl flex items-center justify-center shrink-0" style={{ background: `${cfg.icon}18` }}>
        <Icon size={16} color={cfg.icon} />
      </div>
      <span className="text-sm font-semibold flex-1" style={{ color: cfg.text }}>{message}</span>
      <button
        onClick={(e) => { e.stopPropagation(); onRemove(id); }}
        className="shrink-0 opacity-50 hover:opacity-100 transition-opacity"
        style={{ color: cfg.text }}
      >
        <X size={14} />
      </button>
    </motion.div>
  );
}

/* ── Container (mount once in App or root) ──────────────────────────────── */
export function ToastContainer() {
  const [toasts, setToasts] = useState([]);

  const add = useCallback((t) => {
    setToasts((prev) => [t, ...prev].slice(0, 5));
  }, []);

  const remove = useCallback((id) => {
    setToasts((prev) => prev.filter((t) => t.id !== id));
  }, []);

  useEffect(() => { _addToast = add; return () => { _addToast = null; }; }, [add]);

  return (
    <div className="fixed top-5 right-5 z-[500] flex flex-col gap-2.5 items-end pointer-events-none">
      <AnimatePresence mode="popLayout">
        {toasts.map((t) => (
          <div key={t.id} className="pointer-events-auto">
            <ToastItem {...t} onRemove={remove} />
          </div>
        ))}
      </AnimatePresence>
    </div>
  );
}

/* ── Legacy compat shim (keeps old <Toast> usage working) ───────────────── */
export function Toast({ message, type = "error", onClose }) {
  useEffect(() => {
    if (!message) return;
    const t = setTimeout(onClose, 4000);
    return () => clearTimeout(t);
  }, [message, onClose]);

  if (!message) return null;
  const cfg = type === "error" ? ICONS.error : ICONS.info;
  const { Icon } = cfg;

  return (
    <AnimatePresence>
      {message && (
        <motion.div
          initial={{ opacity: 0, y: -20, x: "-50%" }}
          animate={{ opacity: 1, y: 0, x: "-50%" }}
          exit={{ opacity: 0, y: -20, x: "-50%" }}
          className="fixed top-5 left-1/2 z-[500] flex items-center gap-2.5 px-4 py-3 rounded-2xl shadow-xl text-sm font-semibold"
          style={{ background: cfg.bg, border: `1px solid ${cfg.border}`, color: cfg.text }}
        >
          <Icon size={16} color={cfg.icon} />
          {message}
          <button onClick={onClose} className="ml-1 opacity-50 hover:opacity-100"><X size={14} /></button>
        </motion.div>
      )}
    </AnimatePresence>
  );
}
