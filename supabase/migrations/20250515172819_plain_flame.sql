/*
  # Update gallery images with new URLs

  1. Changes
    - Clear existing gallery images
    - Insert new gallery images from slideshow with proper URLs and captions
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
    'https://sqreobuetzvtffgzbeaa.supabase.co/storage/v1/object/sign/images/Death%202%20Genres%20Wesite%20Images/170A9990.JPEG?token=eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1cmwiOiJpbWFnZXMvRGVhdGggMiBHZW5yZXMgV2VzaXRlIEltYWdlcy8xNzBBOTk5MC5KUEVHIiwiaWF0IjoxNzQ3MzI3ODI1LCJleHAiOjE3Nzg4NjM4MjV9.pEKkMPBHUPVFut9gTAkIV6HKRg5MgAJl5g3YTM2NTsw',
    'Jaguar Stevens at D2G Halloween'
  ),
  (
    'https://sqreobuetzvtffgzbeaa.supabase.co/storage/v1/object/sign/images/Death%202%20Genres%20Wesite%20Images/OS9A0435.JPEG?token=eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1cmwiOiJpbWFnZXMvRGVhdGggMiBHZW5yZXMgV2VzaXRlIEltYWdlcy9PUzlBMDQzNS5KUEVHIiwiaWF0IjoxNzQ3MzI3ODY0LCJleHAiOjE3Nzg4NjM4NjR9.fmvvF_bn1pCjBohh0nbMOGk95BrgJTKHNruVL56anIc',
    'Dream-Like @ D2G 2'
  ),
  (
    'https://sqreobuetzvtffgzbeaa.supabase.co/storage/v1/object/sign/images/Death%202%20Genres%20Wesite%20Images/OS9A0749.JPEG?token=eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1cmwiOiJpbWFnZXMvRGVhdGggMiBHZW5yZXMgV2VzaXRlIEltYWdlcy9PUzlBMDc0OS5KUEVHIiwiaWF0IjoxNzQ3MzI3ODk3LCJleHAiOjE3Nzg4NjM4OTd9.WLRriTlOTTURrbSxhFCW1VwGsLOdEf99E1arx_dsYM0',
    'GrungeLoved at D2G 1'
  ),
  (
    'https://sqreobuetzvtffgzbeaa.supabase.co/storage/v1/object/sign/images/Death%202%20Genres%20Wesite%20Images/170A9684.JPEG?token=eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1cmwiOiJpbWFnZXMvRGVhdGggMiBHZW5yZXMgV2VzaXRlIEltYWdlcy8xNzBBOTY4NC5KUEVHIiwiaWF0IjoxNzQ3MzI3OTYwLCJleHAiOjE3Nzg4NjM5NjB9.AzUmnWw3JGB42wcUoZxo1JiXxukI7KBV-bAU4I3VtTI',
    'N1ghtcvwler at D2G Halloween'
  ),
  (
    'https://sqreobuetzvtffgzbeaa.supabase.co/storage/v1/object/sign/images/Death%202%20Genres%20Wesite%20Images/170A9569.JPEG?token=eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1cmwiOiJpbWFnZXMvRGVhdGggMiBHZW5yZXMgV2VzaXRlIEltYWdlcy8xNzBBOTU2OS5KUEVHIiwiaWF0IjoxNzQ3MzI4MDQ2LCJleHAiOjE3Nzg4NjQwNDZ9.LVFgMKkic-oq4BJfC1_t6mMBBzgCgyVz1St6IQkc-Xs',
    'Estephanie at D2G Halloween'
  ),
  (
    'https://sqreobuetzvtffgzbeaa.supabase.co/storage/v1/object/sign/images/Death%202%20Genres%20Wesite%20Images/2E1C5F32-494D-4DD8-B503-6AF031462A18.JPEG?token=eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1cmwiOiJpbWFnZXMvRGVhdGggMiBHZW5yZXMgV2VzaXRlIEltYWdlcy8yRTFDNUYzMi00OTRELTRERDgtQjUwMy02QUYwMzE0NjJBMTguSlBFRyIsImlhdCI6MTc0NzMyODEwNSwiZXhwIjoxNzc4ODY0MTA1fQ.T6SOX_h2rZkm2DOmvFFonBVe0y3X983cnyBx44Ooo1c',
    'Slim Organics at D2G 3'
  ),
  (
    'https://sqreobuetzvtffgzbeaa.supabase.co/storage/v1/object/sign/images/Death%202%20Genres%20Wesite%20Images/37FC0A97-9125-43B3-8E6F-4DE190935618.JPG?token=eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1cmwiOiJpbWFnZXMvRGVhdGggMiBHZW5yZXMgV2VzaXRlIEltYWdlcy8zN0ZDMEE5Ny05MTI1LTQzQjMtOEU2Ri00REUxOTA5MzU2MTguSlBHIiwiaWF0IjoxNzQ3MzI4MTIwLCJleHAiOjE3Nzg4NjQxMjB9.uu_gHBZ8flLFOqFty8ssBbar4Wi5271ItF2S8eDmLNU',
    'JAYPAPI at D2g 1'
  ),
  (
    'https://sqreobuetzvtffgzbeaa.supabase.co/storage/v1/object/sign/images/Death%202%20Genres%20Wesite%20Images/170A9555.jpg?token=eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1cmwiOiJpbWFnZXMvRGVhdGggMiBHZW5yZXMgV2VzaXRlIEltYWdlcy8xNzBBOTU1NS5qcGciLCJpYXQiOjE3NDczMjgxNDEsImV4cCI6MTc3ODg2NDE0MX0.gWMJobhHqt1it6TSOhooDJizaS-7GaFRDiakRTZXfRI',
    'Estephanie at D2G Halloween'
  ),
  (
    'https://sqreobuetzvtffgzbeaa.supabase.co/storage/v1/object/sign/images/Death%202%20Genres%20Wesite%20Images/170A9517.JPEG?token=eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1cmwiOiJpbWFnZXMvRGVhdGggMiBHZW5yZXMgV2VzaXRlIEltYWdlcy8xNzBBOTUxNy5KUEVHIiwiaWF0IjoxNzQ3MzI4MTY4LCJleHAiOjE3Nzg4NjQxNjh9.4XJ_Jn-7-l5sHZ9nzbdxAj3vG00zuxMjyMF4kryFw0Y',
    'Estephanie at D2G Halloween'
  ),
  (
    'https://sqreobuetzvtffgzbeaa.supabase.co/storage/v1/object/sign/images/Death%202%20Genres%20Wesite%20Images/7B73600F-528F-49C1-986B-64463EE0799E.JPEG?token=eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1cmwiOiJpbWFnZXMvRGVhdGggMiBHZW5yZXMgV2VzaXRlIEltYWdlcy83QjczNjAwRi01MjhGLTQ5QzEtOTg2Qi02NDQ2M0VFMDc5OUUuSlBFRyIsImlhdCI6MTc0NzMyODkzNywiZXhwIjoxNzc4ODY0OTM3fQ.J-K2K2rT9nW1cuxwPR9lEkfxud-axoyXQMqNrtp45Es',
    'Factory Americans at D2G 2'
  ),
  (
    'https://sqreobuetzvtffgzbeaa.supabase.co/storage/v1/object/sign/images/Death%202%20Genres%20Wesite%20Images/IMG_1835.JPG?token=eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1cmwiOiJpbWFnZXMvRGVhdGggMiBHZW5yZXMgV2VzaXRlIEltYWdlcy9JTUdfMTgzNS5KUEciLCJpYXQiOjE3NDczMjg5ODUsImV4cCI6MTc3ODg2NDk4NX0.ri2mjbckzaGaDm5V7eVvSGtB8FC5ovW0f5Ac5lEijdk',
    'The Harlotts at D2G Cindo De Mayo'
  ),
  (
    'https://sqreobuetzvtffgzbeaa.supabase.co/storage/v1/object/sign/images/Death%202%20Genres%20Wesite%20Images/170A9977.jpg?token=eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1cmwiOiJpbWFnZXMvRGVhdGggMiBHZW5yZXMgV2VzaXRlIEltYWdlcy8xNzBBOTk3Ny5qcGciLCJpYXQiOjE3NDczMjkwMjksImV4cCI6MTc3ODg2NTAyOX0.w6SlkWQrCDT2Iz5zBXrotZQcwdZ5IOBUjBVN3mNlcmM',
    'Jaguar Stevens at D2G Halloween'
  ),
  (
    'https://sqreobuetzvtffgzbeaa.supabase.co/storage/v1/object/sign/images/Death%202%20Genres%20Wesite%20Images/170A0039.JPEG?token=eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1cmwiOiJpbWFnZXMvRGVhdGggMiBHZW5yZXMgV2VzaXRlIEltYWdlcy8xNzBBMDAzOS5KUEVHIiwiaWF0IjoxNzQ3MzI5MTA1LCJleHAiOjE3Nzg4NjUxMDV9.9mZgKJHeHpIRhBiSFcvtXbEReVW_pHeaDP_dnYiRSB8',
    'Top Heavy at D2G Halloween'
  ),
  (
    'https://sqreobuetzvtffgzbeaa.supabase.co/storage/v1/object/sign/images/Death%202%20Genres%20Wesite%20Images/170A0188.JPEG?token=eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1cmwiOiJpbWFnZXMvRGVhdGggMiBHZW5yZXMgV2VzaXRlIEltYWdlcy8xNzBBMDE4OC5KUEVHIiwiaWF0IjoxNzQ3MzI5NTc4LCJleHAiOjE3Nzg4NjU1Nzh9.TT8bXIq9_gAJTkSSGGTFjk5nBSNmnjT4iqrad0kVsYM',
    'Sari at D2G Halloween'
  ),
  (
    'https://sqreobuetzvtffgzbeaa.supabase.co/storage/v1/object/sign/images/Death%202%20Genres%20Wesite%20Images/OS9A0464.JPEG?token=eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1cmwiOiJpbWFnZXMvRGVhdGggMiBHZW5yZXMgV2VzaXRlIEltYWdlcy9PUzlBMDQ2NC5KUEVHIiwiaWF0IjoxNzQ3MzI5NjE5LCJleHAiOjE3Nzg4NjU2MTl9.Fe9NExGX4XTOm4qJ2TostC-4i1D24v2FRtuCNt3a52w',
    'Slim Organics at D2G 2'
  ),
  (
    'https://sqreobuetzvtffgzbeaa.supabase.co/storage/v1/object/sign/images/Death%202%20Genres%20Wesite%20Images/EE9B49F7-87F8-4DDE-A769-7EC0ED7B2337.JPEG?token=eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1cmwiOiJpbWFnZXMvRGVhdGggMiBHZW5yZXMgV2VzaXRlIEltYWdlcy9FRTlCNDlGNy04N0Y4LTREREUtQTc2OS03RUMwRUQ3QjIzMzcuSlBFRyIsImlhdCI6MTc0NzMyOTY0MywiZXhwIjoxNzc4ODY1NjQzfQ.3K9hvO5bbJrlcFXjovZ8SfZYmPK__YpYJ2_j4rpR0Mc',
    'The Void Lovers at D2G 2'
  ),
  (
    'https://sqreobuetzvtffgzbeaa.supabase.co/storage/v1/object/sign/images/Death%202%20Genres%20Wesite%20Images/170A9717.JPEG?token=eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1cmwiOiJpbWFnZXMvRGVhdGggMiBHZW5yZXMgV2VzaXRlIEltYWdlcy8xNzBBOTcxNy5KUEVHIiwiaWF0IjoxNzQ3MzI5NzA5LCJleHAiOjE3Nzg4NjU3MDl9.5q862nZd0Ju2B5yw-fRkzosI2hS-4EA33cPCknSRh2o',
    'N1ghtcvwler at D2G Halloween'
  ),
  (
    'https://sqreobuetzvtffgzbeaa.supabase.co/storage/v1/object/sign/images/Death%202%20Genres%20Wesite%20Images/170A9911.JPEG?token=eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1cmwiOiJpbWFnZXMvRGVhdGggMiBHZW5yZXMgV2VzaXRlIEltYWdlcy8xNzBBOTkxMS5KUEVHIiwiaWF0IjoxNzQ3MzI5NzQyLCJleHAiOjE3Nzg4NjU3NDJ9.E6m-eK1z9wz8y32zUvrf3lUav1Mp2hAbC--5s9CGWxo',
    'Jaguar Stevens at D2G Halloween'
  ),
  (
    'https://sqreobuetzvtffgzbeaa.supabase.co/storage/v1/object/sign/images/Death%202%20Genres%20Wesite%20Images/8926448B-C916-4078-A5A0-B0D6CD6C8452.JPEG?token=eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1cmwiOiJpbWFnZXMvRGVhdGggMiBHZW5yZXMgV2VzaXRlIEltYWdlcy84OTI2NDQ4Qi1DOTE2LTQwNzgtQTVBMC1CMEQ2Q0Q2Qzg0NTIuSlBFRyIsImlhdCI6MTc0NzMyOTc5NywiZXhwIjoxNzc4ODY1Nzk3fQ._zIMOf5QoyiyMW3J_2jd7IAA5ObKA93JdBi9AL0dnq4',
    'Slim Organics at D2G 2'
  ),
  (
    'https://sqreobuetzvtffgzbeaa.supabase.co/storage/v1/object/sign/images/Death%202%20Genres%20Wesite%20Images/IMG_1856.JPG?token=eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1cmwiOiJpbWFnZXMvRGVhdGggMiBHZW5yZXMgV2VzaXRlIEltYWdlcy9JTUdfMTg1Ni5KUEciLCJpYXQiOjE3NDczMjk4NDgsImV4cCI6MTc3ODg2NTg0OH0.CGG8xqRIykF5M1iJ6DPsy4cgZ_hJq7IJBIZwFC-v-M4',
    'The Harlotts'
  )
ON CONFLICT DO NOTHING;