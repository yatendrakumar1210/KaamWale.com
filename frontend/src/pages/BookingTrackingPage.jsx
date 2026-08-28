import React, { useState, useEffect } from 'react';
import { useParams, Link } from 'react-router-dom';
import API from '../services/api';
import { StatusBadge } from '../components/common/StatusBadge';
import {
  CheckCircle2,
  Clock,
  MapPin,
  Calendar,
  Users,
  HardHat,
  ChevronLeft,
  RefreshCw,
  PhoneCall,
  ShieldCheck
} from 'lucide-react';

export const BookingTrackingPage = () => {
  const { id } = useParams();
  const [booking, setBooking] = useState(null);
  const [loading, setLoading] = useState(true);

  const fetchTrackingInfo = () => {
    setLoading(true);
    API.get(`/bookings/${id}`)
      .then(res => {
        setBooking(res.data);
        setLoading(false);
      })
      .catch(() => {
        // Fallback tracking details
        setBooking({
          bookingId: id || 'LCB-10245',
          serviceName: 'Construction Labour',
          workerCount: 5,
          date: '2026-08-30',
          duration: '3 Days',
          startTime: '09:00 AM',
          endTime: '06:00 PM',
          city: 'Bulandshahr',
          area: 'Yamunapuram',
          address: 'Plot No 42, Near Water Tank, Yamunapuram, Bulandshahr',
          status: 'finding_labour',
          createdAt: '2026-08-28T10:15:00.000Z'
        });
        setLoading(false);
      });
  };

  useEffect(() => {
    fetchTrackingInfo();
  }, [id]);

  // Define steps
  const steps = [
    { key: 'submitted', label: 'Request Submitted', desc: 'Booking request sent to LabourChowk operations' },
    { key: 'received', label: 'Booking Received', desc: 'Verified site requirements and city coverage' },
    { key: 'finding', label: 'Finding Labour', desc: 'Matching suitable verified internal labourers' },
    { key: 'confirmed', label: 'Labour Confirmed', desc: 'Workers assigned & schedule confirmed' },
    { key: 'in_progress', label: 'Work Started', desc: 'Labourers on site, work in progress' },
    { key: 'completed', label: 'Work Completed', desc: 'Work finished successfully' }
  ];

  const getStepStatus = (stepKey, currentStatus) => {
    // Determine active index
    const statusMap = {
      'finding_labour': 2,
      'pending': 2,
      'confirmed': 3,
      'in_progress': 4,
      'completed': 5,
      'cancelled': -1
    };

    const activeIdx = statusMap[currentStatus] !== undefined ? statusMap[currentStatus] : 2;
    const stepIdx = steps.findIndex(s => s.key === stepKey);

    if (currentStatus === 'cancelled') {
      return 'cancelled';
    }
    if (stepIdx < activeIdx) return 'completed';
    if (stepIdx === activeIdx) return 'current';
    return 'upcoming';
  };

  if (loading) {
    return (
      <div className="max-w-xl mx-auto py-20 text-center">
        <Clock className="w-10 h-10 animate-spin text-[#155EEF] mx-auto mb-3" />
        <p className="text-slate-600 font-medium">Fetching live booking status...</p>
      </div>
    );
  }

  return (
    <div className="max-w-3xl mx-auto px-4 py-8 space-y-8 animate-fadeIn">
      {/* Top Header Navigation */}
      <div className="flex items-center justify-between">
        <Link to="/my-bookings" className="inline-flex items-center gap-1 text-sm font-semibold text-slate-600 hover:text-[#155EEF]">
          <ChevronLeft className="w-4 h-4" /> Back to My Bookings
        </Link>

        <button
          onClick={fetchTrackingInfo}
          className="inline-flex items-center gap-1.5 text-xs font-bold text-slate-700 bg-slate-100 hover:bg-slate-200 px-3 py-1.5 rounded-xl transition-colors"
        >
          <RefreshCw className="w-3.5 h-3.5" />
          <span>Refresh</span>
        </button>
      </div>

      {/* Main Status Header Card */}
      <div className="bg-[#101828] text-white p-6 rounded-3xl shadow-xl space-y-4">
        <div className="flex flex-wrap items-center justify-between gap-3 border-b border-slate-800 pb-4">
          <div>
            <span className="text-xs text-slate-400">Live Tracking Status</span>
            <h1 className="text-2xl font-extrabold text-white flex items-center gap-3 mt-0.5">
              <span>{booking.bookingId}</span>
            </h1>
          </div>

          <StatusBadge status={booking.status} />
        </div>

        <div className="grid grid-cols-2 sm:grid-cols-4 gap-4 text-xs">
          <div>
            <span className="text-slate-400 block">Service</span>
            <strong className="text-white font-bold text-sm">{booking.serviceName}</strong>
          </div>
          <div>
            <span className="text-slate-400 block">Labour Count</span>
            <strong className="text-white font-bold text-sm">{booking.workerCount} Workers</strong>
          </div>
          <div>
            <span className="text-slate-400 block">Date</span>
            <strong className="text-white font-bold text-sm">{booking.date}</strong>
          </div>
          <div>
            <span className="text-slate-400 block">Location</span>
            <strong className="text-white font-bold text-sm">{booking.city}</strong>
          </div>
        </div>
      </div>

      {/* TIMELINE PROGRESS STEPPER */}
      <div className="bg-white p-6 sm:p-8 rounded-3xl border border-slate-200 shadow-lg space-y-6">
        <h2 className="text-lg font-bold text-slate-900 border-b border-slate-100 pb-3">
          Booking Progress Timeline
        </h2>

        <div className="relative pl-6 sm:pl-8 space-y-8 before:absolute before:left-3 sm:before:left-4 before:top-3 before:bottom-3 before:w-0.5 before:bg-slate-200">
          {steps.map((step) => {
            const st = getStepStatus(step.key, booking.status);

            let iconContent;
            let dotBg;
            let textColor;

            if (st === 'completed') {
              iconContent = '✓';
              dotBg = 'bg-emerald-500 text-white ring-4 ring-emerald-50';
              textColor = 'text-slate-900 font-bold';
            } else if (st === 'current') {
              iconContent = '●';
              dotBg = 'bg-[#155EEF] text-white ring-4 ring-blue-100 animate-pulse';
              textColor = 'text-[#155EEF] font-bold';
            } else {
              iconContent = '○';
              dotBg = 'bg-slate-100 text-slate-400 border border-slate-300';
              textColor = 'text-slate-400';
            }

            return (
              <div key={step.key} className="relative flex items-start gap-4">
                {/* Circle Icon */}
                <div className={`absolute -left-6 sm:-left-8 top-0.5 w-6 h-6 rounded-full flex items-center justify-center text-xs font-bold ${dotBg}`}>
                  {iconContent}
                </div>

                <div>
                  <h3 className={`text-base ${textColor}`}>
                    {step.label}
                  </h3>
                  <p className="text-xs text-slate-500 mt-0.5">
                    {step.desc}
                  </p>
                </div>
              </div>
            );
          })}
        </div>
      </div>

      {/* Operations Helpline */}
      <div className="bg-blue-50 border border-blue-200 p-5 rounded-2xl flex flex-col sm:flex-row items-center justify-between gap-4 text-xs text-blue-950">
        <div className="flex items-center gap-3">
          <div className="w-10 h-10 rounded-xl bg-[#155EEF] text-white flex items-center justify-center font-bold shrink-0">
            <PhoneCall className="w-5 h-5" />
          </div>
          <div>
            <h4 className="font-bold text-sm text-slate-900">Need Ops Assistance?</h4>
            <p className="text-slate-600">Our Bulandshahr operations center is monitoring this booking.</p>
          </div>
        </div>
        <a
          href="tel:+919876543210"
          className="bg-[#155EEF] hover:bg-[#124EC4] text-white px-4 py-2.5 rounded-xl font-bold text-xs shrink-0 transition-colors"
        >
          Call Operations (+91 98765 43210)
        </a>
      </div>
    </div>
  );
};
