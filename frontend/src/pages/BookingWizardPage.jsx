import React, { useState, useEffect } from 'react';
import { useNavigate, useSearchParams, Link } from 'react-router-dom';
import { useAuth } from '../context/AuthContext';
import { useCity } from '../context/CityContext';
import API from '../services/api';
import {
  HardHat,
  Users,
  Calendar,
  Clock,
  MapPin,
  FileText,
  User,
  CheckCircle2,
  ChevronLeft,
  ChevronRight,
  Upload,
  ShieldCheck,
  Building2,
  Sparkles,
  Info,
  Loader2,
  Zap,
  Package,
  AlertCircle
} from 'lucide-react';

export const BookingWizardPage = () => {
  const navigate = useNavigate();
  const [searchParams] = useSearchParams();
  const { user } = useAuth();
  const { selectedCity } = useCity();

  // Helper date generators
  const getTodayStr = () => {
    const d = new Date();
    return d.toISOString().split('T')[0];
  };

  const getTomorrowStr = () => {
    const d = new Date();
    d.setDate(d.getDate() + 1);
    return d.toISOString().split('T')[0];
  };

  const initialService = searchParams.get('service') || 'Construction Labour';

  const [currentStep, setCurrentStep] = useState(1);
  const [loading, setLoading] = useState(false);
  const [errorMsg, setErrorMsg] = useState('');

  // Form State
  const [formData, setFormData] = useState({
    bookingType: 'NORMAL', // 'NORMAL' | 'TATKAL'
    serviceName: initialService,
    serviceRate: 4, // for Loading/Unloading base rate ₹4/bag
    carryingDistance: '20m', // '20m' | '40m' | '60m'
    rateType: 'Standard',
    numberOfBags: 50,
    workerCount: 5,
    date: getTomorrowStr(),
    duration: '1 Day',
    startTime: '09:00 AM',
    endTime: '06:00 PM',
    city: selectedCity || 'Bulandshahr',
    area: 'Yamunapuram',
    address: 'Plot No 42, Near Water Tank, Yamunapuram',
    description: 'Need construction labourers for site work, concrete mixing, and material handling.',
    requirements: 'Workers should bring safety shoes if available.',
    customerName: user ? user.name : 'Yatendra Kumar',
    customerPhone: user ? user.phone : '9876543210',
    customerEmail: user ? user.email : 'customer@labourchowk.com',
    photoPreview: null
  });

  useEffect(() => {
    if (user) {
      setFormData(prev => ({
        ...prev,
        customerName: user.name || prev.customerName,
        customerPhone: user.phone || prev.customerPhone,
        customerEmail: user.email || prev.customerEmail
      }));
    }
  }, [user]);

  // Adjust date when bookingType changes
  const handleBookingTypeChange = (type) => {
    if (type === 'TATKAL') {
      const now = new Date();
      now.setHours(now.getHours() + 6);
      const hrs = now.getHours();
      const ampm = hrs >= 12 ? 'PM' : 'AM';
      const formattedHrs = String(hrs % 12 || 12).padStart(2, '0');

      setFormData(prev => ({
        ...prev,
        bookingType: 'TATKAL',
        date: getTodayStr(),
        startTime: `${formattedHrs}:00 ${ampm}`
      }));
    } else {
      setFormData(prev => ({
        ...prev,
        bookingType: 'NORMAL',
        date: getTomorrowStr(),
        startTime: '09:00 AM'
      }));
    }
    setErrorMsg('');
  };

  const handleWorkerCountChange = (delta) => {
    setFormData(prev => ({
      ...prev,
      workerCount: Math.max(1, Math.min(50, prev.workerCount + delta))
    }));
  };

  const handlePhotoUpload = (e) => {
    const file = e.target.files[0];
    if (file) {
      const reader = new FileReader();
      reader.onloadend = () => {
        setFormData(prev => ({ ...prev, photoPreview: reader.result }));
      };
      reader.readAsDataURL(file);
    }
  };

  const useCurrentLocation = () => {
    if (navigator.geolocation) {
      navigator.geolocation.getCurrentPosition(
        (position) => {
          setFormData(prev => ({
            ...prev,
            address: `GPS Location (${position.coords.latitude.toFixed(4)}, ${position.coords.longitude.toFixed(4)}), ${formData.city}`
          }));
        },
        () => {
          setFormData(prev => ({
            ...prev,
            address: `Near City Center, ${formData.city}`
          }));
        }
      );
    }
  };

  // Cost calculation
  const isLoadingUnloading = formData.serviceName.toLowerCase().includes('loading');
  const numDays = parseInt(formData.duration) || 1;
  const getCategoryRate = (name) => {
    if (name.includes('Mistri') || name.includes('Plaster') || name.includes('Brick')) return 950;
    return 700; // All standard daily wage labour rates = ₹700
  };

  const hourlyRates = {
    1: 300,
    2: 400,
    3: 500,
    6: 600
  };

  const isHourly = formData.serviceName.toLowerCase().includes('hourly');
  const baseRate = formData.bookingType === 'TATKAL' ? 700 : getCategoryRate(formData.serviceName);
  const baseBagRate = 4;
  const effectiveRate = baseBagRate + distanceExtra;
  
  let labourAmount = 0;
  if (isLoadingUnloading) {
    labourAmount = effectiveRate * Math.max(1, parseInt(formData.numberOfBags) || 1);
  } else if (isHourly) {
    const rate = hourlyRates[parseInt(formData.duration)] || 400;
    labourAmount = rate * formData.workerCount;
  } else {
    labourAmount = formData.workerCount * numDays * baseRate;
  }

  const transportationCharge = 50; // Mandatory ₹50 transportation charge
  const tatkalCharge = formData.bookingType === 'TATKAL' ? 150 : 0;
  const totalAmount = labourAmount + transportationCharge + tatkalCharge;

  // Step Validation
  const validateCurrentStep = () => {
    setErrorMsg('');

    if (currentStep === 2) {
      const todayStr = getTodayStr();
      const tomorrowStr = getTomorrowStr();

      if (formData.bookingType === 'NORMAL') {
        if (formData.date <= todayStr) {
          setErrorMsg('Same-day booking is not available. Please select tomorrow or a later date.');
          return false;
        }
      } else if (formData.bookingType === 'TATKAL') {
        if (formData.date !== todayStr) {
          setErrorMsg("Tatkal booking is available only for today's booking.");
          return false;
        }
      }

      if (isLoadingUnloading) {
        if (![4, 6, 8].includes(formData.serviceRate)) {
          setErrorMsg('Please select a valid rate: ₹4, ₹6, or ₹8.');
          return false;
        }
      }
    }

    // Tatkal urgent booking is automatically dispatched (+6 hour dispatch window)

    return true;
  };

  const handleNextStep = () => {
    if (validateCurrentStep()) {
      setCurrentStep(prev => prev + 1);
    }
  };

  const handleSubmitBooking = async () => {
    if (!validateCurrentStep()) return;

    setLoading(true);
    setErrorMsg('');

    const payload = {
      ...formData,
      serviceType: isLoadingUnloading ? 'loading_unloading' : 'daily',
      labourAmount,
      transportationCharge,
      tatkalCharge,
      totalAmount,
      estimatedCost: totalAmount,
      estimatedTotal: totalAmount
    };

    try {
      const res = await API.post('/bookings', payload);
      const bookingData = res.data;
      navigate(`/booking-success/${bookingData.id || bookingData.bookingId}`);
    } catch (err) {
      if (err.response && err.response.data && err.response.data.message) {
        setErrorMsg(err.response.data.message);
      } else {
        const bookingId = `LCB-10245`;
        navigate(`/booking-success/${bookingId}`, { state: { booking: { ...payload, bookingId } } });
      }
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="max-w-4xl mx-auto px-4 sm:px-6 py-8 space-y-8">

      {/* Header */}
      <div className="flex items-center justify-between">
        <Link to="/" className="inline-flex items-center gap-1 text-sm font-semibold text-slate-600 hover:text-[#155EEF]">
          <ChevronLeft className="w-4 h-4" /> Back to Home
        </Link>

        <div className="flex items-center gap-2 text-xs font-bold text-emerald-700 bg-emerald-50 border border-emerald-200 px-3 py-1 rounded-full">
          <ShieldCheck className="w-4 h-4 text-emerald-600" />
          <span>Internal Labour Matching • Customer Privacy Assured</span>
        </div>
      </div>

      <div className="text-center space-y-2">
        <h1 className="text-2xl sm:text-3xl font-extrabold text-[#101828]">
          Book Labour Service
        </h1>
        <p className="text-sm text-slate-500">
          Complete your requirements in a few simple steps. LabourChowk arranges suitable workers.
        </p>
      </div>

      {/* Step Stepper Header */}
      <div className="bg-white p-4 rounded-2xl border border-slate-200 shadow-sm overflow-x-auto">
        <div className="flex items-center justify-between min-w-[500px]">
          {[
            { num: 1, label: 'Service' },
            { num: 2, label: 'Labour' },
            { num: 3, label: 'Location' },
            { num: 4, label: 'Details' },
            { num: 5, label: 'Summary' }
          ].map((step, idx) => (
            <React.Fragment key={step.num}>
              <div
                onClick={() => step.num < currentStep && setCurrentStep(step.num)}
                className={`flex items-center gap-2 cursor-pointer ${
                  currentStep === step.num
                    ? 'text-[#155EEF] font-bold'
                    : currentStep > step.num
                    ? 'text-emerald-600 font-bold'
                    : 'text-slate-400 font-medium'
                }`}
              >
                <div
                  className={`w-8 h-8 rounded-full flex items-center justify-center text-xs font-extrabold ${
                    currentStep === step.num
                      ? 'bg-[#155EEF] text-white shadow-md'
                      : currentStep > step.num
                      ? 'bg-emerald-500 text-white'
                      : 'bg-slate-100 text-slate-500'
                  }`}
                >
                  {currentStep > step.num ? <CheckCircle2 className="w-4 h-4" /> : step.num}
                </div>
                <span className="text-xs whitespace-nowrap">{step.label}</span>
              </div>
              {idx < 4 && (
                <div
                  className={`h-0.5 flex-1 mx-2 ${
                    currentStep > step.num ? 'bg-emerald-500' : 'bg-slate-200'
                  }`}
                />
              )}
            </React.Fragment>
          ))}
        </div>
      </div>

      {/* Error Banner */}
      {errorMsg && (
        <div className="bg-rose-50 border border-rose-200 p-4 rounded-2xl flex items-center gap-3 text-sm text-rose-700 font-bold animate-fadeIn">
          <AlertCircle className="w-5 h-5 text-rose-600 shrink-0" />
          <span>{errorMsg}</span>
        </div>
      )}

      {/* STEP CONTENT CONTAINER */}
      <div className="bg-white rounded-3xl border border-slate-200 shadow-lg p-6 sm:p-10 space-y-6">

        {/* STEP 1: SELECT SERVICE */}
        {currentStep === 1 && (
          <div className="space-y-6 animate-fadeIn">
            <div className="border-b border-slate-100 pb-4">
              <h2 className="text-xl font-bold text-slate-900 flex items-center gap-2">
                <HardHat className="w-5 h-5 text-[#155EEF]" />
                Step 1 — Select Service
              </h2>
              <p className="text-xs text-slate-500 mt-1">Choose what work you need labour for</p>
            </div>

            <div>
              <label className="block text-xs font-bold text-slate-700 uppercase tracking-wider mb-2">
                Service Type
              </label>
              <select
                value={formData.serviceName}
                onChange={(e) => setFormData({ ...formData, serviceName: e.target.value })}
                className="w-full p-4 rounded-xl border border-slate-300 bg-slate-50 font-bold text-slate-900 text-base focus:ring-2 focus:ring-[#155EEF] outline-none"
              >
                <optgroup label="👷 Majdoor (Daily Labour)">
                  <option value="Construction Labour">Construction Labour</option>
                  <option value="General Labour">General Labour</option>
                  <option value="Loading / Unloading">Loading / Unloading</option>
                  <option value="House Shifting">House Shifting Labour</option>
                  <option value="Farm Labour">Farm / Agriculture Labour</option>
                  <option value="Digging / Excavation">Digging / Excavation</option>
                  <option value="Road Work">Road Work Labour</option>
                  <option value="Warehouse Labour">Warehouse Labour</option>
                  <option value="Factory Labour">Factory Labour</option>
                  <option value="Event / Tent Labour">Event / Tent Labour</option>
                  <option value="Demolition Labour">Demolition Labour</option>
                  <option value="General Helper">General Helper</option>
                </optgroup>
                <optgroup label="🧱 Mistri (Masons)">
                  <option value="Raj Mistri">Raj Mistri (Mason)</option>
                  <option value="Brick Work">Brick Work Specialist</option>
                  <option value="Plaster Work">Plaster Work</option>
                  <option value="Tile Mistri">Tile Mistri</option>
                  <option value="Flooring">Flooring Specialist</option>
                </optgroup>
                <optgroup label="🛠️ Other Services">
                  <option value="Electrician">Electrician</option>
                  <option value="Plumber">Plumber</option>
                  <option value="Carpenter">Carpenter</option>
                  <option value="Painter">Painter</option>
                  <option value="Cleaning">Cleaning Helper</option>
                  <option value="Gardener">Gardener</option>
                  <option value="Welder">Welder</option>
                </optgroup>
              </select>
            </div>

            <div className="p-4 bg-blue-50 border border-blue-200 rounded-2xl flex items-start gap-3">
              <Sparkles className="w-5 h-5 text-[#155EEF] shrink-0 mt-0.5" />
              <div className="text-xs text-blue-900">
                <strong className="font-bold">Standard Shift:</strong> Verified labourers arrive at site on the requested date and shift hours.
              </div>
            </div>
          </div>
        )}

        {/* STEP 2: LABOUR REQUIREMENT & BOOKING TYPE */}
        {currentStep === 2 && (
          <div className="space-y-6 animate-fadeIn">
            <div className="border-b border-slate-100 pb-4">
              <h2 className="text-xl font-bold text-slate-900 flex items-center gap-2">
                <Users className="w-5 h-5 text-[#155EEF]" />
                Step 2 — Booking Option & Labour Requirement
              </h2>
              <p className="text-xs text-slate-500 mt-1">Select booking type, count, date, and duration</p>
            </div>

            {/* BOOKING TYPE OPTION CARDS */}
            <div>
              <label className="block text-xs font-bold text-slate-700 uppercase tracking-wider mb-2">
                Select Booking Type
              </label>
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <div
                  onClick={() => handleBookingTypeChange('NORMAL')}
                  className={`p-5 rounded-2xl border-2 cursor-pointer transition-all ${
                    formData.bookingType === 'NORMAL'
                      ? 'bg-blue-50/80 border-[#155EEF] shadow-md ring-2 ring-blue-400/20'
                      : 'bg-slate-50 border-slate-200 hover:border-slate-300'
                  }`}
                >
                  <div className="flex items-center justify-between">
                    <span className="font-extrabold text-base text-[#101828] flex items-center gap-2">
                      <Calendar className="w-5 h-5 text-[#155EEF]" /> 📅 Normal Booking
                    </span>
                    <span className="text-xs font-bold text-emerald-700 bg-emerald-100 px-2.5 py-0.5 rounded-full">
                      Standard
                    </span>
                  </div>
                  <p className="text-xs text-slate-600 mt-2 font-medium">
                    Book for <strong>tomorrow or later</strong>. Same-day booking is not available.
                  </p>
                  <div className="mt-3 text-xs font-bold text-blue-700 flex items-center gap-1">
                    <span>• ₹50 transportation charge included</span>
                  </div>
                </div>

                <div
                  onClick={() => handleBookingTypeChange('TATKAL')}
                  className={`p-5 rounded-2xl border-2 cursor-pointer transition-all ${
                    formData.bookingType === 'TATKAL'
                      ? 'bg-amber-50/80 border-amber-500 shadow-md ring-2 ring-amber-400/30'
                      : 'bg-slate-50 border-slate-200 hover:border-slate-300'
                  }`}
                >
                  <div className="flex items-center justify-between">
                    <span className="font-extrabold text-base text-amber-950 flex items-center gap-2">
                      <Zap className="w-5 h-5 text-amber-500 fill-current" /> ⚡ Tatkal Booking
                    </span>
                    <span className="text-xs font-bold text-amber-900 bg-amber-200 px-2.5 py-0.5 rounded-full">
                      +₹150 Tatkal Fee
                    </span>
                  </div>
                  <p className="text-xs text-slate-600 mt-2 font-medium">
                    Need labour urgently? Book for <strong>today</strong> — <strong>labour will be provided after the 6 hours of booking</strong>.
                  </p>
                  <div className="mt-3 text-xs font-bold text-amber-800 flex items-center gap-1">
                    <span>• ₹50 transportation + ₹150 Tatkal charge</span>
                  </div>
                </div>
              </div>

              {formData.bookingType === 'TATKAL' && (
                <div className="mt-3 p-3.5 bg-amber-50 border border-amber-200 rounded-2xl text-xs text-amber-900 flex items-start gap-2 animate-fadeIn font-medium">
                  <Zap className="w-4 h-4 text-amber-600 shrink-0 mt-0.5" />
                  <div>
                    <strong>⚡ तत्काल बुकिंग डिलीवरी:</strong> बुकिंग के <strong>6 घंटे बाद</strong> सत्यापित मजदूर आपकी साइट पर उपलब्ध होंगे। (labour will be provided after the 6 hours of booking).
                  </div>
                </div>
              )}
            </div>

            {/* LOADING / UNLOADING RATE & CARRYING DISTANCE SELECTOR */}
            {isLoadingUnloading && (
              <div className="bg-amber-50 border border-amber-200 p-5 rounded-2xl space-y-4">
                <div>
                  <h4 className="text-xs font-extrabold text-amber-900 uppercase tracking-wider">
                    Loading / Unloading Rate & Carrying Distance
                  </h4>
                  <p className="text-xs text-amber-800 font-bold mt-0.5">
                    Effective Rate: <span className="text-base text-amber-950 font-black">₹{effectiveRate}</span> per bag (Base: ₹4 + Distance: ₹{distanceExtra})
                  </p>
                </div>


                {/* Carrying Distance Selector (20m, 40m, 60m) */}
                <div>
                  <label className="block text-xs font-bold text-amber-900 uppercase tracking-wider mb-1.5">
                    Select Carrying Distance (दूरी का चयन करें):
                  </label>
                  <div className="grid grid-cols-3 gap-3">
                    {[
                      { dist: '20m', text: '20m (Standard)', extra: '+₹0/bag' },
                      { dist: '40m', text: '40m (Medium)', extra: '+₹2/bag' },
                      { dist: '60m', text: '60m (Long)', extra: '+₹4/bag' }
                    ].map(opt => (
                      <button
                        key={opt.dist}
                        type="button"
                        onClick={() => setFormData({ ...formData, carryingDistance: opt.dist })}
                        className={`p-3 rounded-xl border text-center transition-all ${
                          formData.carryingDistance === opt.dist
                            ? 'bg-amber-600 text-white border-amber-700 font-extrabold shadow-md ring-2 ring-amber-300'
                            : 'bg-white text-slate-700 border-amber-200 hover:bg-amber-100'
                        }`}
                      >
                        <div className="text-sm font-black">{opt.dist}</div>
                        <div className="text-[10px] opacity-90">{opt.extra}</div>
                      </button>
                    ))}
                  </div>
                </div>

                <div>
                  <label className="block text-xs font-bold text-amber-900 uppercase tracking-wider mb-1">
                    Number of Bags:
                  </label>
                  <input
                    type="number"
                    min="1"
                    value={formData.numberOfBags}
                    onChange={(e) => setFormData({ ...formData, numberOfBags: e.target.value })}
                    className="w-full p-3 rounded-xl border border-amber-300 bg-white font-bold text-slate-900 text-sm outline-none"
                  />
                </div>

                <div className="p-3 bg-white rounded-xl border border-amber-200 text-xs font-bold text-amber-950 flex justify-between">
                  <span>Labour Calculation:</span>
                  <span>{formData.numberOfBags} bags × ₹{effectiveRate} (₹{formData.serviceRate} + ₹{distanceExtra}) = ₹{labourAmount}</span>
                </div>
              </div>
            )}

            {/* Counter */}
            {!isLoadingUnloading && (
              <div className="bg-slate-50 p-6 rounded-2xl border border-slate-200 space-y-3">
                <label className="block text-xs font-bold text-slate-700 uppercase tracking-wider text-center">
                  Number of Workers Required
                </label>
                <div className="flex items-center justify-center gap-6">
                  <button
                    type="button"
                    onClick={() => handleWorkerCountChange(-1)}
                    className="w-12 h-12 rounded-2xl bg-white border border-slate-300 text-slate-800 font-extrabold text-2xl shadow-sm hover:bg-slate-100 active:scale-95 transition-all"
                  >
                    -
                  </button>
                  <span className="text-4xl font-extrabold text-[#101828] w-16 text-center">
                    {formData.workerCount}
                  </span>
                  <button
                    type="button"
                    onClick={() => handleWorkerCountChange(1)}
                    className="w-12 h-12 rounded-2xl bg-[#155EEF] text-white font-extrabold text-2xl shadow-md hover:bg-[#124EC4] active:scale-95 transition-all"
                  >
                    +
                  </button>
                </div>
                <p className="text-center text-xs text-slate-500 font-medium">
                  Workers: {formData.workerCount} Labourer(s)
                </p>
              </div>
            )}

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              {/* Date */}
              <div>
                <label className="block text-xs font-bold text-slate-700 uppercase tracking-wider mb-2">
                  Work Date {formData.bookingType === 'NORMAL' ? '(Tomorrow or later)' : '(Today only)'}
                </label>
                <input
                  type="date"
                  min={formData.bookingType === 'NORMAL' ? getTomorrowStr() : getTodayStr()}
                  max={formData.bookingType === 'TATKAL' ? getTodayStr() : undefined}
                  value={formData.date}
                  onChange={(e) => setFormData({ ...formData, date: e.target.value })}
                  className="w-full p-3.5 rounded-xl border border-slate-300 bg-slate-50 font-bold text-slate-900 text-sm focus:ring-2 focus:ring-[#155EEF] outline-none"
                />
                <p className="text-[11px] text-slate-500 mt-1">
                  {formData.bookingType === 'NORMAL' ? 'Normal booking is available from tomorrow.' : "Tatkal booking is available only for today's booking."}
                </p>
              </div>

              {/* Duration */}
              <div>
                <label className="block text-xs font-bold text-slate-700 uppercase tracking-wider mb-2">
                  Duration
                </label>
                <select
                  value={formData.duration}
                  onChange={(e) => setFormData({ ...formData, duration: e.target.value })}
                  className="w-full p-3.5 rounded-xl border border-slate-300 bg-slate-50 font-bold text-slate-900 text-sm focus:ring-2 focus:ring-[#155EEF] outline-none"
                >
                  <option value="1 Day">1 Day</option>
                  <option value="2 Days">2 Days</option>
                  <option value="3 Days">3 Days</option>
                  <option value="5 Days">5 Days</option>
                  <option value="7 Days (1 Week)">7 Days (1 Week)</option>
                  <option value="15 Days">15 Days</option>
                  <option value="1 Month">1 Month</option>
                </select>
              </div>
            </div>
          </div>
        )}

        {/* STEP 3: LOCATION */}
        {currentStep === 3 && (
          <div className="space-y-6 animate-fadeIn">
            <div className="border-b border-slate-100 pb-4 flex items-center justify-between">
              <div>
                <h2 className="text-xl font-bold text-slate-900 flex items-center gap-2">
                  <MapPin className="w-5 h-5 text-[#155EEF]" />
                  Step 4 — Location
                </h2>
                <p className="text-xs text-slate-500 mt-1">Provide work site location</p>
              </div>
              <button
                type="button"
                onClick={useCurrentLocation}
                className="text-xs font-bold text-[#155EEF] bg-blue-50 border border-blue-200 px-3 py-1.5 rounded-xl hover:bg-blue-100 transition-colors"
              >
                Use Current Location
              </button>
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              <div>
                <label className="block text-xs font-bold text-slate-700 uppercase tracking-wider mb-2">
                  City
                </label>
                <input
                  type="text"
                  readOnly
                  value={formData.city}
                  className="w-full p-3.5 rounded-xl border border-slate-200 bg-slate-100 font-bold text-slate-800 text-sm"
                />
              </div>

              <div>
                <label className="block text-xs font-bold text-slate-700 uppercase tracking-wider mb-2">
                  Area / Sector
                </label>
                <input
                  type="text"
                  value={formData.area}
                  onChange={(e) => setFormData({ ...formData, area: e.target.value })}
                  placeholder="e.g. Yamunapuram, Civil Lines"
                  className="w-full p-3.5 rounded-xl border border-slate-300 bg-slate-50 font-bold text-slate-900 text-sm focus:ring-2 focus:ring-[#155EEF] outline-none"
                />
              </div>
            </div>

            <div>
              <label className="block text-xs font-bold text-slate-700 uppercase tracking-wider mb-2">
                Full Address
              </label>
              <textarea
                rows={3}
                value={formData.address}
                onChange={(e) => setFormData({ ...formData, address: e.target.value })}
                placeholder="Plot/House No, Street, Landmark..."
                className="w-full p-3.5 rounded-xl border border-slate-300 bg-slate-50 font-medium text-slate-900 text-sm focus:ring-2 focus:ring-[#155EEF] outline-none"
              />
            </div>
          </div>
        )}

        {/* STEP 4: WORK DETAILS */}
        {currentStep === 4 && (
          <div className="space-y-6 animate-fadeIn">
            <div className="border-b border-slate-100 pb-4">
              <h2 className="text-xl font-bold text-slate-900 flex items-center gap-2">
                <FileText className="w-5 h-5 text-[#155EEF]" />
                Step 5 — Work Details
              </h2>
              <p className="text-xs text-slate-500 mt-1">Describe work and add instructions</p>
            </div>

            <div>
              <label className="block text-xs font-bold text-slate-700 uppercase tracking-wider mb-2">
                Describe your work
              </label>
              <textarea
                rows={3}
                value={formData.description}
                onChange={(e) => setFormData({ ...formData, description: e.target.value })}
                placeholder="Describe what tasks the workers need to perform..."
                className="w-full p-3.5 rounded-xl border border-slate-300 bg-slate-50 font-medium text-slate-900 text-sm focus:ring-2 focus:ring-[#155EEF] outline-none"
              />
            </div>

            <div>
              <label className="block text-xs font-bold text-slate-700 uppercase tracking-wider mb-2">
                Additional requirements (Optional)
              </label>
              <input
                type="text"
                value={formData.requirements}
                onChange={(e) => setFormData({ ...formData, requirements: e.target.value })}
                placeholder="e.g. Safety boots, helmet, specific tools needed..."
                className="w-full p-3.5 rounded-xl border border-slate-300 bg-slate-50 font-medium text-slate-900 text-sm focus:ring-2 focus:ring-[#155EEF] outline-none"
              />
            </div>

            {/* Photo Upload */}
            <div>
              <label className="block text-xs font-bold text-slate-700 uppercase tracking-wider mb-2">
                Upload Work Site Photo (Optional)
              </label>
              <div className="border-2 border-dashed border-slate-300 rounded-2xl p-4 text-center bg-slate-50 hover:bg-slate-100 transition-colors cursor-pointer relative">
                <input
                  type="file"
                  accept="image/*"
                  onChange={handlePhotoUpload}
                  className="absolute inset-0 opacity-0 cursor-pointer"
                />
                {formData.photoPreview ? (
                  <div className="flex flex-col items-center gap-2">
                    <img src={formData.photoPreview} alt="Work site preview" className="h-24 rounded-lg object-cover" />
                    <span className="text-xs font-bold text-emerald-600">Photo attached ✅</span>
                  </div>
                ) : (
                  <div className="flex flex-col items-center gap-1 text-slate-500">
                    <Upload className="w-6 h-6 text-[#155EEF]" />
                    <span className="text-xs font-bold text-slate-700">Click to upload photo</span>
                    <span className="text-[10px] text-slate-400">JPG, PNG up to 5MB</span>
                  </div>
                )}
              </div>
            </div>
          </div>
        )}

        {/* STEP 5: CUSTOMER DETAILS & SUMMARY */}
        {currentStep === 5 && (
          <div className="space-y-6 animate-fadeIn">
            <div className="border-b border-slate-100 pb-4">
              <h2 className="text-xl font-bold text-slate-900 flex items-center gap-2">
                <User className="w-5 h-5 text-[#155EEF]" />
                Step 6 — Customer Contact & Summary
              </h2>
              <p className="text-xs text-slate-500 mt-1">Review booking request details</p>
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
              <div>
                <label className="block text-xs font-bold text-slate-700 uppercase tracking-wider mb-1">
                  Full Name
                </label>
                <input
                  type="text"
                  value={formData.customerName}
                  onChange={(e) => setFormData({ ...formData, customerName: e.target.value })}
                  className="w-full p-3 rounded-xl border border-slate-300 bg-slate-50 font-bold text-slate-900 text-sm"
                />
              </div>

              <div>
                <label className="block text-xs font-bold text-slate-700 uppercase tracking-wider mb-1">
                  Mobile Number
                </label>
                <input
                  type="text"
                  value={formData.customerPhone}
                  onChange={(e) => setFormData({ ...formData, customerPhone: e.target.value })}
                  className="w-full p-3 rounded-xl border border-slate-300 bg-slate-50 font-bold text-slate-900 text-sm"
                />
              </div>

              <div>
                <label className="block text-xs font-bold text-slate-700 uppercase tracking-wider mb-1">
                  Email
                </label>
                <input
                  type="email"
                  value={formData.customerEmail}
                  onChange={(e) => setFormData({ ...formData, customerEmail: e.target.value })}
                  className="w-full p-3 rounded-xl border border-slate-300 bg-slate-50 font-bold text-slate-900 text-sm"
                />
              </div>
            </div>

            {/* BOOKING SUMMARY BOX */}
            <div className="bg-slate-900 text-white p-6 rounded-2xl space-y-4 shadow-xl border border-slate-800">
              <div className="flex items-center justify-between border-b border-slate-800 pb-3">
                <h3 className="text-base font-bold text-amber-400">
                  📋 Booking Summary
                </h3>
                <span className={`text-xs font-extrabold px-3 py-1 rounded-full ${formData.bookingType === 'TATKAL' ? 'bg-amber-500 text-slate-950' : 'bg-blue-600 text-white'}`}>
                  {formData.bookingType === 'TATKAL' ? '⚡ Tatkal' : 'Normal'}
                </span>
              </div>

              <div className="grid grid-cols-2 sm:grid-cols-3 gap-4 text-xs">
                <div>
                  <span className="block text-slate-400">Booking Type</span>
                  <strong className="text-white text-sm">{formData.bookingType}</strong>
                </div>

                <div>
                  <span className="block text-slate-400">Service</span>
                  <strong className="text-white text-sm">{formData.serviceName}</strong>
                </div>

                <div>
                  <span className="block text-slate-400">Workers</span>
                  <strong className="text-white text-sm">{formData.workerCount} Labourers</strong>
                </div>

                {isLoadingUnloading && (
                  <div>
                    <span className="block text-amber-400">Carrying Distance</span>
                    <strong className="text-white text-sm">{formData.carryingDistance}</strong>
                  </div>
                )}

                <div>
                  <span className="block text-slate-400">Date</span>
                  <strong className="text-white text-sm">{formData.date}</strong>
                </div>



                <div>
                  <span className="block text-slate-400">Location</span>
                  <strong className="text-white text-sm">{formData.city} ({formData.area})</strong>
                </div>
              </div>

              {/* Pricing Breakdown Lines */}
              <div className="pt-4 border-t border-slate-800 space-y-2 text-xs">
                <div className="flex items-center justify-between">
                  <span className="text-slate-400">Labour Charges</span>
                  <span className="font-bold text-white">₹{labourAmount}</span>
                </div>

                <div className="flex items-center justify-between">
                  <span className="text-slate-400">Transportation</span>
                  <span className="font-bold text-emerald-400">₹{transportationCharge}</span>
                </div>

                {formData.bookingType === 'TATKAL' && (
                  <div className="flex items-center justify-between">
                    <span className="text-amber-400">Tatkal Charge</span>
                    <span className="font-bold text-amber-400">₹{tatkalCharge}</span>
                  </div>
                )}
              </div>

              <div className="pt-3 border-t border-slate-800 flex items-center justify-between">
                <div>
                  <span className="text-slate-400 text-xs block font-medium">Total Amount</span>
                  <span className="text-2xl font-extrabold text-amber-400">₹{totalAmount.toLocaleString('en-IN')}</span>
                </div>
                <span className="text-[11px] text-emerald-400 font-bold bg-emerald-950 px-3 py-1 rounded-full border border-emerald-800">
                  ₹50 transportation charge included
                </span>
              </div>
            </div>

            {/* Privacy Alert */}
            <div className="bg-amber-50 border border-amber-200 rounded-xl p-3.5 text-xs text-amber-900 flex items-center gap-2">
              <ShieldCheck className="w-4 h-4 text-amber-600 shrink-0" />
              <span>LabourChowk assigns verified workers internally. Worker contact info remains private.</span>
            </div>
          </div>
        )}

        {/* STEP CONTROLS (Next/Back/Submit) */}
        <div className="pt-6 border-t border-slate-100 flex items-center justify-between">
          {currentStep > 1 ? (
            <button
              type="button"
              onClick={() => setCurrentStep(currentStep - 1)}
              className="px-5 py-2.5 rounded-xl border border-slate-300 text-slate-700 font-bold text-sm hover:bg-slate-50 transition-colors"
            >
              Back
            </button>
          ) : <div />}

          {currentStep < 5 ? (
            <button
              type="button"
              onClick={handleNextStep}
              className="bg-[#155EEF] hover:bg-[#124EC4] text-white px-8 py-3 rounded-xl font-bold text-sm shadow-md flex items-center gap-2 transition-all"
            >
              <span>Continue</span>
              <ChevronRight className="w-4 h-4" />
            </button>
          ) : (
            <button
              type="button"
              disabled={loading}
              onClick={handleSubmitBooking}
              className="bg-emerald-600 hover:bg-emerald-700 text-white px-8 py-3.5 rounded-xl font-extrabold text-base shadow-lg shadow-emerald-600/30 flex items-center gap-2 transition-all transform hover:-translate-y-0.5 active:translate-y-0"
            >
              {loading ? (
                <>
                  <Loader2 className="w-5 h-5 animate-spin" />
                  <span>Submitting...</span>
                </>
              ) : (
                <>
                  <CheckCircle2 className="w-5 h-5" />
                  <span>Submit Booking</span>
                </>
              )}
            </button>
          )}
        </div>

      </div>
    </div>
  );
};

