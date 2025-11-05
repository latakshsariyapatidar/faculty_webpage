/**
 * Publications Page Component
 * 
 * Displays patents, journal publications, and conference publications
 * in organized sections with proper citations.
 * 
 * @module pages/PublicationsPage
 */

import React from 'react';

/**
 * Publications page component
 * 
 * @param {Object} props
 * @param {Object} props.data - Publications data
 * @param {Array} props.data.patents - Patents list
 * @param {Array} props.data.journals - Journal publications
 * @param {Array} props.data.conferences - Conference publications
 * @returns {JSX.Element}
 */
function PublicationsPage({ data }) {
  return (
    <div className="w-full space-y-10">
      {/* Patents */}
      <section>
        <h2 className="text-3xl font-bold text-purple-900 mb-6 pb-3 border-b-4 border-amber-400 inline-block">Patents</h2>
        
        <div className="space-y-6">
          {data.patents.map((patent, i) => (
            <div 
              key={i} 
              className="bg-white p-6 rounded-2xl border-l-4 border-purple-600 hover:border-amber-500 transition-all duration-300 shadow-xl hover:shadow-2xl transform hover:-translate-x-1"
            >
              <h3 className="text-xl font-bold text-purple-900 mb-4 leading-tight">
                {patent.title}
              </h3>
              <div className="flex flex-wrap gap-3">
                <span className="px-4 py-2 rounded-lg bg-purple-100 text-purple-800 text-sm font-bold border-2 border-purple-200">
                  {patent.number}
                </span>
                <span className="px-4 py-2 rounded-lg bg-amber-100 text-amber-800 text-sm font-bold border-2 border-amber-200">
                  {patent.year}
                </span>
                <span className="px-4 py-2 rounded-lg bg-green-100 text-green-800 text-sm font-bold border-2 border-green-200">
                  {patent.status}
                </span>
              </div>
            </div>
          ))}
        </div>
      </section>

      {/* Journal Publications */}
      <section>
        <h2 className="text-3xl font-bold text-purple-900 mb-6 pb-3 border-b-4 border-amber-400 inline-block">Journal Publications</h2>
        
        <div className="space-y-6">
          {data.journals.map((pub, i) => (
            <div 
              key={i} 
              className="bg-white p-6 rounded-2xl border-l-4 border-amber-500 hover:border-purple-600 transition-all duration-300 shadow-xl hover:shadow-2xl transform hover:-translate-x-1"
            >
              <h3 className="text-xl font-bold text-purple-900 mb-3 leading-tight">
                {pub.title}
              </h3>
              <p className="text-sm text-gray-600 italic mb-2 font-medium">{pub.authors}</p>
              <p className="text-sm text-gray-700 mb-4 bg-gray-50 inline-block px-3 py-2 rounded-lg">
                <span className="font-bold">{pub.journal}</span>, {pub.volume}, pp. {pub.pages}, {pub.year}
              </p>
              <a 
                href={`https://doi.org/${pub.doi}`} 
                target="_blank" 
                rel="noopener noreferrer" 
                className="inline-block px-5 py-2.5 rounded-lg bg-gradient-to-r from-purple-600 to-purple-700 text-white text-sm font-bold hover:from-purple-700 hover:to-purple-800 transition-all duration-200 shadow-lg hover:shadow-xl"
              >
                DOI: {pub.doi}
              </a>
            </div>
          ))}
        </div>
      </section>

      {/* Conference Publications */}
      <section>
        <h2 className="text-3xl font-bold text-purple-900 mb-6 pb-3 border-b-4 border-amber-400 inline-block">Conference Publications</h2>
        
        <div className="grid md:grid-cols-2 gap-6">
          {data.conferences.map((conf, i) => (
            <div 
              key={i} 
              className="bg-white p-6 rounded-2xl border-t-4 border-purple-600 hover:border-amber-500 transition-all duration-300 shadow-xl hover:shadow-2xl transform hover:-translate-y-1"
            >
              <h3 className="text-lg font-bold text-purple-900 mb-3 leading-tight">
                {conf.title}
              </h3>
              <p className="text-xs text-gray-600 italic mb-4 font-medium">{conf.authors}</p>
              <div className="flex flex-wrap gap-2 text-xs">
                <span className="px-3 py-1.5 rounded-lg bg-purple-100 text-purple-800 font-bold border border-purple-200">{conf.conference}</span>
                <span className="px-3 py-1.5 rounded-lg bg-amber-100 text-amber-800 font-bold border border-amber-200">{conf.location}</span>
                <span className="px-3 py-1.5 rounded-lg bg-gradient-to-r from-purple-600 to-purple-700 text-white font-bold shadow">{conf.year}</span>
              </div>
            </div>
          ))}
        </div>
      </section>
    </div>
  );
}

export default PublicationsPage;