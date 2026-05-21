import { useState, useEffect } from 'react';
import { UserPlus, KeyRound, Shield, AlertCircle, CheckCircle, X, Trash2 } from 'lucide-react';

const ManajemenAkun = () => {
  const [activeTab, setActiveTab] = useState('change-password');
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');
  const [success, setSuccess] = useState('');
  
  // State for Change Password
  const [oldPassword, setOldPassword] = useState('');
  const [newPassword, setNewPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');

  // State for Add Admin
  const [newAdminEmail, setNewAdminEmail] = useState('');
  const [newAdminPassword, setNewAdminPassword] = useState('');
  const [admins, setAdmins] = useState([]);

  useEffect(() => {
    if (activeTab === 'manage-admins') {
      fetchAdmins();
    }
  }, [activeTab]);

  const fetchAdmins = async () => {
    try {
      const token = localStorage.getItem('token');
      const res = await fetch('http://localhost:3000/api/admin/users', {
        headers: { 'Authorization': `Bearer ${token}` }
      });
      const data = await res.json();
      if (res.ok) {
        setAdmins(data.users);
      }
    } catch (err) {
      console.error('Failed to fetch admins:', err);
    }
  };

  const showMessage = (msg, type) => {
    if (type === 'error') setError(msg);
    if (type === 'success') setSuccess(msg);
    setTimeout(() => {
      setError('');
      setSuccess('');
    }, 5000);
  };

  const handleChangePassword = async (e) => {
    e.preventDefault();
    if (newPassword !== confirmPassword) {
      return showMessage('Password baru dan konfirmasi tidak cocok!', 'error');
    }

    setLoading(true);
    try {
      const token = localStorage.getItem('token');
      const res = await fetch('http://localhost:3000/api/admin/change-password', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          'Authorization': `Bearer ${token}`
        },
        body: JSON.stringify({ oldPassword, newPassword })
      });
      
      const data = await res.json();
      if (res.ok) {
        showMessage('Password berhasil diubah!', 'success');
        setOldPassword('');
        setNewPassword('');
        setConfirmPassword('');
      } else {
        showMessage(data.error || 'Gagal mengubah password', 'error');
      }
    } catch (err) {
      showMessage('Terjadi kesalahan jaringan', 'error');
    } finally {
      setLoading(false);
    }
  };

  const handleAddAdmin = async (e) => {
    e.preventDefault();
    setLoading(true);
    try {
      const token = localStorage.getItem('token');
      const res = await fetch('http://localhost:3000/api/admin/users', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          'Authorization': `Bearer ${token}`
        },
        body: JSON.stringify({ email: newAdminEmail, password: newAdminPassword })
      });
      
      const data = await res.json();
      if (res.ok) {
        showMessage('Admin baru berhasil ditambahkan!', 'success');
        setNewAdminEmail('');
        setNewAdminPassword('');
        fetchAdmins(); // Refresh list
      } else {
        showMessage(data.error || 'Gagal menambahkan admin', 'error');
      }
    } catch (err) {
      showMessage('Terjadi kesalahan jaringan', 'error');
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="p-6 max-w-6xl mx-auto animate-in fade-in slide-in-from-bottom-4 duration-500">
      <div className="mb-8">
        <h1 className="text-2xl font-bold text-gray-900 dark:text-white flex items-center">
          <Shield className="w-6 h-6 mr-3 text-forest-600" />
          Manajemen Akun
        </h1>
        <p className="text-gray-500 dark:text-gray-400 mt-2">
          Kelola keamanan akun Anda dan tambahkan admin baru ke dalam sistem.
        </p>
      </div>

      {/* Tabs */}
      <div className="flex space-x-1 bg-gray-100 dark:bg-gray-800/50 p-1 rounded-xl mb-8 w-fit">
        <button
          onClick={() => setActiveTab('change-password')}
          className={`flex items-center px-4 py-2.5 text-sm font-medium rounded-lg transition-all duration-200 ${
            activeTab === 'change-password'
              ? 'bg-white dark:bg-gray-700 text-gray-900 dark:text-white shadow-sm'
              : 'text-gray-500 hover:text-gray-700 dark:text-gray-400 dark:hover:text-gray-200 hover:bg-gray-200/50 dark:hover:bg-gray-800'
          }`}
        >
          <KeyRound className="w-4 h-4 mr-2" />
          Ganti Password
        </button>
        <button
          onClick={() => setActiveTab('manage-admins')}
          className={`flex items-center px-4 py-2.5 text-sm font-medium rounded-lg transition-all duration-200 ${
            activeTab === 'manage-admins'
              ? 'bg-white dark:bg-gray-700 text-gray-900 dark:text-white shadow-sm'
              : 'text-gray-500 hover:text-gray-700 dark:text-gray-400 dark:hover:text-gray-200 hover:bg-gray-200/50 dark:hover:bg-gray-800'
          }`}
        >
          <UserPlus className="w-4 h-4 mr-2" />
          Kelola Admin
        </button>
      </div>

      {/* Messages */}
      {error && (
        <div className="mb-6 p-4 bg-red-50 dark:bg-red-900/20 border border-red-200 dark:border-red-800 rounded-xl flex items-start text-red-600 dark:text-red-400">
          <AlertCircle className="w-5 h-5 mr-3 shrink-0 mt-0.5" />
          <p className="text-sm">{error}</p>
        </div>
      )}
      {success && (
        <div className="mb-6 p-4 bg-green-50 dark:bg-green-900/20 border border-green-200 dark:border-green-800 rounded-xl flex items-start text-green-600 dark:text-green-400">
          <CheckCircle className="w-5 h-5 mr-3 shrink-0 mt-0.5" />
          <p className="text-sm">{success}</p>
        </div>
      )}

      {/* Content: Change Password */}
      {activeTab === 'change-password' && (
        <div className="bg-white dark:bg-gray-800 rounded-2xl shadow-sm border border-gray-100 dark:border-gray-700 p-6 md:p-8 max-w-2xl">
          <h2 className="text-lg font-bold text-gray-900 dark:text-white mb-6">Ubah Password Anda</h2>
          <form onSubmit={handleChangePassword} className="space-y-5">
            <div>
              <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">Password Saat Ini</label>
              <input
                type="password"
                required
                value={oldPassword}
                onChange={(e) => setOldPassword(e.target.value)}
                className="w-full px-4 py-2.5 bg-gray-50 dark:bg-gray-900 border border-gray-200 dark:border-gray-700 rounded-xl text-sm focus:ring-2 focus:ring-forest-500 focus:border-forest-500 dark:text-white transition-colors"
                placeholder="••••••••"
              />
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">Password Baru</label>
              <input
                type="password"
                required
                value={newPassword}
                onChange={(e) => setNewPassword(e.target.value)}
                className="w-full px-4 py-2.5 bg-gray-50 dark:bg-gray-900 border border-gray-200 dark:border-gray-700 rounded-xl text-sm focus:ring-2 focus:ring-forest-500 focus:border-forest-500 dark:text-white transition-colors"
                placeholder="••••••••"
                minLength={6}
              />
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">Konfirmasi Password Baru</label>
              <input
                type="password"
                required
                value={confirmPassword}
                onChange={(e) => setConfirmPassword(e.target.value)}
                className="w-full px-4 py-2.5 bg-gray-50 dark:bg-gray-900 border border-gray-200 dark:border-gray-700 rounded-xl text-sm focus:ring-2 focus:ring-forest-500 focus:border-forest-500 dark:text-white transition-colors"
                placeholder="••••••••"
                minLength={6}
              />
            </div>
            <div className="pt-2">
              <button
                type="submit"
                disabled={loading}
                className="px-6 py-2.5 bg-forest-600 hover:bg-forest-700 text-white text-sm font-medium rounded-xl transition-colors disabled:opacity-50 flex items-center"
              >
                {loading ? 'Menyimpan...' : 'Simpan Perubahan'}
              </button>
            </div>
          </form>
        </div>
      )}

      {/* Content: Manage Admins */}
      {activeTab === 'manage-admins' && (
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          
          {/* Add Admin Form */}
          <div className="lg:col-span-1">
            <div className="bg-white dark:bg-gray-800 rounded-2xl shadow-sm border border-gray-100 dark:border-gray-700 p-6">
              <h2 className="text-lg font-bold text-gray-900 dark:text-white mb-6">Tambah Admin</h2>
              <form onSubmit={handleAddAdmin} className="space-y-4">
                <div>
                  <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">Email</label>
                  <input
                    type="email"
                    required
                    value={newAdminEmail}
                    onChange={(e) => setNewAdminEmail(e.target.value)}
                    className="w-full px-4 py-2.5 bg-gray-50 dark:bg-gray-900 border border-gray-200 dark:border-gray-700 rounded-xl text-sm focus:ring-2 focus:ring-forest-500 focus:border-forest-500 dark:text-white transition-colors"
                    placeholder="admin2@email.com"
                  />
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">Password</label>
                  <input
                    type="password"
                    required
                    value={newAdminPassword}
                    onChange={(e) => setNewAdminPassword(e.target.value)}
                    className="w-full px-4 py-2.5 bg-gray-50 dark:bg-gray-900 border border-gray-200 dark:border-gray-700 rounded-xl text-sm focus:ring-2 focus:ring-forest-500 focus:border-forest-500 dark:text-white transition-colors"
                    placeholder="••••••••"
                    minLength={6}
                  />
                </div>
                <div className="pt-2">
                  <button
                    type="submit"
                    disabled={loading}
                    className="w-full py-2.5 bg-forest-600 hover:bg-forest-700 text-white text-sm font-medium rounded-xl transition-colors disabled:opacity-50 flex items-center justify-center"
                  >
                    <UserPlus className="w-4 h-4 mr-2" />
                    {loading ? 'Menambahkan...' : 'Daftarkan Admin'}
                  </button>
                </div>
              </form>
            </div>
          </div>

          {/* Admin List */}
          <div className="lg:col-span-2">
            <div className="bg-white dark:bg-gray-800 rounded-2xl shadow-sm border border-gray-100 dark:border-gray-700 overflow-hidden">
              <div className="p-6 border-b border-gray-100 dark:border-gray-700">
                <h2 className="text-lg font-bold text-gray-900 dark:text-white">Daftar Admin Aktif</h2>
              </div>
              <div className="overflow-x-auto">
                <table className="w-full">
                  <thead className="bg-gray-50 dark:bg-gray-900/50">
                    <tr>
                      <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 dark:text-gray-400 uppercase tracking-wider">ID</th>
                      <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 dark:text-gray-400 uppercase tracking-wider">Email</th>
                      <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 dark:text-gray-400 uppercase tracking-wider">Role</th>
                    </tr>
                  </thead>
                  <tbody className="divide-y divide-gray-100 dark:divide-gray-700">
                    {admins.map((admin) => (
                      <tr key={admin.id} className="hover:bg-gray-50 dark:hover:bg-gray-800/50 transition-colors">
                        <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500 dark:text-gray-400">
                          #{admin.id}
                        </td>
                        <td className="px-6 py-4 whitespace-nowrap">
                          <div className="text-sm font-medium text-gray-900 dark:text-white">{admin.email}</div>
                        </td>
                        <td className="px-6 py-4 whitespace-nowrap">
                          <span className="px-2.5 py-1 text-xs font-medium bg-forest-100 text-forest-700 dark:bg-forest-900/30 dark:text-forest-400 rounded-full">
                            {admin.role}
                          </span>
                        </td>
                      </tr>
                    ))}
                    {admins.length === 0 && (
                      <tr>
                        <td colSpan="3" className="px-6 py-8 text-center text-sm text-gray-500">
                          Tidak ada data admin ditemukan.
                        </td>
                      </tr>
                    )}
                  </tbody>
                </table>
              </div>
            </div>
          </div>

        </div>
      )}
    </div>
  );
};

export default ManajemenAkun;
