import React, { useState } from 'react';
import { Home, HardHat, Phone, MessageCircle, MapPin } from 'lucide-react';
import { useCity } from '../../context/CityContext';
import { BookingModal } from '../common/BookingModal';

export const MobileNav = () => {
  const { selectedCity } = useCity();
  const [isModalOpen, setIsModalOpen] = useState(false);

  const PHONE_NUMBER = '+919762658206';

  const handleWhatsApp = () => {
    const text = encodeURIComponent(
      `🏗️ नमस्ते KaamWale!\n\nमुझे बुलंदशहर में मजदूर चाहिए।\nकृपया उपलब्ध मजदूरों की जानकारी दें।\nधन्यवाद! 🙏`
    );
    const cleanPhone = PHONE_NUMBER.replace(/\D/g, '');
    window.open(`https://wa.me/${cleanPhone}?text=${text}`, '_blank', 'noopener,noreferrer');
  };

  const handleCall = () => {
    const cleanPhone = PHONE_NUMBER.replace(/\D/g, '');
    window.location.href = `tel:+${cleanPhone}`;
  };

  return (
    <>
      <div className="md:hidden fixed bottom-0 left-0 right-0 z-40 bg-white/95 backdrop-blur-md border-t border-slate-200 p-2.5 shadow-2xl flex items-center gap-2">
        {/* WhatsApp Button */}
        <button
          onClick={handleWhatsApp}
          className="flex-1 bg-[#25D366] active:bg-[#20BD5A] text-white py-2.5 px-3 rounded-xl font-bold text-xs flex items-center justify-center gap-1.5 shadow-sm active:scale-98 transition-all"
        >
          <MessageCircle className="w-4 h-4 fill-current" />
          <span>WhatsApp</span>
        </button>

        {/* Central Book Labour Button */}
        <button
          onClick={() => setIsModalOpen(true)}
          className="bg-[#155EEF] active:bg-[#1254D4] text-white py-2.5 px-4 rounded-xl font-extrabold text-xs flex items-center justify-center gap-1.5 shadow-md active:scale-98 transition-all"
        >
          <HardHat className="w-4 h-4 text-amber-300" />
          <span>Book Labour</span>
        </button>

        {/* Direct Call Button */}
        <button
          onClick={handleCall}
          className="flex-1 bg-slate-900 active:bg-black text-white py-2.5 px-3 rounded-xl font-bold text-xs flex items-center justify-center gap-1.5 shadow-sm active:scale-98 transition-all"
        >
          <Phone className="w-4 h-4 text-amber-400" />
          <span>Call Us</span>
        </button>
      </div>

      <BookingModal
        isOpen={isModalOpen}
        onClose={() => setIsModalOpen(false)}
      />
    </>
  );
};
