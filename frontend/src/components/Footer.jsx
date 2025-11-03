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
function Footer({ setActiveTab }) {
  /**
   * Handle navigation and scroll to top
   * @param {string} tab - Tab ID to navigate to
   */
  const handleNavigation = (tab) => {
    setActiveTab(tab);
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  return (
    <footer className="bg-white border-t border-gray-200 mt-auto">
      <div className="max-w-6xl mx-auto px-6 py-8">
        <div className="grid md:grid-cols-3 gap-8 mb-6">
          {/* About */}
          <div>
            <h3 className="text-sm font-semibold text-gray-900 mb-3">IIT Dharwad</h3>
            <p className="text-sm text-gray-600 leading-relaxed">
              Indian Institute of Technology Dharwad
            </p>
          </div>
          
          {/* Quick Links */}
          <div>
            <h3 className="text-sm font-semibold text-gray-900 mb-3">Quick Links</h3>
            <div className="space-y-2 text-sm">
              <a href="https://www.iitdh.ac.in" target="_blank" rel="noopener noreferrer" className="block text-gray-600 hover:text-primary transition-colors">
                IIT Dharwad Website
              </a>
              <button onClick={() => handleNavigation('students')} className="block text-left text-gray-600 hover:text-primary transition-colors">
                Students
              </button>
              <button onClick={() => handleNavigation('research')} className="block text-left text-gray-600 hover:text-primary transition-colors">
                Research
              </button>
            </div>
          </div>
          
          {/* Contact */}
          <div>
            <h3 className="text-sm font-semibold text-gray-900 mb-3">Contact</h3>
            <div className="space-y-2 text-sm text-gray-600">
              <p>IIT Dharwad, Karnataka, India</p>
              <p><a href="mailto:pro@iitdh.ac.in" className="hover:text-primary transition-colors">pro@iitdh.ac.in</a></p>
            </div>
          </div>
        </div>
        
        {/* Bottom */}
        <div className="pt-6 border-t border-gray-200">
          <p className="text-sm text-gray-500 text-center">
            © 2025 IIT Dharwad. All rights reserved.
          </p>
        </div>
      </div>
    </footer>
  );
}

export default Footer;