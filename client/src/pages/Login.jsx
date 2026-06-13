import { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import Button from '../components/Button';
import { ArrowLeft, CheckCircle, AlertCircle, X, Eye, EyeOff } from 'lucide-react';

const Login = () => {
  const navigate = useNavigate();
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [rememberMe, setRememberMe] = useState(false);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');
  const [showPassword, setShowPassword] = useState(false);
  const [toast, setToast] = useState({ show: false, message: '', type: 'success' });

  const showToast = (message, type = 'success') => {
    setToast({ show: true, message, type });
    setTimeout(() => setToast({ show: false, message: '', type }), 5000);
  };

  const handleEmailLogin = async (e) => {
    e.preventDefault();
    setLoading(true);
    setError('');
    try {
      const response = await fetch(`${import.meta.env.VITE_API_URL}/api/login`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json'
        },
        body: JSON.stringify({ email, password })
      });
      
      const data = await response.json();

      if (response.ok) {
        // Simpan token ke localStorage
        localStorage.setItem('token', data.token);
        
        // Simpan preferensi remember me jika perlu, meskipun di sini token berlaku 24 jam by default
        
        showToast("Login berhasil!", "success");
        setTimeout(() => {
          navigate('/admin');
        }, 1000);
      } else {
        setError(data.error || "Email atau password salah.");
      }
    } catch (err) {
      console.error(err);
      setError("Gagal terhubung ke server. Pastikan server backend berjalan.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen flex bg-white dark:bg-gray-900 transition-colors duration-300">
      {/* Left side - Image Illustration */}
      <div className="hidden lg:flex lg:w-1/2 relative overflow-hidden bg-forest-900 dark:bg-black">
        <div className="absolute inset-0 bg-black/40 z-10"></div>
        <img 
          src="https://images.unsplash.com/photo-1448375240586-882707db888b?auto=format&fit=crop&q=80&w=2000" 
          alt="Forest Wildlife" 
          className="absolute inset-0 w-full h-full object-cover"
        />
        <div className="absolute bottom-0 left-0 right-0 p-12 z-20 text-white">
          <h2 className="text-4xl font-bold mb-4">Lindungi Alam Kita</h2>
          <p className="text-lg text-gray-200">Bergabung dengan platform Bhuwana Guard untuk membantu mengawasi dan melaporkan aktivitas yang mengancam ekosistem hutan.</p>
        </div>
      </div>

      {/* Right side - Form */}
      <div className="w-full lg:w-1/2 flex flex-col justify-center px-8 sm:px-16 md:px-24 py-12">
        <div className="max-w-md w-full mx-auto">
          <Link to="/" className="inline-flex items-center text-sm font-medium text-gray-500 hover:text-forest-700 mb-8 transition-colors">
            <ArrowLeft className="w-4 h-4 mr-2" />
            Kembali ke Beranda
          </Link>
          
          <div className="mb-6">
            <img 
              src="/icons-bhuwana.svg" 
              alt="Bhuwana Guard Logo" 
              className="h-16 w-16 md:h-20 md:w-20 object-contain dark:brightness-0 dark:invert" 
            />
          </div>

          <h1 className="text-3xl font-bold text-gray-900 dark:text-white mb-2">Selamat Datang Admin</h1>
          <p className="text-gray-600 dark:text-gray-400 mb-8">Silakan masuk menggunakan akun admin Anda.</p>

          {error && <div className="mb-4 p-3 bg-red-100 dark:bg-red-900/50 text-red-700 dark:text-red-400 rounded-lg text-sm border border-red-200 dark:border-red-800">{error}</div>}

          <form className="space-y-6" onSubmit={handleEmailLogin}>
            <div>
              <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">Email</label>
              <input 
                type="email" 
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                className="w-full px-4 py-3 rounded-lg border border-gray-300 dark:border-gray-700 bg-white dark:bg-gray-800 text-gray-900 dark:text-white focus:ring-2 focus:ring-forest-500 focus:border-forest-500 transition-colors outline-none"
                placeholder="admin@bhuwanaguard.com"
                required
              />
            </div>
            
            <div>
              <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">Password</label>
              <div className="relative">
                <input 
                  type={showPassword ? "text" : "password"} 
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  className="w-full px-4 py-3 rounded-lg border border-gray-300 dark:border-gray-700 bg-white dark:bg-gray-800 text-gray-900 dark:text-white focus:ring-2 focus:ring-forest-500 focus:border-forest-500 transition-colors outline-none pr-12"
                  placeholder="••••••••"
                  required
                />
                <button
                  type="button"
                  onClick={() => setShowPassword(!showPassword)}
                  className="absolute right-3 top-1/2 -translate-y-1/2 text-gray-400 hover:text-gray-600 dark:hover:text-gray-200 transition-colors p-1"
                >
                  {showPassword ? <EyeOff className="w-5 h-5" /> : <Eye className="w-5 h-5" />}
                </button>
              </div>
            </div>

            <div className="flex items-center justify-between">
              <div className="flex items-center">
                <input 
                  type="checkbox" 
                  checked={rememberMe}
                  onChange={(e) => setRememberMe(e.target.checked)}
                  className="h-4 w-4 text-forest-600 focus:ring-forest-500 border-gray-300 rounded" 
                />
                <label className="ml-2 block text-sm text-gray-700 dark:text-gray-300">Ingat saya</label>
              </div>
              {/* Lupa Password dihapus sementara karena membutuhkan sistem email terpisah */}
            </div>

            <Button variant="primary" className="w-full py-3 text-lg flex justify-center items-center" disabled={loading}>
              {loading ? 'Memproses...' : 'Sign In'}
            </Button>
          </form>
          
        </div>
      </div>

      {/* Toast Notification */}
      {toast.show && (
        <div className="fixed top-8 right-8 z-50 animate-in fade-in slide-in-from-top-4 duration-300 max-w-sm w-full">
          <div className={`flex items-start p-4 rounded-2xl shadow-xl border ${
            toast.type === 'success' 
              ? 'bg-white dark:bg-gray-800 border-green-100 dark:border-green-900/30' 
              : 'bg-white dark:bg-gray-800 border-red-100 dark:border-red-900/30'
          }`}>
            <div className={`shrink-0 p-2 rounded-full ${
              toast.type === 'success' 
                ? 'bg-green-100 text-green-600 dark:bg-green-900/30 dark:text-green-400' 
                : 'bg-red-100 text-red-600 dark:bg-red-900/30 dark:text-red-400'
            }`}>
              {toast.type === 'success' ? <CheckCircle className="w-5 h-5" /> : <AlertCircle className="w-5 h-5" />}
            </div>
            <div className="ml-4 mr-8 flex-1">
              <h3 className={`text-sm font-bold ${
                toast.type === 'success' ? 'text-green-800 dark:text-green-400' : 'text-red-800 dark:text-red-400'
              }`}>
                {toast.type === 'success' ? 'Berhasil' : 'Gagal'}
              </h3>
              <p className="text-sm text-gray-600 dark:text-gray-300 mt-1 leading-relaxed">{toast.message}</p>
            </div>
            <button 
              onClick={() => setToast({ ...toast, show: false })}
              className="shrink-0 text-gray-400 hover:text-gray-600 dark:hover:text-gray-200 transition-colors p-1"
            >
              <X className="w-4 h-4" />
            </button>
          </div>
        </div>
      )}
    </div>
  );
};

export default Login;
