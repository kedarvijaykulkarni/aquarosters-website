// AquaRosters public form intake — Supabase Edge Function.
//
// Frontend (Contact + Design Partner forms) -> this function -> Cloudflare
// Turnstile siteverify -> insert into Postgres using the service role key.
// The anon key can no longer insert into contact_submissions or
// design_partner_applications directly (see
// supabase/migrations/0002_lock_form_tables_after_turnstile.sql) — this
// function is the only insert path left.
//
// Deploy with: supabase functions deploy submit-public-form --no-verify-jwt
// Secrets required: SUPABASE_URL, SUPABASE_SERVICE_ROLE_KEY (set
// automatically by Supabase), TURNSTILE_SECRET_KEY, ALLOWED_ORIGINS (set
// manually — see docs/SUPABASE_FORMS.md).

import { createClient } from "npm:@supabase/supabase-js@2";
import {
  isHoneypotFilled,
  parseRequestBody,
  validateContactPayload,
  validateDesignPartnerPayload,
} from "./validation.ts";
import { buildCorsHeaders, parseAllowedOrigins, resolveAllowedOrigin } from "./cors.ts";

const TURNSTILE_VERIFY_URL = "https://challenges.cloudflare.com/turnstile/v0/siteverify";

const SUPABASE_URL = Deno.env.get("SUPABASE_URL") ?? "";
const SERVICE_ROLE_KEY = Deno.env.get("SUPABASE_SERVICE_ROLE_KEY") ?? "";
const TURNSTILE_SECRET_KEY = Deno.env.get("TURNSTILE_SECRET_KEY") ?? "";
const ALLOWED_ORIGINS = parseAllowedOrigins(Deno.env.get("ALLOWED_ORIGINS"));

const supabaseAdmin = createClient(SUPABASE_URL, SERVICE_ROLE_KEY, {
  auth: { persistSession: false },
});

function jsonResponse(status: number, body: Record<string, unknown>, corsHeaders: Record<string, string>): Response {
  return new Response(JSON.stringify(body), {
    status,
    headers: { ...corsHeaders, "Content-Type": "application/json" },
  });
}

function getClientIp(req: Request): string | undefined {
  const cfIp = req.headers.get("CF-Connecting-IP");
  if (cfIp) return cfIp;
  const forwardedFor = req.headers.get("X-Forwarded-For");
  return forwardedFor?.split(",")[0]?.trim() || undefined;
}

async function verifyTurnstile(token: string, remoteIp: string | undefined): Promise<boolean> {
  const form = new URLSearchParams();
  form.set("secret", TURNSTILE_SECRET_KEY);
  form.set("response", token);
  if (remoteIp) form.set("remoteip", remoteIp);

  try {
    const res = await fetch(TURNSTILE_VERIFY_URL, { method: "POST", body: form });
    const data = await res.json();
    return data?.success === true;
  } catch (error) {
    console.error("[submit-public-form] Turnstile siteverify request failed:", error);
    return false;
  }
}

const TABLE_BY_FORM_TYPE = {
  contact: "contact_submissions",
  design_partner: "design_partner_applications",
} as const;

const SOURCE_PAGE_BY_FORM_TYPE = {
  contact: "/contact/",
  design_partner: "/design-partners/",
} as const;

Deno.serve(async (req: Request) => {
  const origin = req.headers.get("Origin");
  const allowedOrigin = resolveAllowedOrigin(origin, ALLOWED_ORIGINS);
  const corsHeaders = buildCorsHeaders(allowedOrigin);

  if (req.method === "OPTIONS") {
    return new Response(null, { status: 204, headers: corsHeaders });
  }

  if (req.method !== "POST") {
    return jsonResponse(405, { ok: false, message: "Method not allowed." }, corsHeaders);
  }

  let rawBody: unknown;
  try {
    rawBody = await req.json();
  } catch {
    return jsonResponse(400, { ok: false, message: "Invalid request body." }, corsHeaders);
  }

  const parsed = parseRequestBody(rawBody);
  if (!parsed.ok) {
    return jsonResponse(400, { ok: false, message: parsed.error }, corsHeaders);
  }

  const { formType, turnstileToken, payload } = parsed.value;
  const rawPayload = payload as Record<string, unknown>;

  // Honeypot: pretend success without touching Supabase or Turnstile, and
  // without revealing that spam detection exists.
  if (isHoneypotFilled(rawPayload.company_website_confirm)) {
    return jsonResponse(200, { ok: true }, corsHeaders);
  }

  const validationError =
    formType === "contact" ? validateContactPayload(payload) : validateDesignPartnerPayload(payload);
  if (validationError) {
    return jsonResponse(400, { ok: false, message: validationError }, corsHeaders);
  }

  const verified = await verifyTurnstile(turnstileToken, getClientIp(req));
  if (!verified) {
    return jsonResponse(400, { ok: false, message: "Verification failed. Please try again." }, corsHeaders);
  }

  const { company_website_confirm: _honeypot, ...columns } = rawPayload;

  const { error } = await supabaseAdmin.from(TABLE_BY_FORM_TYPE[formType]).insert({
    ...columns,
    source_page: SOURCE_PAGE_BY_FORM_TYPE[formType],
    user_agent: req.headers.get("User-Agent") ?? null,
  });

  if (error) {
    console.error(`[submit-public-form] insert into ${TABLE_BY_FORM_TYPE[formType]} failed:`, error.message);
    return jsonResponse(500, { ok: false, message: "Sorry, something went wrong. Please try again." }, corsHeaders);
  }

  return jsonResponse(200, { ok: true }, corsHeaders);
});
