import React, { useState, useEffect } from 'react';
import { format } from 'date-fns';
import { Plus, Trash2, Edit, Save } from 'lucide-react';
import { supabase } from '../lib/supabase';
import type { Show } from '../types';

const AdminShows: React.FC = () => {
  const [shows, setShows] = useState<Show[]>([]);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [currentShow, setCurrentShow] = useState<Show | null>(null);
  const [isSaving, setIsSaving] = useState(false);

  useEffect(() => {
    fetchShows();
  }, []);

  const fetchShows = async () => {
    const { data, error } = await supabase
      .from('shows')
      .select('*')
      .order('date', { ascending: true });

    if (error) {
      console.error('Error fetching shows:', error);
      return;
    }

    setShows(data || []);
  };

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setIsSaving(true);

    const formData = new FormData(e.currentTarget);
    const dateStr = formData.get('date') as string;

    const showData: Show = {
      date: dateStr,
      artist: formData.get('artist') as string,
      venue: formData.get('venue') as string,
      city: formData.get('city') as string,
      description: formData.get('description') as string,
      ticket_url: formData.get('ticketUrl') as string,
      price: formData.get('price') as string,
      doors: formData.get('doors') as string,
      show_time: formData.get('showTime') as string,
      age_restriction: formData.get('ageRestriction') as string,
    };

    try {
      if (currentShow?.id) {
        const { error } = await supabase
          .from('shows')
          .update(showData)
          .eq('id', currentShow.id);

        if (error) throw error;
      } else {
        const { error } = await supabase
          .from('shows')
          .insert([showData]);

        if (error) throw error;
      }

      await fetchShows();
      setIsModalOpen(false);
      setCurrentShow(null);
    } catch (error) {
      console.error('Error saving show:', error);
      alert('Failed to save show');
    } finally {
      setIsSaving(false);
    }
  };

  const handleDelete = async (show: Show) => {
    if (!show.id || !confirm('Are you sure you want to delete this show?')) {
      return;
    }

    try {
      const { error } = await supabase
        .from('shows')
        .delete()
        .eq('id', show.id);

      if (error) throw error;

      await fetchShows();
    } catch (error) {
      console.error('Error deleting show:', error);
      alert('Failed to delete show');
    }
  };

  const handleEdit = (show: Show) => {
    setCurrentShow(show);
    setIsModalOpen(true);
  };

  const formatDisplayDate = (dateStr: string) => {
    const [year, month, day] = dateStr.split('-').map(Number);
    const date = new Date(Date.UTC(year, month - 1, day));
    return format(date, 'MMMM d, yyyy');
  };

  return (
    <div className="max-w-4xl mx-auto">
      <div className="flex justify-between items-center mb-8">
        <h2 className="text-3xl font-metal text-grunge-red">Manage Upcoming Shows</h2>
        <button
          onClick={() => setIsModalOpen(true)}
          className="flex items-center gap-2 bg-grunge-red px-4 py-2 rounded hover:bg-grunge-yellow transition-colors duration-300"
        >
          <Plus className="w-5 h-5" />
          Add Show
        </button>
      </div>

      <div className="space-y-4">
        {shows.map((show) => (
          <div key={show.id} className="bg-white/5 p-6 rounded-lg border border-grunge-red/20">
            <div className="flex justify-between items-start">
              <div>
                <h3 className="text-xl font-bold mb-2">{show.artist}</h3>
                <p className="text-grunge-yellow">
                  {formatDisplayDate(show.date)}
                </p>
                <p className="text-gray-300">{show.venue}, {show.city}</p>
              </div>
              <div className="flex gap-2">
                <button
                  onClick={() => handleEdit(show)}
                  className="p-2 hover:text-grunge-yellow transition-colors duration-300"
                >
                  <Edit className="w-5 h-5" />
                </button>
                <button
                  onClick={() => handleDelete(show)}
                  className="p-2 hover:text-grunge-red transition-colors duration-300"
                >
                  <Trash2 className="w-5 h-5" />
                </button>
              </div>
            </div>
          </div>
        ))}
      </div>

      {/* Add/Edit Show Modal */}
      {isModalOpen && (
        <div className="fixed inset-0 bg-black/90 flex items-center justify-center p-4 z-50">
          <div className="bg-grunge-dark p-8 rounded-lg border border-grunge-red/20 max-w-2xl w-full">
            <h3 className="text-2xl font-metal text-grunge-red mb-6">
              {currentShow ? 'Edit Show' : 'Add New Show'}
            </h3>
            
            <form onSubmit={handleSubmit} className="space-y-4">
              <div className="grid grid-cols-2 gap-4">
                <div>
                  <label className="block text-sm font-medium mb-1">Date</label>
                  <input
                    type="date"
                    name="date"
                    defaultValue={currentShow?.date}
                    required
                    className="w-full px-3 py-2 bg-white/5 rounded border border-grunge-red/20"
                  />
                </div>
                <div>
                  <label className="block text-sm font-medium mb-1">Artist</label>
                  <input
                    type="text"
                    name="artist"
                    defaultValue={currentShow?.artist}
                    required
                    className="w-full px-3 py-2 bg-white/5 rounded border border-grunge-red/20"
                  />
                </div>
              </div>

              <div className="grid grid-cols-2 gap-4">
                <div>
                  <label className="block text-sm font-medium mb-1">Venue</label>
                  <input
                    type="text"
                    name="venue"
                    defaultValue={currentShow?.venue}
                    required
                    className="w-full px-3 py-2 bg-white/5 rounded border border-grunge-red/20"
                  />
                </div>
                <div>
                  <label className="block text-sm font-medium mb-1">City</label>
                  <input
                    type="text"
                    name="city"
                    defaultValue={currentShow?.city}
                    required
                    className="w-full px-3 py-2 bg-white/5 rounded border border-grunge-red/20"
                  />
                </div>
              </div>

              <div>
                <label className="block text-sm font-medium mb-1">Description</label>
                <textarea
                  name="description"
                  defaultValue={currentShow?.description}
                  rows={3}
                  className="w-full px-3 py-2 bg-white/5 rounded border border-grunge-red/20"
                />
              </div>

              <div className="grid grid-cols-2 gap-4">
                <div>
                  <label className="block text-sm font-medium mb-1">Ticket URL</label>
                  <input
                    type="url"
                    name="ticketUrl"
                    defaultValue={currentShow?.ticket_url}
                    className="w-full px-3 py-2 bg-white/5 rounded border border-grunge-red/20"
                  />
                </div>
                <div>
                  <label className="block text-sm font-medium mb-1">Price</label>
                  <input
                    type="text"
                    name="price"
                    defaultValue={currentShow?.price}
                    className="w-full px-3 py-2 bg-white/5 rounded border border-grunge-red/20"
                  />
                </div>
              </div>

              <div className="grid grid-cols-3 gap-4">
                <div>
                  <label className="block text-sm font-medium mb-1">Doors</label>
                  <input
                    type="text"
                    name="doors"
                    defaultValue={currentShow?.doors}
                    className="w-full px-3 py-2 bg-white/5 rounded border border-grunge-red/20"
                  />
                </div>
                <div>
                  <label className="block text-sm font-medium mb-1">Show Time</label>
                  <input
                    type="text"
                    name="showTime"
                    defaultValue={currentShow?.show_time}
                    className="w-full px-3 py-2 bg-white/5 rounded border border-grunge-red/20"
                  />
                </div>
                <div>
                  <label className="block text-sm font-medium mb-1">Age Restriction</label>
                  <input
                    type="text"
                    name="ageRestriction"
                    defaultValue={currentShow?.age_restriction}
                    className="w-full px-3 py-2 bg-white/5 rounded border border-grunge-red/20"
                  />
                </div>
              </div>

              <div className="flex justify-end gap-4 mt-6">
                <button
                  type="button"
                  onClick={() => {
                    setIsModalOpen(false);
                    setCurrentShow(null);
                  }}
                  className="px-4 py-2 rounded hover:bg-white/10 transition-colors duration-300"
                >
                  Cancel
                </button>
                <button
                  type="submit"
                  disabled={isSaving}
                  className="px-4 py-2 bg-grunge-red rounded hover:bg-grunge-yellow transition-colors duration-300 flex items-center gap-2"
                >
                  <Save className="w-5 h-5" />
                  {isSaving ? 'Saving...' : (currentShow ? 'Update Show' : 'Add Show')}
                </button>
              </div>
            </form>
          </div>
        </div>
      )}
    </div>
  );
};

export default AdminShows;