/*
  # Add section field to playlists table

  1. Changes
    - Add `section` column to `playlists` table
    - Set default value to 'local_frequencies'
    - Allow null values for backward compatibility

  2. Security
    - No changes to existing RLS policies needed
*/

DO $$
BEGIN
  IF NOT EXISTS (
    SELECT 1 FROM information_schema.columns
    WHERE table_name = 'playlists' AND column_name = 'section'
  ) THEN
    ALTER TABLE playlists ADD COLUMN section text DEFAULT 'local_frequencies';
  END IF;
END $$;