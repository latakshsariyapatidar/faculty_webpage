// [file name]: Header.jsx
import React, { useState, useEffect } from 'react';
import { ExternalLink, Menu, X } from 'lucide-react';

function Header() {
  const [isScrolled, setIsScrolled] = useState(false);
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 10);
    };
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  return (
    <header className={`
      fixed top-0 left-0 right-0 
      bg-gradient-to-r from-purple-900 via-purple-800 to-purple-900 
      text-white shadow-xl z-50 /* Increased z-index */
      transition-all duration-300
      ${isScrolled ? 'py-1.5' : 'py-2 sm:py-2.7'}
    `}>
      <div className="max-w-8xl mx-auto px-3 sm:px-4 lg:px-6 xl:px-8">
        <div className="flex items-center justify-between">
          {/* Logo and Institute Name */}
          <div className="flex items-center gap-2 sm:gap-3 lg:gap-4">
            <div className="relative">
              <div className="absolute -inset-1 bg-gradient-to-r from-amber-400 to-purple-500 rounded-xl blur opacity-25"></div>
              <div className="relative bg-white p-1.5 sm:p-2 rounded-lg sm:rounded-xl shadow-xl">
                <img 
                  src="college-logo.png" 
                  alt="IIT Dharwad Logo" 
                  className="h-7 sm:h-9 lg:h-11 w-auto" 
                />
              </div>
            </div>

            <div className="max-w-[180px] sm:max-w-none">
              <h1 className="text-sm sm:text-lg lg:text-xl xl:text-2xl font-bold bg-gradient-to-r from-amber-300 to-yellow-300 bg-clip-text text-transparent leading-tight sm:leading-normal">
                Indian Institute of Technology Dharwad
              </h1>
              {/* Optional Hindi text - uncomment if needed
              <p className="text-purple-200 text-xs sm:text-sm hidden md:block mt-0.5">
                भारतीय प्रौद्योगिकी संस्थान धारवाड़
              </p>
              */}
            </div>
          </div>

          {/* Desktop Official Website Link */}
          <a
            href="https://www.iitdh.ac.in"
            target="_blank"
            rel="noopener noreferrer"
            className="
              hidden sm:flex 
              items-center gap-1.5 lg:gap-2 
              px-3 lg:px-4 py-1.5 lg:py-2.5 
              rounded-lg lg:rounded-xl 
              font-medium lg:font-semibold 
              hover:scale-105 transition-transform duration-200
              bg-gradient-to-r from-amber-500 to-amber-600
              shadow-lg hover:shadow-xl
            "
          >
            <span className="text-xs lg:text-sm">Official Website</span>
            <ExternalLink size={14} className="lg:size-[18px]" />
          </a>

          {/* Mobile Menu Button */}
          <button
            onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
            className="sm:hidden p-2 rounded-lg bg-white/10 hover:bg-white/20 transition"
            aria-label="Toggle menu"
          >
            {isMobileMenuOpen ? <X size={20} /> : <Menu size={20} />}
          </button>
        </div>
        

        {/* Mobile Menu Dropdown */}
        {isMobileMenuOpen && (
          <div className="sm:hidden mt-3 pb-3 border-t border-purple-700/50 pt-3">
            <a
              href="https://www.iitdh.ac.in"
              target="_blank"
              rel="noopener noreferrer"
              className="
                flex items-center justify-center gap-2 
                w-full px-4 py-3 
                rounded-xl 
                font-semibold 
                bg-gradient-to-r from-amber-500 to-amber-600
                shadow-lg hover:shadow-xl
                transition-all duration-200
              "
              onClick={() => setIsMobileMenuOpen(false)}
            >
              <span>Visit Official Website</span>
              <ExternalLink size={16} />
            </a>
            
            {/* Optional: Add mobile navigation links here if needed */}
            <div className="mt-3 pt-3 border-t border-purple-700/30">
              <p className="text-xs text-purple-300 text-center">
                Faculty Profile Portal
              </p>
            </div>
          </div>
        )}
      </div>
    </header>
  );
}

export default Header;