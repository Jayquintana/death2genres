export interface Show {
  id?: string;
  date: string;
  artist: string;
  venue: string;
  city: string;
  description?: string;
  ticket_url?: string;
  price?: string;
  doors?: string;
  show_time?: string;
  age_restriction?: string;
}

export interface PastShow {
  id?: string;
  artist: string;
  description: string;
  video_url: string;
  image: string;
}

export interface GalleryImage {
  id?: string;
  url: string;
  caption: string;
}

export interface Playlist {
  id?: string;
  title: string;
  description?: string;
  spotify_url: string;
  embed_url: string;
  order?: number;
  section?: 'local_frequencies' | 'crate_dive';
}