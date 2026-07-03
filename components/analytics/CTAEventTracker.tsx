"use client";

import { useEffect } from "react";
import { event } from "@/lib/analytics/google-analytics";

// Delegates a single click listener at the document level to track CTA
// clicks, so the Button/CTASection server components that render the actual
// links never need a "use client" boundary of their own — they just carry a
// static `data-ga-event="..."` attribute. `event()` itself already no-ops
// outside production/localhost/without a measurement ID, so this listener
// is harmless to keep attached everywhere.
export function CTAEventTracker() {
  useEffect(() => {
    function handleClick(nativeEvent: MouseEvent) {
      const target = nativeEvent.target;
      if (!(target instanceof Element)) return;

      const trigger = target.closest<HTMLElement>("[data-ga-event]");
      const action = trigger?.getAttribute("data-ga-event");
      if (action) event(action);
    }

    document.addEventListener("click", handleClick);
    return () => document.removeEventListener("click", handleClick);
  }, []);

  return null;
}
