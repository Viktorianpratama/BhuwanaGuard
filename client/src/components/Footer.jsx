import { Mail, Phone, MapPin } from 'lucide-react';
import { Link } from 'react-router-dom';

const InstagramIcon = ({ className }) => (
  <svg className={className} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
    <rect x="2" y="2" width="20" height="20" rx="5" ry="5"></rect>
    <path d="M16 11.37A4 4 0 1 1 12.63 8 4 4 0 0 1 16 11.37z"></path>
    <line x1="17.5" y1="6.5" x2="17.51" y2="6.5"></line>
  </svg>
);

const TwitterIcon = ({ className }) => (
  <svg className={className} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
    <path d="M22 4s-.7 2.1-2 3.4c1.6 10-9.4 17.3-18 11.6 2.2.1 4.4-.6 6-2C3 15.5.5 9.6 3 5c2.2 2.6 5.6 4.1 9 4-.9-4.2 4-6.6 7-3.8 1.1 0 3-1.2 3-1.2z"></path>
  </svg>
);

const FacebookIcon = ({ className }) => (
  <svg className={className} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
    <path d="M18 2h-3a5 5 0 0 0-5 5v3H7v4h3v8h4v-8h3l1-4h-4V7a1 1 0 0 1 1-1h3z"></path>
  </svg>
);

const Footer = () => {
  return (
    <footer id="contact" className="bg-[#042f24] text-forest-100 py-16 border-t border-forest-800/50 relative overflow-hidden">
      {/* Background decoration */}
      <div className="absolute top-0 left-0 w-full h-full overflow-hidden opacity-10 pointer-events-none">
        <div className="absolute -top-24 -right-24 w-96 h-96 bg-forest-500 rounded-full blur-3xl"></div>
        <div className="absolute bottom-0 left-10 w-72 h-72 bg-forest-400 rounded-full blur-3xl"></div>
      </div>

      <div className="max-w-7xl mx-auto px-6 lg:px-8 relative z-10">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-12 lg:gap-8">
          
          {/* Brand Column */}
          <div className="space-y-6">
            <div className="flex items-center space-x-2">
              <div className="p-2 bg-white/10 rounded-xl backdrop-blur-sm">
                <img 
                  src="/icons-bhuwana.svg" 
                  alt="Bhuwana Guard" 
                  className="h-13 w-13 object-contain brightness-0 invert" 
                />
              </div>
              <span className="font-bold text-2xl tracking-tight text-white">
                Bhuwana<span className="text-forest-400">Guard</span>
              </span>
            </div>
            <p className="text-forest-200/80 leading-relaxed text-sm">
              Platform kolaboratif untuk pelestarian hutan dan satwa liar Indonesia. Bersama kita jaga ekosistem untuk masa depan.
            </p>
            <div className="flex space-x-4 pt-2">
              <a href="#" className="p-2.5 bg-white/5 rounded-lg hover:bg-white/20 transition-all hover:-translate-y-1 text-white">
                <InstagramIcon className="w-5 h-5" />
              </a>
              <a href="#" className="p-2.5 bg-white/5 rounded-lg hover:bg-white/20 transition-all hover:-translate-y-1 text-white">
                <TwitterIcon className="w-5 h-5" />
              </a>
              <a href="#" className="p-2.5 bg-white/5 rounded-lg hover:bg-white/20 transition-all hover:-translate-y-1 text-white">
                <FacebookIcon className="w-5 h-5" />
              </a>
            </div>
          </div>

          {/* Links Column */}
          <div>
            <h3 className="font-semibold text-white text-lg mb-6">Jelajahi</h3>
            <ul className="space-y-4">
              <li><Link to="/" className="text-forest-200/80 hover:text-white transition-colors">Beranda</Link></li>
              <li><Link to="/edukasi" className="text-forest-200/80 hover:text-white transition-colors">Edukasi Satwa</Link></li>
              <li><Link to="/peta" className="text-forest-200/80 hover:text-white transition-colors">Peta Rawan</Link></li>
              <li><Link to="/relawan" className="text-forest-200/80 hover:text-white transition-colors">Gabung Relawan</Link></li>
            </ul>
          </div>

          {/* Contact Column */}
          <div>
            <h3 className="font-semibold text-white text-lg mb-6">Hubungi Kami</h3>
            <ul className="space-y-4">
              <li className="flex items-start space-x-3 text-forest-200/80">
                <MapPin className="w-5 h-5 text-forest-400 shrink-0 mt-0.5" />
                <span>Jl. Konservasi No. 12, Jakarta Pusat, 10110</span>
              </li>
              <li className="flex items-center space-x-3 text-forest-200/80">
                <Phone className="w-5 h-5 text-forest-400 shrink-0" />
                <span>+62 811 2233 4455</span>
              </li>
              <li className="flex items-center space-x-3 text-forest-200/80">
                <Mail className="w-5 h-5 text-forest-400 shrink-0" />
                <span>halo@bhuwanaguard.id</span>
              </li>
            </ul>
          </div>

          {/* Newsletter Column */}
          <div>
            <h3 className="font-semibold text-white text-lg mb-6">Berlangganan</h3>
            <p className="text-forest-200/80 text-sm mb-4">Dapatkan info terbaru seputar kegiatan konservasi kami.</p>
            <form className="space-y-3" onSubmit={(e) => e.preventDefault()}>
              <input 
                type="email" 
                placeholder="Alamat email Anda" 
                className="w-full px-4 py-3 rounded-xl bg-white/5 border border-white/10 text-white placeholder-forest-200/50 focus:outline-none focus:ring-2 focus:ring-forest-400 focus:bg-white/10 transition-all"
              />
              <button 
                type="submit" 
                className="w-full px-4 py-3 rounded-xl bg-forest-500 hover:bg-forest-400 text-white font-medium transition-colors"
              >
                Langganan
              </button>
            </form>
          </div>
        </div>

        <div className="mt-16 pt-8 border-t border-white/10 flex flex-col md:flex-row justify-between items-center gap-4 text-sm text-forest-200/60">
          <p>&copy; {new Date().getFullYear()} Bhuwana Guard. Hak Cipta Dilindungi.</p>
          <div className="flex space-x-6">
            <a href="#" className="hover:text-white transition-colors">Syarat & Ketentuan</a>
            <a href="#" className="hover:text-white transition-colors">Kebijakan Privasi</a>
          </div>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
