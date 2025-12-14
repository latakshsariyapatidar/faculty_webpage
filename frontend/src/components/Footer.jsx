/**
 * Footer Component
 * 
 * Displays site footer with quick links, contact information,
 * and copyright notice.
 * 
 * @module components/Footer
 */

import React from 'react';

/**
 * Footer component
 * 
 * @param {Object} props
 * @param {Function} props.setActiveTab - Function to change active tab
 * @returns {JSX.Element}
 */
// Footer.jsx
function Footer({ setActiveTab }) {
  const handleNavigation = (tab) => {
    setActiveTab(tab);
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  return (
    <footer className="relative bg-gradient-to-br from-purple-900 via-purple-800 to-purple-900 text-white mt-auto overflow-hidden">
      {/* Decorative background */}
      <div className="absolute inset-0 opacity-10">
        <div className="absolute top-0 left-0 w-96 h-96 bg-amber-500 rounded-full blur-3xl"></div>
        <div className="absolute bottom-0 right-0 w-96 h-96 bg-purple-600 rounded-full blur-3xl"></div>
      </div>
      
      <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8 mb-8">
          {/* About */}
          <div className="space-y-4">
            <h3 className="text-xl font-bold text-transparent bg-clip-text bg-gradient-to-r from-amber-300 to-amber-500 pb-2">
              IIT Dharwad
            </h3>
            <div className="h-1 w-16 bg-gradient-to-r from-amber-400 to-transparent rounded-full mb-3"></div>
            <p className="text-purple-100 leading-relaxed text-sm">
              Indian Institute of Technology Dharwad
            </p>
          </div>
          
          {/* Quick Links */}
          <div className="space-y-4">
            <h3 className="text-xl font-bold text-transparent bg-clip-text bg-gradient-to-r from-amber-300 to-amber-500 pb-2">
              Quick Links
            </h3>
            <div className="h-1 w-16 bg-gradient-to-r from-amber-400 to-transparent rounded-full mb-3"></div>
            <div className="space-y-2 flex flex-col">
              <a href="https://www.iitdh.ac.in" target="_blank" rel="noopener noreferrer" className="group flex items-center gap-2 text-purple-100 hover:text-amber-300 transition-all text-sm font-medium duration-300">
                <span className="w-0 group-hover:w-2 h-0.5 bg-amber-400 transition-all duration-300"></span>
                <span className="group-hover:translate-x-1 transition-transform duration-300">IIT Dharwad Website</span>
              </a>
              <button onClick={() => handleNavigation('students')} className="group flex items-center gap-2 text-left text-purple-100 hover:text-amber-300 transition-all text-sm font-medium duration-300">
                <span className="w-0 group-hover:w-2 h-0.5 bg-amber-400 transition-all duration-300"></span>
                <span className="group-hover:translate-x-1 transition-transform duration-300">Students</span>
              </button>
              <button onClick={() => handleNavigation('research')} className="group flex items-center gap-2 text-left text-purple-100 hover:text-amber-300 transition-all text-sm font-medium duration-300">
                <span className="w-0 group-hover:w-2 h-0.5 bg-amber-400 transition-all duration-300"></span>
                <span className="group-hover:translate-x-1 transition-transform duration-300">Research</span>
              </button>
            </div>
          </div>
          
          {/* Contact */}
          <div className="space-y-4">
            <h3 className="text-xl font-bold text-transparent bg-clip-text bg-gradient-to-r from-amber-300 to-amber-500 pb-2">
              Contact
            </h3>
            <div className="h-1 w-16 bg-gradient-to-r from-amber-400 to-transparent rounded-full mb-3"></div>
            <div className="space-y-3 text-sm text-purple-100">
              <p className="font-medium leading-relaxed">IIT Dharwad, Karnataka, India</p>
              <a href="mailto:pro@iitdh.ac.in" className="inline-block px-4 py-2 bg-amber-500 hover:bg-amber-400 text-white font-semibold rounded-lg transition-all duration-300 shadow-md hover:shadow-lg transform hover:-translate-y-0.5">
                pro@iitdh.ac.in
              </a>
            </div>
          </div>
        </div>
        
        {/* Bottom */}
        <div className="border-t border-purple-700/50 pt-8 mt-8">
          <p className="text-center text-purple-200 text-sm font-medium">
            © 2025 IIT Dharwad. All rights reserved.
          </p>
        </div>
      </div>
    </footer>
  );
}
export default Footer;