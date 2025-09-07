-- Add department field to categories table
ALTER TABLE public.categories ADD COLUMN IF NOT EXISTS department TEXT DEFAULT 'general';

-- Create sample categories with departments
INSERT INTO public.categories (name, description, color, department) VALUES
('Road Infrastructure', 'Issues related to roads, potholes, street lighting', '#FF6B35', 'public_works'),
('Water Supply', 'Water leakage, shortage, quality issues', '#2196F3', 'water_department'),
('Waste Management', 'Garbage collection, waste disposal, sanitation', '#4CAF50', 'sanitation'),
('Public Safety', 'Crime, security, emergency response', '#F44336', 'police'),
('Traffic', 'Traffic signals, congestion, parking issues', '#FF9800', 'traffic'),
('Parks & Recreation', 'Parks maintenance, recreational facilities', '#8BC34A', 'parks'),
('Health & Medical', 'Public health, medical facilities, disease control', '#E91E63', 'health'),
('Education', 'Schools, educational facilities, student issues', '#9C27B0', 'education')
ON CONFLICT (name) DO NOTHING;

-- Create sample admin users for different departments
-- Note: These user IDs are placeholders and will need real user IDs after registration
INSERT INTO public.admin_users (user_id, role, granted_by) VALUES
-- We'll add real admin users after they register
('00000000-0000-0000-0000-000000000000', 'admin', NULL)
ON CONFLICT (user_id) DO NOTHING;

-- Add department field to admin_users table
ALTER TABLE public.admin_users ADD COLUMN IF NOT EXISTS department TEXT DEFAULT 'general';

-- Update admin_users table to include department
UPDATE public.admin_users SET department = 'general' WHERE department IS NULL;