import { useState, useEffect } from 'react';
import { MapContainer, TileLayer, CircleMarker, Popup } from 'react-leaflet';
import 'leaflet/dist/leaflet.css';
import { ShieldAlert, AlertTriangle, CheckCircle, Info } from 'lucide-react';

const PetaRawan = () => {
  const [incidentData, setIncidentData] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchReports = async () => {
      try {
        const token = localStorage.getItem('token');
        const response = await fetch('http://localhost:3000/api/admin/reports', {
          headers: {
            'Authorization': `Bearer ${token}`
          }
        });
        
        const result = await response.json();
        
        if (result.success) {
          // Format data dari backend agar sesuai dengan komponen Peta
          const formattedData = result.reports.map(report => {
            let mappedStatus;
            const statusLower = (report.status || '').toLowerCase();
            if (statusLower.includes('selesai') || statusLower.includes('aman') || statusLower.includes('resolved')) mappedStatus = 'Selesai';
            else if (statusLower.includes('proses') || statusLower.includes('progress')) mappedStatus = 'Diproses';
            else mappedStatus = 'Diterima (Baru)';

            return {
              id: report.id,
              lat: report.latitude || 0,
              lng: report.longitude || 0,
              type: report.type || 'Laporan Umum',
              status: mappedStatus,
              msg: report.address || 'Lokasi kejadian',
              imageUrl: report.imageUrl,
              originalStatus: report.status
            };
          });
          
          setIncidentData(formattedData);
        } else {
          setError(result.error || 'Gagal mengambil data laporan');
        }
      } catch (err) {
        console.error('Error fetching reports:', err);
        setError('Gagal terhubung ke server');
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
  const getStatusColor = (status) => {
    switch (status) {
      case 'Diterima (Baru)': return '#ef4444'; // Red
      case 'Diproses': return '#f59e0b'; // Yellow
      case 'Selesai': return '#22c55e'; // Green
      default: return '#3b82f6';
    }
  };

  return (
    <div className="bg-gray-50 min-h-screen py-10 px-4 sm:px-6 lg:px-8">
      <div className="max-w-7xl mx-auto space-y-8">
        
        {/* Header - Simple and Big for all ages */}
        <div className="text-center bg-white p-8 rounded-3xl shadow-sm border border-gray-100">
          <div className="inline-flex items-center justify-center p-4 bg-red-100 rounded-full mb-4 text-red-600">
            <ShieldAlert className="h-10 w-10" />
          </div>
          <h1 className="text-4xl md:text-5xl font-extrabold text-gray-900 mb-4">Peta Kawasan Rawan</h1>
          <p className="text-xl text-gray-700 max-w-3xl mx-auto font-medium">
            Selamat datang di Peta Pengawasan. Di sini Anda bisa melihat area mana saja yang aman dan mana yang sedang dalam bahaya. 
            <br className="hidden md:block" />
            <span className="font-bold text-red-600">Mohon perhatikan warna pada peta!</span>
          </p>
        </div>

        {/* Legend - Very clear and concrete */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          <div className="bg-white p-6 rounded-2xl shadow-sm border-2 border-red-200 flex items-center gap-4">
            <div className="w-16 h-16 rounded-full bg-red-500 flex items-center justify-center shrink-0 shadow-md">
              <AlertTriangle className="h-8 w-8 text-white" />
            </div>
            <div>
              <h3 className="text-2xl font-bold text-red-600">Merah = Diterima</h3>
              <p className="text-gray-600 font-medium mt-1">Laporan baru yang belum direspon atau menunggu validasi.</p>
            </div>
          </div>
          
          <div className="bg-white p-6 rounded-2xl shadow-sm border-2 border-yellow-200 flex items-center gap-4">
            <div className="w-16 h-16 rounded-full bg-yellow-500 flex items-center justify-center shrink-0 shadow-md">
              <Info className="h-8 w-8 text-white" />
            </div>
            <div>
              <h3 className="text-2xl font-bold text-yellow-600">Kuning = Diproses</h3>
              <p className="text-gray-600 font-medium mt-1">Laporan sedang dalam penanganan oleh petugas kami.</p>
            </div>
          </div>

          <div className="bg-white p-6 rounded-2xl shadow-sm border-2 border-green-200 flex items-center gap-4">
            <div className="w-16 h-16 rounded-full bg-green-500 flex items-center justify-center shrink-0 shadow-md">
              <CheckCircle className="h-8 w-8 text-white" />
            </div>
            <div>
              <h3 className="text-2xl font-bold text-green-600">Hijau = Selesai</h3>
              <p className="text-gray-600 font-medium mt-1">Kejadian telah selesai ditangani dan area dinyatakan aman.</p>
            </div>
          </div>
        </div>

        {/* Map Container */}
        <div className="bg-white p-4 rounded-3xl shadow-xl border border-gray-100 h-[650px] w-full z-0 overflow-hidden relative">
          {loading ? (
            <div className="h-full w-full flex items-center justify-center bg-gray-50 rounded-2xl">
              <div className="flex flex-col items-center space-y-4">
                <div className="animate-spin rounded-full h-12 w-12 border-4 border-forest-500 border-t-transparent"></div>
                <p className="text-gray-600 font-medium">Memuat data koordinat dari server...</p>
              </div>
            </div>
          ) : error ? (
            <div className="h-full w-full flex items-center justify-center bg-gray-50 rounded-2xl">
              <div className="text-center p-6 bg-red-50 rounded-2xl border border-red-100 max-w-md">
                <ShieldAlert className="h-12 w-12 text-red-500 mx-auto mb-4" />
                <h3 className="text-lg font-bold text-red-700 mb-2">Gagal Memuat Peta</h3>
                <p className="text-red-600">{error}</p>
                <p className="text-sm text-red-500 mt-4">Pastikan Anda sudah login sebagai Admin dan server backend menyala.</p>
              </div>
            </div>
          ) : (
            <MapContainer 
              center={[-0.7893, 113.9213]} // Tengah-tengah Indonesia
              zoom={5} 
              style={{ height: '100%', width: '100%', borderRadius: '1rem', zIndex: 0 }}
              scrollWheelZoom={false}
            >
              <TileLayer
                attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
                url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
              />
              {incidentData.map((data) => (
                <CircleMarker 
                  key={data.id}
                  center={[data.lat, data.lng]}
                  pathOptions={{ 
                    color: getStatusColor(data.status), 
                    fillColor: getStatusColor(data.status), 
                    fillOpacity: 0.7,
                    weight: 3
                  }}
                  radius={20} // Bigger radius for easier clicking
                >
                  <Popup className="custom-popup">
                    <div className="p-3 max-w-[250px] text-center">
                      <div className={`mx-auto w-12 h-12 rounded-full mb-3 flex items-center justify-center ${
                        data.status === 'Diterima (Baru)' ? 'bg-red-100 text-red-600' :
                        data.status === 'Diproses' ? 'bg-yellow-100 text-yellow-600' :
                        'bg-green-100 text-green-600'
                      }`}>
                        {data.status === 'Diterima (Baru)' && <AlertTriangle className="h-6 w-6" />}
                        {data.status === 'Diproses' && <Info className="h-6 w-6" />}
                        {data.status === 'Selesai' && <CheckCircle className="h-6 w-6" />}
                      </div>
                      <h4 className="text-xl font-bold text-gray-900 mb-2">{data.type}</h4>
                      <p className="text-base text-gray-700 font-medium leading-relaxed">{data.msg}</p>
                      {data.imageUrl && (
                        <img src={data.imageUrl} alt="Kejadian" className="w-full h-32 object-cover rounded-lg mt-2 mb-2 shadow-sm" />
                      )}
                      <span className={`inline-block px-4 py-2 text-sm font-bold rounded-full mt-2 uppercase tracking-wider ${
                        data.status === 'Diterima (Baru)' ? 'bg-red-500 text-white' :
                        data.status === 'Diproses' ? 'bg-yellow-500 text-white' :
                        'bg-green-500 text-white'
                      }`}>
                        Status: {data.originalStatus || data.status}
                      </span>
                    </div>
                  </Popup>
                </CircleMarker>
              ))}
            </MapContainer>
          )}
        </div>
        
        {/* Helper Note below map */}
        <div className="text-center bg-blue-50 p-6 rounded-2xl border border-blue-100">
          <p className="text-blue-800 font-medium text-lg">
            <span className="font-bold">Cara menggunakan peta:</span> Geser peta dengan menyentuh dan menggeser layar. Tekan pada lingkaran berwarna untuk melihat informasi kejadian di tempat tersebut.
          </p>
        </div>

      </div>
    </div>
  );
};

export default PetaRawan;
