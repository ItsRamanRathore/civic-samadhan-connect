-- Fix infinite recursion in admin_users policies by dropping and recreating them
DROP POLICY IF EXISTS "Only admins can view admin users" ON public.admin_users;

-- Create a security definer function to check admin status without recursion
CREATE OR REPLACE FUNCTION public.is_master_admin()
RETURNS BOOLEAN AS $$
  SELECT auth.email() = 'ramanrathore031204@gmail.com';
$$ LANGUAGE SQL SECURITY DEFINER STABLE;

CREATE OR REPLACE FUNCTION public.get_user_admin_status()
RETURNS TABLE(is_admin BOOLEAN, role TEXT) AS $$
  SELECT 
    EXISTS(SELECT 1 FROM public.admin_users WHERE user_id = auth.uid() AND approved = true) as is_admin,
    COALESCE((SELECT au.role FROM public.admin_users au WHERE au.user_id = auth.uid() AND au.approved = true LIMIT 1), 'user') as role;
$$ LANGUAGE SQL SECURITY DEFINER STABLE;

-- Create new policies without recursion
CREATE POLICY "Admin users access policy" 
ON public.admin_users 
FOR SELECT 
USING (
  public.is_master_admin() OR auth.uid() = user_id
);

CREATE POLICY "Master admin can insert admin users" 
ON public.admin_users 
FOR INSERT 
WITH CHECK (public.is_master_admin());

CREATE POLICY "Master admin can update admin users" 
ON public.admin_users 
FOR UPDATE 
USING (public.is_master_admin());

CREATE POLICY "Master admin can delete admin users" 
ON public.admin_users 
FOR DELETE 
USING (public.is_master_admin());

-- Add approved status columns
ALTER TABLE public.admin_users 
ADD COLUMN IF NOT EXISTS approved BOOLEAN DEFAULT false,
ADD COLUMN IF NOT EXISTS approved_by UUID,
ADD COLUMN IF NOT EXISTS approved_at TIMESTAMP WITH TIME ZONE;

-- Update complaints policies to use approved admins only
DROP POLICY IF EXISTS "Admins can view all complaints" ON public.complaints;
DROP POLICY IF EXISTS "Admins can update all complaints" ON public.complaints;

CREATE POLICY "Approved admins can view complaints" 
ON public.complaints 
FOR SELECT 
USING (
  auth.uid() = user_id OR 
  public.is_master_admin() OR
  EXISTS(SELECT 1 FROM public.admin_users au WHERE au.user_id = auth.uid() AND au.approved = true)
);

CREATE POLICY "Approved admins can update complaints" 
ON public.complaints 
FOR UPDATE 
USING (
  public.is_master_admin() OR
  EXISTS(SELECT 1 FROM public.admin_users au WHERE au.user_id = auth.uid() AND au.approved = true)
);