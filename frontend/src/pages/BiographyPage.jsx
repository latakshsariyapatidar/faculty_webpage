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
function BiographyPage({ data }) {
  return (
    <div className="space-y-8">
      {/* Experience Section */}
      <section>
        <h2 className="text-xl font-semibold text-gray-900 mb-4">Professional Experience</h2>
        <div className="space-y-4">
          {data.experience.map((exp, i) => (
            <div key={i} className="bg-white rounded-lg border border-gray-200 p-6">
              <h3 className="text-lg font-semibold text-gray-900 mb-2">{exp.position}</h3>
              <p className="text-gray-700 font-medium mb-1">{exp.institution}</p>
              <p className="text-sm text-primary font-medium mb-3">{exp.period}</p>
              <p className="text-gray-600 leading-relaxed">{exp.description}</p>
            </div>
          ))}
        </div>
      </section>

      {/* Education Section */}
      <section>
        <h2 className="text-xl font-semibold text-gray-900 mb-4">Education</h2>
        <div className="space-y-4">
          {data.education.map((edu, i) => (
            <div key={i} className="bg-white rounded-lg border border-gray-200 p-6">
              <h3 className="text-lg font-semibold text-gray-900 mb-2">{edu.degree}</h3>
              <p className="text-gray-700 font-medium mb-1">{edu.institution}</p>
              <p className="text-sm text-primary font-medium mb-3">Year: {edu.year}</p>
              {edu.thesis && (
                <div className="mt-3 pt-3 border-t border-gray-200">
                  <p className="text-sm text-gray-600">
                    <span className="font-medium">Thesis:</span> {edu.thesis}
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
