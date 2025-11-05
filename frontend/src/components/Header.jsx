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
    <header className="bg-gradient-to-r from-purple-900 via-purple-800 to-purple-900 text-white shadow-lg border-b-4 border-amber-500">
      <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        <div className="flex items-center gap-6">
          {/* Logo */}
          <div className="shrink-0 bg-white p-3 rounded-2xl shadow-xl">
            <img src="college-logo.png" alt="IIT Dharwad Logo" className="w-16 h-16 object-cover" />
          </div>
          
          {/* Title section */}
          <div className="flex-1">
            <h1 className="text-2xl md:text-3xl font-bold text-amber-400 tracking-tight mb-2">
              Indian Institute of Technology Dharwad
            </h1>
            <p className="text-purple-200 text-sm md:text-base font-medium">
              भारतीय प्रौद्योगिकी संस्थान धारवाड़
            </p>
          </div>
        </div>
      </div>
    </header>
  );
}


export default Header;