import { ChevronLeft, ChevronRight } from "lucide-react";
import { motion } from "framer-motion";

function getPages(current, total) {
  if (total <= 7) return Array.from({ length: total }, (_, i) => i + 1);
  const pages = [1];
  const start = Math.max(2, current - 1);
  const end   = Math.min(total - 1, current + 1);
  if (start > 2) pages.push("...");
  for (let p = start; p <= end; p++) pages.push(p);
  if (end < total - 1) pages.push("...");
  pages.push(total);
  return pages;
}

export default function Pagination({ currentPage, totalPages, onPageChange }) {
  if (totalPages <= 1) return null;
  const pages = getPages(currentPage, totalPages);

  return (
    <nav className="mt-10 flex items-center justify-center gap-1.5">
      <motion.button
        whileTap={{ scale: 0.95 }}
        disabled={currentPage === 1}
        onClick={() => onPageChange(currentPage - 1)}
        className="inline-flex items-center gap-1.5 h-9 px-3.5 rounded-xl border border-slate-200 bg-white text-sm font-semibold text-slate-500 hover:text-[#0F766E] hover:border-teal-300 hover:bg-teal-50 disabled:opacity-40 disabled:cursor-not-allowed transition-all"
      >
        <ChevronLeft size={14} /> Prev
      </motion.button>

      {pages.map((page, i) =>
        page === "..." ? (
          <span key={`gap-${i}`} className="w-9 text-center text-slate-400 text-sm select-none">…</span>
        ) : (
          <motion.button
            key={page}
            whileTap={{ scale: 0.92 }}
            onClick={() => onPageChange(page)}
            className="w-9 h-9 rounded-xl text-sm font-bold transition-all"
            style={currentPage === page ? {
              background: "linear-gradient(135deg, #0F766E, #14B8A6)",
              color: "white",
              boxShadow: "0 4px 14px rgba(15,118,110,0.3)",
            } : {
              background: "white",
              color: "#475569",
              border: "1px solid #E2E8F0",
            }}
          >
            {page}
          </motion.button>
        )
      )}

      <motion.button
        whileTap={{ scale: 0.95 }}
        disabled={currentPage === totalPages}
        onClick={() => onPageChange(currentPage + 1)}
        className="inline-flex items-center gap-1.5 h-9 px-3.5 rounded-xl border border-slate-200 bg-white text-sm font-semibold text-slate-500 hover:text-[#0F766E] hover:border-teal-300 hover:bg-teal-50 disabled:opacity-40 disabled:cursor-not-allowed transition-all"
      >
        Next <ChevronRight size={14} />
      </motion.button>
    </nav>
  );
}
