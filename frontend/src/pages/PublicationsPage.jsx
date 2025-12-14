/**
 * Publications Page Component
 * 
 * Displays patents, journal publications, conference publications,
 * and book chapters in a compact organized format with PDF/link options.
 * 
 * @module pages/PublicationsPage
 */

import React from 'react';
import { FileText, ExternalLink, Download } from 'lucide-react';

/**
 * Publications page component
 * 
 * @param {Object} props
 * @param {Object} props.data - Publications data
 * @param {Array} props.data.patents - Patents list
 * @param {Array} props.data.journals - Journal publications
 * @param {Array} props.data.conferences - Conference publications
 * @param {Array} props.data.bookChapters - Book chapters
 * @returns {JSX.Element}
 */
function PublicationsPage({ data }) {
  // Helper component for publication links
  const PublicationLinks = ({ pub }) => (
    <div className="flex flex-wrap gap-2 mt-2">
      {pub.pdf_link && (
        <a
          href={pub.pdf_link}
          target="_blank"
          rel="noopener noreferrer"
          className="inline-flex items-center gap-1 px-3 py-1.5 bg-red-600 text-white text-xs font-bold rounded hover:bg-red-700 transition-colors"
        >
          <Download size={14} /> PDF
        </a>
      )}
      {pub.external_link && (
        <a
          href={pub.external_link}
          target="_blank"
          rel="noopener noreferrer"
          className="inline-flex items-center gap-1 px-3 py-1.5 bg-blue-600 text-white text-xs font-bold rounded hover:bg-blue-700 transition-colors"
        >
          <ExternalLink size={14} /> Link
        </a>
      )}
      {pub.doi && (
        <a
          href={`https://doi.org/${pub.doi}`}
          target="_blank"
          rel="noopener noreferrer"
          className="inline-flex items-center gap-1 px-3 py-1.5 bg-purple-600 text-white text-xs font-bold rounded hover:bg-purple-700 transition-colors"
        >
          <FileText size={14} /> DOI
        </a>
      )}
    </div>
  );

  return (
    <div className="w-full space-y-10">
      {/* Patents */}
      {data.patents && data.patents.length > 0 && (
        <section>
          <div className="flex items-center gap-3 mb-6">
            <div className="h-1 w-12 bg-gradient-to-r from-purple-600 to-amber-400 rounded-full"></div>
            <h2 className="text-3xl font-bold bg-gradient-to-r from-purple-900 to-purple-700 bg-clip-text text-transparent">
              Patents
            </h2>
            <div className="h-1 flex-1 bg-gradient-to-r from-amber-400 to-transparent rounded-full"></div>
          </div>
          
          <ol className="space-y-4 mt-4 list-decimal list-inside">
            {data.patents.map((patent, i) => (
              <li key={i} className="glass-effect p-5 rounded-2xl border-l-4 border-purple-600 card-shadow hover:card-shadow-hover transition-all duration-300 transform hover:-translate-x-1">
                <div className="inline">
                  <span className="font-semibold text-gray-900">{patent.title}</span>
                  <span className="text-sm text-gray-600 ml-2">
                    ({patent.number}, {patent.year}, {patent.status})
                  </span>
                </div>
                <PublicationLinks pub={patent} />
              </li>
            ))}
          </ol>
        </section>
      )}

      {/* Journal Publications */}
      {data.journals && data.journals.length > 0 && (
        <section>
          <div className="flex items-center gap-3 mb-6">
            <div className="h-1 w-12 bg-gradient-to-r from-purple-600 to-amber-400 rounded-full"></div>
            <h2 className="text-3xl font-bold bg-gradient-to-r from-purple-900 to-purple-700 bg-clip-text text-transparent">
              Journal Publications
            </h2>
            <div className="h-1 flex-1 bg-gradient-to-r from-amber-400 to-transparent rounded-full"></div>
          </div>
          
          <ol className="space-y-4 mt-4 list-decimal list-inside">
            {data.journals.map((pub, i) => (
              <li key={i} className="glass-effect p-5 rounded-2xl border-l-4 border-amber-500 card-shadow hover:card-shadow-hover transition-all duration-300 transform hover:-translate-x-1">
                <div className="inline">
                  <span className="font-semibold text-gray-900">{pub.title}</span>
                  <span className="text-sm text-gray-700 ml-2">
                    {pub.authors}. <em>{pub.journal}</em>, {pub.volume}, pp. {pub.pages}, {pub.year}.
                  </span>
                </div>
                <PublicationLinks pub={pub} />
              </li>
            ))}
          </ol>
        </section>
      )}

      {/* Conference Publications */}
      {data.conferences && data.conferences.length > 0 && (
        <section>
          <div className="flex items-center gap-3 mb-6">
            <div className="h-1 w-12 bg-gradient-to-r from-purple-600 to-amber-400 rounded-full"></div>
            <h2 className="text-3xl font-bold bg-gradient-to-r from-purple-900 to-purple-700 bg-clip-text text-transparent">
              Conference Publications
            </h2>
            <div className="h-1 flex-1 bg-gradient-to-r from-amber-400 to-transparent rounded-full"></div>
          </div>
          
          <ol className="space-y-4 mt-4 list-decimal list-inside">
            {data.conferences.map((conf, i) => (
              <li key={i} className="glass-effect p-5 rounded-2xl border-l-4 border-green-500 card-shadow hover:card-shadow-hover transition-all duration-300 transform hover:-translate-x-1">
                <div className="inline">
                  <span className="font-semibold text-gray-900">{conf.title}</span>
                  <span className="text-sm text-gray-700 ml-2">
                    {conf.authors}. <em>{conf.conference}</em>, {conf.location}, {conf.year}.
                  </span>
                </div>
                <PublicationLinks pub={conf} />
              </li>
            ))}
          </ol>
        </section>
      )}

      {/* Book Chapters */}
      {data.bookChapters && data.bookChapters.length > 0 && (
        <section>
          <div className="flex items-center gap-3 mb-6">
            <div className="h-1 w-12 bg-gradient-to-r from-purple-600 to-amber-400 rounded-full"></div>
            <h2 className="text-3xl font-bold bg-gradient-to-r from-purple-900 to-purple-700 bg-clip-text text-transparent">
              Book Chapters
            </h2>
            <div className="h-1 flex-1 bg-gradient-to-r from-amber-400 to-transparent rounded-full"></div>
          </div>
          
          <ol className="space-y-4 mt-4 list-decimal list-inside">
            {data.bookChapters.map((chapter, i) => (
              <li key={i} className="glass-effect p-5 rounded-2xl border-l-4 border-blue-500 card-shadow hover:card-shadow-hover transition-all duration-300 transform hover:-translate-x-1">
                <div className="inline">
                  <span className="font-semibold text-gray-900">{chapter.title}</span>
                  <span className="text-sm text-gray-700 ml-2">
                    {chapter.authors}. In <em>{chapter.book}</em>, {chapter.publisher}, {chapter.year}.
                  </span>
                </div>
                <PublicationLinks pub={chapter} />
              </li>
            ))}
          </ol>
        </section>
      )}
    </div>
  );
}

export default PublicationsPage;