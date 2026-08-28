import React from 'react';
import { Link, Outlet, useLocation, useNavigate } from 'react-router-dom';
import { useAuth } from '../../context/AuthContext';
import {
  Shield,
  LayoutDashboard,
  CalendarCheck,
  Users,
  HardHat,
  Briefcase,
  Building2,
  Star,
  BarChart3,
  Settings,
  LogOut,
  ChevronRight,
  ArrowLeft
} from 'lucide-react';

export const AdminLayout = () => {
  const { user, logout } = useAuth();
  const location = useLocation();
  const navigate = useNavigate();

  const navItems = [
    { name: 'Dashboard', path: '/admin', icon: LayoutDashboard },
    { name: 'Bookings', path: '/admin/bookings', icon: CalendarCheck },
    { name: 'Workforce', path: '/admin/workforce', icon: HardHat },
    { name: 'Assignments', path: '/admin/assignments', icon: Briefcase },
    { name: 'Services', path: '/admin/services', icon: Building2 },
    { name: 'Cities', path: '/admin/cities', icon: Building2 },
    { name: 'Reviews', path: '/admin/reviews', icon: Star },
    { name: 'Reports', path: '/admin/reports', icon: BarChart3 }
  ];

  return (
    <div className="min-h-screen bg-slate-900 text-slate-100 flex flex-col md:flex-row">

      {/* ADMIN SIDEBAR */}
      <aside className="w-full md:w-64 bg-slate-950 border-r border-slate-800 flex flex-col justify-between shrink-0">
        <div>
          {/* Logo */}
          <div className="p-6 border-b border-slate-800 flex items-center justify-between">
            <Link to="/admin" className="flex items-center gap-2.5">
              <div className="w-9 h-9 rounded-xl bg-amber-500 text-slate-950 flex items-center justify-center font-bold">
                <Shield className="w-5 h-5" />
              </div>
              <div>
                <span className="font-extrabold text-white text-base">Labour<span className="text-amber-400">Chowk</span></span>
                <span className="block text-[10px] text-amber-300 font-bold uppercase tracking-wider">
                  Admin & Operations Portal
                </span>
              </div>
            </Link>
          </div>

          {/* Navigation Links */}
          <nav className="p-4 space-y-1">
            {navItems.map((item) => {
              const IconComp = item.icon;
              const isActive = location.pathname === item.path;
              return (
                <Link
                  key={item.name}
                  to={item.path}
                  className={`flex items-center justify-between px-4 py-3 rounded-xl text-xs font-bold transition-all ${
                    isActive
                      ? 'bg-[#155EEF] text-white shadow-md'
                      : 'text-slate-400 hover:bg-slate-900 hover:text-white'
                  }`}
                >
                  <div className="flex items-center gap-3">
                    <IconComp className={`w-4 h-4 ${isActive ? 'text-white' : 'text-slate-400'}`} />
                    <span>{item.name}</span>
                  </div>
                  {isActive && <ChevronRight className="w-3.5 h-3.5" />}
                </Link>
              );
            })}
          </nav>
        </div>

        {/* User profile & exit */}
        <div className="p-4 border-t border-slate-800 space-y-3">
          <div className="bg-slate-900 p-3 rounded-xl flex items-center gap-3">
            <div className="w-8 h-8 rounded-full bg-amber-500 text-slate-950 font-bold flex items-center justify-center text-xs">
              {user?.name?.charAt(0) || 'A'}
            </div>
            <div className="truncate">
              <p className="text-xs font-bold text-white truncate">{user?.name || 'Admin'}</p>
              <p className="text-[10px] text-amber-400 font-semibold uppercase">{user?.role || 'Admin'}</p>
            </div>
          </div>

          <div className="flex items-center gap-2">
            <Link
              to="/"
              className="flex-1 py-2 bg-slate-900 hover:bg-slate-800 text-slate-300 rounded-xl text-center text-xs font-bold flex items-center justify-center gap-1"
            >
              <ArrowLeft className="w-3.5 h-3.5" /> Customer Site
            </Link>
            <button
              onClick={() => {
                logout();
                navigate('/login');
              }}
              className="p-2 bg-rose-950 text-rose-300 hover:bg-rose-900 rounded-xl text-xs font-bold"
              title="Logout"
            >
              <LogOut className="w-4 h-4" />
            </button>
          </div>
        </div>
      </aside>

      {/* MAIN CONTENT CANVAS */}
      <main className="flex-1 bg-slate-900 min-h-screen overflow-y-auto p-4 sm:p-8">
        <Outlet />
      </main>

    </div>
  );
};
