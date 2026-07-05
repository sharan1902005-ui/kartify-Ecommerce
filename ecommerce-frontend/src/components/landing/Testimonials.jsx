import { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Star, ChevronLeft, ChevronRight } from "lucide-react";

const reviews = [
  { name: "Priya Sharma", role: "Fashion Enthusiast", avatar: "PS", rating: 5, text: "Kartify completely changed how I shop online. The interface is so clean and the delivery is incredibly fast. I'm hooked!" },
  { name: "Arjun Mehta", role: "Tech Buyer", avatar: "AM", rating: 5, text: "Found the best deals on electronics here. The product descriptions are detailed and reviews are genuinely helpful." },
  { name: "Sneha Patel", role: "Home Decor Lover", avatar: "SP", rating: 5, text: "The Home & Kitchen section is amazing. Easy returns made me confident to try new products. Highly recommend!" },
  { name: "Rahul Verma", role: "Sports Gear Collector", avatar: "RV", rating: 5, text: "Secure checkout, fast shipping, and great product quality. Kartify is my go-to for everything sports-related." },
];

export default function Testimonials() {
  const [current, setCurrent] = useState(0);

  useEffect(() => {
    const t = setInterval(() => setCurrent(c => (c + 1) % reviews.length), 4000);
    return () => clearInterval(t);
  }, []);

  const prev = () => setCurrent(c => (c - 1 + reviews.length) % reviews.length);
  const next = () => setCurrent(c => (c + 1) % reviews.length);

  return (
    <section className="py-24 bg-gradient-to-b from-slate-50 to-white">
      <div className="max-w-4xl mx-auto px-6">
        <motion.div
          initial={{ opacity: 0, y: 20 }} whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }} transition={{ duration: 0.6 }}
          className="text-center mb-14"
        >
          <p className="text-sm font-semibold uppercase tracking-widest text-teal-600 mb-2">Reviews</p>
          <h2 className="text-3xl md:text-4xl font-black text-slate-900">Loved by shoppers</h2>
        </motion.div>

        <div className="relative">
          <AnimatePresence mode="wait">
            <motion.div
              key={current}
              initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} exit={{ opacity: 0, y: -20 }}
              transition={{ duration: 0.4 }}
              className="rounded-3xl p-10 text-center"
              style={{ background: "rgba(255,255,255,0.7)", backdropFilter: "blur(20px)", border: "1px solid rgba(20,184,166,0.15)", boxShadow: "0 8px 48px rgba(15,118,110,0.1)" }}
            >
              <div className="flex justify-center gap-1 mb-6">
                {Array.from({ length: reviews[current].rating }).map((_, i) => (
                  <Star key={i} size={18} fill="#F59E0B" color="#F59E0B" />
                ))}
              </div>
              <p className="text-lg md:text-xl text-slate-700 leading-relaxed mb-8 font-medium">
                "{reviews[current].text}"
              </p>
              <div className="flex items-center justify-center gap-3">
                <div className="w-11 h-11 rounded-full flex items-center justify-center text-white font-bold text-sm"
                  style={{ background: "linear-gradient(135deg, #0F766E, #14B8A6)" }}>
                  {reviews[current].avatar}
                </div>
                <div className="text-left">
                  <div className="font-bold text-slate-900 text-sm">{reviews[current].name}</div>
                  <div className="text-xs text-slate-500">{reviews[current].role}</div>
                </div>
              </div>
            </motion.div>
          </AnimatePresence>

          <div className="flex justify-center items-center gap-4 mt-8">
            <button onClick={prev} className="w-10 h-10 rounded-full border border-slate-200 flex items-center justify-center hover:border-teal-400 transition-colors">
              <ChevronLeft size={18} color="#64748B" />
            </button>
            <div className="flex gap-2">
              {reviews.map((_, i) => (
                <button key={i} onClick={() => setCurrent(i)}
                  className="w-2 h-2 rounded-full transition-all"
                  style={{ background: i === current ? "#0F766E" : "#CBD5E1", width: i === current ? "24px" : "8px" }} />
              ))}
            </div>
            <button onClick={next} className="w-10 h-10 rounded-full border border-slate-200 flex items-center justify-center hover:border-teal-400 transition-colors">
              <ChevronRight size={18} color="#64748B" />
            </button>
          </div>
        </div>
      </div>
    </section>
  );
}
