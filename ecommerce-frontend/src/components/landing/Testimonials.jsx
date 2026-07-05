import { useState, useEffect, useRef } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Star, Quote } from "lucide-react";

const reviews = [
  { name: "Priya Sharma", role: "Fashion Enthusiast", avatar: "PS", color: "#0F766E", rating: 5, text: "Kartify completely changed how I shop online. The interface is so clean and the delivery is incredibly fast. I'm absolutely hooked!" },
  { name: "Arjun Mehta", role: "Tech Buyer", avatar: "AM", color: "#6366F1", rating: 5, text: "Found the best deals on electronics here. The product descriptions are detailed and reviews are genuinely helpful. 10/10 experience." },
  { name: "Sneha Patel", role: "Home Decor Lover", avatar: "SP", color: "#F59E0B", rating: 5, text: "The Home & Kitchen section is amazing. Easy returns made me confident to try new products. Highly recommend to everyone!" },
  { name: "Rahul Verma", role: "Sports Gear Collector", avatar: "RV", color: "#EF4444", rating: 5, text: "Secure checkout, fast shipping, and great product quality. Kartify is my go-to for everything sports-related. Love it!" },
  { name: "Meera Nair", role: "Book Lover", avatar: "MN", color: "#10B981", rating: 5, text: "The book collection is fantastic and prices are unbeatable. Got my order in 2 days. Will definitely shop again!" },
  { name: "Vikram Singh", role: "Gadget Enthusiast", avatar: "VS", color: "#8B5CF6", rating: 5, text: "Premium products at fair prices. The search and filter features make it so easy to find exactly what I need." },
];

function ReviewCard({ review }) {
  return (
    <div
      className="relative p-7 rounded-3xl flex flex-col gap-4 shrink-0 w-80"
      style={{ background: "white", border: "1px solid rgba(0,0,0,0.07)", boxShadow: "0 4px 24px rgba(0,0,0,0.06)" }}
    >
      <Quote size={24} color={review.color} style={{ opacity: 0.2 }} className="absolute top-5 right-5" />
      <div className="flex gap-1">
        {Array.from({ length: review.rating }).map((_, i) => (
          <Star key={i} size={13} fill="#F59E0B" color="#F59E0B" />
        ))}
      </div>
      <p className="text-slate-600 text-sm leading-relaxed flex-1">"{review.text}"</p>
      <div className="flex items-center gap-3">
        <div
          className="w-10 h-10 rounded-full flex items-center justify-center text-white font-bold text-sm shrink-0"
          style={{ background: `linear-gradient(135deg, ${review.color}, ${review.color}99)` }}
        >
          {review.avatar}
        </div>
        <div>
          <div className="font-bold text-slate-800 text-sm">{review.name}</div>
          <div className="text-xs text-slate-500">{review.role}</div>
        </div>
      </div>
    </div>
  );
}

function MarqueeRow({ items, reverse = false }) {
  const trackRef = useRef(null);
  const doubled = [...items, ...items];

  return (
    <div className="overflow-hidden">
      <motion.div
        ref={trackRef}
        className="flex gap-5 py-2"
        animate={{ x: reverse ? ["-50%", "0%"] : ["0%", "-50%"] }}
        transition={{ duration: 30, repeat: Infinity, ease: "linear" }}
      >
        {doubled.map((r, i) => (
          <ReviewCard key={`${r.name}-${i}`} review={r} />
        ))}
      </motion.div>
    </div>
  );
}

export default function Testimonials() {
  const [featured, setFeatured] = useState(0);

  useEffect(() => {
    const t = setInterval(() => setFeatured((c) => (c + 1) % reviews.length), 4500);
    return () => clearInterval(t);
  }, []);

  return (
    <section id="reviews" className="py-28 bg-slate-50 overflow-hidden">
      <div className="max-w-7xl mx-auto px-6 lg:px-8">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
          className="text-center mb-16"
        >
          <p className="text-sm font-bold uppercase tracking-widest text-teal-600 mb-3">Reviews</p>
          <h2 className="text-4xl md:text-5xl font-black text-slate-900 mb-4">Loved by shoppers</h2>
          <div className="flex items-center justify-center gap-2">
            {Array.from({ length: 5 }).map((_, i) => <Star key={i} size={20} fill="#F59E0B" color="#F59E0B" />)}
            <span className="text-slate-600 font-bold ml-2">4.9 · 10,000+ reviews</span>
          </div>
        </motion.div>

        {/* Featured rotating review */}
        <div className="max-w-2xl mx-auto mb-14">
          <AnimatePresence mode="wait">
            <motion.div
              key={featured}
              initial={{ opacity: 0, y: 16 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -16 }}
              transition={{ duration: 0.4 }}
              className="relative p-10 rounded-3xl text-center"
              style={{
                background: "linear-gradient(135deg, rgba(15,118,110,0.04), rgba(16,185,129,0.04))",
                border: "1px solid rgba(15,118,110,0.12)",
                boxShadow: "0 8px 48px rgba(15,118,110,0.08)",
              }}
            >
              <Quote size={40} color="#0F766E" style={{ opacity: 0.15 }} className="mx-auto mb-4" />
              <p className="text-lg text-slate-700 leading-relaxed mb-8 font-medium">"{reviews[featured].text}"</p>
              <div className="flex items-center justify-center gap-3">
                <div
                  className="w-12 h-12 rounded-full flex items-center justify-center text-white font-bold"
                  style={{ background: `linear-gradient(135deg, ${reviews[featured].color}, ${reviews[featured].color}99)` }}
                >
                  {reviews[featured].avatar}
                </div>
                <div className="text-left">
                  <div className="font-bold text-slate-900">{reviews[featured].name}</div>
                  <div className="text-sm text-slate-500">{reviews[featured].role}</div>
                </div>
              </div>
            </motion.div>
          </AnimatePresence>

          <div className="flex justify-center gap-2 mt-6">
            {reviews.map((_, i) => (
              <button
                key={i}
                onClick={() => setFeatured(i)}
                className="h-2 rounded-full transition-all duration-300"
                style={{ width: i === featured ? "24px" : "8px", background: i === featured ? "#0F766E" : "#CBD5E1" }}
              />
            ))}
          </div>
        </div>
      </div>

      {/* Marquee rows */}
      <div className="space-y-5">
        <MarqueeRow items={reviews} />
        <MarqueeRow items={[...reviews].reverse()} reverse />
      </div>
    </section>
  );
}
