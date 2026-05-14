/*
  # Update past shows to remove duplicates

  1. Changes
    - Clear existing past shows
    - Insert unique past show entries
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
    'https://res.cloudinary.com/dxvmxswbs/image/upload/v1742794926/B730B752-769B-49D0-81DC-AF64803C7FDB_iyijgg.jpg'
  ),
  (
    'Death 2 Genres: Halloween On Larimer',
    'D2G Halloween Promo',
    'https://www.youtube.com/embed/Rnu_yFQPZvg',
    'https://res.cloudinary.com/dxvmxswbs/image/upload/v1742794931/170A9911_bu4gan.jpg'
  )
ON CONFLICT DO NOTHING;