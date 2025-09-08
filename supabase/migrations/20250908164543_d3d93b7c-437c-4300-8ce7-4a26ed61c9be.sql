-- Fix function search path security warnings
CREATE OR REPLACE FUNCTION public.is_master_admin()
RETURNS BOOLEAN AS $$
  SELECT auth.email() = 'ramanrathore031204@gmail.com';
$$ LANGUAGE SQL SECURITY DEFINER STABLE SET search_path = public;

CREATE OR REPLACE FUNCTION public.handle_new_user()
RETURNS trigger AS $$
begin
  insert into public.profiles (id, full_name, email)
  values (
    new.id,
    coalesce(new.raw_user_meta_data ->> 'full_name', 'User'),
    new.email
  )
  on conflict (id) do nothing;
  
  return new;
end;
$$ LANGUAGE plpgsql SECURITY DEFINER SET search_path = public;