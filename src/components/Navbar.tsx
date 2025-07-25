import React from 'react';
import { Link, useLocation } from 'react-router-dom';
import { Zap, Home, Briefcase, Sun, Moon } from 'lucide-react';
import { useTheme } from '../hooks/useTheme';

const Navbar = () => {
  const location = useLocation();
  const { theme, toggleTheme } = useTheme();

  const isActive = (path: string) => {
    return location.pathname === path;
  };

  return (
    <nav className="fixed top-0 left-0 right-0 z-50 bg-white/80 dark:bg-black/80 backdrop-blur-md border-b border-gray-200/50 dark:border-gray-800/50">
      <div className="max-w-7xl mx-auto px-6 py-4">
        <div className="flex items-center justify-between">
          {/* Logo */}
          <Link to="/" className="flex items-center gap-3 group">
            <div className="relative">
              <Zap className="w-8 h-8 text-violet-400 group-hover:scale-110 transition-transform" />
              <div className="absolute inset-0 bg-violet-400 blur-lg opacity-30 group-hover:opacity-50 transition-opacity"></div>
            </div>
            <h1 className="text-2xl font-bold bg-gradient-to-r from-violet-400 to-green-400 bg-clip-text text-transparent">
              Veeba AI
            </h1>
          </Link>

          {/* Navigation Links */}
          <div className="flex items-center gap-6">
            <Link
              to="/"
              className={`flex items-center gap-2 px-4 py-2 rounded-lg font-medium transition-all duration-200 hover:scale-105 ${
                isActive('/') 
                  ? 'bg-gradient-to-r from-violet-500/20 to-green-500/20 text-violet-600 dark:text-violet-400' 
                  : 'text-gray-600 dark:text-gray-300 hover:text-gray-900 dark:hover:text-white'
              }`}
            >
              <Home className="w-4 h-4" />
              Home
            </Link>
            
            <Link
              to="/jobs"
              className={`flex items-center gap-2 px-4 py-2 rounded-lg font-medium transition-all duration-200 hover:scale-105 ${
                isActive('/jobs') 
                  ? 'bg-gradient-to-r from-violet-500/20 to-green-500/20 text-violet-600 dark:text-violet-400' 
                  : 'text-gray-600 dark:text-gray-300 hover:text-gray-900 dark:hover:text-white'
              }`}
            >
              <Briefcase className="w-4 h-4" />
              Careers
            </Link>

            {/* Theme Toggle */}
            <button
              onClick={toggleTheme}
              className="p-2 rounded-lg bg-gray-200/50 dark:bg-gray-800/50 hover:bg-gray-300/50 dark:hover:bg-gray-700/50 transition-colors"
              aria-label="Toggle theme"
            >
              {theme === 'dark' ? (
                <Sun className="w-5 h-5 text-yellow-500" />
              ) : (
                <Moon className="w-5 h-5 text-gray-600" />
              )}
            </button>
          </div>
        </div>
      </div>
    </nav>
  );
};

export default Navbar;