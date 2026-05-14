import React from 'react';
import { X, ChevronLeft, ChevronRight } from 'lucide-react';

interface LightboxProps {
  selectedImage: string | null;
  onClose: () => void;
  onPrevious?: () => void;
  onNext?: () => void;
  showNavigation?: boolean;
}

const Lightbox: React.FC<LightboxProps> = ({
  selectedImage,
  onClose,
  onPrevious,
  onNext,
  showNavigation = false
}) => {
  if (!selectedImage) return null;

  return (
    <div
      className="fixed inset-0 bg-black/90 z-50 flex items-center justify-center"
      onClick={onClose}
    >
      <div className="relative max-w-[90vw] max-h-[90vh]">
        <img
          src={selectedImage}
          alt="Gallery preview"
          className="max-h-[90vh] max-w-[90vw] object-contain"
          onClick={(e) => e.stopPropagation()}
        />
        
        <button
          className="absolute top-4 right-4 text-grunge-red hover:text-grunge-yellow transition-colors duration-300"
          onClick={onClose}
        >
          <X className="w-8 h-8" />
        </button>

        {showNavigation && (
          <>
            <button
              className="absolute left-4 top-1/2 -translate-y-1/2 text-grunge-red hover:text-grunge-yellow transition-colors duration-300"
              onClick={(e) => {
                e.stopPropagation();
                onPrevious?.();
              }}
            >
              <ChevronLeft className="w-8 h-8" />
            </button>
            <button
              className="absolute right-4 top-1/2 -translate-y-1/2 text-grunge-red hover:text-grunge-yellow transition-colors duration-300"
              onClick={(e) => {
                e.stopPropagation();
                onNext?.();
              }}
            >
              <ChevronRight className="w-8 h-8" />
            </button>
          </>
        )}
      </div>
    </div>
  );
};

export default Lightbox;