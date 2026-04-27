import { useState, useEffect } from 'react';
import { Link, useLocation } from 'react-router-dom';

const Navbar = () => {
  const location = useLocation();
  const isHome = location.pathname === '/';
  const [scrolled, setScrolled] = useState(false);

  useEffect(() => {
    const handleScroll = () => setScrolled(window.scrollY > 20);
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const navClasses = isHome
    ? scrolled
      ? 'top-4 mx-4 lg:mx-auto max-w-5xl rounded-full bg-white/90 backdrop-blur-md shadow-lg shadow-gray-200/50 border border-white/50 text-gray-800 px-2'
      : 'top-0 w-full bg-transparent text-white px-0'
    : 'top-4 mx-4 lg:mx-auto max-w-5xl rounded-full bg-white/90 backdrop-blur-md shadow-lg shadow-gray-200/50 border border-white/50 text-gray-800 sticky z-50 px-2';

  const textClasses = isHome && !scrolled ? 'text-white' : 'text-gray-700 hover:text-forest-900';

  return (
    <nav className={`fixed z-50 transition-all duration-300 ${navClasses} ${isHome && !scrolled ? 'left-0 right-0' : 'left-0 right-0'}`}>
      <div className={`mx-auto ${isHome && !scrolled ? 'max-w-7xl px-6 lg:px-8' : 'px-4 lg:px-6'}`}>
        <div className={`flex justify-between items-center transition-all duration-300 ${isHome && !scrolled ? 'h-20' : 'h-16'}`}>
          
          {/* Logo Section */}
          <Link to="/" className="flex items-center space-x-2 group">
            <div className={`size-12 rounded-xl transition-all duration-300 ${isHome && !scrolled ? 'bg-white/20 group-hover:bg-white/30' : 'bg-forest-100 group-hover:bg-forest-200'}`}>
              <img 
                src="/icons-bhuwana.svg" 
                alt="Bhuwana Guard" 
                className={`h-10 w-10 md:h-12 md:w-12 object-contain transition-all duration-300 ${isHome && !scrolled ? 'brightness-0 invert' : ''}`} 
              />
            </div>
            <span className="font-bold text-xl md:text-2xl tracking-tight font-sans">
              Bhuwana<span className={isHome && !scrolled ? 'text-white/80' : 'text-forest-600'}>Guard</span>
            </span>
          </Link>
          
          {/* Navigation Links */}
          <div className="hidden md:flex space-x-2 items-center">
            {[
              { name: 'Beranda', path: '/' },
              { name: 'Edukasi Satwa', path: '/edukasi' },
              { name: 'Tentang Kami', path: '/about' },
            ].map((link) => (
              <Link 
                key={link.name} 
                to={link.path} 
                className={`relative px-3 py-2 text-sm font-semibold transition-colors group ${textClasses}`}
              >
                {link.name}
                <span className={`absolute inset-x-3 bottom-0 h-0.5 transform scale-x-0 transition-transform origin-left duration-300 group-hover:scale-x-100 ${isHome && !scrolled ? 'bg-white' : 'bg-forest-600'}`}></span>
              </Link>
            ))}
          </div>

          {/* Action Buttons */}
          <div className="hidden md:flex items-center space-x-4">
            <Link to="/login" className={`font-semibold text-sm transition-colors ${textClasses}`}>
              Masuk
            </Link>
            <a 
              href="#contact"
              onClick={(e) => {
                if (location.pathname !== '/') {
                  // If not home, maybe navigate home first then scroll? Or just rely on standard routing if possible
                } else {
                  e.preventDefault();
                  document.getElementById('contact')?.scrollIntoView({ behavior: 'smooth' });
                }
              }}
              className={`px-6 py-2 text-sm font-semibold rounded-full shadow-lg transform transition-all hover:-translate-y-0.5 ${
                isHome && !scrolled 
                  ? 'bg-white text-forest-900 hover:bg-forest-50 shadow-white/20' 
                  : 'bg-forest-900 text-white hover:bg-forest-800 shadow-forest-900/20'
              }`}
            >
              Contact
            </a>
          </div>

        </div>
      </div>
    </nav>
  );
};

export default Navbar;
