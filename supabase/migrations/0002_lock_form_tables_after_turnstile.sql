-- AquaRosters form security hardening after Cloudflare Turnstile integration.
--
-- Public website visitors should no longer insert directly into the form
-- tables. All submissions must go through the Supabase Edge Function:
--   submit-public-form
--
-- That function verifies Cloudflare Turnstile server-side and inserts using
-- the service role key. See docs/SUPABASE_FORMS.md.
--
-- No public SELECT, UPDATE, DELETE, or INSERT policies should exist on
-- either table after this migration runs.

alter table public.contact_submissions enable row level security;
alter table public.design_partner_applications enable row level security;

drop policy if exists "Allow public insert into contact_submissions"
  on public.contact_submissions;

drop policy if exists "Allow public insert into design_partner_applications"
  on public.design_partner_applications;

comment on table public.contact_submissions is
  'AquaRosters contact form submissions. Public direct inserts are disabled. Submissions must go through the submit-public-form Edge Function after Turnstile verification.';

comment on table public.design_partner_applications is
  'AquaRosters design partner applications. Public direct inserts are disabled. Submissions must go through the submit-public-form Edge Function after Turnstile verification.';
