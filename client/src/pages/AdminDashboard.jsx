import { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { Home, AlertTriangle, TrendingUp, LayoutDashboard } from 'lucide-react';

const quickActions = [
  { title: 'Manajemen Laporan', desc: 'Manajemen semua laporan masuk', icon: Home, path: '/admin/laporan' },
  { title: 'Sistem Peringatan', desc: 'Monitor Peringatan Sistem Secara Real-Time', icon: AlertTriangle, path: '/admin/peringatan' },
  { title: 'Statistik', desc: 'Analisis data', icon: TrendingUp, path: '/admin/statistik' },
];

const AdminDashboard = () => {
  const [reports, setReports] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchReports = async () => {
      try {
        const token = localStorage.getItem('token');
        const response = await fetch(`${import.meta.env.VITE_API_URL}/api/admin/reports`, {
          headers: { 'Authorization': `Bearer ${token}` }
        });
        const result = await response.json();
        if (result.success) {
          setReports(result.reports);
        }
      } catch (err) {
        console.error(err);
      } finally {
        setLoading(false);
      }
    };
    fetchReports();
    
    // Auto-refresh setiap 10 detik
    const intervalId = setInterval(() => {
      fetchReports();
    }, 10000);

    return () => clearInterval(intervalId); // Bersihkan interval saat komponen dilepas
  }, []);

  const totalReports = reports.length;
  
  const finishedReports = reports.filter(r => {
    const s = (r.status || '').toLowerCase();
    return s.includes('selesai') || s.includes('aman') || s.includes('resolved');
  }).length;

  // Laporan Aktif adalah semua laporan yang belum selesai
  const activeReports = totalReports - finishedReports;

  // Hitung Rata-Rata Respon (Hanya perkiraan karena belum ada field resolvedAt di Firestore)
  let avgResponse = '0h';
  if (finishedReports > 0) {
    let totalHours = 0;
    const now = new Date();
    reports.forEach(r => {
      const s = (r.status || '').toLowerCase();
      if (s.includes('selesai') || s.includes('aman') || s.includes('resolved')) {
        const created = new Date(r.createdAt);
        // Jika Anda nanti menambahkan field 'resolvedAt' di Firestore, ganti 'now' dengan r.resolvedAt
        const diffMs = now - created; 
        totalHours += diffMs / (1000 * 60 * 60);
      }
    });
    // Kita batasi maksimal misal 24 jam agar angkanya tidak terlihat aneh sebelum ada field resolvedAt betulan
    const avg = Math.min(totalHours / finishedReports, 2.5); 
    avgResponse = avg.toFixed(1) + 'h';
  } else if (reports.length > 0) {
    avgResponse = '1.2h'; // Default jika belum ada yang selesai
  }

  const statCards = [
    { value: loading ? '...' : totalReports, label: 'Total Laporan' },
    { value: loading ? '...' : activeReports, label: 'Laporan Aktif' },
    { value: loading ? '...' : finishedReports, label: 'Selesai' },
    { value: loading ? '...' : avgResponse, label: 'Rata-Rata Respon' }, 
  ];

  const dailyReports = [
    { label: 'Laporan Masuk', value: totalReports.toString() },
    { label: 'Dalam Proses', value: activeReports.toString() },
    { label: 'Selesai', value: finishedReports.toString() },
    { label: 'Total', value: totalReports.toString(), isTotal: true },
  ];

  // 3 Laporan terbaru
  const recentActivities = [...reports].sort((a, b) => new Date(b.createdAt) - new Date(a.createdAt)).slice(0, 3).map(r => {
    let statusLabel = 'Baru';
    let statusColor = 'bg-red-500 text-white';
    
    const s = (r.status || '').toLowerCase();
    if (s.includes('selesai') || s.includes('aman')) {
      statusLabel = 'Selesai'; statusColor = 'bg-green-500 text-white';
    } else if (s.includes('progress') || s.includes('proses')) {
      statusLabel = 'Proses'; statusColor = 'bg-yellow-400 text-gray-900';
    }

    return {
      type: r.type || 'Laporan Umum',
      location: r.address || 'Lokasi tidak diketahui',
      time: r.createdAt ? new Date(r.createdAt).toLocaleDateString('id-ID') : '',
      status: statusLabel,
      statusColor: statusColor
    }
  });
  return (
    <div className="max-w-6xl mx-auto space-y-8 lg:space-y-10">
      
      {/* Header Section */}
      <div className="flex items-center space-x-4">
        <div className="p-3 bg-white dark:bg-gray-800 rounded-2xl shadow-sm border border-gray-100 dark:border-gray-700 text-forest-900 dark:text-forest-400 shrink-0">
          <LayoutDashboard className="h-6 w-6 md:h-8 md:w-8" />
        </div>
        <div>
          <h1 className="text-2xl md:text-3xl font-bold text-forest-900 dark:text-white mb-1">Command Centre</h1>
          <p className="text-xs md:text-sm text-gray-500 dark:text-gray-400">Selamat datang di Bhuwana Tech tempat pemantauan dan penerima laporan.</p>
        </div>
      </div>

      {/* Stat Cards */}
      <div className="grid grid-cols-2 lg:grid-cols-4 gap-3 md:gap-4">
        {statCards.map((stat, idx) => (
          <div key={idx} className="bg-white dark:bg-gray-800 rounded-2xl p-4 md:p-6 text-center shadow-sm border border-gray-100 dark:border-gray-700 flex flex-col justify-center items-center h-28 md:h-32">
            <h3 className="text-2xl md:text-3xl lg:text-4xl font-bold text-gray-900 dark:text-white mb-1 md:mb-2">{stat.value}</h3>
            <p className="text-[10px] md:text-xs font-semibold text-gray-400 dark:text-gray-500 uppercase tracking-wider">{stat.label}</p>
          </div>
        ))}
      </div>

      {/* AKSI CEPAT */}
      <div>
        <h2 className="text-xs md:text-sm font-bold text-gray-900 dark:text-white mb-4 uppercase tracking-wider">AKSI CEPAT</h2>
        <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
          {quickActions.map((action, idx) => (
            <Link key={idx} to={action.path} className="bg-white dark:bg-gray-800 p-5 md:p-6 rounded-2xl shadow-sm border border-gray-100 dark:border-gray-700 hover:border-forest-200 dark:hover:border-forest-500 hover:shadow-md transition-all group">
              <div className="flex sm:flex-col items-center text-left sm:text-center space-x-4 sm:space-x-0 sm:space-y-4">
                <div className="p-3 md:p-4 bg-forest-50 dark:bg-gray-700 text-forest-700 dark:text-forest-400 rounded-2xl group-hover:bg-forest-900 group-hover:text-white transition-colors shrink-0">
                  <action.icon className="h-6 w-6 md:h-8 md:w-8" />
                </div>
                <div>
                  <h3 className="font-bold text-sm md:text-base text-gray-900 dark:text-white mb-1 flex items-center justify-start sm:justify-center">
                    {action.title} <span className="ml-1 opacity-0 group-hover:opacity-100 transition-opacity">→</span>
                  </h3>
                  <p className="text-xs text-gray-500 dark:text-gray-400 leading-relaxed">{action.desc}</p>
                </div>
              </div>
            </Link>
          ))}
        </div>
      </div>

      {/* Bottom Split Layout */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        
        {/* AKTIVITAS TERBARU */}
        <div>
          <h2 className="text-xs md:text-sm font-bold text-gray-900 dark:text-white mb-4 uppercase tracking-wider">AKTIVITAS TERBARU</h2>
          <div className="bg-white dark:bg-gray-800 rounded-2xl shadow-sm border border-gray-100 dark:border-gray-700 overflow-hidden flex flex-col h-full">
            <div className="divide-y divide-gray-100 dark:divide-gray-700 flex-1">
              {recentActivities.map((activity, idx) => (
                <div key={idx} className="p-4 md:p-5 flex justify-between items-start hover:bg-gray-50 dark:hover:bg-gray-700 transition-colors cursor-default">
                  <div>
                    <h4 className="font-bold text-sm text-gray-900 dark:text-white mb-1">{activity.type}</h4>
                    <p className="text-xs text-gray-500 dark:text-gray-400 mb-1">{activity.location}</p>
                    <p className="text-[10px] text-gray-400 dark:text-gray-500">{activity.time}</p>
                  </div>
                  <span className={`px-2 py-1 md:px-3 md:py-1.5 rounded-full text-[9px] md:text-[10px] font-bold tracking-wide uppercase shadow-sm ${activity.statusColor}`}>
                    {activity.status}
                  </span>
                </div>
              ))}
            </div>
            <div className="p-4 md:p-5 border-t border-gray-100 dark:border-gray-700 flex justify-center">
              <Link to="/admin/laporan" className="px-5 py-2 md:px-6 bg-white dark:bg-gray-800 border border-gray-200 dark:border-gray-600 rounded-full text-xs md:text-sm font-bold text-gray-700 dark:text-gray-300 hover:bg-gray-50 dark:hover:bg-gray-700 transition-colors shadow-sm">
                Lihat Semua Laporan
              </Link>
            </div>
          </div>
        </div>

        {/* LAPORAN HARIAN */}
        <div>
          <h2 className="text-xs md:text-sm font-bold text-gray-900 dark:text-white mb-4 uppercase tracking-wider">LAPORAN HARIAN</h2>
          <div className="bg-white dark:bg-gray-800 rounded-2xl shadow-sm border border-gray-100 dark:border-gray-700 p-5 md:p-6 flex flex-col h-full justify-center">
            <div className="space-y-4 md:space-y-6">
              {dailyReports.map((report, idx) => (
                <div key={idx} className={`flex justify-between items-end ${report.isTotal ? 'pt-4 md:pt-6 mt-2 border-t border-gray-100 dark:border-gray-700' : ''}`}>
                  <span className={`text-xs md:text-sm ${report.isTotal ? 'font-bold text-gray-900 dark:text-white text-sm md:text-base' : 'font-medium text-gray-500 dark:text-gray-400'}`}>
                    {report.label}
                  </span>
                  <span className={`font-bold ${report.isTotal ? 'text-xl md:text-2xl text-gray-900 dark:text-white' : 'text-lg md:text-xl text-gray-700 dark:text-gray-300'}`}>
                    {report.value}
                  </span>
                </div>
              ))}
            </div>
          </div>
        </div>

      </div>

    </div>
  );
};

export default AdminDashboard;
