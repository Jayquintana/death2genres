import React from 'react';
import { Menu, X, Info, Calendar, Music, Youtube, Camera, Mail } from 'lucide-react';

interface NavLinkProps {
  href: string;
  children: React.ReactNode;
  icon: React.ElementType;
  onClick?: () => void;
}

const NavLink: React.FC<NavLinkProps> = ({ href, children, icon: Icon, onClick }) => (
  <a 
    href={href} 
    className="nav-link hover:text-grunge-red px-3 py-2 transition-colors duration-300 flex items-center gap-2"
    onClick={onClick}
  >
    <Icon className="w-4 h-4" />
    {children}
  </a>
);

interface NavigationProps {
  isMenuOpen: boolean;
  setIsMenuOpen: (isOpen: boolean) => void;
}

const Navigation: React.FC<NavigationProps> = ({ isMenuOpen, setIsMenuOpen }) => {
  const handleLinkClick = () => {
    setIsMenuOpen(false);
  };

  return (
    <nav className="fixed w-full z-50 bg-grunge-dark/90 backdrop-blur-sm border-b border-[#f5f5f1]/20">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-16">
          <div className="flex-shrink-0">
            <h1 className="text-2xl font-metal text-[#f5f5f1] flex items-center gap-2">
              <Music className="w-6 h-6 animate-spin-slow text-[#f5f5f1]" />
              DEATH 2 GENRES
            </h1>
          </div>
          <div className="hidden md:block">
            <div className="ml-10 flex items-baseline space-x-4">
              <NavLink href="#shows" icon={Calendar}>Shows</NavLink>
              <NavLink href="#about" icon={Info}>About</NavLink>
              <NavLink href="#playlists" icon={Music}>Playlists</NavLink>
              <NavLink href="#archive" icon={Youtube}>Archive</NavLink>
              <NavLink href="#gallery" icon={Camera}>Gallery</NavLink>
              <NavLink href="#contact" icon={Mail}>Contact</NavLink>
            </div>
          </div>
          <div className="md:hidden">
            <button
              onClick={() => setIsMenuOpen(!isMenuOpen)}
              className="inline-flex items-center justify-center p-2 rounded-md text-grunge-red hover:text-grunge-yellow transition-colors duration-300"
            >
              {isMenuOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
            </button>
          </div>
        </div>
      </div>
      
      {isMenuOpen && (
        <div className="md:hidden bg-grunge-dark/95 backdrop-blur-sm border-t border-[#f5f5f1]/20">
          <div className="px-2 pt-2 pb-3 space-y-1 sm:px-3">
            <NavLink href="#shows" icon={Calendar} onClick={handleLinkClick}>Shows</NavLink>
            <NavLink href="#about" icon={Info} onClick={handleLinkClick}>About</NavLink>
            <NavLink href="#playlists" icon={Music} onClick={handleLinkClick}>Playlists</NavLink>
            <NavLink href="#archive" icon={Youtube} onClick={handleLinkClick}>Archive</NavLink>
            <NavLink href="#gallery" icon={Camera} onClick={handleLinkClick}>Gallery</NavLink>
            <NavLink href="#contact" icon={Mail} onClick={handleLinkClick}>Contact</NavLink>
          </div>
        </div>
      )}
    </nav>
  );
};

export default Navigation;