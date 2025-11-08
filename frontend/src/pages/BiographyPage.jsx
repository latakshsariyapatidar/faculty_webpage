/**
 * Biography Page Component
 * 
 * Displays professional experience and educational background
 * in a clean, timeline-style layout.
 * 
 * @module pages/BiographyPage
 */

import React from 'react';

/**
 * Biography page component
 * 
 * @param {Object} props
 * @param {Object} props.data - Biography data
 * @param {Array} props.data.experience - Professional experience list
 * @param {Array} props.data.education - Educational qualifications
 * @returns {JSX.Element}
 */
// BiographyPage.jsx
function BiographyPage({ data }) {
  return (
    <div className="space-y-8">
      {/* Experience Section */}
      <section className="bg-white rounded-3xl shadow-lg border border-purple-200 p-8">
        <h2 className="text-2xl font-bold text-purple-900 mb-8 pb-3 border-b-2 border-amber-500 inline-block">
          Professional Experience
        </h2>
        <div className="space-y-8 mt-6">
          {data.experience.map((exp, i) => (
            <div key={i} className="relative pl-10 pb-8 border-l-2 border-purple-300 last:border-l-0 last:pb-0 hover:border-amber-400 transition-colors duration-300 group">
              <div className="absolute -left-2.5 top-0 w-5 h-5 bg-gradient-to-br from-purple-600 to-purple-700 rounded-full border-4 border-white shadow-lg group-hover:scale-110 transition-transform duration-300"></div>
              <h3 className="text-xl font-bold text-purple-900 mb-2">{exp.position}</h3>
              <p className="text-lg font-semibold text-amber-600 mb-2">{exp.institution}</p>
              <p className="text-sm text-purple-600 font-medium mb-4 bg-purple-100 inline-block px-4 py-1.5 rounded-full">{exp.period}</p>
              <p className="text-purple-700 leading-relaxed">{exp.description}</p>
            </div>
          ))}
        </div>
      </section>

      {/* Education Section */}
      <section className="bg-white rounded-3xl shadow-lg border border-purple-200 p-8">
        <h2 className="text-2xl font-bold text-purple-900 mb-8 pb-3 border-b-2 border-amber-500 inline-block">
          Education
        </h2>
        <div className="grid md:grid-cols-2 gap-6 mt-6">
          {data.education.map((edu, i) => (
            <div key={i} className="bg-gradient-to-br from-purple-50 to-amber-50/50 rounded-2xl p-6 border border-purple-200 hover:border-amber-400 transition-all duration-300 hover:shadow-lg group">
              <h3 className="text-lg font-bold text-purple-900 mb-3">{edu.degree}</h3>
              <p className="text-amber-700 font-semibold mb-3">{edu.institution}</p>
              <p className="text-sm text-purple-600 font-medium mb-4 bg-white inline-block px-4 py-1.5 rounded-full border border-purple-200">Year: {edu.year}</p>
              {edu.thesis && (
                <div className="mt-4 pt-4 border-t border-purple-200">
                  <p className="text-sm text-purple-700 leading-relaxed">
                    <span className="font-bold text-purple-900">Thesis:</span> {edu.thesis}
                  </p>
                </div>
              )}
            </div>
          ))}
        </div>
      </section>
    </div>
  );
}
export default BiographyPage;
