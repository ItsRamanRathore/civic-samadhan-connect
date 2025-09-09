-- Insert admin user record for ramanrathore031204@gmail.com
-- First, we need to get the user_id from auth.users table
INSERT INTO public.admin_users (user_id, role, department, approved, approved_by, approved_at)
SELECT 
  id as user_id,
  'master_admin' as role,
  'all' as department,
  true as approved,
  id as approved_by,
  now() as approved_at
FROM auth.users 
WHERE email = 'ramanrathore031204@gmail.com'
ON CONFLICT (user_id, role) DO UPDATE SET
  approved = true,
  approved_at = now();