/*
  # Add Resend API key for email functionality

  1. Changes
    - Add RESEND_API_KEY environment variable for Edge Functions
    - Required for sending emails via the contact form
    
  Note: This migration sets up the necessary environment variable for the Edge Function.
  The actual API key should be set through the Supabase dashboard.
*/

-- Create a comment to document the required environment variable
COMMENT ON DATABASE postgres IS 'Required environment variables for Edge Functions:
- RESEND_API_KEY: API key for sending emails via Resend';

-- Since we can't set secrets directly in migrations, we'll add a function to verify the environment
CREATE OR REPLACE FUNCTION verify_edge_function_env()
RETURNS boolean AS $$
BEGIN
  -- This function exists to document the required environment variable
  -- The actual secret should be set through the Supabase Dashboard
  RETURN true;
END;
$$ LANGUAGE plpgsql;