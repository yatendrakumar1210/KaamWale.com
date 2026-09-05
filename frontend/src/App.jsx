import React, { Suspense, lazy } from 'react';
import { Routes, Route, useLocation } from 'react-router-dom';
import { AuthProvider } from './context/AuthContext';
import { CityProvider } from './context/CityContext';
import { Navbar } from './components/layout/Navbar';
import { Footer } from './components/layout/Footer';
import { MobileNav } from './components/layout/MobileNav';
import { CityPickerModal } from './components/common/CityPickerModal';
import { Loader2 } from 'lucide-react';

// Direct import for critical entry page for zero-delay initial load
import { HomePage } from './pages/HomePage';

// Lazy-loaded secondary pages (downloaded on-demand when navigated)
const MajdoorServicesPage = lazy(() => import('./pages/MajdoorServicesPage').then(m => ({ default: m.MajdoorServicesPage })));
const AllServicesPage = lazy(() => import('./pages/AllServicesPage').then(m => ({ default: m.AllServicesPage })));
const BookingWizardPage = lazy(() => import('./pages/BookingWizardPage').then(m => ({ default: m.BookingWizardPage })));
const BookingConfirmationPage = lazy(() => import('./pages/BookingConfirmationPage').then(m => ({ default: m.BookingConfirmationPage })));
const CustomerDashboardPage = lazy(() => import('./pages/CustomerDashboardPage').then(m => ({ default: m.CustomerDashboardPage })));
const BookingTrackingPage = lazy(() => import('./pages/BookingTrackingPage').then(m => ({ default: m.BookingTrackingPage })));

// Lazy-loaded Admin pages
const AdminLayout = lazy(() => import('./components/layout/AdminLayout').then(m => ({ default: m.AdminLayout })));
const AdminDashboardPage = lazy(() => import('./pages/admin/AdminDashboardPage').then(m => ({ default: m.AdminDashboardPage })));
const AdminBookingsPage = lazy(() => import('./pages/admin/AdminBookingsPage').then(m => ({ default: m.AdminBookingsPage })));
const AdminWorkforcePage = lazy(() => import('./pages/admin/AdminWorkforcePage').then(m => ({ default: m.AdminWorkforcePage })));
const AdminAssignmentsPage = lazy(() => import('./pages/admin/AdminAssignmentsPage').then(m => ({ default: m.AdminAssignmentsPage })));
const AdminServicesPage = lazy(() => import('./pages/admin/AdminServicesPage').then(m => ({ default: m.AdminServicesPage })));
const AdminCitiesPage = lazy(() => import('./pages/admin/AdminCitiesPage').then(m => ({ default: m.AdminCitiesPage })));
const AdminReviewsPage = lazy(() => import('./pages/admin/AdminReviewsPage').then(m => ({ default: m.AdminReviewsPage })));
const AdminReportsPage = lazy(() => import('./pages/admin/AdminReportsPage').then(m => ({ default: m.AdminReportsPage })));

const PageLoader = () => (
  <div className="min-h-[60vh] flex flex-col items-center justify-center gap-3 text-slate-500">
    <Loader2 className="w-8 h-8 text-[#155EEF] animate-spin" />
    <span className="text-xs font-bold tracking-wide">Loading KaamWale...</span>
  </div>
);

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
            <Suspense fallback={<PageLoader />}>
              <Routes>
                {/* Customer Routes */}
                <Route path="/" element={<HomePage />} />
                <Route path="/majdoor" element={<MajdoorServicesPage />} />
                <Route path="/services" element={<AllServicesPage />} />
                <Route path="/book" element={<BookingWizardPage />} />
                <Route path="/booking-wizard" element={<BookingWizardPage />} />
                <Route path="/booking-success/:id" element={<BookingConfirmationPage />} />
                <Route path="/my-bookings" element={<CustomerDashboardPage />} />
                <Route path="/track/:id" element={<BookingTrackingPage />} />

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
            </Suspense>
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
