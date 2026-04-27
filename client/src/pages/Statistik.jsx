import { TrendingUp, LayoutDashboard, MapPin, AlertTriangle } from 'lucide-react';
import { MapContainer, TileLayer, Marker, Popup } from 'react-leaflet';
import L from 'leaflet';

// Fix for default Leaflet icon paths in React
delete L.Icon.Default.prototype._getIconUrl;
L.Icon.Default.mergeOptions({
  iconRetinaUrl: 'https://cdnjs.cloudflare.com/ajax/libs/leaflet/1.7.1/images/marker-icon-2x.png',
  iconUrl: 'https://cdnjs.cloudflare.com/ajax/libs/leaflet/1.7.1/images/marker-icon.png',
  shadowUrl: 'https://cdnjs.cloudflare.com/ajax/libs/leaflet/1.7.1/images/marker-shadow.png',
});

// Custom markers based on severity
const createCustomIcon = (color) => {
  return new L.DivIcon({
    className: 'custom-leaflet-icon',
    html: `<div style="background-color: ${color}; width: 24px; height: 24px; border-radius: 50%; border: 3px solid white; box-shadow: 0 0 10px rgba(0,0,0,0.5);"></div>`,
    iconSize: [24, 24],
    iconAnchor: [12, 12],
  });
};

const iconSafe = createCustomIcon('#34c759');
const iconUrgent = createCustomIcon('#ff3b30');

const mapData = [
  { id: 1, name: 'Sorong', position: [-0.8817, 131.2514], status: 'Safe', icon: iconSafe },
  { id: 2, name: 'Manokwari', position: [-0.8615, 134.0620], status: 'Urgent', icon: iconUrgent },
  { id: 3, name: 'Jayapura', position: [-2.5337, 140.7181], status: 'Safe', icon: iconSafe },
  { id: 4, name: 'Nabire', position: [-3.3667, 135.5000], status: 'Safe', icon: iconSafe },
  { id: 5, name: 'Wamena', position: [-4.0984, 138.9486], status: 'Urgent', icon: iconUrgent },
  { id: 6, name: 'Timika', position: [-4.5297, 136.8836], status: 'Urgent', icon: iconUrgent },
  { id: 7, name: 'Merauke', position: [-8.4667, 140.3333], status: 'Safe', icon: iconSafe },
];

const Statistik = () => {
  return (
    <div className="max-w-6xl mx-auto space-y-10">
      
      {/* Header */}
      <div className="flex items-center space-x-4 mb-8">
        <div className="p-3 bg-white rounded-2xl shadow-sm border border-gray-100 text-forest-900">
          <LayoutDashboard className="h-8 w-8" />
        </div>
        <div>
          <h1 className="text-3xl font-bold text-forest-900 mb-1">Statistika</h1>
          <p className="text-sm text-gray-500">Bagian Manajemen Semua Laporan Masuk</p>
        </div>
      </div>

      <div className="bg-white rounded-3xl shadow-sm border border-gray-100 p-8 space-y-10">
        
        {/* Title */}
        <div className="flex items-center space-x-3">
          <TrendingUp className="h-8 w-8 text-forest-900" />
          <h2 className="text-3xl font-bold text-forest-900">Statistika</h2>
        </div>

        {/* Interactive Map */}
        <div className="w-full h-[400px] rounded-3xl overflow-hidden shadow-inner border border-gray-100 z-0">
          <MapContainer 
            center={[-4.2699, 138.0803]} 
            zoom={6} 
            style={{ width: '100%', height: '100%' }}
            scrollWheelZoom={false}
          >
            <TileLayer
              attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OSM</a>'
              url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
            />
            {mapData.map(city => (
              <Marker key={city.id} position={city.position} icon={city.icon}>
                <Popup>
                  <div className="font-bold text-center">
                    <p className="text-sm mb-1">{city.name}</p>
                    <span className={`text-[10px] uppercase px-2 py-1 rounded-full text-white ${city.status === 'Urgent' ? 'bg-red-500' : city.status === 'Warning' ? 'bg-yellow-500' : 'bg-green-500'}`}>
                      {city.status}
                    </span>
                  </div>
                </Popup>
              </Marker>
            ))}
          </MapContainer>
        </div>

        {/* SVG Donut Chart */}
        <div className="flex flex-col items-center justify-center pt-8">
          <div className="relative w-64 h-64">
            <svg viewBox="0 0 100 100" className="w-full h-full transform -rotate-90">
              {/* Green Segment (20%) */}
              <circle cx="50" cy="50" r="40" fill="transparent" stroke="#87af96" strokeWidth="20" strokeDasharray="125 125" strokeDashoffset="-200" />
              {/* Yellow Segment (35%) */}
              <circle cx="50" cy="50" r="40" fill="transparent" stroke="#eab308" strokeWidth="20" strokeDasharray="88 163" strokeDashoffset="-112" />
              {/* Red Segment (45%) */}
              <circle cx="50" cy="50" r="40" fill="transparent" stroke="#ef4444" strokeWidth="20" strokeDasharray="113 138" strokeDashoffset="0" />
            </svg>
            
            {/* Labels overlay */}
            <div className="absolute inset-0 w-full h-full">
              <span className="absolute top-4 right-10 text-xl font-bold text-gray-900">45%</span>
              <span className="absolute bottom-10 right-4 text-xl font-bold text-gray-900">20%</span>
              <span className="absolute bottom-8 left-8 text-xl font-bold text-gray-900">35%</span>
            </div>
            
            {/* White hole center */}
            <div className="absolute inset-0 m-auto w-32 h-32 bg-white rounded-full flex items-center justify-center shadow-inner">
            </div>
          </div>
        </div>

        {/* Insight / Ringkasan */}
        <div className="border border-gray-200 rounded-2xl overflow-hidden mt-12">
          <div className="bg-white p-4 border-b border-gray-200">
            <h3 className="font-bold text-gray-900">Insight / Ringkasan</h3>
          </div>
          <div className="bg-white p-6 space-y-4">
            <div className="flex items-center space-x-3 text-sm text-gray-600">
              <TrendingUp className="h-5 w-5 text-forest-500" />
              <span>Laporan meningkat 15% dari minggu lalu</span>
            </div>
            <div className="flex items-center space-x-3 text-sm text-gray-600">
              <AlertTriangle className="h-5 w-5 text-red-500" />
              <span>Area paling banyak terjadi laporan di Manokwari</span>
            </div>
            <div className="flex items-center space-x-3 text-sm text-gray-600">
              <MapPin className="h-5 w-5 text-green-500" />
              <span>Lokasi paling aman yaitu Merauke</span>
            </div>
          </div>
        </div>

      </div>
    </div>
  );
};

export default Statistik;
