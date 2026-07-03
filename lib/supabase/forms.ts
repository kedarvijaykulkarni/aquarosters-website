import { supabase } from "./client";
import type { ContactSubmissionInput, DesignPartnerApplicationInput } from "@/types/supabase-forms";

export type FormSubmitResult = { ok: true } | { ok: false; message: string };

const GENERIC_ERROR_MESSAGE = "Sorry, we could not process your request. Please try again.";

function currentSourcePage(): string | undefined {
  return typeof window !== "undefined" ? window.location.pathname : undefined;
}

function currentUserAgent(): string | undefined {
  return typeof navigator !== "undefined" ? navigator.userAgent : undefined;
}

function logDevError(context: string, error: unknown) {
  if (process.env.NODE_ENV !== "production") {
    // eslint-disable-next-line no-console
    console.error(`[supabase] ${context}`, error);
  }
}

export async function submitContactForm(payload: ContactSubmissionInput): Promise<FormSubmitResult> {
  try {
    const { error } = await supabase.from("contact_submissions").insert({
      ...payload,
      source_page: payload.source_page ?? currentSourcePage(),
      user_agent: payload.user_agent ?? currentUserAgent(),
    });

    if (error) {
      logDevError("submitContactForm", error);
      return { ok: false, message: GENERIC_ERROR_MESSAGE };
    }

    return { ok: true };
  } catch (error) {
    logDevError("submitContactForm", error);
    return { ok: false, message: GENERIC_ERROR_MESSAGE };
  }
}

export async function submitDesignPartnerApplication(
  payload: DesignPartnerApplicationInput
): Promise<FormSubmitResult> {
  try {
    const { error } = await supabase.from("design_partner_applications").insert({
      ...payload,
      source_page: payload.source_page ?? currentSourcePage(),
      user_agent: payload.user_agent ?? currentUserAgent(),
    });

    if (error) {
      logDevError("submitDesignPartnerApplication", error);
      return { ok: false, message: GENERIC_ERROR_MESSAGE };
    }

    return { ok: true };
  } catch (error) {
    logDevError("submitDesignPartnerApplication", error);
    return { ok: false, message: GENERIC_ERROR_MESSAGE };
  }
}
