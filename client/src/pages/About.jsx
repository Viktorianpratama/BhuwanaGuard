import { ShieldAlert, Activity, Users, Leaf } from 'lucide-react';

const About = () => {
  return (
    <div className="bg-gray-50 min-h-screen">
      {/* Hero Section */}
      <div className="relative pt-32 pb-20 lg:pt-40 lg:pb-28 overflow-hidden">
        <div className="absolute inset-0 bg-forest-900/5 bg-[url('https://images.unsplash.com/photo-1511497584788-876760111969?auto=format&fit=crop&q=80&w=2000')] bg-cover bg-center mix-blend-overlay opacity-10"></div>
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
          <div className="text-center max-w-3xl mx-auto">
            <h1 className="text-4xl md:text-6xl font-bold text-gray-900 mb-6 tracking-tight">
              Menjaga Harmoni <span className="text-transparent bg-clip-text bg-linear-to-r from-forest-600 to-forest-400">Alam & Manusia</span>
            </h1>
            <p className="text-lg md:text-xl text-gray-600 leading-relaxed">
              Sebuah inisiatif untuk melestarikan ekosistem hutan dan melindungi satwa liar dari ancaman konflik dan perburuan.
            </p>
          </div>
        </div>
      </div>

      {/* Main Content Section */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16 lg:py-24">
        <div className="flex flex-col lg:flex-row items-center gap-16">
          <div className="lg:w-1/2">
            <div className="relative rounded-3xl overflow-hidden shadow-2xl">
              <div className="absolute inset-0 bg-forest-900/20 mix-blend-multiply z-10"></div>
              <img 
                src="https://images.unsplash.com/photo-1542601906990-b4d3fb778b09?auto=format&fit=crop&q=80&w=1000" 
                alt="Hutan Lindung" 
                className="w-full h-[500px] object-cover transform hover:scale-105 transition-transform duration-700"
              />
              <div className="absolute bottom-0 left-0 right-0 p-8 bg-linear-to-t from-gray-900/90 to-transparent z-20">
                <div className="flex items-center gap-3 text-white">
                  <ShieldAlert className="h-8 w-8 text-green-400" />
                  <span className="font-bold text-xl">Perlindungan 24/7</span>
                </div>
              </div>
            </div>
          </div>
          
          <div className="lg:w-1/2 space-y-8">
            <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-forest-50 border border-forest-100 text-forest-700 font-semibold text-sm">
              <Leaf className="h-4 w-4" />
              Tentang Bhuwana Guard
            </div>
            <h2 className="text-3xl md:text-4xl font-bold text-gray-900 leading-snug">
              Sistem Tanggap Darurat Ekosistem Terpadu
            </h2>
            <div className="prose prose-lg text-gray-600">
              <p className="leading-relaxed text-lg font-medium text-gray-800 border-l-4 border-forest-500 pl-6 bg-forest-50/50 py-4 rounded-r-2xl">
                <strong className="text-forest-700">BHUWANA GUARD</strong> adalah sistem tanggap darurat ekosistem yang membantu menangani konflik satwa liar di sekitar kawasan hutan. Platform ini dibuat untuk membantu warga dan petugas dalam melaporkan, memantau, dan menangani kejadian dengan lebih cepat dan terstruktur.
              </p>
              <p className="mt-6 leading-relaxed">
                Melalui kolaborasi antara teknologi dan partisipasi aktif masyarakat, kami berusaha menciptakan lingkungan di mana satwa liar dapat hidup dengan aman di habitat aslinya tanpa menimbulkan ancaman bagi pemukiman warga sekitarnya.
              </p>
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-6 pt-6">
              <div className="bg-white p-6 rounded-2xl border border-gray-100 shadow-sm hover:shadow-md transition-shadow">
                <div className="h-12 w-12 bg-blue-50 text-blue-600 rounded-xl flex items-center justify-center mb-4">
                  <Activity className="h-6 w-6" />
                </div>
                <h3 className="font-bold text-gray-900 mb-2">Respon Cepat</h3>
                <p className="text-sm text-gray-500">Penanganan laporan real-time oleh tim profesional di lapangan.</p>
              </div>
              <div className="bg-white p-6 rounded-2xl border border-gray-100 shadow-sm hover:shadow-md transition-shadow">
                <div className="h-12 w-12 bg-amber-50 text-amber-600 rounded-xl flex items-center justify-center mb-4">
                  <Users className="h-6 w-6" />
                </div>
                <h3 className="font-bold text-gray-900 mb-2">Kolaborasi Warga</h3>
                <p className="text-sm text-gray-500">Melibatkan masyarakat sekitar sebagai garda terdepan perlindungan.</p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default About;
