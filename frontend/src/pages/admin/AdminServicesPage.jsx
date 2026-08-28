import React, { useState, useEffect } from 'react';
import API from '../../services/api';
import { Building2, Plus, HardHat, Check, Trash2, Edit } from 'lucide-react';

export const AdminServicesPage = () => {
  const [services, setServices] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    API.get('/services')
      .then(res => {
        setServices(res.data);
        setLoading(false);
      })
      .catch(() => {
        setServices([
          { id: 'srv-1', name: 'General Labour', category: 'majdoor', description: 'General unskilled labour', active: true },
          { id: 'srv-2', name: 'Construction Labour', category: 'majdoor', description: 'Concrete & site work', active: true },
          { id: 'srv-13', name: 'Raj Mistri', category: 'mistri', description: 'Masonry brickwork', active: true }
        ]);
        setLoading(false);
      });
  }, []);

  return (
    <div className="space-y-6 text-slate-100 animate-fadeIn">
      <div className="flex items-center justify-between border-b border-slate-800 pb-4">
        <div>
          <h1 className="text-2xl font-extrabold text-white">Service Management</h1>
          <p className="text-xs text-slate-400">Manage LabourChowk service catalog categories and offerings</p>
        </div>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
        {services.map(s => (
          <div key={s.id || s.name} className="bg-slate-950 p-5 rounded-2xl border border-slate-800 space-y-2">
            <span className="text-[10px] font-bold uppercase text-amber-400 bg-amber-950 px-2 py-0.5 rounded border border-amber-900">
              {s.category}
            </span>
            <h3 className="font-bold text-white text-base">{s.name}</h3>
            <p className="text-xs text-slate-400">{s.description}</p>
          </div>
        ))}
      </div>
    </div>
  );
};
