import { useState } from 'react';
import { Search, ChevronLeft, Image as ImageIcon, Home } from 'lucide-react';

const dummyReports = [
  {
    id: 1,
    type: 'Penebangan Liar',
    location: 'Jayapura, Papua',
    time: '11 Menit yang lalu',
    status: 'Menunggu Validasi',
    severity: 'Tinggi',
    desc: 'Terdengar suara gergaji mesin dan aktivitas alat berat di area hutan lindung.',
    image: 'https://images.unsplash.com/photo-1628075264522-541fc688e9d9?q=80&w=1170&auto=format&fit=crop&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D'
  },
  {
    id: 2,
    type: 'Perburuan Burung Cendrawasih',
    location: 'Sorong, Papua',
    time: '25 Menit yang lalu',
    status: 'Diproses',
    severity: 'Sedang',
    desc: 'Ditemukan perangkap burung di beberapa titik dekat sungai.',
    image: 'https://media.istockphoto.com/id/2266723898/id/foto/burung-cendrawasih-yang-lebih-besar-di-new-guinea-dan-indonesia.webp?a=1&b=1&s=612x612&w=0&k=20&c=iM1UUgZGB7mPTBbVBffSJYu7kMF5K5YR2f1AaU2v1w4='
  }
];

const ManajemenLaporan = () => {
  const [reports, setReports] = useState(dummyReports);
  const [selectedReportId, setSelectedReportId] = useState(null);
  const [filter, setFilter] = useState('Semua');

  const selectedReport = reports.find(r => r.id === selectedReportId);

  const handlePushToMobile = (id) => {
    // Simulasi push ke mobile
    setReports(reports.map(r => 
      r.id === id ? { ...r, status: 'Diteruskan ke Lapangan' } : r
    ));
  };

  const getStatusColor = (status) => {
    switch(status) {
      case 'Menunggu Validasi': return 'bg-gray-500 text-white';
      case 'Diproses': return 'bg-yellow-400 text-white';
      case 'Diteruskan ke Lapangan': return 'bg-blue-500 text-white';
      default: return 'bg-gray-500 text-white';
    }
  };

  const filteredReports = reports.filter(r => {
    if (filter === 'Semua') return true;
    return r.status.toLowerCase().includes(filter.toLowerCase());
  });

  return (
    <div className="max-w-7xl mx-auto space-y-6">
      
      {/* Jika ada report yang dipilih, tampilkan Layout Detail (Kanan), kalau tidak, tampilkan Daftar (Kiri) */}
      <div className="flex flex-col lg:flex-row gap-6 h-[calc(100vh-120px)]">
        
        {/* Kolom Kiri: Daftar Laporan */}
        <div className={`w-full ${selectedReportId ? 'lg:w-1/3 hidden lg:flex' : 'lg:w-full'} flex-col bg-white rounded-3xl shadow-sm border border-gray-100 overflow-hidden transition-all duration-500`}>
          <div className="p-6 border-b border-gray-100">
            <h1 className="text-2xl font-bold text-forest-900 mb-1 flex items-center">
              <Home className="h-6 w-6 mr-2" /> Manajemen Laporan
            </h1>
            <p className="text-xs text-gray-500 mb-6">Bagian Manajemen Semua Laporan Masuk</p>

            <div className="relative mb-4">
              <Search className="absolute left-4 top-1/2 -translate-y-1/2 h-4 w-4 text-gray-400" />
              <input 
                type="text" 
                placeholder="Cari nama pelapor atau lokasi" 
                className="w-full pl-11 pr-4 py-3 text-sm border border-gray-200 rounded-2xl focus:outline-none focus:ring-2 focus:ring-forest-500"
              />
            </div>

            <div className="flex gap-2">
              {['Semua', 'Diproses', 'Selesai'].map(f => (
                <button 
                  key={f}
                  onClick={() => setFilter(f)}
                  className={`px-4 py-1.5 rounded-full text-xs font-bold border transition-colors ${filter === f ? 'border-forest-500 text-forest-700 bg-forest-50' : 'border-gray-200 text-gray-500 hover:bg-gray-50'}`}
                >
                  {f}
                </button>
              ))}
            </div>
          </div>

          <div className="flex-1 overflow-y-auto p-4 space-y-4">
            {filteredReports.map(report => (
              <div key={report.id} className={`flex flex-col sm:flex-row gap-4 p-4 border rounded-2xl transition-all cursor-pointer ${selectedReportId === report.id ? 'border-forest-500 bg-forest-50/30 ring-2 ring-forest-500/20' : 'border-gray-100 hover:border-forest-200 hover:shadow-md'}`} onClick={() => setSelectedReportId(report.id)}>
                <div className="h-24 w-32 bg-gray-200 rounded-xl overflow-hidden shrink-0">
                  {report.image ? (
                    <img src={report.image} alt="Kejadian" className="w-full h-full object-cover" />
                  ) : (
                    <div className="w-full h-full flex items-center justify-center text-gray-400"><ImageIcon /></div>
                  )}
                </div>
                <div className="flex-1 flex flex-col justify-between">
                  <div>
                    <h4 className="font-bold text-sm text-gray-900 mb-2">Informasi Laporan</h4>
                    <p className="text-xs text-gray-500 mb-1"><span className="w-20 inline-block">Jenis Laporan</span>: <span className="font-medium text-gray-700">{report.type}</span></p>
                    <p className="text-xs text-gray-500 mb-1"><span className="w-20 inline-block">Lokasi Kejadian</span>: <span className="font-medium text-gray-700">{report.location}</span></p>
                    <p className="text-xs text-gray-500"><span className="w-20 inline-block">Waktu Laporan</span>: <span className="font-medium text-gray-700">{report.time}</span></p>
                  </div>
                </div>
                <div className="flex flex-col justify-between items-end">
                  <span className={`px-4 py-1.5 rounded-full text-[10px] font-bold tracking-wide shadow-sm ${getStatusColor(report.status)}`}>
                    {report.status}
                  </span>
                  <button className="mt-4 px-4 py-1.5 text-xs font-bold text-forest-700 border border-forest-200 rounded-full hover:bg-forest-50 transition-colors flex items-center">
                    Detail <span className="ml-1">→</span>
                  </button>
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Kolom Kanan: Detail Laporan */}
        {selectedReportId && (
          <div className="w-full lg:w-2/3 bg-white rounded-3xl shadow-sm border border-gray-100 flex flex-col overflow-hidden animate-in fade-in slide-in-from-right-4 duration-300">
            <div className="p-6 border-b border-gray-100 flex items-center">
              <button onClick={() => setSelectedReportId(null)} className="mr-4 p-2 hover:bg-gray-100 rounded-full transition-colors lg:hidden">
                <ChevronLeft className="h-6 w-6 text-gray-600" />
              </button>
              <h2 className="text-2xl font-bold text-forest-900 flex items-center">
                <ChevronLeft className="h-6 w-6 mr-2 hidden lg:block cursor-pointer hover:text-forest-600 transition-colors" onClick={() => setSelectedReportId(null)} /> 
                Detail Laporan
              </h2>
              <p className="text-xs text-gray-500 ml-auto hidden sm:block">Informasi Lengkap Laporan Bencana</p>
            </div>
            
            <div className="flex-1 overflow-y-auto p-6 sm:p-10">
              <div className="max-w-2xl mx-auto space-y-8">
                
                {/* Image */}
                <div className="rounded-3xl overflow-hidden shadow-lg h-[400px]">
                  <img src={selectedReport.image} alt="Kejadian" className="w-full h-full object-cover" />
                </div>

                {/* Action Button */}
                <button 
                  onClick={() => handlePushToMobile(selectedReport.id)}
                  disabled={selectedReport.status === 'Diteruskan ke Lapangan'}
                  className={`w-full py-4 rounded-2xl font-bold text-white shadow-lg transition-all transform hover:scale-[1.01] active:scale-[0.99] ${
                    selectedReport.status === 'Diteruskan ke Lapangan' 
                      ? 'bg-blue-500 cursor-not-allowed opacity-90'
                      : 'bg-forest-700 hover:bg-forest-800'
                  }`}
                >
                  {selectedReport.status === 'Diteruskan ke Lapangan' ? 'Telah Diteruskan ke Admin Lapangan ✓' : 'Push Laporan ke Admin Lapangan'}
                </button>

                {/* Details */}
                <div className="space-y-6">
                  <div>
                    <h3 className="font-bold text-gray-900 text-lg mb-2">Deskripsi Kejadian</h3>
                    <p className="text-sm text-gray-600 leading-relaxed bg-gray-50 p-4 rounded-2xl border border-gray-100">
                      {selectedReport.desc}
                    </p>
                  </div>

                  <div>
                    <h3 className="font-bold text-gray-900 text-lg mb-4">Informasi Laporan</h3>
                    <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                      <div className="bg-white p-4 rounded-2xl border border-gray-100 shadow-sm">
                        <p className="text-xs text-gray-500 mb-1">Jenis Laporan</p>
                        <p className="font-bold text-gray-900">{selectedReport.type}</p>
                      </div>
                      <div className="bg-white p-4 rounded-2xl border border-gray-100 shadow-sm">
                        <p className="text-xs text-gray-500 mb-1">Tingkat Keparahan</p>
                        <span className="inline-block px-3 py-1 bg-yellow-100 text-yellow-800 text-[10px] font-bold rounded-full uppercase tracking-wider">{selectedReport.severity}</span>
                      </div>
                      <div className="bg-white p-4 rounded-2xl border border-gray-100 shadow-sm">
                        <p className="text-xs text-gray-500 mb-1">Lokasi</p>
                        <p className="font-bold text-gray-900 text-sm">{selectedReport.location}</p>
                      </div>
                      <div className="bg-white p-4 rounded-2xl border border-gray-100 shadow-sm">
                        <p className="text-xs text-gray-500 mb-1">Waktu Laporan</p>
                        <p className="font-bold text-gray-900 text-sm">{selectedReport.time}</p>
                      </div>
                    </div>
                  </div>
                </div>

              </div>
            </div>
          </div>
        )}

        {!selectedReportId && (
          <div className="hidden lg:flex w-2/3 bg-white/50 rounded-3xl border border-gray-200 border-dashed items-center justify-center flex-col text-gray-400">
            <ImageIcon className="h-16 w-16 mb-4 opacity-50" />
            <p className="font-medium">Pilih laporan di sebelah kiri untuk melihat detail</p>
          </div>
        )}
      </div>

    </div>
  );
};

export default ManajemenLaporan;
