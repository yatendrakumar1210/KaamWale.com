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
  Wind
} from 'lucide-react';
import { BookingModal } from '../components/common/BookingModal';

export const HomePage = () => {
  const { selectedCity, setIsCityModalOpen } = useCity();

  const [selectedServiceForModal, setSelectedServiceForModal] = useState(null);
  const [isModalOpen, setIsModalOpen] = useState(false);

  const PHONE_NUMBER = KAAMWALE_PHONE;
  const DISPLAY_PHONE = '+91 63958 82126';

  // Active Labour / Majdoor Services
  const labourServices = [
    { id: 'l1', name: 'General Labour', icon: HardHat, rate: 550, desc: 'Daily wage helpers for site clearing, cleaning, moving & general support.', badge: 'Popular' },
    { id: 'l2', name: 'Construction Labour', icon: Building2, rate: 650, desc: 'Experienced workers for concrete mixing, brick carrying, shuttering & civil work.', badge: 'In High Demand' },
    { id: 'l3', name: 'Loading / Unloading', icon: Truck, rate: 600, desc: 'Heavy lifting labour for goods trucks, warehouse stock & freight loading.', badge: 'Fast Booking' },
    { id: 'l4', name: 'House Shifting Labour', icon: PackageCheck, rate: 600, desc: 'Careful helpers for furniture loading, packing assist, & household moving.' },
    { id: 'l5', name: 'Farm / Agriculture Labour', icon: Wheat, rate: 550, desc: 'Crop harvesting, soil preparation, field digging & farm daily workers.' },
    { id: 'l6', name: 'Digging & Excavation', icon: Shovel, rate: 600, desc: 'Manual trenching, pipeline digging, foundation excavation & soil removal.' },
    { id: 'l7', name: 'Demolition & Debris', icon: Hammer, rate: 700, desc: 'Wall demolition helpers, brick breaking & site debris clearance.' },
    { id: 'l8', name: 'Factory & Warehouse Labour', icon: Users, rate: 600, desc: 'Industrial daily helpers for assembly line, material sorting & packing.' }
  ];

  // Skilled Services — "COMING SOON"
  const comingSoonServices = [
    { id: 'cs1', name: 'Mason (Raj Mistri)', icon: Building2, desc: 'Master mason for brickwork, plastering & wall construction.' },
    { id: 'cs2', name: 'Electrician', icon: Zap, desc: 'House wiring, circuit repair, switchboard & breaker installation.' },
    { id: 'cs3', name: 'Plumber', icon: Wrench, desc: 'Pipe repair, tap fitting, leak fix & sanitary installation.' },
    { id: 'cs4', name: 'Painter', icon: Paintbrush, desc: 'Interior & exterior wall painting, putty & waterproof coating.' },
    { id: 'cs5', name: 'Carpenter', icon: Axe, desc: 'Woodwork, door repair, modular cabinet & furniture fitting.' },
    { id: 'cs6', name: 'AC Technician', icon: Wind, desc: 'AC jet service, gas top-up, installation & cooling repairs.' },
    { id: 'cs7', name: 'Welder', icon: Flame, desc: 'Iron gate welding, grill repair & steel fabrication.' },
    { id: 'cs8', name: 'Deep Cleaning', icon: Sparkles, desc: 'Full house deep cleaning, water tank cleaning & sanitation.' }
  ];

  const handleOpenModal = (service) => {
    setSelectedServiceForModal(service);
    setIsModalOpen(true);
  };

  const openWhatsAppDirect = (serviceName = '') => {
    const msg = buildWhatsAppMessage(serviceName);
    window.open(`https://wa.me/${PHONE_NUMBER.replace('+', '')}?text=${msg}`, '_blank');
  };

  const handleCallDirect = () => {
    window.location.href = `tel:${PHONE_NUMBER}`;
  };

  return (
    <div className="space-y-16 pb-16">
      {/* HERO SECTION */}
      <section className="relative overflow-hidden bg-gradient-to-b from-[#101828] via-[#101828] to-slate-900 text-white pt-12 pb-20 lg:pt-16 lg:pb-28">
        {/* Decorative ambient lighting */}
        <div className="absolute top-0 right-1/4 w-96 h-96 bg-[#155EEF]/20 rounded-full blur-3xl pointer-events-none"></div>
        <div className="absolute bottom-0 left-10 w-80 h-80 bg-amber-500/10 rounded-full blur-3xl pointer-events-none"></div>

        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-10 items-center">
            {/* Left Content */}
            <div className="lg:col-span-7 space-y-6 text-center lg:text-left">
              <div className="inline-flex items-center gap-2 bg-white/10 backdrop-blur-md border border-white/20 px-4 py-1.5 rounded-full text-xs font-bold text-amber-300">
                <ShieldCheck className="w-4 h-4 text-amber-400" />
                <span>Verified City Operations • Bulandshahr, UP</span>
              </div>

              <h1 className="text-3xl sm:text-5xl lg:text-6xl font-black tracking-tight leading-tight">
                Kaam<span className="text-[#155EEF]">Wale</span>
                <span className="text-[#F59E0B]">.com</span> <br />
                <span className="bg-gradient-to-r from-amber-400 via-amber-300 to-yellow-500 bg-clip-text text-transparent text-4xl">
                  हर काम के लिए 
                </span>
              </h1>

              <p className="text-base sm:text-lg text-slate-300 max-w-2xl font-normal leading-relaxed mx-auto lg:mx-0">
                Need reliable labourers for daily work? Book trusted
                construction workers, loading helpers, house shifting daily
                labour, and general helpers directly in{" "}
                <strong>Bulandshahr</strong>.
              </p>

              {/* 2 FAST BOOKING OPTIONS BANNER */}
              <div className="bg-white/10 backdrop-blur-md border border-white/15 p-5 sm:p-6 rounded-2xl max-w-xl mx-auto lg:mx-0 space-y-4">
                <div className="flex items-center justify-between">
                  <span className="text-xs font-bold uppercase tracking-wider text-amber-300 flex items-center gap-1.5">
                    <CheckCircle2 className="w-4 h-4 text-amber-400" /> Instant
                    Labour Booking
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
                    <div className="text-left leading-tight">
                      <span className="block text-[10px] font-medium opacity-90"></span>
                      <span className="text-sm font-extrabold">
                        Book via WhatsApp
                      </span>
                    </div>
                  </button>

                  {/* Option 2: Phone Call */}
                  <button
                    onClick={handleCallDirect}
                    className="w-full py-3.5 px-4 bg-[#155EEF] hover:bg-[#1254D4] text-white font-bold rounded-xl shadow-lg hover:shadow-xl transition-all flex items-center justify-center gap-2 text-sm active:scale-98"
                  >
                    <Phone className="w-5 h-5" />
                    <div className="text-left leading-tight">
                      <span className="block text-[10px] font-medium opacity-90"></span>
                      <span className="text-sm font-extrabold">
                        Call Us: {DISPLAY_PHONE}
                      </span>
                    </div>
                  </button>
                </div>

                <p className="text-[11px] text-slate-400 text-center">
                  ⚡ Operations team arranges verified workers at your site
                  within 60 minutes!
                </p>
              </div>
            </div>

            {/* Right Card / Visual Badge */}
            <div className="lg:col-span-5 flex justify-center">
              <div className="bg-white/10 backdrop-blur-lg border border-white/20 p-6 sm:p-8 rounded-3xl text-center space-y-5 max-w-md w-full shadow-2xl relative">
                <div className="w-20 h-20 mx-auto rounded-2xl bg-gradient-to-tr from-amber-400 to-amber-600 flex items-center justify-center text-slate-900 shadow-xl shadow-amber-500/20">
                  <HardHat className="w-10 h-10" />
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

                <div className="space-y-2 pt-2 text-left">
                  <div className="flex items-center gap-3 bg-white/5 p-3 rounded-xl border border-white/10">
                    <CheckCircle2 className="w-5 h-5 text-emerald-400 flex-shrink-0" />
                    <span className="text-xs text-slate-200">
                      Verified & Punctual Local Workers
                    </span>
                  </div>
                  <div className="flex items-center gap-3 bg-white/5 p-3 rounded-xl border border-white/10">
                    <CheckCircle2 className="w-5 h-5 text-emerald-400 flex-shrink-0" />
                    <span className="text-xs text-slate-200">
                      Fair Fixed Daily Wage Rates (₹550 - ₹700)
                    </span>
                  </div>
                  <div className="flex items-center gap-3 bg-white/5 p-3 rounded-xl border border-white/10">
                    <CheckCircle2 className="w-5 h-5 text-emerald-400 flex-shrink-0" />
                    <span className="text-xs text-slate-200">
                      Full Privacy — Direct Ops Support
                    </span>
                  </div>
                </div>

                <button
                  onClick={() =>
                    handleOpenModal({
                      name: "General Construction Labour",
                      rate: 600,
                    })
                  }
                  className="w-full py-3.5 bg-amber-400 hover:bg-amber-300 text-slate-950 font-black rounded-xl shadow-lg transition-all text-sm uppercase tracking-wider"
                >
                  ⚡ Select Labour & Book Now
                </button>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* SECTION: HOURLY BOOKING QUICK CARDS */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="bg-gradient-to-br from-amber-50 to-orange-50 border border-amber-200 rounded-3xl p-6 sm:p-8">
          <div className="flex flex-col md:flex-row md:items-end justify-between mb-6 gap-4">
            <div>
              <div className="inline-flex items-center gap-1.5 bg-amber-100 text-amber-800 px-3 py-1 rounded-full text-xs font-extrabold border border-amber-300 mb-2">
                <Clock className="w-3.5 h-3.5 text-amber-600" />
                घंटे के हिसाब से भी मजदूर मिलते हैं!
              </div>
              <h2 className="text-2xl sm:text-3xl font-extrabold text-slate-900 tracking-tight">
                ⏱️ Hourly Labour Booking (प्रति घंटा बुकिंग)
              </h2>
              <p className="text-sm text-slate-600 mt-1">
                सिर्फ 2-4 घंटे के काम के लिए भी मजदूर बुक करें — कम खर्चे में!
              </p>
            </div>

            <button
              onClick={() =>
                handleOpenModal({
                  name: "General Labour (Hourly)",
                  rate: 600,
                  category: "majdoor",
                })
              }
              className="shrink-0 px-5 py-2.5 bg-[#F59E0B] hover:bg-amber-400 text-slate-900 font-extrabold rounded-xl text-sm flex items-center gap-1.5 shadow-md transition-all"
            >
              <Clock className="w-4 h-4" />
              प्रति घंटा बुकिंग
            </button>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
            {[
              {
                hours: 2,
                label: "2 घंटे",
                desc: "छोटे काम जैसे माल उठाना, सफाई",
                rate: 150,
                emoji: "⚡",
              },
              {
                hours: 4,
                label: "4 घंटे (Half Day)",
                desc: "हाफ डे काम — खुदाई, ईंट ढोना",
                rate: 300,
                emoji: "🕓",
              },
              {
                hours: 6,
                label: "6 घंटे",
                desc: "लंबे काम जैसे कंस्ट्रक्शन हेल्पर",
                rate: 450,
                emoji: "🕕",
              },
              {
                hours: 8,
                label: "8 घंटे (Full Day)",
                desc: "पूरा दिन काम — सबसे किफायती",
                rate: 600,
                emoji: "🌞",
              },
            ].map((slot) => (
              <button
                key={slot.hours}
                type="button"
                onClick={() =>
                  handleOpenModal({
                    name: `Labour — ${slot.label}`,
                    rate: 600,
                    category: "majdoor",
                  })
                }
                className="bg-white hover:bg-amber-50 border border-amber-200 hover:border-amber-400 rounded-2xl p-4 text-left transition-all group shadow-sm hover:shadow-md"
              >
                <div className="text-3xl mb-2">{slot.emoji}</div>
                <h3 className="text-base font-extrabold text-slate-900 group-hover:text-[#F59E0B] transition-colors">
                  {slot.label}
                </h3>
                <p className="text-xs text-slate-500 mt-1 leading-snug">
                  {slot.desc}
                </p>
                <div className="mt-3 pt-3 border-t border-amber-100 flex items-center justify-between">
                  <span className="text-xs text-slate-500">
                    प्रति मजदूर (Approx)
                  </span>
                  <span className="text-sm font-extrabold text-amber-700">
                    ₹{slot.rate}~
                  </span>
                </div>
              </button>
            ))}
          </div>

          <p className="text-center text-xs text-slate-500 mt-4">
            * दरें अनुमानित हैं। बुकिंग WhatsApp या Call से कन्फर्म करें।
          </p>
        </div>
      </section>

      {/* SECTION 1: LABOUR / MAJDOOR SERVICES (ACTIVE NOW) */}
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
              Select any labour requirement below to instantly book via WhatsApp
              or Direct Call.
            </p>
          </div>

          <div className="flex items-center gap-2">
            <button
              onClick={() => openWhatsAppDirect()}
              className="px-4 py-2 bg-[#25D366] text-white font-bold rounded-xl text-xs flex items-center gap-1.5 shadow-sm"
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
            return (
              <div
                key={service.id}
                className="bg-white rounded-2xl border border-slate-200 p-5 shadow-sm hover:shadow-xl hover:border-blue-400 transition-all group flex flex-col justify-between"
              >
                <div>
                  <div className="flex items-start justify-between mb-4">
                    <div className="w-12 h-12 rounded-xl bg-amber-50 text-amber-700 border border-amber-200 flex items-center justify-center group-hover:scale-110 transition-transform">
                      <Icon className="w-6 h-6" />
                    </div>
                    {service.badge && (
                      <span className="text-[10px] font-extrabold bg-blue-50 text-[#155EEF] px-2 py-0.5 rounded-md border border-blue-200">
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
                      Daily Wage
                    </span>
                    <span className="text-sm font-extrabold text-slate-900">
                      ₹{service.rate}{" "}
                      <span className="text-[10px] font-normal text-slate-500">
                        / worker
                      </span>
                    </span>
                  </div>

                  <div className="grid grid-cols-2 gap-2">
                    <button
                      onClick={() => openWhatsAppDirect(service.name)}
                      className="py-2 px-2 bg-[#25D366] hover:bg-[#20BD5A] text-white rounded-xl text-xs font-bold flex items-center justify-center gap-1 shadow-sm transition-all"
                    >
                      <MessageCircle className="w-3.5 h-3.5 fill-current" />
                      WhatsApp
                    </button>
                    <button
                      onClick={() => handleOpenModal(service)}
                      className="py-2 px-2 bg-[#155EEF] hover:bg-[#1254D4] text-white rounded-xl text-xs font-bold flex items-center justify-center gap-1 shadow-sm transition-all"
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
              We are currently onboarding verified Raj Mistris, Electricians,
              Plumbers, Painters, and Technicians in Bulandshahr. These skilled
              trade categories will be launching very soon!
            </p>
          </div>

          {/* Grid of Coming Soon cards */}
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

      {/* SECTION 3: 3 SIMPLE STEPS TO BOOK LABOUR */}
      <section
        id="how-it-works"
        className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8"
      >
        <div className="text-center max-w-3xl mx-auto mb-12">
          <span className="text-xs font-extrabold uppercase tracking-wider text-[#155EEF] bg-blue-50 px-3 py-1 rounded-full border border-blue-200">
            Hassle-Free Process
          </span>
          <h2 className="text-2xl sm:text-4xl font-extrabold text-slate-900 tracking-tight mt-3">
            How Booking Works on KaamWale
          </h2>
          <p className="text-sm text-slate-600 mt-2">
            No complex signups or online payments. Simple 3-step process to get
            verified labour at your site.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          {/* Step 1 */}
          <div className="bg-white p-6 rounded-2xl border border-slate-200 shadow-sm text-center relative">
            <div className="w-12 h-12 rounded-2xl bg-blue-50 text-[#155EEF] font-black text-xl flex items-center justify-center mx-auto mb-4 border border-blue-200 shadow-inner">
              1
            </div>
            <h3 className="text-lg font-bold text-slate-900">
              Choose Labour Type
            </h3>
            <p className="text-xs text-slate-500 mt-2 leading-relaxed">
              Select the type of work (Construction, Loading, Shifting, Farm, or
              General Helper) and how many labourers you need.
            </p>
          </div>

          {/* Step 2 */}
          <div className="bg-white p-6 rounded-2xl border border-slate-200 shadow-sm text-center relative">
            <div className="w-12 h-12 rounded-2xl bg-emerald-50 text-emerald-600 font-black text-xl flex items-center justify-center mx-auto mb-4 border border-emerald-200 shadow-inner">
              2
            </div>
            <h3 className="text-lg font-bold text-slate-900">
              Call or WhatsApp Us
            </h3>
            <p className="text-xs text-slate-500 mt-2 leading-relaxed">
              Click to Call or send a quick WhatsApp message with your site
              location and date. Our operations team confirms instantly.
            </p>
          </div>

          {/* Step 3 */}
          <div className="bg-white p-6 rounded-2xl border border-slate-200 shadow-sm text-center relative">
            <div className="w-12 h-12 rounded-2xl bg-amber-50 text-amber-600 font-black text-xl flex items-center justify-center mx-auto mb-4 border border-amber-200 shadow-inner">
              3
            </div>
            <h3 className="text-lg font-bold text-slate-900">
              Labour Arrives at Site
            </h3>
            <p className="text-xs text-slate-500 mt-2 leading-relaxed">
              Verified daily labourers reach your work location on time. You pay
              them directly after the work is completed!
            </p>
          </div>
        </div>
      </section>

      {/* SECTION 4: QUICK CALL / WHATSAPP BOTTOM BANNER */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="bg-gradient-to-r from-[#155EEF] to-[#1254D4] text-white p-8 sm:p-12 rounded-3xl shadow-xl flex flex-col md:flex-row items-center justify-between gap-6">
          <div className="space-y-2 text-center md:text-left">
            <h3 className="text-2xl sm:text-3xl font-extrabold">
              Need Custom Labour Arrangement?
            </h3>
            <p className="text-sm text-blue-100 max-w-xl">
              For large construction sites, factory staff, or emergency daily
              labour in Bulandshahr, call our operations desk directly.
            </p>
          </div>

          <div className="flex flex-col sm:flex-row items-center gap-3 w-full md:w-auto">
            <button
              onClick={() => openWhatsAppDirect()}
              className="w-full sm:w-auto py-3.5 px-6 bg-[#25D366] hover:bg-[#20BD5A] text-white font-bold rounded-2xl shadow-md flex items-center justify-center gap-2 text-sm transition-all"
            >
              <MessageCircle className="w-5 h-5 fill-current" />
              WhatsApp Helpline
            </button>

            <button
              onClick={handleCallDirect}
              className="w-full sm:w-auto py-3.5 px-6 bg-slate-900 hover:bg-black text-white font-bold rounded-2xl shadow-md flex items-center justify-center gap-2 text-sm transition-all"
            >
              <Phone className="w-5 h-5 text-amber-400" />
              Call {DISPLAY_PHONE}
            </button>
          </div>
        </div>
      </section>

      {/* Booking Modal */}
      <BookingModal
        isOpen={isModalOpen}
        onClose={() => setIsModalOpen(false)}
        initialService={selectedServiceForModal}
      />
    </div>
  );
};
