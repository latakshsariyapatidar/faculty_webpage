/**
 * Gallery Page Component
 *
 * Displays faculty member's image gallery in a responsive grid layout.
 * Images are displayed with lightbox functionality for viewing.
 *
 * @module pages/GalleryPage
 */

import React, { useState } from "react";
import { Image as ImageIcon, X, ChevronLeft, ChevronRight } from "lucide-react";

/**
 * Gallery page component
 *
 * @param {Object} props
 * @param {Array<Object>} props.data - Array of image objects with url and alt text
 * @returns {JSX.Element}
 */
function GalleryPage({ data }) {
  const [selectedImage, setSelectedImage] = useState(null);
  const [selectedIndex, setSelectedIndex] = useState(0);

  // Open lightbox with selected image
  const openLightbox = (image, index) => {
    setSelectedImage(image);
    setSelectedIndex(index);
  };

  // Close lightbox
  const closeLightbox = () => {
    setSelectedImage(null);
    setSelectedIndex(0);
  };

  // Navigate to previous image
  const previousImage = React.useCallback(
    (e) => {
      e.stopPropagation();
      if (!data || data.length === 0) return;
      setSelectedIndex((prevIndex) => {
        const newIndex = prevIndex > 0 ? prevIndex - 1 : data.length - 1;
        setSelectedImage(data[newIndex]);
        return newIndex;
      });
    },
    [data]
  );

  // Navigate to next image
  const nextImage = React.useCallback(
    (e) => {
      e.stopPropagation();
      if (!data || data.length === 0) return;
      setSelectedIndex((prevIndex) => {
        const newIndex = prevIndex < data.length - 1 ? prevIndex + 1 : 0;
        setSelectedImage(data[newIndex]);
        return newIndex;
      });
    },
    [data]
  );

  // Add keyboard event listener
  React.useEffect(() => {
    const handleKeyDown = (e) => {
      if (!selectedImage) return;

      if (e.key === "Escape") {
        closeLightbox();
      } else if (e.key === "ArrowLeft") {
        previousImage(e);
      } else if (e.key === "ArrowRight") {
        nextImage(e);
      }
    };

    if (selectedImage) {
      window.addEventListener("keydown", handleKeyDown);
      return () => window.removeEventListener("keydown", handleKeyDown);
    }
  }, [selectedImage, previousImage, nextImage]);

  // Handle case when no gallery data is available
  if (!data || data.length === 0) {
    return (
      <div className="flex flex-col items-center justify-center min-h-[400px] text-gray-500">
        <ImageIcon size={64} className="mb-4 opacity-50" />
        <p className="text-lg">No gallery images available.</p>
      </div>
    );
  }

  return (
    <div className="space-y-6">
      {/* Page Header */}
      <div className="flex items-center gap-3 mb-6">
        <ImageIcon size={28} className="text-primary" />
        <h1 className="text-2xl font-semibold text-gray-900">Image Gallery</h1>
      </div>

      {/* Image Gallery Grid */}
      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4">
        {data.map((image, index) => (
          <div key={index} className="space-y-3">
            {/* Caption Before (if position is 'before') */}
            {image.caption && image.caption_position === "before" && (
              <div className="bg-purple-50 p-3 rounded-lg border-l-4 border-purple-600">
                <p className="text-sm text-gray-700 leading-relaxed">
                  {image.caption}
                </p>
              </div>
            )}

            {/* Image Container */}
            <div
              className="relative group cursor-pointer overflow-hidden rounded-lg border border-gray-200 bg-white hover:shadow-lg transition-shadow duration-300"
              onClick={() => openLightbox(image, index)}
            >
              <div className="aspect-square relative">
                <img
                  src="https://drive.google.com/uc?export=view&id=1ak1lCZ4RBIDR8eRAp_RdGXT5aV-SHHAJ"
                  alt={image.alt || `Gallery image ${index + 1}`}
                  className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-300"
                  onError={(e) => {
                    console.log(e);
                  }}
                />

                {/* Overlay on hover */}
                <div className="absolute inset-0 bg-black bg-opacity-0 group-hover:bg-opacity-30 transition-opacity duration-300 flex items-center justify-center">
                  <ImageIcon
                    size={32}
                    className="text-white opacity-0 group-hover:opacity-100 transition-opacity duration-300"
                  />
                </div>
              </div>

              {/* Alt Text (if available and no caption) */}
              {image.alt && !image.caption && (
                <div className="p-2 text-xs text-gray-600 text-center bg-gray-50">
                  {image.alt}
                </div>
              )}
            </div>

            {/* Caption After (if position is 'after' or default) */}
            {image.caption && image.caption_position !== "before" && (
              <div className="bg-amber-50 p-3 rounded-lg border-l-4 border-amber-500">
                <p className="text-sm text-gray-700 leading-relaxed">
                  {image.caption}
                </p>
              </div>
            )}
          </div>
        ))}
      </div>

      {/* Lightbox Modal */}
      {selectedImage && (
        <div
          className="fixed inset-0 bg-black bg-opacity-90 z-50 flex items-center justify-center p-4"
          onClick={closeLightbox}
        >
          {/* Close Button */}
          <button
            onClick={closeLightbox}
            className="absolute top-4 right-4 text-white hover:text-gray-300 transition-colors z-10"
            aria-label="Close lightbox"
          >
            <X size={32} />
          </button>

          {/* Previous Button */}
          {data.length > 1 && (
            <button
              onClick={previousImage}
              className="absolute left-4 text-white hover:text-gray-300 transition-colors z-10"
              aria-label="Previous image"
            >
              <ChevronLeft size={48} />
            </button>
          )}

          {/* Image Container */}
          <div
            className="max-w-5xl max-h-[90vh] flex flex-col items-center"
            onClick={(e) => e.stopPropagation()}
          >
            <img
              src={selectedImage.url}
              alt={selectedImage.alt || `Gallery image ${selectedIndex + 1}`}
              className="max-w-full max-h-[80vh] object-contain rounded-lg shadow-2xl"
            />

            {/* Image Caption */}
            {selectedImage.alt && (
              <div className="mt-4 text-white text-center text-lg">
                {selectedImage.alt}
              </div>
            )}

            {/* Image Counter */}
            <div className="mt-2 text-gray-400 text-sm">
              {selectedIndex + 1} / {data.length}
            </div>
          </div>

          {/* Next Button */}
          {data.length > 1 && (
            <button
              onClick={nextImage}
              className="absolute right-4 text-white hover:text-gray-300 transition-colors z-10"
              aria-label="Next image"
            >
              <ChevronRight size={48} />
            </button>
          )}
        </div>
      )}

      {/* Image Count */}
      <div className="text-center text-sm text-gray-500">
        Total Images: {data.length}
      </div>
    </div>
  );
}

export default GalleryPage;
