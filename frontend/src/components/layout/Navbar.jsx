import React, { useState } from 'react';
import { Link, useNavigate, useLocation } from 'react-router-dom';
import { useCity } from '../../context/CityContext';
import { buildWhatsAppMessage, KAAMWALE_PHONE } from '../../services/whatsappHelper';
import { HardHat, MapPin, ChevronDown, Menu, X, Phone, MessageCircle } from 'lucide-react';
import { BookingModal } from '../common/BookingModal';

export const Navbar = () => {
  const { selectedCity, setIsCityModalOpen } = useCity();
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [isBookingModalOpen, setIsBookingModalOpen] = useState(false);

  const location = useLocation();

  const PHONE_NUMBER = KAAMWALE_PHONE;
  const DISPLAY_PHONE = '+91 63958 82126';

  const isActive = (path) => location.pathname === path;

  const openWhatsAppDirect = () => {
    const msg = buildWhatsAppMessage();
    const cleanPhone = PHONE_NUMBER.replace(/\D/g, '');
    window.open(`https://wa.me/${cleanPhone}?text=${msg}`, '_blank', 'noopener,noreferrer');
  };

  return (
    <>
      <header className="sticky top-0 z-40 bg-white/95 backdrop-blur-md border-b border-slate-100 shadow-sm">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex items-center justify-between h-16 sm:h-20">
            {/* Logo & Tagline */}
            <Link to="/" className="flex items-center gap-3 group">
              <div className="w-10 h-10 rounded-xl bg-gradient-to-tr from-[#101828] to-[#155EEF] flex items-center justify-center text-white shadow-md shadow-blue-500/20 group-hover:scale-105 transition-transform">
                <HardHat className="w-6 h-6 text-amber-400" />
              </div>
              <div>
                <div className="flex items-center gap-1">
                  <span className="text-xl sm:text-2xl font-black tracking-tight text-[#101828]">
                    Kaam<span className="text-[#155EEF]">Wale</span><span className="text-[#F59E0B]">.com</span>
                  </span>
                </div>
                <p className="text-[11px] sm:text-[16px] font-bold text-slate-500 tracking-wide uppercase -mt-0.5">
                  हर काम के लिए
                </p>
              </div>
            </Link>

            {/* Location Badge (Static Bulandshahr) */}
            <div className="hidden md:flex items-center gap-1.5 px-3 py-1 rounded-full bg-[#155EEF]/10 border border-[#155EEF]/20 text-xs font-bold text-[#155EEF]">
              <MapPin className="w-3.5 h-3.5" />
              <span>Bulandshahr</span>
            </div>

            {/* Desktop Nav Links */}
            <nav className="hidden md:flex items-center gap-8 text-sm font-medium text-slate-600">
              <Link
                to="/"
                className={`hover:text-[#155EEF] transition-colors ${
                  isActive("/") ? "text-[#155EEF] font-bold" : ""
                }`}
              >
                Home
              </Link>

              <Link
                to="/majdoor"
                className={`hover:text-[#155EEF] transition-colors flex items-center gap-1 ${
                  isActive("/majdoor") ? "text-[#155EEF] font-bold" : ""
                }`}
              >
                👷 Labour Services
              </Link>

              <Link
                to="/services"
                className={`hover:text-[#155EEF] transition-colors flex items-center gap-1 ${
                  isActive("/services") ? "text-[#155EEF] font-bold" : ""
                }`}
              >
                🛠️ Skilled Trades
              </Link>

              <a
                href="#how-it-works"
                className="hover:text-[#155EEF] transition-colors"
              >
                How It Works
              </a>
            </nav>

            {/* Desktop Direct Booking CTAs: WhatsApp, Call, Book */}
            <div className="hidden md:flex items-center gap-3">
              
              {/* WhatsApp Quick Link */}
              <button
                onClick={openWhatsAppDirect}
                className="inline-flex items-center gap-1.5 bg-[#25D366] hover:bg-[#20BD5A] text-white px-3.5 py-2 rounded-xl text-xs font-bold shadow-sm transition-all active:scale-95"
                title="Chat on WhatsApp"
              >
                <MessageCircle className="w-4 h-4 fill-current" />
                <span>WhatsApp</span>
              </button>

              {/* Call Direct Button */}
              <a
                href={`tel:${PHONE_NUMBER}`}
                className="inline-flex items-center gap-1.5 bg-slate-900 hover:bg-black text-white px-3.5 py-2 rounded-xl text-xs font-bold shadow-sm transition-all"
              >
                <Phone className="w-3.5 h-3.5 text-amber-400" />
                <span>{DISPLAY_PHONE}</span>
              </a>

              {/* Book Labour Primary Trigger */}
              <button
                onClick={() => setIsBookingModalOpen(true)}
                className="inline-flex items-center gap-2 bg-[#155EEF] hover:bg-[#1254D4] text-white px-4 py-2 rounded-xl font-bold text-xs shadow-md shadow-blue-500/20 hover:shadow-lg transition-all transform hover:-translate-y-0.5 active:translate-y-0"
              >
                <HardHat className="w-4 h-4 text-amber-300" />
                Book Labour
              </button>

            </div>

            {/* Mobile Menu Trigger & City */}
            <div className="flex items-center gap-2 md:hidden">
              <div className="flex items-center gap-1 px-2.5 py-1 rounded-full bg-slate-100 text-xs font-semibold text-slate-700">
                <MapPin className="w-3.5 h-3.5 text-[#155EEF]" />
                <span>Bulandshahr</span>
              </div>

              <button
                onClick={() => setIsBookingModalOpen(true)}
                className="bg-[#155EEF] text-white p-2 rounded-xl text-xs font-bold flex items-center gap-1"
              >
                <HardHat className="w-4 h-4 text-amber-300" />
              </button>

              <button
                onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
                className="p-2 rounded-xl bg-slate-100 text-slate-700 hover:bg-slate-200"
              >
                {mobileMenuOpen ? (
                  <X className="w-5 h-5" />
                ) : (
                  <Menu className="w-5 h-5" />
                )}
              </button>
            </div>
          </div>
        </div>

        {/* Mobile Navigation Drawer */}
        {mobileMenuOpen && (
          <div className="md:hidden bg-white border-b border-slate-200 px-4 pt-2 pb-6 space-y-3">
            <Link
              to="/"
              onClick={() => setMobileMenuOpen(false)}
              className="block py-2 text-base font-semibold text-slate-800"
            >
              Home
            </Link>
            <Link
              to="/majdoor"
              onClick={() => setMobileMenuOpen(false)}
              className="block py-2 text-base font-semibold text-[#155EEF]"
            >
              👷 Labour Services (Available Now)
            </Link>
            <Link
              to="/services"
              onClick={() => setMobileMenuOpen(false)}
              className="block py-2 text-base font-semibold text-slate-600"
            >
              🛠️ Skilled Trades (Coming Soon)
            </Link>

            <div className="pt-4 border-t border-slate-100 space-y-2">
              <button
                onClick={() => {
                  setMobileMenuOpen(false);
                  setIsBookingModalOpen(true);
                }}
                className="w-full bg-[#155EEF] text-white py-3 rounded-xl font-bold shadow-md flex items-center justify-center gap-2 text-sm"
              >
                <HardHat className="w-4 h-4 text-amber-300" />
                Book Labour Now
              </button>

              <div className="grid grid-cols-2 gap-2 pt-1">
                <button
                  onClick={openWhatsAppDirect}
                  className="bg-[#25D366] text-white py-2.5 rounded-xl font-bold text-xs flex items-center justify-center gap-1.5 shadow-sm"
                >
                  <MessageCircle className="w-4 h-4 fill-current" />
                  WhatsApp
                </button>
                <a
                  href={`tel:${PHONE_NUMBER}`}
                  className="bg-slate-900 text-white py-2.5 rounded-xl font-bold text-xs flex items-center justify-center gap-1.5 text-center shadow-sm"
                >
                  <Phone className="w-3.5 h-3.5 text-amber-400" />
                  Call Us
                </a>
              </div>
            </div>
          </div>
        )}
      </header>

      {/* Reusable Booking Modal */}
      <BookingModal
        isOpen={isBookingModalOpen}
        onClose={() => setIsBookingModalOpen(false)}
      />
    </>
  );
};
