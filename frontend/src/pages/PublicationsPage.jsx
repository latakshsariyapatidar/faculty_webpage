/**
 * Professional Publications Page Component
 * Clean, compact IEEE-style format with title-linked DOI access
 */

import React, { useState, useMemo } from 'react';
import { FileText, Award, BookOpen, Users, Filter, Calendar, Grid, List } from 'lucide-react';

function PublicationsPage({ data, facultyData = {} }) {
  const [activeFilter, setActiveFilter] = useState('all');
  const [viewMode, setViewMode] = useState('type'); // 'type' or 'year'
  
  // Get professor name for highlighting
  const professorName = facultyData?.personalInfo?.name || '';
  const professorLastName = professorName.split(' ').pop() || '';

  // Calculate totals from actual data
  const totalPublications = (data.patents?.length || 0) + (data.journals?.length || 0) + (data.conferences?.length || 0) + (data.bookChapters?.length || 0);
  
  // Check if we have any data at all
  const hasAnyPublications = totalPublications > 0;
  
  // Get all publications combined for year grouping
  const allPublications = useMemo(() => {
    if (!data) return [];
    
    const all = [];
    
    // Add all publications with their type
    [...(data.journals || [])].forEach(journal => {
      all.push({ ...journal, type: 'journal', typeLabel: 'Journal' });
    });
    
    [...(data.conferences || [])].forEach(conference => {
      all.push({ ...conference, type: 'conference', typeLabel: 'Conference' });
    });
    
    [...(data.patents || [])].forEach(patent => {
      all.push({ ...patent, type: 'patent', typeLabel: 'Patent' });
    });
    
    [...(data.bookChapters || [])].forEach(book => {
      all.push({ ...book, type: 'book', typeLabel: 'Book Chapter' });
    });
    
    // Sort by year (newest first), then by title
    return all.sort((a, b) => {
      const yearA = parseInt(a.year) || 0;
      const yearB = parseInt(b.year) || 0;
      if (yearB !== yearA) return yearB - yearA;
      return (a.title || '').localeCompare(b.title || '');
    });
  }, [data]);

  // Get all unique years from all publications (for year grouping)
  const allYears = useMemo(() => {
    const years = new Set();
    allPublications.forEach(pub => {
      if (pub.year) {
        years.add(parseInt(pub.year));
      }
    });
    // Sort years in descending order
    return Array.from(years).sort((a, b) => b - a);
  }, [allPublications]);

  // Group publications by year for year view
  const publicationsByYear = useMemo(() => {
    const grouped = {};
    
    allPublications.forEach(pub => {
      const year = pub.year || 'Unknown';
      if (!grouped[year]) {
        grouped[year] = [];
      }
      grouped[year].push(pub);
    });
    
    // Sort years descending
    const sortedYears = Object.keys(grouped).sort((a, b) => {
      if (a === 'Unknown') return 1;
      if (b === 'Unknown') return -1;
      return parseInt(b) - parseInt(a);
    });
    
    // Create array of {year, publications}
    return sortedYears.map(year => ({
      year,
      publications: grouped[year]
    }));
  }, [allPublications]);

  // Filter publications based on active filter (for type view)
  const getFilteredPublications = useMemo(() => {
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
  }, [data, activeFilter]);

  const filteredData = getFilteredPublications;
  
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

  // Highlight professor's name in author list
  const highlightProfessorName = (authors) => {
    if (!authors || !professorLastName) return authors;
    
    // Create a regex that matches the professor's last name (case insensitive)
    const regex = new RegExp(`\\b(${professorLastName})\\b`, 'gi');
    
    // Split the authors string and highlight matches
    const parts = authors.split(regex);
    
    return parts.map((part, index) => {
      // If this part matches the professor's last name (case-insensitive check)
      if (part.toLowerCase() === professorLastName.toLowerCase()) {
        return (
          <span key={index} className="font-bold text-purple-700 bg-purple-50 px-1 rounded">
            {part}
          </span>
        );
      }
      return part;
    });
  };

  // IEEE-style Publication Item - Compact and clickable title
  const PublicationItem = ({ pub, type = 'journal', index, showTypeBadge = false }) => {
    const hasDoi = pub.doi && pub.doi.trim() !== '';
    const hasPdf = pub.pdf_link && pub.pdf_link.trim() !== '';
    
    // Generate DOI URL
    const doiUrl = hasDoi ? `https://doi.org/${pub.doi}` : (hasPdf ? pub.pdf_link : null);
    
    // Generate IEEE-style citation
    const generateCitation = () => {
      const parts = [];
      
      // Authors with highlighted professor name
      if (pub.authors) {
        parts.push(
          <span key="authors" className="text-gray-800">
            {highlightProfessorName(pub.authors)}
          </span>
        );
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
          {i < parts.length - 1 && <span className="text-gray-400 mx-1">•</span>}
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

    // Get type badge color
    const getTypeBadgeColor = () => {
      switch(type) {
        case 'journal': return 'bg-amber-100 text-amber-700 border-amber-200';
        case 'conference': return 'bg-green-100 text-green-700 border-green-200';
        case 'patent': return 'bg-purple-100 text-purple-700 border-purple-200';
        case 'book': return 'bg-blue-100 text-blue-700 border-blue-200';
        default: return 'bg-gray-100 text-gray-700 border-gray-200';
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
          {showTypeBadge && (
            <div className="mb-1">
              <span className={`inline-flex items-center px-2 py-0.5 text-xs font-medium rounded border ${getTypeBadgeColor()}`}>
                {pub.typeLabel || type}
              </span>
            </div>
          )}
          <div className="text-base leading-relaxed">
            {generateCitation()}
          </div>
        </div>
      </div>
    );
  };

  // Component for a publication section (in type view)
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
          <span className={`px-3 py-1 ${colors.light} ${colors.text} text-sm font-semibold rounded-lg border ${colors.border} `}>
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

  // Component for year grouping view
  const YearGroupSection = ({ year, publications }) => {
    return (
      <div className="space-y-4">
        {/* Year header */}
        <div className="flex items-center gap-3 mb-2">
          <div className="w-10 h-10 rounded-lg bg-purple-100 flex items-center justify-center">
            <Calendar className="w-5 h-5 text-purple-600" />
          </div>
          <div>
            <h2 className="text-xl font-bold text-gray-900">{year}</h2>
            <p className="text-sm text-gray-600">
              {publications.length} publication{publications.length !== 1 ? 's' : ''}
            </p>
          </div>
        </div>
        
        {/* Publications list for this year */}
        <div className="ml-1">
          {publications.map((pub, i) => (
            <PublicationItem 
              key={i} 
              pub={pub} 
              type={pub.type} 
              index={i + 1} 
              showTypeBadge={true}
            />
          ))}
        </div>
      </div>
    );
  };

  // Filter buttons component
  const FilterButtons = () => {
    const filters = [
      { id: 'all', label: 'All', count: totalPublications, icon: Filter, color: 'purple' },
      { id: 'journals', label: 'Journals', count: data.journals?.length || 0, icon: FileText, color: 'amber' },
      { id: 'conferences', label: 'Conferences', count: data.conferences?.length || 0, icon: Users, color: 'green' },
      { id: 'patents', label: 'Patents', count: data.patents?.length || 0, icon: Award, color: 'purple' },
      { id: 'books', label: 'Books', count: data.bookChapters?.length || 0, icon: BookOpen, color: 'blue' },
    ];

    // Get the active filter's color for styling
    const getActiveFilterStyle = (filterId, filterColor) => {
      if (activeFilter !== filterId) {
        return 'bg-white text-gray-700 border border-gray-300 hover:bg-gray-50';
      }
      
      // Return gradient for 'all', solid color for others
      if (filterId === 'all') {
        return 'bg-purple-600 text-white shadow-sm';
      }
      
      // Fixed colors for specific filters
      const colorMap = {
        'amber': 'bg-amber-600 text-white',
        'green': 'bg-green-600 text-white',
        'purple': 'bg-purple-600 text-white',
        'blue': 'bg-blue-600 text-white'
      };
      
      return `${colorMap[filterColor] || 'bg-gray-600 text-white'} shadow-sm`;
    };

    return (
      <div className="space-y-4 mb-6">
        {/* View Mode Toggle */}
        <div className="flex flex-wrap items-center justify-between gap-4">
          <div className="flex items-center gap-2">
            <span className="text-sm font-medium text-gray-700">View:</span>
            <div className="flex bg-gray-100 rounded-lg p-1">
              <button
                onClick={() => setViewMode('type')}
                className={`px-3 py-1.5 rounded text-sm font-medium transition-all ${
                  viewMode === 'type'
                    ? 'bg-white text-purple-600 shadow-sm'
                    : 'text-gray-600 hover:text-gray-800'
                }`}
              >
                <div className="flex items-center gap-1.5">
                  <Grid className="w-4 h-4" />
                  <span>By Type</span>
                </div>
              </button>
              <button
                onClick={() => setViewMode('year')}
                className={`px-3 py-1.5 rounded text-sm font-medium transition-all ${
                  viewMode === 'year'
                    ? 'bg-white text-purple-600 shadow-sm'
                    : 'text-gray-600 hover:text-gray-800'
                }`}
              >
                <div className="flex items-center gap-1.5">
                  <Calendar className="w-4 h-4" />
                  <span>By Year</span>
                </div>
              </button>
            </div>
          </div>
          
          {viewMode === 'type' && (
            <div className="text-sm text-gray-600">
              Showing: <span className="font-medium text-gray-900">
                {activeFilter === 'all' ? 'All Types' : 
                 activeFilter === 'journals' ? 'Journals' :
                 activeFilter === 'conferences' ? 'Conferences' :
                 activeFilter === 'patents' ? 'Patents' : 'Book Chapters'}
              </span>
            </div>
          )}
          {viewMode === 'year' && (
            <div className="text-sm text-gray-600">
              Grouped by: <span className="font-medium text-gray-900">Year</span>
            </div>
          )}
        </div>

        {/* Type Filter Buttons (only show in type view) */}
        {viewMode === 'type' && (
          <div className="flex flex-wrap gap-2">
            {filters.map(filter => (
              <button
                key={filter.id}
                onClick={() => setActiveFilter(filter.id)}
                className={`flex items-center gap-2 px-4 py-2 rounded-lg text-base font-medium transition-all ${getActiveFilterStyle(filter.id, filter.color)}`}
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
        )}
      </div>
    );
  };

  // Render content based on view mode
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

    // YEAR VIEW MODE
    if (viewMode === 'year') {
      return (
        <div className="space-y-8">
          {publicationsByYear.map((yearGroup, index) => (
            <YearGroupSection 
              key={index}
              year={yearGroup.year}
              publications={yearGroup.publications}
            />
          ))}
        </div>
      );
    }

    // TYPE VIEW MODE
    // Check if current filter has any data
    const currentFilterHasData = 
      (activeFilter === 'all' && (hasJournals || hasConferences || hasPatents || hasBookChapters)) ||
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
          <h3 className="text-lg font-semibold text-gray-900 mb-2">
            No {activeFilter === 'all' ? 'publications' : activeFilter} found
          </h3>
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
    <div className="w-full min-h-screen bg-gray-50">
      <div className="w-full mx-auto p-4 md:p-6 lg:p-8">
        {/* Header */}
        <div className="mb-8">
          <div className="flex flex-col md:flex-row md:items-center justify-between gap-4 mb-6">
            <div className="flex items-center gap-4">
              <div className="w-12 h-12 rounded-xl bg-purple-600 flex items-center justify-center shadow-md">
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
      </div>
    </div>
  );
}

export default PublicationsPage;