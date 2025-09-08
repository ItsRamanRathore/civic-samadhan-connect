-- Fix infinite recursion in admin_users policies by dropping and recreating them
DROP POLICY IF EXISTS "Only admins can view admin users" ON public.admin_users;

-- Create a simple policy that doesn't cause recursion
-- Master admin can see all admin users, other admins can only see themselves
CREATE POLICY "Admin users access policy" 
ON public.admin_users 
FOR SELECT 
USING (
  -- Master admin (your email) can see all
  auth.email() = 'ramanrathore031204@gmail.com' OR
  -- Other users can only see their own record
  auth.uid() = user_id
);

-- Allow master admin to insert new admin users
CREATE POLICY "Master admin can insert admin users" 
ON public.admin_users 
FOR INSERT 
WITH CHECK (auth.email() = 'ramanrathore031204@gmail.com');

-- Allow master admin to update admin users
CREATE POLICY "Master admin can update admin users" 
ON public.admin_users 
FOR UPDATE 
USING (auth.email() = 'ramanrathore031204@gmail.com');

-- Allow master admin to delete admin users
CREATE POLICY "Master admin can delete admin users" 
ON public.admin_users 
FOR DELETE 
USING (auth.email() = 'ramanrathore031204@gmail.com');

-- Create master admin role enum
CREATE TYPE IF NOT EXISTS admin_role AS ENUM ('master_admin', 'admin', 'moderator');

-- Update admin_users table to use the enum and add approved status
ALTER TABLE public.admin_users 
ALTER COLUMN role TYPE admin_role USING role::admin_role;

ALTER TABLE public.admin_users 
ADD COLUMN IF NOT EXISTS approved BOOLEAN DEFAULT false,
ADD COLUMN IF NOT EXISTS approved_by UUID,
ADD COLUMN IF NOT EXISTS approved_at TIMESTAMP WITH TIME ZONE;

-- Create your master admin account (will be created when you sign up)
-- This will be handled by the application after you create your account