import { AlertTriangle, LayoutDashboard } from 'lucide-react';

const alertStats = [
  { label: 'Alert Aktif', desc: 'Perlu Perhatian Segera', value: '12', color: 'bg-[#ff3b30]', textColor: 'text-white' },
  { label: 'Dalam Proses', desc: 'Sedang Ditangani', value: '5', color: 'bg-[#ffcc00]', textColor: 'text-gray-900' },
  { label: 'Selesai Hari Ini', desc: 'Masalah Terselesaikan', value: '4', color: 'bg-[#34c759]', textColor: 'text-white' },
];

const activeAlerts = [
  { id: '001', severity: 'Urgent', title: 'Salawati (Kabupaten Sorong)', subtitle: 'Yogyakarta', time: '2 Menit Lalu' },
  { id: '002', severity: 'Warning', title: 'Salawati (Kabupaten Sorong)', subtitle: 'Yogyakarta', time: '2 Menit Lalu' },
];

const areaReports = [
  { action: 'Penebangan Liar', location: 'di Jayapura', status: 'Urgent', statusColor: 'text-red-500 border-red-200 bg-red-50', time: '25 Menit' },
  { action: 'Penebangan Liar terdeteksi', location: 'di Jayapura', status: 'Warning', statusColor: 'text-yellow-500 border-yellow-200 bg-yellow-50', time: '6 Jam 25 Menit' },
  { action: 'Penebangan Liar', location: 'di Jayapura', status: 'Normal', statusColor: 'text-gray-500 border-gray-200 bg-gray-50', time: '1 Hari Lalu' },
];

const SistemPeringatan = () => {
  return (
    <div className="max-w-6xl mx-auto space-y-10">
      
      {/* Header */}
      <div className="flex items-center space-x-4">
        <div className="p-3 bg-white rounded-2xl shadow-sm border border-gray-100 text-forest-900">
          <LayoutDashboard className="h-8 w-8" />
        </div>
        <div>
          <h1 className="text-3xl font-bold text-forest-900 mb-1">Sistem Peringatan</h1>
          <p className="text-sm text-gray-500">Monitor dan kelola peringatan sistem secara real-time</p>
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
            <h2 className="font-bold text-gray-900">Alert Aktif</h2>
            <span className="text-xs text-gray-400 font-medium cursor-pointer hover:text-gray-600">Terbaru - Lama</span>
          </div>
          
          <div className="space-y-4">
            {activeAlerts.map((alert, idx) => (
              <div key={idx} className="bg-white p-5 rounded-2xl shadow-sm border border-gray-100 hover:border-forest-200 hover:shadow-md transition-all">
                <div className="flex justify-between items-start mb-4">
                  <span className="text-xs text-gray-400 font-medium">ID : {alert.id}</span>
                  <span className={`text-[10px] font-bold px-3 py-1 rounded-full uppercase tracking-wide ${alert.severity === 'Urgent' ? 'bg-[#ff3b30] text-white' : 'bg-[#ffcc00] text-gray-900'}`}>
                    {alert.severity}
                  </span>
                </div>
                <h3 className="font-bold text-gray-900 text-lg mb-1">{alert.title}</h3>
                <p className="text-sm text-gray-500 mb-6">{alert.subtitle}</p>
                <div className="flex items-center text-xs text-gray-400">
                  <AlertTriangle className="h-3 w-3 mr-1.5" /> {alert.time}
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Right: Area Laporan */}
        <div className="lg:col-span-2">
          <div className="flex justify-between items-end mb-6">
            <h2 className="font-bold text-gray-900">Area Laporan</h2>
            <span className="text-xs text-gray-400 font-medium cursor-pointer hover:text-gray-600">Terbaru</span>
          </div>

          <div className="bg-white rounded-3xl shadow-sm border border-gray-100 overflow-hidden flex flex-col h-full">
            <div className="overflow-x-auto">
              <table className="w-full text-left border-collapse">
                <thead>
                  <tr className="text-xs text-gray-400 font-bold uppercase tracking-wider border-b border-gray-100">
                    <th className="px-6 py-5 w-16">ID</th>
                    <th className="px-6 py-5">ACTION</th>
                    <th className="px-6 py-5">STATUS</th>
                    <th className="px-6 py-5 text-right">TIME</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-gray-50">
                  {areaReports.map((report, idx) => (
                    <tr key={idx} className="hover:bg-gray-50/50 transition-colors">
                      <td className="px-6 py-5 text-xs text-gray-400 font-medium">0{idx + 1}</td>
                      <td className="px-6 py-5">
                        <p className="text-sm font-bold text-gray-900">{report.action}</p>
                        <p className="text-xs text-gray-500">{report.location}</p>
                      </td>
                      <td className="px-6 py-5">
                        <span className={`text-[10px] font-bold px-3 py-1 rounded-full border uppercase tracking-wide inline-block text-center w-20 ${report.statusColor}`}>
                          {report.status}
                        </span>
                      </td>
                      <td className="px-6 py-5 text-xs text-gray-500 font-medium text-right">{report.time}</td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
            
            <div className="p-6 border-t border-gray-100 mt-auto flex justify-between items-center bg-gray-50/30">
              <span className="font-bold text-gray-900 text-lg">Total Aktivitas Hari Ini</span>
              <span className="text-2xl font-black text-gray-900">17</span>
            </div>
          </div>
        </div>

      </div>

    </div>
  );
};

export default SistemPeringatan;
