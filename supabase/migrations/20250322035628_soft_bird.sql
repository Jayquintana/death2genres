/*
  # Restore initial data

  1. Initial Data
    - Add initial shows
    - Add initial past shows
    - Add initial gallery images

  2. Changes
    - Insert sample data into shows, past_shows, and gallery tables
*/

-- Insert initial shows
INSERT INTO shows (
  date,
  artist,
  venue,
  city,
  description,
  ticket_url,
  price,
  doors,
  show_time,
  age_restriction
)
VALUES (
  '2025-06-21',
  'Death 2 Genres 5000',
  'The Pearl AKA Mercury Cafe',
  'Denver, CO',
  'Join us for an unforgettable night of genre-defying music as we celebrate our 5000th show! Featuring a lineup of groundbreaking artists who continue to push the boundaries of musical expression.',
  'https://tickets.example.com/d2g5000',
  '$25 - $45',
  '7:00 PM',
  '8:00 PM',
  '18+'
)
ON CONFLICT DO NOTHING;

-- Insert initial past shows
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
    'https://images.unsplash.com/photo-1501612780327-45045538702b?ixlib=rb-1.2.1&auto=format&fit=crop&w=1950&q=80'
  ),
  (
    'Death 2 Genres PT.3: Cinco de Mayo',
    'Banda, Indie Rock, Jazz Fusion, and Grunge',
    'https://www.youtube.com/embed/yN8TNXlQhLI',
    'https://images.unsplash.com/photo-1492684223066-81342ee5ff30?ixlib=rb-1.2.1&auto=format&fit=crop&w=1950&q=80'
  ),
  (
    'Death 2 Genres: Halloween On Larimer',
    'D2G Halloween Promo',
    'https://www.youtube.com/embed/Rnu_yFQPZvg',
    'https://images.unsplash.com/photo-1459749411175-04bf5292ceea?ixlib=rb-1.2.1&auto=format&fit=crop&w=1950&q=80'
  )
ON CONFLICT DO NOTHING;

-- Insert initial gallery images
INSERT INTO gallery (
  url,
  caption
)
VALUES 
  (
    'https://images.unsplash.com/photo-1501386761578-eac5c94b800a?ixlib=rb-1.2.1&auto=format&fit=crop&w=1950&q=80',
    'Summer Festival 2023'
  ),
  (
    'https://images.unsplash.com/photo-1429962714451-bb934ecdc4ec?ixlib=rb-1.2.1&auto=format&fit=crop&w=1950&q=80',
    'Underground Sessions'
  ),
  (
    'https://images.unsplash.com/photo-1506157786151-b8491531f063?ixlib=rb-1.2.1&auto=format&fit=crop&w=1950&q=80',
    'Warehouse Rave'
  ),
  (
    'https://images.unsplash.com/photo-1524368535928-5b5e00ddc76b?ixlib=rb-1.2.1&auto=format&fit=crop&w=1950&q=80',
    'Live at The Underground'
  ),
  (
    'https://images.unsplash.com/photo-1459749411175-04bf5292ceea?ixlib=rb-1.2.1&auto=format&fit=crop&w=1950&q=80',
    'Electronic Night'
  ),
  (
    'https://images.unsplash.com/photo-1492684223066-81342ee5ff30?ixlib=rb-1.2.1&auto=format&fit=crop&w=1950&q=80',
    'Genre-Bending Experience'
  )
ON CONFLICT DO NOTHING;