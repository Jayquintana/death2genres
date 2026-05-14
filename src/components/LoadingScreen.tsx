import React, { useEffect, useState } from 'react';
import { Music } from 'lucide-react';

const LoadingScreen: React.FC = () => {
  const [dots, setDots] = useState('');

  useEffect(() => {
    const dotsInterval = setInterval(() => {
      setDots(prev => prev.length >= 3 ? '' : prev + '.');
    }, 500);

    return () => {
      clearInterval(dotsInterval);
    };
  }, []);

  return (
    <div className="fixed inset-0 bg-grunge-dark z-50 flex flex-col items-center justify-center">
      <div className="relative">
        <Music className="w-12 h-12 text-grunge-red animate-pulse" />
        <div className="absolute -top-1 -right-1 w-3 h-3 bg-grunge-yellow rounded-full animate-ping" />
      </div>
      <h1 className="text-2xl font-metal text-grunge-red mt-4 min-w-[120px] text-center">
        LOADING{dots}
      </h1>
    </div>
  );
};

export default LoadingScreen;