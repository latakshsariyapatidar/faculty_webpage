/**
 * Home Page Component
 * 
 * Displays faculty member's profile information, contact details,
 * about section, research positions, and academic profile links.
 * 
 * @module pages/HomePage
 */

import React from 'react';
import { Mail, Phone, MapPin, ExternalLink } from 'lucide-react';

/**
 * Home page component
 * 
 * @param {Object} props
 * @param {Object} props.data - Complete faculty data object
 * @param {Object} props.data.personalInfo - Personal information
 * @param {Object} props.data.about - About section data
 * @returns {JSX.Element}
 */
function HomePage({ data }) {
  const { personalInfo, about } = data;

  return (
    <div className="space-y-8">
      {/* Profile Section */}
      <div className="glass-effect rounded-3xl border border-purple-200/50 card-shadow hover:card-shadow-hover transition-all duration-500 p-8 transform hover:scale-[1.01]">
        <div className="flex flex-col md:flex-row gap-8">
          {/* Profile Image */}
          <div className="shrink-0 relative group">
            <div className="absolute inset-0 bg-gradient-to-br from-purple-400 to-amber-400 rounded-3xl blur-xl opacity-40 group-hover:opacity-60 transition-opacity duration-500 animate-pulse-glow"></div>
            <img 
              src={personalInfo.profileImage} 
              alt={personalInfo.name} 
              className="relative w-48 h-48 rounded-3xl object-cover border-4 border-white shadow-2xl ring-4 ring-purple-400 ring-opacity-30 transform transition-transform duration-500 group-hover:scale-105 group-hover:rotate-2"
            />
          </div>

          {/* Profile Info */}
          <div className="flex-1">
            <h1 className="text-4xl font-bold text-purple-900 mb-2">
              {personalInfo.name}
            </h1>
            <p className="text-xl text-amber-600 font-bold mb-2">
              {personalInfo.designation}
            </p>
            <p className="text-gray-600 font-medium mb-6 text-lg">
              {personalInfo.department}
            </p>
            
            {/* Contact Information */}
            <div className="space-y-3 mb-6">
              <a 
                href={`mailto:${personalInfo.email}`}
                className="flex items-center gap-3 text-gray-700 hover:text-purple-700 transition-all duration-300 bg-gradient-to-r from-purple-50 to-purple-100 px-5 py-3 rounded-xl border border-purple-200 hover:border-purple-400 shadow-sm hover:shadow-md transform hover:-translate-y-0.5 group"
              >
                <div className="p-2 bg-purple-500 rounded-lg shadow-md group-hover:bg-purple-600 transition-colors">
                  <Mail size={18} className="text-white" />
                </div>
                <span className="text-sm font-medium">{personalInfo.email}</span>
              </a>
              
              <div className="flex items-center gap-3 text-gray-700 bg-gradient-to-r from-amber-50 to-amber-100 px-5 py-3 rounded-xl border border-amber-200 shadow-sm group">
                <div className="p-2 bg-amber-500 rounded-lg shadow-md">
                  <Phone size={18} className="text-white" />
                </div>
                <span className="text-sm font-medium">{personalInfo.phone}</span>
              </div>
              
              <div className="flex items-center gap-3 text-gray-700 bg-gradient-to-r from-gray-50 to-purple-50 px-5 py-3 rounded-xl border border-gray-300 shadow-sm group">
                <div className="p-2 bg-purple-600 rounded-lg shadow-md">
                  <MapPin size={18} className="text-white" />
                </div>
                <span className="text-sm font-medium">{personalInfo.office}</span>
              </div>
            </div>

            {/* Address */}
            <div className="relative overflow-hidden bg-gradient-to-br from-purple-50 via-purple-100 to-amber-50 p-5 rounded-xl border-2 border-purple-300 shadow-md">
              <div className="absolute top-0 right-0 w-24 h-24 bg-amber-300 rounded-full blur-2xl opacity-20"></div>
              <p className="relative text-sm text-gray-700 font-medium leading-relaxed">{personalInfo.address}</p>
            </div>
          </div>
        </div>
      </div>

      {/* About Me */}
      <section>
        <div className="flex items-center gap-3 mb-6">
          <div className="h-1 w-12 bg-gradient-to-r from-purple-600 to-amber-400 rounded-full"></div>
          <h2 className="text-3xl font-bold bg-gradient-to-r from-purple-900 to-purple-700 bg-clip-text text-transparent">About</h2>
          <div className="h-1 flex-1 bg-gradient-to-r from-amber-400 to-transparent rounded-full"></div>
        </div>
        <div className="glass-effect rounded-3xl border border-purple-200/50 card-shadow p-8 hover:card-shadow-hover transition-all duration-500">
          <p className="text-gray-700 leading-relaxed text-lg">{about.bio}</p>
        </div>
      </section>

      {/* Research Positions */}
      <section>
        <div className="flex items-center gap-3 mb-6">
          <div className="h-1 w-12 bg-gradient-to-r from-purple-600 to-amber-400 rounded-full"></div>
          <h2 className="text-3xl font-bold bg-gradient-to-r from-purple-900 to-purple-700 bg-clip-text text-transparent">Current Research Positions</h2>
          <div className="h-1 flex-1 bg-gradient-to-r from-amber-400 to-transparent rounded-full"></div>
        </div>
        <div className="glass-effect rounded-3xl border border-purple-200/50 card-shadow p-8">
          <ul className="space-y-4">
            {about.researchPositions.map((pos, i) => (
              <li key={i} className="relative overflow-hidden bg-gradient-to-br from-purple-50 via-white to-amber-50 p-6 rounded-2xl border-2 border-purple-200 hover:border-amber-400 transition-all duration-300 shadow-md hover:shadow-xl transform hover:-translate-y-1 group">
                <div className="absolute top-0 right-0 w-32 h-32 bg-gradient-to-br from-amber-300 to-purple-300 rounded-full blur-3xl opacity-20 group-hover:opacity-30 transition-opacity"></div>
                <div className="relative flex gap-4 items-start">
                  <div className="flex-shrink-0 w-8 h-8 rounded-full bg-gradient-to-br from-amber-400 to-amber-600 flex items-center justify-center shadow-lg">
                    <span className="text-white font-bold text-sm">{i + 1}</span>
                  </div>
                  <div className="flex-1">
                    <span className="text-gray-800 font-semibold leading-relaxed">
                      {typeof pos === 'object' ? pos.position : pos}
                    </span>
                    
                    {/* Application Link or Email Template */}
                    {(typeof pos === 'object' && (pos.application_link || pos.email_template)) && (
                      <div className="mt-3">
                        {pos.application_link ? (
                          <a
                            href={pos.application_link}
                            target="_blank"
                            rel="noopener noreferrer"
                            className="inline-block px-5 py-2.5 bg-gradient-to-r from-purple-600 to-purple-700 text-white text-sm font-bold rounded-lg hover:from-purple-700 hover:to-purple-800 transition-all duration-200 shadow-md hover:shadow-lg"
                          >
                            Apply Now →
                          </a>
                        ) : pos.email_template ? (
                          <p className="text-sm text-gray-700 italic mt-2 bg-amber-100 p-4 rounded-lg border-l-4 border-amber-500 shadow-sm">
                            📧 {pos.email_template.replace('{faculty_email}', personalInfo.email)}
                          </p>
                        ) : null}
                      </div>
                    )}
                  </div>
                </div>
              </li>
            ))}
          </ul>
        </div>
      </section>

      {/* Academic Links */}
      <section>
        <div className="flex items-center gap-3 mb-6">
          <div className="h-1 w-12 bg-gradient-to-r from-purple-600 to-amber-400 rounded-full"></div>
          <h2 className="text-3xl font-bold bg-gradient-to-r from-purple-900 to-purple-700 bg-clip-text text-transparent">Academic Profiles</h2>
          <div className="h-1 flex-1 bg-gradient-to-r from-amber-400 to-transparent rounded-full"></div>
        </div>
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-5">
          {about.links.map((link, i) => (
            <a 
              key={i} 
              href={link.url} 
              target="_blank" 
              rel="noopener noreferrer" 
              className="group relative overflow-hidden flex items-center justify-between glass-effect p-6 rounded-2xl border-2 border-purple-200 hover:border-amber-400 transition-all duration-300 card-shadow hover:card-shadow-hover transform hover:-translate-y-2 hover:scale-105"
            >
              <div className="absolute inset-0 bg-gradient-to-br from-purple-400 to-amber-400 opacity-0 group-hover:opacity-10 transition-opacity duration-300"></div>
              <span className="relative font-bold text-purple-900 group-hover:text-purple-700 transition-colors">{link.name}</span>
              <div className="relative p-2 rounded-full bg-amber-100 group-hover:bg-amber-400 transition-colors duration-300">
                <ExternalLink size={18} className="text-amber-600 group-hover:text-white transition-colors" />
              </div>
            </a>
          ))}
        </div>
      </section>

      {/* Note */}
      {about.note && (
        <div className="relative overflow-hidden bg-gradient-to-br from-amber-50 via-amber-100 to-orange-100 border-l-4 border-amber-500 rounded-2xl p-6 shadow-xl">
          <div className="absolute top-0 right-0 w-32 h-32 bg-amber-300 rounded-full blur-3xl opacity-30"></div>
          <p className="relative text-sm text-gray-800 italic font-medium leading-relaxed">{about.note}</p>
        </div>
      )}
    </div>
  );
}


export default HomePage;