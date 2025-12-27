/**
 * Professional Publications Page Component
 * Clean filter system - no empty columns when filtering
 */

import React, { useState } from 'react';
import { FileText, ExternalLink, Download, Award, BookOpen, Users, Filter } from 'lucide-react';

function PublicationsPage({ data }) {
  const [activeFilter, setActiveFilter] = useState('all');
  
  // Calculate totals from actual data
  const totalPublications = (data.patents?.length || 0) + (data.journals?.length || 0) + (data.conferences?.length || 0) + (data.bookChapters?.length || 0);
  
  // Check if we have any data at all
  const hasAnyPublications = totalPublications > 0;
  
  // Filter publications based on active filter
  const getFilteredPublications = () => {
    switch(activeFilter) {
      case 'patents':
        return { patents: data.patents || [] };
      case 'journals':
        return { journals: data.journals || [] };
      case 'conferences':
        return { conferences: data.conferences || [] };
      case 'books':
        return { bookChapters: data.bookChapters || [] };
      default:
        return {
          patents: data.patents || [],
          journals: data.journals || [],
          conferences: data.conferences || [],
          bookChapters: data.bookChapters || []
        };
    }
  };

  const filteredData = getFilteredPublications();
  
  // Check what data we have in filtered results
  const hasJournals = filteredData.journals?.length > 0;
  const hasPatents = filteredData.patents?.length > 0;
  const hasConferences = filteredData.conferences?.length > 0;
  const hasBookChapters = filteredData.bookChapters?.length > 0;
  
  // Check if we need two columns (only for "all" filter with multiple types)
  const showTwoColumns = activeFilter === 'all' && 
    ((hasJournals && hasConferences) || 
     (hasJournals && hasBookChapters) || 
     (hasPatents && hasConferences) || 
     (hasPatents && hasBookChapters));

  // Function to render publication links only if they exist
  const PublicationLinks = ({ pub }) => {
    const hasPdf = pub.pdf_link && pub.pdf_link.trim() !== '';
    const hasExternal = pub.external_link && pub.external_link.trim() !== '';
    const hasDoi = pub.doi && pub.doi.trim() !== '';
    
    if (!hasPdf && !hasExternal && !hasDoi) return null;
    
    return (
      <div className="flex flex-wrap gap-2 mt-3">
        {hasPdf && (
          <a
            href={pub.pdf_link}
            target="_blank"
            rel="noopener noreferrer"
            className="inline-flex items-center gap-1.5 px-3 py-1.5 bg-gradient-to-r from-purple-600 to-purple-700 text-white text-xs font-medium rounded-lg hover:from-purple-700 hover:to-purple-800 transition-all duration-200"
          >
            <Download className="w-3.5 h-3.5" /> PDF
          </a>
        )}
        {hasExternal && (
          <a
            href={pub.external_link}
            target="_blank"
            rel="noopener noreferrer"
            className="inline-flex items-center gap-1.5 px-3 py-1.5 bg-gradient-to-r from-amber-600 to-amber-700 text-white text-xs font-medium rounded-lg hover:from-amber-700 hover:to-amber-800 transition-all duration-200"
          >
            <ExternalLink className="w-3.5 h-3.5" /> View
          </a>
        )}
        {hasDoi && (
          <a
            href={`https://doi.org/${pub.doi}`}
            target="_blank"
            rel="noopener noreferrer"
            className="inline-flex items-center gap-1.5 px-3 py-1.5 bg-gradient-to-r from-gray-600 to-gray-700 text-white text-xs font-medium rounded-lg hover:from-gray-700 hover:to-gray-800 transition-all duration-200"
          >
            <FileText className="w-3.5 h-3.5" /> DOI
          </a>
        )}
      </div>
    );
  };

  // Group publications by year, only if they exist
  const groupByYear = (publications) => {
    if (!publications || publications.length === 0) return {};
    
    return publications.reduce((groups, pub) => {
      const year = pub.year || 'Unknown';
      if (!groups[year]) groups[year] = [];
      groups[year].push(pub);
      return groups;
    }, {});
  };

  const journalGroups = groupByYear(filteredData.journals);
  const conferenceGroups = groupByYear(filteredData.conferences);
  const patentGroups = groupByYear(filteredData.patents);
  const bookChapterGroups = groupByYear(filteredData.bookChapters);

  // Component for displaying a publication
  const PublicationItem = ({ pub, type = 'journal' }) => {
    const getBorderColor = () => {
      switch(type) {
        case 'journal': return 'border-l-amber-600';
        case 'conference': return 'border-l-green-600';
        case 'patent': return 'border-l-purple-600';
        case 'book': return 'border-l-blue-600';
        default: return 'border-l-gray-600';
      }
    };

    return (
      <div className={`bg-white rounded-lg border ${getBorderColor()} border-l-4 p-4 hover:shadow-md transition-shadow duration-200`}>
        <h3 className="font-medium text-gray-900 leading-tight mb-2">
          {pub.title}
        </h3>
        
        {pub.authors && (
          <p className="text-sm text-gray-700 mb-2">
            {pub.authors}
          </p>
        )}
        
        <div className="flex flex-wrap items-center gap-2 text-xs text-gray-500 mb-2">
          {(pub.journal || pub.conference) && (
            <span className="italic">
              {pub.journal || pub.conference}
            </span>
          )}
          
          {(pub.volume || pub.pages) && (
            <span>
              {pub.volume && `Vol. ${pub.volume}`}
              {pub.volume && pub.pages && ', '}
              {pub.pages && `pp. ${pub.pages}`}
            </span>
          )}
          
          {pub.number && (
            <span className="font-mono bg-gray-100 px-2 py-0.5 rounded">
              {pub.number}
            </span>
          )}
          
          {pub.location && (
            <span className="flex items-center gap-1">
              <svg className="w-3 h-3" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M17.657 16.657L13.414 20.9a1.998 1.998 0 01-2.827 0l-4.244-4.243a8 8 0 1111.314 0z" />
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M15 11a3 3 0 11-6 0 3 3 0 016 0z" />
              </svg>
              {pub.location}
            </span>
          )}
          
          {pub.status && (
            <span className={`px-2 py-0.5 rounded-full text-xs font-medium ${
              pub.status.toLowerCase() === 'granted' 
                ? 'bg-green-100 text-green-700 border border-green-200'
                : 'bg-gray-100 text-gray-700 border border-gray-200'
            }`}>
              {pub.status}
            </span>
          )}
        </div>
        
        {pub.year && (
          <div className="text-xs text-gray-600 mb-2">
            {pub.year}
          </div>
        )}
        
        <PublicationLinks pub={pub} />
      </div>
    );
  };

  // Component for a year section
  const PublicationYearSection = ({ year, publications, type = 'journal' }) => {
    if (!publications || publications.length === 0) return null;

    const getBadgeColor = () => {
      switch(type) {
        case 'journal': return 'bg-gradient-to-r from-amber-100 to-amber-50 text-amber-800 border border-amber-200';
        case 'conference': return 'bg-gradient-to-r from-green-100 to-green-50 text-green-800 border border-green-200';
        case 'patent': return 'bg-gradient-to-r from-purple-100 to-purple-50 text-purple-800 border border-purple-200';
        case 'book': return 'bg-gradient-to-r from-blue-100 to-blue-50 text-blue-800 border border-blue-200';
        default: return 'bg-gray-100 text-gray-800 border border-gray-200';
      }
    };

    return (
      <div className="space-y-3">
        <div className="flex items-center gap-3">
          <div className="h-px flex-1 bg-gray-300"></div>
          <div className={`px-3 py-1.5 rounded-lg text-sm font-semibold ${getBadgeColor()}`}>
            {year} • {publications.length} {type}{publications.length !== 1 ? 's' : ''}
          </div>
          <div className="h-px flex-1 bg-gray-300"></div>
        </div>
        
        <div className="space-y-3">
          {publications.map((pub, i) => (
            <PublicationItem key={i} pub={pub} type={type} />
          ))}
        </div>
      </div>
    );
  };

  // Component for a publication section
  const PublicationSection = ({ 
    title, 
    data: sectionData, 
    type,
    hasData,
    groups,
  }) => {
    if (!hasData) return null;

    const getColor = () => {
      switch(type) {
        case 'journal': return { bg: 'bg-amber-500', text: 'text-amber-700' };
        case 'conference': return { bg: 'bg-green-500', text: 'text-green-700' };
        case 'patent': return { bg: 'bg-purple-500', text: 'text-purple-700' };
        case 'book': return { bg: 'bg-blue-500', text: 'text-blue-700' };
        default: return { bg: 'bg-gray-500', text: 'text-gray-700' };
      }
    };

    const colors = getColor();

    return (
      <div className="space-y-4">
        <div className="relative">
          <div className={`absolute -left-3 top-0 bottom-0 w-1 ${colors.bg} rounded-full`}></div>
          <div className="ml-4">
            <div className="flex items-center gap-2 mb-3">
              <div className={`w-3 h-3 rounded-full ${colors.bg}`}></div>
              <h2 className="text-lg font-bold text-gray-900">{title}</h2>
              {sectionData.length > 0 && (
                <span className={`px-2 py-0.5 ${colors.bg.replace('bg-', 'bg-')}/10 ${colors.text} text-xs font-semibold rounded-full`}>
                  {sectionData.length}
                </span>
              )}
            </div>
          </div>
        </div>
        
        <div className="space-y-4">
          {Object.keys(groups)
            .sort((a, b) => b.localeCompare(a))
            .map(year => (
              <PublicationYearSection 
                key={year} 
                year={year} 
                publications={groups[year]} 
                type={type}
              />
            ))
          }
        </div>
      </div>
    );
  };

  // Filter buttons component
  const FilterButtons = () => {
    const filters = [
      { id: 'all', label: 'All', count: totalPublications, color: 'bg-gradient-to-r from-purple-600 to-amber-500' },
      { id: 'journals', label: 'Journals', count: data.journals?.length || 0, color: 'bg-amber-600' },
      { id: 'conferences', label: 'Conferences', count: data.conferences?.length || 0, color: 'bg-green-600' },
      { id: 'patents', label: 'Patents', count: data.patents?.length || 0, color: 'bg-purple-600' },
      { id: 'books', label: 'Book Chapters', count: data.bookChapters?.length || 0, color: 'bg-blue-600' },
    ];

    return (
      <div className="flex flex-wrap gap-2 mb-6">
        {filters.map(filter => (
          <button
            key={filter.id}
            onClick={() => setActiveFilter(filter.id)}
            className={`flex items-center gap-2 px-3 py-2 rounded-lg text-sm font-medium transition-all ${
              activeFilter === filter.id
                ? `${filter.color} text-white shadow-md`
                : 'bg-white text-gray-700 border border-gray-300 hover:bg-gray-50'
            }`}
          >
            {filter.id === 'all' && <Filter className="w-3.5 h-3.5" />}
            {filter.label}
            <span className={`px-1.5 py-0.5 text-xs rounded-full ${
              activeFilter === filter.id
                ? 'bg-white/20 text-white'
                : 'bg-gray-100 text-gray-700'
            }`}>
              {filter.count}
            </span>
          </button>
        ))}
      </div>
    );
  };

  // Render content based on filter
  const renderContent = () => {
    if (!hasAnyPublications) {
      return (
        <div className="text-center py-12 px-4">
          <div className="w-16 h-16 mx-auto mb-4 rounded-full bg-gradient-to-br from-gray-100 to-gray-200 flex items-center justify-center">
            <FileText className="w-8 h-8 text-gray-400" />
          </div>
          <h3 className="text-lg font-semibold text-gray-900 mb-2">No Publications</h3>
        </div>
      );
    }

    // Check if current filter has any data
    const currentFilterHasData = 
      (activeFilter === 'all' && totalPublications > 0) ||
      (activeFilter === 'journals' && hasJournals) ||
      (activeFilter === 'conferences' && hasConferences) ||
      (activeFilter === 'patents' && hasPatents) ||
      (activeFilter === 'books' && hasBookChapters);

    if (!currentFilterHasData) {
      return (
        <div className="text-center py-12 px-4">
          <div className="w-16 h-16 mx-auto mb-4 rounded-full bg-gradient-to-br from-gray-100 to-gray-200 flex items-center justify-center">
            <FileText className="w-8 h-8 text-gray-400" />
          </div>
          <h3 className="text-lg font-semibold text-gray-900 mb-2">No publications found</h3>
          <p className="text-gray-600">Try selecting a different filter</p>
        </div>
      );
    }

    // Show two columns only for "all" filter with multiple types
    if (showTwoColumns) {
      return (
        <div className="grid lg:grid-cols-2 gap-6">
          {/* Left Column */}
          <div className="space-y-6">
            {hasJournals && (
              <PublicationSection 
                title="Journal Publications"
                data={filteredData.journals}
                type="journal"
                hasData={hasJournals}
                groups={journalGroups}
              />
            )}
            
            {hasPatents && (
              <PublicationSection 
                title="Patents"
                data={filteredData.patents}
                type="patent"
                hasData={hasPatents}
                groups={patentGroups}
              />
            )}
          </div>
          
          {/* Right Column */}
          <div className="space-y-6">
            {hasConferences && (
              <PublicationSection 
                title="Conference Papers"
                data={filteredData.conferences}
                type="conference"
                hasData={hasConferences}
                groups={conferenceGroups}
              />
            )}
            
            {hasBookChapters && (
              <PublicationSection 
                title="Book Chapters"
                data={filteredData.bookChapters}
                type="book"
                hasData={hasBookChapters}
                groups={bookChapterGroups}
              />
            )}
          </div>
        </div>
      );
    }

    // Single column layout for specific filters or when only one type exists
    return (
      <div className="mx-auto">
        <div className="space-y-6">
          {hasJournals && (
            <PublicationSection 
              title="Journal Publications"
              data={filteredData.journals}
              type="journal"
              hasData={hasJournals}
              groups={journalGroups}
            />
          )}
          
          {hasPatents && (
            <PublicationSection 
              title="Patents"
              data={filteredData.patents}
              type="patent"
              hasData={hasPatents}
              groups={patentGroups}
            />
          )}
          
          {hasConferences && (
            <PublicationSection 
              title="Conference Papers"
              data={filteredData.conferences}
              type="conference"
              hasData={hasConferences}
              groups={conferenceGroups}
            />
          )}
          
          {hasBookChapters && (
            <PublicationSection 
              title="Book Chapters"
              data={filteredData.bookChapters}
              type="book"
              hasData={hasBookChapters}
              groups={bookChapterGroups}
            />
          )}
        </div>
      </div>
    );
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-50 via-white to-purple-50/20">
      <div className="max-w-7xl mx-auto p-4 md:p-6">
        {/* Header */}
        <div className="mb-6">
          <div className="flex flex-col md:flex-row md:items-center justify-between gap-4 mb-4">
            <div>
              <div className="flex items-center gap-3 mb-3">
                <div className="relative">
                  <div className="w-10 h-10 rounded-lg bg-gradient-to-br from-purple-600 to-amber-500 flex items-center justify-center shadow-md">
                    <FileText className="w-5 h-5 text-white" />
                  </div>
                </div>
                <div>
                  <h1 className="text-2xl font-bold bg-gradient-to-r from-purple-900 via-purple-700 to-amber-600 bg-clip-text text-transparent">
                    Publications
                  </h1>
                </div>
              </div>
            </div>
            
            {hasAnyPublications && (
              <div className="flex gap-3">
                <div className="bg-white p-3 rounded-lg border border-purple-200 shadow-sm">
                  <div className="text-lg font-bold text-purple-700">{totalPublications}</div>
                  <div className="text-xs text-gray-600">Total</div>
                </div>
              </div>
            )}
          </div>
        </div>

        {/* Filter Buttons - Only show if we have publications */}
        {hasAnyPublications && <FilterButtons />}

        {/* Main Content */}
        {renderContent()}

        {/* Summary Footer */}
        {hasAnyPublications && (
          <div className="mt-8 pt-6 border-t border-gray-200">
            <div className="bg-gradient-to-r from-purple-50/30 to-amber-50/30 rounded-xl p-4">
              <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3">
                <div>
                  <h3 className="text-sm font-semibold text-gray-900 mb-1">Summary</h3>
                  <div className="flex flex-wrap gap-3 text-sm text-gray-700">
                    {data.journals?.length > 0 && (
                      <span className="flex items-center gap-1">
                        <div className="w-2 h-2 rounded-full bg-amber-500"></div>
                        {data.journals.length} journals
                      </span>
                    )}
                    {data.conferences?.length > 0 && (
                      <span className="flex items-center gap-1">
                        <div className="w-2 h-2 rounded-full bg-green-500"></div>
                        {data.conferences.length} conferences
                      </span>
                    )}
                    {data.patents?.length > 0 && (
                      <span className="flex items-center gap-1">
                        <div className="w-2 h-2 rounded-full bg-purple-500"></div>
                        {data.patents.length} patents
                      </span>
                    )}
                    {data.bookChapters?.length > 0 && (
                      <span className="flex items-center gap-1">
                        <div className="w-2 h-2 rounded-full bg-blue-500"></div>
                        {data.bookChapters.length} chapters
                      </span>
                    )}
                  </div>
                </div>
                
                <div className="text-right">
                  <div className="text-md font-bold text-gray-900">
                    {totalPublications} publications
                  </div>
                </div>
              </div>
            </div>
          </div>
        )}
      </div>
    </div>
  );
}

export default PublicationsPage;