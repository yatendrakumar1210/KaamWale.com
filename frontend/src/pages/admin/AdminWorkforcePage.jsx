import React, { useState, useEffect } from 'react';
import API from '../../services/api';
import {
  HardHat,
  Plus,
  Search,
  CheckCircle2,
  Clock,
  Phone,
  ShieldCheck,
  UserCheck,
  MapPin,
  Star,
  X
} from 'lucide-react';

export const AdminWorkforcePage = () => {
  const [workers, setWorkers] = useState([]);
  const [loading, setLoading] = useState(true);
  const [searchTerm, setSearchTerm] = useState('');
  const [isAddModalOpen, setIsAddModalOpen] = useState(false);

  const [newWorker, setNewWorker] = useState({
    name: '',
    phone: '',
    skills: 'Construction Labour, Brick Work',
    experienceYears: 4,
    city: 'Bulandshahr',
    serviceAreas: 'Civil Lines, Yamunapuram',
    dailyRate: 650
  });

  const fetchWorkers = () => {
    setLoading(true);
    API.get('/workers')
      .then(res => {
        setWorkers(res.data);
        setLoading(false);
      })
      .catch(() => {
        setWorkers([
          { id: 'wrk-101', workerId: 'LCW-801', name: 'Ram Kumar', phone: '9812345671', skills: ['Construction Labour', 'Brick Work'], experienceYears: 6, city: 'Bulandshahr', serviceAreas: ['Civil Lines', 'Yamunapuram'], availability: 'available', verificationStatus: 'verified', dailyRate: 650 },
          { id: 'wrk-102', workerId: 'LCW-802', name: 'Suresh Pal', phone: '9812345672', skills: ['Loading / Unloading', 'House Shifting'], experienceYears: 4, city: 'Bulandshahr', serviceAreas: ['DM Colony', 'Industrial Area'], availability: 'assigned', verificationStatus: 'verified', dailyRate: 600 },
          { id: 'wrk-103', workerId: 'LCW-803', name: 'Mohan Singh Mistri', phone: '9812345673', skills: ['Raj Mistri', 'Brick Work', 'Plaster Work'], experienceYears: 12, city: 'Bulandshahr', serviceAreas: ['Yamunapuram'], availability: 'available', verificationStatus: 'verified', dailyRate: 950 },
          { id: 'wrk-104', workerId: 'LCW-804', name: 'Dinesh Kumar', phone: '9812345674', skills: ['Construction Labour', 'Digging / Excavation'], experienceYears: 5, city: 'Bulandshahr', serviceAreas: ['Bhoor', 'Awas Vikas'], availability: 'available', verificationStatus: 'verified', dailyRate: 650 },
          { id: 'wrk-105', workerId: 'LCW-805', name: 'Vikram Chauhan', phone: '9812345675', skills: ['Loading / Unloading', 'Factory Labour'], experienceYears: 3, city: 'Bulandshahr', serviceAreas: ['Industrial Area'], availability: 'assigned', verificationStatus: 'verified', dailyRate: 600 }
        ]);
        setLoading(false);
      });
  };

  useEffect(() => {
    fetchWorkers();
  }, []);

  const handleAddWorkerSubmit = async (e) => {
    e.preventDefault();
    try {
      await API.post('/workers', {
        ...newWorker,
        skills: newWorker.skills.split(',').map(s => s.trim()),
        serviceAreas: newWorker.serviceAreas.split(',').map(s => s.trim())
      });
      fetchWorkers();
    } catch (err) {
      const added = {
        id: `wrk-${Date.now()}`,
        workerId: `LCW-${workers.length + 809}`,
        name: newWorker.name,
        phone: newWorker.phone,
        skills: newWorker.skills.split(',').map(s => s.trim()),
        experienceYears: newWorker.experienceYears,
        city: newWorker.city,
        serviceAreas: newWorker.serviceAreas.split(',').map(s => s.trim()),
        availability: 'available',
        verificationStatus: 'verified',
        dailyRate: newWorker.dailyRate
      };
      setWorkers(prev => [...prev, added]);
    }
    setIsAddModalOpen(false);
    setNewWorker({ name: '', phone: '', skills: 'Construction Labour', experienceYears: 4, city: 'Bulandshahr', serviceAreas: 'Civil Lines', dailyRate: 650 });
  };

  const filteredWorkers = workers.filter(w =>
    w.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
    w.workerId.toLowerCase().includes(searchTerm.toLowerCase()) ||
    w.skills.some(s => s.toLowerCase().includes(searchTerm.toLowerCase()))
  );

  return (
    <div className="space-y-6 text-slate-100 animate-fadeIn">
      {/* Header */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 border-b border-slate-800 pb-4">
        <div>
          <div className="flex items-center gap-2">
            <span className="text-xs font-bold text-emerald-400 bg-emerald-950 border border-emerald-800 px-2.5 py-0.5 rounded-full">
              🔒 Internal Ops Directory Only
            </span>
          </div>
          <h1 className="text-2xl font-extrabold text-white mt-1">
            Workforce Management Directory
          </h1>
          <p className="text-xs text-slate-400">
            Internal list of verified labourers, skills, and availability status (Never exposed to customers)
          </p>
        </div>

        <div className="flex items-center gap-3">
          <div className="relative">
            <Search className="w-4 h-4 text-slate-400 absolute left-3 top-3" />
            <input
              type="text"
              placeholder="Search worker, skill..."
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              className="pl-9 pr-4 py-2 bg-slate-950 border border-slate-800 rounded-xl text-xs text-white outline-none"
            />
          </div>

          <button
            onClick={() => setIsAddModalOpen(true)}
            className="bg-amber-500 hover:bg-amber-400 text-slate-950 font-bold px-4 py-2 rounded-xl text-xs flex items-center gap-1.5 shadow-md"
          >
            <Plus className="w-4 h-4 text-slate-950" />
            <span>Add Worker</span>
          </button>
        </div>
      </div>

      {/* Workers Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {filteredWorkers.map((w) => (
          <div key={w.id || w.workerId} className="bg-slate-950 p-6 rounded-3xl border border-slate-800 space-y-4 shadow-lg hover:border-slate-700 transition-all">
            <div className="flex items-start justify-between">
              <div className="flex items-center gap-3">
                <div className="w-12 h-12 rounded-2xl bg-amber-500/10 border border-amber-500/20 text-amber-400 flex items-center justify-center font-extrabold text-sm">
                  {w.name.charAt(0)}
                </div>
                <div>
                  <span className="text-[10px] font-bold text-amber-400 block">{w.workerId}</span>
                  <h3 className="font-bold text-white text-base">{w.name}</h3>
                  <span className="text-xs text-slate-400 flex items-center gap-1 mt-0.5">
                    <Phone className="w-3 h-3 text-slate-500" /> {w.phone}
                  </span>
                </div>
              </div>

              <span className={`px-2.5 py-0.5 rounded-full text-[10px] font-bold uppercase ${
                w.availability === 'available'
                  ? 'bg-emerald-950 text-emerald-400 border border-emerald-800'
                  : 'bg-amber-950 text-amber-400 border border-amber-800'
              }`}>
                {w.availability}
              </span>
            </div>

            {/* Skills Pills */}
            <div className="space-y-1.5">
              <span className="text-[10px] font-bold text-slate-500 uppercase tracking-wider block">Skills & Trades</span>
              <div className="flex flex-wrap gap-1.5">
                {w.skills.map(s => (
                  <span key={s} className="bg-slate-900 text-slate-300 px-2.5 py-1 rounded-lg text-xs font-semibold border border-slate-800">
                    {s}
                  </span>
                ))}
              </div>
            </div>

            <div className="grid grid-cols-2 gap-2 text-xs pt-2 border-t border-slate-900 text-slate-400">
              <div>
                <span>Experience:</span> <strong className="text-white">{w.experienceYears} Years</strong>
              </div>
              <div>
                <span>Daily Rate:</span> <strong className="text-amber-400">₹{w.dailyRate}/day</strong>
              </div>
              <div className="col-span-2">
                <span>Coverage:</span> <strong className="text-slate-300">{w.serviceAreas.join(', ')}</strong>
              </div>
            </div>
          </div>
        ))}
      </div>

      {/* ADD WORKER MODAL */}
      {isAddModalOpen && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-slate-950/80 backdrop-blur-md animate-fadeIn">
          <div className="bg-slate-900 rounded-3xl max-w-md w-full p-6 border border-slate-800 space-y-4 text-white shadow-2xl relative">
            <div className="flex items-center justify-between border-b border-slate-800 pb-3">
              <h3 className="font-extrabold text-lg text-white">Add Internal Worker</h3>
              <button onClick={() => setIsAddModalOpen(false)} className="p-1 rounded-lg bg-slate-800 text-slate-400">
                <X className="w-5 h-5" />
              </button>
            </div>

            <form onSubmit={handleAddWorkerSubmit} className="space-y-3 text-xs">
              <div>
                <label className="block font-bold text-slate-400 mb-1">Full Name</label>
                <input
                  type="text"
                  required
                  value={newWorker.name}
                  onChange={(e) => setNewWorker({ ...newWorker, name: e.target.value })}
                  placeholder="Worker name"
                  className="w-full p-3 rounded-xl bg-slate-950 border border-slate-800 text-white outline-none"
                />
              </div>

              <div>
                <label className="block font-bold text-slate-400 mb-1">Phone Number</label>
                <input
                  type="tel"
                  required
                  value={newWorker.phone}
                  onChange={(e) => setNewWorker({ ...newWorker, phone: e.target.value })}
                  placeholder="10-digit phone"
                  className="w-full p-3 rounded-xl bg-slate-950 border border-slate-800 text-white outline-none"
                />
              </div>

              <div>
                <label className="block font-bold text-slate-400 mb-1">Skills (Comma separated)</label>
                <input
                  type="text"
                  required
                  value={newWorker.skills}
                  onChange={(e) => setNewWorker({ ...newWorker, skills: e.target.value })}
                  placeholder="Construction Labour, Brick Work"
                  className="w-full p-3 rounded-xl bg-slate-950 border border-slate-800 text-white outline-none"
                />
              </div>

              <div className="grid grid-cols-2 gap-3">
                <div>
                  <label className="block font-bold text-slate-400 mb-1">Experience (Years)</label>
                  <input
                    type="number"
                    value={newWorker.experienceYears}
                    onChange={(e) => setNewWorker({ ...newWorker, experienceYears: e.target.value })}
                    className="w-full p-3 rounded-xl bg-slate-950 border border-slate-800 text-white outline-none"
                  />
                </div>
                <div>
                  <label className="block font-bold text-slate-400 mb-1">Daily Wage (₹)</label>
                  <input
                    type="number"
                    value={newWorker.dailyRate}
                    onChange={(e) => setNewWorker({ ...newWorker, dailyRate: e.target.value })}
                    className="w-full p-3 rounded-xl bg-slate-950 border border-slate-800 text-white outline-none"
                  />
                </div>
              </div>

              <button
                type="submit"
                className="w-full bg-amber-500 hover:bg-amber-400 text-slate-950 font-extrabold py-3 rounded-xl text-sm shadow-md mt-2"
              >
                Save Worker Profile
              </button>
            </form>
          </div>
        </div>
      )}
    </div>
  );
};
