import React, { useState } from 'react';
import { SLIDESHOW_IMAGES } from '../constants';
import { useInView } from 'react-intersection-observer';
import { ChevronLeft, ChevronRight } from 'lucide-react';

const AboutImageSlideshow = () => {
  const [currentIndex, setCurrentIndex] = useState(0);
  const [isTransitioning, setIsTransitioning] = useState(false);
  const [imageErrors, setImageErrors] = useState<boolean[]>(new Array(SLIDESHOW_IMAGES.length).fill(false));
  const { ref, inView } = useInView({
    triggerOnce: true,
    threshold: 0.1,
  });

  const handleImageError = (index: number) => {
    console.log('Slideshow image failed to load:', SLIDESHOW_IMAGES[index].url);
    setImageErrors(prev => {
      const newState = [...prev];
      newState[index] = true;
      return newState;
    });
  };

  const handlePrevious = () => {
    if (isTransitioning) return;
    setIsTransitioning(true);
    setCurrentIndex((prevIndex) => (prevIndex - 1 + SLIDESHOW_IMAGES.length) % SLIDESHOW_IMAGES.length);
    setTimeout(() => setIsTransitioning(false), 500);
  };

  const handleNext = () => {
    if (isTransitioning) return;
    setIsTransitioning(true);
    setCurrentIndex((prevIndex) => (prevIndex + 1) % SLIDESHOW_IMAGES.length);
    setTimeout(() => setIsTransitioning(false), 500);
  };

  return (
    <div ref={ref} className="relative h-[400px] group overflow-hidden rounded-lg">
      {inView && SLIDESHOW_IMAGES.map((image, index) => (
        <div
          key={image.url}
          className={`absolute inset-0 transition-all duration-500 ${
            index === currentIndex ? 'opacity-100 scale-100' : 'opacity-0 scale-110'
          } ${isTransitioning ? 'transform duration-500' : ''}`}
        >
          {imageErrors[index] ? (
            <div className="absolute inset-0 bg-grunge-dark/80 flex items-center justify-center">
              <div className="text-center">
                <div className="text-4xl mb-2">📷</div>
                <p className="text-grunge-yellow font-metal">{image.alt}</p>
              </div>
            </div>
          ) : (
            <img 
              src={image.url} 
              alt={image.alt}
              className="absolute inset-0 w-full h-full object-cover"
              loading={index === 0 ? "eager" : "lazy"}
              decoding="async"
              sizes="(max-width: 768px) 100vw, 50vw"
              onError={() => {
                console.warn('About slideshow image failed to load:', image.url);
                handleImageError(index);
              }}
            />
          )}
          <div className="absolute inset-0 bg-gradient-to-t from-grunge-dark/80 to-transparent"></div>
        </div>
      ))}
      
      {/* Navigation Arrows */}
      <button
        onClick={handlePrevious}
        className="absolute left-4 top-1/2 -translate-y-1/2 bg-black/50 p-2 rounded-full text-white opacity-0 group-hover:opacity-100 transition-opacity duration-300 hover:bg-black/75"
        aria-label="Previous image"
      >
        <ChevronLeft className="w-6 h-6" />
      </button>
      <button
        onClick={handleNext}
        className="absolute right-4 top-1/2 -translate-y-1/2 bg-black/50 p-2 rounded-full text-white opacity-0 group-hover:opacity-100 transition-opacity duration-300 hover:bg-black/75"
        aria-label="Next image"
      >
        <ChevronRight className="w-6 h-6" />
      </button>

      <div className="absolute bottom-4 left-0 right-0 flex justify-center gap-2 z-10">
        {SLIDESHOW_IMAGES.map((_, index) => (
          <button
            key={index}
            className={`w-2 h-2 rounded-full transition-all duration-300 ${
              index === currentIndex ? 'bg-grunge-red w-4' : 'bg-white/50 hover:bg-white'
            }`}
            onClick={() => {
              if (!isTransitioning) {
                setIsTransitioning(true);
                setCurrentIndex(index);
                setTimeout(() => setIsTransitioning(false), 500);
              }
            }}
          />
        ))}
      </div>
    </div>
  );
};

const About: React.FC = () => {
  const { ref, inView } = useInView({
    threshold: 0.1,
    triggerOnce: true,
  });

  return (
    <section id="about" ref={ref} className="py-20 px-4 relative min-h-screen flex items-center">
      {inView && (
        <>
          <div className="absolute inset-0">
            <div className="shows-bg">
              <div className="shows-grid"></div>
              <div className="shows-noise"></div>
            </div>
          </div>
          <div className="max-w-7xl mx-auto relative z-10">
            <h2 className="text-4xl font-metal mb-8 text-center text-grunge-red">Our Vision</h2>
            <div className="grid md:grid-cols-2 gap-12 items-center">
              <div className="bg-grunge-dark/80 backdrop-blur-sm p-8 rounded-lg border border-grunge-red/20">
                <p className="text-lg mb-6">
                  Death 2 Genres is a live music show and media platform that celebrates artists who push creative boundaries and drive innovation within their respective genres.
                </p>
                <p className="text-lg">
                  Our mission is to produce engaging content, host live shows, and promote unique, disruptive artists creating authentic, quality music that defies genre norms. We champion underground, emerging talent whose originality and genre-blending sound bring fresh energy to the music scene.
                </p>
              </div>
              <AboutImageSlideshow />
            </div>
          </div>
        </>
      )}
    </section>
  );
};

export default About;