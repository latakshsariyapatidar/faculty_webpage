/**
 * Gallery Page - Visually Enhanced & Information Rich
 * Elegant design with enhanced visuals while maintaining functionality
 */

import React, { useState, useEffect, useCallback } from "react";
import { 
  X, 
  ChevronLeft, 
  ChevronRight, 
  Image as ImageIcon,
  Maximize2,
  Download,
  ExternalLink,
  Info,
  Grid3x3,
  AlertCircle,
  Layers,
  Sparkles
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
      captionPosition: safeGet(item, 'caption_position', 'below'),
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
  
  // Calculate loading stats
  const loadedCount = Object.keys(loadedImages).length;
  const failedCount = Object.keys(failedImages).length;
  const successfulCount = loadedCount - failedCount;
  
  // Empty state
  if (galleryData.length === 0) {
    return (
      <div className="min-h-screen bg-gradient-to-b from-white to-gray-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
          <div className="text-center py-20">
            <div className="relative inline-block mb-4">
              <div className="w-20 h-20 rounded-full bg-gradient-to-br from-amber-50 to-purple-50 flex items-center justify-center mx-auto shadow-sm">
                <ImageIcon className="w-10 h-10 text-amber-500" />
              </div>
              <div className="absolute -top-2 -right-2 w-8 h-8 rounded-full bg-purple-500 flex items-center justify-center shadow-md">
                <Sparkles className="w-4 h-4 text-white" />
              </div>
            </div>
            <h3 className="text-xl font-semibold text-gray-900 mb-2">No Gallery Images</h3>
            <p className="text-gray-600 text-sm">Gallery images will appear here when available.</p>
          </div>
        </div>
      </div>
    );
  }
  
  return (
    <div className="min-h-screen bg-gradient-to-b from-white to-gray-50">
      {/* Enhanced Header */}
      <div className="bg-white/80 backdrop-blur-sm border-b border-gray-200 shadow-sm">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-5">
          <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
            <div>
              <div className="flex items-center gap-2 mb-1">
                <div className="w-8 h-1 bg-gradient-to-r from-amber-500 to-purple-500 rounded-full"></div>
                {/* <span className="text-xs font-medium text-amber-700 uppercase tracking-wider">Visual Gallery</span> */}
              </div>
              <h1 className="text-2xl font-bold text-gray-900">{galleryTitle}</h1>
              <div className="flex items-center gap-3 mt-2">
                <div className="flex items-center gap-2 px-3 py-1 bg-gradient-to-r from-amber-50 to-amber-100 rounded-full text-sm text-amber-800">
                  {/* <Grid3x3 className="w-3.5 h-3.5" /> */}
                  <span className="font-medium">{galleryData.length} images</span>
                </div>
                {facultyName && (
                  <div className="flex items-center gap-2 px-3 py-1 bg-gradient-to-r from-purple-50 to-purple-100 rounded-full text-sm text-purple-800">
                    <Layers className="w-3.5 h-3.5" />
                    <span>{facultyName}</span>
                  </div>
                )}
              </div>
            </div>
            {/* <div className="flex items-center gap-3">
              <div className="text-right">
                <div className="text-sm font-medium text-gray-900">
                  {successfulCount} loaded
                </div>
                <div className="text-xs text-gray-500">
                  {failedCount > 0 && `${failedCount} failed • `}
                  Click to view
                </div>
              </div>
            </div> */}
          </div>
        </div>
      </div>
      
      {/* Gallery Grid - Visually Enhanced */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-6">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-5">
          {galleryData.map((img, index) => {
            const hasLoaded = loadedImages[img.id];
            const hasFailed = failedImages[img.id];
            
            return (
              <div 
                key={img.id}
                className="group relative bg-white rounded-xl border border-gray-200 hover:border-amber-300 overflow-hidden cursor-pointer shadow-sm hover:shadow-xl transition-all duration-300 hover:-translate-y-1"
                onClick={() => openImage(img, index)}
              >
                {/* Top accent line */}
                <div className="absolute top-0 left-0 right-0 h-1 bg-gradient-to-r from-amber-400 via-amber-500 to-purple-500 z-10"></div>
                
                {/* Image Number Badge */}
                <div className="absolute top-3 right-3 z-10">
                  <div className="w-7 h-7 rounded-full bg-white/90 backdrop-blur-sm shadow-sm flex items-center justify-center">
                    <span className="text-xs font-bold text-gray-700">{index + 1}</span>
                  </div>
                </div>
                
                {/* Image Container */}
                <div className="relative aspect-square bg-gradient-to-br from-gray-50 to-gray-100">
                  {!hasFailed ? (
                    <>
                      <img
                        src={img.url}
                        alt={img.alt}
                        className={`w-full h-full object-cover transition-all duration-500 ${hasLoaded ? 'opacity-100 scale-100 group-hover:scale-105' : 'opacity-0 scale-95'}`}
                        onLoad={() => handleImageLoad(img.id)}
                        onError={() => handleImageError(img.id)}
                      />
                      
                      {!hasLoaded && (
                        <div className="absolute inset-0 flex items-center justify-center">
                          <div className="relative">
                            <div className="animate-spin rounded-full h-10 w-10 border-2 border-amber-200 border-t-amber-500"></div>
                            <div className="absolute inset-0 flex items-center justify-center">
                              <span className="text-xs font-medium text-amber-600">Loading</span>
                            </div>
                          </div>
                        </div>
                      )}
                      
                      {/* Hover Overlay */}
                      <div className="absolute inset-0 bg-gradient-to-t from-black/40 via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300">
                        <div className="absolute bottom-3 left-3 right-3">
                          <div className="flex items-center justify-between">
                            <span className="text-xs font-medium text-white">Click to enlarge</span>
                            <div className="w-8 h-8 rounded-full bg-white/90 backdrop-blur-sm flex items-center justify-center shadow-md">
                              <Maximize2 className="w-4 h-4 text-gray-800" />
                            </div>
                          </div>
                        </div>
                      </div>
                    </>
                  ) : (
                    <div className="w-full h-full flex flex-col items-center justify-center p-6">
                      <div className="relative mb-3">
                        <ImageIcon className="w-10 h-10 text-gray-300" />
                        <div className="absolute -top-1 -right-1 w-5 h-5 rounded-full bg-red-100 flex items-center justify-center">
                          <span className="text-xs font-bold text-red-600">!</span>
                        </div>
                      </div>
                      <p className="text-sm text-gray-500 text-center">Image unavailable</p>
                      <p className="text-xs text-gray-400 mt-1">Click to view details</p>
                    </div>
                  )}
                </div>
                
                {/* Caption Below Image */}
                {img.caption && (
                  <div className="p-4 border-t border-gray-100 bg-gradient-to-r from-white to-gray-50">
                    <div className="flex items-start gap-2">
                      <Info className="w-4 h-4 text-amber-600 mt-0.5 flex-shrink-0" />
                      <p className="text-sm text-gray-700 line-clamp-2 leading-relaxed">
                        {img.caption}
                      </p>
                    </div>
                  </div>
                )}
              </div>
            );
          })}
        </div>
        
        {/* Gallery Stats */}
        {/* <div className="mt-8 pt-6 border-t border-gray-200">
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
            <div className="bg-gradient-to-r from-amber-50 to-amber-100 rounded-xl p-4 border border-amber-200">
              <div className="flex items-center gap-3">
                <div className="w-10 h-10 rounded-full bg-white flex items-center justify-center shadow-sm">
                  <Grid3x3 className="w-5 h-5 text-amber-600" />
                </div>
                <div>
                  <div className="text-xl font-bold text-amber-800">{galleryData.length}</div>
                  <div className="text-sm text-amber-700">Total Images</div>
                </div>
              </div>
            </div>
            
            <div className="bg-gradient-to-r from-green-50 to-green-100 rounded-xl p-4 border border-green-200">
              <div className="flex items-center gap-3">
                <div className="w-10 h-10 rounded-full bg-white flex items-center justify-center shadow-sm">
                  <div className="w-6 h-6 rounded-full bg-green-100 flex items-center justify-center">
                    <span className="text-xs font-bold text-green-600">{successfulCount}</span>
                  </div>
                </div>
                <div>
                  <div className="text-xl font-bold text-green-800">{successfulCount}</div>
                  <div className="text-sm text-green-700">Loaded Successfully</div>
                </div>
              </div>
            </div>
            
            <div className="bg-gradient-to-r from-gray-50 to-gray-100 rounded-xl p-4 border border-gray-200">
              <div className="flex items-center gap-3">
                <div className="w-10 h-10 rounded-full bg-white flex items-center justify-center shadow-sm">
                  <AlertCircle className="w-5 h-5 text-gray-600" />
                </div>
                <div>
                  <div className="text-xl font-bold text-gray-800">{failedCount}</div>
                  <div className="text-sm text-gray-700">Failed to Load</div>
                </div>
              </div>
            </div>
          </div>
        </div> */}
      </div>
      
      {/* Enhanced Modal */}
      {selectedImage && (
        <div 
          className={`fixed inset-0 z-50 flex items-center justify-center p-4 transition-all duration-300 ${showModal ? 'bg-black/80 backdrop-blur-sm' : 'bg-transparent'}`}
          onClick={closeModal}
        >
          <div 
            className={`bg-white rounded-xl shadow-2xl max-w-5xl w-full max-h-[90vh] overflow-hidden border border-gray-200 transform transition-all duration-300 ${showModal ? 'scale-100 opacity-100' : 'scale-95 opacity-0'}`}
            onClick={(e) => e.stopPropagation()}
          >
            {/* Modal Header */}
            <div className="p-5 border-b border-gray-200 bg-gradient-to-r from-gray-50 to-white">
              <div className="flex items-center justify-between">
                <div className="flex items-center gap-3">
                  <div className="w-10 h-10 rounded-full bg-gradient-to-r from-amber-500 to-purple-500 flex items-center justify-center shadow-md">
                    <span className="text-sm font-bold text-white">{currentIndex + 1}</span>
                  </div>
                  <div>
                    <div className="text-sm font-medium text-gray-900">Image {currentIndex + 1} of {galleryData.length}</div>
                    <div className="text-xs text-gray-500">Press ESC to close • Arrow keys to navigate</div>
                  </div>
                </div>
                <button
                  onClick={closeModal}
                  className="w-10 h-10 rounded-lg bg-gray-100 hover:bg-gray-200 flex items-center justify-center transition-all duration-200 hover:rotate-90"
                >
                  <X className="w-5 h-5 text-gray-700" />
                </button>
              </div>
            </div>
            
            {/* Image Display */}
            <div className="p-6">
              <div className="relative bg-gradient-to-br from-gray-900/5 to-gray-900/10 rounded-xl overflow-hidden border border-gray-200 min-h-[60vh] flex items-center justify-center">
                <img
                  src={selectedImage.url}
                  alt={selectedImage.alt}
                  className="max-w-full max-h-[60vh] object-contain p-4"
                />
                
                {/* Navigation Arrows */}
                {galleryData.length > 1 && (
                  <>
                    <button
                      onClick={prevImage}
                      className="absolute left-4 top-1/2 -translate-y-1/2 w-12 h-12 rounded-full bg-white/90 backdrop-blur-sm border border-gray-300 hover:border-amber-400 flex items-center justify-center transition-all duration-300 shadow-lg hover:shadow-xl hover:-translate-x-1"
                    >
                      <ChevronLeft className="w-5 h-5 text-gray-700" />
                    </button>
                    <button
                      onClick={nextImage}
                      className="absolute right-4 top-1/2 -translate-y-1/2 w-12 h-12 rounded-full bg-white/90 backdrop-blur-sm border border-gray-300 hover:border-amber-400 flex items-center justify-center transition-all duration-300 shadow-lg hover:shadow-xl hover:translate-x-1"
                    >
                      <ChevronRight className="w-5 h-5 text-gray-700" />
                    </button>
                  </>
                )}
              </div>
            </div>
            
            {/* Image Info & Actions */}
            <div className="p-5 border-t border-gray-200">
              {selectedImage.caption && (
                <div className="mb-6 p-4 bg-gradient-to-r from-amber-50 to-amber-25 rounded-lg border border-amber-100">
                  <div className="flex items-start gap-3">
                    <div className="w-8 h-8 rounded-full bg-amber-100 flex items-center justify-center flex-shrink-0">
                      <Info className="w-4 h-4 text-amber-600" />
                    </div>
                    <p className="text-gray-700 leading-relaxed text-sm">
                      {selectedImage.caption}
                    </p>
                  </div>
                </div>
              )}
              
              <div className="flex flex-col sm:flex-row items-center justify-between gap-4">
                <div className="flex items-center gap-4">
                  <a
                    href={selectedImage.url}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="flex items-center gap-2 px-4 py-2 bg-gray-100 hover:bg-gray-200 rounded-lg text-gray-700 text-sm font-medium transition-colors duration-200"
                    onClick={(e) => e.stopPropagation()}
                  >
                    <ExternalLink className="w-4 h-4" />
                    <span>Open Original</span>
                  </a>
                  <a
                    href={selectedImage.url}
                    download
                    className="flex items-center gap-2 px-4 py-2 bg-gradient-to-r from-amber-500 to-amber-600 hover:from-amber-600 hover:to-amber-700 text-white rounded-lg text-sm font-medium transition-all duration-200 shadow-md hover:shadow-lg"
                    onClick={(e) => e.stopPropagation()}
                  >
                    <Download className="w-4 h-4" />
                    <span>Download Image</span>
                  </a>
                </div>
                
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
                        className={`w-2.5 h-2.5 rounded-full transition-all duration-300 ${currentIndex === idx ? 'bg-amber-600 scale-125' : 'bg-gray-300 hover:bg-gray-400'}`}
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
      `}</style>
    </div>
  );
}

export default GalleryPage;