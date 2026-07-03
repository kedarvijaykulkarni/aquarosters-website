import { Container } from "./Container";
import { Button } from "./Button";

export function CTASection({
  title,
  description,
  primaryLabel = "Book a Demo",
  primaryHref = "/contact",
  primaryGaEvent = "book_demo_click",
  secondaryLabel = "Join Design Partner Program",
  secondaryHref = "/design-partners",
  secondaryGaEvent = "join_design_partner_click",
}: {
  title: string;
  description?: string;
  primaryLabel?: string;
  primaryHref?: string;
  primaryGaEvent?: string;
  secondaryLabel?: string;
  secondaryHref?: string;
  secondaryGaEvent?: string;
}) {
  return (
    <section className="bg-navy py-20 md:py-28">
      <Container className="text-center">
        <h2 className="font-display text-3xl md:text-4xl font-bold text-white max-w-2xl mx-auto">
          {title}
        </h2>
        {description && (
          <p className="mt-4 text-lg text-white/70 max-w-xl mx-auto">{description}</p>
        )}
        <div className="mt-10 flex flex-col sm:flex-row items-center justify-center gap-4">
          <Button
            href={primaryHref}
            variant="primary"
            className="bg-aqua text-navy hover:bg-teal hover:text-white"
            data-ga-event={primaryGaEvent}
          >
            {primaryLabel}
          </Button>
          <Button href={secondaryHref} variant="outline-light" data-ga-event={secondaryGaEvent}>
            {secondaryLabel}
          </Button>
        </div>
      </Container>
    </section>
  );
}
