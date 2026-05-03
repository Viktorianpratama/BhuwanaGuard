import { useState } from 'react';
import { Outlet } from 'react-router-dom';
import { Menu } from 'lucide-react';
import Sidebar from '../components/Sidebar';

const AdminLayout = () => {
  const [isMobileSidebarOpen, setIsMobileSidebarOpen] = useState(false);

  return (
    <div className="flex h-screen bg-[#fafafc] overflow-hidden font-sans relative">
      {/* Sidebar with mobile toggle state */}
      <Sidebar 
        isOpen={isMobileSidebarOpen} 
        setIsOpen={setIsMobileSidebarOpen} 
      />

      <div className="flex-1 flex flex-col h-screen overflow-hidden w-full relative">
        {/* Mobile Header */}
        <header className="lg:hidden flex items-center justify-between p-4 bg-white border-b border-gray-100 shadow-sm shrink-0">
          <div className="flex items-center space-x-3">
            <img src="/icons-bhuwana.svg" alt="Logo" className="h-8 w-8 object-contain" />
            <span className="font-bold text-forest-900 text-lg">Bhuwana Guard</span>
          </div>
          <button 
            onClick={() => setIsMobileSidebarOpen(true)}
            className="p-2 text-gray-600 hover:bg-gray-100 rounded-lg transition-colors"
          >
            <Menu className="h-6 w-6" />
          </button>
        </header>

        {/* Main Content */}
        <main className="flex-1 overflow-y-auto overflow-x-hidden p-4 sm:p-6 md:p-8 lg:p-10 w-full relative">
          <Outlet />
        </main>
      </div>
    </div>
  );
};

export default AdminLayout;
