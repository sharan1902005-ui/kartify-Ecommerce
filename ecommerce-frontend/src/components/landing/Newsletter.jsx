import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Mail, ArrowRight, CheckCircle2, Gift } from "lucide-react";

export default function Newsletter() {
  const [email, setEmail] = useState("");
  const [submitted, setSubmitted] = useState(false);

  const handleSubmit = (e) => {
    e.preventDefault();
    if (!email.trim()) return;
    setSubmitted(true);
    setEmail("");
  };

  return (
    <section className="py-28 bg-slate-50">
      <div className="max-w-4xl mx-auto px-6 lg:px-8">
        <motion.div
          initial={{ opacity: 0, y: 30 }} whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }} transition={{ duration: 0.7 }}
          className="relative rounded-[2.5rem] overflow-hidden p-12 md:p-16 text-center"
          style={{ background: "linear-gradient(135deg, #0F766E 0%, #14B8A6 50%, #10B981 100%)", boxShadow: "0 32px 80px rgba(15,118,110,0.3)" }}
        >
          {/* Background decoration */}
          <div className="absolute top-0 right-0 w-80 h-80 rounded-full opacity-10 pointer-events-none"
            style={{ background: "radial-gradient(circle, white 0%, transparent 70%)", transform: "translate(30%, -30%)" }} />
          <div className="absolute bottom-0 left-0 w-60 h-60 rounded-full opacity-10 pointer-events-none"
            style={{ background: "radial-gradient(circle, white 0%, transparent 70%)", transform: "translate(-30%, 30%)" }} />

          <div className="relative z-10">
            <motion.div
              initial={{ scale: 0 }} whileInView={{ scale: 1 }}
              viewport={{ once: true }} transition={{ type: "spring", delay: 0.2 }}
              className="w-16 h-16 rounded-2xl bg-white/20 backdrop-blur-sm flex items-center justify-center mx-auto mb-6"
            >
              <Gift size={28} color="white" />
            </motion.div>

            <h2 className="text-3xl md:text-5xl font-black text-white mb-4">
              Get 10% off your first order
            </h2>
            <p className="text-white/80 text-lg mb-10 max-w-lg mx-auto">
              Subscribe to our newsletter and be the first to know about new arrivals, flash deals, and exclusive offers.
            </p>

            <AnimatePresence mode="wait">
              {submitted ? (
                <motion.div
                  key="success"
                  initial={{ opacity: 0, scale: 0.9 }} animate={{ opacity: 1, scale: 1 }} exit={{ opacity: 0 }}
                  className="flex items-center justify-center gap-3 text-white font-bold text-lg"
                >
                  <CheckCircle2 size={24} />
                  You're in! Check your inbox for your discount code.
                </motion.div>
              ) : (
                <motion.form
                  key="form"
                  initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }}
                  onSubmit={handleSubmit}
                  className="flex flex-col sm:flex-row gap-3 max-w-md mx-auto"
                >
                  <div className="flex-1 relative">
                    <Mail size={16} className="absolute left-4 top-1/2 -translate-y-1/2 text-slate-400" />
                    <input
                      type="email"
                      value={email}
                      onChange={(e) => setEmail(e.target.value)}
                      placeholder="Enter your email"
                      required
                      className="w-full h-14 pl-11 pr-4 rounded-2xl text-slate-800 font-medium text-sm outline-none focus:ring-2 focus:ring-white/50 bg-white"
                    />
                  </div>
                  <motion.button
                    whileHover={{ scale: 1.04 }} whileTap={{ scale: 0.97 }}
                    type="submit"
                    className="h-14 px-7 rounded-2xl font-bold text-sm flex items-center gap-2 shrink-0"
                    style={{ background: "rgba(255,255,255,0.2)", backdropFilter: "blur(10px)", border: "1px solid rgba(255,255,255,0.4)", color: "white" }}
                  >
                    Subscribe <ArrowRight size={16} />
                  </motion.button>
                </motion.form>
              )}
            </AnimatePresence>

            <p className="text-white/50 text-xs mt-5">No spam, ever. Unsubscribe anytime.</p>
          </div>
        </motion.div>
      </div>
    </section>
  );
}
