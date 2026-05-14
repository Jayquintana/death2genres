import React, { useState, useEffect } from 'react';
import { Plus, Trash2, Edit, Save } from 'lucide-react';
import { supabase } from '../lib/supabase';
import type { PastShow } from '../types';

const AdminPastShows: React.FC = () => {
  const [pastShows, setPastShows] = useState<PastShow[]>([]);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [currentShow, setCurrentShow] = useState<PastShow | null>(null);
  const [isSaving, setIsSaving] = useState(false);

  useEffect(() => {
    fetchPastShows();
  }, []);

  const fetchPastShows = async () => {
    const { data, error } = await supabase
      .from('past_shows')
      .select('*')
      .order('created_at', { ascending: false });

    if (error) {
      console.error('Error fetching past shows:', error);
      return;
    }

    setPastShows(data || []);
  };

  const formatVideoUrl = (url: string) => {
    // Handle different YouTube URL formats
    const youtubeRegex = /(?:youtube\.com\/(?:[^\/]+\/.+\/|(?:v|e(?:mbed)?)\/|.*[?&]v=)|youtu\.be\/)([^"&?\/\s]{11})/;
    const match = url.match(youtubeRegex);
    
    if (match && match[1]) {
      return `https://www.youtube.com/embed/${match[1]}`;
    }
    
    // If it's already an embed URL, return as is
    if (url.includes('youtube.com/embed/')) {
      return url;
    }
    
    return url;
  };

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setIsSaving(true);

    const formData = new FormData(e.currentTarget);
    const showData: PastShow = {
      artist: formData.get('artist') as string,
      description: formData.get('description') as string,
      video_url: formatVideoUrl(formData.get('videoUrl') as string),
      image: formData.get('image') as string,
    };

    try {
      if (currentShow?.id) {
        // Update existing show
        const { error } = await supabase
          .from('past_shows')
          .update(showData)
          .eq('id', currentShow.id);

        if (error) throw error;
      } else {
        // Insert new show
        const { error } = await supabase
          .from('past_shows')
          .insert([showData]);

        if (error) throw error;
      }

      await fetchPastShows();
      setIsModalOpen(false);
      setCurrentShow(null);
    } catch (error) {
      console.error('Error saving past show:', error);
      alert('Failed to save past show');
    } finally {
      setIsSaving(false);
    }
  };

  const handleDelete = async (show: PastShow) => {
    if (!show.id || !confirm('Are you sure you want to delete this past show?')) {
      return;
    }

    try {
      const { error } = await supabase
        .from('past_shows')
        .delete()
        .eq('id', show.id);

      if (error) throw error;

      await fetchPastShows();
    } catch (error) {
      console.error('Error deleting past show:', error);
      alert('Failed to delete past show');
    }
  };

  const handleEdit = (show: PastShow) => {
    setCurrentShow(show);
    setIsModalOpen(true);
  };

  return (
    <div className="max-w-4xl mx-auto">
      <div className="flex justify-between items-center mb-8">
        <h2 className="text-3xl font-metal text-grunge-red">Manage Past Shows</h2>
        <button
          onClick={() => setIsModalOpen(true)}
          className="flex items-center gap-2 bg-grunge-red px-4 py-2 rounded hover:bg-grunge-yellow transition-colors duration-300"
        >
          <Plus className="w-5 h-5" />
          Add Past Show
        </button>
      </div>

      <div className="grid gap-6">
        {pastShows.map((show) => (
          <div key={show.id} className="bg-white/5 p-6 rounded-lg border border-grunge-red/20">
            <div className="flex justify-between items-start mb-4">
              <div>
                <h3 className="text-xl font-bold">{show.artist}</h3>
                <p className="text-gray-300">{show.description}</p>
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
            <div className="aspect-video">
              <iframe
                src={show.video_url}
                title={show.artist}
                className="w-full h-full rounded"
                allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
                allowFullScreen
              ></iframe>
            </div>
          </div>
        ))}
      </div>

      {/* Add/Edit Past Show Modal */}
      {isModalOpen && (
        <div className="fixed inset-0 bg-black/90 flex items-center justify-center p-4 z-50">
          <div className="bg-grunge-dark p-8 rounded-lg border border-grunge-red/20 max-w-2xl w-full">
            <h3 className="text-2xl font-metal text-grunge-red mb-6">
              {currentShow ? 'Edit Past Show' : 'Add Past Show'}
            </h3>
            
            <form onSubmit={handleSubmit} className="space-y-4">
              <div>
                <label className="block text-sm font-medium mb-1">Artist/Event Name</label>
                <input
                  type="text"
                  name="artist"
                  defaultValue={currentShow?.artist}
                  required
                  className="w-full px-3 py-2 bg-white/5 rounded border border-grunge-red/20"
                />
              </div>

              <div>
                <label className="block text-sm font-medium mb-1">Description</label>
                <textarea
                  name="description"
                  defaultValue={currentShow?.description}
                  rows={3}
                  required
                  className="w-full px-3 py-2 bg-white/5 rounded border border-grunge-red/20"
                />
              </div>

              <div>
                <label className="block text-sm font-medium mb-1">Video URL (YouTube)</label>
                <input
                  type="url"
                  name="videoUrl"
                  defaultValue={currentShow?.video_url}
                  required
                  placeholder="https://www.youtube.com/watch?v=..."
                  className="w-full px-3 py-2 bg-white/5 rounded border border-grunge-red/20"
                />
                <p className="text-sm text-gray-400 mt-1">
                  You can use any YouTube URL format (watch, share, or embed)
                </p>
              </div>

              <input
                type="hidden"
                name="image"
                value={currentShow?.image || 'https://images.unsplash.com/photo-1501612780327-45045538702b?ixlib=rb-1.2.1&auto=format&fit=crop&w=1950&q=80'}
              />

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

export default AdminPastShows;