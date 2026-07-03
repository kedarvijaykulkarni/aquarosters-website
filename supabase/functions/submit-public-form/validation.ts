// Pure validation logic for the submit-public-form Edge Function.
//
// Deliberately framework-free (no Deno-specific APIs) so it can run both in
// the Deno Edge Function runtime and under `node --test` for fast local TDD
// — see validation.test.ts.

export const LIMITS = {
  name: { min: 2, max: 120 },
  businessName: { min: 2, max: 160 },
  email: { max: 254 },
  website: { max: 500 },
  country: { max: 120 },
  businessType: { max: 120 },
  numberOfStaff: { max: 80 },
  currentToolsUsed: { max: 2000 },
  message: { min: 10, max: 5000 },
  problem: { min: 10, max: 5000 },
} as const;

const EMAIL_PATTERN = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

export type ContactPayload = {
  name: string;
  business_name?: string;
  email: string;
  website?: string;
  country?: string;
  business_type?: string;
  message: string;
  company_website_confirm?: string;
};

export type DesignPartnerPayload = {
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

export type SubmitPublicFormRequestBody =
  | { formType: "contact"; turnstileToken: string; payload: ContactPayload }
  | { formType: "design_partner"; turnstileToken: string; payload: DesignPartnerPayload };

export function isHoneypotFilled(value: unknown): boolean {
  return typeof value === "string" && value.trim() !== "";
}

export function isValidEmail(email: unknown): email is string {
  return typeof email === "string" && email.length <= LIMITS.email.max && EMAIL_PATTERN.test(email);
}

function isNonEmptyString(value: unknown): value is string {
  return typeof value === "string" && value.trim().length > 0;
}

function withinLength(value: string, min: number, max: number): boolean {
  const length = value.trim().length;
  return length >= min && length <= max;
}

function maxLengthOk(value: unknown, max: number): boolean {
  if (value === undefined || value === null || value === "") return true;
  return typeof value === "string" && value.trim().length <= max;
}

export function parseRequestBody(
  body: unknown
): { ok: true; value: SubmitPublicFormRequestBody } | { ok: false; error: string } {
  if (typeof body !== "object" || body === null) {
    return { ok: false, error: "Invalid request body." };
  }

  const { formType, turnstileToken, payload } = body as Record<string, unknown>;

  if (formType !== "contact" && formType !== "design_partner") {
    return { ok: false, error: "Invalid form type." };
  }
  if (typeof turnstileToken !== "string" || turnstileToken.trim() === "") {
    return { ok: false, error: "Missing verification token." };
  }
  if (typeof payload !== "object" || payload === null) {
    return { ok: false, error: "Invalid form payload." };
  }

  return { ok: true, value: { formType, turnstileToken, payload } as SubmitPublicFormRequestBody };
}

export function validateContactPayload(payload: ContactPayload): string | null {
  if (!isNonEmptyString(payload.name) || !withinLength(payload.name, LIMITS.name.min, LIMITS.name.max)) {
    return "Please enter your name.";
  }
  if (!isValidEmail(payload.email)) {
    return "Please enter a valid email address.";
  }
  if (
    !isNonEmptyString(payload.message) ||
    !withinLength(payload.message, LIMITS.message.min, LIMITS.message.max)
  ) {
    return "Please enter a message of at least 10 characters.";
  }
  if (
    !maxLengthOk(payload.business_name, LIMITS.businessName.max) ||
    !maxLengthOk(payload.website, LIMITS.website.max) ||
    !maxLengthOk(payload.country, LIMITS.country.max) ||
    !maxLengthOk(payload.business_type, LIMITS.businessType.max)
  ) {
    return "One or more fields is too long.";
  }
  return null;
}

export function validateDesignPartnerPayload(payload: DesignPartnerPayload): string | null {
  if (!isNonEmptyString(payload.name) || !withinLength(payload.name, LIMITS.name.min, LIMITS.name.max)) {
    return "Please enter your name.";
  }
  if (
    !isNonEmptyString(payload.business_name) ||
    !withinLength(payload.business_name, LIMITS.businessName.min, LIMITS.businessName.max)
  ) {
    return "Please enter your business name.";
  }
  if (!isValidEmail(payload.email)) {
    return "Please enter a valid email address.";
  }
  if (
    !isNonEmptyString(payload.biggest_operational_problem) ||
    !withinLength(payload.biggest_operational_problem, LIMITS.problem.min, LIMITS.problem.max)
  ) {
    return "Please describe your biggest operational problem (at least 10 characters).";
  }
  if (
    !maxLengthOk(payload.country, LIMITS.country.max) ||
    !maxLengthOk(payload.business_type, LIMITS.businessType.max) ||
    !maxLengthOk(payload.number_of_staff, LIMITS.numberOfStaff.max) ||
    !maxLengthOk(payload.current_tools_used, LIMITS.currentToolsUsed.max)
  ) {
    return "One or more fields is too long.";
  }
  return null;
}
