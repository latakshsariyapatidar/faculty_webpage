/**
 * News Page Component
 * 
 * Displays faculty member's news and announcements in a scrolling format.
 * Each news item is displayed in a card with smooth scrolling animation.
 * 
 * @module pages/NewsPage
 */

import React from 'react';
import { Newspaper } from 'lucide-react';

/**
 * News page component
 * 
 * @param {Object} props
 * @param {Array<string>} props.data - Array of news items
 * @returns {JSX.Element}
 */
function NewsPage({ data }) {
  // Handle case when no news data is available
  if (!data || data.length === 0) {
    return (
      <div className="flex flex-col items-center justify-center min-h-[400px] text-gray-500">
        <Newspaper size={64} className="mb-4 opacity-50" />
        <p className="text-lg">No news available at the moment.</p>
      </div>
    );
  }

  return (
    <div className="space-y-6">
      {/* Page Header */}
      <div className="flex items-center gap-3 mb-6">
        <Newspaper size={28} className="text-primary" />
        <h1 className="text-2xl font-semibold text-gray-900">Latest News & Announcements</h1>
      </div>

      {/* News Items - Scrollable Container */}
      <div className="max-h-[600px] overflow-y-auto pr-2 space-y-4 scroll-smooth">
        {data.map((newsItem, index) => (
          <div 
            key={index}
            className="bg-white rounded-lg border border-gray-200 p-6 hover:shadow-md transition-shadow duration-300 animate-fade-in"
            style={{ animationDelay: `${index * 0.1}s` }}
          >
            {/* News Index/Number */}
            <div className="flex gap-4">
              <div className="shrink-0">
                <div className="w-10 h-10 rounded-full bg-primary/10 flex items-center justify-center">
                  <span className="text-primary font-semibold text-sm">
                    {index + 1}
                  </span>
                </div>
              </div>

              {/* News Content */}
              <div className="flex-1">
                <p className="text-gray-700 leading-relaxed">{newsItem}</p>
              </div>
            </div>
          </div>
        ))}
      </div>

      {/* Scroll Indicator */}
      {data.length > 5 && (
        <div className="text-center text-sm text-gray-500 italic">
          Scroll to view more news items
        </div>
      )}
    </div>
  );
}

export default NewsPage;
