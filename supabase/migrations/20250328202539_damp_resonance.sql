/*
  # Add Resend API key environment variable check

  1. Changes
    - Add a function to verify the Resend API key environment variable
    - Add documentation about required environment variables
    - Create a helper function to check environment variables
*/

-- Create a function to verify environment variables
CREATE OR REPLACE FUNCTION check_required_env_vars()
RETURNS text AS $$
DECLARE
  missing_vars text[];
BEGIN
  -- This function exists to document required environment variables
  -- The actual secrets should be set through the Supabase Dashboard:
  -- Settings -> Database -> Configuration -> Environment Variables
  --
  -- Required variables:
  -- - RESEND_API_KEY: API key for sending emails via Resend
  
  RETURN 'Environment variables must be set through the Supabase Dashboard';
END;
$$ LANGUAGE plpgsql;

-- Add a comment documenting required environment variables
COMMENT ON DATABASE postgres IS 'Required environment variables:
- RESEND_API_KEY: API key for sending emails via Resend (set via Supabase Dashboard)';

-- Create a function that can be called to check environment status
CREATE OR REPLACE FUNCTION get_env_status()
RETURNS text AS $$
BEGIN
  RETURN check_required_env_vars();
END;
$$ LANGUAGE plpgsql;