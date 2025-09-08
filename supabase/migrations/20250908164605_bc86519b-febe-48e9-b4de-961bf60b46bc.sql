-- Fix the remaining function search path warning
CREATE OR REPLACE FUNCTION public.update_updated_at_column()
RETURNS trigger AS $$
begin
  new.updated_at = now();
  return new;
end;
$$ LANGUAGE plpgsql SET search_path = public;