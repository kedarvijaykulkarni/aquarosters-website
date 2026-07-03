# Testing

## Unit tests

Pure validation, CORS, and request-building logic for the Turnstile-protected
forms has unit test coverage, run with Node's built-in test runner (no extra
dependency):

```bash
npm test
```

This covers:

- `supabase/functions/submit-public-form/validation.ts` — payload shape and
  field-length/format validation, honeypot detection.
- `supabase/functions/submit-public-form/cors.ts` — allowed-origin parsing
  and resolution.
- `lib/forms/submit-public-form.ts` — the Edge Function request builder and
  response parser.

There is no browser-level (component/E2E) test suite configured for this
project; the checklist below is manual.

## Turnstile Form Security Testing

### Contact Form

- [ ] Turnstile widget renders on `/contact`
- [ ] Submit is disabled until required fields and Turnstile token are present
- [ ] Valid submission creates row in `contact_submissions`
- [ ] Success message appears
- [ ] Form clears after success
- [ ] Failed submission keeps entered data
- [ ] Expired Turnstile token blocks submit
- [ ] Honeypot field returns fake success and does not insert

### Design Partner Form

- [ ] Turnstile widget renders on `/design-partners`
- [ ] Submit is disabled until required fields and Turnstile token are present
- [ ] Valid submission creates row in `design_partner_applications`
- [ ] Success message appears
- [ ] Form clears after success
- [ ] Failed submission keeps entered data
- [ ] Expired Turnstile token blocks submit
- [ ] Honeypot field returns fake success and does not insert

### Supabase Security

- [ ] Anonymous direct insert into `contact_submissions` fails
- [ ] Anonymous direct insert into `design_partner_applications` fails
- [ ] Anonymous SELECT from both tables fails
- [ ] Edge Function can insert after valid Turnstile token
- [ ] No public SELECT policies exist
- [ ] No public INSERT policies exist
- [ ] Service role key is not present in frontend code
- [ ] Turnstile secret key is not present in frontend code
