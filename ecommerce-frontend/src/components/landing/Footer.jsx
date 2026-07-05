import { useNavigate } from "react-router-dom";
import { ShoppingBag, Globe, Share2, Send, Rss, Mail, Phone, MapPin } from "lucide-react";

export default function Footer() {
  const navigate = useNavigate();
  const year = new Date().getFullYear();

  return (
    <footer className="bg-slate-900 text-slate-400 pt-16 pb-8">
      <div className="max-w-6xl mx-auto px-6">
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-10 mb-12">
          {/* Brand */}
          <div>
            <div className="flex items-center gap-2 mb-4">
              <div className="w-9 h-9 rounded-xl flex items-center justify-center"
                style={{ background: "linear-gradient(135deg, #0F766E, #14B8A6)" }}>
                <ShoppingBag size={18} color="white" strokeWidth={1.8} />
              </div>
              <span className="text-white font-black text-xl">Kartify</span>
            </div>
            <p className="text-sm leading-relaxed">Shop Smarter. Live Better. Your premium destination for quality products.</p>
          </div>

          {/* Quick Links */}
          <div>
            <h4 className="text-white font-bold mb-4 text-sm uppercase tracking-wider">Quick Links</h4>
            <ul className="space-y-2 text-sm">
              {[["Home", "/"], ["Products", "/products"], ["Login", "/login"], ["Register", "/register"]].map(([label, path]) => (
                <li key={label}>
                  <button onClick={() => navigate(path)} className="hover:text-teal-400 transition-colors">{label}</button>
                </li>
              ))}
            </ul>
          </div>

          {/* Contact */}
          <div>
            <h4 className="text-white font-bold mb-4 text-sm uppercase tracking-wider">Contact</h4>
            <ul className="space-y-3 text-sm">
              <li className="flex items-center gap-2"><Mail size={14} /><span>support@kartify.in</span></li>
              <li className="flex items-center gap-2"><Phone size={14} /><span>+91 98765 43210</span></li>
              <li className="flex items-center gap-2"><MapPin size={14} /><span>Bengaluru, India</span></li>
            </ul>
          </div>

          {/* Social */}
          <div>
            <h4 className="text-white font-bold mb-4 text-sm uppercase tracking-wider">Follow Us</h4>
            <div className="flex gap-3">
              {[Globe, Share2, Send, Rss].map((Icon, i) => (
                <a key={i} href="#" className="w-9 h-9 rounded-xl bg-slate-800 flex items-center justify-center hover:bg-teal-700 transition-colors">
                  <Icon size={16} color="#94A3B8" />
                </a>
              ))}
            </div>
          </div>
        </div>

        <div className="border-t border-slate-800 pt-6 flex flex-col sm:flex-row justify-between items-center gap-2 text-xs">
          <span>© {year} Kartify. All rights reserved.</span>
          <span>Made with ❤️ in India</span>
        </div>
      </div>
    </footer>
  );
}
