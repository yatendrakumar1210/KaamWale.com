import React from 'react';
import { BarChart3, Download, TrendingUp, DollarSign, Users } from 'lucide-react';

export const AdminReportsPage = () => {
  return (
    <div className="space-y-6 text-slate-100 animate-fadeIn">
      <div className="flex items-center justify-between border-b border-slate-800 pb-4">
        <div>
          <h1 className="text-2xl font-extrabold text-white">Financial & Operations Reports</h1>
          <p className="text-xs text-slate-400">Monthly booking volume, labour fulfillment rates, and daily wage analytics</p>
        </div>

        <button className="bg-slate-800 hover:bg-slate-700 text-white px-4 py-2 rounded-xl text-xs font-bold flex items-center gap-2">
          <Download className="w-4 h-4" /> Export CSV Report
        </button>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        <div className="bg-slate-950 p-6 rounded-3xl border border-slate-800 space-y-2">
          <span className="text-xs font-bold text-slate-400 uppercase">August 2026 Volume</span>
          <p className="text-3xl font-extrabold text-amber-400">₹1,42,800</p>
          <span className="text-[11px] text-emerald-400 font-semibold">+18.5% vs July</span>
        </div>

        <div className="bg-slate-950 p-6 rounded-3xl border border-slate-800 space-y-2">
          <span className="text-xs font-bold text-slate-400 uppercase">Workforce Utilization</span>
          <p className="text-3xl font-extrabold text-blue-400">92.4%</p>
          <span className="text-[11px] text-slate-400">Avg 4.8 workers / booking</span>
        </div>

        <div className="bg-slate-950 p-6 rounded-3xl border border-slate-800 space-y-2">
          <span className="text-xs font-bold text-slate-400 uppercase">Satisfaction Index</span>
          <p className="text-3xl font-extrabold text-emerald-400">4.9 / 5.0</p>
          <span className="text-[11px] text-emerald-400 font-semibold">120 Verified Reviews</span>
        </div>
      </div>
    </div>
  );
};
