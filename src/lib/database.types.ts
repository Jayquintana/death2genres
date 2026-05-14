export type Json =
  | string
  | number
  | boolean
  | null
  | { [key: string]: Json | undefined }
  | Json[]

export interface Database {
  public: {
    Tables: {
      shows: {
        Row: {
          id: string
          date: string
          artist: string
          venue: string
          city: string
          description: string | null
          ticket_url: string | null
          price: string | null
          doors: string | null
          show_time: string | null
          age_restriction: string | null
          created_at: string
        }
        Insert: {
          id?: string
          date: string
          artist: string
          venue: string
          city: string
          description?: string | null
          ticket_url?: string | null
          price?: string | null
          doors?: string | null
          show_time?: string | null
          age_restriction?: string | null
          created_at?: string
        }
        Update: {
          id?: string
          date?: string
          artist?: string
          venue?: string
          city?: string
          description?: string | null
          ticket_url?: string | null
          price?: string | null
          doors?: string | null
          show_time?: string | null
          age_restriction?: string | null
          created_at?: string
        }
      }
      playlists: {
        Row: {
          id: string
          title: string
          description: string | null
          spotify_url: string
          embed_url: string
          order: number | null
          section: string | null
          created_at: string
        }
        Insert: {
          id?: string
          title: string
          description?: string | null
          spotify_url: string
          embed_url: string
          order?: number | null
          section?: string | null
          created_at?: string
        }
        Update: {
          id?: string
          title?: string
          description?: string | null
          spotify_url?: string
          embed_url?: string
          order?: number | null
          section?: string | null
          created_at?: string
        }
      }
      past_shows: {
        Row: {
          id: string
          artist: string
          description: string
          video_url: string
          image: string
          created_at: string
        }
        Insert: {
          id?: string
          artist: string
          description: string
          video_url: string
          image: string
          created_at?: string
        }
        Update: {
          id?: string
          artist?: string
          description?: string
          video_url?: string
          image?: string
          created_at?: string
        }
      }
      gallery: {
        Row: {
          id: string
          url: string
          caption: string
          created_at: string
        }
        Insert: {
          id?: string
          url: string
          caption: string
          created_at?: string
        }
        Update: {
          id?: string
          url?: string
          caption?: string
          created_at?: string
        }
      }
    }
    Views: {
      [_ in never]: never
    }
    Functions: {
      [_ in never]: never
    }
    Enums: {
      [_ in never]: never
    }
  }
}