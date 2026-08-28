import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { useAuth } from '../context/AuthContext';
import { HardHat, Lock, Phone, Mail, ArrowRight, ShieldCheck, KeyRound } from 'lucide-react';

export const LoginPage = () => {
  const navigate = useNavigate();
  const { login, switchDemoUserRole } = useAuth();

  const [loginInput, setLoginInput] = useState('customer@labourchowk.com');
  const [password, setPassword] = useState('password123');
  const [useOtpMode, setUseOtpMode] = useState(false);
  const [otpSent, setOtpSent] = useState(false);
  const [otpCode, setOtpCode] = useState('123456');
  const [error, setError] = useState('');
  const [loading, setLoading] = useState(false);

  const handleLoginSubmit = async (e) => {
    e.preventDefault();
    setError('');
    setLoading(true);

    const res = await login(loginInput, password);
    setLoading(false);

    if (res.success) {
      if (res.user.role === 'admin' || res.user.role === 'operations') {
        navigate('/admin');
      } else {
        navigate('/dashboard');
      }
    } else {
      setError(res.message || 'Invalid credentials');
    }
  };

  const handleOtpRequest = () => {
    setOtpSent(true);
  };

  return (
    <div className="max-w-md mx-auto px-4 py-12 space-y-6 animate-fadeIn">
      {/* Brand Header */}
      <div className="text-center space-y-2">
        <div className="w-14 h-14 rounded-2xl bg-gradient-to-tr from-[#101828] to-[#155EEF] text-amber-400 flex items-center justify-center mx-auto shadow-lg shadow-blue-500/20">
          <HardHat className="w-8 h-8" />
        </div>
        <h1 className="text-2xl font-extrabold text-slate-900">
          Welcome to Labour<span className="text-[#155EEF]">Chowk</span>
        </h1>
        <p className="text-xs text-slate-500">
          Sign in to manage your daily labour bookings
        </p>
      </div>

      {/* Main Login Card */}
      <div className="bg-white p-6 sm:p-8 rounded-3xl border border-slate-200 shadow-xl space-y-6">

        {/* Mode Toggle (Password / OTP) */}
        <div className="flex bg-slate-100 p-1 rounded-xl text-xs font-bold">
          <button
            type="button"
            onClick={() => setUseOtpMode(false)}
            className={`flex-1 py-2 rounded-lg transition-colors ${
              !useOtpMode ? 'bg-white text-slate-900 shadow-sm' : 'text-slate-500'
            }`}
          >
            Password Login
          </button>
          <button
            type="button"
            onClick={() => setUseOtpMode(true)}
            className={`flex-1 py-2 rounded-lg transition-colors ${
              useOtpMode ? 'bg-white text-slate-900 shadow-sm' : 'text-slate-500'
            }`}
          >
            OTP Login
          </button>
        </div>

        {error && (
          <div className="bg-rose-50 border border-rose-200 text-rose-700 p-3 rounded-xl text-xs font-bold text-center">
            {error}
          </div>
        )}

        {!useOtpMode ? (
          <form onSubmit={handleLoginSubmit} className="space-y-4">
            <div>
              <label className="block text-xs font-bold text-slate-700 uppercase tracking-wider mb-1">
                Phone / Email
              </label>
              <div className="relative">
                <Mail className="w-4 h-4 text-slate-400 absolute left-3.5 top-3.5" />
                <input
                  type="text"
                  required
                  value={loginInput}
                  onChange={(e) => setLoginInput(e.target.value)}
                  placeholder="Enter phone number or email"
                  className="w-full pl-10 pr-4 py-3 rounded-xl border border-slate-300 text-sm font-medium focus:ring-2 focus:ring-[#155EEF] outline-none"
                />
              </div>
            </div>

            <div>
              <div className="flex items-center justify-between mb-1">
                <label className="block text-xs font-bold text-slate-700 uppercase tracking-wider">
                  Password
                </label>
                <a href="#forgot" className="text-xs font-semibold text-[#155EEF] hover:underline">
                  Forgot Password?
                </a>
              </div>
              <div className="relative">
                <Lock className="w-4 h-4 text-slate-400 absolute left-3.5 top-3.5" />
                <input
                  type="password"
                  required
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  placeholder="••••••••"
                  className="w-full pl-10 pr-4 py-3 rounded-xl border border-slate-300 text-sm font-medium focus:ring-2 focus:ring-[#155EEF] outline-none"
                />
              </div>
            </div>

            <button
              type="submit"
              disabled={loading}
              className="w-full bg-[#155EEF] hover:bg-[#124EC4] text-white py-3.5 rounded-xl font-extrabold text-sm shadow-md flex items-center justify-center gap-2 transition-all"
            >
              <span>Login</span>
              <ArrowRight className="w-4 h-4" />
            </button>
          </form>
        ) : (
          <div className="space-y-4">
            <div>
              <label className="block text-xs font-bold text-slate-700 uppercase tracking-wider mb-1">
                Mobile Number
              </label>
              <div className="relative">
                <Phone className="w-4 h-4 text-slate-400 absolute left-3.5 top-3.5" />
                <input
                  type="tel"
                  value={loginInput}
                  onChange={(e) => setLoginInput(e.target.value)}
                  placeholder="10-digit mobile number"
                  className="w-full pl-10 pr-4 py-3 rounded-xl border border-slate-300 text-sm font-medium focus:ring-2 focus:ring-[#155EEF] outline-none"
                />
              </div>
            </div>

            {!otpSent ? (
              <button
                type="button"
                onClick={handleOtpRequest}
                className="w-full bg-slate-900 text-white py-3.5 rounded-xl font-bold text-sm"
              >
                Send OTP
              </button>
            ) : (
              <div className="space-y-3">
                <div className="p-3 bg-emerald-50 text-emerald-800 text-xs rounded-xl font-semibold text-center">
                  OTP sent to +91 {loginInput.slice(-4)}: Use code <strong>123456</strong>
                </div>
                <input
                  type="text"
                  value={otpCode}
                  onChange={(e) => setOtpCode(e.target.value)}
                  placeholder="Enter 6-digit OTP"
                  className="w-full text-center tracking-widest text-lg font-bold p-3 rounded-xl border border-slate-300"
                />
                <button
                  type="button"
                  onClick={handleLoginSubmit}
                  className="w-full bg-[#155EEF] text-white py-3 rounded-xl font-bold text-sm"
                >
                  Verify & Login
                </button>
              </div>
            )}
          </div>
        )}

        {/* Quick Demo Credentials Assistant */}
        <div className="pt-4 border-t border-slate-100 space-y-2 text-xs">
          <span className="font-bold text-slate-400 uppercase tracking-wider block">
            ⚡ Quick Demo Accounts:
          </span>
          <div className="grid grid-cols-2 gap-2">
            <button
              onClick={() => {
                switchDemoUserRole('customer');
                navigate('/dashboard');
              }}
              className="p-2 bg-blue-50 hover:bg-blue-100 text-blue-900 font-bold rounded-lg text-left"
            >
              👤 Customer Account
              <span className="block text-[10px] text-blue-700 font-normal">Yatendra Kumar</span>
            </button>

            <button
              onClick={() => {
                switchDemoUserRole('admin');
                navigate('/admin');
              }}
              className="p-2 bg-amber-50 hover:bg-amber-100 text-amber-900 font-bold rounded-lg text-left"
            >
              🛡️ Admin Account
              <span className="block text-[10px] text-amber-700 font-normal">Operations Admin</span>
            </button>
          </div>
        </div>

        <div className="text-center pt-2">
          <p className="text-xs text-slate-500">
            Don't have an account?{' '}
            <Link to="/register" className="font-bold text-[#155EEF] hover:underline">
              Create Account
            </Link>
          </p>
        </div>

      </div>
    </div>
  );
};
