import { MapContainer, TileLayer, CircleMarker, Popup } from 'react-leaflet';
import 'leaflet/dist/leaflet.css';
import Button from '../components/Button';
import { ArrowRight, Shield, TreePine, AlertTriangle } from 'lucide-react';

const dummyData = [
  { id: 1, lat: -0.8615, lng: 134.0620, type: 'Penebangan Liar', status: 'Urgent', desc: 'Laporan penebangan liar di area konservasi Manokwari.' },
  { id: 2, lat: -4.0984, lng: 138.9326, type: 'Konflik Satwa', status: 'Dalam Proses', desc: 'Konflik satwa liar dengan pemukiman warga di Jayawijaya.' },
  { id: 3, lat: -4.5297, lng: 136.8833, type: 'Patroli Rutin', status: 'Selesai', desc: 'Patroli wilayah hutan lindung Timika terpantau aman.' },
];

const Home = () => {
  const getMarkerColor = (status) => {
    switch (status) {
      case 'Urgent': return '#ef4444'; // Red
      case 'Dalam Proses': return '#f59e0b'; // Yellow
      case 'Selesai': return '#22c55e'; // Green
      default: return '#3b82f6';
    }
  };

  return (
    <div className="flex flex-col min-h-screen">
      {/* Hero Section */}
      <section className="relative h-screen flex items-center justify-center overflow-hidden">
        <div className="absolute inset-0">
          <img 
            src="https://images.unsplash.com/photo-1542273917363-3b1817f69a2d?w=600&auto=format&fit=crop&q=60&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxzZWFyY2h8NHx8Zm9yZXN0fGVufDB8fDB8fHww" 
            alt="Forest Background" 
            className="w-full h-full object-cover"
          />
          <div className="absolute inset-0 bg-black/60"></div>
        </div>
        
        <div className="relative z-10 text-center px-4 max-w-4xl mx-auto">
          <h1 className="text-5xl md:text-7xl font-bold text-white mb-6 tracking-tight">
            BHUWANA GUARD
          </h1>
          <p className="text-xl md:text-2xl text-gray-200 mb-10 max-w-2xl mx-auto font-light">
            Bersama melindungi hutan dan satwa liar untuk ekosistem yang berkelanjutan.
          </p>
          <div className="flex flex-col sm:flex-row items-center justify-center gap-4">
            <Button variant="primary" className="text-lg px-8 py-4 flex items-center gap-2">
              Lapor Kejadian <ArrowRight className="h-5 w-5" />
            </Button>
            <Button variant="ghost" className="text-lg px-8 py-4 text-white hover:bg-white/10 border border-white/30">
              Pelajari Lebih Lanjut
            </Button>
          </div>
        </div>
      </section>

      {/* Stats Section */}
      <section className="py-20 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            <div className="text-center p-8 rounded-2xl bg-forest-50 border border-forest-100">
              <div className="inline-flex items-center justify-center p-4 bg-forest-100 rounded-full mb-6 text-forest-700">
                <Shield className="h-8 w-8" />
              </div>
              <h3 className="text-4xl font-bold text-forest-900 mb-2">1,240+</h3>
              <p className="text-gray-600 font-medium">Laporan Diselesaikan</p>
            </div>
            <div className="text-center p-8 rounded-2xl bg-forest-50 border border-forest-100">
              <div className="inline-flex items-center justify-center p-4 bg-forest-100 rounded-full mb-6 text-forest-700">
                <TreePine className="h-8 w-8" />
              </div>
              <h3 className="text-4xl font-bold text-forest-900 mb-2">50K+</h3>
              <p className="text-gray-600 font-medium">Hektar Hutan Terlindungi</p>
            </div>
            <div className="text-center p-8 rounded-2xl bg-forest-50 border border-forest-100">
              <div className="inline-flex items-center justify-center p-4 bg-forest-100 rounded-full mb-6 text-forest-700">
                <AlertTriangle className="h-8 w-8" />
              </div>
              <h3 className="text-4xl font-bold text-forest-900 mb-2">24/7</h3>
              <p className="text-gray-600 font-medium">Pemantauan Aktif</p>
            </div>
          </div>
        </div>
      </section>

      {/* Map Section */}
      <section className="py-20 bg-gray-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-12">
            <h2 className="text-3xl md:text-4xl font-bold text-gray-900 mb-4">Peta Kawasan Rawan</h2>
            <p className="text-lg text-gray-600 max-w-2xl mx-auto">
              Pemantauan real-time untuk area dengan tingkat kerawanan tinggi terhadap penebangan liar dan konflik satwa.
            </p>
          </div>
          
          <div className="bg-white p-4 rounded-3xl shadow-xl border border-gray-100 h-[600px] w-full z-0 overflow-hidden relative">
            <MapContainer 
              center={[-4.0, 136.5]} 
              zoom={6} 
              style={{ height: '100%', width: '100%', borderRadius: '1rem', zIndex: 0 }}
            >
              <TileLayer
                attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
                url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
              />
              {dummyData.map((data) => (
                <CircleMarker 
                  key={data.id}
                  center={[data.lat, data.lng]}
                  pathOptions={{ color: getMarkerColor(data.status), fillColor: getMarkerColor(data.status), fillOpacity: 0.6 }}
                  radius={12}
                >
                  <Popup>
                    <div className="p-2">
                      <h4 className="font-bold text-gray-900">{data.type}</h4>
                      <p className="text-sm text-gray-600 my-1">{data.desc}</p>
                      <span className={`inline-block px-2 py-1 text-xs font-semibold rounded-full mt-2 ${
                        data.status === 'Urgent' ? 'bg-red-100 text-red-700' :
                        data.status === 'Dalam Proses' ? 'bg-yellow-100 text-yellow-700' :
                        'bg-green-100 text-green-700'
                      }`}>
                        {data.status}
                      </span>
                    </div>
                  </Popup>
                </CircleMarker>
              ))}
            </MapContainer>
          </div>
          
          {/* Legend */}
          <div className="flex justify-center items-center gap-6 mt-8">
            <div className="flex items-center gap-2">
              <div className="w-4 h-4 rounded-full bg-red-500 opacity-80"></div>
              <span className="text-sm text-gray-600 font-medium">Urgent</span>
            </div>
            <div className="flex items-center gap-2">
              <div className="w-4 h-4 rounded-full bg-yellow-500 opacity-80"></div>
              <span className="text-sm text-gray-600 font-medium">Dalam Proses</span>
            </div>
            <div className="flex items-center gap-2">
              <div className="w-4 h-4 rounded-full bg-green-500 opacity-80"></div>
              <span className="text-sm text-gray-600 font-medium">Aman / Selesai</span>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
};

export default Home;
