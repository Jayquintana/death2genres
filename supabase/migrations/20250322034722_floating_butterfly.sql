/*
  # Fix admin user creation

  1. Changes
    - Drop existing admin user if exists
    - Create new admin user with proper authentication setup
    - Ensure all required fields and relationships are set
*/

-- Create admin user with proper setup
DO $$
DECLARE
  new_user_id uuid;
BEGIN
  -- Delete existing admin user if exists
  DELETE FROM auth.users WHERE email = 'admin@death2genres.com';
  
  -- Generate new UUID
  new_user_id := gen_random_uuid();

  -- Insert into auth.users
  INSERT INTO auth.users (
    instance_id,
    id,
    aud,
    role,
    email,
    encrypted_password,
    email_confirmed_at,
    raw_app_meta_data,
    raw_user_meta_data,
    created_at,
    updated_at,
    confirmation_token,
    email_change,
    email_change_token_new,
    recovery_token,
    is_super_admin,
    phone,
    phone_confirmed_at,
    phone_change,
    phone_change_token,
    email_change_token_current,
    email_change_confirm_status,
    banned_until,
    reauthentication_token,
    is_sso_user,
    deleted_at
  )
  VALUES (
    '00000000-0000-0000-0000-000000000000',
    new_user_id,
    'authenticated',
    'authenticated',
    'admin@death2genres.com',
    crypt('D2G_Admin_2025!', gen_salt('bf')),
    now(),
    '{"provider":"email","providers":["email"]}',
    '{"role":"admin"}',
    now(),
    now(),
    '',
    '',
    '',
    '',
    false,
    null,
    null,
    '',
    '',
    '',
    0,
    null,
    '',
    false,
    null
  );

  -- Delete existing identity if exists
  DELETE FROM auth.identities 
  WHERE provider = 'email' 
  AND provider_id = 'admin@death2genres.com';

  -- Insert into auth.identities
  INSERT INTO auth.identities (
    provider_id,
    user_id,
    identity_data,
    provider,
    last_sign_in_at,
    created_at,
    updated_at
  )
  VALUES (
    'admin@death2genres.com',
    new_user_id,
    jsonb_build_object(
      'sub', new_user_id::text,
      'email', 'admin@death2genres.com'
    ),
    'email',
    now(),
    now(),
    now()
  );

END $$;