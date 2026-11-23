-- Retention periods promised in the privacy policy (app/legal/privacy.ts), enforced by a daily job:
--   * spam: deleted 30 days after it arrived,
--   * IP hash and user agent: cleared after 30 days on every inquiry,
--   * inquiries without a project (new, contacted, proposal, lost): deleted 12 months after the last contact,
--   * won inquiries: deleted 4 years after the engagement ended.
--
-- Deployment order (see README, "Data retention"):
--   1. run this migration (columns, backfill, function; nothing is scheduled yet),
--   2. fix last_contact_at by hand where the conversation went on by e-mail, fill engagement_ended_at for
--      finished projects,
--   3. check what would be deleted with the preview query below,
--   4. only then schedule the job (commented-out lines at the end).

-- When the team last actually talked to the customer (reply, call). Status changes do not touch it,
-- the team updates it after every reply or call, so the 12 months run from real contact.
alter table public.inquiries add column if not exists last_contact_at timestamptz;
-- End of the cooperation for won inquiries; the 4 years run from here. Empty while the project is ongoing.
alter table public.inquiries add column if not exists engagement_ended_at timestamptz;

-- Existing rows get a date from their history, not the day of the migration.
update public.inquiries
set last_contact_at = coalesce(auto_replied_at, notified_at, created_at)
where last_contact_at is null;

alter table public.inquiries alter column last_contact_at set default now();
alter table public.inquiries alter column last_contact_at set not null;

-- Deletes everything past its retention period and returns how many rows each rule touched.
-- If a new status is added to the inquiries_status_check constraint, decide its retention here too,
-- otherwise rows with that status are never deleted.
create or replace function public.purge_inquiries()
returns jsonb
language plpgsql
set search_path = public
as $$
declare
  spam_deleted integer;
  meta_cleared integer;
  open_deleted integer;
  won_deleted integer;
begin
  delete from public.inquiries
  where status = 'spam' and created_at < now() - interval '30 days';
  get diagnostics spam_deleted = row_count;

  update public.inquiries
  set ip_hash = null, user_agent = null
  where created_at < now() - interval '30 days' and (ip_hash is not null or user_agent is not null);
  get diagnostics meta_cleared = row_count;

  delete from public.inquiries
  where status in ('new', 'contacted', 'proposal', 'lost') and last_contact_at < now() - interval '12 months';
  get diagnostics open_deleted = row_count;

  delete from public.inquiries
  where status = 'won' and engagement_ended_at < now() - interval '4 years';
  get diagnostics won_deleted = row_count;

  return jsonb_build_object(
    'spam_deleted', spam_deleted,
    'meta_cleared', meta_cleared,
    'open_deleted', open_deleted,
    'won_deleted', won_deleted
  );
end;
$$;

-- Functions are executable by everyone by default and Supabase exposes public functions over the API.
revoke execute on function public.purge_inquiries() from public, anon, authenticated;

-- Preview (step 3), run in the SQL editor before scheduling:
--
-- select id, created_at, status, last_contact_at, engagement_ended_at, name, email
-- from public.inquiries
-- where (status = 'spam' and created_at < now() - interval '30 days')
--    or (status in ('new', 'contacted', 'proposal', 'lost') and last_contact_at < now() - interval '12 months')
--    or (status = 'won' and engagement_ended_at < now() - interval '4 years')
-- order by created_at;

-- Step 4, after the review: enable pg_cron (Database → Extensions, or the line below) and schedule the
-- job daily at 03:15 UTC.
--
-- create extension if not exists pg_cron;
-- select cron.schedule('purge-inquiries', '15 3 * * *', $$select public.purge_inquiries()$$);
