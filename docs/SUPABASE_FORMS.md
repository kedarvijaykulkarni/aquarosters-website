# Supabase forms (Contact + Design Partner Program)

The AquaRosters site is a static export with no server runtime. The Contact
form and Design Partner Program form no longer insert into Supabase directly
from the browser. Instead:

```
Frontend form
  -> Cloudflare Turnstile widget produces a token
  -> Frontend POSTs { formType, turnstileToken, payload } to the Supabase
     Edge Function "submit-public-form"
  -> Edge Function verifies the token with Cloudflare's siteverify API
  -> Edge Function validates the payload (length/format checks, honeypot)
  -> Edge Function inserts into Postgres using the service role key
  -> Frontend shows a success or failure message
```

The anon/publishable key can no longer insert into `contact_submissions` or
`design_partner_applications` — see
`supabase/migrations/0002_lock_form_tables_after_turnstile.sql`. The Edge
Function is the only insert path left, and it never runs until Turnstile has
verified the request server-side. A frontend-only CAPTCHA check would not be
sufficient — a bot could just skip calling Turnstile and POST straight to the
old insert path, which is exactly what this migration closes off.

## Required environment variables

Set these in `.env.local` (never committed — see `.gitignore`):

```
NEXT_PUBLIC_SUPABASE_URL=https://kocqprhhqrrfirwpxbtn.supabase.co
NEXT_PUBLIC_SUPABASE_ANON_KEY=<the project's publishable/anon key>
NEXT_PUBLIC_TURNSTILE_SITE_KEY=<the Cloudflare Turnstile site key>
```

`.env.example` documents these with placeholder values, plus commented-out
reference lines for `TURNSTILE_SECRET_KEY` and `ALLOWED_ORIGINS` — those two
are **Edge Function secrets**, not frontend env vars. Never uncomment them
into a real `.env.local` value; they're listed there purely so you know they
exist and where they're actually configured (see below).

The app throws a clear startup error (`lib/supabase/*` no longer exists;
`lib/forms/submit-public-form.ts` returns a generic failure result instead
of crashing) if `NEXT_PUBLIC_SUPABASE_URL` or `NEXT_PUBLIC_SUPABASE_ANON_KEY`
is missing. If `NEXT_PUBLIC_TURNSTILE_SITE_KEY` is missing, the Turnstile
widget renders a "not configured" notice in development and nothing in
production — with no token, the submit button stays disabled, so forms
fail closed rather than silently skipping verification.

## Cloudflare Turnstile setup

1. In the Cloudflare dashboard, create a Turnstile widget.
2. Add domains: `localhost` (for local development) and the production
   AquaRosters domain.
3. Copy the **site key** into `NEXT_PUBLIC_TURNSTILE_SITE_KEY` in
   `.env.local` (and in your production build environment).
4. Copy the **secret key** — this goes to the Edge Function only, never
   into any frontend env var or committed file:
   ```bash
   supabase secrets set TURNSTILE_SECRET_KEY=your_turnstile_secret_key
   supabase secrets set ALLOWED_ORIGINS=http://localhost:3000,https://your-production-domain.com
   ```
   Replace `https://your-production-domain.com` with the real AquaRosters
   domain once it's known.

## Supabase CLI commands

```bash
supabase login
supabase init
supabase link --project-ref kocqprhhqrrfirwpxbtn
```

## Applying migrations

Schema lives in `supabase/migrations/`:

- `0001_contact_and_design_partner_forms.sql` — creates
  `contact_submissions` and `design_partner_applications`, enables RLS, and
  (originally) added insert-only anon policies.
- `0002_lock_form_tables_after_turnstile.sql` — drops those anon insert
  policies. After this runs, **no anon policy of any kind exists on either
  table** — insert, select, update, and delete are all denied for the anon
  role. The Edge Function bypasses RLS entirely because it uses the service
  role key.

```bash
supabase db push
```

**Ordering matters in production:** don't run `0002` until the Edge
Function is deployed, its secrets are set, and the frontend that calls it is
live. Running `0002` first (with the old frontend still calling `.insert()`
directly) breaks both public forms until the rest of the stack is deployed.

## Deploying the Edge Function

```bash
supabase functions deploy submit-public-form --no-verify-jwt
```

`--no-verify-jwt` is used because this is a public website form endpoint
with no logged-in user — the function performs its own verification
(Turnstile + payload validation) instead of relying on a Supabase Auth JWT.

## Verifying RLS policies

In the Supabase dashboard: **Authentication > Policies** (or **Table Editor**
> table > RLS), confirm for both tables, after migration `0002`:

- RLS is **enabled**.
- **No policies exist** for the `anon` role (select, insert, update, delete
  are all denied by default with RLS on and no matching policy).

To read submitted rows, use the Supabase dashboard's Table Editor (which runs
as a privileged role) or the SQL editor — never the anon key from the
browser, and the Edge Function never returns row data to the client either.

## Testing the Contact form

1. `npm run dev`, open `http://localhost:3000/contact`.
2. Complete the Turnstile widget, then submit with a valid name, email, and
   message (10+ characters) — expect "Thanks — your message has been sent.
   We'll get back to you shortly." and an empty form afterward.
3. Leave name/email/message blank, or enter an invalid email — expect a
   validation message and no request sent; the Submit button also stays
   disabled until the browser's own field validation passes.
4. Try submitting without completing Turnstile — the Submit button stays
   disabled until a token exists.
5. In the Supabase dashboard's Table Editor, confirm a new row appears in
   `contact_submissions` with the submitted data, plus `source_page` and
   `user_agent` populated by the Edge Function.
6. To confirm failure handling, temporarily break `NEXT_PUBLIC_SUPABASE_URL`
   (or stop the Edge Function) and resubmit — expect "Sorry, we could not
   send your message. Please try again." with the form fields still filled
   in and the Turnstile widget reset for a retry.

## Testing the Design Partner form

Same flow at `http://localhost:3000/design-partners`:

1. Complete Turnstile, then submit with valid name, business name, email,
   and a problem description (10+ characters) — expect "Thanks — your
   design partner application has been received." and an empty form
   afterward.
2. Omit a required field or use an invalid email — expect a validation
   message, no request sent, Submit button disabled.
3. Confirm the row lands in `design_partner_applications` in the Supabase
   dashboard.
4. On a forced failure, expect "Sorry, we could not submit your
   application. Please try again." with the form fields still filled in.

Both forms also include a hidden honeypot field (`company_website_confirm`).
It's visually and accessibly hidden (off-screen, `aria-hidden`,
`tabIndex={-1}`) from real visitors. If a bot fills it in, the Edge Function
returns `{ ok: true }` without verifying Turnstile or inserting anything —
this avoids revealing that spam detection exists.

## Security notes

- **Never commit `.env.local`** — it's covered by `.gitignore` (`.env*.local`).
- **Never put the database password or the direct `postgresql://...`
  connection string in frontend code, `.env.local`, or any committed file.**
- **Never expose the Supabase service role key or the Turnstile secret key**
  to the browser. Both live only in Supabase Edge Function secrets
  (`supabase secrets set ...`), never in `NEXT_PUBLIC_*` variables or
  frontend source.
- **Turnstile verification happens server-side, in the Edge Function.** The
  frontend widget alone proves nothing — a scripted attacker can call the
  Edge Function directly with a fake token, which is exactly what the
  siteverify call rejects. Never trust a client-reported "verified" state.
- Anonymous users can no longer read, insert, update, or delete rows in
  either table directly. The Edge Function (service role) is the only
  writer, and there is still no reader other than the Supabase dashboard/SQL
  editor.
- **Expect a `rls_policy_always_true` security advisor warning to disappear**
  after migration `0002` runs, since the permissive insert policies it
  previously flagged are gone.
