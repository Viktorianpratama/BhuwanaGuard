import { NavLink, useLocation } from 'react-router-dom';
import { Home, AlertTriangle, TrendingUp, LogOut } from 'lucide-react';

const Sidebar = () => {
  const location = useLocation();
  const isCommandCentre = location.pathname === '/admin';

  const navItems = [
    { name: 'Manajemen Laporan', icon: Home, path: '/admin/laporan' },
    { name: 'Sistem Peringatan', icon: AlertTriangle, path: '/admin/peringatan' },
    { name: 'Statistik', icon: TrendingUp, path: '/admin/statistik' },
  ];

  return (
    <div className="w-72 bg-white h-full border-r border-gray-100 flex flex-col shadow-[4px_0_24px_rgba(0,0,0,0.02)] z-10">
      {/* Logo */}
      <div className="p-8 pb-6 flex items-center space-x-3">
        <img src="/icons-bhuwana.svg" alt="Logo" className="h-10 w-10 object-contain" />
        <div className="flex flex-col">
          <span className="font-bold text-forest-900 text-lg leading-tight">Bhuwana Guard</span>
          <span className="text-gray-500 text-xs font-medium mt-0.5">Admin Panel</span>
        </div>
      </div>

      {/* Main Action */}
      <div className="px-6 mb-8 mt-2">
        <NavLink 
          to="/admin" 
          end
          className={`flex items-center justify-center space-x-2 w-full py-3.5 px-4 rounded-xl font-bold text-sm transition-all duration-300 ${
            isCommandCentre 
              ? 'bg-forest-900 text-white shadow-lg shadow-forest-900/20' 
              : 'bg-forest-50 text-forest-900 hover:bg-forest-100'
          }`}
        >
          <svg className="w-5 h-5 mr-1.5" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
            <path d="M3 3v18h18"/><path d="M18 17V9"/><path d="M13 17V5"/><path d="M8 17v-3"/>
          </svg>
          Command Centre
        </NavLink>
      </div>

      {/* Navigation */}
      <div className="flex-1 px-6">
        <h3 className="text-[11px] font-bold text-forest-900 tracking-widest mb-4 uppercase opacity-80">MAIN HOME</h3>
        <nav className="space-y-1.5">
          {navItems.map((item) => {
            // Check if active or child of active
            const isActive = location.pathname.startsWith(item.path);
            return (
              <NavLink
                key={item.name}
                to={item.path}
                className={`flex items-center space-x-3 px-4 py-3 rounded-xl transition-all duration-300 ${
                  isActive 
                    ? 'bg-forest-50/80 text-forest-900 font-bold' 
                    : 'text-gray-500 font-medium hover:bg-gray-50 hover:text-forest-900'
                }`}
              >
                <item.icon className={`h-5 w-5 ${isActive ? 'text-forest-700' : ''}`} />
                <span className="text-sm">{item.name}</span>
              </NavLink>
            );
          })}
        </nav>
      </div>

      {/* Footer */}
      <div className="p-6 border-t border-gray-100 mx-6 mb-2 mt-auto">
        <NavLink to="/login" className="flex items-center space-x-3 px-4 py-3 rounded-xl text-gray-500 hover:bg-red-50 hover:text-red-600 transition-colors font-medium group">
          <LogOut className="h-5 w-5 group-hover:-translate-x-1 transition-transform" />
          <span className="text-sm">Log Out</span>
        </NavLink>
      </div>
    </div>
  );
};

export default Sidebar;
