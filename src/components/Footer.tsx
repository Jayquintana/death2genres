import React from 'react';
import { LogIn } from 'lucide-react';
import { useNavigate } from 'react-router-dom';

interface FooterProps {
  isAuthenticated: boolean;
  onLoginClick: () => void;
  onSignOut: () => void;
}

const Footer: React.FC<FooterProps> = ({ isAuthenticated, onLoginClick, onSignOut }) => {
  const navigate = useNavigate();

  return (
    <footer className="py-8 px-4 text-center text-gray-400 border-t border-grunge-red/20">
      <p className="font-metal mb-4">© {new Date().getFullYear()} Death 2 Genres. All rights reserved.</p>
      <div className="flex justify-center items-center gap-2">
        {isAuthenticated ? (
          <>
            <button
              onClick={() => navigate('/admin/shows')}
              className="text-grunge-red hover:text-grunge-yellow transition-colors duration-300 flex items-center gap-1 mr-4"
            >
              Admin Dashboard
            </button>
            <button
              onClick={onSignOut}
              className="text-grunge-red hover:text-grunge-yellow transition-colors duration-300 flex items-center gap-1"
            >
              <LogIn className="w-4 h-4" />
              Sign Out
            </button>
          </>
        ) : (
          <button
            onClick={onLoginClick}
            className="text-grunge-red hover:text-grunge-yellow transition-colors duration-300 flex items-center gap-1"
          >
            <LogIn className="w-4 h-4" />
            Admin Login
          </button>
        )}
      </div>
    </footer>
  );
};

export default Footer;