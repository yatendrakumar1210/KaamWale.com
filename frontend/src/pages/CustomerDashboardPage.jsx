import React, { useState, useEffect } from 'react';
import { useAuth } from '../context/AuthContext';
import API from '../services/api';
import { StatusBadge } from '../components/common/StatusBadge';
import { Link } from 'react-router-dom';
import {
  CalendarCheck,
  CheckCircle2,
  XCircle,
  Clock,
  HardHat,
  MapPin,
  Calendar,
  Users,
  PlusCircle,
  ArrowRight,
  Star,
  RefreshCw,
  Eye,
  ShieldCheck,
  MessageSquare
} from 'lucide-react';

export const CustomerDashboardPage = () => {
  const { user } = useAuth();
  const [bookings, setBookings] = useState([]);
  const [loading, setLoading] = useState(true);
  const [filterTab, setFilterTab] = useState('all'); // all, active, completed, cancelled

  // Review Modal State
  const [reviewModalBooking, setReviewModalBooking] = useState(null);
  const [rating, setRating] = useState(5);
  const [comment, setComment] = useState('');
  const [reviewSubmitted, setReviewSubmitted] = useState(false);

  const fetchBookings = () => {
    setLoading(true);
    API.get('/bookings/my-bookings')
      .then(res => {
        setBookings(res.data);
        setLoading(false);
      })
      .catch(() => {
        // Fallback demo bookings for customer
        setBookings([
          {
            id: 'bk-10245',
            bookingId: 'LCB-10245',
            serviceName: 'Construction Labour',
            workerCount: 5,
            date: '30 Aug 2026',
            duration: '3 Days',
            startTime: '09:00 AM',
            endTime: '06:00 PM',
            city: 'Bulandshahr',
            area: 'Yamunapuram',
            status: 'finding_labour',
            estimatedCost: 9750
          },
          {
            id: 'bk-10230',
            bookingId: 'LCB-10230',
            serviceName: 'Painter',
            workerCount: 2,
            date: '25 Aug 2026',
            duration: '2 Days',
            startTime: '09:00 AM',
            endTime: '06:00 PM',
            city: 'Bulandshahr',
            area: 'Civil Lines',
            status: 'confirmed',
            estimatedCost: 3200
          },
          {
            id: 'bk-10195',
            bookingId: 'LCB-10195',
            serviceName: 'Plumber',
            workerCount: 1,
            date: '20 Aug 2026',
            duration: '1 Day',
            startTime: '10:00 AM',
            endTime: '04:00 PM',
            city: 'Bulandshahr',
            area: 'DM Colony',
            status: 'completed',
            estimatedCost: 800
          }
        ]);
        setLoading(false);
      });
  };

  useEffect(() => {
    fetchBookings();
  }, []);

  const activeBookings = bookings.filter(b => ['finding_labour', 'confirmed', 'in_progress', 'pending'].includes(b.status));
  const completedBookings = bookings.filter(b => b.status === 'completed');
  const cancelledBookings = bookings.filter(b => b.status === 'cancelled');

  const filteredList = bookings.filter(b => {
    if (filterTab === 'active') return ['finding_labour', 'confirmed', 'in_progress', 'pending'].includes(b.status);
    if (filterTab === 'completed') return b.status === 'completed';
    if (filterTab === 'cancelled') return b.status === 'cancelled';
    return true;
  });

  const handleCancelBooking = async (bookingId) => {
    if (!window.confirm('Are you sure you want to cancel this booking request?')) return;
    try {
      await API.patch(`/bookings/${bookingId}/cancel`);
      fetchBookings();
    } catch (err) {
      setBookings(prev => prev.map(b => b.id === bookingId || b.bookingId === bookingId ? { ...b, status: 'cancelled' } : b));
    }
  };

  const handleReviewSubmit = async (e) => {
    e.preventDefault();
    try {
      await API.post('/reviews', {
        bookingId: reviewModalBooking.bookingId,
        rating,
        comment
      });
    } catch (err) {
      // Mock submit
    }
    setReviewSubmitted(true);
    setTimeout(() => {
      setReviewModalBooking(null);
      setReviewSubmitted(false);
      setComment('');
    }, 1500);
  };

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8 space-y-8 animate-fadeIn">
      {/* Welcome Banner Header */}
      <div className="bg-gradient-to-r from-[#101828] via-[#155EEF] to-[#101828] rounded-3xl p-6 sm:p-8 text-white shadow-xl flex flex-col md:flex-row items-start md:items-center justify-between gap-6">
        <div>
          <span className="text-xs font-bold text-amber-300 bg-white/10 px-3 py-1 rounded-full border border-white/20 uppercase tracking-wider">
            Customer Dashboard
          </span>
          <h1 className="text-2xl sm:text-3xl font-extrabold mt-2">
            Hello, {user ? user.name : 'User'} 👋
          </h1>
          <p className="text-slate-200 text-xs sm:text-sm mt-1">
            Manage your daily labour bookings & track live status in <strong>{user?.city || 'Bulandshahr'}</strong>
          </p>
        </div>

        <Link
          to="/book"
          className="bg-amber-500 hover:bg-amber-400 text-slate-950 font-bold px-6 py-3 rounded-xl shadow-lg transition-all text-sm flex items-center gap-2 shrink-0"
        >
          <PlusCircle className="w-4 h-4 text-slate-950" />
          <span>New Labour Request</span>
        </Link>
      </div>

      {/* METRIC COUNTER CARDS */}
      <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
        <div
          onClick={() => setFilterTab('all')}
          className="bg-white p-5 rounded-2xl border border-slate-200 shadow-sm hover:border-[#155EEF] cursor-pointer transition-all"
        >
          <span className="text-xs font-bold text-slate-400 uppercase">Total Bookings</span>
          <p className="text-3xl font-extrabold text-slate-900 mt-1">{bookings.length}</p>
        </div>

        <div
          onClick={() => setFilterTab('active')}
          className="bg-white p-5 rounded-2xl border border-slate-200 shadow-sm hover:border-amber-400 cursor-pointer transition-all"
        >
          <span className="text-xs font-bold text-amber-600 uppercase">Active Requests</span>
          <p className="text-3xl font-extrabold text-amber-600 mt-1">{activeBookings.length}</p>
        </div>

        <div
          onClick={() => setFilterTab('completed')}
          className="bg-white p-5 rounded-2xl border border-slate-200 shadow-sm hover:border-emerald-400 cursor-pointer transition-all"
        >
          <span className="text-xs font-bold text-emerald-600 uppercase">Completed</span>
          <p className="text-3xl font-extrabold text-emerald-600 mt-1">{completedBookings.length}</p>
        </div>

        <div
          onClick={() => setFilterTab('cancelled')}
          className="bg-white p-5 rounded-2xl border border-slate-200 shadow-sm hover:border-rose-400 cursor-pointer transition-all"
        >
          <span className="text-xs font-bold text-rose-600 uppercase">Cancelled</span>
          <p className="text-3xl font-extrabold text-rose-600 mt-1">{cancelledBookings.length}</p>
        </div>
      </div>

      {/* ACTIVE BOOKINGS HIGHLIGHT SECTION */}
      {activeBookings.length > 0 && (
        <div className="space-y-4">
          <h2 className="text-xl font-bold text-slate-900 flex items-center gap-2">
            <Clock className="w-5 h-5 text-amber-500" />
            Active Booking Spotlight
          </h2>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            {activeBookings.map((b) => (
              <div key={b.id || b.bookingId} className="bg-white rounded-3xl border border-blue-200 p-6 shadow-md hover:shadow-xl transition-all space-y-4 relative overflow-hidden">
                <div className="flex items-center justify-between border-b border-slate-100 pb-3">
                  <div>
                    <span className="text-[11px] text-slate-400 font-bold block">ID: {b.bookingId}</span>
                    <h3 className="font-extrabold text-slate-900 text-lg">{b.serviceName}</h3>
                  </div>
                  <StatusBadge status={b.status} />
                </div>

                <div className="grid grid-cols-2 gap-3 text-xs">
                  <div>
                    <span className="text-slate-400 block">Workers</span>
                    <strong className="text-slate-800 font-bold">{b.workerCount} Labourers</strong>
                  </div>
                  <div>
                    <span className="text-slate-400 block">Date</span>
                    <strong className="text-slate-800 font-bold">{b.date}</strong>
                  </div>
                  <div>
                    <span className="text-slate-400 block">Location</span>
                    <strong className="text-slate-800 font-bold">{b.area}, {b.city}</strong>
                  </div>
                  <div>
                    <span className="text-slate-400 block">Duration</span>
                    <strong className="text-slate-800 font-bold">{b.duration}</strong>
                  </div>
                </div>

                <div className="pt-3 border-t border-slate-100 flex items-center justify-between">
                  <button
                    onClick={() => handleCancelBooking(b.id || b.bookingId)}
                    className="text-xs font-semibold text-rose-600 hover:underline"
                  >
                    Cancel Booking
                  </button>

                  <Link
                    to={`/track/${b.bookingId}`}
                    className="bg-[#155EEF] hover:bg-[#124EC4] text-white px-4 py-2 rounded-xl font-bold text-xs flex items-center gap-1.5 shadow-sm"
                  >
                    <span>View Details & Track</span>
                    <ArrowRight className="w-3.5 h-3.5" />
                  </Link>
                </div>
              </div>
            ))}
          </div>
        </div>
      )}

      {/* BOOKINGS HISTORY TABLE / CARDS */}
      <div className="bg-white rounded-3xl border border-slate-200 shadow-lg overflow-hidden space-y-4">
        {/* Header Tabs */}
        <div className="p-6 border-b border-slate-100 flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4">
          <div>
            <h2 className="text-xl font-bold text-slate-900">
              Booking History
            </h2>
            <p className="text-xs text-slate-500">Track and review all previous requests</p>
          </div>

          <div className="flex items-center gap-1 bg-slate-100 p-1 rounded-xl text-xs font-bold">
            {['all', 'active', 'completed', 'cancelled'].map(t => (
              <button
                key={t}
                onClick={() => setFilterTab(t)}
                className={`px-3 py-1.5 rounded-lg capitalize transition-colors ${
                  filterTab === t ? 'bg-white text-slate-900 shadow-sm' : 'text-slate-500 hover:text-slate-900'
                }`}
              >
                {t}
              </button>
            ))}
          </div>
        </div>

        {/* DESKTOP TABLE */}
        <div className="hidden md:block overflow-x-auto">
          <table className="w-full text-left border-collapse">
            <thead>
              <tr className="bg-slate-50 text-[11px] font-bold uppercase tracking-wider text-slate-500 border-b border-slate-200">
                <th className="py-3.5 px-6">Booking ID</th>
                <th className="py-3.5 px-6">Service</th>
                <th className="py-3.5 px-6">Workers</th>
                <th className="py-3.5 px-6">Date & Time</th>
                <th className="py-3.5 px-6">Location</th>
                <th className="py-3.5 px-6">Status</th>
                <th className="py-3.5 px-6 text-right">Actions</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-slate-100 text-xs font-medium text-slate-700">
              {filteredList.map((b) => (
                <tr key={b.id || b.bookingId} className="hover:bg-slate-50/80 transition-colors">
                  <td className="py-4 px-6 font-bold text-slate-900">{b.bookingId}</td>
                  <td className="py-4 px-6 font-bold text-[#155EEF]">{b.serviceName}</td>
                  <td className="py-4 px-6">{b.workerCount} Labourers</td>
                  <td className="py-4 px-6">{b.date} ({b.duration})</td>
                  <td className="py-4 px-6">{b.area}, {b.city}</td>
                  <td className="py-4 px-6">
                    <StatusBadge status={b.status} />
                  </td>
                  <td className="py-4 px-6 text-right space-x-2">
                    <Link
                      to={`/track/${b.bookingId}`}
                      className="inline-flex items-center gap-1 text-slate-700 font-bold bg-slate-100 hover:bg-slate-200 px-3 py-1.5 rounded-lg transition-colors"
                    >
                      <Eye className="w-3.5 h-3.5 text-[#155EEF]" />
                      Track
                    </Link>

                    {b.status === 'completed' && (
                      <button
                        onClick={() => setReviewModalBooking(b)}
                        className="inline-flex items-center gap-1 text-amber-800 font-bold bg-amber-50 hover:bg-amber-100 px-3 py-1.5 rounded-lg border border-amber-200 transition-colors"
                      >
                        <Star className="w-3.5 h-3.5 text-amber-500 fill-amber-500" />
                        Review
                      </button>
                    )}
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>

        {/* MOBILE CARDS */}
        <div className="md:hidden p-4 space-y-4">
          {filteredList.map((b) => (
            <div key={b.id || b.bookingId} className="bg-slate-50 p-4 rounded-2xl border border-slate-200 space-y-3">
              <div className="flex items-center justify-between">
                <span className="font-extrabold text-slate-900 text-sm">{b.bookingId}</span>
                <StatusBadge status={b.status} />
              </div>

              <div>
                <h4 className="font-bold text-[#155EEF] text-base">{b.serviceName}</h4>
                <p className="text-xs text-slate-500">{b.workerCount} Workers • {b.date} ({b.duration})</p>
                <p className="text-xs text-slate-500">{b.area}, {b.city}</p>
              </div>

              <div className="pt-2 border-t border-slate-200 flex items-center justify-between">
                <Link
                  to={`/track/${b.bookingId}`}
                  className="text-xs font-bold text-[#155EEF] flex items-center gap-1"
                >
                  View Details & Track <ArrowRight className="w-3.5 h-3.5" />
                </Link>

                {b.status === 'completed' && (
                  <button
                    onClick={() => setReviewModalBooking(b)}
                    className="text-xs font-bold text-amber-700 bg-amber-100 px-2.5 py-1 rounded-lg"
                  >
                    ⭐ Review
                  </button>
                )}
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* REVIEW SUBMISSION MODAL */}
      {reviewModalBooking && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-slate-900/60 backdrop-blur-sm animate-fadeIn">
          <div className="bg-white rounded-3xl max-w-md w-full p-6 shadow-2xl space-y-4 border border-slate-100">
            <h3 className="text-xl font-bold text-slate-900 text-center">
              How was your experience?
            </h3>
            <p className="text-xs text-slate-500 text-center">
              Rating for booking <strong>{reviewModalBooking.bookingId}</strong> ({reviewModalBooking.serviceName})
            </p>

            {reviewSubmitted ? (
              <div className="bg-emerald-50 text-emerald-800 p-4 rounded-2xl text-center font-bold text-sm">
                Thank you! Your review has been submitted ✅
              </div>
            ) : (
              <form onSubmit={handleReviewSubmit} className="space-y-4">
                {/* Star Rating */}
                <div className="flex items-center justify-center gap-2 py-2">
                  {[1, 2, 3, 4, 5].map((star) => (
                    <button
                      key={star}
                      type="button"
                      onClick={() => setRating(star)}
                      className="p-1 hover:scale-125 transition-transform"
                    >
                      <Star
                        className={`w-8 h-8 ${
                          star <= rating
                            ? 'text-amber-400 fill-amber-400'
                            : 'text-slate-300'
                        }`}
                      />
                    </button>
                  ))}
                </div>

                <div>
                  <label className="block text-xs font-bold text-slate-700 mb-1">
                    Your Review / Comments
                  </label>
                  <textarea
                    rows={3}
                    value={comment}
                    onChange={(e) => setComment(e.target.value)}
                    placeholder="Tell us about your experience..."
                    className="w-full p-3 rounded-xl border border-slate-300 text-xs outline-none focus:ring-2 focus:ring-[#155EEF]"
                  />
                </div>

                <div className="flex items-center justify-end gap-2 pt-2">
                  <button
                    type="button"
                    onClick={() => setReviewModalBooking(null)}
                    className="px-4 py-2 text-xs font-bold text-slate-600 bg-slate-100 rounded-xl"
                  >
                    Cancel
                  </button>
                  <button
                    type="submit"
                    className="px-5 py-2 text-xs font-bold text-white bg-[#155EEF] hover:bg-[#124EC4] rounded-xl shadow-md"
                  >
                    Submit Review
                  </button>
                </div>
              </form>
            )}
          </div>
        </div>
      )}
    </div>
  );
};
