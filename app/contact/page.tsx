import type { Metadata } from "next";
import { Container } from "@/components/Container";
import { ContactForm } from "@/components/ContactForm";

export const metadata: Metadata = {
  title: "Contact AquaRosters",
  description: "Contact AquaRosters to discuss dive center, watersports school, rental, POS, booking, and live agenda workflows.",
};

export default function ContactPage() {
  return (
    <main className="py-12 md:py-20">
      <Container className="max-w-2xl">
        <h1 className="font-display text-3xl font-bold text-navy md:text-5xl">
          Let’s talk about your operation.
        </h1>
        <p className="mt-4 text-lg text-muted">
          Whether you run a dive center, kitesurf school, surf school, or rental operation,
          AquaRosters is being shaped around real operator workflows.
        </p>
        <div className="mt-10">
          <ContactForm />
        </div>
      </Container>
    </main>
  );
}
