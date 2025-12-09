/**
 * News Page Component
 * 
 * Displays faculty member's news and announcements in a clean list format.
 * Each news item shows title and brief description, with modal for full details.
 * 
 * @module pages/NewsPage
 */

import React, { useState, useEffect } from 'react';
import { Newspaper, ChevronUp, ChevronDown, Calendar, X, ExternalLink } from 'lucide-react';

/**
 * News page component
 * 
 * @param {Object} props
 * @param {Array<Object>} props.data - Array of news items
 * @returns {JSX.Element}
 */
function NewsPage({ data }) {
  const [isAutoPlaying, setIsAutoPlaying] = useState(false);
  const [selectedNews, setSelectedNews] = useState(null);
  const [isModalOpen, setIsModalOpen] = useState(false);
  
  const itemsToShow = 5; // Show 6 news items at once

  // Auto-scroll functionality
  useEffect(() => {
    if (!data || data.length <= itemsToShow || !isAutoPlaying) return;

    const ticker = document.querySelector('.animate-scroll');
    if (!ticker) return;

    let animation;
    let isScrolling = true;

    const startScrolling = () => {
      const itemHeight = 100 / itemsToShow;
      animation = ticker.animate(
        [
          { transform: 'translateY(0)' },
          { transform: `translateY(-${itemHeight}%)` }
        ],
        {
          duration: 3000, // Slower scroll for readability
          easing: 'ease-in-out',
          fill: 'forwards'
        }
      );

      animation.onfinish = () => {
        if (data.length > itemsToShow) {
          setTimeout(() => {
            if (isScrolling && isAutoPlaying) {
              const firstItem = ticker.firstElementChild;
              ticker.appendChild(firstItem);
              ticker.style.transform = 'translateY(0)';
              startScrolling();
            }
          }, 3000);
        }
      };
    };

    if (isAutoPlaying) {
      startScrolling();
    }

    return () => {
      isScrolling = false;
      if (animation) {
        animation.cancel();
      }
    };
  }, [data, isAutoPlaying, itemsToShow]);

  // Handle news item click
  const handleNewsClick = (news) => {
    // If it's just a string without additional info, don't open modal
    if (typeof news === 'string' || (!news.image && !news.description && news.title)) {
      return;
    }
    
    setSelectedNews(news);
    setIsModalOpen(true);
    setIsAutoPlaying(false); // Pause auto-scroll when modal opens
  };

  const handleManualScroll = (direction) => {
    setIsAutoPlaying(false);
    const ticker = document.querySelector('.animate-scroll');
    if (!ticker) return;

    const itemHeight = 100 / itemsToShow;

    if (direction === 'up') {
      const lastItem = ticker.lastElementChild;
      ticker.insertBefore(lastItem, ticker.firstElementChild);
      ticker.style.transform = `translateY(${itemHeight}%)`;
      setTimeout(() => {
        ticker.style.transition = 'transform 0.5s ease-in-out';
        ticker.style.transform = 'translateY(0)';
      }, 50);
    } else {
      ticker.style.transition = 'transform 0.5s ease-in-out';
      ticker.style.transform = `translateY(-${itemHeight}%)`;
      setTimeout(() => {
        const firstItem = ticker.firstElementChild;
        ticker.appendChild(firstItem);
        ticker.style.transition = 'none';
        ticker.style.transform = 'translateY(0)';
      }, 500);
    }
  };

  const toggleAutoPlay = () => {
    setIsAutoPlaying(!isAutoPlaying);
  };

  const closeModal = () => {
    setIsModalOpen(false);
    setSelectedNews(null);
  };

  // Handle case when no news data is available
  if (!data || data.length === 0) {
    return (
      <div className="flex flex-col items-center justify-center min-h-[400px] bg-white rounded-xl p-8">
        <div className="text-gray-300 mb-4">
          <Newspaper size={64} />
        </div>
        <h3 className="text-xl font-semibold text-gray-700 mb-2">No News Available</h3>
        <p className="text-gray-500">Check back later for updates and announcements.</p>
      </div>
    );
  }

  return (
    <>
      <div className="w-full space-y-8">
        {/* Header */}
        <div className="text-center">
          <h1 className="text-3xl font-bold text-gray-900 mb-3">News & Announcements</h1>
          <p className="text-gray-600 max-w-2xl mx-auto">
            Latest updates, research opportunities, and announcements from the department
          </p>
        </div>

        {/* News Container */}
        <div className="bg-white rounded-xl border border-gray-200 shadow-sm">
          {/* News List */}
          <div className="relative h-[480px] overflow-hidden">
            <div className="animate-scroll h-full">
              {data.map((news, index) => {
                const isStringNews = typeof news === 'string';
                const hasDetails = !isStringNews && (news.image || news.description);
                
                return (
                  <div 
                    key={index}
                    onClick={() => hasDetails && handleNewsClick(news)}
                    className={`flex items-start gap-4 px-8 py-5 h-1/${itemsToShow} border-b border-gray-100 last:border-b-0 transition-all duration-200 ${
                      hasDetails ? 'cursor-pointer hover:bg-blue-50' : ''
                    } ${hasDetails ? 'group' : ''}`}
                  >
                    {/* Date Badge */}
                    {!isStringNews && news.date && (
                      <div className="flex-shrink-0">
                        <div className="bg-gray-100 rounded-lg px-3 py-1.5 text-center">
                          <div className="text-xs text-gray-500 uppercase"></div>
                          <div className="text-sm font-semibold text-gray-800">{news.date}</div>
                        </div>
                      </div>
                    )}

                    {/* News Content */}
                    <div className="flex-1 min-w-0">
                      {/* Title */}
                      <h3 className="text-lg font-semibold text-gray-900 mb-1.5 group-hover:text-blue-600 transition-colors">
                        {isStringNews ? news : (news.title || 'Announcement')}
                      </h3>
                      
                      {/* Brief Description (single line) */}
                      <p className="text-gray-600 text-sm line-clamp-1">
                        {isStringNews ? '' : (news.description || 'Click to view details...')}
                      </p>
                    </div>

                    {/* Click Indicator */}
                    {hasDetails && (
                      <div className="flex-shrink-0 text-gray-400 group-hover:text-blue-500 transition-colors">
                        <ExternalLink size={18} />
                      </div>
                    )}
                  </div>
                );
              })}
            </div>

            {/* Gradient overlays */}
            <div className="absolute top-0 left-0 right-0 h-6 bg-gradient-to-b from-white to-transparent pointer-events-none"></div>
            <div className="absolute bottom-0 left-0 right-0 h-6 bg-gradient-to-t from-white to-transparent pointer-events-none"></div>
          </div>

          {/* Controls */}
          <div className="flex items-center justify-between px-6 py-4 border-t border-gray-200 bg-gray-50/50">
            <div className="text-sm text-gray-600">
              <span className="font-medium">{Math.min(itemsToShow, data.length)}</span> of{' '}
              <span className="font-medium">{data.length}</span> items
              {isAutoPlaying && ' • Auto-scrolling'}
            </div>

            <div className="flex items-center gap-3">
              <button
                onClick={toggleAutoPlay}
                className={`px-4 py-2 rounded-lg text-sm font-medium transition-colors ${
                  isAutoPlaying 
                    ? 'bg-white-100 text-white-700 hover:bg-white-200' 
                    : 'bg-gray-100 text-gray-700 hover:bg-gray-200'
                }`}
              >
                {isAutoPlaying ? '⏸ Pause' : '▶'}
              </button>
              
              <div className="flex gap-1">
                <button
                  onClick={() => handleManualScroll('up')}
                  className="p-2 rounded-lg bg-white border border-gray-300 hover:bg-gray-50 transition-colors"
                  aria-label="Scroll up"
                >
                  <ChevronUp size={20} />
                </button>
                <button
                  onClick={() => handleManualScroll('down')}
                  className="p-2 rounded-lg bg-white border border-gray-300 hover:bg-gray-50 transition-colors"
                  aria-label="Scroll down"
                >
                  <ChevronDown size={20} />
                </button>
              </div>
            </div>
          </div>
        </div>

        {/* Help Text */}
        <p className="text-center text-sm text-gray-500">
          Click on any news item with additional details to view complete information
        </p>
      </div>

      {/* News Detail Modal */}
      {isModalOpen && selectedNews && (
        <div className="fixed inset-0 bg-black/50 flex items-center justify-center z-50 p-4">
          <div 
            className="bg-white rounded-xl shadow-lg max-w-2xl w-full max-h-[90vh] overflow-hidden animate-fadeIn"
            onClick={(e) => e.stopPropagation()}
          >
            {/* Modal Header */}
            <div className="flex items-center justify-between p-6 border-b border-gray-200">
              <div>
                <h2 className="text-2xl font-bold text-gray-900">{selectedNews.title}</h2>
                {selectedNews.date && (
                  <div className="flex items-center gap-2 mt-2 text-gray-600">
                    <Calendar size={16} />
                    <span className="text-sm">Published: {selectedNews.date}</span>
                  </div>
                )}
              </div>
              <button
                onClick={closeModal}
                className="p-2 hover:bg-gray-100 rounded-lg transition-colors"
                aria-label="Close"
              >
                <X size={24} />
              </button>
            </div>

            {/* Modal Content */}
            <div className="p-6 overflow-y-auto max-h-[calc(90vh-200px)]">
              {/* Image */}
              {selectedNews.image && (
                <div className="mb-6">
                  <img 
                    src={selectedNews.image} 
                    alt={selectedNews.title}
                    className="w-full h-64 object-cover rounded-lg"
                    onError={(e) => {
                      e.target.style.display = 'none';
                    }}
                  />
                </div>
              )}

              {/* Description */}
              <div className="prose prose-blue max-w-none">
                <p className="text-gray-700 leading-relaxed">
                  {selectedNews.description}
                </p>
              </div>
            </div>

            {/* Modal Footer */}
            <div className="p-6 border-t border-gray-200 bg-gray-50">
              <div className="flex justify-between items-center">
                <div className="text-sm text-gray-600">
                  For more information, contact: pbhui@iitdh.ac.in
                </div>
                <button
                  onClick={closeModal}
                  className="px-6 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors font-medium"
                >
                  Close
                </button>
              </div>
            </div>
          </div>
        </div>
      )}
    </>
  );
}

export default NewsPage;