import { useState, useEffect } from 'react';
import { LayoutDashboard, CheckCircle2, Clock, ShieldAlert } from 'lucide-react';
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
    html: `<div style="background-color: ${color}; width: 20px; height: 20px; border-radius: 50%; border: 3px solid white; box-shadow: 0 0 10px rgba(0,0,0,0.3);"></div>`,
    iconSize: [20, 20],
    iconAnchor: [10, 10],
  });
};

const iconSafe = createCustomIcon('#22c55e'); // Green
const iconWarning = createCustomIcon('#eab308'); // Yellow
const iconUrgent = createCustomIcon('#ef4444'); // Red

const Statistik = () => {
  const [mapData, setMapData] = useState([]);
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
          const formatted = result.reports.map(r => {
            let status;
            let icon;
            const s = (r.status || '').toLowerCase();
            if (s.includes('selesai') || s.includes('aman') || s.includes('resolved')) {
              status = 'Safe'; icon = iconSafe;
            } else if (s.includes('proses') || s.includes('progress')) {
              status = 'Warning'; icon = iconWarning;
            } else {
              // Jika baru masuk atau "diterima"
              status = 'Urgent'; icon = iconUrgent;
            }
            return {
              id: r.id,
              name: r.type || 'Laporan Umum',
              position: [r.latitude || 0, r.longitude || 0],
              status: status,
              icon: icon,
              desc: r.address || 'Lokasi tidak diketahui',
              createdAt: r.createdAt
            };
          });
          setMapData(formatted);
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

  const totalReports = mapData.length;
  const safeCount = mapData.filter(d => d.status === 'Safe').length;
  const warningCount = mapData.filter(d => d.status === 'Warning').length;
  const urgentCount = mapData.filter(d => d.status === 'Urgent').length;

  const safePct = totalReports === 0 ? 0 : Math.round((safeCount / totalReports) * 100);
  const warningPct = totalReports === 0 ? 0 : Math.round((warningCount / totalReports) * 100);
  const urgentPct = totalReports === 0 ? 0 : (100 - safePct - warningPct); // Ensure 100% total

  const C = 251.327; // Circumference for r=40
  const urgentDash = (urgentPct / 100) * C;
  const warningDash = (warningPct / 100) * C;
  const safeDash = (safePct / 100) * C;

  const calculateTrend = (data, filterStatus = null) => {
    const now = new Date();
    const sevenDaysAgo = new Date(now.getTime() - 7 * 24 * 60 * 60 * 1000);
    const fourteenDaysAgo = new Date(now.getTime() - 14 * 24 * 60 * 60 * 1000);

    let currentPeriod = 0;
    let previousPeriod = 0;

    data.forEach(item => {
      if (filterStatus && item.status !== filterStatus) return;
      if (!item.createdAt) return;

      const date = new Date(item.createdAt);
      if (date >= sevenDaysAgo && date <= now) {
        currentPeriod++;
      } else if (date >= fourteenDaysAgo && date < sevenDaysAgo) {
        previousPeriod++;
      }
    });

    if (previousPeriod === 0) {
      if (currentPeriod === 0) return { text: '0%', isUp: true };
      return { text: '+100%', isUp: true };
    }

    const percentageChange = Math.round(((currentPeriod - previousPeriod) / previousPeriod) * 100);
    return {
      text: percentageChange > 0 ? `+${percentageChange}%` : `${percentageChange}%`,
      isUp: percentageChange >= 0
    };
  };

  const totalTrend = calculateTrend(mapData);
  const safeTrend = calculateTrend(mapData, 'Safe');
  const warningTrend = calculateTrend(mapData, 'Warning');
  const urgentTrend = calculateTrend(mapData, 'Urgent');

  return (
    <div className="max-w-7xl mx-auto space-y-8 animate-in fade-in duration-500">
      
      {/* Header */}
      <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
        <div>
          <h1 className="text-3xl font-bold text-gray-900 dark:text-white mb-1 flex items-center">
            <LayoutDashboard className="h-7 w-7 mr-3 text-forest-700 dark:text-forest-400" />
            Dashboard Statistik
          </h1>
          <p className="text-sm text-gray-500 dark:text-gray-400">Ringkasan analitik dan pemantauan data laporan Bhuwana Guard.</p>
        </div>
        <div className="flex items-center space-x-2 bg-white dark:bg-gray-800 px-4 py-2 rounded-xl border border-gray-100 dark:border-gray-700 shadow-sm">
          <span className="text-sm font-medium text-gray-600 dark:text-gray-300">Periode:</span>
          <select className="text-sm font-bold text-forest-700 dark:text-forest-400 bg-transparent outline-none cursor-pointer">
            <option className="dark:bg-gray-800">Hari Ini</option>
            <option className="dark:bg-gray-800">Bulan Ini</option>
            <option className="dark:bg-gray-800">Tahun Ini</option>
          </select>
        </div>
      </div>

      {/* Top Stat Cards */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
        {[
          { title: 'Total Laporan', value: totalReports, trend: totalTrend.text, isUp: totalTrend.isUp, icon: LayoutDashboard, color: 'text-blue-600', bg: 'bg-blue-50' },
          { title: 'Selesai', value: safeCount, trend: safeTrend.text, isUp: safeTrend.isUp, icon: CheckCircle2, color: 'text-green-600', bg: 'bg-green-50' },
          { title: 'Diproses', value: warningCount, trend: warningTrend.text, isUp: warningTrend.isUp, icon: Clock, color: 'text-yellow-600', bg: 'bg-yellow-50' },
          { title: 'Diterima (Baru)', value: urgentCount, trend: urgentTrend.text, isUp: urgentTrend.isUp, icon: ShieldAlert, color: 'text-red-600', bg: 'bg-red-50' },
        ].map((stat, idx) => (
          <div key={idx} className="bg-white dark:bg-gray-800 p-6 rounded-3xl shadow-sm border border-gray-100 dark:border-gray-700 flex flex-col justify-between hover:shadow-md transition-shadow">
            <div className="flex justify-between items-start mb-4">
              <div className={`p-3 rounded-2xl ${stat.bg} dark:bg-opacity-20 ${stat.color}`}>
                <stat.icon className="h-6 w-6" />
              </div>
              <span className={`text-xs font-bold px-2 py-1 rounded-full ${stat.isUp ? 'bg-green-100 dark:bg-green-900/30 text-green-700 dark:text-green-400' : 'bg-red-100 dark:bg-red-900/30 text-red-700 dark:text-red-400'}`}>
                {stat.trend}
              </span>
            </div>
            <div>
              <p className="text-sm text-gray-500 dark:text-gray-400 font-medium mb-1">{stat.title}</p>
              <h3 className="text-3xl font-bold text-gray-900 dark:text-white">{stat.value}</h3>
            </div>
          </div>
        ))}
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        
        {/* Main Map Content - 2 Columns */}
        <div className="lg:col-span-2 flex flex-col">
          <div className="bg-white dark:bg-gray-800 rounded-3xl shadow-sm border border-gray-100 dark:border-gray-700 flex-1 flex flex-col overflow-hidden z-0">
            <div className="p-6 border-b border-gray-100 dark:border-gray-700 flex justify-between items-center">
              <div>
                <h3 className="text-lg font-bold text-gray-900 dark:text-white">Peta Sebaran Kasus</h3>
                <p className="text-xs text-gray-500 dark:text-gray-400 mt-1">Pemantauan lokasi laporan di wilayah timur Indonesia</p>
              </div>
            </div>
            <div className="flex-1 w-full h-[500px] lg:h-auto min-h-[400px] z-0">
              {loading ? (
                 <div className="h-full flex items-center justify-center"><div className="animate-spin rounded-full h-8 w-8 border-4 border-forest-500 border-t-transparent"></div></div>
              ) : (
              <MapContainer 
                center={[-0.7893, 113.9213]} 
                zoom={5} 
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
                      <div className="font-bold min-w-[150px]">
                        <p className="text-sm mb-1 text-gray-900">{city.name}</p>
                        <p className="text-xs text-gray-500 font-normal mb-2">{city.desc}</p>
                        <span className={`inline-block text-[10px] uppercase px-2 py-1 rounded-full text-white font-semibold ${
                          city.status === 'Urgent' ? 'bg-red-500' : 
                          city.status === 'Warning' ? 'bg-yellow-500' : 'bg-green-500'
                        }`}>
                          {city.status === 'Urgent' ? 'Diterima' : city.status === 'Warning' ? 'Diproses' : 'Selesai'}
                        </span>
                      </div>
                    </Popup>
                  </Marker>
                ))}
              </MapContainer>
              )}
            </div>
          </div>
        </div>

        {/* Right Sidebar Content - 1 Column */}
        <div className="flex flex-col">
          
          <div className="bg-white dark:bg-gray-800 p-6 rounded-3xl shadow-sm border border-gray-100 dark:border-gray-700 flex-1 flex flex-col items-center justify-center">
            <h3 className="text-lg font-bold text-gray-900 dark:text-white w-full mb-8 text-center border-b border-gray-100 dark:border-gray-700 pb-4">Distribusi Laporan</h3>
            
            <div className="relative w-64 h-64 mb-8">
              <svg viewBox="0 0 100 100" className="w-full h-full transform -rotate-90 drop-shadow-md">
                {/* Red Segment (Urgent) */}
                <circle cx="50" cy="50" r="40" fill="transparent" stroke="#ef4444" strokeWidth="20" 
                  strokeDasharray={`${urgentDash} ${C}`} 
                  strokeDashoffset="0" 
                  className="transition-all duration-1000 ease-out" />
                
                {/* Yellow Segment (Warning) */}
                <circle cx="50" cy="50" r="40" fill="transparent" stroke="#eab308" strokeWidth="20" 
                  strokeDasharray={`${warningDash} ${C}`} 
                  strokeDashoffset={-urgentDash} 
                  className="transition-all duration-1000 ease-out" />
                  
                {/* Green Segment (Safe) */}
                <circle cx="50" cy="50" r="40" fill="transparent" stroke="#22c55e" strokeWidth="20" 
                  strokeDasharray={`${safeDash} ${C}`} 
                  strokeDashoffset={-(urgentDash + warningDash)} 
                  className="transition-all duration-1000 ease-out" />
              </svg>
              
              {/* White hole center with Data */}
              <div className="absolute inset-0 m-auto w-32 h-32 bg-white dark:bg-gray-800 rounded-full flex flex-col items-center justify-center shadow-inner">
                <span className="text-4xl font-extrabold text-gray-900 dark:text-white">{totalReports}</span>
                <span className="text-xs text-gray-500 dark:text-gray-400 font-bold uppercase tracking-wider mt-1">Kasus</span>
              </div>
            </div>

            <div className="flex flex-col w-full gap-4 px-4">
              <div className="flex items-center justify-between p-3 rounded-2xl bg-red-50 dark:bg-red-900/10 border border-red-100 dark:border-red-900/30">
                <div className="flex items-center">
                  <div className="w-4 h-4 rounded-full bg-red-500 mr-3 shadow-sm"></div>
                  <span className="font-semibold text-red-900 dark:text-red-400 text-sm">Diterima (Baru)</span>
                </div>
                <span className="font-bold text-red-700 dark:text-red-400">{urgentPct}%</span>
              </div>

              <div className="flex items-center justify-between p-3 rounded-2xl bg-yellow-50 dark:bg-yellow-900/10 border border-yellow-100 dark:border-yellow-900/30">
                <div className="flex items-center">
                  <div className="w-4 h-4 rounded-full bg-yellow-500 mr-3 shadow-sm"></div>
                  <span className="font-semibold text-yellow-900 dark:text-yellow-400 text-sm">Dalam Proses</span>
                </div>
                <span className="font-bold text-yellow-700 dark:text-yellow-400">{warningPct}%</span>
              </div>

              <div className="flex items-center justify-between p-3 rounded-2xl bg-green-50 dark:bg-green-900/10 border border-green-100 dark:border-green-900/30">
                <div className="flex items-center">
                  <div className="w-4 h-4 rounded-full bg-green-500 mr-3 shadow-sm"></div>
                  <span className="font-semibold text-green-900 dark:text-green-400 text-sm">Aman / Selesai</span>
                </div>
                <span className="font-bold text-green-700 dark:text-green-400">{safePct}%</span>
              </div>
            </div>
            
          </div>
        </div>
      </div>
    </div>
  );
};

export default Statistik;
