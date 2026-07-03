import type { Metadata } from "next";
import { Container } from "@/components/Container";
import { Breadcrumbs } from "@/components/Breadcrumbs";

export const metadata: Metadata = {
  title: "Terms of Service — AquaRosters",
  description:
    "The terms that govern use of the AquaRosters website and live operations platform for dive centers and watersports schools.",
};

const sections: { heading: string; body: string[] }[] = [
  {
    heading: "1. Acceptance of terms",
    body: [
      "By accessing or using the AquaRosters website or platform (the \"Service\"), you agree to these Terms of Service (\"Terms\"). If you do not agree, do not use the Service.",
    ],
  },
  {
    heading: "2. Description of service",
    body: [
      "AquaRosters provides a live operations platform for dive centers, watersports schools, and rental operators, including a live agenda and scheduling, staff management, participant records, gear and rental tracking, point-of-sale and payments, online booking, trip manifests, notifications, reporting, and audit history.",
    ],
  },
  {
    heading: "3. Design partner and early access phase",
    body: [
      "AquaRosters is currently in a design partner and early access phase. Features, pricing, and availability may change as the product develops. Access granted during this phase does not guarantee continued access to, or the availability of, specific features at general availability.",
    ],
  },
  {
    heading: "4. Accounts",
    body: [
      "You must provide accurate information when registering for the Service, are responsible for safeguarding your account credentials, and must notify us promptly of any unauthorized use of your account.",
    ],
  },
  {
    heading: "5. Subscription plans and pricing",
    body: [
      "AquaRosters offers three monthly subscription plans — Starter (€29/month), Grow (€59/month), and Scale (€99/month) — each with 0% commission on direct bookings made through the platform.",
      "Plans, features, and pricing may change with reasonable notice. Design partners may receive separate founder pricing or extended free access, as described on our Design Partners page.",
    ],
  },
  {
    heading: "6. Billing and payment",
    body: [
      "Subscriptions are billed monthly in advance. Fees are exclusive of applicable taxes unless stated otherwise. Failure to pay may result in suspension or termination of access to the Service.",
      "You may cancel your subscription at any time; cancellation takes effect at the end of the current billing period. We do not provide prorated refunds for partial months, except where required by law.",
    ],
  },
  {
    heading: "7. Your data and Operator responsibilities",
    body: [
      "As an Operator (a dive center, watersports school, or rental operator using the Service), you are responsible for the accuracy, legality, and appropriate handling of any data you enter about your staff and customers or participants, including certification, license, and payment-related information.",
      "You act as the data controller for that information, and AquaRosters acts as a data processor, as described in our Privacy Policy and, where applicable, a separate data processing agreement.",
    ],
  },
  {
    heading: "8. Acceptable use",
    body: [
      "You agree not to: use the Service for unlawful purposes; attempt to gain unauthorized access to the Service or to other accounts; interfere with or disrupt the Service's operation; misuse participant or customer data collected through the Service; or resell or white-label the Service without our prior written consent.",
    ],
  },
  {
    heading: "9. Intellectual property",
    body: [
      "AquaRosters, our logos, product names, and platform design are the property of AquaRosters. These Terms do not grant you any rights to our trademarks or branding beyond what is necessary to use the Service. You retain ownership of the data you or your organization enters into the platform.",
    ],
  },
  {
    heading: "10. Third-party services",
    body: [
      "The Service may integrate with third-party payment processors, email and SMS providers, and other tools. Your use of those integrations may also be subject to the relevant third party's own terms.",
    ],
  },
  {
    heading: "11. Service availability",
    body: [
      "We aim to keep the Service available and reliable, but we do not guarantee uninterrupted or error-free operation, particularly during the design partner and early access phase. We may perform maintenance, and features may be added, changed, or removed at any time.",
    ],
  },
  {
    heading: "12. Termination",
    body: [
      "We may suspend or terminate your access to the Service for breach of these Terms, non-payment, or as reasonably needed to protect the Service or other users. You may stop using the Service and close your account at any time.",
    ],
  },
  {
    heading: "13. Disclaimer of warranties",
    body: [
      "The Service is provided \"as is\" and \"as available,\" without warranties of any kind, express or implied, to the maximum extent permitted by applicable law.",
    ],
  },
  {
    heading: "14. Limitation of liability",
    body: [
      "To the maximum extent permitted by law, AquaRosters will not be liable for indirect, incidental, special, or consequential damages arising from your use of the Service. Our total liability for any claim relating to the Service will not exceed the amount you paid us in the twelve (12) months preceding the claim.",
    ],
  },
  {
    heading: "15. Indemnification",
    body: [
      "You agree to indemnify and hold AquaRosters harmless from claims, damages, or expenses arising out of your misuse of the Service or violation of these Terms.",
    ],
  },
  {
    heading: "16. Governing law",
    body: [
      "These Terms are governed by the laws of Spain, without regard to conflict-of-law principles, except where a different governing law is required by the mandatory consumer protection or data protection laws applicable to you.",
    ],
  },
  {
    heading: "17. Changes to these terms",
    body: [
      "We may update these Terms from time to time. Continued use of the Service after changes take effect constitutes acceptance of the revised Terms.",
    ],
  },
  {
    heading: "18. Contact",
    body: [
      "Questions about these Terms can be sent to legal@aquarosters.com or through the contact page.",
    ],
  },
];

export default function TermsPage() {
  return (
    <main className="py-12 md:py-20">
      <Container className="max-w-3xl">
        <Breadcrumbs items={[{ label: "Legal", href: "/legal/terms" }, { label: "Terms" }]} />
        <h1 className="font-display text-3xl font-bold text-navy md:text-4xl">Terms of Service</h1>
        <p className="mt-2 text-sm text-muted">Last updated: July 2026</p>
        <p className="mt-4 rounded-xl border border-warning/30 bg-warning/10 p-4 text-sm text-ink">
          These terms are written to reflect AquaRosters&apos; actual subscription plans and business
          model during our design partner and early access phase. They should still be reviewed by
          qualified legal counsel before general availability.
        </p>
        <div className="mt-8 flex flex-col gap-8 text-ink">
          {sections.map((section) => (
            <div key={section.heading}>
              <h2 className="font-display text-xl font-semibold text-navy">{section.heading}</h2>
              <div className="mt-2 flex flex-col gap-3 text-muted">
                {section.body.map((paragraph, index) => (
                  <p key={index}>{paragraph}</p>
                ))}
              </div>
            </div>
          ))}
        </div>
      </Container>
    </main>
  );
}
