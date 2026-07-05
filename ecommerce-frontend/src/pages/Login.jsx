import { useState } from "react";
import { motion } from "framer-motion";
import { Eye, EyeOff, Zap, Mail, Lock, ArrowRight } from "lucide-react";
import api from "../services/api";

export default function Login() {
  const [email, setEmail]       = useState("");
  const [password, setPassword] = useState("");
  const [showPw, setShowPw]     = useState(false);
  const [loading, setLoading]   = useState(false);

  // ── Existing API call — untouched ──────────────────────────────────────────
  const handleLogin = async () => {
    try {
      setLoading(true);
      const response = await api.post("/auth/login", { email, password });
      localStorage.setItem("token", response.data.token);
      alert("Login Successful!");
      window.location.href = "/products";
    } catch (error) {
      alert("Login Failed");
      console.log(error);
    } finally {
      setLoading(false);
    }
  };

  const handleKeyDown = (e) => { if (e.key === "Enter") handleLogin(); };

  return (
    <div className="min-h-screen bg-gradient-to-br from-[#F0FDFA] via-[#F8FAFC] to-[#EFF6FF] flex items-center justify-center px-4">
      {/* Background blobs */}
      <div className="fixed inset-0 overflow-hidden pointer-events-none">
        <div className="absolute -top-40 -right-40 w-96 h-96 rounded-full bg-teal-100/50 blur-3xl" />
        <div className="absolute -bottom-40 -left-40 w-96 h-96 rounded-full bg-cyan-100/50 blur-3xl" />
      </div>

      <motion.div
        initial={{ opacity: 0, y: 24 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.4 }}
        className="relative w-full max-w-md"
      >
        {/* Card */}
        <div className="bg-white rounded-3xl shadow-2xl shadow-slate-200/60 border border-slate-100 overflow-hidden">
          {/* Top accent */}
          <div className="h-1.5 bg-gradient-to-r from-[#0F766E] via-[#14B8A6] to-[#06B6D4]" />

          <div className="px-8 py-10">
            {/* Logo */}
            <div className="flex items-center gap-2.5 mb-8">
              <div className="w-10 h-10 rounded-xl bg-[#0F766E] flex items-center justify-center shadow-lg shadow-teal-200">
                <Zap size={20} className="text-white" fill="white" />
              </div>
              <span className="text-2xl font-black text-[#0F766E] tracking-tight">Kartify</span>
            </div>

            <h1 className="text-2xl font-black text-slate-900 mb-1">Welcome back</h1>
            <p className="text-sm text-slate-500 mb-8">Sign in to your account to continue shopping.</p>

            {/* Fields */}
            <div className="space-y-4">
              <div>
                <label className="block text-xs font-bold text-slate-600 mb-1.5 uppercase tracking-wide">Email</label>
                <div className="relative">
                  <Mail size={16} className="absolute left-3.5 top-1/2 -translate-y-1/2 text-slate-400" />
                  <input
                    type="email"
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    onKeyDown={handleKeyDown}
                    placeholder="you@example.com"
                    className="w-full h-11 pl-10 pr-4 rounded-xl border border-slate-200 bg-slate-50 text-sm text-slate-800 placeholder-slate-400 outline-none focus:border-[#0F766E] focus:bg-white focus:ring-2 focus:ring-teal-100 transition-all"
                  />
                </div>
              </div>

              <div>
                <label className="block text-xs font-bold text-slate-600 mb-1.5 uppercase tracking-wide">Password</label>
                <div className="relative">
                  <Lock size={16} className="absolute left-3.5 top-1/2 -translate-y-1/2 text-slate-400" />
                  <input
                    type={showPw ? "text" : "password"}
                    value={password}
                    onChange={(e) => setPassword(e.target.value)}
                    onKeyDown={handleKeyDown}
                    placeholder="••••••••"
                    className="w-full h-11 pl-10 pr-10 rounded-xl border border-slate-200 bg-slate-50 text-sm text-slate-800 placeholder-slate-400 outline-none focus:border-[#0F766E] focus:bg-white focus:ring-2 focus:ring-teal-100 transition-all"
                  />
                  <button
                    type="button"
                    onClick={() => setShowPw((v) => !v)}
                    className="absolute right-3 top-1/2 -translate-y-1/2 text-slate-400 hover:text-slate-600 transition-colors"
                  >
                    {showPw ? <EyeOff size={16} /> : <Eye size={16} />}
                  </button>
                </div>
              </div>
            </div>

            {/* Submit */}
            <motion.button
              whileHover={{ scale: 1.02 }}
              whileTap={{ scale: 0.97 }}
              onClick={handleLogin}
              disabled={loading}
              className="mt-6 w-full h-12 bg-[#0F766E] hover:bg-[#0D6B63] disabled:bg-slate-300 text-white font-bold rounded-xl transition-colors shadow-lg shadow-teal-200/50 flex items-center justify-center gap-2 text-sm"
            >
              {loading ? (
                <span className="w-5 h-5 border-2 border-white/30 border-t-white rounded-full animate-spin" />
              ) : (
                <>Sign In <ArrowRight size={16} /></>
              )}
            </motion.button>

            {/* Register link */}
            <p className="mt-6 text-center text-sm text-slate-500">
              Don't have an account?{" "}
              <a href="/register" className="font-bold text-[#0F766E] hover:underline">
                Create one
              </a>
            </p>
          </div>
        </div>

        {/* Demo hint */}
        <p className="mt-4 text-center text-xs text-slate-400">
          Demo project · No real transactions
        </p>
      </motion.div>
    </div>
  );
}
