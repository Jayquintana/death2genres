import React, { useEffect } from 'react';
import { Link, Outlet, useLocation, useNavigate } from 'react-router-dom';
import { Calendar, Image, Video, Home, LogOut, Music } from 'lucide-react';
import { getSession, signOut } from '../lib/auth';

const AdminLayout: React.FC = () => {
  const location = useLocation();
  const navigate = useNavigate();

  useEffect(() => {
    const checkAuth = async () => {
      const { session } = await getSession();
      if (!session) {
        navigate('/');
      }
    };

    checkAuth();
  }, [navigate]);

  const handleSignOut = async () => {
    await signOut();
    navigate('/');
  };

  const isActive = (path: string) => {
    return location.pathname === path ? 'bg-grunge-red text-white' : 'hover:bg-white/10';
  };

  return (
    <div className="min-h-screen bg-grunge-dark text-white">
      <div className="fixed inset-0 grunge-overlay"></div>
      
      <div className="flex min-h-screen relative">
        {/* Sidebar */}
        <div className="w-64 bg-black/50 backdrop-blur-sm border-r border-grunge-red/20 p-4">
          <div className="mb-8">
            <h1 className="text-2xl font-metal text-grunge-red">Admin Panel</h1>
          </div>
          
          <nav className="space-y-2">
            <Link
              to="/"
              className={`flex items-center gap-2 p-2 rounded transition-colors duration-300 ${isActive('/')}`}
            >
              <Home className="w-5 h-5" />
              Back to Site
            </Link>
            <Link
              to="/admin/shows"
              className={`flex items-center gap-2 p-2 rounded transition-colors duration-300 ${isActive('/admin/shows')}`}
            >
              <Calendar className="w-5 h-5" />
              Upcoming Shows
            </Link>
            <Link
              to="/admin/past-shows"
              className={`flex items-center gap-2 p-2 rounded transition-colors duration-300 ${isActive('/admin/past-shows')}`}
            >
              <Video className="w-5 h-5" />
              Past Shows
            </Link>
            <Link
              to="/admin/gallery"
              className={`flex items-center gap-2 p-2 rounded transition-colors duration-300 ${isActive('/admin/gallery')}`}
            >
              <Image className="w-5 h-5" />
              Gallery
            </Link>
            <Link
              to="/admin/playlists"
              className={`flex items-center gap-2 p-2 rounded transition-colors duration-300 ${isActive('/admin/playlists')}`}
            >
              <Music className="w-5 h-5" />
              Playlists
            </Link>

            <button
              onClick={handleSignOut}
              className="flex items-center gap-2 p-2 rounded transition-colors duration-300 text-grunge-red hover:bg-white/10 w-full mt-8"
            >
              <LogOut className="w-5 h-5" />
              Sign Out
            </button>
          </nav>
        </div>

        {/* Main Content */}
        <div className="flex-1 p-8">
          <Outlet />
        </div>
      </div>
    </div>
  );
};

export default AdminLayout;