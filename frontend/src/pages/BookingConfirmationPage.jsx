import React, { useEffect, useState } from 'react';
import { useParams, Link, useLocation } from 'react-router-dom';
import API from '../services/api';
import { StatusBadge } from '../components/common/StatusBadge';
import {
  CheckCircle,
  Clock,
  ShieldCheck,
  MapPin,
  Calendar,
  Users,
  HardHat,
  ArrowRight,
  EyeOff
} from 'lucide-react';

export const BookingConfirmationPage = () => {
  const { id } = useParams();
  const location = useLocation();
  const [booking, setBooking] = useState(location.state?.booking || null);
  const [loading, setLoading] = useState(!booking);

  useEffect(() => {
    if (!booking && id) {
      API.get(`/bookings/${id}`)
        .then(res => {
          setBooking(res.data);
          setLoading(false);
        })
        .catch(() => {
          // Fallback mock booking detail
          setBooking({
            bookingId: id || 'LCB-2026-001025',
            serviceName: 'Construction Labour',
            workerCount: 5,
            date: '30 August 2026',
            duration: '3 Days',
            startTime: '09:00 AM',
            endTime: '06:00 PM',
            city: 'Bulandshahr',
            area: 'Yamunapuram',
            address: 'Plot No 42, Near Water Tank, Yamunapuram, Bulandshahr',
            status: 'finding_labour',
            estimatedCost: 9750
          });
          setLoading(false);
        });
    }
  }, [id, booking]);

  if (loading) {
    return (
      <div className="max-w-xl mx-auto py-20 text-center">
        <Clock className="w-10 h-10 animate-spin text-[#155EEF] mx-auto mb-3" />
        <p className="text-slate-600 font-medium">Loading booking confirmation...</p>
      </div>
    );
  }

  return (
    <div className="max-w-2xl mx-auto px-4 py-12 space-y-8 animate-fadeIn">
      {/* Success Badge Banner */}
      <div className="text-center space-y-3">
        <div className="w-20 h-20 bg-emerald-100 text-emerald-600 rounded-full flex items-center justify-center mx-auto shadow-lg shadow-emerald-500/20 ring-8 ring-emerald-50">
          <CheckCircle className="w-12 h-12" />
        </div>
        <h1 className="text-3xl font-extrabold text-[#101828]">
          Booking Request Submitted ✅
        </h1>
        <p className="text-sm text-slate-600 max-w-md mx-auto">
          We have received your booking request. Our internal operations team is currently matching verified labourers for your site.
        </p>
      </div>

      {/* Main Details Card */}
      <div className="bg-white rounded-3xl border border-slate-200 shadow-xl overflow-hidden">
        
        {/* Card Header */}
        <div className="bg-[#101828] text-white p-6 flex items-center justify-between">
          <div>
            <span className="text-xs text-slate-400 font-medium block">Booking Reference ID</span>
            <span className="text-xl font-extrabold text-amber-400 tracking-wider">
              {booking.bookingId || id}
            </span>
          </div>

          <div>
            <StatusBadge status={booking.status || 'finding_labour'} />
          </div>
        </div>

        {/* Details Table */}
        <div className="p-6 space-y-4">
          <div className="grid grid-cols-2 gap-4 pb-4 border-b border-slate-100 text-sm">
            <div>
              <span className="text-xs font-semibold text-slate-400 uppercase">Booking Type</span>
              <p className="font-bold flex items-center gap-1.5 mt-0.5">
                <span className={`px-2.5 py-0.5 rounded-full text-xs font-extrabold ${booking.bookingType === 'TATKAL' ? 'bg-amber-100 text-amber-900 border border-amber-300' : 'bg-blue-100 text-blue-800'}`}>
                  {booking.bookingType === 'TATKAL' ? '⚡ Tatkal' : 'Normal'}
                </span>
              </p>
            </div>

            <div>
              <span className="text-xs font-semibold text-slate-400 uppercase">Service</span>
              <p className="font-bold text-slate-900 flex items-center gap-1.5 mt-0.5">
                <HardHat className="w-4 h-4 text-[#155EEF]" />
                {booking.serviceName}
              </p>
            </div>

            <div>
              <span className="text-xs font-semibold text-slate-400 uppercase">Workers Required</span>
              <p className="font-bold text-slate-900 flex items-center gap-1.5 mt-0.5">
                <Users className="w-4 h-4 text-[#155EEF]" />
                {booking.workerCount} Labourer(s)
              </p>
            </div>

            <div>
              <span className="text-xs font-semibold text-slate-400 uppercase">Work Date</span>
              <p className="font-bold text-slate-900 flex items-center gap-1.5 mt-0.5">
                <Calendar className="w-4 h-4 text-[#155EEF]" />
                {booking.date}
              </p>
            </div>

            <div>
              <span className="text-xs font-semibold text-slate-400 uppercase">Duration</span>
              <p className="font-bold text-slate-900 flex items-center gap-1.5 mt-0.5">
                <Clock className="w-4 h-4 text-[#155EEF]" />
                {booking.duration || '1 Day'}
              </p>
            </div>
          </div>

          {/* Pricing Breakdown Box */}
          <div className="bg-slate-900 text-white p-4 rounded-2xl space-y-2 text-xs">
            <div className="flex items-center justify-between">
              <span className="text-slate-400">Labour Charges</span>
              <span className="font-bold text-white">₹{booking.labourAmount || (booking.estimatedCost ? Math.max(0, booking.estimatedCost - 50 - (booking.bookingType === 'TATKAL' ? 150 : 0)) : 0)}</span>
            </div>

            <div className="flex items-center justify-between">
              <span className="text-slate-400">Transportation</span>
              <span className="font-bold text-emerald-400">₹{booking.transportationCharge || 50}</span>
            </div>

            {booking.bookingType === 'TATKAL' && (
              <div className="flex items-center justify-between">
                <span className="text-amber-400">Tatkal Charge</span>
                <span className="font-bold text-amber-400">₹{booking.tatkalCharge || 150}</span>
              </div>
            )}

            <div className="pt-2 border-t border-slate-800 flex items-center justify-between text-sm font-extrabold">
              <span className="text-amber-400">Total Amount</span>
              <span className="text-xl text-amber-400">₹{booking.totalAmount || booking.estimatedTotal || booking.estimatedCost || 0}</span>
            </div>

            <div className="text-[10px] text-emerald-400 text-right font-medium">
              ₹50 transportation charge included
            </div>
          </div>

          <div className="space-y-2 text-sm pt-2">
            <span className="text-xs font-semibold text-slate-400 uppercase">Work Site Location</span>
            <p className="font-bold text-slate-900 flex items-start gap-1.5">
              <MapPin className="w-4 h-4 text-[#155EEF] shrink-0 mt-0.5" />
              <span>{booking.address || `${booking.area}, ${booking.city}`}</span>
            </p>
          </div>
        </div>

        {/* Privacy Assurance Banner */}
        <div className="bg-slate-50 p-4 border-t border-slate-100 flex items-start gap-3 text-xs text-slate-600">
          <EyeOff className="w-4 h-4 text-[#155EEF] shrink-0 mt-0.5" />
          <span>
            <strong>LabourChowk Privacy Standard:</strong> Individual worker names, contact numbers, or contractor details are strictly managed by internal ops and hidden from customer views.
          </span>
        </div>
      </div>

      {/* Action Buttons */}
      <div className="flex flex-col sm:flex-row items-center justify-center gap-4">
        <Link
          to={`/track/${booking.bookingId || id}`}
          className="w-full sm:w-auto bg-[#155EEF] hover:bg-[#124EC4] text-white px-8 py-3.5 rounded-xl font-bold text-sm shadow-md flex items-center justify-center gap-2 transition-all"
        >
          <span>Track Booking</span>
          <ArrowRight className="w-4 h-4" />
        </Link>

        <Link
          to="/my-bookings"
          className="w-full sm:w-auto bg-white border border-slate-300 hover:bg-slate-50 text-slate-700 px-6 py-3.5 rounded-xl font-bold text-sm text-center transition-colors"
        >
          Go to My Bookings
        </Link>
      </div>
    </div>
  );
};
