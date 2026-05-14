import React, { useState, useEffect } from 'react';
import { Plus, Trash2, Edit, Save, GripVertical } from 'lucide-react';
import { supabase } from '../lib/supabase';
import type { Playlist } from '../types';

const AdminPlaylists: React.FC = () => {
  const [playlists, setPlaylists] = useState<Playlist[]>([]);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [currentPlaylist, setCurrentPlaylist] = useState<Playlist | null>(null);
  const [isSaving, setIsSaving] = useState(false);
  const [draggedItem, setDraggedItem] = useState<Playlist | null>(null);

  useEffect(() => {
    fetchPlaylists();
  }, []);

  const fetchPlaylists = async () => {
    const { data, error } = await supabase
      .from('playlists')
      .select('*')
      .order('order', { ascending: true });

    if (error) {
      console.error('Error fetching playlists:', error);
      return;
    }

    setPlaylists(data || []);
  };

  const formatSpotifyUrl = (url: string) => {
    console.log('Formatting Spotify URL:', url);
    
    // Extract ID from various Spotify URL formats
    const patterns = [
      /open\.spotify\.com\/playlist\/([a-zA-Z0-9]+)/,
      /open\.spotify\.com\/album\/([a-zA-Z0-9]+)/,
      /open\.spotify\.com\/embed\/playlist\/([a-zA-Z0-9]+)/,
      /open\.spotify\.com\/embed\/album\/([a-zA-Z0-9]+)/,
      /spotify:playlist:([a-zA-Z0-9]+)/,
      /spotify:album:([a-zA-Z0-9]+)/
    ];
    
    for (const pattern of patterns) {
      const match = url.match(pattern);
      if (match && match[1]) {
        const id = match[1];
        const type = url.includes('album') ? 'album' : 'playlist';
        const cleanUrl = `https://open.spotify.com/embed/${type}/${id}`;
        console.log('Generated clean URL:', cleanUrl);
        return cleanUrl;
      }
    }
    
    console.warn('Could not parse Spotify URL:', url);
    return url;
  };

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setIsSaving(true);

    const formData = new FormData(e.currentTarget);
    const spotifyUrl = formData.get('spotifyUrl') as string;
    
    const sectionValue = formData.get('section') as string;
    const validSection = (sectionValue === 'local_frequencies' || sectionValue === 'crate_dive')
      ? sectionValue
      : 'local_frequencies';

    const playlistData: Playlist = {
      title: formData.get('title') as string,
      description: formData.get('description') as string,
      spotify_url: spotifyUrl,
      embed_url: formatSpotifyUrl(spotifyUrl),
      order: currentPlaylist?.order || playlists.length,
      section: validSection,
    };

    try {
      if (currentPlaylist?.id) {
        const { error } = await supabase
          .from('playlists')
          .update(playlistData)
          .eq('id', currentPlaylist.id);

        if (error) throw error;
      } else {
        const { error } = await supabase
          .from('playlists')
          .insert([playlistData]);

        if (error) throw error;
      }

      await fetchPlaylists();
      setIsModalOpen(false);
      setCurrentPlaylist(null);
    } catch (error) {
      console.error('Error saving playlist:', error);
      alert('Failed to save playlist');
    } finally {
      setIsSaving(false);
    }
  };

  const handleDelete = async (playlist: Playlist) => {
    if (!playlist.id || !confirm('Are you sure you want to delete this playlist?')) {
      return;
    }

    try {
      const { error } = await supabase
        .from('playlists')
        .delete()
        .eq('id', playlist.id);

      if (error) throw error;

      await fetchPlaylists();
    } catch (error) {
      console.error('Error deleting playlist:', error);
      alert('Failed to delete playlist');
    }
  };

  const handleEdit = (playlist: Playlist) => {
    setCurrentPlaylist(playlist);
    setIsModalOpen(true);
  };

  const handleDragStart = (e: React.DragEvent<HTMLDivElement>, playlist: Playlist) => {
    setDraggedItem(playlist);
    e.currentTarget.classList.add('opacity-50');
  };

  const handleDragEnd = (e: React.DragEvent<HTMLDivElement>) => {
    e.currentTarget.classList.remove('opacity-50');
    setDraggedItem(null);
  };

  const handleDragOver = (e: React.DragEvent<HTMLDivElement>) => {
    e.preventDefault();
  };

  const handleDrop = async (e: React.DragEvent<HTMLDivElement>, targetPlaylist: Playlist) => {
    e.preventDefault();
    
    if (!draggedItem || draggedItem.id === targetPlaylist.id) return;

    const newPlaylists = [...playlists];
    const draggedIndex = newPlaylists.findIndex(p => p.id === draggedItem.id);
    const targetIndex = newPlaylists.findIndex(p => p.id === targetPlaylist.id);

    // Remove dragged item and insert at new position
    const [removed] = newPlaylists.splice(draggedIndex, 1);
    newPlaylists.splice(targetIndex, 0, removed);

    // Update order values
    const updatedPlaylists = newPlaylists.map((playlist, index) => ({
      ...playlist,
      order: index,
    }));

    setPlaylists(updatedPlaylists);

    // Update database with all required fields to prevent not-null constraint violations
    try {
      const updates = updatedPlaylists.map(playlist => ({
        id: playlist.id,
        order: playlist.order,
        title: playlist.title,
        spotify_url: playlist.spotify_url,
        embed_url: playlist.embed_url
      }));

      const { error } = await supabase
        .from('playlists')
        .upsert(updates);

      if (error) throw error;
    } catch (error) {
      console.error('Error updating playlist order:', error);
      alert('Failed to update playlist order');
      await fetchPlaylists(); // Revert to original order
    }
  };

  return (
    <div className="max-w-4xl mx-auto">
      <div className="flex justify-between items-center mb-8">
        <h2 className="text-3xl font-metal text-grunge-red">Manage Playlists</h2>
        <button
          onClick={() => setIsModalOpen(true)}
          className="flex items-center gap-2 bg-grunge-red px-4 py-2 rounded hover:bg-grunge-yellow transition-colors duration-300"
        >
          <Plus className="w-5 h-5" />
          Add Playlist
        </button>
      </div>

      <div className="space-y-4">
        {playlists.map((playlist) => (
          <div 
            key={playlist.id}
            draggable
            onDragStart={(e) => handleDragStart(e, playlist)}
            onDragEnd={handleDragEnd}
            onDragOver={handleDragOver}
            onDrop={(e) => handleDrop(e, playlist)}
            className="bg-white/5 p-6 rounded-lg border border-grunge-red/20 flex items-center gap-4 cursor-move"
          >
            <div className="cursor-grab active:cursor-grabbing">
              <GripVertical className="w-5 h-5 text-gray-500" />
            </div>
            
            <div className="flex-1">
              <h3 className="text-xl font-bold mb-2">{playlist.title}</h3>
              {playlist.description && (
                <p className="text-gray-400">{playlist.description}</p>
              )}
            </div>

            <div className="flex gap-2">
              <button
                onClick={() => handleEdit(playlist)}
                className="p-2 hover:text-grunge-yellow transition-colors duration-300"
              >
                <Edit className="w-5 h-5" />
              </button>
              <button
                onClick={() => handleDelete(playlist)}
                className="p-2 hover:text-grunge-red transition-colors duration-300"
              >
                <Trash2 className="w-5 h-5" />
              </button>
            </div>
          </div>
        ))}
      </div>

      {/* Add/Edit Playlist Modal */}
      {isModalOpen && (
        <div className="fixed inset-0 bg-black/90 flex items-center justify-center p-4 z-50">
          <div className="bg-grunge-dark p-8 rounded-lg border border-grunge-red/20 max-w-2xl w-full">
            <h3 className="text-2xl font-metal text-grunge-red mb-6">
              {currentPlaylist ? 'Edit Playlist' : 'Add New Playlist'}
            </h3>
            
            <form onSubmit={handleSubmit} className="space-y-4">
              <div>
                <label className="block text-sm font-medium mb-1">Title</label>
                <input
                  type="text"
                  name="title"
                  defaultValue={currentPlaylist?.title}
                  required
                  className="w-full px-3 py-2 bg-white/5 rounded border border-grunge-red/20"
                />
              </div>

              <div>
                <label className="block text-sm font-medium mb-1">Description</label>
                <textarea
                  name="description"
                  defaultValue={currentPlaylist?.description}
                  rows={3}
                  className="w-full px-3 py-2 bg-white/5 rounded border border-grunge-red/20"
                />
              </div>

              <div>
                <label className="block text-sm font-medium mb-1">Section</label>
                <select
                  name="section"
                  defaultValue={currentPlaylist?.section || 'local_frequencies'}
                  required
                  className="w-full px-3 py-2 bg-white/5 rounded border border-grunge-red/20"
                >
                  <option value="local_frequencies">Local Frequencies</option>
                  <option value="crate_dive">Crate Dive</option>
                </select>
              </div>

              <div>
                <label className="block text-sm font-medium mb-1">Spotify URL</label>
                <input
                  type="url"
                  name="spotifyUrl"
                  defaultValue={currentPlaylist?.spotify_url}
                  required
                  placeholder="https://open.spotify.com/playlist/..."
                  className="w-full px-3 py-2 bg-white/5 rounded border border-grunge-red/20"
                />
                <p className="text-sm text-gray-400 mt-1">
                  Paste the Spotify playlist URL here
                </p>
              </div>

              <div className="flex justify-end gap-4 mt-6">
                <button
                  type="button"
                  onClick={() => {
                    setIsModalOpen(false);
                    setCurrentPlaylist(null);
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
                  {isSaving ? 'Saving...' : (currentPlaylist ? 'Update Playlist' : 'Add Playlist')}
                </button>
              </div>
            </form>
          </div>
        </div>
      )}
    </div>
  );
};

export default AdminPlaylists;