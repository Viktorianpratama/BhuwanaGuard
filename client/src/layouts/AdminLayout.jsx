import { useState } from 'react';
import { Outlet } from 'react-router-dom';
import { Menu } from 'lucide-react';
import Sidebar from '../components/Sidebar';

const AdminLayout = () => {
  const [isMobileSidebarOpen, setIsMobileSidebarOpen] = useState(false);

  return (
    <div className="flex h-screen bg-[#fafafc] dark:bg-gray-900 overflow-hidden font-sans relative transition-colors duration-300">
      {/* Sidebar with mobile toggle state */}
      <Sidebar 
        isOpen={isMobileSidebarOpen} 
        setIsOpen={setIsMobileSidebarOpen} 
      />

      <div className="flex-1 flex flex-col h-screen overflow-hidden w-full relative">
        {/* Mobile Header */}
        <header className="lg:hidden flex items-center justify-between p-4 bg-white dark:bg-gray-800 border-b border-gray-100 dark:border-gray-700 shadow-sm shrink-0 transition-colors duration-300">
          <div className="flex items-center space-x-3">
            <img src="/icons-bhuwana.svg" alt="Logo" className="h-8 w-8 object-contain dark:brightness-0 dark:invert" />
            <span className="font-bold text-forest-900 dark:text-forest-400 text-lg">Bhuwana Guard</span>
          </div>
          <button 
            onClick={() => setIsMobileSidebarOpen(true)}
            className="p-2 text-gray-600 dark:text-gray-300 hover:bg-gray-100 dark:hover:bg-gray-700 rounded-lg transition-colors"
          >
            <Menu className="h-6 w-6" />
          </button>
        </header>

        {/* Main Content */}
        <main className="flex-1 overflow-y-auto overflow-x-hidden p-4 sm:p-6 md:p-8 lg:p-10 w-full relative bg-[#fafafc] dark:bg-gray-900 transition-colors duration-300">
          <Outlet />
        </main>
      </div>
    </div>
  );
};

export default AdminLayout;
