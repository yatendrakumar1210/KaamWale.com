import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import { useCity } from '../context/CityContext';
import { buildWhatsAppMessage, KAAMWALE_PHONE } from '../services/whatsappHelper';
import {
  HardHat,
  Building2,
  Truck,
  PackageCheck,
  Wheat,
  Shovel,
  Construction,
  Boxes,
  Factory,
  Tent,
  Hammer,
  UserCheck,
  Building,
  ArrowRight,
  Info,
  ChevronLeft,
  MessageCircle,
  Phone
} from 'lucide-react';
import { BookingModal } from '../components/common/BookingModal';

export const MajdoorServicesPage = () => {
  const { selectedCity } = useCity();
  const [selectedService, setSelectedService] = useState(null);
  const [isModalOpen, setIsModalOpen] = useState(false);

  const PHONE_NUMBER = KAAMWALE_PHONE;
  const DISPLAY_PHONE = '+91 63958 82126';

  const majdoorServices = [
    { name: 'Construction Labour', icon: Building2, rate: 650, desc: 'Concrete mixing, lintel casting, brick carrying, site helper work.', popular: true },
    { name: 'Loading / Unloading Labour', icon: Truck, rate: 600, desc: 'Heavy lifting for trucks, containers, godowns & freight.', popular: true },
    { name: 'House Shifting Labour', icon: PackageCheck, rate: 600, desc: 'Dedicated helpers for household packing, loading & moving.', popular: true },
    { name: 'Agriculture / Farm Labour', icon: Wheat, rate: 550, desc: 'Crop harvesting, field preparation, sowing, & farm work.' },
    { name: 'Cleaning Labour', icon: UserCheck, rate: 550, desc: 'Site debris cleanup, post-construction washing, deep cleaning.' },
    { name: 'Building Material Labour', icon: Building, rate: 650, desc: 'Cement bags, sand, gravel, stone dust loading & unloading.' },
    { name: 'Road Work Labour', icon: Construction, rate: 650, desc: 'Tar paving, gutter excavation, pipe laying civil helpers.' },
    { name: 'Digging / Excavation Labour', icon: Shovel, rate: 600, desc: 'Manual trench digging, foundation excavation & pit digging.' },
    { name: 'Gardening Labour', icon: Wheat, rate: 550, desc: 'Lawn digging, soil levelling, weeding & tree trimming.' },
    { name: 'Factory / Industrial Labour', icon: Factory, rate: 600, desc: 'Assembly line assistance, packing, shifting & factory helpers.' },
    { name: 'Warehouse Labour', icon: Boxes, rate: 600, desc: 'Goods stacking, inventory sorting, packing & dispatch staff.' },
    { name: 'Event / Tent Labour', icon: Tent, rate: 550, desc: 'Wedding tent setup, chair arrangement, stage work & catering helpers.' },
    { name: 'General Helper', icon: UserCheck, rate: 550, desc: 'Daily wage helper for shop, office, home or miscellaneous work.' },
    { name: 'Demolition Labour', icon: Hammer, rate: 700, desc: 'Manual wall breaking, concrete chipping & debris removal.' }
  ];

  const handleBookService = (service) => {
    setSelectedService(service);
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
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8 space-y-8">
      {/* Header Breadcrumb */}
      <div className="flex items-center justify-between">
        <div className="flex items-center gap-2 text-sm text-slate-500">
          <Link to="/" className="hover:text-[#155EEF] flex items-center gap-1">
            <ChevronLeft className="w-4 h-4" /> Home
          </Link>
          <span>/</span>
          <span className="font-bold text-slate-900">Labour Services (मजदूर सर्विस)</span>
        </div>

        <div className="flex items-center gap-2">
          <button
            onClick={() => openWhatsAppDirect()}
            className="px-3.5 py-1.5 bg-[#25D366] text-white rounded-xl text-xs font-bold flex items-center gap-1 shadow-sm"
          >
            <MessageCircle className="w-3.5 h-3.5 fill-current" />
            WhatsApp
          </button>
          <button
            onClick={handleCallDirect}
            className="px-3.5 py-1.5 bg-slate-900 text-white rounded-xl text-xs font-bold flex items-center gap-1 shadow-sm"
          >
            <Phone className="w-3.5 h-3.5 text-amber-400" />
            Call Ops
          </button>
        </div>
      </div>

      {/* Hero Banner */}
      <div className="bg-gradient-to-r from-[#101828] via-[#155EEF] to-[#101828] rounded-3xl p-6 sm:p-10 text-white shadow-xl flex flex-col md:flex-row items-center justify-between gap-6">
        <div className="space-y-3 max-w-2xl text-center md:text-left">
          <div className="inline-flex items-center gap-2 bg-amber-500/20 text-amber-300 border border-amber-500/30 px-3 py-1 rounded-full text-xs font-bold">
            <HardHat className="w-4 h-4 text-amber-400" />
            <span>Dedicated Daily Wage Labour Platform • {selectedCity}</span>
          </div>
          <h1 className="text-3xl sm:text-4xl font-extrabold tracking-tight">
            Need Labour for Your Work? (हर काम के लिए लेबर)
          </h1>
          <p className="text-slate-200 text-sm sm:text-base">
            Select what work you need below. No long checkouts — book directly via <strong>WhatsApp Chat</strong> or <strong>Direct Call</strong>!
          </p>
        </div>

        <button
          onClick={() => handleBookService({ name: 'General Construction Labour', rate: 600 })}
          className="bg-amber-400 hover:bg-amber-300 text-slate-950 font-black px-6 py-3.5 rounded-xl shadow-lg transition-all text-sm shrink-0 flex items-center gap-2"
        >
          <span>⚡ Book Labour Now</span>
          <ArrowRight className="w-4 h-4" />
        </button>
      </div>

      {/* Info Notice Box */}
      <div className="bg-amber-50 border border-amber-200 rounded-2xl p-4 flex items-start gap-3 text-xs sm:text-sm text-amber-900">
        <Info className="w-5 h-5 text-amber-600 shrink-0 mt-0.5" />
        <div>
          <strong className="font-bold">Choose your labour requirement below:</strong>
          <p className="text-slate-600 text-xs mt-0.5">
            Click any service card to choose number of workers and date, then launch WhatsApp or Call directly.
          </p>
        </div>
      </div>

      {/* Service Grid */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 sm:gap-6">
        {majdoorServices.map((service) => {
          const IconComponent = service.icon;
          return (
            <div
              key={service.name}
              className="bg-white p-5 rounded-2xl border border-slate-200 hover:border-[#155EEF] hover:shadow-xl transition-all group flex flex-col justify-between h-full relative overflow-hidden"
            >
              {service.popular && (
                <span className="absolute top-3 right-3 text-[10px] font-bold bg-blue-50 text-[#155EEF] border border-blue-200 px-2 py-0.5 rounded">
                  Popular
                </span>
              )}

              <div>
                <div className="w-12 h-12 rounded-xl bg-amber-50 text-amber-700 border border-amber-200 flex items-center justify-center mb-4 group-hover:scale-110 transition-transform">
                  <IconComponent className="w-6 h-6" />
                </div>

                <h3 className="font-bold text-slate-900 text-base group-hover:text-[#155EEF] transition-colors">
                  {service.name}
                </h3>
                <p className="text-xs text-slate-500 mt-1.5 leading-relaxed">
                  {service.desc}
                </p>
              </div>

              <div className="mt-5 pt-4 border-t border-slate-100 space-y-2">
                <div className="flex items-center justify-between text-xs mb-1">
                  <span className="text-slate-400 font-medium">Est. Rate</span>
                  <span className="font-extrabold text-slate-900">₹{service.rate}/day</span>
                </div>
                <div className="grid grid-cols-2 gap-2">
                  <button
                    onClick={() => openWhatsAppDirect(service.name)}
                    className="py-2 bg-[#25D366] hover:bg-[#20BD5A] text-white rounded-xl text-xs font-bold flex items-center justify-center gap-1 shadow-sm transition-all"
                  >
                    <MessageCircle className="w-3.5 h-3.5 fill-current" />
                    WhatsApp
                  </button>
                  <button
                    onClick={() => handleBookService(service)}
                    className="py-2 bg-[#155EEF] hover:bg-[#1254D4] text-white rounded-xl text-xs font-bold flex items-center justify-center gap-1 shadow-sm transition-all"
                  >
                    Book Now
                  </button>
                </div>
              </div>
            </div>
          );
        })}
      </div>

      <BookingModal
        isOpen={isModalOpen}
        onClose={() => setIsModalOpen(false)}
        initialService={selectedService}
      />
    </div>
  );
};
