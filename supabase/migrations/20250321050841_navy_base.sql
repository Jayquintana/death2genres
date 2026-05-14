/*
  # Create blog tables

  1. New Tables
    - `blog_posts`
      - `id` (uuid, primary key)
      - `title` (text)
      - `content` (text)
      - `image_url` (text)
      - `author` (text)
      - `created_at` (timestamp)
      - `category` (text)
      - `featured` (boolean)
      - `author_id` (uuid) - references the authenticated user
    
  2. Security
    - Enable RLS on `blog_posts` table
    - Add policy for public read access
    - Add policy for authenticated users to create posts
    - Add policy for authors to update their own posts
*/

CREATE TABLE IF NOT EXISTS blog_posts (
  id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  title text NOT NULL,
  content text NOT NULL,
  image_url text NOT NULL,
  author text NOT NULL,
  author_id uuid NOT NULL,
  created_at timestamptz DEFAULT now(),
  category text NOT NULL,
  featured boolean DEFAULT false
);

ALTER TABLE blog_posts ENABLE ROW LEVEL SECURITY;

CREATE POLICY "Blog posts are viewable by everyone"
  ON blog_posts
  FOR SELECT
  TO public
  USING (true);

CREATE POLICY "Authenticated users can create blog posts"
  ON blog_posts
  FOR INSERT
  TO authenticated
  WITH CHECK (auth.uid() = author_id);

CREATE POLICY "Authors can update their own posts"
  ON blog_posts
  FOR UPDATE
  TO authenticated
  USING (auth.uid() = author_id);