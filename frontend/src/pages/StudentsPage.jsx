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
    <div className="w-full space-y-10">
      {/* Application Instructions */}
      <section>
        <h2 className="text-3xl font-bold text-purple-900 mb-6 pb-3 border-b-4 border-amber-400 inline-block">How to Apply</h2>
        
        <div className="bg-white p-8 rounded-2xl border-2 border-purple-100 shadow-xl">
          <div className="space-y-4">
            {data.instructions.map((inst, i) => (
              <div 
                key={i} 
                className="flex gap-4 p-5 rounded-xl bg-gradient-to-r from-purple-50 to-amber-50 hover:from-purple-100 hover:to-amber-100 transition-all duration-300 border-2 border-purple-100 hover:border-amber-300 shadow-sm hover:shadow-md"
              >
                <span className="flex-shrink-0 w-10 h-10 rounded-xl bg-gradient-to-br from-purple-600 to-purple-700 flex items-center justify-center text-white font-bold text-lg shadow-lg">
                  {i + 1}
                </span>
                <span className="text-sm text-gray-800 leading-relaxed flex-1 font-medium pt-2">{inst}</span>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Current Students */}
      <section>
        <h2 className="text-3xl font-bold text-purple-900 mb-6 pb-3 border-b-4 border-amber-400 inline-block">Current Students</h2>
        
        <div className="grid md:grid-cols-2 gap-6">
          {data.current.map((student, i) => (
            <div 
              key={i} 
              className="bg-white p-6 rounded-2xl border-t-4 border-amber-500 hover:border-purple-600 transition-all duration-300 shadow-xl hover:shadow-2xl transform hover:-translate-y-1"
            >
              <h3 className="text-xl font-bold text-purple-900 mb-3">
                {student.name}
              </h3>
              <span className="inline-block text-xs font-bold text-white bg-gradient-to-r from-amber-500 to-amber-600 px-4 py-2 rounded-full mb-4 shadow-md">
                {student.program}
              </span>
              
              <div className="p-4 rounded-xl bg-gradient-to-r from-purple-50 to-amber-50 border-l-4 border-purple-600 mb-3">
                <p className="text-sm text-gray-800 leading-relaxed">
                  <span className="font-bold text-purple-700">Topic:</span> {student.topic}
                </p>
              </div>
              
              <p className="text-xs text-gray-600 font-bold bg-gray-50 inline-block px-3 py-1 rounded-full">{student.year}</p>
            </div>
          ))}
        </div>
      </section>

      {/* Graduated Students */}
      <section>
        <h2 className="text-3xl font-bold text-purple-900 mb-6 pb-3 border-b-4 border-amber-400 inline-block">Graduated Students</h2>
        
        <div className="space-y-6">
          {data.graduated.map((student, i) => (
            <div 
              key={i} 
              className="bg-white p-6 rounded-2xl border-l-4 border-purple-600 hover:border-amber-500 transition-all duration-300 shadow-xl hover:shadow-2xl transform hover:-translate-x-1"
            >
              <div className="mb-4">
                <h3 className="text-xl font-bold text-purple-900 mb-2">
                  {student.name}
                </h3>
                <p className="text-sm font-bold text-gray-600">
                  {student.program} • <span className="text-amber-600">{student.year}</span>
                </p>
              </div>
              
              {student.thesis && (
                <div className="p-4 rounded-xl bg-gradient-to-r from-purple-50 to-amber-50 border-l-4 border-amber-500 mb-4">
                  <p className="text-sm text-gray-800 leading-relaxed">
                    <span className="font-bold text-amber-700">Thesis:</span> {student.thesis}
                  </p>
                </div>
              )}
              
              <div className="inline-block px-5 py-3 rounded-xl bg-gradient-to-r from-green-500 to-green-600 border-l-4 border-green-700 shadow-lg">
                <span className="text-sm text-white font-bold">{student.placement}</span>
              </div>
            </div>
          ))}
        </div>
      </section>
    </div>
  );
}

export default StudentsPage;
