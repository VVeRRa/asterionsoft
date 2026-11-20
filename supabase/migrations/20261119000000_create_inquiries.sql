-- Inquiries from the asterionsoft.cz website.
-- Only the server API route writes to it, using the service-role (secret) key.
-- RLS is enabled with no policies, so the public anon key has no access.

create extension if not exists pgcrypto;

create table if not exists public.inquiries (
  id uuid primary key default gen_random_uuid(),
  created_at timestamptz not null default now(),

  -- what the customer filled in
  locale text not null default 'cs' check (locale in ('cs', 'en', 'de')),
  name text not null check (char_length(name) <= 120),
  email text not null check (char_length(email) <= 200),
  company text check (char_length(company) <= 160),
  phone text check (char_length(phone) <= 40),
  service text check (char_length(service) <= 120),
  message text not null check (char_length(message) <= 5000),

  -- automatic classification (Claude, or rules as a fallback)
  service_category text check (service_category in (
    'ai_audit', 'process_automation', 'ai_assistant', 'web_app',
    'excel_to_app', 'java_consulting', 'training', 'other'
  )),
  urgency text check (urgency in ('low', 'normal', 'high')),
  summary text,
  is_spam boolean not null default false,
  classified_by text check (classified_by in ('ai', 'rules')),
  classification jsonb,

  -- processing
  status text not null default 'new' check (status in ('new', 'contacted', 'proposal', 'won', 'lost', 'spam')),
  notified_at timestamptz,
  auto_replied_at timestamptz,

  -- abuse protection (IP hash, not the IP itself)
  ip_hash text,
  user_agent text
);

create index if not exists inquiries_created_at_idx on public.inquiries (created_at desc);
create index if not exists inquiries_ip_hash_created_at_idx on public.inquiries (ip_hash, created_at desc);
create index if not exists inquiries_status_idx on public.inquiries (status);

alter table public.inquiries enable row level security;

revoke all on table public.inquiries from anon, authenticated;
