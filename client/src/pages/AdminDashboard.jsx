import { Link } from 'react-router-dom';
import { Home, AlertTriangle, TrendingUp, LayoutDashboard } from 'lucide-react';

const statCards = [
  { value: '198', label: 'Total Laporan' },
  { value: '21', label: 'Laporan Aktif' },
  { value: '4', label: 'Selesai Hari Ini' },
  { value: '1.7h', label: 'Rata-Rata Respon' },
];

const quickActions = [
  { title: 'Manajemen Laporan', desc: 'Manajemen semua laporan masuk', icon: Home, path: '/admin/laporan' },
  { title: 'Sistem Peringatan', desc: 'Monitor Peringatan Sistem Secara Real-Time', icon: AlertTriangle, path: '/admin/peringatan' },
  { title: 'Statistik', desc: 'Analisis data', icon: TrendingUp, path: '/admin/statistik' },
];

const recentActivities = [
  { type: 'Penebangan Liar', location: 'Jayapura, Papua', time: '11 Menit yang lalu', status: 'Baru', statusColor: 'bg-red-500 text-white' },
  { type: 'Perburuan Burung Cendrawasih', location: 'Sorong, Papua', time: '25 Menit yang lalu', status: 'Proses', statusColor: 'bg-yellow-400 text-white' },
  { type: 'Buaya Memasuki Pemukiman Warga', location: 'Manokwari, Papua', time: '25 Menit yang lalu', status: 'Proses', statusColor: 'bg-yellow-400 text-white' },
];

const dailyReports = [
  { label: 'Laporan Masuk', value: '17' },
  { label: 'Dalam Proses', value: '5' },
  { label: 'Selesai', value: '4' },
  { label: 'Total', value: '26', isTotal: true },
];

const AdminDashboard = () => {
  return (
    <div className="max-w-6xl mx-auto space-y-10">
      
      {/* Header Section */}
      <div className="flex items-center space-x-4">
        <div className="p-3 bg-white rounded-2xl shadow-sm border border-gray-100 text-forest-900">
          <LayoutDashboard className="h-8 w-8" />
        </div>
        <div>
          <h1 className="text-3xl font-bold text-forest-900 mb-1">Command Centre</h1>
          <p className="text-sm text-gray-500">Selamat datang di Bhuwana Tech tempat pemantauan dan penerima laporan.</p>
        </div>
      </div>

      {/* Stat Cards */}
      <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
        {statCards.map((stat, idx) => (
          <div key={idx} className="bg-white rounded-2xl p-6 text-center shadow-sm border border-gray-100 flex flex-col justify-center items-center h-32">
            <h3 className="text-4xl font-bold text-gray-900 mb-2">{stat.value}</h3>
            <p className="text-xs font-semibold text-gray-400 uppercase tracking-wider">{stat.label}</p>
          </div>
        ))}
      </div>

      {/* AKSI CEPAT */}
      <div>
        <h2 className="text-sm font-bold text-gray-900 mb-4 uppercase tracking-wider">AKSI CEPAT</h2>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
          {quickActions.map((action, idx) => (
            <Link key={idx} to={action.path} className="bg-white p-6 rounded-2xl shadow-sm border border-gray-100 hover:border-forest-200 hover:shadow-md transition-all group">
              <div className="flex flex-col items-center text-center space-y-4">
                <div className="p-4 bg-forest-50 text-forest-700 rounded-2xl group-hover:bg-forest-900 group-hover:text-white transition-colors">
                  <action.icon className="h-8 w-8" />
                </div>
                <div>
                  <h3 className="font-bold text-gray-900 mb-1 flex items-center justify-center">
                    {action.title} <span className="ml-1 opacity-0 group-hover:opacity-100 transition-opacity">→</span>
                  </h3>
                  <p className="text-xs text-gray-500 leading-relaxed">{action.desc}</p>
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
          <h2 className="text-sm font-bold text-gray-900 mb-4 uppercase tracking-wider">AKTIVITAS TERBARU</h2>
          <div className="bg-white rounded-2xl shadow-sm border border-gray-100 overflow-hidden flex flex-col h-full">
            <div className="divide-y divide-gray-100 flex-1">
              {recentActivities.map((activity, idx) => (
                <div key={idx} className="p-5 flex justify-between items-start hover:bg-gray-50 transition-colors cursor-default">
                  <div>
                    <h4 className="font-bold text-gray-900 mb-1">{activity.type}</h4>
                    <p className="text-xs text-gray-500 mb-1">{activity.location}</p>
                    <p className="text-[10px] text-gray-400">{activity.time}</p>
                  </div>
                  <span className={`px-3 py-1 rounded-full text-[10px] font-bold tracking-wide uppercase shadow-sm ${activity.statusColor}`}>
                    {activity.status}
                  </span>
                </div>
              ))}
            </div>
            <div className="p-5 border-t border-gray-100 flex justify-center">
              <Link to="/admin/laporan" className="px-6 py-2 bg-white border border-gray-200 rounded-full text-sm font-bold text-gray-700 hover:bg-gray-50 transition-colors shadow-sm">
                Lihat Semua Laporan
              </Link>
            </div>
          </div>
        </div>

        {/* LAPORAN HARIAN */}
        <div>
          <h2 className="text-sm font-bold text-gray-900 mb-4 uppercase tracking-wider">LAPORAN HARIAN</h2>
          <div className="bg-white rounded-2xl shadow-sm border border-gray-100 p-6 flex flex-col h-full justify-center">
            <div className="space-y-6">
              {dailyReports.map((report, idx) => (
                <div key={idx} className={`flex justify-between items-end ${report.isTotal ? 'pt-6 mt-2 border-t border-gray-100' : ''}`}>
                  <span className={`text-sm ${report.isTotal ? 'font-bold text-gray-900 text-base' : 'font-medium text-gray-500'}`}>
                    {report.label}
                  </span>
                  <span className={`font-bold ${report.isTotal ? 'text-2xl text-gray-900' : 'text-xl text-gray-700'}`}>
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
