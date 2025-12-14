/**
 * Header Component
 * 
 * Displays the institution logo and title at the top of every page.
 * Simple and minimal design with bilingual text.
 * 
 * @module components/Header
 */

import React from 'react';

/**
 * Header component
 * 
 * Renders the site header with institution branding.
 * Includes logo and bilingual title (English and Hindi).
 * 
 * @returns {JSX.Element}
 */
// Header.jsx
function Header() {
  return (
    <header className="relative bg-gradient-to-r from-purple-900 via-purple-800 to-purple-900 text-white shadow-2xl border-b-4 border-amber-500 overflow-hidden">
      {/* Decorative background pattern */}
      <div className="absolute inset-0 opacity-10">
        <div className="absolute top-0 right-0 w-72 h-72 bg-amber-500 rounded-full blur-3xl"></div>
        <div className="absolute bottom-0 left-0 w-96 h-96 bg-purple-600 rounded-full blur-3xl"></div>
      </div>
      
      <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        <div className="flex items-center gap-6">
          {/* Logo */}
          <div className="shrink-0 bg-white p-3 rounded-2xl shadow-2xl ring-4 ring-amber-400 ring-opacity-50 transform transition-transform hover:scale-105 hover:rotate-3 duration-300">
            <img src="college-logo.png" alt="IIT Dharwad Logo" className="w-16 h-16 object-cover" />
          </div>
          
          {/* Title section */}
          <div className="flex-1">
            <h1 className="text-2xl md:text-3xl font-bold text-transparent bg-clip-text bg-gradient-to-r from-amber-300 via-amber-400 to-yellow-300 tracking-tight mb-2 drop-shadow-lg">
              Indian Institute of Technology Dharwad
            </h1>
            <p className="text-purple-100 text-sm md:text-base font-medium tracking-wide">
              भारतीय प्रौद्योगिकी संस्थान धारवाड़
            </p>
          </div>
        </div>
      </div>
    </header>
  );
}


export default Header;