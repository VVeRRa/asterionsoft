-- Newer Supabase projects no longer grant table privileges to the API roles
-- automatically, so the server (service_role / secret key) could be denied
-- with "permission denied for table inquiries" (42501) even though the table exists.
-- anon and authenticated stay without access; RLS stays on.
grant usage on schema public to service_role;
grant select, insert, update on table public.inquiries to service_role;
