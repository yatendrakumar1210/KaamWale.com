import React from 'react';
import { useAuth } from '../../context/AuthContext';
import { Shield, User, Briefcase, ChevronRight } from 'lucide-react';
import { useNavigate } from 'react-router-dom';

export const DemoRoleBanner = () => {
  const { user, switchDemoUserRole } = useAuth();
  const navigate = useNavigate();

  return (
    <div className="bg-slate-900 text-white text-xs py-2 px-4 border-b border-slate-800 flex flex-wrap items-center justify-between gap-3 shadow-inner">
      <div className="flex items-center gap-2">
        <span className="bg-amber-500 text-slate-950 font-bold px-2 py-0.5 rounded text-[10px] uppercase tracking-wider">
          Demo Mode Switcher
        </span>
        <span className="text-slate-300 hidden sm:inline">
          Active Role: <strong className="text-white capitalize">{user?.role || 'Guest'}</strong> ({user?.name})
        </span>
      </div>

      <div className="flex items-center gap-2">
        <span className="text-slate-400 hidden md:inline">Switch view:</span>
        <button
          onClick={() => {
            switchDemoUserRole('customer');
            navigate('/');
          }}
          className={`flex items-center gap-1.5 px-2.5 py-1 rounded-md transition-colors ${
            user?.role === 'customer'
              ? 'bg-[#155EEF] text-white font-semibold shadow-sm'
              : 'bg-slate-800 text-slate-300 hover:bg-slate-700'
          }`}
        >
          <User className="w-3.5 h-3.5" />
          Customer
        </button>

        <button
          onClick={() => {
            switchDemoUserRole('admin');
            navigate('/admin');
          }}
          className={`flex items-center gap-1.5 px-2.5 py-1 rounded-md transition-colors ${
            user?.role === 'admin'
              ? 'bg-amber-600 text-white font-semibold shadow-sm'
              : 'bg-slate-800 text-slate-300 hover:bg-slate-700'
          }`}
        >
          <Shield className="w-3.5 h-3.5 text-amber-300" />
          Admin Portal
        </button>

        <button
          onClick={() => {
            switchDemoUserRole('operations');
            navigate('/admin/assignments');
          }}
          className={`flex items-center gap-1.5 px-2.5 py-1 rounded-md transition-colors ${
            user?.role === 'operations'
              ? 'bg-indigo-600 text-white font-semibold shadow-sm'
              : 'bg-slate-800 text-slate-300 hover:bg-slate-700'
          }`}
        >
          <Briefcase className="w-3.5 h-3.5" />
          Ops Worker Assignment
        </button>
      </div>
    </div>
  );
};
