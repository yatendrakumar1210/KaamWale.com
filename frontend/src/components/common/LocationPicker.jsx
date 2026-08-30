import React, { useState } from 'react';
import { MapPin, Navigation, Home, Search, RefreshCw, CheckCircle2, AlertTriangle, X } from 'lucide-react';

export const LocationPicker = ({ selectedLocation, onSelectLocation }) => {
  const [activeTab, setActiveTab] = useState('current'); // 'current' | 'home' | 'search'
  const [detecting, setDetecting] = useState(false);
  const [gpsError, setGpsError] = useState('');
  const [tempGpsLocation, setTempGpsLocation] = useState(null);

  // Home location state
  const [homeAddress, setHomeAddress] = useState(
    localStorage.getItem('kaamwale_home_address') || ''
  );
  const [homeLat, setHomeLat] = useState(
    localStorage.getItem('kaamwale_home_lat') || '28.4089'
  );
  const [homeLng, setHomeLng] = useState(
    localStorage.getItem('kaamwale_home_lng') || '77.8498'
  );

  // Search location state
  const [searchInput, setSearchInput] = useState('');
  const [searchLat, setSearchLat] = useState('');
  const [searchLng, setSearchLng] = useState('');

  // 1. Detect Current GPS Location
  const handleDetectGps = () => {
    setDetecting(true);
    setGpsError('');
    setTempGpsLocation(null);

    if (!navigator.geolocation) {
      setGpsError('आपका ब्राउज़र GPS लोकेशन सपोर्ट नहीं करता है।');
      setDetecting(false);
      return;
    }

    navigator.geolocation.getCurrentPosition(
      (position) => {
        const lat = position.coords.latitude.toFixed(6);
        const lng = position.coords.longitude.toFixed(6);
        const detectedLoc = {
          address: 'Bulandshahr, Uttar Pradesh (GPS Detected)',
          latitude: parseFloat(lat),
          longitude: parseFloat(lng)
        };
        setTempGpsLocation(detectedLoc);
        setDetecting(false);
      },
      (err) => {
        setDetecting(false);
        if (err.code === err.PERMISSION_DENIED) {
          setGpsError('लोकेशन परमिशन अमान्य है। कृपया मैनुअल एड्रेस दर्ज करें।');
        } else if (err.code === err.POSITION_UNAVAILABLE) {
          setGpsError('GPS स्थिति अनुपलब्ध है।');
        } else {
          setGpsError('लोकेशन ट्रैक करने में विफल। कृपया पुनः प्रयास करें।');
        }
      },
      { enableHighAccuracy: true, timeout: 10000, maximumAge: 0 }
    );
  };

  const confirmGpsLocation = () => {
    if (tempGpsLocation) {
      onSelectLocation(tempGpsLocation);
    }
  };

  // 2. Save and select Home Location
  const handleSelectHomeLocation = () => {
    const addr = homeAddress.trim() || 'Home Address, Bulandshahr';
    const lat = parseFloat(homeLat) || 28.4089;
    const lng = parseFloat(homeLng) || 77.8498;

    localStorage.setItem('kaamwale_home_address', addr);
    localStorage.setItem('kaamwale_home_lat', String(lat));
    localStorage.setItem('kaamwale_home_lng', String(lng));

    onSelectLocation({
      address: addr,
      latitude: lat,
      longitude: lng
    });
  };

  // 3. Search / Manual Location entry
  const handleSelectSearchLocation = () => {
    if (!searchInput.trim()) return;

    // Use default Bulandshahr coords if lat/lng not specified manually
    const lat = parseFloat(searchLat) || 28.4089;
    const lng = parseFloat(searchLng) || 77.8498;

    const formattedAddr = searchInput.includes('Bulandshahr')
      ? searchInput.trim()
      : `${searchInput.trim()}, Bulandshahr, Uttar Pradesh`;

    onSelectLocation({
      address: formattedAddr,
      latitude: lat,
      longitude: lng
    });
  };

  // If a location has been confirmed and selected, render Confirmation UI
  if (selectedLocation && selectedLocation.address) {
    return (
      <div className="bg-[#F0FDF4] border border-[#B1E5C9] p-4 rounded-2xl text-slate-900 space-y-3 shadow-sm">
        <div className="flex items-start justify-between">
          <div className="flex items-center gap-2">
            <MapPin className="w-5 h-5 text-emerald-600 flex-shrink-0" />
            <div>
              <span className="text-[10px] font-extrabold text-emerald-700 uppercase tracking-wider block">
                📍 Work Location Confirmed (काम की जगह)
              </span>
              <h4 className="text-sm font-bold text-slate-900 leading-snug">
                {selectedLocation.address}
              </h4>
            </div>
          </div>
          <button
            type="button"
            onClick={() => onSelectLocation(null)}
            className="px-3 py-1 bg-white border border-emerald-300 hover:bg-emerald-50 text-emerald-800 text-xs font-bold rounded-lg transition-colors shadow-2xs"
          >
            Change Location
          </button>
        </div>

        <div className="flex items-center gap-4 text-[11px] text-slate-600 bg-white/70 px-3 py-1.5 rounded-xl border border-emerald-100">
          <span><strong>Latitude:</strong> {selectedLocation.latitude || '28.4089'}</span>
          <span><strong>Longitude:</strong> {selectedLocation.longitude || '77.8498'}</span>
        </div>
      </div>
    );
  }

  return (
    <div className="space-y-3 bg-slate-50 p-4 rounded-2xl border border-slate-200">
      <label className="block text-xs font-extrabold uppercase tracking-wider text-slate-700">
        📍 Select Work Location (काम की जगह चुनें)
      </label>

      {/* Tabs */}
      <div className="grid grid-cols-3 gap-1.5 bg-slate-200/80 p-1 rounded-xl text-xs font-bold">
        <button
          type="button"
          onClick={() => setActiveTab('current')}
          className={`py-2 rounded-lg flex items-center justify-center gap-1 transition-all ${
            activeTab === 'current'
              ? 'bg-white text-[#155EEF] shadow-sm'
              : 'text-slate-600 hover:text-slate-900'
          }`}
        >
          <Navigation className="w-3.5 h-3.5" />
          <span>GPS</span>
        </button>

        <button
          type="button"
          onClick={() => setActiveTab('home')}
          className={`py-2 rounded-lg flex items-center justify-center gap-1 transition-all ${
            activeTab === 'home'
              ? 'bg-white text-[#155EEF] shadow-sm'
              : 'text-slate-600 hover:text-slate-900'
          }`}
        >
          <Home className="w-3.5 h-3.5" />
          <span>Saved</span>
        </button>

        <button
          type="button"
          onClick={() => setActiveTab('search')}
          className={`py-2 rounded-lg flex items-center justify-center gap-1 transition-all ${
            activeTab === 'search'
              ? 'bg-white text-[#155EEF] shadow-sm'
              : 'text-slate-600 hover:text-slate-900'
          }`}
        >
          <Search className="w-3.5 h-3.5" />
          <span>Search</span>
        </button>
      </div>

      {/* TAB 1: Use Current Location */}
      {activeTab === 'current' && (
        <div className="space-y-3 bg-white p-3.5 rounded-xl border border-slate-200">
          <p className="text-xs text-slate-600 leading-snug">
            अपने वर्तमान GPS स्थान का उपयोग करें यदि काम इसी जगह पर होना है।
          </p>

          {!tempGpsLocation ? (
            <button
              type="button"
              onClick={handleDetectGps}
              disabled={detecting}
              className="w-full py-2.5 px-4 bg-[#155EEF] hover:bg-[#1254D4] disabled:bg-blue-300 text-white text-xs font-bold rounded-xl shadow-sm flex items-center justify-center gap-2 transition-all active:scale-98"
            >
              {detecting ? (
                <>
                  <RefreshCw className="w-4 h-4 animate-spin" />
                  <span>Detecting location…</span>
                </>
              ) : (
                <>
                  <Navigation className="w-4 h-4" />
                  <span>Use Current Location (GPS)</span>
                </>
              )}
            </button>
          ) : (
            <div className="bg-blue-50 border border-blue-200 p-3 rounded-xl space-y-2">
              <div className="flex items-center gap-2 text-xs font-bold text-blue-900">
                <CheckCircle2 className="w-4 h-4 text-emerald-600" />
                <span>GPS Location Detected</span>
              </div>
              <p className="text-xs text-slate-700">
                Lat: <strong>{tempGpsLocation.latitude}</strong>, Lng: <strong>{tempGpsLocation.longitude}</strong>
              </p>
              <button
                type="button"
                onClick={confirmGpsLocation}
                className="w-full py-2 bg-emerald-600 hover:bg-emerald-700 text-white text-xs font-bold rounded-lg shadow-sm"
              >
                Confirm This Work Location
              </button>
            </div>
          )}

          {gpsError && (
            <div className="bg-amber-50 border border-amber-200 p-2.5 rounded-xl flex items-center gap-2 text-xs text-amber-800">
              <AlertTriangle className="w-4 h-4 text-amber-600 flex-shrink-0" />
              <span>{gpsError}</span>
            </div>
          )}
        </div>
      )}

      {/* TAB 2: Home / Saved Location */}
      {activeTab === 'home' && (
        <div className="space-y-3 bg-white p-3.5 rounded-xl border border-slate-200">
          <p className="text-xs text-slate-600 leading-snug">
            घर या सहेजे गए स्थान पर मजदूर बुलाने के लिए इसका चयन करें।
          </p>

          <input
            type="text"
            placeholder="घर/साइट का पता (Address)"
            value={homeAddress}
            onChange={(e) => setHomeAddress(e.target.value)}
            className="w-full px-3 py-2 text-xs border border-slate-300 rounded-xl focus:ring-2 focus:ring-[#155EEF] outline-none"
          />

          <div className="grid grid-cols-2 gap-2 text-xs">
            <input
              type="text"
              placeholder="Latitude (e.g. 28.4089)"
              value={homeLat}
              onChange={(e) => setHomeLat(e.target.value)}
              className="w-full px-3 py-1.5 border border-slate-300 rounded-lg outline-none"
            />
            <input
              type="text"
              placeholder="Longitude (e.g. 77.8498)"
              value={homeLng}
              onChange={(e) => setHomeLng(e.target.value)}
              className="w-full px-3 py-1.5 border border-slate-300 rounded-lg outline-none"
            />
          </div>

          <button
            type="button"
            onClick={handleSelectHomeLocation}
            className="w-full py-2.5 px-4 bg-emerald-600 hover:bg-emerald-700 text-white text-xs font-bold rounded-xl shadow-sm flex items-center justify-center gap-1.5 transition-all"
          >
            <Home className="w-4 h-4" />
            <span>Select Home Location</span>
          </button>
        </div>
      )}

      {/* TAB 3: Search / Select Location */}
      {activeTab === 'search' && (
        <div className="space-y-3 bg-white p-3.5 rounded-xl border border-slate-200">
          <p className="text-xs text-slate-600 leading-snug">
            यदि आप ऑफिस में हैं और घर/दुकान/साइट का पता दर्ज करना चाहते हैं:
          </p>

          <div className="relative">
            <MapPin className="w-4 h-4 text-slate-400 absolute left-3 top-3" />
            <input
              type="text"
              placeholder="एरिया, दुकान या साइट का नाम (e.g. Yamunapuram, Sector 4)"
              value={searchInput}
              onChange={(e) => setSearchInput(e.target.value)}
              className="w-full pl-9 pr-3 py-2 text-xs border border-slate-300 rounded-xl focus:ring-2 focus:ring-[#155EEF] outline-none"
            />
          </div>

          <button
            type="button"
            onClick={handleSelectSearchLocation}
            disabled={!searchInput.trim()}
            className="w-full py-2.5 px-4 bg-[#155EEF] hover:bg-[#1254D4] disabled:bg-slate-300 text-white text-xs font-bold rounded-xl shadow-sm flex items-center justify-center gap-1.5 transition-all"
          >
            <Search className="w-4 h-4" />
            <span>Use Search Location</span>
          </button>
        </div>
      )}
    </div>
  );
};
