import { Leaf, Users, ShieldCheck, Heart } from 'lucide-react';
import Button from '../components/Button';

const Relawan = () => {
  return (
    <div className="bg-white min-h-screen">
      {/* Hero Section */}
      <div className="relative py-20 bg-forest-900 overflow-hidden">
        <div className="absolute inset-0 opacity-20">
          <img 
            src="https://images.unsplash.com/photo-1542273917363-3b1817f69a2d?w=800&auto=format&fit=crop&q=60" 
            alt="Forest Background" 
            className="w-full h-full object-cover"
          />
        </div>
        <div className="relative z-10 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <div className="inline-flex items-center justify-center p-4 bg-forest-800 rounded-full mb-6 text-forest-200">
            <Heart className="h-10 w-10" />
          </div>
          <h1 className="text-4xl md:text-6xl font-bold text-white mb-6">Jadilah Pahlawan Lingkungan</h1>
          <p className="text-xl text-forest-100 max-w-3xl mx-auto">
            Bergabunglah bersama ribuan relawan Bhuwana Guard lainnya. Bersama kita jaga kelestarian hutan dan lindungi satwa liar dari kepunahan.
          </p>
        </div>
      </div>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-16 items-start">
          
          {/* Info Section */}
          <div className="space-y-12">
            <div>
              <h2 className="text-3xl font-bold text-gray-900 mb-6">Mengapa Bergabung?</h2>
              <div className="space-y-8">
                <div className="flex gap-4">
                  <div className="w-12 h-12 rounded-xl bg-green-100 flex items-center justify-center shrink-0">
                    <Leaf className="h-6 w-6 text-green-600" />
                  </div>
                  <div>
                    <h3 className="text-xl font-bold text-gray-900 mb-2">Lindungi Hutan Kita</h3>
                    <p className="text-gray-600">Aksi nyata untuk menyelamatkan ekosistem dari kerusakan dan penebangan liar.</p>
                  </div>
                </div>
                <div className="flex gap-4">
                  <div className="w-12 h-12 rounded-xl bg-blue-100 flex items-center justify-center shrink-0">
                    <Users className="h-6 w-6 text-blue-600" />
                  </div>
                  <div>
                    <h3 className="text-xl font-bold text-gray-900 mb-2">Komunitas Peduli</h3>
                    <p className="text-gray-600">Berjejaring dan belajar bersama komunitas yang memiliki visi yang sama.</p>
                  </div>
                </div>
                <div className="flex gap-4">
                  <div className="w-12 h-12 rounded-xl bg-yellow-100 flex items-center justify-center shrink-0">
                    <ShieldCheck className="h-6 w-6 text-yellow-600" />
                  </div>
                  <div>
                    <h3 className="text-xl font-bold text-gray-900 mb-2">Pelatihan Resmi</h3>
                    <p className="text-gray-600">Dapatkan sertifikasi dan pelatihan dari pakar lingkungan dan kehutanan.</p>
                  </div>
                </div>
              </div>
            </div>
            
            <div className="bg-forest-50 p-8 rounded-3xl border border-forest-100">
              <h3 className="text-2xl font-bold text-forest-900 mb-4">Syarat Bergabung:</h3>
              <ul className="list-disc list-inside space-y-3 text-forest-800 font-medium">
                <li>Berusia minimal 17 tahun.</li>
                <li>Memiliki kepedulian tinggi terhadap alam.</li>
                <li>Bersedia mengikuti pelatihan dasar.</li>
                <li>Bisa bekerja sama dalam tim.</li>
              </ul>
            </div>
          </div>

          {/* Form Section */}
          <div className="bg-white p-8 md:p-10 rounded-3xl shadow-xl border border-gray-100">
            <h2 className="text-2xl font-bold text-gray-900 mb-8 text-center">Formulir Pendaftaran</h2>
            <form className="space-y-6" onSubmit={(e) => e.preventDefault()}>
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
                <div className="space-y-2">
                  <label htmlFor="firstName" className="block text-sm font-semibold text-gray-700">Nama Depan</label>
                  <input type="text" id="firstName" className="w-full px-4 py-3 rounded-xl border border-gray-300 focus:ring-2 focus:ring-forest-500 focus:border-forest-500 outline-none transition-all" placeholder="John" />
                </div>
                <div className="space-y-2">
                  <label htmlFor="lastName" className="block text-sm font-semibold text-gray-700">Nama Belakang</label>
                  <input type="text" id="lastName" className="w-full px-4 py-3 rounded-xl border border-gray-300 focus:ring-2 focus:ring-forest-500 focus:border-forest-500 outline-none transition-all" placeholder="Doe" />
                </div>
              </div>

              <div className="space-y-2">
                <label htmlFor="email" className="block text-sm font-semibold text-gray-700">Alamat Email</label>
                <input type="email" id="email" className="w-full px-4 py-3 rounded-xl border border-gray-300 focus:ring-2 focus:ring-forest-500 focus:border-forest-500 outline-none transition-all" placeholder="johndoe@example.com" />
              </div>

              <div className="space-y-2">
                <label htmlFor="phone" className="block text-sm font-semibold text-gray-700">Nomor Handphone (WhatsApp)</label>
                <input type="tel" id="phone" className="w-full px-4 py-3 rounded-xl border border-gray-300 focus:ring-2 focus:ring-forest-500 focus:border-forest-500 outline-none transition-all" placeholder="0812-3456-7890" />
              </div>

              <div className="space-y-2">
                <label htmlFor="reason" className="block text-sm font-semibold text-gray-700">Mengapa Anda Ingin Bergabung?</label>
                <textarea id="reason" rows="4" className="w-full px-4 py-3 rounded-xl border border-gray-300 focus:ring-2 focus:ring-forest-500 focus:border-forest-500 outline-none transition-all resize-none" placeholder="Ceritakan motivasi Anda..." />
              </div>

              <Button type="submit" variant="primary" className="w-full py-4 text-lg mt-4 shadow-lg shadow-forest-500/30">
                Kirim Pendaftaran
              </Button>
            </form>
          </div>

        </div>
      </div>
    </div>
  );
};

export default Relawan;
