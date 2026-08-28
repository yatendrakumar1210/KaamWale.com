import React, { useState } from 'react';
import { X, Phone, MessageCircle, MapPin, HardHat, ShieldCheck, Clock } from 'lucide-react';

export const BookingModal = ({ isOpen, onClose, initialService }) => {

  const [bookingType, setBookingType] = useState('daily'); // 'daily' | 'hourly'
  const [workerCount, setWorkerCount] = useState(2);
  const [selectedDate, setSelectedDate] = useState('Aaj');
  const [customDate, setCustomDate] = useState('');
  const [hours, setHours] = useState(4);
  const [area, setArea] = useState('');
  const [workNotes, setWorkNotes] = useState('');

  if (!isOpen) return null;

  const serviceName = initialService?.name || 'General Construction Labour';
  const dailyRate = initialService?.rate || 600;
  const hourlyRate = Math.round(dailyRate / 8);
  const ratePerWorker = bookingType === 'daily' ? dailyRate : hourlyRate;
  const estimatedTotal = bookingType === 'daily'
    ? workerCount * dailyRate
    : workerCount * hourlyRate * hours;

  const PHONE_NUMBER = '+916395882126';
  const DISPLAY_PHONE = '+91 63958 82126';

  // Construct Hindi WhatsApp message
  const constructWhatsAppMessage = () => {
    const dateStr = selectedDate === 'Koi aur din' ? (customDate || 'Aane wale din') : selectedDate;
    const locationStr = area ? `${area}, Bulandshahr` : 'Bulandshahr';
    const typeStr = bookingType === 'daily' ? 'Din bhar (Daily)' : `${hours} Ghante (Hourly)`;
    const rateStr = bookingType === 'daily'
      ? `₹${dailyRate} प्रति मजदूर/दिन`
      : `₹${hourlyRate} प्रति मजदूर/घंटा`;

    const message =
      `🏗️ *KaamWale.com — मजदूर बुकिंग अनुरोध*\n\n` +
      `📌 *काम का प्रकार:* ${serviceName}\n` +
      `👷 *मजदूरों की संख्या:* ${workerCount} मजदूर\n` +
      `⏱️ *काम का समय:* ${typeStr}\n` +
      `📅 *तारीख:* ${dateStr}\n` +
      `📍 *काम की जगह:* ${locationStr}\n` +
      (workNotes ? `📝 *काम का विवरण:* ${workNotes}\n` : '') +
      `💰 *अनुमानित दर:* ${rateStr}\n` +
      `💵 *अनुमानित कुल:* ₹${estimatedTotal}\n\n` +
      `कृपया उपलब्ध मजदूरों की पुष्टि करें और जानकारी भेजें। धन्यवाद! 🙏`;

    return encodeURIComponent(message);
  };

  const handleWhatsAppBooking = () => {
    const encodedText = constructWhatsAppMessage();
    const whatsappUrl = `https://wa.me/${PHONE_NUMBER.replace('+', '')}?text=${encodedText}`;
    window.open(whatsappUrl, '_blank');
    onClose();
  };

  const handleCallBooking = () => {
    window.location.href = `tel:${PHONE_NUMBER}`;
  };

  const dateOptions = bookingType === 'daily'
    ? ['Aaj', 'Kal', 'Koi aur din']
    : ['Aaj', 'Kal', 'Koi aur din'];

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/60 backdrop-blur-sm animate-fadeIn">
      <div
        className="bg-white w-full max-w-lg rounded-2xl shadow-2xl overflow-hidden flex flex-col max-h-[92vh] border border-gray-100"
        onClick={(e) => e.stopPropagation()}
      >
        {/* Header */}
        <div className="bg-gradient-to-r from-[#101828] to-[#1D2939] text-white p-5 flex items-center justify-between relative">
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 rounded-xl bg-[#155EEF]/20 flex items-center justify-center border border-[#155EEF]/30">
              <HardHat className="w-6 h-6 text-[#2E90FA]" />
            </div>
            <div>
              <span className="text-xs font-semibold uppercase tracking-wider text-[#84CAFF] bg-[#155EEF]/30 px-2 py-0.5 rounded-full inline-block mb-0.5">
                तुरंत मजदूर बुकिंग
              </span>
              <h3 className="text-lg font-bold text-white leading-snug">{serviceName}</h3>
            </div>
          </div>
          <button
            onClick={onClose}
            className="w-8 h-8 rounded-full bg-white/10 hover:bg-white/20 text-gray-300 hover:text-white flex items-center justify-center transition-all"
            aria-label="Close"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Content Body */}
        <div className="p-5 overflow-y-auto space-y-5 flex-1 text-gray-800">

          {/* Booking Type Toggle: Daily vs Hourly */}
          <div>
            <label className="block text-xs font-bold uppercase tracking-wider text-gray-500 mb-2">
              काम का तरीका चुनें (Select Work Type)
            </label>
            <div className="grid grid-cols-2 gap-2">
              <button
                type="button"
                onClick={() => setBookingType('daily')}
                className={`py-3 px-3 rounded-xl border text-sm font-bold transition-all flex flex-col items-center gap-1 ${
                  bookingType === 'daily'
                    ? 'bg-[#155EEF] text-white border-[#155EEF] shadow-md'
                    : 'bg-gray-50 text-gray-700 border-gray-200 hover:bg-gray-100'
                }`}
              >
                <HardHat className={`w-5 h-5 ${bookingType === 'daily' ? 'text-amber-300' : 'text-gray-400'}`} />
                <span>दिन के हिसाब से</span>
                <span className={`text-[10px] font-medium ${bookingType === 'daily' ? 'text-blue-100' : 'text-gray-400'}`}>
                  Daily (₹{dailyRate}/मजदूर)
                </span>
              </button>

              <button
                type="button"
                onClick={() => setBookingType('hourly')}
                className={`py-3 px-3 rounded-xl border text-sm font-bold transition-all flex flex-col items-center gap-1 ${
                  bookingType === 'hourly'
                    ? 'bg-[#F59E0B] text-slate-900 border-[#F59E0B] shadow-md'
                    : 'bg-gray-50 text-gray-700 border-gray-200 hover:bg-gray-100'
                }`}
              >
                <Clock className={`w-5 h-5 ${bookingType === 'hourly' ? 'text-slate-900' : 'text-gray-400'}`} />
                <span>घंटे के हिसाब से</span>
                <span className={`text-[10px] font-medium ${bookingType === 'hourly' ? 'text-slate-700' : 'text-gray-400'}`}>
                  Hourly (₹{hourlyRate}/मजदूर/घंटा)
                </span>
              </button>
            </div>
          </div>

          {/* Hours selector — only for hourly */}
          {bookingType === 'hourly' && (
            <div>
              <label className="block text-xs font-bold uppercase tracking-wider text-gray-500 mb-2">
                कितने घंटे चाहिए? (Number of Hours)
              </label>
              <div className="flex items-center justify-between bg-amber-50 border border-amber-200 p-3 rounded-xl">
                <div>
                  <span className="text-sm font-semibold text-gray-900 block">काम के घंटे</span>
                  <span className="text-xs text-gray-500">₹{hourlyRate}/मजदूर/घंटा</span>
                </div>
                <div className="flex items-center gap-3">
                  <button
                    type="button"
                    onClick={() => setHours(Math.max(1, hours - 1))}
                    className="w-10 h-10 rounded-lg bg-white border border-gray-300 text-gray-700 font-bold text-lg hover:bg-gray-100 active:scale-95 transition-all flex items-center justify-center shadow-sm"
                  >
                    -
                  </button>
                  <span className="w-10 text-center text-xl font-bold text-[#F59E0B]">{hours}</span>
                  <button
                    type="button"
                    onClick={() => setHours(hours + 1)}
                    className="w-10 h-10 rounded-lg bg-[#F59E0B] text-slate-900 font-bold text-lg hover:bg-amber-400 active:scale-95 transition-all flex items-center justify-center shadow-sm"
                  >
                    +
                  </button>
                </div>
              </div>
            </div>
          )}

          {/* Worker Counter */}
          <div>
            <label className="block text-xs font-bold uppercase tracking-wider text-gray-500 mb-2">
              कितने मजदूर चाहिए? (Number of Workers)
            </label>
            <div className="flex items-center justify-between bg-gray-50 border border-gray-200 p-3 rounded-xl">
              <div>
                <span className="text-sm font-semibold text-gray-900 block">मजदूरों की संख्या</span>
                <span className="text-xs text-gray-500">
                  ₹{ratePerWorker}/{bookingType === 'daily' ? 'मजदूर/दिन' : 'मजदूर/घंटा'}
                </span>
              </div>
              <div className="flex items-center gap-3">
                <button
                  type="button"
                  onClick={() => setWorkerCount(Math.max(1, workerCount - 1))}
                  className="w-10 h-10 rounded-lg bg-white border border-gray-300 text-gray-700 font-bold text-lg hover:bg-gray-100 active:scale-95 transition-all flex items-center justify-center shadow-sm"
                >
                  -
                </button>
                <span className="w-8 text-center text-xl font-bold text-[#155EEF]">{workerCount}</span>
                <button
                  type="button"
                  onClick={() => setWorkerCount(workerCount + 1)}
                  className="w-10 h-10 rounded-lg bg-[#155EEF] text-white font-bold text-lg hover:bg-[#1254D4] active:scale-95 transition-all flex items-center justify-center shadow-sm"
                >
                  +
                </button>
              </div>
            </div>
          </div>

          {/* Date Selector */}
          <div>
            <label className="block text-xs font-bold uppercase tracking-wider text-gray-500 mb-2">
              कब चाहिए? (When Do You Need Labour?)
            </label>
            <div className="grid grid-cols-3 gap-2">
              {dateOptions.map((option) => (
                <button
                  key={option}
                  type="button"
                  onClick={() => setSelectedDate(option)}
                  className={`py-2.5 px-3 text-xs font-bold rounded-xl border transition-all ${
                    selectedDate === option
                      ? 'bg-[#155EEF] text-white border-[#155EEF] shadow-sm'
                      : 'bg-gray-50 text-gray-700 border-gray-200 hover:bg-gray-100'
                  }`}
                >
                  {option === 'Aaj' ? '⚡ आज' : option === 'Kal' ? '📅 कल' : '📆 अन्य दिन'}
                </button>
              ))}
            </div>
            {selectedDate === 'Koi aur din' && (
              <input
                type="date"
                value={customDate}
                onChange={(e) => setCustomDate(e.target.value)}
                className="mt-2.5 w-full p-2.5 text-sm border border-gray-300 rounded-xl focus:ring-2 focus:ring-[#155EEF] outline-none"
              />
            )}
          </div>

          {/* Location / Area */}
          <div>
            <label className="block text-xs font-bold uppercase tracking-wider text-gray-500 mb-2">
              काम की जगह — बुलंदशहर (Work Location)
            </label>
            <div className="relative">
              <MapPin className="w-4 h-4 text-gray-400 absolute left-3.5 top-3" />
              <input
                type="text"
                placeholder="मोहल्ला / एरिया / साइट का पता लिखें (e.g. Civil Lines, DM Colony)"
                value={area}
                onChange={(e) => setArea(e.target.value)}
                className="w-full pl-9 pr-3 py-2.5 text-sm border border-gray-300 rounded-xl focus:ring-2 focus:ring-[#155EEF] outline-none"
              />
            </div>
          </div>

          {/* Optional Work Notes */}
          <div>
            <label className="block text-xs font-bold uppercase tracking-wider text-gray-500 mb-2">
              काम का विवरण (Optional — Work Details)
            </label>
            <textarea
              rows={2}
              placeholder="जैसे: कंक्रीट मिक्सिंग, ईंट ढुलाई, नींव खुदाई, माल उठाना..."
              value={workNotes}
              onChange={(e) => setWorkNotes(e.target.value)}
              className="w-full p-3 text-sm border border-gray-300 rounded-xl focus:ring-2 focus:ring-[#155EEF] outline-none resize-none"
            />
          </div>

          {/* Price Estimate Summary */}
          <div className="bg-[#F8FAFC] p-3.5 rounded-xl border border-gray-200 flex items-center justify-between">
            <div className="flex items-center gap-2">
              <ShieldCheck className="w-5 h-5 text-[#12B76A]" />
              <span className="text-xs text-gray-600 font-medium">सत्यापित मजदूर • सीधी सेवा</span>
            </div>
            <div className="text-right">
              <span className="text-xs text-gray-400 block">
                {bookingType === 'daily' ? 'अनुमानित दैनिक बजट' : `अनुमानित (${hours} घंटे)`}
              </span>
              <span className="text-base font-bold text-gray-900">₹{estimatedTotal}</span>
            </div>
          </div>

          {/* Info */}
          <div className="text-center bg-[#FEF6EE] border border-[#F9DBAF] p-3 rounded-xl">
            <p className="text-xs font-semibold text-[#B54708]">
              नीचे WhatsApp या Call का बटन दबाएं — बुकिंग तुरंत होगी! 👇
            </p>
          </div>

        </div>

        {/* Modal Action Buttons Footer */}
        <div className="p-4 bg-gray-50 border-t border-gray-100 grid grid-cols-1 sm:grid-cols-2 gap-3">

          {/* WhatsApp Button */}
          <button
            type="button"
            onClick={handleWhatsAppBooking}
            className="w-full py-3 px-4 bg-[#25D366] hover:bg-[#20BD5A] text-white font-bold rounded-xl shadow-md hover:shadow-lg transition-all flex items-center justify-center gap-2 text-sm active:scale-98"
          >
            <MessageCircle className="w-5 h-5 fill-current" />
            <span>WhatsApp पर बुक करें</span>
          </button>

          {/* Phone Call Button */}
          <button
            type="button"
            onClick={handleCallBooking}
            className="w-full py-3 px-4 bg-[#155EEF] hover:bg-[#1254D4] text-white font-bold rounded-xl shadow-md hover:shadow-lg transition-all flex items-center justify-center gap-2 text-sm active:scale-98"
          >
            <Phone className="w-5 h-5" />
            <span>कॉल करें: {DISPLAY_PHONE}</span>
          </button>

        </div>
      </div>
    </div>
  );
};
