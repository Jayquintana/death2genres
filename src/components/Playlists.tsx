import React, { memo, useState } from 'react';
import { Music, ExternalLink } from 'lucide-react';
import type { Playlist } from '../types';
import { useInView } from 'react-intersection-observer';

interface PlaylistsProps {
  playlists: Playlist[];
}

const VinylRecord = memo(({ playlist, isExpanded, onToggle }: {
  playlist: Playlist;
  isExpanded: boolean;
  onToggle: () => void;
}) => {
  const [isHovered, setIsHovered] = useState(false);

  return (
    <div className="flex flex-col items-center">
      <div
        className="relative group cursor-pointer"
        onClick={onToggle}
        onMouseEnter={() => setIsHovered(true)}
        onMouseLeave={() => setIsHovered(false)}
      >
        <div className={`relative w-48 h-48 lg:w-64 lg:h-64 transition-all duration-500
          ${isHovered ? 'scale-110' : 'scale-100'}`}
        >
          <div className={`w-full h-full rounded-full bg-gradient-to-br from-black via-gray-900 to-black
            border-4 border-grunge-red shadow-2xl relative overflow-hidden
            ${isHovered || isExpanded ? 'animate-spin-slow' : ''}`}
            style={{ animationDuration: '3s' }}
          >
            <div className="absolute inset-0 flex items-center justify-center">
              <div className="w-16 h-16 rounded-full bg-grunge-yellow"></div>
            </div>

            <div className="absolute inset-8">
              {[...Array(12)].map((_, i) => (
                <div
                  key={i}
                  className="absolute top-1/2 left-1/2 w-full h-0.5 bg-gray-800"
                  style={{
                    transform: `translate(-50%, -50%) rotate(${i * 30}deg)`,
                    transformOrigin: 'center'
                  }}
                ></div>
              ))}
            </div>
          </div>

          {isHovered && !isExpanded && (
            <div className="absolute inset-0 flex items-center justify-center pointer-events-none">
              <div className="bg-black/90 backdrop-blur-sm p-6 rounded-lg border-2 border-grunge-red
                max-w-xs text-center animate-fadeIn"
              >
                <h4 className="text-lg font-metal text-grunge-yellow mb-2">{playlist.title}</h4>
                {playlist.description && (
                  <p className="text-sm text-gray-300 line-clamp-4">{playlist.description}</p>
                )}
              </div>
            </div>
          )}
        </div>
      </div>

      <div className={`mt-6 w-full max-w-2xl transition-all duration-500 overflow-hidden
        ${isExpanded ? 'opacity-100 max-h-[600px]' : 'opacity-0 max-h-0'}`}
      >
        {isExpanded && (
          <div className="bg-black/80 backdrop-blur-sm p-6 rounded-lg border-2 border-grunge-red">
            <div className="mb-4">
              <h4 className="text-2xl font-metal text-grunge-yellow mb-2">{playlist.title}</h4>
              {playlist.description && (
                <p className="text-gray-400 mb-4">{playlist.description}</p>
              )}
              <a
                href={playlist.spotify_url}
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center gap-2 text-grunge-red hover:text-grunge-yellow
                  transition-colors duration-300 font-metal"
              >
                <span>Open in Spotify</span>
                <ExternalLink className="w-5 h-5" />
              </a>
            </div>

            {playlist.embed_url && (
              <div className="aspect-[4/5] w-full max-h-[400px]">
                <iframe
                  src={playlist.embed_url}
                  width="100%"
                  height="100%"
                  frameBorder="0"
                  allow="autoplay; clipboard-write; encrypted-media; fullscreen; picture-in-picture"
                  loading="lazy"
                  className="rounded-lg"
                ></iframe>
              </div>
            )}
          </div>
        )}
      </div>
    </div>
  );
});

VinylRecord.displayName = 'VinylRecord';

const Playlists: React.FC<PlaylistsProps> = ({ playlists }) => {
  const { ref, inView } = useInView({
    threshold: 0,
    triggerOnce: true,
  });

  const [expandedId, setExpandedId] = useState<string | null>(null);

  const handleToggle = (id: string) => {
    setExpandedId(expandedId === id ? null : id);
  };

  const sortedPlaylists = [...playlists].sort((a, b) => (a.order || 0) - (b.order || 0));

  return (
    <section
      id="playlists"
      ref={ref}
      className="py-24 lg:py-32 px-4 relative overflow-hidden"
    >
      <div className="absolute inset-0">
        <div className="shows-bg">
          <div className="shows-grid"></div>
          <div className="shows-noise"></div>
        </div>
      </div>

      <div className="max-w-7xl mx-auto relative z-10">
        <div className="flex items-center justify-center mb-16 lg:mb-24">
          <Music className="w-8 h-8 lg:w-10 lg:h-10 text-grunge-red mr-3" />
          <h2 className="text-4xl lg:text-6xl font-metal text-grunge-red">Our Playlists</h2>
        </div>

        {inView && (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-12 lg:gap-16">
            {sortedPlaylists.map((playlist, index) => {
              const playlistId = playlist.id || `playlist-${index}`;
              return (
                <VinylRecord
                  key={playlistId}
                  playlist={playlist}
                  isExpanded={expandedId === playlistId}
                  onToggle={() => handleToggle(playlistId)}
                />
              );
            })}
          </div>
        )}
      </div>
    </section>
  );
};

export default memo(Playlists);