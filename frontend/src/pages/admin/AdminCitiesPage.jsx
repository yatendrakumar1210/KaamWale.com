import React, { useState, useEffect } from 'react';
import API from '../../services/api';
import { MapPin, Plus, Check } from 'lucide-react';

export const AdminCitiesPage = () => {
  const [cities, setCities] = useState([]);

  useEffect(() => {
    API.get('/cities')
      .then(res => setCities(res.data))
      .catch(() => setCities([
        { id: 'c-1', name: 'Bulandshahr', state: 'Uttar Pradesh', serviceAreas: ['Civil Lines', 'Yamunapuram', 'DM Colony', 'Awas Vikas'], active: true },
        { id: 'c-2', name: 'Noida', state: 'Uttar Pradesh', serviceAreas: ['Sector 18', 'Sector 62', 'Sector 137'], active: true },
        { id: 'c-3', name: 'Delhi NCR', state: 'Delhi', serviceAreas: ['Connaught Place', 'Okhla', 'Rohini'], active: true }
      ]));
  }, []);

  return (
    <div className="space-y-6 text-slate-100 animate-fadeIn">
      <div className="flex items-center justify-between border-b border-slate-800 pb-4">
        <div>
          <h1 className="text-2xl font-extrabold text-white">City & Location Management</h1>
          <p className="text-xs text-slate-400">Manage operational cities starting with Bulandshahr, UP</p>
        </div>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        {cities.map(c => (
          <div key={c.name} className="bg-slate-950 p-6 rounded-3xl border border-slate-800 space-y-3">
            <div className="flex items-center justify-between">
              <h3 className="font-bold text-white text-lg flex items-center gap-2">
                <MapPin className="w-5 h-5 text-amber-400" /> {c.name}
              </h3>
              <span className="bg-emerald-950 text-emerald-400 text-[10px] font-bold px-2 py-0.5 rounded uppercase">Active</span>
            </div>
            <p className="text-xs text-slate-400 font-semibold">{c.state}</p>
            <div className="pt-2 border-t border-slate-900 text-xs">
              <span className="text-slate-500 font-bold block mb-1">Service Areas:</span>
              <div className="flex flex-wrap gap-1">
                {c.serviceAreas.map(a => (
                  <span key={a} className="bg-slate-900 text-slate-300 px-2 py-0.5 rounded text-[11px] border border-slate-800">
                    {a}
                  </span>
                ))}
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};
