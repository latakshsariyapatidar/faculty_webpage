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
// TalksPage.jsx
function TalksPage({ data }) {
  return (
    <div className="space-y-8">
      <h1 className="text-3xl font-bold text-purple-900 mb-2 pb-4 border-b-2 border-amber-500 inline-block">
        Invited Talks & Presentations
      </h1>
      
      <div className="space-y-6">
        {data.map((talk, i) => (
          <div key={i} className="bg-white rounded-2xl shadow-lg border border-purple-200 p-6 hover:shadow-xl hover:border-amber-400 transition-all duration-300 transform hover:-translate-y-1 group">
            <h3 className="text-xl font-bold text-purple-900 mb-4 leading-tight">
              {talk.title}
            </h3>
            
            <p className="text-lg text-purple-700 font-semibold mb-4 bg-purple-50 inline-block px-4 py-2.5 rounded-xl border border-purple-200">
              {talk.event}
            </p>
            
            <div className="flex flex-wrap gap-4 items-center">
              <div className="flex items-center gap-2 text-purple-600 bg-purple-50 px-4 py-2.5 rounded-xl border border-purple-200">
                <svg className="w-5 h-5 text-purple-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17.657 16.657L13.414 20.9a1.998 1.998 0 01-2.827 0l-4.244-4.243a8 8 0 1111.314 0z" />
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 11a3 3 0 11-6 0 3 3 0 016 0z" />
                </svg>
                <span className="font-medium">{talk.location}</span>
              </div>
              
              <div className="flex items-center gap-2 text-amber-700 bg-amber-50 px-4 py-2.5 rounded-xl border-2 border-amber-200 font-bold">
                <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8 7V3m8 4V3m-9 8h10M5 21h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v12a2 2 0 002 2z" />
                </svg>
                <span>{talk.date}</span>
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
export default TalksPage;