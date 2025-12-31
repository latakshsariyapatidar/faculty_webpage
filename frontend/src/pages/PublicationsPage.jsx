/**
 * Professional Publications Page Component
 * Clean, compact IEEE-style format with title-linked DOI access
 */

import React, { useState } from 'react';
import { FileText, Award, BookOpen, Users, Filter } from 'lucide-react';

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
  
  // Sort publications by year (newest first)
  const sortByYear = (publications) => {
    if (!publications) return [];
    return [...publications].sort((a, b) => {
      const yearA = parseInt(a.year) || 0;
      const yearB = parseInt(b.year) || 0;
      return yearB - yearA; // Descending order
    });
  };

  const sortedJournals = sortByYear(filteredData.journals);
  const sortedConferences = sortByYear(filteredData.conferences);
  const sortedPatents = sortByYear(filteredData.patents);
  const sortedBookChapters = sortByYear(filteredData.bookChapters);

  // IEEE-style Publication Item - Compact and clickable title
  const PublicationItem = ({ pub, type = 'journal', index }) => {
    const hasDoi = pub.doi && pub.doi.trim() !== '';
    const hasPdf = pub.pdf_link && pub.pdf_link.trim() !== '';
    
    // Generate DOI URL
    const doiUrl = hasDoi ? `https://doi.org/${pub.doi}` : (hasPdf ? pub.pdf_link : null);
    
    // Generate IEEE-style citation
    const generateCitation = () => {
      const parts = [];
      
      // Authors
      if (pub.authors) {
        parts.push(<span key="authors" className="font-medium text-gray-800">{pub.authors}</span>);
      }
      
      // Title - Clickable if DOI or PDF exists
      if (doiUrl) {
        parts.push(
          <a 
            key="title"
            href={doiUrl}
            target="_blank"
            rel="noopener noreferrer"
            className="font-semibold text-blue-700 hover:text-purple-700 hover:underline transition-colors inline"
          >
            "{pub.title}"
          </a>
        );
      } else {
        parts.push(
          <span key="title" className="font-semibold text-gray-900">
            "{pub.title}"
          </span>
        );
      }
      
      // Journal/Conference
      if (pub.journal || pub.conference) {
        parts.push(
          <span key="venue" className="italic text-gray-700">
            {pub.journal || pub.conference}
          </span>
        );
      }
      
      // Volume, Number, Pages
      const volumeInfo = [];
      if (pub.volume && pub.volume !== 'Early Access') {
        volumeInfo.push(`vol. ${pub.volume}`);
      }
      if (pub.number) {
        volumeInfo.push(`no. ${pub.number}`);
      }
      if (pub.pages && pub.pages !== 'PP-PP') {
        volumeInfo.push(`pp. ${pub.pages}`);
      }
      
      if (volumeInfo.length > 0) {
        parts.push(
          <span key="vol" className="text-gray-700">
            {volumeInfo.join(', ')}
          </span>
        );
      }
      
      // Early Access note
      if (pub.volume === 'Early Access') {
        parts.push(
          <span key="early" className="text-amber-600 font-medium">
            Early Access
          </span>
        );
      }
      
      // Year
      if (pub.year) {
        parts.push(
          <span key="year" className="font-medium text-gray-900">
            {pub.year}
          </span>
        );
      }
      
      // Location (for conferences)
      if (pub.location) {
        parts.push(
          <span key="loc" className="text-gray-600">
            {pub.location}
          </span>
        );
      }
      
      // Patent number/status
      if (pub.number && type === 'patent') {
        parts.push(
          <span key="patnum" className="font-mono text-gray-700">
            {pub.number}
          </span>
        );
      }
      if (pub.status && type === 'patent') {
        parts.push(
          <span key="status" className={`font-medium ${
            pub.status.toLowerCase() === 'granted' ? 'text-green-600' : 'text-amber-600'
          }`}>
            {pub.status}
          </span>
        );
      }
      
      return parts.map((part, i) => (
        <React.Fragment key={i}>
          {part}
          {i < parts.length - 1 && <span className="text-gray-500 mx-1">•</span>}
        </React.Fragment>
      ));
    };

    // Determine bullet color based on type
    const getBulletColor = () => {
      switch(type) {
        case 'journal': return 'bg-amber-500';
        case 'conference': return 'bg-green-500';
        case 'patent': return 'bg-purple-500';
        case 'book': return 'bg-blue-500';
        default: return 'bg-gray-500';
      }
    };

    return (
      <div className="flex items-start gap-3 py-3 border-b border-gray-100 last:border-b-0">
        {/* Number/Bullet */}
        <div className="flex-shrink-0">
          <div className={`w-2.5 h-2.5 rounded-full ${getBulletColor()} mt-2.5`}></div>
        </div>
        
        {/* Publication content */}
        <div className="flex-1 min-w-0">
          <div className="text-base leading-relaxed">
            {generateCitation()}
          </div>
        </div>
      </div>
    );
  };

  // Component for a publication section
  const PublicationSection = ({ 
    title, 
    icon: Icon,
    data: sectionData, 
    type,
    hasData,
  }) => {
    if (!hasData || !sectionData || sectionData.length === 0) return null;

    const getColor = () => {
      switch(type) {
        case 'journal': return { 
          bg: 'bg-amber-500', 
          light: 'bg-amber-50', 
          text: 'text-amber-700',
          border: 'border-amber-200'
        };
        case 'conference': return { 
          bg: 'bg-green-500', 
          light: 'bg-green-50', 
          text: 'text-green-700',
          border: 'border-green-200'
        };
        case 'patent': return { 
          bg: 'bg-purple-500', 
          light: 'bg-purple-50', 
          text: 'text-purple-700',
          border: 'border-purple-200'
        };
        case 'book': return { 
          bg: 'bg-blue-500', 
          light: 'bg-blue-50', 
          text: 'text-blue-700',
          border: 'border-blue-200'
        };
        default: return { 
          bg: 'bg-gray-500', 
          light: 'bg-gray-50', 
          text: 'text-gray-700',
          border: 'border-gray-200'
        };
      }
    };

    const colors = getColor();

    return (
      <div className="space-y-4">
        {/* Section header */}
        <div className="flex items-center justify-between mb-2">
          <div className="flex items-center gap-3">
            <div className={`w-10 h-10 rounded-lg ${colors.light} flex items-center justify-center`}>
              <Icon className={`w-5 h-5 ${colors.text}`} />
            </div>
            <div>
              <h2 className="text-lg font-bold text-gray-900">{title}</h2>
            </div>
          </div>
          <span className={`px-3 py-1 ${colors.light} ${colors.text} text-sm font-semibold rounded-lg`}>
            {sectionData.length}
          </span>
        </div>
        
        {/* Publications list */}
        <div className="ml-1">
          {sectionData.map((pub, i) => (
            <PublicationItem key={i} pub={pub} type={type} index={i + 1} />
          ))}
        </div>
      </div>
    );
  };

  // Filter buttons component
  const FilterButtons = () => {
    const filters = [
      { id: 'all', label: 'All', count: totalPublications, icon: Filter, color: 'from-purple-600 to-amber-500' },
      { id: 'journals', label: 'Journals', count: data.journals?.length || 0, icon: FileText, color: 'amber' },
      { id: 'conferences', label: 'Conferences', count: data.conferences?.length || 0, icon: Users, color: 'green' },
      { id: 'patents', label: 'Patents', count: data.patents?.length || 0, icon: Award, color: 'purple' },
      { id: 'books', label: 'Books', count: data.bookChapters?.length || 0, icon: BookOpen, color: 'blue' },
    ];

    return (
      <div className="flex flex-wrap gap-2 mb-6">
        {filters.map(filter => (
          <button
            key={filter.id}
            onClick={() => setActiveFilter(filter.id)}
            className={`flex items-center gap-2 px-4 py-2 rounded-lg text-base font-medium transition-all ${
              activeFilter === filter.id
                ? `bg-gradient-to-r ${filter.id === 'all' ? filter.color : `from-${filter.color}-600 to-${filter.color}-500`} text-white shadow-sm`
                : 'bg-white text-gray-700 border border-gray-300 hover:bg-gray-50'
            }`}
          >
            <filter.icon className="w-4 h-4" />
            {filter.label}
            <span className={`px-2 py-0.5 text-xs rounded ${
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
        <div className="text-center py-12">
          <div className="w-16 h-16 mx-auto mb-4 rounded-full bg-gray-100 flex items-center justify-center">
            <FileText className="w-8 h-8 text-gray-400" />
          </div>
          <h3 className="text-lg font-semibold text-gray-900 mb-2">No Publications</h3>
          <p className="text-gray-500">Publications will appear here once added.</p>
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
        <div className="text-center py-12">
          <div className="w-16 h-16 mx-auto mb-4 rounded-full bg-gray-100 flex items-center justify-center">
            <FileText className="w-8 h-8 text-gray-400" />
          </div>
          <h3 className="text-lg font-semibold text-gray-900 mb-2">No publications found</h3>
          <p className="text-gray-500">Try selecting a different filter</p>
        </div>
      );
    }

    return (
      <div className="space-y-8">
        {/* All sections for 'all' filter, specific section otherwise */}
        {activeFilter === 'all' || activeFilter === 'journals' ? (
          <PublicationSection 
            title="Journal Publications"
            icon={FileText}
            data={sortedJournals}
            type="journal"
            hasData={hasJournals}
          />
        ) : null}

        {activeFilter === 'all' || activeFilter === 'conferences' ? (
          <PublicationSection 
            title="Conference Papers"
            icon={Users}
            data={sortedConferences}
            type="conference"
            hasData={hasConferences}
          />
        ) : null}

        {activeFilter === 'all' || activeFilter === 'patents' ? (
          <PublicationSection 
            title="Patents"
            icon={Award}
            data={sortedPatents}
            type="patent"
            hasData={hasPatents}
          />
        ) : null}

        {activeFilter === 'all' || activeFilter === 'books' ? (
          <PublicationSection 
            title="Book Chapters"
            icon={BookOpen}
            data={sortedBookChapters}
            type="book"
            hasData={hasBookChapters}
          />
        ) : null}
      </div>
    );
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-50 via-white to-purple-50/10">
      <div className="max-w-8xl mx-auto p-4 md:p-6 lg:p-8">
        {/* Header */}
        <div className="mb-8">
          <div className="flex flex-col md:flex-row md:items-center justify-between gap-4 mb-6">
            <div className="flex items-center gap-4">
              <div className="w-12 h-12 rounded-xl bg-gradient-to-br from-purple-600 to-amber-500 flex items-center justify-center shadow-md">
                <FileText className="w-6 h-6 text-white" />
              </div>
              <div>
                <h1 className="text-2xl font-bold text-gray-900">Publications</h1>
                <p className="text-gray-600">Academic research output</p>
              </div>
            </div>
            
            {hasAnyPublications && (
              <div className="text-center md:text-right">
                <div className="text-2xl font-bold text-gray-900">{totalPublications}</div>
                <div className="text-sm text-gray-600">Total Publications</div>
              </div>
            )}
          </div>
        </div>

        {/* Filter Buttons - Only show if we have publications */}
        {hasAnyPublications && <FilterButtons />}

        {/* Main Content */}
        <div className="bg-white rounded-xl border border-gray-200 p-6 lg:p-8">
          {renderContent()}
        </div>

        {/* Summary Footer */}
        {/* {hasAnyPublications && activeFilter === 'all' && (
          <div className="mt-8 pt-6 border-t border-gray-300">
            <div className="bg-gradient-to-r from-purple-50/50 to-amber-50/50 rounded-xl p-5">
              <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
                <div>
                  <h3 className="text-base font-semibold text-gray-900 mb-2">Publication Summary</h3>
                  <div className="flex flex-wrap gap-3 text-sm text-gray-700">
                    {data.journals?.length > 0 && (
                      <span className="flex items-center gap-2 px-3 py-1.5 bg-white rounded-lg border border-amber-200">
                        <div className="w-3 h-3 rounded-full bg-amber-500"></div>
                        <span className="font-medium">{data.journals.length} journals</span>
                      </span>
                    )}
                    {data.conferences?.length > 0 && (
                      <span className="flex items-center gap-2 px-3 py-1.5 bg-white rounded-lg border border-green-200">
                        <div className="w-3 h-3 rounded-full bg-green-500"></div>
                        <span className="font-medium">{data.conferences.length} conferences</span>
                      </span>
                    )}
                    {data.patents?.length > 0 && (
                      <span className="flex items-center gap-2 px-3 py-1.5 bg-white rounded-lg border border-purple-200">
                        <div className="w-3 h-3 rounded-full bg-purple-500"></div>
                        <span className="font-medium">{data.patents.length} patents</span>
                      </span>
                    )}
                    {data.bookChapters?.length > 0 && (
                      <span className="flex items-center gap-2 px-3 py-1.5 bg-white rounded-lg border border-blue-200">
                        <div className="w-3 h-3 rounded-full bg-blue-500"></div>
                        <span className="font-medium">{data.bookChapters.length} books</span>
                      </span>
                    )}
                  </div>
                </div>
                
                <div className="text-center sm:text-right">
                  <div className="text-2xl font-bold text-gray-900">{totalPublications}</div>
                  <div className="text-sm text-gray-600">Total Publications</div>
                </div>
              </div>
            </div>
          </div>
        )} */}
      </div>
    </div>
  );
}

export default PublicationsPage;