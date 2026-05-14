/*
  # Add playlists table

  1. New Tables
    - `playlists`
      - `id` (uuid, primary key)
      - `title` (text, required)
      - `description` (text)
      - `spotify_url` (text, required)
      - `embed_url` (text, required)
      - `created_at` (timestamp with time zone)
      - `order` (integer) for custom sorting

  2. Security
    - Enable RLS on playlists table
    - Add policy for public read access
    - Add policy for authenticated users to manage playlists
*/

CREATE TABLE IF NOT EXISTS playlists (
  id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  title text NOT NULL,
  description text,
  spotify_url text NOT NULL,
  embed_url text NOT NULL,
  "order" integer DEFAULT 0,
  created_at timestamptz DEFAULT now()
);

ALTER TABLE playlists ENABLE ROW LEVEL SECURITY;

CREATE POLICY "Playlists are viewable by everyone"
  ON playlists
  FOR SELECT
  TO public
  USING (true);

CREATE POLICY "Authenticated users can manage playlists"
  ON playlists
  FOR ALL
  TO authenticated
  USING (true)
  WITH CHECK (true);

-- Insert initial playlist
INSERT INTO playlists (
  title,
  description,
  spotify_url,
  embed_url,
  "order"
)
VALUES (
  'Death 2 Genres Radio',
  'Our curated selection of genre-defying tracks',
  'https://open.spotify.com/playlist/7dAYXEa5eHX8EVII4NosEE',
  'https://open.spotify.com/embed/playlist/7dAYXEa5eHX8EVII4NosEE',
  0
);