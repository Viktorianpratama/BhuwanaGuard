import { NavLink, useLocation, useNavigate } from 'react-router-dom';
import { Home, AlertTriangle, TrendingUp, LogOut, X, Users } from 'lucide-react';
import ThemeToggle from './ThemeToggle';

const Sidebar = ({ isOpen, setIsOpen }) => {
  const location = useLocation();
  const navigate = useNavigate();
  const isCommandCentre = location.pathname === '/admin';

  const navItems = [
    { name: 'Manajemen Laporan', icon: Home, path: '/admin/laporan' },
    { name: 'Sistem Peringatan', icon: AlertTriangle, path: '/admin/peringatan' },
    { name: 'Statistik', icon: TrendingUp, path: '/admin/statistik' },
    { name: 'Manajemen Akun', icon: Users, path: '/admin/akun' },
  ];

  const handleLinkClick = () => {
    if (setIsOpen) setIsOpen(false);
  };

  const handleLogout = () => {
    localStorage.removeItem('token');
    navigate('/login');
  };

  return (
    <>
      {/* Mobile Overlay */}
      {isOpen && (
        <div 
          className="fixed inset-0 bg-gray-900/50 backdrop-blur-sm z-40 lg:hidden transition-opacity"
          onClick={() => setIsOpen(false)}
        ></div>
      )}

      {/* Sidebar Container */}
      <div className={`fixed lg:relative top-0 left-0 w-72 bg-white dark:bg-gray-900 h-full border-r border-gray-100 dark:border-gray-800 flex flex-col shadow-[4px_0_24px_rgba(0,0,0,0.02)] z-50 transform transition-transform duration-300 ease-in-out lg:translate-x-0 ${isOpen ? 'translate-x-0' : '-translate-x-full'}`}>
        
        {/* Logo & Close Button */}
        <div className="p-8 pb-6 flex items-center justify-between">
          <div className="flex items-center space-x-3">
            <img src="/icons-bhuwana.svg" alt="Logo" className="h-10 w-10 object-contain dark:brightness-0 dark:invert" />
            <div className="flex flex-col">
              <span className="font-bold text-forest-900 dark:text-forest-400 text-lg leading-tight">Bhuwana Guard</span>
              <span className="text-gray-500 dark:text-gray-400 text-xs font-medium mt-0.5">Admin Panel</span>
            </div>
          </div>
          {/* Close button for mobile */}
          <button 
            className="lg:hidden p-2 text-gray-500 hover:bg-gray-100 dark:hover:bg-gray-800 rounded-lg transition-colors"
            onClick={() => setIsOpen(false)}
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Main Action */}
        <div className="px-6 mb-8 mt-2">
          <NavLink 
            to="/admin" 
            end
            onClick={handleLinkClick}
            className={`flex items-center justify-center space-x-2 w-full py-3.5 px-4 rounded-xl font-bold text-sm transition-all duration-300 ${
              isCommandCentre 
                ? 'bg-forest-900 text-white shadow-lg shadow-forest-900/20' 
                : 'bg-forest-50 dark:bg-gray-800 text-forest-900 dark:text-gray-300 hover:bg-forest-100 dark:hover:bg-gray-700'
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
          <h3 className="text-[11px] font-bold text-forest-900 dark:text-forest-400 tracking-widest mb-4 uppercase opacity-80">MAIN HOME</h3>
          <nav className="space-y-1.5">
            {navItems.map((item) => {
              // Check if active or child of active
              const isActive = location.pathname.startsWith(item.path);
              return (
                <NavLink
                  key={item.name}
                  to={item.path}
                  onClick={handleLinkClick}
                  className={`flex items-center space-x-3 px-4 py-3 rounded-xl transition-all duration-300 ${
                    isActive 
                      ? 'bg-forest-50/80 dark:bg-forest-900/50 text-forest-900 dark:text-forest-400 font-bold' 
                      : 'text-gray-500 dark:text-gray-400 font-medium hover:bg-gray-50 dark:hover:bg-gray-800 hover:text-forest-900 dark:hover:text-white'
                  }`}
                >
                  <item.icon className={`h-5 w-5 ${isActive ? 'text-forest-700 dark:text-forest-400' : ''}`} />
                  <span className="text-sm">{item.name}</span>
                </NavLink>
              );
            })}
          </nav>
        </div>

        {/* Footer */}
        <div className="p-6 border-t border-gray-100 dark:border-gray-800 mx-6 mb-2 mt-auto">
          <div className="flex justify-between items-center mb-4">
            <span className="text-sm font-medium text-gray-500 dark:text-gray-400">Theme</span>
            <ThemeToggle />
          </div>
          <button onClick={handleLogout} className="w-full flex items-center space-x-3 px-4 py-3 rounded-xl text-gray-500 dark:text-gray-400 hover:bg-red-50 dark:hover:bg-red-900/20 hover:text-red-600 dark:hover:text-red-400 transition-colors font-medium group">
            <LogOut className="h-5 w-5 group-hover:-translate-x-1 transition-transform" />
            <span className="text-sm">Log Out</span>
          </button>
        </div>
      </div>
    </>
  );
};

export default Sidebar;
