import { MapContainer, TileLayer, CircleMarker, Popup } from 'react-leaflet';
import 'leaflet/dist/leaflet.css';
import { ShieldAlert, AlertTriangle, CheckCircle, Info } from 'lucide-react';

const incidentData = [
  { id: 1, lat: -0.8615, lng: 134.0620, type: 'Penebangan Liar', status: 'Bahaya', msg: 'Awas! Ada aktivitas penebangan hutan liar di sini. Jauhi area ini!' },
  { id: 2, lat: -4.0984, lng: 138.9326, type: 'Hewan Liar Masuk Desa', status: 'Hati-hati', msg: 'Hati-hati! Ada hewan liar yang masuk ke dekat rumah warga.' },
  { id: 3, lat: -4.5297, lng: 136.8833, type: 'Patroli Hutan', status: 'Aman', msg: 'Area ini aman. Penjaga hutan sedang berpatroli.' },
  { id: 4, lat: -2.5337, lng: 140.7181, type: 'Kebakaran Hutan', status: 'Bahaya', msg: 'Awas! Terdeteksi titik api atau kebakaran hutan. Segera lapor petugas!' },
];

const PetaRawan = () => {
  const getStatusColor = (status) => {
    switch (status) {
      case 'Bahaya': return '#ef4444'; // Red
      case 'Hati-hati': return '#f59e0b'; // Yellow
      case 'Aman': return '#22c55e'; // Green
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
              <h3 className="text-2xl font-bold text-red-600">Merah = Bahaya</h3>
              <p className="text-gray-600 font-medium mt-1">Area berbahaya. Ada kejadian darurat. Jauhi area ini!</p>
            </div>
          </div>
          
          <div className="bg-white p-6 rounded-2xl shadow-sm border-2 border-yellow-200 flex items-center gap-4">
            <div className="w-16 h-16 rounded-full bg-yellow-500 flex items-center justify-center shrink-0 shadow-md">
              <Info className="h-8 w-8 text-white" />
            </div>
            <div>
              <h3 className="text-2xl font-bold text-yellow-600">Kuning = Hati-hati</h3>
              <p className="text-gray-600 font-medium mt-1">Area perlu diwaspadai. Sedang ada masalah yang ditangani.</p>
            </div>
          </div>

          <div className="bg-white p-6 rounded-2xl shadow-sm border-2 border-green-200 flex items-center gap-4">
            <div className="w-16 h-16 rounded-full bg-green-500 flex items-center justify-center shrink-0 shadow-md">
              <CheckCircle className="h-8 w-8 text-white" />
            </div>
            <div>
              <h3 className="text-2xl font-bold text-green-600">Hijau = Aman</h3>
              <p className="text-gray-600 font-medium mt-1">Area aman. Terpantau baik oleh tim penjaga hutan kami.</p>
            </div>
          </div>
        </div>

        {/* Map Container */}
        <div className="bg-white p-4 rounded-3xl shadow-xl border border-gray-100 h-[650px] w-full z-0 overflow-hidden relative">
          <MapContainer 
            center={[-4.0, 136.5]} 
            zoom={6} 
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
                      data.status === 'Bahaya' ? 'bg-red-100 text-red-600' :
                      data.status === 'Hati-hati' ? 'bg-yellow-100 text-yellow-600' :
                      'bg-green-100 text-green-600'
                    }`}>
                      {data.status === 'Bahaya' && <AlertTriangle className="h-6 w-6" />}
                      {data.status === 'Hati-hati' && <Info className="h-6 w-6" />}
                      {data.status === 'Aman' && <CheckCircle className="h-6 w-6" />}
                    </div>
                    <h4 className="text-xl font-bold text-gray-900 mb-2">{data.type}</h4>
                    <p className="text-base text-gray-700 font-medium leading-relaxed">{data.msg}</p>
                    <span className={`inline-block px-4 py-2 text-sm font-bold rounded-full mt-4 uppercase tracking-wider ${
                      data.status === 'Bahaya' ? 'bg-red-500 text-white' :
                      data.status === 'Hati-hati' ? 'bg-yellow-500 text-white' :
                      'bg-green-500 text-white'
                    }`}>
                      Status: {data.status}
                    </span>
                  </div>
                </Popup>
              </CircleMarker>
            ))}
          </MapContainer>
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
