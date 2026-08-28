import React, { useState, useEffect } from 'react';
import API from '../../services/api';
import { Star, MessageSquare } from 'lucide-react';

export const AdminReviewsPage = () => {
  const [reviews, setReviews] = useState([]);

  useEffect(() => {
    API.get('/reviews')
      .then(res => setReviews(res.data))
      .catch(() => setReviews([
        { id: 'rev-1', bookingId: 'LCB-10195', customerName: 'Yatendra Kumar', rating: 5, comment: 'Excellent service! LabourChowk sent punctual and hard-working workers for plumbing repairs in Bulandshahr.', createdAt: '2026-08-21T11:00:00.000Z' }
      ]));
  }, []);

  return (
    <div className="space-y-6 text-slate-100 animate-fadeIn">
      <div className="border-b border-slate-800 pb-4">
        <h1 className="text-2xl font-extrabold text-white">Customer Reviews & Ratings</h1>
        <p className="text-xs text-slate-400">Post-service feedback submitted by customers</p>
      </div>

      <div className="space-y-4">
        {reviews.map(r => (
          <div key={r.id} className="bg-slate-950 p-6 rounded-3xl border border-slate-800 space-y-3">
            <div className="flex items-center justify-between">
              <div>
                <span className="font-extrabold text-amber-400 text-sm">{r.bookingId}</span>
                <h4 className="font-bold text-white text-base">{r.customerName}</h4>
              </div>
              <div className="flex items-center gap-1">
                {[...Array(r.rating)].map((_, i) => (
                  <Star key={i} className="w-4 h-4 text-amber-400 fill-amber-400" />
                ))}
              </div>
            </div>
            <p className="text-xs text-slate-300 bg-slate-900 p-3 rounded-xl border border-slate-800">
              "{r.comment}"
            </p>
          </div>
        ))}
      </div>
    </div>
  );
};
