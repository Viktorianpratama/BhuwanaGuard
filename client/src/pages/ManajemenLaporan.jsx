import { useState, useEffect } from 'react';
import { Search, ChevronLeft, Image as ImageIcon, Home } from 'lucide-react';

const ManajemenLaporan = () => {
  const [reports, setReports] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchReports = async () => {
      try {
        const token = localStorage.getItem('token');
        const response = await fetch(`${import.meta.env.VITE_API_URL}/api/admin/reports`, {
          headers: {
            'Authorization': `Bearer ${token}`
          }
        });
        const result = await response.json();
        
        if (result.success) {
          const mappedData = result.reports.map(r => {
            // Mapping status
            let mappedStatus = 'Menunggu Validasi';
            const s = (r.status || '').toLowerCase();
            if (s.includes('diterima')) mappedStatus = 'Diterima';
            else if (s.includes('progress') || s.includes('proses')) mappedStatus = 'Diproses';
            else if (s.includes('selesai') || s.includes('resolved') || s.includes('aman')) mappedStatus = 'Selesai';
            else if (s.includes('lapangan')) mappedStatus = 'Diteruskan ke Lapangan';

            // Mapping severity
            let severity = 'Sedang';
            if (s.includes('bahaya') || s.includes('darurat') || s.includes('emergency')) severity = 'Tinggi';
            else if (s.includes('selesai') || s.includes('aman')) severity = 'Rendah';

            return {
              id: r.id,
              type: r.type || 'Laporan Kejadian',
              location: r.address || 'Lokasi tidak diketahui',
              time: r.createdAt ? new Date(r.createdAt).toLocaleString('id-ID') : 'Waktu tidak diketahui',
              status: mappedStatus,
              severity: severity,
              desc: r.address || 'Detail lengkap laporan',
              image: r.imageUrl
            };
          });
          setReports(mappedData);
        } else {
          setError(result.error);
        }
      } catch (err) {
        console.error('Error fetching reports:', err);
        setError('Gagal memuat data dari server.');
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
  const [selectedReportId, setSelectedReportId] = useState(null);
  const [filter, setFilter] = useState('Semua');
  const [toast, setToast] = useState({ show: false, message: '', type: 'success' });

  const selectedReport = reports.find(r => r.id === selectedReportId);

  const handleUpdateStatus = async (id, newStatus) => {
    try {
      const token = localStorage.getItem('token');
      const response = await fetch(`${import.meta.env.VITE_API_URL}/api/admin/reports/${id}/status`, {
        method: 'PUT',
        headers: { 
          'Content-Type': 'application/json',
          'Authorization': `Bearer ${token}` 
        },
        body: JSON.stringify({ status: newStatus })
      });
      
      const result = await response.json();
      if (result.success) {
        // Update state lokal agar langsung terlihat
        setReports(reports.map(report => 
          report.id === id ? { ...report, status: newStatus } : report
        ));
        // Jika status yang diupdate adalah dari laporan yang sedang dibuka
        if (selectedReportId === id) {
          // Re-trigger re-render by doing nothing special since we use `reports.find` below
        }
        setToast({ show: true, message: result.message, type: 'success' });
        setTimeout(() => setToast({ show: false, message: '', type: 'success' }), 3000);
      } else {
        setToast({ show: true, message: 'Gagal: ' + result.error, type: 'error' });
        setTimeout(() => setToast({ show: false, message: '', type: 'error' }), 3000);
      }
    } catch (err) {
      console.error('Error updating status:', err);
      setToast({ show: true, message: 'Terjadi kesalahan saat mengupdate status', type: 'error' });
      setTimeout(() => setToast({ show: false, message: '', type: 'error' }), 3000);
    }
  };

  const getStatusColor = (status) => {
    const s = (status || '').toLowerCase();
    if (s.includes('diterima')) return 'bg-blue-500 text-white';
    if (s.includes('proses') || s.includes('progress')) return 'bg-yellow-400 text-gray-900';
    if (s.includes('selesai') || s.includes('aman') || s.includes('resolved')) return 'bg-green-500 text-white';
    if (s.includes('darurat') || s.includes('bahaya') || s.includes('urgent') || s.includes('tinggi')) return 'bg-red-500 text-white';
    return 'bg-gray-500 text-white';
  };

  const filteredReports = reports.filter(r => {
    if (filter === 'Semua') return true;
    return r.status.toLowerCase().includes(filter.toLowerCase());
  });

  return (
    <div className="max-w-7xl mx-auto space-y-6 relative">
      
      {/* Toast Notification */}
      {toast.show && (
        <div className={`fixed top-10 left-1/2 transform -translate-x-1/2 z-50 px-6 py-3 rounded-full shadow-2xl flex items-center gap-3 animate-in fade-in slide-in-from-top-10 duration-300 ${toast.type === 'error' ? 'bg-red-500 text-white' : 'bg-forest-600 text-white'}`}>
          {toast.type === 'error' ? (
            <svg className="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 9v2m0 4h.01m-6.938 4h13.856c1.54 0 2.502-1.667 1.732-3L13.732 4c-.77-1.333-2.694-1.333-3.464 0L3.34 16c-.77 1.333.192 3 1.732 3z" /></svg>
          ) : (
            <div className="h-5 w-5 rounded-full bg-white/20 flex items-center justify-center font-bold text-sm">✓</div>
          )}
          <span className="font-bold text-sm">{toast.message}</span>
        </div>
      )}

      {/* Jika ada report yang dipilih, tampilkan Layout Detail (Kanan), kalau tidak, tampilkan Daftar (Kiri) */}
      <div className="flex flex-col lg:flex-row gap-6 h-[calc(100vh-120px)]">
        
        {/* Kolom Kiri: Daftar Laporan */}
        <div className={`w-full ${selectedReportId ? 'lg:w-1/3 hidden lg:flex' : 'lg:w-full flex'} flex-col bg-white dark:bg-gray-800 rounded-3xl shadow-sm border border-gray-100 dark:border-gray-700 overflow-hidden transition-all duration-500`}>
          <div className="p-6 border-b border-gray-100 dark:border-gray-700">
            <h1 className="text-2xl font-bold text-forest-900 dark:text-white mb-1 flex items-center">
              <Home className="h-6 w-6 mr-2" /> Manajemen Laporan
            </h1>
            <p className="text-xs text-gray-500 dark:text-gray-400 mb-6">Bagian Manajemen Semua Laporan Masuk</p>

            <div className="relative mb-4">
              <Search className="absolute left-4 top-1/2 -translate-y-1/2 h-4 w-4 text-gray-400 dark:text-gray-500" />
              <input 
                type="text" 
                placeholder="Cari nama pelapor atau lokasi" 
                className="w-full pl-11 pr-4 py-3 text-sm bg-white dark:bg-gray-900 border border-gray-200 dark:border-gray-700 text-gray-900 dark:text-gray-100 rounded-2xl focus:outline-none focus:ring-2 focus:ring-forest-500"
              />
            </div>

            <div className="flex gap-2">
              {['Semua', 'Diproses', 'Selesai'].map(f => (
                <button 
                  key={f}
                  onClick={() => setFilter(f)}
                  className={`px-4 py-1.5 rounded-full text-xs font-bold border transition-colors ${filter === f ? 'border-forest-500 text-forest-700 dark:text-forest-400 bg-forest-50 dark:bg-forest-900/30' : 'border-gray-200 dark:border-gray-700 text-gray-500 dark:text-gray-400 hover:bg-gray-50 dark:hover:bg-gray-700'}`}
                >
                  {f}
                </button>
              ))}
            </div>
          </div>

          <div className="flex-1 overflow-y-auto p-4 space-y-4">
            {loading ? (
              <div className="flex justify-center items-center h-32">
                <div className="animate-spin rounded-full h-8 w-8 border-4 border-forest-500 border-t-transparent"></div>
              </div>
            ) : error ? (
              <div className="text-center text-red-500 p-4">{error}</div>
            ) : filteredReports.length === 0 ? (
              <div className="text-center text-gray-500 p-4">Tidak ada laporan ditemukan.</div>
            ) : (
              filteredReports.map(report => (
                <div key={report.id} className={`flex flex-col sm:flex-row gap-4 p-4 border rounded-2xl transition-all cursor-pointer ${selectedReportId === report.id ? 'border-forest-500 bg-forest-50/30 dark:bg-forest-900/20 ring-2 ring-forest-500/20' : 'border-gray-100 dark:border-gray-700 hover:border-forest-200 dark:hover:border-forest-500 hover:shadow-md'}`} onClick={() => setSelectedReportId(report.id)}>
                  <div className="h-24 w-32 bg-gray-200 dark:bg-gray-700 rounded-xl overflow-hidden shrink-0">
                    {report.image ? (
                      <img src={report.image} alt="Kejadian" className="w-full h-full object-cover" />
                    ) : (
                      <div className="w-full h-full flex items-center justify-center text-gray-400 dark:text-gray-500"><ImageIcon /></div>
                    )}
                  </div>
                  <div className="flex-1 flex flex-col justify-between">
                    <div>
                      <h4 className="font-bold text-sm text-gray-900 dark:text-white mb-2">Informasi Laporan</h4>
                      <p className="text-xs text-gray-500 dark:text-gray-400 mb-1"><span className="w-20 inline-block">Jenis Laporan</span>: <span className="font-medium text-gray-700 dark:text-gray-300">{report.type}</span></p>
                      <p className="text-xs text-gray-500 dark:text-gray-400 mb-1"><span className="w-20 inline-block">Lokasi Kejadian</span>: <span className="font-medium text-gray-700 dark:text-gray-300">{report.location}</span></p>
                      <p className="text-xs text-gray-500 dark:text-gray-400"><span className="w-20 inline-block">Waktu Laporan</span>: <span className="font-medium text-gray-700 dark:text-gray-300">{report.time}</span></p>
                    </div>
                  </div>
                  <div className="flex flex-col justify-between items-end">
                    <span className={`px-4 py-1.5 rounded-full text-[10px] font-bold tracking-wide shadow-sm ${getStatusColor(report.status)}`}>
                      {report.status}
                    </span>
                    <button className="mt-4 px-4 py-1.5 text-xs font-bold text-forest-700 dark:text-forest-400 border border-forest-200 dark:border-forest-800 rounded-full hover:bg-forest-50 dark:hover:bg-forest-900/30 transition-colors flex items-center">
                      Detail <span className="ml-1">→</span>
                    </button>
                  </div>
                </div>
              ))
            )}
          </div>
        </div>

        {/* Kolom Kanan: Detail Laporan */}
        {selectedReportId && (
          <div className="w-full lg:w-2/3 bg-white dark:bg-gray-800 rounded-3xl shadow-sm border border-gray-100 dark:border-gray-700 flex flex-col overflow-hidden animate-in fade-in slide-in-from-right-4 duration-300">
            <div className="p-6 border-b border-gray-100 dark:border-gray-700 flex items-center">
              <button onClick={() => setSelectedReportId(null)} className="mr-4 p-2 hover:bg-gray-100 dark:hover:bg-gray-700 rounded-full transition-colors lg:hidden">
                <ChevronLeft className="h-6 w-6 text-gray-600 dark:text-gray-300" />
              </button>
              <h2 className="text-2xl font-bold text-forest-900 dark:text-white flex items-center">
                <ChevronLeft className="h-6 w-6 mr-2 hidden lg:block cursor-pointer hover:text-forest-600 dark:hover:text-forest-400 transition-colors" onClick={() => setSelectedReportId(null)} /> 
                Detail Laporan
              </h2>
              <p className="text-xs text-gray-500 dark:text-gray-400 ml-auto hidden sm:block">Informasi Lengkap Laporan Bencana</p>
            </div>
            
            <div className="flex-1 overflow-y-auto p-6 sm:p-10">
              <div className="max-w-2xl mx-auto space-y-8">
                
                {/* Image */}
                <div className="rounded-3xl overflow-hidden shadow-lg h-[400px]">
                  <img src={selectedReport.image} alt="Kejadian" className="w-full h-full object-cover" />
                </div>

                {/* Action Buttons */}
                <div className="bg-gray-50 dark:bg-gray-700/30 p-6 rounded-2xl border border-gray-100 dark:border-gray-700">
                  <h4 className="font-bold text-gray-900 dark:text-white mb-4 text-center">Ubah Status Laporan</h4>
                  <div className="flex flex-col sm:flex-row gap-3">
                    <button 
                      onClick={() => handleUpdateStatus(selectedReport.id, 'Diterima')}
                      disabled={selectedReport.status === 'Diterima' || selectedReport.status.includes('Selesai')}
                      className={`flex-1 py-3 rounded-xl font-bold transition-all ${
                        selectedReport.status === 'Diterima' || selectedReport.status.includes('Selesai')
                          ? 'bg-gray-200 text-gray-400 cursor-not-allowed dark:bg-gray-700 dark:text-gray-500'
                          : 'bg-blue-500 hover:bg-blue-600 text-white shadow-md hover:shadow-lg'
                      }`}
                    >
                      Terima Laporan
                    </button>
                    <button 
                      onClick={() => handleUpdateStatus(selectedReport.id, 'In Progress')}
                      disabled={selectedReport.status === 'In Progress' || selectedReport.status.includes('Selesai')}
                      className={`flex-1 py-3 rounded-xl font-bold transition-all ${
                        selectedReport.status === 'In Progress' || selectedReport.status.includes('Selesai')
                          ? 'bg-gray-200 text-gray-400 cursor-not-allowed dark:bg-gray-700 dark:text-gray-500'
                          : 'bg-yellow-500 hover:bg-yellow-600 text-white shadow-md hover:shadow-lg'
                      }`}
                    >
                      Proses (In Progress)
                    </button>
                    <button 
                      onClick={() => handleUpdateStatus(selectedReport.id, 'Selesai')}
                      disabled={selectedReport.status.includes('Selesai')}
                      className={`flex-1 py-3 rounded-xl font-bold transition-all ${
                        selectedReport.status.includes('Selesai')
                          ? 'bg-green-100 text-green-500 cursor-not-allowed dark:bg-green-900/30 dark:text-green-700'
                          : 'bg-green-500 hover:bg-green-600 text-white shadow-md hover:shadow-lg'
                      }`}
                    >
                      Tandai Selesai
                    </button>
                  </div>
                </div>

                {/* Details */}
                <div className="space-y-6">
                  <div>
                    <h3 className="font-bold text-gray-900 dark:text-white text-lg mb-2">Deskripsi Kejadian</h3>
                    <p className="text-sm text-gray-600 dark:text-gray-400 leading-relaxed bg-gray-50 dark:bg-gray-900 p-4 rounded-2xl border border-gray-100 dark:border-gray-700">
                      {selectedReport.desc}
                    </p>
                  </div>

                  <div>
                    <h3 className="font-bold text-gray-900 dark:text-white text-lg mb-4">Informasi Laporan</h3>
                    <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                      <div className="bg-white dark:bg-gray-700 p-4 rounded-2xl border border-gray-100 dark:border-gray-600 shadow-sm">
                        <p className="text-xs text-gray-500 dark:text-gray-400 mb-1">Jenis Laporan</p>
                        <p className="font-bold text-gray-900 dark:text-white">{selectedReport.type}</p>
                      </div>
                      <div className="bg-white dark:bg-gray-700 p-4 rounded-2xl border border-gray-100 dark:border-gray-600 shadow-sm">
                        <p className="text-xs text-gray-500 dark:text-gray-400 mb-1">Tingkat Keparahan</p>
                        <span className="inline-block px-3 py-1 bg-yellow-100 dark:bg-yellow-900/30 text-yellow-800 dark:text-yellow-400 text-[10px] font-bold rounded-full uppercase tracking-wider">{selectedReport.severity}</span>
                      </div>
                      <div className="bg-white dark:bg-gray-700 p-4 rounded-2xl border border-gray-100 dark:border-gray-600 shadow-sm">
                        <p className="text-xs text-gray-500 dark:text-gray-400 mb-1">Lokasi</p>
                        <p className="font-bold text-gray-900 dark:text-white text-sm">{selectedReport.location}</p>
                      </div>
                      <div className="bg-white dark:bg-gray-700 p-4 rounded-2xl border border-gray-100 dark:border-gray-600 shadow-sm">
                        <p className="text-xs text-gray-500 dark:text-gray-400 mb-1">Waktu Laporan</p>
                        <p className="font-bold text-gray-900 dark:text-white text-sm">{selectedReport.time}</p>
                      </div>
                    </div>
                  </div>
                </div>

              </div>
            </div>
          </div>
        )}

        {!selectedReportId && (
          <div className="hidden lg:flex w-2/3 bg-white/50 dark:bg-gray-800/50 rounded-3xl border border-gray-200 dark:border-gray-700 border-dashed items-center justify-center flex-col text-gray-400 dark:text-gray-500">
            <ImageIcon className="h-16 w-16 mb-4 opacity-50" />
            <p className="font-medium">Pilih laporan di sebelah kiri untuk melihat detail</p>
          </div>
        )}
      </div>

    </div>
  );
};

export default ManajemenLaporan;
