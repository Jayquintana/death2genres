import React, { useState, useEffect } from 'react';
import { Plus, Trash2, Edit, Save, Upload, Folder, Image as ImageIcon } from 'lucide-react';
import { supabase } from '../lib/supabase';
import type { GalleryImage } from '../types';

interface StorageFile {
  name: string;
  id: string;
  updated_at: string;
  created_at: string;
  last_accessed_at: string;
  metadata: {
    eTag: string;
    size: number;
    mimetype: string;
    cacheControl: string;
    lastModified: string;
    contentLength: number;
    httpStatusCode: number;
  };
}

const AdminGallery: React.FC = () => {
  const [images, setImages] = useState<GalleryImage[]>([]);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [isStorageBrowserOpen, setIsStorageBrowserOpen] = useState(false);
  const [currentImage, setCurrentImage] = useState<GalleryImage | null>(null);
  const [isSaving, setIsSaving] = useState(false);
  const [storageFiles, setStorageFiles] = useState<StorageFile[]>([]);
  const [currentFolder, setCurrentFolder] = useState<string>('');
  const [folders, setFolders] = useState<string[]>([]);
  const [isLoadingStorage, setIsLoadingStorage] = useState(false);

  useEffect(() => {
    fetchGalleryImages();
  }, []);

  const fetchStorageFiles = async (folder: string = '') => {
    setIsLoadingStorage(true);
    try {
      console.log('Fetching from folder:', folder);
      
      // Let's explore what's actually in the root of the images bucket
      if (folder === '') {
        console.log('Exploring root of images bucket...');
        
        // First, let's see everything in the root
        const { data: rootData, error: rootError } = await supabase.storage
          .from('images')
          .list('', { limit: 100 });
        
        console.log('Root storage contents:', { data: rootData, error: rootError });
        
        // Let's also try some variations of the folder names
        const folderVariations = [
          'D2G5000',
          'D2GHalloween', 
          'Death 2 Genres Wesite Images',
          'Death%202%20Genres%20Wesite%20Images',
          'images/Death 2 Genres Wesite Images',
          'gallery'
        ];
        
        for (const folderName of folderVariations) {
          const { data, error } = await supabase.storage
            .from('images')
            .list(folderName, { limit: 5 });
          
          console.log(`Checking folder "${folderName}":`, { data, error, hasContent: data && data.length > 0 });
        }
      }
      
      const { data, error } = await supabase.storage
        .from('images')
        .list(folder, {
          limit: 100,
          offset: 0,
        });

      console.log('Storage response:', { data, error });

      if (error) throw error;

      // Separate folders and files - folders don't have extensions and aren't placeholders
      const folderList = data?.filter(item => {
        const isFolder = !item.name.includes('.') && item.name !== '.emptyFolderPlaceholder';
        return isFolder;
      }) || [];
      
      const fileList = data?.filter(item => 
        item.name.includes('.') && 
        (item.name.toLowerCase().endsWith('.jpg') || 
         item.name.toLowerCase().endsWith('.jpeg') || 
         item.name.toLowerCase().endsWith('.png') || 
         item.name.toLowerCase().endsWith('.webp') ||
         item.name.toLowerCase().endsWith('.gif'))
      ) || [];

      console.log('Folders found:', folderList.length, folderList.map(f => f.name));
      console.log('Files found:', fileList.length, fileList.map(f => f.name));

      setFolders(folderList.map(f => f.name));
      setStorageFiles(fileList as any);
    } catch (error) {
      console.error('Error fetching storage files:', error);
      const errorMsg = error instanceof Error ? error.message : 'Unknown error occurred';
      alert(`Failed to load storage files: ${errorMsg}`);
    } finally {
      setIsLoadingStorage(false);
    }
  };

  const openStorageBrowser = () => {
    setIsStorageBrowserOpen(true);
    fetchStorageFiles();
  };

  const navigateToFolder = (folderName: string) => {
    const newPath = currentFolder ? `${currentFolder}/${folderName}` : folderName;
    setCurrentFolder(newPath);
    fetchStorageFiles(newPath);
  };

  const navigateBack = () => {
    const pathParts = currentFolder.split('/');
    pathParts.pop();
    const newPath = pathParts.join('/');
    setCurrentFolder(newPath);
    fetchStorageFiles(newPath);
  };

  const addImageFromStorage = async (file: StorageFile) => {
    const filePath = currentFolder ? `${currentFolder}/${file.name}` : file.name;
    const { data } = supabase.storage
      .from('images')
      .getPublicUrl(filePath);

    const imageData: GalleryImage = {
      url: data.publicUrl,
      caption: file.name.split('.')[0], // Use filename without extension as caption
    };

    try {
      const { error } = await supabase
        .from('gallery')
        .insert([imageData]);

      if (error) throw error;

      await fetchGalleryImages();
      setIsStorageBrowserOpen(false);
    } catch (error) {
      console.error('Error adding image from storage:', error);
      alert('Failed to add image from storage');
    }
  };

  const fetchGalleryImages = async () => {
    const { data, error } = await supabase
      .from('gallery')
      .select('*')
      .order('created_at', { ascending: false });

    if (error) {
      console.error('Error fetching gallery images:', error);
      return;
    }

    setImages(data || []);
  };

  const handleFileUpload = async (event: React.ChangeEvent<HTMLInputElement>) => {
    const file = event.target.files?.[0];
    if (!file) return;

    try {
      // Upload file to Supabase Storage
      const fileExt = file.name.split('.').pop();
      const fileName = `${Math.random().toString(36).substring(2)}.${fileExt}`;
      const filePath = `gallery/${fileName}`;

      const { error: uploadError } = await supabase.storage
        .from('images')
        .upload(filePath, file, {
          cacheControl: '3600'
        });

      if (uploadError) throw uploadError;

      // Get public URL
      const { data: { publicUrl } } = supabase.storage
        .from('images')
        .getPublicUrl(filePath);

      // Save image info to database
      const { error: dbError } = await supabase
        .from('gallery')
        .insert([{
          url: publicUrl,
          caption: file.name.split('.')[0], // Use filename as initial caption
        }]);

      if (dbError) throw dbError;

      await fetchGalleryImages();
    } catch (error) {
      console.error('Error uploading file:', error);
      alert('Failed to upload file');
    }
  };

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setIsSaving(true);

    const formData = new FormData(e.currentTarget);
    let imageUrl = formData.get('url') as string;
    
    // Convert any Supabase storage URL to permanent public URL
    if (imageUrl.includes(import.meta.env.VITE_SUPABASE_URL) && imageUrl.includes('/storage/v1/object/')) {
      // Extract the path from any Supabase storage URL
      let pathPart = '';
      
      if (imageUrl.includes('/storage/v1/object/sign/')) {
        // Signed URL
        const urlParts = imageUrl.split('/storage/v1/object/sign/')[1];
        pathPart = urlParts.split('?')[0]; // Remove token part
      } else if (imageUrl.includes('/storage/v1/object/public/')) {
        // Public URL
        pathPart = imageUrl.split('/storage/v1/object/public/')[1];
      }
      
      if (pathPart) {
        // Extract bucket and file path
        const [bucket, ...fileParts] = pathPart.split('/');
        const filePath = fileParts.join('/');
        
        // Create permanent public URL using Supabase client
        const { data } = supabase.storage.from(bucket).getPublicUrl(filePath);
        imageUrl = data.publicUrl;
      }
    }
    
    const imageData: GalleryImage = {
      url: imageUrl,
      caption: formData.get('caption') as string,
    };

    try {
      if (currentImage?.id) {
        // Update existing image
        const { error } = await supabase
          .from('gallery')
          .update(imageData)
          .eq('id', currentImage.id);

        if (error) throw error;
      } else {
        // Insert new image
        const { error } = await supabase
          .from('gallery')
          .insert([imageData]);

        if (error) throw error;
      }

      await fetchGalleryImages();
      setIsModalOpen(false);
      setCurrentImage(null);
    } catch (error) {
      console.error('Error saving gallery image:', error);
      alert('Failed to save gallery image');
    } finally {
      setIsSaving(false);
    }
  };

  const handleDelete = async (image: GalleryImage) => {
    if (!image.id || !confirm('Are you sure you want to delete this image?')) {
      return;
    }

    try {
      // Delete from storage if it's a Supabase storage URL
      if (image.url.includes(import.meta.env.VITE_SUPABASE_URL) && image.url.includes('/storage/v1/object/public/')) {
        // Extract the full path from the public URL
        const urlParts = image.url.split('/storage/v1/object/public/')[1];
        if (urlParts) {
          const [bucket, ...pathParts] = urlParts.split('/');
          const filePath = pathParts.join('/');
          
          if (bucket && filePath) {
            await supabase.storage
              .from(bucket)
              .remove([filePath]);
          }
        }
      }

      // Delete from database
      const { error } = await supabase
        .from('gallery')
        .delete()
        .eq('id', image.id);

      if (error) throw error;

      await fetchGalleryImages();
    } catch (error) {
      console.error('Error deleting gallery image:', error);
      alert('Failed to delete gallery image');
    }
  };

  const handleEdit = (image: GalleryImage) => {
    setCurrentImage(image);
    setIsModalOpen(true);
  };

  return (
    <div className="max-w-4xl mx-auto">
      <div className="flex justify-between items-center mb-8">
        <h2 className="text-3xl font-metal text-grunge-red">Manage Gallery</h2>
        <div className="flex gap-4">
          <label className="relative cursor-pointer">
            <input
              type="file"
              className="hidden"
              accept="image/*"
              onChange={handleFileUpload}
            />
            <div className="flex items-center gap-2 bg-grunge-red px-4 py-2 rounded hover:bg-grunge-yellow transition-colors duration-300">
              <Upload className="w-5 h-5" />
              Upload Image
            </div>
          </label>
          <button
            onClick={openStorageBrowser}
            className="flex items-center gap-2 bg-grunge-yellow px-4 py-2 rounded hover:bg-grunge-red transition-colors duration-300 text-black"
          >
            <Folder className="w-5 h-5" />
            Browse Storage
          </button>
          <button
            onClick={() => setIsModalOpen(true)}
            className="flex items-center gap-2 bg-grunge-red px-4 py-2 rounded hover:bg-grunge-yellow transition-colors duration-300"
          >
            <Plus className="w-5 h-5" />
            Add URL
          </button>
        </div>
      </div>

      <div className="grid grid-cols-2 md:grid-cols-3 gap-4">
        {images.map((image) => (
          <div key={image.id} className="relative group">
            <img
              src={image.url}
              alt={image.caption}
              className="w-full aspect-square object-cover rounded-lg"
            />
            <div className="absolute inset-0 bg-black/75 opacity-0 group-hover:opacity-100 transition-opacity duration-300 rounded-lg flex flex-col items-center justify-center p-4">
              <p className="text-center mb-4">{image.caption}</p>
              <div className="flex gap-2">
                <button
                  onClick={() => handleEdit(image)}
                  className="p-2 hover:text-grunge-yellow transition-colors duration-300"
                >
                  <Edit className="w-5 h-5" />
                </button>
                <button
                  onClick={() => handleDelete(image)}
                  className="p-2 hover:text-grunge-red transition-colors duration-300"
                >
                  <Trash2 className="w-5 h-5" />
                </button>
              </div>
            </div>
          </div>
        ))}
      </div>

      {/* Add/Edit Image Modal */}
      {isModalOpen && (
        <div className="fixed inset-0 bg-black/90 flex items-center justify-center p-4 z-50">
          <div className="bg-grunge-dark p-8 rounded-lg border border-grunge-red/20 max-w-2xl w-full">
            <h3 className="text-2xl font-metal text-grunge-red mb-6">
              {currentImage ? 'Edit Image' : 'Add New Image'}
            </h3>
            
            <form onSubmit={handleSubmit} className="space-y-4">
              <div>
                <label className="block text-sm font-medium mb-1">Image URL</label>
                <input
                  type="url"
                  name="url"
                  defaultValue={currentImage?.url}
                  required
                  className="w-full px-3 py-2 bg-white/5 rounded border border-grunge-red/20"
                />
              </div>

              <div>
                <label className="block text-sm font-medium mb-1">Caption</label>
                <input
                  type="text"
                  name="caption"
                  defaultValue={currentImage?.caption}
                  required
                  className="w-full px-3 py-2 bg-white/5 rounded border border-grunge-red/20"
                />
              </div>

              <div className="flex justify-end gap-4 mt-6">
                <button
                  type="button"
                  onClick={() => {
                    setIsModalOpen(false);
                    setCurrentImage(null);
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
                  {isSaving ? 'Saving...' : (currentImage ? 'Update Image' : 'Add Image')}
                </button>
              </div>
            </form>
          </div>
        </div>
      )}

      {/* Storage Browser Modal */}
      {isStorageBrowserOpen && (
        <div className="fixed inset-0 bg-black/90 flex items-center justify-center p-4 z-50">
          <div className="bg-grunge-dark p-6 rounded-lg border border-grunge-red/20 max-w-4xl w-full max-h-[80vh] overflow-hidden flex flex-col">
            <div className="flex justify-between items-center mb-4">
              <h3 className="text-2xl font-metal text-grunge-red">Browse Storage</h3>
              <button
                onClick={() => setIsStorageBrowserOpen(false)}
                className="text-grunge-red hover:text-grunge-yellow transition-colors duration-300"
              >
                ✕
              </button>
            </div>
            
            {/* Breadcrumb */}
            <div className="mb-4 flex items-center gap-2 text-sm">
              <button
                onClick={() => {
                  setCurrentFolder('');
                  fetchStorageFiles();
                }}
                className="text-grunge-yellow hover:text-grunge-red transition-colors duration-300"
              >
                images
              </button>
              {currentFolder.split('/').filter(Boolean).map((folder, index, arr) => (
                <React.Fragment key={index}>
                  <span className="text-gray-500">/</span>
                  <button
                    onClick={() => {
                      const path = arr.slice(0, index + 1).join('/');
                      setCurrentFolder(path);
                      fetchStorageFiles(path);
                    }}
                    className="text-grunge-yellow hover:text-grunge-red transition-colors duration-300"
                  >
                    {folder}
                  </button>
                </React.Fragment>
              ))}
            </div>

            {/* Back Button */}
            {currentFolder && (
              <button
                onClick={navigateBack}
                className="mb-4 flex items-center gap-2 text-grunge-yellow hover:text-grunge-red transition-colors duration-300"
              >
                ← Back
              </button>
            )}

            {/* Loading */}
            {isLoadingStorage && (
              <div className="flex items-center justify-center py-8">
                <div className="w-8 h-8 border-2 border-grunge-red rounded-full animate-spin border-t-transparent"></div>
              </div>
            )}

            {/* Content */}
            {!isLoadingStorage && (
              <div className="flex-1 overflow-y-auto">
                {/* Debug info */}
                <div className="mb-4 p-2 bg-black/30 rounded text-xs">
                  <p>Current folder: "{currentFolder}"</p>
                  <p>Folders found: {folders.length} - {folders.join(', ')}</p>
                  <p>Files found: {storageFiles.length}</p>
                </div>

                {/* Show folders if we have any */}
                <div className="mb-6">
                  <h4 className="text-lg font-metal text-grunge-yellow mb-3">Folders ({folders.length})</h4>
                  <div className="grid grid-cols-2 md:grid-cols-4 gap-3">
                    {folders.map((folder) => (
                      <button
                        key={folder}
                        onClick={() => navigateToFolder(folder)}
                        className="flex items-center gap-2 p-3 bg-white/5 rounded border border-grunge-red/20 hover:border-grunge-red/40 transition-colors duration-300 text-left"
                      >
                        <Folder className="w-5 h-5 text-grunge-yellow" />
                        <span className="text-sm truncate">{folder}</span>
                      </button>
                    ))}
                  </div>
                </div>

                {/* Show images if we have any */}
                <div>
                  <h4 className="text-lg font-metal text-grunge-yellow mb-3">Images ({storageFiles.length})</h4>
                  <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
                    {storageFiles.map((file) => {
                      const filePath = currentFolder ? `${currentFolder}/${file.name}` : file.name;
                      const { data } = supabase.storage.from('images').getPublicUrl(filePath);
                      
                      return (
                        <div key={file.name} className="relative group">
                          <img
                            src={data.publicUrl}
                            alt={file.name}
                            className="w-full aspect-square object-cover rounded border border-grunge-red/20"
                          />
                          <div className="absolute inset-0 bg-black/75 opacity-0 group-hover:opacity-100 transition-opacity duration-300 rounded flex flex-col items-center justify-center p-2">
                            <p className="text-xs text-center mb-2 truncate w-full">{file.name}</p>
                            <button
                              onClick={() => addImageFromStorage(file)}
                              className="flex items-center gap-1 bg-grunge-red px-3 py-1 rounded text-sm hover:bg-grunge-yellow transition-colors duration-300"
                            >
                              <Plus className="w-4 h-4" />
                              Add
                            </button>
                          </div>
                        </div>
                      );
                    })}
                  </div>
                </div>

                {/* Show message if nothing found */}
                {folders.length === 0 && storageFiles.length === 0 && (
                  <div className="text-center py-8 text-gray-400">
                    <ImageIcon className="w-12 h-12 mx-auto mb-4 opacity-50" />
                    <p>No folders or images found in current location</p>
                  </div>
                )}
              </div>
            )}
          </div>
        </div>
      )}
    </div>
  );
};

export default AdminGallery;