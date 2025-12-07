/**
 * News Page Component
 * 
 * Displays faculty member's news and announcements in a scrolling format.
 * Each news item is displayed in a card with smooth scrolling animation.
 * 
 * @module pages/NewsPage
 */

import React, { useState, useEffect } from 'react';
import { Newspaper, ChevronUp, ChevronDown } from 'lucide-react';

/**
 * News page component
 * 
 * @param {Object} props
 * @param {Array<string>} props.data - Array of news items
 * @returns {JSX.Element}
 */
function NewsPage({ data }) {
  const [isAutoPlaying, setIsAutoPlaying] = useState(true);
  
  const itemsToShow = 5; // Show 5 news items at once

  // Auto-scroll functionality
  useEffect(() => {
    if (!data || data.length <= itemsToShow || !isAutoPlaying) return;

    const ticker = document.querySelector('.animate-scroll');
    if (!ticker) return;

    let animation;
    let isScrolling = true;

    const startScrolling = () => {
      const itemHeight = 100 / itemsToShow; // Calculate height percentage per item
      animation = ticker.animate(
        [
          { transform: 'translateY(0)' },
          { transform: `translateY(-${itemHeight}%)` } // Move one item up
        ],
        {
          duration: 2000, // 2 seconds to scroll
          easing: 'ease-in-out',
          fill: 'forwards'
        }
      );

      animation.onfinish = () => {
        // Move first item to end and reset position
        if (data.length > itemsToShow) {
          setTimeout(() => {
            if (isScrolling && isAutoPlaying) {
              const firstItem = ticker.firstElementChild;
              ticker.appendChild(firstItem);
              ticker.style.transform = 'translateY(0)';
              startScrolling(); // Continue scrolling
            }
          }, 2000); // Wait 2 seconds before next scroll
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

  // Handle case when no news data is available
  if (!data || data.length === 0) {
    return (
      <div className="flex flex-col items-center justify-center min-h-[200px] text-gray-500">
        <Newspaper size={48} className="mb-3 opacity-50" />
        <p className="text-base">No news available at the moment.</p>
      </div>
    );
  }

  const handleManualScroll = (direction) => {
    setIsAutoPlaying(false);
    const ticker = document.querySelector('.animate-scroll');
    if (!ticker) return;

    const itemHeight = 100 / itemsToShow;

    if (direction === 'up') {
      // Move last item to top
      const lastItem = ticker.lastElementChild;
      ticker.insertBefore(lastItem, ticker.firstElementChild);
      ticker.style.transform = `translateY(${itemHeight}%)`;
      setTimeout(() => {
        ticker.style.transition = 'transform 0.5s ease-in-out';
        ticker.style.transform = 'translateY(0)';
      }, 50);
    } else {
      // Move first item to bottom with animation
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

  return (
    <div className="w-full space-y-6">
      <h1 className="text-3xl font-bold text-purple-900 mb-4 pb-2 border-b-4 border-amber-400 inline-block">Latest News</h1>

      {/* News Ticker Container - Larger size */}
      <div className="bg-white rounded-2xl border-2 border-purple-200 shadow-xl overflow-hidden">
        {/* News Items Container - Show 5 items at once with larger height */}
        <div className="relative h-80 overflow-hidden"> {/* Increased height */}
          <div className="animate-scroll h-full">
            {data.map((news, index) => {
              // Handle both string and object formats
              const newsText = typeof news === 'string' ? news : (news.title || news.content || news.text || news.description || '');
              
              return (
                <div 
                  key={index}
                  className="flex items-start gap-4 px-8 py-5 h-1/5 border-b border-gray-100 last:border-b-0 group hover:bg-purple-50 transition-colors duration-200"
                >
                  <span className="text-amber-500 text-xl flex-shrink-0 mt-1">📰</span>
                  <p className="text-gray-800 text-lg leading-relaxed flex-1 font-medium group-hover:text-purple-900 transition-colors duration-200">
                    {newsText}
                  </p>
                  <div className="opacity-0 group-hover:opacity-100 transition-opacity duration-200">
                    <div className="w-2 h-2 bg-amber-500 rounded-full animate-pulse"></div>
                  </div>
                </div>
              );
            })}
          </div>

          {/* Gradient overlays */}
          <div className="absolute top-0 left-0 right-0 h-6 bg-gradient-to-b from-white to-transparent pointer-events-none"></div>
          <div className="absolute bottom-0 left-0 right-0 h-6 bg-gradient-to-t from-white to-transparent pointer-events-none"></div>
        </div>

        {/* Navigation Controls */}
        <div className="flex items-center justify-between px-8 py-4 border-t border-gray-200 bg-gray-50">
          {/* News Counter */}
          <div className="text-sm text-gray-600 font-medium">
            Showing {Math.min(itemsToShow, data.length)} of {data.length} news items
            {isAutoPlaying && ' • Auto-scrolling'}
          </div>

          {/* Controls */}
          <div className="flex items-center gap-3">
            {/* Auto-play Toggle */}
            <button
              onClick={toggleAutoPlay}
              className={`px-4 py-2 rounded-lg text-sm font-medium transition-all duration-200 ${
                isAutoPlaying 
                  ? 'bg-green-100 text-green-700 hover:bg-green-200 border border-green-300' 
                  : 'bg-gray-200 text-gray-700 hover:bg-gray-300 border border-gray-300'
              }`}
            >
              {isAutoPlaying ? '⏸️ Pause' : '▶️ Play'}
            </button>

            {/* Manual Navigation Buttons */}
            <div className="flex items-center gap-2">
              <button
                onClick={() => handleManualScroll('up')}
                className="p-3 rounded-xl bg-purple-100 text-purple-700 hover:bg-purple-200 transition-all duration-200 shadow-sm hover:shadow-md"
                aria-label="Scroll up"
              >
                <ChevronUp size={22} />
              </button>
              <button
                onClick={() => handleManualScroll('down')}
                className="p-3 rounded-xl bg-purple-100 text-purple-700 hover:bg-purple-200 transition-all duration-200 shadow-sm hover:shadow-md"
                aria-label="Scroll down"
              >
                <ChevronDown size={22} />
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default NewsPage;