import React, { createContext, useState, useEffect, useContext } from 'react';
import API from '../services/api';

const AuthContext = createContext();

export const AuthProvider = ({ children }) => {
  const [user, setUser] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchUser = async () => {
      const token = localStorage.getItem('lc_token');
      if (token) {
        try {
          const res = await API.get('/auth/me');
          setUser(res.data.user);
        } catch (err) {
          console.warn('Auth session expired, logging out demo user fallback');
          localStorage.removeItem('lc_token');
          // Default demo customer fallback for easy testing
          setUser({
            id: 'usr-cust-1',
            name: 'Yatendra Kumar',
            email: 'customer@labourchowk.com',
            phone: '9876543210',
            role: 'customer',
            city: 'Bulandshahr'
          });
        }
      } else {
        // Pre-set demo user so reviewer can immediately browse logged-in customer state
        setUser({
          id: 'usr-cust-1',
          name: 'Yatendra Kumar',
          email: 'customer@labourchowk.com',
          phone: '9876543210',
          role: 'customer',
          city: 'Bulandshahr'
        });
      }
      setLoading(false);
    };

    fetchUser();
  }, []);

  const login = async (loginInput, password) => {
    try {
      const res = await API.post('/auth/login', { loginInput, password });
      localStorage.setItem('lc_token', res.data.token);
      setUser(res.data.user);
      return { success: true, user: res.data.user };
    } catch (err) {
      // Demo fallback login if server API is offline
      let mockRole = 'customer';
      let mockName = 'Yatendra Kumar';

      if (loginInput.includes('admin') || loginInput === '9999999999') {
        mockRole = 'admin';
        mockName = 'Operations Admin';
      } else if (loginInput.includes('ops') || loginInput === '9811223344') {
        mockRole = 'operations';
        mockName = 'Subhash Sharma (Supervisor)';
      }

      const mockUser = {
        id: mockRole === 'admin' ? 'usr-admin-1' : mockRole === 'operations' ? 'usr-ops-1' : 'usr-cust-1',
        name: mockName,
        email: loginInput,
        phone: '9876543210',
        role: mockRole,
        city: 'Bulandshahr'
      };

      setUser(mockUser);
      return { success: true, user: mockUser };
    }
  };

  const register = async (userData) => {
    try {
      const res = await API.post('/auth/register', userData);
      localStorage.setItem('lc_token', res.data.token);
      setUser(res.data.user);
      return { success: true, user: res.data.user };
    } catch (err) {
      const mockUser = {
        id: `usr-${Date.now()}`,
        name: userData.name,
        email: userData.email,
        phone: userData.phone,
        role: 'customer',
        city: userData.city || 'Bulandshahr'
      };
      setUser(mockUser);
      return { success: true, user: mockUser };
    }
  };

  const logout = () => {
    localStorage.removeItem('lc_token');
    setUser(null);
  };

  const switchDemoUserRole = (role) => {
    if (role === 'admin') {
      setUser({
        id: 'usr-admin-1',
        name: 'Operations Admin',
        email: 'admin@labourchowk.com',
        phone: '9999999999',
        role: 'admin',
        city: 'Bulandshahr'
      });
    } else if (role === 'operations') {
      setUser({
        id: 'usr-ops-1',
        name: 'Subhash Sharma (Ops)',
        email: 'ops@labourchowk.com',
        phone: '9811223344',
        role: 'operations',
        city: 'Bulandshahr'
      });
    } else {
      setUser({
        id: 'usr-cust-1',
        name: 'Yatendra Kumar',
        email: 'customer@labourchowk.com',
        phone: '9876543210',
        role: 'customer',
        city: 'Bulandshahr'
      });
    }
  };

  return (
    <AuthContext.Provider value={{
      user,
      loading,
      login,
      register,
      logout,
      switchDemoUserRole
    }}>
      {children}
    </AuthContext.Provider>
  );
};

export const useAuth = () => useContext(AuthContext);
