-- AquaRosters marketing site: Contact form and Design Partner Program form storage.
-- Both tables are written to exclusively by the public website via the Supabase
-- anon/publishable key. There is no authenticated app user for this site, so
-- RLS is intentionally insert-only for anonymous requests (see policies below).

create table if not exists public.contact_submissions (
  id uuid primary key default gen_random_uuid(),
  created_at timestamptz not null default now(),
  name text not null,
  business_name text,
  email text not null,
  website text,
  country text,
  business_type text,
  message text not null,
  source_page text,
  user_agent text,
  status text not null default 'new',
  constraint contact_submissions_email_format check (email like '%@%'),
  constraint contact_submissions_name_length check (char_length(name) between 2 and 120),
  constraint contact_submissions_message_length check (char_length(message) between 10 and 5000),
  constraint contact_submissions_status_allowed check (status in ('new', 'reviewed', 'archived'))
);

create table if not exists public.design_partner_applications (
  id uuid primary key default gen_random_uuid(),
  created_at timestamptz not null default now(),
  name text not null,
  business_name text not null,
  email text not null,
  country text,
  business_type text,
  number_of_staff text,
  current_tools_used text,
  biggest_operational_problem text not null,
  source_page text,
  user_agent text,
  status text not null default 'new',
  constraint design_partner_applications_email_format check (email like '%@%'),
  constraint design_partner_applications_name_length check (char_length(name) between 2 and 120),
  constraint design_partner_applications_business_name_length check (char_length(business_name) between 2 and 160),
  constraint design_partner_applications_problem_length check (char_length(biggest_operational_problem) between 10 and 5000),
  constraint design_partner_applications_status_allowed check (status in ('new', 'reviewed', 'archived'))
);

alter table public.contact_submissions enable row level security;
alter table public.design_partner_applications enable row level security;

-- Intentionally insert-only for anonymous/public access: this is a public
-- marketing site with no logged-in visitor role. The anon key must be able to
-- create a lead record but must never be able to read, update, or delete
-- other visitors' submissions. Only privileged access (service role, or an
-- authenticated staff role added later) should read this data — do that from
-- the Supabase dashboard, SQL editor, or a trusted backend, never from the
-- browser client.
create policy "Allow public insert into contact_submissions"
  on public.contact_submissions
  for insert
  to anon
  with check (true);

create policy "Allow public insert into design_partner_applications"
  on public.design_partner_applications
  for insert
  to anon
  with check (true);

-- No select/update/delete policies are created for the anon role on purpose:
-- with RLS enabled and no matching policy, those operations are denied by
-- default. Do not add a public "select" policy to these tables.
