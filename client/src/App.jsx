import React, { Suspense } from 'react';
import { BrowserRouter, Routes, Route } from 'react-router-dom';
import UserLayout from './layouts/UserLayout';
import AdminLayout from './layouts/AdminLayout';
import ProtectedRoute from './components/ProtectedRoute';

// Lazy load Pages
const Home = React.lazy(() => import('./pages/Home'));
const Edukasi = React.lazy(() => import('./pages/Edukasi'));
const EdukasiDetail = React.lazy(() => import('./pages/EdukasiDetail'));
const About = React.lazy(() => import('./pages/About'));
const PetaRawan = React.lazy(() => import('./pages/PetaRawan'));
const Relawan = React.lazy(() => import('./pages/Relawan'));
const Login = React.lazy(() => import('./pages/Login'));
const AdminDashboard = React.lazy(() => import('./pages/AdminDashboard'));
const ManajemenLaporan = React.lazy(() => import('./pages/ManajemenLaporan'));
const SistemPeringatan = React.lazy(() => import('./pages/SistemPeringatan'));
const Statistik = React.lazy(() => import('./pages/Statistik'));
const ManajemenAkun = React.lazy(() => import('./pages/ManajemenAkun'));

// Simple loading fallback
const PageLoader = () => (
  <div className="flex items-center justify-center min-h-screen bg-gray-50">
    <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-forest-600"></div>
  </div>
);

function App() {
  return (
    <BrowserRouter>
      <Suspense fallback={<PageLoader />}>
        <Routes>
          {/* User Routes */}
          <Route element={<UserLayout />}>
            <Route path="/" element={<Home />} />
            <Route path="/edukasi" element={<Edukasi />} />
            <Route path="/edukasi/:id" element={<EdukasiDetail />} />
            <Route path="/about" element={<About />} />
            <Route path="/peta" element={<PetaRawan />} />
            <Route path="/relawan" element={<Relawan />} />
          </Route>

          {/* Auth Routes */}
          <Route path="/login" element={<Login />} />

          {/* Admin Routes */}
          <Route element={<ProtectedRoute />}>
            <Route path="/admin" element={<AdminLayout />}>
              <Route index element={<AdminDashboard />} />
              <Route path="laporan" element={<ManajemenLaporan />} />
              <Route path="peringatan" element={<SistemPeringatan />} />
              <Route path="statistik" element={<Statistik />} />
              <Route path="akun" element={<ManajemenAkun />} />
            </Route>
          </Route>
        </Routes>
      </Suspense>
    </BrowserRouter>
  );
}

export default App;
