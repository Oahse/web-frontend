import React, { useState, useEffect,useCallback } from 'react';
import { ChevronLeftIcon, ChevronRightIcon, ZoomInIcon, XIcon } from 'lucide-react';
import { motion, AnimatePresence } from 'framer-motion';
import { cn } from '../../lib/utils';

interface ProductVariantImage {
  id: string;
  variant_id: string;
  url: string;
  alt_text?: string;
  sort_order: number;
  is_primary: boolean;
}

interface ProductImageGalleryProps {
  images: ProductVariantImage[];
  selectedImageIndex: number;
  onImageSelect: (index: number) => void;
  showThumbnails?: boolean;
  zoomEnabled?: boolean;
  className?: string;
}

export const ProductImageGallery: React.FC<ProductImageGalleryProps> = ({
  images,
  selectedImageIndex,
  onImageSelect,
  showThumbnails = true,
  zoomEnabled = true,
  className
}) => {
  const [isZoomed, setIsZoomed] = useState(false);
  const [zoomPosition, setZoomPosition] = useState({ x: 0, y: 0 });
  const [isFullscreen, setIsFullscreen] = useState(false);

  // Sort images by sort_order
  const sortedImages = [...images].sort((a, b) => a.sort_order - b.sort_order);
  
  const currentImage = sortedImages[selectedImageIndex];

  const nextImage = useCallback(() => {
    const nextIndex = (selectedImageIndex + 1) % sortedImages.length;
    onImageSelect(nextIndex);
  }, [selectedImageIndex, sortedImages.length, onImageSelect]);

  const prevImage = useCallback(() => {
    const prevIndex = (selectedImageIndex - 1 + sortedImages.length) % sortedImages.length;
    onImageSelect(prevIndex);
  }, [selectedImageIndex, sortedImages.length, onImageSelect]);

  const handleMouseMove = (e: React.MouseEvent<HTMLDivElement>) => {
    if (!zoomEnabled || !isZoomed) return;
    
    const rect = e.currentTarget.getBoundingClientRect();
    const x = ((e.clientX - rect.left) / rect.width) * 100;
    const y = ((e.clientY - rect.top) / rect.height) * 100;
    
    setZoomPosition({ x, y });
  };

  const handleKeyDown = useCallback((e: KeyboardEvent) => {
    if (isFullscreen) {
      if (e.key === 'Escape') {
        setIsFullscreen(false);
      } else if (e.key === 'ArrowLeft') {
        prevImage();
      } else if (e.key === 'ArrowRight') {
        nextImage();
      }
    }
  }, [isFullscreen, setIsFullscreen, prevImage, nextImage]);

  useEffect(() => {
    document.addEventListener('keydown', handleKeyDown);
    return () => document.removeEventListener('keydown', handleKeyDown);
  }, [isFullscreen, selectedImageIndex]);

  if (!sortedImages.length) {
    return (
      <div className={cn('bg-surface rounded-lg flex items-center justify-center h-96', className)}>
        <span className="text-gray-500">No images available</span>
      </div>
    );
  }

  return (
    <div className={cn('space-y-4', className)}>
      {/* Main Image */}
      <div className="relative group">
        <div 
          className="relative overflow-hidden rounded-lg bg-surface cursor-zoom-in"
          onMouseEnter={() => zoomEnabled && setIsZoomed(true)}
          onMouseLeave={() => setIsZoomed(false)}
          onMouseMove={handleMouseMove}
          onClick={() => setIsFullscreen(true)}
        >
          <img
            src={currentImage.url}
            alt={currentImage.alt_text || `Product image ${selectedImageIndex + 1}`}
            className={cn(
              'w-full h-96 object-cover transition-transform duration-300 ',
              isZoomed && 'scale-150'
            )}
            style={
              isZoomed
                ? {
                    transformOrigin: `${zoomPosition.x}% ${zoomPosition.y}%`,
                  }
                : {}
            }
          />
          
          {/* Zoom indicator */}
          {zoomEnabled && (
            <div className="absolute top-4 right-4 bg-black/50 text-white p-2 rounded-full opacity-0 group-hover:opacity-100 transition-opacity">
              <ZoomInIcon size={16} />
            </div>
          )}
        </div>

        {/* Navigation arrows */}
        {sortedImages.length > 1 && (
          <>
            <button
              onClick={prevImage}
              className="absolute left-4 top-1/2 transform -translate-y-1/2 bg-white/80 hover:bg-white text-gray-800 w-10 h-10 rounded-full flex items-center justify-center shadow-md transition-colors opacity-0 group-hover:opacity-100"
            >
              <ChevronLeftIcon size={20} />
            </button>
            <button
              onClick={nextImage}
              className="absolute right-4 top-1/2 transform -translate-y-1/2 bg-white/80 hover:bg-white text-gray-800 w-10 h-10 rounded-full flex items-center justify-center shadow-md transition-colors opacity-0 group-hover:opacity-100"
            >
              <ChevronRightIcon size={20} />
            </button>
          </>
        )}

        {/* Image counter */}
        {sortedImages.length > 1 && (
          <div className="absolute bottom-4 left-4 bg-black/50 text-white px-3 py-1 rounded-full text-sm">
            {selectedImageIndex + 1} / {sortedImages.length}
          </div>
        )}
      </div>

      {/* Thumbnails */}
      {showThumbnails && sortedImages.length > 1 && (
        <div className="grid grid-cols-4 gap-2">
          {sortedImages.map((image, index) => (
            <button
              key={image.id}
              onClick={() => onImageSelect(index)}
              className={cn(
                'relative overflow-hidden rounded-md border-2 transition-all h-20',
                selectedImageIndex === index
                  ? 'border-primary ring-2 ring-primary/20'
                  : 'border-gray-200 hover:border-gray-300'
              )}
            >
              <img
                src={image.url}
                alt={image.alt_text || `Thumbnail ${index + 1}`}
                className="w-full h-full object-cover"
              />
              {image.is_primary && (
                <div className="absolute top-1 left-1 bg-primary text-white text-xs px-1 rounded">
                  Primary
                </div>
              )}
            </button>
          ))}
        </div>
      )}

      {/* Fullscreen Modal */}
      <AnimatePresence>
        {isFullscreen && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 bg-black/90 z-50 flex items-center justify-center"
            onClick={() => setIsFullscreen(false)}
          >
            <div className="relative max-w-7xl max-h-full p-4">
              <img
                src={currentImage.url}
                alt={currentImage.alt_text || `Product image ${selectedImageIndex + 1}`}
                className="max-w-full max-h-full object-contain"
                onClick={(e) => e.stopPropagation()}
              />
              
              {/* Close button */}
              <button
                onClick={() => setIsFullscreen(false)}
                className="absolute top-4 right-4 bg-white/20 hover:bg-white/30 text-white w-10 h-10 rounded-full flex items-center justify-center transition-colors"
              >
                <XIcon size={20} />
              </button>

              {/* Navigation in fullscreen */}
              {sortedImages.length > 1 && (
                <>
                  <button
                    onClick={(e) => {
                      e.stopPropagation();
                      prevImage();
                    }}
                    className="absolute left-4 top-1/2 transform -translate-y-1/2 bg-white/20 hover:bg-white/30 text-white w-12 h-12 rounded-full flex items-center justify-center transition-colors"
                  >
                    <ChevronLeftIcon size={24} />
                  </button>
                  <button
                    onClick={(e) => {
                      e.stopPropagation();
                      nextImage();
                    }}
                    className="absolute right-4 top-1/2 transform -translate-y-1/2 bg-white/20 hover:bg-white/30 text-white w-12 h-12 rounded-full flex items-center justify-center transition-colors"
                  >
                    <ChevronRightIcon size={24} />
                  </button>
                </>
              )}

              {/* Image counter in fullscreen */}
              <div className="absolute bottom-4 left-1/2 transform -translate-x-1/2 bg-white/20 text-white px-4 py-2 rounded-full">
                {selectedImageIndex + 1} / {sortedImages.length}
              </div>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
};