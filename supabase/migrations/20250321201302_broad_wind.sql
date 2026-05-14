/*
  # Create tables for shows, past shows, and gallery

  1. New Tables
    - `shows`
      - `id` (uuid, primary key)
      - `date` (date, required)
      - `artist` (text, required)
      - `venue` (text, required)
      - `city` (text, required)
      - `description` (text)
      - `ticket_url` (text)
      - `price` (text)
      - `doors` (text)
      - `show_time` (text)
      - `age_restriction` (text)
      - `created_at` (timestamp with time zone)

    - `past_shows`
      - `id` (uuid, primary key)
      - `artist` (text, required)
      - `description` (text, required)
      - `video_url` (text, required)
      - `image` (text, required)
      - `created_at` (timestamp with time zone)

    - `gallery`
      - `id` (uuid, primary key)
      - `url` (text, required)
      - `caption` (text, required)
      - `created_at` (timestamp with time zone)

  2. Security
    - Enable RLS on all tables
    - Add policies for authenticated users to manage their content
    - Allow public read access to all tables
*/

-- Create shows table
CREATE TABLE IF NOT EXISTS shows (
  id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  date date NOT NULL,
  artist text NOT NULL,
  venue text NOT NULL,
  city text NOT NULL,
  description text,
  ticket_url text,
  price text,
  doors text,
  show_time text,
  age_restriction text,
  created_at timestamptz DEFAULT now()
);

ALTER TABLE shows ENABLE ROW LEVEL SECURITY;

CREATE POLICY "Shows are viewable by everyone"
  ON shows
  FOR SELECT
  TO public
  USING (true);

CREATE POLICY "Authenticated users can manage shows"
  ON shows
  FOR ALL
  TO authenticated
  USING (true)
  WITH CHECK (true);

-- Create past_shows table
CREATE TABLE IF NOT EXISTS past_shows (
  id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  artist text NOT NULL,
  description text NOT NULL,
  video_url text NOT NULL,
  image text NOT NULL,
  created_at timestamptz DEFAULT now()
);

ALTER TABLE past_shows ENABLE ROW LEVEL SECURITY;

CREATE POLICY "Past shows are viewable by everyone"
  ON past_shows
  FOR SELECT
  TO public
  USING (true);

CREATE POLICY "Authenticated users can manage past shows"
  ON past_shows
  FOR ALL
  TO authenticated
  USING (true)
  WITH CHECK (true);

-- Create gallery table
CREATE TABLE IF NOT EXISTS gallery (
  id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  url text NOT NULL,
  caption text NOT NULL,
  created_at timestamptz DEFAULT now()
);

ALTER TABLE gallery ENABLE ROW LEVEL SECURITY;

CREATE POLICY "Gallery images are viewable by everyone"
  ON gallery
  FOR SELECT
  TO public
  USING (true);

CREATE POLICY "Authenticated users can manage gallery"
  ON gallery
  FOR ALL
  TO authenticated
  USING (true)
  WITH CHECK (true);