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
      <div className="bg-white rounded-2xl border-2 border-purple-100 shadow-xl p-8">
        <div className="flex flex-col md:flex-row gap-8">
          {/* Profile Image */}
          <div className="shrink-0">
            <img 
              src={personalInfo.profileImage} 
              alt={personalInfo.name} 
              className="w-48 h-48 rounded-2xl object-cover border-4 border-gradient-to-br from-purple-400 to-amber-400 shadow-2xl"
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
                className="flex items-center gap-3 text-gray-700 hover:text-purple-700 transition-colors bg-purple-50 px-4 py-3 rounded-lg border border-purple-100 hover:border-purple-300"
              >
                <Mail size={20} className="text-purple-600" />
                <span className="text-sm font-medium">{personalInfo.email}</span>
              </a>
              
              <div className="flex items-center gap-3 text-gray-700 bg-amber-50 px-4 py-3 rounded-lg border border-amber-100">
                <Phone size={20} className="text-amber-600" />
                <span className="text-sm font-medium">{personalInfo.phone}</span>
              </div>
              
              <div className="flex items-center gap-3 text-gray-700 bg-gray-50 px-4 py-3 rounded-lg border border-gray-200">
                <MapPin size={20} className="text-purple-600" />
                <span className="text-sm font-medium">{personalInfo.office}</span>
              </div>
            </div>

            {/* Address */}
            <div className="bg-gradient-to-r from-purple-50 to-amber-50 p-4 rounded-lg border-2 border-purple-200">
              <p className="text-sm text-gray-700 font-medium">{personalInfo.address}</p>
            </div>
          </div>
        </div>
      </div>

      {/* About Me */}
      <section>
        <h2 className="text-3xl font-bold text-purple-900 mb-4 pb-3 border-b-4 border-amber-400 inline-block">About</h2>
        <div className="bg-white rounded-2xl border-2 border-purple-100 shadow-xl p-6">
          <p className="text-gray-700 leading-relaxed text-lg">{about.bio}</p>
        </div>
      </section>

      {/* Research Positions */}
      <section>
        <h2 className="text-3xl font-bold text-purple-900 mb-4 pb-3 border-b-4 border-amber-400 inline-block">Current Research Positions</h2>
        <div className="bg-white rounded-2xl border-2 border-purple-100 shadow-xl p-6">
          <ul className="space-y-4">
            {about.researchPositions.map((pos, i) => (
              <li key={i} className="bg-gradient-to-r from-purple-50 to-amber-50 p-5 rounded-lg border-2 border-purple-100 hover:border-amber-300 transition-all duration-300 shadow-sm hover:shadow-md">
                <div className="flex gap-3 items-start">
                  <span className="text-amber-500 font-bold text-xl">•</span>
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
        <h2 className="text-3xl font-bold text-purple-900 mb-4 pb-3 border-b-4 border-amber-400 inline-block">Academic Profiles</h2>
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-4">
          {about.links.map((link, i) => (
            <a 
              key={i} 
              href={link.url} 
              target="_blank" 
              rel="noopener noreferrer" 
              className="flex items-center justify-between bg-white p-5 rounded-xl border-2 border-purple-100 hover:border-amber-400 hover:bg-gradient-to-br hover:from-purple-50 hover:to-amber-50 transition-all duration-300 shadow-lg hover:shadow-xl transform hover:-translate-y-1"
            >
              <span className="font-bold text-purple-900">{link.name}</span>
              <ExternalLink size={18} className="text-amber-500" />
            </a>
          ))}
        </div>
      </section>

      {/* Note */}
      {about.note && (
        <div className="bg-gradient-to-r from-amber-100 to-orange-100 border-l-4 border-amber-500 rounded-xl p-5 shadow-lg">
          <p className="text-sm text-gray-800 italic font-medium leading-relaxed">{about.note}</p>
        </div>
      )}
    </div>
  );
}


export default HomePage;