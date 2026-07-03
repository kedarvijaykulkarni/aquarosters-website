"use client";

import { useState, FormEvent } from "react";
import { Button } from "./Button";

const fieldClasses =
  "w-full rounded-xl border border-border bg-white px-4 py-3 text-ink placeholder:text-muted/70 focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-ocean";

export function ContactForm() {
  const [submitted, setSubmitted] = useState(false);

  function handleSubmit(event: FormEvent<HTMLFormElement>) {
    event.preventDefault();
    setSubmitted(true);
  }

  if (submitted) {
    return (
      <div className="rounded-2xl border border-border bg-sky p-8 text-center">
        <h3 className="font-display text-xl font-semibold text-navy">Thanks — we&apos;ll be in touch.</h3>
        <p className="mt-2 text-muted">Someone from the AquaRosters team will reply to your message shortly.</p>
      </div>
    );
  }

  return (
    <form onSubmit={handleSubmit} className="grid gap-5 rounded-2xl border border-border bg-white p-8 shadow-card">
      <div className="grid gap-5 sm:grid-cols-2">
        <div>
          <label htmlFor="name" className="mb-1.5 block text-sm font-semibold text-navy">Name</label>
          <input id="name" name="name" type="text" required className={fieldClasses} />
        </div>
        <div>
          <label htmlFor="business" className="mb-1.5 block text-sm font-semibold text-navy">Business name</label>
          <input id="business" name="business" type="text" required className={fieldClasses} />
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
          <input id="country" name="country" type="text" required className={fieldClasses} />
        </div>
        <div>
          <label htmlFor="businessType" className="mb-1.5 block text-sm font-semibold text-navy">Business type</label>
          <input id="businessType" name="businessType" type="text" placeholder="Dive center, kitesurf school…" className={fieldClasses} />
        </div>
      </div>
      <div>
        <label htmlFor="message" className="mb-1.5 block text-sm font-semibold text-navy">Message</label>
        <textarea id="message" name="message" rows={5} required className={fieldClasses} />
      </div>
      <Button type="submit" variant="primary" className="w-full sm:w-fit">
        Send message
      </Button>
    </form>
  );
}
