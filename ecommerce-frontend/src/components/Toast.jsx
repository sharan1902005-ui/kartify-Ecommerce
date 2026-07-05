import { useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { AlertCircle, Info, X } from "lucide-react";

export function Toast({ message, type = "error", onClose }) {
  useEffect(() => {
    if (!message) return;
    const timer = setTimeout(onClose, 4000);
    return () => clearTimeout(timer);
  }, [message, onClose]);

  const isError = type === "error";

  return (
    <AnimatePresence>
      {message && (
        <motion.div
          initial={{ opacity: 0, y: -20, x: "-50%" }}
          animate={{ opacity: 1, y: 0, x: "-50%" }}
          exit={{ opacity: 0, y: -20, x: "-50%" }}
          className={`fixed top-5 left-1/2 z-[100] flex items-center gap-2.5 px-4 py-3 rounded-xl shadow-lg border text-sm font-semibold ${
            isError
              ? "bg-red-50 border-red-200 text-red-700"
              : "bg-white border-slate-200 text-slate-700"
          }`}
        >
          {isError ? <AlertCircle size={16} /> : <Info size={16} className="text-[#0F766E]" />}
          {message}
          <button onClick={onClose} className="ml-1 text-slate-400 hover:text-slate-600">
            <X size={14} />
          </button>
        </motion.div>
      )}
    </AnimatePresence>
  );
}
