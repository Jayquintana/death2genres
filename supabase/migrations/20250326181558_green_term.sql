/*
  # Update gallery images

  1. Changes
    - Clear existing gallery images
    - Insert new gallery images from slideshow
*/

-- Clear existing gallery images
DELETE FROM gallery;

-- Insert new gallery images
INSERT INTO gallery (
  url,
  caption
)
VALUES 
  (
    'https://res.cloudinary.com/dxvmxswbs/image/upload/v1742794931/170A9911_bu4gan.jpg',
    'Concert atmosphere'
  ),
  (
    'https://res.cloudinary.com/dxvmxswbs/image/upload/v1742794923/2E1C5F32-494D-4DD8-B503-6AF031462A18_pxnniy.jpg',
    'Live performance'
  ),
  (
    'https://res.cloudinary.com/dxvmxswbs/image/upload/v1742794923/A5EA2B9F-8DE7-44DE-AA6B-3DC40ACC412E_ryfuyi.jpg',
    'Festival crowd'
  ),
  (
    'https://res.cloudinary.com/dxvmxswbs/image/upload/v1742794926/B730B752-769B-49D0-81DC-AF64803C7FDB_iyijgg.jpg',
    'Music event'
  ),
  (
    'https://res.cloudinary.com/dxvmxswbs/image/upload/v1742794933/170A9684_2_fooqxe.jpg',
    'Underground performance'
  ),
  (
    'https://res.cloudinary.com/dxvmxswbs/image/upload/v1742794936/170A9517_oqtez1.jpg',
    'Live concert'
  ),
  (
    'https://res.cloudinary.com/dxvmxswbs/image/upload/v1742794935/OS9A0464_nvgnrl.jpg',
    'Live DJ'
  ),
  (
    'https://res.cloudinary.com/dxvmxswbs/image/upload/v1742794918/37FC0A97-9125-43B3-8E6F-4DE190935618_b2e2oa.jpg',
    'Singer'
  );