import { Container } from "./Container";
import { Button } from "./Button";

export function CTASection({
  title,
  description,
  primaryLabel = "Book a Demo",
  primaryHref = "/contact",
  secondaryLabel = "Join Design Partner Program",
  secondaryHref = "/design-partners",
}: {
  title: string;
  description?: string;
  primaryLabel?: string;
  primaryHref?: string;
  secondaryLabel?: string;
  secondaryHref?: string;
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
          <Button href={primaryHref} variant="primary" className="bg-aqua text-navy hover:bg-teal hover:text-white">
            {primaryLabel}
          </Button>
          <Button href={secondaryHref} variant="outline-light">
            {secondaryLabel}
          </Button>
        </div>
      </Container>
    </section>
  );
}
