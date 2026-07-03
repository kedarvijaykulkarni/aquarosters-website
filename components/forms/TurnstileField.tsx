"use client";

import { forwardRef } from "react";
import { Turnstile, type TurnstileInstance } from "@marsidev/react-turnstile";

type TurnstileFieldProps = {
  onVerify: (token: string) => void;
  onExpire: () => void;
  onError: () => void;
};

// Renders the Cloudflare Turnstile widget. The token it produces is not
// trusted on its own — the submit-public-form Edge Function re-verifies it
// server-side with Cloudflare's siteverify API before any database write.
export const TurnstileField = forwardRef<TurnstileInstance, TurnstileFieldProps>(function TurnstileField(
  { onVerify, onExpire, onError },
  ref
) {
  const siteKey = process.env.NEXT_PUBLIC_TURNSTILE_SITE_KEY;

  if (!siteKey) {
    if (process.env.NODE_ENV !== "production") {
      return (
        <p
          role="alert"
          className="rounded-xl border border-warning/30 bg-warning/5 px-4 py-3 text-sm font-medium text-warning"
        >
          Turnstile is not configured: set NEXT_PUBLIC_TURNSTILE_SITE_KEY in .env.local to test this form locally
          (see docs/SUPABASE_FORMS.md).
        </p>
      );
    }
    return null;
  }

  return (
    <div className="flex justify-center sm:justify-start">
      <Turnstile
        ref={ref}
        siteKey={siteKey}
        onSuccess={onVerify}
        onExpire={onExpire}
        onError={onError}
        options={{ theme: "light", size: "flexible" }}
      />
    </div>
  );
});
