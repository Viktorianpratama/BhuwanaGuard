import { Link } from 'react-router-dom';
import * as Icons from 'lucide-react';
import { edukasiData } from '../data/edukasiData';

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
          {edukasiData.map((item) => {
            const IconComponent = Icons[item.iconName];
            return (
              <Link 
                to={`/edukasi/${item.id}`} 
                key={item.id} 
                className="bg-white p-8 rounded-2xl shadow-sm border border-gray-100 hover:shadow-lg hover:border-forest-200 transition-all cursor-pointer group flex flex-col h-full"
              >
                <div className="inline-flex items-center justify-center p-4 bg-forest-50 text-forest-700 rounded-xl mb-6 group-hover:bg-forest-600 group-hover:text-white transition-colors w-fit">
                  {IconComponent && <IconComponent className="h-8 w-8" />}
                </div>
                <h3 className="text-2xl font-bold text-gray-900 mb-3 group-hover:text-forest-700 transition-colors">{item.title}</h3>
                <p className="text-gray-600 mb-6 flex-1">{item.desc}</p>
                <span className="text-forest-600 font-bold flex items-center group-hover:text-forest-800">
                  Mulai Belajar <span className="ml-2 transform group-hover:translate-x-1 transition-transform">→</span>
                </span>
              </Link>
            );
          })}
        </div>
      </div>
    </div>
  );
};

export default Edukasi;
