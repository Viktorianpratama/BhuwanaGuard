import { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import Button from '../components/Button';
import { ArrowLeft, CheckCircle, AlertCircle, X, Eye, EyeOff } from 'lucide-react';
import { auth, googleProvider } from '../firebase';
import { signInWithEmailAndPassword, signInWithPopup, setPersistence, browserLocalPersistence, browserSessionPersistence, sendPasswordResetEmail } from 'firebase/auth';

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

  const handleAdminVerification = async (user) => {
    try {
      const token = await user.getIdToken();
      const response = await fetch('http://localhost:3000/api/verify-login', {
        method: 'POST',
        headers: {
          'Authorization': `Bearer ${token}`
        }
      });
      const result = await response.json();
      if (response.ok) {
        console.log("Login Admin Berhasil:", result);
        navigate('/admin');
      } else {
        console.log("Gagal login:", result.error);
        setError("Anda bukan Admin!");
        auth.signOut();
      }
    } catch (err) {
      console.error(err);
      setError("Terjadi kesalahan saat memverifikasi admin");
      auth.signOut();
    }
  };

  const handleEmailLogin = async (e) => {
    e.preventDefault();
    setLoading(true);
    setError('');
    try {
      // Set persistence based on rememberMe checkbox
      await setPersistence(auth, rememberMe ? browserLocalPersistence : browserSessionPersistence);
      const userCredential = await signInWithEmailAndPassword(auth, email, password);
      await handleAdminVerification(userCredential.user);
    } catch (err) {
      console.error(err);
      setError("Email atau password salah.");
    } finally {
      setLoading(false);
    }
  };

  const handleGoogleLogin = async () => {
    setLoading(true);
    setError('');
    try {
      // Set persistence based on rememberMe checkbox
      await setPersistence(auth, rememberMe ? browserLocalPersistence : browserSessionPersistence);
      const result = await signInWithPopup(auth, googleProvider);
      await handleAdminVerification(result.user);
    } catch (err) {
      console.error(err);
      setError("Gagal login dengan Google.");
    } finally {
      setLoading(false);
    }
  };

  const handleForgotPassword = async (e) => {
    e.preventDefault();
    if (!email) {
      setError("Masukkan alamat email Anda terlebih dahulu pada kolom Email.");
      return;
    }
    
    try {
      setLoading(true);
      setError('');
      await sendPasswordResetEmail(auth, email);
      showToast("Tautan reset password telah dikirim! Silakan periksa kotak masuk atau folder spam email Anda.", "success");
    } catch (err) {
      console.error(err);
      if (err.code === 'auth/user-not-found') {
        setError("Email tidak terdaftar.");
      } else if (err.code === 'auth/invalid-email') {
        setError("Format email tidak valid.");
      } else {
        setError("Gagal mengirim email reset. Silakan coba lagi.");
      }
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

          <h1 className="text-3xl font-bold text-gray-900 dark:text-white mb-2">Selamat Datang</h1>
          <p className="text-gray-600 dark:text-gray-400 mb-8">Silakan masuk ke akun Anda untuk melanjutkan.</p>

          {error && <div className="mb-4 p-3 bg-red-100 dark:bg-red-900/50 text-red-700 dark:text-red-400 rounded-lg text-sm border border-red-200 dark:border-red-800">{error}</div>}

          <form className="space-y-6" onSubmit={handleEmailLogin}>
            <div>
              <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">Email</label>
              <input 
                type="email" 
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                className="w-full px-4 py-3 rounded-lg border border-gray-300 dark:border-gray-700 bg-white dark:bg-gray-800 text-gray-900 dark:text-white focus:ring-2 focus:ring-forest-500 focus:border-forest-500 transition-colors outline-none"
                placeholder="nama@email.com"
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
              <button 
                type="button" 
                onClick={handleForgotPassword} 
                className="text-sm font-medium text-forest-700 dark:text-forest-400 hover:text-forest-900 dark:hover:text-forest-300"
              >
                Lupa password?
              </button>
            </div>

            <Button variant="primary" className="w-full py-3 text-lg flex justify-center items-center" disabled={loading}>
              {loading ? 'Memproses...' : 'Sign In'}
            </Button>
          </form>

          <div className="mt-8">
            <div className="relative">
              <div className="absolute inset-0 flex items-center">
                <div className="w-full border-t border-gray-300 dark:border-gray-700"></div>
              </div>
              <div className="relative flex justify-center text-sm">
                <span className="px-2 bg-white dark:bg-gray-900 text-gray-500 dark:text-gray-400 transition-colors duration-300">Atau masuk dengan</span>
              </div>
            </div>

            <div className="mt-6">
              <button 
                onClick={handleGoogleLogin} 
                disabled={loading}
                type="button"
                className="w-full flex justify-center items-center px-4 py-3 border border-gray-300 dark:border-gray-700 shadow-sm rounded-lg text-sm font-medium text-gray-700 dark:text-gray-200 bg-white dark:bg-gray-800 hover:bg-gray-50 dark:hover:bg-gray-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-forest-500 transition-colors disabled:opacity-50"
              >
                <svg className="h-5 w-5 mr-2" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                  <path d="M22.56 12.25c0-.78-.07-1.53-.2-2.25H12v4.26h5.92c-.26 1.37-1.04 2.53-2.21 3.31v2.77h3.57c2.08-1.92 3.28-4.74 3.28-8.09z" fill="#4285F4"/>
                  <path d="M12 23c2.97 0 5.46-.98 7.28-2.66l-3.57-2.77c-.98.66-2.23 1.06-3.71 1.06-2.86 0-5.29-1.93-6.16-4.53H2.18v2.84C3.99 20.53 7.7 23 12 23z" fill="#34A853"/>
                  <path d="M5.84 14.09c-.22-.66-.35-1.36-.35-2.09s.13-1.43.35-2.09V7.07H2.18C1.43 8.55 1 10.22 1 12s.43 3.45 1.18 4.93l2.85-2.22.81-.62z" fill="#FBBC05"/>
                  <path d="M12 5.38c1.62 0 3.06.56 4.21 1.64l3.15-3.15C17.45 2.09 14.97 1 12 1 7.7 1 3.99 3.47 2.18 7.07l3.66 2.84c.87-2.6 3.3-4.53 6.16-4.53z" fill="#EA4335"/>
                </svg>
                Sign in with Google
              </button>
            </div>
          </div>
          
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
