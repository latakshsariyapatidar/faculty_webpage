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
      <div className="bg-white rounded-lg border border-gray-200 p-8">
        <div className="flex flex-col md:flex-row gap-8">
          {/* Profile Image */}
          <div className="shrink-0">
            <img 
              src={personalInfo.profileImage} 
              alt={personalInfo.name} 
              className="w-40 h-40 rounded-lg object-cover border-2 border-gray-200"
            />
          </div>

          {/* Profile Info */}
          <div className="flex-1">
            <h1 className="text-3xl font-semibold text-gray-900 mb-1">
              {personalInfo.name}
            </h1>
            <p className="text-lg text-primary font-medium mb-2">
              {personalInfo.designation}
            </p>
            <p className="text-gray-600 mb-6">
              {personalInfo.department}
            </p>
            
            {/* Contact Information */}
            <div className="space-y-3 mb-6">
              <a 
                href={`mailto:${personalInfo.email}`}
                className="flex items-center gap-3 text-gray-700 hover:text-primary transition-colors"
              >
                <Mail size={18} />
                <span className="text-sm">{personalInfo.email}</span>
              </a>
              
              <div className="flex items-center gap-3 text-gray-700">
                <Phone size={18} />
                <span className="text-sm">{personalInfo.phone}</span>
              </div>
              
              <div className="flex items-center gap-3 text-gray-700">
                <MapPin size={18} />
                <span className="text-sm">{personalInfo.office}</span>
              </div>
            </div>

            {/* Address */}
            <div className="bg-gray-50 p-4 rounded border border-gray-200">
              <p className="text-sm text-gray-600">{personalInfo.address}</p>
            </div>
          </div>
        </div>
      </div>

      {/* About Me */}
      <section>
        <h2 className="text-xl font-semibold text-gray-900 mb-4">About</h2>
        <div className="bg-white rounded-lg border border-gray-200 p-6">
          <p className="text-gray-700 leading-relaxed">{about.bio}</p>
        </div>
      </section>

      {/* Research Positions */}
      <section>
        <h2 className="text-xl font-semibold text-gray-900 mb-4">Current Research Positions</h2>
        <div className="bg-white rounded-lg border border-gray-200 p-6">
          <ul className="space-y-3">
            {about.researchPositions.map((pos, i) => (
              <li key={i} className="flex gap-3 text-gray-700">
                <span className="text-primary font-medium">•</span>
                <span>{pos}</span>
              </li>
            ))}
          </ul>
        </div>
      </section>

      {/* Academic Links */}
      <section>
        <h2 className="text-xl font-semibold text-gray-900 mb-4">Academic Profiles</h2>
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-4">
          {about.links.map((link, i) => (
            <a 
              key={i} 
              href={link.url} 
              target="_blank" 
              rel="noopener noreferrer" 
              className="flex items-center justify-between bg-white p-4 rounded-lg border border-gray-200 hover:border-primary hover:bg-gray-50 transition-colors"
            >
              <span className="font-medium text-gray-900">{link.name}</span>
              <ExternalLink size={16} className="text-gray-400" />
            </a>
          ))}
        </div>
      </section>

      {/* Note */}
      {about.note && (
        <div className="bg-orange-50 border border-orange-200 rounded-lg p-4">
          <p className="text-sm text-gray-700 italic">{about.note}</p>
        </div>
      )}
    </div>
  );
}

export default HomePage;