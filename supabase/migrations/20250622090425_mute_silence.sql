/*
  # Fix profiles table INSERT policy

  1. Security Policy Update
    - Drop the existing INSERT policy that uses incorrect `uid()` function
    - Create new INSERT policy using correct `auth.uid()` function
    - This allows authenticated users to insert their own profile data during signup

  2. Changes
    - Replace `uid()` with `auth.uid()` in the INSERT policy check expression
    - Ensures proper authentication context for profile creation
*/

-- Drop the existing INSERT policy
DROP POLICY IF EXISTS "Users can insert their own profile" ON profiles;

-- Create the corrected INSERT policy using auth.uid()
CREATE POLICY "Users can insert their own profile"
  ON profiles
  FOR INSERT
  TO authenticated
  WITH CHECK (auth.uid() = id);