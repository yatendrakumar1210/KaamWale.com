import React, { useState, useEffect } from 'react';
import { X, Phone, MessageCircle, MapPin, HardHat, ShieldCheck, Clock, Zap, AlertCircle, Calendar } from 'lucide-react';
import { LocationPicker } from './LocationPicker';
import { buildWhatsAppMessage, KAAMWALE_PHONE } from '../../services/whatsappHelper';
import API from '../../services/api';

export const TatkalBookingModal = ({ isOpen, onClose, initialService }) => {
  const [serviceName, setServiceName] = useState(initialService?.name || 'General Construction Labour');
  const [workerCount, setWorkerCount] = useState(1);
  const [numberOfBags, setNumberOfBags] = useState(50);
  const [carryingDistance, setCarryingDistance] = useState('20m');
  const [startTime, setStartTime] = useState('09:00 AM');
  const [workNotes, setWorkNotes] = useState('');

  // Location state
  const [workLocation, setWorkLocation] = useState(null);
  const [errorMessage, setErrorMessage] = useState('');
  const [successMessage, setSuccessMessage] = useState('');
  const [submitting, setSubmitting] = useState(false);

  const PHONE_NUMBER = KAAMWALE_PHONE;
  const DISPLAY_PHONE = '+91 97626 58206';

  // Available Tatkal Services
  const tatkalServices = [
    'General Construction Labour',
    'Loading / Unloading',
    'House Shifting Labour',
    'Building Material Labour',
    'Digging / Excavation Labour',
    'Demolition Labour',
    'General Helper'
  ];

  useEffect(() => {
    if (initialService?.name) {
      setServiceName(initialService.name);
    }
  }, [initialService]);

  // Set automatic start time (+6 hours from booking time)
  useEffect(() => {
    if (isOpen) {
      const now = new Date();
      now.setHours(now.getHours() + 6);
      const hours = now.getHours();
      const ampm = hours >= 12 ? 'PM' : 'AM';
      const formattedHours = hours % 12 || 12;
      const padHours = String(formattedHours).padStart(2, '0');
      const padMins = String(now.getMinutes()).padStart(2, '0');
      setStartTime(`${padHours}:${padMins} ${ampm}`);
      setErrorMessage('');
      setSuccessMessage('');
    }
  }, [isOpen]);

  if (!isOpen) return null;

  // Real Pricing Calculation for Tatkal
  const isLoadingUnloading = serviceName.includes('Loading') || serviceName.includes('Unloading');
  const distanceExtra = carryingDistance === '60m' ? 4 : carryingDistance === '40m' ? 2 : 0;
  const loadingBaseRate = 4;
  const effectiveLoadingRate = loadingBaseRate + distanceExtra;

  const tatkalLabourRate = isLoadingUnloading
    ? effectiveLoadingRate
    : (serviceName.toLowerCase().includes('mistri') ? 950 : 700);

  const labourAmount = isLoadingUnloading
    ? Math.max(1, parseInt(numberOfBags) || 1) * effectiveLoadingRate
    : Math.max(1, workerCount) * tatkalLabourRate;

  const transportationCharge = 50;
  const tatkalFee = 150;
  const totalAmount = labourAmount + transportationCharge + tatkalFee;

  const validateTatkalBooking = () => {
    setErrorMessage('');
    if (!workLocation || !workLocation.address) {
      setErrorMessage('कृपया अपनी कार्य स्थल लोकेशन का चयन करें। (Please select site location).');
      return false;
    }
    return true;
  };

  const getPayload = () => ({
    bookingType: 'TATKAL',
    serviceName,
    serviceType: isLoadingUnloading ? 'loading_unloading' : 'daily',
    serviceRate: isLoadingUnloading ? 4 : tatkalLabourRate,
    workerCount: Math.max(1, workerCount),
    numberOfBags: isLoadingUnloading ? Math.max(1, parseInt(numberOfBags) || 1) : undefined,
    carryingDistance: isLoadingUnloading ? carryingDistance : undefined,
    date: 'Aaj',
    startTime,
    duration: '1 Day',
    city: 'Bulandshahr',
    address: workLocation?.address || 'Bulandshahr Site',
    workLocation: workLocation || {
      address: 'Bulandshahr Site',
      latitude: 28.4089,
      longitude: 77.8498
    },
    description: workNotes,
    labourAmount,
    transportationCharge,
    tatkalCharge: tatkalFee,
    totalAmount
  });

  const handleWhatsAppBooking = () => {
    if (!validateTatkalBooking()) return;
    const payload = getPayload();
    const message = buildWhatsAppMessage(payload);
    const cleanPhone = PHONE_NUMBER.replace(/\D/g, '');
    window.open(`https://wa.me/${cleanPhone}?text=${message}`, '_blank', 'noopener,noreferrer');
    onClose();
  };

  const handleDirectSubmit = async (e) => {
    e.preventDefault();
    if (!validateTatkalBooking()) return;

    setSubmitting(true);
    setErrorMessage('');
    try {
      const payload = getPayload();
      const res = await API.post('/bookings', payload);
      setSubmitting(false);
      setSuccessMessage(`⚡ Tatkal Booking Successful! Booking ID: ${res.data.bookingId || res.data.id}`);
      setTimeout(() => {
        onClose();
      }, 2500);
    } catch (err) {
      setSubmitting(false);
      // Fallback to WhatsApp if backend is offline or errors
      handleWhatsAppBooking();
    }
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-slate-950/80 backdrop-blur-md animate-fadeIn">
      <div
        className="bg-slate-900 text-white w-full max-w-lg rounded-3xl shadow-2xl overflow-hidden flex flex-col max-h-[92vh] border-2 border-amber-500/50"
        onClick={(e) => e.stopPropagation()}
      >
        {/* Urgent Tatkal Header */}
        <div className="bg-gradient-to-r from-amber-600 via-amber-500 to-amber-600 text-slate-950 p-5 flex items-center justify-between relative shadow-md">
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 rounded-xl bg-slate-950/20 flex items-center justify-center border border-slate-950/30">
              <Zap className="w-6 h-6 fill-slate-950 text-slate-950" />
            </div>
            <div>
              <span className="text-[10px] font-black uppercase tracking-wider bg-slate-950 text-amber-400 px-2.5 py-0.5 rounded-full inline-block mb-0.5">
                ⚡ DEDICATED TATKAL SECTION
              </span>
              <h3 className="text-lg font-black text-slate-950 leading-snug">
                Tatkal Urgent Labour (तत्काल मजदूर)
              </h3>
            </div>
          </div>
          <button
            onClick={onClose}
            className="w-8 h-8 rounded-full bg-slate-950/20 hover:bg-slate-950/40 text-slate-950 flex items-center justify-center transition-all font-bold"
            aria-label="Close"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Modal Body */}
        <div className="p-5 overflow-y-auto space-y-5 flex-1 text-slate-200">

          {/* ⚡ Tatkal Guarantee Alert Banner */}
          <div className="bg-amber-500/10 border border-amber-500/30 p-3.5 rounded-2xl flex items-start gap-3 text-xs text-amber-300">
            <Zap className="w-5 h-5 text-amber-400 shrink-0 mt-0.5 fill-amber-400" />
            <div className="space-y-1">
              <strong className="font-extrabold text-amber-400 text-sm block">⚡ Same-Day Dispatch Guarantee:</strong>
              <p className="text-slate-300">
                Book for today! Labour will be dispatched & arrive at your site within <strong>6 hours</strong> of confirmation.
              </p>
            </div>
          </div>

          {/* Service Selector */}
          <div>
            <label className="block text-xs font-bold uppercase tracking-wider text-amber-400 mb-1.5">
              Select Labour Service (मजदूर सेवा)
            </label>
            <select
              value={serviceName}
              onChange={(e) => setServiceName(e.target.value)}
              className="w-full px-4 py-3 rounded-xl bg-slate-950 border border-slate-800 text-sm font-bold text-white focus:border-amber-500 outline-none"
            >
              {tatkalServices.map(s => (
                <option key={s} value={s}>{s}</option>
              ))}
            </select>
          </div>

          {/* Dynamic Service Inputs (Loading/Unloading vs Daily Labour) */}
          {isLoadingUnloading ? (
            <div className="space-y-4 bg-slate-950 p-4 rounded-2xl border border-slate-800">
              <div className="grid grid-cols-2 gap-3">
                <div>
                  <label className="block text-xs font-bold uppercase tracking-wider text-slate-400 mb-1.5">
                    बैगों की संख्या (Number of Bags)
                  </label>
                  <input
                    type="number"
                    min="1"
                    value={numberOfBags}
                    onChange={(e) => setNumberOfBags(Math.max(1, parseInt(e.target.value) || 0))}
                    className="w-full px-3.5 py-2 rounded-xl bg-slate-900 border border-slate-700 text-sm font-bold text-amber-400 outline-none focus:border-amber-500"
                  />
                </div>

                <div>
                  <label className="block text-xs font-bold uppercase tracking-wider text-slate-400 mb-1.5">
                    मजदूर संख्या (Workers)
                  </label>
                  <div className="flex items-center bg-slate-900 rounded-xl border border-slate-700 p-1">
                    <button
                      type="button"
                      onClick={() => setWorkerCount(Math.max(1, workerCount - 1))}
                      className="w-7 h-7 rounded-lg bg-slate-800 text-white font-bold hover:bg-slate-700 text-sm"
                    >
                      -
                    </button>
                    <span className="flex-1 text-center font-bold text-white text-xs">
                      {workerCount}
                    </span>
                    <button
                      type="button"
                      onClick={() => setWorkerCount(workerCount + 1)}
                      className="w-7 h-7 rounded-lg bg-slate-800 text-white font-bold hover:bg-slate-700 text-sm"
                    >
                      +
                    </button>
                  </div>
                </div>
              </div>

              <div>
                <label className="block text-xs font-bold uppercase tracking-wider text-slate-400 mb-1.5">
                  दूरी (Carrying Distance)
                </label>
                <div className="grid grid-cols-3 gap-2 text-xs font-bold">
                  {[
                    { id: '20m', label: '20m (₹4/bag)', extra: '+₹0' },
                    { id: '40m', label: '40m (₹6/bag)', extra: '+₹2' },
                    { id: '60m', label: '60m (₹8/bag)', extra: '+₹4' }
                  ].map((opt) => (
                    <button
                      key={opt.id}
                      type="button"
                      onClick={() => setCarryingDistance(opt.id)}
                      className={`py-2 px-2 rounded-xl border text-center transition-all ${
                        carryingDistance === opt.id
                          ? 'bg-amber-500 text-slate-950 border-amber-400 font-extrabold shadow-sm'
                          : 'bg-slate-900 text-slate-300 border-slate-800 hover:border-slate-700'
                      }`}
                    >
                      {opt.label}
                    </button>
                  ))}
                </div>
              </div>
            </div>
          ) : (
            <div className="grid grid-cols-2 gap-4">
              <div>
                <label className="block text-xs font-bold uppercase tracking-wider text-slate-400 mb-1.5">
                  Number of Workers
                </label>
                <div className="flex items-center bg-slate-950 rounded-xl border border-slate-800 p-1">
                  <button
                    type="button"
                    onClick={() => setWorkerCount(Math.max(1, workerCount - 1))}
                    className="w-9 h-9 rounded-lg bg-slate-800 text-white font-bold hover:bg-slate-700 text-base"
                  >
                    -
                  </button>
                  <span className="flex-1 text-center font-black text-amber-400 text-base">
                    {workerCount}
                  </span>
                  <button
                    type="button"
                    onClick={() => setWorkerCount(workerCount + 1)}
                    className="w-9 h-9 rounded-lg bg-slate-800 text-white font-bold hover:bg-slate-700 text-base"
                  >
                    +
                  </button>
                </div>
              </div>

              <div>
                <label className="block text-xs font-bold uppercase tracking-wider text-slate-400 mb-1.5">
                  Booking Date
                </label>
                <div className="px-4 py-2.5 bg-amber-500/20 border border-amber-500/40 rounded-xl text-center">
                  <span className="text-xs font-extrabold text-amber-300 block">Aaj (Today Only)</span>
                  <span className="text-[10px] text-slate-400">⚡ Same Day Tatkal</span>
                </div>
              </div>
            </div>
          )}

          {/* Automatic 6-Hour Dispatch Display Card */}
          <div className="bg-amber-500/10 border border-amber-500/30 p-4 rounded-2xl flex items-center justify-between shadow-inner">
            <div className="flex items-center gap-3">
              <div className="w-9 h-9 rounded-xl bg-amber-500/20 flex items-center justify-center text-amber-400 border border-amber-500/30">
                <Clock className="w-5 h-5 text-amber-400 shrink-0" />
              </div>
              <div>
                <span className="text-[10px] font-black uppercase text-amber-400 tracking-wider block">
                  AUTOMATIC DISPATCH TIME (+6 HOURS)
                </span>
                <span className="text-sm font-extrabold text-white">
                  Arrival by {startTime} (Today)
                </span>
              </div>
            </div>
            <span className="px-2.5 py-1 bg-amber-400 text-slate-950 text-[10px] font-black rounded-lg uppercase tracking-wider shadow-sm">
              Auto Set
            </span>
          </div>

          {/* Location Picker */}
          <div>
            <label className="block text-xs font-bold uppercase tracking-wider text-slate-400 mb-1.5">
              Work Location (कार्य स्थल) *
            </label>
            <LocationPicker selectedLocation={workLocation} onSelectLocation={(loc) => setWorkLocation(loc)} />
          </div>

          {/* Work Description / Notes */}
          <div>
            <label className="block text-xs font-bold uppercase tracking-wider text-slate-400 mb-1.5">
              Work Details / Instructions (Optional)
            </label>
            <textarea
              rows="2"
              value={workNotes}
              onChange={(e) => setWorkNotes(e.target.value)}
              placeholder="e.g. Need urgent loading/unloading at site."
              className="w-full px-3.5 py-2.5 bg-slate-950 border border-slate-800 rounded-xl text-xs text-white placeholder-slate-500 outline-none focus:border-amber-500"
            ></textarea>
          </div>

          {/* Financial Breakdown Card */}
          <div className="bg-slate-950 border border-slate-800 p-4 rounded-2xl space-y-2 text-xs">
            <div className="flex justify-between text-slate-400">
              <span>
                {isLoadingUnloading
                  ? `Loading Charges (${numberOfBags} bags × ₹${effectiveLoadingRate}/bag):`
                  : `Labour Charges (${workerCount} worker × ₹${tatkalLabourRate}):`}
              </span>
              <span className="font-bold text-white">₹{labourAmount}</span>
            </div>
            <div className="flex justify-between text-slate-400">
              <span>Mandatory Transportation Charge:</span>
              <span className="font-bold text-white">₹50</span>
            </div>
            <div className="flex justify-between text-amber-400 font-bold">
              <span>⚡ Tatkal Emergency Charge:</span>
              <span>+₹150</span>
            </div>
            <div className="pt-2 border-t border-slate-800 flex justify-between items-center text-sm font-black">
              <span className="text-amber-400">Total Amount Payable:</span>
              <span className="text-xl text-amber-400">₹{totalAmount}</span>
            </div>
          </div>

          {errorMessage && (
            <div className="p-3 bg-rose-950/80 border border-rose-800 text-rose-300 rounded-xl text-xs font-bold flex items-center gap-2">
              <AlertCircle className="w-4 h-4 text-rose-400 shrink-0" />
              <span>{errorMessage}</span>
            </div>
          )}

          {successMessage && (
            <div className="p-3 bg-emerald-950/80 border border-emerald-800 text-emerald-300 rounded-xl text-xs font-bold text-center">
              {successMessage}
            </div>
          )}

        </div>

        {/* Modal Footer CTAs */}
        <div className="p-4 bg-slate-950 border-t border-slate-800 grid grid-cols-2 gap-3">
          <button
            type="button"
            onClick={handleWhatsAppBooking}
            className="py-3 px-4 bg-[#25D366] hover:bg-[#20BD5A] text-white font-extrabold rounded-xl text-xs flex items-center justify-center gap-2 shadow-md transition-all"
          >
            <MessageCircle className="w-4 h-4 fill-current" />
            <span>WhatsApp Tatkal</span>
          </button>

          <button
            type="button"
            onClick={handleDirectSubmit}
            disabled={submitting}
            className="py-3 px-4 bg-gradient-to-r from-amber-500 to-amber-600 hover:from-amber-400 hover:to-amber-500 text-slate-950 font-black rounded-xl text-xs flex items-center justify-center gap-2 shadow-md transition-all"
          >
            <Zap className="w-4 h-4 fill-slate-950" />
            <span>{submitting ? 'Booking...' : 'Book Tatkal Now'}</span>
          </button>
        </div>

      </div>
    </div>
  );
};
