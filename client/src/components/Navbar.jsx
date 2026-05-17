import { useState, useEffect } from 'react';
import { Link, useLocation } from 'react-router-dom';
import { Phone, Menu, X } from 'lucide-react';
import ThemeToggle from './ThemeToggle';

const Navbar = () => {
  const location = useLocation();
  const isHome = location.pathname === '/';
  const [scrolled, setScrolled] = useState(false);
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);

  useEffect(() => {
    const handleScroll = () => setScrolled(window.scrollY > 20);
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const navClasses = isHome && !scrolled
    ? 'top-0 w-full bg-transparent text-white px-0'
    : 'top-4 mx-4 lg:mx-auto max-w-5xl rounded-3xl bg-white/90 dark:bg-gray-900/90 backdrop-blur-md shadow-lg shadow-gray-200/50 dark:shadow-none border border-white/50 dark:border-gray-800 text-gray-800 dark:text-white px-2';

  const textClasses = isHome && !scrolled ? 'text-white' : 'text-gray-700 dark:text-gray-300 hover:text-forest-900 dark:hover:text-forest-400';

  const navLinks = [
    { name: 'Beranda', path: '/' },
    { name: 'Edukasi Satwa', path: '/edukasi' },
    { name: 'Tentang Kami', path: '/about' },
  ];

  const handleCloseMenu = () => setIsMobileMenuOpen(false);

  return (
    <nav className={`fixed z-50 transition-all duration-300 ${navClasses} ${isHome && !scrolled ? 'left-0 right-0' : 'left-0 right-0'}`}>
      <div className={`mx-auto ${isHome && !scrolled ? 'max-w-7xl px-6 lg:px-8' : 'px-4 lg:px-6'}`}>
        <div className={`flex justify-between items-center transition-all duration-300 ${isHome && !scrolled ? 'h-20' : 'h-16'}`}>
          
          {/* Logo Section */}
          <Link to="/" onClick={handleCloseMenu} className="flex items-center space-x-2 group">
            <div className={`size-10 md:size-12 rounded-xl transition-all duration-300 ${isHome && !scrolled ? 'bg-white/20 group-hover:bg-white/30' : 'bg-forest-100 dark:bg-forest-900 group-hover:bg-forest-200 dark:group-hover:bg-forest-800'}`}>
              <img 
                src="/icons-bhuwana.svg" 
                alt="Bhuwana Guard" 
                className={`h-10 w-10 md:h-12 md:w-12 object-contain transition-all duration-300 dark:brightness-0 dark:invert ${isHome && !scrolled ? 'brightness-0 invert' : ''}`} 
              />
            </div>
            <span className="font-bold text-xl md:text-2xl tracking-tight font-sans">
              Bhuwana<span className={isHome && !scrolled ? 'text-white/80' : 'text-forest-600 dark:text-forest-400'}>Guard</span>
            </span>
          </Link>
          
          {/* Navigation Links - Desktop */}
          <div className="hidden md:flex space-x-2 items-center">
            {navLinks.map((link) => (
              <Link 
                key={link.name} 
                to={link.path} 
                className={`relative px-3 py-2 text-sm font-semibold transition-colors group ${textClasses}`}
              >
                {link.name}
                <span className={`absolute inset-x-3 bottom-0 h-0.5 transform scale-x-0 transition-transform origin-left duration-300 group-hover:scale-x-100 ${isHome && !scrolled ? 'bg-white' : 'bg-forest-600 dark:bg-forest-400'}`}></span>
              </Link>
            ))}
          </div>

          {/* Action Buttons - Desktop */}
          <div className="hidden md:flex items-center space-x-3">
            <ThemeToggle />
            <a 
              href="#contact"
              onClick={(e) => {
                if (location.pathname !== '/') {
                  // standard routing
                } else {
                  e.preventDefault();
                  document.getElementById('contact')?.scrollIntoView({ behavior: 'smooth' });
                }
              }}
              className={`flex items-center px-5 py-2 text-sm font-semibold rounded-full shadow-md transform transition-all hover:-translate-y-0.5 ${
                isHome && !scrolled 
                  ? 'bg-white text-forest-900 hover:bg-forest-50 shadow-white/20' 
                  : 'bg-forest-900 dark:bg-forest-600 text-white hover:bg-forest-800 dark:hover:bg-forest-500 shadow-forest-900/20'
              }`}
            >
              <Phone className="w-4 h-4 mr-2" />
              Contact
            </a>
            <Link 
              to="/login" 
              className={`px-5 py-2 text-sm font-semibold rounded-full shadow-md transform transition-all hover:-translate-y-0.5 ${
                isHome && !scrolled 
                  ? 'bg-white text-forest-900 hover:bg-forest-50 shadow-white/20' 
                  : 'bg-forest-900 dark:bg-forest-600 text-white hover:bg-forest-800 dark:hover:bg-forest-500 shadow-forest-900/20'
              }`}
            >
              Log In
            </Link>
          </div>

          {/* Mobile Menu Button */}
          <div className="md:hidden flex items-center space-x-2">
            <ThemeToggle className="mr-1" />
            <button
              onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
              className={`p-2 rounded-lg transition-colors ${
                isHome && !scrolled
                  ? 'text-white hover:bg-white/20'
                  : 'text-gray-700 dark:text-gray-300 hover:bg-gray-100 dark:hover:bg-gray-800'
              }`}
            >
              {isMobileMenuOpen ? (
                <X className="w-6 h-6" />
              ) : (
                <Menu className="w-6 h-6" />
              )}
            </button>
          </div>

        </div>

        {/* Mobile Menu Dropdown */}
        <div 
          className={`md:hidden overflow-hidden transition-all duration-300 ease-in-out bg-white dark:bg-gray-900 rounded-b-3xl ${
            isMobileMenuOpen && (isHome && !scrolled) ? 'px-4 pb-4 mt-2' : ''
          } ${
            isMobileMenuOpen ? 'max-h-96 opacity-100 pb-4' : 'max-h-0 opacity-0'
          }`}
        >
          <div className={`flex flex-col space-y-3 pt-4 border-t ${isHome && !scrolled ? 'border-gray-200 dark:border-gray-700' : 'border-gray-200 dark:border-gray-700'}`}>
            {navLinks.map((link) => (
              <Link
                key={link.name}
                to={link.path}
                onClick={handleCloseMenu}
                className={`px-4 py-2 text-base font-semibold rounded-lg transition-colors ${
                  isHome && !scrolled
                    ? 'text-gray-800 dark:text-white hover:bg-gray-100 dark:hover:bg-gray-800'
                    : 'text-gray-800 dark:text-white hover:bg-forest-50 dark:hover:bg-gray-800'
                }`}
              >
                {link.name}
              </Link>
            ))}
            
            <div className="pt-2 flex flex-col space-y-3 px-4">
              <a
                href="#contact"
                onClick={(e) => {
                  handleCloseMenu();
                  if (location.pathname === '/') {
                    e.preventDefault();
                    document.getElementById('contact')?.scrollIntoView({ behavior: 'smooth' });
                  }
                }}
                className={`flex items-center justify-center w-full px-5 py-3 text-sm font-semibold rounded-full shadow-sm transition-all bg-forest-50 dark:bg-gray-800 text-forest-900 dark:text-white hover:bg-forest-100 dark:hover:bg-gray-700`}
              >
                <Phone className="w-4 h-4 mr-2" />
                Contact
              </a>
              <Link
                to="/login"
                onClick={handleCloseMenu}
                className={`flex items-center justify-center w-full px-5 py-3 text-sm font-semibold rounded-full shadow-md transition-all bg-forest-900 dark:bg-forest-600 text-white hover:bg-forest-800 dark:hover:bg-forest-500`}
              >
                Log In
              </Link>
            </div>
          </div>
        </div>
      </div>
    </nav>
  );
};

export default Navbar;
