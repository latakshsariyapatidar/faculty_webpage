/**
 * Resources Page Component
 * Displays academic resources and drive links shared by the professor
 */

import React, { useState } from 'react';
import { FolderOpen, ExternalLink, Calendar, Tag, Search, Grid, List, FileText } from 'lucide-react';

function ResourcesPage({ data }) {
  const [searchTerm, setSearchTerm] = useState('');
  const [selectedCategory, setSelectedCategory] = useState('all');
  const [viewMode, setViewMode] = useState('grid'); // 'grid' or 'list'

  if (!data || data.length === 0) {
    return (
      <div className="max-w-6xl mx-auto px-4 py-16">
        <div className="text-center">
          <FolderOpen className="w-16 h-16 text-gray-300 mx-auto mb-4" />
          <h2 className="text-2xl font-bold text-gray-700 mb-2">No Resources Available</h2>
          <p className="text-gray-500">Check back later for academic resources and materials.</p>
        </div>
      </div>
    );
  }

  // Get unique categories
  const categories = ['all', ...new Set(data.map(r => r.category).filter(Boolean))];

  // Filter resources based on search and category
  const filteredResources = data.filter(resource => {
    const matchesSearch = 
      resource.title?.toLowerCase().includes(searchTerm.toLowerCase()) ||
      resource.description?.toLowerCase().includes(searchTerm.toLowerCase()) ||
      resource.category?.toLowerCase().includes(searchTerm.toLowerCase());
    
    const matchesCategory = selectedCategory === 'all' || resource.category === selectedCategory;
    
    return matchesSearch && matchesCategory;
  });

  return (
    <div className="max-w-7xl mx-auto px-4 py-8">
      {/* Header */}
      <div className="mb-8">
        <h1 className="text-4xl font-bold text-gray-800 mb-3 flex items-center gap-3">
          <FolderOpen className="w-10 h-10 text-blue-600" />
          Resources
        </h1>
        <p className="text-gray-600 text-lg">
          Academic resources, course materials, and useful links
        </p>
      </div>

      {/* Search and Filter Controls */}
      <div className="mb-6 space-y-4">
        {/* Search Bar */}
        <div className="relative">
          <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 w-5 h-5" />
          <input
            type="text"
            placeholder="Search resources..."
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            className="w-full pl-10 pr-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
          />
        </div>

        {/* Category Filters and View Toggle */}
        <div className="flex flex-wrap items-center justify-between gap-4">
          <div className="flex flex-wrap gap-2">
            {categories.map(category => (
              <button
                key={category}
                onClick={() => setSelectedCategory(category)}
                className={`px-4 py-2 rounded-lg font-medium transition-all ${
                  selectedCategory === category
                    ? 'bg-blue-600 text-white shadow-md'
                    : 'bg-gray-100 text-gray-700 hover:bg-gray-200'
                }`}
              >
                {category === 'all' ? 'All Resources' : category}
              </button>
            ))}
          </div>

          {/* View Mode Toggle */}
          <div className="flex gap-2 bg-gray-100 rounded-lg p-1">
            <button
              onClick={() => setViewMode('grid')}
              className={`p-2 rounded ${
                viewMode === 'grid'
                  ? 'bg-white text-blue-600 shadow'
                  : 'text-gray-600 hover:text-gray-800'
              }`}
              aria-label="Grid view"
            >
              <Grid className="w-5 h-5" />
            </button>
            <button
              onClick={() => setViewMode('list')}
              className={`p-2 rounded ${
                viewMode === 'list'
                  ? 'bg-white text-blue-600 shadow'
                  : 'text-gray-600 hover:text-gray-800'
              }`}
              aria-label="List view"
            >
              <List className="w-5 h-5" />
            </button>
          </div>
        </div>
      </div>

      {/* Results Count */}
      <div className="mb-4 text-gray-600">
        {filteredResources.length} {filteredResources.length === 1 ? 'resource' : 'resources'} found
      </div>

      {/* Resources Display */}
      {filteredResources.length === 0 ? (
        <div className="text-center py-12">
          <FileText className="w-16 h-16 text-gray-300 mx-auto mb-4" />
          <p className="text-gray-500 text-lg">No resources match your search criteria.</p>
        </div>
      ) : viewMode === 'grid' ? (
        /* Grid View */
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {filteredResources.map((resource, index) => (
            <div
              key={index}
              className="bg-white border border-gray-200 rounded-lg p-6 hover:shadow-lg transition-all duration-300 hover:-translate-y-1"
            >
              {/* Category Badge */}
              {resource.category && (
                <div className="flex items-center gap-2 mb-3">
                  <Tag className="w-4 h-4 text-blue-600" />
                  <span className="text-sm font-medium text-blue-600 bg-blue-50 px-2 py-1 rounded">
                    {resource.category}
                  </span>
                </div>
              )}

              {/* Title */}
              <h3 className="text-xl font-bold text-gray-800 mb-2">
                {resource.title || 'Untitled Resource'}
              </h3>

              {/* Description */}
              {resource.description && (
                <p className="text-gray-600 mb-4 line-clamp-3">
                  {resource.description}
                </p>
              )}

              {/* Date */}
              {resource.date && (
                <div className="flex items-center gap-2 text-sm text-gray-500 mb-4">
                  <Calendar className="w-4 h-4" />
                  <span>{resource.date}</span>
                </div>
              )}

              {/* Link Button */}
              {resource.link && (
                <a
                  href={resource.link}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="inline-flex items-center gap-2 bg-blue-600 text-white px-4 py-2 rounded-lg hover:bg-blue-700 transition-colors w-full justify-center font-medium"
                >
                  <ExternalLink className="w-4 h-4" />
                  Access Resource
                </a>
              )}
            </div>
          ))}
        </div>
      ) : (
        /* List View */
        <div className="space-y-4">
          {filteredResources.map((resource, index) => (
            <div
              key={index}
              className="bg-white border border-gray-200 rounded-lg p-6 hover:shadow-md transition-all duration-300"
            >
              <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-4">
                <div className="flex-1">
                  <div className="flex items-start gap-3 mb-2">
                    <FileText className="w-5 h-5 text-blue-600 mt-1 flex-shrink-0" />
                    <div>
                      <h3 className="text-xl font-bold text-gray-800 mb-1">
                        {resource.title || 'Untitled Resource'}
                      </h3>
                      {resource.description && (
                        <p className="text-gray-600 mb-2">
                          {resource.description}
                        </p>
                      )}
                      <div className="flex flex-wrap items-center gap-4 text-sm">
                        {resource.category && (
                          <div className="flex items-center gap-1">
                            <Tag className="w-4 h-4 text-blue-600" />
                            <span className="text-blue-600 font-medium">{resource.category}</span>
                          </div>
                        )}
                        {resource.date && (
                          <div className="flex items-center gap-1 text-gray-500">
                            <Calendar className="w-4 h-4" />
                            <span>{resource.date}</span>
                          </div>
                        )}
                      </div>
                    </div>
                  </div>
                </div>
                {resource.link && (
                  <a
                    href={resource.link}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="inline-flex items-center gap-2 bg-blue-600 text-white px-6 py-3 rounded-lg hover:bg-blue-700 transition-colors font-medium whitespace-nowrap"
                  >
                    <ExternalLink className="w-4 h-4" />
                    Access
                  </a>
                )}
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  );
}

export default ResourcesPage;
