/**
 * Gallery Page - Professional Academic Website
 * Clean horizontal scrolling gallery with pause/scroll functionality
 */

import React, { useState, useEffect, useCallback, useRef } from "react";
import { 
  X, 
  ChevronLeft, 
  ChevronRight, 
  Image as ImageIcon,
  Maximize2,
  Download,
  ExternalLink,
  Info,
  Pause,
  Play
} from "lucide-react";

// Helper function to safely get data
const safeGet = (obj, property, fallback = '') => {
  if (!obj || typeof obj !== 'object') return fallback;
  const value = obj[property];
  return value !== undefined && value !== null && value !== '' ? value : fallback;
};

// Validate and process gallery items
const processGalleryData = (data) => {
  if (!Array.isArray(data)) return [];
  
  const processed = data.map((item, index) => {
    if (!item || typeof item !== 'object') return null;
    
    const url = safeGet(item, 'url');
    const caption = safeGet(item, 'caption');
    const alt = safeGet(item, 'alt');
    
    // Skip if no URL
    if (!url || typeof url !== 'string' || url.trim() === '') return null;
    
    // Skip placeholder images
    if (url.includes('placehold.co') || url.includes('placeholder')) return null;
    
    return {
      id: `gallery-${index}-${Date.now()}`,
      url: url.trim(),
      alt: alt || caption || `Image ${index + 1}`,
      caption: caption,
      originalIndex: index
    };
  }).filter(item => item !== null);
  
  return processed;
};

function GalleryPage({ data = [], facultyInfo = null }) {
  const [selectedImage, setSelectedImage] = useState(null);
  const [currentIndex, setCurrentIndex] = useState(0);
  const [loadedImages, setLoadedImages] = useState({});
  const [failedImages, setFailedImages] = useState({});
  const [showModal, setShowModal] = useState(false);
  const [autoScroll, setAutoScroll] = useState(true); // Default to auto-scroll enabled
  const [isHovering, setIsHovering] = useState(false);
  
  const galleryContainerRef = useRef(null);
  const galleryItemsRef = useRef(null);
  const autoScrollIntervalRef = useRef(null);
  const isResettingRef = useRef(false);
  
  // Process gallery data
  const galleryData = React.useMemo(() => processGalleryData(data), [data]);
  
  // Extract faculty info
  const facultyName = safeGet(facultyInfo, 'name', 'Faculty Gallery');
  const galleryTitle = safeGet(facultyInfo, 'title', 'Gallery');
  
  // Image loading handlers
  const handleImageLoad = useCallback((id) => {
    setLoadedImages(prev => ({ ...prev, [id]: true }));
  }, []);
  
  const handleImageError = useCallback((id) => {
    setFailedImages(prev => ({ ...prev, [id]: true }));
  }, []);
  
  // Modal controls
  const openImage = useCallback((img, idx) => {
    setSelectedImage(img);
    setCurrentIndex(idx);
    setShowModal(true);
  }, []);
  
  const closeModal = useCallback(() => {
    setShowModal(false);
    setTimeout(() => {
      setSelectedImage(null);
    }, 300);
  }, []);
  
  const prevImage = useCallback((e) => {
    e?.stopPropagation();
    if (galleryData.length === 0) return;
    setCurrentIndex(prev => {
      const newIndex = prev > 0 ? prev - 1 : galleryData.length - 1;
      setSelectedImage(galleryData[newIndex]);
      return newIndex;
    });
  }, [galleryData]);
  
  const nextImage = useCallback((e) => {
    e?.stopPropagation();
    if (galleryData.length === 0) return;
    setCurrentIndex(prev => {
      const newIndex = prev < galleryData.length - 1 ? prev + 1 : 0;
      setSelectedImage(galleryData[newIndex]);
      return newIndex;
    });
  }, [galleryData]);
  
  // Horizontal scroll controls
  const scrollGalleryLeft = useCallback(() => {
    if (galleryContainerRef.current) {
      const container = galleryContainerRef.current;
      const scrollAmount = container.clientWidth * 0.8; // Scroll about 80% of container width
      container.scrollBy({ left: -scrollAmount, behavior: 'smooth' });
    }
  }, []);
  
  const scrollGalleryRight = useCallback(() => {
    if (galleryContainerRef.current) {
      const container = galleryContainerRef.current;
      const scrollAmount = container.clientWidth * 0.8; // Scroll about 80% of container width
      container.scrollBy({ left: scrollAmount, behavior: 'smooth' });
    }
  }, []);
  
  const toggleAutoScroll = useCallback(() => {
    setAutoScroll(prev => !prev);
  }, []);
  
  // Calculate total width of all gallery items
  const getTotalGalleryWidth = useCallback(() => {
    if (!galleryItemsRef.current || galleryData.length === 0) return 0;
    
    const itemWidth = 256; // w-64 = 256px
    const gap = 16; // gap-4 = 16px
    return (galleryData.length * itemWidth) + ((galleryData.length - 1) * gap);
  }, [galleryData.length]);
  
  // Auto scroll effect
  useEffect(() => {
    if (!autoScroll || isHovering || galleryData.length === 0) {
      if (autoScrollIntervalRef.current) {
        clearInterval(autoScrollIntervalRef.current);
        autoScrollIntervalRef.current = null;
      }
      isResettingRef.current = false;
      return;
    }
    
    let scrollDirection = 1; // 1 for right, -1 for left
    let lastScrollTime = Date.now();
    
    const autoScrollFunction = () => {
      if (!galleryContainerRef.current || isHovering) return;
      
      const container = galleryContainerRef.current;
      const now = Date.now();
      const deltaTime = now - lastScrollTime;
      lastScrollTime = now;
      
      const scrollSpeed = 80; // pixels per second
      const scrollAmount = (scrollSpeed * deltaTime) / 1000;
      
      // Calculate if we've reached or passed the end
      const maxScrollLeft = container.scrollWidth - container.clientWidth;
      const currentScroll = container.scrollLeft;
      
      if (scrollDirection === 1 && currentScroll >= maxScrollLeft - 10) {
        // Reached the end, reset to start
        isResettingRef.current = true;
        container.scrollTo({ left: 0, behavior: 'smooth' });
        setTimeout(() => {
          isResettingRef.current = false;
        }, 1000); // Wait for reset animation to complete
      } else if (!isResettingRef.current) {
        // Normal scrolling
        container.scrollBy({ left: scrollDirection * scrollAmount, behavior: 'auto' });
      }
    };
    
    // Start auto-scroll
    autoScrollIntervalRef.current = setInterval(autoScrollFunction, 16); // ~60fps
    
    return () => {
      if (autoScrollIntervalRef.current) {
        clearInterval(autoScrollIntervalRef.current);
        autoScrollIntervalRef.current = null;
      }
      isResettingRef.current = false;
    };
  }, [autoScroll, isHovering, galleryData.length]);
  
  // Keyboard navigation
  useEffect(() => {
    const handleKeyDown = (e) => {
      if (!showModal) return;
      if (e.key === "Escape") closeModal();
      else if (e.key === "ArrowLeft") prevImage(e);
      else if (e.key === "ArrowRight") nextImage(e);
    };
    
    if (showModal) {
      window.addEventListener("keydown", handleKeyDown);
      return () => window.removeEventListener("keydown", handleKeyDown);
    }
  }, [showModal, closeModal, prevImage, nextImage]);
  
  // Empty state
  if (galleryData.length === 0) {
    return (
      <div className="min-h-screen bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
          <div className="text-center py-20">
            <div className="mb-4">
              <div className="w-16 h-16 bg-gray-100 rounded-full flex items-center justify-center mx-auto">
                <ImageIcon className="w-8 h-8 text-gray-400" />
              </div>
            </div>
            <h3 className="text-lg font-medium text-gray-900 mb-2">No Gallery Images</h3>
            <p className="text-gray-600">Gallery images will appear here when available.</p>
          </div>
        </div>
      </div>
    );
  }
  
  return (
    <div className="min-h-screen bg-white">
      {/* Header */}
      <div className="bg-white border-b border-gray-200">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-6">
          <div>
            <h1 className="text-2xl font-bold text-gray-900 mb-2">{galleryTitle}</h1>
            {facultyName && (
              <p className="text-gray-600">{facultyName}</p>
            )}
          </div>
        </div>
      </div>
      
      {/* Gallery Container */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-4">
        <div className="flex items-center justify-between mb-4">
          <div className="text-sm text-gray-600">
            {galleryData.length} images • {autoScroll ? "Auto-scrolling" : "Paused"}
          </div>
          
          <button
            onClick={toggleAutoScroll}
            className={`flex items-center gap-2 px-3 py-2 text-sm ${autoScroll ? 'bg-blue-50 text-blue-700 border border-blue-200' : 'bg-gray-50 text-gray-700 border border-gray-200'} rounded-md hover:bg-gray-100 transition-colors`}
          >
            {autoScroll ? (
              <>
                <Pause className="w-4 h-4" />
                <span>Pause </span>
              </>
            ) : (
              <>
                <Play className="w-4 h-4" />
                <span>scroll</span>
              </>
            )}
          </button>
        </div>
        
        {/* Horizontal Gallery with Arrows */}
        <div className="relative">
          {/* Left Arrow */}
          <button
            onClick={scrollGalleryLeft}
            className="absolute left-0 top-1/2 -translate-y-1/2 z-10 w-10 h-10 bg-white border border-gray-300 rounded-full flex items-center justify-center hover:bg-gray-50 transition-colors shadow-sm"
            title="Scroll left"
          >
            <ChevronLeft className="w-5 h-5 text-gray-700" />
          </button>
          
          {/* Right Arrow */}
          <button
            onClick={scrollGalleryRight}
            className="absolute right-0 top-1/2 -translate-y-1/2 z-10 w-10 h-10 bg-white border border-gray-300 rounded-full flex items-center justify-center hover:bg-gray-50 transition-colors shadow-sm"
            title="Scroll right"
          >
            <ChevronRight className="w-5 h-5 text-gray-700" />
          </button>
          
          {/* Gallery Container */}
          <div 
            ref={galleryContainerRef}
            className="mx-12 overflow-x-auto scrollbar-hide py-2"
            onMouseEnter={() => setIsHovering(true)}
            onMouseLeave={() => setIsHovering(false)}
            style={{ 
              scrollbarWidth: 'none',
              msOverflowStyle: 'none',
              overflowX: 'auto'
            }}
          >
            <div ref={galleryItemsRef} className="flex gap-4 pb-4">
              {galleryData.map((img, index) => {
                const hasLoaded = loadedImages[img.id];
                const hasFailed = failedImages[img.id];
                
                return (
                  <div 
                    key={img.id}
                    className="flex-shrink-0 w-64 bg-white border border-gray-200 rounded-lg overflow-hidden cursor-pointer hover:border-blue-300 transition-colors"
                    onClick={() => openImage(img, index)}
                  >
                    {/* Image Container */}
                    <div className="relative h-48 bg-gray-50">
                      {!hasFailed ? (
                        <>
                          <img
                            src={img.url}
                            alt={img.alt}
                            className={`w-full h-full object-cover ${hasLoaded ? 'opacity-100' : 'opacity-0'}`}
                            onLoad={() => handleImageLoad(img.id)}
                            onError={() => handleImageError(img.id)}
                          />
                          
                          {!hasLoaded && (
                            <div className="absolute inset-0 flex items-center justify-center">
                              <div className="animate-spin rounded-full h-8 w-8 border-2 border-gray-200 border-t-blue-500"></div>
                            </div>
                          )}
                        </>
                      ) : (
                        <div className="w-full h-full flex flex-col items-center justify-center p-4">
                          <ImageIcon className="w-8 h-8 text-gray-300 mb-2" />
                          <p className="text-sm text-gray-500 text-center">Image unavailable</p>
                        </div>
                      )}
                      
                      {/* Hover overlay */}
                      <div className="absolute inset-0 bg-black bg-opacity-0 hover:bg-opacity-10 transition-all duration-200 flex items-center justify-center opacity-0 hover:opacity-100">
                        <div className="w-10 h-10 bg-white bg-opacity-90 rounded-full flex items-center justify-center">
                          <Maximize2 className="w-5 h-5 text-gray-700" />
                        </div>
                      </div>
                    </div>
                    
                    {/* Caption */}
                    {img.caption && (
                      <div className="p-3 border-t border-gray-100">
                        <div className="flex items-start gap-2">
                          <p className="text-sm text-gray-700 line-clamp-2">
                            {img.caption}
                          </p>
                        </div>
                      </div>
                    )}
                  </div>
                );
              })}
            </div>
          </div>
        </div>
        
        {/* Scroll hint */}
        <div className="text-center mt-4">
          <p className="text-sm text-gray-500">
            {autoScroll ? 
              "Auto-scrolling • Hover to pause • Click images to enlarge" :
              "Use arrows to scroll • Click images to enlarge"}
          </p>
        </div>
      </div>
      
      {/* Modal */}
      {selectedImage && (
        <div 
          className={`fixed inset-0 z-50 flex items-center justify-center p-4 transition-all duration-300 ${showModal ? 'bg-black/70' : 'bg-transparent'}`}
          onClick={closeModal}
        >
          <div 
            className={`bg-white rounded-lg shadow-lg max-w-4xl w-full max-h-[90vh] overflow-hidden border border-gray-300 transform transition-all duration-300 ${showModal ? 'scale-100 opacity-100' : 'scale-95 opacity-0'}`}
            onClick={(e) => e.stopPropagation()}
          >
            {/* Modal Header */}
            <div className="p-4 border-b border-gray-200 flex items-center justify-between">
              <div>
                <div className="text-sm font-medium text-gray-900">
                  Image {currentIndex + 1} of {galleryData.length}
                </div>
                <div className="text-xs text-gray-500">
                  Press ESC to close • Use arrow keys to navigate
                </div>
              </div>
              <button
                onClick={closeModal}
                className="w-8 h-8 rounded-full hover:bg-gray-100 flex items-center justify-center transition-colors"
              >
                <X className="w-5 h-5 text-gray-700" />
              </button>
            </div>
            
            {/* Image Display */}
            <div className="p-4">
              <div className="relative bg-gray-50 rounded border border-gray-200 min-h-[50vh] flex items-center justify-center">
                <img
                  src={selectedImage.url}
                  alt={selectedImage.alt}
                  className="max-w-full max-h-[50vh] object-contain p-4"
                />
                
                {/* Navigation Arrows */}
                {galleryData.length > 1 && (
                  <>
                    <button
                      onClick={prevImage}
                      className="absolute left-4 top-1/2 -translate-y-1/2 w-10 h-10 bg-white border border-gray-300 rounded-full flex items-center justify-center hover:bg-gray-50 transition-colors shadow-sm"
                    >
                      <ChevronLeft className="w-5 h-5 text-gray-700" />
                    </button>
                    <button
                      onClick={nextImage}
                      className="absolute right-4 top-1/2 -translate-y-1/2 w-10 h-10 bg-white border border-gray-300 rounded-full flex items-center justify-center hover:bg-gray-50 transition-colors shadow-sm"
                    >
                      <ChevronRight className="w-5 h-5 text-gray-700" />
                    </button>
                  </>
                )}
              </div>
            </div>
            
            {/* Image Info & Actions */}
            <div className="p-4 border-t border-gray-200">
              {selectedImage.caption && (
                <div className="mb-4 p-3 bg-blue-50 rounded border border-blue-100">
                  <p className="text-sm text-gray-700">
                    {selectedImage.caption}
                  </p>
                </div>
              )}
              
              <div className="flex flex-col sm:flex-row items-center justify-between gap-4">
                {/* <div className="flex items-center gap-3">
                  <a
                    href={selectedImage.url}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="flex items-center gap-2 px-3 py-2 bg-gray-100 hover:bg-gray-200 rounded text-sm text-gray-700 transition-colors"
                    onClick={(e) => e.stopPropagation()}
                  >
                    <ExternalLink className="w-4 h-4" />
                    <span>Open Original</span>
                  </a>
                  <a
                    href={selectedImage.url}
                    download
                    className="flex items-center gap-2 px-3 py-2 bg-blue-600 hover:bg-blue-700 text-white rounded text-sm transition-colors"
                    onClick={(e) => e.stopPropagation()}
                  >
                    <Download className="w-4 h-4" />
                    <span>Download</span>
                  </a>
                </div> */}
                
                {/* Navigation Dots */}
                {galleryData.length > 1 && (
                  <div className="flex items-center gap-2">
                    {galleryData.map((_, idx) => (
                      <button
                        key={idx}
                        onClick={(e) => {
                          e.stopPropagation();
                          setCurrentIndex(idx);
                          setSelectedImage(galleryData[idx]);
                        }}
                        className={`w-2 h-2 rounded-full transition-colors ${currentIndex === idx ? 'bg-blue-600' : 'bg-gray-300 hover:bg-gray-400'}`}
                      />
                    ))}
                  </div>
                )}
              </div>
            </div>
          </div>
        </div>
      )}
      
      <style jsx>{`
        .line-clamp-2 {
          overflow: hidden;
          display: -webkit-box;
          -webkit-box-orient: vertical;
          -webkit-line-clamp: 2;
        }
        
        .scrollbar-hide {
          -ms-overflow-style: none;
          scrollbar-width: none;
        }
        
        .scrollbar-hide::-webkit-scrollbar {
          display: none;
        }
      `}</style>
    </div>
  );
}

export default GalleryPage;