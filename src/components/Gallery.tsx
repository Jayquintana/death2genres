import React, { memo, useState, useCallback } from 'react';
import { Camera, ArrowRight } from 'lucide-react';
import { Link } from 'react-router-dom';
import type { GalleryImage } from '../types';
import { useInView } from 'react-intersection-observer';

interface GalleryProps {
  images: GalleryImage[];
  onImageSelect: (url: string) => void;
}

const GalleryImage = memo(({ image, onSelect }: { 
  image: GalleryImage; 
  onSelect: (url: string) => void;
}) => {
  const [isLoaded, setIsLoaded] = useState(false);
  const [hasError, setHasError] = useState(false);
  const { ref, inView } = useInView({
    triggerOnce: true,
    threshold: 0.1,
    rootMargin: '200px',
  });

  const handleError = useCallback(() => {
    console.warn('Image failed to load:', image.url);
    setHasError(true);
  }, [image.url]);

  const handleLoad = useCallback(() => {
    setIsLoaded(true);
  }, [image.url]);

  const handleClick = useCallback(() => {
    onSelect(image.url);
  }, [image.url, onSelect]);

  if (!inView) {
    return <div ref={ref} className="aspect-square bg-black/20 rounded-lg" />;
  }

  if (hasError) {
    return (
      <div
        ref={ref}
        className="aspect-square bg-black/20 rounded-lg flex items-center justify-center cursor-pointer"
        onClick={handleClick}
      >
        <div className="text-center p-4">
          <div className="w-8 h-8 mx-auto mb-2 text-gray-500">📷</div>
          <p className="text-xs text-gray-500">{image.caption}</p>
        </div>
      </div>
    );
  }
  return (
    <div
      ref={ref}
      className="relative group cursor-pointer overflow-hidden transform-gpu"
      onClick={handleClick}
    >
      {/* High-quality image */}
      <img
        src={image.url}
        alt={image.caption}
        className={`w-full aspect-square object-cover rounded-lg transition-all duration-500 group-hover:scale-110 ${
          isLoaded ? 'opacity-100' : 'opacity-0'
        }`}
        loading="lazy"
        decoding="async"
        sizes="(max-width: 768px) 50vw, 33vw"
        onLoad={handleLoad}
        onError={handleError}
      />
      
      <div className="absolute inset-0 bg-gradient-to-t from-black to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300 rounded-lg flex items-end justify-center p-4">
        <p className="text-white text-center font-metal">{image.caption}</p>
      </div>
      
      {!isLoaded && (
        <div className="absolute inset-0 bg-black/50 flex items-center justify-center">
          <div className="w-8 h-8 border-2 border-grunge-red rounded-full animate-spin border-t-transparent"></div>
        </div>
      )}
    </div>
  );
});

GalleryImage.displayName = 'GalleryImage';

const Gallery: React.FC<GalleryProps> = memo(({ images, onImageSelect }) => {
  const { ref, inView } = useInView({
    threshold: 0,
    triggerOnce: true,
    rootMargin: '200px',
  });

  console.log('Gallery component received images:', images.length, images);

  const previewImages = images.slice(0, 6);

  return (
    <section 
      id="gallery" 
      ref={ref}
      className="min-h-screen py-20 px-4 bg-gradient-to-b from-black to-grunge-dark relative flex items-center transform-gpu"
    >
      <div className="max-w-7xl mx-auto w-full">
        <div className="flex items-center justify-center mb-12">
          <Camera className="w-8 h-8 text-[#f5f5f1] mr-3" />
          <h2 className="text-4xl lg:text-5xl font-metal text-[#f5f5f1]">Photo Gallery</h2>
        </div>
        {inView && (
          <div className="grid grid-cols-2 md:grid-cols-3 gap-4">
            {previewImages.map((image) => (
              <GalleryImage 
                key={image.id} 
                image={image} 
                onSelect={onImageSelect} 
              />
            ))}
          </div>
        )}
        <div className="mt-12 flex justify-center">
          <Link
            to="/gallery"
            className="flex items-center gap-2 bg-[#f5f5f1]/10 hover:bg-[#f5f5f1]/20 transition-colors duration-300 px-6 py-3 rounded-lg font-metal text-lg group"
          >
            See More Photos
            <ArrowRight className="w-5 h-5 transform group-hover:translate-x-1 transition-transform duration-300" />
          </Link>
        </div>
      </div>
    </section>
  );
});

Gallery.displayName = 'Gallery';

export default Gallery;