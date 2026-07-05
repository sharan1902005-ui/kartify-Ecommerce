import { useState } from "react";
import { motion } from "framer-motion";
import { Eye, EyeOff, Zap, Mail, Lock, User, ArrowRight, ShieldCheck, Truck, Star } from "lucide-react";
import api from "../services/api";

const perks = [
  { icon: ShieldCheck, text: "Secure & encrypted" },
  { icon: Truck,       text: "Free delivery ₹499+" },
  { icon: Star,        text: "4.9★ rated platform" },
];

export default function Register() {
  const [name, setName]         = useState("");
  const [email, setEmail]       = useState("");
  const [password, setPassword] = useState("");
  const [showPw, setShowPw]     = useState(false);
  const [loading, setLoading]   = useState(false);

  const handleRegister = async (e) => {
    e.preventDefault();
    try {
      setLoading(true);
      await api.post("/auth/register", { name, email, password });
      alert("Registered Successfully!");
      window.location.href = "/login";
    } catch (error) {
      alert("Registration Failed");
      console.log(error);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen flex">
      {/* Left panel — branding */}
      <div className="hidden lg:flex lg:w-[45%] relative overflow-hidden flex-col justify-between p-12"
        style={{ background: "linear-gradient(145deg, #0A3D38 0%, #0F766E 60%, #14B8A6 100%)" }}>
        <div className="absolute top-0 right-0 w-[500px] h-[500px] rounded-full opacity-[0.07] pointer-events-none"
          style={{ background: "radial-gradient(circle, white 0%, transparent 70%)", transform: "translate(30%, -30%)" }} />
        <div className="absolute bottom-0 left-0 w-[400px] h-[400px] rounded-full opacity-[0.06] pointer-events-none"
          style={{ background: "radial-gradient(circle, white 0%, transparent 70%)", transform: "translate(-30%, 30%)" }} />
        <div className="absolute inset-0 opacity-[0.03] pointer-events-none"
          style={{ backgroundImage: "radial-gradient(circle, white 1px, transparent 1px)", backgroundSize: "28px 28px" }} />

        <div className="relative z-10 flex items-center gap-3">
          <div className="w-10 h-10 rounded-xl flex items-center justify-center"
            style={{ background: "rgba(255,255,255,0.2)", backdropFilter: "blur(12px)", border: "1px solid rgba(255,255,255,0.3)" }}>
            <Zap size={20} color="white" fill="white" />
          </div>
          <span className="text-white font-black text-2xl tracking-tight">Kartify</span>
        </div>

        <div className="relative z-10">
          <motion.div
            animate={{ y: [0, -12, 0] }}
            transition={{ duration: 4, repeat: Infinity, ease: "easeInOut" }}
            className="w-24 h-24 rounded-3xl flex items-center justify-center mb-8"
            style={{ background: "rgba(255,255,255,0.15)", backdropFilter: "blur(12px)", border: "1px solid rgba(255,255,255,0.25)" }}
          >
            <Zap size={44} color="white" fill="white" />
          </motion.div>
          <h2 className="text-4xl font-black text-white mb-4 leading-tight">
            Join Kartify.<br />Shop Smarter.
          </h2>
          <p className="text-white/65 text-lg leading-relaxed mb-10 max-w-sm">
            Create your free account and unlock exclusive deals, fast delivery, and a premium shopping experience.
          </p>
          <div className="space-y-3">
            {perks.map(({ icon: Icon, text }) => (
              <div key={text} className="flex items-center gap-3">
                <div className="w-8 h-8 rounded-xl flex items-center justify-center shrink-0"
                  style={{ background: "rgba(255,255,255,0.15)" }}>
                  <Icon size={15} color="white" />
                </div>
                <span className="text-white/80 text-sm font-medium">{text}</span>
              </div>
            ))}
          </div>
        </div>

        <p className="relative z-10 text-white/35 text-xs">© {new Date().getFullYear()} Kartify Commerce</p>
      </div>

      {/* Right panel — form */}
      <div className="flex-1 flex items-center justify-center px-6 py-12 bg-slate-50">
        <div className="fixed inset-0 overflow-hidden pointer-events-none lg:hidden">
          <div className="absolute -top-40 -right-40 w-96 h-96 rounded-full bg-teal-100/40 blur-3xl" />
          <div className="absolute -bottom-40 -left-40 w-96 h-96 rounded-full bg-cyan-100/40 blur-3xl" />
        </div>

        <motion.div
          initial={{ opacity: 0, y: 24 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.4, ease: [0.16, 1, 0.3, 1] }}
          className="relative w-full max-w-md"
        >
          {/* Mobile logo */}
          <div className="flex items-center gap-2.5 mb-8 lg:hidden">
            <div className="w-9 h-9 rounded-xl flex items-center justify-center"
              style={{ background: "linear-gradient(135deg, #0F766E, #14B8A6)" }}>
              <Zap size={18} color="white" fill="white" />
            </div>
            <span className="text-xl font-black tracking-tight"
              style={{ background: "linear-gradient(135deg, #0F766E, #0D9488)", WebkitBackgroundClip: "text", WebkitTextFillColor: "transparent" }}>
              Kartify
            </span>
          </div>

          <div className="bg-white rounded-3xl overflow-hidden"
            style={{ boxShadow: "0 8px 48px rgba(0,0,0,0.08), 0 0 0 1px rgba(0,0,0,0.05)" }}>
            <div className="h-1 bg-gradient-to-r from-[#0F766E] via-[#14B8A6] to-[#06B6D4]" />

            <form onSubmit={handleRegister} className="px-8 py-10">
              <h1 className="text-2xl font-black text-slate-900 mb-1">Create account</h1>
              <p className="text-sm text-slate-500 mb-8">Join Kartify and start shopping smarter today.</p>

              <div className="space-y-4">
                <div>
                  <label className="block text-xs font-bold text-slate-500 mb-1.5 uppercase tracking-widest">Full Name</label>
                  <div className="relative">
                    <User size={15} className="absolute left-3.5 top-1/2 -translate-y-1/2 text-slate-400" />
                    <input type="text" value={name} onChange={(e) => setName(e.target.value)}
                      placeholder="John Doe" required
                      className="w-full h-11 pl-10 pr-4 rounded-xl border border-slate-200 bg-slate-50 text-sm text-slate-800 placeholder-slate-400 outline-none focus:border-[#0F766E] focus:bg-white focus:ring-2 focus:ring-teal-100 transition-all" />
                  </div>
                </div>

                <div>
                  <label className="block text-xs font-bold text-slate-500 mb-1.5 uppercase tracking-widest">Email</label>
                  <div className="relative">
                    <Mail size={15} className="absolute left-3.5 top-1/2 -translate-y-1/2 text-slate-400" />
                    <input type="email" value={email} onChange={(e) => setEmail(e.target.value)}
                      placeholder="you@example.com" required
                      className="w-full h-11 pl-10 pr-4 rounded-xl border border-slate-200 bg-slate-50 text-sm text-slate-800 placeholder-slate-400 outline-none focus:border-[#0F766E] focus:bg-white focus:ring-2 focus:ring-teal-100 transition-all" />
                  </div>
                </div>

                <div>
                  <label className="block text-xs font-bold text-slate-500 mb-1.5 uppercase tracking-widest">Password</label>
                  <div className="relative">
                    <Lock size={15} className="absolute left-3.5 top-1/2 -translate-y-1/2 text-slate-400" />
                    <input type={showPw ? "text" : "password"} value={password}
                      onChange={(e) => setPassword(e.target.value)}
                      placeholder="Min. 8 characters" required
                      className="w-full h-11 pl-10 pr-10 rounded-xl border border-slate-200 bg-slate-50 text-sm text-slate-800 placeholder-slate-400 outline-none focus:border-[#0F766E] focus:bg-white focus:ring-2 focus:ring-teal-100 transition-all" />
                    <button type="button" onClick={() => setShowPw((v) => !v)}
                      className="absolute right-3 top-1/2 -translate-y-1/2 text-slate-400 hover:text-slate-600 transition-colors">
                      {showPw ? <EyeOff size={15} /> : <Eye size={15} />}
                    </button>
                  </div>
                </div>
              </div>

              <motion.button
                whileHover={{ scale: 1.02, boxShadow: "0 8px 24px rgba(15,118,110,0.35)" }}
                whileTap={{ scale: 0.97 }}
                type="submit" disabled={loading}
                className="mt-6 w-full h-12 text-white font-bold rounded-xl transition-all flex items-center justify-center gap-2 text-sm disabled:opacity-60"
                style={{ background: "linear-gradient(135deg, #0F766E, #14B8A6)", boxShadow: "0 4px 16px rgba(15,118,110,0.25)" }}
              >
                {loading
                  ? <span className="w-5 h-5 border-2 border-white/30 border-t-white rounded-full animate-spin" />
                  : <>Create Account <ArrowRight size={16} /></>
                }
              </motion.button>

              <p className="mt-6 text-center text-sm text-slate-500">
                Already have an account?{" "}
                <a href="/login" className="font-bold text-[#0F766E] hover:underline">Sign in</a>
              </p>
            </form>
          </div>

          <p className="mt-4 text-center text-xs text-slate-400">Demo project · No real transactions</p>
        </motion.div>
      </div>
    </div>
  );
}
