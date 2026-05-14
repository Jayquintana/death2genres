/*
  # Update past shows to use Supabase storage URLs

  1. Changes
    - Clear existing past shows
    - Insert unique past show entries with Supabase storage URLs
*/

-- Clear existing past shows
DELETE FROM past_shows;

-- Insert unique past shows
INSERT INTO past_shows (
  artist,
  description,
  video_url,
  image
)
VALUES 
  (
    'Death 2 Genres PT.2: Lost Lake',
    'Hip Hop, Indie, Psychedelic Rock, Electronic',
    'https://www.youtube.com/embed/JYeL30DmdTI',
    'https://zp1v56uxy8rdx5ypatb0ockcb9tr6a.supabase.co/storage/v1/object/public/images/B730B752-769B-49D0-81DC-AF64803C7FDB.jpg'
  ),
  (
    'Death 2 Genres: Halloween On Larimer',
    'D2G Halloween Promo',
    'https://www.youtube.com/embed/Rnu_yFQPZvg',
    'https://zp1v56uxy8rdx5ypatb0ockcb9tr6a.supabase.co/storage/v1/object/public/images/170A9911.jpg'
  )
ON CONFLICT DO NOTHING;