import React, { useState, useEffect } from 'react';
import { Youtube } from 'lucide-react';
import type { PastShow } from '../types';
import { useInView } from 'react-intersection-observer';

interface PastShowsProps {
  pastShows: PastShow[];
}

const PastShowCard = React.memo(({ show }: { show: PastShow }) => {
  const [isLoaded, setIsLoaded] = useState(false);
  const [shouldLoad, setShouldLoad] = useState(false);
  const { ref, inView } = useInView({
    triggerOnce: true,
    threshold: 0.1,
    rootMargin: '100px',
  });

  useEffect(() => {
    if (inView) {
      const timer = setTimeout(() => {
        setShouldLoad(true);
      }, 100);
      return () => clearTimeout(timer);
    }
  }, [inView]);

  return (
    <div 
      ref={ref}
      className="space-y-4 bg-black/30 backdrop-blur-sm p-6 rounded-lg border border-[#f5f5f1]/10 transition-all duration-500 hover:border-[#f5f5f1]/20 will-change-transform"
      style={{ 
        opacity: isLoaded ? 1 : 0.7,
        transform: 'translateZ(0)'
      }}
    >
      <div className="aspect-video relative bg-black/50 rounded-lg overflow-hidden">
        {!isLoaded && inView && (
          <div className="absolute inset-0 flex items-center justify-center">
            <div className="w-8 h-8 border-2 border-[#f5f5f1] rounded-full animate-spin border-t-transparent"></div>
          </div>
        )}
        {shouldLoad && (
          <iframe
            src={`${show.video_url}?autoplay=0&rel=0&modestbranding=1&playsinline=1`}
            title={show.artist}
            className="absolute inset-0 w-full h-full rounded-lg"
            allow="accelerometer; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
            allowFullScreen
            onLoad={() => setIsLoaded(true)}
            loading="lazy"
          ></iframe>
        )}
      </div>
      <h3 className="text-xl font-metal text-[#f5f5f1]">{show.artist}</h3>
      <p className="text-gray-400">{show.description}</p>
    </div>
  );
});

PastShowCard.displayName = 'PastShowCard';

const PastShows: React.FC<PastShowsProps> = ({ pastShows }) => {
  const { ref, inView } = useInView({
    threshold: 0,
    triggerOnce: true,
  });

  return (
    <section 
      id="archive" 
      ref={ref}
      className="min-h-screen py-20 px-4 relative overflow-hidden flex items-center"
      style={{ transform: 'translateZ(0)' }}
    >
      <div className="absolute inset-0">
        <div className="past-shows-bg">
          <div className="past-shows-grid"></div>
        </div>
      </div>
      
      <div className="max-w-7xl mx-auto relative z-10 w-full">
        <div className="flex items-center justify-center mb-12">
          <Youtube className="w-8 h-8 text-[#f5f5f1] mr-3" />
          <h2 className="text-4xl lg:text-5xl font-metal text-[#f5f5f1]">Past Shows</h2>
        </div>
        {inView && (
          <div className="grid md:grid-cols-2 gap-12">
            {pastShows.map((show) => (
              <PastShowCard key={show.id} show={show} />
            ))}
          </div>
        )}
      </div>
    </section>
  );
};

export default React.memo(PastShows);