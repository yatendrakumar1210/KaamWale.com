import React, { useState } from 'react';
import { useNavigate, Link } from 'react-router-dom';
import { useCity } from '../context/CityContext';
import { buildWhatsAppMessage, KAAMWALE_PHONE } from '../services/whatsappHelper';
import {
  HardHat,
  MapPin,
  Building2,
  Truck,
  PackageCheck,
  Wheat,
  Shovel,
  Sparkles,
  Zap,
  Wrench,
  Paintbrush,
  Axe,
  ShieldCheck,
  Clock,
  CheckCircle2,
  Users,
  ArrowRight,
  PhoneCall,
  Hammer,
  MessageCircle,
  Phone,
  HelpCircle,
  Info,
  Flame,
  Wind,
  Check
} from 'lucide-react';
import { BookingModal } from '../components/common/BookingModal';
import { TatkalBookingModal } from '../components/common/TatkalBookingModal';

export const HomePage = () => {
  const { selectedCity, setIsCityModalOpen } = useCity();

  const [selectedServiceForModal, setSelectedServiceForModal] = useState(null);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [isTatkalModalOpen, setIsTatkalModalOpen] = useState(false);

  const PHONE_NUMBER = KAAMWALE_PHONE;
  const DISPLAY_PHONE = '+91 97626 58206';

  // Active Labour / Majdoor Services (All standard daily wage rates = ₹700)
  const labourServices = [
    { id: 'l1', name: 'General Labour', icon: HardHat, image: '/images/general_worker.png', rate: 700, desc: 'साइट सफाई, मलबा हटाने और सामान्य काम के लिए दैनिक मजदूर।', badge: 'लोकप्रिय' },
    { id: 'l2', name: 'Construction Labour', icon: Building2, image: '/images/construction_worker.png', rate: 700, desc: 'कंक्रीट मिक्सिंग, ईंट ढुलाई और सिविल काम के लिए अनुभवी मजदूर।', badge: 'हाई डिमांड' },
    { id: 'l3', name: 'Loading / Unloading', icon: Truck, image: '/images/loading_worker.png', rate: 4, desc: '₹4 प्रति बैग (लगभग 40–50 kg)। ट्रक, गोदाम और माल ढुलाई मजदूर।', badge: '₹4/बैग' },
    { id: 'l4', name: 'House Shifting Labour', icon: PackageCheck, image: '/images/shifting_worker.png', rate: 700, desc: 'घर और दुकान के सामान की लोडिंग व शिफ्टिंग में मददगार।' },
    { id: 'l5', name: 'Farm / Agriculture Labour', icon: Wheat, image: '/images/farm_worker.png', rate: 700, desc: 'फसल कटाई, खेत की खुदाई और कृषि कार्य के मजदूर।' },
    { id: 'l6', name: 'Digging & Excavation', icon: Shovel, image: 'https://images.unsplash.com/photo-1504307651254-35680f356dfd?auto=format&fit=crop&w=600&q=80', rate: 700, desc: 'पाइपलाइन खुदाई, नींव खोदने और मिट्टी हटाने वाले मजदूर।' },
    { id: 'l7', name: 'Demolition & Debris', icon: Hammer, image: 'https://images.unsplash.com/photo-1581092160607-ee22621dd758?auto=format&fit=crop&w=600&q=80', rate: 700, desc: 'दीवार तोड़ने, ईंट फोड़ने व मलबा उठाने वाले ट्रेंड मजदूर।' },
    { id: 'l8', name: 'Factory & Warehouse Labour', icon: Users, image: 'https://images.unsplash.com/photo-1586528116311-ad8dd3c8310d?auto=format&fit=crop&w=600&q=80', rate: 700, desc: 'इंडस्ट्रियल काम, असेंबली और माल पैकिंग के दैनिक सहायक।' }
  ];

  // Skilled Services — "COMING SOON"
  const comingSoonServices = [
    { id: 'cs1', name: 'Mason (Raj Mistri)', icon: Building2, desc: 'राज मिस्त्री — ईंट चिनाई, प्लास्टर व दीवार निर्माण।' },
    { id: 'cs2', name: 'Electrician', icon: Zap, desc: 'इलेक्ट्रीशियन — वायरिंग, स्विचबोर्ड व सर्किट रिपेयर।' },
    { id: 'cs3', name: 'Plumber', icon: Wrench, desc: 'प्लंबर — पाइप लीकेज रिपेयर, नल व सेनेटरी फिटिंग।' },
    { id: 'cs4', name: 'Painter', icon: Paintbrush, desc: 'पेंटर — वाल पुट्टी, पेंटिंग व वाटरप्रूफ कोटिंग।' },
    { id: 'cs5', name: 'Carpenter', icon: Axe, desc: 'कारपेंटर — फर्नीचर रिपेयर, दरवाजा व वुडवर्क।' },
    { id: 'cs6', name: 'AC Technician', icon: Wind, desc: 'एसी रिपेयर, सर्विसिंग व गैस टॉप-अप।' },
    { id: 'cs7', name: 'Welder', icon: Flame, desc: 'वेल्डर — गेट, ग्रिल व आयरन फैब्रिकेशन रिपेयर।' },
    { id: 'cs8', name: 'Deep Cleaning', icon: Sparkles, desc: 'हाउस डीप क्लीनिंग व वाटर टैंक सफाई।' }
  ];

  const handleOpenModal = (service = null) => {
    setSelectedServiceForModal(service);
    setIsModalOpen(true);
  };

  const handleOpenTatkalModal = (service = null) => {
    setSelectedServiceForModal(service);
    setIsTatkalModalOpen(true);
  };

  const openWhatsAppDirect = (serviceName = '') => {
    const msg = buildWhatsAppMessage(serviceName);
    const cleanPhone = PHONE_NUMBER.replace(/\D/g, '');
    window.open(`https://wa.me/${cleanPhone}?text=${msg}`, '_blank', 'noopener,noreferrer');
  };

  const handleCallDirect = () => {
    const cleanPhone = PHONE_NUMBER.replace(/\D/g, '');
    window.location.href = `tel:+${cleanPhone}`;
  };

  return (
    <div className="space-y-16 pb-16">
      {/* HERO SECTION */}
      <section className="relative overflow-hidden bg-gradient-to-b from-[#101828] via-[#101828] to-slate-900 text-white pt-10 pb-16 lg:pt-16 lg:pb-24">
        {/* Decorative ambient lighting */}
        <div className="absolute top-0 right-1/4 w-96 h-96 bg-[#155EEF]/20 rounded-full blur-3xl pointer-events-none"></div>
        <div className="absolute bottom-0 left-10 w-80 h-80 bg-amber-500/10 rounded-full blur-3xl pointer-events-none"></div>

        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-10 items-center">
            {/* Left Content */}
            <div className="lg:col-span-7 space-y-6 text-center lg:text-left">
              {/* TOP BADGE */}
              <div className="inline-flex items-center gap-2 bg-white/10 backdrop-blur-md border border-white/20 px-4 py-1.5 rounded-full text-xs font-semibold text-amber-300">
                <ShieldCheck className="w-4 h-4 text-amber-400" />
                <span>Verified City Operations • Bulandshahr, UP</span>
              </div>

              {/* MAIN TITLE */}
              <h1 className="text-4xl sm:text-6xl lg:text-7xl font-black tracking-tight leading-tight">
                Kaam<span className="text-[#155EEF]">Wale</span> <br />
                <span className="text-[#F59E0B] text-3xl sm:text-5xl font-extrabold block mt-1">
                  हर काम के लिए विश्वसनीय
                </span>
              </h1>

              {/* SUBTITLE */}
              <p className="text-base sm:text-lg text-slate-300 max-w-2xl font-normal leading-relaxed mx-auto lg:mx-0">
                रोज़ाना काम के लिए भरोसेमंद मजदूर चाहिए?{" "}
                <strong>बुलंदशहर</strong> में निर्माण कार्य, लोडिंग, अनलोडिंग,
                घर शिफ्टिंग और अन्य सामान्य काम के लिए विश्वसनीय मजदूर सीधे बुक
                करें। .
              </p>

              {/* 2 FAST BOOKING OPTIONS BANNER */}
              <div className="bg-white/10 backdrop-blur-md border border-white/15 p-5 sm:p-6 rounded-2xl max-w-xl mx-auto lg:mx-0 space-y-4">
                <div className="flex items-center justify-between">
                  <span className="text-xs font-bold uppercase tracking-wider text-amber-300 flex items-center gap-1.5">
                    <CheckCircle2 className="w-4 h-4 text-amber-400" /> INSTANT
                    LABOUR BOOKING
                  </span>
                  <span className="text-xs text-slate-300 font-semibold flex items-center gap-1">
                    <MapPin className="w-3.5 h-3.5 text-amber-400" />{" "}
                    Bulandshahr Only
                  </span>
                </div>

                <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 pt-1">
                  {/* Option 1: WhatsApp */}
                  <button
                    onClick={() => openWhatsAppDirect()}
                    className="w-full py-3.5 px-4 bg-[#25D366] hover:bg-[#20BD5A] text-white font-bold rounded-xl shadow-lg hover:shadow-xl transition-all flex items-center justify-center gap-2 text-sm active:scale-98"
                  >
                    <MessageCircle className="w-5 h-5 fill-current" />
                    <span className="text-sm font-extrabold">
                      Book via WhatsApp
                    </span>
                  </button>

                  {/* Option 2: Phone Call */}
                  <button
                    onClick={handleCallDirect}
                    className="w-full py-3.5 px-4 bg-[#155EEF] hover:bg-[#1254D4] text-white font-bold rounded-xl shadow-lg hover:shadow-xl transition-all flex items-center justify-center gap-2 text-sm active:scale-98"
                  >
                    <Phone className="w-5 h-5" />
                    <span className="text-sm font-extrabold">
                      Call Us: {DISPLAY_PHONE}
                    </span>
                  </button>
                </div>

                <p className="text-[11px] text-slate-400 text-center">
                  ⚡ Operations team arranges verified workers at your site
                  within 60 minutes!
                </p>
              </div>
            </div>

            {/* Right Visual Card */}
            <div className="lg:col-span-5 flex justify-center">
              <div className="bg-white/10 backdrop-blur-lg border border-white/20 p-6 sm:p-8 rounded-3xl text-center space-y-5 max-w-md w-full shadow-2xl relative">
                <div className="w-24 h-24 mx-auto rounded-3xl bg-white p-2 flex items-center justify-center text-slate-900 shadow-2xl border-2 border-amber-400 overflow-hidden transform hover:scale-105 transition-transform">
                  <img src="/logo.png" alt="KaamWale Official Logo" className="w-full h-full object-contain" />
                </div>

                <div>
                  <h3 className="text-2xl font-bold text-white">
                    Need Workers Today?
                  </h3>
                  <p className="text-xs text-slate-300 mt-1">
                    Select number of labourers and date. No long online
                    checkouts required!
                  </p>
                </div>

                <div className="space-y-2.5 text-left">
                  <div className="flex items-center gap-3 bg-white/5 p-3 rounded-xl border border-white/10">
                    <CheckCircle2 className="w-5 h-5 text-emerald-400 flex-shrink-0" />
                    <span className="text-xs text-slate-200 font-medium">
                      Verified & Punctual Local Workers
                    </span>
                  </div>
                  <div className="flex items-center gap-3 bg-white/5 p-3 rounded-xl border border-white/10">
                    <CheckCircle2 className="w-5 h-5 text-emerald-400 flex-shrink-0" />
                    <span className="text-xs text-slate-200 font-medium">
                      Transparent Fixed Rates (₹4/bag | ₹700/day)
                    </span>
                  </div>
                  <div className="flex items-center gap-3 bg-white/5 p-3 rounded-xl border border-white/10">
                    <CheckCircle2 className="w-5 h-5 text-emerald-400 flex-shrink-0" />
                    <span className="text-xs text-slate-200 font-medium">
                      Full Privacy — Direct Ops Support
                    </span>
                  </div>
                </div>

                <button
                  onClick={() =>
                    handleOpenModal({
                      name: "General Construction Labour",
                      rate: 700,
                    })
                  }
                  className="w-full py-3.5 bg-amber-400 hover:bg-amber-300 text-slate-950 font-black rounded-xl shadow-lg transition-all text-sm uppercase tracking-wider flex items-center justify-center gap-1.5"
                >
                  ⚡ SELECT LABOUR & BOOK NOW
                </button>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* TRANSPARENT PRICING MATRIX RIBBON */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 -mt-8 relative z-20">
        <div className="bg-white/95 backdrop-blur-xl border border-slate-200 rounded-3xl p-5 shadow-xl grid grid-cols-2 md:grid-cols-4 gap-4 divide-y md:divide-y-0 md:divide-x divide-slate-100">
          <div className="flex items-center gap-3 p-2">
            <div className="w-10 h-10 rounded-xl bg-blue-50 text-[#155EEF] flex items-center justify-center shrink-0">
              <Truck className="w-5 h-5" />
            </div>
            <div>
              <span className="text-[11px] font-bold text-slate-400 uppercase tracking-wider block">Loading / Unloading</span>
              <span className="text-base font-black text-slate-900">₹4 <span className="text-xs font-semibold text-slate-500">/ Bag</span></span>
            </div>
          </div>

          <div className="flex items-center gap-3 p-2 pt-3 md:pt-2">
            <div className="w-10 h-10 rounded-xl bg-amber-50 text-amber-600 flex items-center justify-center shrink-0">
              <HardHat className="w-5 h-5" />
            </div>
            <div>
              <span className="text-[11px] font-bold text-slate-400 uppercase tracking-wider block">Daily Labour Wage</span>
              <span className="text-base font-black text-slate-900">₹700 <span className="text-xs font-semibold text-slate-500">/ Day</span></span>
            </div>
          </div>

          <div className="flex items-center gap-3 p-2 pt-3 md:pt-2">
            <div className="w-10 h-10 rounded-xl bg-purple-50 text-purple-600 flex items-center justify-center shrink-0">
              <Building2 className="w-5 h-5" />
            </div>
            <div>
              <span className="text-[11px] font-bold text-slate-400 uppercase tracking-wider block">Skilled Raj Mistri</span>
              <span className="text-base font-black text-slate-900">₹950 <span className="text-xs font-semibold text-slate-500">/ Day</span></span>
            </div>
          </div>

          <div className="flex items-center gap-3 p-2 pt-3 md:pt-2">
            <div className="w-10 h-10 rounded-xl bg-emerald-50 text-emerald-600 flex items-center justify-center shrink-0">
              <Zap className="w-5 h-5" />
            </div>
            <div>
              <span className="text-[11px] font-bold text-slate-400 uppercase tracking-wider block">Tatkal Urgent Dispatch</span>
              <span className="text-base font-black text-slate-900">+₹150 <span className="text-xs font-semibold text-slate-500">Fee (6h SLA)</span></span>
            </div>
          </div>
        </div>
      </section>

      {/* SECTION: HOURLY BOOKING REVISED CARDS */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="bg-gradient-to-br from-amber-50 to-orange-50 border border-amber-200 rounded-3xl p-6 sm:p-8">
          <div className="flex flex-col md:flex-row md:items-end justify-between mb-6 gap-4">
            <div>
              <div className="inline-flex items-center gap-1.5 bg-amber-100 text-amber-900 px-3 py-1 rounded-full text-xs font-extrabold border border-amber-300 mb-2">
                <Clock className="w-3.5 h-3.5 text-amber-700" />
                अपडेटेड प्रति घंटा दरें (Revised Hourly Rates)
              </div>
              <h2 className="text-2xl sm:text-3xl font-extrabold text-slate-900 tracking-tight">
                ⏱️ Hourly Labour Booking (प्रति घंटा बुकिंग)
              </h2>
              <p className="text-sm text-slate-600 mt-1">
                छोटे काम के लिए सीमित समय के लिए मजदूर बुक करें — पारदर्शी दरों
                पर!
              </p>
            </div>

            <button
              onClick={() =>
                handleOpenModal({
                  name: "General Labour (Hourly)",
                  rate: 700,
                })
              }
              className="shrink-0 px-5 py-2.5 bg-[#F59E0B] hover:bg-amber-400 text-slate-900 font-extrabold rounded-xl text-sm flex items-center gap-1.5 shadow-md transition-all"
            >
              <Clock className="w-4 h-4" />
              प्रति घंटा बुकिंग करें
            </button>
          </div>

          {/* REVISED HOURLY PRICING CARDS */}
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
            {[
              {
                hours: 1,
                label: "1 घंटा",
                desc: "क्विक वर्क — हल्का सामान उठाना या तुरंत सहायता",
                price: 300,
                emoji: "⚡",
              },
              {
                hours: 2,
                label: "2 घंटे",
                desc: "छोटे काम जैसे माल उठाना, हल्की शिफ्टिंग व सफाई",
                price: 400,
                emoji: "🕑",
              },
              {
                hours: 3,
                label: "3 घंटे",
                desc: "हाफ डे वर्क — अनलोडिंग, खुदाई, निर्माण सहायता",
                price: 500,
                emoji: "🕒",
              },
              {
                hours: 6,
                label: "6 घंटे",
                desc: "विस्तृत साइट कार्य व कंस्ट्रक्शन मजदूर सहायता",
                price: 600,
                emoji: "🕕",
              },
            ].map((slot) => (
              <button
                key={slot.hours}
                type="button"
                onClick={() =>
                  handleOpenModal({
                    name: `Hourly Labour (${slot.label})`,
                    rate: slot.price,
                  })
                }
                className="bg-white hover:bg-amber-50 border border-amber-200 hover:border-amber-400 rounded-2xl p-5 text-left transition-all group shadow-sm hover:shadow-md space-y-2"
              >
                <div className="flex items-center justify-between">
                  <span className="text-3xl">{slot.emoji}</span>
                  <span className="text-xs font-black bg-amber-100 text-amber-900 px-2.5 py-1 rounded-lg">
                    {slot.hours}h Duration
                  </span>
                </div>

                <h3 className="text-lg font-extrabold text-slate-900 group-hover:text-[#F59E0B] transition-colors">
                  {slot.label}
                </h3>

                <p className="text-xs text-slate-500 leading-snug">
                  {slot.desc}
                </p>

                <div className="pt-3 border-t border-amber-100 flex items-center justify-between">
                  <span className="text-xs text-slate-500 font-medium">
                    कुल अनुमानित दर
                  </span>
                  <span className="text-xl font-black text-amber-700">
                    ₹{slot.price}
                  </span>
                </div>
              </button>
            ))}
          </div>
        </div>
      </section>

      {/* SECTION: LOADING / UNLOADING PER BAG CARDS */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="bg-gradient-to-br from-blue-50 to-indigo-50 border border-blue-200 rounded-3xl p-6 sm:p-8">
          <div className="flex flex-col md:flex-row md:items-center justify-between gap-6">
            <div className="space-y-2">
              <div className="inline-flex items-center gap-1.5 bg-blue-100 text-blue-900 px-3 py-1 rounded-full text-xs font-extrabold border border-blue-300">
                <Truck className="w-3.5 h-3.5 text-blue-700" />
                लोडिंग / अनलोडिंग दर
              </div>
              <h2 className="text-2xl sm:text-3xl font-extrabold text-slate-900">
                🚚 लोडिंग / अनलोडिंग — ₹4 प्रति बैग
              </h2>
              <p className="text-sm text-slate-600 max-w-2xl">
                बोरी, बैग या कट्टों की लोडिंग और अनलोडिंग के लिए। प्रति बैग लगभग
                20–50 किलोग्राम वजन।
              </p>
            </div>

            <div className="bg-white p-5 rounded-2xl border border-blue-200 text-center space-y-2 shrink-0 shadow-sm">
              <span className="text-xs text-slate-500 block font-bold">
                प्रति बैग अनुमानित दर
              </span>
              <div className="text-3xl font-black text-[#155EEF]">
                ₹4{" "}
                <span className="text-xs font-normal text-slate-600">
                  / बैग
                </span>
              </div>
              <p className="text-[11px] text-slate-500">
                लगभग 20–50 kg प्रति बैग
              </p>
              <button
                onClick={() =>
                  handleOpenModal({ name: "Loading / Unloading", rate: 4 })
                }
                className="w-full py-2.5 px-4 bg-[#155EEF] hover:bg-[#1254D4] text-white text-xs font-bold rounded-xl shadow-sm"
              >
                बैग संख्या दर्ज कर बुक करें
              </button>
            </div>
          </div>
        </div>
      </section>

      {/* DEDICATED TATKAL BOOKING SECTION */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="bg-gradient-to-r from-[#101828] via-amber-950/80 to-[#101828] border-2 border-amber-500/40 rounded-3xl p-6 sm:p-10 text-white shadow-2xl relative overflow-hidden">
          <div className="absolute top-0 right-0 w-80 h-80 bg-amber-500/10 rounded-full blur-3xl pointer-events-none"></div>

          <div className="flex flex-col lg:flex-row items-center justify-between gap-8 relative z-10">
            <div className="space-y-4 max-w-2xl text-center lg:text-left">
              <div className="inline-flex items-center gap-2 bg-amber-500/20 text-amber-300 border border-amber-500/40 px-3.5 py-1.5 rounded-full text-xs font-black uppercase tracking-wider">
                <Zap className="w-4 h-4 text-amber-400 fill-amber-400" />
                ⚡ Tatkal Booking Section (तत्काल मजदूर सेवा)
              </div>
              <h2 className="text-3xl sm:text-4xl font-black tracking-tight text-white leading-tight">
                Need Labour Urgently Today? <br />
                <span className="text-amber-400">Workers Dispatched Within 6 Hours!</span>
              </h2>
              <p className="text-slate-300 text-sm sm:text-base leading-relaxed">
                Emergency work at your site? Select <strong>Tatkal Booking</strong> for high-priority same-day allocation. Our operations team dispatches verified labourers to your location in Bulandshahr within 6 hours.
              </p>

              <div className="grid grid-cols-2 sm:grid-cols-3 gap-3 pt-2 text-xs">
                <div className="bg-slate-900/90 border border-amber-500/30 p-3 rounded-xl">
                  <span className="font-extrabold text-amber-400 block text-sm">⏱️ 6 Hours Notice</span>
                  <span className="text-slate-400">Guaranteed arrival time</span>
                </div>
                <div className="bg-slate-900/90 border border-amber-500/30 p-3 rounded-xl">
                  <span className="font-extrabold text-amber-400 block text-sm">⚡ Same Day Service</span>
                  <span className="text-slate-400">Today booking</span>
                </div>
                <div className="bg-slate-900/90 border border-amber-500/30 p-3 rounded-xl col-span-2 sm:col-span-1">
                  <span className="font-extrabold text-amber-400 block text-sm">💰 Clear Pricing</span>
                  <span className="text-slate-400">Rate + ₹50 trans + ₹150</span>
                </div>
              </div>
            </div>

            <div className="flex flex-col sm:flex-row lg:flex-col gap-3 shrink-0 w-full sm:w-auto">
              <button
                onClick={() => handleOpenTatkalModal()}
                className="py-4 px-8 bg-gradient-to-r from-amber-400 to-amber-500 hover:from-amber-300 hover:to-amber-400 text-slate-950 font-black rounded-2xl shadow-xl shadow-amber-500/20 text-sm sm:text-base flex items-center justify-center gap-2 transform hover:-translate-y-0.5 transition-all"
              >
                <Zap className="w-5 h-5 fill-slate-950" />
                <span>⚡ Book Tatkal Labour Now</span>
              </button>

              <button
                onClick={() => openWhatsAppDirect('Tatkal Urgent Labour')}
                className="py-3.5 px-6 bg-emerald-600 hover:bg-emerald-500 text-white font-bold rounded-2xl text-xs sm:text-sm flex items-center justify-center gap-2 transition-all shadow-md"
              >
                <MessageCircle className="w-4 h-4 fill-current" />
                <span>WhatsApp Tatkal Query</span>
              </button>
            </div>
          </div>
        </div>
      </section>

      {/* SECTION 1: LABOUR / MAJDOOR SERVICES GRID */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex flex-col md:flex-row md:items-end justify-between mb-8 gap-4">
          <div>
            <div className="inline-flex items-center gap-1.5 bg-emerald-50 text-emerald-700 px-3 py-1 rounded-full text-xs font-extrabold border border-emerald-200 mb-2">
              <span className="w-2 h-2 rounded-full bg-emerald-500 animate-ping"></span>
              AVAILABLE NOW IN BULANDSHAHR
            </div>
            <h2 className="text-2xl sm:text-3xl font-extrabold text-slate-900 tracking-tight">
              Labour & Daily Wage Services (मजदूर सर्विस)
            </h2>
            <p className="text-sm text-slate-600 mt-1">
              अपनी आवश्यकता अनुसार मजदूर चुनें और तुरंत सटीक वर्क लोकेशन पर बुक
              करें।
            </p>
          </div>

          <div className="flex items-center gap-2">
            <button
              onClick={() => openWhatsAppDirect()}
              className="px-4 py-2 bg-[#25D366] text-white font-bold rounded-xl text-xs flex items-center gap-1.5 shadow-xs"
            >
              <MessageCircle className="w-4 h-4 fill-current" />
              WhatsApp Booking
            </button>
          </div>
        </div>

        {/* Labour Services Grid */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
          {labourServices.map((service) => {
            const Icon = service.icon;
            const isBag = service.name.includes("Loading");
            return (
              <div
                key={service.id}
                className="bg-white rounded-2xl border border-slate-200 p-5 shadow-xs hover:shadow-xl hover:border-blue-400 transition-all group flex flex-col justify-between"
              >
                <div>
                  <div className="relative mb-4 overflow-hidden rounded-xl h-40 bg-slate-100 border border-slate-200 shadow-inner">
                    <img 
                      src={service.image} 
                      alt={service.name} 
                      className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-300"
                    />
                    <div className="absolute inset-0 bg-gradient-to-t from-slate-900/60 via-transparent to-transparent"></div>
                    <div className="absolute top-2 left-2 w-8 h-8 rounded-lg bg-white/90 backdrop-blur-md text-amber-600 border border-white/40 flex items-center justify-center shadow-md">
                      <Icon className="w-4 h-4" />
                    </div>
                    {service.badge && (
                      <span className="absolute top-2 right-2 text-[10px] font-extrabold bg-[#155EEF] text-white px-2.5 py-1 rounded-md shadow-md border border-white/20">
                        {service.badge}
                      </span>
                    )}
                  </div>

                  <h3 className="text-lg font-extrabold text-slate-900 group-hover:text-[#155EEF] transition-colors">
                    {service.name}
                  </h3>

                  <p className="text-xs text-slate-500 mt-2 leading-relaxed">
                    {service.desc}
                  </p>
                </div>

                <div className="mt-6 pt-4 border-t border-slate-100 space-y-3">
                  <div className="flex items-center justify-between">
                    <span className="text-[11px] text-slate-400 font-medium">
                      {isBag ? "Per Bag Rate" : "Daily Wage"}
                    </span>
                    <span className="text-sm font-extrabold text-slate-900">
                      ₹{service.rate}{" "}
                      <span className="text-[10px] font-normal text-slate-500">
                        {isBag ? "/ बैग" : "/ मजदूर"}
                      </span>
                    </span>
                  </div>

                  <div className="grid grid-cols-2 gap-2">
                    <button
                      onClick={() => openWhatsAppDirect(service.name)}
                      className="py-2 px-2 bg-[#25D366] hover:bg-[#20BD5A] text-white rounded-xl text-xs font-bold flex items-center justify-center gap-1 shadow-xs transition-all"
                    >
                      <MessageCircle className="w-3.5 h-3.5 fill-current" />
                      WhatsApp
                    </button>
                    <button
                      onClick={() => handleOpenModal(service)}
                      className="py-2 px-2 bg-[#155EEF] hover:bg-[#1254D4] text-white rounded-xl text-xs font-bold flex items-center justify-center gap-1 shadow-xs transition-all"
                    >
                      Book Now
                    </button>
                  </div>
                </div>
              </div>
            );
          })}
        </div>
      </section>

      {/* SECTION 2: SKILLED TRADES — COMING SOON */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="bg-slate-900 text-white rounded-3xl p-6 sm:p-10 shadow-2xl relative overflow-hidden">
          <div className="absolute top-0 right-0 w-80 h-80 bg-blue-600/10 rounded-full blur-3xl pointer-events-none"></div>

          <div className="mb-8">
            <div className="inline-flex items-center gap-1.5 bg-amber-500/20 text-amber-300 px-3.5 py-1 rounded-full text-xs font-extrabold border border-amber-500/30 mb-3">
              <Clock className="w-3.5 h-3.5 text-amber-400" />
              SKILLED TRADES CATEGORIES
            </div>
            <h2 className="text-2xl sm:text-4xl font-extrabold text-white tracking-tight">
              Mistri & Skilled Services{" "}
              <span className="text-amber-400 font-bold">(Coming Soon)</span>
            </h2>
            <p className="text-sm text-slate-300 mt-2 max-w-2xl">
              बुलंदशहर में सत्यापित राज मिस्त्री, इलेक्ट्रीशियन, प्लंबर व पेंटर
              सेवाओं का ऑनबोर्डिंग जारी है।
            </p>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
            {comingSoonServices.map((service) => {
              const Icon = service.icon;
              return (
                <div
                  key={service.id}
                  className="bg-white/5 border border-white/10 rounded-2xl p-4 flex flex-col justify-between hover:bg-white/10 transition-all relative overflow-hidden"
                >
                  <div className="absolute top-3 right-3 bg-amber-500/20 text-amber-300 border border-amber-500/40 text-[9px] font-black uppercase px-2 py-0.5 rounded-full">
                    Coming Soon
                  </div>

                  <div>
                    <div className="w-10 h-10 rounded-xl bg-white/10 flex items-center justify-center text-amber-400 mb-3">
                      <Icon className="w-5 h-5" />
                    </div>
                    <h3 className="text-base font-bold text-white">
                      {service.name}
                    </h3>
                    <p className="text-xs text-slate-400 mt-1 leading-snug">
                      {service.desc}
                    </p>
                  </div>

                  <div className="mt-4 pt-3 border-t border-white/10 flex items-center justify-between text-[11px] text-slate-400">
                    <span>Status: Launching Soon</span>
                    <span className="text-amber-400 font-semibold">
                      Pre-Notify
                    </span>
                  </div>
                </div>
              );
            })}
          </div>
        </div>
      </section>

      {/* Booking Modals */}
      <BookingModal
        isOpen={isModalOpen}
        onClose={() => setIsModalOpen(false)}
        initialService={selectedServiceForModal}
      />

      <TatkalBookingModal
        isOpen={isTatkalModalOpen}
        onClose={() => setIsTatkalModalOpen(false)}
        initialService={selectedServiceForModal}
      />
    </div>
  );
};
