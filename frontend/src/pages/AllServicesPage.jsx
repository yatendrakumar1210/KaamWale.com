import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import { useCity } from '../context/CityContext';
import { buildWhatsAppMessage, KAAMWALE_PHONE } from '../services/whatsappHelper';
import {
  HardHat,
  Building2,
  Paintbrush,
  Wrench,
  Zap,
  Axe,
  Sparkles,
  Sprout,
  Flame,
  Wind,
  Search,
  ArrowRight,
  ChevronLeft,
  MessageCircle,
  Phone,
  Clock,
  CheckCircle2
} from 'lucide-react';
import { BookingModal } from '../components/common/BookingModal';
import { TatkalBookingModal } from '../components/common/TatkalBookingModal';

export const AllServicesPage = () => {
  const { selectedCity } = useCity();
  const [activeTab, setActiveTab] = useState('all');
  const [searchQuery, setSearchQuery] = useState('');
  const [selectedService, setSelectedService] = useState(null);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [isTatkalModalOpen, setIsTatkalModalOpen] = useState(false);

  const PHONE_NUMBER = KAAMWALE_PHONE;

  const services = [
    // Majdoor / Labour — ACTIVE NOW
    { name: 'General Labour', category: 'majdoor', icon: HardHat, image: '/images/general_worker.png', status: 'active', rate: 700, desc: 'Site cleanup, manual helper tasks, daily wage labour.' },
    { name: 'Construction Labour', category: 'majdoor', icon: Building2, image: '/images/construction_worker.png', status: 'active', rate: 700, desc: 'Concrete mixing, brick carrying, scaffolding assistance.', popular: true },
    { name: 'Loading / Unloading', category: 'majdoor', icon: HardHat, image: '/images/loading_worker.png', status: 'active', rate: 4, desc: 'Heavy goods lifting for trucks, containers & warehouses.', popular: true },
    { name: 'House Shifting Labour', category: 'majdoor', icon: HardHat, image: '/images/shifting_worker.png', status: 'active', rate: 700, desc: 'Household furniture moving, packing & lifting helpers.' },
    { name: 'Farm Labour', category: 'majdoor', icon: HardHat, image: '/images/farm_worker.png', status: 'active', rate: 700, desc: 'Crop harvesting, soil prep, farming helper work.' },
    { name: 'Digging / Excavation', category: 'majdoor', icon: HardHat, image: 'https://images.unsplash.com/photo-1504307651254-35680f356dfd?auto=format&fit=crop&w=800&q=80', status: 'active', rate: 700, desc: 'Trench digging, foundation excavation & pit digging.' },

    // Mistri — COMING SOON
    { name: 'Raj Mistri (Mason)', category: 'mistri', icon: Building2, status: 'coming_soon', desc: 'Master mason for brickwork, wall structure & stone masonry.' },
    { name: 'Brick Work Mistri', category: 'mistri', icon: Building2, status: 'coming_soon', desc: 'Clay brick, fly-ash brick & block construction.' },
    { name: 'Plaster Work Mistri', category: 'mistri', icon: Building2, status: 'coming_soon', desc: 'Internal & external wall plaster, cement finish.' },
    { name: 'Tile Mistri', category: 'mistri', icon: Building2, status: 'coming_soon', desc: 'Precision floor & wall tile fitting, marble polishing.' },
    { name: 'Flooring Specialist', category: 'mistri', icon: Building2, status: 'coming_soon', desc: 'Concrete flooring, Kota stone & granite installation.' },

    // Skilled & Other — COMING SOON
    { name: 'Electrician', category: 'other', icon: Zap, status: 'coming_soon', desc: 'Wiring, DB box repairs, socket installation & appliance fixing.' },
    { name: 'Plumber', category: 'other', icon: Wrench, status: 'coming_soon', desc: 'Pipeline leaks, tap replacement, bath sanitary work.' },
    { name: 'Carpenter', category: 'other', icon: Axe, status: 'coming_soon', desc: 'Furniture repairs, door fitting, wood cabinetry.' },
    { name: 'Painter', category: 'other', icon: Paintbrush, status: 'coming_soon', desc: 'Wall painting, primer coats, waterproof texture painting.' },
    { name: 'Cleaning', category: 'other', icon: Sparkles, status: 'coming_soon', desc: 'Deep home cleaning & post-construction wash.' },
    { name: 'Gardener', category: 'other', icon: Sprout, status: 'coming_soon', desc: 'Lawn trimming, soil preparation & garden maintenance.' },
    { name: 'Welder', category: 'other', icon: Flame, status: 'coming_soon', desc: 'Iron gate fabrication, window grill welding & repairs.' },
    { name: 'AC Technician', category: 'other', icon: Wind, status: 'coming_soon', desc: 'AC installation, gas refilling & jet service.' }
  ];

  const filteredServices = services.filter(s => {
    const matchesCategory = activeTab === 'all' || s.category === activeTab;
    const matchesSearch = s.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
                          s.desc.toLowerCase().includes(searchQuery.toLowerCase());
    return matchesCategory && matchesSearch;
  });

  const openWhatsAppDirect = (serviceName = '') => {
    const msg = buildWhatsAppMessage(serviceName);
    const cleanPhone = PHONE_NUMBER.replace(/\D/g, '');
    window.open(`https://wa.me/${cleanPhone}?text=${msg}`, '_blank', 'noopener,noreferrer');
  };

  const handleBookService = (service) => {
    setSelectedService(service);
    setIsModalOpen(true);
  };

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8 space-y-8">
      {/* Breadcrumb */}
      <div className="flex items-center gap-2 text-sm text-slate-500">
        <Link to="/" className="hover:text-[#155EEF] flex items-center gap-1">
          <ChevronLeft className="w-4 h-4" /> Home
        </Link>
        <span>/</span>
        <span className="font-bold text-slate-900">Services Catalog</span>
      </div>

      {/* Header */}
      <div className="flex flex-col md:flex-row md:items-center justify-between gap-4 pb-4 border-b border-slate-200">
        <div>
          <h1 className="text-3xl font-black text-[#101828]">
            KaamWale Services Directory
          </h1>
          <p className="text-sm text-slate-500 mt-1">
            <strong>Labour Categories</strong> available for instant booking. Skilled trades coming soon in {selectedCity}!
          </p>
        </div>

        {/* Search Bar */}
        <div className="relative max-w-xs w-full">
          <Search className="w-4 h-4 text-slate-400 absolute left-3.5 top-3.5" />
          <input
            type="text"
            placeholder="Search service..."
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            className="w-full pl-10 pr-4 py-2.5 rounded-xl border border-slate-200 bg-white text-sm focus:ring-2 focus:ring-[#155EEF] outline-none"
          />
        </div>
      </div>

      {/* Category Tabs */}
      <div className="flex items-center gap-2 overflow-x-auto pb-2 scrollbar-none">
        <button
          onClick={() => setActiveTab('all')}
          className={`px-4 py-2 rounded-xl text-sm font-bold transition-all whitespace-nowrap ${
            activeTab === 'all'
              ? 'bg-[#101828] text-white shadow-md'
              : 'bg-white text-slate-600 border border-slate-200 hover:bg-slate-50'
          }`}
        >
          All Services ({services.length})
        </button>

        <button
          onClick={() => setActiveTab('majdoor')}
          className={`px-4 py-2 rounded-xl text-sm font-bold transition-all whitespace-nowrap flex items-center gap-2 ${
            activeTab === 'majdoor'
              ? 'bg-[#155EEF] text-white shadow-md'
              : 'bg-white text-slate-600 border border-slate-200 hover:bg-slate-50'
          }`}
        >
          <HardHat className="w-4 h-4 text-amber-300" />
          👷 Labour (Active Now)
        </button>

        <button
          onClick={() => setActiveTab('mistri')}
          className={`px-4 py-2 rounded-xl text-sm font-bold transition-all whitespace-nowrap flex items-center gap-2 ${
            activeTab === 'mistri'
              ? 'bg-[#155EEF] text-white shadow-md'
              : 'bg-white text-slate-600 border border-slate-200 hover:bg-slate-50'
          }`}
        >
          <Building2 className="w-4 h-4" />
          🧱 Mistri (Coming Soon)
        </button>

        <button
          onClick={() => setActiveTab('other')}
          className={`px-4 py-2 rounded-xl text-sm font-bold transition-all whitespace-nowrap ${
            activeTab === 'other'
              ? 'bg-[#155EEF] text-white shadow-md'
              : 'bg-white text-slate-600 border border-slate-200 hover:bg-slate-50'
          }`}
        >
          🛠️ Other Trades (Coming Soon)
        </button>
      </div>

      {/* Service Cards Grid */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
        {filteredServices.map((service) => {
          const IconComp = service.icon;
          const isActive = service.status === 'active';

          return (
            <div
              key={service.name}
              className={`bg-white p-6 rounded-2xl border transition-all flex flex-col justify-between relative overflow-hidden ${
                isActive
                  ? 'border-slate-200 hover:border-[#155EEF] shadow-sm hover:shadow-xl'
                  : 'border-slate-200 opacity-80 bg-slate-50/50'
              }`}
            >
              <div>
                {service.image ? (
                  <div className="relative mb-4 overflow-hidden rounded-xl h-36 bg-slate-100 border border-slate-200 shadow-inner">
                    <img 
                      src={service.image} 
                      alt={service.name} 
                      className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-300"
                    />
                    <div className="absolute inset-0 bg-gradient-to-t from-slate-900/60 via-transparent to-transparent"></div>
                    <div className="absolute top-2 left-2 w-8 h-8 rounded-lg bg-white/90 backdrop-blur-md text-amber-600 border border-white/40 flex items-center justify-center shadow-md">
                      <IconComp className="w-4 h-4" />
                    </div>
                    {isActive ? (
                      <span className="absolute top-2 right-2 text-[10px] uppercase font-black px-2.5 py-1 rounded-md bg-emerald-600 text-white shadow-md border border-white/20 flex items-center gap-1">
                        <span className="w-1.5 h-1.5 rounded-full bg-white animate-pulse"></span> Active Now
                      </span>
                    ) : (
                      <span className="absolute top-2 right-2 text-[10px] uppercase font-black px-2.5 py-1 rounded-md bg-amber-500 text-white shadow-md border border-white/20 flex items-center gap-1">
                        <Clock className="w-3 h-3 text-white" /> Coming Soon
                      </span>
                    )}
                  </div>
                ) : (
                  <div className="flex items-center justify-between mb-4">
                    <div className={`w-12 h-12 rounded-xl flex items-center justify-center font-bold ${
                      isActive ? 'bg-amber-50 text-amber-700 border border-amber-200' : 'bg-slate-100 text-slate-400'
                    }`}>
                      <IconComp className="w-6 h-6" />
                    </div>
                    {isActive ? (
                      <span className="text-[10px] uppercase font-black px-2.5 py-1 rounded bg-emerald-50 text-emerald-700 border border-emerald-200 flex items-center gap-1">
                        <span className="w-1.5 h-1.5 rounded-full bg-emerald-500"></span> Active Now
                      </span>
                    ) : (
                      <span className="text-[10px] uppercase font-black px-2.5 py-1 rounded bg-amber-50 text-amber-700 border border-amber-200 flex items-center gap-1">
                        <Clock className="w-3 h-3 text-amber-500" /> Coming Soon
                      </span>
                    )}
                  </div>
                )}

                <h3 className="text-lg font-bold text-slate-900">
                  {service.name}
                </h3>
                <p className="text-xs text-slate-500 mt-2 leading-relaxed">
                  {service.desc}
                </p>
              </div>

              <div className="mt-6 pt-4 border-t border-slate-100">
                {isActive ? (
                  <div className="space-y-2">
                    <div className="flex items-center justify-between text-xs mb-1">
                      <span className="text-slate-400 font-medium">{service.name.includes('Loading') ? 'Per Bag Rate' : 'Daily Wage'}</span>
                      <span className="font-extrabold text-slate-900">₹{service.rate}{service.name.includes('Loading') ? '/bag' : '/worker'}</span>
                    </div>
                    <div className="grid grid-cols-2 gap-2">
                      <button
                        onClick={() => openWhatsAppDirect(service.name)}
                        className="py-2 bg-[#25D366] text-white rounded-xl text-xs font-bold flex items-center justify-center gap-1 shadow-sm"
                      >
                        <MessageCircle className="w-3.5 h-3.5 fill-current" />
                        WhatsApp
                      </button>
                      <button
                        onClick={() => handleBookService(service)}
                        className="py-2 bg-[#155EEF] text-white rounded-xl text-xs font-bold flex items-center justify-center gap-1 shadow-sm"
                      >
                        Book Now
                      </button>
                    </div>
                  </div>
                ) : (
                  <div className="flex items-center justify-between text-xs text-slate-400">
                    <span>Launching soon in {selectedCity}</span>
                    <span className="text-amber-600 font-bold bg-amber-50 px-2 py-1 rounded">Coming Soon</span>
                  </div>
                )}
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

      <TatkalBookingModal
        isOpen={isTatkalModalOpen}
        onClose={() => setIsTatkalModalOpen(false)}
        initialService={selectedService}
      />
    </div>
  );
};
