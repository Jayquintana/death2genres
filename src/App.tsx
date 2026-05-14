import { useState, useEffect, Suspense, lazy } from 'react';
import { Routes, Route } from 'react-router-dom';
import { supabase } from './lib/supabase';
import { getSession, signOut, initSessionTimeout } from './lib/auth';
import type { Show, PastShow, GalleryImage, Playlist } from './types';
import Lightbox from './components/Lightbox';
import { X } from 'lucide-react';
import MelodyLock from './components/MelodyLock';
import LoadingScreen from './components/LoadingScreen';
import { format, parseISO } from 'date-fns';

// Lazy load all components
const AdminLayout = lazy(() => import('./components/AdminLayout'));
const AdminShows = lazy(() => import('./pages/AdminShows'));
const AdminPastShows = lazy(() => import('./pages/AdminPastShows'));
const AdminGallery = lazy(() => import('./pages/AdminGallery'));
const AdminPlaylists = lazy(() => import('./pages/AdminPlaylists'));
const FullGallery = lazy(() => import('./pages/FullGallery'));
const LoginModal = lazy(() => import('./components/LoginModal'));
const Navigation = lazy(() => import('./components/Navigation'));
const Hero = lazy(() => import('./components/Hero'));
const About = lazy(() => import('./components/About'));
const Shows = lazy(() => import('./components/Shows'));
const PastShows = lazy(() => import('./components/PastShows'));
const Gallery = lazy(() => import('./components/Gallery'));
const Playlists = lazy(() => import('./components/Playlists'));
const Contact = lazy(() => import('./components/Contact'));
const Footer = lazy(() => import('./components/Footer'));

const App = () => {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [selectedImage, setSelectedImage] = useState<string | null>(null);
  const [selectedShow, setSelectedShow] = useState<Show | null>(null);
  const [isLoginModalOpen, setIsLoginModalOpen] = useState(false);
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const [shows, setShows] = useState<Show[]>([]);
  const [pastShows, setPastShows] = useState<PastShow[]>([]);
  const [galleryImages, setGalleryImages] = useState<GalleryImage[]>([]);
  const [playlists, setPlaylists] = useState<Playlist[]>([]);
  const [isUnlocked, setIsUnlocked] = useState(false);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [showLoadingScreen, setShowLoadingScreen] = useState(true);

  useEffect(() => {
    const checkSession = async () => {
      const { session } = await getSession();
      setIsAuthenticated(!!session);
    };

    checkSession();

    const { data: { subscription } } = supabase.auth.onAuthStateChange((_event, session) => {
      setIsAuthenticated(!!session);
    });

    return () => subscription.unsubscribe();
  }, []);

  useEffect(() => {
    if (isAuthenticated) {
      const cleanup = initSessionTimeout(() => {
        handleSignOut();
      });
      return cleanup;
    }
  }, [isAuthenticated]);

  useEffect(() => {
    const checkMelodyLock = () => {
      const today = new Date().toLocaleDateString();
      const unlockStatus = localStorage.getItem('melodyUnlock');
      setIsUnlocked(unlockStatus === today);
    };

    checkMelodyLock();
  }, []);

  useEffect(() => {
    fetchData();
  }, []);

  const fetchWithRetry = async (fetcher: () => Promise<any>, retries = 3, delay = 1000) => {
    try {
      return await fetcher();
    } catch (error) {
      if (retries > 0) {
        await new Promise(resolve => setTimeout(resolve, delay));
        return fetchWithRetry(fetcher, retries - 1, delay * 2);
      }
      throw error;
    }
  };

  const fetchData = async () => {
    setIsLoading(true);
    setError(null);
    
    try {
      const [showsResult, pastShowsResult, galleryResult, playlistsResult] = await Promise.all([
        fetchWithRetry(async () => {
          const { data, error } = await supabase
            .from('shows')
            .select('*')
            .order('date', { ascending: true });
          
          if (error) throw error;
          return data;
        }),
        
        fetchWithRetry(async () => {
          const { data, error } = await supabase
            .from('past_shows')
            .select('*')
            .order('created_at', { ascending: false });
          
          if (error) throw error;
          return data;
        }),
        
        fetchWithRetry(async () => {
          const { data, error } = await supabase
            .from('gallery')
            .select('*')
            .order('created_at', { ascending: false });
          
          if (error) throw error;
          console.log('Gallery data fetched:', data);
          if (data && data.length > 0) {
            console.log('First gallery item:', data[0]);
            console.log('Gallery URLs:', data.map(item => item.url));
          }
          return data;
        }),

        fetchWithRetry(async () => {
          const { data, error } = await supabase
            .from('playlists')
            .select('*')
            .order('order', { ascending: true });
          
          if (error) throw error;
          return data;
        })
      ]);

      setShows(showsResult || []);
      setPastShows(pastShowsResult || []);
      setGalleryImages(galleryResult || []);
      setPlaylists(playlistsResult || []);

      // Hide loading screen after data is loaded
      setTimeout(() => {
        setShowLoadingScreen(false);
        setIsLoading(false);
      }, 7000);
    } catch (error) {
      console.error('Error fetching data:', error);
      setError('Failed to load content. Please try refreshing the page.');
      setShowLoadingScreen(false);
      setIsLoading(false);
    }
  };

  useEffect(() => {
    const showsSubscription = supabase
      .channel('shows_changes')
      .on('postgres_changes', { event: '*', schema: 'public', table: 'shows' }, () => {
        fetchData();
      })
      .subscribe();

    const pastShowsSubscription = supabase
      .channel('past_shows_changes')
      .on('postgres_changes', { event: '*', schema: 'public', table: 'past_shows' }, () => {
        fetchData();
      })
      .subscribe();

    const gallerySubscription = supabase
      .channel('gallery_changes')
      .on('postgres_changes', { event: '*', schema: 'public', table: 'gallery' }, () => {
        fetchData();
      })
      .subscribe();

    const playlistsSubscription = supabase
      .channel('playlists_changes')
      .on('postgres_changes', { event: '*', schema: 'public', table: 'playlists' }, () => {
        fetchData();
      })
      .subscribe();

    return () => {
      showsSubscription.unsubscribe();
      pastShowsSubscription.unsubscribe();
      gallerySubscription.unsubscribe();
      playlistsSubscription.unsubscribe();
    };
  }, []);

  const handleSignOut = async () => {
    await signOut();
  };

  const formatDisplayDate = (dateStr: string) => {
    const date = parseISO(dateStr);
    return format(date, 'MMMM d, yyyy');
  };

  const handleUnlock = () => {
    setShowLoadingScreen(true);
    setIsUnlocked(true);
    
    // Show loading screen for 7 seconds after unlock
    setTimeout(() => {
      setShowLoadingScreen(false);
    }, 7000);
  };

  const MainContent = () => (
    <div className="min-h-screen bg-grunge-dark text-white font-grotesk">
      <div className="fixed inset-0 grunge-overlay"></div>
      
      <Suspense fallback={<LoadingScreen />}>
        <Navigation isMenuOpen={isMenuOpen} setIsMenuOpen={setIsMenuOpen} />
        <Hero />
        
        {error ? (
          <div className="flex items-center justify-center p-8 bg-grunge-red/10">
            <p className="text-grunge-red text-lg">{error}</p>
          </div>
        ) : (
          <>
            <Shows shows={shows} onShowSelect={setSelectedShow} />
            <About />
            <Playlists playlists={playlists} />
            <PastShows pastShows={pastShows} />
            <Gallery images={galleryImages} onImageSelect={setSelectedImage} />
          </>
        )}
        
        <Contact />
        <Footer 
          isAuthenticated={isAuthenticated}
          onLoginClick={() => setIsLoginModalOpen(true)}
          onSignOut={handleSignOut}
        />
      </Suspense>

      {selectedShow && (
        <div 
          className="fixed inset-0 bg-black/95 z-50 flex items-center justify-center p-4 overflow-y-auto touch-pan-y"
          onClick={() => setSelectedShow(null)}
        >
          <div 
            className="relative w-full max-w-sm mx-auto my-4 md:my-8 bg-grunge-dark/90 backdrop-blur-md rounded-lg border border-grunge-red/20"
            onClick={e => e.stopPropagation()}
          >
            <button
              className="absolute -top-2 -right-2 text-grunge-red hover:text-grunge-yellow transition-colors duration-300 p-2 bg-black rounded-full z-10"
              onClick={() => setSelectedShow(null)}
            >
              <X className="w-5 h-5" />
            </button>
            
            <div className="p-4 space-y-3">
              <h3 className="text-xl font-metal text-grunge-red text-center mb-4">{selectedShow.artist}</h3>
              
              <div className="grid grid-cols-2 gap-2">
                <div className="bg-black/30 p-2 rounded">
                  <p className="text-grunge-yellow font-metal text-xs mb-1">Date</p>
                  <p className="text-sm">
                    {formatDisplayDate(selectedShow.date)}
                  </p>
                </div>
                <div className="bg-black/30 p-2 rounded">
                  <p className="text-grunge-yellow font-metal text-xs mb-1">Venue</p>
                  {selectedShow.venue && <p className="text-sm">{selectedShow.venue}</p>}
                  {selectedShow.city && <p className="text-xs text-gray-400">{selectedShow.city}</p>}
                </div>
              </div>

              <div className="grid grid-cols-3 gap-2">
                {selectedShow.doors && (
                  <div className="bg-black/30 p-2 rounded">
                    <p className="text-grunge-yellow font-metal text-xs mb-1">Doors</p>
                    <p className="text-xs">{selectedShow.doors}</p>
                  </div>
                )}
                {selectedShow.show_time && (
                  <div className="bg-black/30 p-2 rounded">
                    <p className="text-grunge-yellow font-metal text-xs mb-1">Show</p>
                    <p className="text-xs">{selectedShow.show_time}</p>
                  </div>
                )}
                {selectedShow.age_restriction && (
                  <div className="bg-black/30 p-2 rounded">
                    <p className="text-grunge-yellow font-metal text-xs mb-1">Age</p>
                    <p className="text-xs">{selectedShow.age_restriction}</p>
                  </div>
                )}
              </div>

              {selectedShow.price && (
                <div className="bg-black/30 p-2 rounded text-center">
                  <p className="text-grunge-yellow font-metal text-xs mb-1">Price</p>
                  <p className="text-lg">{selectedShow.price}</p>
                </div>
              )}

              {selectedShow.description && (
                <div className="bg-black/30 p-3 rounded">
                  <p className="text-center text-xs text-gray-300">{selectedShow.description}</p>
                </div>
              )}

              {selectedShow.ticket_url && (
                <div className="flex justify-center pt-2">
                  <a
                    href={selectedShow.ticket_url}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="flex items-center gap-2 bg-grunge-red px-4 py-2 rounded hover:bg-grunge-yellow transition-colors duration-300 font-metal text-sm"
                  >
                    Get Tickets
                  </a>
                </div>
              )}
            </div>
          </div>
        </div>
      )}

      <Lightbox
        selectedImage={selectedImage}
        onClose={() => setSelectedImage(null)}
      />

      <Suspense fallback={<LoadingScreen />}>
        {isLoginModalOpen && (
          <LoginModal
            isOpen={isLoginModalOpen}
            onClose={() => setIsLoginModalOpen(false)}
          />
        )}
      </Suspense>
    </div>
  );

  if (!isUnlocked) {
    return <MelodyLock onUnlock={handleUnlock} />;
  }

  if (showLoadingScreen || isLoading) {
    return <LoadingScreen />;
  }

  return (
    <Suspense fallback={<LoadingScreen />}>
      <Routes>
        <Route path="/admin" element={<AdminLayout />}>
          <Route path="shows" element={<AdminShows />} />
          <Route path="past-shows" element={<AdminPastShows />} />
          <Route path="gallery" element={<AdminGallery />} />
          <Route path="playlists" element={<AdminPlaylists />} />
        </Route>
        <Route path="/gallery" element={
          <FullGallery 
            images={galleryImages} 
            onImageSelect={setSelectedImage} 
          />
        } />
        <Route path="/" element={<MainContent />} />
      </Routes>
    </Suspense>
  );
};

export default App;