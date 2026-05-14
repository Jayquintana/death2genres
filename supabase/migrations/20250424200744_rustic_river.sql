/*
  # Restore initial data and gallery images

  1. Initial Data
    - Add initial shows
    - Add initial past shows
    - Add initial gallery images with all photos from slideshow

  2. Changes
    - Insert sample data into shows, past_shows tables
    - Insert complete gallery image collection
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

-- Insert complete gallery collection
INSERT INTO gallery (
  url,
  caption
)
VALUES 
  (
    'https://res.cloudinary.com/dxvmxswbs/image/upload/v1742794931/170A9911_bu4gan.jpg',
    'Jaguar Stevens at D2G Halloween'
  ),
  (
    'https://res.cloudinary.com/dxvmxswbs/image/upload/v1742794923/A5EA2B9F-8DE7-44DE-AA6B-3DC40ACC412E_ryfuyi.jpg',
    'Dream-Like @ D2G 2'
  ),
  (
    'https://res.cloudinary.com/dxvmxswbs/image/upload/v1742794926/B730B752-769B-49D0-81DC-AF64803C7FDB_iyijgg.jpg',
    'GrungeLoved at D2G 1'
  ),
  (
    'https://res.cloudinary.com/dxvmxswbs/image/upload/v1742794933/170A9684_2_fooqxe.jpg',
    'N1ghtcvwler at D2G Halloween'
  ),
  (
    'https://res.cloudinary.com/dxvmxswbs/image/upload/v1742794936/170A9517_oqtez1.jpg',
    'Estephanie at D2G Halloween'
  ),
  (
    'https://res.cloudinary.com/dxvmxswbs/image/upload/v1742794935/OS9A0464_nvgnrl.jpg',
    'Slim Organics at D2G 3'
  ),
  (
    'https://res.cloudinary.com/dxvmxswbs/image/upload/v1742794918/37FC0A97-9125-43B3-8E6F-4DE190935618_b2e2oa.jpg',
    'JAYPAPI at D2g 1'
  ),
  (
    'https://res.cloudinary.com/dxvmxswbs/image/upload/v1743703226/170A9513_ncpsfu.jpg',
    'Estephanie at D2G Halloween'
  ),
  (
    'https://res.cloudinary.com/dxvmxswbs/image/upload/v1743703219/170A9540_lejruz.jpg',
    'Estephanie at D2G Halloween'
  ),
  (
    'https://res.cloudinary.com/dxvmxswbs/image/upload/v1743703212/170A9569_u2g4sy.jpg',
    'Estephanie at D2G Halloween'
  ),
  (
    'https://res.cloudinary.com/dxvmxswbs/image/upload/v1743703192/IMG_1835_cutli5.jpg',
    'The Harlotts at D2G Cindo De Mayo'
  ),
  (
    'https://res.cloudinary.com/dxvmxswbs/image/upload/v1743703189/IMG_1836_t7e4kx.jpg',
    'The Harlotts at D2G Cindo De Mayo'
  ),
  (
    'https://res.cloudinary.com/dxvmxswbs/image/upload/v1743703186/IMG_1840_uc2pnc.jpg',
    'The Harlotts at D2G Cindo De Mayo'
  ),
  (
    'https://res.cloudinary.com/dxvmxswbs/image/upload/v1743703178/IMG_1861_haatwi.jpg',
    'The Harlotts at D2G Cindo De Mayo'
  ),
  (
    'https://res.cloudinary.com/dxvmxswbs/image/upload/v1743440773/8926448B-C916-4078-A5A0-B0D6CD6C8452_jroq8e.jpg',
    'Slim Organics at D2G 2'
  ),
  (
    'https://res.cloudinary.com/dxvmxswbs/image/upload/v1743440770/0356E921-7C14-4D39-AB79-3D851EC81568_isl7bs.jpg',
    'JAYPAPI at D2G 1'
  ),
  (
    'https://res.cloudinary.com/dxvmxswbs/image/upload/v1743440769/170A9964_w8onmc.jpg',
    'Top Heavy at D2G Halloween'
  ),
  (
    'https://res.cloudinary.com/dxvmxswbs/image/upload/v1743440160/OS9A0464_e2po7a.jpg',
    'Slim Organics at D2G 2'
  ),
  (
    'https://res.cloudinary.com/dxvmxswbs/image/upload/v1743440145/740D6BB7-0B35-490C-AE9E-6AD109D44B94_cmztun.jpg',
    'The Void Lovers at D2G 2'
  ),
  (
    'https://res.cloudinary.com/dxvmxswbs/image/upload/v1743440143/170A9990_ixtjaf.jpg',
    'Jaguar Stevens at D2G Halloween'
  )
ON CONFLICT DO NOTHING;