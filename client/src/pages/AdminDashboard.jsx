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
    <div className="max-w-6xl mx-auto space-y-8 lg:space-y-10">
      
      {/* Header Section */}
      <div className="flex items-center space-x-4">
        <div className="p-3 bg-white rounded-2xl shadow-sm border border-gray-100 text-forest-900 shrink-0">
          <LayoutDashboard className="h-6 w-6 md:h-8 md:w-8" />
        </div>
        <div>
          <h1 className="text-2xl md:text-3xl font-bold text-forest-900 mb-1">Command Centre</h1>
          <p className="text-xs md:text-sm text-gray-500">Selamat datang di Bhuwana Tech tempat pemantauan dan penerima laporan.</p>
        </div>
      </div>

      {/* Stat Cards */}
      <div className="grid grid-cols-2 lg:grid-cols-4 gap-3 md:gap-4">
        {statCards.map((stat, idx) => (
          <div key={idx} className="bg-white rounded-2xl p-4 md:p-6 text-center shadow-sm border border-gray-100 flex flex-col justify-center items-center h-28 md:h-32">
            <h3 className="text-2xl md:text-3xl lg:text-4xl font-bold text-gray-900 mb-1 md:mb-2">{stat.value}</h3>
            <p className="text-[10px] md:text-xs font-semibold text-gray-400 uppercase tracking-wider">{stat.label}</p>
          </div>
        ))}
      </div>

      {/* AKSI CEPAT */}
      <div>
        <h2 className="text-xs md:text-sm font-bold text-gray-900 mb-4 uppercase tracking-wider">AKSI CEPAT</h2>
        <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
          {quickActions.map((action, idx) => (
            <Link key={idx} to={action.path} className="bg-white p-5 md:p-6 rounded-2xl shadow-sm border border-gray-100 hover:border-forest-200 hover:shadow-md transition-all group">
              <div className="flex sm:flex-col items-center text-left sm:text-center space-x-4 sm:space-x-0 sm:space-y-4">
                <div className="p-3 md:p-4 bg-forest-50 text-forest-700 rounded-2xl group-hover:bg-forest-900 group-hover:text-white transition-colors shrink-0">
                  <action.icon className="h-6 w-6 md:h-8 md:w-8" />
                </div>
                <div>
                  <h3 className="font-bold text-sm md:text-base text-gray-900 mb-1 flex items-center justify-start sm:justify-center">
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
          <h2 className="text-xs md:text-sm font-bold text-gray-900 mb-4 uppercase tracking-wider">AKTIVITAS TERBARU</h2>
          <div className="bg-white rounded-2xl shadow-sm border border-gray-100 overflow-hidden flex flex-col h-full">
            <div className="divide-y divide-gray-100 flex-1">
              {recentActivities.map((activity, idx) => (
                <div key={idx} className="p-4 md:p-5 flex justify-between items-start hover:bg-gray-50 transition-colors cursor-default">
                  <div>
                    <h4 className="font-bold text-sm text-gray-900 mb-1">{activity.type}</h4>
                    <p className="text-xs text-gray-500 mb-1">{activity.location}</p>
                    <p className="text-[10px] text-gray-400">{activity.time}</p>
                  </div>
                  <span className={`px-2 py-1 md:px-3 md:py-1.5 rounded-full text-[9px] md:text-[10px] font-bold tracking-wide uppercase shadow-sm ${activity.statusColor}`}>
                    {activity.status}
                  </span>
                </div>
              ))}
            </div>
            <div className="p-4 md:p-5 border-t border-gray-100 flex justify-center">
              <Link to="/admin/laporan" className="px-5 py-2 md:px-6 bg-white border border-gray-200 rounded-full text-xs md:text-sm font-bold text-gray-700 hover:bg-gray-50 transition-colors shadow-sm">
                Lihat Semua Laporan
              </Link>
            </div>
          </div>
        </div>

        {/* LAPORAN HARIAN */}
        <div>
          <h2 className="text-xs md:text-sm font-bold text-gray-900 mb-4 uppercase tracking-wider">LAPORAN HARIAN</h2>
          <div className="bg-white rounded-2xl shadow-sm border border-gray-100 p-5 md:p-6 flex flex-col h-full justify-center">
            <div className="space-y-4 md:space-y-6">
              {dailyReports.map((report, idx) => (
                <div key={idx} className={`flex justify-between items-end ${report.isTotal ? 'pt-4 md:pt-6 mt-2 border-t border-gray-100' : ''}`}>
                  <span className={`text-xs md:text-sm ${report.isTotal ? 'font-bold text-gray-900 text-sm md:text-base' : 'font-medium text-gray-500'}`}>
                    {report.label}
                  </span>
                  <span className={`font-bold ${report.isTotal ? 'text-xl md:text-2xl text-gray-900' : 'text-lg md:text-xl text-gray-700'}`}>
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
