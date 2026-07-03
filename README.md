# AquaRosters Website

Static, SEO-friendly marketing website for **AquaRosters** — the live operations agenda for dive centers and watersports schools.

## What is included

- Next.js 14 App Router
- Static export support via `output: 'export'`
- SEO metadata, Open Graph image, JSON-LD, sitemap and robots
- Homepage, detailed feature pages, solution pages, pricing, comparison, design partner, about, contact, legal and blog pages
- Generated SVG product illustrations and PNG Open Graph image
- GitHub Actions workflow for build validation

## Local setup

```bash
npm install
npm run dev
```

Open `http://localhost:3000`.

## Static build

```bash
npm run build
```

The static export is generated in `out/`.

## Supabase Forms Setup

The Contact and Design Partner Program forms are protected by Cloudflare
Turnstile and submit through a Supabase Edge Function (`submit-public-form`)
rather than inserting into the database directly (no Next.js API route
needed — the site stays a pure static export). To run them locally:

1. Create `.env.local` (gitignored) with:
   ```
   NEXT_PUBLIC_SUPABASE_URL=https://kocqprhhqrrfirwpxbtn.supabase.co
   NEXT_PUBLIC_SUPABASE_ANON_KEY=<the project's publishable/anon key>
   NEXT_PUBLIC_TURNSTILE_SITE_KEY=<a Cloudflare Turnstile site key>
   ```
2. Apply the migrations in `supabase/migrations/` (via `supabase db push` or
   the Supabase SQL editor) to create the tables and lock down direct anon
   inserts.
3. Set the Edge Function secrets and deploy it:
   ```bash
   supabase secrets set TURNSTILE_SECRET_KEY=your_turnstile_secret_key
   supabase secrets set ALLOWED_ORIGINS=http://localhost:3000,https://your-production-domain.com
   supabase functions deploy submit-public-form --no-verify-jwt
   ```
4. Run `npm run dev` and submit either form.

Unit tests for the form validation/request logic: `npm test`.

Full setup, RLS verification, and manual test steps: see
[`docs/SUPABASE_FORMS.md`](docs/SUPABASE_FORMS.md) and
[`docs/TESTING.md`](docs/TESTING.md).

## Suggested repository name

`aquarosters-website`

## Push to GitHub

```bash
git init
git add .
git commit -m "Initial AquaRosters static website"
git branch -M main
git remote add origin git@github.com:<your-user-or-org>/aquarosters-website.git
git push -u origin main
```

## Brand naming

Use **AquaRosters** everywhere. Do not use the old singular product/domain name in new marketing assets.
