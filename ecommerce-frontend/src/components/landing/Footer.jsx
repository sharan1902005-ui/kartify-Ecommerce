import { useNavigate } from "react-router-dom";
import { motion } from "framer-motion";
import {
  Zap, Mail, Phone, MapPin, ArrowRight,
  ShieldCheck, Truck, RotateCcw,
  Share2, AtSign, Globe, Play,
} from "lucide-react";

const links = {
  Shop:    [["All Products", "/products"], ["Electronics", "/products"], ["Home & Kitchen", "/products"], ["Books", "/products"], ["Sports", "/products"]],
  Account: [["Login", "/login"], ["Register", "/register"], ["My Orders", "/orders"], ["Cart", "/cart"]],
  Company: [["About Us", "#"], ["Careers", "#"], ["Press", "#"], ["Blog", "#"]],
};

const socials = [
  { Icon: Share2, href: "#", label: "Twitter" },
  { Icon: AtSign, href: "#", label: "Instagram" },
  { Icon: Globe,  href: "#", label: "Facebook" },
  { Icon: Play,   href: "#", label: "YouTube" },
];

const badges = [
  { icon: ShieldCheck, label: "Secure Payments", sub: "256-bit SSL" },
  { icon: Truck,       label: "Fast Delivery",   sub: "Within 2-3 days" },
  { icon: RotateCcw,   label: "Easy Returns",    sub: "30-day policy" },
];

export default function Footer() {
  const navigate = useNavigate();
  const year = new Date().getFullYear();

  return (
    <footer className="bg-slate-950 text-slate-400">
      {/* Trust badges strip */}
      <div className="border-b border-slate-800/80">
        <div className="max-w-7xl mx-auto px-6 lg:px-8 py-6 flex flex-wrap items-center justify-center md:justify-between gap-6">
          {badges.map(({ icon: Icon, label, sub }) => (
            <div key={label} className="flex items-center gap-3 text-slate-300">
              <div className="w-9 h-9 rounded-xl flex items-center justify-center shrink-0"
                style={{ background: "rgba(15,118,110,0.18)" }}>
                <Icon size={16} color="#14B8A6" />
              </div>
              <div>
                <div className="text-sm font-semibold text-slate-200">{label}</div>
                <div className="text-xs text-slate-500">{sub}</div>
              </div>
            </div>
          ))}
          <motion.button
            whileHover={{ scale: 1.04, boxShadow: "0 8px 24px rgba(15,118,110,0.4)" }}
            whileTap={{ scale: 0.97 }}
            onClick={() => navigate("/products")}
            className="flex items-center gap-2 px-6 py-2.5 rounded-xl font-bold text-sm text-white"
            style={{ background: "linear-gradient(135deg, #0F766E, #14B8A6)" }}
          >
            Shop Now <ArrowRight size={15} />
          </motion.button>
        </div>
      </div>

      {/* Main footer */}
      <div className="max-w-7xl mx-auto px-6 lg:px-8 pt-16 pb-10">
        <div className="grid grid-cols-2 md:grid-cols-5 gap-10 mb-14">

          {/* Brand */}
          <div className="col-span-2">
            <div className="flex items-center gap-2.5 mb-5 cursor-pointer" onClick={() => navigate("/")}>
              <div className="w-10 h-10 rounded-xl flex items-center justify-center"
                style={{ background: "linear-gradient(135deg, #0F766E, #14B8A6)" }}>
                <Zap size={20} color="white" fill="white" />
              </div>
              <span className="text-white font-black text-2xl tracking-tight">Kartify</span>
            </div>
            <p className="text-sm leading-relaxed mb-6 max-w-xs text-slate-500">
              Shop Smarter. Live Better. Your premium destination for quality products at unbeatable prices.
            </p>
            <div className="space-y-2.5 text-sm">
              <div className="flex items-center gap-2.5 text-slate-500 hover:text-slate-300 transition-colors">
                <Mail size={13} /><span>support@kartify.in</span>
              </div>
              <div className="flex items-center gap-2.5 text-slate-500 hover:text-slate-300 transition-colors">
                <Phone size={13} /><span>+91 98765 43210</span>
              </div>
              <div className="flex items-center gap-2.5 text-slate-500 hover:text-slate-300 transition-colors">
                <MapPin size={13} /><span>Bengaluru, Karnataka, India</span>
              </div>
            </div>
          </div>

          {/* Link columns */}
          {Object.entries(links).map(([heading, items]) => (
            <div key={heading}>
              <h4 className="text-slate-200 font-bold mb-5 text-xs uppercase tracking-widest">{heading}</h4>
              <ul className="space-y-3 text-sm">
                {items.map(([label, path]) => (
                  <li key={label}>
                    <button onClick={() => navigate(path)}
                      className="text-slate-500 hover:text-teal-400 transition-colors text-left">
                      {label}
                    </button>
                  </li>
                ))}
              </ul>
            </div>
          ))}
        </div>

        {/* Bottom bar */}
        <div className="border-t border-slate-800/80 pt-8 flex flex-col md:flex-row items-center justify-between gap-6">
          <p className="text-xs text-slate-600">
            © {year} Kartify Commerce Pvt. Ltd. All rights reserved. Made with ❤️ in India.
          </p>

          {/* Socials */}
          <div className="flex items-center gap-2">
            {socials.map(({ Icon, href, label }) => (
              <motion.a key={label} href={href} whileHover={{ scale: 1.15, y: -2 }}
                className="w-9 h-9 rounded-xl bg-slate-800 flex items-center justify-center hover:bg-slate-700 transition-colors"
                title={label}>
                <Icon size={15} color="#64748B" />
              </motion.a>
            ))}
          </div>

          {/* Payment icons */}
          <div className="flex items-center gap-2 text-xs">
            {["Visa", "Mastercard", "UPI", "PayTM", "RazorPay"].map((p) => (
              <span key={p} className="px-2.5 py-1 rounded-lg bg-slate-800 font-semibold text-slate-500 border border-slate-700/50">
                {p}
              </span>
            ))}
          </div>
        </div>
      </div>
    </footer>
  );
}
