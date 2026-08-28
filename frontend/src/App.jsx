import React from 'react';
import { Routes, Route, useLocation } from 'react-router-dom';
import { AuthProvider } from './context/AuthContext';
import { CityProvider } from './context/CityContext';
import { Navbar } from './components/layout/Navbar';
import { Footer } from './components/layout/Footer';
import { MobileNav } from './components/layout/MobileNav';
import { CityPickerModal } from './components/common/CityPickerModal';

// Customer Pages
import { HomePage } from './pages/HomePage';
import { MajdoorServicesPage } from './pages/MajdoorServicesPage';
import { AllServicesPage } from './pages/AllServicesPage';

// Admin Components & Pages
import { AdminLayout } from './components/layout/AdminLayout';
import { AdminDashboardPage } from './pages/admin/AdminDashboardPage';
import { AdminBookingsPage } from './pages/admin/AdminBookingsPage';
import { AdminWorkforcePage } from './pages/admin/AdminWorkforcePage';
import { AdminAssignmentsPage } from './pages/admin/AdminAssignmentsPage';
import { AdminServicesPage } from './pages/admin/AdminServicesPage';
import { AdminCitiesPage } from './pages/admin/AdminCitiesPage';
import { AdminReviewsPage } from './pages/admin/AdminReviewsPage';
import { AdminReportsPage } from './pages/admin/AdminReportsPage';

export const App = () => {
  const location = useLocation();
  const isAdminRoute = location.pathname.startsWith('/admin');

  return (
    <AuthProvider>
      <CityProvider>
        <div className="min-h-screen flex flex-col bg-[#F8FAFC]">

          {/* Render Navbar on Customer Pages */}
          {!isAdminRoute && <Navbar />}

          {/* City Picker Modal */}
          <CityPickerModal />

          {/* Main Routing Canvas */}
          <div className="flex-1">
            <Routes>
              {/* Customer Routes */}
              <Route path="/" element={<HomePage />} />
              <Route path="/majdoor" element={<MajdoorServicesPage />} />
              <Route path="/services" element={<AllServicesPage />} />
              <Route path="/book" element={<HomePage />} />

              {/* Admin Portal Routes */}
              <Route path="/admin" element={<AdminLayout />}>
                <Route index element={<AdminDashboardPage />} />
                <Route path="bookings" element={<AdminBookingsPage />} />
                <Route path="workforce" element={<AdminWorkforcePage />} />
                <Route path="assignments" element={<AdminAssignmentsPage />} />
                <Route path="services" element={<AdminServicesPage />} />
                <Route path="cities" element={<AdminCitiesPage />} />
                <Route path="reviews" element={<AdminReviewsPage />} />
                <Route path="reports" element={<AdminReportsPage />} />
              </Route>
            </Routes>
          </div>

          {/* Render Footer & Mobile Nav on Customer Pages */}
          {!isAdminRoute && <Footer />}
          {!isAdminRoute && <MobileNav />}

        </div>
      </CityProvider>
    </AuthProvider>
  );
};

export default App;
