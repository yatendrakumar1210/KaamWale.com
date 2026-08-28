import React from 'react';
import { Link } from 'react-router-dom';
import { HardHat, ShieldCheck, PhoneCall, Mail, MapPin, MessageCircle } from 'lucide-react';
import { buildWhatsAppMessage, KAAMWALE_PHONE } from '../../services/whatsappHelper';

export const Footer = () => {
  const PHONE_NUMBER = KAAMWALE_PHONE;
  const DISPLAY_PHONE = '+91 63958 82126';

  const openWhatsApp = () => {
    const msg = buildWhatsAppMessage();
    window.open(`https://wa.me/${PHONE_NUMBER.replace('+', '')}?text=${msg}`, '_blank');
  };

  return (
    <footer className="bg-[#101828] text-white pt-16 pb-24 md:pb-12 border-t border-slate-800">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-10 pb-12 border-b border-slate-800">

          {/* Brand Info */}
          <div className="space-y-4 md:col-span-1">
            <div className="flex items-center gap-3">
              <div className="w-10 h-10 rounded-xl bg-[#155EEF] flex items-center justify-center text-amber-400 font-bold">
                <HardHat className="w-6 h-6" />
              </div>
              <span className="text-2xl font-black text-white">
                Kaam<span className="text-[#155EEF]">Wale</span><span className="text-[#F59E0B]">.com</span>
              </span>
            </div>

            <p className="text-xs font-extrabold uppercase tracking-wider text-amber-400">
              हर काम के लिए कामवाले (Har Kaam Ke Liye KaamWale)
            </p>

            <p className="text-xs text-slate-400 leading-relaxed">
              Book reliable, verified labour services for construction, shifting, loading, farming, and general daily work in your city. Safe, punctual & hassle-free.
            </p>

            <div className="flex items-center gap-2 text-xs text-emerald-400 bg-emerald-950/60 border border-emerald-800/80 px-3 py-2 rounded-xl">
              <ShieldCheck className="w-4 h-4 shrink-0" />
              <span>100% Privacy Protected. Assigned internal workforce.</span>
            </div>
          </div>

          {/* Quick Links */}
          <div>
            <h4 className="text-sm font-bold text-slate-200 uppercase tracking-wider mb-4">
              Quick Links
            </h4>
            <ul className="space-y-2.5 text-sm text-slate-400">
              <li>
                <Link to="/" className="hover:text-white transition-colors">Home</Link>
              </li>
              <li>
                <Link to="/majdoor" className="hover:text-white transition-colors">Labour Services (Active)</Link>
              </li>
              <li>
                <Link to="/services" className="hover:text-white transition-colors">Skilled Trades (Coming Soon)</Link>
              </li>
            </ul>
          </div>

          {/* Popular Categories */}
          <div>
            <h4 className="text-sm font-bold text-slate-200 uppercase tracking-wider mb-4">
              Labour Categories
            </h4>
            <ul className="space-y-2.5 text-sm text-slate-400">
              <li>Construction Labour</li>
              <li>Loading & Unloading</li>
              <li>House Shifting Helpers</li>
              <li>Farm & Agriculture Labour</li>
              <li>Digging & Excavation</li>
              <li>Factory & Warehouse Staff</li>
            </ul>
          </div>

          {/* Contact & 2 Direct Booking Options */}
          <div>
            <h4 className="text-sm font-bold text-slate-200 uppercase tracking-wider mb-4">
              Instant Booking Options
            </h4>
            <div className="space-y-3 text-sm text-slate-400">
              
              <button
                onClick={openWhatsApp}
                className="w-full py-2.5 px-3 bg-[#25D366] hover:bg-[#20BD5A] text-white font-bold rounded-xl text-xs flex items-center justify-center gap-2 shadow-sm transition-all"
              >
                <MessageCircle className="w-4 h-4 fill-current" />
                <span>Chat on WhatsApp</span>
              </button>

              <a
                href={`tel:${PHONE_NUMBER}`}
                className="w-full py-2.5 px-3 bg-slate-800 hover:bg-slate-700 text-white font-bold rounded-xl text-xs flex items-center justify-center gap-2 shadow-sm transition-all block text-center"
              >
                <PhoneCall className="w-4 h-4 text-amber-400" />
                <span>Call Us: {DISPLAY_PHONE}</span>
              </a>

              <div className="pt-2 text-xs text-slate-500 space-y-1">
                <div className="flex items-center gap-2">
                  <MapPin className="w-3.5 h-3.5 text-[#155EEF]" />
                  <span>Bulandshahr, Noida, Delhi NCR</span>
                </div>
                <div className="flex items-center gap-2">
                  <Mail className="w-3.5 h-3.5 text-amber-400" />
                  <span>support@kaamwale.com</span>
                </div>
              </div>

            </div>
          </div>

        </div>

        {/* Bottom copyright */}
        <div className="pt-8 flex flex-col sm:flex-row items-center justify-between text-xs text-slate-500 gap-4">
          <p>© 2026 KaamWale.com. All rights reserved.</p>
          <div className="flex items-center gap-6">
            <span className="hover:underline cursor-pointer">Privacy Policy</span>
            <span className="hover:underline cursor-pointer">Terms & Conditions</span>
            <span className="hover:underline cursor-pointer">Help Center</span>
          </div>
        </div>
      </div>
    </footer>
  );
};
