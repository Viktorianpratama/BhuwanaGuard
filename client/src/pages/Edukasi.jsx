import { BookOpen, Video, FileText } from 'lucide-react';

const Edukasi = () => {
  return (
    <div className="py-20 bg-gray-50 min-h-screen">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 pt-16">
        <div className="text-center mb-16">
          <h1 className="text-4xl md:text-5xl font-bold text-gray-900 mb-4">Edukasi Satwa & Konservasi</h1>
          <p className="text-xl text-gray-600 max-w-2xl mx-auto">
            Pelajari lebih lanjut tentang keanekaragaman hayati Indonesia dan bagaimana Anda dapat berkontribusi dalam melindunginya.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          {[
            { title: 'Panduan Relawan', desc: 'Cara aman dan efektif melakukan patroli hutan.', icon: BookOpen },
            { title: 'Ensiklopedia Satwa', desc: 'Kenali satwa langka dan dilindungi di Indonesia.', icon: FileText },
            { title: 'Webinar Konservasi', desc: 'Rekaman sesi edukasi dari para ahli lingkungan.', icon: Video },
          ].map((item, idx) => (
            <div key={idx} className="bg-white p-8 rounded-2xl shadow-sm border border-gray-100 hover:shadow-md transition-shadow cursor-pointer">
              <div className="inline-flex items-center justify-center p-4 bg-forest-50 text-forest-700 rounded-xl mb-6">
                <item.icon className="h-8 w-8" />
              </div>
              <h3 className="text-2xl font-bold text-gray-900 mb-3">{item.title}</h3>
              <p className="text-gray-600 mb-6">{item.desc}</p>
              <span className="text-forest-600 font-medium flex items-center hover:text-forest-800">
                Mulai Belajar <span className="ml-2">→</span>
              </span>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default Edukasi;
