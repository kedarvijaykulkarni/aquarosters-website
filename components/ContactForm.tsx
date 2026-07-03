"use client";

import { useState, FormEvent } from "react";
import { Button } from "./Button";
import { submitContactForm } from "@/lib/supabase/forms";

const fieldClasses =
  "w-full rounded-xl border border-border bg-white px-4 py-3 text-ink placeholder:text-muted/70 focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-ocean";

const EMAIL_PATTERN = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

type Status = "idle" | "submitting" | "success" | "error";

export function ContactForm() {
  const [status, setStatus] = useState<Status>("idle");
  const [errorMessage, setErrorMessage] = useState<string | null>(null);

  async function handleSubmit(event: FormEvent<HTMLFormElement>) {
    event.preventDefault();
    const form = event.currentTarget;
    const data = new FormData(form);

    // Honeypot: real visitors never see or fill this field; bots that fill
    // every input do. Pretend to succeed without touching Supabase.
    if (String(data.get("company_website_confirm") ?? "").trim() !== "") {
      setStatus("success");
      return;
    }

    const name = String(data.get("name") ?? "").trim();
    const email = String(data.get("email") ?? "").trim();
    const message = String(data.get("message") ?? "").trim();

    if (name.length < 2 || name.length > 120 || !EMAIL_PATTERN.test(email) || message.length < 10 || message.length > 5000) {
      setStatus("error");
      setErrorMessage("Please enter your name, a valid email address, and a message of at least 10 characters.");
      return;
    }

    setStatus("submitting");
    setErrorMessage(null);

    const result = await submitContactForm({
      name,
      business_name: String(data.get("business") ?? "").trim() || undefined,
      email,
      website: String(data.get("website") ?? "").trim() || undefined,
      country: String(data.get("country") ?? "").trim() || undefined,
      business_type: String(data.get("businessType") ?? "").trim() || undefined,
      message,
    });

    if (result.ok) {
      setStatus("success");
      form.reset();
    } else {
      setStatus("error");
      setErrorMessage("Sorry, we could not send your message. Please try again.");
    }
  }

  return (
    <div>
      <div aria-live="polite" role="status">
        {status === "success" && (
          <div className="rounded-2xl border border-border bg-sky p-8 text-center">
            <h3 className="font-display text-xl font-semibold text-navy">
              Thanks — your message has been sent. We’ll get back to you shortly.
            </h3>
          </div>
        )}
        {status === "error" && errorMessage && (
          <p className="mb-5 rounded-xl border border-error/30 bg-error/5 px-4 py-3 text-sm font-medium text-error">
            {errorMessage}
          </p>
        )}
      </div>

      {status !== "success" && (
        <form onSubmit={handleSubmit} className="grid gap-5 rounded-2xl border border-border bg-white p-8 shadow-card">
          <div aria-hidden="true" className="absolute -left-[9999px] top-auto h-px w-px overflow-hidden">
            <label htmlFor="company_website_confirm">Leave this field blank</label>
            <input
              id="company_website_confirm"
              name="company_website_confirm"
              type="text"
              tabIndex={-1}
              autoComplete="off"
            />
          </div>

          <div className="grid gap-5 sm:grid-cols-2">
            <div>
              <label htmlFor="name" className="mb-1.5 block text-sm font-semibold text-navy">Name</label>
              <input id="name" name="name" type="text" required minLength={2} maxLength={120} className={fieldClasses} />
            </div>
            <div>
              <label htmlFor="business" className="mb-1.5 block text-sm font-semibold text-navy">Business name</label>
              <input id="business" name="business" type="text" className={fieldClasses} />
            </div>
            <div>
              <label htmlFor="email" className="mb-1.5 block text-sm font-semibold text-navy">Email</label>
              <input id="email" name="email" type="email" required className={fieldClasses} />
            </div>
            <div>
              <label htmlFor="website" className="mb-1.5 block text-sm font-semibold text-navy">Website</label>
              <input id="website" name="website" type="text" className={fieldClasses} />
            </div>
            <div>
              <label htmlFor="country" className="mb-1.5 block text-sm font-semibold text-navy">Country</label>
              <input id="country" name="country" type="text" className={fieldClasses} />
            </div>
            <div>
              <label htmlFor="businessType" className="mb-1.5 block text-sm font-semibold text-navy">Business type</label>
              <input id="businessType" name="businessType" type="text" placeholder="Dive center, kitesurf school…" className={fieldClasses} />
            </div>
          </div>
          <div>
            <label htmlFor="message" className="mb-1.5 block text-sm font-semibold text-navy">Message</label>
            <textarea id="message" name="message" rows={5} required minLength={10} maxLength={5000} className={fieldClasses} />
          </div>
          <Button type="submit" variant="primary" className="w-full sm:w-fit" disabled={status === "submitting"}>
            {status === "submitting" ? "Sending..." : "Send message"}
          </Button>
        </form>
      )}
    </div>
  );
}
