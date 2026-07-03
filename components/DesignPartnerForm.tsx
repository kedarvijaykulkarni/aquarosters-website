"use client";

import { useState, FormEvent } from "react";
import { Button } from "./Button";

const fieldClasses =
  "w-full rounded-xl border border-border bg-white px-4 py-3 text-ink placeholder:text-muted/70 focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-ocean";

export function DesignPartnerForm() {
  const [submitted, setSubmitted] = useState(false);

  function handleSubmit(event: FormEvent<HTMLFormElement>) {
    event.preventDefault();
    setSubmitted(true);
  }

  if (submitted) {
    return (
      <div className="rounded-2xl border border-border bg-sky p-8 text-center">
        <h3 className="font-display text-xl font-semibold text-navy">Application received.</h3>
        <p className="mt-2 text-muted">We review design partner applications personally and will follow up by email.</p>
      </div>
    );
  }

  return (
    <form onSubmit={handleSubmit} className="grid gap-5 rounded-2xl border border-border bg-white p-8 shadow-card">
      <div className="grid gap-5 sm:grid-cols-2">
        <div>
          <label htmlFor="dp-name" className="mb-1.5 block text-sm font-semibold text-navy">Name</label>
          <input id="dp-name" name="name" type="text" required className={fieldClasses} />
        </div>
        <div>
          <label htmlFor="dp-business" className="mb-1.5 block text-sm font-semibold text-navy">Business name</label>
          <input id="dp-business" name="business" type="text" required className={fieldClasses} />
        </div>
        <div>
          <label htmlFor="dp-email" className="mb-1.5 block text-sm font-semibold text-navy">Email</label>
          <input id="dp-email" name="email" type="email" required className={fieldClasses} />
        </div>
        <div>
          <label htmlFor="dp-country" className="mb-1.5 block text-sm font-semibold text-navy">Country</label>
          <input id="dp-country" name="country" type="text" required className={fieldClasses} />
        </div>
        <div>
          <label htmlFor="dp-type" className="mb-1.5 block text-sm font-semibold text-navy">Business type</label>
          <input id="dp-type" name="businessType" type="text" placeholder="Dive center, kitesurf school…" required className={fieldClasses} />
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
        <textarea id="dp-problem" name="problem" rows={4} required className={fieldClasses} />
      </div>
      <Button type="submit" variant="primary" className="w-full sm:w-fit">
        Apply as Design Partner
      </Button>
    </form>
  );
}
