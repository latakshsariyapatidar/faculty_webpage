/**
 * Talks Page Component
 * 
 * Displays invited talks and presentations with event details,
 * location, and dates.
 * 
 * @module pages/TalksPage
 */

import React from 'react';

/**
 * Talks page component
 * 
 * @param {Object} props
 * @param {Array} props.data - Array of talk objects
 * @returns {JSX.Element}
 */
function TalksPage({ data }) {
  return (
    <div className="w-full space-y-6">
      <h2 className="text-xl font-semibold text-gray-900">Invited Talks & Presentations</h2>
      
      <div className="space-y-4">
        {data.map((talk, i) => (
          <div 
            key={i} 
            className="bg-white p-6 rounded-lg border-t-4 border-primary hover:border-primary-dark transition-colors"
          >
            <h3 className="text-lg font-semibold text-gray-900 mb-2 leading-tight">
              {talk.title}
            </h3>
            
            <p className="text-base text-gray-700 font-medium mb-4">
              {talk.event}
            </p>
            
            <div className="flex flex-wrap gap-3">
              <div className="flex items-center gap-2 px-3 py-1.5 rounded bg-gray-100">
                <span className="text-sm text-gray-700">{talk.location}</span>
              </div>
              
              <div className="flex items-center gap-2 px-3 py-1.5 rounded bg-orange-50">
                <span className="text-sm text-gray-700 font-medium">{talk.date}</span>
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}

export default TalksPage;