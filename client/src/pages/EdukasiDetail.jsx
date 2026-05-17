import { useParams, Link, useNavigate } from 'react-router-dom';
import { ChevronLeft } from 'lucide-react';
import { edukasiData } from '../data/edukasiData';

const EdukasiDetail = () => {
  const { id } = useParams();
  const navigate = useNavigate();

  // Find the current article
  const article = edukasiData.find((item) => item.id === id);

  // If not found, show 404 or redirect
    if (!article) {
      return (
        <div className="min-h-screen flex items-center justify-center bg-gray-50 dark:bg-gray-900 transition-colors duration-300">
          <div className="text-center">
            <h2 className="text-2xl font-bold text-gray-900 dark:text-white mb-4">Artikel Tidak Ditemukan</h2>
            <button onClick={() => navigate('/edukasi')} className="text-forest-600 dark:text-forest-400 hover:text-forest-800 dark:hover:text-forest-300 font-semibold">
              Kembali ke Edukasi
            </button>
          </div>
        </div>
      );
    }

  // Get other articles for the sidebar
  const relatedArticles = edukasiData.filter((item) => item.id !== id);

  return (
    <div className="min-h-screen bg-gray-50 dark:bg-gray-900 pt-28 pb-20 transition-colors duration-300">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Back Button */}
        <button 
          onClick={() => navigate('/edukasi')}
          className="inline-flex items-center px-4 py-2 bg-forest-900 dark:bg-forest-700 hover:bg-forest-800 dark:hover:bg-forest-600 text-white text-sm font-semibold rounded-full transition-colors shadow-md mb-8"
        >
          <ChevronLeft className="h-4 w-4 mr-1" />
          Kembali
        </button>

        <div className="flex flex-col lg:flex-row gap-12">
          
          {/* Main Content (Left Column) */}
          <div className="lg:w-2/3">
            <h1 className="text-3xl md:text-4xl lg:text-5xl font-bold text-gray-900 dark:text-white mb-6 leading-tight">
              {article.title}
            </h1>
            
            <div className="flex items-center text-sm font-bold text-gray-500 dark:text-gray-400 uppercase tracking-wider mb-8">
              <span>{article.author}</span>
              <span className="mx-2">•</span>
              <span>{article.date}</span>
            </div>

            <div className="rounded-3xl overflow-hidden shadow-lg mb-10">
              <img 
                src={article.image} 
                alt={article.title} 
                className="w-full h-auto object-cover max-h-[500px]"
              />
            </div>

            <div className="prose prose-lg max-w-none text-gray-700 dark:text-gray-300 space-y-6">
              {article.content.map((paragraph, idx) => (
                <p key={idx} className="leading-relaxed text-lg">
                  {paragraph}
                </p>
              ))}
            </div>
          </div>

          {/* Sidebar / Related Articles (Right Column) */}
          <div className="lg:w-1/3">
            <div className="sticky top-28">
              <h3 className="text-xl font-bold text-gray-900 dark:text-white mb-6 border-b-2 border-forest-100 dark:border-gray-700 pb-2 inline-block">
                Artikel Lainnya
              </h3>
              
              <div className="space-y-6">
                {relatedArticles.map((related) => (
                  <Link 
                    to={`/edukasi/${related.id}`} 
                    key={related.id}
                    className="group flex gap-4 bg-white dark:bg-gray-800 p-3 rounded-2xl border border-gray-100 dark:border-gray-700 shadow-sm hover:shadow-md transition-all hover:border-forest-200 dark:hover:border-forest-500"
                  >
                    <div className="w-1/3 shrink-0">
                      <img 
                        src={related.image} 
                        alt={related.title}
                        className="w-full h-24 object-cover rounded-xl"
                      />
                    </div>
                    <div className="w-2/3 flex flex-col justify-center">
                      <h4 className="font-bold text-gray-900 dark:text-white mb-2 group-hover:text-forest-700 dark:group-hover:text-forest-400 transition-colors line-clamp-2">
                        {related.title}
                      </h4>
                      <p className="text-xs font-bold text-gray-400 dark:text-gray-500 uppercase">
                        {related.author} • {related.date}
                      </p>
                    </div>
                  </Link>
                ))}
              </div>
            </div>
          </div>

        </div>
      </div>
    </div>
  );
};

export default EdukasiDetail;
