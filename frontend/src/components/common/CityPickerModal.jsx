import React from 'react';
import { useCity } from '../../context/CityContext';
import { MapPin, X, Check, Building2 } from 'lucide-react';

export const CityPickerModal = () => {
  const { selectedCity, availableCities, changeCity, isCityModalOpen, setIsCityModalOpen } = useCity();

  if (!isCityModalOpen) return null;

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-slate-900/60 backdrop-blur-sm animate-fadeIn">
      <div className="bg-white rounded-2xl shadow-2xl max-w-lg w-full overflow-hidden border border-slate-100 transform transition-all">
        {/* Header */}
        <div className="bg-gradient-to-r from-[#101828] to-[#155EEF] px-6 py-5 text-white flex items-center justify-between">
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 rounded-xl bg-white/10 flex items-center justify-center text-amber-400">
              <MapPin className="w-5 h-5" />
            </div>
            <div>
              <h3 className="text-lg font-bold">Select Your City</h3>
              <p className="text-xs text-blue-100">LabourChowk services are live in these cities</p>
            </div>
          </div>
          <button
            onClick={() => setIsCityModalOpen(false)}
            className="p-2 rounded-lg bg-white/10 hover:bg-white/20 text-white transition-colors"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* City Options List */}
        <div className="p-6 space-y-4">
          <div className="grid grid-cols-1 gap-3">
            {availableCities.map((c) => {
              const isSelected = c.name.toLowerCase() === selectedCity.toLowerCase();
              return (
                <button
                  key={c.name}
                  onClick={() => changeCity(c.name)}
                  className={`p-4 rounded-xl border text-left flex items-start justify-between transition-all ${
                    isSelected
                      ? 'border-[#155EEF] bg-blue-50/70 shadow-sm ring-2 ring-[#155EEF]/20'
                      : 'border-slate-200 hover:border-blue-300 hover:bg-slate-50'
                  }`}
                >
                  <div className="flex items-start gap-3.5">
                    <div className={`p-2.5 rounded-lg ${isSelected ? 'bg-[#155EEF] text-white' : 'bg-slate-100 text-slate-600'}`}>
                      <Building2 className="w-5 h-5" />
                    </div>
                    <div>
                      <div className="flex items-center gap-2">
                        <span className="font-bold text-slate-900">{c.name}</span>
                        <span className="text-xs font-medium px-2 py-0.5 rounded bg-slate-100 text-slate-600">{c.state}</span>
                      </div>
                      <p className="text-xs text-slate-500 mt-1">
                        Coverage: {c.popularAreas.join(', ')}
                      </p>
                    </div>
                  </div>
                  {isSelected && (
                    <div className="w-6 h-6 rounded-full bg-[#155EEF] text-white flex items-center justify-center">
                      <Check className="w-4 h-4" />
                    </div>
                  )}
                </button>
              );
            })}
          </div>

          <div className="bg-amber-50 border border-amber-200 rounded-xl p-3.5 flex items-start gap-3 text-xs text-amber-800">
            <span className="font-bold text-amber-600 text-sm">💡</span>
            <span>More cities across Uttar Pradesh & NCR are being added every week!</span>
          </div>
        </div>

        {/* Footer */}
        <div className="px-6 py-4 bg-slate-50 border-t border-slate-100 flex justify-end">
          <button
            onClick={() => setIsCityModalOpen(false)}
            className="px-5 py-2.5 text-sm font-semibold text-slate-700 bg-white border border-slate-200 rounded-xl hover:bg-slate-100 transition-colors"
          >
            Close
          </button>
        </div>
      </div>
    </div>
  );
};
