import React, { useState, useEffect } from 'react';
import { X, Phone, MessageCircle, MapPin, HardHat, ShieldCheck, Clock, Truck, Package, AlertCircle, Compass, Zap, Calendar } from 'lucide-react';
import { LocationPicker } from './LocationPicker';
import { buildWhatsAppMessage, KAAMWALE_PHONE, openWhatsApp } from '../../services/whatsappHelper';
import API from '../../services/api';

export const BookingModal = ({ isOpen, onClose, initialService, initialBookingType = 'NORMAL' }) => {
  const [bookingType, setBookingType] = useState(initialBookingType); // 'NORMAL' | 'TATKAL'
  const [serviceType, setServiceType] = useState('daily'); // 'loading_unloading' | 'hourly' | 'daily'
  
  // Loading / Unloading Base Rate is ALWAYS ₹4 / bag
  const loadingRate = 4;
  const [numberOfBags, setNumberOfBags] = useState(50);
  const [carryingDistance, setCarryingDistance] = useState('20m');
  const [durationHours, setDurationHours] = useState(4);
  const [workerCount, setWorkerCount] = useState(1);
  
  // Date & Time
  const [selectedDate, setSelectedDate] = useState('Kal');
  const [customDate, setCustomDate] = useState('');
  const [startTime, setStartTime] = useState('09:00 AM');
  const [workNotes, setWorkNotes] = useState('');

  // Location state
  const [workLocation, setWorkLocation] = useState(null);
  const [errorMessage, setErrorMessage] = useState('');

  const PHONE_NUMBER = KAAMWALE_PHONE;
  const DISPLAY_PHONE = '+91 97626 58206';

  // Sync initialBookingType when modal opens or prop changes
  useEffect(() => {
    if (isOpen) {
      setBookingType(initialBookingType || 'NORMAL');
    }
  }, [isOpen, initialBookingType]);

  // Initialize service type based on initialService
  useEffect(() => {
    if (initialService) {
      const name = initialService.name || '';
      if (name.includes('Loading') || name.includes('Unloading')) {
        setServiceType('loading_unloading');
      } else if (name.includes('Hourly')) {
        setServiceType('hourly');
      } else {
        setServiceType('daily');
      }
    }
  }, [initialService]);

  // Adjust default date when bookingType changes
  useEffect(() => {
    if (bookingType === 'TATKAL') {
      setSelectedDate('Aaj');
      // Set earliest default Tatkal start time (current time + 6 hours)
      const now = new Date();
      now.setHours(now.getHours() + 6);
      const hours = now.getHours();
      const ampm = hours >= 12 ? 'PM' : 'AM';
      const formattedHours = hours % 12 || 12;
      const padHours = String(formattedHours).padStart(2, '0');
      setStartTime(`${padHours}:00 ${ampm}`);
    } else {
      if (selectedDate === 'Aaj') {
        setSelectedDate('Kal');
      }
    }
  }, [bookingType]);

  if (!isOpen) return null;

  const serviceName = initialService?.name ||
    (serviceType === 'loading_unloading' ? 'Loading / Unloading' : serviceType === 'hourly' ? 'Hourly Labour' : 'General Construction Labour');

  // Hourly rates specification (1h: ₹300, 2h: ₹400, 3h: ₹500, 6h: ₹600)
  const hourlyRates = {
    1: 300,
    2: 400,
    3: 500,
    6: 600
  };

  // Price calculations (+2 for 40m, +4 for 60m)
  const distanceExtra = carryingDistance === '60m' ? 4 : carryingDistance === '40m' ? 2 : 0;
  const effectiveRate = loadingRate + distanceExtra;

  let labourAmount = 0;
  let unitRateText = '';

  if (serviceType === 'loading_unloading') {
    const validBags = Math.max(1, parseInt(numberOfBags) || 0);
    labourAmount = validBags * effectiveRate;
    const rateLabel = loadingRate === 4 ? 'Basic (₹4)' : loadingRate === 6 ? 'Standard (₹6)' : 'Heavy (₹8)';
    unitRateText = `₹${effectiveRate}/बैग (दर: ₹${loadingRate} + दूरी: ₹${distanceExtra})`;
  } else if (serviceType === 'hourly') {
    const rate = hourlyRates[durationHours] || 400;
    labourAmount = rate * Math.max(1, workerCount);
    unitRateText = `₹${rate} (${durationHours} घंटे)`;
  } else {
    const dailyRate = initialService?.rate || (serviceName.includes('Mistri') ? 950 : 700);
    labourAmount = dailyRate * Math.max(1, workerCount);
    unitRateText = `₹${dailyRate}/दिन`;
  }

  const transportationCharge = 50; // Mandatory ₹50 transportation charge
  const tatkalCharge = bookingType === 'TATKAL' ? 150 : 0;
  const totalAmount = labourAmount + transportationCharge + tatkalCharge;

  // Validation function
  const validateBooking = () => {
    setErrorMessage('');

    // Normal same-day check
    if (bookingType === 'NORMAL' && selectedDate === 'Aaj') {
      setErrorMessage('Same-day booking is not available. Please select tomorrow or a later date.');
      return false;
    }

    // Tatkal checks
    if (bookingType === 'TATKAL') {
      if (selectedDate !== 'Aaj') {
        setErrorMessage("Tatkal booking is available only for today's booking.");
        return false;
      }

    }

    // Loading / Unloading rate validation
    if (serviceType === 'loading_unloading' || serviceName.includes('Loading')) {
      if (![4, 6, 8].includes(loadingRate)) {
        setErrorMessage('Please select a valid rate: ₹4, ₹6, or ₹8.');
        return false;
      }
      const bags = parseInt(numberOfBags);
      if (isNaN(bags) || bags <= 0) {
        setErrorMessage('बैगों की संख्या 1 या उससे अधिक होनी चाहिए।');
        return false;
      }
    }

    return true;
  };


  
  // Submit to Backend API (MongoDB) - non-blocking
  const saveBookingToBackend = async () => {
    try {
      const dateStr = selectedDate === 'Aaj' ? 'Aaj' : selectedDate === 'Kal' ? 'Kal' : (customDate || 'Kal');
      const res = await API.post('/bookings', {
        bookingType,
        serviceName,
        serviceType,
        serviceRate: loadingRate,
        rateType: 'Standard',
        workerCount: Math.max(1, workerCount),
        numberOfBags: serviceType === 'loading_unloading' ? (parseInt(numberOfBags) || 50) : 0,
        carryingDistance: serviceType === 'loading_unloading' ? carryingDistance : '',
        weightPerBag: 'लगभग 40–50 kg',
        durationHours: serviceType === 'hourly' ? durationHours : 8,
        pricePerBag: loadingRate,
        hourlyRate: serviceType === 'hourly' ? (hourlyRates[durationHours] || 600) : 0,
        labourAmount,
        transportationCharge,
        tatkalCharge,
        totalAmount,
        estimatedCost: totalAmount,
        estimatedTotal: totalAmount,
        date: dateStr,
        startTime,
        workLocation: workLocation || {
          address: 'Bulandshahr',
          latitude: 28.4089,
          longitude: 77.8498
        },
        address: workLocation?.address || 'Bulandshahr',
        city: 'Bulandshahr',
        description: workNotes
      });
      return res.data;
    } catch (err) {
      if (err.response && err.response.data && err.response.data.message) {
        setErrorMessage(err.response.data.message);
      }
      throw err;
    }
  };

  // WhatsApp booking redirection handler
  const handleWhatsAppBooking = async () => {
    if (!validateBooking()) return;

    try {
      await saveBookingToBackend();
    } catch (err) {
      if (err.response?.data?.message) return; // Error handled in saveBookingToBackend
    }

    const dateStr = selectedDate === 'Aaj' ? 'Aaj' : selectedDate === 'Kal' ? 'Kal' : (customDate || 'Kal');
    openWhatsApp({
      bookingType,
      serviceName,
      serviceType,
      serviceRate: loadingRate,
      workerCount: Math.max(1, workerCount),
      numberOfBags: serviceType === 'loading_unloading' ? parseInt(numberOfBags) : 0,
      carryingDistance,
      durationHours,
      labourAmount,
      transportationCharge,
      tatkalCharge,
      totalAmount,
      workLocation,
      date: dateStr,
      startTime,
      workNotes
    });

    onClose();
  };

  const handleCallBooking = async () => {
    if (!validateBooking()) return;
    try {
      await saveBookingToBackend();
    } catch (err) {
      if (err.response?.data?.message) return;
    }
    const cleanPhone = PHONE_NUMBER.replace(/\D/g, '');
    window.location.href = `tel:+${cleanPhone}`;
  };

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
              <span className="text-xs font-semibold uppercase tracking-wider text-amber-300 bg-amber-500/20 px-2 py-0.5 rounded-full inline-block mb-0.5 border border-amber-400/30">
                ✓ सत्यापित मजदूर बुकिंग
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

          {/* 1. BOOKING TYPE SELECTOR (Normal vs Tatkal) */}
          <div>
            <label className="block text-xs font-extrabold uppercase tracking-wider text-gray-700 mb-2">
              बुकिंग का प्रकार चुनें (Select Booking Type)
            </label>
            <div className="grid grid-cols-2 gap-3">
              <button
                type="button"
                onClick={() => setBookingType('NORMAL')}
                className={`p-3.5 rounded-2xl border text-left transition-all relative overflow-hidden ${
                  bookingType === 'NORMAL'
                    ? 'bg-blue-50 border-[#155EEF] ring-2 ring-[#155EEF]/20 shadow-sm'
                    : 'bg-slate-50 border-slate-200 hover:bg-slate-100'
                }`}
              >
                <div className="flex items-center justify-between">
                  <span className={`font-extrabold text-sm flex items-center gap-1.5 ${bookingType === 'NORMAL' ? 'text-[#155EEF]' : 'text-slate-700'}`}>
                    <Calendar className="w-4 h-4" /> Normal Booking
                  </span>
                  <span className="text-[10px] font-bold text-emerald-700 bg-emerald-100 px-2 py-0.5 rounded-full">
                    No Extra Fee
                  </span>
                </div>
                <p className="text-[11px] text-slate-500 mt-1 font-medium">Book for tomorrow or later dates</p>
              </button>

              <button
                type="button"
                onClick={() => setBookingType('TATKAL')}
                className={`p-3.5 rounded-2xl border text-left transition-all relative overflow-hidden ${
                  bookingType === 'TATKAL'
                    ? 'bg-amber-50 border-amber-500 ring-2 ring-amber-400/30 shadow-sm'
                    : 'bg-slate-50 border-slate-200 hover:bg-slate-100'
                }`}
              >
                <div className="flex items-center justify-between">
                  <span className={`font-extrabold text-sm flex items-center gap-1.5 ${bookingType === 'TATKAL' ? 'text-amber-700' : 'text-slate-700'}`}>
                    <Zap className="w-4 h-4 text-amber-500 fill-current" /> Tatkal Booking
                  </span>
                  <span className="text-[10px] font-bold text-amber-900 bg-amber-200 px-2 py-0.5 rounded-full">
                    +₹150
                  </span>
                </div>
                <p className="text-[11px] text-slate-500 mt-1 font-medium">Book today with min 6-hour notice</p>
              </button>
            </div>

            {bookingType === 'TATKAL' && (
              <div className="mt-2.5 p-3 bg-amber-50 border border-amber-200 rounded-xl text-xs text-amber-900 flex items-start gap-2 animate-fadeIn">
                <Zap className="w-4 h-4 text-amber-600 shrink-0 mt-0.5" />
                <div>
                  <strong>तत्काल डिलीवरी निर्देश:</strong> बुकिंग स्वीकार होने के <strong>6 घंटे बाद</strong> सत्यापित मजदूर आपकी साइट पर कार्य हेतु उपलब्ध होंगे। (labour will be provided after the 6 hours of booking).
                </div>
              </div>
            )}
          </div>

          {/* Service Mode Selector */}
          <div>
            <label className="block text-xs font-extrabold uppercase tracking-wider text-gray-700 mb-2">
              सर्विस का प्रकार चुनें (Select Service Mode)
            </label>
            <div className="grid grid-cols-3 gap-2">
              <button
                type="button"
                onClick={() => setServiceType('loading_unloading')}
                className={`py-2.5 px-2 rounded-xl border text-xs font-bold transition-all flex flex-col items-center gap-1 text-center ${
                  serviceType === 'loading_unloading'
                    ? 'bg-[#155EEF] text-white border-[#155EEF] shadow-md'
                    : 'bg-gray-50 text-gray-700 border-gray-200 hover:bg-gray-100'
                }`}
              >
                <Truck className="w-4 h-4 text-amber-300" />
                <span>लोडिंग / अनलोडिंग</span>
                <span className={`text-[9px] ${serviceType === 'loading_unloading' ? 'text-blue-100' : 'text-gray-500'}`}>
                  ₹{loadingRate} / बैग
                </span>
              </button>

              <button
                type="button"
                onClick={() => setServiceType('hourly')}
                className={`py-2.5 px-2 rounded-xl border text-xs font-bold transition-all flex flex-col items-center gap-1 text-center ${
                  serviceType === 'hourly'
                    ? 'bg-[#F59E0B] text-slate-900 border-[#F59E0B] shadow-md'
                    : 'bg-gray-50 text-gray-700 border-gray-200 hover:bg-gray-100'
                }`}
              >
                <Clock className="w-4 h-4 text-slate-900" />
                <span>घंटे के अनुसार</span>
                <span className={`text-[9px] ${serviceType === 'hourly' ? 'text-slate-900' : 'text-gray-500'}`}>
                  1h ₹300 | 2h ₹400 | 3h ₹500 | 6h ₹600
                </span>
              </button>

              <button
                type="button"
                onClick={() => setServiceType('daily')}
                className={`py-2.5 px-2 rounded-xl border text-xs font-bold transition-all flex flex-col items-center gap-1 text-center ${
                  serviceType === 'daily'
                    ? 'bg-slate-900 text-white border-slate-900 shadow-md'
                    : 'bg-gray-50 text-gray-700 border-gray-200 hover:bg-gray-100'
                }`}
              >
                <HardHat className="w-4 h-4 text-amber-400" />
                <span>पूरा दिन (Daily)</span>
                <span className={`text-[9px] ${serviceType === 'daily' ? 'text-gray-300' : 'text-gray-500'}`}>
                  ₹700 / दिन
                </span>
              </button>
            </div>
          </div>

          {/* MODE 1: Loading / Unloading Rate Options & Carrying Distance */}
          {serviceType === 'loading_unloading' && (
            <div className="bg-amber-50/80 border border-amber-200 p-4 rounded-2xl space-y-4">
              <div className="flex items-center justify-between">
                <div>
                  <h4 className="text-xs font-extrabold text-amber-900 uppercase">Loading / Unloading Rate & Distance</h4>
                  <p className="text-xs text-amber-800 font-bold mt-0.5">
                    प्रभावी दर: <span className="text-base text-amber-950 font-black">₹{effectiveRate}</span> प्रति बैग (दर: ₹{loadingRate} + दूरी: ₹{distanceExtra})
                  </p>
                </div>
                <Package className="w-8 h-8 text-amber-600 opacity-80" />
              </div>



              {/* Carrying Distance Selector (20m, 40m, 60m) */}
              <div>
                <label className="block text-xs font-bold text-slate-800 mb-1.5">
                  दूरी चुनें (Select Carrying Distance):
                </label>
                <div className="grid grid-cols-3 gap-2">
                  {[
                    { dist: '20m', label: '20m (Standard)', extra: '+₹0/बैग' },
                    { dist: '40m', label: '40m (Medium)', extra: '+₹2/बैग' },
                    { dist: '60m', label: '60m (Long)', extra: '+₹4/बैग' }
                  ].map((opt) => (
                    <button
                      key={opt.dist}
                      type="button"
                      onClick={() => setCarryingDistance(opt.dist)}
                      className={`p-2.5 rounded-xl border text-center transition-all ${
                        carryingDistance === opt.dist
                          ? 'bg-amber-600 text-white border-amber-700 font-extrabold shadow-md ring-2 ring-amber-300'
                          : 'bg-white text-slate-700 border-amber-200 hover:bg-amber-100'
                      }`}
                    >
                      <div className="text-xs font-black">{opt.dist}</div>
                      <div className="text-[10px] opacity-90">{opt.extra}</div>
                    </button>
                  ))}
                </div>
              </div>

              {/* Bag Quantity Input */}
              <div>
                <label className="block text-xs font-bold text-slate-800 mb-1">
                  बैगों की संख्या (Number of Bags):
                </label>
                <input
                  type="number"
                  min="1"
                  step="1"
                  value={numberOfBags}
                  onChange={(e) => setNumberOfBags(e.target.value)}
                  className="w-full px-3 py-2 text-sm font-bold border border-amber-300 rounded-xl focus:ring-2 focus:ring-amber-500 outline-none bg-white"
                />
              </div>

              <div className="text-xs text-amber-900 bg-white/80 p-2.5 rounded-xl border border-amber-200 flex justify-between font-bold">
                <span>मजदूरी कैलकुलेशन:</span>
                <span>{numberOfBags || 0} बैग × ₹{effectiveRate} (₹{loadingRate} + ₹{distanceExtra}) = ₹{labourAmount}</span>
              </div>
            </div>
          )}

          {/* MODE 2: Hourly Duration Selector */}
          {serviceType === 'hourly' && (
            <div className="bg-orange-50/80 border border-orange-200 p-4 rounded-2xl space-y-3">
              <label className="block text-xs font-extrabold text-slate-900 uppercase">
                काम का समय चुनें (Select Duration):
              </label>
              <div className="grid grid-cols-4 gap-2">
                {[
                  { h: 1, price: 300, label: '1 घंटा — ₹300' },
                  { h: 2, price: 400, label: '2 घंटे — ₹400' },
                  { h: 3, price: 500, label: '3 घंटे — ₹500' },
                  { h: 6, price: 600, label: '6 घंटे — ₹600' }
                ].map((item) => (
                  <button
                    key={item.h}
                    type="button"
                    onClick={() => setDurationHours(item.h)}
                    className={`py-3 px-2 rounded-xl text-xs font-extrabold transition-all border ${
                      durationHours === item.h
                        ? 'bg-[#F59E0B] text-slate-950 border-[#F59E0B] shadow-md ring-2 ring-amber-300'
                        : 'bg-white text-slate-800 border-slate-200 hover:bg-amber-100'
                    }`}
                  >
                    <div>{item.h} घंटे</div>
                    <div className="text-[11px] font-black">₹{item.price}</div>
                  </button>
                ))}
              </div>
            </div>
          )}

          {/* Worker Counter */}
          <div>
            <label className="block text-xs font-extrabold uppercase tracking-wider text-slate-700 mb-1">
              मजदूरों की संख्या (Worker Count)
            </label>

            <div className="flex items-center justify-between bg-slate-50 border border-slate-200 p-3 rounded-xl">
              <div>
                <span className="text-sm font-bold text-slate-900 block">कुल मजदूर</span>
                <span className="text-xs text-slate-500">{unitRateText}</span>
              </div>
              <div className="flex items-center gap-3">
                <button
                  type="button"
                  onClick={() => setWorkerCount(Math.max(1, workerCount - 1))}
                  disabled={workerCount <= 1}
                  className="w-10 h-10 rounded-lg bg-white border border-slate-300 disabled:opacity-40 disabled:cursor-not-allowed text-slate-700 font-bold text-lg hover:bg-slate-100 flex items-center justify-center shadow-xs"
                >
                  -
                </button>
                <span className="w-8 text-center text-xl font-extrabold text-[#155EEF]">
                  {Math.max(1, workerCount)}
                </span>
                <button
                  type="button"
                  onClick={() => setWorkerCount(workerCount + 1)}
                  className="w-10 h-10 rounded-lg bg-[#155EEF] text-white font-bold text-lg hover:bg-[#1254D4] flex items-center justify-center shadow-xs"
                >
                  +
                </button>
              </div>
            </div>
          </div>

          {/* Work Location Picker */}
          <div className="space-y-1">
            <LocationPicker
              selectedLocation={workLocation}
              onSelectLocation={(loc) => setWorkLocation(loc)}
            />
          </div>

          {/* Date & Time Selector */}
          <div className="space-y-3">
            <label className="block text-xs font-extrabold uppercase tracking-wider text-slate-700 mb-1">
              बुकिंग की तारीख और समय (Date & Time)
            </label>

            <div className="grid grid-cols-3 gap-2">
              {['Aaj', 'Kal', 'Koi aur din'].map((option) => {
                const isDisabled = bookingType === 'NORMAL' && option === 'Aaj';
                return (
                  <button
                    key={option}
                    type="button"
                    disabled={isDisabled}
                    onClick={() => {
                      if (bookingType === 'NORMAL' && option === 'Aaj') return;
                      setSelectedDate(option);
                    }}
                    className={`py-2.5 px-3 text-xs font-bold rounded-xl border transition-all ${
                      isDisabled
                        ? 'bg-slate-100 text-slate-400 border-slate-200 cursor-not-allowed line-through'
                        : selectedDate === option
                        ? 'bg-[#155EEF] text-white border-[#155EEF] shadow-xs'
                        : 'bg-slate-50 text-slate-700 border-slate-200 hover:bg-slate-100'
                    }`}
                  >
                    {option === 'Aaj' ? '⚡ आज (Today)' : option === 'Kal' ? '📅 कल (Tomorrow)' : '📆 अन्य दिन'}
                  </button>
                );
              })}
            </div>

            {bookingType === 'NORMAL' && selectedDate === 'Aaj' && (
              <p className="text-xs text-rose-600 font-bold bg-rose-50 p-2 rounded-lg border border-rose-200">
                Same-day booking is not available. Please select tomorrow or a later date.
              </p>
            )}

            {selectedDate === 'Koi aur din' && (
              <input
                type="date"
                value={customDate}
                onChange={(e) => setCustomDate(e.target.value)}
                className="w-full p-2.5 text-xs font-semibold border border-slate-300 rounded-xl focus:ring-2 focus:ring-[#155EEF] outline-none"
              />
            )}


          </div>

          {/* Optional Notes */}
          <div>
            <label className="block text-xs font-extrabold uppercase tracking-wider text-slate-700 mb-1">
              काम का विवरण (Work Instructions)
            </label>
            <textarea
              rows={2}
              placeholder="जैसे: 50 बोरी सीमेंट अनलोडिंग, या कंस्ट्रक्शन हेल्प..."
              value={workNotes}
              onChange={(e) => setWorkNotes(e.target.value)}
              className="w-full p-2.5 text-xs border border-slate-300 rounded-xl focus:ring-2 focus:ring-[#155EEF] outline-none resize-none"
            />
          </div>

          {/* Error Message Display */}
          {errorMessage && (
            <div className="bg-rose-50 border border-rose-200 p-3 rounded-xl flex items-center gap-2 text-xs text-rose-700 font-bold">
              <AlertCircle className="w-4 h-4 text-rose-600 shrink-0" />
              <span>{errorMessage}</span>
            </div>
          )}

          {/* Pricing Summary UI */}
          <div className="bg-slate-900 text-white p-5 rounded-2xl border border-slate-800 space-y-2.5 shadow-lg">
            <div className="flex items-center justify-between text-xs border-b border-slate-800 pb-2">
              <span className="text-slate-400">बुकिंग प्रकार (Type):</span>
              <strong className={`font-bold ${bookingType === 'TATKAL' ? 'text-amber-400' : 'text-blue-400'}`}>
                {bookingType === 'TATKAL' ? '⚡ TATKAL (तत्काल)' : '📅 NORMAL'}
              </strong>
            </div>

            <div className="flex items-center justify-between text-xs">
              <span className="text-slate-400">मजदूरी शुल्क (Labour Charges):</span>
              <span className="font-bold text-white">₹{labourAmount}</span>
            </div>

            <div className="flex items-center justify-between text-xs">
              <span className="text-slate-400">ट्रांसपोर्टेशन शुल्क (Transportation):</span>
              <span className="font-bold text-emerald-400">₹{transportationCharge}</span>
            </div>

            {bookingType === 'TATKAL' && (
              <div className="flex items-center justify-between text-xs">
                <span className="text-amber-400 font-medium">तत्काल शुल्क (Tatkal Charge):</span>
                <span className="font-bold text-amber-400">₹150</span>
              </div>
            )}

            <div className="pt-2 border-t border-slate-800 flex items-center justify-between">
              <div>
                <span className="text-xs text-slate-400 block font-medium">कुल देय राशि (Total):</span>
                <span className="text-2xl font-extrabold text-amber-400">₹{totalAmount}</span>
              </div>
              <span className="text-[10px] text-emerald-400 font-bold bg-emerald-950/80 px-2.5 py-1 rounded-full border border-emerald-800">
                ₹50 transportation charge included
              </span>
            </div>
          </div>

        </div>

        {/* Modal Action Buttons Footer */}
        <div className="p-4 bg-slate-50 border-t border-slate-200 grid grid-cols-1 sm:grid-cols-2 gap-3">
          <button
            type="button"
            onClick={handleWhatsAppBooking}
            className="w-full py-3 px-4 bg-[#25D366] hover:bg-[#20BD5A] text-white font-bold rounded-xl shadow-md hover:shadow-lg transition-all flex items-center justify-center gap-2 text-sm active:scale-98 cursor-pointer"
          >
            <MessageCircle className="w-5 h-5 fill-current" />
            <span>WhatsApp पर बुक करें</span>
          </button>

          <button
            type="button"
            onClick={handleCallBooking}
            className="w-full py-3 px-4 bg-[#155EEF] hover:bg-[#1254D4] text-white font-bold rounded-xl shadow-md hover:shadow-lg transition-all flex items-center justify-center gap-2 text-sm active:scale-98 cursor-pointer"
          >
            <Phone className="w-5 h-5" />
            <span>कॉल करें: {DISPLAY_PHONE}</span>
          </button>
        </div>
      </div>
    </div>
  );
};

