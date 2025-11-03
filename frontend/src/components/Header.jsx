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
function Header() {
  return (
    <header className="bg-white border-b-2 border-gray-200">
      <div className="max-w-6xl mx-auto px-6 py-6">
        <div className="flex items-center gap-5">
          {/* Logo */}
          <div className="w-16 h-16 bg-gray-50 rounded-lg p-2 border border-gray-200">
            <img 
              src="college-logo.png" 
              alt="IIT Dharwad"
              className="w-full h-full object-contain"
            />
          </div>
          
          {/* Title section */}
          <div>
            <h1 className="text-2xl font-semibold text-gray-900">
              Indian Institute of Technology Dharwad
            </h1>
            <p className="text-sm text-gray-600 mt-1">
              भारतीय प्रौद्योगिकी संस्थान धारवाड़
            </p>
          </div>
        </div>
      </div>
    </header>
  );
}

export default Header;