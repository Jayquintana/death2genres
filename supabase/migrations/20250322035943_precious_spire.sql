/*
  # Fix authentication session handling

  1. Changes
    - Drop existing admin user to ensure clean state
    - Create admin user with proper session handling
    - Set up required auth fields correctly
*/

-- Drop existing admin user if exists
DO $$
BEGIN
  DELETE FROM auth.users WHERE email = 'admin@death2genres.com';
END $$;

-- Create admin user with proper session handling
DO $$
DECLARE
  new_user_id uuid := gen_random_uuid();
BEGIN
  -- Insert into auth.users with all required fields
  INSERT INTO auth.users (
    id,
    instance_id,
    aud,
    role,
    email,
    encrypted_password,
    email_confirmed_at,
    last_sign_in_at,
    raw_app_meta_data,
    raw_user_meta_data,
    is_super_admin,
    created_at,
    updated_at,
    phone,
    phone_confirmed_at,
    confirmation_token,
    recovery_token,
    email_change_token_current,
    email_change_token_new,
    email_change,
    email_change_confirm_status,
    banned_until,
    reauthentication_token,
    is_sso_user,
    deleted_at
  )
  VALUES (
    new_user_id,
    '00000000-0000-0000-0000-000000000000',
    'authenticated',
    'authenticated',
    'admin@death2genres.com',
    crypt('D2G_Admin_2025!', gen_salt('bf')),
    now(),
    now(),
    '{"provider":"email","providers":["email"]}',
    '{"role":"admin"}',
    false,
    now(),
    now(),
    null,
    null,
    '',
    '',
    '',
    '',
    '',
    0,
    null,
    '',
    false,
    null
  );

  -- Insert into auth.identities with correct provider_id
  INSERT INTO auth.identities (
    id,
    user_id,
    identity_data,
    provider,
    provider_id,
    last_sign_in_at,
    created_at,
    updated_at
  )
  VALUES (
    new_user_id,
    new_user_id,
    jsonb_build_object(
      'sub', new_user_id::text,
      'email', 'admin@death2genres.com'
    ),
    'email',
    'admin@death2genres.com',
    now(),
    now(),
    now()
  );

END $$;