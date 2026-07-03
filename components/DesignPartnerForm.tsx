"use client";

import { useState, FormEvent } from "react";
import { Button } from "./Button";
import { submitDesignPartnerApplication } from "@/lib/supabase/forms";

const fieldClasses =
  "w-full rounded-xl border border-border bg-white px-4 py-3 text-ink placeholder:text-muted/70 focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-ocean";

const EMAIL_PATTERN = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

type Status = "idle" | "submitting" | "success" | "error";

export function DesignPartnerForm() {
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
    const business = String(data.get("business") ?? "").trim();
    const email = String(data.get("email") ?? "").trim();
    const problem = String(data.get("problem") ?? "").trim();

    if (
      name.length < 2 ||
      name.length > 120 ||
      business.length < 2 ||
      business.length > 160 ||
      !EMAIL_PATTERN.test(email) ||
      problem.length < 10 ||
      problem.length > 5000
    ) {
      setStatus("error");
      setErrorMessage(
        "Please enter your name, business name, a valid email address, and a description of your biggest operational problem (at least 10 characters)."
      );
      return;
    }

    setStatus("submitting");
    setErrorMessage(null);

    const result = await submitDesignPartnerApplication({
      name,
      business_name: business,
      email,
      country: String(data.get("country") ?? "").trim() || undefined,
      business_type: String(data.get("businessType") ?? "").trim() || undefined,
      number_of_staff: String(data.get("staffCount") ?? "").trim() || undefined,
      current_tools_used: String(data.get("currentTools") ?? "").trim() || undefined,
      biggest_operational_problem: problem,
    });

    if (result.ok) {
      setStatus("success");
      form.reset();
    } else {
      setStatus("error");
      setErrorMessage("Sorry, we could not submit your application. Please try again.");
    }
  }

  return (
    <div>
      <div aria-live="polite" role="status">
        {status === "success" && (
          <div className="rounded-2xl border border-border bg-sky p-8 text-center">
            <h3 className="font-display text-xl font-semibold text-navy">
              Thanks — your design partner application has been received.
            </h3>
            <p className="mt-2 text-muted">We review design partner applications personally and will follow up by email.</p>
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
            <label htmlFor="dp-company_website_confirm">Leave this field blank</label>
            <input
              id="dp-company_website_confirm"
              name="company_website_confirm"
              type="text"
              tabIndex={-1}
              autoComplete="off"
            />
          </div>

          <div className="grid gap-5 sm:grid-cols-2">
            <div>
              <label htmlFor="dp-name" className="mb-1.5 block text-sm font-semibold text-navy">Name</label>
              <input id="dp-name" name="name" type="text" required minLength={2} maxLength={120} className={fieldClasses} />
            </div>
            <div>
              <label htmlFor="dp-business" className="mb-1.5 block text-sm font-semibold text-navy">Business name</label>
              <input id="dp-business" name="business" type="text" required minLength={2} maxLength={160} className={fieldClasses} />
            </div>
            <div>
              <label htmlFor="dp-email" className="mb-1.5 block text-sm font-semibold text-navy">Email</label>
              <input id="dp-email" name="email" type="email" required className={fieldClasses} />
            </div>
            <div>
              <label htmlFor="dp-country" className="mb-1.5 block text-sm font-semibold text-navy">Country</label>
              <input id="dp-country" name="country" type="text" className={fieldClasses} />
            </div>
            <div>
              <label htmlFor="dp-type" className="mb-1.5 block text-sm font-semibold text-navy">Business type</label>
              <input id="dp-type" name="businessType" type="text" placeholder="Dive center, kitesurf school…" className={fieldClasses} />
            </div>
            <div>
              <label htmlFor="dp-staff" className="mb-1.5 block text-sm font-semibold text-navy">Number of staff</label>
              <input id="dp-staff" name="staffCount" type="text" className={fieldClasses} />
            </div>
          </div>
          <div>
            <label htmlFor="dp-tools" className="mb-1.5 block text-sm font-semibold text-navy">Current tools used</label>
            <input id="dp-tools" name="currentTools" type="text" placeholder="Spreadsheets, WhatsApp, another booking tool…" className={fieldClasses} />
          </div>
          <div>
            <label htmlFor="dp-problem" className="mb-1.5 block text-sm font-semibold text-navy">Biggest operational problem</label>
            <textarea id="dp-problem" name="problem" rows={4} required minLength={10} maxLength={5000} className={fieldClasses} />
          </div>
          <Button type="submit" variant="primary" className="w-full sm:w-fit" disabled={status === "submitting"}>
            {status === "submitting" ? "Submitting..." : "Apply as Design Partner"}
          </Button>
        </form>
      )}
    </div>
  );
}
