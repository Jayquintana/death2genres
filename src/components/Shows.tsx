import React from 'react';
import { Calendar, Ticket } from 'lucide-react';
import { format, parseISO } from 'date-fns';
import type { Show } from '../types';

interface ShowsProps {
  shows: Show[];
  onShowSelect: (show: Show) => void;
}

const Shows: React.FC<ShowsProps> = ({ shows, onShowSelect }) => {
  const formatDisplayDate = (dateStr: string) => {
    const date = parseISO(dateStr);
    return format(date, 'MMMM d, yyyy');
  };

  return (
    <section id="shows" className="min-h-screen py-20 px-4 relative overflow-hidden flex items-center">
      <div className="absolute inset-0">
        <div className="shows-bg">
          <div className="shows-grid"></div>
          <div className="shows-noise"></div>
        </div>
      </div>

      <div className="max-w-4xl mx-auto relative z-10 w-full">
        <div className="flex items-center justify-center mb-8">
          <Calendar className="w-6 h-6 text-grunge-red mr-2" />
          <h2 className="text-4xl font-metal text-grunge-red">Upcoming Shows</h2>
        </div>
        {shows.length > 0 ? (
          <div className="grid gap-8">
            {shows.map((show) => (
              <div 
                key={show.id} 
                className="bg-white/5 p-8 rounded-lg backdrop-blur-sm border border-grunge-red/20 hover:border-grunge-red transition-all duration-300 cursor-pointer transform hover:scale-[1.02]"
                onClick={() => onShowSelect(show)}
              >
                <div className="text-grunge-yellow text-2xl mb-4 font-metal text-center">
                  {formatDisplayDate(show.date)}
                </div>
                <h3 className="text-3xl font-bold mb-4 text-center">{show.artist}</h3>
                <div className="text-center">
                  {show.venue && <p className="text-xl text-gray-300 mb-2">{show.venue}</p>}
                  {show.city && <p className="text-lg text-gray-400">{show.city}</p>}
                </div>
                {show.ticket_url && (
                  <div className="mt-6 flex justify-center">
                    <button 
                      className="flex items-center gap-2 bg-grunge-red px-6 py-3 rounded-lg hover:bg-grunge-yellow transition-colors duration-300 font-metal text-lg"
                      onClick={(e) => {
                        e.stopPropagation();
                        window.open(show.ticket_url, '_blank');
                      }}
                    >
                      <Ticket className="w-5 h-5" />
                      Get Tickets
                    </button>
                  </div>
                )}
              </div>
            ))}
          </div>
        ) : (
          <div className="bg-white/5 p-12 rounded-lg backdrop-blur-sm border border-grunge-red/20 text-center">
            <h3 className="text-3xl font-metal text-grunge-yellow mb-4">No Shows Currently Scheduled</h3>
            <p className="text-xl text-gray-300">Stay Tuned for Upcoming Shows!</p>
          </div>
        )}
      </div>
    </section>
  );
};

export default Shows;