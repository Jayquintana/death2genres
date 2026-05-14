/*
  # Create initial admin user

  1. Changes
    - Create initial admin user with email/password authentication
    - Set up admin role and permissions
    
  Note: The password will need to be changed on first login
*/

-- Create admin user
DO $$
DECLARE
  new_user_id uuid;
  existing_user uuid;
BEGIN
  -- Check if user already exists
  SELECT id INTO existing_user
  FROM auth.users
  WHERE email = 'admin@death2genres.com';

  IF existing_user IS NULL THEN
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
      recovery_token
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
      ''
    );

    -- Insert into auth.identities
    INSERT INTO auth.identities (
      id,
      user_id,
      identity_data,
      provider,
      provider_id,
      created_at,
      updated_at,
      last_sign_in_at
    )
    VALUES (
      new_user_id,
      new_user_id,
      jsonb_build_object('sub', new_user_id::text, 'email', 'admin@death2genres.com'),
      'email',
      'admin@death2genres.com',
      now(),
      now(),
      now()
    );
  END IF;
END $$;