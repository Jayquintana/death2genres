import React, { useState, useEffect } from 'react';
import { Music, X, ExternalLink } from 'lucide-react';
import { supabase } from '../lib/supabase';
import { format, parseISO } from 'date-fns';
import type { Playlist, Show } from '../types';

interface MelodyLockProps {
  onUnlock: () => void;
}

const MelodyLock: React.FC<MelodyLockProps> = ({ onUnlock }) => {
  const [latestPlaylist, setLatestPlaylist] = useState<Playlist | null>(null);
  const [nextShow, setNextShow] = useState<Show | null>(null);
  const [showPlaylistInfo, setShowPlaylistInfo] = useState(false);
  const [isLoading, setIsLoading] = useState(true);
  const [isModalOpen, setIsModalOpen] = useState(false);

  useEffect(() => {
    fetchLatestData();
  }, []);

  const fetchLatestData = async () => {
    try {
      // Fetch latest playlist
      const { data: playlistData } = await supabase
        .from('playlists')
        .select('*')
        .order('created_at', { ascending: false })
        .limit(1);

      // Fetch next upcoming show
      const { data: showData } = await supabase
        .from('shows')
        .select('*')
        .gte('date', new Date().toISOString().split('T')[0])
        .order('date', { ascending: true })
        .limit(1);

      if (playlistData && playlistData.length > 0) {
        setLatestPlaylist(playlistData[0]);
      }

      if (showData && showData.length > 0) {
        setNextShow(showData[0]);
      }
    } catch (error) {
      console.error('Error fetching latest data:', error);
    } finally {
      setIsLoading(false);
    }
  };

  const handleEnterSite = () => {
    onUnlock();
  };

  const handleVinylClick = () => {
    if (latestPlaylist) {
      setIsModalOpen(true);
    }
  };

  const togglePlaylistInfo = () => {
    setShowPlaylistInfo(!showPlaylistInfo);
  };

  const formatDisplayDate = (dateStr: string) => {
    const date = parseISO(dateStr);
    return format(date, 'MMMM d, yyyy');
  };

  return (
    <div className="min-h-screen bg-grunge-dark flex items-center justify-center px-4 relative overflow-hidden">
      <div className="absolute inset-0">
        <div className="animated-bg"></div>
      </div>
      
      <div className="max-w-2xl w-full relative z-10">
        <div className="text-center mb-8 sm:mb-12">
          <h1 className="text-4xl sm:text-5xl md:text-7xl font-metal text-grunge-red mb-4 sm:mb-6 leading-tight">
            <div className="inline-block">
              {'DEATH'.split('').map((char, i) => (
                <span key={i} style={{ animationDelay: `${i * 0.1}s` }}>
                  {char}
                </span>
              ))}
            </div>
            <div className="inline-block mx-2">
              {'2'.split('').map((char, i) => (
                <span key={i} style={{ animationDelay: `${(i + 5) * 0.1}s` }}>
                  {char}
                </span>
              ))}
            </div>
            <div className="inline-block">
              {'GENRES'.split('').map((char, i) => (
                <span key={i} style={{ animationDelay: `${(i + 6) * 0.1}s` }}>
                  {char}
                </span>
              ))}
            </div>
          </h1>
          <p className="text-base sm:text-lg md:text-xl text-grunge-yellow mb-6 sm:mb-8 opacity-0 animate-[fadeIn_1s_ease-in_forwards_1s] px-4">
            Celebrating artists who break boundaries and redefine music
          </p>
          
          <div className="flex flex-col items-center gap-6 mb-8 sm:mb-12">
            {/* Main Enter Site Button */}
            <button
              onClick={handleEnterSite}
              className="flex items-center gap-2 bg-grunge-red px-6 sm:px-8 py-3 sm:py-4 rounded-lg hover:bg-grunge-yellow transition-all duration-300 font-metal text-base sm:text-lg group z-10 relative"
            >
              <Music className="w-5 h-5 group-hover:rotate-12 transition-transform duration-300" />
              Enter Site
            </button>
            
            {/* Vinyl Record Button */}
            <div className="relative flex flex-col items-center gap-4">
              <button
                onClick={handleVinylClick}
                onMouseEnter={togglePlaylistInfo}
                onMouseLeave={togglePlaylistInfo}
                className="relative group"
                title={latestPlaylist ? `Listen to: ${latestPlaylist.title}` : 'Latest Playlist'}
                disabled={!latestPlaylist || isLoading}
              >
                {/* Vinyl Record */}
                <div className={`w-20 sm:w-24 h-20 sm:h-24 rounded-full bg-gradient-to-br from-gray-900 via-black to-gray-800 border-2 transition-all duration-300 ${
                  latestPlaylist && !isLoading 
                    ? 'border-grunge-red shadow-lg shadow-grunge-red/20 animate-vinyl-spin' 
                    : 'border-gray-600 opacity-50'
                } relative overflow-hidden cursor-pointer`}>
                  {/* Vinyl grooves */}
                  <div className="absolute inset-2 rounded-full border border-gray-700"></div>
                  <div className="absolute inset-4 rounded-full border border-gray-600"></div>
                  <div className="absolute inset-6 rounded-full border border-gray-500"></div>
                  
                  {/* Center label */}
                  <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-5 sm:w-6 h-5 sm:h-6 rounded-full bg-grunge-red flex items-center justify-center">
                    <div className="w-1 h-1 rounded-full bg-black"></div>
                  </div>
                  
                  {/* Music note pattern around the edge */}
                  <div className="absolute inset-1 rounded-full">
                    {Array.from({ length: 8 }).map((_, i) => (
                      <div
                        key={i}
                        className="absolute w-1 h-2 bg-grunge-yellow/30 origin-bottom"
                        style={{
                          transform: `rotate(${i * 45}deg) translateY(-28px)`,
                          transformOrigin: 'center 32px',
                        }}
                      />
                    ))}
                  </div>
                  
                  {/* Hover overlay */}
                  <div className="absolute inset-0 rounded-full bg-grunge-red/0 transition-colors duration-300"></div>
                  
                  {/* Loading indicator */}
                  {isLoading && (
                    <div className="absolute inset-0 rounded-full bg-black/50 flex items-center justify-center">
                      <div className="w-4 h-4 border-2 border-grunge-red rounded-full animate-spin border-t-transparent"></div>
                    </div>
                  )}
                </div>
                
                {/* Vinyl arm/needle */}
                <div className="absolute -top-2 -right-2 w-10 h-1 bg-gradient-to-r from-gray-600 to-gray-400 rounded-full origin-left rotate-12">
                  <div className="absolute right-0 top-1/2 -translate-y-1/2 w-2 h-2 bg-grunge-yellow rounded-full"></div>
                </div>
              </button>
            </div>
          </div>
        </div>

        {!isLoading && latestPlaylist && (
          <div className="text-center">
            <p className="text-xs sm:text-sm text-gray-400 mb-2">
              Click the vinyl to listen to our latest playlist
            </p>
            {nextShow && (
              nextShow.ticket_url ? (
                <a
                  href={nextShow.ticket_url}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="text-xs text-gray-500 hover:text-grunge-red transition-colors duration-300 cursor-pointer underline decoration-dotted underline-offset-2"
                >
                  Next show: {nextShow.artist} on {formatDisplayDate(nextShow.date)}
                </a>
              ) : (
                <p className="text-xs text-gray-500">
                  Next show: {nextShow.artist} on {formatDisplayDate(nextShow.date)}
                </p>
              )
            )}
          </div>
        )}
      </div>

      {isModalOpen && latestPlaylist && (
        <div
          className="fixed inset-0 bg-black/95 z-50 flex items-center justify-center p-4"
          onClick={() => setIsModalOpen(false)}
        >
          <div
            className="relative w-full max-w-2xl bg-grunge-dark/90 backdrop-blur-md rounded-lg border border-grunge-red/20 p-6"
            onClick={e => e.stopPropagation()}
          >
            <button
              className="absolute -top-2 -right-2 text-grunge-red hover:text-grunge-yellow transition-colors duration-300 p-2 bg-black rounded-full z-10"
              onClick={() => setIsModalOpen(false)}
            >
              <X className="w-5 h-5" />
            </button>

            <div className="space-y-4">
              <h3 className="text-2xl font-metal text-grunge-red text-center mb-4">{latestPlaylist.title}</h3>

              {latestPlaylist.description && (
                <p className="text-gray-400 text-center">{latestPlaylist.description}</p>
              )}

              <a
                href={latestPlaylist.spotify_url}
                target="_blank"
                rel="noopener noreferrer"
                className="flex items-center justify-center gap-2 text-grunge-red hover:text-grunge-yellow transition-colors duration-300 font-metal text-lg bg-white/5 px-6 py-3 rounded-lg hover:bg-white/10 mx-auto w-fit"
              >
                <span>Listen on Spotify</span>
                <ExternalLink className="w-5 h-5" />
              </a>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default MelodyLock;