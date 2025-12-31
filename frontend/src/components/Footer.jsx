// [file name]: Footer.jsx (FINAL FIXED - ALIGNED WITH SIDEBAR)
import React from 'react';
import { Mail, Phone, MapPin, ExternalLink, Building, GraduationCap } from 'lucide-react';

function Footer({ setActiveTab, facultyData = {}, isSidebarCollapsed = false, isMobile = false }) {
  const professor = facultyData?.personalInfo || {};
  
  const handleTabClick = (tab) => {
    setActiveTab(tab);
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  const facultyName = professor.name || 'Faculty Member';
  const facultyEmail = professor.email || '';
  const facultyDept = professor.department || '';
  const facultyOffice = professor.office || '';

  return (
    <footer 
      className={`
        w-full bg-gradient-to-br from-purple-900 via-gray-900 to-purple-900 
        text-white border-t border-gray-800
        transition-all duration-300
        ${isMobile 
          ? 'ml-0 pb-20' 
          : isSidebarCollapsed 
            ? 'ml-20' 
            : 'ml-64'
        }
      `}
    >
      <div className="w-full px-4 sm:px-6 lg:px-8 py-12">
        {/* Main Footer Content */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
          
          {/* Institute Information */}
          <div className="space-y-4">
            <div className="flex items-center gap-3">
              <div className="w-10 h-10 rounded-lg bg-gradient-to-br from-amber-500 to-amber-600 flex items-center justify-center flex-shrink-0">
                <Building className="w-5 h-5 text-white" />
              </div>
              <div>
                <h3 className="font-bold text-white text-lg">IIT Dharwad</h3>
                <p className="text-gray-400 text-sm">Institute of National Importance</p>
              </div>
            </div>
            
            <div className="space-y-2 text-sm text-gray-400">
              <div className="flex items-start gap-2">
                <MapPin className="w-4 h-4 text-amber-500 mt-0.5 flex-shrink-0" />
                <span>Dharwad, Karnataka 580011</span>
              </div>
            </div>
          </div>

          {/* Faculty Quick Access */}
          <div className="space-y-4">
            <div className="flex items-center gap-2">
              <GraduationCap className="w-5 h-5 text-amber-500" />
              <h4 className="font-bold text-white">Faculty Access</h4>
            </div>
            
            <div className="space-y-2">
              <button
                onClick={() => handleTabClick('biography')}
                className="block w-full text-left text-gray-400 hover:text-white transition-colors text-sm py-1"
              >
                Biography & Experience
              </button>
              
              <button
                onClick={() => handleTabClick('research')}
                className="block w-full text-left text-gray-400 hover:text-white transition-colors text-sm py-1"
              >
                Research Areas
              </button>
              
              <button
                onClick={() => handleTabClick('publications')}
                className="block w-full text-left text-gray-400 hover:text-white transition-colors text-sm py-1"
              >
                Publications
              </button>
              
              <button
                onClick={() => handleTabClick('students')}
                className="block w-full text-left text-gray-400 hover:text-white transition-colors text-sm py-1"
              >
                Students & Openings
              </button>
            </div>
          </div>

          {/* Faculty Contact */}
          <div className="space-y-4">
            <h4 className="font-bold text-white">Contact Faculty</h4>
            
            <div className="bg-gradient-to-br from-gray-800/50 to-gray-900/50 rounded-lg p-4 border border-gray-800">
              <div className="mb-3">
                <p className="font-medium text-white text-sm break-words">{facultyName}</p>
                {facultyDept && (
                  <p className="text-gray-400 text-xs break-words">{facultyDept}</p>
                )}
                {facultyOffice && (
                  <p className="text-gray-500 text-xs mt-1">Office: {facultyOffice}</p>
                )}
              </div>
              
              {facultyEmail && (
                <a
                  href={`mailto:${facultyEmail}`}
                  className="inline-flex items-center gap-2 px-4 py-2 bg-gradient-to-r from-amber-600 to-amber-700 hover:from-amber-700 hover:to-amber-800 text-white rounded-lg text-sm font-medium transition-all duration-200"
                >
                  <Mail className="w-4 h-4 flex-shrink-0" />
                  <span>Email Professor</span>
                </a>
              )}
            </div>
          </div>

          {/* Institute Links */}
          <div className="space-y-4">
            <h4 className="font-bold text-white">Institute Links</h4>
            
            <div className="space-y-2">
              <a
                href="https://www.iitdh.ac.in"
                target="_blank"
                rel="noopener noreferrer"
                className="flex items-center gap-2 text-gray-400 hover:text-white transition-colors text-sm"
              >
                <ExternalLink className="w-4 h-4 flex-shrink-0" />
                <span>Official Website</span>
              </a>
              
              <a
                href="https://www.iitdh.ac.in/academics"
                target="_blank"
                rel="noopener noreferrer"
                className="block text-gray-400 hover:text-white transition-colors text-sm"
              >
                Academics
              </a>
              
              <a
                href="https://www.iitdh.ac.in/research"
                target="_blank"
                rel="noopener noreferrer"
                className="block text-gray-400 hover:text-white transition-colors text-sm"
              >
                Research
              </a>
              
              <a
                href="https://www.iitdh.ac.in/admissions"
                target="_blank"
                rel="noopener noreferrer"
                className="block text-gray-400 hover:text-white transition-colors text-sm"
              >
                Admissions
              </a>
            </div>
          </div>
        </div>

        {/* Divider */}
        <div className="my-8 h-px bg-gradient-to-r from-transparent via-gray-800 to-transparent"></div>

        {/* Footer Bottom */}
        <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
          <div className="text-sm text-gray-500">
            <p>© {new Date().getFullYear()} Indian Institute of Technology Dharwad</p>
            <p className="mt-1 text-gray-600 text-xs">This faculty profile is part of the official IIT Dharwad website</p>
          </div>
          
          <div className="flex items-center gap-4 text-xs text-gray-600">
            <a
              href="https://www.iitdh.ac.in/privacy"
              target="_blank"
              rel="noopener noreferrer"
              className="hover:text-amber-500 transition-colors"
            >
              Privacy Policy
            </a>
            <span>•</span>
            <a
              href="https://www.iitdh.ac.in/accessibility"
              target="_blank"
              rel="noopener noreferrer"
              className="hover:text-amber-500 transition-colors"
            >
              Accessibility
            </a>
          </div>
        </div>
      </div>
    </footer>
  );
}

export default Footer;