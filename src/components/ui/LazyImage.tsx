import React, { useState, useRef, useEffect, useCallback } from 'react';

interface LazyImageProps {
  src: string;
  alt: string;
  className?: string;
  placeholder?: string;
  blurDataURL?: string;
  width?: number;
  height?: number;
  priority?: boolean;
  onLoad?: () => void;
  onError?: () => void;
  sizes?: string;
  srcSet?: string;
  loading?: 'lazy' | 'eager';
  decoding?: 'async' | 'sync' | 'auto';
}

export const LazyImage: React.FC<LazyImageProps> = ({
  src,
  alt,
  className = '',
  placeholder,
  blurDataURL,
  width,
  height,
  priority = false,
  onLoad,
  onError,
  sizes,
  srcSet,
  loading = 'lazy',
  decoding = 'async'
}) => {
  const [isLoaded, setIsLoaded] = useState(false);
  const [isError, setIsError] = useState(false);
  const [isInView, setIsInView] = useState(priority);
  const imgRef = useRef<HTMLImageElement>(null);
  const observerRef = useRef<IntersectionObserver>();

  // Intersection Observer for lazy loading
  useEffect(() => {
    if (priority || isInView) return;

    observerRef.current = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            setIsInView(true);
            observerRef.current?.disconnect();
          }
        });
      },
      {
        threshold: 0.1,
        rootMargin: '50px'
      }
    );

    if (imgRef.current) {
      observerRef.current.observe(imgRef.current);
    }

    return () => {
      observerRef.current?.disconnect();
    };
  }, [priority, isInView]);

  const handleLoad = useCallback(() => {
    setIsLoaded(true);
    onLoad?.();
  }, [onLoad]);

  const handleError = useCallback(() => {
    setIsError(true);
    onError?.();
  }, [onError]);

  // Generate optimized src with different formats
  const getOptimizedSrc = (originalSrc: string, format?: 'webp' | 'avif') => {
    if (!format) return originalSrc;
    
    // If using a CDN that supports format conversion
    if (originalSrc.includes('jsdelivr.net') || originalSrc.includes('cloudinary.com')) {
      const url = new URL(originalSrc);
      url.searchParams.set('format', format);
      return url.toString();
    }
    
    return originalSrc;
  };

  // Generate srcSet for responsive images
  const generateSrcSet = () => {
    if (srcSet) return srcSet;
    
    const widths = [320, 640, 768, 1024, 1280, 1536];
    return widths
      .map(w => `${getOptimizedSrc(src)}?w=${w} ${w}w`)
      .join(', ');
  };

  if (isError) {
    return (
      <div 
        className={`${className} bg-gray-200 flex items-center justify-center`}
        style={{ width, height }}
      >
        <svg className="w-8 h-8 text-gray-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 16l4.586-4.586a2 2 0 012.828 0L16 16m-2-2l1.586-1.586a2 2 0 012.828 0L20 14m-6-6h.01M6 20h12a2 2 0 002-2V6a2 2 0 00-2-2H6a2 2 0 00-2 2v12a2 2 0 002 2z" />
        </svg>
      </div>
    );
  }

  return (
    <div className={`relative overflow-hidden ${className}`} style={{ width, height }}>
      {/* Blur placeholder */}
      {blurDataURL && !isLoaded && (
        <img
          src={blurDataURL}
          alt=""
          className="absolute inset-0 w-full h-full object-cover filter blur-sm scale-110"
          aria-hidden="true"
        />
      )}
      
      {/* Color placeholder */}
      {!blurDataURL && !isLoaded && (
        <div 
          className="absolute inset-0 bg-gray-200 animate-pulse"
          style={{ backgroundColor: placeholder || 'var(--color-surface-hover)' }}
        />
      )}

      {/* Main image */}
      {(isInView || priority) && (
        <picture>
          {/* WebP format for modern browsers */}
          <source
            srcSet={generateSrcSet().replace(/\.(jpg|jpeg|png)/g, '.webp')}
            sizes={sizes || '(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw'}
            type="image/webp"
          />
          
          {/* AVIF format for even better compression */}
          <source
            srcSet={generateSrcSet().replace(/\.(jpg|jpeg|png)/g, '.avif')}
            sizes={sizes || '(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw'}
            type="image/avif"
          />
          
          {/* Fallback to original format */}
          <img
            ref={imgRef}
            src={src}
            alt={alt}
            className={`w-full h-full object-cover transition-opacity duration-300 ${
              isLoaded ? 'opacity-100' : 'opacity-0'
            }`}
            onLoad={handleLoad}
            onError={handleError}
            loading={loading}
            decoding={decoding}
            srcSet={generateSrcSet()}
            sizes={sizes || '(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw'}
            width={width}
            height={height}
          />
        </picture>
      )}
    </div>
  );
};

// Hook for image preloading
export const useImagePreloader = () => {
  const preloadedImages = useRef<Set<string>>(new Set());

  const preloadImage = useCallback((src: string): Promise<void> => {
    if (preloadedImages.current.has(src)) {
      return Promise.resolve();
    }

    return new Promise((resolve, reject) => {
      const img = new Image();
      img.onload = () => {
        preloadedImages.current.add(src);
        resolve();
      };
      img.onerror = reject;
      img.src = src;
    });
  }, []);

  const preloadImages = useCallback((srcs: string[]): Promise<void[]> => {
    return Promise.all(srcs.map(preloadImage));
  }, [preloadImage]);

  return { preloadImage, preloadImages };
};

// Optimized image component for product galleries
export const ProductImage: React.FC<{
  src: string;
  alt: string;
  className?: string;
  priority?: boolean;
  sizes?: string;
}> = ({ src, alt, className, priority, sizes }) => {
  return (
    <LazyImage
      src={src}
      alt={alt}
      className={className}
      priority={priority}
      sizes={sizes || '(max-width: 640px) 100vw, (max-width: 1024px) 50vw, 25vw'}
      placeholder="var(--color-surface-hover)"
      loading={priority ? 'eager' : 'lazy'}
      decoding="async"
    />
  );
};

// Image component with zoom functionality
export const ZoomableImage: React.FC<{
  src: string;
  alt: string;
  className?: string;
  zoomScale?: number;
}> = ({ src, alt, className, zoomScale = 2 }) => {
  const [isZoomed, setIsZoomed] = useState(false);
  const [mousePosition, setMousePosition] = useState({ x: 0, y: 0 });
  const containerRef = useRef<HTMLDivElement>(null);

  const handleMouseMove = useCallback((e: React.MouseEvent) => {
    if (!containerRef.current) return;

    const rect = containerRef.current.getBoundingClientRect();
    const x = ((e.clientX - rect.left) / rect.width) * 100;
    const y = ((e.clientY - rect.top) / rect.height) * 100;
    
    setMousePosition({ x, y });
  }, []);

  return (
    <div
      ref={containerRef}
      className={`relative overflow-hidden cursor-zoom-in ${className}`}
      onMouseEnter={() => setIsZoomed(true)}
      onMouseLeave={() => setIsZoomed(false)}
      onMouseMove={handleMouseMove}
    >
      <LazyImage
        src={src}
        alt={alt}
        className={`w-full h-full object-cover transition-transform duration-200 ${
          isZoomed ? `scale-${zoomScale * 100}` : 'scale-100'
        }`}
        style={{
          transformOrigin: `${mousePosition.x}% ${mousePosition.y}%`
        }}
      />
    </div>
  );
};