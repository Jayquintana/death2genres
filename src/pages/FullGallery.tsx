import React, { useState } from 'react';
import { Camera, ArrowLeft } from 'lucide-react';
import { Link } from 'react-router-dom';
import type { GalleryImage } from '../types';
import Lightbox from '../components/Lightbox';
import { useInView } from 'react-intersection-observer';

interface FullGalleryProps {
  images: GalleryImage[];
  onImageSelect: (url: string) => void;
}

const GalleryImage = ({ image, onClick }: { 
  image: GalleryImage; 
  onClick: () => void;
}) => {
  const [isLoaded, setIsLoaded] = useState(false);
  const [hasError, setHasError] = useState(false);
  const { ref, inView } = useInView({
    triggerOnce: true,
    threshold: 0.1,
    rootMargin: '100px',
  });

  if (hasError) {
    return (
      <div
        ref={ref}
        className="relative group cursor-pointer overflow-hidden aspect-square bg-black/20 rounded-lg flex items-center justify-center"
        onClick={onClick}
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
      className="relative group cursor-pointer overflow-hidden"
      onClick={onClick}
    >
      {inView && (
        <>
          <img
            src={image.url}
            alt={image.caption}
            className={`w-full aspect-square object-cover rounded-lg transition-transform duration-500 group-hover:scale-110 ${
              isLoaded ? 'opacity-100' : 'opacity-0'
            }`}
            loading="lazy"
            decoding="async"
            sizes="(max-width: 768px) 50vw, 25vw"
            onLoad={() => setIsLoaded(true)}
            onError={() => {
              console.warn('Gallery image failed to load:', image.url);
              setHasError(true);
            }}
          />
          
          <div className="absolute inset-0 bg-gradient-to-t from-grunge-dark to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300 rounded-lg flex items-end justify-center p-4">
            <p className="text-white text-center font-metal">{image.caption}</p>
          </div>
          
          {!isLoaded && (
            <div className="absolute inset-0 bg-grunge-dark/50 flex items-center justify-center">
              <div className="w-8 h-8 border-2 border-grunge-red rounded-full animate-spin border-t-transparent"></div>
            </div>
          )}
        </>
      )}
    </div>
  );
};

const FullGallery: React.FC<FullGalleryProps> = ({ images }) => {
  const [selectedImage, setSelectedImage] = useState<string | null>(null);
  const [currentIndex, setCurrentIndex] = useState<number>(0);

  const handleImageClick = (url: string, index: number) => {
    setSelectedImage(url);
    setCurrentIndex(index);
  };

  const handlePrevious = () => {
    const newIndex = (currentIndex - 1 + images.length) % images.length;
    setCurrentIndex(newIndex);
    setSelectedImage(images[newIndex].url);
  };

  const handleNext = () => {
    const newIndex = (currentIndex + 1) % images.length;
    setCurrentIndex(newIndex);
    setSelectedImage(images[newIndex].url);
  };

  return (
    <div className="min-h-screen bg-grunge-dark text-white font-grotesk">
      <div className="fixed inset-0 grunge-overlay"></div>
      
      <div className="relative z-10 py-20 px-4">
        <div className="max-w-7xl mx-auto">
          <div className="flex items-center justify-between mb-8">
            <div className="flex items-center">
              <Camera className="w-6 h-6 text-grunge-red mr-2" />
              <h1 className="text-4xl font-metal text-grunge-red">Photo Gallery</h1>
            </div>
            <Link
              to="/"
              className="flex items-center gap-2 text-grunge-red hover:text-grunge-yellow transition-colors duration-300 font-metal"
            >
              <ArrowLeft className="w-5 h-5" />
              Back to Home
            </Link>
          </div>
          
          <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4">
            {images.map((image, index) => (
              <GalleryImage
                key={image.id}
                image={image}
                onClick={() => handleImageClick(image.url, index)}
              />
            ))}
          </div>
        </div>
      </div>

      <Lightbox
        selectedImage={selectedImage}
        onClose={() => setSelectedImage(null)}
        onPrevious={handlePrevious}
        onNext={handleNext}
        showNavigation={true}
      />
    </div>
  );
};

export default FullGallery;