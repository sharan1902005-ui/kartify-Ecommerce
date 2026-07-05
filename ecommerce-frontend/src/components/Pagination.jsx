import { ChevronLeft, ChevronRight } from "lucide-react";
import { motion } from "framer-motion";

function getPages(current, total) {
  if (total <= 7) return Array.from({ length: total }, (_, i) => i + 1);
  const pages = [1];
  const start = Math.max(2, current - 1);
  const end = Math.min(total - 1, current + 1);
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
      <button
        disabled={currentPage === 1}
        onClick={() => onPageChange(currentPage - 1)}
        className="inline-flex items-center gap-1.5 h-9 px-3 rounded-xl border border-slate-200 bg-white text-sm font-semibold text-slate-500 hover:text-[#0F766E] hover:border-[#0F766E] disabled:opacity-40 disabled:cursor-not-allowed transition-colors"
      >
        <ChevronLeft size={15} /> Prev
      </button>

      {pages.map((page, i) =>
        page === "..." ? (
          <span key={`gap-${i}`} className="w-9 text-center text-slate-400 text-sm">…</span>
        ) : (
          <motion.button
            key={page}
            whileTap={{ scale: 0.92 }}
            onClick={() => onPageChange(page)}
            className={`w-9 h-9 rounded-xl text-sm font-bold transition-all ${
              currentPage === page
                ? "bg-[#0F766E] text-white shadow-md shadow-teal-200"
                : "bg-white border border-slate-200 text-slate-600 hover:border-[#0F766E] hover:text-[#0F766E]"
            }`}
          >
            {page}
          </motion.button>
        )
      )}

      <button
        disabled={currentPage === totalPages}
        onClick={() => onPageChange(currentPage + 1)}
        className="inline-flex items-center gap-1.5 h-9 px-3 rounded-xl border border-slate-200 bg-white text-sm font-semibold text-slate-500 hover:text-[#0F766E] hover:border-[#0F766E] disabled:opacity-40 disabled:cursor-not-allowed transition-colors"
      >
        Next <ChevronRight size={15} />
      </button>
    </nav>
  );
}
