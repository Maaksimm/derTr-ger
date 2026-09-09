import { useState } from 'react';
import { Route, Routes, useLocation } from 'react-router-dom';
import './App.css';
import { Footer } from './components/Footer';
import { Header } from './components/Header';
import { SlideoutMenu } from './components/SlideoutMenu';
import { useTheme } from './hooks/useTheme';
import { CardPaymentPage } from './pages/CardPaymentPage';
import { CarFormPage } from './pages/CarFormPage';
import { DeliveryPage } from './pages/DeliveryPage';
import { LafetPage } from './pages/LafetPage';
import { PackageFormPage } from './pages/PackageFormPage';
import { PassengerFormPage } from './pages/PassengerFormPage';
import { PointDetailPage } from './pages/PointDetailPage';
import { PointsPage } from './pages/PointsPage';
import { ReportsPage } from './pages/ReportsPage';
import { RewardFormPage } from './pages/RewardFormPage';
import { RewardPage } from './pages/RewardPage';
import { TrackingPage } from './pages/TrackingPage';
import { TransportationPage } from './pages/TransportationPage';
import { TripsPage } from './pages/TripsPage';

function getActiveNavHref(pathname: string): string {
  if (pathname === '/' || pathname.startsWith('/trip/')) return '/trips';
  if (pathname.startsWith('/lafet')) return '/lafet';
  if (pathname.startsWith('/point')) return '/points';
  if (pathname.startsWith('/reward')) return '/reward';
  if (pathname.startsWith('/reports')) return '/reports/trips';
  return pathname;
}

function App() {
  const [theme, toggleTheme] = useTheme();
  const [menuOpen, setMenuOpen] = useState(false);
  const location = useLocation();

  return (
    <>
      <SlideoutMenu
        open={menuOpen}
        onClose={() => setMenuOpen(false)}
        activeHref={getActiveNavHref(location.pathname)}
      />

      <Header theme={theme} onToggleTheme={toggleTheme} onOpenMenu={() => setMenuOpen(true)} />

      <Routes>
        <Route path="/" element={<TripsPage />} />
        <Route path="/trip/:tripId/passenger" element={<PassengerFormPage />} />
        <Route path="/trip/:tripId/package" element={<PackageFormPage />} />
        <Route path="/transportation" element={<TransportationPage />} />
        <Route path="/delivery" element={<DeliveryPage />} />
        <Route path="/tracking" element={<TrackingPage />} />
        <Route path="/lafet" element={<LafetPage />} />
        <Route path="/lafet/order" element={<CarFormPage />} />
        <Route path="/points" element={<PointsPage />} />
        <Route path="/point/:pointId" element={<PointDetailPage />} />
        <Route path="/reward" element={<RewardPage />} />
        <Route path="/reward/join" element={<RewardFormPage />} />
        <Route path="/reports/trips" element={<ReportsPage />} />
        <Route path="/cardpayment" element={<CardPaymentPage />} />
      </Routes>

      <Footer />
    </>
  );
}

export default App;
