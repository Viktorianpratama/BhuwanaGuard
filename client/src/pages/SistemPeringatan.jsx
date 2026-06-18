import { useState, useEffect } from 'react';
import { AlertTriangle, Home } from 'lucide-react';
import { Link } from 'react-router-dom';

const SistemPeringatan = () => {
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
    
    const intervalId = setInterval(() => {
      fetchReports();
    }, 10000);

    return () => clearInterval(intervalId);
  }, []);

  const totalReports = reports.length;
  const activeAlertsCount = reports.filter(r => {
    const s = (r.status || '').toLowerCase();
    return !s.includes('proses') && !s.includes('progress') && !s.includes('selesai') && !s.includes('aman') && !s.includes('resolved');
  }).length;
  
  const inProgressCount = reports.filter(r => {
    const s = (r.status || '').toLowerCase();
    return s.includes('proses') || s.includes('progress');
  }).length;

  const finishedCount = reports.filter(r => {
    const s = (r.status || '').toLowerCase();
    return s.includes('selesai') || s.includes('aman') || s.includes('resolved');
  }).length;

  const alertStats = [
    { label: 'Diterima (Baru)', desc: 'Perlu Perhatian Segera', value: loading ? '...' : activeAlertsCount, color: 'bg-[#ff3b30]', textColor: 'text-white' },
    { label: 'Dalam Proses', desc: 'Sedang Ditangani', value: loading ? '...' : inProgressCount, color: 'bg-[#ffcc00]', textColor: 'text-gray-900' },
    { label: 'Selesai', desc: 'Masalah Terselesaikan', value: loading ? '...' : finishedCount, color: 'bg-[#34c759]', textColor: 'text-white' },
  ];

  const activeAlerts = reports.filter(r => {
    const s = (r.status || '').toLowerCase();
    return !s.includes('selesai') && !s.includes('aman') && !s.includes('resolved');
  }).sort((a, b) => new Date(b.createdAt) - new Date(a.createdAt)).map(r => {
    const s = (r.status || '').toLowerCase();
    let severity = 'Diproses';
    if (!s.includes('proses') && !s.includes('progress')) severity = 'Diterima';
    
    return {
      id: r.id.substring(0, 5),
      severity: severity,
      title: r.type || 'Laporan Umum',
      subtitle: r.address || 'Lokasi tidak diketahui',
      time: r.createdAt ? new Date(r.createdAt).toLocaleDateString('id-ID') : ''
    };
  });

  const areaReports = [...reports].sort((a, b) => new Date(b.createdAt) - new Date(a.createdAt)).map(r => {
    const s = (r.status || '').toLowerCase();
    let statusLabel = 'Diterima';
    let statusColor = 'text-red-500 border-red-200 bg-red-50';

    if (s.includes('selesai') || s.includes('aman') || s.includes('resolved')) {
      statusLabel = 'Selesai'; statusColor = 'text-green-500 border-green-200 bg-green-50';
    } else if (s.includes('proses') || s.includes('progress')) {
      statusLabel = 'Diproses'; statusColor = 'text-yellow-500 border-yellow-200 bg-yellow-50';
    }

    return {
      action: r.type || 'Laporan Kejadian',
      location: r.address || 'Lokasi tidak diketahui',
      status: statusLabel,
      statusColor: statusColor,
      time: r.createdAt ? new Date(r.createdAt).toLocaleDateString('id-ID') : ''
    }
  });
  return (
    <div className="max-w-6xl mx-auto space-y-10">
      
      {/* Header */}
      <div className="flex items-center space-x-4">
        <div className="p-3 bg-white dark:bg-gray-800 rounded-2xl shadow-sm border border-gray-100 dark:border-gray-700 text-forest-900 dark:text-forest-400 hover:bg-forest-50 dark:hover:bg-gray-700 transition-colors">
          <Link to="/admin" className="flex items-center justify-center">
            <Home className="h-8 w-8 cursor-pointer" />
          </Link>
        </div>
        <div>
          <h1 className="text-3xl font-bold text-forest-900 dark:text-white mb-1">Sistem Peringatan</h1>
          <p className="text-sm text-gray-500 dark:text-gray-400">Monitor dan kelola peringatan sistem secara real-time</p>
        </div>
      </div>

      {/* Stat Cards */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
        {alertStats.map((stat, idx) => (
          <div key={idx} className={`${stat.color} ${stat.textColor} rounded-3xl p-8 flex flex-col justify-between h-40 shadow-sm transition-transform hover:scale-[1.02] cursor-default`}>
            <div className="flex items-end space-x-4">
              <span className="text-6xl font-black leading-none">{stat.value}</span>
              <div className="mb-1">
                <h3 className="font-bold text-lg leading-tight">{stat.label}</h3>
                <p className="text-xs opacity-80 font-medium">{stat.desc}</p>
              </div>
            </div>
          </div>
        ))}
      </div>

      {/* Split Layout */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
        
        {/* Left: Alert Aktif */}
        <div className="lg:col-span-1 space-y-4">
          <div className="flex justify-between items-end mb-2">
            <h2 className="font-bold text-gray-900 dark:text-white">Alert Aktif</h2>
            <span className="text-xs text-gray-400 dark:text-gray-500 font-medium cursor-pointer hover:text-gray-600 dark:hover:text-gray-300">Terbaru - Lama</span>
          </div>
          
          <div className="space-y-4">
            {activeAlerts.map((alert, idx) => (
              <div key={idx} className="bg-white dark:bg-gray-800 p-5 rounded-2xl shadow-sm border border-gray-100 dark:border-gray-700 hover:border-forest-200 dark:hover:border-forest-500 hover:shadow-md transition-all">
                <div className="flex justify-between items-start mb-4">
                  <span className="text-xs text-gray-400 dark:text-gray-500 font-medium">ID : {alert.id}</span>
                  <span className={`text-[10px] font-bold px-3 py-1 rounded-full uppercase tracking-wide ${alert.severity === 'Diterima' ? 'bg-[#ff3b30] text-white' : 'bg-[#ffcc00] text-gray-900 dark:text-gray-900'}`}>
                    {alert.severity}
                  </span>
                </div>
                <h3 className="font-bold text-gray-900 dark:text-white text-lg mb-1">{alert.title}</h3>
                <p className="text-sm text-gray-500 dark:text-gray-400 mb-6">{alert.subtitle}</p>
                <div className="flex items-center text-xs text-gray-400 dark:text-gray-500">
                  <AlertTriangle className="h-3 w-3 mr-1.5" /> {alert.time}
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Right: Area Laporan */}
        <div className="lg:col-span-2">
          <div className="flex justify-between items-end mb-6">
            <h2 className="font-bold text-gray-900 dark:text-white">Area Laporan</h2>
            <span className="text-xs text-gray-400 dark:text-gray-500 font-medium cursor-pointer hover:text-gray-600 dark:hover:text-gray-300">Terbaru</span>
          </div>

          <div className="bg-white dark:bg-gray-800 rounded-3xl shadow-sm border border-gray-100 dark:border-gray-700 overflow-hidden flex flex-col h-full">
            <div className="overflow-x-auto">
              <table className="w-full text-left border-collapse">
                <thead>
                  <tr className="text-xs text-gray-400 dark:text-gray-500 font-bold uppercase tracking-wider border-b border-gray-100 dark:border-gray-700">
                    <th className="px-6 py-5 w-16">ID</th>
                    <th className="px-6 py-5">ACTION</th>
                    <th className="px-6 py-5">STATUS</th>
                    <th className="px-6 py-5 text-right">TIME</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-gray-50 dark:divide-gray-700/50">
                  {areaReports.map((report, idx) => (
                    <tr key={idx} className="hover:bg-gray-50/50 dark:hover:bg-gray-700/50 transition-colors">
                      <td className="px-6 py-5 text-xs text-gray-400 dark:text-gray-500 font-medium">0{idx + 1}</td>
                      <td className="px-6 py-5">
                        <p className="text-sm font-bold text-gray-900 dark:text-white">{report.action}</p>
                        <p className="text-xs text-gray-500 dark:text-gray-400">{report.location}</p>
                      </td>
                      <td className="px-6 py-5">
                        <span className={`text-[10px] font-bold px-3 py-1 rounded-full border uppercase tracking-wide inline-block text-center w-20 ${report.statusColor}`}>
                          {report.status}
                        </span>
                      </td>
                      <td className="px-6 py-5 text-xs text-gray-500 dark:text-gray-400 font-medium text-right">{report.time}</td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
            
            <div className="p-6 border-t border-gray-100 dark:border-gray-700 mt-auto flex justify-between items-center bg-gray-50/30 dark:bg-gray-900/30">
              <span className="font-bold text-gray-900 dark:text-white text-lg">Total Aktivitas Sistem</span>
              <span className="text-2xl font-black text-gray-900 dark:text-white">{loading ? '...' : totalReports}</span>
            </div>
          </div>
        </div>

      </div>

    </div>
  );
};

export default SistemPeringatan;
