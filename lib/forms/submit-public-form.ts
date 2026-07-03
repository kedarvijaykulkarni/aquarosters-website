// Frontend entry point for the Contact and Design Partner forms.
//
// The browser no longer inserts into Supabase directly (no anon INSERT
// policy remains — see supabase/migrations/0002_lock_form_tables_after_turnstile.sql).
// Instead it POSTs the form payload plus a Cloudflare Turnstile token to the
// submit-public-form Edge Function, which verifies the token server-side
// before inserting with the service role key. See docs/SUPABASE_FORMS.md.

export type FormSubmitResult = { ok: true } | { ok: false; message: string };

// Mirrors supabase/functions/submit-public-form/validation.ts's payload
// shapes. Kept as a separate, hand-written contract on purpose: this file
// runs in the browser bundle and must never import anything from the Deno
// function directory.
export type ContactFormPayload = {
  name: string;
  business_name?: string;
  email: string;
  website?: string;
  country?: string;
  business_type?: string;
  message: string;
  company_website_confirm?: string;
};

export type DesignPartnerFormPayload = {
  name: string;
  business_name: string;
  email: string;
  country?: string;
  business_type?: string;
  number_of_staff?: string;
  current_tools_used?: string;
  biggest_operational_problem: string;
  company_website_confirm?: string;
};

type FormType = "contact" | "design_partner";

const GENERIC_ERROR_MESSAGE = "Sorry, we could not process your request. Please try again.";

export function buildSubmitPublicFormRequest(args: {
  supabaseUrl: string;
  anonKey: string;
  formType: FormType;
  turnstileToken: string;
  payload: ContactFormPayload | DesignPartnerFormPayload;
}): { url: string; init: RequestInit } {
  const baseUrl = args.supabaseUrl.replace(/\/+$/, "");
  return {
    url: `${baseUrl}/functions/v1/submit-public-form`,
    init: {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        apikey: args.anonKey,
        Authorization: `Bearer ${args.anonKey}`,
      },
      body: JSON.stringify({
        formType: args.formType,
        turnstileToken: args.turnstileToken,
        payload: args.payload,
      }),
    },
  };
}

export function parseSubmitResponse(status: number, json: unknown): FormSubmitResult {
  const isSuccessStatus = status >= 200 && status < 300;
  if (typeof json === "object" && json !== null) {
    const body = json as Record<string, unknown>;
    if (isSuccessStatus && body.ok === true) {
      return { ok: true };
    }
    if (typeof body.message === "string" && body.message.length > 0) {
      return { ok: false, message: body.message };
    }
  }
  return { ok: false, message: GENERIC_ERROR_MESSAGE };
}

function logDevError(context: string, error: unknown) {
  if (process.env.NODE_ENV !== "production") {
    // eslint-disable-next-line no-console
    console.error(`[submit-public-form] ${context}`, error);
  }
}

async function callSubmitPublicForm(
  formType: FormType,
  payload: ContactFormPayload | DesignPartnerFormPayload,
  turnstileToken: string
): Promise<FormSubmitResult> {
  const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL;
  const anonKey = process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY;

  if (!supabaseUrl || !anonKey) {
    logDevError(
      formType,
      "Missing NEXT_PUBLIC_SUPABASE_URL or NEXT_PUBLIC_SUPABASE_ANON_KEY (see .env.example)."
    );
    return { ok: false, message: GENERIC_ERROR_MESSAGE };
  }

  const { url, init } = buildSubmitPublicFormRequest({ supabaseUrl, anonKey, formType, turnstileToken, payload });

  try {
    const res = await fetch(url, init);
    let json: unknown = null;
    try {
      json = await res.json();
    } catch {
      json = null;
    }
    return parseSubmitResponse(res.status, json);
  } catch (error) {
    logDevError(formType, error);
    return { ok: false, message: GENERIC_ERROR_MESSAGE };
  }
}

export async function submitContactFormWithTurnstile(
  payload: ContactFormPayload,
  turnstileToken: string
): Promise<FormSubmitResult> {
  return callSubmitPublicForm("contact", payload, turnstileToken);
}

export async function submitDesignPartnerApplicationWithTurnstile(
  payload: DesignPartnerFormPayload,
  turnstileToken: string
): Promise<FormSubmitResult> {
  return callSubmitPublicForm("design_partner", payload, turnstileToken);
}
