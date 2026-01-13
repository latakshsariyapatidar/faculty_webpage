/**
 * Biography Page Component
 * Information-dense professional timeline with purple/amber theme
 */

import React from 'react';
import { Briefcase, GraduationCap, Calendar, MapPin, Award } from 'lucide-react';

function BiographyPage({ data }) {
  const { experience = [], education = [] } = data || {};

  if (!experience.length && !education.length) {
    return (
      <div className="min-h-screen bg-gray-50">
        <div className="max-w-8xl mx-auto px-4 sm:px-6 lg:px-8 py-3">
          <h1 className="text-3xl font-bold text-gray-900 mb-4">Biography</h1>
          <p className="text-gray-600">Biography information will be updated soon.</p>
        </div>
      </div>
    );
  }

  return (
    <div className=" w-full min-h-screen bg-gray-50">
      <div className=" mx-auto px-4 sm:px-6 lg:px-8 py-1">
        {/* Header */}
        <div className="mb-8">
          <h1 className="text-4xl font-bold text-gray-900 mb-2">Professional Biography</h1>
          <p className="text-lg text-gray-600">Academic journey and professional experience</p>
        </div>

        <div className="grid lg:grid-cols-2 gap-6">
          {/* Experience Timeline */}
          {experience.length > 0 && (
            <div className="bg-white rounded-xl shadow-md border border-gray-200 p-6">
              <div className="flex items-center gap-3 mb-6 pb-4 border-b-2 border-purple-200">
                <div className="w-10 h-10 rounded-lg bg-purple-600 flex items-center justify-center">
                  <Briefcase className="h-5 w-5 text-white" />
                </div>
                <div>
                  <h2 className="text-xl font-bold text-gray-900">Professional Experience</h2>
                  <p className="text-sm text-gray-600">{experience.length} positions</p>
                </div>
              </div>
              
              <div className="space-y-2">
                {experience.map((exp, idx) => (
                  <div key={idx} className="relative pl-6 pb-6 border-l-2 border-purple-200 last:border-l-0 last:pb-0">
                    <div className="absolute -left-2 top-0 w-4 h-4 rounded-full bg-purple-600 border-2 border-white"></div>
                    
                    <div className="bg-purple-50 rounded-lg p-4 border border-purple-100">
                      {/* Position and Period side by side */}
                      <div className="flex items-start justify-between gap-3 mb-2">
                        <h3 className="font-bold text-gray-900 flex-1">{exp.position}</h3>
                        <div className="flex items-center gap-1.5 px-3 py-1 bg-purple-100 text-black text-xs font-bold rounded-full">
                          <Calendar className="h-3 w-3" />
                          {exp.period}
                        </div>
                      </div>
                      
                      <div className="flex items-start gap-2 text-sm text-gray-700 mb-2">
                        <MapPin className="h-4 w-4 flex-shrink-0 mt-0.5 text-purple-600" />
                        <span className="flex-1">{exp.institution}</span>
                      </div>
                      
                      {exp.description && (
                        <p className="text-sm text-gray-700 mt-2 leading-relaxed">{exp.description}</p>
                      )}
                    </div>
                  </div>
                ))}
              </div>
            </div>
          )}

          {/* Education Timeline */}
          {education.length > 0 && (
            <div className="bg-white rounded-xl shadow-md border border-gray-200 p-6">
              <div className="flex items-center gap-3 mb-6 pb-4 border-b-2 border-amber-200">
                <div className="w-10 h-10 rounded-lg bg-amber-600 flex items-center justify-center">
                  <GraduationCap className="h-5 w-5 text-white" />
                </div>
                <div>
                  <h2 className="text-xl font-bold text-gray-900">Academic Qualifications</h2>
                  <p className="text-sm text-gray-600">{education.length} degrees</p>
                </div>
              </div>
              
              <div className="space-y-4">
                {education.map((edu, idx) => (
                  <div key={idx} className="relative pl-6 pb-6 border-l-2 border-amber-200 last:border-l-0 last:pb-0">
                    <div className="absolute -left-2 top-0 w-4 h-4 rounded-full bg-amber-600 border-2 border-white"></div>
                    
                    <div className="bg-amber-50 rounded-lg p-4 border border-amber-100">
                      <div className="flex items-start justify-between gap-3 mb-2">
                        <h3 className="font-bold text-gray-900 flex-1">{edu.degree}</h3>
                        <div className="flex items-center gap-1.5 px-3 py-1 bg-amber-600 text-white text-xs font-bold rounded-full">
                          <Award className="h-3 w-3" />
                          {edu.year}
                        </div>
                      </div>
                      
                      <div className="flex items-start gap-2 text-sm text-gray-700 mb-2">
                        <MapPin className="h-4 w-4 flex-shrink-0 mt-0.5 text-amber-600" />
                        <span className="flex-1">{edu.institution}</span>
                      </div>
                      
                      {edu.thesis && (
                        <div className="mt-3 pt-3 border-t border-amber-200">
                          <p className="text-xs font-bold text-amber-700 mb-1 uppercase tracking-wide">Thesis</p>
                          <p className="text-sm text-gray-700 leading-relaxed">{edu.thesis}</p>
                        </div>
                      )}
                    </div>
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

export default BiographyPage;