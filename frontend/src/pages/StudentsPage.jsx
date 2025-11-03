/**
 * Students Page Component
 * 
 * Displays application instructions, current students, and
 * graduated students with their research topics and placements.
 * 
 * @module pages/StudentsPage
 */

import React from 'react';

/**
 * Students page component
 * 
 * @param {Object} props
 * @param {Object} props.data - Students data
 * @param {Array} props.data.instructions - Application instructions
 * @param {Array} props.data.current - Current students list
 * @param {Array} props.data.graduated - Graduated students list
 * @returns {JSX.Element}
 */
function StudentsPage({ data }) {
  return (
    <div className="w-full space-y-8">
      {/* Application Instructions */}
      <section>
        <h2 className="text-xl font-semibold text-gray-900 mb-4">How to Apply</h2>
        
        <div className="bg-white p-6 rounded-lg border border-gray-200">
          <div className="space-y-3">
            {data.instructions.map((inst, i) => (
              <div 
                key={i} 
                className="flex gap-3 p-4 rounded-lg bg-gray-50 hover:bg-gray-100 transition-colors"
              >
                <span className="flex-shrink-0 w-7 h-7 rounded bg-primary flex items-center justify-center text-white font-semibold text-sm">
                  {i + 1}
                </span>
                <span className="text-sm text-gray-700 leading-relaxed flex-1">{inst}</span>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Current Students */}
      <section>
        <h2 className="text-xl font-semibold text-gray-900 mb-4">Current Students</h2>
        
        <div className="grid md:grid-cols-2 gap-4">
          {data.current.map((student, i) => (
            <div 
              key={i} 
              className="bg-white p-5 rounded-lg border-t-4 border-secondary hover:border-secondary-dark transition-colors"
            >
              <h3 className="text-lg font-semibold text-gray-900 mb-2">
                {student.name}
              </h3>
              <span className="inline-block text-xs font-medium text-white bg-secondary px-3 py-1 rounded mb-3">
                {student.program}
              </span>
              
              <div className="p-3 rounded bg-gray-50 border-l-4 border-primary mb-2">
                <p className="text-sm text-gray-700 leading-relaxed">
                  <span className="font-medium text-primary">Topic:</span> {student.topic}
                </p>
              </div>
              
              <p className="text-xs text-gray-500 font-medium">{student.year}</p>
            </div>
          ))}
        </div>
      </section>

      {/* Graduated Students */}
      <section>
        <h2 className="text-xl font-semibold text-gray-900 mb-4">Graduated Students</h2>
        
        <div className="space-y-4">
          {data.graduated.map((student, i) => (
            <div 
              key={i} 
              className="bg-white p-6 rounded-lg border-l-4 border-primary hover:border-primary-dark transition-colors"
            >
              <div className="mb-3">
                <h3 className="text-lg font-semibold text-gray-900 mb-1">
                  {student.name}
                </h3>
                <p className="text-sm font-medium text-gray-600">
                  {student.program} • {student.year}
                </p>
              </div>
              
              {student.thesis && (
                <div className="p-3 rounded bg-gray-50 border-l-4 border-secondary mb-3">
                  <p className="text-sm text-gray-700 leading-relaxed">
                    <span className="font-medium text-secondary">Thesis:</span> {student.thesis}
                  </p>
                </div>
              )}
              
              <div className="inline-block px-4 py-2 rounded bg-green-50 border-l-4 border-green-500">
                <span className="text-sm text-green-800 font-medium">{student.placement}</span>
              </div>
            </div>
          ))}
        </div>
      </section>
    </div>
  );
}

export default StudentsPage;
