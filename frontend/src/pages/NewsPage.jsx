/**
 * News Page Component - Enhanced Appearance
 * Modern, elegant design with smooth auto-scrolling
 */

import React, { useState, useRef, useEffect } from 'react';
import { Newspaper, Calendar, X, ChevronRight, ChevronLeft, Pause, Play, ExternalLink } from 'lucide-react';

function NewsPage({ data }) {
  const [selectedNews, setSelectedNews] = useState(null);
  const [currentIndex, setCurrentIndex] = useState(0);
  const [isAutoScroll, setIsAutoScroll] = useState(true);
  const [isHovering, setIsHovering] = useState(false);
  const [isTransitioning, setIsTransitioning] = useState(false);
  const autoScrollRef = useRef(null);
  
  const itemsPerPage = 4;
  const totalPages = Math.ceil(data.length / itemsPerPage);
  
  // Get current page news
  const getCurrentNews = () => {
    const start = currentIndex * itemsPerPage;
    const end = start + itemsPerPage;
    return data.slice(start, end);
  };
  
  // Smooth transition function
  const transitionToPage = (newIndex) => {
    setIsTransitioning(true);
    setCurrentIndex(newIndex);
    
    // Reset transition state after animation
    setTimeout(() => {
      setIsTransitioning(false);
    }, 10);
  };
  
  // Auto scroll functionality - Starts automatically
  useEffect(() => {
    if (!isAutoScroll || isHovering) return;
    
    autoScrollRef.current = setInterval(() => {
      const nextIndex = (currentIndex + 1) % totalPages;
      transitionToPage(nextIndex);
    }, 2000); // 2 seconds per page
    
    return () => {
      if (autoScrollRef.current) {
        clearInterval(autoScrollRef.current);
      }
    };
  }, [isAutoScroll, isHovering, totalPages, currentIndex]);
  
  const handleNext = () => {
    const nextIndex = (currentIndex + 1) % totalPages;
    transitionToPage(nextIndex);
  };
  
  const handlePrev = () => {
    const prevIndex = (currentIndex - 1 + totalPages) % totalPages;
    transitionToPage(prevIndex);
  };
  
  const goToPage = (index) => {
    if (index === currentIndex) return;
    transitionToPage(index);
  };
  
  const toggleAutoScroll = () => {
    setIsAutoScroll(!isAutoScroll);
  };

  if (!data || data.length === 0) {
    return (
      <div className="min-h-screen bg-gray-50 flex items-center justify-center">
        <div className="text-center">
          <div className="relative inline-block mb-4">
            <div className="w-20 h-20 rounded-full bg-amber-50 flex items-center justify-center mx-auto shadow-sm">
              <Newspaper className="w-10 h-10 text-amber-500" />
            </div>
            <div className="absolute -top-2 -right-2 w-8 h-8 rounded-full bg-purple-500 flex items-center justify-center shadow-md">
              <svg className="w-4 h-4 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 19l9 2-9-18-9 18 9-2zm0 0v-8" />
              </svg>
            </div>
          </div>
          <h3 className="text-xl font-semibold text-gray-900 mb-2">No News Available</h3>
          <p className="text-gray-600 text-sm">Check back later for updates.</p>
        </div>
      </div>
    );
  }

  const currentNews = getCurrentNews();

  return (
    <div className=" w-full min-h-screen bg-gray-50">
      {/* Enhanced Header */}
      <div className="bg-white/80 backdrop-blur-sm border-b border-gray-200 shadow-sm">
        <div className="max-w-8xl mx-auto px-4 sm:px-6 lg:px-8 py-4">
          <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3">
            <div>
              <div className="flex items-center gap-2 mb-1">
                <div className="w-8 h-1 bg-amber-500 rounded-full"></div>
                <span className="text-xs font-medium text-amber-700 uppercase tracking-wider">Latest Updates</span>
              </div>
              <h1 className="text-2xl font-bold text-gray-900">News & Announcements</h1>
              <div className="flex items-center gap-2 mt-2">
                <div className="px-2.5 py-0.5 bg-gray-100 rounded-md text-sm text-gray-700">
                  {data.length} announcement{data.length !== 1 ? 's' : ''}
                </div>
                <div className="px-2.5 py-0.5 bg-amber-50 rounded-md text-sm text-amber-800">
                  Page {currentIndex + 1} of {totalPages}
                </div>
                {isAutoScroll && (
                  <div className="px-2.5 py-0.5 bg-amber-100 rounded-md text-sm text-amber-800 border border-amber-200 animate-pulse">
                    Auto-scrolling
                  </div>
                )}
              </div>
            </div>
            
            {/* Enhanced Navigation Controls */}
            <div className="flex items-center gap-3">
              {/* Auto-scroll Toggle */}
              <button
                onClick={toggleAutoScroll}
                className={`relative w-10 h-10 rounded-xl flex items-center justify-center transition-all duration-300 shadow-sm ${isAutoScroll ? 'bg-amber-500 text-white shadow-amber-200' : 'bg-white border border-gray-300 text-gray-600 hover:border-amber-300 hover:shadow-md'}`}
                title={isAutoScroll ? 'Pause auto-scroll' : 'Enable auto-scroll'}
              >
                {isAutoScroll ? (
                  <Pause className="w-4 h-4" />
                ) : (
                  <Play className="w-4 h-4" />
                )}
                {/* {isAutoScroll && (
                  <div className="absolute -top-1 -right-1 w-3 h-3  bg-white border border-amber-600"></div>
                )} */}
              </button>
              
              {totalPages > 1 && (
                <>
                  <div className="h-8 w-px bg-gray-300"></div>
                  
                  <div className="flex items-center gap-2">
                    <button
                      onClick={handlePrev}
                      disabled={isTransitioning}
                      className="w-9 h-9 rounded-lg bg-white border border-gray-300 hover:border-amber-400 hover:bg-amber-50 flex items-center justify-center transition-all duration-300 shadow-sm disabled:opacity-50 disabled:cursor-not-allowed"
                    >
                      <ChevronLeft className="w-4 h-4 text-gray-600" />
                    </button>
                    
                    <div className="flex items-center gap-1.5 px-2">
                      {Array.from({ length: Math.min(totalPages, 6) }).map((_, index) => (
                        <button
                          key={index}
                          onClick={() => goToPage(index)}
                          disabled={isTransitioning}
                          className={`w-7 h-7 rounded-lg flex items-center justify-center transition-all duration-300 shadow-sm ${currentIndex === index ? 'bg-amber-500 text-white scale-110' : 'bg-gray-100 text-gray-600 hover:bg-gray-200'} ${isTransitioning ? 'opacity-50' : ''}`}
                          aria-label={`Go to page ${index + 1}`}
                        >
                          <span className="text-xs font-medium">{index + 1}</span>
                        </button>
                      ))}
                    </div>
                    
                    <button
                      onClick={handleNext}
                      disabled={isTransitioning}
                      className="w-9 h-9 rounded-lg bg-white border border-gray-300 hover:border-amber-400 hover:bg-amber-50 flex items-center justify-center transition-all duration-300 shadow-sm disabled:opacity-50 disabled:cursor-not-allowed"
                    >
                      <ChevronRight className="w-4 h-4 text-gray-600" />
                    </button>
                  </div>
                </>
              )}
            </div>
          </div>
        </div>
      </div>

      {/* News Grid with Enhanced Design */}
      <div className="max-w-8xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        {/* Visual Progress Indicator */}
        {/* {isAutoScroll && totalPages > 1 && (
          <div className="mb-6">
            <div className="flex items-center justify-center gap-2 text-xs text-gray-500 mb-2">
              <div className="flex items-center gap-1">
                <div className="w-2 h-2 rounded-full bg-amber-500 animate-pulse"></div>
                <span>Auto-scroll active</span>
              </div>
              <span>•</span>
              <span>Hover to pause</span>
            </div>
            <div className="h-1 bg-gray-200 rounded-full overflow-hidden">
              <div 
                className="h-full bg-amber-500 rounded-full transition-all duration-2000"
                style={{ 
                  width: isHovering ? '0%' : '100%',
                  animation: isHovering ? 'none' : 'progress 2s ease-in-out infinite'
                }}
              ></div>
            </div>
          </div>
        )} */}

        {/* Enhanced News Grid */}
        <div 
          className={`grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 ${isTransitioning ? 'opacity-95' : 'opacity-100'} transition-opacity duration-300`}
          onMouseEnter={() => setIsHovering(true)}
          onMouseLeave={() => setIsHovering(false)}
        >
          {currentNews.map((news, index) => (
            <div
              key={index}
              onClick={() => setSelectedNews(news)}
              className={`group relative bg-white rounded-xl border border-gray-200 hover:border-amber-300 hover:shadow-xl transition-all duration-300 cursor-pointer overflow-hidden flex flex-col h-full transform ${isTransitioning ? 'scale-[0.98]' : 'scale-100'}`}
            >
              {/* Card accent */}
              <div className="absolute top-0 left-0 w-full h-1 bg-amber-500"></div>
              
              {/* Content */}
              <div className="p-5 flex-1 flex flex-col">
                {/* Date with enhanced design */}
                {news.date && (
                  <div className="flex items-center gap-2 text-xs text-gray-500 mb-4">
                    <div className="flex items-center justify-center w-6 h-6 rounded-full bg-amber-50">
                      <Calendar className="w-3 h-3 text-amber-600" />
                    </div>
                    <span className="font-medium">{news.date}</span>
                  </div>
                )}
                
                {/* Title with gradient effect */}
                <h3 className="text-lg font-semibold text-gray-900 mb-3 group-hover:text-amber-600 transition-all duration-300 leading-tight line-clamp-2">
                  {news.title}
                </h3>
                
                {/* Description with enhanced typography */}
                {news.description && (
                  <div className="flex-1 mb-4">
                    <p className="text-gray-600 text-sm leading-relaxed line-clamp-3">
                      {news.description}
                    </p>
                  </div>
                )}
                
                {/* Enhanced Read More */}
                <div className="mt-auto pt-4 border-t border-gray-100">
                  <div className="flex items-center justify-between">
                    <span className="text-xs font-medium text-gray-500 group-hover:text-amber-600 transition-colors">
                      View full announcement
                    </span>
                    <div className="w-8 h-8 rounded-full bg-gray-100 group-hover:bg-amber-100 flex items-center justify-center transition-all duration-300 group-hover:scale-110">
                      <ExternalLink className="w-3.5 h-3.5 text-gray-400 group-hover:text-amber-600 transition-colors" />
                    </div>
                  </div>
                </div>
              </div>
            </div>
          ))}
        </div>

        {/* Enhanced Footer Info */}
        {totalPages > 1 && (
          <div className="mt-12 pt-8 border-t border-gray-200">
            <div className="flex flex-col sm:flex-row items-center justify-between gap-4">
              <div className="text-center sm:text-left">
                <div className="text-sm text-gray-600 mb-1">
                  Showing {currentNews.length} of {data.length} announcements
                </div>
                <div className="text-xs text-gray-500">
                  {isAutoScroll ? 'Auto-scroll enabled • 2 seconds per page' : 'Manual navigation'}
                </div>
              </div>
              
              <div className="flex items-center gap-3">
                <button
                  onClick={handlePrev}
                  disabled={isTransitioning}
                  className="px-5 py-2.5 text-sm border border-gray-300 rounded-lg hover:border-amber-400 hover:bg-amber-50 flex items-center gap-2 transition-all duration-300 shadow-sm disabled:opacity-50 disabled:cursor-not-allowed"
                >
                  <ChevronLeft className="w-4 h-4" />
                  <span className="font-medium">Previous</span>
                </button>
                
                <div className="px-4 py-2 bg-gray-100 rounded-lg">
                  <div className="text-sm font-medium text-gray-700">
                    <span className="text-amber-600">{currentIndex + 1}</span>
                    <span className="text-gray-400 mx-1">/</span>
                    <span>{totalPages}</span>
                  </div>
                </div>
                
                <button
                  onClick={handleNext}
                  disabled={isTransitioning}
                  className="px-5 py-2.5 text-sm border border-gray-300 rounded-lg hover:border-amber-400 hover:bg-amber-50 flex items-center gap-2 transition-all duration-300 shadow-sm disabled:opacity-50 disabled:cursor-not-allowed"
                >
                  <span className="font-medium">Next</span>
                  <ChevronRight className="w-4 h-4" />
                </button>
              </div>
            </div>
          </div>
        )}
      </div>

      {/* Enhanced News Detail Modal */}
      {/* Fixed News Detail Modal */}
{selectedNews && (
  <div 
    className="fixed inset-0 z-50 bg-black/50 flex items-center justify-center p-4"
    onClick={() => setSelectedNews(null)}
  >
    <div 
      className="bg-white rounded-xl shadow-2xl max-w-2xl w-full max-h-[90vh] overflow-hidden border border-gray-200"
      onClick={(e) => e.stopPropagation()}
    >
      {/* Modal Header */}
      <div className="p-5 border-b border-gray-200 bg-white">
        <div className="flex items-start justify-between gap-4">
          <div className="flex-1 min-w-0">
            <div className="flex items-center gap-2 mb-2">
              <div className="flex items-center justify-center w-6 h-6 rounded-full bg-amber-100">
                <Calendar className="w-3 h-3 text-amber-600" />
              </div>
              {selectedNews.date && (
                <span className="text-sm font-medium text-gray-600">{selectedNews.date}</span>
              )}
            </div>
            <h2 className="text-xl font-semibold text-gray-900 leading-tight pr-8">
              {selectedNews.title}
            </h2>
          </div>
          <button
            onClick={() => setSelectedNews(null)}
            className="flex-shrink-0 w-8 h-8 rounded-full hover:bg-gray-100 flex items-center justify-center transition-colors duration-200"
            aria-label="Close"
          >
            <X className="w-4 h-4 text-gray-700" />
          </button>
        </div>
      </div>

      {/* Modal Content */}
      <div className="overflow-y-auto max-h-[calc(90vh-140px)]">
        {/* Image */}
        {selectedNews.image && selectedNews.image !== 'https://placehold.co/600x400' && (
          <div className="p-5 pb-0">
            <div className="rounded-lg overflow-hidden border border-gray-200">
              <img 
                src={selectedNews.image} 
                alt={selectedNews.title}
                className="w-full h-2/5 object-cover"
                onError={(e) => {
                  e.target.style.display = 'none';
                }}
              />
            </div>
          </div>
        )}

        {/* Description */}
        <div className="p-5">
          <div className="text-gray-700 leading-relaxed whitespace-pre-line text-sm">
            {selectedNews.description}
          </div>
        </div>
      </div>

      {/* Modal Footer */}
      {/* <div className="p-5 border-t border-gray-200 bg-gray-50">
        <button
          onClick={() => setSelectedNews(null)}
          className="w-full py-3 bg-amber-600 text-white rounded-lg hover:bg-amber-700 transition-colors duration-200 font-medium text-sm shadow-sm hover:shadow"
        >
          Close Announcement
        </button>
      </div> */}
    </div>
  </div>
)}

      <style jsx>{`
        @keyframes fadeIn {
          from {
            opacity: 0;
            backdrop-filter: blur(0px);
          }
          to {
            opacity: 1;
            backdrop-filter: blur(4px);
          }
        }
        
        @keyframes slideUp {
          from {
            opacity: 0;
            transform: translateY(30px) scale(0.98);
          }
          to {
            opacity: 1;
            transform: translateY(0) scale(1);
          }
        }
        
        @keyframes progress {
          0% {
            width: 0%;
          }
          50% {
            width: 100%;
          }
          100% {
            width: 0%;
          }
        }
        
        .animate-fadeIn {
          animation: fadeIn 0.3s ease-out;
        }
        
        .animate-slideUp {
          animation: slideUp 0.4s cubic-bezier(0.4, 0, 0.2, 1);
        }
      `}</style>
    </div>
  );
}

export default NewsPage;