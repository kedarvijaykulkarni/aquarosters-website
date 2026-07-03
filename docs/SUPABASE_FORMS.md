# Supabase forms (Contact + Design Partner Program)

The AquaRosters site is a static export with no server runtime. The Contact
form and Design Partner Program form insert directly into Supabase from the
browser, using the anon/publishable key and insert-only Row Level Security
(RLS) policies. There is no Next.js API route involved.

## Required environment variables

Set these in `.env.local` (never committed — see `.gitignore`):

```
NEXT_PUBLIC_SUPABASE_URL=https://kocqprhhqrrfirwpxbtn.supabase.co
NEXT_PUBLIC_SUPABASE_ANON_KEY=<the project's publishable/anon key>
```

`.env.example` documents these two variables with a placeholder value. The
app throws a clear startup error (`lib/supabase/client.ts`) if either is
missing.

## Supabase CLI commands

```bash
supabase login
supabase init
supabase link --project-ref kocqprhhqrrfirwpxbtn
```

## Applying migrations

The schema lives in `supabase/migrations/0001_contact_and_design_partner_forms.sql`.
After linking the project:

```bash
supabase db push
```

This creates `contact_submissions` and `design_partner_applications`, enables
RLS on both, and adds the insert-only policies for the `anon` role. You can
also paste the file's contents into the Supabase dashboard's SQL editor and
run it there if you prefer not to use the CLI.

## Verifying RLS policies

In the Supabase dashboard: **Authentication > Policies** (or **Table Editor**
> table > RLS), confirm for both tables:

- RLS is **enabled**.
- Exactly one policy exists, for `INSERT`, targeting the `anon` role, with
  `WITH CHECK (true)`.
- There is **no** `SELECT`, `UPDATE`, or `DELETE` policy for `anon`. With RLS
  on and no matching policy, those operations are denied by default — this is
  intentional, not an oversight. Public visitors should be able to create a
  lead but never read, edit, or delete submissions (their own or anyone
  else's).

To read submitted rows, use the Supabase dashboard's Table Editor (which runs
as a privileged role) or the SQL editor — never the anon key from the
browser.

**Expect a `rls_policy_always_true` security advisor warning on both tables.**
Supabase's linter flags `WITH CHECK (true)` on an `INSERT` policy as
"overly permissive" by default, since that pattern usually indicates a
missed ownership check (e.g. `user_id = auth.uid()`). Here it's intentional:
these are anonymous public lead-capture forms with no visitor identity to
key a check against, so `true` is the correct check — the column-level
`CHECK` constraints (email format, length bounds, status enum) are what
actually validate the data. Do not "fix" this by adding an `auth.uid()`
check; that would break the forms.

## Testing the Contact form

1. `npm run dev`, open `http://localhost:3000/contact`.
2. Submit with a valid name, email, and message (10+ characters) — expect
   "Thanks — your message has been sent. We'll get back to you shortly." and
   an empty form afterward.
3. Leave name/email/message blank, or enter an invalid email — expect a
   validation message and no request sent.
4. In the Supabase dashboard's Table Editor, confirm a new row appears in
   `contact_submissions` with the submitted data, plus `source_page` (e.g.
   `/contact/`) and `user_agent` populated automatically.
5. To confirm failure handling, temporarily set an invalid
   `NEXT_PUBLIC_SUPABASE_ANON_KEY` and resubmit — expect "Sorry, we could not
   send your message. Please try again." with the form fields still filled
   in.

## Testing the Design Partner form

Same flow at `http://localhost:3000/design-partners`:

1. Submit with valid name, business name, email, and a problem description
   (10+ characters) — expect "Thanks — your design partner application has
   been received." and an empty form afterward.
2. Omit a required field or use an invalid email — expect a validation
   message, no request sent.
3. Confirm the row lands in `design_partner_applications` in the Supabase
   dashboard.
4. On a forced failure (bad key), expect "Sorry, we could not submit your
   application. Please try again." with the form fields still filled in.

Both forms also include a hidden honeypot field (`company_website_confirm`).
It's visually and accessibly hidden (off-screen, `aria-hidden`,
`tabIndex={-1}`) from real visitors. If a bot fills it in, the form reports
success without sending anything to Supabase — this avoids revealing that
spam detection exists.

## Security notes

- **Never commit `.env.local`** — it's covered by `.gitignore` (`.env*.local`).
- **Never put the database password or the direct `postgresql://...`
  connection string in frontend code, `.env.local`, or any committed file.**
  The browser client only ever needs the project URL and the anon/publishable
  key.
- **Never expose the service role key** to the browser. If you later need
  server-side privileged access (e.g. to build an admin view of
  submissions), use a proper backend or Supabase Edge Function — that breaks
  this site's current static-export model and is out of scope for the public
  marketing site.
- Anonymous users can **insert only** — they cannot read, update, or delete
  rows in either table, by design.
- Before a production launch, consider adding CAPTCHA (e.g. Cloudflare
  Turnstile or hCaptcha) and/or rate-limiting (e.g. via a Supabase Edge
  Function in front of inserts) on top of the honeypot, which stops naive
  bots but not a targeted attacker.
