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
    <footer className="bg-gradient-to-br from-purple-900 via-purple-800 to-purple-900 text-white mt-auto">
      <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8 mb-8">
          {/* About */}
          <div className="space-y-4">
            <h3 className="text-xl font-bold text-amber-400 border-b-2 border-amber-500 pb-2 inline-block">
              IIT Dharwad
            </h3>
            <p className="text-purple-200 leading-relaxed text-sm">
              Indian Institute of Technology Dharwad
            </p>
          </div>
          
          {/* Quick Links */}
          <div className="space-y-4">
            <h3 className="text-xl font-bold text-amber-400 border-b-2 border-amber-500 pb-2 inline-block">
              Quick Links
            </h3>
            <div className="space-y-2 flex flex-col">
              <a href="https://www.iitdh.ac.in" target="_blank" rel="noopener noreferrer" className="text-purple-200 hover:text-amber-400 transition-all text-sm font-medium hover:translate-x-1 inline-block duration-300">
                IIT Dharwad Website
              </a>
              <button onClick={() => handleNavigation('students')} className="block text-left text-purple-200 hover:text-amber-400 transition-all text-sm font-medium hover:translate-x-1 duration-300">
                Students
              </button>
              <button onClick={() => handleNavigation('research')} className="block text-left text-purple-200 hover:text-amber-400 transition-all text-sm font-medium hover:translate-x-1 duration-300">
                Research
              </button>
            </div>
          </div>
          
          {/* Contact */}
          <div className="space-y-4">
            <h3 className="text-xl font-bold text-amber-400 border-b-2 border-amber-500 pb-2 inline-block">
              Contact
            </h3>
            <div className="space-y-2 text-sm text-purple-200">
              <p className="font-medium">IIT Dharwad, Karnataka, India</p>
              <p className="text-amber-300 font-semibold">pro@iitdh.ac.in</p>
            </div>
          </div>
        </div>
        
        {/* Bottom */}
        <div className="border-t border-purple-700 pt-8">
          <p className="text-center text-purple-300 text-sm font-medium">
            © 2025 IIT Dharwad. All rights reserved.
          </p>
        </div>
      </div>
    </footer>
  );
}
export default Footer;