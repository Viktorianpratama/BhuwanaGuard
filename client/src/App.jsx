import { BrowserRouter, Routes, Route } from 'react-router-dom';
import UserLayout from './layouts/UserLayout';
import AdminLayout from './layouts/AdminLayout';

// Pages
import Home from './pages/Home';
import Edukasi from './pages/Edukasi';
import Login from './pages/Login';
import AdminDashboard from './pages/AdminDashboard';
import ManajemenLaporan from './pages/ManajemenLaporan';
import SistemPeringatan from './pages/SistemPeringatan';
import Statistik from './pages/Statistik';

function App() {
  return (
    <BrowserRouter>
      <Routes>
        {/* User Routes */}
        <Route element={<UserLayout />}>
          <Route path="/" element={<Home />} />
          <Route path="/edukasi" element={<Edukasi />} />
        </Route>

        {/* Auth Routes */}
        <Route path="/login" element={<Login />} />

        {/* Admin Routes */}
        <Route path="/admin" element={<AdminLayout />}>
          <Route index element={<AdminDashboard />} />
          <Route path="laporan" element={<ManajemenLaporan />} />
          <Route path="peringatan" element={<SistemPeringatan />} />
          <Route path="statistik" element={<Statistik />} />
        </Route>
      </Routes>
    </BrowserRouter>
  );
}

export default App;
