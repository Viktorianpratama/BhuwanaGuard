import { useEffect, useState } from 'react';
import { Moon, Sun } from 'lucide-react';

const ThemeToggle = ({ className = '' }) => {
  // 1. Initialize state lazily during the first render, avoiding double renders
  const [isDark, setIsDark] = useState(() => {
    if (typeof window !== 'undefined') {
      const savedTheme = localStorage.getItem('theme');
      const prefersDark = window.matchMedia('(prefers-color-scheme: dark)').matches;
      return savedTheme === 'dark' || (!savedTheme && prefersDark);
    }
    return false;
  });

  // 2. Use the effect ONLY to sync the external system (the DOM class) when isDark changes
  useEffect(() => {
    if (isDark) {
      document.documentElement.classList.add('dark');
    } else {
      document.documentElement.classList.remove('dark');
    }
  }, [isDark]);

  const toggleTheme = () => {
    const newTheme = !isDark;
    setIsDark(newTheme);
    localStorage.setItem('theme', newTheme ? 'dark' : 'light');
  };

  return (
    <button
      onClick={toggleTheme}
      className={`p-2 rounded-lg transition-colors duration-200 flex items-center justify-center
        ${isDark ? 'bg-gray-800 text-yellow-400 hover:bg-gray-700' : 'bg-forest-100 text-forest-700 hover:bg-forest-200'}
        ${className}
      `}
      aria-label="Toggle Dark Mode"
    >
      {isDark ? <Sun className="w-5 h-5" /> : <Moon className="w-5 h-5" />}
    </button>
  );
};

export default ThemeToggle;
