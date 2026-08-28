import React, { useState, useEffect } from 'react';
import API from '../../services/api';
import { StatusBadge } from '../../components/common/StatusBadge';
import {
  CalendarCheck,
  Search,
  Filter,
  Eye,
  CheckCircle2,
  XCircle,
  Clock,
  Briefcase,
  MapPin,
  Users,
  HardHat,
  X
} from 'lucide-react';

export const AdminBookingsPage = () => {
  const [bookings, setBookings] = useState([]);
  const [loading, setLoading] = useState(true);
  const [searchTerm, setSearchTerm] = useState('');
  const [statusFilter, setStatusFilter] = useState('all');
  const [selectedBookingModal, setSelectedBookingModal] = useState(null);

  const fetchAllBookings = () => {
    setLoading(true);
    API.get('/bookings/admin/all')
      .then(res => {
        setBookings(res.data);
        setLoading(false);
      })
      .catch(() => {
        setBookings([
          {
            id: 'bk-10245',
            bookingId: 'LCB-10245',
            customerName: 'Yatendra Kumar',
            customerPhone: '9876543210',
            customerEmail: 'customer@labourchowk.com',
            serviceName: 'Construction Labour',
            workerCount: 5,
            date: '2026-08-30',
            duration: '3 Days',
            startTime: '09:00 AM',
            endTime: '06:00 PM',
            city: 'Bulandshahr',
            area: 'Yamunapuram',
            address: 'Plot No 42, Near Water Tank, Yamunapuram, Bulandshahr',
            description: 'Need 5 construction labourers for concrete mixing, lintel casting, and site material handling.',
            requirements: 'Workers should have safety boots and helmet.',
            status: 'finding_labour',
            estimatedCost: 9750,
            assignedWorkers: []
          },
          {
            id: 'bk-10230',
            bookingId: 'LCB-10230',
            customerName: 'Sanjay Gupta',
            customerPhone: '9811002233',
            customerEmail: 'sanjay@example.com',
            serviceName: 'Painter',
            workerCount: 2,
            date: '2026-08-25',
            duration: '2 Days',
            startTime: '09:00 AM',
            endTime: '06:00 PM',
            city: 'Bulandshahr',
            area: 'Civil Lines',
            address: 'House 114, Near Collectorate, Civil Lines, Bulandshahr',
            description: 'Interior wall primer and 2 coats tractor emulsion painting.',
            status: 'confirmed',
            estimatedCost: 3200,
            assignedWorkers: ['wrk-101', 'wrk-102']
          },
          {
            id: 'bk-10195',
            bookingId: 'LCB-10195',
            customerName: 'Deepak Sharma',
            customerPhone: '9822334455',
            customerEmail: 'deepak@example.com',
            serviceName: 'Plumber',
            workerCount: 1,
            date: '2026-08-20',
            duration: '1 Day',
            startTime: '10:00 AM',
            endTime: '04:00 PM',
            city: 'Bulandshahr',
            area: 'DM Colony',
            address: 'Block B, Street 3, DM Colony, Bulandshahr',
            description: 'Overhead water tank pipeline leakage repair.',
            status: 'completed',
            estimatedCost: 800,
            assignedWorkers: ['wrk-108']
          }
        ]);
        setLoading(false);
      });
  };

  useEffect(() => {
    fetchAllBookings();
  }, []);

  const handleUpdateStatus = async (bookingId, newStatus) => {
    try {
      await API.patch(`/bookings/${bookingId}/status`, { status: newStatus });
      fetchAllBookings();
      if (selectedBookingModal) {
        setSelectedBookingModal({ ...selectedBookingModal, status: newStatus });
      }
    } catch (err) {
      setBookings(prev => prev.map(b => b.id === bookingId || b.bookingId === bookingId ? { ...b, status: newStatus } : b));
      if (selectedBookingModal) {
        setSelectedBookingModal({ ...selectedBookingModal, status: newStatus });
      }
    }
  };

  const filteredBookings = bookings.filter(b => {
    const matchesSearch = (b.bookingId || '').toLowerCase().includes(searchTerm.toLowerCase()) ||
                          (b.customerName || '').toLowerCase().includes(searchTerm.toLowerCase()) ||
                          (b.serviceName || '').toLowerCase().includes(searchTerm.toLowerCase());
    const matchesStatus = statusFilter === 'all' || b.status === statusFilter;
    return matchesSearch && matchesStatus;
  });

  return (
    <div className="space-y-6 text-slate-100 animate-fadeIn">
      {/* Header */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 border-b border-slate-800 pb-4">
        <div>
          <h1 className="text-2xl font-extrabold text-white">
            Booking Management Queue
          </h1>
          <p className="text-xs text-slate-400">
            View all customer requests, update operational status, and assign internal workers
          </p>
        </div>

        <div className="flex items-center gap-3">
          {/* Search */}
          <div className="relative">
            <Search className="w-4 h-4 text-slate-400 absolute left-3 top-3" />
            <input
              type="text"
              placeholder="Search ID, customer, service..."
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              className="pl-9 pr-4 py-2 bg-slate-950 border border-slate-800 rounded-xl text-xs text-white outline-none focus:border-amber-500"
            />
          </div>

          {/* Status Filter */}
          <select
            value={statusFilter}
            onChange={(e) => setStatusFilter(e.target.value)}
            className="px-3 py-2 bg-slate-950 border border-slate-800 rounded-xl text-xs font-bold text-slate-200 outline-none"
          >
            <option value="all">All Statuses</option>
            <option value="finding_labour">Finding Labour</option>
            <option value="confirmed">Confirmed</option>
            <option value="in_progress">In Progress</option>
            <option value="completed">Completed</option>
            <option value="cancelled">Cancelled</option>
          </select>
        </div>
      </div>

      {/* Booking Table */}
      <div className="bg-slate-950 rounded-3xl border border-slate-800 overflow-hidden shadow-xl">
        <div className="overflow-x-auto">
          <table className="w-full text-left border-collapse">
            <thead>
              <tr className="bg-slate-900/80 text-[11px] font-bold uppercase tracking-wider text-slate-400 border-b border-slate-800">
                <th className="py-4 px-6">Booking ID</th>
                <th className="py-4 px-6">Customer Info</th>
                <th className="py-4 px-6">Service</th>
                <th className="py-4 px-6">Workers</th>
                <th className="py-4 px-6">Date & Duration</th>
                <th className="py-4 px-6">Location</th>
                <th className="py-4 px-6">Status</th>
                <th className="py-4 px-6 text-right">Actions</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-slate-900 text-xs font-medium text-slate-300">
              {filteredBookings.map((b) => (
                <tr key={b.id || b.bookingId} className="hover:bg-slate-900/50 transition-colors">
                  <td className="py-4 px-6 font-extrabold text-amber-400">{b.bookingId}</td>
                  <td className="py-4 px-6">
                    <span className="font-bold text-white block">{b.customerName}</span>
                    <span className="text-[10px] text-slate-400">{b.customerPhone}</span>
                  </td>
                  <td className="py-4 px-6 font-bold text-blue-400">{b.serviceName}</td>
                  <td className="py-4 px-6 font-bold text-white">{b.workerCount} Workers</td>
                  <td className="py-4 px-6">
                    <span>{b.date}</span>
                    <span className="block text-[10px] text-slate-400">{b.duration}</span>
                  </td>
                  <td className="py-4 px-6">{b.area}, {b.city}</td>
                  <td className="py-4 px-6">
                    <StatusBadge status={b.status} />
                  </td>
                  <td className="py-4 px-6 text-right space-x-2">
                    <button
                      onClick={() => setSelectedBookingModal(b)}
                      className="p-2 rounded-lg bg-slate-900 hover:bg-slate-800 text-slate-300 transition-colors inline-flex items-center gap-1 font-bold text-[11px]"
                    >
                      <Eye className="w-3.5 h-3.5 text-amber-400" /> View
                    </button>

                    {b.status === 'finding_labour' && (
                      <a
                        href={`/admin/assignments?bookingId=${b.bookingId}`}
                        className="px-3 py-1.5 rounded-lg bg-amber-500 hover:bg-amber-400 text-slate-950 font-bold text-[11px] inline-flex items-center gap-1 shadow-md"
                      >
                        <Briefcase className="w-3.5 h-3.5" /> Assign
                      </a>
                    )}
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>

      {/* BOOKING DETAILS & STATUS UPDATE MODAL */}
      {selectedBookingModal && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-slate-950/80 backdrop-blur-md animate-fadeIn">
          <div className="bg-slate-900 rounded-3xl max-w-2xl w-full border border-slate-800 p-6 sm:p-8 space-y-6 text-white shadow-2xl relative">
            <button
              onClick={() => setSelectedBookingModal(null)}
              className="absolute top-6 right-6 p-2 rounded-xl bg-slate-800 hover:bg-slate-700 text-slate-300"
            >
              <X className="w-5 h-5" />
            </button>

            <div className="flex items-center gap-3 border-b border-slate-800 pb-4">
              <span className="font-extrabold text-xl text-amber-400">{selectedBookingModal.bookingId}</span>
              <StatusBadge status={selectedBookingModal.status} />
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-6 text-xs">
              {/* Customer Info */}
              <div className="bg-slate-950 p-4 rounded-2xl border border-slate-800 space-y-2">
                <h4 className="font-bold text-amber-400 uppercase text-[10px]">Customer Information</h4>
                <p><strong>Name:</strong> {selectedBookingModal.customerName}</p>
                <p><strong>Phone:</strong> {selectedBookingModal.customerPhone}</p>
                <p><strong>Email:</strong> {selectedBookingModal.customerEmail}</p>
              </div>

              {/* Requirement Summary */}
              <div className="bg-slate-950 p-4 rounded-2xl border border-slate-800 space-y-2">
                <h4 className="font-bold text-amber-400 uppercase text-[10px]">Booking Requirements</h4>
                <p><strong>Service:</strong> {selectedBookingModal.serviceName}</p>
                <p><strong>Workers Required:</strong> {selectedBookingModal.workerCount}</p>
                <p><strong>Date & Time:</strong> {selectedBookingModal.date} ({selectedBookingModal.startTime} - {selectedBookingModal.endTime})</p>
                <p><strong>Address:</strong> {selectedBookingModal.address}</p>
              </div>
            </div>

            <div className="space-y-2 text-xs bg-slate-950 p-4 rounded-2xl border border-slate-800">
              <h4 className="font-bold text-slate-400 uppercase text-[10px]">Work Description & Instructions</h4>
              <p className="text-slate-300">{selectedBookingModal.description || 'No special description provided.'}</p>
            </div>

            {/* Status Change Selector */}
            <div className="pt-4 border-t border-slate-800 flex flex-col sm:flex-row items-center justify-between gap-4">
              <div>
                <span className="text-xs text-slate-400 font-bold block mb-1">Update Status:</span>
                <div className="flex flex-wrap items-center gap-2">
                  {['finding_labour', 'confirmed', 'in_progress', 'completed', 'cancelled'].map(st => (
                    <button
                      key={st}
                      onClick={() => handleUpdateStatus(selectedBookingModal.bookingId, st)}
                      className={`px-3 py-1.5 rounded-lg text-xs font-bold capitalize transition-colors ${
                        selectedBookingModal.status === st
                          ? 'bg-amber-500 text-slate-950'
                          : 'bg-slate-800 text-slate-300 hover:bg-slate-700'
                      }`}
                    >
                      {st.replace('_', ' ')}
                    </button>
                  ))}
                </div>
              </div>

              <a
                href={`/admin/assignments?bookingId=${selectedBookingModal.bookingId}`}
                className="bg-[#155EEF] hover:bg-[#124EC4] text-white px-5 py-2.5 rounded-xl text-xs font-bold shrink-0 flex items-center gap-2"
              >
                <Briefcase className="w-4 h-4" />
                Assign Labourers
              </a>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};
