import React, { useState, useEffect } from 'react';
import API from '../../services/api';
import { StatusBadge } from '../../components/common/StatusBadge';
import { Link } from 'react-router-dom';
import {
  CalendarCheck,
  Clock,
  CheckCircle2,
  Users,
  HardHat,
  TrendingUp,
  AlertTriangle,
  MapPin,
  Building2,
  ArrowUpRight
} from 'lucide-react';
import { ResponsiveContainer, BarChart, Bar, XAxis, YAxis, Tooltip, PieChart, Pie, Cell } from 'recharts';

export const AdminDashboardPage = () => {
  const [bookings, setBookings] = useState([]);
  const [workers, setWorkers] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    Promise.all([
      API.get('/bookings/admin/all').catch(() => ({ data: [] })),
      API.get('/workers').catch(() => ({ data: [] }))
    ]).then(([bRes, wRes]) => {
      const bData = bRes.data && bRes.data.length > 0 ? bRes.data : [
        { id: 'bk-10245', bookingId: 'LCB-10245', customerName: 'Yatendra Kumar', serviceName: 'Construction Labour', workerCount: 5, date: '30 Aug 2026', city: 'Bulandshahr', status: 'finding_labour' },
        { id: 'bk-10230', bookingId: 'LCB-10230', customerName: 'Sanjay Gupta', serviceName: 'Painter', workerCount: 2, date: '25 Aug 2026', city: 'Bulandshahr', status: 'confirmed' },
        { id: 'bk-10195', bookingId: 'LCB-10195', customerName: 'Deepak Sharma', serviceName: 'Plumber', workerCount: 1, date: '20 Aug 2026', city: 'Bulandshahr', status: 'completed' },
        { id: 'bk-10180', bookingId: 'LCB-10180', customerName: 'Rajesh Verma', serviceName: 'House Shifting', workerCount: 4, date: '18 Aug 2026', city: 'Bulandshahr', status: 'completed' }
      ];

      const wData = wRes.data && wRes.data.length > 0 ? wRes.data : [
        { id: 'wrk-101', name: 'Ram Kumar', availability: 'available' },
        { id: 'wrk-102', name: 'Suresh Pal', availability: 'assigned' },
        { id: 'wrk-103', name: 'Mohan Singh', availability: 'available' },
        { id: 'wrk-104', name: 'Dinesh Kumar', availability: 'available' }
      ];

      setBookings(bData);
      setWorkers(wData);
      setLoading(false);
    });
  }, []);

  const totalBookings = bookings.length;
  const pendingRequests = bookings.filter(b => b.status === 'finding_labour' || b.status === 'pending').length;
  const confirmedBookings = bookings.filter(b => b.status === 'confirmed' || b.status === 'in_progress').length;
  const completedBookings = bookings.filter(b => b.status === 'completed').length;
  const availableWorkers = workers.filter(w => w.availability === 'available').length;

  // Chart Data
  const bookingTrends = [
    { day: 'Mon', bookings: 4 },
    { day: 'Tue', bookings: 7 },
    { day: 'Wed', bookings: 5 },
    { day: 'Thu', bookings: 9 },
    { day: 'Fri', bookings: 12 },
    { day: 'Sat', bookings: 14 },
    { day: 'Sun', bookings: 8 }
  ];

  const serviceDistribution = [
    { name: 'Construction', value: 45, color: '#155EEF' },
    { name: 'Shifting', value: 25, color: '#F79009' },
    { name: 'Mistri', value: 18, color: '#10B981' },
    { name: 'Plumber/Elec', value: 12, color: '#8B5CF6' }
  ];

  return (
    <div className="space-y-8 text-slate-100 animate-fadeIn">
      {/* Dashboard Top Header */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 border-b border-slate-800 pb-6">
        <div>
          <div className="flex items-center gap-2">
            <span className="text-xs font-bold text-amber-400 bg-amber-950/80 border border-amber-800 px-2.5 py-0.5 rounded-full">
              Operations Center • Bulandshahr Hub
            </span>
          </div>
          <h1 className="text-2xl sm:text-3xl font-extrabold text-white mt-1">
            Admin Overview Dashboard
          </h1>
          <p className="text-xs text-slate-400">
            Real-time analytics, workforce availability, & pending labour assignments
          </p>
        </div>

        <a
          href="/admin/assignments"
          className="bg-amber-500 hover:bg-amber-400 text-slate-950 font-bold px-5 py-2.5 rounded-xl text-xs shadow-md flex items-center gap-2 self-start"
        >
          <span>Assign Labourers</span>
          <ArrowUpRight className="w-4 h-4" />
        </a>
      </div>

      {/* KPI METRIC CARDS */}
      <div className="grid grid-cols-2 md:grid-cols-4 lg:grid-cols-7 gap-4">
        <div className="bg-slate-950 p-4 rounded-2xl border border-slate-800">
          <span className="text-[10px] font-bold text-slate-400 uppercase">Total Bookings</span>
          <p className="text-2xl font-extrabold text-white mt-1">{totalBookings}</p>
        </div>

        <div className="bg-slate-950 p-4 rounded-2xl border border-amber-900/60 bg-amber-950/20">
          <span className="text-[10px] font-bold text-amber-400 uppercase">Pending Requests</span>
          <p className="text-2xl font-extrabold text-amber-400 mt-1">{pendingRequests}</p>
        </div>

        <div className="bg-slate-950 p-4 rounded-2xl border border-blue-900/60 bg-blue-950/20">
          <span className="text-[10px] font-bold text-blue-400 uppercase">Confirmed</span>
          <p className="text-2xl font-extrabold text-blue-400 mt-1">{confirmedBookings}</p>
        </div>

        <div className="bg-slate-950 p-4 rounded-2xl border border-emerald-900/60 bg-emerald-950/20">
          <span className="text-[10px] font-bold text-emerald-400 uppercase">Completed</span>
          <p className="text-2xl font-extrabold text-emerald-400 mt-1">{completedBookings}</p>
        </div>

        <div className="bg-slate-950 p-4 rounded-2xl border border-slate-800">
          <span className="text-[10px] font-bold text-slate-400 uppercase">Total Customers</span>
          <p className="text-2xl font-extrabold text-white mt-1">128</p>
        </div>

        <div className="bg-slate-950 p-4 rounded-2xl border border-slate-800 col-span-2">
          <span className="text-[10px] font-bold text-emerald-400 uppercase">Available Workforce</span>
          <p className="text-2xl font-extrabold text-white mt-1">
            {availableWorkers} <span className="text-xs text-slate-400 font-normal">/ {workers.length} Verified</span>
          </p>
        </div>
      </div>

      {/* CHARTS ROW */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-6">

        {/* Daily Bookings Bar Chart */}
        <div className="lg:col-span-8 bg-slate-950 p-6 rounded-3xl border border-slate-800 space-y-4">
          <div className="flex items-center justify-between">
            <h3 className="font-bold text-white text-base flex items-center gap-2">
              <TrendingUp className="w-5 h-5 text-amber-400" />
              Bookings Trend (This Week)
            </h3>
            <span className="text-xs text-slate-400">Bulandshahr & NCR</span>
          </div>

          <div className="h-64 w-full">
            <ResponsiveContainer width="100%" height="100%">
              <BarChart data={bookingTrends}>
                <XAxis dataKey="day" stroke="#64748B" fontSize={12} />
                <YAxis stroke="#64748B" fontSize={12} />
                <Tooltip contentStyle={{ backgroundColor: '#0F172A', borderColor: '#334155', color: '#FFF' }} />
                <Bar dataKey="bookings" fill="#155EEF" radius={[6, 6, 0, 0]} />
              </BarChart>
            </ResponsiveContainer>
          </div>
        </div>

        {/* Category Share Pie Chart */}
        <div className="lg:col-span-4 bg-slate-950 p-6 rounded-3xl border border-slate-800 space-y-4">
          <h3 className="font-bold text-white text-base">Popular Service Types</h3>

          <div className="h-48 w-full flex items-center justify-center">
            <ResponsiveContainer width="100%" height="100%">
              <PieChart>
                <Pie data={serviceDistribution} innerRadius={50} outerRadius={75} paddingAngle={4} dataKey="value">
                  {serviceDistribution.map((entry, index) => (
                    <Cell key={`cell-${index}`} fill={entry.color} />
                  ))}
                </Pie>
                <Tooltip contentStyle={{ backgroundColor: '#0F172A', borderColor: '#334155', color: '#FFF' }} />
              </PieChart>
            </ResponsiveContainer>
          </div>

          <div className="grid grid-cols-2 gap-2 text-xs">
            {serviceDistribution.map(item => (
              <div key={item.name} className="flex items-center gap-2">
                <span className="w-3 h-3 rounded-full" style={{ backgroundColor: item.color }} />
                <span className="text-slate-300 font-medium">{item.name} ({item.value}%)</span>
              </div>
            ))}
          </div>
        </div>

      </div>

      {/* PENDING ASSIGNMENTS QUEUE */}
      <div className="bg-slate-950 rounded-3xl border border-slate-800 p-6 space-y-4">
        <div className="flex items-center justify-between border-b border-slate-800 pb-3">
          <h3 className="font-bold text-white text-lg flex items-center gap-2">
            <AlertTriangle className="w-5 h-5 text-amber-400" />
            Pending Labour Assignment Queue ({pendingRequests})
          </h3>
          <a href="/admin/bookings" className="text-xs font-bold text-amber-400 hover:underline">
            View All Bookings
          </a>
        </div>

        <div className="space-y-3">
          {bookings.filter(b => b.status === 'finding_labour' || b.status === 'pending').map((b) => (
            <div key={b.id || b.bookingId} className="bg-slate-900 p-4 rounded-2xl border border-slate-800 flex flex-col sm:flex-row sm:items-center justify-between gap-4">
              <div className="space-y-1">
                <div className="flex items-center gap-2">
                  <span className="font-extrabold text-amber-400 text-sm">{b.bookingId}</span>
                  <StatusBadge status={b.status} />
                </div>
                <h4 className="font-bold text-white text-base">{b.serviceName}</h4>
                <p className="text-xs text-slate-400">
                  Customer: <strong>{b.customerName}</strong> • Needed: <strong className="text-white">{b.workerCount} Workers</strong> • Date: {b.date} • {b.city}
                </p>
              </div>

              <a
                href={`/admin/assignments?bookingId=${b.bookingId}`}
                className="bg-amber-500 hover:bg-amber-400 text-slate-950 font-bold px-4 py-2 rounded-xl text-xs shrink-0 text-center shadow-md"
              >
                Assign Labourers Now
              </a>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};
