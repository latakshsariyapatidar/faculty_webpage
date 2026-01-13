/**
 * Home Page – Academic Faculty Profile
 * Professional layout with working counting animation for statistics
 */

import React, { useEffect, useState } from 'react';
import { Mail, Phone, MapPin, ExternalLink, BookOpen, Award, Building, Globe, Users, PhoneCall } from 'lucide-react';

// Fixed AnimatedCounter - WILL count from 0
const AnimatedCounter = ({ value }) => {
  const [count, setCount] = useState(0);
  const v = parseInt(value) || 0;

  useEffect(() => {
    // Always reset to 0 when value changes
    setCount(0);
    
    // Calculate animation timing
    const duration = 2000; // 2 seconds
    const frameRate = 60; // 60fps
    const totalFrames = Math.round(duration / (1000 / frameRate));
    const increment = v / totalFrames;
    
    let currentFrame = 0;
    
    const counter = setInterval(() => {
      currentFrame++;
      const newCount = Math.min(v, Math.floor(increment * currentFrame));
      setCount(newCount);
      
      if (currentFrame >= totalFrames) {
        setCount(v);
        clearInterval(counter);
      }
    }, 1000 / frameRate);
    
    return () => clearInterval(counter);
  }, [v]); // Re-run when value changes

  return <span>{count}</span>;
};

function HomePage({ facultyData }) {
  if (!facultyData) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-gray-50">
        <p className="text-gray-600">Loading faculty profile...</p>
      </div>
    );
  }

  const personalInfo = facultyData.personalInfo || {};
  const about = facultyData.about || {};
  const statistics = facultyData.statistics || [];

  return (
    <div className=" min-h-screen bg-gray-50">
      <div className=" w-full mx-auto px-4 sm:px-6 lg:px-8 py-7">
        {/* Top Profile Section */}
        <div className="bg-white rounded-xl shadow-lg overflow-hidden mb-8 border border-gray-200">
          <div className="md:flex">
            {/* Left Column - Photo */}
            <div className="md:w-1/3 lg:w-1/4 p-8 flex flex-col items-center justify-center bg-gray-50">
              <div className="w-4/5 h-7/9 rounded-2 overflow-hidden border-4 border-white shadow-lg mb-4">
                {personalInfo.profileImage ? (
                  <img
                    src={personalInfo.profileImage}
                    alt={personalInfo.name}
                    className="w-full h-full object-cover"
                  />
                ) : (
                  <div className="w-full h-full bg-purple-600 flex items-center justify-center">
                    <span className="text-4xl font-bold text-white">
                      {personalInfo.name?.charAt(0) || 'P'}
                    </span>
                  </div>
                )}
              </div>
              
              <h1 className="text-2xl font-bold text-gray-900 text-center mb-1">
                {personalInfo.name}
              </h1>
              
              <div className="text-center mb-4">
                <p className="text-purple-700 font-medium">{personalInfo.designation}</p>
                {personalInfo.department && (
                  <p className="text-gray-600 text-sm">{personalInfo.department}</p>
                )}
              </div>
            </div>

            {/* Right Column - Contact and Stats */}
            <div className="md:w-2/3 lg:w-3/4 p-8">
              <div className="mb-8">
                <h2 className="text-2xl font-bold text-gray-900 mb-4">Contact Information</h2>
                
                {/* Clean inline contact info - No boxes, just icons and text */}
                <div className="space-y-4">
                  {/* First line: Email, Phone, Landline, Office (if available) */}
                  <div className="flex flex-wrap items-center gap-4">
                    {personalInfo.email && (
                      <div className="flex items-center gap-2">
                        <Mail className="h-4 w-4 text-purple-600 flex-shrink-0" />
                        <a 
                          href={`mailto:${personalInfo.email}`}
                          className="text-gray-800 hover:text-purple-700 font-medium text-sm md:text-base"
                          title={personalInfo.email}
                        >
                          {personalInfo.email}
                        </a>
                      </div>
                    )}
                    
                    {personalInfo.phone && (
                      <div className="flex items-center gap-2">
                        <Phone className="h-4 w-4 text-amber-600 flex-shrink-0" />
                        <a 
                          href={`tel:${personalInfo.phone}`}
                          className="text-gray-800 hover:text-amber-700 font-medium text-sm md:text-base"
                        >
                          {personalInfo.phone}
                        </a>
                      </div>
                    )}
                    
                    {personalInfo.landline && (
                      <div className="flex items-center gap-2">
                        <PhoneCall className="h-4 w-4 text-green-600 flex-shrink-0" />
                        <a 
                          href={`tel:${personalInfo.landline}`}
                          className="text-gray-800 hover:text-green-700 font-medium text-sm md:text-base"
                          title="Landline"
                        >
                          {personalInfo.landline}
                        </a>
                      </div>
                    )}
                    
                    {personalInfo.office && (
                      <div className="flex items-center gap-2">
                        <Building className="h-4 w-4 text-gray-600 flex-shrink-0" />
                        <span className="text-gray-800 font-medium text-sm md:text-base">
                          {personalInfo.office}
                        </span>
                      </div>
                    )}
                  </div>
                  
                  {/* Second line: Address (if available) */}
                  {personalInfo.address && (
                    <div className="flex items-start gap-2">
                      <MapPin className="h-4 w-4 text-gray-600 mt-0.5 flex-shrink-0" />
                      <p className="text-gray-800 font-medium text-sm md:text-base leading-relaxed">
                        {personalInfo.address}
                      </p>
                    </div>
                  )}
                </div>
              </div>

              {/* Statistics Section - Fixed Animation */}
              {statistics.length > 0 && (
                <div className="border-t border-gray-200 pt-8">
                  <h3 className="text-lg font-semibold text-gray-900 mb-6">Research Statistics</h3>
                  <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-5 gap-4">
                    {statistics.map((stat, index) => (
                      <div 
                        key={index} 
                        className="bg-white rounded-lg p-4 border border-gray-200 text-center hover:border-purple-300 hover:shadow-md transition-all duration-300"
                      >
                        <div className="text-3xl font-bold text-purple-600 mb-2">
                          {/* This WILL count from 0 now */}
                          <AnimatedCounter value={stat.value} />
                        </div>
                        <div className="text-sm font-semibold text-gray-800 uppercase tracking-wide">
                          {stat.label}
                        </div>
                        <div className="text-sm font-semibold text-gray-500 tracking-wide">
                          {stat.description}
                        </div>
                      </div>
                    ))}
                  </div>
                </div>
              )}
            </div>
          </div>
        </div>

        {/* About Section */}
        <div className="bg-white rounded-xl shadow-lg border border-gray-200 p-5 mb-5">
          <div className="flex items-center gap-3 mb-6">
            <div className="w-10 h-10 rounded-lg bg-purple-600 flex items-center justify-center">
              <BookOpen className="h-4 w-4 text-white" />
            </div>
            <div>
              <h2 className="text-2xl font-bold text-gray-900">About</h2>
              {/* <p className="text-gray-600">Professional Biography</p> */}
            </div>
          </div>
          
          {about.bio ? (
            <div className="text-gray-700 leading-relaxed">
              {about.bio.split('\n').filter(p => p.trim()).map((paragraph, idx) => (
                <p key={idx} className="mb-4">{paragraph}</p>
              ))}
            </div>
          ) : (
            <p className="text-gray-500 italic">No biography information available.</p>
          )}
        </div>

        {/* Bottom Sections */}
        <div className="grid md:grid-cols-2 gap-8">
          {about.links && about.links.length > 0 && (
            <div className="bg-white rounded-xl shadow-lg border border-gray-200 p-6">
              <h3 className="text-lg font-bold text-gray-900 mb-4 flex items-center gap-2">
                <Globe className="h-5 w-5 text-purple-600" />
                Academic Profiles
              </h3>
              <div className="space-y-3">
                {about.links.map((link, idx) => (
                  <a
                    key={idx}
                    href={link.url}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="flex items-center justify-between p-3 rounded-lg border border-gray-200 hover:border-purple-300 hover:bg-purple-50 transition-colors"
                  >
                    <span className="font-medium text-gray-800">{link.name}</span>
                    <ExternalLink className="h-4 w-4 text-gray-400" />
                  </a>
                ))}
              </div>
            </div>
          )}

          {about.researchPositions && about.researchPositions.length > 0 && (
            <div className="bg-amber-50 rounded-xl border border-amber-200 p-6">
              <div className="flex items-center gap-3 mb-4">
                <div className="w-10 h-10 rounded-lg bg-amber-500 flex items-center justify-center">
                  <Users className="h-5 w-5 text-white" />
                </div>
                <div>
                  <h3 className="text-lg font-bold text-gray-800">Research Positions Available</h3>
                  <p className="text-sm text-amber-700">{about.researchPositions.length} position(s)</p>
                </div>
              </div>
              
              <div className="space-y-3">
                {about.researchPositions.map((position, idx) => (
                  <div key={idx} className="bg-white rounded-lg p-4 border border-amber-200">
                    <p className="font-semibold text-gray-800">{position.position}</p>
                    {position.application_link ? (
                      <a 
                        href={position.application_link}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="inline-flex items-center gap-1 text-sm text-amber-600 hover:text-amber-700 font-medium mt-2"
                      >
                        Apply <ExternalLink className="h-3 w-3" />
                      </a>
                    ) : personalInfo.email ? (
                      <a 
                        href={`mailto:${personalInfo.email}`}
                        className="inline-flex items-center gap-1 text-sm text-amber-600 hover:text-amber-700 font-medium mt-2"
                      >
                        Email to apply <Mail className="h-3 w-3" />
                      </a>
                    ) : null}
                  </div>
                ))}
              </div>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}

export default HomePage;