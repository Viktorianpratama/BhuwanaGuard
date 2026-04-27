import { Outlet } from 'react-router-dom';
import Sidebar from '../components/Sidebar';

const AdminLayout = () => {
  return (
    <div className="flex h-screen bg-[#fafafc] overflow-hidden font-sans">
      <Sidebar />
      <div className="flex-1 overflow-y-auto">
        <main className="p-8 lg:p-10">
          <Outlet />
        </main>
      </div>
    </div>
  );
};

export default AdminLayout;
