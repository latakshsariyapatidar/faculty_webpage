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
    <div className="w-full space-y-8">
      {/* Patents */}
      <section>
        <h2 className="text-xl font-semibold text-gray-900 mb-4">Patents</h2>
        
        <div className="space-y-4">
          {data.patents.map((patent, i) => (
            <div 
              key={i} 
              className="bg-white p-6 rounded-lg border-l-4 border-primary hover:border-primary-dark transition-colors"
            >
              <h3 className="text-lg font-semibold text-gray-900 mb-3 leading-tight">
                {patent.title}
              </h3>
              <div className="flex flex-wrap gap-2">
                <span className="px-3 py-1 rounded bg-gray-100 text-primary text-sm font-medium">
                  {patent.number}
                </span>
                <span className="px-3 py-1 rounded bg-gray-100 text-secondary text-sm font-medium">
                  {patent.year}
                </span>
                <span className="px-3 py-1 rounded bg-green-50 text-green-700 text-sm font-medium">
                  {patent.status}
                </span>
              </div>
            </div>
          ))}
        </div>
      </section>

      {/* Journal Publications */}
      <section>
        <h2 className="text-xl font-semibold text-gray-900 mb-4">Journal Publications</h2>
        
        <div className="space-y-4">
          {data.journals.map((pub, i) => (
            <div 
              key={i} 
              className="bg-white p-6 rounded-lg border-l-4 border-secondary hover:border-secondary-dark transition-colors"
            >
              <h3 className="text-lg font-semibold text-gray-900 mb-2 leading-tight">
                {pub.title}
              </h3>
              <p className="text-sm text-gray-600 italic mb-2">{pub.authors}</p>
              <p className="text-sm text-gray-700 mb-3">
                {pub.journal}, {pub.volume}, pp. {pub.pages}, {pub.year}
              </p>
              <a 
                href={`https://doi.org/${pub.doi}`} 
                target="_blank" 
                rel="noopener noreferrer" 
                className="inline-block px-4 py-2 rounded bg-primary text-white text-sm font-medium hover:bg-primary-dark transition-colors"
              >
                DOI: {pub.doi}
              </a>
            </div>
          ))}
        </div>
      </section>

      {/* Conference Publications */}
      <section>
        <h2 className="text-xl font-semibold text-gray-900 mb-4">Conference Publications</h2>
        
        <div className="grid md:grid-cols-2 gap-4">
          {data.conferences.map((conf, i) => (
            <div 
              key={i} 
              className="bg-white p-5 rounded-lg border-t-4 border-primary hover:border-primary-dark transition-colors"
            >
              <h3 className="text-base font-semibold text-gray-900 mb-2 leading-tight">
                {conf.title}
              </h3>
              <p className="text-xs text-gray-600 italic mb-3">{conf.authors}</p>
              <div className="flex flex-wrap gap-2 text-xs text-gray-700">
                <span className="px-2 py-1 rounded bg-gray-100 font-medium">{conf.conference}</span>
                <span className="px-2 py-1 rounded bg-gray-100 font-medium">{conf.location}</span>
                <span className="px-2 py-1 rounded bg-primary/10 text-primary font-medium">{conf.year}</span>
              </div>
            </div>
          ))}
        </div>
      </section>
    </div>
  );
}

export default PublicationsPage;